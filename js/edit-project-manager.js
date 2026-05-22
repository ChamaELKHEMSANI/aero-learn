class EditProjectManager {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.lng = editModeManager.lng || 'en';
        this.blInternalAsset=true;
        this.translations = {
            en: {
                exportHTML: 'Export HTML',
                exportHTMLConfig: 'HTML Export Configuration',
                htmlTitle: 'Title',
                exportScope: 'Departments to export',
                exportAllDepartments: 'All departments',
                exportVisibleDepartments: 'Only displayed departments',
                displayMode: 'Display mode',
                displayTheme: 'Display theme',
                showControls: 'Display options',
                showModeSelector: 'Show mode selector',
                showThemeSelector: 'Show theme selector',
                showShortcutSelector: 'Show shortcut selector',
                showSimpleSearch: 'Show simple search',
                showAdvancedSearch: 'Show advanced search',
                showQuiz: 'Show Quiz',
                showDetailsInModal: 'Show details in modal',
                generateHTML: 'Generate HTML',
                selectAll: 'Select All',
                deselectAll: 'Deselect All',
                organigram: 'Organigram',
                reverseTree: 'Reverse Tree',
                reverseTreeClassroom: 'Reverse Tree classroom',
                simplifiedReverseTree: 'Simplified Reverse Tree',
                rolodex: 'Rolodex',
                windowsExplorer: 'Windows Explorer',
                light: 'Light',
                dark: 'Dark',
                blue: 'Blue',
                green: 'Green',
                cancel: 'Cancel',
                generatingExport: 'Generating export...',
                exportFailed: 'Export failed',
                htmlExported: 'HTML file generated successfully!',
                htmlPreviewBlocked: 'Preview blocked by the browser popup settings.'
            },
            fr: {
                exportHTML: 'Exporter HTML',
                exportHTMLConfig: 'Configuration de l\'export HTML',
                htmlTitle: 'Titre',
                exportScope: 'Départements à exporter',
                exportAllDepartments: 'Tous les départements',
                exportVisibleDepartments: 'Seulement les départements affichés',
                displayMode: 'Mode d\'affichage',
                displayTheme: 'Thème d\'affichage',
                showModeSelector: 'Afficher le sélecteur de mode',
                showThemeSelector: 'Afficher le sélecteur de thème',
                showShortcutSelector: 'Afficher le sélecteur de raccourcis',
                showAdvancedSearch: 'Afficher la recherche avancée',
                showSimpleSearch: 'Afficher la recherche simple',
                showQuiz: 'Afficher le Quiz',
                showDetailsInModal: 'Afficher les détails dans une modale',
                generateHTML: 'Générer HTML',
                selectAll: 'Tout sélectionner',
                deselectAll: 'Tout désélectionner',
                organigram: 'Organigramme',
                reverseTree: 'Arbre Inverse',
                reverseTreeClassroom: 'Arbre Inverse  classroom',
                simplifiedReverseTree: 'Arbre Inverse Simplifié',
                rolodex: 'Rolodex',
                windowsExplorer: 'Explorateur Windows',
                light: 'Clair',
                dark: 'Sombre',
                blue: 'Bleu',
                green: 'Vert',
                showControls: 'Afficher les controles',
                cancel: 'Annuler',
                generatingExport: 'Génération de l\'export...',
                exportFailed: 'Échec de l\'export',
                htmlExported: 'Fichier HTML généré avec succès!'
            }
        };
        this.init();
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    setLang(lng) {
        this.lng = lng;
        this.updateModalTranslations();
    }
    init() {
        this.createHtmlExportModal();
        this.attachEventListeners();
    }
    createHtmlExportModal() {
        const modal = document.createElement('div');
        modal.className = 'html-export-modal';
        modal.id = 'html-export-modal';
        modal.innerHTML = `
            <div class="html-export-modal-content">
                <div class="html-export-modal-header">
                    <h2>${this.translate('exportHTMLConfig')}</h2>
                    <button class="html-export-modal-close" id="html-export-modal-close">&times;</button>
                </div>
                <div class="html-export-modal-body">
                    <div class="html-export-form">
                        <div class="html-export-grid">
                            <div class="form-group">
                                <label for="html-title">${this.translate('htmlTitle')}</label>
                                <input type="text" id="html-title" name="html-title" value="Organizational Chart">
                            </div>
                            <div class="form-group">
                                <label for="display-mode">${this.translate('displayMode')}</label>
                                <select id="display-mode" name="display-mode">
                                    <option value="organigram">${this.translate('organigram')}</option>
                                    <option value="reverse-tree">${this.translate('reverseTree')}</option>
                                    <option value="reverse-tree-classroom">${this.translate('reverseTreeClassroom')} Classroom</option>
                                    <option value="simplified-reverse-tree">${this.translate('simplifiedReverseTree')}</option>
                                    <option value="rolodex">${this.translate('rolodex')}</option>
                                    <option value="windows-explorer">${this.translate('windowsExplorer')}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="export-scope">${this.translate('exportScope')}</label>
                                <select id="export-scope" name="export-scope">
                                    <option value="all">${this.translate('exportAllDepartments')}</option>
                                    <option value="visible">${this.translate('exportVisibleDepartments')}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="display-theme">${this.translate('displayTheme')}</label>
                                <select id="display-theme" name="display-theme">
                                    <option value="light">${this.translate('light')}</option>
                                    <option value="dark">${this.translate('dark')}</option>
                                    <option value="blue">${this.translate('blue')}</option>
                                    <option value="green">${this.translate('green')}</option>
                                </select>
                            </div>
                        </div>
                        <div class="checkboxes-group">
                            <div class="html-export-section-header">
                                <h3>${this.translate('showControls')}</h3>
                                <div class="checkbox-actions">
                                    <button type="button" class="btn btn-small" id="select-all">${this.translate('selectAll')}</button>
                                    <button type="button" class="btn btn-small" id="deselect-all">${this.translate('deselectAll')}</button>
                                </div>
                            </div>
                            <div class="html-export-checkbox-grid">
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-mode-selector" name="show-mode-selector" checked>
                                        ${this.translate('showModeSelector')}
                                    </label>
                                </div>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-theme-selector" name="show-theme-selector" >
                                        ${this.translate('showThemeSelector')}
                                    </label>
                                </div>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-simple-search" name="show-simple-search" checked>
                                        ${this.translate('showSimpleSearch')}
                                    </label>
                                </div>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-shortcut-selector" name="show-shortcut-selector" >
                                        ${this.translate('showShortcutSelector')}
                                    </label>
                                </div>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-advanced-search" name="show-advanced-search" checked>
                                        ${this.translate('showAdvancedSearch')}
                                    </label>
                                </div>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-quiz" name="show-quiz" >
                                        ${this.translate('showQuiz')}
                                    </label>
                                </div>
                                <div class="checkbox-group">
                                    <label>
                                        <input type="checkbox" id="show-details-in-modal" name="show-details-in-modal" >
                                        ${this.translate('showDetailsInModal')}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="html-export-modal-footer form-actions">
                    <button type="button" class="btn btn-secondary" id="cancel-html-export">${this.translate('cancel')}</button>
                    <button type="button" class="btn btn-primary" id="generate-html">${this.translate('generateHTML')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    attachEventListeners() {
        document.getElementById('html-export-modal-close').addEventListener('click', () => {
            this.closeHtmlExportModal();
        });
        document.getElementById('cancel-html-export').addEventListener('click', () => {
            this.closeHtmlExportModal();
        });
        document.getElementById('select-all').addEventListener('click', () => {
            this.selectAllHtmlOptions(true);
        });
        document.getElementById('deselect-all').addEventListener('click', () => {
            this.selectAllHtmlOptions(false);
        });
        document.getElementById('generate-html').addEventListener('click', () => {
            this.generateHtmlExport();
        });
        document.getElementById('html-export-modal').addEventListener('click', (e) => {
            if (e.target.id === 'html-export-modal') {
                this.closeHtmlExportModal();
            }
        });
    }
    showHtmlExportDialog() {
        document.getElementById('html-export-modal').classList.add('active');
    }
    closeHtmlExportModal() {
        document.getElementById('html-export-modal').classList.remove('active');
    }
    selectAllHtmlOptions(select) {
        const checkboxes = document.querySelectorAll('#html-export-modal input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = select;
        });
    }
    generateHtmlExport() {
        const config = {
            title: document.getElementById('html-title').value,
            display_mode: document.getElementById('display-mode').value,
            export_scope: document.getElementById('export-scope').value,
            display_theme: document.getElementById('display-theme').value,
            show_modes: document.getElementById('show-mode-selector').checked,
            show_themes: document.getElementById('show-theme-selector').checked,
            show_filters: document.getElementById('show-shortcut-selector').checked,
            show_simple_search: document.getElementById('show-simple-search').checked,
            show_advanced_search: document.getElementById('show-advanced-search').checked,
            show_quiz: document.getElementById('show-quiz').checked,
            show_details_in_modal: document.getElementById('show-details-in-modal').checked
        };
        const xmlData = this.getXmlDataForHtmlExport(config.export_scope);
        const encodedXmlData = this.editModeManager.xmlParser.encodeBase64XML(xmlData);
        const appConfig = this.editModeManager.configManager.appConfig;
        const htmlContent = this.generateHtmlContent(encodedXmlData, config, appConfig);
        this.downloadHtmlFile(htmlContent, config.title);
        if (appConfig.openHtmlPreviewInNewWindow !== false) {
            this.openHtmlPreview(htmlContent);
        }
        this.closeHtmlExportModal();
        this.editModeManager.showNotification(this.translate('htmlExported'), 'success');
    }
    getVisibleDepartmentsForHtmlExport() {
        const parserNodes = this.editModeManager?.xmlParser?.data?.nodes || [];
        const runtimeDiagram = this.editModeManager?.diagramme?.diagramme || this.editModeManager?.diagramme;
        const runtimeRoot = runtimeDiagram?.root;
        if (!runtimeRoot) {
            return parserNodes;
        }
        const visibleIds = new Set(
            runtimeRoot
                .descendants()
                .filter((d) => d && d.data && d.data.id && d.data.id !== 'root')
                .map((d) => d.data.id)
        );
        return parserNodes.filter((node) => visibleIds.has(node.id));
    }
    filterXMLToVisibleDepartments(xmlString) {
        const selectedDepartments = this.getVisibleDepartmentsForHtmlExport();
        const selectedDeptIds = new Set(selectedDepartments.map((department) => department.id));
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
    getXmlDataForHtmlExport(exportScope) {
        const fullXml = this.editModeManager.xmlParser.exportToXML();
        return exportScope === 'visible'
            ? this.filterXMLToVisibleDepartments(fullXml)
            : fullXml;
    }
    generateHtmlContent(encodedXmlData, config,appConfig) {
        return `<!DOCTYPE html>
<html lang="en" data-theme="${config.display_theme}">
<head>
  <meta charset="UTF-8" />
  <title>${config.title}</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='20' r='8' fill='%23007acc'/><circle cx='30' cy='50' r='8' fill='%23007acc'/><circle cx='50' cy='50' r='8' fill='%23007acc'/><circle cx='70' cy='50' r='8' fill='%23007acc'/><circle cx='20' cy='80' r='8' fill='%23007acc'/><circle cx='40' cy='80' r='8' fill='%23007acc'/><circle cx='60' cy='80' r='8' fill='%23007acc'/><circle cx='80' cy='80' r='8' fill='%23007acc'/><path d='M50,28 L50,42 M30,42 L30,72 M50,58 L50,72 M70,42 L70,72' stroke='%23007acc' stroke-width='3' fill='none'/></svg>">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Preload des polices -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   ${config.show_modes ? `${this.include('d3.v7.min.js')}`
                :
                `${config.display_mode == 'reverse-tree' || config.display_mode == 'reverse-tree-classroom' || config.display_mode == 'simplified-reverse-tree' || config.display_mode == 'organigram' ? `${this.include('d3.v7.min.js')}`
                    : ``
                }`
            }   
 <script>
    const DISPLAY_MODE = "${config.display_mode}";
    const XML_DATA = "${encodedXmlData}";
    const XML_EXTERNAL =false;
    const XML_ENCODE =true;
    const blBadgeTasks= ${appConfig.showBadges.tasks ? `true` : `false`}; 
    const blBadgeDocs= ${appConfig.showBadges.documents ? `true` : `false`}; 
    const blBadgePosts=  ${appConfig.showBadges.positions ? `true` : `false`}; 
    const blBadgeAbbrev=  ${appConfig.showBadges.abreviation ? `true` : `false`}; 
    const modeSelector = ${config.show_modes ? `true` : `false`}; 
    ${config.show_details_in_modal == true ?
`    const DETAILS_MODAL=true;`
    :
`    const DETAILS_MODAL=false;`
    }
    ${config.show_filters || config.show_advanced_search || config.show_themes || config.show_modes || config.show_quiz ?
                `const CONTROLS_ENABLED=true;`
                :
                `const CONTROLS_ENABLED=false;`
            }
    </script>    
        ${this.include('toolbar.css')}
        ${this.include('buttons.css')}
        ${this.include('themes.css')}
        ${config.show_modes ?
                `
            ${this.include('diagramme-organigramme.css')}
            ${this.include('diagramme-rolodex.css')}
            ${this.include('diagramme-windows-explorer.css')}
            `
                :
                `
            ${config.display_mode == 'reverse-tree' || config.display_mode == 'reverse-tree-classroom' || config.display_mode == 'organigram' || config.display_mode == 'simplified-reverse-tree' ?
                    `${this.include('diagramme-organigramme.css')}`
                    : ``}
            ${config.display_mode == 'rolodex' ?
                    `${this.include('diagramme-rolodex.css')}`
                    : ``}     
            ${config.display_mode == 'windows-explorer' ?
                    `${this.include('diagramme-windows-explorer.css')}`
                    : ``}
            `
            }
        ${config.show_quiz ?
                `${this.include('qcmgenerator.css')}`
                : ``} 
        ${config.show_themes || config.show_languages ?
                `${this.include('themeselect.css')}`
                : ``}
        ${config.show_filters ?
                `${this.include('queryselect.css')}`
                : ``}
        ${config.show_modes ?
                `${this.include('modeselect.css')}`
                : ``}
        ${(config.show_advanced_search || config.show_simple_search )?
                `${this.include('querysearch.css')}`
                : ``}
        ${this.include('querydetails.css')}
</head >
    <body>
        ${config.show_filters || config.show_simple_search || config.show_advanced_search || config.show_themes || config.show_modes || config.show_quiz ?
                `<div class="controls">
            <div class="toolbar-main">
                <h1 class="toolbar-title" id="toolbar_main_h1">${config.title}</h1>
                <div class="toolbar-controls">
                    ${config.show_filters ?
                    `<select id="department-select" class="department-select">
                        <option value="">Navigation ...</option>
                        <!-- Les options seront générées dynamiquement -->
                    </select>`
                    : ``}
                    ${config.show_simple_search ?
                    `<div id="query-search-simple-container"></div> `
                    : ``}
                    ${config.show_advanced_search ?
                    `<button id="query-view" class="btn-primary" title="Advanced Search" >Advanced Search</button>`
                    : ``}
                    ${config.show_themes ?
                    `<div class="theme-select-container" ID="show_themes"></div>`
                    : ``}
                    ${config.show_languages ?
                    `<div class="language-select-container" ID="show_languages"></div>`
                    : ``}
                    ${config.show_modes ?
                    `<div class="mode-select-container" ID="show_modes"></div>`
                    : ``}
                    ${config.show_quiz ?
                    `<button id="qcm-view" class="btn-primary" title="Start Quiz" >Start Quiz</button>`
                    : ``}
                </div>
            </div>
        </div>
        ` : ``}
        <main>
            <div id="main-container-diagramme"></div>
        </main>
        ${config.show_advanced_search ?
                `<div id="search-modal" class="modal hidden"></div>`
                : ``}
        ${config.show_quiz ?
                `<div id="quiz-modal" class="quiz-modal hidden"></div>`
                : ``}
            ${this.include('xmlparse.js')}
            ${config.show_modes ?
                `${this.include('diagramme-organigramme.js')}
                 ${this.include('diagramme-arbre-inverse-simplifie.js')}
                 ${this.include('diagramme-rolodex.js')}
                 ${this.include('diagramme-windows-explorer.js')}
                 ${this.include('diagramme.js')}
                 `
                : `
                ${config.display_mode == 'reverse-tree' || config.display_mode == 'reverse-tree-classroom' || config.display_mode == 'organigram' ?
                    `${this.include('diagramme-organigramme.js')}`
                    : ``}
                ${config.display_mode == 'simplified-reverse-tree' ?
                    `${this.include('diagramme-arbre-inverse-simplifie.js')}`
                    : ``}
                ${config.display_mode == 'rolodex' ?
                    `${this.include('diagramme-rolodex.js')}`
                    : ``}
                ${config.display_mode == 'windows-explorer' ?
                    `${this.include('diagramme-windows-explorer.js')}`
                    : ``}
                ${this.include('diagramme.js')}
                `}
            ${config.show_quiz ?
                `${this.include('qcmgenerator.js')}`
                : ``}
            ${config.show_filters ?
                `${this.include('queryselect.js')}`
                : ``}
            ${config.show_simple_search ?
                `${this.include('querysearch-simple.js')}`
                : ``}
            ${config.show_advanced_search ?
                `${this.include('querysearch-advanced.js')}`
                : ``}
            ${this.include('department-details-general.js')}
            ${this.include('department-details-position.js')}
            ${this.include('department-details-task.js')}
            ${this.include('department-details-documents.js')}
            ${this.include('department-details.js')}   
            ${config.show_themes ?
                `${this.include('themeselect.js')}`
                : ``}
            ${config.show_languages ?
                `${this.include('languageselect.js')}`
                : ``}
            ${this.include('app.js')}
<script>
// Démarrer l'application
document.addEventListener('DOMContentLoaded', () => {
    async function init() {
    const xmlParser = new  XMLParser('en', XML_DATA, XML_EXTERNAL,XML_ENCODE);
    await xmlParser.waitForLoad();
    const queryDetails =  new DepartmentDetails(xmlParser,DETAILS_MODAL);
    ${config.show_simple_search ?
                `const querySearchSimple =new QuerySearchSimple(xmlParser) ;`
                : `const querySearchSimple = null;`}
    ${config.show_advanced_search ?
                `const querySearchAdvanced =new QuerySearchAdvanced(xmlParser) ;`
                : `const querySearchAdvanced = null;`}
    const languageSelect = null;
    ${config.show_themes ?
                `const themeSelect = new ThemeSelect(xmlParser) ;
                document.documentElement.setAttribute('data-theme', '${config.display_theme}');`
                : `const themeSelect = null;`}
    ${config.show_quiz ?
                `const qcmGenerator = new QCMGenerator(xmlParser); `
                : `const qcmGenerator = null;`}
    ${config.show_filters ?
                `const querySelect = new QuerySelect(xmlParser); `
                : `const querySelect = null;`}
                   const diagramme = new Diagramme(xmlParser,modeSelector,blBadgeTasks,blBadgeDocs,blBadgePosts,blBadgeAbbrev,  DETAILS_MODAL, CONTROLS_ENABLED);
                 new App(xmlParser,diagramme,querySelect,querySearchSimple,querySearchAdvanced,queryDetails,qcmGenerator,themeSelect,languageSelect,'${config.display_theme}','en','','${config.title}',DISPLAY_MODE);
    ${config.show_quiz ?
                `const startQuizButton = document.getElementById('qcm-view');
                if (startQuizButton) {
                    startQuizButton.addEventListener('click', (event) => {
                        event.preventDefault();
                        if (qcmGenerator && typeof qcmGenerator.openModal === 'function') {
                            qcmGenerator.openQuizFromToolbar(null);;
                        }
                    });
                }`
                : `const startQuizButton = null;`}
            }
            init();
});
</script>
    </body>
</html >
`;
    }
   getFileExtension(filename) {
        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex === -1 ||  lastDotIndex === 0 ||  lastDotIndex === filename.length - 1) {
            return '';
        }
        return filename.slice(lastDotIndex + 1).toLowerCase();
    }
    include(asset) {
        const extension=this.getFileExtension(asset);
        if(this.blInternalAsset){
            if (!(asset in this.editModeManager.tab_assets)) {
                console.error(`L'asset manquant: ${asset}`);
                return '';
            }
            const assetSrc= this.editModeManager.assetManager.decompress(this.editModeManager.tab_assets[asset]);
            if(extension==='js')
                return `<script>
                        ${assetSrc}
                        </script>`;
            else if(extension==='css')
                return `<style>
                        ${assetSrc}
                        </style>`;    
            return  '';
        } else {
            if(extension==='js')
                return `<script src="/js/${asset}"></script>`;
            else if(extension==='css')
                return `<link rel="stylesheet" href="/css/${ asset}">`;
            return  '';
        }
    }
    downloadHtmlFile(content, title) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const timestamp = new Date().getTime();
        a.download = `organigramme-${timestamp}.html`;
        a.style.display = 'none';
        document.body.appendChild(a);
        setTimeout(() => {
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }, 0);
    }
    openHtmlPreview(content) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const previewWindow = window.open(url, '_blank');
        if (!previewWindow) {
            URL.revokeObjectURL(url);
            const message = this.lng === 'fr'
                ? 'La previsualisation a ete bloquee par le navigateur.'
                : 'Preview blocked by the browser popup settings.';
            this.editModeManager.showNotification(message, 'warning');
            return;
        }
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 60000);
    }
    updateModalTranslations() {
        const modal = document.getElementById('html-export-modal');
        if (!modal) return;
        const title = modal.querySelector('.html-export-modal-header h2');
        if (title) title.textContent = this.translate('exportHTMLConfig');
        const htmlTitleLabel = modal.querySelector('label[for="html-title"]');
        if (htmlTitleLabel) htmlTitleLabel.textContent = this.translate('htmlTitle');
        const displayModeLabel = modal.querySelector('label[for="display-mode"]');
        if (displayModeLabel) displayModeLabel.textContent = this.translate('displayMode');
        const exportScopeLabel = modal.querySelector('label[for="export-scope"]');
        if (exportScopeLabel) exportScopeLabel.textContent = this.translate('exportScope');
        const displayThemeLabel = modal.querySelector('label[for="display-theme"]');
        if (displayThemeLabel) displayThemeLabel.textContent = this.translate('displayTheme');
        const modeOptions = modal.querySelectorAll('#display-mode option');
        const modeMap = {
            'organigram': 'organigram',
            'reverse-tree': 'reverseTree', 
            'reverse-tree-classroom': 'reverseTreeClassroom',
            'simplified-reverse-tree': 'simplifiedReverseTree',
            'rolodex': 'rolodex',
            'windows-explorer': 'windowsExplorer'
        };
        modeOptions.forEach(option => {
            const translationKey = modeMap[option.value];
            if (translationKey) {
                option.textContent = this.translate(translationKey);
            }
        });
        const scopeOptions = modal.querySelectorAll('#export-scope option');
        const scopeMap = {
            'all': 'exportAllDepartments',
            'visible': 'exportVisibleDepartments'
        };
        scopeOptions.forEach(option => {
            const translationKey = scopeMap[option.value];
            if (translationKey) {
                option.textContent = this.translate(translationKey);
            }
        });
        const themeOptions = modal.querySelectorAll('#display-theme option');
        const themeMap = {
            'light': 'light',
            'dark': 'dark',
            'blue': 'blue',
            'green': 'green'
        };
        themeOptions.forEach(option => {
            const translationKey = themeMap[option.value];
            if (translationKey) {
                option.textContent = this.translate(translationKey);
            }
        });
        const checkboxSectionTitle = modal.querySelector('.checkboxes-group h3');
        if (checkboxSectionTitle) {
            checkboxSectionTitle.textContent = this.translate('showControls');
        }
        const checkboxLabels = modal.querySelectorAll('.checkbox-group label');
        const checkboxKeys = [
            'showModeSelector',
            'showThemeSelector',
            'showShortcutSelector',
            'showSimpleSearch',
            'showAdvancedSearch',
            'showQuiz',
            'showDetailsInModal'
        ];
        checkboxLabels.forEach((label, index) => {
            if (checkboxKeys[index]) {
                const checkbox = label.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    let foundCheckbox = false;
                    Array.from(label.childNodes).forEach(node => {
                        if (node === checkbox) {
                            foundCheckbox = true;
                        } else if (foundCheckbox && node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = this.translate(checkboxKeys[index]);
                        }
                    });
                }
            }
        });
        const selectAllBtn = modal.querySelector('#select-all');
        if (selectAllBtn) selectAllBtn.textContent = this.translate('selectAll');
        const deselectAllBtn = modal.querySelector('#deselect-all');
        if (deselectAllBtn) deselectAllBtn.textContent = this.translate('deselectAll');
        const cancelBtn = modal.querySelector('#cancel-html-export');
        if (cancelBtn) cancelBtn.textContent = this.translate('cancel');
        const generateBtn = modal.querySelector('#generate-html');
        if (generateBtn) generateBtn.textContent = this.translate('generateHTML');
        const closeBtn = modal.querySelector('.html-export-modal-close');
        if (closeBtn) closeBtn.title = this.translate('cancel');
    }
}
