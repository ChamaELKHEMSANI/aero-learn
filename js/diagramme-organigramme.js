class DiagrammeOrganigramme {
  constructor(xmlParser, bModal) {
    this.xmlParser = xmlParser;
    this.bModal = bModal;
    this.lng = "en";
    this.bControlsEnabled = true;
    this.display_mode = null;
    this.querySelect = null;
    this.queryModal = null;
    this.queryDetails = null;
    this.dataRef = null;
    this.selectedNode = null;
    this.showToolBadges = true;
    this.pinned = null;
    this.activeAnchorEl = null;
    this.hoverOnTooltip = false;
    this.hideTimer = null;
    this.root = null;
    this.blBadgeTasks=false;
    this.blBadgeDocs=false;
    this.blBadgePosts=false;
    this.blBadgeAbbrev=true;
    this.isPreviewCreated = false;
    this.debugMode = false; 
    this.animation =true;
    this.svg = null;
    this.gRoot = null;
    this.gLinksHalo = null;
    this.gLinks = null;
    this.gNodes = null;
    this.zoom = null;
    this.HOME = null;
    this.dragEnabled = false;
    this.isDragging = false;
    this.dragSource = null;
    this.dragTarget = null;
    this.dragPreview = null;
    this.dropIndicator = null;
    this.ctrlKeyPressed = false;
    this.dragOffset = null; 
    this.resizingEnabled = false;
    this.resizingNode = null;
    this.resizeHandle = null;
    this.resizeStartX = 0;
    this.resizeStartY = 0;
    this.resizeStartWidth = 0;
    this.resizeStartHeight = 0;
    this.resizeDirection = null;
    this.moveStartX = 0;
    this.moveStartY = 0;
    this.moveStartOffsetX = 0;
    this.moveStartOffsetY = 0;
    this.TREE_ORIENTATION = {
      organigram: {
        dx: 100,
        dy: 400,
        separation: (a, b) => (a.parent === b.parent ? 1.1 : 1.3),
      },
      "reverse-tree": {
        dx: 280,
        dy: 120,
        separation: (a, b) => (a.parent === b.parent ? 1.1 : 1.2), 
      },
      "reverse-tree-classroom": {
        dx: 245,
        dy: 118,
        separation: (a, b) => (a.parent === b.parent ? 1.08 : 1.16),
      },
    };
    this.MAX_TEXT_W = 220;
    this.PAD_X = 4;
    this.PAD_Y = 16;
    this.scrollbar = {
      x: null,
      y: null,
      container: null,
      zoomBtn: null,
      zoomOutBtn: null,
      fitBtn: null,
      expandAllBtn: null,
      collapseAllBtn: null,
      toggleBtn: null,
      isDraggingX: false,
      isDraggingY: false,
      isCollapsed: false,
    };
    this.translations = {
      fr: {
        levelSelector: "Niveau",
        level1: "Niveau 1",
        level2: "Niveau 2",
        level3: "Niveau 3",
        level4: "Niveau 4",
        level5: "Niveau 5",
        allLevels: "Tous",
        detailsTitle: "Détails du Département",
        toggleControls: "Masquer/Afficher les contrôles",
        showControls: "Afficher les contrôles",
        hideControls: "Masquer les contrôles",
        collapseAll: "Tout regrouper",
        expandAll: "Tous déployer",
        zoomIn: "Zoom avant",
        zoomOut: "Zoom arrière",
        fitToScreen: "Adapter à l'écran",
        resetView: "Réinitialiser la vue",
        error: "Erreur",
        checkProvider: "Vérifiez que le fournisseur est accessible.",
        noData: "Données non disponibles",
        companyName: "Compagnie Aérienne",
        companyDescription:"Structure organisationnelle de la compagnie aérienne",
        noName: "Sans nom",
        noDescription: "Aucune description",
        undefinedType: "non défini",
        badgeDocs: "Docs",
        badgePositions: "Postes",
        noDocuments: "Aucun document ou réglementation",
        noPositions: "Aucun poste défini",
        documentsTitle: "Documents et Réglementations",
        positionsTitle: "Postes",
        labelDocument: "Document",
        labelRegulation: "Réglementation",
        searchError: "Arbre non initialisé",
        departmentNotFound: "Département non trouvé:",
        noDepartmentFound: "Aucun département trouvé avec le nom ou acronyme:",
        documentsLabel: "Documents",
        positionsLabel: "Postes",
        childCount: "sous-département(s)",
        badgeTasks: "Tâches",
        noTasks: "Aucune tâche définie",
        tasksTitle: "Tâches",
        typeLabels: {
          direction: "Direction",
          operationnel: "Opérationnel",
          commercial: "Commercial",
          support: "Support",
          technique: "Technique",
          formation: "Formation",
          conformite: "Conformité",
          strategique: "Stratégique",
          economique: "Économique",
          organisation: "Organisation",
        },
      },
      en: {
        levelSelector: "Level",
        level1: "Level 1",
        level2: "Level 2",
        level3: "Level 3",
        level4: "Level 4",
        level5: "Level 5",
        allLevels: "All",
        detailsTitle: "Department Details",
        collapseAll: "Collapse all",
        expandAll: "Expand all",
        toggleControls: "Hide/Show controls",
        showControls: "Show controls",
        hideControls: "Hide controls",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        fitToScreen: "Fit to screen",
        resetView: "Reset view",
        error: "Error",
        checkProvider: "Check that the provider is accessible.",
        noData: "Data not available",
        companyName: "Airline Company",
        companyDescription: "Organizational structure of the airline company",
        noName: "No name",
        noDescription: "No description",
        undefinedType: "undefined",
        badgeDocs: "Docs",
        badgePositions: "Positions",
        noDocuments: "No documents or regulations",
        noPositions: "No positions defined",
        documentsTitle: "Documents and Regulations",
        positionsTitle: "Positions",
        labelDocument: "Document",
        labelRegulation: "Regulation",
        searchError: "Tree not initialized",
        departmentNotFound: "Department not found:",
        noDepartmentFound: "No department found with name or acronym:",
        documentsLabel: "Documents",
        positionsLabel: "Positions",
        childCount: "sub-department(s)",
        badgeTasks: "Tasks",
        noTasks: "No tasks defined",
        tasksTitle: "Tasks",
        typeLabels: {
          direction: "Direction",
          operationnel: "Operational",
          commercial: "Commercial",
          support: "Support",
          technique: "Technical",
          formation: "Training",
          conformite: "Compliance",
          strategique: "Strategic",
          economique: "Economic",
          organisation: "Organization",
        },
      },
    };
  }
  initialize(    lng,    display_mode,    querySelect,    queryModal,    queryDetails,    bControlsEnabled  ) {
    this.lng = lng || "en";
    this.bControlsEnabled = bControlsEnabled;
    this.querySelect = querySelect;
    this.queryModal = queryModal;
    this.queryDetails = queryDetails;
    this.display_mode = display_mode;
    this.init();
    this.initializeChart();
  }
  setLang(lng) {
    this.lng = lng || "en";
    this.updateInterfaceLanguage();
    this.initializeChart();
    }
  updateBadgeVisibility (showBadges){
    this.blBadgeDocs=showBadges.documents;
    this.blBadgeTasks=showBadges.tasks;
    this.blBadgePosts=showBadges.positions;
    this.blBadgeAbbrev=showBadges.abreviation;
    if (this.root) {
      this.updateTreeBadges();
    }    
    }
  setBadgeDocsEnabled(enabled) {
    this.blBadgeDocs = enabled;
    if (this.root) {
      this.updateTreeBadges();
    }
  }
  setBadgeTasksEnabled(enabled) {
    this.blBadgeTasks = enabled;
    if (this.root) {
      this.updateTreeBadges();
    }
  }
  setBadgePostsEnabled(enabled) {
    this.blBadgePosts = enabled;
    if (this.root) {
      this.updateTreeBadges();
    }
  }
  updateTreeBadges() {
    const nodes = this.gNodes.selectAll("g.node");
    nodes.each((d, i, nodesArray) => {
      const nodeGroup = d3.select(nodesArray[i]);
      this.refreshCard(nodeGroup.select(".node-card"), d);
    });
  }
  isReverseTreeMode(displayMode = this.display_mode) {
    return (
      displayMode === "reverse-tree" ||
      displayMode === "reverse-tree-classroom"
    );
  }
  isClassroomMode(displayMode = this.display_mode) {
    return displayMode === "reverse-tree-classroom";
  }
  getLayoutMetrics(displayMode = this.display_mode) {
    if (this.isClassroomMode(displayMode)) {
      return {
        maxTextWidth: 410,
        padX: 14,
        padY: 100,
        parentChildGap: 420,
        titleFontSize: 28,
        titleLineHeight: 32,
        minHeight: 200,
        topInset: 22,
        bottomInset: 18,
        titleTopPadding: 8,
        textInsetX: 24,
        textInsetTop: 24,
        textInsetBottom: 36,
        borderWidth: 4,
        linkWidth: 4,
        linkHaloWidth: 8,
        toggleHitAreaSize: 40,
        toggleIconWidth: 9,
        toggleIconHeight: 5,
        toggleStrokeWidth: 2.5,
        toggleOutlineWidth: 2,
        fixedBoxWidth: 237,
        fixedBoxHeight: 220,
        maxTitleLines: 4,
      };
    }
      return {
      maxTextWidth: this.MAX_TEXT_W,
      padX: this.PAD_X,
      padY: this.PAD_Y,
        borderWidth: 1.5,
        linkWidth: 2.5,
        linkHaloWidth: 12,
        toggleHitAreaSize: 24,
        toggleIconWidth: 6,
        toggleIconHeight: 3,
        toggleStrokeWidth: 1.5,
        toggleOutlineWidth: 0,
        titleFontSize: 16,
        titleLineHeight: 16,
        minHeight: 54,
        topInset: 24,
        bottomInset: 12,
        titleTopPadding: 0,
        textInsetX: this.PAD_X,
        textInsetTop: 0,
        textInsetBottom: 0,
      };
  }
  getTransition(duration = 420) {
      if (this.animation) {
          return d3.transition().duration(duration);
      } else {
          return d3.transition().duration(0);
      }
  }
  applyTransform(t, duration = 420) {
      if (this.animation) {
          this.svg
              .transition()
              .duration(duration)
              .ease(d3.easeCubicOut)
              .call(this.zoom.transform, t);
      } else {
          this.svg.call(this.zoom.transform, t);
      }
  }
  setAnimationEnabled(enabled) {
      this.animation = enabled;
      if (this.root) {
         this.update(this.root);
      }
  }
  updateInterfaceLanguage() {
    const detailsTitle = document.querySelector(".panel-header h3");
    if (detailsTitle) {
      detailsTitle.textContent = this.translate("detailsTitle");
    }
    const errorDiv = document.querySelector("#no-data");
    if (errorDiv && errorDiv.style.display !== "none") {
      errorDiv.textContent = this.translate("noData");
    }
    if (this.root) {
      this.updateTreeLanguage();
    }
  }
  updateTreeLanguage() {
    const nodes = this.gNodes.selectAll("g.node");
    nodes.each((d, i, nodesArray) => {
      const nodeGroup = d3.select(nodesArray[i]);
      this.refreshCard(nodeGroup.select(".node-card"), d);
    });
    if (this.pinned && this.activeAnchorEl) {
      const node = this.findNodeById(this.root, this.pinned.id);
      if (node) {
        const nodeData = node.data.data;
        const html =
          this.pinned.type === "attr"
            ? this.renderFichiersHTML(nodeData)
            : this.renderPostesHTML(nodeData);
        this.tooltip.html(html);
        this.positionTooltipFor(this.activeAnchorEl);
      }
    }
  }
  translate(key, context = null) {
    if (
      context &&
      this.translations[this.lng] &&
      this.translations[this.lng][context]
    ) {
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
  showError(messageError) {
    document.getElementById("main-container-diagramme").innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                <h2>${this.translate("error")}</h2>
                <p>${messageError}</p>
                <p>${this.translate("checkProvider")}</p>
            </div>
        `;
  }
  init() {
    let textDetails = "";
    let textheight = `style="height:calc(100vh - 90px);"`;
    if (this.bControlsEnabled == false)
      textheight = `style="height:calc(100vh - 5px);"`;
    if (!this.bModal)
      textDetails = `<div id="details-panel" ${textheight} style="display:none;">
                <div class="panel-header">
                    <h3>${this.translate("detailsTitle")}</h3>
                    <div class="panel-actions">
                      <button id="details-panel-close-btn" class="panel-action-btn" type="button" title="Fermer">×</button>
                    </div>
                </div>
                <div id="panneau-documents"></div>
            </div>`;
    document.getElementById("main-container-diagramme").innerHTML = `
        <div class="main-container" ${textheight}>
            <div id="chart-container">
            <div id="chart" ${textheight}>
                <div id="no-data" style="display:none">${this.translate(
      "noData"
    )}</div>
            </div>
            </div>
            ${textDetails}
        </div>     
        `;
    if (this.queryDetails && !this.bModal) {
      this.queryDetails.init();
    }
    if (!this.bModal) {
      const closeBtn = document.getElementById("details-panel-close-btn");
      const detailsPanel = document.getElementById("details-panel");
      if (closeBtn && detailsPanel) {
        closeBtn.addEventListener("click", () => {
          detailsPanel.style.display = "none";
        });
      }
    }
  }
  getAbrev(d) {
    const abbreviation = d?.data?.data?.abbreviation;
    if (abbreviation && abbreviation.trim() !== "") {
      return abbreviation.trim();
    }
    return "";
  }
    getAbrev_desc(d) {
    const abbrevDetails = d?.data?.data?.abbrev_details;
    if (abbrevDetails && abbrevDetails.trim() !== "") {
      return abbrevDetails.trim();
    }
    return "";
  }
  parseXMLToD3(xmlData) {
    if (!xmlData || !xmlData.nodes) {
      console.error("Données XML non disponibles");
      return null;
    }
    const nodes = xmlData.nodes;
    const nodeMap = new Map();
    const d3Nodes = [];
    for (const node of nodes) {
      const d3Node = {
        id: node.id,
        data: {
          nom: node.nom,
          id: node.id,
          type: node.type,
          abbreviation: node.abbreviation || "",
          abbrev_details: node.abbrev_details || "",
          background_color: node.background_color || "",
          description: node.description || "",
          responsable: node.responsable || "",
          note: node.note || "",
          postes: node.postes || [],
          fichiers: node.fichiers || [],
          tasks: node.tasks || [],
          taskPosteAssociations: node.taskPosteAssociations || new Map(),
          posteTaskAssociations: node.posteTaskAssociations || new Map(),
          xmlElement: node.xmlElement,
        },
        parent: node.parent === "null" || !node.parent ? null : node.parent,
        children: [],
      };
      d3Nodes.push(d3Node);
      nodeMap.set(node.id, d3Node);
    }
    const rootNodes = [];
    for (const node of d3Nodes) {
      if (!node.parent) {
        rootNodes.push(node);
      } else {
        const parentNode = nodeMap.get(node.parent);
        if (parentNode) {
          if (!parentNode.children) parentNode.children = [];
          parentNode.children.push(node);
        } else {
          console.warn(
            `Parent non trouvé pour ${node.id}, traitement comme racine`
          );
          rootNodes.push(node);
        }
      }
    }
    if (rootNodes.length === 1) {
      return rootNodes[0];
    } else if (rootNodes.length > 1) {
      return {
        id: "root",
        data: {
          nom: this.translate("companyName"),
          id: "ROOT",
          type: "organisation",
          abbreviation: "ROOT",
          description: this.translate("companyDescription"),
        },
        children: rootNodes,
      };
    } else {
      console.error("Aucun nœud racine trouvé");
      return null;
    }
  }
  async initializeChart() {
    const nodata = document.getElementById("no-data");
    if (!this.xmlParser || !this.xmlParser.isloadXML()) {
      if (nodata) nodata.style.display = "flex";
      console.error("XMLParser non initialisé");
      return;
    }
    this.clearDiagramme();
    const host = document.getElementById("main-container-diagramme");
    if (host) {
        host.innerHTML = '';
    }
    this.init();
    const xmlData = this.xmlParser.data;
    if (!xmlData) {
      if (nodata) nodata.style.display = "flex";
      console.error("Données XML non disponibles");
      return;
    }
    this.dataRef = this.parseXMLToD3(xmlData);
    if (!this.dataRef) {
      if (nodata) nodata.style.display = "flex";
      console.error("Erreur lors de la conversion des données XML");
      return;
    }
    if (nodata) nodata.style.display = "none";
    this.startOrgChart(this.dataRef, this.display_mode || "organigramme");
      if (window.editModeManager && window.editModeManager.isEditMode) {
      this.setDragMode(true);
    }  
  }
  startOrgChart(dataRef, displayMode) {
    const baseConfig =
      this.TREE_ORIENTATION[displayMode] || this.TREE_ORIENTATION.organigramme;
    const metrics = this.getLayoutMetrics(displayMode);
    const config = {
      ...baseConfig,
      dy: metrics.parentChildGap ?? baseConfig.dy,
    };
    const host = document.getElementById("chart");
    host.classList.toggle("mode-classroom", this.isClassroomMode(displayMode));
    host.style.setProperty(
      "--org-node-stroke-width",
      `${metrics.borderWidth ?? 1.5}px`
    );
    host.style.setProperty(
      "--org-link-stroke-width",
      `${metrics.linkWidth ?? 2.5}px`
    );
    host.style.setProperty(
      "--org-link-halo-width",
      `${metrics.linkHaloWidth ?? 12}px`
    );
    const detailsPanel = document.getElementById("details-panel");
    const panelContent = document.getElementById("panel-content");
    const departmentDetails = document.querySelector(".department-details");
    const noSelection = document.querySelector(".no-selection");
    host.innerHTML = "";
    const existingTooltips = host.querySelectorAll('.attr-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
    const existingSVGs = host.querySelectorAll('svg');
    existingSVGs.forEach(svg => svg.remove());
    this.svg = d3
      .select(host)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    this.gRoot = this.svg.append("g");
    this.gLinksHalo = this.gRoot.append("g").attr("class", "links-halo");
    this.gLinks = this.gRoot.append("g").attr("class", "links");
    this.gNodes = this.gRoot.append("g").attr("class", "nodes");
    this.tooltip = d3
      .select("#chart")
      .append("div")
      .attr("class", "attr-tooltip");
    this.createScrollbars();
    this.setupControlPanelHover();
    this.setupEventHandlers(displayMode, config);
    this.renderTree(dataRef, displayMode, config);
    if (!this.bModal && detailsPanel) {
      detailsPanel.style.display = "none";
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.autoFit();
        this.updateScrollbars();
      });
    });
  }
  zoomIn() {
      if (!this.svg || !this.zoom) return;
      const transform = d3.zoomTransform(this.svg.node());
      const newScale = Math.min(2.6, transform.k * 1.2);
      const newTransform = d3.zoomIdentity
          .translate(transform.x, transform.y)
          .scale(newScale);
      if (this.animation) {
          this.svg.transition().duration(300).call(this.zoom.transform, newTransform);
      } else {
          this.svg.call(this.zoom.transform, newTransform);
      }
  }
  zoomOut() {
      if (!this.svg || !this.zoom) return;
      const transform = d3.zoomTransform(this.svg.node());
      const newScale = Math.max(0.2, transform.k / 1.2);
      const newTransform = d3.zoomIdentity
          .translate(transform.x, transform.y)
          .scale(newScale);
      if (this.animation) {
          this.svg.transition().duration(300).call(this.zoom.transform, newTransform);
      } else {
          this.svg.call(this.zoom.transform, newTransform);
      }
  }
  resetView() {
    if (this.HOME) {
      this.applyTransform(this.HOME);
    } else {
      this.fitToScreen(80, true);
    }
  }
setupEventHandlers(displayMode, config) {
  this.zoom = d3
    .zoom()
    .scaleExtent([0.2, 2.6])
    .on("zoom", (ev) => {
      const constrained = this.constrainTransformTop(ev.transform);
      const wasClamped = Math.abs(constrained.y - ev.transform.y) > 0.5;
      if (wasClamped && !this._isClampingZoomTransform) {
        this._isClampingZoomTransform = true;
        this.svg.call(this.zoom.transform, constrained);
        this._isClampingZoomTransform = false;
        return;
      }
      this.gRoot.attr("transform", constrained);
      this.followAnchor();
      this.updateScrollbars();
    })
    .filter((event) => {
      const target = event.target;
      if (target.classList && (
          target.classList.contains('resize-handle') || 
          target.closest('.resize-handle'))) {
        return false; 
      }
      if (window.editModeManager && window.editModeManager.isEditMode) {
        if (target.closest('.node') || target.closest('.node *')) {
          return false;
        }
        if (target.closest('.zoom-control-panel') || target.closest('.drag-handle')) {
          return false;
        }
        return true;
      }
      return !target.closest || !target.closest('.zoom-control-panel');
    });
  this.svg.call(this.zoom);
  this.svg.on("dblclick.zoom", null);
  this.tooltip
    .on("mouseenter", (ev) => {
      this.hoverOnTooltip = true;
      this.cancelHideTimer();
    })
    .on("mouseleave", (ev) => {
      this.hoverOnTooltip = false;
      if (!this.pinned) this.scheduleHide(140);
    });
  document.addEventListener('click', (event) => this.handleDocumentClick(event));
  window.addEventListener("resize", () => {
    this.updateScrollbars();
  });
}
  renderTree(dataRef, displayMode, config) {
    let tree;
    if (this.isReverseTreeMode(displayMode)) {
      tree = d3
        .tree()
        .nodeSize([config.dx, config.dy])
        .separation(config.separation);
    } else {
      tree = d3
        .tree()
        .nodeSize([config.dx, config.dy])
        .separation(config.separation);
    }
    this.tree = tree;
    this.root = d3.hierarchy(dataRef);
    this.root.x0 = 0;
    this.root.y0 = 0;
    this.root.descendants().forEach((d) => {
      d._children = d.children;
      if (d.depth > 1) {
        d.children = null;
      }
    });
    this.update(this.root);
  }
update(source) {
    const displayMode = this.display_mode;
    this.tree(this.root);
    const nodes = this.root.descendants();
    const links = this.root.links();
    const linkKey = (d) =>
        d.target.data.id ||
        (d.target.data.id = Math.random().toString(36).slice(2));
    const linkHalo = this.gLinksHalo.selectAll("path").data(links, linkKey);
    linkHalo
        .enter()
        .append("path")
        .attr("class", "link-halo")
        .attr("d", (_) =>
            this.getLinkPath({ source: source, target: source }, displayMode)
        )
        .merge(linkHalo)
        .transition(this.getTransition(420))
        .attr("d", (d) => this.getLinkPath(d, displayMode));
    linkHalo
        .exit()
        .transition(this.getTransition(250))
        .attr("d", (_) => this.elbow(source, source))
        .remove();
    const link = this.gLinks.selectAll("path").data(links, linkKey);
    link
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("stroke", (d) => this.nodeColor(d.source))
        .attr("d", (_) =>
            this.getLinkPath({ source: source, target: source }, displayMode)
        )
        .merge(link)
        .transition(this.getTransition(420))
        .attr("stroke", (d) => this.nodeColor(d.source))
        .attr("d", (d) => this.getLinkPath(d, displayMode));
    link.exit().transition(this.getTransition(250)).remove();
    const nodeSel = this.gNodes
        .selectAll("g.node")
        .data(nodes, (d) => d.data.id);
    const enter = nodeSel
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (_) => {
            if (this.isReverseTreeMode(displayMode)) {
                return `translate(${source.x0},${source.y0})`;
            } else {
                return `translate(${source.y0},${source.x0})`;
            }
        })
        .style("opacity", 0);
    const card = enter.append("g").attr("class", "node-card");
    card.append("rect").attr("class", "node-rect");
    card.append("text").attr("class", "node-title");
    card.append("text").attr("class", "node-sub");
    card.append("path").attr("class", "toggle");
    card.append("rect").attr("class", "hit");
    const badge = card.append("g").attr("class", "badge");
    badge.append("rect").attr("class", "badge-bg");
    badge.append("text").attr("class", "badge-text");
    const countG = badge.append("g").attr("class", "count-pill");
    countG.append("rect").attr("rx", 7).attr("ry", 7);
    countG.append("text").attr("class", "count-tx");
    const typeBadge = card.append("g").attr("class", "type-badge");
    typeBadge.append("rect");
    typeBadge.append("text");
    enter.on("click", (ev, d) => {
        ev.stopPropagation();
        this.showDepartmentDetails(d);
    });
    enter.on("dblclick", (ev, d) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (window.editModeManager && window.editModeManager.isEditMode) {
            this.toggleResizeHandles(d);
        } else {
            const detailsPanel = document.getElementById("details-panel");
            if (detailsPanel && detailsPanel.style.display === "none") {
                detailsPanel.style.display = "flex";
                this.showDepartmentDetails(d);
            }
        }
    });
    enter.each((d, i, nodes) => {
        this.refreshCard(d3.select(nodes[i]).select(".node-card"), d);
    });
    const merged = enter.merge(nodeSel);
    merged.each((d, i, nodes) => {
      if (!d._box) {
      }
        this.refreshCard(d3.select(nodes[i]).select(".node-card"), d);
    });
    merged.on("click", (ev, d) => {
        ev.stopPropagation();
        this.showDepartmentDetails(d);
    });
    merged.on("dblclick", (ev, d) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (window.editModeManager && window.editModeManager.isEditMode) {
            this.toggleResizeHandles(d);
        } else {
            const detailsPanel = document.getElementById("details-panel");
            if (detailsPanel && detailsPanel.style.display === "none") {
                detailsPanel.style.display = "flex";
            }
        }
    });
    merged.selectAll(".toggle-hit-area").on("click", (ev, d) => {
        ev.stopPropagation();
        this.toggle(d);
    });
    merged
        .transition(this.getTransition(420))
        .attr("transform", (d) => this.getNodeTransform(d))
        .style("opacity", 1);
    nodeSel
        .exit()
        .transition(this.getTransition(250))
        .attr("transform", (_) => {
            if (this.isReverseTreeMode(displayMode)) {
                return `translate(${source.x},${source.y})`;
            } else {
                return `translate(${source.y},${source.x})`;
            }
        })
        .style("opacity", 0)
        .remove();
    this.syncSelectedNodeState();
    this.root.descendants().forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}
  refreshCard(selection, d) {
    const nodeData = d.data.data;
    const nom = nodeData.nom || this.translate("noName");
    const metrics = this.getLayoutMetrics();
    const isClassroomMode = this.isClassroomMode();
    const displayTitle = isClassroomMode ? nom.toLocaleUpperCase() : nom;
    const padX = metrics.padX;
    const truncateText = (text, maxWidth, fontSize = 20) => {
      if (!text) return "";
      const textElement = selection.append("text")
        .attr("font-size", fontSize + "px")
        .attr("font-weight", "600")
        .attr("visibility", "hidden")
        .text(text);
      const textWidth = textElement.node().getComputedTextLength();
      textElement.remove();
      if (textWidth <= maxWidth) return text;
      let low = 0;
      let high = text.length;
      let result = "";
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const testText = text.substring(0, mid) + "...";
        const testElement = selection.append("text")
          .attr("font-size", fontSize + "px")
          .attr("font-weight", "600")
          .attr("visibility", "hidden")
          .text(testText);
        const testWidth = testElement.node().getComputedTextLength();
        testElement.remove();
        if (testWidth <= maxWidth) {
          result = testText;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return result || "...";
    };
    let lines = 1;
    const titleEl = selection.select(".node-title").text("");
    if (isClassroomMode) {
      const estimateInsetX = metrics.textInsetX || padX;
      const estimateWidth = Math.max(
        40,
        (metrics.fixedBoxWidth || metrics.maxTextWidth) - estimateInsetX * 2
      );
      lines = this.wrap(titleEl, displayTitle, estimateWidth, {
        x: padX,
        y: 0,
        dy: metrics.titleLineHeight,
        maxLines: metrics.maxTitleLines,
      });
    }
    const titleH = Math.max(metrics.titleLineHeight, lines * metrics.titleLineHeight);
    let subH = 0;
    selection.select(".node-sub").text("");
    const abr = this.getAbrev(d);
    const abr_desc = this.getAbrev_desc(d);
    const fichiers = this.getFichiersArrayFromData(nodeData);
    const postes = this.getPostesArrayFromData(nodeData);
    const tasks = this.getTasksArrayFromData(nodeData);  
    selection.selectAll(".attr-badge").remove();
    selection.selectAll(".proc-badge").remove();
    selection.selectAll(".task-badge").remove();  
    let wFichier = 0,wPoste = 0,wTask = 0;  
    let fichierG = null,posteG = null,taskG = null;  
    if (!isClassroomMode && this.showToolBadges && this.blBadgeDocs && fichiers.length > 0) {
      fichierG = selection
        .append("g")
        .attr("class", "attr-badge")
        .attr("tabindex", 0);
      const labelFichier = `Doc(${fichiers.length})`;
      const tmpA = fichierG
        .append("text")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelFichier)
        .attr("visibility", "hidden");
      wFichier = Math.ceil(tmpA.node().getComputedTextLength()) + 14;
      tmpA.remove();
      fichierG
        .append("rect")
        .attr("width", wFichier)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#0e0622");
      fichierG
        .append("text")
        .attr("x", wFichier / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelFichier);
    }
    if (!isClassroomMode && this.showToolBadges && this.blBadgePosts && postes.length > 0) {
      posteG = selection
        .append("g")
        .attr("class", "proc-badge")
        .attr("tabindex", 0);
      const labelPoste = `Post(${postes.length})`;
      const tmpP = posteG
        .append("text")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelPoste)
        .attr("visibility", "hidden");
      wPoste = Math.ceil(tmpP.node().getComputedTextLength()) + 14;
      tmpP.remove();
      posteG
        .append("rect")
        .attr("width", wPoste)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#0e0622");
      posteG
        .append("text")
        .attr("x", wPoste / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelPoste);
    }
    if (!isClassroomMode && this.showToolBadges && this.blBadgeTasks && tasks.length > 0) {
      taskG = selection
        .append("g")
        .attr("class", "task-badge")
        .attr("tabindex", 0);
      const labelTask = `Task(${tasks.length})`;
      const tmpT = taskG
        .append("text")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelTask)
        .attr("visibility", "hidden");
      wTask = Math.ceil(tmpT.node().getComputedTextLength()) + 14;
      tmpT.remove();
      taskG
        .append("rect")
        .attr("width", wTask)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#0e0622");
      taskG
        .append("text")
        .attr("x", wTask / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelTask);
    }
    const gap = 6,
      marginSide = 8;
    const baseContentW = this.isClassroomMode()
      ? metrics.fixedBoxWidth
      : metrics.maxTextWidth + padX * 2;
    let contentW = baseContentW;
    if (!isClassroomMode && this.showToolBadges) {
      const badgesTotal =
        (posteG ? wPoste : 0) +
        (fichierG ? (posteG || taskG ? gap : 0) + wFichier : 0) +
        (taskG ? (posteG || fichierG ? gap : 0) + wTask : 0) +
        (posteG || fichierG || taskG ? gap : 0);
      const neededW = marginSide + badgesTotal + marginSide;
      contentW = Math.max(baseContentW, neededW);
    }
    const blockH = this.isClassroomMode()
      ? metrics.fixedBoxHeight
      : Math.max(
          metrics.topInset + titleH + subH + metrics.bottomInset,
          metrics.minHeight
        );
    const hasManualSize = Boolean(d._manualSize && d._box);
    const finalW = hasManualSize
      ? Math.max(120, d._box.w || contentW)
      : (this.isClassroomMode() ? metrics.fixedBoxWidth : contentW);
    let finalH = hasManualSize
      ? Math.max(40, d._box.h || blockH)
      : (this.isClassroomMode() ? metrics.fixedBoxHeight : blockH);
    const nodeRect = selection
      .select(".node-rect")
      .attr("x", 0)
      .attr("y", -finalH / 2)
      .attr("width", finalW)
      .attr("height", finalH)
      .attr("stroke", this.nodeColor(d))
      .attr("stroke-width", metrics.borderWidth)
      .attr("rx", 8)
      .attr("ry", 8);
    if (nodeData.background_color) {
      nodeRect.style("fill", nodeData.background_color);
    } else {
      nodeRect.style("fill", null);
    }
    titleEl
      .attr("x", finalW / 2)
      .attr("y", isClassroomMode ? -titleH / 2 : 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", isClassroomMode ? null : "middle")
      .attr("fill", "#1e293b")
      .attr("font-weight", "600")
      .attr("font-size", `${metrics.titleFontSize}px`)
      .style("font-size", `${metrics.titleFontSize}px`);
    if (isClassroomMode) {
      const textInsetX = metrics.textInsetX || padX;
      const textInsetTop = metrics.textInsetTop || 0;
      const textInsetBottom = metrics.textInsetBottom || 0;
      const availableWidth = Math.max(40, finalW - textInsetX * 2);
      const availableHeight = Math.max(
        metrics.titleLineHeight,
        finalH - textInsetTop - textInsetBottom
      );
      const maxTitleLines = Math.max(
        1,
        Math.min(
          metrics.maxTitleLines,
          Math.floor(availableHeight / metrics.titleLineHeight)
        )
      );
      lines = this.wrap(titleEl, displayTitle, availableWidth, {
        x: finalW / 2,
        y: 0,
        dy: metrics.titleLineHeight,
        maxLines: maxTitleLines,
      });
      const wrappedTitleH = Math.max(metrics.titleLineHeight, lines * metrics.titleLineHeight);
      const titleStartY =
        -finalH / 2 +
        textInsetTop +
        Math.max(0, (availableHeight - wrappedTitleH) / 2) +
        (metrics.titleTopPadding || 0);
      this.wrap(titleEl, displayTitle, availableWidth, {
        x: finalW / 2,
        y: titleStartY,
        dy: metrics.titleLineHeight,
        maxLines: maxTitleLines,
      });
    } else {
      titleEl.text(
        truncateText(displayTitle, Math.max(20, finalW - padX * 2), metrics.titleFontSize)
      );
    }
    selection
      .select(".node-sub")
      .attr("x", padX)
      .attr("y", -finalH / 2 + 24 + titleH + 4)
      .attr("fill", "#64748b")
      .attr("font-size", "20px");
    selection
      .select(".hit")
      .attr("x", -10)
      .attr("y", -finalH / 2 - 6)
      .attr("width", finalW + 20)
      .attr("height", finalH + 12)
      .attr("fill", "transparent");
    if (!isClassroomMode && abr != "" && this.blBadgeAbbrev) {
      const typeG = selection.select(".type-badge");
      typeG.style("display", null);
      const typeTextEl = typeG.select("text").text(abr);
      const typeTextW = Math.max(12, typeTextEl.node().getComputedTextLength());
      const typeW = typeTextW + 8;
      typeG
        .select("rect")
        .attr("x", 4)
        .attr("y", -finalH / 2 + 4)
        .attr("width", typeW)
        .attr("height", 16)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", this.nodeColor(d))
        .attr("opacity", 0.9);
      typeG
        .select("text")
        .attr("x", 4 + typeW / 2)
        .attr("y", -finalH / 2 + 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "9px")
        .attr("font-weight", 600)
        .text(abr);
      typeG
        .attr("class", "type-badge abbrev-badge")
        .attr("tabindex", 0)
        .on("mouseenter", (evt) => {
          evt.stopPropagation();
          this.cancelHideTimer();
          if (abr_desc) {
            const html = `<div class="abbrev-tooltip">
              <h4>${abr}</h4>
              <p>${abr_desc}</p>
            </div>`;
            this.setTooltip(html, evt.currentTarget, false);
          }
        })
        .on("mouseleave", (evt) => {
          evt.stopPropagation();
          this.scheduleHide(200);
        })
        .on("click", (evt) => {
          evt.stopPropagation();
          if (abr_desc) {
            const html = `<div class="abbrev-tooltip">
              <h4>${abr}</h4>
              <p>${abr_desc}</p>
            </div>`;
            this.setTooltip(html, evt.currentTarget, true);
          }
        });
    } else {
      selection
        .select(".type-badge")
        .style("display", "none")
        .on("mouseenter", null)
        .on("mouseleave", null)
        .on("click", null);
    }
    let cxToggle = 0;
    let cyToggle = 0;
    if (this.isReverseTreeMode()) {
      cxToggle = finalW / 2;
      cyToggle = finalH / 2 - 10;
    } else {
      cxToggle = finalW - 12;
      cyToggle = 0;
    }
    const toggleIconWidth = metrics.toggleIconWidth || 6;
    const toggleIconHeight = metrics.toggleIconHeight || 3;
    const isOpen = Array.isArray(d.children) && d.children.length > 0;
    const path = isOpen
      ? `M ${cxToggle - toggleIconWidth},${cyToggle - toggleIconHeight} L ${cxToggle},${cyToggle + toggleIconHeight} L ${cxToggle + toggleIconWidth
      },${cyToggle - toggleIconHeight} Z`
      : `M ${cxToggle - toggleIconWidth},${cyToggle + toggleIconHeight} L ${cxToggle},${cyToggle - toggleIconHeight} L ${cxToggle + toggleIconWidth
      },${cyToggle + toggleIconHeight} Z`;
    selection
      .select(".toggle")
      .attr("d", path)
      .attr("fill", "#64748b")
      .attr("stroke", isClassroomMode ? "#475569" : "none")
      .attr("stroke-width", metrics.toggleStrokeWidth || 1.5)
      .style("display", this.hasDataKids(d) ? null : "none");
    selection.selectAll(".toggle-hit-area").remove();
    const toggleHitAreaSize = metrics.toggleHitAreaSize || 24;
    const toggleHitAreaOffset = toggleHitAreaSize / 2;
    const toggleHitArea = selection
      .append("rect")
      .attr("class", "toggle-hit-area")
      .attr("x", cxToggle - toggleHitAreaOffset)
      .attr("y", cyToggle - toggleHitAreaOffset)
      .attr("width", toggleHitAreaSize)
      .attr("height", toggleHitAreaSize)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("fill", isClassroomMode ? "rgba(255,255,255,0.01)" : "transparent")
      .attr("stroke", isClassroomMode ? "#94a3b8" : "none")
      .attr("stroke-width", metrics.toggleOutlineWidth || 0)
      .style("display", this.hasDataKids(d) ? null : "none")
      .style("cursor", "pointer");
    if (!isClassroomMode && this.showToolBadges) {
      let startX = finalW - marginSide;
      if (taskG) {
        startX -= wTask;
        taskG.attr("transform", `translate(${startX},${-finalH / 2 -10})`);
        startX -= gap;
      }
      if (fichierG) {
        startX -= wFichier;
        fichierG.attr("transform", `translate(${startX},${-finalH / 2  -10})`);
        startX -= gap;
      }
      if (posteG) {
        startX -= wPoste;
        posteG.attr("transform", `translate(${startX},${-finalH / 2 -10})`);
      }
      if (this.blBadgePosts && posteG) {
        this.bindBadgeEvents(posteG, d, "proc", nodeData);
      }
      if (this.blBadgeDocs && fichierG) {
        this.bindBadgeEvents(fichierG, d, "attr", nodeData);
      }
      if (this.blBadgeTasks && taskG) {
        this.bindBadgeEvents(taskG, d, "task", nodeData);
      }
    }
    d._box = { w: finalW, h: finalH };
  }
  wrap(sel, text, maxWidth, options = {}) {
    if (!text) return 0;
    const words = text.split(/\s+/).filter(Boolean);
    sel.text(null);
    const maxLines = options.maxLines ?? Infinity;
    let line = [],
      lineNumber = 0;
    const x = options.x ?? this.PAD_X;
    const y = options.y ?? 15;
    const dy = options.dy ?? 16;
    let tspan = sel
      .append("tspan")
      .attr("x", x)
      .attr("y", y)
      .attr("dy", 0);
    for (let i = 0; i < words.length; i++) {
      const testLine = line.concat(words[i]).join(" ");
      tspan.text(testLine);
      if (tspan.node().getComputedTextLength() > maxWidth && line.length > 0) {
        if (lineNumber + 1 >= maxLines) {
          const remaining = line.join(" ") || words[i];
          let truncated = remaining;
          while (truncated.length > 0) {
            tspan.text(`${truncated}...`);
            if (tspan.node().getComputedTextLength() <= maxWidth) break;
            truncated = truncated.slice(0, -1).trimEnd();
          }
          if (!truncated) {
            tspan.text("...");
          }
          return maxLines;
        }
        tspan.text(line.join(" "));
        line = [words[i]];
        tspan = sel
          .append("tspan")
          .attr("x", x)
          .attr("dy", dy)
          .text(words[i]);
        lineNumber++;
      } else {
        line.push(words[i]);
      }
    }
    return lineNumber + 1;
  }
  getAcr(d) {
    return (d?.data?.id ?? "").toString().trim();
  }
  dataKidsCount(d) {
    return Array.isArray(d.children || d._children || [])
      ? (d.children || d._children || []).length
      : 0;
  }
  hasDataKids(d) {
    return this.dataKidsCount(d) > 0;
  }
  renderTasksHTML(data) {
    const items = this.getTasksArrayFromData(data);
    if (items.length === 0) return `<p>${this.translate("noTasks")}</p>`;
    const itemsHTML = items
      .map((x) => {
        const status = x.statut ? ` [${x.statut}]` : '';
        const dueDate = x.dateEcheance ? ` (échéance: ${x.dateEcheance})` : '';
        return `<li><strong>${x.nom}</strong>${status}${dueDate}</li>`;
      })
      .join("");
    const acr = data.id || data.nom || "";
    return `<h4>${this.translate(
      "tasksTitle"
    )} - ${acr}</h4><ol>${itemsHTML}</ol>`;
  } 
  getFichiersArrayFromData(data) {
    return data?.fichiers || [];
  }
  getPostesArrayFromData(data) {
    return data?.postes || [];
  }
  getTasksArrayFromData(data) {
    return data?.tasks || [];
  }
  rightX(d) {
    return this.getNodeDisplayX(d) + ((d._box && d._box.w) || (this.MAX_TEXT_W + this.PAD_X * 2 )) ;
  }
  leftX(d) {
    return this.getNodeDisplayX(d);
  }
  getNodeDisplayX(d) {
    const offsetX = d._offsetX || 0;
    return this.isReverseTreeMode() ? d.x + offsetX : d.y + offsetX;
  }
  getNodeDisplayY(d) {
    const offsetY = d._offsetY || 0;
    return this.isReverseTreeMode() ? d.y + offsetY : d.x + offsetY;
  }
  getNodeTransform(d) {
    return `translate(${this.getNodeDisplayX(d)},${this.getNodeDisplayY(d)})`;
  }
  elbow(s, t) {
    const sx = this.rightX(s),
      sy = this.getNodeDisplayY(s);
    const tx = this.leftX(t),
      ty = this.getNodeDisplayY(t);
    const mx = (sx + tx) / 2;
    return `M ${sx},${sy} C ${mx},${sy} ${mx},${ty} ${tx},${ty}`;
  }
    getLinkPath(d, displayMode) {
      if (this.isReverseTreeMode(displayMode)) {
        const sourceBox = d.source._box || { w: this.MAX_TEXT_W + this.PAD_X * 2 , h: 0 };
        const targetBox = d.target._box || { w: this.MAX_TEXT_W + this.PAD_X * 2 , h: 0 };
        const sourceX = this.getNodeDisplayX(d.source);
        const sourceY = this.getNodeDisplayY(d.source);
        const targetX = this.getNodeDisplayX(d.target);
        const targetY = this.getNodeDisplayY(d.target);
        const sx = sourceX + sourceBox.w / 2;
        const sy = sourceY + sourceBox.h / 2;
        const tx = targetX + targetBox.w / 2;
        const ty = targetY - targetBox.h / 2;
        const midY = (sy + ty) / 2;
        return `M ${sx} ${sy} V ${midY} H ${tx} V ${ty}`;
      } else {
        const sx = this.rightX(d.source),
          sy = this.getNodeDisplayY(d.source);
        const tx = this.leftX(d.target),
          ty = this.getNodeDisplayY(d.target);
        const mx = (sx + tx) / 2;
        return `M ${sx},${sy} C ${mx},${sy} ${mx},${ty} ${tx},${ty}`;
      }
    }
  toggle(d) {
    if (!this.hasDataKids(d)) return;
    const wasOpen = Array.isArray(d.children) && d.children.length;
    if (wasOpen) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.update(d);
  }
  bindBadgeEvents(sel, d, type, nodeData) {
    if (!sel || sel.empty()) return;
    const key = `${d.data.id}|${type}`;
    sel
      .attr("data-key", key)
      .on("mouseenter", (evt) => {
        evt.stopPropagation();
        this.cancelHideTimer();
        if (!this.showToolBadges) return;
        if (
          this.pinned &&
          !(this.pinned.id === d.data.id && this.pinned.type === type)
        )
          return;
        const html =
          type === "attr"
            ? this.renderFichiersHTML(nodeData)
            : type === "proc"
            ? this.renderPostesHTML(nodeData)
            : this.renderTasksHTML(nodeData); 
        this.setTooltip(html, evt.currentTarget, false);
      })
      .on("mouseleave", (evt) => {
        evt.stopPropagation();
        if (
          this.pinned &&
          this.pinned.id === d.data.id &&
          this.pinned.type === type
        )
          return;
        this.scheduleHide(200);
      })
      .on("click", (evt) => {
        evt.stopPropagation();
        this.showDepartmentDetails(d);
        if (!this.showToolBadges) return;
        const same =
          this.pinned &&
          this.pinned.id === d.data.id &&
          this.pinned.type === type;
        if (same) {
          this.clearPinned();
          return;
        }
        this.pinned = { id: d.data.id, type };
        d3.selectAll(".attr-badge,.proc-badge,.task-badge").classed("pinned", false); 
        d3.select(evt.currentTarget).classed("pinned", true);
        const html =
          type === "attr"
            ? this.renderFichiersHTML(nodeData)
            : type === "proc"
            ? this.renderPostesHTML(nodeData)
            : this.renderTasksHTML(nodeData); 
        this.setTooltip(html, evt.currentTarget, true);
      });
  }
  renderFichiersHTML(data) {
    const items = this.getFichiersArrayFromData(data);
    if (items.length === 0) return `<p>${this.translate("noDocuments")}</p>`;
    const itemsHTML = items
      .map((x) => {
        const typeLabel =
          x.type === "reglementation"
            ? this.translate("labelRegulation")
            : this.translate("labelDocument");
        const typeBadge =
          x.type === "reglementation"
            ? `<span style="color: #ef4444; font-weight: bold;">[REG]</span>`
            : `<span style="color: #16a34a; font-weight: bold;">[DOC]</span>`;
        const ref = x.ref ? ` (${x.ref})` : "";
        return `<li>${typeBadge} <strong>${x.nom}</strong>${ref}</li>`;
      })
      .join("");
    const acr = data.id || data.nom || "";
    return `<h4>${this.translate(
      "documentsTitle"
    )} - ${acr}</h4><ol>${itemsHTML}</ol>`;
  }
  renderPostesHTML(data) {
    const items = this.getPostesArrayFromData(data);
    if (items.length === 0) return `<p>${this.translate("noPositions")}</p>`;
    const itemsHTML = items
      .map((x) => {
        const abbr = x.abbreviation ? ` (${x.abbreviation})` : "";
        return `<li><strong>${x.nom}</strong>${abbr}</li>`;
      })
      .join("");
    const acr = data.id || data.nom || "";
    return `<h4>${this.translate(
      "positionsTitle"
    )} - ${acr}</h4><ol>${itemsHTML}</ol>`;
  }
  cancelHideTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
  scheduleHide(delay = 160) {
    this.cancelHideTimer();
    this.hideTimer = setTimeout(() => {
      if (!this.pinned && !this.hoverOnTooltip) this.hideTooltip();
    }, delay);
  }
  hideTooltip() {
    this.tooltip.style("display", "none").html("");
    this.activeAnchorEl = null;
    this.cancelHideTimer();
  }
  clearPinned() {
    this.pinned = null;
    d3.selectAll(".attr-badge,.proc-badge,.task-badge").classed("pinned", false); 
    this.hideTooltip();
  }
  setTooltip(html, anchorEl, makePinned) {
    this.tooltip.html(html).style("display", "block");
    this.activeAnchorEl = anchorEl || null;
    this.positionTooltipFor(anchorEl);
    if (makePinned) {
      d3.select(anchorEl).classed("pinned", true);
      this.pinned = {
        id: anchorEl.getAttribute("data-key").split("|")[0],
        type: anchorEl.getAttribute("data-key").split("|")[1],
      };
    }
  }
  positionTooltipFor(anchorEl) {
    if (!anchorEl || !anchorEl.getBoundingClientRect) return this.hideTooltip();
    const wrap = document.getElementById("chart").getBoundingClientRect();
    const r = anchorEl.getBoundingClientRect();
    const left = r.left - wrap.left;
    const top = r.bottom - wrap.top + 8;
    this.tooltip
      .style("left", Math.round(left) + "px")
      .style("top", Math.round(top) + "px");
  }
  followAnchor() {
    if (!this.tooltipVisible()) return;
    let anchor = this.activeAnchorEl;
    if (this.pinned) {
      anchor = this.getBadgeEl(this.pinned.id, this.pinned.type);
    }
    if (!anchor || !document.contains(anchor)) {
      this.clearPinned();
      return;
    }
    this.positionTooltipFor(anchor);
  }
  tooltipVisible() {
    return this.tooltip.style("display") !== "none";
  }
  getBadgeEl(id, type) {
    const g = this.gNodes.selectAll("g.node").filter((n) => n.data.id === id);
    if (g.empty()) return null;
    let sel;
    if (type === "attr") {
      sel = g.select("g.attr-badge");
    } else if (type === "proc") {
      sel = g.select("g.proc-badge");
    } else {
      sel = g.select("g.task-badge");  
    }
    return sel.empty() ? null : sel.node();
  }
  showDepartmentDetails(node) {
    const detailsPanel = document.getElementById("details-panel");
    if (!this.bModal && detailsPanel && detailsPanel.style.display === "none") {
      detailsPanel.style.display = "flex";
    }
    this.selectedNode = node;
    this.syncSelectedNodeState();
    if (this.querySelect != null) {
      this.querySelect.updateDepartmentSelect(node.data.id);
    }
    if (this.queryDetails != null) {
      this.queryDetails.showDepartmentDetailsId(node.data.id);
    }
    if (window.editModeManager && window.editModeManager.isEditMode) {
      const nodeElement = this.gNodes
        .selectAll("g.node")
        .filter((n) => n.data.id === node.data.id)
        .node();
      if (nodeElement) {
        window.editModeManager.UpdateEditDepartment(nodeElement);
      }
    }
  }
  autoFit() {
    let tries = 0,
      maxTries = 24;
    const tick = () => {
      if(!this.gRoot) return;
      const node = this.gRoot.node();
      if(!node) return;
      const b = node?.getBBox?.();
      if (b && b.width > 0 && b.height > 0) {
        this.fitToScreen(80, true);
      } else if (tries++ < maxTries) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => this.fitToScreen(80, true), 220);
      }
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(tick));
    } else {
      requestAnimationFrame(tick);
    }
  }
  fitToScreen(padding = 60, animate = false) {
      const bbox = this.gRoot.node().getBBox();
      const host = document.getElementById("chart");
      const width = host.clientWidth;
      const height = host.clientHeight;
      const effectivePadding = this.isClassroomMode()
          ? Math.min(padding, 36)
          : padding;
      const maxScale = this.isClassroomMode() ? 1.42 : 1.2;
      const scale = Math.min(
          (width - effectivePadding * 2) / bbox.width,
          (height - effectivePadding * 2) / bbox.height,
          maxScale
      );
      const transform = d3.zoomIdentity
          .translate(
              width / 2 - scale * (bbox.x + bbox.width / 2),
              height / 2 - scale * (bbox.y + bbox.height / 2)
          )
          .scale(scale);
      if (animate && this.animation) {
          this.applyTransform(transform);
      } else {
          this.svg.call(this.zoom.transform, transform);
      }
      this.HOME = transform;
  }
  constrainTransformTop(t, topMargin = 12, bottomMargin = 12) {
    if (!t) return t;
    if (this.isClassroomMode()) return t;
    if (!this.root || !Number.isFinite(this.root.x)) return t;
    if (!Number.isFinite(t.k) || t.k <= 0) return t;
    const host =
      document.getElementById("chart-container") ||
      document.getElementById("chart") ||
      this.svg?.node()?.parentElement ||
      null;
    if (!host || !Number.isFinite(host.clientHeight) || host.clientHeight <= 0) {
      return t;
    }
    const minY = topMargin - t.k * this.root.x;
    const maxY = host.clientHeight - bottomMargin - t.k * this.root.x;
    let y = t.y;
    if (!Number.isFinite(y)) return t;
    if (minY <= maxY) {
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;
    } else {
      y = (minY + maxY) / 2;
    }
    if (y !== t.y) {
      return d3.zoomIdentity.translate(t.x, y).scale(t.k);
    }
    return t;
  }
  applyTransform(t, duration = 420) {
    if (!this.svg || !this.zoom || !t) return;
    const constrained = this.constrainTransformTop(t);
    const isValid =
      Number.isFinite(constrained.x) &&
      Number.isFinite(constrained.y) &&
      Number.isFinite(constrained.k) &&
      constrained.k > 0;
    if (!isValid) {
      console.warn("Invalid transform ignored:", constrained);
      return;
    }
    this.svg
      .transition()
      .duration(duration)
      .ease(d3.easeCubicOut)
      .call(this.zoom.transform, constrained);
  }
  handleSearch(query) {
    const node = this.findByAcr(query);
    if (node) {
      this.centerOnNode(node);
      this.highlightNode(node);
      this.showDepartmentDetails(node);
    }
  }
  findByAcr(acr) {
    const normalized = this.norm(acr);
    for (const node of this.flattenAll(this.root)) {
      if (this.norm(this.getAcr(node)) === normalized) return node;
    }
    return null;
  }
  norm(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .trim();
  }
  flattenAll(node) {
    const out = [];
    const walk = (n) => {
      out.push(n);
      (n.children || n._children || []).forEach(walk);
    };
    walk(node);
    return out;
  }
  centerOnNode(node, keepCurrentZoom = false, duration = 420) {
    if (!node || !Number.isFinite(node.x) || !Number.isFinite(node.y)) {
      console.warn("Cannot center on node: invalid coordinates", node);
      return;
    }
    const host =
      document.getElementById("chart") ||
      this.svg?.node()?.parentElement ||
      null;
    if (!host) return;
    const rawK =
      keepCurrentZoom && this.svg
        ? d3.zoomTransform(this.svg.node()).k
        : 1.2;
    const currentK = Number.isFinite(rawK) && rawK > 0 ? rawK : 1.2;
    const box = node._box || {};
    const nodeWidth = Number.isFinite(box.w) ? box.w : this.MAX_TEXT_W + this.PAD_X * 2;
    const targetX = this.getNodeDisplayX(node) + nodeWidth / 2;
    const targetY = this.getNodeDisplayY(node);
    const transform = d3.zoomIdentity
      .translate(
        host.clientWidth / 2 - currentK * targetX,
        host.clientHeight / 2 - currentK * targetY
      )
      .scale(currentK);
    this.applyTransform(transform, duration);
  }
  highlightNode(node) {
    this.gNodes.selectAll("g.node").classed("is-match", false);
    this.gNodes
      .selectAll("g.node")
      .filter((n) => n.data.id === node.data.id)
      .classed("is-match", true);
  }
  syncSelectedNodeState() {
    if (!this.gNodes) return;
    this.gNodes.selectAll("g.node").classed("selected", false);
    if (!this.selectedNode?.data?.id) {
      return;
    }
    this.gNodes
      .selectAll("g.node")
      .filter((n) => n.data.id === this.selectedNode.data.id)
      .classed("selected", true);
  }
  navigateToDepartmentFromSelect(departmentId) {
    this.navigateToDepartment(departmentId, true);
  }
  navigateToDepartmentFromModal(departmentId) {
    this.navigateToDepartment(departmentId, true);
  }
  drawDepartement(departmentId) {
    if (!this.root) {
      console.error(this.translate("searchError"));
      return false;
    }
    const targetNode = this.findNodeById(this.root, departmentId);
    if (!targetNode) {
      console.warn(`${this.translate("departmentNotFound")} ${departmentId}`);
      return false;
    }
    const parserDepartment =
      (this.xmlParser &&
        typeof this.xmlParser.getDepartement === "function" &&
        this.xmlParser.getDepartement(departmentId)) ||
      this.xmlParser?.data?.nodes?.find((n) => n.id === departmentId) ||
      null;
    if (parserDepartment) {
      targetNode.data.data = {
        ...targetNode.data.data,
        nom: parserDepartment.nom || "",
        id: parserDepartment.id || targetNode.data.id,
        type: parserDepartment.type || "",
        abbreviation: parserDepartment.abbreviation || "",
        abbrev_details: parserDepartment.abbrev_details || "",
        background_color: parserDepartment.background_color || "",
        description: parserDepartment.description || "",
        responsable: parserDepartment.responsable || "",
        note: parserDepartment.note || "",
        postes: Array.isArray(parserDepartment.postes)
          ? [...parserDepartment.postes]
          : [],
        fichiers: Array.isArray(parserDepartment.fichiers)
          ? [...parserDepartment.fichiers]
          : [],
        tasks: Array.isArray(parserDepartment.tasks)
          ? [...parserDepartment.tasks]
          : [],
        taskPosteAssociations:
          parserDepartment.taskPosteAssociations || new Map(),
        posteTaskAssociations:
          parserDepartment.posteTaskAssociations || new Map(),
        xmlElement: parserDepartment.xmlElement || null,
      };
    }
    const nodeGroup = this.gNodes
      .selectAll("g.node")
      .filter((n) => n.data.id === targetNode.data.id);
    if (nodeGroup.empty()) {
      console.warn(`Node group not found in SVG: ${departmentId}`);
      return false;
    }
    this.refreshCard(nodeGroup.select(".node-card"), targetNode);
    nodeGroup.attr("transform", this.getNodeTransform(targetNode));
    this.updateLinks();
    this.highlightNode(targetNode);
    if (
      this.resizeHandle &&
      this.selectedNode &&
      this.selectedNode.data.id === targetNode.data.id
    ) {
      this.addResizeHandles();
    }
    return true;
  }
  insertDepartmentNode(parentDepartmentId, departmentId) {
    if (!this.root || !departmentId) return false;
    if (this.findNodeById(this.root, departmentId)) {
      return this.drawDepartement(departmentId);
    }
    const parserDepartment =
      (this.xmlParser &&
        typeof this.xmlParser.getDepartement === "function" &&
        this.xmlParser.getDepartement(departmentId)) ||
      null;
    if (!parserDepartment) {
      console.warn(`Department not found in parser: ${departmentId}`);
      return false;
    }
    const resolvedParentId =
      parentDepartmentId || parserDepartment.parent || this.root?.data?.id || "root";
    const parentNode = this.findNodeById(this.root, resolvedParentId);
    if (!parentNode) {
      console.warn(`Parent node not found in diagram: ${resolvedParentId}`);
      return false;
    }
    const newNodeData = {
      id: parserDepartment.id || departmentId,
      data: {
        nom: parserDepartment.nom || "",
        id: parserDepartment.id || departmentId,
        type: parserDepartment.type || "",
        abbreviation: parserDepartment.abbreviation || "",
        abbrev_details: parserDepartment.abbrev_details || "",
        background_color: parserDepartment.background_color || "",
        description: parserDepartment.description || "",
        responsable: parserDepartment.responsable || "",
        note: parserDepartment.note || "",
        postes: Array.isArray(parserDepartment.postes) ? [...parserDepartment.postes] : [],
        fichiers: Array.isArray(parserDepartment.fichiers) ? [...parserDepartment.fichiers] : [],
        tasks: Array.isArray(parserDepartment.tasks) ? [...parserDepartment.tasks] : [],
        taskPosteAssociations: parserDepartment.taskPosteAssociations || new Map(),
        posteTaskAssociations: parserDepartment.posteTaskAssociations || new Map(),
        xmlElement: parserDepartment.xmlElement || null,
      },
      parent: parentNode.data.id || null,
      children: [],
    };
    const newHierarchyNode = d3.hierarchy(newNodeData);
    newHierarchyNode.parent = parentNode;
    newHierarchyNode.depth = (parentNode.depth || 0) + 1;
    newHierarchyNode.height = 0;
    newHierarchyNode.x0 = parentNode.x0 ?? parentNode.x ?? 0;
    newHierarchyNode.y0 = parentNode.y0 ?? parentNode.y ?? 0;
    newHierarchyNode.x = parentNode.x ?? 0;
    newHierarchyNode.y = parentNode.y ?? 0;
    if (parentNode._children && !parentNode.children) {
      parentNode.children = parentNode._children;
      parentNode._children = null;
    }
    if (!parentNode.children) {
      parentNode.children = [];
    }
    parentNode.children.push(newHierarchyNode);
    if (!Array.isArray(parentNode.data.children)) {
      parentNode.data.children = [];
    }
    parentNode.data.children.push(newNodeData);
    this.update(parentNode);
    this.updateScrollbars();
    this.highlightNode(newHierarchyNode);
    return true;
  }
  moveDepartmentNode(departmentId, newParentId) {
    if (!this.root || !departmentId || !newParentId) return false;
    const sourceNode = this.findNodeById(this.root, departmentId);
    const targetParent = this.findNodeById(this.root, newParentId);
    if (!sourceNode || !targetParent || !sourceNode.parent) return false;
    let p = targetParent;
    while (p) {
      if (p === sourceNode) return false;
      p = p.parent;
    }
    const oldParent = sourceNode.parent;
    const detachFrom = (container) => {
      if (!Array.isArray(container)) return false;
      const idx = container.indexOf(sourceNode);
      if (idx >= 0) {
        container.splice(idx, 1);
        return true;
      }
      return false;
    };
    if (!detachFrom(oldParent.children)) {
      detachFrom(oldParent._children);
    }
    if (oldParent.data && Array.isArray(oldParent.data.children)) {
      oldParent.data.children = oldParent.data.children.filter(
        (c) => c && c.id !== sourceNode.data.id
      );
    }
    if (targetParent._children && !targetParent.children) {
      targetParent.children = targetParent._children;
      targetParent._children = null;
    }
    if (!targetParent.children) targetParent.children = [];
    targetParent.children.push(sourceNode);
    sourceNode.parent = targetParent;
    sourceNode.data.parent = targetParent.data.id;
    if (!Array.isArray(targetParent.data.children)) {
      targetParent.data.children = [];
    }
    targetParent.data.children.push(sourceNode.data);
    const updateDepths = (node, depth) => {
      node.depth = depth;
      if (node.children) {
        node.children.forEach((child) => updateDepths(child, depth + 1));
      }
      if (node._children) {
        node._children.forEach((child) => updateDepths(child, depth + 1));
      }
    };
    updateDepths(sourceNode, targetParent.depth + 1);
    sourceNode.x0 = targetParent.x0 ?? targetParent.x ?? 0;
    sourceNode.y0 = targetParent.y0 ?? targetParent.y ?? 0;
    const sanitizeHierarchy = (current) => {
      if (!current) return;
      ["children", "_children"].forEach((key) => {
        if (!Array.isArray(current[key])) return;
        current[key] = current[key].filter(
          (child) => child && typeof child.eachBefore === "function"
        );
        current[key].forEach((child) => {
          child.parent = current;
          sanitizeHierarchy(child);
        });
        if (current[key].length === 0) {
          current[key] = null;
        }
      });
    };
    sanitizeHierarchy(this.root);
    this.update(this.root);
    this.updateScrollbars();
    this.highlightNode(sourceNode);
    return true;
  }
  removeDepartmentNode(departmentId) {
    if (!this.root || !departmentId) return false;
    if (departmentId === "root") return false;
    const node = this.findNodeById(this.root, departmentId);
    if (!node || !node.parent) return false;
    const parent = node.parent;
    const detachFrom = (container) => {
      if (!Array.isArray(container)) return false;
      const idx = container.indexOf(node);
      if (idx >= 0) {
        container.splice(idx, 1);
        return true;
      }
      return false;
    };
    if (!detachFrom(parent.children)) {
      detachFrom(parent._children);
    }
    const sanitizeHierarchy = (current) => {
      if (!current) return;
      ["children", "_children"].forEach((key) => {
        if (!Array.isArray(current[key])) return;
        current[key] = current[key].filter(
          (child) => child && typeof child.eachBefore === "function"
        );
        current[key].forEach((child) => {
          child.parent = current;
          sanitizeHierarchy(child);
        });
        if (current[key].length === 0) {
          current[key] = null;
        }
      });
    };
    sanitizeHierarchy(this.root);
    if (parent.data && Array.isArray(parent.data.children)) {
      parent.data.children = parent.data.children.filter(
        (c) => c && c.id !== departmentId
      );
    }
    this.update(this.root);
    this.updateScrollbars();
    this.highlightNode(parent);
    return true;
  }
  navigateToDepartment(departmentId, keepCurrentZoom = false) {
    if (!this.root) {
      console.error(this.translate("searchError"));
      return false;
    }
    const targetNode = this.findNodeById(this.root, departmentId);
    if (!targetNode) {
      console.warn(`${this.translate("departmentNotFound")} ${departmentId}`);
      return false;
    }
    this.expandToNode(targetNode);
    this.update(this.root);
    this.showDepartmentDetails(targetNode);
    this.highlightNode(targetNode);
    this.centerOnNode(targetNode, keepCurrentZoom);
    requestAnimationFrame(() => {
      this.centerOnNode(targetNode, keepCurrentZoom);
    });
    setTimeout(() => {
      this.centerOnNode(targetNode, keepCurrentZoom, 0);
      this.updateScrollbars();
    }, 450);
    return true;
  }
  findNodeById(startNode, id) {
    let foundNode = null;
    const search = (node) => {
      if (node.data.id === id) {
        foundNode = node;
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (search(child)) return true;
        }
      }
      if (node._children) {
        for (const child of node._children) {
          if (search(child)) return true;
        }
      }
      return false;
    };
    search(startNode);
    return foundNode;
  }
  expandToNode(targetNode) {
    if (!targetNode) return;
    let currentNode = targetNode;
    const pathToRoot = [];
    while (currentNode && currentNode.parent) {
      pathToRoot.unshift(currentNode.parent);
      currentNode = currentNode.parent;
    }
    pathToRoot.forEach((node) => {
      if (node._children && !node.children) {
        node.children = node._children;
        node._children = null;
      }
    });
    if (targetNode._children && !targetNode.children) {
      targetNode.children = targetNode._children;
      targetNode._children = null;
    }
  }
  navigateToDepartmentByName(nameOrAcronym) {
    const normalized = this.norm(nameOrAcronym);
    const allNodes = this.flattenAll(this.root);
    const targetNode = allNodes.find(
      (node) =>
        this.norm(node.data.data.nom) === normalized ||
        this.norm(node.data.data.id) === normalized
    );
    if (targetNode) {
      return this.navigateToDepartment(targetNode.data.id);
    } else {
      console.warn(`${this.translate("noDepartmentFound")} ${nameOrAcronym}`);
      return false;
    }
  }
  getAllDepartments() {
    if (!this.root) return [];
    const allNodes = this.flattenAll(this.root);
    return allNodes
      .map((node) => ({
        id: node.data.id,
        nom: node.data.data.nom,
        type: node.data.data.type,
        acronyme: node.data.data.id,
      }))
      .filter((dept) => dept.id !== "root");
  }
  navigateAndIsolate(departmentId) {
    if (!this.root) return false;
    this.collapseAll();
    return this.navigateToDepartment(departmentId);
  }
toggleControls() {
  this.scrollbar.isCollapsed = !this.scrollbar.isCollapsed;
  const controlPanel = d3.select("#zoom-control-panel");
  const toggleBtn = controlPanel.select(".toggle-btn");
  if (this.scrollbar.isCollapsed) {
    controlPanel.classed("collapsed", true);
    toggleBtn.html("►").attr("title", this.translate("showControls"));
  } else {
    controlPanel.classed("collapsed", false);
    toggleBtn.html("◄").attr("title", this.translate("hideControls"));
  }
}
setupControlPanelHover() {
  const controlPanel = d3.select("#zoom-control-panel");
  controlPanel
    .on("mouseenter", () => {
      if (this.scrollbar.isCollapsed) {
        const buttonsRow = controlPanel.select(".buttons-row");
        buttonsRow
          .selectAll(".zoom-btn:not(.toggle-btn)")
          .style("display", "flex");
        controlPanel.selectAll(".separator").style("display", "block");
        if (this.scrollbar.zoomLevel) {
          this.scrollbar.zoomLevel.style("display", "flex");
        }
        const levelSelector = controlPanel.select(".level-selector");
        if (levelSelector) {
          levelSelector.style("display", "flex");
        }
        controlPanel.style("padding", "8px 12px");
      }
    })
    .on("mouseleave", () => {
      if (this.scrollbar.isCollapsed) {
        const buttonsRow = controlPanel.select(".buttons-row");
        buttonsRow
          .selectAll(".zoom-btn:not(.toggle-btn)")
          .style("display", "none");
        controlPanel.selectAll(".separator").style("display", "none");
        if (this.scrollbar.zoomLevel) {
          this.scrollbar.zoomLevel.style("display", "none");
        }
        const levelSelector = controlPanel.select(".level-selector");
        if (levelSelector) {
          levelSelector.style("display", "none");
        }
        controlPanel.style("padding", "8px 12px");
        controlPanel.style("min-width", "auto");
      }
    });
}
collapseAll() {
  if (!this.root || !this.update) return;
  const collapseNode = (node) => {
    if (node.children && node.children.length > 0) {
      node._children = [...node.children];
      node.children = null;
    }
    if (node._children) {
      node._children.forEach((child) => collapseNode(child));
    }
  };
  collapseNode(this.root);
  this.update(this.root);
  setTimeout(() => {
    if (this.updateScrollbars) {
      this.updateScrollbars();
    }
    this.updateExpandLevelDisplay();
  }, 100);
}
expandAll() {
  if (!this.root || !this.update) return;
  const expandNode = (node) => {
    if (node._children && node._children.length > 0) {
      node.children = [...node._children];
      node._children = null;
    }
    if (node.children) {
      node.children.forEach((child) => expandNode(child));
    }
  };
  expandNode(this.root);
  this.update(this.root);
  setTimeout(() => {
    if (this.updateScrollbars) {
      this.updateScrollbars();
    }
    this.updateExpandLevelDisplay();
  }, 100);
}
enableDragDrop() {
  if (!this.svg) {
    console.error('❌ No SVG element found!');
    return;
  }
  this.cleanupDrag();
  const nodes = this.gNodes.selectAll('g.node');
  nodes
    .on('.drag', null)
    .on('mouseenter.dragtarget', null)
    .on('mouseleave.dragtarget', null);
  const dragBehavior = d3.drag()
    .filter((event) => {
      return (event.ctrlKey || event.metaKey) && !event.button;
    })
    .on('start', (event, d) => {
      if (!event.sourceEvent.ctrlKey && !event.sourceEvent.metaKey) {
        return;
      }
      if (this.draggedNode) {
        console.warn('⚠️ Drag already in progress, aborting');
        return;
      }
      this.createDragPreview(d, event);
      this._globalMouseUpHandler = (e) => {
        if (this.draggedNode) {
          this.onDragEnd({ sourceEvent: e }, this.draggedNode);
        }
        document.removeEventListener('mouseup', this._globalMouseUpHandler);
        this._globalMouseUpHandler = null;
      };
      document.addEventListener('mouseup', this._globalMouseUpHandler);
      this.onDragStart(event, d);
    })
    .on('drag', (event, d) => {
      if (!this.draggedNode) return;
      this.onDrag(event, d);
    })
    .on('end', (event, d) => {
      if (this._globalMouseUpHandler) {
        document.removeEventListener('mouseup', this._globalMouseUpHandler);
        this._globalMouseUpHandler = null;
      }
      try {
        this.onDragEnd(event, d);
      } catch (error) {
        console.error('❌ Error in onDragEnd:', error);
        this.cleanupDrag();
      }
    });
  nodes.call(dragBehavior);
  nodes.style('cursor', 'grab');
}
disableDragDrop() {
  if (!this.svg || !this.gNodes) return;
  this.gNodes.selectAll('g.node')
    .on('.drag', null)
    .on('mouseenter.dragtarget', null)
    .on('mouseleave.dragtarget', null)
    .classed('dragging', false)
    .style('opacity', 1)
    .style('cursor', null);
  this.cleanupDrag();
}
onDragStart(event, d) {
  if (!event.sourceEvent.ctrlKey && !event.sourceEvent.metaKey) {
    return;
  }
  if (d.data.id === 'root' || !d.parent) {
    return;
  }
  this.isDragging = true;
  this.draggedNode = d;
  const nodeGroup = this.gNodes
    .selectAll('g.node')
    .filter(n => n.data.id === d.data.id);
  nodeGroup
    .classed('dragging', true)
    .style('opacity', 0.3);
}
onDrag(event, d) {
  if (!this.draggedNode) {
    return;
  }
  if (!this.dragOffset) {
    const clientX = event.sourceEvent ? event.sourceEvent.clientX : event.x;
    const clientY = event.sourceEvent ? event.sourceEvent.clientY : event.y;
    const svgRect = this.svg.node().getBoundingClientRect();
    const transform = d3.zoomTransform(this.svg.node());
    const nodeX = this.draggedNode.y * transform.k + transform.x + svgRect.left;
    const nodeY = this.draggedNode.x * transform.k + transform.y + svgRect.top;
    this.dragOffset = {
      x: clientX - nodeX,
      y: clientY - nodeY
    };
  }
  if (!document.querySelector('.drag-preview') && !this.isPreviewCreated) {
    this.createDragPreview(this.draggedNode, event);
  }
  try {
    this.updateDragPreview(event);
    this.updateDropTarget(event);
  } catch (error) {
    console.error('❌ Error in onDrag:', error);
    console.error('📊 Stack:', error.stack);
  }
}
onDragEnd(event, d) {
  if (!this.draggedNode || !this.isDragging) {
    return;
  }
  this.isDragging = false;
  this.removeDragPreview();
  const nodeGroup = this.gNodes
    .selectAll('g.node')
    .filter(n => n.data.id === this.draggedNode.data.id);
  nodeGroup
    .classed('dragging', false)
    .style('opacity', 1);
  if (this.dropTarget && this.dropTarget !== this.draggedNode) {
    if (window.editModeManager) {
      window.editModeManager.handleDepartmentMove(
        this.draggedNode.data.id,
        this.dropTarget.data.id
      );
    }
  } else {
  }
  this.cleanupDrag();
}
createDragPreview(d, event) {
  this.removeDragPreview();
  const clientX = event.sourceEvent ? event.sourceEvent.clientX : event.x;
  const clientY = event.sourceEvent ? event.sourceEvent.clientY : event.y;
  const svgRect = this.svg.node().getBoundingClientRect();
  const transform = d3.zoomTransform(this.svg.node());
  let nodeX, nodeY;
  if (this.isReverseTreeMode()) {
    nodeX = d.x * transform.k + transform.x + svgRect.left;
    nodeY = d.y * transform.k + transform.y + svgRect.top;
  } else {
    nodeX = d.y * transform.k + transform.x + svgRect.left;
    nodeY = d.x * transform.k + transform.y + svgRect.top;
  }
  this.dragOffset = {
    x: clientX - nodeX,
    y: clientY - nodeY
  };
  const preview = document.createElement('div');
  preview.className = 'drag-preview';
  preview.style.cssText = `
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    left: ${nodeX}px;
    top: ${nodeY}px;
  `;
  preview.innerHTML = `
    <div class="drag-preview-content">
      <div class="node-rect-preview" style="
        background: ${this.nodeColor(d)}; 
        width: 120px; 
        height: 40px; 
        border-radius: 6px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border: 2px solid #333;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        <span style="
          color: white; 
          font-weight: 600; 
          font-size: 12px;
          padding: 4px 8px;
          text-align: center;
        ">${d.data.data.nom}</span>
      </div>
    </div>
  `;
  document.body.appendChild(preview);
  this.isPreviewCreated = true;
  if (this.debugMode) {
    this.addDebugPoint(nodeX, nodeY, 'blue', 'Dragged node');
  }
  return preview;
}
addDebugPoint(x, y, color = 'red', label = '') {
  const debugPoint = document.createElement('div');
  debugPoint.className = 'debug-point';
  debugPoint.style.cssText = `
    position: fixed;
    z-index: 10000;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${color};
    left: ${x - 5}px;
    top: ${y - 5}px;
    pointer-events: none;
  `;
  if (label) {
    debugPoint.setAttribute('title', `${label} (${x}, ${y})`);
  }
  document.body.appendChild(debugPoint);
  setTimeout(() => {
    if (debugPoint.parentNode) {
      debugPoint.parentNode.removeChild(debugPoint);
    }
  }, 5000);
  return debugPoint;
}
toggleDebugMode(enabled) {
  this.debugMode = enabled;
  if (!enabled) {
    document.querySelectorAll('.debug-point').forEach(point => point.remove());
  }
}
updateDragPreview(event) {
  if (!this.dragOffset) {
    console.error('❌ CRITICAL: this.dragOffset is null in updateDragPreview');
    if (this.draggedNode && event) {
      const clientX = event.sourceEvent ? event.sourceEvent.clientX : event.x;
      const clientY = event.sourceEvent ? event.sourceEvent.clientY : event.y;
      const svgRect = this.svg.node().getBoundingClientRect();
      const transform = d3.zoomTransform(this.svg.node());
      let nodeX, nodeY;
      if (this.isReverseTreeMode()) {
        nodeX = this.draggedNode.x * transform.k + transform.x + svgRect.left;
        nodeY = this.draggedNode.y * transform.k + transform.y + svgRect.top;
      } else {
        nodeX = this.draggedNode.y * transform.k + transform.x + svgRect.left;
        nodeY = this.draggedNode.x * transform.k + transform.y + svgRect.top;
      }
      this.dragOffset = {
        x: clientX - nodeX,
        y: clientY - nodeY
      };
    } else {
      return;
    }
  }
  const preview = document.querySelector('.drag-preview');
  if (!preview) {
    console.error('❌ No drag preview element found');
    if (this.draggedNode) {
      this.createDragPreview(this.draggedNode, event);
    }
    return;
  }
  const clientX = event.sourceEvent ? event.sourceEvent.clientX : event.x;
  const clientY = event.sourceEvent ? event.sourceEvent.clientY : event.y;
  const newLeft = clientX - this.dragOffset.x;
  const newTop = clientY - this.dragOffset.y;
  if (!isNaN(newLeft) && !isNaN(newTop)) {
    preview.style.left = newLeft + 'px';
    preview.style.top = newTop + 'px';
  }
}
removeDragPreview() {
  const preview = document.querySelector('.drag-preview');
  if (preview) {
    preview.remove();
  } else {
  }
}
updateDropTarget(event) {
  if (this.dropTarget) {
    d3.select(this.dropTarget.element || `g[data-id="${this.dropTarget.data.id}"]`)
      .classed('drop-target', false);
  }
  const mousePos = d3.pointer(event, this.svg.node());
  const targetNode = this.findNodeAtPosition(mousePos[0], mousePos[1]);
  if (targetNode && targetNode !== this.draggedNode && this.canDropInto(targetNode, this.draggedNode)) {
    this.dropTarget = targetNode;
    d3.select(targetNode.element || `g[data-id="${targetNode.data.id}"]`)
      .classed('drop-target', true);
  } else {
    if (targetNode) {
    }
    this.dropTarget = null;
  }
}
findNodeAtPosition(x, y) {
  const transform = d3.zoomTransform(this.svg.node());
  const svgX = (x - transform.x) / transform.k;
  const svgY = (y - transform.y) / transform.k;
  let targetNode = null;
  let targetDistance = Infinity;
  this.gNodes.selectAll('g.node').each((d, i, nodes) => {
    if (!d || d === this.draggedNode) return;
    const nodeElement = nodes[i];
    const nodeBox = d._box || { w: this.MAX_TEXT_W + this.PAD_X * 2 , h: 60 };
    let nodeX, nodeY;
    if (this.isReverseTreeMode()) {
      nodeX = d.x;
      nodeY = d.y;
    } else {
      nodeX = d.y;
      nodeY = d.x;
    }
    const tolerance = 40; 
    const left = nodeX - tolerance;
    const right = nodeX + nodeBox.w + tolerance;
    const top = nodeY - nodeBox.h/2 - tolerance;
    const bottom = nodeY + nodeBox.h/2 + tolerance;
    const isInside = svgX >= left && svgX <= right && 
                    svgY >= top && svgY <= bottom;
    if (isInside) {
      const centerX = nodeX + nodeBox.w/2;
      const centerY = nodeY;
      const distance = Math.sqrt(
        Math.pow(svgX - centerX, 2) + 
        Math.pow(svgY - centerY, 2)
      );
      if (distance < targetDistance) {
        targetDistance = distance;
        targetNode = d;
        targetNode.element = nodeElement;
      }
    }
  });
  if (targetNode) {
  } else {
  }
  return targetNode;
}
canDropInto(targetNode, draggedNode) {
  const b_isdescendant = this.isDescendant(targetNode, draggedNode);
  if (b_isdescendant) {
    return false;
  }
  if (targetNode.data.id === draggedNode.data.id) {
    return false;
  }
  return true;
}
isDescendant(parentNode, childNode) {
  let current = childNode;
  while (current && current.parent) {
    if (current.parent.data.id === parentNode.data.id) {
      return true;
    }
    current = current.parent;
  }
  return false;
}
  onDragEnter(event, d) {
  }
  onDragLeave(event, d) {
  }
nodeColor(d) {
 return "#1a3a8f";
}
applyZoomFromInput(inputElement) {
  if (!this.svg || !this.zoom) return;
  let value = inputElement.value.replace('%', '');
  let zoomPercent = parseInt(value, 10);
  if (isNaN(zoomPercent)) {
    this.updateZoomLevelDisplay();
    return;
  }
  const targetScale = zoomPercent / 100;
  const transform = d3.zoomTransform(this.svg.node());
  const newTransform = d3.zoomIdentity
    .translate(transform.x, transform.y)
    .scale(targetScale);
  if (this.animation) {
    this.svg.transition().duration(300).call(this.zoom.transform, newTransform);
  } else {
    this.svg.call(this.zoom.transform, newTransform);
  }
}
updateZoomLevelDisplay() {
  if (!this.svg || !this.scrollbar.zoomLevel) return;
  const transform = d3.zoomTransform(this.svg.node());
  const zoomPercent = Math.round(transform.k * 100);
  this.scrollbar.zoomLevel.property("value", zoomPercent + "%");
}
expandToLevel(level) {
  if (!this.root || !this.update) return;
  const expandNodeToLevel = (node, currentLevel, targetLevel) => {
    if (node._children && node._children.length > 0) {
      node.children = [...node._children];
      node._children = null;
    }
    if (currentLevel >= targetLevel) {
      if (node.children) {
        node._children = node.children;
        node.children = null;
      }
      return;
    }
    if (node.children) {
      node.children.forEach(child => 
        expandNodeToLevel(child, currentLevel + 1, targetLevel)
      );
    }
  };
  expandNodeToLevel(this.root, 0, level);
  this.update(this.root);
  setTimeout(() => {
    if (this.updateScrollbars) {
      this.updateScrollbars();
    }
  }, 100);
}
getCurrentExpandLevel() {
  if (!this.root) return 0;
  let maxLevel = 0;
  const checkNode = (node, level) => {
    if (node.children && node.children.length > 0) {
      maxLevel = Math.max(maxLevel, level + 1);
      node.children.forEach(child => checkNode(child, level + 1));
    }
  };
  checkNode(this.root, 0);
  return maxLevel;
}
createScrollbars() {
  const chartContainer = document.getElementById("chart-container");
  const existingPanel = chartContainer.querySelector('.zoom-control-panel');
  const existingContainer = chartContainer.querySelector('.scrollbar-container');
  if (existingPanel) {
    existingPanel.remove();
  }
  if (existingContainer) {
    existingContainer.remove();
  }
  this.scrollbar.container = d3
    .select("#chart-container")
    .append("div")
    .attr("class", "scrollbar-container");
  this.scrollbar.x = this.scrollbar.container
    .append("div")
    .attr("class", "scrollbar scrollbar-x")
    .call(
      d3
        .drag()
        .on("start", (event) => this.handleScrollbarDragStart(event, "x"))
        .on("drag", (event) => this.handleScrollbarDrag(event, "x"))
        .on("end", () => this.handleScrollbarDragEnd("x"))
    );
  this.scrollbar.y = this.scrollbar.container
    .append("div")
    .attr("class", "scrollbar scrollbar-y")
    .call(
      d3
        .drag()
        .on("start", (event) => this.handleScrollbarDragStart(event, "y"))
        .on("drag", (event) => this.handleScrollbarDrag(event, "y"))
        .on("end", () => this.handleScrollbarDragEnd("y"))
    );
  const controlPanel = this.scrollbar.container
    .append("div")
    .attr("class", "zoom-control-panel")
    .attr("id", "zoom-control-panel");
  controlPanel
    .append("div")
    .attr("class", "drag-handle")
    .attr("title", "Drag to move")
    .html("<span></span><span></span><span></span><span></span><span></span><span></span>");
  const buttonsRow = controlPanel.append("div").attr("class", "buttons-row");
  this.scrollbar.toggleBtn = buttonsRow
    .append("button")
    .attr("class", "zoom-btn toggle-btn")
    .html("◄")
    .attr("title", this.translate("toggleControls"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.toggleControls();
    });
  buttonsRow.append("div").attr("class", "separator");
  this.scrollbar.zoomOutBtn = buttonsRow
    .append("button")
    .attr("class", "zoom-btn zoom-out")
    .html("−")
    .attr("title", this.translate("zoomOut"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.zoomOut();
    });
  this.scrollbar.zoomLevel = buttonsRow
    .append("input")
    .attr("class", "zoom-level-input")
    .attr("type", "text")
    .attr("value", "100%")
    .attr("title", "Cliquez pour modifier le niveau de zoom")
    .style("width", "45px")
    .style("text-align", "center")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("padding", "2px 4px")
    .style("font-size", "12px")
    .on("click", (event) => {
      event.stopPropagation();
      event.target.select();
    })
    .on("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.applyZoomFromInput(event.target);
        event.target.blur();
      } else if (event.key === "Escape") {
        this.updateZoomLevelDisplay();
        event.target.blur();
      }
    })
    .on("blur", (event) => {
      this.applyZoomFromInput(event.target);
    })
    .on("input", (event) => {
      const value = event.target.value.replace(/[^0-9]/g, '');
      event.target.value = value ? value + '%' : '';
    });
  this.scrollbar.zoomBtn = buttonsRow
    .append("button")
    .attr("class", "zoom-btn zoom-in")
    .html("+")
    .attr("title", this.translate("zoomIn"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.zoomIn();
    });
  buttonsRow.append("div").attr("class", "separator");
  this.scrollbar.fitBtn = buttonsRow
    .append("button")
    .attr("class", "zoom-btn fit-btn")
    .html("⤢")
    .attr("title", this.translate("fitToScreen"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.fitToScreen(80, true);
    });
  buttonsRow
    .append("button")
    .attr("class", "zoom-btn reset-btn")
    .html("⌂")
    .attr("title", this.translate("resetView"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.resetView();
    });
  buttonsRow.append("div").attr("class", "separator");
  this.scrollbar.collapseAllBtn = buttonsRow
    .append("button")
    .attr("class", "zoom-btn collapse-btn")
    .html("⊖")
    .attr("title", this.translate("collapseAll"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.collapseAll();
      this.updateExpandLevelDisplay();
    });
  this.scrollbar.expandAllBtn = buttonsRow
    .append("button")
    .attr("class", "zoom-btn expand-btn")
    .html("⊕")
    .attr("title", this.translate("expandAll"))
    .on("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.expandAll();
      this.updateExpandLevelDisplay();
    });
  buttonsRow.append("div").attr("class", "separator");
  const levelSelector = buttonsRow
    .append("div")
    .attr("class", "level-selector")
    .style("display", "flex")
    .style("align-items", "center")
    .style("gap", "4px");
  this.scrollbar.levelSelect = levelSelector
    .append("select")
    .attr("class", "level-select")
    .style("width", "60px")
    .style("height", "24px")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("padding", "2px 4px")
    .style("font-size", "11px")
    .style("cursor", "pointer")
    .on("change", (event) => {
      const level = parseInt(event.target.value, 10);
      if (!isNaN(level)) {
        this.expandToLevel(level);
      }
    });
  for (let i = 1; i <= 5; i++) {
    this.scrollbar.levelSelect
      .append("option")
      .attr("value", i)
      .text(this.translate(`level${i}`) );
  }
  this.makeZoomPanelDraggable(controlPanel);
  this.updateScrollbars();
}
updateExpandLevelDisplay() {
  if (!this.scrollbar.levelSelect || !this.root) return;
  const currentLevel = this.getCurrentExpandLevel();
  if (currentLevel === 0) {
    this.scrollbar.levelSelect.property("value", "1");
  } else {
    const maxPossibleLevel = this.getMaxPossibleLevel();
    if (currentLevel >= maxPossibleLevel) {
      this.scrollbar.levelSelect.property("value", "all");
    } else {
      this.scrollbar.levelSelect.property("value", currentLevel.toString());
    }
  }
}
getMaxPossibleLevel() {
  if (!this.root) return 0;
  let maxLevel = 0;
  const checkNode = (node, level) => {
    maxLevel = Math.max(maxLevel, level);
    if (node._children || node.children) {
      const children = node.children || node._children || [];
      children.forEach(child => checkNode(child, level + 1));
    }
  };
  checkNode(this.root, 0);
  return maxLevel;
}
  makeZoomPanelDraggable(controlPanel) {
      const existingHandle = controlPanel.select(".drag-handle");
      if (existingHandle.empty()) return;
      let isDragging = false;
      let startX, startY, initialLeft, initialTop;
      const handleElement = existingHandle.node();
      let dragStartHandler = (e) => {
          isDragging = true;
          const panel = d3.select("#zoom-control-panel").node();
          const rect = panel.getBoundingClientRect();
          const containerRect = document.getElementById("chart-container").getBoundingClientRect();
          startX = e.clientX;
          startY = e.clientY;
          initialLeft = rect.left - containerRect.left;
          initialTop = rect.top - containerRect.top;
          controlPanel.classed("dragging", true);
          document.addEventListener('mousemove', dragMoveHandler);
          document.addEventListener('mouseup', dragEndHandler);
          e.preventDefault();
      };
      let dragMoveHandler = (e) => {
          if (!isDragging) return;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          const newLeft = initialLeft + dx;
          const newTop = initialTop + dy;
          const container = document.getElementById("chart-container");
          const panel = d3.select("#zoom-control-panel").node();
          const containerRect = container.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();
          const maxLeft = containerRect.width - panelRect.width;
          const maxTop = containerRect.height - panelRect.height;
          const finalLeft = Math.max(0, Math.min(newLeft, maxLeft));
          const finalTop = Math.max(0, Math.min(newTop, maxTop));
          controlPanel
              .style("position", "absolute")
              .style("left", finalLeft + "px")
              .style("top", finalTop + "px")
              .style("right", "auto")
              .style("bottom", "auto");
      };
      let dragEndHandler = () => {
          isDragging = false;
          controlPanel.classed("dragging", false);
          document.removeEventListener('mousemove', dragMoveHandler);
          document.removeEventListener('mouseup', dragEndHandler);
          this.saveZoomPanelPosition();
      };
      handleElement.addEventListener('mousedown', dragStartHandler);
      handleElement.addEventListener('dblclick', () => {
          controlPanel
              .style("position", "")
              .style("left", "")
              .style("top", "")
              .style("right", "20px")
              .style("bottom", "20px");
          localStorage.removeItem('zoomPanelPosition');
      });
      this.restoreZoomPanelPosition(controlPanel);
  }
  saveZoomPanelPosition() {
      const panel = d3.select("#zoom-control-panel").node();
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const container = document.getElementById("chart-container");
      const containerRect = container.getBoundingClientRect();
      const position = {
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          isAbsolute: panel.style.position === "absolute"
      };
      localStorage.setItem('zoomPanelPosition', JSON.stringify(position));
  }
  restoreZoomPanelPosition(controlPanel) {
      const saved = localStorage.getItem('zoomPanelPosition');
      if (!saved) return;
      try {
          const position = JSON.parse(saved);
          if (position.isAbsolute) {
              controlPanel
                  .style("position", "absolute")
                  .style("left", position.left + "px")
                  .style("top", position.top + "px")
                  .style("right", "auto")
                  .style("bottom", "auto");
          }
      } catch (e) {
          console.warn("Erreur lors de la restauration de la position:", e);
      }
  }
  clearDiagramme() {
      this.cancelHideTimer();
      if (this.svg) {
          this.svg.on(".zoom", null);
      }
      if (this.tooltip) {
          this.tooltip.on("mouseenter", null);
          this.tooltip.on("mouseleave", null);
          this.tooltip.remove();
      }
      document.removeEventListener('click', this.handleDocumentClick);
      if (this.scrollbar.container) {
          const controlPanel = d3.select("#zoom-control-panel");
          if (!controlPanel.empty()) {
              controlPanel.on("mouseenter", null);
              controlPanel.on("mouseleave", null);
              controlPanel.selectAll("*").on("click", null);
              const dragHandle = controlPanel.select(".drag-handle");
              if (!dragHandle.empty()) {
                  dragHandle.on(".drag", null);
                  dragHandle.on("dblclick", null);
              }
          }
          this.scrollbar.container.remove();
      }
      if (this.svg) {
          this.svg.selectAll("*").remove();
          this.svg.remove();
      }
      window.removeEventListener("resize", () => {
          this.updateScrollbars();
      });
      this.svg = null;
      this.gRoot = null;
      this.gLinksHalo = null;
      this.gLinks = null;
      this.gNodes = null;
      this.zoom = null;
      this.tooltip = null;
      this.root = null;
      this.selectedNode = null;
      this.pinned = null;
      this.activeAnchorEl = null;
      this.scrollbar = {
          x: null,
          y: null,
          container: null,
          zoomBtn: null,
          zoomOutBtn: null,
          fitBtn: null,
          toggleBtn: null,
          expandAllBtn: null,
          collapseAllBtn: null,
          zoomLevel: null,
          isDraggingX: false,
          isDraggingY: false,
          isCollapsed: false,
      };
      const chartContainer = document.getElementById("chart-container");
      if (chartContainer) {
          const orphanToolbars = chartContainer.querySelectorAll('.zoom-control-panel');
          orphanToolbars.forEach(toolbar => {
              if (toolbar.parentNode === chartContainer) {
                  toolbar.remove();
              }
          });
          const orphanScrollbars = chartContainer.querySelectorAll('.scrollbar-container');
          orphanScrollbars.forEach(scrollbar => {
              if (scrollbar.parentNode === chartContainer) {
                  scrollbar.remove();
              }
          });
      }
    this.removeKeyboardListeners();
    this.cleanupDrag();
  }
  handleScrollbarDragStart(event, axis) {
    if (axis === "x") {
      this.scrollbar.isDraggingX = true;
    } else {
      this.scrollbar.isDraggingY = true;
    }
    d3.select(event.sourceEvent.target).classed("dragging", true);
  }
  handleScrollbarDrag(event, axis) {
    if (!this.svg || !this.zoom) return;
    const metrics = this.getScrollbarMetrics();
    if (!metrics) return;
    const { transform, world, track, thumb } = metrics;
    const viewMinX = -transform.x / transform.k;
    const viewMinY = -transform.y / transform.k;
    const viewMaxX = world.minX + Math.max(0, world.width - world.visibleWidth);
    const viewMaxY = world.minY + Math.max(0, world.height - world.visibleHeight);
    if (axis === "x") {
      const usableTrackX = Math.max(1, track.width - thumb.width);
      if (viewMaxX <= world.minX || usableTrackX <= 0) return;
      const worldDeltaX = (event.dx / usableTrackX) * (world.width - world.visibleWidth);
      const nextViewMinX = Math.max(world.minX, Math.min(viewMaxX, viewMinX + worldDeltaX));
      const nextTransform = d3.zoomIdentity
        .translate(-nextViewMinX * transform.k, transform.y)
        .scale(transform.k);
      this.svg.call(this.zoom.transform, nextTransform);
    } else {
      const usableTrackY = Math.max(1, track.height - thumb.height);
      if (viewMaxY <= world.minY || usableTrackY <= 0) return;
      const worldDeltaY = (event.dy / usableTrackY) * (world.height - world.visibleHeight);
      const nextViewMinY = Math.max(world.minY, Math.min(viewMaxY, viewMinY + worldDeltaY));
      const nextTransform = d3.zoomIdentity
        .translate(transform.x, -nextViewMinY * transform.k)
        .scale(transform.k);
      this.svg.call(this.zoom.transform, nextTransform);
    }
  }
  handleScrollbarDragEnd(axis) {
    if (axis === "x") {
      this.scrollbar.isDraggingX = false;
    } else {
      this.scrollbar.isDraggingY = false;
    }
    d3.selectAll(".scrollbar").classed("dragging", false);
  }
updateScrollbars() {
  if (!this.svg || !this.scrollbar.container || !this.root) return;
  const metrics = this.getScrollbarMetrics();
  if (!metrics) return;
  const { transform, world, track, thumb, ui } = metrics;
  const viewMinX = -transform.x / transform.k;
  const viewMinY = -transform.y / transform.k;
  const xRange = Math.max(0, world.width - world.visibleWidth);
  const yRange = Math.max(0, world.height - world.visibleHeight);
  const showX = xRange > 1;
  const showY = yRange > 1;
  const xRatio = xRange > 0 ? Math.max(0, Math.min(1, (viewMinX - world.minX) / xRange)) : 0;
  const yRatio = yRange > 0 ? Math.max(0, Math.min(1, (viewMinY - world.minY) / yRange)) : 0;
  const xThumbPos = ui.margin + xRatio * Math.max(0, track.width - thumb.width);
  const yThumbPos = ui.margin + yRatio * Math.max(0, track.height - thumb.height);
  this.scrollbar.x
    .style("display", showX ? "block" : "none")
    .style("pointer-events", showX ? "all" : "none")
    .style("width", `${thumb.width}px`)
    .style("left", `${xThumbPos}px`)
    .style("bottom", `${ui.margin}px`)
    .style("height", `${ui.thickness}px`);
  this.scrollbar.y
    .style("display", showY ? "block" : "none")
    .style("pointer-events", showY ? "all" : "none")
    .style("height", `${thumb.height}px`)
    .style("top", `${yThumbPos}px`)
    .style("right", `${ui.margin}px`)
    .style("width", `${ui.thickness}px`);
  this.updateZoomLevelDisplay();
}
getContentBounds() {
  if (!this.root) return null;
  const nodes = this.root.descendants();
  if (!nodes || nodes.length === 0) return null;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  nodes.forEach((d) => {
    const box = d._box || { w: this.MAX_TEXT_W + this.PAD_X * 2, h: 60 };
    const x = this.getNodeDisplayX(d);
    const y = this.getNodeDisplayY(d);
    const left = x;
    const right = x + box.w;
    const top = y - box.h / 2;
    const bottom = y + box.h / 2;
    minX = Math.min(minX, left);
    maxX = Math.max(maxX, right);
    minY = Math.min(minY, top);
    maxY = Math.max(maxY, bottom);
  });
  const pad = 24;
  return {
    minX: minX - pad,
    minY: minY - pad,
    maxX: maxX + pad,
    maxY: maxY + pad,
  };
}
getScrollbarMetrics() {
  const host = document.getElementById("chart");
  if (!host || !this.svg) return null;
  const width = host.clientWidth;
  const height = host.clientHeight;
  if (width <= 0 || height <= 0) return null;
  const content = this.getContentBounds();
  if (!content) return null;
  const transform = d3.zoomTransform(this.svg.node());
  const contentWidth = Math.max(1, content.maxX - content.minX);
  const contentHeight = Math.max(1, content.maxY - content.minY);
  const visibleWidth = width / Math.max(transform.k, 0.0001);
  const visibleHeight = height / Math.max(transform.k, 0.0001);
  const ui = {
    thickness: 8,
    margin: 4,
    minSize: 40,
  };
  const trackWidth = Math.max(1, width - ui.margin * 2 - (ui.thickness + ui.margin));
  const trackHeight = Math.max(1, height - ui.margin * 2 - (ui.thickness + ui.margin));
  const thumbWidth = Math.max(ui.minSize, Math.min(trackWidth, trackWidth * Math.min(1, visibleWidth / contentWidth)));
  const thumbHeight = Math.max(ui.minSize, Math.min(trackHeight, trackHeight * Math.min(1, visibleHeight / contentHeight)));
  return {
    transform,
    ui,
    track: { width: trackWidth, height: trackHeight },
    thumb: { width: thumbWidth, height: thumbHeight },
    world: {
      minX: content.minX,
      minY: content.minY,
      width: contentWidth,
      height: contentHeight,
      visibleWidth,
      visibleHeight,
    },
  };
}
setDragMode(enabled) {
  this.dragEnabled = enabled; 
  if (enabled) {
    this.cleanupDrag();
    this.enableDragDrop();
    this.addKeyboardListeners();
  } else {
    this.disableDragDrop();
    this.cleanupDrag();
    this.removeKeyboardListeners();
  }
}
  createDragBehavior() {
    return d3.drag()
      .filter((event) => {
        return this.dragEnabled && this.ctrlKeyPressed && !event.button;
      })
      .on("start", (event, d) => {
        this.dragStart(event, d);
      })
      .on("drag", (event, d) => {
        this.dragMove(event, d);
      })
      .on("end", (event, d) => {
        this.dragEnd(event, d);
      });
  }
  dragStart(event, d) {
    this.isDragging = true;
    this.dragSource = d;
    const zoomTransform = d3.zoomTransform(this.svg.node());
    const nodeGroup = this.gNodes.selectAll("g.node")
      .filter(n => n.data.id === d.data.id);
    const transform = d3.select(nodeGroup.node()).attr("transform");
    const [nodeX, nodeY] = transform.replace("translate(", "").replace(")", "").split(",").map(Number);
    const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
    const unzoomedMouseX = (mouseX - zoomTransform.x) / zoomTransform.k;
    const unzoomedMouseY = (mouseY - zoomTransform.y) / zoomTransform.k;
    this.dragOffset = {
      x: unzoomedMouseX - nodeX,
      y: unzoomedMouseY - nodeY
    };
    this.createDragPreview(d);
    this.dragPreview
      .attr("transform", `translate(${nodeX * zoomTransform.k + zoomTransform.x}, ${nodeY * zoomTransform.k + zoomTransform.y})`);
    nodeGroup.style("opacity", 0.3);
    this.createDropIndicator();
    event.sourceEvent.stopPropagation();
  }
  dragMove(event, d) {
    if (!this.dragPreview || !this.dragOffset) return;
    const zoomTransform = d3.zoomTransform(this.svg.node());
    const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
    const unzoomedMouseX = (mouseX - zoomTransform.x) / zoomTransform.k;
    const unzoomedMouseY = (mouseY - zoomTransform.y) / zoomTransform.k;
    const previewX = unzoomedMouseX - this.dragOffset.x;
    const previewY = unzoomedMouseY - this.dragOffset.y;
    const svgX = previewX * zoomTransform.k + zoomTransform.x;
    const svgY = previewY * zoomTransform.k + zoomTransform.y;
    this.dragPreview
      .attr("transform", `translate(${svgX}, ${svgY})`);
    this.updateDropIndicator(mouseX, mouseY);
    this.findDropTarget(mouseX, mouseY);
  }
  dragEnd(event, d) {
    if (!this.isDragging || !this.dragSource) return;
    if (this.dragTarget && this.isValidDrop(this.dragSource, this.dragTarget)) {
      this.applyDrop(this.dragSource, this.dragTarget);
    }
    this.cleanupDrag();
    this.isDragging = false;
    this.dragSource = null;
    this.dragTarget = null;
    event.sourceEvent.stopPropagation();
  }
  createDragPreview(node) {
    if (this.dragPreview) {
      this.dragPreview.remove();
    }
    const nodeGroup = this.gNodes.selectAll("g.node")
      .filter(n => n.data.id === node.data.id);
    if (nodeGroup.empty()) return;
    const originalNode = nodeGroup.node();
    const clone = originalNode.cloneNode(true);
    this.dragPreview = this.gRoot.append("g")
      .attr("class", "drag-preview")
      .attr("opacity", 0.7)
      .style("pointer-events", "none")
      .style("filter", "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))");
    this.dragPreview.node().appendChild(clone);
    this.dragPreview.select("rect")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "3,3");
  }
  createDropIndicator() {
    if (this.dropIndicator) {
      this.dropIndicator.remove();
    }
    this.dropIndicator = this.gRoot.append("g")
      .attr("class", "drop-indicator")
      .style("display", "none");
    this.dropIndicator.append("rect")
      .attr("width", 200)
      .attr("height", 60)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("fill", "rgba(59, 130, 246, 0.1)")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");
    this.dropIndicator.append("text")
      .attr("x", 100)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("fill", "#3b82f6")
      .attr("font-weight", "bold")
      .text("Déposer ici");
  }
  updateDropIndicator(x, y) {
    if (!this.dropIndicator) return;
    const zoomTransform = d3.zoomTransform(this.svg.node());
    const unzoomedX = (x - zoomTransform.x) / zoomTransform.k;
    const unzoomedY = (y - zoomTransform.y) / zoomTransform.k;
    const nearestNode = this.findNearestNode(unzoomedX, unzoomedY);
    if (nearestNode && nearestNode !== this.dragSource && this.isValidDrop(this.dragSource, nearestNode)) {
      const nodeGroup = this.gNodes.selectAll("g.node")
        .filter(n => n.data.id === nearestNode.data.id);
      if (!nodeGroup.empty()) {
        const transform = nodeGroup.attr("transform");
        const [tx, ty] = transform.replace("translate(", "").replace(")", "").split(",").map(Number);
        const svgX = tx * zoomTransform.k + zoomTransform.x;
        const svgY = ty * zoomTransform.k + zoomTransform.y;
        const box = nearestNode._box || { w: 200, h: 60 };
        this.dropIndicator
          .attr("transform", `translate(${svgX}, ${svgY})`)
          .style("display", "block");
        this.highlightDropTarget(nearestNode, true);
        this.dragTarget = nearestNode;
      }
    } else {
      this.dropIndicator.style("display", "none");
      this.highlightDropTarget(null, false);
      this.dragTarget = null;
    }
  }
  findNearestNode(x, y) {
    let nearestNode = null;
    let minDistance = Infinity;
    this.root.descendants().forEach(node => {
      if (node === this.dragSource) return;
      const nodeGroup = this.gNodes.selectAll("g.node")
        .filter(n => n.data.id === node.data.id)
        .node();
      if (nodeGroup) {
        const transform = d3.select(nodeGroup).attr("transform");
        const [tx, ty] = transform.replace("translate(", "").replace(")", "").split(",").map(Number);
        const box = node._box || { w: 200, h: 60 };
        const centerX = tx + box.w/2;
        const centerY = ty + box.h/2;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const isInside = x >= tx && x <= tx + box.w && y >= ty && y <= ty + box.h;
        if (isInside && distance < minDistance) {
          minDistance = distance;
          nearestNode = node;
        }
      }
    });
    return nearestNode;
  }
  findDropTarget(x, y) {
    this.dragTarget = this.findNearestNode(x, y);
  }
  isValidDrop(source, target) {
    if (!source || !target) return false;
    if (source === target) return false;
    let parent = target;
    while (parent) {
      if (parent === source) return false;
      parent = parent.parent;
    }
    if (source.data.id === "root") return false;
    return true;
  }
  applyDrop(source, target) {
    if (window.editModeManager) {
      window.editModeManager.handleDepartmentMove(source.data.id, target.data.id);
    }
    if (this.xmlParser && this.xmlParser.updateNodeParent) {
      this.xmlParser.updateNodeParent(source.data.id, target.data.id);
    }
    this.refreshTreeAfterDrop(source, target);
  }
  refreshTreeAfterDrop(source, target) {
    const xmlData = this.xmlParser.data;
    this.dataRef = this.parseXMLToD3(xmlData);
    this.startOrgChart(this.dataRef, this.display_mode || "organigramme");
    setTimeout(() => {
      this.navigateToDepartment(source.data.id);
    }, 100);
  }
highlightDropTarget(node, highlight) {
  if (!this.gNodes) return;
  this.gNodes.selectAll("g.node")
    .classed("drop-target", false)
    .select(".node-rect")
    .attr("stroke-width", 1.5);
  if (highlight && node) {
    const nodeGroup = this.gNodes.selectAll("g.node")
      .filter(n => n.data.id === node.data.id);
    nodeGroup
      .classed("drop-target", true)
      .select(".node-rect")
      .attr("stroke-width", 3)
      .attr("stroke", "#3b82f6");
  }
}
cleanupDrag() {
  if (this.dragPreview) {
    this.dragPreview.remove();
    this.dragPreview = null;
  }
  this.isPreviewCreated = false; 
  if (this.dropIndicator) {
    this.dropIndicator.remove();
    this.dropIndicator = null;
  }
  if (this.draggedNode && this.gNodes) {
    const nodeGroup = this.gNodes
      .selectAll('g.node')
      .filter(n => n.data.id === this.draggedNode.data.id);
    nodeGroup
      .classed('dragging', false)
      .style('opacity', 1);
  }
  this.highlightDropTarget(null, false);
  this.removeResizeHandles();
  this.draggedNode = null;
  this.dropTarget = null;
  this.dragOffset = null;
  this.isDragging = false;
  this.resizingNode = null;
  if (this._globalMouseUpHandler) {
    document.removeEventListener('mouseup', this._globalMouseUpHandler);
    this._globalMouseUpHandler = null;
  }
}
addKeyboardListeners() {
  this.handleKeyDown = (event) => {
    if (event.key === "Control" || event.key === "Meta") {
      this.ctrlKeyPressed = true;
      this.updateCursor();
    }
  };
  this.handleKeyUp = (event) => {
    if (event.key === "Control" || event.key === "Meta") {
      this.ctrlKeyPressed = false;
      this.updateCursor();
    }
  };
  document.addEventListener("keydown", this.handleKeyDown);
  document.addEventListener("keyup", this.handleKeyUp);
}
  removeKeyboardListeners() {
    if (this.handleKeyDown) {
      document.removeEventListener("keydown", this.handleKeyDown);
    }
    if (this.handleKeyUp) {
      document.removeEventListener("keyup", this.handleKeyUp);
    }
    this.ctrlKeyPressed = false;
    this.updateCursor();
  }
updateCursor() {
  if (!this.gNodes) return;
  const nodes = this.gNodes.selectAll("g.node");
  if (this.dragEnabled) {
    nodes.style("cursor", "grab");
    if (this.ctrlKeyPressed) {
      nodes.style("cursor", "grabbing");
    }
  } else {
    nodes.style("cursor", "default");
  }
}
setEditMode(enabled) {
  this.setDragMode(enabled);
  this.enableResizing(enabled);
  if (!enabled) {
    this.cleanupDrag();
    this.removeResizeHandles();
    this.isDragging = false;
    this.draggedNode = null;
    this.dropTarget = null;
    this.resizingNode = null;
  }
}
enableResizing(enabled) {
  this.resizingEnabled = enabled;
  if (enabled) {
    this.addResizeHandles();
  } else {
    this.removeResizeHandles();
  }
}
addResizeHandles() {
  if (!this.selectedNode) return;
  this.removeResizeHandles();
  const nodeGroup = this.gNodes
    .selectAll("g.node")
    .filter(n => n.data.id === this.selectedNode.data.id);
  if (nodeGroup.empty()) return;
  const box = this.selectedNode._box || { w: 200, h: 60 };
  this.resizeHandle = nodeGroup.append("g")
    .attr("class", "resize-handles");
  const handles = [
    { pos: "nw", x: 0, y: -box.h/2, cursor: "nw-resize" },
    { pos: "n", x: box.w/2, y: -box.h/2, cursor: "n-resize" },
    { pos: "ne", x: box.w, y: -box.h/2, cursor: "ne-resize" },
    { pos: "e", x: box.w, y: 0, cursor: "e-resize" },
    { pos: "move", x: box.w/2, y: 0, cursor: "move" },
    { pos: "se", x: box.w, y: box.h/2, cursor: "se-resize" },
    { pos: "s", x: box.w/2, y: box.h/2, cursor: "s-resize" },
    { pos: "sw", x: 0, y: box.h/2, cursor: "sw-resize" },
    { pos: "w", x: 0, y: 0, cursor: "w-resize" }
  ];
  handles.forEach(handle => {
    const handleG = this.resizeHandle.append("g")
      .attr("class", `resize-handle ${handle.pos}`)
      .attr("transform", `translate(${handle.x}, ${handle.y})`)
      .style("cursor", handle.cursor);
    handleG.append("circle")
      .attr("r", 6)
      .attr("fill", "white")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2);
    if (handle.pos === "move") {
      handleG.append("path")
        .attr("d", "M -3,0 L 3,0 M 0,-3 L 0,3")
        .attr("stroke", "#2563eb")
        .attr("stroke-width", 1.5)
        .attr("stroke-linecap", "round")
        .attr("fill", "none");
    } else {
      handleG.append("rect")
        .attr("x", -2)
        .attr("y", -2)
        .attr("width", 4)
        .attr("height", 4)
        .attr("fill", "#3b82f6")
        .attr("rx", 1)
        .attr("ry", 1);
    }
    handleG.on("click", (event) => {
      event.stopPropagation();
    });
    handleG.on("mousedown", (event) => {
      event.stopPropagation();
    });
    const dragBehavior = d3.drag()
      .on("start", (event) => {
        event.sourceEvent.stopPropagation();
        event.sourceEvent.preventDefault();
        this.resizingNode = this.selectedNode;
        this.resizeDirection = handle.pos;
        if (handle.pos === "move") {
          const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
          this.moveStartX = mouseX;
          this.moveStartY = mouseY;
          this.moveStartOffsetX = this.selectedNode._offsetX || 0;
          this.moveStartOffsetY = this.selectedNode._offsetY || 0;
          nodeGroup.classed("resizing", true);
          return;
        }
        const box = this.selectedNode._box;
        this.resizeStartWidth = box.w;
        this.resizeStartHeight = box.h;
        const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
        this.resizeStartX = mouseX;
        this.resizeStartY = mouseY;
        const nodeTransform = nodeGroup.attr("transform");
        const matches = nodeTransform.match(/translate\(([^,]+),([^)]+)\)/);
        if (matches) {
          this.resizeNodeX = parseFloat(matches[1]);
          this.resizeNodeY = parseFloat(matches[2]);
        }
        nodeGroup.classed("resizing", true);
      })
      .on("drag", (event) => {
        if (!this.resizingNode) return;
        event.sourceEvent.stopPropagation();
        event.sourceEvent.preventDefault();
        const [mouseX, mouseY] = d3.pointer(event, this.svg.node());
        const zoomTransform = d3.zoomTransform(this.svg.node());
        if (this.resizeDirection === "move") {
          const moveDeltaX = (mouseX - this.moveStartX) / zoomTransform.k;
          const moveDeltaY = (mouseY - this.moveStartY) / zoomTransform.k;
          this.selectedNode._offsetX = this.moveStartOffsetX + moveDeltaX;
          this.selectedNode._offsetY = this.moveStartOffsetY + moveDeltaY;
          nodeGroup.attr("transform", this.getNodeTransform(this.selectedNode));
          this.updateLinks();
          return;
        }
        const deltaX = mouseX - this.resizeStartX;
        const deltaY = mouseY - this.resizeStartY;
        const adjustedDeltaX = deltaX / zoomTransform.k;
        const adjustedDeltaY = deltaY / zoomTransform.k;
        let newWidth = this.resizeStartWidth;
        let newHeight = this.resizeStartHeight;
        switch (this.resizeDirection) {
          case "nw":
            newWidth -= adjustedDeltaX;
            newHeight -= adjustedDeltaY;
            break;
          case "n":
            newHeight -= adjustedDeltaY;
            break;
          case "ne":
            newWidth += adjustedDeltaX;
            newHeight -= adjustedDeltaY;
            break;
          case "e":
            newWidth += adjustedDeltaX;
            break;
          case "se":
            newWidth += adjustedDeltaX;
            newHeight += adjustedDeltaY;
            break;
          case "s":
            newHeight += adjustedDeltaY;
            break;
          case "sw":
            newWidth -= adjustedDeltaX;
            newHeight += adjustedDeltaY;
            break;
          case "w":
            newWidth -= adjustedDeltaX;
            break;
        }
        newWidth = Math.max(120, Math.min(400, newWidth));
        newHeight = Math.max(40, Math.min(200, newHeight));
        this.selectedNode._manualSize = true;
        this.selectedNode._box = { w: newWidth, h: newHeight };
        this.refreshCard(nodeGroup.select(".node-card"), this.selectedNode);
        this.updateLinks();
      })
      .on("end", (event) => {
        event.sourceEvent.stopPropagation();
        event.sourceEvent.preventDefault();
        nodeGroup.classed("resizing", false);
        if (this.resizeDirection === "move") {
          this.updateLinks();
          this.resizingNode = null;
          this.resizeDirection = null;
          return;
        }
        this.update(this.selectedNode);
        if (window.editModeManager) {
        }
        this.resizingNode = null;
        this.resizeDirection = null;
      });
    handleG.call(dragBehavior);
  });
}
updateLinks() {
  if (!this.root) return;
  const links = this.root.links();
  const linkKey = (d) => d.target.data.id;
  const linkHalo = this.gLinksHalo.selectAll("path").data(links, linkKey);
  linkHalo
    .join(
      enter => enter.append("path").attr("class", "link-halo"),
      update => update,
      exit => exit.remove()
    )
    .attr("d", (d) => this.getLinkPath(d, this.display_mode));
  const link = this.gLinks.selectAll("path").data(links, linkKey);
  link
    .join(
      enter => enter.append("path").attr("class", "link"),
      update => update,
      exit => exit.remove()
    )
    .attr("stroke", (d) => this.nodeColor(d.source))
    .attr("d", (d) => this.getLinkPath(d, this.display_mode));
}
removeResizeHandles() {
  if (this.resizeHandle) {
    this.resizeHandle.remove();
    this.resizeHandle = null;
  }
}
toggleResizeHandles(node) {
    if (this.selectedNode && this.selectedNode.data.id === node.data.id) {
        if (this.resizeHandle) {
            this.removeResizeHandles();
        } else {
            this.addResizeHandles();
        }
    } else {
        this.showDepartmentDetails(node);
        setTimeout(() => {
            this.addResizeHandles();
        }, 50);
    }
}
closeResizeHandles() {
    this.removeResizeHandles();
}
handleDocumentClick(event) {
    if (event.target.closest && event.target.closest('.resize-handle')) {
        return;
    }
    if (this.selectedNode && this.resizeHandle) {
        const clickTarget = event.target;
        const nodeGroup = this.gNodes
            .selectAll("g.node")
            .filter(n => n.data.id === this.selectedNode.data.id)
            .node();
        if (nodeGroup && !nodeGroup.contains(clickTarget)) {
            this.closeResizeHandles();
        }
    }
}
debugResize() {
}
}
