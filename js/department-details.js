class DepartmentDetails {
    constructor(xmlParser, bModal = false) {
        this.lng = 'en';
        this.diagramme = null;
        this.xmlParser = xmlParser;
        this.currentTab = 'general';
        this.bModal = bModal;
        this.modalId = 'query-details-modal-details';
        this.originalPanelId = 'panneau-documents';
        this.qcmGenerator = null;
        this.currentDepartmentId = null;
        this.generalManager = new DepartmentDetailsGeneral(this);
        this.taskManager = new DepartmentDetailsTask(this);
        this.documentManager = new DepartmentDetailsDocuments(this);
        this.departmentTypes = ['direction','operational','commercial','support','technical','training','compliance','strategic','economic','organisation', 'other'];
        if (this.bModal) {
            setTimeout(() => this.createModal(), 0);
        }
    }
    translate(key) {
        const allManagers = [
            this.generalManager,
            this.taskManager,
            this.documentManager
        ];
        for (const manager of allManagers) {
            if (manager.translations && manager.translations[this.lng] && manager.translations[this.lng][key]) {
                return manager.translations[this.lng][key];
            }
        }
        const commonTranslations = {
            fr: {
                general: "Général",
                posts: "Postes",
                tasks: "Tâches",
                documents: "Documents",
                selectDept: "détails",
                closeModal: "Fermer",
                noSelection: "Sélectionnez un département dans l'organigramme pour afficher ses détails",
                notSpecified: "Non spécifié",
                showAll: "Tout afficher",
                hideAll: "Tout masquer"
            },
            en: {
                general: "General",
                posts: "Positions",
                tasks: "Tasks",
                documents: "Documents",
                selectDept: "Details",
                closeModal: "Close",
                noSelection: "Select a department in the organization chart to display its details",
                notSpecified: "Not specified",
                showAll: "Show all",
                hideAll: "Hide all"
            }
        };
        return commonTranslations[this.lng]?.[key] || key;
    }
    getTranslatedDepartmentType(type) {
        const translations = this.generalManager.translations[this.lng];
        if (translations && translations.departmentTypes && translations.departmentTypes[type]) {
            return translations.departmentTypes[type];
        }
        return type;
    }
    initialize(lng, diagramme, qcmGenerator) {
        this.lng = lng || 'en';
        this.diagramme = diagramme;
        this.qcmGenerator = qcmGenerator;
        this.init();
    }
    setLang(lng) {
        this.lng = lng || 'en';
        this.updateLanguage();
    }
    showNotification(message, type = 'info', temporisation = 2) {
        if (window.editModeManager ) {
            window.editModeManager.showNotification(message, type, temporisation);
        }
    }
    async showConfirm(message, title) {
        if (window.editModeManager) {
            return await window.editModeManager.showConfirm(message, title);
        }
    }
    async showAlert(message, title='Alert') {
        if (window.editModeManager) {
           return await  window.editModeManager.showAlert(message, title);
        }
    }
    setModal(bModal) {
        this.bModal = bModal;
        if (this.bModal) {
            this.createModal();
            this.init();
        } else {
            this.removeModal();
            this.init();
        }
    }
    createModal() {
        if (document.getElementById(this.modalId)) return;
        const modalHTML = `
            <div id="${this.modalId}" class="query-modal-details" style="display: none;">
                <div class="modal-details-overlay" id="${this.modalId}-overlay"></div>
                <div class="modal-details-content">
                    <div class="modal-details-header">
                        <h3>${this.translate('selectDept')}</h3>
                        <button class="modal-details-close" id="${this.modalId}-close">&times;</button>
                    </div>
                    <div class="modal-details-body" id="${this.modalId}-body"></div>
                    <div class="modal-details-footer">
                        <button class="btn-close-modal-details">${this.translate('closeModal')}</button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.addModalStyles();
        const modal = document.getElementById(this.modalId);
        const overlay = document.getElementById(`${this.modalId}-overlay`);
        const closeBtn = document.getElementById(`${this.modalId}-close`);
        const closeBtnFooter = modal.querySelector('.btn-close-modal-details');
        const closeModal = () => {
            modal.style.display = 'none';
        };
        if (overlay) overlay.addEventListener('click', closeModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (closeBtnFooter) closeBtnFooter.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeModal();
            }
        });
    }
    removeModal() {
        const modal = document.getElementById(this.modalId);
        const styles = document.getElementById('query-modal-details-styles');
        if (modal) modal.remove();
        if (styles) styles.remove();
    }
    addModalStyles() {
        if (document.getElementById('query-modal-details-styles')) return;
        const styles = `
            <style id="query-details-styles">
                .query-modal-details {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    color: var(--text-primary);
                    background: var(--bg-primary);
                }
                .modal-details-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                }
                .modal-details-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                    max-width: 800px;
                    max-height: 90vh;
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-xl);
                    display: flex;
                    flex-direction: column;
                    color: var(--text-primary);
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    overflow: hidden;
                    animation: modalScaleIn 0.3s ease;
                }
                .modal-details-header {
                    padding: var(--space-4) var(--space-5);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: var(--text-secondary);
                    background: linear-gradient(
                        to right,
                        var(--bg-tertiary),
                        var(--bg-secondary)
                    );
                }
                .modal-details-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    display: flex;
                    align-items: center;
                    gap: var(--space-2);
                }
                .modal-details-header h3::before {
                    content: '📋';
                    font-size: 1.2rem;
                    opacity: 0.8;
                }
                .modal-details-close {
                    background: none;
                    border: 1px solid var(--border-color);
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--text-secondary);
                    line-height: 1;
                    padding: 0;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--radius-full);
                    transition: var(--transition-base);
                    background: var(--bg-secondary);
                }
                .modal-details-close:hover {
                    background: var(--error-500);
                    color: white;
                    border-color: var(--error-500);
                    transform: rotate(90deg);
                }
                .modal-details-body {
                    padding: 0;
                    overflow: visible;
                    flex: 1;
                    color: var(--text-primary);
                    background: var(--bg-primary);
                    min-height: 200px;
                }
                .modal-details-footer {
                    padding: var(--space-4) var(--space-5);
                    border-top: 1px solid var(--border-color);
                    text-align: right;
                    color: var(--text-secondary);
                    background: var(--bg-tertiary);
                }
                .btn-close-modal-details {
                    padding: var(--space-2) var(--space-4);
                    background: var(--accent-primary);
                    color: white;
                    border: none;
                    border-radius: var(--radius-md);
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: var(--transition-base);
                    box-shadow: var(--shadow-sm);
                }
                .btn-close-modal-details:hover {
                    background: var(--accent-secondary);
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }
                .btn-close-modal-details:active {
                    transform: translateY(0);
                }
                .query-modal-details .department-details {
                    display: block;
                    border: none;
                    box-shadow: none;
                    max-height: none;
                    height: 100%;
                }
                .query-modal-details .no-selection {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                    text-align: center;
                    color: var(--text-secondary);
                    background: var(--bg-secondary);
                    animation: fadeIn 0.3s ease;
                }
                .query-modal-details .no-selection-icon {
                    font-size: 64px;
                    margin-bottom: var(--space-4);
                    opacity: 0.5;
                    animation: float 3s ease-in-out infinite;
                }
                .department-details {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    min-height: 0;
                    background: var(--bg-primary);
                }
                .dept-header {
                    flex-shrink: 0;
                    padding: var(--space-5) var(--space-6);
                    background: linear-gradient(
                        135deg,
                        var(--bg-secondary) 0%,
                        var(--bg-tertiary) 100%
                    );
                    border-bottom: 1px solid var(--border-color);
                    color: var(--text-primary);
                    position: relative;
                    padding-right: 140px;
                    min-height: 100px;
                }
                .dept-header h4 {
                    margin: 0 0 var(--space-2);
                    font-size: 22px;
                    font-weight: 800;
                    color: var(--text-primary);
                    line-height: 1.3;
                    letter-spacing: -0.02em;
                }
                .dept-meta {
                    display: flex;
                    gap: var(--space-2);
                    flex-wrap: wrap;
                }
                .dept-type {
                    background: var(--bg-primary);
                    color: var(--text-secondary);
                    padding: 4px 12px;
                    border-radius: var(--radius-full);
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: 1px solid var(--border-color);
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    box-shadow: var(--shadow-sm);
                }
                .dept-type::before {
                    content: '🏢';
                    font-size: 10px;
                }                
                .detail-tabs {
                    flex-shrink: 0;
                    display: flex;
                    background: var(--bg-secondary);
                    border-bottom: 1px solid var(--border-color);
                    padding: 0 var(--space-2);
                    gap: var(--space-1);
                    height: 48px;
                }
                .tab-button {
                    flex: 1;
                    padding: 0 var(--space-3);
                    background: transparent;
                    border: none;
                    border-bottom: 3px solid transparent;
                    color: var(--text-secondary);
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition-base);
                    text-align: center;
                    position: relative;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-2);
                    height: 100%;
                }
                .tab-button::before {
                    font-size: 14px;
                    opacity: 0.7;
                }
                .tab-button[data-tab="general"]::before {
                    content: 'ℹ️';
                }
                .tab-button[data-tab="postes"]::before {
                    content: '👥';
                }
                .tab-button[data-tab="taches"]::before {
                    content: '📝';
                }
                .tab-button[data-tab="documents"]::before {
                    content: '📄';
                }
                .tab-button:hover {
                    color: var(--accent-primary);
                    background: var(--bg-tertiary);
                    border-bottom-color: var(--accent-primary);
                }
                .tab-button.active {
                    color: var(--accent-primary);
                    border-bottom-color: var(--accent-primary);
                    font-weight: 700;
                    background: linear-gradient(
                        to bottom,
                        transparent,
                        rgba(36, 172, 235, 0.05)
                    );
                }
                .tab-button.active::after {
                    content: '';
                    position: absolute;
                    bottom: -3px;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: var(--accent-primary);
                    border-radius: 3px 3px 0 0;
                }
                .tab-content-container {
                    flex: 1;
                    overflow-y: auto;
                    min-height: 0;
                    max-height: none;
                    padding: var(--space-5);
                    background: var(--bg-primary);
                    scroll-behavior: smooth;
                }
                .tab-content {
                    min-height: 100%;
                }
                /* Scrollbar pour le contenu */
                .tab-content-container::-webkit-scrollbar {
                    width: 6px;
                }
                .tab-content-container::-webkit-scrollbar-track {
                    background: var(--bg-tertiary);
                    border-radius: var(--radius-full);
                }
                .tab-content-container::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border-radius: var(--radius-full);
                    transition: var(--transition-base);
                }
                .tab-content-container::-webkit-scrollbar-thumb:hover {
                    background: var(--accent-primary);
                }
                #panneau-documents .department-details {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    min-height: 0;
                }
                #panneau-documents {
                    height: 100%;
                    min-height: 0;
                    overflow: hidden;
                }
                #panneau-documents .tab-content-container {
                    flex: 1;
                    overflow-y: auto;
                    min-height: 0;
                    max-height: none;
                }
                .query-modal-details .tab-content-container {
                    max-height: 500px;
                }
                /* Animations */
                @keyframes modalScaleIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
                /* Variables pour la cohérence */
                :root {
                    --radius-md: 0.5rem;
                    --radius-lg: 0.75rem;
                    --radius-xl: 1rem;
                    --radius-full: 9999px;
                    --space-1: 4px;
                    --space-2: 8px;
                    --space-3: 12px;
                    --space-4: 16px;
                    --space-5: 20px;
                    --space-6: 24px;
                    --transition-base: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
                    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
                }
                /* Responsive */
                @media (max-width: 768px) {
                    .modal-details-content {
                        width: 95%;
                        max-height: 95vh;
                    }
                    .dept-header {
                        padding-right: var(--space-4);
                        min-height: 80px;
                    }
                    .dept-header h4 {
                        font-size: 18px;
                    }
                    .detail-tabs {
                        height: auto;
                        flex-wrap: wrap;
                        padding: var(--space-2);
                    }
                    .tab-button {
                        min-width: 80px;
                        font-size: 12px;
                        height: 36px;
                    }
                    .tab-button::before {
                        display: none;
                    }
                    .tab-content-container {
                        padding: var(--space-3);
                    }
                }
                @media (max-width: 480px) {
                    .dept-header {
                        padding: var(--space-3);
                    }
                    .dept-header h4 {
                        font-size: 16px;
                    }
                    .dept-meta {
                        flex-direction: column;
                        gap: var(--space-1);
                    }
                    .dept-type {
                        width: fit-content;
                    }
                    .tab-button {
                        font-size: 11px;
                        min-width: 60px;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    getContentContainer() {
        if (this.bModal) {
            const modalBody = document.getElementById(`${this.modalId}-body`);
            if (modalBody) {
                return modalBody;
            } else {
                this.createModal();
                return document.getElementById(`${this.modalId}-body`);
            }
        } else {
            return document.getElementById(this.originalPanelId);
        }
    }
    showModal() {
        if (this.bModal && document.getElementById(this.modalId)) {
            document.getElementById(this.modalId).style.display = 'block';
        }
    }
    hideModal() {
        if (this.bModal && document.getElementById(this.modalId)) {
            document.getElementById(this.modalId).style.display = 'none';
        }
    }
    init() {
        const container = this.getContentContainer();
        if (!container) {
            return;
        }
        container.innerHTML = `
            <div class="no-selection">
                <div class="no-selection-icon">🏢</div>
                <p>${this.translate('noSelection')}</p>
            </div>
            <div class="department-details" style="display: none;">
                <div class="dept-header" style="position: relative; padding-right: 120px;"> 
                    <h4 id="dept-name"></h4>
                    <div class="dept-meta">
                        <span class="dept-type" id="dept-type"></span>
                        <span class="dept-bg-color" id="dept-bg-color" style="display:none;"></span>
                    </div>
                </div>
                <div class="detail-tabs">
                    <button class="tab-button active" data-tab="general">${this.translate('general')}</button>
                    <!--button class="tab-button" data-tab="postes">${this.translate('posts')}</button-->
                    <button class="tab-button" data-tab="taches">${this.translate('tasks')}</button>
                    <button class="tab-button" data-tab="documents">${this.translate('documents')}</button>
                </div>
                <div class="tab-content-container">
                    <div class="tab-content">
                        <div id="tab-general" class="tab-pane active"></div>
                        <!--div id="tab-postes" class="tab-pane"></div-->
                        <div id="tab-taches" class="tab-pane"></div>
                        <div id="tab-documents" class="tab-pane"></div>
                    </div>
                </div>
            </div>
        `;
        this.initTabs();
        if (!window.editModeManager && this.qcmGenerator) {
            this.addQuizButton() ;
        }
    }
    initTabs() {
        const container = this.getContentContainer();
        const tabButtons = container.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }
    switchTab(tabName) {
        const container = this.getContentContainer();
        container.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        container.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        const tabButton = container.querySelector(`.tab-button[data-tab="${tabName}"]`);
        const tabPane = container.querySelector(`#tab-${tabName}`);
        if (tabButton) tabButton.classList.add('active');
        if (tabPane) tabPane.classList.add('active');
        this.currentTab = tabName;
    }
    hideDetails() {
        const container = this.getContentContainer();
        const departmentDetails = container.querySelector('.department-details');
        const noSelection = container.querySelector('.no-selection');
        if (departmentDetails && noSelection) {
            departmentDetails.style.display = 'none';
            noSelection.style.display = 'flex';
        }
        if (this.bModal) {
            this.hideModal();
        }
    }
    showDepartmentDetails(departmentId) {
        this.showDepartmentDetailsId(departmentId); 
    }
    showDepartmentDetailsId(departmentId) {
        if (departmentId === 'root') {
            this.hideDetails();
            return;
        }
        this.currentDepartmentId = departmentId;
        const data = this.getDataInfos(departmentId);
        if (!data) {
            return;
        }
        const container = this.getContentContainer();
        container.querySelector('#dept-name').textContent = data.nom || this.translate('notSpecified');
        const typeElement = container.querySelector('#dept-type');
        const translatedType = this.getTranslatedDepartmentType(data.type) || this.translate('notSpecified');
        const colorElement = container.querySelector('#dept-bg-color');
        const isEditMode = !!(window.editModeManager && window.editModeManager.isEditMode);
        if (isEditMode) {
            this.renderBackgroundColorElement(colorElement, data.background_color, true);
            this.makeElementEditable(container.querySelector('#dept-name'), 'dept', departmentId, 'nom');
            this.createSelectEditable(typeElement, 'dept', departmentId, 'type', this.getDepartmentTypeOptions());
            this.createColorEditable(colorElement, 'dept', departmentId, 'background_color');
        } else{ 
            if (colorElement) {
                colorElement.style.display = 'none';
            }
            if(data.type && data.type!="null"){
                typeElement.textContent= translatedType;
                typeElement.style.display = 'block';
            }
            else{
               typeElement.textContent = '';
               typeElement.style.display = 'none';
            }
        }
        this.generalManager.updateTab(data, departmentId);
        this.taskManager.updateTab(data, departmentId);
        this.documentManager.updateTab(data, departmentId);
        const departmentDetails = container.querySelector('.department-details');
        const noSelection = container.querySelector('.no-selection');
        if (departmentDetails && noSelection) {
            departmentDetails.style.display = 'flex';
            noSelection.style.display = 'none';
        }
        if (this.bModal) {
            this.showModal();
        }
    }
    getDataInfos(departmentId) {
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return null;
        return {
            nom: dept.nom,
            id: dept.id,
            type: dept.type,
            abbreviation: dept.abbreviation || "",   
            abbrev_details: dept.abbrev_details || "",   
            background_color: dept.background_color || "",
            description: dept.description || "",
            responsable: dept.responsable || "",
            note: dept.note || "",
            postes: dept.postes || [],
            tasks: dept.tasks || [],
            fichiers: dept.fichiers || [],
            taskPosteAssociations: dept.taskPosteAssociations || new Map(),
            posteTaskAssociations: dept.posteTaskAssociations || new Map()
        };
    }
    updateLanguage() {
        const container = this.getContentContainer();
        if (!container) return;
        const noSelectionElement = container.querySelector('.no-selection p');
        if (noSelectionElement) {
            noSelectionElement.textContent = this.translate('noSelection');
        }
        const tabs = container.querySelectorAll('.tab-button');
        if (tabs.length >= 3) {
            tabs[0].textContent = this.translate('general');
            tabs[1].textContent = this.translate('tasks');
            tabs[2].textContent = this.translate('documents');
        }
        const modalTitle = document.querySelector(`#${this.modalId} .modal-details-header h3`);
        if (modalTitle) {
            modalTitle.textContent = this.translate('selectDept');
        }
        const closeBtn = document.querySelector(`#${this.modalId} .btn-close-modal-details`);
        if (closeBtn) {
            closeBtn.textContent = this.translate('closeModal');
        }
        const deptDetails = container.querySelector('.department-details');
        if (deptDetails && deptDetails.style.display !== 'none' && this.currentDepartmentId) {
            this.showDepartmentDetailsId(this.currentDepartmentId);
        }
    }
    normalizeHexColor(value) {
        if (!value || typeof value !== 'string') return '';
        const raw = value.trim();
        if (!raw) return '';
        const hex = raw.startsWith('#') ? raw : `#${raw}`;
        return /^#([0-9a-fA-F]{6})$/.test(hex) ? hex.toUpperCase() : '';
    }
    getContrastTextColor(hexColor) {
        const hex = this.normalizeHexColor(hexColor);
        if (!hex) return '#334155';
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 140 ? '#0F172A' : '#F8FAFC';
    }
    renderBackgroundColorElement(element, colorValue, isEditMode = false) {
        if (!element) return;
        const normalized = this.normalizeHexColor(colorValue);
        element.dataset.colorValue = normalized;
        element.style.borderRadius = '999px';
        element.style.padding = '2px 10px';
        element.style.fontSize = '11px';
        element.style.fontWeight = '600';
        element.style.lineHeight = '1.4';
        element.style.minHeight = '22px';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        if (normalized) {
            element.style.display = 'inline-flex';
            element.style.background = normalized;
            element.style.color = this.getContrastTextColor(normalized);
            element.style.border = '1px solid rgba(15, 23, 42, 0.15)';
            element.textContent = normalized;
        } else if (isEditMode) {
            element.style.display = 'inline-flex';
            element.style.background = 'var(--bg-hover)';
            element.style.color = 'var(--text-secondary)';
            element.style.border = '1px dashed var(--border-color)';
            element.textContent = '(Default)';
        } else {
            element.style.display = 'none';
        }
    }
    createColorEditable(element, type, id, field) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        if (!element) return;
        element.dataset.entityType = type;
        element.dataset.entityId = id;
        element.dataset.entityField = field;
        if (element.dataset.colorEditableBound === '1') return;
        element.dataset.colorEditableBound = '1';
        element.classList.add('editable-field');
        element.title = "Cliquer pour éditer la couleur";
        element.style.cursor = 'pointer';
        element.style.transition = 'all 0.2s ease';
        element.addEventListener('mouseenter', () => {
            if (!element.querySelector('input')) {
                element.style.boxShadow = '0 0 0 1px #667eea inset';
            }
        });
        element.addEventListener('mouseleave', () => {
            if (!element.querySelector('input')) {
                element.style.boxShadow = 'none';
            }
        });
        element.addEventListener('click', (e) => {
            if (!window.editModeManager || !window.editModeManager.isEditMode) return;
            e.stopPropagation();
            if (element.querySelector('input')) return;
            const original = this.normalizeHexColor(element.dataset.colorValue || '');
            const editor = document.createElement('div');
            editor.style.display = 'inline-flex';
            editor.style.alignItems = 'center';
            editor.style.gap = '6px';
            const picker = document.createElement('input');
            picker.type = 'color';
            picker.value = original || '#FFFFFF';
            picker.style.width = '28px';
            picker.style.height = '24px';
            picker.style.padding = '0';
            picker.style.border = '1px solid #cbd5e1';
            picker.style.borderRadius = '6px';
            picker.style.cursor = 'pointer';
            const hexInput = document.createElement('input');
            hexInput.type = 'text';
            hexInput.value = original;
            hexInput.placeholder = '#RRGGBB';
            hexInput.style.width = '90px';
            hexInput.style.height = '24px';
            hexInput.style.padding = '2px 6px';
            hexInput.style.border = '1px solid #cbd5e1';
            hexInput.style.borderRadius = '6px';
            hexInput.style.fontSize = '11px';
            const clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.textContent = '×';
            clearBtn.title = 'Reset color';
            clearBtn.style.width = '22px';
            clearBtn.style.height = '22px';
            clearBtn.style.border = '1px solid #cbd5e1';
            clearBtn.style.borderRadius = '6px';
            clearBtn.style.background = 'var(--bg-secondary)';
            clearBtn.style.cursor = 'pointer';
            const syncFrom = (value, fromHex = false) => {
                const raw = (value || '').trim();
                const normalized = this.normalizeHexColor(raw);
                if (fromHex) {
                    hexInput.value = raw;
                } else {
                    hexInput.value = normalized;
                }
                if (normalized) picker.value = normalized;
                return normalized;
            };
            const finish = (save) => {
                const normalized = this.normalizeHexColor(hexInput.value);
                const targetType = element.dataset.entityType || type;
                const targetField = element.dataset.entityField || field;
                const targetId = targetType === 'dept'
                    ? this.currentDepartmentId
                    : (element.dataset.entityId || id);
                if (save) {
                    const newValue = normalized;
                    this.renderBackgroundColorElement(element, newValue, true);
                    if (newValue !== original) {
                        this.saveInlineChange(targetType, targetId, targetField, newValue);
                    }
                } else {
                    this.renderBackgroundColorElement(element, original, true);
                }
            };
            picker.addEventListener('input', () => syncFrom(picker.value));
            hexInput.addEventListener('input', () => syncFrom(hexInput.value, true));
            clearBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                hexInput.value = '';
                finish(true);
            });
            editor.addEventListener('keydown', (ke) => {
                if (ke.key === 'Enter') {
                    ke.preventDefault();
                    finish(true);
                }
                if (ke.key === 'Escape') {
                    ke.preventDefault();
                    finish(false);
                }
            });
            editor.addEventListener('focusout', () => {
                setTimeout(() => {
                    if (!editor.contains(document.activeElement)) {
                        finish(true);
                    }
                }, 80);
            });
            element.innerHTML = '';
            element.style.display = 'inline-flex';
            element.style.background = 'transparent';
            element.style.border = 'none';
            element.style.padding = '0';
            element.appendChild(editor);
            editor.appendChild(picker);
            editor.appendChild(hexInput);
            editor.appendChild(clearBtn);
            hexInput.focus();
            hexInput.select();
        });
    }
    makeElementEditable(element, type, id, field, isMultiline = false) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        if (!element) return;
        element.dataset.entityType = type;
        element.dataset.entityId = id;
        element.dataset.entityField = field;
        if (element.dataset.textEditableBound === '1') return;
        element.dataset.textEditableBound = '1';
        element.classList.add('editable-field');
        element.title = "Click to edit";
        element.style.cursor = 'text';
        element.style.minHeight = '24px';
        element.style.padding = '4px 8px';
        element.style.borderRadius = '4px';
        element.style.border = '1px dashed transparent';
        element.style.transition = 'all 0.2s ease';
        element.addEventListener('mouseenter', () => {
            element.style.border = '1px dashed #667eea';
            element.style.background = 'rgba(102, 126, 234, 0.05)';
        });
        element.addEventListener('mouseleave', () => {
            if (!element.querySelector('input') && !element.querySelector('textarea')) {
                element.style.border = '1px dashed transparent';
                element.style.background = 'transparent';
            }
        });
        element.addEventListener('click', (e) => {
            if (!window.editModeManager || !window.editModeManager.isEditMode) return;
            e.stopPropagation();
            if (element.querySelector('input') || element.querySelector('textarea')) return;
            const originalValue = element.textContent.trim();
            const isPlaceholder = originalValue.startsWith('(') && originalValue.endsWith(')');
            const actualValue = isPlaceholder ? '' : originalValue;
            const elementRect = element.getBoundingClientRect();
            const container = element.closest('.tab-content-container') || 
                            element.closest('.department-details') || 
                            element.closest('.modal-details-body') ||
                            document.body;
            const containerRect = container.getBoundingClientRect();
            const availableWidth = containerRect.width - 40;
            const editElement = document.createElement(isMultiline ? 'textarea' : 'input');
            editElement.value = actualValue;
            editElement.className = 'inline-edit-input';
            editElement.style.width = '100%';
            editElement.style.maxWidth = availableWidth + 'px';
            editElement.style.boxSizing = 'border-box';
            editElement.style.fontFamily = 'inherit';
            editElement.style.fontSize = 'inherit';
            editElement.style.lineHeight = 'inherit';
            editElement.style.color = 'inherit';
            editElement.style.backgroundColor = 'var(--bg-secondary)';
            editElement.style.border = '2px solid #667eea';
            editElement.style.borderRadius = '6px';
            editElement.style.padding = '8px 12px';
            editElement.style.margin = '0';
            editElement.style.outline = 'none';
            editElement.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.2)';
            if (isMultiline) {
                editElement.style.minHeight = Math.max(100, elementRect.height + 20) + 'px';
                editElement.style.resize = 'vertical';
                editElement.style.overflowY = 'auto';
            } else {
                editElement.style.height = (elementRect.height + 8) + 'px';
            }
            const originalHTML = element.innerHTML;
            const originalDisplay = element.style.display;
            element.innerHTML = '';
            element.style.display = 'block';
            element.style.padding = '0';
            element.style.border = 'none';
            element.style.background = 'transparent';
            element.appendChild(editElement);
            editElement.focus();
            if (!isMultiline) {
                editElement.select();
            }
            const saveAction = () => {
                const newValue = editElement.value.trim();
                const targetType = element.dataset.entityType || type;
                const targetField = element.dataset.entityField || field;
                const targetId = targetType === 'dept'
                    ? this.currentDepartmentId
                    : (element.dataset.entityId || id);
                element.innerHTML = '';
                element.style.display = originalDisplay;
                if (newValue !== '' && newValue !== originalValue) {
                    element.textContent = newValue;
                    this.saveInlineChange(targetType, targetId, targetField, newValue);
                } else {
                    element.textContent = originalValue;
                }
                this.applyEditableStyle(element);
            };
            const cancelAction = () => {
                element.innerHTML = '';
                element.style.display = originalDisplay;
                element.innerHTML = originalHTML;
                this.applyEditableStyle(element);
            };
            editElement.addEventListener('blur', () => {
                setTimeout(saveAction, 100);
            });
            editElement.addEventListener('keydown', (ke) => {
                if (ke.key === 'Enter' && !isMultiline && !ke.shiftKey) {
                    ke.preventDefault();
                    saveAction();
                }
                if (ke.key === 'Escape') {
                    ke.preventDefault();
                    cancelAction();
                }
            });
            editElement.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
    applyEditableStyle(element) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        element.classList.add('editable-field');
        element.style.cursor = 'text';
        element.style.minHeight = '24px';
        element.style.padding = '4px 8px';
        element.style.borderRadius = '4px';
        element.style.border = '1px dashed transparent';
        element.style.transition = 'all 0.2s ease';
    }
    saveInlineChange(type, id, field, value) {
        const updates = { [field]: value };
        switch (type) {
            case 'dept':
                this.xmlParser.updateDepartment(id, updates);
                break;
            case 'task':
                this.xmlParser.updateTask(id, updates);
                break;
            case 'document':
                this.xmlParser.updateDocument(id, updates);
                break;
        }
        if (window.editModeManager && window.editModeManager.isEditMode) {
            window.editModeManager.triggerAutoSave();
            window.editModeManager.updateDiagramme(id);
        }
    }
    createSelectEditable(element, type, id, field, options) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        if (!element) return;
        element.classList.add('editable-field', 'editable-select');
        element.title = "Cliquer pour éditer";
        element.style.cursor = 'pointer';
        element.style.minHeight = '24px';
        element.style.padding = '4px 8px';
        element.style.borderRadius = '4px';
        element.style.border = '1px dashed transparent';
        element.style.transition = 'all 0.2s ease';
        element.style.display = 'inline-flex';
        element.style.alignItems = 'center';
        element.addEventListener('mouseenter', () => {
            if (!element.querySelector('select')) {
                element.style.border = '1px dashed #667eea';
                element.style.background = 'rgba(102, 126, 234, 0.05)';
            }
        });
        element.addEventListener('mouseleave', () => {
            if (!element.querySelector('select')) {
                element.style.border = '1px dashed transparent';
                element.style.background = 'transparent';
            }
        });
        element.addEventListener('click', (e) => {
            if (!window.editModeManager || !window.editModeManager.isEditMode) return;
            e.stopPropagation();
            if (!element) return;
            if (element.querySelector('select')) return;
            const originalValue = element.textContent.trim();
            let container = element.closest('.tab-content-container') || 
                          element.closest('.department-details') || 
                          element.closest('.modal-details-body') ||
                          document.body;
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const availableWidth = containerRect.width > 0 ? 
                Math.min(300, containerRect.width - 40) : 300;
            const originalHTML = element.innerHTML;
            const originalDisplay = element.style.display;
            const select = document.createElement('select');
            select.className = 'inline-edit-select';
            select.style.width = '100%';
            select.style.maxWidth = availableWidth + 'px';
            select.style.height = (elementRect.height + 8) + 'px';
            select.style.boxSizing = 'border-box';
            select.style.fontFamily = 'inherit';
            select.style.fontSize = 'inherit';
            select.style.lineHeight = 'inherit';
            select.style.color = 'inherit';
            select.style.backgroundColor = 'var(--bg-secondary)';
            select.style.border = '2px solid #667eea';
            select.style.borderRadius = '6px';
            select.style.padding = '6px 10px';
            select.style.margin = '0';
            select.style.outline = 'none';
            select.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.2)';
            select.style.appearance = 'none';
            select.style.cursor = 'pointer';
            options.forEach(option => {
                const optionEl = document.createElement('option');
                optionEl.value = option.value;
                optionEl.textContent = option.text;
                if (option.value === originalValue || 
                    (originalValue === '' && option.value === 'other') ||
                    this.getTranslatedDepartmentType(option.value) === originalValue) {
                    optionEl.selected = true;
                }
                select.appendChild(optionEl);
            });
            element.innerHTML = '';
            element.style.display = 'block';
            element.style.padding = '0';
            element.style.border = 'none';
            element.style.background = 'transparent';
            element.appendChild(select);
            select.focus();
            const saveAction = () => {
                const newValue = select.value;
                const targetId = type === 'dept' ? this.currentDepartmentId : id;
                element.innerHTML = '';
                element.style.display = originalDisplay;
                if (newValue !== originalValue) {
                    element.textContent = this.getTranslatedDepartmentType(newValue);
                    this.saveInlineChange(type, targetId, field, newValue);
                } else {
                    element.innerHTML = originalHTML;
                }
                this.applyEditableStyle(element);
            };
            const cancelAction = () => {
                element.innerHTML = '';
                element.style.display = originalDisplay;
                element.innerHTML = originalHTML;
                this.applyEditableStyle(element);
            };
            select.addEventListener('change', () => {
                setTimeout(saveAction, 100);
            });
            select.addEventListener('blur', () => {
                setTimeout(saveAction, 100);
            });
            select.addEventListener('keydown', (ke) => {
                if (ke.key === 'Escape') {
                    ke.preventDefault();
                    cancelAction();
                }
                if (ke.key === 'Enter') {
                    ke.preventDefault();
                    saveAction();
                }
            });
            select.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
    getDepartmentTypeOptions() {
        return this.departmentTypes.map(type => ({
            value: type,
            text: this.getTranslatedDepartmentType(type)
        }));
    }
    addQuizButton() {
        const container = this.getContentContainer();
        if (!container) return;
        const deptHeader = container.querySelector('.dept-header');
        if (!deptHeader) return;
        if (deptHeader.querySelector('#quiz-btn')) return;
        const quizButton = document.createElement('button');
        quizButton.id = 'quiz-btn';
        quizButton.className = 'quiz-button';
        quizButton.innerHTML = 'Quiz';
        quizButton.title = "Start a quiz about this department";
        deptHeader.style.position = 'relative';
        quizButton.style.position = 'absolute';
        quizButton.style.top = '16px';
        quizButton.style.right = '20px';
        quizButton.style.padding = '6px 12px';
        quizButton.style.background = 'var(--accent-primary)';
        quizButton.style.color = 'var(--text-inverse, #ffffff)';
        quizButton.style.border = '1px solid var(--accent-primary)';
        quizButton.style.borderRadius = '6px';
        quizButton.style.cursor = 'pointer';
        quizButton.style.fontSize = '13px';
        quizButton.style.fontWeight = '500';
        quizButton.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';
        quizButton.style.transition = 'all 0.3s ease';
        quizButton.addEventListener('mouseenter', () => {
            quizButton.style.transform = 'translateY(-2px)';
            quizButton.style.background = 'var(--accent-secondary)';
            quizButton.style.borderColor = 'var(--accent-secondary)';
            quizButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.18)';
        });
        quizButton.addEventListener('mouseleave', () => {
            quizButton.style.transform = 'translateY(0)';
            quizButton.style.background = 'var(--accent-primary)';
            quizButton.style.borderColor = 'var(--accent-primary)';
            quizButton.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.12)';
        });
        quizButton.addEventListener('click', () => {
            if (this.currentDepartmentId && this.qcmGenerator) {
                this.startDepartmentQuiz(this.currentDepartmentId);
            }
        });
        deptHeader.appendChild(quizButton);
    }
    addEditButton() {
        const container = this.getContentContainer();
        if (!container) return;
        const deptHeader = container.querySelector('.dept-header');
        if (!deptHeader) return;
        const existingBtn = deptHeader.querySelector('#edit-dept-btn');
        if (existingBtn) existingBtn.remove();
        if (!this.currentDepartmentId || !window.editModeManager || !window.editModeManager.isEditMode) return;
        const editButton = document.createElement('button');
        editButton.id = 'edit-dept-btn';
        editButton.className = 'edit-dept-button';
        editButton.innerHTML = '✏️ ' + "Edit";
        editButton.title = "Edit Department";
        editButton.style.position = 'absolute';
        editButton.style.top = '16px';
        editButton.style.right = (deptHeader.querySelector('#quiz-btn') ? '100px' : '20px');
        editButton.style.padding = '6px 12px';
        editButton.style.background = 'linear-gradient(135deg, #667eea 0%, #667eea 100%)';
        editButton.style.color = 'white';
        editButton.style.border = 'none';
        editButton.style.borderRadius = '6px';
        editButton.style.cursor = 'pointer';
        editButton.style.fontSize = '13px';
        editButton.style.fontWeight = '500';
        editButton.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
        editButton.style.transition = 'all 0.3s ease';
        editButton.addEventListener('click', () => {
            if (this.currentDepartmentId && window.editModeManager) {
                window.editModeManager.editDepartmentById(this.currentDepartmentId);
            }
        });
        deptHeader.appendChild(editButton);
    }
    startDepartmentQuiz(departmentId) {
        if (!this.qcmGenerator) {
            this.qcmGenerator = new QCMGenerator(this.xmlParser);
            this.qcmGenerator.setLanguage(this.lng);
            if (!this.qcmGenerator.modal) {
                this.qcmGenerator.init();
            }
        }
        const dept = this.xmlParser.getDepartement(departmentId);
        const deptName = dept ? dept.nom : '';
        const modalTitle = this.qcmGenerator.modal.querySelector('.modal-quiz-header h2');
        if (modalTitle && deptName) {
            modalTitle.textContent = `Quiz for department: ${deptName}`;
        }
        this.qcmGenerator.resetQuiz();
        this.qcmGenerator.generateDepartmentSpecificQuestions(departmentId);
        this.qcmGenerator.openModal(departmentId);
    }
    refreshEditMode() {
        this.addEditButton();
        if (this.currentDepartmentId) {
            this.showDepartmentDetailsId(this.currentDepartmentId);
        }
    }
}
