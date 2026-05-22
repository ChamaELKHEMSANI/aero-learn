class EditImportManager {
    constructor(xmlParser, editModeManager = null, mode = 'Any') {
        this.xmlParser = xmlParser;
        this.editModeManager = editModeManager;
        this.mode = this.normalizeMode(mode);
        this.workflowMode = this.mode === 'replaceGraph' ? 'replaceGraph' : 'singleImport';
        this.availableFields = {
            departements: [
                { name: 'nom', label: 'Nom', required: true },
                { name: 'id', label: 'ID', required: true },
                { name: 'type', label: 'Type', required: false },
                { name: 'abbreviation', label: 'Abreviation', required: false },
                { name: 'abbrev_details', label: 'Abbreviation details', required: false },
                { name: 'description', label: 'Description', required: false },
                { name: 'responsable', label: 'Manager', required: false },
                { name: 'note', label: 'Notes', required: false },
                { name: 'parent', label: 'Parent', required: false },
                { name: 'background_color', label: 'Background color', required: false }
            ],
            documents: [
                { name: 'nom', label: 'Nom', required: true },
                { name: 'id', label: 'ID', required: true },
                { name: 'department', label: 'Department ID', required: false },
                { name: 'category', label: 'Category', required: false },
                { name: 'document_type', label: 'Document type', required: false },
                { name: 'type', label: 'Type', required: false },
                { name: 'description', label: 'Description', required: false },
                { name: 'lien', label: 'URL link', required: false },
                { name: 'code', label: 'Code', required: false },
                { name: 'ref', label: 'Reference', required: false },
                { name: 'page_reference', label: 'Page reference', required: false },
                { name: 'reglementation', label: 'Regulation', required: false },
                { name: 'regle_code', label: 'Rule code', required: false },
                { name: 'regle_titre', label: 'Rule title', required: false },
                { name: 'regle_description', label: 'Rule description', required: false }
            ],
            tasks: [
                { name: 'nom', label: 'Nom', required: true },
                { name: 'id', label: 'ID', required: true },
                { name: 'department', label: 'Department ID', required: false },
                { name: 'categorie', label: 'Category', required: false },
                { name: 'description', label: 'Description', required: false },
                { name: 'order', label: 'Order', required: false }
            ]
        };
        this.translations = {
            fr: {
                title: 'Import CSV',
                graphTitle: 'Creer un nouveau graphe depuis des CSV',
                stepMapping: 'Etape 1 : Correspondance',
                stepPreview: 'Etape 2 : Apercu',
                stepImport: 'Etape 3 : Validation',
                selectFile: 'Selectionner un fichier CSV',
                selectFileType: 'Type de donnees',
                departements: 'Departements',
                documents: 'Documents',
                tasks: 'Taches',
                fieldMapping: 'Correspondance des champs',
                downloadTemplate: 'Telecharger le template',
                csvField: 'Champ CSV',
                appField: 'Champ application',
                mapTo: 'Correspond a',
                required: 'Requis',
                optional: 'Optionnel',
                preview: 'Apercu des donnees',
                rowsToImport: 'ligne(s) a importer',
                validRows: 'ligne(s) valides',
                invalidRows: 'ligne(s) invalides',
                import: 'Importer',
                cancel: 'Annuler',
                back: 'Retour',
                next: 'Suivant',
                skip: 'Passer',
                confirmImport: 'Confirmer l import',
                importSuccess: 'Import reussi',
                importError: 'Erreur lors de l import',
                invalidData: 'Donnees invalides',
                missingRequired: 'Champ requis manquant : {field}',
                duplicateId: 'ID deja existant : {id}',
                duplicateIdInFile: 'ID duplique dans le fichier : {id}',
                parentNotFound: 'Departement parent non trouve : {parent}',
                typeInvalid: 'Type invalide : {type}',
                fileNotSelected: 'Veuillez selectionner un fichier',
                invalidFileType: 'Format de fichier invalide. Veuillez selectionner un fichier CSV',
                parsingError: 'Erreur lors de la lecture du fichier',
                emptyFile: 'Le fichier CSV est vide',
                noDataRows: 'Le fichier CSV ne contient aucune ligne de donnees',
                noHeadersDetected: 'Impossible de detecter les en-tetes du CSV',
                noMappedColumns: 'Aucune colonne CSV n a pu etre reconnue automatiquement. Merci de faire le mapping manuellement.',
                confirmImportMessage: 'Etes-vous sur de vouloir importer {count} element(s) ?',
                validationError: 'Erreur de validation',
                importInProgress: 'Import en cours...',
                importCompleted: 'Import termine avec succes',
                importPartial: 'Import partiel : {success} succes, {errors} erreurs',
                close: 'Fermer',
                noTargetDepartment: 'Aucun departement cible specifie',
                departmentRequiredForGraph: 'Le champ department est obligatoire pour creer un nouveau graphe',
                departmentUnknownForGraph: 'Departement introuvable dans le nouveau graphe : {department}',
                graphContextHint: 'Les departements sont obligatoires. Les documents et les taches sont optionnels.',
                graphDatasetRequired: 'Obligatoire',
                graphDatasetOptional: 'Optionnel',
                graphStageReady: 'Pret',
                graphStageImported: 'Importe',
                graphStageSkipped: 'Ignore',
                graphStagePending: 'En attente',
                graphSummaryTitle: 'Resume avant remplacement',
                graphSummaryHint: 'Le graphe actuel sera remplace seulement apres validation finale.',
                graphCommit: 'Creer le graphe',
                graphCommitSuccess: 'Le nouveau graphe a ete charge avec succes',
                graphDepartmentsFirst: 'Les departements doivent etre importes avant les autres donnees',
                graphDatasetImported: '{type} importes dans le graphe temporaire',
                graphDatasetSkipped: '{type} ignores',
                graphImporting: 'Import de {type}',
                graphCountsDepartments: 'Departements',
                graphCountsDocuments: 'Documents',
                graphCountsTasks: 'Taches',
                graphFinalWarning: 'Cette action remplacera les donnees actuellement chargees.',
                departmentTypes: {
                    direction: 'Direction',
                    operational: 'Operationnel',
                    commercial: 'Commercial',
                    support: 'Support',
                    technical: 'Technique',
                    training: 'Formation',
                    compliance: 'Conformite',
                    strategic: 'Strategique',
                    economic: 'Economique',
                    organisation: 'Organisation'
                }
            },
            en: {
                title: 'CSV Import',
                graphTitle: 'Create a New Graph from CSV',
                stepMapping: 'Step 1: Mapping',
                stepPreview: 'Step 2: Preview',
                stepImport: 'Step 3: Validation',
                selectFile: 'Select CSV file',
                selectFileType: 'Data type',
                departements: 'Departments',
                documents: 'Documents',
                tasks: 'Tasks',
                fieldMapping: 'Field Mapping',
                downloadTemplate: 'Download template',
                csvField: 'CSV Field',
                appField: 'App Field',
                mapTo: 'Maps to',
                required: 'Required',
                optional: 'Optional',
                preview: 'Data Preview',
                rowsToImport: 'row(s) to import',
                validRows: 'valid row(s)',
                invalidRows: 'invalid row(s)',
                import: 'Import',
                cancel: 'Cancel',
                back: 'Back',
                next: 'Next',
                skip: 'Skip',
                confirmImport: 'Confirm Import',
                importSuccess: 'Import successful',
                importError: 'Import error',
                invalidData: 'Invalid data',
                missingRequired: 'Missing required field: {field}',
                duplicateId: 'ID already exists: {id}',
                duplicateIdInFile: 'Duplicate ID in file: {id}',
                parentNotFound: 'Parent department not found: {parent}',
                typeInvalid: 'Invalid type: {type}',
                fileNotSelected: 'Please select a file',
                invalidFileType: 'Invalid file format. Please select a CSV file',
                parsingError: 'Error reading file',
                emptyFile: 'The CSV file is empty',
                noDataRows: 'The CSV file does not contain any data rows',
                noHeadersDetected: 'Unable to detect CSV headers',
                noMappedColumns: 'No CSV columns were recognized automatically. Please map them manually.',
                confirmImportMessage: 'Are you sure you want to import {count} item(s)?',
                validationError: 'Validation error',
                importInProgress: 'Import in progress...',
                importCompleted: 'Import completed successfully',
                importPartial: 'Partial import: {success} success, {errors} errors',
                close: 'Close',
                noTargetDepartment: 'No target department specified',
                departmentRequiredForGraph: 'The department field is required to create a new graph',
                departmentUnknownForGraph: 'Department not found in the new graph: {department}',
                graphContextHint: 'Departments are required. Documents and tasks are optional.',
                graphDatasetRequired: 'Required',
                graphDatasetOptional: 'Optional',
                graphStageReady: 'Ready',
                graphStageImported: 'Imported',
                graphStageSkipped: 'Skipped',
                graphStagePending: 'Pending',
                graphSummaryTitle: 'Summary before replacement',
                graphSummaryHint: 'The current graph will only be replaced after final validation.',
                graphCommit: 'Create graph',
                graphCommitSuccess: 'The new graph has been loaded successfully',
                graphDepartmentsFirst: 'Departments must be imported before the other data',
                graphDatasetImported: '{type} imported into the temporary graph',
                graphDatasetSkipped: '{type} skipped',
                graphImporting: 'Importing {type}',
                graphCountsDepartments: 'Departments',
                graphCountsDocuments: 'Documents',
                graphCountsTasks: 'Tasks',
                graphFinalWarning: 'This action will replace the currently loaded data.',
                departmentTypes: {
                    direction: 'Direction',
                    operational: 'Operational',
                    commercial: 'Commercial',
                    support: 'Support',
                    technical: 'Technical',
                    training: 'Training',
                    compliance: 'Compliance',
                    strategic: 'Strategic',
                    economic: 'Economic',
                    organisation: 'Organisation'
                }
            }
        };
        this.lng = 'en';
        this.modal = null;
        this.currentStep = 1;
        this.currentFileType = this.getInitialFileType();
        this.fieldMapping = {};
        this.previewData = [];
        this.originalHeaders = [];
        this.validRows = [];
        this.invalidRows = [];
        this.importResults = [];
        this.currentFileName = '';
        this.graphDatasets = [
            { type: 'departements', required: true },
            { type: 'documents', required: false },
            { type: 'tasks', required: false }
        ];
        this.currentDatasetIndex = 0;
        this.graphDatasetResults = [];
        this.finalGraphReview = false;
        this.stagingParser = this.isReplaceGraphMode() ? this.createShadowParser() : null;
        this.init();
    }
    setLang(lng) {
        this.lng = lng;
        this.updateModalTranslations();
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations.en[key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
        });
        return text;
    }
    getTranslatedType(type) {
        const types = this.translations[this.lng]?.departmentTypes || this.translations.en.departmentTypes;
        return types[type] || type;
    }
    normalizeMode(mode) {
        const normalized = String(mode || 'Any').toLowerCase();
        if (normalized === 'replacegraph' || normalized === 'newgraph' || normalized === 'graph') return 'replaceGraph';
        if (normalized === 'departement' || normalized === 'department') return 'departements';
        if (normalized === 'document') return 'documents';
        if (normalized === 'task') return 'tasks';
        if (normalized === 'departements' || normalized === 'documents' || normalized === 'tasks') return normalized;
        return 'Any';
    }
    isReplaceGraphMode() {
        return this.workflowMode === 'replaceGraph';
    }
    isImportTypeLocked() {
        return !this.isReplaceGraphMode() && this.mode !== 'Any';
    }
    getInitialFileType() {
        if (this.isReplaceGraphMode()) return 'departements';
        return this.isImportTypeLocked() ? this.mode : null;
    }
    getAvailableImportTypes() {
        return this.isImportTypeLocked() ? [this.mode] : ['departements', 'documents', 'tasks'];
    }
    renderImportTypeOptions() {
        return this.getAvailableImportTypes().map(type => `<option value="${type}">${this.translate(type)}</option>`).join('');
    }
    getCurrentDatasetConfig() {
        return this.isReplaceGraphMode() ? (this.graphDatasets[this.currentDatasetIndex] || null) : null;
    }
    getCurrentDatasetType() {
        return this.isReplaceGraphMode() ? (this.getCurrentDatasetConfig()?.type || 'departements') : this.currentFileType;
    }
    createShadowParser() {
        const parser = Object.create(XMLParser.prototype);
        parser.lng = this.xmlParser?.lng || this.lng || 'en';
        parser.xml_data = '';
        parser.data = { nodes: [], links: [] };
        parser.blExternal = false;
        parser.blEncode = false;
        parser.departements = new Map();
        parser.xmlText = '';
        parser.xmlDoc = null;
        parser.documentsMap = new Map();
        parser.tasksMap = new Map();
        parser.postesMap = new Map();
        parser.departementElements = new Map();
        return parser;
    }
    init() {
        this.injectStyles();
        this.createModal();
    }
    injectStyles() {
        if (document.getElementById('csv-importer-styles')) return;
        const link = document.createElement('link');
        link.id = 'csv-importer-styles';
        link.rel = 'stylesheet';
        link.href = 'css/edit-import.css';
        document.head.appendChild(link);
    }
    createModal() {
        const existingModal = document.getElementById('csv-importer-modal');
        if (existingModal) existingModal.remove();
        const importTypeDisabled = this.isImportTypeLocked() || this.isReplaceGraphMode() ? ' disabled' : '';
        const typeGroupStyle = this.isReplaceGraphMode() ? ' style="display: none;"' : '';
        const skipButtonStyle = this.canSkipCurrentDataset() ? '' : ' style="display: none;"';
        this.modal = document.createElement('div');
        this.modal.id = 'csv-importer-modal';
        this.modal.className = 'csv-importer-modal';
        this.modal.innerHTML = `
            <div class="csv-importer-content">
                <div class="csv-importer-header">
                    <h2>${this.isReplaceGraphMode() ? this.translate('graphTitle') : this.translate('title')}</h2>
                    <button class="csv-importer-close" id="csv-importer-close">&times;</button>
                </div>
                <div class="csv-importer-steps">
                    <div class="step active" data-step="1">${this.translate('stepMapping')}</div>
                    <div class="step" data-step="2">${this.translate('stepPreview')}</div>
                    <div class="step" data-step="3">${this.translate('stepImport')}</div>
                </div>
                <div class="csv-importer-body" id="csv-importer-body">
                    <div class="step-content" id="step1-content">
                        <div id="csv-importer-context" class="csv-importer-context"></div>
                        <div class="form-group" id="csv-import-type-group"${typeGroupStyle}>
                            <label class="required">${this.translate('selectFileType')}</label>
                            <select id="import-type" class="csv-select"${importTypeDisabled}>
                                ${this.renderImportTypeOptions()}
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="required">${this.translate('selectFile')}</label>
                            <input type="file" id="csv-file-input" accept=".csv,.CSV" class="csv-file-input">
                            <div id="file-info" class="file-info"></div>
                            <button type="button" class="btn-secondary csv-template-btn" id="csv-download-template">${this.translate('downloadTemplate')}</button>
                        </div>
                        <div id="field-mapping-container" class="field-mapping-container" style="display: none;">
                            <h3>${this.translate('fieldMapping')}</h3>
                            <div id="field-mapping-table" class="field-mapping-table"></div>
                        </div>
                    </div>
                    <div class="step-content" id="step2-content" style="display: none;">
                        <div id="preview-stats"></div>
                        <div id="preview-table-container" class="preview-table-container"></div>
                    </div>
                    <div class="step-content" id="step3-content" style="display: none;">
                        <div id="import-confirm"></div>
                        <div id="import-progress" style="display: none;">
                            <div class="progress-bar">
                                <div class="progress-fill"></div>
                            </div>
                            <div class="progress-text"></div>
                        </div>
                    </div>
                </div>
                <div class="csv-importer-footer">
                    <button class="btn-secondary" id="csv-importer-back" style="display: none;">${this.translate('back')}</button>
                    <button class="btn-secondary" id="csv-importer-skip"${skipButtonStyle}>${this.translate('skip')}</button>
                    <button class="btn-secondary" id="csv-importer-cancel">${this.translate('cancel')}</button>
                    <button class="btn-primary" id="csv-importer-next">${this.translate('next')}</button>
                    <button class="btn-primary" id="csv-importer-import" style="display: none;">${this.translate('import')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
        this.attachEvents();
        this.syncImportTypeSelector();
        this.updateContextPanel();
        this.updateFooterButtons();
    }
    attachEvents() {
        const closeBtn = document.getElementById('csv-importer-close');
        const cancelBtn = document.getElementById('csv-importer-cancel');
        const nextBtn = document.getElementById('csv-importer-next');
        const backBtn = document.getElementById('csv-importer-back');
        const importBtn = document.getElementById('csv-importer-import');
        const skipBtn = document.getElementById('csv-importer-skip');
        const templateBtn = document.getElementById('csv-download-template');
        const typeSelect = document.getElementById('import-type');
        const fileInput = document.getElementById('csv-file-input');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.close());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
        if (backBtn) backBtn.addEventListener('click', () => this.prevStep());
        if (importBtn) importBtn.addEventListener('click', () => this.executeImport());
        if (skipBtn) skipBtn.addEventListener('click', () => this.skipCurrentDataset());
        if (templateBtn) templateBtn.addEventListener('click', () => this.downloadTemplate());
        if (typeSelect) {
            typeSelect.addEventListener('change', e => {
                this.currentFileType = e.target.value;
                this.resetDatasetState();
            });
        }
        if (fileInput) {
            fileInput.addEventListener('change', e => this.handleFileSelect(e.target.files[0]));
        }
        document.querySelectorAll('.csv-importer-steps .step').forEach((step, index) => {
            step.addEventListener('click', () => {
                if (this.finalGraphReview) return;
                if (index + 1 < this.currentStep || (index + 1 === this.currentStep + 1 && this.validateCurrentStep())) {
                    this.currentStep = index + 1;
                    this.updateStepDisplay();
                    if (this.currentStep === 2) this.displayPreview();
                    if (this.currentStep === 3) this.displayImportConfirmation();
                }
            });
        });
        this.modal.addEventListener('click', e => {
            if (e.target === this.modal) this.close();
        });
    }
    updateModalTranslations() {
        if (!this.modal) return;
        const title = this.modal.querySelector('.csv-importer-header h2');
        if (title) title.textContent = this.isReplaceGraphMode() ? this.translate('graphTitle') : this.translate('title');
        const steps = this.modal.querySelectorAll('.csv-importer-steps .step');
        [this.translate('stepMapping'), this.translate('stepPreview'), this.translate('stepImport')].forEach((text, index) => {
            if (steps[index]) steps[index].textContent = text;
        });
        const fieldMappingTitle = this.modal.querySelector('.field-mapping-container h3');
        if (fieldMappingTitle) fieldMappingTitle.textContent = this.translate('fieldMapping');
        const backBtn = document.getElementById('csv-importer-back');
        const cancelBtn = document.getElementById('csv-importer-cancel');
        const nextBtn = document.getElementById('csv-importer-next');
        const importBtn = document.getElementById('csv-importer-import');
        const skipBtn = document.getElementById('csv-importer-skip');
        const templateBtn = document.getElementById('csv-download-template');
        if (backBtn) backBtn.textContent = this.translate('back');
        if (cancelBtn) cancelBtn.textContent = this.translate('cancel');
        if (nextBtn) nextBtn.textContent = this.translate('next');
        if (skipBtn) skipBtn.textContent = this.translate('skip');
        if (templateBtn) templateBtn.textContent = this.translate('downloadTemplate');
        if (importBtn) importBtn.textContent = this.finalGraphReview ? this.translate('graphCommit') : this.translate('import');
        this.syncImportTypeSelector();
        this.updateContextPanel();
        this.updateFooterButtons();
    }
    syncImportTypeSelector() {
        const typeSelect = document.getElementById('import-type');
        if (!typeSelect || this.isReplaceGraphMode()) return;
        const currentValue = this.getCurrentDatasetType() || this.getInitialFileType() || 'departements';
        typeSelect.innerHTML = this.renderImportTypeOptions();
        typeSelect.disabled = this.isImportTypeLocked();
        typeSelect.value = currentValue;
    }
    updateContextPanel() {
        const context = document.getElementById('csv-importer-context');
        if (!context) return;
        if (!this.isReplaceGraphMode()) {
            context.innerHTML = '';
            context.style.display = 'none';
            return;
        }
        context.style.display = 'block';
        const title = this.finalGraphReview
            ? this.translate('graphSummaryTitle')
            : this.translate('graphImporting', { type: this.translate(this.getCurrentDatasetType()) });
        const pills = this.graphDatasets.map((dataset, index) => {
            const result = this.graphDatasetResults[index];
            const statusKey = result
                ? (result.skipped ? 'graphStageSkipped' : 'graphStageImported')
                : (index === this.currentDatasetIndex && !this.finalGraphReview ? 'graphStageReady' : 'graphStagePending');
            return `
                <div class="csv-importer-dataset-pill ${index === this.currentDatasetIndex && !this.finalGraphReview ? 'active' : ''}">
                    <strong>${this.translate(dataset.type)}</strong>
                    <span>${this.translate(dataset.required ? 'graphDatasetRequired' : 'graphDatasetOptional')}</span>
                    <em>${this.translate(statusKey)}</em>
                </div>
            `;
        }).join('');
        context.innerHTML = `
            <div class="csv-importer-context-card">
                <div class="csv-importer-context-copy">
                    <h3>${title}</h3>
                    <p>${this.finalGraphReview ? this.translate('graphSummaryHint') : this.translate('graphContextHint')}</p>
                </div>
                <div class="csv-importer-context-status">${pills}</div>
            </div>
        `;
    }
    updateFooterButtons() {
        const skipBtn = document.getElementById('csv-importer-skip');
        const importBtn = document.getElementById('csv-importer-import');
        const templateBtn = document.getElementById('csv-download-template');
        if (skipBtn) {
            skipBtn.style.display = this.canSkipCurrentDataset() && this.currentStep === 1 && !this.finalGraphReview ? 'inline-block' : 'none';
        }
        if (importBtn) {
            importBtn.textContent = this.finalGraphReview ? this.translate('graphCommit') : this.translate('import');
        }
        if (templateBtn) {
            templateBtn.textContent = this.translate('downloadTemplate');
        }
    }
    open() {
        this.reset();
        this.modal.classList.add('active');
        this.currentStep = 1;
        this.updateStepDisplay();
    }
    close() {
        this.modal.classList.remove('active');
        this.reset();
    }
    reset() {
        this.currentStep = 1;
        this.finalGraphReview = false;
        this.importResults = [];
        if (this.isReplaceGraphMode()) {
            this.currentDatasetIndex = 0;
            this.graphDatasetResults = [];
            this.stagingParser = this.createShadowParser();
            this.currentFileType = 'departements';
        } else {
            this.currentFileType = this.getInitialFileType();
        }
        this.resetDatasetState();
        this.updateContextPanel();
        this.updateStepDisplay();
    }
    resetDatasetState() {
        this.fieldMapping = {};
        this.previewData = [];
        this.originalHeaders = [];
        this.validRows = [];
        this.invalidRows = [];
        this.currentFileName = '';
        const fileInput = document.getElementById('csv-file-input');
        if (fileInput) fileInput.value = '';
        const fieldMappingContainer = document.getElementById('field-mapping-container');
        if (fieldMappingContainer) fieldMappingContainer.style.display = 'none';
        const fileInfo = document.getElementById('file-info');
        if (fileInfo) {
            fileInfo.innerHTML = '';
            fileInfo.className = 'file-info';
        }
        ['preview-stats', 'preview-table-container', 'import-confirm'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = '';
        });
        const progressContainer = document.getElementById('import-progress');
        if (progressContainer) progressContainer.style.display = 'none';
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) progressFill.style.width = '0%';
        const progressText = document.querySelector('.progress-text');
        if (progressText) progressText.textContent = '';
        this.updateFooterButtons();
    }
    canSkipCurrentDataset() {
        return this.isReplaceGraphMode() && this.getCurrentDatasetConfig() && !this.getCurrentDatasetConfig().required;
    }
    updateStepDisplay() {
        document.querySelectorAll('.csv-importer-steps .step').forEach((step, index) => {
            step.classList.toggle('active', index + 1 === this.currentStep);
        });
        const step1 = document.getElementById('step1-content');
        const step2 = document.getElementById('step2-content');
        const step3 = document.getElementById('step3-content');
        const backBtn = document.getElementById('csv-importer-back');
        const nextBtn = document.getElementById('csv-importer-next');
        const importBtn = document.getElementById('csv-importer-import');
        if (step1) step1.style.display = this.currentStep === 1 ? 'block' : 'none';
        if (step2) step2.style.display = this.currentStep === 2 ? 'block' : 'none';
        if (step3) step3.style.display = this.currentStep === 3 ? 'block' : 'none';
        if (backBtn) backBtn.style.display = this.currentStep > 1 ? 'inline-block' : 'none';
        if (nextBtn) nextBtn.style.display = this.currentStep < 3 ? 'inline-block' : 'none';
        if (importBtn) importBtn.style.display = this.currentStep === 3 ? 'inline-block' : 'none';
        this.updateFooterButtons();
    }
    validateCurrentStep() {
        if (this.finalGraphReview || this.currentStep !== 1) return true;
        if (!this.getCurrentDatasetType()) {
            this.showError(this.translate('fileNotSelected'));
            return false;
        }
        if (Object.keys(this.fieldMapping).length === 0) {
            this.showError(this.translate('invalidData'));
            return false;
        }
        const requiredFields = this.getRequiredFieldsForCurrentType();
        const mappedRequired = requiredFields.filter(field => Object.values(this.fieldMapping).includes(field.name));
        if (mappedRequired.length !== requiredFields.length) {
            const missingField = requiredFields.find(field => !Object.values(this.fieldMapping).includes(field.name));
            this.showError(this.translate('missingRequired', { field: missingField?.label || missingField?.name || '' }));
            return false;
        }
        return true;
    }
    getRequiredFieldsForCurrentType() {
        const fields = this.availableFields[this.getCurrentDatasetType()] || [];
        const requiredFields = fields.filter(field => field.required).map(field => ({ ...field }));
        if (this.isReplaceGraphMode() && (this.getCurrentDatasetType() === 'documents' || this.getCurrentDatasetType() === 'tasks')) {
            const departmentField = fields.find(field => field.name === 'department');
            if (departmentField && !requiredFields.some(field => field.name === 'department')) {
                requiredFields.push({ ...departmentField, required: true });
            }
        }
        return requiredFields;
    }
    nextStep() {
        if (!this.validateCurrentStep() || this.currentStep >= 3) return;
        if (this.currentStep === 1 && this.previewData.length > 0) this.validateData();
        this.currentStep++;
        this.updateStepDisplay();
        if (this.currentStep === 2) this.displayPreview();
        if (this.currentStep === 3) this.displayImportConfirmation();
    }
    prevStep() {
        if (this.currentStep <= 1) return;
        this.currentStep--;
        this.updateStepDisplay();
    }
    skipCurrentDataset() {
        if (!this.canSkipCurrentDataset()) return;
        const dataset = this.getCurrentDatasetConfig();
        this.graphDatasetResults.push({ type: dataset.type, skipped: true, imported: 0, errors: 0 });
        this.showNotification(this.translate('graphDatasetSkipped', { type: this.translate(dataset.type) }), 'info');
        this.advanceReplaceGraphDataset();
    }
}
Object.assign(EditImportManager.prototype, {
    async handleFileSelect(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.csv')) {
            this.showError(this.translate('invalidFileType'));
            return;
        }
        const fileInfo = document.getElementById('file-info');
        if (fileInfo) {
            fileInfo.innerHTML = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            fileInfo.className = 'file-info success';
        }
        this.currentFileName = file.name;
        try {
            const text = await this.readFile(file);
            if (!text || !String(text).trim()) {
                this.showError(this.translate('emptyFile'));
                return;
            }
            const lines = this.parseCSV(text);
            if (!lines.length) {
                this.showError(this.translate('emptyFile'));
                return;
            }
            this.originalHeaders = lines[0].map(header => String(header || '').trim());
            if (!this.originalHeaders.length || this.originalHeaders.every(header => !header)) {
                this.showError(this.translate('noHeadersDetected'));
                return;
            }
            this.previewData = lines.slice(1).filter(row => row.some(cell => String(cell || '').trim() !== ''));
            if (!this.previewData.length) {
                this.showError(this.translate('noDataRows'));
                return;
            }
            this.fieldMapping = this.guessFieldMapping(this.originalHeaders, this.getCurrentDatasetType());
            this.displayFieldMapping();
            if (Object.keys(this.fieldMapping).length === 0) {
                this.showNotification(this.translate('noMappedColumns'), 'warning');
            }
        } catch (error) {
            console.error('Error reading file:', error);
            this.showError(this.translate('parsingError'));
        }
    },
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file, 'UTF-8');
        });
    },
    parseCSV(text) {
        const lines = [];
        let currentLine = '';
        let inQuotes = false;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') {
                inQuotes = !inQuotes;
                currentLine += char;
            } else if (char === '\n' && !inQuotes) {
                lines.push(currentLine.replace(/\r$/, ''));
                currentLine = '';
            } else {
                currentLine += char;
            }
        }
        if (currentLine) lines.push(currentLine.replace(/\r$/, ''));
        return lines.map(line => {
            const result = [];
            let cell = '';
            let inQuotesCell = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    if (line[i + 1] === '"' && inQuotesCell) {
                        cell += '"';
                        i++;
                    } else {
                        inQuotesCell = !inQuotesCell;
                    }
                } else if (char === ';' && !inQuotesCell) {
                    result.push(cell);
                    cell = '';
                } else {
                    cell += char;
                }
            }
            result.push(cell);
            return result.map(item => String(item || '').trim());
        });
    },
    getTemplateHeaders(type) {
        return (this.availableFields[type] || []).map(field => field.name);
    },
    getTemplateRows(type) {
        if (type === 'departements') {
            return [
                ['Direction generale', 'dir-gen', 'direction', 'DG', 'Direction generale', 'Pilotage global', 'Mme Martin', '', '', '#dbeafe'],
                ['Exploitation', 'exploitation', 'operational', 'EXP', 'Operations', 'Gestion des operations', 'M. Karim', '', 'dir-gen', '#dcfce7']
            ];
        }
        if (type === 'documents') {
            return [
                ['Manuel operations', 'doc-ops-001', 'exploitation', 'document', 'manuel', 'Document de reference operations', 'https://example.com/doc.pdf', 'OPS-001', 'REF-OPS', '12', '', '', '', ''],
                ['Reglement piste', 'doc-reg-001', 'exploitation', 'regulation', 'regulation', 'Reglement associe', '', 'REG-001', 'REG-REF', '4', 'Reglement piste', 'RP-01', 'Reglement piste', 'Description du reglement']
            ];
        }
        if (type === 'tasks') {
            return [
                ['Inspection journaliere', 'task-001', 'exploitation', 'operational', 'Inspection de debut de service', '1'],
                ['Controle documentaire', 'task-002', 'exploitation', 'administrative', 'Verification des documents associes', '2']
            ];
        }
        return [];
    },
    downloadTemplate() {
        const type = this.getCurrentDatasetType();
        const headers = this.getTemplateHeaders(type);
        const rows = this.getTemplateRows(type);
        const csvContent = [
            headers.join(';'),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
        ].join('\n');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}_template.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    guessFieldMapping(headers, type) {
        const fields = this.availableFields[type] || [];
        const fieldNames = new Map(fields.map(field => [field.name.toLowerCase(), field.name]));
        const aliases = {
            nom: 'nom',
            name: 'nom',
            id: 'id',
            type: 'type',
            category: 'category',
            categorie: 'categorie',
            department: 'department',
            departmentid: 'department',
            departement: 'department',
            parent: 'parent',
            code: 'code',
            ref: 'ref',
            reference: 'ref',
            lien: 'lien',
            link: 'lien',
            pagereference: 'page_reference',
            page_reference: 'page_reference',
            documenttype: 'document_type',
            document_type: 'document_type',
            description: 'description',
            order: 'order',
            responsable: 'responsable',
            manager: 'responsable',
            note: 'note',
            backgroundcolor: 'background_color',
            background_color: 'background_color',
            abbreviation: 'abbreviation',
            abbrevdetails: 'abbrev_details',
            abbrev_details: 'abbrev_details'
        };
        return headers.reduce((mapping, header) => {
            const normalized = String(header || '').toLowerCase().replace(/[^a-z0-9_]/g, '');
            const exact = fieldNames.get(normalized);
            const alias = aliases[normalized];
            const mapped = exact || alias;
            if (mapped && fields.some(field => field.name === mapped)) {
                mapping[header] = mapped;
            }
            return mapping;
        }, {});
    },
    displayFieldMapping() {
        const container = document.getElementById('field-mapping-container');
        const tableContainer = document.getElementById('field-mapping-table');
        if (!container || !tableContainer) return;
        const currentType = this.getCurrentDatasetType();
        const fields = this.availableFields[currentType] || [];
        let html = `
            <div class="field-mapping-header">
                <div class="csv-field">${this.translate('csvField')}</div>
                <div class="app-field">${this.translate('appField')}</div>
            </div>
        `;
        this.originalHeaders.forEach(header => {
            const cleanHeader = header.replace(/^["']|["']$/g, '').trim();
            const existingMapping = this.fieldMapping[cleanHeader] || '';
            const selectedField = fields.find(field => field.name === existingMapping);
            html += `
                <div class="field-mapping-row">
                    <div class="csv-field">${this.escapeHtml(cleanHeader)}</div>
                    <div class="app-field">
                        <select data-csv-field="${this.escapeHtml(cleanHeader)}">
                            <option value="">-- ${this.translate('mapTo')} --</option>
                            ${fields.map(field => `
                                <option value="${field.name}" ${existingMapping === field.name ? 'selected' : ''}>
                                    ${field.label} ${field.required ? `(${this.translate('required')})` : `(${this.translate('optional')})`}
                                </option>
                            `).join('')}
                        </select>
                        ${selectedField ? `<span class="${selectedField.required ? 'required-badge' : 'optional-badge'}">${this.translate(selectedField.required ? 'required' : 'optional')}</span>` : ''}
                    </div>
                </div>
            `;
        });
        tableContainer.innerHTML = html;
        container.style.display = 'block';
        tableContainer.querySelectorAll('select').forEach(select => {
            select.addEventListener('change', () => {
                const csvField = select.getAttribute('data-csv-field');
                if (select.value) {
                    this.fieldMapping[csvField] = select.value;
                } else {
                    delete this.fieldMapping[csvField];
                }
                this.displayFieldMapping();
            });
        });
    },
    mapRowToData(row) {
        const mappedData = {};
        Object.keys(this.fieldMapping).forEach(csvField => {
            const appField = this.fieldMapping[csvField];
            const columnIndex = this.originalHeaders.indexOf(csvField);
            mappedData[appField] = String((columnIndex >= 0 ? row[columnIndex] : '') || '').trim();
        });
        return mappedData;
    },
    buildKnownDepartmentIdsForValidation() {
        const ids = new Set();
        const targetParser = this.getValidationTargetParser();
        if (targetParser?.departements) {
            targetParser.departements.forEach((_, id) => ids.add(id));
        }
        if (this.getCurrentDatasetType() === 'departements') {
            this.previewData.forEach(row => {
                const rowData = this.mapRowToData(row);
                if (rowData.id) ids.add(rowData.id);
            });
        }
        return ids;
    },
    getValidationTargetParser() {
        return this.isReplaceGraphMode() ? this.stagingParser : this.xmlParser;
    },
    validateData() {
        this.validRows = [];
        this.invalidRows = [];
        const currentType = this.getCurrentDatasetType();
        const targetParser = this.getValidationTargetParser();
        const allKnownDepartmentIds = this.buildKnownDepartmentIdsForValidation();
        const duplicateIdsInFile = new Set();
        const seenIds = new Set();
        this.previewData.forEach(row => {
            const rowData = this.mapRowToData(row);
            const rowId = String(rowData.id || '').trim();
            if (rowId) {
                if (seenIds.has(rowId)) duplicateIdsInFile.add(rowId);
                seenIds.add(rowId);
            }
        });
        this.previewData.forEach((row, index) => {
            const errors = [];
            const mappedData = { ...this.mapRowToData(row), _originalRow: row, _rowIndex: index + 2 };
            this.getRequiredFieldsForCurrentType().forEach(field => {
                const value = mappedData[field.name];
                if (!value || String(value).trim() === '') {
                    errors.push(this.translate('missingRequired', { field: field.label || field.name }));
                }
            });
            const rowId = String(mappedData.id || '').trim();
            if (rowId && duplicateIdsInFile.has(rowId)) {
                errors.push(this.translate('duplicateIdInFile', { id: rowId }));
            }
            if (currentType === 'departements') {
                if (rowId && targetParser.departements.has(rowId)) {
                    errors.push(this.translate('duplicateId', { id: rowId }));
                }
                const parentId = String(mappedData.parent || '').trim();
                if (parentId && parentId !== 'root' && !allKnownDepartmentIds.has(parentId)) {
                    errors.push(this.translate('parentNotFound', { parent: parentId }));
                }
            }
            if (currentType === 'documents') {
                if (rowId && targetParser.documentsMap.has(rowId)) {
                    errors.push(this.translate('duplicateId', { id: rowId }));
                }
                if (this.isReplaceGraphMode()) {
                    const departmentId = String(mappedData.department || '').trim();
                    if (!departmentId) {
                        errors.push(this.translate('departmentRequiredForGraph'));
                    } else if (!targetParser.departements.has(departmentId)) {
                        errors.push(this.translate('departmentUnknownForGraph', { department: departmentId }));
                    }
                }
            }
            if (currentType === 'tasks') {
                if (rowId && targetParser.tasksMap.has(rowId)) {
                    errors.push(this.translate('duplicateId', { id: rowId }));
                }
                if (this.isReplaceGraphMode()) {
                    const departmentId = String(mappedData.department || '').trim();
                    if (!departmentId) {
                        errors.push(this.translate('departmentRequiredForGraph'));
                    } else if (!targetParser.departements.has(departmentId)) {
                        errors.push(this.translate('departmentUnknownForGraph', { department: departmentId }));
                    }
                }
            }
            if (errors.length > 0) {
                this.invalidRows.push({ data: mappedData, errors });
            } else {
                this.validRows.push(mappedData);
            }
        });
    },
    displayPreview() {
        const statsContainer = document.getElementById('preview-stats');
        const tableContainer = document.getElementById('preview-table-container');
        if (!statsContainer || !tableContainer) return;
        statsContainer.innerHTML = `
            <div class="preview-stats">
                <div class="stat-card"><div class="stat-number">${this.previewData.length}</div><div class="stat-label">${this.translate('rowsToImport')}</div></div>
                <div class="stat-card"><div class="stat-number valid">${this.validRows.length}</div><div class="stat-label">${this.translate('validRows')}</div></div>
                <div class="stat-card"><div class="stat-number invalid">${this.invalidRows.length}</div><div class="stat-label">${this.translate('invalidRows')}</div></div>
            </div>
        `;
        const allFields = Object.keys(this.fieldMapping).map(csvField => ({
            appField: this.fieldMapping[csvField],
            label: this.getFieldLabel(this.fieldMapping[csvField])
        }));
        let tableHtml = '<table class="preview-table"><thead><tr><th>#</th>';
        allFields.forEach(field => {
            tableHtml += `<th>${this.escapeHtml(field.label || field.appField)}</th>`;
        });
        tableHtml += '<th>Validation</th></tr></thead><tbody>';
        this.validRows.forEach(row => {
            tableHtml += `<tr><td>${row._rowIndex}</td>`;
            allFields.forEach(field => {
                const value = row[field.appField] || '';
                tableHtml += `<td title="${this.escapeHtml(value)}">${this.truncateText(this.escapeHtml(value), 50)}</td>`;
            });
            tableHtml += '<td>OK</td></tr>';
        });
        this.invalidRows.forEach(item => {
            tableHtml += `<tr class="invalid"><td>${item.data._rowIndex}</td>`;
            allFields.forEach(field => {
                const value = item.data[field.appField] || '';
                tableHtml += `<td title="${this.escapeHtml(value)}">${this.truncateText(this.escapeHtml(value), 50)}</td>`;
            });
            tableHtml += `<td class="validation-error-cell">${item.errors.map(error => this.escapeHtml(error)).join('<br>')}</td></tr>`;
        });
        tableHtml += '</tbody></table>';
        tableContainer.innerHTML = tableHtml;
    },
    getFieldLabel(fieldName) {
        const fieldDef = (this.availableFields[this.getCurrentDatasetType()] || []).find(field => field.name === fieldName);
        return fieldDef ? fieldDef.label : fieldName;
    },
    displayImportConfirmation() {
        const container = document.getElementById('import-confirm');
        if (!container) return;
        if (this.finalGraphReview) {
            container.innerHTML = this.renderGraphSummaryMarkup();
            return;
        }
        container.innerHTML = `
            <div class="import-confirm">
                <h4>${this.translate('confirmImport')}</h4>
                <div class="summary">
                    <div class="summary-item"><div class="summary-number">${this.validRows.length}</div><div class="summary-label">${this.translate('validRows')}</div></div>
                    ${this.invalidRows.length > 0 ? `<div class="summary-item"><div class="summary-number invalid">${this.invalidRows.length}</div><div class="summary-label">${this.translate('invalidRows')}</div></div>` : ''}
                </div>
                <p>${this.translate('confirmImportMessage', { count: this.validRows.length })}</p>
                ${this.isReplaceGraphMode() ? `<p>${this.translate('graphImporting', { type: this.translate(this.getCurrentDatasetType()) })}</p>` : ''}
            </div>
        `;
    },
    renderGraphSummaryMarkup() {
        const counts = {
            departements: this.stagingParser.departements.size,
            documents: this.stagingParser.documentsMap.size,
            tasks: this.stagingParser.tasksMap.size
        };
        const datasetRows = this.graphDatasets.map((dataset, index) => {
            const result = this.graphDatasetResults[index];
            const statusKey = result?.skipped ? 'graphStageSkipped' : result ? 'graphStageImported' : 'graphStagePending';
            const count = result?.imported || 0;
            return `<div class="summary-item"><div class="summary-number">${count}</div><div class="summary-label">${this.translate(dataset.type)} - ${this.translate(statusKey)}</div></div>`;
        }).join('');
        return `
            <div class="import-confirm">
                <h4>${this.translate('graphSummaryTitle')}</h4>
                <p>${this.translate('graphSummaryHint')}</p>
                <div class="summary">
                    <div class="summary-item"><div class="summary-number">${counts.departements}</div><div class="summary-label">${this.translate('graphCountsDepartments')}</div></div>
                    <div class="summary-item"><div class="summary-number">${counts.documents}</div><div class="summary-label">${this.translate('graphCountsDocuments')}</div></div>
                    <div class="summary-item"><div class="summary-number">${counts.tasks}</div><div class="summary-label">${this.translate('graphCountsTasks')}</div></div>
                </div>
                <div class="summary csv-importer-summary-grid">${datasetRows}</div>
                <p class="validation-warning">${this.translate('graphFinalWarning')}</p>
            </div>
        `;
    }
});
Object.assign(EditImportManager.prototype, {
    async executeImport() {
        if (this.finalGraphReview) {
            this.commitReplaceGraph();
            return;
        }
        if (this.validRows.length === 0) {
            this.showError(this.translate('invalidData'));
            return;
        }
        const confirmMessage = document.getElementById('import-confirm');
        if (confirmMessage) confirmMessage.style.display = 'none';
        const progressContainer = document.getElementById('import-progress');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        if (progressContainer) progressContainer.style.display = 'block';
        if (progressText) progressText.textContent = this.translate('importInProgress');
        const targetParser = this.isReplaceGraphMode() ? this.stagingParser : this.xmlParser;
        this.importResults = [];
        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < this.validRows.length; i++) {
            const row = this.validRows[i];
            const progress = ((i + 1) / this.validRows.length) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${this.translate('importInProgress')} (${i + 1}/${this.validRows.length})`;
            try {
                let result = null;
                switch (this.getCurrentDatasetType()) {
                    case 'departements':
                        result = this.importDepartment(row, targetParser);
                        break;
                    case 'documents':
                        result = this.importDocument(row, targetParser);
                        break;
                    case 'tasks':
                        result = this.importTask(row, targetParser);
                        break;
                }
                if (result) {
                    successCount++;
                    this.importResults.push({ success: true, data: row });
                } else {
                    errorCount++;
                    this.importResults.push({ success: false, data: row, error: 'Import failed' });
                }
            } catch (error) {
                errorCount++;
                this.importResults.push({ success: false, data: row, error: error.message });
            }
        }
        if (progressFill) progressFill.style.width = '100%';
        if (progressText) {
            progressText.textContent = errorCount === 0
                ? this.translate('importCompleted')
                : this.translate('importPartial', { success: successCount, errors: errorCount });
        }
        if (this.isReplaceGraphMode()) {
            this.graphDatasetResults.push({
                type: this.getCurrentDatasetType(),
                skipped: false,
                imported: successCount,
                errors: errorCount
            });
            this.showNotification(
                errorCount === 0
                    ? this.translate('graphDatasetImported', { type: this.translate(this.getCurrentDatasetType()) })
                    : this.translate('importPartial', { success: successCount, errors: errorCount }),
                errorCount === 0 ? 'success' : 'warning'
            );
            if (errorCount > 0) return;
            this.advanceReplaceGraphDataset();
            return;
        }
        if (this.editModeManager) {
            this.editModeManager.triggerAutoSave();
            this.editModeManager.refreshDiagram();
        }
        setTimeout(() => {
            this.showNotification(
                errorCount === 0
                    ? this.translate('importSuccess')
                    : this.translate('importPartial', { success: successCount, errors: errorCount }),
                errorCount === 0 ? 'success' : 'warning'
            );
            this.close();
        }, 400);
    },
    advanceReplaceGraphDataset() {
        if (!this.isReplaceGraphMode()) return;
        if (this.currentDatasetIndex >= this.graphDatasets.length - 1) {
            this.finalGraphReview = true;
            this.currentStep = 3;
            this.updateContextPanel();
            this.updateStepDisplay();
            this.displayImportConfirmation();
            return;
        }
        this.currentDatasetIndex++;
        this.currentFileType = this.graphDatasets[this.currentDatasetIndex].type;
        this.currentStep = 1;
        this.finalGraphReview = false;
        this.resetDatasetState();
        this.updateContextPanel();
        this.updateStepDisplay();
    },
    commitReplaceGraph() {
        try {
            if (!this.stagingParser || this.stagingParser.departements.size === 0) {
                this.showError(this.translate('graphDepartmentsFirst'));
                return;
            }
            const xmlString = this.stagingParser.exportToXML();
            this.xmlParser.parseXML(xmlString);
            if (this.editModeManager) {
                this.editModeManager.triggerAutoSave();
                this.editModeManager.refreshDiagram();
            }
            this.showNotification(this.translate('graphCommitSuccess'), 'success');
            this.close();
        } catch (error) {
            console.error('Error committing graph import:', error);
            this.showNotification(error.message || this.translate('importError'), 'error');
        }
    },
    importDepartment(data, targetParser = this.xmlParser) {
        const id = data.id || this.generateId('dept');
        if (targetParser.departements.has(id)) {
            throw new Error(this.translate('duplicateId', { id }));
        }
        const rawParent = String(data.parent || '').trim();
        const parentId = rawParent === 'root' || rawParent === '' ? null : rawParent;
        if (parentId && !targetParser.departements.has(parentId)) {
            throw new Error(this.translate('parentNotFound', { parent: parentId }));
        }
        targetParser.addDepartment(parentId, {
            id,
            nom: data.nom || '',
            type: data.type || 'operational',
            abbreviation: data.abbreviation || '',
            abbrev_details: data.abbrev_details || '',
            description: data.description || '',
            responsable: data.responsable || '',
            note: data.note || '',
            background_color: data.background_color || '',
            fichiers: [],
            postes: [],
            tasks: [],
            taskPosteAssociations: new Map(),
            posteTaskAssociations: new Map()
        });
        return true;
    },
    importDocument(data, targetParser = this.xmlParser) {
        const id = data.id || this.generateId('doc');
        if (targetParser.documentsMap.has(id)) {
            throw new Error(this.translate('duplicateId', { id }));
        }
        const departmentId = data.department || this.getCurrentSelectedDepartment();
        if (!departmentId) {
            throw new Error(this.translate('noTargetDepartment'));
        }
        const dept = targetParser.getDepartement(departmentId);
        if (!dept) {
            throw new Error(this.translate('departmentUnknownForGraph', { department: departmentId }));
        }
        const category = data.category || (data.reglementation ? 'regulation' : 'document');
        const documentData = {
            id,
            nom: data.nom || '',
            category,
            document_type: data.document_type || '',
            description: data.description || '',
            code: data.code || '',
            ref: data.ref || '',
            lien: data.lien || '',
            page_reference: data.page_reference || '',
            type: category === 'regulation' ? 'reglementation' : 'manuel',
            usageCount: 1,
            departments: [departmentId]
        };
        if (category === 'regulation') {
            documentData.reglementation = data.reglementation || data.nom;
            documentData.regle_code = data.regle_code || '';
            documentData.regle_titre = data.regle_titre || '';
            documentData.regle_description = data.regle_description || '';
        }
        targetParser.documentsMap.set(id, documentData);
        if (!dept.fichiers) dept.fichiers = [];
        dept.fichiers.push(documentData);
        return true;
    },
    importTask(data, targetParser = this.xmlParser) {
        const id = data.id || this.generateId('task');
        if (targetParser.tasksMap.has(id)) {
            throw new Error(this.translate('duplicateId', { id }));
        }
        const departmentId = data.department || this.getCurrentSelectedDepartment();
        if (!departmentId) {
            throw new Error(this.translate('noTargetDepartment'));
        }
        const dept = targetParser.getDepartement(departmentId);
        if (!dept) {
            throw new Error(this.translate('departmentUnknownForGraph', { department: departmentId }));
        }
        const taskData = {
            id,
            nom: data.nom || '',
            categorie: data.categorie || '',
            description: data.description || '',
            order: data.order || '',
            usageCount: 1,
            departments: [departmentId]
        };
        targetParser.tasksMap.set(id, taskData);
        if (!dept.tasks) dept.tasks = [];
        dept.tasks.push(taskData);
        return true;
    },
    generateId(prefix) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `${prefix}-${timestamp}-${random}`;
    },
    getCurrentSelectedDepartment() {
        if (this.editModeManager && this.editModeManager.selectedDeptForToolbar) {
            return this.editModeManager.selectedDeptForToolbar.id;
        }
        if (window.app && window.app.queryDetails && window.app.queryDetails.currentDepartmentId) {
            return window.app.queryDetails.currentDepartmentId;
        }
        return null;
    },
    showError(message) {
        const fileInfo = document.getElementById('file-info');
        if (fileInfo && this.currentStep === 1) {
            fileInfo.innerHTML = this.escapeHtml(message);
            fileInfo.className = 'file-info error';
        } else {
            this.showNotification(message, 'error');
        }
    },
    showNotification(message, type = 'info') {
        if (this.editModeManager && this.editModeManager.showNotification) {
            this.editModeManager.showNotification(message, type);
        } else {
        }
    },
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return `${text.substring(0, maxLength)}...`;
    }
});
