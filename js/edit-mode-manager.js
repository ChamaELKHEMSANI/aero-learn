class EditModeManager {
    constructor(xmlParser, diagramme, currentXmlFile, assetManager, tab_assets) {
        this.xmlParser = xmlParser;
        this.diagramme = diagramme;
        this.isEditMode = false;
        this.lng = 'en';
        this.assetManager = assetManager;
        this.tab_assets = tab_assets;
        this.currentXmlFile = currentXmlFile;
        this.clipboard = null;
        this.selectedDeptForToolbar = null;
        this.visualSearchMode = 'departements';
        this.toolbarPositions = {};
        this.departmentsView= null;
        this.tasksView= null;
        this.documentsView= null;
        this.organisationView = null;
        this.translations = {
            en: {
                editMode: 'Edit Mode',
                exitEditMode: 'Exit Edit Mode',
                configuration: 'Configuration',
                fileManagement: 'File Management',
                noDepartmentSelected: 'No department selected',
                editDepartment: 'Edit',
                addDepartment: 'Add',
                duplicate: 'Duplicate',
                delete: 'Delete',
                deleteDepartment: 'Delete',
                copy: 'Copy',
                cut: 'Cut',
                paste: 'Paste',
                refresh: 'Refresh',
                save: 'Save',
                showDetails: 'Show Details',
                hideDetails: 'Hide Details',
                visualizationMode: 'View Mode',
                search: 'Search',
                searchIn: 'Search in',
                searchPlaceholderDepartments: 'Search department...',
                searchPlaceholderDocuments: 'Search document...',
                searchPlaceholderTasks: 'Search task...',
                searchScopeDepartments: 'Departments',
                searchScopeDocuments: 'Documents',
                searchScopeTasks: 'Tasks',
                organization: 'Organisation',
                departments: 'Departments',
                documents: 'Documents',
                tasks: 'Tasks',
                noSearchResult: 'No result for "{term}"',
                documentReadOnly: 'This organisation chart is read-only. Unlock it from Organisation to edit it.',
                departmentNotFound: 'Department not found',
                cannotCutRoot: 'Cannot cut root department',
                cannotCopyRoot: 'Cannot copy root department',
                departmentCopied: 'Department "{name}" copied',
                departmentCut: 'Department "{name}" cut (paste to move)',
                nothingToPaste: 'Nothing to paste',
                parentDepartmentNotFound: 'Parent department not found',
                cannotMoveIntoDescendant: 'Cannot move a department into its own descendant',
                departmentAlreadyUnderParent: 'Department is already under this parent',
                errorMovingDepartment: 'Error moving department',
                errorPasting: 'Error pasting',
                pasteSuccess: 'Department pasted under "{parentName}"',
                moveSuccess: 'Department "{deptName}" moved under "{parentName}"',
                errorMovingDepartment: 'Error moving department',
                cannotMoveIntoDescendant: 'Cannot move a department into its own descendant',
                departmentAlreadyUnderParent: 'Department is already under this parent',
                departmentMoved: 'Department moved successfully',
                diagramNotInitialized: 'Diagram not properly initialized',
                success: 'Success',
                error: 'Error',
                info: 'Info'
            },
            fr: {
                editMode: 'Mode èdition',
                exitEditMode: 'Quitter le Mode èdition',
                configuration: 'Configuration',
                fileManagement: 'Gestion des fichiers',
                noDepartmentSelected: 'Aucun département sélectionné',
                editDepartment: 'Modifier',
                addDepartment: 'Ajouter',
                duplicate: 'Dupliquer',
                delete: 'Supprimer',
                deleteDepartment: 'Supprimer',
                copy: 'Copier',
                cut: 'Couper',
                paste: 'Coller',
                refresh: 'Rafraêchir',
                save: 'Sauvegarder',
                showDetails: 'Afficher Détails',
                hideDetails: 'Masquer Détails',
                visualizationMode: 'Mode visuel',
                search: 'Rechercher',
                searchIn: 'Rechercher dans',
                searchPlaceholderDepartments: 'Rechercher un département...',
                searchPlaceholderDocuments: 'Rechercher un document...',
                searchPlaceholderTasks: 'Rechercher une tâche...',
                searchScopeDepartments: 'Départements',
                searchScopeDocuments: 'Documents',
                searchScopeTasks: 'Tâches',
                organization: 'Organisation',
                departments: 'Départements',
                documents: 'Documents',
                tasks: 'Tâches',
                noSearchResult: 'Aucun résultat pour "{term}"',
                documentReadOnly: 'Cet organigramme est en lecture seule. Déverrouillez-le depuis Organisation pour le modifier.',
                departmentNotFound: 'Département non trouvé',
                cannotCutRoot: 'Impossible de couper le département racine',
                cannotCopyRoot: 'Impossible de copier le département racine',
                departmentCopied: 'Département "{name}" copié',
                departmentCut: 'Département "{name}" coupé (collez pour déplacer)',
                nothingToPaste: 'Rien Ã  coller',
                parentDepartmentNotFound: 'Département parent non trouvé',
                cannotMoveIntoDescendant: 'Impossible de déplacer un département dans son propre descendant',
                departmentAlreadyUnderParent: 'Le département est déjÃ  sous ce parent',
                errorMovingDepartment: 'Erreur lors du déplacement du département',
                errorPasting: 'Erreur lors du collage',
                pasteSuccess: 'Département collé sous "{parentName}"',
                moveSuccess: 'Département "{deptName}" déplacé sous "{parentName}"',
                errorMovingDepartment: 'Erreur lors du déplacement du département',
                cannotMoveIntoDescendant: 'Impossible de déplacer un département dans son propre descendant',
                departmentAlreadyUnderParent: 'Le département est déjÃ  sous ce parent',
                departmentMoved: 'Département déplacé avec succÃ¨s',
                diagramNotInitialized: 'Diagramme non initialisé correctement',
                success: 'Succés',
                error: 'Erreur',
                info: 'Info'
            }
        };
        this.exportManager = new EditExportManager(xmlParser);
        this.autoSaveManager = new AutoSaveManager(xmlParser);
        this.messageManager = new EditMessageManager(this.lng);
        this.configManager = new EditConfigManager(this);
        this.fileManager = new EditFileManager(this);
        this.projectManager = new EditProjectManager(this);
        this.departmentManager = new EditDepartmentManager(this);
        this.init();
        window.addEventListener('beforeunload', () => {
            this.cleanupDragDrop();
        });
    }
    setLang(lng) {
        this.lng = lng;
        if (this.diagramme) { this.diagramme.setLang(lng);}
        if (this.configManager) { this.configManager.setLang(lng);}
        if (this.messageManager) {this.messageManager.setLang(lng);}
        if (this.autoSaveManager) {this.autoSaveManager.setLang(lng);}
        if (this.departmentManager) {this.departmentManager.setLang(lng);}
        if (this.fileManager) {this.fileManager.setLang(lng);}
        if (this.exportManager) {this.exportManager.setLang(lng);}
        if (this.projectManager) {this.projectManager.setLang(lng);}
        if (this.organisationView) {this.organisationView.setLang(lng);}
        this.updateUI();
        if(window.app ) {
            window.app.queryDetails.setLang(lng);
        }
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    async init() {
        this.createUI();
        await this.autoSaveManager.init();
        await this.restoreLastSave();
        this.autoSaveManager.setEditModeManager(this);
        this.configManager.loadConfigFromStorage();
        this.lng=this.configManager.appConfig.language || 'en';
        this.setLang(this.lng);
   }
    initView(mode) {
        if(mode=="departements"){
            if (!this.departmentsView) {
                this.departmentsView = new EditViewDepartements(this);
            }
         }
        if(mode=="tasks"){
            if (!this.tasksView) {
                this.tasksView = new EditViewTasks(this);
            }
         }
       if(mode=="documents"){
            if (!this.documentsView) {
                this.documentsView = new EditViewDocuments(this);
            }
         }
       if(mode=="organisation"){
            if (!this.organisationView) {
                this.organisationView = new EditViewOrganisation(this);
            }
         }
    }
    showView(mode) {
        this.initView(mode);
       if(mode=="organisation"){
         this.organisationView.open();
        }
       if(mode=="departements"){
         this.departmentsView.open();
        } 
       if(mode=="tasks"){
         this.tasksView.open();
        }      
       if(mode=="documents"){
         this.documentsView.open();
        }      
    }
    loadConfigFromStorage() {
        if (this.configManager)
            this.configManager.loadConfigFromStorage();
    }
    async restoreLastSave() {
        if (this.autoSaveManager)
            this.autoSaveManager.restoreLastSave();
    }
    triggerAutoSave() {
        if (this.autoSaveManager && this.currentXmlFile && this.configManager.appConfig.autoSave) {
            this.autoSaveManager.scheduleAutoSave(this.currentXmlFile);
        }
    }
    isDocumentReadOnly() {
        return Boolean(this.xmlParser?.isReadOnly?.());
    }
    ensureDocumentWritable() {
        if (!this.isDocumentReadOnly()) {
            return true;
        }
        this.showNotification(this.translate('documentReadOnly'), 'warning');
        return false;
    }
    isToggleInteraction(target) {
        return Boolean(
            target?.closest?.('.toggle-hit-area') ||
            target?.closest?.('.toggle')
        );
    }
    updateDiagramme(id){
        if (this.diagramme)
            this.diagramme.drawDepartement(id);
        }
    showNotification(message, type, temporisation = 5) {
        if (this.messageManager) {
            this.messageManager.showNotification(message, type, temporisation);
        }
    }
    async showConfirm(message, title) {
        if (this.messageManager) {
            return await this.messageManager.showConfirm(message, title);
        }
    }
    async showAlert(message, title = 'Alert') {
        if (this.messageManager) {
            return await this.messageManager.showAlert(message,title);
        }
    }
    createUI() {
        document.body.classList.add('has-edit-floating-buttons');
        const configBtn = document.createElement('button');
        configBtn.className = 'config-btn';
        configBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        `;
        configBtn.id = 'config-btn';
        configBtn.title = this.translate('configuration');
        configBtn.style.position = 'fixed';
        configBtn.style.top = '20px';
        configBtn.style.right = '20px';
        configBtn.style.zIndex = '1001';
        document.body.appendChild(configBtn);
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'edit-mode-toggle';
        toggleBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>${this.translate('editMode')}</span>
        `;
        toggleBtn.id = 'edit-mode-toggle';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.top = '20px';
        toggleBtn.style.right = '70px';
        toggleBtn.style.zIndex = '1001';
        document.body.appendChild(toggleBtn);
        this.createEditToolbar();
        this.createViewToolbar();
        const fileBtn = document.createElement('button');
        fileBtn.className = 'file-management-btn';
        fileBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>${this.translate('fileManagement')}</span>
        `;
        fileBtn.id = 'file-management-btn';
        fileBtn.title = this.translate('fileManagement');
        document.body.appendChild(fileBtn);
        this.attachEventListeners();
    }
    createEditToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'edit-context-toolbar';
        toolbar.id = 'edit-context-toolbar';
        toolbar.innerHTML = `
            <div class="edit-toolbar-main">
                <button class="toolbar-drag-grip" type="button" aria-label="Move toolbar" title="Move toolbar">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                </button>
                <div class="edit-toolbar-header">
                    <span class="edit-toolbar-title">${this.translate('editMode')}</span>
                    <span class="edit-toolbar-department" id="edit-toolbar-department">${this.translate('noDepartmentSelected')}</span>
                </div>
                <div class="edit-toolbar-actions">
                    <div class="edit-toolbar-buttons edit-toolbar-buttons-primary">
                        <button class="edit-toolbar-btn" id="edit-toolbar-save" title="${this.translate('save')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            <span>${this.translate('save')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-edit" title="${this.translate('editDepartment')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>${this.translate('editDepartment')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-add" title="${this.translate('addDepartment')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>${this.translate('addDepartment')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-duplicate" title="${this.translate('duplicate')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>${this.translate('duplicate')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-delete" title="${this.translate('deleteDepartment')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>${this.translate('delete')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-copy" title="${this.translate('copy')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>${this.translate('copy')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-cut" title="${this.translate('cut')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span>${this.translate('cut')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-paste" title="${this.translate('paste')}" disabled>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>${this.translate('paste')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-refresh" title="${this.translate('refresh')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>${this.translate('refresh')}</span>
                        </button>
                        <button class="edit-toolbar-btn" id="edit-toolbar-toggle-details" title="${this.translate('hideDetails')}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>${this.translate('hideDetails')}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
        toolbar.style.display = 'none';
        document.body.appendChild(toolbar);
        this.makeToolbarDraggable(toolbar);
    }
    createViewToolbar() {
        const existing = document.getElementById('view-context-toolbar');
        if (existing) existing.remove();
        const toolbar = document.createElement('div');
        toolbar.className = 'view-context-toolbar';
        toolbar.id = 'view-context-toolbar';
        toolbar.innerHTML = `
            <button class="toolbar-drag-grip" type="button" aria-label="Move toolbar" title="Move toolbar">
                <span></span><span></span><span></span>
                <span></span><span></span><span></span>
            </button>
            <div class="edit-toolbar-header">
                <span class="edit-toolbar-title">${this.translate('visualizationMode')}</span>
                <span class="edit-toolbar-department" id="view-toolbar-department">${this.translate('noDepartmentSelected')}</span>
            </div>
            <div class="view-toolbar-main">
                <div class="edit-toolbar-buttons view-toolbar-buttons">
                    <button class="edit-toolbar-btn view-toolbar-btn " id="view-toolbar-organisation" title="${this.translate('organization')}">
                        <span>${this.translate('organization')}</span>
                    </button>
                    <button class="edit-toolbar-btn view-toolbar-btn " id="view-toolbar-departements" title="${this.translate('departments')}">
                        <span>${this.translate('departments')}</span>
                    </button>
                    <button class="edit-toolbar-btn view-toolbar-btn" id="view-toolbar-documents" title="${this.translate('documents')}">
                        <span>${this.translate('documents')}</span>
                    </button>
                    <button class="edit-toolbar-btn view-toolbar-btn" id="view-toolbar-taches" title="${this.translate('tasks')}">
                        <span>${this.translate('tasks')}</span>
                    </button>
                </div>
                <div class="view-toolbar-search-row">
                    <div class="view-toolbar-search-group">
                        <label for="view-toolbar-search-scope" class="view-toolbar-search-label" title="${this.translate('searchIn')}"><span aria-hidden="true">🔍</span></label>
                        <select id="view-toolbar-search-scope" class="view-toolbar-search-scope" aria-label="${this.translate('searchIn')}">
                            <option value="departements">${this.translate('searchScopeDepartments')}</option>
                            <option value="documents">${this.translate('searchScopeDocuments')}</option>
                            <option value="taches">${this.translate('searchScopeTasks')}</option>
                        </select>
                        <input
                            type="text"
                            id="view-toolbar-search"
                            class="view-toolbar-search"
                            placeholder="${this.translate('searchPlaceholderDepartments')}"
                            aria-label="${this.translate('search')}"
                        />
                    </div>
                    <div id="view-toolbar-suggestions" class="view-toolbar-suggestions" style="display:none;"></div>
                </div>
            </div>
        `;
        toolbar.style.display = 'flex';
        document.body.appendChild(toolbar);
        this.makeToolbarDraggable(toolbar);
        this.setVisualSearchMode(this.visualSearchMode);
    }
    makeToolbarDraggable(toolbar) {
        if (!toolbar) return;
        const grip = toolbar.querySelector('.toolbar-drag-grip');
        if (!grip) return;
        const resetPosition = () => {
            if (window.innerWidth <= 768) {
                toolbar.style.left = '';
                toolbar.style.top = '';
                toolbar.style.transform = '';
                toolbar.classList.remove('toolbar-is-dragged');
                delete this.toolbarPositions[toolbar.id];
                return true;
            }
            return false;
        };
        const applySavedPosition = () => {
            const savedPosition = this.toolbarPositions[toolbar.id];
            if (!savedPosition || resetPosition()) return;
            toolbar.style.left = `${savedPosition.left}px`;
            toolbar.style.top = `${savedPosition.top}px`;
            toolbar.style.transform = 'none';
            toolbar.classList.add('toolbar-is-dragged');
        };
        const clampPosition = (left, top) => {
            const rect = toolbar.getBoundingClientRect();
            const maxLeft = Math.max(8, window.innerWidth - rect.width - 8);
            const minTop = 8;
            const maxTop = Math.max(minTop, window.innerHeight - rect.height - 8);
            return {
                left: Math.min(Math.max(8, left), maxLeft),
                top: Math.min(Math.max(minTop, top), maxTop)
            };
        };
        let dragState = null;
        grip.addEventListener('pointerdown', (event) => {
            if (resetPosition()) return;
            const rect = toolbar.getBoundingClientRect();
            dragState = {
                offsetX: event.clientX - rect.left,
                offsetY: event.clientY - rect.top
            };
            toolbar.classList.add('toolbar-is-dragged');
            toolbar.style.transform = 'none';
            grip.setPointerCapture(event.pointerId);
            event.preventDefault();
        });
        grip.addEventListener('pointermove', (event) => {
            if (!dragState) return;
            const nextPosition = clampPosition(
                event.clientX - dragState.offsetX,
                event.clientY - dragState.offsetY
            );
            toolbar.style.left = `${nextPosition.left}px`;
            toolbar.style.top = `${nextPosition.top}px`;
            this.toolbarPositions[toolbar.id] = nextPosition;
        });
        const stopDrag = (event) => {
            if (!dragState) return;
            if (event && grip.hasPointerCapture(event.pointerId)) {
                grip.releasePointerCapture(event.pointerId);
            }
            dragState = null;
        };
        grip.addEventListener('pointerup', stopDrag);
        grip.addEventListener('pointercancel', stopDrag);
        window.addEventListener('resize', applySavedPosition);
        applySavedPosition();
    }
    attachEventListeners() {
        const toggleBtn = document.getElementById('edit-mode-toggle');
        if (toggleBtn._editModeClickHandler) {
            toggleBtn.removeEventListener('click', toggleBtn._editModeClickHandler);
        }
        toggleBtn._editModeClickHandler = () => {
            this.toggleEditMode();
        };
        toggleBtn.addEventListener('click', toggleBtn._editModeClickHandler);
        document.getElementById('config-btn').addEventListener('click', () => {
            this.configManager.showConfigModal();
        });
        document.getElementById('file-management-btn').addEventListener('click', () => {
            this.fileManager.showFileManagement();
        });
        document.getElementById('edit-toolbar-edit')?.addEventListener('click', () => {
            if (this.departmentManager && this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                this.editDepartmentById(this.selectedDeptForToolbar.id);
            }
        });
        document.getElementById('edit-toolbar-add')?.addEventListener('click', () => {
            if (this.departmentManager && this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                this.addChildDepartmentById(this.selectedDeptForToolbar.id);
            }
        });
        document.getElementById('edit-toolbar-duplicate')?.addEventListener('click', () => {
            if (this.departmentManager && this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                this.duplicateDepartmentById(this.selectedDeptForToolbar.id);
            }
        });
        document.getElementById('edit-toolbar-delete')?.addEventListener('click', () => {
            if (this.departmentManager && this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                this.deleteDepartmentById(this.selectedDeptForToolbar.id);
            }
        });
        document.getElementById('edit-toolbar-cut')?.addEventListener('click', () => {
            if (this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                this.cutDepartmentById(this.selectedDeptForToolbar.id);
            }
        });
        document.getElementById('edit-toolbar-copy')?.addEventListener('click', () => {
            if (this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                this.copyDepartmentById(this.selectedDeptForToolbar.id);
            }
        });
        document.getElementById('edit-toolbar-paste')?.addEventListener('click', () => {
            this.pasteDepartment();
        });
        document.getElementById('edit-toolbar-refresh')?.addEventListener('click', () => {
            this.refreshWithSelection();
        });
        document.getElementById('edit-toolbar-save')?.addEventListener('click', () => {
            if( this.fileManager )
                this.fileManager.saveFile();
            if( this.autoSaveManager  && this.currentXmlFile )
                this.autoSaveManager.autoSave(  this.currentXmlFile)
        });
        document.getElementById('edit-toolbar-toggle-details')?.addEventListener('click', () => {
            this.toggleDetailsVisibility();
        });
        document.getElementById('view-toolbar-search-scope')?.addEventListener('change', (e) => {
            this.setVisualSearchMode(e.target.value);
        });
        document.getElementById('view-toolbar-search')?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performVisualSearch(e.target.value || '');
            }
        });
        document.getElementById('view-toolbar-search')?.addEventListener('input', (e) => {
            this.updateSearchSuggestions(e.target.value || '');
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.view-toolbar-main')) {
                this.hideSearchSuggestions();
            }
        });
        document.addEventListener('click', (e) => {
            if (!this.isEditMode) return;
            if (this.isToggleInteraction(e.target)) return;
            const nodeElement = e.target.closest('.node');
            if (nodeElement) {
                e.stopPropagation();
                e.preventDefault();
                const d3Node = d3.select(nodeElement).datum();
                if (d3Node) {
                    this.updateEditToolbar(d3Node);
                }
            } else if (!e.target.closest('.edit-context-toolbar')) {
            }
        });
        this.attachNodeClickListeners();
    }
    setViewContentTab(tabName) {
        const map = {
            general: 'view-toolbar-departements',
            documents: 'view-toolbar-documents',
            taches: 'view-toolbar-taches'
        };
        document.querySelectorAll('.view-toolbar-btn').forEach((btn) => btn.classList.remove('active'));
        const activeBtn = document.getElementById(map[tabName]);
        if (activeBtn) activeBtn.classList.add('active');
        if (window.app && window.app.queryDetails && typeof window.app.queryDetails.switchTab === 'function') {
            window.app.queryDetails.switchTab(tabName);
        }
    }
    setVisualSearchMode(mode) {
        this.visualSearchMode = mode;
        const placeholderByMode = {
            departements: this.translate('searchPlaceholderDepartments'),
            documents: this.translate('searchPlaceholderDocuments'),
            taches: this.translate('searchPlaceholderTasks')
        };
        const input = document.getElementById('view-toolbar-search');
        if (input) {
            input.placeholder = placeholderByMode[mode] || this.translate('searchPlaceholderDepartments');
        }
        const scopeSelect = document.getElementById('view-toolbar-search-scope');
        if (scopeSelect && scopeSelect.value !== mode) {
            scopeSelect.value = mode;
        }
        const currentValue = input ? input.value : '';
        this.updateSearchSuggestions(currentValue || '');
    }
    getSearchSuggestions(rawTerm) {
        const term = String(rawTerm || '').trim();
        if (term.length < 3) return [];
        const query = term.toLowerCase();
        const suggestions = [];
        if (this.visualSearchMode === 'departements') {
            const matches = this.xmlParser.searchDepartements(query)
                .filter((dept) => dept && dept.id && dept.id !== 'root')
                .slice(0, 12);
            matches.forEach((dept) => {
                suggestions.push({
                    label: dept.nom || dept.id,
                    sublabel: dept.id,
                    departmentId: dept.id
                });
            });
        } else if (this.visualSearchMode === 'documents') {
            const docs = (this.xmlParser.getAllDocuments() || []).filter((doc) =>
                (doc.nom || '').toLowerCase().includes(query) ||
                (doc.description || '').toLowerCase().includes(query) ||
                (doc.code || '').toLowerCase().includes(query) ||
                (doc.ref || '').toLowerCase().includes(query) ||
                (doc.lien || '').toLowerCase().includes(query)
            ).slice(0, 12);
            docs.forEach((doc) => {
                const departmentId = doc?.departments?.[0];
                if (!departmentId) return;
                suggestions.push({
                    label: doc.nom || doc.id || 'Document',
                    sublabel: doc.code || doc.ref || departmentId,
                    departmentId
                });
            });
        } else if (this.visualSearchMode === 'taches') {
            const tasks = (this.xmlParser.getAllTasks() || []).filter((task) =>
                (task.nom || '').toLowerCase().includes(query) ||
                (task.description || '').toLowerCase().includes(query) ||
                (task.categorie || '').toLowerCase().includes(query)
            ).slice(0, 12);
            tasks.forEach((task) => {
                const departmentId = task?.departments?.[0];
                if (!departmentId) return;
                suggestions.push({
                    label: task.nom || task.id || 'Task',
                    sublabel: task.categorie || departmentId,
                    departmentId
                });
            });
        }
        return suggestions;
    }
    updateSearchSuggestions(rawTerm) {
        const container = document.getElementById('view-toolbar-suggestions');
        if (!container) return;
        const suggestions = this.getSearchSuggestions(rawTerm);
        if (!suggestions.length) {
            this.hideSearchSuggestions();
            return;
        }
        container.innerHTML = suggestions.map((item) => `
            <button type="button" class="view-suggestion-item" data-dept-id="${item.departmentId}">
                <span class="view-suggestion-label">${item.label}</span>
                <span class="view-suggestion-sub">${item.sublabel || ''}</span>
            </button>
        `).join('');
        container.style.display = 'block';
        container.querySelectorAll('.view-suggestion-item').forEach((btn) => {
            btn.addEventListener('click', () => {
                const deptId = btn.getAttribute('data-dept-id');
                const label = btn.querySelector('.view-suggestion-label')?.textContent || '';
                const input = document.getElementById('view-toolbar-search');
                if (input && label) input.value = label;
                this.hideSearchSuggestions();
                this.navigateToDepartment(deptId);
            });
        });
    }
    hideSearchSuggestions() {
        const container = document.getElementById('view-toolbar-suggestions');
        if (!container) return;
        container.style.display = 'none';
        container.innerHTML = '';
    }
    navigateToDepartment(targetDeptId) {
        if (!targetDeptId) return;
        this.updateSelectedDepartmentById(targetDeptId);
        if (this.diagramme && typeof this.diagramme.navigateToDepartmentFromSelect === 'function') {
            this.diagramme.navigateToDepartmentFromSelect(targetDeptId);
        }
        if (window.app && window.app.queryDetails && typeof window.app.queryDetails.showDepartmentDetailsId === 'function') {
            window.app.queryDetails.showDepartmentDetailsId(targetDeptId);
        }
    }
    performVisualSearch(rawTerm) {
        const term = String(rawTerm || '').trim();
        if (!term) return;
        const suggestions = this.getSearchSuggestions(term);
        const targetDeptId = suggestions[0]?.departmentId || null;
        if (!targetDeptId) {
            this.showNotification(this.translate('noSearchResult', { term }), 'info');
            return;
        }
        this.navigateToDepartment(targetDeptId);
    }
    attachNodeClickListeners() {
        if (this._nodeClickHandler) {
            document.removeEventListener('click', this._nodeClickHandler, true);
        }
        this._nodeClickHandler = (e) => {
            if (this.isToggleInteraction(e.target)) {
                return;
            }
            let targetElement = e.target;
            let nodeElement = null;
            while (targetElement && targetElement !== document.body) {
                if (targetElement.classList && targetElement.classList.contains('node')) {
                    nodeElement = targetElement;
                    break;
                }
                targetElement = targetElement.parentElement;
            }
            if (nodeElement) {
                const d3Node = d3.select(nodeElement).datum();
                if (d3Node) {
                    if (this.isEditMode) {
                        this.updateEditToolbar(d3Node);
                    } else {
                        this.updateSelectedDepartment(d3Node);
                    }
                    d3.select(nodeElement).classed('selected', true);
                }
            } else if (!e.target.closest('.edit-context-toolbar') &&
                !e.target.closest('.node-edit-controls-svg') &&
                !e.target.closest('#edit-modal') &&
                !e.target.closest('#confirm-dialog') &&
                !e.target.closest('#config-modal')) {
            }
        };
        document.addEventListener('click', this._nodeClickHandler, true);
    }
    updateSelectedDepartment(d3Node) {
        if (!d3Node || !d3Node.data || !d3Node.data.data) {
            this.selectedDeptForToolbar = null;
            this.updateViewToolbarDepartment();
            return;
        }
        this.selectedDeptForToolbar = {
            id: d3Node.data.data.id,
            nom: d3Node.data.data.nom,
            data: d3Node.data.data,
            parent: d3Node.data.parent,
            d3Node: d3Node,
            element: d3Node
        };
        this.updateViewToolbarDepartment();
    }
    updateSelectedDepartmentById(deptId) {
        if (!deptId) {
            this.selectedDeptForToolbar = null;
            this.updateViewToolbarDepartment();
            return;
        }
        const deptData = this.xmlParser?.getDepartement?.(deptId);
        if (!deptData) return;
        this.selectedDeptForToolbar = {
            ...(this.selectedDeptForToolbar || {}),
            id: deptId,
            nom: deptData.nom,
            data: deptData
        };
        this.updateViewToolbarDepartment();
    }
    updateViewToolbarDepartment() {
        const deptSpan = document.getElementById('view-toolbar-department');
        if (!deptSpan) return;
        deptSpan.textContent = this.selectedDeptForToolbar?.nom || this.translate('noDepartmentSelected');
    }
    exportDiagram() {
        if (this.exportManager) {
            this.exportManager.showExportDialog(this.diagramme.diagramme);
        }
    }
    exportProject() {
        if (this.exportManager) {
            this.projectManager.showHtmlExportDialog();
        }
    }
    refreshWithSelection() {
        if (!this.isEditMode) return;
        const selectedDeptId = this.selectedDeptForToolbar ? this.selectedDeptForToolbar.id : null;
        const selectedDeptName = this.selectedDeptForToolbar ? this.selectedDeptForToolbar.nom : null;
        this.refreshDiagram();
        if (selectedDeptId) {
            setTimeout(() => {
                this.restoreSelection(selectedDeptId, selectedDeptName);
                this.diagramme.navigateToDepartmentFromSelect(currentSelection);
            }, 800);
        }
    }
    restoreSelection(deptId, deptName = null) {
        if (!deptId || !this.isEditMode) return;
        const nodeElements = document.querySelectorAll('.node-text, .node-name, .node-label');
        let nodeElement = null;
        for (const element of nodeElements) {
            if (element.textContent.includes(deptName) ||
                element.textContent.includes(deptId)) {
                nodeElement = element.closest('.node');
                break;
            }
        }
        if (!nodeElement) {
            const allNodes = document.querySelectorAll('.node');
            allNodes.forEach(node => {
                const d3Data = d3.select(node).datum();
                if (d3Data && d3Data.data && d3Data.data.data && d3Data.data.data.id === deptId) {
                    nodeElement = node;
                }
            });
        }
        if (nodeElement) {
            const d3Node = d3.select(nodeElement).datum();
            if (d3Node && d3Node.data && d3Node.data.data) {
                this.updateEditToolbar(d3Node);
                d3.selectAll('.node').classed('selected', false);
                d3.select(nodeElement).classed('selected', true);
                this.selectedDeptForToolbar = {
                    id: deptId,
                    nom: deptName || d3Node.data.data.nom,
                    data: d3Node.data.data,
                    parent: d3Node.data.parent,
                    d3Node: d3Node,
                    element: nodeElement
                };
            } else {
                console.warn('Données D3 non trouvées pour le noeud:', deptId);
                this.updateEditToolbar(null);
                d3.selectAll('.node').classed('selected', false);
            }
        } else {
            console.warn('èlément DOM non trouvé pour le département:', deptId);
            this.updateEditToolbar(null);
            d3.selectAll('.node').classed('selected', false);
        }
    }
    editDepartmentById(deptId) {
        if (!this.ensureDocumentWritable()) return;
        if (this.departmentManager) {
            this.departmentManager.editDepartmentById(deptId);
        }   
    }
    addChildDepartmentById(deptId) {
        if (!this.ensureDocumentWritable()) return;
        if (this.departmentManager) {
            this.departmentManager.addChildDepartmentById(deptId);
        }   
    }
    duplicateDepartmentById(deptId) {
        if (!this.ensureDocumentWritable()) return;
        if (this.departmentManager) {
            this.departmentManager.duplicateDepartmentById(deptId);
        }   
    }
   deleteDepartmentById(deptId) {
        if (!this.ensureDocumentWritable()) return;
        if (this.departmentManager) {
            this.departmentManager.deleteDepartmentById(deptId);
        }   
    }
    UpdateEditDepartment(node) {
        if (!node) return;
        const d3Node = d3.select(node).datum();
        this.selectedDeptForToolbar = {
            id: d3Node.data.data.id,
            nom: d3Node.data.data.nom,
            node: node
        };
        this.updateEditToolbar(d3Node);
    }
    toggleEditMode() {
        if (!this.isEditMode && this.isDocumentReadOnly()) {
            this.showNotification(this.translate('documentReadOnly'), 'warning');
            return;
        }
        this.isEditMode = !this.isEditMode;
        const toggleBtn = document.getElementById('edit-mode-toggle');
        const toolbar = document.getElementById('edit-context-toolbar');
        const viewToolbar = document.getElementById('view-context-toolbar');
        const body = document.body;
        if (this.isEditMode) {
            body.classList.add('edit-mode-active');
            toggleBtn.classList.add('active');
            toggleBtn.querySelector('span').textContent = this.translate('exitEditMode');
            if (this.diagramme && this.diagramme.diagramme && this.diagramme.diagramme.setDragMode) {
                this.diagramme.diagramme.setDragMode(true);
            }
            if (toolbar) {
                toolbar.style.display = 'flex';
                toolbar.style.opacity = '1';
                toolbar.classList.add('visible');
            }
            if (viewToolbar) {
                viewToolbar.style.display = 'none';
            }
            this.updateEditToolbar(null);
        } else {
            body.classList.remove('edit-mode-active');
            toggleBtn.classList.remove('active');
            toggleBtn.querySelector('span').textContent = this.translate('editMode');
            if (this.diagramme && this.diagramme.diagramme && this.diagramme.diagramme.setDragMode) {
                this.diagramme.diagramme.setDragMode(false);
            }
            if (toolbar) {
                toolbar.style.display = 'none';
                toolbar.classList.remove('visible');
            }
            if (viewToolbar) {
                viewToolbar.style.display = 'flex';
            }
            this.selectedDeptForToolbar = null;
        }
        if (window.app && window.app.queryDetails) {
            window.app.queryDetails.refreshEditMode();
        }
    }
    handleDepartmentMove(sourceDeptId, targetDeptId) {
        if (!this.ensureDocumentWritable()) return;
        const sourceDept = this.xmlParser.getDepartement(sourceDeptId);
        const targetDept = this.xmlParser.getDepartement(targetDeptId);
        if (!sourceDept || !targetDept) {
            this.showNotification(this.translate('errorMovingDepartment'), 'error');
            return;
        }
        if (this.isDescendant(targetDeptId, sourceDeptId)) {
            this.showNotification(this.translate('cannotMoveIntoDescendant'), 'error');
            return;
        }
        if (sourceDept.parent === targetDeptId) {
            this.showNotification(this.translate('departmentAlreadyUnderParent'), 'info');
            return;
        }
        const success = this.xmlParser.moveDepartment(sourceDeptId, targetDeptId);
        if (success) {
            let movedWithoutRefresh = false;
            if (
                this.diagramme &&
                this.diagramme.diagramme &&
                typeof this.diagramme.diagramme.moveDepartmentNode === 'function'
            ) {
                try {
                    movedWithoutRefresh = this.diagramme.diagramme.moveDepartmentNode(sourceDeptId, targetDeptId);
                } catch (error) {
                    console.warn('moveDepartmentNode failed, fallback to refreshDiagram', error);
                    movedWithoutRefresh = false;
                }
            }
            if (!movedWithoutRefresh) {
                this.refreshDiagram();
                setTimeout(() => {
                    this.restoreSelection(sourceDeptId, sourceDept.nom);
                }, 500);
            } else {
                this.restoreSelection(sourceDeptId, sourceDept.nom);
            }
            this.triggerAutoSave();
            this.showNotification(this.translate('departmentMoved'), 'success');
        } else {
            this.showNotification(this.translate('errorMovingDepartment'), 'error');
        }
    }
    updateAfterDragDrop(sourceDeptId, targetDeptId) {
        if (this.selectedDeptForToolbar && this.selectedDeptForToolbar.id === sourceDeptId) {
            setTimeout(() => {
                if (this.diagramme && this.diagramme.diagramme) {
                    const newNode = this.diagramme.diagramme.findNodeById(
                        this.diagramme.diagramme.root,
                        sourceDeptId
                    );
                    if (newNode) {
                        this.updateEditToolbar(newNode);
                    }
                }
            }, 100);
        }
    }
    updateEditToolbar(d3Node) {
        if (!this.isEditMode) return;
        const toolbar = document.getElementById('edit-context-toolbar');
        if (!toolbar) return;
        if (d3Node) {
            const deptData = d3Node.data.data;
            const parent = d3Node.data.parent;
            this.selectedDeptForToolbar = {
                id: deptData.id,
                nom: deptData.nom,
                data: deptData,
                parent: parent,
                d3Node: d3Node,
                element: d3Node
            };
            toolbar.style.display = 'flex';
            toolbar.style.opacity = '1';
            toolbar.classList.add('visible');
            const isRootDept = parent === null || deptData.id === 'root';
            const deptSpan = document.getElementById('edit-toolbar-department');
            if (deptSpan) {
                deptSpan.textContent = deptData.nom;
            }
            ['edit', 'add', 'duplicate', 'delete', 'copy', 'cut', 'paste'].forEach(btnType => {
                const btn = document.getElementById(`edit-toolbar-${btnType}`);
                if (btn) {
                    if (btnType === 'add') {
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    } else if (btnType === 'delete' || btnType === 'cut' || btnType === 'duplicate') {
                        btn.disabled = isRootDept;
                        btn.style.opacity = isRootDept ? '0.5' : '1';
                    } else if (btnType === 'paste') {
                        btn.disabled = !this.clipboard;
                        btn.style.opacity = this.clipboard ? '1' : '0.5';
                    } else {
                        btn.disabled = false;
                        btn.style.opacity = '1';
                    }
                }
            });
        } else {
            toolbar.style.opacity = '1';
            const deptSpan = document.getElementById('edit-toolbar-department');
            if (deptSpan) {
                deptSpan.textContent = this.translate('noDepartmentSelected');
            }
            ['edit', 'add', 'duplicate', 'delete', 'copy', 'cut', 'paste'].forEach(btnType => {
                const btn = document.getElementById(`edit-toolbar-${btnType}`);
                if (btn) {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                }
            });
        }
    }
    hideEditToolbar() {
    }
    cutDepartmentById(deptId) {
        if (!this.ensureDocumentWritable()) return;
        const deptData = this.xmlParser.getDepartement(deptId);
        if (!deptData) {
            this.showNotification(this.translate('departmentNotFound'), 'error');
            return;
        }
        if (deptData.parent === null || deptId === 'root') {
            this.showNotification(this.translate('cannotCutRoot'), 'error');
            return;
        }
        this.clipboard = {
            id: deptData.id,
            nom: deptData.nom,
            type: deptData.type || 'operational',
            abbreviation: deptData.abbreviation || '',
            abbrev_details: deptData.abbrev_details || '',
            description: deptData.description || '',
            responsable: deptData.responsable || '',
            note: deptData.note || '',
            fichiers: [...(deptData.fichiers || [])],
            postes: [...(deptData.postes || [])],
            tasks: [...(deptData.tasks || [])],
            isCut: true,
            originalParentId: deptData.parent
        };
        const pasteBtn = document.getElementById('edit-toolbar-paste');
        if (pasteBtn) {
            pasteBtn.disabled = false;
            pasteBtn.style.opacity = '1';
        }
        this.showNotification(this.translate('departmentCut', { name: deptData.nom }), 'success');
    }
    copyDepartmentById(deptId) {
        const deptData = this.xmlParser.getDepartement(deptId);
        if (!deptData) {
            this.showNotification(this.translate('departmentNotFound'), 'error');
            return;
        }
        if (deptData.parent === null || deptId === 'root') {
            this.showNotification(this.translate('cannotCopyRoot'), 'error');
            return;
        }
        this.clipboard = {
            id: deptData.id,
            nom: deptData.nom,
            type: deptData.type || 'operational',
            abbreviation: deptData.abbreviation || '',
            abbrev_details: deptData.abbrev_details || '',
            description: deptData.description || '',
            responsable: deptData.responsable || '',
            note: deptData.note || '',
            fichiers: [...(deptData.fichiers || [])],
            postes: [...(deptData.postes || [])],
            tasks: [...(deptData.tasks || [])]
        };
        const pasteBtn = document.getElementById('edit-toolbar-paste');
        if (pasteBtn) {
            pasteBtn.disabled = false;
            pasteBtn.style.opacity = '1';
        }
        this.showNotification(this.translate('departmentCopied', { name: deptData.nom }), 'success');
    }
    pasteDepartment() {
        if (!this.ensureDocumentWritable()) return;
        if (!this.clipboard || !this.selectedDeptForToolbar) {
            this.showNotification(this.translate('nothingToPaste'), 'error');
            return;
        }
        const newParentId = this.selectedDeptForToolbar.id;
        const newParentDept = this.xmlParser.getDepartement(newParentId);
        if (!newParentDept) {
            this.showNotification(this.translate('parentDepartmentNotFound'), 'error');
            return;
        }
        if (this.isDescendant(newParentId, this.clipboard.id)) {
            this.showNotification(this.translate('cannotMoveIntoDescendant'), 'error');
            return;
        }
        if (this.clipboard.isCut) {
            const deptId = this.clipboard.id;
            const originalDept = this.xmlParser.getDepartement(deptId);
            if (!originalDept) {
                this.showNotification(this.translate('departmentNotFound'), 'error');
                return;
            }
            if (originalDept.parent === newParentId) {
                this.showNotification(this.translate('departmentAlreadyUnderParent'), 'info');
                this.clipboard = null;
                this.updatePasteButton();
                return;
            }
            const success = this.xmlParser.moveDepartment(deptId, newParentId);
            if (success) {
                let movedWithoutRefresh = false;
                if (
                    this.diagramme &&
                    this.diagramme.diagramme &&
                    typeof this.diagramme.diagramme.moveDepartmentNode === 'function'
                ) {
                    try {
                        movedWithoutRefresh = this.diagramme.diagramme.moveDepartmentNode(deptId, newParentId);
                    } catch (error) {
                        console.warn('moveDepartmentNode failed, fallback to refreshDiagram', error);
                        movedWithoutRefresh = false;
                    }
                }
                if (!movedWithoutRefresh) {
                    this.refreshDiagram();
                }
                this.showNotification(this.translate('moveSuccess', {
                    deptName: originalDept.nom,
                    parentName: newParentDept.nom
                }), 'success');
                this.triggerAutoSave();
                this.clipboard = null;
                this.updatePasteButton();
            } else {
                this.showNotification(this.translate('errorMovingDepartment'), 'error');
            }
        } else {
            const baseId = this.clipboard.id;
            let newId = `${baseId}-copy`;
            let counter = 1;
            while (this.xmlParser.departements.has(newId)) {
                newId = `${baseId}-copy-${counter}`;
                counter++;
            }
            const newDeptData = {
                ...this.clipboard,
                id: newId,
                nom: `${this.clipboard.nom} (${this.translate('duplicate')})`
            };
            const newDept = this.xmlParser.addDepartment(newParentId, newDeptData);
            if (!newDept) {
                this.showNotification(this.translate('errorPasting'), 'error');
                return;
            }
            let insertedWithoutRefresh = false;
            if (
                this.diagramme &&
                this.diagramme.diagramme &&
                typeof this.diagramme.diagramme.insertDepartmentNode === 'function'
            ) {
                insertedWithoutRefresh = this.diagramme.diagramme.insertDepartmentNode(newParentId, newDept.id);
            }
            if (!insertedWithoutRefresh) {
                this.refreshDiagram();
            }
            this.triggerAutoSave();
            this.showNotification(this.translate('pasteSuccess', { parentName: newParentDept.nom }), 'success');
        }
    }
    isDescendant(parentId, childId) {
        const dept = this.xmlParser.getDepartement(childId);
        if (!dept) return false;
        let currentParentId = dept.parent;
        while (currentParentId !== null) {
            if (currentParentId === parentId) {
                return true;
            }
            const parentDept = this.xmlParser.getDepartement(currentParentId);
            if (!parentDept) break;
            currentParentId = parentDept.parent;
        }
        return false;
    }
    updatePasteButton() {
        const pasteBtn = document.getElementById('edit-toolbar-paste');
        if (pasteBtn) {
            pasteBtn.disabled = !this.clipboard;
            pasteBtn.style.opacity = this.clipboard ? '1' : '0.5';
        }
    }
    refreshDiagram() {
        const currentSelection = this.selectedDeptForToolbar ? this.selectedDeptForToolbar.id : null;
        if (this.diagramme && this.diagramme.diagramme && this.diagramme.diagramme.initializeChart) {
            this.diagramme.diagramme.initializeChart();
            if (this.isEditMode && this.diagramme.diagramme.setDragMode) {
                setTimeout(() => {
                    this.diagramme.diagramme.setDragMode(true);
                }, 100);
            }
        }
        setTimeout(() => {
            if (currentSelection) {
                if (this.diagramme && typeof this.diagramme.navigateToDepartmentFromSelect === 'function') {
                    setTimeout(() => {
                        this.restoreSelection(currentSelection, "");
                    }, 800);
                }
            }
        }, 500);
        if (window.app && currentSelection) {
            window.app.queryDetails.showDepartmentDetailsId(currentSelection);
        }
    }
    toggleDetailsVisibility() {
        if (!window.app || !window.app.queryDetails) return;
        const detailsContainer = window.app.queryDetails.getContentContainer();
        const departmentDetails = detailsContainer?.querySelector('.department-details');
        const detailsPanel= document.getElementById('details-panel');
        if (detailsPanel && detailsPanel.style.display !== 'none') {
            detailsPanel.style.display = 'none';
            this.updateDetailsToggleButton(true);
            window.app.queryDetails.hideDetails();
        } else {
            detailsPanel.style.display = 'block';
            this.updateDetailsToggleButton(false);
            if (this.selectedDeptForToolbar && this.selectedDeptForToolbar.id) {
                window.app.queryDetails.showDepartmentDetailsId(this.selectedDeptForToolbar.id);
            }
        }
    }
    updateDetailsToggleButton(isHidden) {
        const button = document.getElementById('edit-toolbar-toggle-details');
        if (!button) return;
        const span = button.querySelector('span');
        const title = isHidden ? this.translate('showDetails') : this.translate('hideDetails');
        button.title = title;
        if (span) {
            span.textContent = title;
        }
    }
    updateUI() {
        const toggleBtn = document.getElementById('edit-mode-toggle');
        if (toggleBtn) {
            const span = toggleBtn.querySelector('span');
            span.textContent = this.isEditMode ?
                this.translate('exitEditMode') :
                this.translate('editMode');
        }
        const configBtn = document.getElementById('config-btn');
        if (configBtn) {
            configBtn.title = this.translate('configuration');
        }
        const fileBtn = document.getElementById('file-management-btn');
        if (fileBtn) {
            fileBtn.querySelector('span').textContent = this.translate('fileManagement');
            fileBtn.title = this.translate('fileManagement');
        }
        const toolbar = document.getElementById('edit-context-toolbar');
        if (toolbar) {
            const title = toolbar.querySelector('.edit-toolbar-title');
            if (title) {
                title.textContent = this.translate('editMode');
            }
            const buttons = [
                { id: 'edit-toolbar-edit', key: 'editDepartment' },
                { id: 'edit-toolbar-add', key: 'addDepartment' },
                { id: 'edit-toolbar-duplicate', key: 'duplicate' },
                { id: 'edit-toolbar-delete', key: 'delete' },
                { id: 'edit-toolbar-copy', key: 'copy' },
                { id: 'edit-toolbar-cut', key: 'cut' },
                { id: 'edit-toolbar-paste', key: 'paste' },
                { id: 'edit-toolbar-refresh', key: 'refresh' }
            ];
            buttons.forEach(({ id, key }) => {
                const btn = document.getElementById(id);
                if (btn) {
                    const span = btn.querySelector('span');
                    if (span) {
                        span.textContent = this.translate(key);
                    }
                    btn.title = this.translate(key);
                }
            });
            if (!this.selectedDeptForToolbar || !this.selectedDeptForToolbar.nom) {
                const deptSpan = document.getElementById('edit-toolbar-department');
                if (deptSpan) {
                    deptSpan.textContent = this.translate('noDepartmentSelected');
                }
            }
        }
        const viewToolbar = document.getElementById('view-context-toolbar');
        if (viewToolbar) {
            const title = viewToolbar.querySelector('.edit-toolbar-title');
            if (title) {
                title.textContent = this.translate('visualizationMode');
            }
            this.updateViewToolbarDepartment();
            const input = document.getElementById('view-toolbar-search');
            if (input) {
                const placeholderKeyByMode = {
                    departements: 'searchPlaceholderDepartments',
                    documents: 'searchPlaceholderDocuments',
                    taches: 'searchPlaceholderTasks'
                };
                input.placeholder = this.translate(placeholderKeyByMode[this.visualSearchMode] || 'searchPlaceholderDepartments');
                input.setAttribute('aria-label', this.translate('search'));
            }
            const searchLabel = viewToolbar.querySelector('.view-toolbar-search-label');
            if (searchLabel) {
                searchLabel.innerHTML = '<span aria-hidden="true">🔍</span>';
                searchLabel.title = this.translate('searchIn');
            }
            const scopeSelect = document.getElementById('view-toolbar-search-scope');
            if (scopeSelect) {
                scopeSelect.setAttribute('aria-label', this.translate('searchIn'));
                const opts = scopeSelect.querySelectorAll('option');
                if (opts[0]) opts[0].textContent = this.translate('searchScopeDepartments');
                if (opts[1]) opts[1].textContent = this.translate('searchScopeDocuments');
                if (opts[2]) opts[2].textContent = this.translate('searchScopeTasks');
            }
            const buttonDefs = [
                { id: 'view-toolbar-organisation', key: 'organization' },
                { id: 'view-toolbar-departements', key: 'departments' },
                { id: 'view-toolbar-documents', key: 'documents' },
                { id: 'view-toolbar-taches', key: 'tasks' }
            ];
            buttonDefs.forEach(({ id, key }) => {
                const btn = document.getElementById(id);
                if (!btn) return;
                const span = btn.querySelector('span');
                if (span) span.textContent = this.translate(key);
                btn.title = this.translate(key);
            });
        }
    }
}
