class EditDepartmentManager {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.xmlParser = editModeManager.xmlParser;
        this.diagramme = editModeManager.diagramme;
        this.currentEditNode = null;
        this.currentEditMode = null;
        this.translations = {
            en: {
                editDepartment: 'Edit Department',
                addDepartment: 'Add Department',
                departmentName: 'Department Name',
                departmentId: 'Department ID',
                departmentType: 'Type',
                departmentColor: 'Background Color',
                abbreviation: 'Abbreviation',
                abbreviationDetails: 'Abbreviation Details',
                description: 'Description',
                responsible: 'Responsible',
                notes: 'Notes',
                parentDepartment: 'Parent Department',
                required: 'This field is required',
                invalidId: 'ID must contain only lowercase letters, numbers, hyphens, and underscores',
                idExists: 'A department with this ID already exists',
                departmentDeleted: 'Department deleted successfully',
                departmentDuplicated: 'Department "{name}" duplicated successfully',
                departmentAdded: 'Department added successfully',
                save: 'Save',
                cancel: 'Cancel',
                close: 'Close',
                none: 'None',
                departmentCopied: 'Department "{name}" copied',
                cannotCopyRoot: 'Cannot copy root department',
                cannotCutRoot: 'Cannot cut root department',
                departmentNotFound: 'Department not found',
                departmentAlreadyUnderParent: 'Department is already under this parent',
                cannotMoveIntoDescendant: 'Cannot move a department into its own descendant',
                nothingToPaste: 'Nothing to paste',
                parentDepartmentNotFound: 'Parent department not found',
                errorMovingDepartment: 'Error moving department',
                errorDuplicating: 'Error duplicating department',
                errorAddingDepartment: 'Error adding department',
                errorPasting: 'Error pasting',
                pasteSuccess: 'Department pasted under "{parentName}"',
                moveSuccess: 'Department "{deptName}" moved under "{parentName}"',
                duplicate: 'Duplicate',
                copy: 'Copy',
                cut: 'Cut',
                paste: 'Paste',
                idHint: 'Auto-generated unique ID (format: departement_xxx)',
                idTitle: 'Only lowercase letters, numbers, hyphens, and underscores allowed',
                colorPickerTitle: 'Choose a color',
                colorHint: 'Optional color (hex). Leave empty to use the default color.',
                directionType: 'Direction',
                operationalType: 'Operational',
                commercialType: 'Commercial',
                supportType: 'Support',
                technicalType: 'Technical',
                trainingType: 'Training',
                complianceType: 'Compliance',
                strategicType: 'Strategic',
                economicType: 'Economic',
                organisationType: 'Organisation'
            },
            fr: {
                editDepartment: 'Modifier le Département',
                addDepartment: 'Ajouter un Département',
                departmentName: 'Nom du Département',
                departmentId: 'ID du Département',
                departmentType: 'Type',
                departmentColor: 'Couleur de fond',
                abbreviation: 'Abréviation',
                abbreviationDetails: 'Détails de l\'Abréviation',
                description: 'Description',
                responsible: 'Responsable',
                notes: 'Notes',
                parentDepartment: 'Département Parent',
                required: 'Ce champ est requis',
                invalidId: 'L\'ID ne doit contenir que des lettres minuscules, chiffres, tirets et underscores',
                idExists: 'Un département avec cet ID existe déjà',
                save: 'Enregistrer',
                cancel: 'Annuler',
                departmentCopied: 'Département "{name}" copié',
                cannotCopyRoot: 'Impossible de copier le département racine',
                cannotCutRoot: 'Impossible de couper le département racine',
                departmentNotFound: 'Département non trouvé',
                departmentAlreadyUnderParent: 'Le département est déjà sous ce parent',
                cannotMoveIntoDescendant: 'Impossible de déplacer un département dans son propre descendant',
                nothingToPaste: 'Rien à coller',
                departmentDeleted: 'Département supprimé avec succès',
                parentDepartmentNotFound: 'Département parent non trouvé',
                errorMovingDepartment: 'Erreur lors du déplacement du département',
                errorDuplicating: 'Erreur lors de la duplication',
                errorAddingDepartment: 'Erreur lors de l\'ajout du département',
                errorPasting: 'Erreur lors du collage',
                pasteSuccess: 'Département collé sous "{parentName}"',
                moveSuccess: 'Département "{deptName}" déplacé sous "{parentName}"',
                duplicate: 'Dupliquer',
                copy: 'Copier',
                cut: 'Couper',
                paste: 'Coller',
                departmentDuplicated: 'DÃ©partement "{name}" dupliquÃ© avec succÃ¨s',
                departmentAdded: 'DÃ©partement ajoutÃ© avec succÃ¨s',
                close: 'Fermer',
                none: 'Aucun',
                idHint: 'ID unique gÃ©nÃ©rÃ© automatiquement (format : departement_xxx)',
                idTitle: 'Uniquement des lettres minuscules, chiffres, tirets et underscores',
                colorPickerTitle: 'Choisir une couleur',
                colorHint: 'Couleur optionnelle (hex). Laisser vide pour la couleur par dÃ©faut.',
                directionType: 'Direction',
                operationalType: 'OpÃ©rationnel',
                commercialType: 'Commercial',
                supportType: 'Support',
                technicalType: 'Technique',
                trainingType: 'Formation',
                complianceType: 'ConformitÃ©',
                strategicType: 'StratÃ©gique',
                economicType: 'Ã‰conomique',
                organisationType: 'Organisation'
            }
        };
        this.lng = 'en';
        this.init();
    }
    init() {
        this.createEditModal();
        this.attachModalEventListeners();
    }
    setLang(lng) {
        this.lng = lng;
        this.updateModalTranslations();
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    showNotification(message, type) {
        if (this.editModeManager && this.editModeManager.messageManager) {
            this.editModeManager.messageManager.showNotification(message, type, 2);
        }
    }
    createEditModal() {
        const modal = document.createElement('div');
        modal.className = 'edit-modal';
        modal.id = 'edit-modal';
        modal.innerHTML = `
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h2 id="edit-modal-title">${this.translate('editDepartment')}</h2>
                    <button class="edit-modal-close" id="edit-modal-close" aria-label="${this.translate('close')}" title="${this.translate('close')}">&times;</button>
                </div>
                <form  id="edit-form">
                <div class="edit-form" >
                    <div class="form-group">
                        <label for="edit-dept-name">${this.translate('departmentName')} *</label>
                        <input type="text" id="edit-dept-name" name="nom" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-id">${this.translate('departmentId')} *</label>
                        <input type="text" id="edit-dept-id" name="id" required title="${this.translate('idTitle')}">
                        <span class="input-hint" id="edit-dept-id-hint">${this.translate('idHint')}</span>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-type">${this.translate('departmentType')}</label>
                        <select id="edit-dept-type" name="type">
                            <option value="direction">${this.translate('directionType')}</option>
                            <option value="operational">${this.translate('operationalType')}</option>
                            <option value="commercial">${this.translate('commercialType')}</option>
                            <option value="support">${this.translate('supportType')}</option>
                            <option value="technical">${this.translate('technicalType')}</option>
                            <option value="training">${this.translate('trainingType')}</option>
                            <option value="compliance">${this.translate('complianceType')}</option>
                            <option value="strategic">${this.translate('strategicType')}</option>
                            <option value="economic">${this.translate('economicType')}</option>
                            <option value="organisation">${this.translate('organisationType')}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-background-color">${this.translate('departmentColor')}</label>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <input type="color" id="edit-dept-background-color-picker" value="#ffffff" title="${this.translate('colorPickerTitle')}">
                            <input type="text" id="edit-dept-background-color-hex" placeholder="#E6F4FF">
                            <input type="hidden" id="edit-dept-background-color" name="background_color">
                        </div>
                        <span class="input-hint">${this.translate('colorHint')}</span>
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-abbreviation">${this.translate('abbreviation')}</label>
                        <input type="text" id="edit-dept-abbreviation" name="abbreviation">
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-abbrev-details">${this.translate('abbreviationDetails')}</label>
                        <input type="text" id="edit-dept-abbrev-details" name="abbrev_details">
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-description">${this.translate('description')}</label>
                        <textarea id="edit-dept-description" name="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-responsible">${this.translate('responsible')}</label>
                        <input type="text" id="edit-dept-responsible" name="responsable">
                    </div>
                    <div class="form-group">
                        <label for="edit-dept-notes">${this.translate('notes')}</label>
                        <textarea id="edit-dept-notes" name="note"></textarea>
                    </div>
                    <div class="form-group" id="parent-group" style="display: none;">
                        <label for="edit-dept-parent">${this.translate('parentDepartment')}</label>
                        <select id="edit-dept-parent" name="parent">
                            <option value="">${this.translate('none')}</option>
                        </select>
                    </div>
                </div>    
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" id="cancel-edit">${this.translate('cancel')}</button>
                    <button type="submit" class="btn btn-primary">${this.translate('save')}</button>
                </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
    }
    attachModalEventListeners() {
        document.getElementById('edit-modal-close').addEventListener('click', () => {
            this.closeModal();
        });
        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.closeModal();
        });
        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveChanges();
        });
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') {
                this.closeModal();
            }
        });
        const colorPicker = document.getElementById('edit-dept-background-color-picker');
        const colorHex = document.getElementById('edit-dept-background-color-hex');
        if (colorPicker && colorHex) {
            colorPicker.addEventListener('input', (e) => {
                this.syncBackgroundColorInputs(e.target.value);
            });
            colorHex.addEventListener('input', (e) => {
                this.syncBackgroundColorInputs(e.target.value, false);
            });
            colorHex.addEventListener('blur', (e) => {
                this.syncBackgroundColorInputs(e.target.value);
            });
        }
    }
    normalizeBackgroundColor(value) {
        if (!value || typeof value !== 'string') return '';
        const v = value.trim();
        if (!v) return '';
        const hex = v.startsWith('#') ? v : `#${v}`;
        const isValid = /^#([0-9a-fA-F]{6})$/.test(hex);
        return isValid ? hex.toUpperCase() : '';
    }
    syncBackgroundColorInputs(value, enforceValid = true) {
        const hidden = document.getElementById('edit-dept-background-color');
        const picker = document.getElementById('edit-dept-background-color-picker');
        const hexInput = document.getElementById('edit-dept-background-color-hex');
        if (!hidden || !picker || !hexInput) return;
        if (!enforceValid) {
            const raw = (value || '').trim();
            const normalized = this.normalizeBackgroundColor(raw);
            hidden.value = normalized;
            hexInput.value = raw;
            if (normalized) picker.value = normalized;
            return;
        }
        const normalized = this.normalizeBackgroundColor(value);
        hidden.value = normalized;
        hexInput.value = normalized;
        picker.value = normalized || '#ffffff';
    }
    generateUniqueDepartmentId() {
        const prefix = 'departement-';
        let counter = 1;
        let candidate = `${prefix}${String(counter).padStart(3, '0')}`;
        while (this.xmlParser.departements.has(candidate)) {
            counter++;
            candidate = `${prefix}${String(counter).padStart(3, '0')}`;
        }
        return candidate;
    }
    showModalForNewDepartment() {
        document.getElementById('edit-form').reset();
        this.currentEditMode = 'add';
        const idInput = document.getElementById('edit-dept-id');
        idInput.value = this.generateUniqueDepartmentId();
        idInput.readOnly = true;
        document.getElementById('edit-dept-type').value = 'operational';
        this.syncBackgroundColorInputs('');
        if (this.editModeManager.selectedDeptForToolbar && this.editModeManager.selectedDeptForToolbar.id) {
            this.populateParentSelect(this.editModeManager.selectedDeptForToolbar.id);
            document.getElementById('parent-group').style.display = 'block';
        } else {
            this.populateParentSelect();
            document.getElementById('parent-group').style.display = 'block';
        }
        document.getElementById('edit-modal-title').textContent = this.translate('addDepartment');
        this.showModal();
    }
    editDepartmentById(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const deptData = this.xmlParser.getDepartement(deptId);
        if (!deptData) return;
        const d3Node = this.diagramme.diagramme.findNodeById(this.diagramme.diagramme.root, deptId);
        this.currentEditNode = d3Node;
        this.currentEditMode = 'edit';
        document.getElementById('edit-dept-name').value = deptData.nom || '';
        const idInput = document.getElementById('edit-dept-id');
        idInput.value = deptData.id || '';
        idInput.readOnly = true;
        document.getElementById('edit-dept-type').value = deptData.type || 'operational';
        this.syncBackgroundColorInputs(deptData.background_color || '');
        document.getElementById('edit-dept-abbreviation').value = deptData.abbreviation || '';
        document.getElementById('edit-dept-abbrev-details').value = deptData.abbrev_details || '';
        document.getElementById('edit-dept-description').value = deptData.description || '';
        document.getElementById('edit-dept-responsible').value = deptData.responsable || '';
        document.getElementById('edit-dept-notes').value = deptData.note || '';
        document.getElementById('parent-group').style.display = 'none';
        document.getElementById('edit-modal-title').textContent = this.translate('editDepartment');
        this.showModal();
    }
    addChildDepartmentById(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const deptData = this.xmlParser.getDepartement(deptId);
        if (!deptData) return;
        const d3Node = this.diagramme.diagramme.findNodeById(this.diagramme.diagramme.root, deptId);
        if(!d3Node) return;
        const parentDeptData = d3Node.data.data;
        this.currentEditNode = d3Node;
        this.currentEditMode = 'add';
        document.getElementById('edit-form').reset();
        const idInput = document.getElementById('edit-dept-id');
        idInput.value = this.generateUniqueDepartmentId();
        idInput.readOnly = true;
        document.getElementById('edit-dept-type').value = 'operational';
        this.syncBackgroundColorInputs('');
        this.populateParentSelect(parentDeptData.id);
        document.getElementById('parent-group').style.display = 'block';
        document.getElementById('edit-modal-title').textContent = this.translate('addDepartment');
        this.showModal();
    }
    duplicateDepartmentById(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const deptData = this.xmlParser.getDepartement(deptId);
        if (!deptData) return;
        const d3Node = this.diagramme.diagramme.findNodeById(this.diagramme.diagramme.root, deptId);
        if(!d3Node) return;
        const dept = d3Node.data;
        if(!dept) return;
        if (dept.parent === null || dept.id === 'root') {
            this.showNotification(this.translate('cannotCopyRoot'), 'error');
            return;
        }
        let newId = `${deptId}-copy`;
        let counter = 1;
        while (this.xmlParser.departements.has(newId)) {
            newId = `${deptId}-copy-${counter}`;
            counter++;
        }
        const duplicateData = {
            nom: `${deptData.nom} (Copy)`,
            id: newId,
            type: deptData.type || 'operational',
            abbreviation: deptData.abbreviation || '',
            abbrev_details: deptData.abbrev_details || '',
            background_color: deptData.background_color || '',
            description: deptData.description || '',
            responsable: deptData.responsable || '',
            note: deptData.note || '',
            fichiers: [],
            postes: [],
            tasks: [],
            taskPosteAssociations: new Map(),
            posteTaskAssociations: new Map()
        };
        const parentId = dept.parent || null;
        const newDept = this.xmlParser.addDepartment(parentId, duplicateData);
        if (!newDept) {
            this.showNotification(this.translate('errorDuplicating'), 'error');
            return;
        }
        let insertedWithoutRefresh = false;
        if (
            this.diagramme &&
            this.diagramme.diagramme &&
            typeof this.diagramme.diagramme.insertDepartmentNode === 'function'
        ) {
            insertedWithoutRefresh = this.diagramme.diagramme.insertDepartmentNode(parentId, newDept.id);
        }
        if (!insertedWithoutRefresh) {
            this.editModeManager.refreshDiagram();
        }
        this.editModeManager.triggerAutoSave();
        this.showNotification(this.translate('departmentDuplicated', { name: deptData.nom }), 'success');
    }
    populateParentSelect(selectedParentId = null) {
        const select = document.getElementById('edit-dept-parent');
        select.innerHTML = `<option value="">${this.translate('none')}</option>`;
        const departments = Array.from(this.xmlParser.departements.values());
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept.id;
            option.textContent = dept.nom;
            if (dept.id === selectedParentId) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }
    saveChanges() {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const formData = new FormData(document.getElementById('edit-form'));
        const data = Object.fromEntries(formData.entries());
        if (!this.validateForm(data)) {
            return;
        }
        if (this.currentEditMode === 'edit') {
            const deptId = this.currentEditNode.data.data.id;
            this.xmlParser.updateDepartment(deptId, data);
            if (window.editModeManager && window.editModeManager.isEditMode) {
                window.editModeManager.triggerAutoSave();
                window.editModeManager.updateDiagramme(deptId);
            }
        } else if (this.currentEditMode === 'add') {
            const parentId = data.parent || null;
            const departmentData = {
                ...data,
                fichiers: [],     
                postes: [],       
                tasks: [],        
                taskPosteAssociations: new Map(),
                posteTaskAssociations: new Map()
            };
            const newDepartment = this.xmlParser.addDepartment(parentId, departmentData);
            const newDepartmentId = (newDepartment && newDepartment.id) || data.id;
            let insertedWithoutRefresh = false;
            if (
                this.diagramme &&
                this.diagramme.diagramme &&
                typeof this.diagramme.diagramme.insertDepartmentNode === 'function'
            ) {
                insertedWithoutRefresh = this.diagramme.diagramme.insertDepartmentNode(parentId, newDepartmentId);
            }
            if (!insertedWithoutRefresh) {
                this.editModeManager.refreshDiagram();
            }
            this.editModeManager.triggerAutoSave();
            this.showNotification(this.translate('departmentAdded'), 'success');
        }
        this.closeModal();
    }
    validateForm(data) {
        let isValid = true;
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMsg = group.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = '';
            }
        });
        if (!data.nom || data.nom.trim() === '') {
            this.showFieldError('edit-dept-name', this.translate('required'));
            isValid = false;
        }
        if (!data.id || data.id.trim() === '') {
            this.showFieldError('edit-dept-id', this.translate('required'));
            isValid = false;
        } else if (!/^[a-z0-9_-]+$/.test(data.id)) {
            this.showFieldError('edit-dept-id', this.translate('invalidId'));
            isValid = false;
        } else if (this.currentEditMode === 'add' && this.xmlParser.departements.has(data.id)) {
            this.showFieldError('edit-dept-id', this.translate('idExists'));
            isValid = false;
        }
        return isValid;
    }
    showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        const group = field.closest('.form-group');
        if (!group) return;
        group.classList.add('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = message;
        }
    }
    showModal() {
        document.getElementById('edit-modal').classList.add('active');
    }
    closeModal() {
        document.getElementById('edit-modal').classList.remove('active');
        this.currentEditNode = null;
        this.currentEditMode = null;
    }
    addDepartment(parentId, departmentData) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        if (!this.validateForm(departmentData)) {
            return;
        }
        const newDept = this.xmlParser.addDepartment(parentId, departmentData);
        if (!newDept) {
            this.showNotification(this.translate('errorAddingDepartment'), 'error');
            return;
        }
        this.closeModal();
        let insertedWithoutRefresh = false;
        if (
            this.diagramme &&
            this.diagramme.diagramme &&
            typeof this.diagramme.diagramme.insertDepartmentNode === 'function'
        ) {
            insertedWithoutRefresh = this.diagramme.diagramme.insertDepartmentNode(parentId, newDept.id);
        }
        if (!insertedWithoutRefresh) {
            this.editModeManager.refreshDiagram();
        }
        this.showNotification(this.translate('departmentAdded'), 'success');
    }
    updateModalTranslations() {
        const editModal = document.getElementById('edit-modal');
        if (editModal) {
            const title = editModal.querySelector('#edit-modal-title');
            if (title) {
                title.textContent = this.currentEditMode === 'edit' ? 
                    this.translate('editDepartment') : 
                    this.translate('addDepartment');
            }
            const labels = [
                { id: 'edit-dept-name-label', key: 'departmentName' },
                { id: 'edit-dept-id-label', key: 'departmentId' },
                { id: 'edit-dept-type-label', key: 'departmentType' },
                { id: 'edit-dept-background-color-label', key: 'departmentColor' },
                { id: 'edit-dept-abbreviation-label', key: 'abbreviation' },
                { id: 'edit-dept-abbrev-details-label', key: 'abbreviationDetails' },
                { id: 'edit-dept-description-label', key: 'description' },
                { id: 'edit-dept-responsible-label', key: 'responsible' },
                { id: 'edit-dept-notes-label', key: 'notes' },
                { id: 'edit-dept-parent-label', key: 'parentDepartment' }
            ];
            labels.forEach(({ id, key }) => {
                const label = editModal.querySelector(`label[for="${id.replace('-label', '')}"]`);
                if (label) {
                    label.textContent = this.translate(key) + (key === 'departmentName' || key === 'departmentId' ? ' *' : '');
                }
            });
            const saveBtn = editModal.querySelector('.btn-primary');
            const cancelBtn = editModal.querySelector('.btn-secondary');
            if (saveBtn) saveBtn.textContent = this.translate('save');
            if (cancelBtn) cancelBtn.textContent = this.translate('cancel');
            const closeBtn = editModal.querySelector('#edit-modal-close');
            if (closeBtn) {
                closeBtn.setAttribute('aria-label', this.translate('close'));
                closeBtn.title = this.translate('close');
            }
            const idInput = editModal.querySelector('#edit-dept-id');
            if (idInput) {
                idInput.title = this.translate('idTitle');
            }
            const idHint = editModal.querySelector('#edit-dept-id-hint');
            if (idHint) {
                idHint.textContent = this.translate('idHint');
            }
            const colorPicker = editModal.querySelector('#edit-dept-background-color-picker');
            if (colorPicker) {
                colorPicker.title = this.translate('colorPickerTitle');
            }
            const inputHints = editModal.querySelectorAll('.input-hint');
            if (inputHints[1]) {
                inputHints[1].textContent = this.translate('colorHint');
            }
            const parentPlaceholder = editModal.querySelector('#edit-dept-parent option[value=""]');
            if (parentPlaceholder) {
                parentPlaceholder.textContent = this.translate('none');
            }
            const typeSelect = editModal.querySelector('#edit-dept-type');
            if (typeSelect) {
                const currentValue = typeSelect.value;
                const typeOptions = [
                    { value: 'direction', key: 'directionType' },
                    { value: 'operational', key: 'operationalType' },
                    { value: 'commercial', key: 'commercialType' },
                    { value: 'support', key: 'supportType' },
                    { value: 'technical', key: 'technicalType' },
                    { value: 'training', key: 'trainingType' },
                    { value: 'compliance', key: 'complianceType' },
                    { value: 'strategic', key: 'strategicType' },
                    { value: 'economic', key: 'economicType' },
                    { value: 'organisation', key: 'organisationType' }
                ];
                typeSelect.innerHTML = typeOptions
                    .map(({ value, key }) => `<option value="${value}">${this.translate(key)}</option>`)
                    .join('');
                typeSelect.value = currentValue;
            }
        }
    }
   deleteDepartmentById(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const deptData = this.xmlParser.getDepartement(deptId);
        if (!deptData) return;
        const d3Node = this.diagramme.diagramme.findNodeById(this.diagramme.diagramme.root, deptId);
        if (!d3Node) return;
        const childCount = d3Node.children ? d3Node.children.length : 0;
        this.editModeManager.messageManager.showConfirmDialog(
            deptData.nom,
            childCount,
            d3Node,
            () => {
                const deptId = this.currentDeleteNode.data.data.id;
                this.xmlParser.deleteDepartment(deptId);
                let removedWithoutRefresh = false;
                if (
                    this.diagramme &&
                    this.diagramme.diagramme &&
                    typeof this.diagramme.diagramme.removeDepartmentNode === 'function'
                ) {
                    removedWithoutRefresh = this.diagramme.diagramme.removeDepartmentNode(deptId);
                }
                if (!removedWithoutRefresh) {
                    this.editModeManager.refreshDiagram();
                }
                this.editModeManager.triggerAutoSave();
                this.showNotification(this.translate('departmentDeleted'), 'success');
            },
            (node) => {
                this.currentDeleteNode = node;
            }
        );
    } 
}
