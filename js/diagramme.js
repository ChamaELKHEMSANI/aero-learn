class Diagramme {
    constructor(xmlParser,  modeSelector,blBadgeTasks,blBadgeDocs,blBadgePosts,blBadgeAbbrev, bModal = false,bControlsEnabled = true) {
        this.lng = 'en';
        this.modeSelector = modeSelector;
        this.xmlParser = xmlParser;
        this.querySelect = null;
        this.QuerySearch = null;
        this.departmentDetails = null;
        this.display_mode = null;
        this.diagramme = null;
        this.bModal=bModal;
        this.bControlsEnabled = bControlsEnabled;
        this.blBadgeTasks=blBadgeTasks;
        this.blBadgeDocs=blBadgeDocs;
        this.blBadgePosts=blBadgePosts;
        this.blBadgeAbbrev=blBadgeAbbrev;
        this.translations = {
            fr: {
                windowsExplorer: "Explorateur Windows",
                rolodex: "Rolodex",
                organigram: "Organigramme",
                arbreInverseClasse: "Arbre inversé salle de classe",
                arbreInverse: "Arbre inversé",
                arbreInverseSimplifie: "Arbre inversé simplifié",
                modeSelect: "Sélection du mode d'affichage",
                unknownMode: "Mode d'affichage inconnu",
                diagramNotInitialized: "Diagramme non initialisé."
            },
            en: {
                windowsExplorer: "Windows Explorer",
                rolodex: "Rolodex",
                organigram: "Organization Chart",
                arbreInverseClasse: "Classroom Inverted Tree",
                arbreInverse: "Inverted Tree",
                arbreInverseSimplifie: "Simplified Inverted Tree",
                modeSelect: "Display mode selection",
                unknownMode: "Unknown display mode",
                diagramNotInitialized: "Diagram not initialized."
            }
        };
    }
    initialize(lng, display_mode, querySelect, QuerySearch, departmentDetails) {
        this.lng = lng || 'fr';
        this.querySelect = querySelect;
        this.QuerySearch = QuerySearch;
        this.departmentDetails = departmentDetails;
        this.ShowMode(display_mode);
        if (this.modeSelector) {
            this.init(display_mode);
            this.setupSelectEventListener();
        }
    }
    setLang(lng) {
        this.lng = lng || 'en';
        this.updateModeOptions();
        if (this.diagramme) {
            this.diagramme.setLang(this.lng);
        }
    }
    updateBadgeVisibility (showBadges){
        if(!this.diagramme)
            return;
        if (this.display_mode =="organigram" || this.display_mode =="reverse-tree" || this.display_mode == "reverse-tree-classroom") {
            this.diagramme.updateBadgeVisibility(showBadges)
        }
    }
    updateModeOptions() {
        const select = document.getElementById('show_mode_select');
        if (!select) return;
        const currentValue = select.value;
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            const modeValue = option.value;
            const translationKey = this.getTranslationKeyForMode(modeValue);
            if (this.translations[this.lng] && this.translations[this.lng][translationKey]) {
                option.textContent = this.translations[this.lng][translationKey];
            }
        });
        select.value = currentValue;
        const label = document.querySelector('label[for="show_mode_select"]');
        if (label && this.translations[this.lng] && this.translations[this.lng]['modeSelect']) {
            label.textContent = this.translations[this.lng]['modeSelect'];
        }
    }
    getTranslationKeyForMode(modeValue) {
        switch (modeValue) {
            case 'windows-explorer':
                return 'windowsExplorer';
            case 'rolodex':
                return 'rolodex';
            case 'organigram':
                return 'organigram';
            case 'reverse-tree':
                return 'arbreInverse';
            case 'reverse-tree-classroom':
                return 'arbreInverseClasse';
            case 'simplified-reverse-tree':
                return 'arbreInverseSimplifie';
            default:
                return modeValue;
        }
    }
    translate(key) {
        if (this.translations[this.lng] && this.translations[this.lng][key]) {
            return this.translations[this.lng][key];
        }
        return key;
    }
    init(display_mode) {
        const container = document.getElementById('show_modes');
        if (!container) return;
        container.innerHTML = `
            <div class="mode-select-container">
                <select class="mode-select" id="show_mode_select" title="${this.translate('modeSelect')}">
                    <option value="windows-explorer">${this.translate('windowsExplorer')}</option>
                    <option value="rolodex">${this.translate('rolodex')}</option>
                    <option value="organigram">${this.translate('organigram')}</option>
                    <option value="reverse-tree">${this.translate('arbreInverse')}</option>
                    <option value="reverse-tree-classroom">${this.translate('arbreInverseClasse')}</option>
                    <option value="simplified-reverse-tree">${this.translate('arbreInverseSimplifie')}</option>
                </select>
            </div>
        `;
        const select = document.getElementById('show_mode_select');
        if (select) {
            select.value = display_mode || 'windows-explorer';
        }
    }
    ShowMode(display_mode) {
        this.display_mode = display_mode || 'windows-explorer';
        if (this.diagramme && typeof this.diagramme.clearDiagramme === 'function') {
            this.diagramme.clearDiagramme();
        }
        switch (this.display_mode) {
            case "organigram":
                this.diagramme = new DiagrammeOrganigramme(this.xmlParser,this.bModal);
                this.diagramme.blBadgeTasks=this.blBadgeTasks;
                this.diagramme.blBadgeDocs=this.blBadgeDocs;
                this.diagramme.blBadgePosts=this.blBadgePosts;
                this.diagramme.blBadgeAbbrev=this.blBadgeAbbrev;
                break;
            case "reverse-tree":
            case "reverse-tree-classroom":
                this.diagramme = new DiagrammeOrganigramme(this.xmlParser,this.bModal);
                this.diagramme.blBadgeTasks=this.blBadgeTasks;
                this.diagramme.blBadgeDocs=this.blBadgeDocs;
                this.diagramme.blBadgePosts=this.blBadgePosts;
                this.diagramme.blBadgeAbbrev=this.blBadgeAbbrev;
                break;
            case "simplified-reverse-tree":
                this.diagramme = new DiagrammeArbreInverseSimplifie(this.xmlParser,this.bModal);
                this.diagramme.blBadgeTasks=this.blBadgeTasks;
                this.diagramme.blBadgeDocs=this.blBadgeDocs;
                this.diagramme.blBadgePosts=this.blBadgePosts;
                this.diagramme.blBadgeAbbrev=this.blBadgeAbbrev;
                break;
            case "rolodex":
                this.diagramme = new DiagrammeRolodex(this.xmlParser,this.bModal);
                break;
            case "windows-explorer":
                this.diagramme = new DiagrammeWindowsExplorer(this.xmlParser,this.bModal);
                break;
            default:
                this.diagramme = null;
        }
        if (this.diagramme === null) {
            const message = `${this.translate('unknownMode')}: ${this.display_mode}`;
            console.error(message);
        } else {
            this.diagramme.initialize(
                this.lng,
                this.display_mode,
                this.querySelect,
                this.QuerySearch,
                this.departmentDetails,
                this.bControlsEnabled
            );
            window.diagramme = this.diagramme;
        }
    }
    drawDepartement(departmentId){
        if (this.diagramme && typeof this.diagramme.drawDepartement === 'function') {
            this.diagramme.drawDepartement(departmentId);
        } else {
            console.error(this.translate('diagramNotInitialized'));
        }
    }
    navigateToDepartmentFromSelect(departmentId) {
        if (this.diagramme && typeof this.diagramme.navigateToDepartmentFromSelect === 'function') {
            this.diagramme.navigateToDepartmentFromSelect(departmentId);
        } else {
            console.error(this.translate('diagramNotInitialized'));
        }
    }
    navigateToDepartmentFromModal(departmentId) {
        if (this.diagramme && typeof this.diagramme.navigateToDepartmentFromModal === 'function') {
            this.diagramme.navigateToDepartmentFromModal(departmentId);
        } else {
            console.error(this.translate('diagramNotInitialized'));
        }
    }
    setupSelectEventListener() {
        document.body.addEventListener('change', (e) => {
            if (e.target && e.target.id === 'show_mode_select') {
                const selectedId = e.target.value;
                if (selectedId) {
                    if (this.diagramme && typeof this.diagramme.clearDiagramme === 'function') {
                        this.diagramme.clearDiagramme();
                    }
                    this.ShowMode(selectedId);
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem('preferred-display-mode', selectedId);
                    }
                }
            }
        });
    }
}
