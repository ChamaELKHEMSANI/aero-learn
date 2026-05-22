class EditExportManager {
  constructor(xmlParser) {
    this.xmlParser = xmlParser;
    this.diagramme = null;
    this.exportDialog = null;
    this.lng=  'en';
    this.translations = {
      fr: {
        exportTitle: "Exporter l'organigramme",
        exportFormat: "Format d'export",
        exportQuality: "Qualité",
        exportScale: "Échelle",
        exportBackground: "Fond blanc",
        exportIncludeAll: "Inclure tout l'arbre",
        exportButton: "Exporter",
        cancelButton: "Annuler",
        exportSuccess: "Export réussi !",
        exportError: "Erreur lors de l'export",
        exportFormats: {
          png: "PNG (Image)",
          jpeg: "JPEG (Image)",
          xls: "XLS (Tableur)",
          xml: "XML (Données)"
        },
        qualityOptions: {
          low: "Basse (72 DPI)",
          medium: "Moyenne (150 DPI)",
          high: "Haute (300 DPI)"
        }
      },
      en: {
        exportTitle: "Export Organigram",
        exportFormat: "Export Format",
        exportQuality: "Quality",
        exportScale: "Scale",
        exportBackground: "White Background",
        exportIncludeAll: "Include Full Tree",
        exportButton: "Export",
        cancelButton: "Cancel",
        exportSuccess: "Export successful!",
        exportError: "Export failed",
        exportFormats: {
          png: "PNG",
          jpeg: "JPEG",
          xls: "XLS",
          xml: "XML"
        },
        qualityOptions: {
          low: "Low (72 DPI)",
          medium: "Medium (150 DPI)",
          high: "High (300 DPI)"
        }
      }
    };
  }
  setLang(lng) {
      this.lng = lng;
      if (this.exportDialog) {
          this.destroy();
          this.createExportDialog();
      }
      this.updateModalTranslations();
  }
  translate(key, context = null) {
    if (context && this.translations[this.lng] && this.translations[this.lng][context]) {
      const contextObj = this.translations[this.lng][context];
      if (contextObj && contextObj[key]) {
        return contextObj[key];
      }
    }
    if (this.translations[this.lng] && this.translations[this.lng][key]) {
      return this.translations[this.lng][key];
    }
    return key;
  }
  showExportDialog(diagram) {
      this.diagramme = diagram;
      if (this.exportDialog) {
          this.destroy();
      }
      this.createExportDialog();
      this.exportDialog.style.display = 'flex';
  }
  createExportDialog() {
    const existingDialog = document.getElementById('export-dialog');
    if (existingDialog) {
      existingDialog.remove();
    }
    const dialog = document.createElement('div');
    dialog.id = 'export-dialog';
    dialog.className = 'export-dialog';
    dialog.innerHTML = `
      <div class="export-dialog-overlay"></div>
      <div class="export-dialog-content">
        <div class="export-dialog-header">
          <h3>${this.translate('exportTitle')}</h3>
          <button class="export-dialog-close" aria-label="${this.translate('cancelButton')}">×</button>
        </div>
        <div class="export-dialog-body">
          <div class="export-form-group">
            <label for="export-format">${this.translate('exportFormat')}</label>
            <select id="export-format" class="export-select">
              <option value="png">${this.translate('png', 'exportFormats')}</option>
              <option value="jpeg">${this.translate('jpeg', 'exportFormats')}</option>
              <!--option value="xls">${this.translate('xls', 'exportFormats')}</option-->
              <option value="xml">${this.translate('xml', 'exportFormats')}</option>
            </select>
          </div>
          <div class="export-form-group" id="quality-group">
            <label for="export-quality">${this.translate('exportQuality')}</label>
            <select id="export-quality" class="export-select">
              <option value="1">${this.translate('low', 'qualityOptions')}</option>
              <option value="2" selected>${this.translate('medium', 'qualityOptions')}</option>
              <option value="4">${this.translate('high', 'qualityOptions')}</option>
            </select>
          </div>
          <div class="export-form-group" id="scale-group">
            <label for="export-scale">${this.translate('exportScale')}</label>
            <input type="range" id="export-scale" min="0.5" max="2" step="0.1" value="1" class="export-slider">
            <span id="scale-value">100%</span>
          </div>
          <div class="export-form-group export-checkbox" id="background-group">
            <label>
              <input type="checkbox" id="export-background" checked>
              ${this.translate('exportBackground')}
            </label>
          </div>
          <div class="export-form-group export-checkbox">
            <label>
              <input type="checkbox" id="export-include-all">
              ${this.translate('exportIncludeAll')}
            </label>
          </div>
        </div>
        <div class="export-dialog-footer">
          <button class="export-btn export-btn-cancel">${this.translate('cancelButton')}</button>
          <button class="export-btn export-btn-primary">${this.translate('exportButton')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
    this.exportDialog = dialog;
    this.setupExportDialogEvents();
  }
  setupExportDialogEvents() {
    const dialog = this.exportDialog;
    const formatSelect = dialog.querySelector('#export-format');
    const qualityGroup = dialog.querySelector('#quality-group');
    const scaleGroup = dialog.querySelector('#scale-group');
    const backgroundGroup = dialog.querySelector('#background-group');
    const scaleSlider = dialog.querySelector('#export-scale');
    const scaleValue = dialog.querySelector('#scale-value');
    const closeBtn = dialog.querySelector('.export-dialog-close');
    const cancelBtn = dialog.querySelector('.export-btn-cancel');
    const exportBtn = dialog.querySelector('.export-btn-primary');
    const overlay = dialog.querySelector('.export-dialog-overlay');
    const updateFormatOptionsVisibility = (format) => {
      const isRaster = format === 'png' || format === 'jpeg';
      const isDataExport = format === 'xls' || format === 'xml';
      qualityGroup.style.display = isRaster ? 'block' : 'none';
      scaleGroup.style.display = isDataExport ? 'none' : 'block';
      backgroundGroup.style.display = isDataExport ? 'none' : 'block';
    };
    formatSelect.addEventListener('change', (e) => {
      updateFormatOptionsVisibility(e.target.value);
    });
    updateFormatOptionsVisibility(formatSelect.value);
    scaleSlider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      scaleValue.textContent = Math.round(value * 100) + '%';
    });
    const closeDialog = () => {
      dialog.style.display = 'none';
    };
    closeBtn.addEventListener('click', closeDialog);
    cancelBtn.addEventListener('click', closeDialog);
    overlay.addEventListener('click', closeDialog);
    exportBtn.addEventListener('click', () => {
      this.performExport();
    });
  }
  async performExport() {
        const format = document.getElementById('export-format').value;
        const quality = parseFloat(document.getElementById('export-quality').value);
        const scale = parseFloat(document.getElementById('export-scale').value);
        const whiteBackground = document.getElementById('export-background').checked;
        const includeAll = document.getElementById('export-include-all').checked;
        try {
        this.showLoadingIndicator();
        switch (format) {
            case 'png':
            const svgDataPng = await this.prepareSVGForExport(includeAll, whiteBackground, scale);
            await this.exportAsPNG(svgDataPng, quality);
            break;
            case 'jpeg':
            const svgDataJpeg = await this.prepareSVGForExport(includeAll, whiteBackground, scale);
            await this.exportAsJPEG(svgDataJpeg, quality);
            break;
            case 'svg':
            const svgDataSvg = await this.prepareSVGForExport(includeAll, whiteBackground, scale);
            await this.exportAsSVG(svgDataSvg);
            break;
            case 'xls':
            await this.exportAsXLS(includeAll);
            break;
            case 'xml':
            await this.exportAsXML(includeAll);
            break;
        }
        this.exportDialog.style.display = 'none';
        this.showNotification(this.translate('exportSuccess'), 'success');
        } catch (error) {
        console.error('Export error:', error);
        this.showNotification(this.translate('exportError') + ': ' + error.message, 'error');
        } finally {
        this.hideLoadingIndicator();
        }
    }
    async prepareSVGForExport(includeAll, whiteBackground, scale) {
        const svg = this.diagramme.svg.node();
        const gRoot = this.diagramme.gRoot.node();
        const originalTransform = gRoot.getAttribute('transform');
        const wasExpanded = [];
        if (includeAll) {
            this.diagramme.root.descendants().forEach(d => {
            if (d._children && !d.children) {
                d.children = d._children;
                d._children = null;
                wasExpanded.push(d);
            }
            });
            this.diagramme.update(this.diagramme.root);
            await new Promise(resolve => setTimeout(resolve, 150));
        }
        let viewBoxX = 0;
        let viewBoxY = 0;
        let viewBoxW = 1;
        let viewBoxH = 1;
        const padding = 40;
        gRoot.setAttribute('transform', 'translate(0,0)');
        const bbox = gRoot.getBBox();
        viewBoxX = bbox.x - padding;
        viewBoxY = bbox.y - padding;
        viewBoxW = bbox.width + padding * 2;
        viewBoxH = bbox.height + padding * 2;
        if (originalTransform) {
            gRoot.setAttribute('transform', originalTransform);
        } else {
            gRoot.removeAttribute('transform');
        }
        const svgClone = svg.cloneNode(true);
        const gRootClone = svgClone.querySelector('g[class*="root"]') || svgClone.querySelector('g');
        const originalNodeRects = svg.querySelectorAll('.node-rect');
        const clonedNodeRects = svgClone.querySelectorAll('.node-rect');
        clonedNodeRects.forEach((rect, index) => {
            const sourceRect = originalNodeRects[index];
            if (!sourceRect) return;
            const computedStyle = window.getComputedStyle(sourceRect);
            const computedFill = window.getComputedStyle(sourceRect).fill;
            const hasInlineFill = !!(rect.style && rect.style.fill);
            const safeFill = (computedFill && computedFill !== 'rgba(0, 0, 0, 0)') ? computedFill : '#ffffff';
            const safeStroke = (computedStyle.stroke && computedStyle.stroke !== 'none' && computedStyle.stroke !== 'rgba(0, 0, 0, 0)')
                ? computedStyle.stroke
                : '#64748b';
            const safeStrokeWidth = (computedStyle.strokeWidth && computedStyle.strokeWidth !== '0px')
                ? computedStyle.strokeWidth
                : '1.5px';
            if (!hasInlineFill) {
                rect.style.fill = safeFill;
            }
            rect.style.stroke = safeStroke;
            rect.style.strokeWidth = safeStrokeWidth;
        });
        const exportWidth = Math.max(1, Math.round(viewBoxW * scale));
        const exportHeight = Math.max(1, Math.round(viewBoxH * scale));
        svgClone.setAttribute('width', exportWidth);
        svgClone.setAttribute('height', exportHeight);
        svgClone.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`);
        if (gRootClone) {
            gRootClone.setAttribute('transform', 'translate(0,0)');
        }
        if (whiteBackground) {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', viewBoxX);
            rect.setAttribute('y', viewBoxY);
            rect.setAttribute('width', viewBoxW);
            rect.setAttribute('height', viewBoxH);
            rect.setAttribute('fill', 'white');
            svgClone.insertBefore(rect, svgClone.firstChild);
        }
        this.inlineStyles(svgClone);
        if (includeAll && wasExpanded.length > 0) {
            wasExpanded.forEach(d => {
            d._children = d.children;
            d.children = null;
            });
            this.diagramme.update(this.diagramme.root);
        }
        return svgClone;
        }
  inlineStyles(svgElement) {
    const styleSheets = Array.from(document.styleSheets);
    let cssText = '';
    styleSheets.forEach(sheet => {
      try {
        const rules = sheet.cssRules || sheet.rules;
        if (rules) {
          Array.from(rules).forEach(rule => {
            if (rule.cssText) {
              cssText += rule.cssText + '\n';
            }
          });
        }
      } catch (e) {
      }
    });
    const styleElement = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    styleElement.textContent = cssText;
    svgElement.insertBefore(styleElement, svgElement.firstChild);
  }
  async exportAsPNG(svgElement, quality) {
    const canvas = await this.svgToCanvas(svgElement, quality);
    const dataURL = canvas.toDataURL('image/png');
    this.downloadFile(dataURL, 'organigramme.png');
  }
  async exportAsJPEG(svgElement, quality) {
    const canvas = await this.svgToCanvas(svgElement, quality);
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    this.downloadFile(dataURL, 'organigramme.jpg');
  }
  async exportAsSVG(svgElement) {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    this.downloadFile(url, 'organigramme.svg');
    URL.revokeObjectURL(url);
  }
  getDepartmentsForXLS(includeAll) {
    const parserNodes = this.xmlParser?.data?.nodes || [];
    const runtimeDiagram = this.diagramme?.diagramme || this.diagramme;
    const runtimeRoot = runtimeDiagram?.root;
    if (includeAll || !runtimeRoot) {
      return parserNodes;
    }
    const visibleIds = new Set(
      runtimeRoot
        .descendants()
        .filter((d) => d && d.data && d.data.id && d.data.id !== "root")
        .map((d) => d.data.id)
    );
    return parserNodes.filter((n) => visibleIds.has(n.id));
  }
  escapeHtml(value) {
    return this.sanitizeSpreadsheetValue(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  sanitizeSpreadsheetValue(value) {
    return String(value ?? '')
      .replace(/\r\n/g, '\n')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
  }
  formatEntityList(items) {
    if (!Array.isArray(items) || items.length === 0) return '';
    return items
      .map((x) => this.escapeHtml(x?.nom || x?.id || ''))
      .filter((x) => x !== '')
      .join(' | ');
  }
  toXlsCell(value, isHeader = false) {
    const style = isHeader ? ' ss:StyleID="Header"' : '';
    return `<Cell${style}><Data ss:Type="String">${this.escapeHtml(value)}</Data></Cell>`;
  }
  toXlsRow(values, isHeader = false) {
    return `<Row>${values.map((v) => this.toXlsCell(v, isHeader)).join('')}</Row>`;
  }
  toXlsWorksheet(name, headers, rows) {
    const safeName = this
      .sanitizeSpreadsheetValue(name || 'Sheet')
      .replace(/[\\\/\?\*\[\]:]/g, ' ')
      .trim()
      .substring(0, 31) || 'Sheet';
    const headerRow = this.toXlsRow(headers, true);
    const dataRows = rows.map((r) => this.toXlsRow(r)).join('');
    return `<Worksheet ss:Name="${this.escapeHtml(safeName)}"><Table>${headerRow}${dataRows}</Table></Worksheet>`;
  }
  getTasksForXLS(nodes, includeAll) {
    const mapTasks = Array.from(this.xmlParser?.tasksMap?.values() || []);
    if (includeAll) return mapTasks;
    const ids = new Set();
    nodes.forEach((n) => {
      (n.tasks || []).forEach((t) => {
        if (t?.id) ids.add(t.id);
      });
    });
    const fromMap = mapTasks.filter((t) => ids.has(t.id));
    const byId = new Map(fromMap.map((t) => [t.id, t]));
    nodes.forEach((n) => {
      (n.tasks || []).forEach((t) => {
        if (t?.id && !byId.has(t.id)) byId.set(t.id, t);
      });
    });
    return Array.from(byId.values());
  }
  getDocumentsForXLS(nodes, includeAll) {
    const mapDocs = Array.from(this.xmlParser?.documentsMap?.values() || []);
    if (includeAll) return mapDocs;
    const ids = new Set();
    nodes.forEach((n) => {
      (n.fichiers || []).forEach((d) => {
        if (d?.id) ids.add(d.id);
      });
    });
    const fromMap = mapDocs.filter((d) => ids.has(d.id));
    const byId = new Map(fromMap.map((d) => [d.id, d]));
    nodes.forEach((n) => {
      (n.fichiers || []).forEach((d) => {
        if (d?.id && !byId.has(d.id)) byId.set(d.id, d);
      });
    });
    return Array.from(byId.values());
  }
  resolveDepartmentNames(departmentIds, allowedIds = null) {
    const allDept = this.xmlParser?.departements || new Map();
    const ids = Array.isArray(departmentIds) ? departmentIds : [];
    const filtered = allowedIds ? ids.filter((id) => allowedIds.has(id)) : ids;
    return filtered.map((id) => allDept.get(id)?.nom || id).join(' | ');
  }
  async exportAsXLS(includeAll) {
    const nodes = this.getDepartmentsForXLS(includeAll);
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const selectedDeptIds = new Set(nodes.map((n) => n.id));
    const departmentRows = nodes.map((d) => {
      const parentName = d.parent ? (byId.get(d.parent)?.nom || d.parent) : '';
      const tasks = Array.isArray(d.tasks) ? d.tasks.length : 0;
      const docs = Array.isArray(d.fichiers) ? d.fichiers.length : 0;
      return [
        d.id || '',
        d.nom || '',
        d.parent || '',
        parentName,
        d.type || '',
        d.abbreviation || '',
        d.abbrev_details || '',
        d.background_color || '',
        d.responsable || '',
        d.description || '',
        d.note || '',
        String(tasks),
        String(docs),
        this.formatEntityList(d.tasks),
        this.formatEntityList(d.fichiers)
      ];
    });
    const tasks = this.getTasksForXLS(nodes, includeAll);
    const taskRows = tasks.map((t) => {
      const deptNames = this.resolveDepartmentNames(t.departments || [], includeAll ? null : selectedDeptIds);
      const deptCount = deptNames ? deptNames.split(' | ').length : 0;
      return [
        t.id || '',
        t.nom || '',
        t.categorie || '',
        t.statut || '',
        t.order || '',
        t.description || '',
        String(deptCount),
        deptNames
      ];
    });
    const docs = this.getDocumentsForXLS(nodes, includeAll);
    const docRows = docs.map((d) => {
      const deptNames = this.resolveDepartmentNames(d.departments || [], includeAll ? null : selectedDeptIds);
      const deptCount = deptNames ? deptNames.split(' | ').length : 0;
      return [
        d.id || '',
        d.nom || '',
        d.category || '',
        d.document_type || '',
        d.type || '',
        d.ref || '',
        d.code || '',
        d.lien || '',
        d.description || '',
        d.page_reference || '',
        String(deptCount),
        deptNames
      ];
    });
    const workbookXml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http:
<Styles>
  <Style ss:ID="Header">
    <Font ss:Bold="1"/>
    <Interior ss:Color="#F3F4F6" ss:Pattern="Solid"/>
  </Style>
</Styles>
${this.toXlsWorksheet(
  'Departments',
  ['ID', 'Nom', 'Parent ID', 'Parent', 'Type', 'Abbreviation', 'Abbrev Details', 'Background Color', 'Responsable', 'Description', 'Note', 'Nb Tasks', 'Nb Docs', 'Tasks', 'Documents'],
  departmentRows
)}
${this.toXlsWorksheet(
  'Tasks',
  ['ID', 'Nom', 'Categorie', 'Statut', 'Order', 'Description', 'Nb Departments', 'Departments'],
  taskRows
)}
${this.toXlsWorksheet(
  'Documents',
  ['ID', 'Nom', 'Category', 'Document Type', 'Type', 'Ref', 'Code', 'Lien', 'Description', 'Page Reference', 'Nb Departments', 'Departments'],
  docRows
)}
</Workbook>`;
    const blob = new Blob(['\uFEFF' + workbookXml], {
      type: 'application/vnd.ms-excel;charset=utf-8'
    });
    this.downloadFile(blob, 'organigramme.xls');
  }
  filterXMLToVisibleDepartments(xmlString) {
    const selectedDepartments = this.getDepartmentsForXLS(false);
    const selectedDeptIds = new Set(selectedDepartments.map((d) => d.id));
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    const departementsRoot = xmlDoc.getElementsByTagName('departements')[0];
    if (!departementsRoot) {
      return xmlString;
    }
    const departmentElements = Array.from(departementsRoot.getElementsByTagName('departement'));
    departmentElements.forEach((deptEl) => {
      const deptId = deptEl.getAttribute('id');
      if (!selectedDeptIds.has(deptId)) {
        deptEl.remove();
      }
    });
    const usedTaskIds = new Set();
    const usedDocumentIds = new Set();
    const usedPosteIds = new Set();
    const remainingDepartments = Array.from(departementsRoot.getElementsByTagName('departement'));
    remainingDepartments.forEach((deptEl) => {
      Array.from(deptEl.getElementsByTagName('dep_task')).forEach((el) => {
        const id = el.getAttribute('id');
        if (id) usedTaskIds.add(id);
      });
      Array.from(deptEl.getElementsByTagName('dep_document')).forEach((el) => {
        const id = el.getAttribute('id');
        if (id) usedDocumentIds.add(id);
      });
      Array.from(deptEl.getElementsByTagName('taskdoc')).forEach((el) => {
        const id = el.getAttribute('id');
        if (id) usedDocumentIds.add(id);
      });
      Array.from(deptEl.getElementsByTagName('postedoc')).forEach((el) => {
        const id = el.getAttribute('id');
        if (id) usedDocumentIds.add(id);
      });
      Array.from(deptEl.getElementsByTagName('dep_poste')).forEach((el) => {
        const id = el.getAttribute('id');
        if (id) usedPosteIds.add(id);
      });
    });
    const filterGlobalCollection = (containerTag, itemTag, allowedIds) => {
      const container = xmlDoc.getElementsByTagName(containerTag)[0];
      if (!container) return;
      const entries = Array.from(container.getElementsByTagName(itemTag));
      entries.forEach((entry) => {
        const id = entry.getAttribute('id');
        if (!allowedIds.has(id)) {
          entry.remove();
        }
      });
      if (container.getElementsByTagName(itemTag).length === 0) {
        container.remove();
      }
    };
    filterGlobalCollection('tasks', 'task', usedTaskIds);
    filterGlobalCollection('documents', 'document', usedDocumentIds);
    filterGlobalCollection('postes', 'poste', usedPosteIds);
    return new XMLSerializer().serializeToString(xmlDoc);
  }
  async exportAsXML(includeAll) {
    const fullXml = this.xmlParser.exportToXML();
    const xmlToExport = includeAll ? fullXml : this.filterXMLToVisibleDepartments(fullXml);
    const blob = new Blob([xmlToExport], { type: 'application/xml;charset=utf-8;' });
    this.downloadFile(blob, 'organigramme.xml');
  }
    async svgToCanvas(svgElement, scale = 1) {
    return new Promise((resolve, reject) => {
        const svgForRaster = svgElement.cloneNode(true);
        const baseWidth = parseFloat(svgForRaster.getAttribute('width')) || 800;
        const baseHeight = parseFloat(svgForRaster.getAttribute('height')) || 600;
        const finalWidth = Math.max(Math.round(baseWidth * scale), 1);
        const finalHeight = Math.max(Math.round(baseHeight * scale), 1);
        // Forcer une rasterisation à la taille finale (évite les traits flous en JPEG)
        svgForRaster.setAttribute('width', finalWidth);
        svgForRaster.setAttribute('height', finalHeight);
        if (!svgForRaster.getAttribute('viewBox')) {
          svgForRaster.setAttribute('viewBox', `0 0 ${baseWidth} ${baseHeight}`);
        }
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgForRaster);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = finalWidth;
        canvas.height = finalHeight;
        const img = new Image();
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        img.onload = () => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas);
        };
        img.onerror = (error) => {
        URL.revokeObjectURL(url);
        reject(new Error(`Erreur de chargement de l'image SVG: ${error.message}`));
        };
        img.src = url;
    });
    }
  downloadFile(fileSource, filename) {
    if (typeof navigator !== 'undefined' && typeof navigator.msSaveOrOpenBlob === 'function' && fileSource instanceof Blob) {
      navigator.msSaveOrOpenBlob(fileSource, filename);
      return;
    }
    const link = document.createElement('a');
    link.download = filename;
    const objectUrl = fileSource instanceof Blob ? URL.createObjectURL(fileSource) : fileSource;
    link.href = objectUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (fileSource instanceof Blob) {
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
    }
  }
  showLoadingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'export-loading';
    indicator.className = 'export-loading';
    indicator.innerHTML = `
      <div class="export-loading-spinner"></div>
      <p>Export en cours...</p>
    `;
    document.body.appendChild(indicator);
  }
  hideLoadingIndicator() {
    const indicator = document.getElementById('export-loading');
    if (indicator) {
      indicator.remove();
    }
  }
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `export-notification export-notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.classList.add('export-notification-show');
    }, 10);
    setTimeout(() => {
      notification.classList.remove('export-notification-show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  destroy() {
      if (this.exportDialog) {
          this.exportDialog.remove();
          this.exportDialog = null;
      }
      const loadingIndicator = document.getElementById('export-loading');
      if (loadingIndicator) {
          loadingIndicator.remove();
      }
      const styles = document.getElementById('export-manager-styles');
      if (styles) {
          styles.remove();
      }
  }
  updateModalTranslations() {
      const dialog = document.getElementById('export-dialog');
      if (!dialog) return;
      // Mettre à jour le titre de la boîte de dialogue
      const title = dialog.querySelector('.export-dialog-header h3');
      if (title) title.textContent = this.translate('exportTitle');
      // Mettre à jour les labels des champs
      const formatLabel = dialog.querySelector('label[for="export-format"]');
      if (formatLabel) formatLabel.textContent = this.translate('exportFormat');
      const qualityLabel = dialog.querySelector('label[for="export-quality"]');
      if (qualityLabel) qualityLabel.textContent = this.translate('exportQuality');
      const scaleLabel = dialog.querySelector('label[for="export-scale"]');
      if (scaleLabel) scaleLabel.textContent = this.translate('exportScale');
      // Mettre à jour les options du format
      const formatOptions = dialog.querySelectorAll('#export-format option');
      const formatKeys = ['png', 'jpeg', 'svg', 'xls', 'xml'];
      formatOptions.forEach((option, index) => {
          if (formatKeys[index]) {
              option.textContent = this.translate(formatKeys[index], 'exportFormats');
          }
      });
      // Mettre à jour les options de qualité
      const qualityOptions = dialog.querySelectorAll('#export-quality option');
      const qualityKeys = ['low', 'medium', 'high'];
      qualityOptions.forEach((option, index) => {
          if (qualityKeys[index]) {
              option.textContent = this.translate(qualityKeys[index], 'qualityOptions');
          }
      });
      // Mettre à jour les cases à cocher
      const checkboxLabels = dialog.querySelectorAll('.export-checkbox label');
      const checkboxKeys = ['exportBackground', 'exportIncludeAll'];
      checkboxLabels.forEach((label, index) => {
          if (checkboxKeys[index]) {
              // Trouver le texte après la checkbox
              const checkbox = label.querySelector('input[type="checkbox"]');
              if (checkbox) {
                  // Supprimer tous les nœuds texte après la checkbox
                  let foundCheckbox = false;
                  Array.from(label.childNodes).forEach(node => {
                      if (node === checkbox) {
                          foundCheckbox = true;
                      } else if (foundCheckbox && node.nodeType === Node.TEXT_NODE) {
                          node.textContent = this.translate(checkboxKeys[index]);
                      }
                  });
              }
          }
      });
      // Mettre à jour les boutons
      const cancelBtn = dialog.querySelector('.export-btn-cancel');
      if (cancelBtn) cancelBtn.textContent = this.translate('cancelButton');
      const exportBtn = dialog.querySelector('.export-btn-primary');
      if (exportBtn) exportBtn.textContent = this.translate('exportButton');
      // Mettre à jour le bouton de fermeture (attribut aria-label)
      const closeBtn = dialog.querySelector('.export-dialog-close');
      if (closeBtn) closeBtn.setAttribute('aria-label', this.translate('cancelButton'));
      // Mettre à jour les notifications si elles existent
      const loadingIndicator = document.getElementById('export-loading');
      if (loadingIndicator) {
          const loadingText = loadingIndicator.querySelector('p');
          if (loadingText) loadingText.textContent = this.lng === 'fr' ? 'Export en cours...' : 'Export in progress...';
      }
  }
}
