class DiagrammeRolodex {
    constructor(xmlParser,bModal) {
        this.xmlParser = xmlParser;
        this.bModal=bModal;
        this.lng = 'en';
        this.bControlsEnabled= true;
        this.querySelect = null;
        this.queryModal = null;
        this.queryDetails = null;
        this.display_mode = null;
        this.currentLevel = 'root';
        this.navigationStack = [];
        this.departementsMap = new Map();
        this.selectedDepartmentId = null;
        this.translations = {
            fr: {
                home: "Accueil",
                close: "Fermer",
                noSubDepartments: "Aucun sous-département",
                noSubDepartmentsDesc: "Ce département n'a pas de sous-structure.",
                seeSubDepartments: "Voir les sous-départements",
                noDescription: "Aucune description disponible",
                error: "Erreur",
                checkProvider: "Vérifiez que le fournisseur est accessible.",
                loading: "Chargement...",
                back: "Retour",
                department: "Département",
                documents: "Documents",
                details: "Détails",
                navigation: "Navigation",
                breadcrumbSeparator: ">",
                abbreviations: {
                    'CEO - Direction Générale': 'Direction Générale',
                    'Département Opérations (AM)': 'Opérations',
                    'Département Commercial (AM)': 'Commercial',
                    'Département Financier': 'Finances',
                    'Département RH': 'Ressources Humaines',
                    'Département IT': 'Systèmes Information',
                    'Département Juridique': 'Juridique',
                    'Département RSE': 'RSE & Développement Durable'
                }
            },
            en: {
                home: "Home",
                close: "Close",
                noSubDepartments: "No sub-departments",
                noSubDepartmentsDesc: "This department has no substructure.",
                seeSubDepartments: "See sub-departments",
                noDescription: "No description available",
                error: "Error",
                checkProvider: "Check that the provider is accessible.",
                loading: "Loading...",
                back: "Back",
                department: "Department",
                documents: "Documents",
                details: "Details",
                navigation: "Navigation",
                breadcrumbSeparator: ">",
                abbreviations: {
                    'CEO - Direction Générale': 'General Management',
                    'Département Opérations (AM)': 'Operations',
                    'Département Commercial (AM)': 'Commercial',
                    'Département Financier': 'Finance',
                    'Département RH': 'Human Resources',
                    'Département IT': 'Information Systems',
                    'Département Juridique': 'Legal',
                    'Département RSE': 'CSR & Sustainable Development'
                }
            }
        };
    }
    initialize(lng, display_mode, querySelect, queryModal, queryDetails,bControlsEnabled) {
        this.lng = lng || 'en';
        this.bControlsEnabled = bControlsEnabled;
        this.querySelect = querySelect;
        this.queryModal = queryModal;
        this.queryDetails = queryDetails;
        this.display_mode = display_mode;
        this.init();
        this.buildDepartementsMap();
        this.loadLevel('root');
    }
    setLang(lng) {
        this.lng = lng || 'en';
        this.buildDepartementsMap();
        this.loadLevel('root');
        this.updateInterfaceLanguage();
    }
    updateInterfaceLanguage() {
        this.updateBreadcrumb(this.currentLevel);
        const levelElement = document.getElementById(`level-${this.currentLevel}`);
        if (levelElement) {
            this.populateLevel(levelElement, this.currentLevel);
        }
        this.updateStaticTexts();
    }
    updateStaticTexts() {
        const homeElement = document.querySelector('.breadcrumb-item[data-level="root"]');
        if (homeElement) {
            homeElement.textContent = this.translate('home');
        }
        const detailsTitle = document.querySelector('#details-panel .panel-header h3');
        if (detailsTitle) {
            detailsTitle.textContent = this.translate('details');
        }
        const closeBtn = document.getElementById('details-panel-close-btn');
        if (closeBtn) {
            closeBtn.setAttribute('title', this.translate('close'));
            closeBtn.setAttribute('aria-label', this.translate('close'));
        }
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
    getShortName(fullName) {
        const abbreviation = this.translate(fullName, 'abbreviations');
        if (abbreviation !== fullName) {
            return abbreviation;
        }
        return fullName.length > 50 ? fullName.substring(0, 50) + '...' : fullName;
    }
    normalizeDepartmentColor(color) {
        const value = String(color || '').trim();
        if (!value) return '';
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return value;
        if (/^rgb(a)?\(/i.test(value)) return value;
        return '';
    }
    getContrastTextColor(backgroundColor) {
        const color = this.normalizeDepartmentColor(backgroundColor);
        if (!color || !color.startsWith('#')) return '#ffffff';
        let hex = color.slice(1);
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.62 ? '#17212b' : '#ffffff';
    }
    showError(messageError) {
        document.getElementById('main-container-diagramme').innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                <h2>${this.translate('error')}</h2>
                <p>${messageError}</p>
                <p>${this.translate('checkProvider')}</p>
            </div>
        `;
    }
    init() {
        let textDetails='';
        let textheight='';
        if(this.bControlsEnabled== false){
           textheight=`style="height:calc(100vh - 20px);"`;
        }
        if (!this.bModal)
            textDetails=`<div id="details-panel" ${textheight}>
                <div class="panel-header">
                    <h3>${this.translate('details')}</h3>
                    <div class="panel-actions">
                        <button id="details-panel-close-btn" class="panel-action-btn" type="button" title="${this.translate('close')}">×</button>
                    </div>
                </div>
                <div id="panneau-documents"></div>
            </div>`;
        document.getElementById('main-container-diagramme').innerHTML = `
            <div class="container"  ${textheight}>
                <div id="breadcrumb">
                    <span class="breadcrumb-item" data-level="root">${this.translate('home')}</span>
                </div>
                <div id="rolodex-container" ${textheight}>
                    <div class="rolodex-level" id="level-root" data-level="root"></div>
                </div>
                ${textDetails}
            </div>
        `;
        if (this.queryDetails) {
            this.queryDetails.init();
        }
        if (!this.bModal) {
            const closeBtn = document.getElementById('details-panel-close-btn');
            closeBtn?.addEventListener('click', () => {
                this.hideDetailsPanel();
            });
        }
    }
    getDepartmentLevel(departmentId) {
        let level = 0;
        let currentId = departmentId;
        const visited = new Set();
        while (currentId && currentId !== 'root' && !visited.has(currentId)) {
            visited.add(currentId);
            const dept = this.xmlParser.getDepartement(currentId);
            if (dept && dept.parent && dept.parent !== 'root' && dept.parent !== 'null') {
                level++;
                currentId = dept.parent;
            } else {
                break;
            }
        }
        return level;
    }
    getDepartementParent(departmentId) {
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) {
            return 'root';
        }
        if (dept.parent && dept.parent !== 'null') {
            return dept.parent;
        }
        return 'root';
    }
    buildDepartementsMap() {
        this.departementsMap.clear();
        this.xmlParser.departements.forEach(dept => {
            const parent = dept.parent || 'root';
            if (!this.departementsMap.has(parent)) {
                this.departementsMap.set(parent, []);
            }
            this.departementsMap.get(parent).push(dept);
        });
    }
    loadLevel(levelId, animation = false) {
        const container = document.getElementById('rolodex-container');
        const currentLevelElement = document.querySelector('.rolodex-level:not(.hidden)');
        if (animation && currentLevelElement) {
            currentLevelElement.style.opacity = '0';
            currentLevelElement.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                this.displayLevel(levelId);
            }, 200);
        } else {
            this.displayLevel(levelId);
        }
    }
    displayLevel(levelId) {
        this.currentLevel = levelId;
        const container = document.getElementById('rolodex-container');
        if (!container) return;
        container.innerHTML = '';
        const levelElement = document.createElement('div');
        levelElement.className = 'rolodex-level';
        levelElement.id = `level-${levelId}`;
        levelElement.dataset.level = levelId;
        container.appendChild(levelElement);
        this.populateLevel(levelElement, levelId);
        levelElement.style.opacity = '1';
        levelElement.style.transform = 'translateX(0)';
        this.updateBreadcrumb(levelId);
        if (this.querySelect != null) {
            this.querySelect.updateDepartmentSelect(levelId);
        }
        if (this.queryDetails != null && !this.bModal) {
            this.queryDetails.showDepartmentDetailsId(levelId);
        }
    }
    populateLevel(levelElement, levelId) {
        levelElement.innerHTML = '';
        const departements = this.departementsMap.get(levelId) || [];
        if (departements.length === 0 && levelId === 'root') {
            this.createRootLevel(levelElement);
        } else if (departements.length === 0) {
            levelElement.innerHTML = `
                <div class="no-departements">
                    <h3>📭 ${this.translate('noSubDepartments')}</h3>
                    <p>${this.translate('noSubDepartmentsDesc')}</p>
                </div>
            `;
        } else {
            departements.forEach(dept => {
                this.createDepartmentCard(levelElement, dept);
            });
        }
    }
    createRootLevel(levelElement) {
        const mainDepartments = Array.from(this.xmlParser.departements.values()).filter(dept => 
            dept.parent === 'null' || dept.parent === 'ceo'
        );
        mainDepartments.forEach(dept => {
            this.createDepartmentCard(levelElement, dept);
        });
    }
    createDepartmentCard(container, departement) {
        const card = document.createElement('div');
        card.className = 'rolodex-card';
        card.dataset.id = departement.id;
        card.dataset.type = departement.type;
        if (this.selectedDepartmentId === departement.id) {
            card.classList.add('selected');
        }
        const departmentColor = this.normalizeDepartmentColor(departement.background_color);
        const textColor = this.getContrastTextColor(departmentColor);
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        if (departmentColor) {
            card.style.setProperty('--rolodex-card-bg', departmentColor);
            card.style.setProperty('--rolodex-card-bg-solid', departmentColor);
            card.style.setProperty('--rolodex-card-text', textColor);
            card.style.setProperty('--rolodex-card-badge-bg', textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(23, 33, 43, 0.10)');
            card.style.setProperty('--rolodex-card-action-bg', textColor === '#ffffff' ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.82)');
            card.style.setProperty('--rolodex-card-action-color', '#17212b');
        } else {
            if (currentTheme === 'dark') {
                card.style.setProperty('--rolodex-card-bg', '#334155');
                card.style.setProperty('--rolodex-card-bg-solid', '#1e293b');
                card.style.setProperty('--rolodex-card-text', '#f8fafc');
                card.style.setProperty('--rolodex-card-badge-bg', 'rgba(255, 255, 255, 0.14)');
                card.style.setProperty('--rolodex-card-action-bg', 'rgba(255, 255, 255, 0.92)');
                card.style.setProperty('--rolodex-card-action-color', '#17212b');
            } else if (currentTheme === 'blue') {
                card.style.setProperty('--rolodex-card-bg', '#e3f2fd');
                card.style.setProperty('--rolodex-card-bg-solid', '#bbdef5');
                card.style.setProperty('--rolodex-card-text', '#1e3a5f');
                card.style.setProperty('--rolodex-card-badge-bg', 'rgba(25, 118, 210, 0.12)');
                card.style.setProperty('--rolodex-card-action-bg', 'rgba(255, 255, 255, 0.96)');
                card.style.setProperty('--rolodex-card-action-color', '#0f4c81');
            } else if (currentTheme === 'green') {
                card.style.setProperty('--rolodex-card-bg', '#e8f5e8');
                card.style.setProperty('--rolodex-card-bg-solid', '#c8e6c9');
                card.style.setProperty('--rolodex-card-text', '#1b5e20');
                card.style.setProperty('--rolodex-card-badge-bg', 'rgba(46, 125, 50, 0.12)');
                card.style.setProperty('--rolodex-card-action-bg', 'rgba(255, 255, 255, 0.96)');
                card.style.setProperty('--rolodex-card-action-color', '#1b5e20');
            } else if (currentTheme === 'light') {
                card.style.setProperty('--rolodex-card-bg', '#f1f5f9');
                card.style.setProperty('--rolodex-card-bg-solid', '#e2e8f0');
                card.style.setProperty('--rolodex-card-text', '#17212b');
                card.style.setProperty('--rolodex-card-badge-bg', 'rgba(23, 33, 43, 0.12)');
                card.style.setProperty('--rolodex-card-action-bg', 'rgba(255, 255, 255, 0.96)');
                card.style.setProperty('--rolodex-card-action-color', '#17212b');
            } else {
                card.style.setProperty('--rolodex-card-bg', '#ffffff');
                card.style.setProperty('--rolodex-card-bg-solid', '#f8fafc');
                card.style.setProperty('--rolodex-card-text', '#17212b');
                card.style.setProperty('--rolodex-card-badge-bg', 'rgba(23, 33, 43, 0.10)');
                card.style.setProperty('--rolodex-card-action-bg', 'rgba(255, 255, 255, 0.96)');
                card.style.setProperty('--rolodex-card-action-color', '#17212b');
            }
        }
        const hasChildren = this.departementsMap.has(departement.id);
        const shortName = this.getShortName(departement.nom);
        const abbreviation = departement.abbreviation || '';
        const abbrevDetails = departement.abbrev_details || '';
        let typeText = '';
        let typeElement='';
        if (abbreviation) {
            typeText = abbreviation;
             typeElement = abbreviation && abbrevDetails ? 
            `<div class="rolodex-card-type" title="${abbrevDetails}">${typeText}</div>` :
            `<div class="rolodex-card-type">${typeText}</div>`;
        }
        const navigateButon = `<button class="navigate-children-btn" ${!this.bModal ? `style="right: 0.75rem;"` : ``} title="${this.translate('seeSubDepartments')}">▶</button>`;
        const infoButon = `<button class="info-btn" title="${this.translate('details')}">ℹ️</button>`;
        card.innerHTML = `
            <div class="card-content" ${!this.bModal ?`style="cursor: pointer;"`:``}>
                <div class="rolodex-card-title">${shortName}</div>
                ${typeElement}
            </div>
            ${hasChildren ? navigateButon : ``}
            ${this.bModal ? infoButon : ``}  
        `;
        card.addEventListener('click', () => {
            this.selectDepartmentCard(departement.id);
            this.showDepartmentDetails(departement);
        });
        card.addEventListener('dblclick', () => {
            this.showDetailsPanel();
            this.selectDepartmentCard(departement.id);
            this.showDepartmentDetails(departement);
        });
        if (this.bModal) {
            card.querySelector('.info-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showDepartmentDetails(departement);
            });
        }
        if (hasChildren) {
            card.querySelector('.navigate-children-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.navigateToDepartment(departement.id);
            });
        }
        container.appendChild(card);
    }
    navigateBack() {
        if (this.navigationStack.length > 0) {
            const previousLevel = this.navigationStack.pop();
            this.loadLevel(previousLevel, true);
        } else {
            this.loadLevel('root');
        }
    }
    updateBreadcrumb(currentLevelId) {
        const breadcrumb = document.getElementById('breadcrumb');
        breadcrumb.innerHTML = '';
        this.hideDetails();
        const path = this.getBreadcrumbPath(currentLevelId);
        path.forEach((item, index) => {
            const itemElement = this.createBreadcrumbElement(item, index, path.length);
            breadcrumb.appendChild(itemElement);
            if (index < path.length - 1) {
                breadcrumb.appendChild(this.createSeparatorElement());
            }
        });
    }
    createBreadcrumbElement(item, index, totalLength) {
        const element = document.createElement('span');
        element.className = `breadcrumb-item ${index < totalLength - 1 ? 'clickable' : 'current'}`;
        element.textContent = item.name;
        element.dataset.level = item.level;
        if (index < totalLength - 1) {
            element.addEventListener('click', () => {
                this.navigateToBreadcrumb(item.level, index);
            });
        }
        return element;
    }
    createSeparatorElement() {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = this.translate('breadcrumbSeparator');
        separator.style.margin = '0 2px';
        separator.style.color = '#7f8c8d';
        return separator;
    }
    navigateToBreadcrumb(levelId, breadcrumbIndex) {
        this.loadLevel(levelId);
        this.navigationStack = this.navigationStack.slice(0, Math.max(0, breadcrumbIndex - 1));
    }
    getBreadcrumbPath(levelId) {
        const path = [];
        let currentId = levelId;
        const visited = new Set();
        while (currentId && currentId !== 'root' && !visited.has(currentId)) {
            visited.add(currentId);
            const dept = this.xmlParser.getDepartement(currentId);
            if (dept) {
                path.unshift({ level: currentId, name: this.getShortName(dept.nom) }); 
                currentId = dept.parent === 'null' ? 'root' : dept.parent;
            } else {
                break;
            }
        }
        path.unshift({ level: 'root', name: this.translate('home') });
        return path;
    }
    hideDetails() {
        if (this.queryDetails != null) {
            this.queryDetails.hideDetails();
        }
    }
    showDepartmentDetails(departement) {
        if (this.querySelect != null) {
            this.querySelect.updateDepartmentSelect(departement.id);
        }
        if (this.queryDetails != null) {
            this.queryDetails.showDepartmentDetails(departement.id);
        }
    }
    showDetailsPanel() {
        if (this.bModal) return;
        const detailsPanel = document.getElementById('details-panel');
        if (detailsPanel) {
            detailsPanel.style.display = 'flex';
        }
    }
    hideDetailsPanel() {
        if (this.bModal) return;
        const detailsPanel = document.getElementById('details-panel');
        if (detailsPanel) {
            detailsPanel.style.display = 'none';
        }
    }
    selectDepartmentCard(departmentId, scrollToCard = false) {
        this.selectedDepartmentId = departmentId;
        const cards = document.querySelectorAll('.rolodex-card');
        cards.forEach((card) => {
            card.classList.toggle('selected', card.dataset.id === departmentId);
        });
        if (!scrollToCard) return;
        const targetCard = document.querySelector(`.rolodex-card[data-id="${departmentId}"]`);
        if (targetCard && typeof targetCard.scrollIntoView === 'function') {
            requestAnimationFrame(() => {
                targetCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            });
        }
    }
    navigateToDepartment(departmentId) {
        this.navigationStack.push(this.currentLevel);
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        this.loadLevel(departmentId, true);
        this.selectedDepartmentId = null;
        if (this.querySelect != null) {
            this.querySelect.updateDepartmentSelect(departmentId);
        }
    }
    navigateToDepartmentFromSelect(departmentId) {
        this.navigateToDepartmentId(departmentId);
    }   
    navigateToDepartmentFromModal(departmentId) {
        this.navigateToDepartmentId(departmentId);
    }
    navigateToDepartmentId(departmentId) {
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        const departmentParentId = this.getDepartementParent(departmentId);
        this.loadLevel(departmentParentId);
        this.selectDepartmentCard(departmentId, true);
        this.showDepartmentDetails(dept);
        if (this.querySelect != null) {
            this.querySelect.updateDepartmentSelect(departmentId);
        }
    }
    clearDiagramme() {
        const cards = document.querySelectorAll('.rolodex-card');
        cards.forEach(card => {
            const content = card.querySelector('.card-content');
            const navButton = card.querySelector('.navigate-children-btn');
            if (content) {
                content.replaceWith(content.cloneNode(true));
            }
            if (navButton) {
                navButton.replaceWith(navButton.cloneNode(true));
            }
        });
        const breadcrumbItems = document.querySelectorAll('.breadcrumb-item.clickable');
        breadcrumbItems.forEach(item => {
            item.replaceWith(item.cloneNode(true));
        });
        const breadcrumb = document.getElementById('breadcrumb');
        const container = document.getElementById('rolodex-container');
        if (breadcrumb) breadcrumb.innerHTML = '';
        if (container) container.innerHTML = '';
        document.getElementById('main-container-diagramme').innerHTML = '';
        this.departementsMap.clear();
        this.navigationStack = [];
        this.currentLevel = 'root';
    }
}
