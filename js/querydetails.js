class QueryDetails {
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
        this.translations = {
            fr: {    
                usedInMultipleDepts: "Utilisé dans",
                departments: "départements",
                confirmAddPoste: "Ajouter ce poste au département courant ? Le poste sera partagé entre les départements.",
                posteAddedSuccess: "Poste ajouté avec succès !",
                addPosteError: "Erreur lors de l'ajout du poste.",
                selectPost: "Sélectionner un poste",
                selectPostDescription: "Sélectionnez un poste existant d'un autre département pour l'ajouter à ce département.",
                filterPostes: "Filtrer les postes...",
                cancel: "Annuler",
                select: "Sélectionner",
                confirmCopyPoste: "Copier ce poste dans le département courant ? Le poste original restera dans son département source.",
                posteCopiedSuccess: "Poste copié avec succès !",
                copyPosteError: "Erreur lors de la copie du poste.",
                descriptionAssociation: "Description de l'association",
                addAssociationDescription: "Ajouter une description",
                editAssociationDescription: "Modifier la description",
                associationDescriptionUpdated: "Description de l'association mise à jour",
                confirmRemoveAssociation: "Êtes-vous sûr de vouloir supprimer cette association ?",
                page: "Page",
                abbreviation: "Abréviation",
                abbreviationDescription: "Description de l'abréviation",
                abbreviationPlaceholder: "(Ajouter une abréviation)",
                abbrevDescPlaceholder: "(description de l'abréviation)",
                abbreviationDescriptionPlaceholder: "(Ajouter une description)",
                departmentTypes: {
                    direction:"Direction",
                    operational:"Operational",
                    commercial:"Commercial",
                    support:"Support",
                    technical:"Technical",
                    training:"Training",
                    compliance:"Compliance",
                    strategic:"Strategic",
                    economic:"Economic",
                    organisation:"Organisation",
                    other: "Autre"
                },
                linkPost: "Associer un poste",
                linkTask: "Associer une tâche",
                unlinkPost: "Dissocier le poste",
                unlinkTask: "Dissocier la tâche",
                selectPost: "Sélectionner un poste...",
                selectTask: "Sélectionner une tâche...",
                noPostsAvailable: "Aucun poste disponible pour l'association",
                noTasksAvailable: "Aucune tâche disponible pour l'association",
                postLinkedSuccess: "Poste associé avec succès",
                taskLinkedSuccess: "Tâche associée avec succès",
                postUnlinkedSuccess: "Poste dissocié avec succès",
                taskUnlinkedSuccess: "Tâche dissociée avec succès",
                linkPostError: "Erreur lors de l'association du poste",
                linkTaskError: "Erreur lors de l'association de la tâche",
                unlinkPostError: "Erreur lors de la dissociation du poste",
                unlinkTaskError: "Erreur lors de la dissociation de la tâche",
                confirmUnlinkPost: "Êtes-vous sûr de vouloir dissocier ce poste ?",
                confirmUnlinkTask: "Êtes-vous sûr de vouloir dissocier cette tâche ?",
                linkDocument: "Associer un document",
                unlinkDocument: "Dissocier le document",
                selectDocument: "Sélectionner un document...",
                documents: "Documents",
                regulations: "Règlementations",
                noDocumentsAvailable: "Aucun document disponible pour l'association",
                documentLinkedSuccess: "Document associé avec succès",
                documentUnlinkedSuccess: "Document dissocié avec succès",
                linkDocumentError: "Erreur lors de l'association du document",
                unlinkDocumentError: "Erreur lors de la dissociation du document",
                confirmUnlinkDocument: "Êtes-vous sûr de vouloir dissocier ce document ?",
                page: "Page",
                noTasksAvailable: "Aucune tâche disponible pour l'association",
                selectTask: "Sélectionner une tâche...",
                link: "Associer",
                linkTask: "Associer une tâche",
                linkPost: "Associer un poste",
                unlinkTask: "Dissocier la tâche",
                unlinkPost: "Dissocier le poste",
                confirmUnlinkTask: "Êtes-vous sûr de vouloir dissocier cette tâche ?",
                taskUnlinkedSuccess: "Tâche dissociée avec succès",
                unlinkTaskError: "Erreur lors de la dissociation de la tâche",
                unlinkDocument: "Dissocier le document",
                confirmUnlinkDocument: "Êtes-vous sûr de vouloir dissocier ce document ?",
                documentUnlinkedSuccess: "Document dissocié avec succès",
                unlinkError: "Erreur lors de la dissociation du document",
                addPost: "Ajouter un poste",
                addTask: "Ajouter une tâche",
                addDocument: "Ajouter un document",
                addRegulation: "Ajouter une réglementation",
                noSelection: "Sélectionnez un département dans l'organigramme pour afficher ses détails",
                startQuiz: "Démarrer un quiz sur ce département",
                quizFor: "Quiz pour le département",
                departmentQuiz: "Quiz du département",
                general: "Général",
                posts: "Postes",
                tasks: "Tâches",
                documents: "Documents",
                description: "Description",
                manager: "Responsable",
                notes: "Notes",
                noDescription: "Aucune description disponible.",
                notSpecified: "Non spécifié",
                postsCount: "Postes",
                tasksCount: "Tâches",
                noPosts: "Aucun poste défini",
                noTasks: "Aucune tâche définie",
                documentsRegulations: "Documents et Réglementations",
                internalDocuments: "Documents Internes",
                regulations: "Réglementations",
                noInternalDocuments: "Aucun document interne",
                noRegulations: "Aucune réglementation",
                noDocuments: "Aucun document ou réglementation",
                reference: "Référence:",
                code: "Code:",
                document: "DOCUMENT",
                regulation: "RÈGLEMENT",
                selectDept: "détails",
                postName: "Poste sans nom",
                taskName: "Tâche sans nom",
                documentName: "Document sans nom",
                regulationName: "Réglementation sans nom",
                closeModal: "Fermer",
                category: "Catégorie",
                order: "Ordre",
                associatedPosts: "Postes associés",
                associatedTasks: "Tâches associées",
                noAssociatedPosts: "Aucun poste associé",
                noAssociatedTasks: "Aucune tâche associée",
                postId: "ID Poste",
                taskId: "ID Tâche",
                showDetails: "Afficher détails",
                hideDetails: "Masquer détails",
                abbreviation: "Abréviation",
                showAll: "Tout afficher",
                hideAll: "Tout masquer",
                metadata: "Métadonnées",
                showMetadata: "Afficher métadonnées",
                hideMetadata: "Masquer métadonnées",
                showPosts: "Afficher les postes",
                hidePosts: "Masquer les postes",
                showTasks: "Afficher les tâches",
                hideTasks: "Masquer les tâches",
                associatedPosts: "Postes associés",
                associatedTasks: "Tâches associées",
                noAssociated: "Aucune association",
                postsAssociated: "Postes associés",
                tasksAssociated: "Tâches associées",
                associatedDocuments: "Documents associés",
                noAssociatedDocuments: "Aucun document associé",
                showAssociations: "Afficher associations",
                hideAssociations: "Masquer associations",
                associatedPostsCount: "Postes associés",
                associatedTasksCount: "Tâches associées",
                edit: "Modifier",
                editDepartment: "Modifier le département"
            },
            en: {
                usedInMultipleDepts: "Used in",
                departments: "departments",
                sharedFromDept: "Shared from department",
                confirmAddPoste: "Add this position to the current department? The position will be shared between departments.",
                posteAddedSuccess: "Position added successfully!",
                addPosteError: "Error adding position.",
                selectPost: "Select Position",
                selectPostDescription: "Select an existing position from another department to add to this department.",
                filterPostes: "Filter positions...",
                cancel: "Cancel",
                select: "Select",
                confirmCopyPoste: "Copy this position to the current department? The original position will remain in its source department.",
                posteCopiedSuccess: "Position copied successfully!",
                copyPosteError: "Error copying position.",
                descriptionAssociation: "Association Description",
                addAssociationDescription: "Add description",
                editAssociationDescription: "Edit description",
                associationDescriptionUpdated: "Association description updated",
                confirmRemoveAssociation: "Are you sure you want to remove this association?",
                page: "Page",
                abbreviation: "Abbreviation",
                abbreviationDescription: "Abbreviation Description",
                abbreviationPlaceholder: "(Add abbreviation)",
                abbreviationDescriptionPlaceholder: "(Add description)",
                abbrevDescPlaceholder: "(abbreviation description)",
                departmentTypes: {
                    direction:"Direction",
                    operational:"Operational",
                    commercial:"Commercial",
                    support:"Support",
                    technical:"Technical",
                    training:"Training",
                    compliance:"Compliance",
                    strategic:"Strategic",
                    economic:"Economic",
                    organisation:"Organisation",
                    other: "Other"
                },
                linkPost: "Link Position",
                linkTask: "Link Task",
                unlinkPost: "Unlink Position",
                unlinkTask: "Unlink Task",
                selectPost: "Select Position...",
                selectTask: "Select Task...",
                noPostsAvailable: "No positions available for linking",
                noTasksAvailable: "No tasks available for linking",
                postLinkedSuccess: "Position linked successfully",
                taskLinkedSuccess: "Task linked successfully",
                postUnlinkedSuccess: "Position unlinked successfully",
                taskUnlinkedSuccess: "Task unlinked successfully",
                linkPostError: "Error linking position",
                linkTaskError: "Error linking task",
                unlinkPostError: "Error unlinking position",
                unlinkTaskError: "Error unlinking task",
                confirmUnlinkPost: "Are you sure you want to unlink this position?",
                confirmUnlinkTask: "Are you sure you want to unlink this task?",                
                linkDocument: "Link Document",
                unlinkDocument: "Unlink Document",
                selectDocument: "Select Document...",
                documents: "Documents",
                regulations: "Regulations",
                noDocumentsAvailable: "No documents available for linking",
                documentLinkedSuccess: "Document linked successfully",
                documentUnlinkedSuccess: "Document unlinked successfully",
                linkDocumentError: "Error linking document",
                unlinkDocumentError: "Error unlinking document",
                confirmUnlinkDocument: "Are you sure you want to unlink this document?",
                page: "Page",
                noTasksAvailable: "No tasks available for linking",
                selectTask: "Select Task...",
                link: "Link",
                linkTask: "Link Task",
                linkPost: "Link Position",
                unlinkTask: "Unlink Task",
                unlinkPost: "Unlink Position",
                confirmUnlinkTask: "Are you sure you want to unlink this task?",
                taskUnlinkedSuccess: "Task unlinked successfully",
                unlinkTaskError: "Error unlinking task",
                unlinkDocument: "Unlink Document",
                confirmUnlinkDocument: "Are you sure you want to unlink this document?",
                documentUnlinkedSuccess: "Document unlinked successfully",
                unlinkError: "Error unlinking document",  
                addPost: "Add Position",
                addTask: "Add Task",
                addDocument: "Add Document",
                addRegulation: "Add Regulation",
                noSelection: "Select a department in the organization chart to display its details",
                startQuiz: "Start a quiz about this department",
                quizFor: "Quiz for department",
                departmentQuiz: "Department Quiz",
                general: "General",
                posts: "Positions",
                tasks: "Tasks",
                documents: "Documents",
                description: "Description",
                manager: "Manager",
                notes: "Notes",
                noDescription: "No description available.",
                notSpecified: "Not specified",
                postsCount: "Positions",
                tasksCount: "Tasks",
                noPosts: "No positions defined",
                noTasks: "No tasks defined",
                documentsRegulations: "Documents and Regulations",
                internalDocuments: "Internal Documents",
                regulations: "Regulations",
                noInternalDocuments: "No internal documents",
                noRegulations: "No regulations",
                noDocuments: "No documents or regulations",
                reference: "Reference:",
                code: "Code:",
                document: "DOCUMENT",
                regulation: "REGULATION",
                selectDept: "Details",
                postName: "Unnamed position",
                taskName: "Unnamed task",
                documentName: "Unnamed document",
                regulationName: "Unnamed regulation",
                closeModal: "Close",
                category: "Category",
                order: "Order",
                associatedPosts: "Associated positions",
                associatedTasks: "Associated tasks",
                noAssociatedPosts: "No associated positions",
                noAssociatedTasks: "No associated tasks",
                postId: "Position ID",
                taskId: "Task ID",
                showDetails: "Show details",
                hideDetails: "Hide details",
                abbreviation: "Abbreviation",
                showAll: "Show all",
                hideAll: "Hide all",
                metadata: "Metadata",
                showMetadata: "Show metadata",
                hideMetadata: "Hide metadata",
                showPosts: "Show positions",
                hidePosts: "Hide positions",
                showTasks: "Show tasks",
                hideTasks: "Hide tasks",
                associatedPosts: "Associated positions",
                associatedTasks: "Associated tasks",
                noAssociated: "No associations",
                postsAssociated: "Associated positions",
                tasksAssociated: "Associated tasks",
                associatedDocuments: "Associated documents",
                noAssociatedDocuments: "No associated documents",
                showAssociations: "Show associations",
                hideAssociations: "Hide associations",
                associatedPostsCount: "Associated positions",
                associatedTasksCount: "Associated tasks",
                edit: "Edit",
                editDepartment: "Edit Department"
            }
        };
        this.departmentTypes = ['direction','operational','commercial','support','technical','training','compliance','strategic','economic','organisation', 'other'];
        if (this.bModal) {
            setTimeout(() => this.createModal(), 0);
        }
    }
    initialize(lng, diagramme, qcmGenerator) {
        this.lng = lng || 'fr';
        this.diagramme = diagramme;
        this.qcmGenerator = qcmGenerator;
        this.init();
    }
    setLang(lng) {
        this.lng = lng || 'fr';
        this.updateLanguage();
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
    addQuizButton() {
        const container = this.getContentContainer();
        if (!container) return;
        const deptHeader = container.querySelector('.dept-header');
        if (!deptHeader) return;
        if (deptHeader.querySelector('#quiz-btn')) return;
        const quizButton = document.createElement('button');
        quizButton.id = 'quiz-btn';
        quizButton.className = 'quiz-button';
        quizButton.innerHTML = '📝 Quiz';
        quizButton.title = this.translate('startQuiz');
        deptHeader.style.position = 'relative';
        quizButton.style.position = 'absolute';
        quizButton.style.top = '16px';
        quizButton.style.right = '20px';
        quizButton.style.padding = '6px 12px';
        quizButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        quizButton.style.color = 'white';
        quizButton.style.border = 'none';
        quizButton.style.borderRadius = '6px';
        quizButton.style.cursor = 'pointer';
        quizButton.style.fontSize = '13px';
        quizButton.style.fontWeight = '500';
        quizButton.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
        quizButton.style.transition = 'all 0.3s ease';
        quizButton.addEventListener('mouseenter', () => {
            quizButton.style.transform = 'translateY(-2px)';
            quizButton.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
        });
        quizButton.addEventListener('mouseleave', () => {
            quizButton.style.transform = 'translateY(0)';
            quizButton.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
        });
        quizButton.addEventListener('click', () => {
            if (this.currentDepartmentId) {
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
        editButton.innerHTML = '✏️ ' + this.translate('edit');
        editButton.title = this.translate('editDepartment');
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
    refreshEditMode() {
        this.addEditButton();
        if (this.currentDepartmentId) {
            this.showDepartmentDetailsId(this.currentDepartmentId);
        }
    }
    makeElementEditable(element, type, id, field, isMultiline = false) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
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
                element.innerHTML = '';
                element.style.display = originalDisplay;
                if (newValue !== '' && newValue !== originalValue) {
                    element.textContent = newValue;
                    this.saveInlineChange(type, id, field, newValue);
                } else {
                    if (originalValue === '' || isPlaceholder) {
                        element.textContent = originalValue; 
                    } else {
                        element.textContent = originalValue;
                    }
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
            case 'poste':
                this.xmlParser.updatePoste(id, updates);
                break;
            case 'task':
                this.xmlParser.updateTask(id, updates);
                break;
            case 'document':
                this.xmlParser.updateDocument(id, updates);
                break;
        }
        if(window.editModeManager && window.editModeManager.isEditMode)
            window.editModeManager.triggerAutoSave();
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
            modalTitle.textContent = `${this.translate('quizFor')}: ${deptName}`;
        }
        this.qcmGenerator.resetQuiz();
        this.qcmGenerator.generateDepartmentSpecificQuestions(departmentId);
        this.qcmGenerator.openModal(departmentId);
    }
    getPostsForTask(departmentId, taskId) {
        if (!this.xmlParser) {
            console.error('XMLParser not available');
            return [];
        }
        try {
            return this.xmlParser.getPostsForTask(departmentId, taskId);
        } catch (error) {
            console.error('Error in getPostsForTask:', error);
            return [];
        }
    }
    getTasksForPost(departmentId, postId) {
        if (!this.xmlParser) {
            console.error('XMLParser not available');
            return [];
        }
        try {
            return this.xmlParser.getTasksForPost(departmentId, postId);
        } catch (error) {
            console.error('Error in getTasksForPost:', error);
            return [];
        }
    }
    createModal() {
        if (document.getElementById(this.modalId)) {
            return;
        }
        const modalHTML = `
            <div id="${this.modalId}" class="query-modal-details" style="display: none;">
                <div class="modal-details-overlay" id="${this.modalId}-overlay"></div>
                <div class="modal-details-content">
                    <div class="modal-details-header">
                        <h3>${this.translate('selectDept')}</h3>
                        <button class="modal-details-close" id="${this.modalId}-close">&times;</button>
                    </div>
                    <div class="modal-details-body" id="${this.modalId}-body">
                        <!-- Le contenu sera inséré ici -->
                    </div>
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
        if (modal) {
            modal.remove();
        }
        if (styles) {
            styles.remove();
        }
    }
    addModalStyles() {
        if (document.getElementById('query-modal-details-styles')) {
            return;
        }
        const styles = `
            <style id="query-details-styles">
                .query-modal-details {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    color:var(--text-primary);
                    background:var(--bg-primary);
                }
                .modal-details-overlay{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .modal-details-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80%;
                    max-width: 800px;
                    max-height: 90vh;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    color:var(--text-primary);
                    background:var(--bg-primary);
                }
                .modal-details-header {
                    padding: 16px 20px;
                    border-bottom: 1px solid #e0e0e0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color:var(--text-secondary);
                    background:var(--bg-secondary);
                }
                .modal-details-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: var(--text-primary);
                }
                .modal-details-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }
                .modal-details-close:hover {
                    background-color: #f5f5f5;
                    color: #333;
                }
                .modal-details-body {
                    padding: 0; /* Supprimé */
                    overflow: visible; /* Changé de auto à visible */
                    flex: 1;
                    color:var(--text-primary);
                    background:var(--bg-primary);
                }
                .modal-details-footer {
                    padding: 16px 20px;
                    border-top: 1px solid #e0e0e0;
                    text-align: right;
                    color:var(--text-secondary);
                    background:var(--bg-secondary);
                }
                .btn-close-modal-details {
                    padding: 8px 16px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .btn-close-modal-details:hover {
                    background-color: #0056b3;
                }
                .query-modal-details .department-details {
                    display: block;
                    border: none;
                    box-shadow: none;
                    max-height: none;
                }
                .query-modal-details .no-selection {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    text-align: center;
                    color:var(--text-primary);
                }
                .query-modal-details .no-selection-icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }
                /* AJOUT : Styles pour la structure scrollable */
                .department-details {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .dept-header {
                    flex-shrink: 0;
                    padding: 16px 20px;
                    background: var(--bg-secondary);
                    color: var(--text-secondary);
                }
                .detail-tabs {
                    flex-shrink: 0;
                    display: flex;
                    background: var(--bg-secondary);
                    padding: 0 20px;
                }
                .tab-content-container {
                    flex: 1;
                    overflow-y: auto;
                    min-height: 0; /* Important pour flexbox */
                    padding: 20px;
                }
                /* Pour le mode non-modal (panneau-documents) */
                #panneau-documents .department-details {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                #panneau-documents .tab-content-container {
                    flex: 1;
                    overflow-y: auto;
                    min-height: 0;
                }
                /* Assurer que le contenu modal-body ne défile pas */
                .query-modal-details- .modal-details-body {
                    overflow: visible;
                }
                /* Assurer que le contenu défile correctement dans le tab-content-container */
                .query-modal-details .tab-content-container {
                    max-height: 500px;
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
    updateLanguage() {
        const container = this.getContentContainer();
        if (!container) return;
        const noSelectionElement = container.querySelector('.no-selection p');
        if (noSelectionElement) {
            noSelectionElement.textContent = this.translate('noSelection');
        }
        const tabs = container.querySelectorAll('.tab-button');
        if (tabs.length >= 4) {
            tabs[0].textContent = this.translate('general');
            tabs[1].textContent = this.translate('posts');
            tabs[2].textContent = this.translate('tasks');
            tabs[3].textContent = this.translate('documents');
        }
        this.updateSectionTitles();
        const modalTitle = document.querySelector(`#${this.modalId} .modal-details-header h3`);
        if (modalTitle) {
            modalTitle.textContent = this.translate('selectDept');
        }
        const closeBtn = document.querySelector(`#${this.modalId} .btn-close-modal-details`);
        if (closeBtn) {
            closeBtn.textContent = this.translate('closeModal');
        }
        const deptDetails = container.querySelector('.department-details');
        if (deptDetails && deptDetails.style.display !== 'none') {
            const deptId = container.querySelector('#dept-acronym').textContent;
            if (deptId && deptId !== 'N/A') {
                const typeElement = container.querySelector('#dept-type');
                if (typeElement && !typeElement.querySelector('select')) {
                    const dept = this.xmlParser.getDepartement(deptId);
                    if (dept) {
                        typeElement.textContent = this.getTranslatedDepartmentType(dept.type) || this.translate('notSpecified');
                    }
                }
                this.showDepartmentDetailsId(deptId);
            }
        }
    }
    updateSectionTitles() {
        const container = this.getContentContainer();
        if (!container) return;
        const generalSectionTitles = container.querySelectorAll('#tab-general h5');
        if (generalSectionTitles.length >= 3) {
            generalSectionTitles[0].textContent = this.translate('abreviation');
            generalSectionTitles[1].textContent = this.translate('description');
            generalSectionTitles[2].textContent = this.translate('manager');
            generalSectionTitles[3].textContent = this.translate('notes');
        }
        const postsSectionTitle = container.querySelector('#tab-postes h5');
        if (postsSectionTitle) {
            const countSpan = postsSectionTitle.querySelector('.badge-count');
            const countText = countSpan ? countSpan.textContent : '';
            postsSectionTitle.innerHTML = `${this.translate('postsCount')} <span class="badge-count" id="postes-count">${countText}</span>`;
        }
        const tasksSectionTitle = container.querySelector('#tab-taches h5');
        if (tasksSectionTitle) {
            const countSpan = tasksSectionTitle.querySelector('.badge-count');
            const countText = countSpan ? countSpan.textContent : '';
            tasksSectionTitle.innerHTML = `${this.translate('tasksCount')} <span class="badge-count" id="taches-count">${countText}</span>`;
        }
        const docsSectionTitle = container.querySelector('#tab-documents h5');
        if (docsSectionTitle) {
            const countSpan = docsSectionTitle.querySelector('.badge-count');
            const countText = countSpan ? countSpan.textContent : '';
            docsSectionTitle.innerHTML = `${this.translate('documentsRegulations')} <span class="badge-count" id="documents-count">${countText}</span>`;
        }
    }
    translate(key) {
        return this.translations[this.lng][key] || key;
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
                <!-- En-tête du département (toujours visible) -->
                 <div class="dept-header" style="position: relative; padding-right: 120px;"> 
                    <h4 id="dept-name"></h4>
                    <div class="dept-meta">
                        <span class="dept-acronym" id="dept-acronym"></span>
                        <span class="dept-type" id="dept-type"></span>
                    </div>
                </div>
                <!-- Onglets (toujours visibles) -->
                <div class="detail-tabs">
                    <button class="tab-button active" data-tab="general">${this.translate('general')}</button>
                    <button class="tab-button" data-tab="postes">${this.translate('posts')}</button>
                    <button class="tab-button" data-tab="taches">${this.translate('tasks')}</button>
                    <button class="tab-button" data-tab="documents">${this.translate('documents')}</button>
                </div>
                <!-- Conteneur principal pour le contenu des onglets avec défilement -->
                <div class="tab-content-container">
                    <!-- Contenu des onglets -->
                    <div class="tab-content">
                        <!-- Onglet Général -->
                        <div id="tab-general" class="tab-pane active">
                            <div class="detail-section" id="abbreviation-section">
                                <h5>${this.translate('abbreviation')}</h5>
                                <div class="abbreviation-container">
                                    <span id="dept-abbreviation"></span>
                                    <div id="abbreviation-description"></div>
                                </div>
                            </div>
                            <div class="detail-section" id="description-section">
                                <h5>${this.translate('description')}</h5>
                                <p id="dept-description"></p>
                            </div>
                            <div class="detail-section"  id="manager-section">
                                <h5>${this.translate('manager')}</h5>
                                <p id="dept-responsable"></p>
                            </div>
                            <div class="detail-section" id="note-section">
                                <h5>${this.translate('notes')}</h5>
                                <p id="dept-note"></p>
                            </div>
                        </div>
                        <!-- Onglet Postes -->
                        <div id="tab-postes" class="tab-pane">
                            <div class="detail-section" id="postes-section">
                                <div class="detail-controls">
                                    <button class="toggle-all-btn" id="toggle-all-postes">${this.translate('showAll')}</button>
                                </div>
                                <h5>${this.translate('postsCount')} <span class="badge-count" id="postes-count"></span></h5>
                                <ul id="dept-postes" class="posts-list"></ul>
                            </div>
                        </div>
                        <!-- Onglet Tâches -->
                        <div id="tab-taches" class="tab-pane">
                            <div class="detail-section" id="taches-section">
                                <div class="detail-controls">
                                    <button class="toggle-all-btn" id="toggle-all-tasks">${this.translate('showAll')}</button>
                                </div>
                                <h5>${this.translate('tasksCount')} <span class="badge-count" id="taches-count"></span></h5>
                                <ul id="dept-taches" class="tasks-list"></ul>
                            </div>
                        </div>
                        <!-- Onglet Documents -->
                        <div id="tab-documents" class="tab-pane">
                            <div class="detail-section" id="documents-section">
                                <h5>${this.translate('documentsRegulations')} <span class="badge-count" id="documents-count"></span></h5>
                                <div id="dept-documents"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.initTabs();
        this.initDetailControls();
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
    initDetailControls() {
        const container = this.getContentContainer();
        const toggleAllPostesBtn = container.querySelector('#toggle-all-postes');
        if (toggleAllPostesBtn) {
            toggleAllPostesBtn.addEventListener('click', () => {
                const isCurrentlyHidden = toggleAllPostesBtn.textContent === this.translate('showAll');
                this.toggleAllItems('poste', isCurrentlyHidden);
                toggleAllPostesBtn.textContent = isCurrentlyHidden ?
                    this.translate('hideAll') : this.translate('showAll');
            });
        }
        const toggleAllTasksBtn = container.querySelector('#toggle-all-tasks');
        if (toggleAllTasksBtn) {
            toggleAllTasksBtn.addEventListener('click', () => {
                const isCurrentlyHidden = toggleAllTasksBtn.textContent === this.translate('showAll');
                this.toggleAllItems('task', isCurrentlyHidden);
                toggleAllTasksBtn.textContent = isCurrentlyHidden ?
                    this.translate('hideAll') : this.translate('showAll');
            });
        }
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
    showDepartmentDetails(department) {
        this.showDepartmentDetailsId(department.id);
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
        if (!data.postes) data.postes = [];
        if (!data.tasks) data.tasks = [];
        if (!data.fichiers) data.fichiers = [];
            const container = this.getContentContainer();
        if (window.editModeManager && window.editModeManager.isEditMode) {
            const dept = this.xmlParser.getDepartement(data.id);
            if (dept) {
                if (!dept.postes) dept.postes = [];
                if (!dept.tasks) dept.tasks = [];
                if (!dept.fichiers) dept.fichiers = [];
            }
        } else {
            container.removeAttribute('data-edit-mode');
        }
        container.querySelector('#dept-name').textContent = data.nom || this.translate('notSpecified');
        container.querySelector('#dept-acronym').textContent = data.id || 'N/A';
        const typeElement = container.querySelector('#dept-type');
        const translatedType = this.getTranslatedDepartmentType(data.type) || this.translate('notSpecified');
        typeElement.textContent = translatedType;
        const abbreviationSection = container.querySelector('#abbreviation-section');
        const abbreviationElement = container.querySelector('#dept-abbreviation');
        const abbreviationDescElement = container.querySelector('#abbreviation-description');
        if (data.abbreviation && data.abbreviation.trim()) {
            abbreviationElement.textContent = data.abbreviation;
           if (data.abbrev_details && data.abbrev_details.trim()) {
                abbreviationDescElement.textContent = data.abbrev_details;
                abbreviationDescElement.style.display = 'block';
            } else if (window.editModeManager && window.editModeManager.isEditMode) {
                abbreviationDescElement.textContent = this.translate('abbreviationDescriptionPlaceholder');
                abbreviationDescElement.style.color = '#999';
                abbreviationDescElement.style.fontStyle = 'italic';
            }
            abbreviationSection.style.display = 'block';
        } else {
            if (window.editModeManager && window.editModeManager.isEditMode) {
                abbreviationElement.textContent = this.translate('abbreviationPlaceholder');
                abbreviationElement.style.color = '#999';
                abbreviationElement.style.fontStyle = 'italic';
                abbreviationDescElement.style.display = 'none';
                abbreviationSection.style.display = 'block';
            } else {
                abbreviationSection.style.display = 'none';
            }
        }
        if (this.qcmGenerator)
            this.addQuizButton();
        this.addEditButton();
        this.resetControlButtons();
        container.querySelector('#dept-description').textContent = data.description || this.translate('noDescription');
        container.querySelector('#dept-responsable').textContent = data.responsable || this.translate('notSpecified');
        const noteSection = container.querySelector('#note-section');
        const noteElement = container.querySelector('#dept-note');
        if (data.note && data.note.trim()) {
            noteElement.textContent = data.note;
            noteElement.classList.remove('hidden-if-not-edit');
            noteSection.style.display = 'block';
        } else {
            if (window.editModeManager && window.editModeManager.isEditMode) {
                noteElement.textContent = "(Add note)";
                noteElement.classList.add('hidden-if-not-edit');
                noteSection.style.display = 'block';
            } else {
                noteSection.style.display = 'none';
            }
        }
        if (window.editModeManager && window.editModeManager.isEditMode) {
            this.makeElementEditable(container.querySelector('#dept-name'), 'dept', departmentId, 'nom');
            this.createSelectEditable(typeElement, 'dept', departmentId, 'type',this.getDepartmentTypeOptions());
            this.makeElementEditable(container.querySelector('#dept-description'), 'dept', departmentId, 'description', true);
            this.makeElementEditable(container.querySelector('#dept-responsable'), 'dept', departmentId, 'responsable');
            this.makeElementEditable(noteElement, 'dept', departmentId, 'note', true);
            this.makeElementEditable(abbreviationElement, 'dept', departmentId, 'abbreviation');
            if (abbreviationDescElement.textContent || abbreviationDescElement.style.display !== 'none') {
                abbreviationDescElement.style.display = 'block';
                this.makeElementEditable(abbreviationDescElement, 'dept', departmentId, 'abbrev_details', true);
            } else if (data.abbreviation && data.abbreviation.trim()) {
                abbreviationDescElement.textContent = this.translate('descriptionPlaceholder');
                abbreviationDescElement.style.display = 'block';
                abbreviationDescElement.style.color = '#999';
                abbreviationDescElement.style.fontStyle = 'italic';
                abbreviationDescElement.style.marginTop = '8px';
                this.makeElementEditable(abbreviationDescElement, 'dept', departmentId, 'abbrev_details', true);
            }
        }
        this.updateSectionTitles();
        this.preparePostesData(data);
        this.prepareTasksData(data);
        this.prepareDocumentsData(data);
        const departmentDetails = container.querySelector('.department-details');
        const noSelection = container.querySelector('.no-selection');
        if (departmentDetails && noSelection) {
            departmentDetails.style.display = 'block';
            noSelection.style.display = 'none';
        }
        if (this.bModal) {
            this.showModal();
        }
    }
    getDisplayValue(value, placeholder) {
        if (window.editModeManager && window.editModeManager.isEditMode) {
            return value && value.trim() ? value : placeholder;
        }
        return value && value.trim() ? value : '';
    }
    resetControlButtons() {
        const container = this.getContentContainer();
        const toggleAllPostesBtn = container.querySelector('#toggle-all-postes');
        const toggleAllTasksBtn = container.querySelector('#toggle-all-tasks');
        if (toggleAllPostesBtn) toggleAllPostesBtn.textContent = this.translate('showAll');
        if (toggleAllTasksBtn) toggleAllTasksBtn.textContent = this.translate('showAll');
    }
    toggleDetails(itemType, show) {
        const container = this.getContentContainer();
        const items = container.querySelectorAll(`.${itemType}-item`);
        items.forEach(item => {
            const idElement = item.querySelector(`.${itemType}-id`);
            if (idElement) {
                if (show) {
                    idElement.classList.add('visible');
                } else {
                    idElement.classList.remove('visible');
                }
            }
            if (itemType === 'task') {
                const metadataContainer = item.querySelector('.metadata-container');
                if (metadataContainer) {
                    if (show) {
                        metadataContainer.classList.add('visible');
                    } else {
                        metadataContainer.classList.remove('visible');
                    }
                }
            }
        });
    }
    toggleAllItems(itemType, show) {
        const container = this.getContentContainer();
        const items = container.querySelectorAll(`.${itemType}-item`);
        items.forEach(item => {
            const idElement = item.querySelector(`.${itemType}-id`);
            const descriptionElement = item.querySelector(`.${itemType}-description`);
            const metadataContainer = item.querySelector('.metadata-container');
            const associatedItems = item.querySelector('.associated-items');
            if (idElement) {
                if (show) {
                    idElement.classList.add('visible');
                } else {
                    idElement.classList.remove('visible');
                }
            }
            if (descriptionElement) {
                if (show) {
                    descriptionElement.style.display = 'block';
                } else {
                    descriptionElement.style.display = 'none';
                }
            }
            if (metadataContainer) {
                if (show) {
                    metadataContainer.classList.add('visible');
                } else {
                    metadataContainer.classList.remove('visible');
                }
            }
            if (associatedItems) {
                if (show) {
                    associatedItems.style.display = 'block';
                } else {
                    associatedItems.style.display = 'none';
                }
            }
        });
    }
    getDocumentsForPost(departmentId, postId) {
        if (!this.xmlParser) return [];
        try {
            return this.xmlParser.getDocumentsForPost(departmentId, postId);
        } catch (error) {
            console.error('Error in getDocumentsForPost:', error);
            return [];
        }
    }
    getDocumentsForTask(departmentId, taskId) {
        if (!this.xmlParser) return [];
        try {
            return this.xmlParser.getDocumentsForTask(departmentId, taskId);
        } catch (error) {
            console.error('Error in getDocumentsForTask:', error);
            return [];
        }
    }
    getPostsForDocument(departmentId, documentName) {
        if (!this.xmlParser) return [];
        try {
            return this.xmlParser.getPostsForDocument(departmentId, documentName);
        } catch (error) {
            console.error('Error in getPostsForDocument:', error);
            return [];
        }
    }
    getTasksForDocument(departmentId, documentName) {
        if (!this.xmlParser) return [];
        try {
            return this.xmlParser.getTasksForDocument(departmentId, documentName);
        } catch (error) {
            console.error('Error in getTasksForDocument:', error);
            return [];
        }
    }
    showLinkDocumentUI(deptId, posteId, btnElement) {
        const parent = btnElement.parentNode;
        const existingSelect = parent.querySelector('.link-doc-select');
        if (existingSelect) {
            existingSelect.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.xmlParser.getDepartement(deptId);
        if (!dept) return;
        const availableDocuments = this.xmlParser.getAvailableDocumentsForPoste(deptId, posteId);
        if (availableDocuments.length === 0) {
            alert("No available documents to link. Add documents first in the Documents tab.");
            return;
        }
        const select = document.createElement('select');
        select.className = 'link-doc-select';
        select.style.marginLeft = '10px';
        select.style.maxWidth = '200px';
        select.innerHTML = '<option value="">Select Document...</option>';
        availableDocuments.forEach(doc => {
            const displayName = doc.nom || doc.id;
            const type = doc.reglementation ? ' (Regulation)' : ' (Document)';
            select.innerHTML += `<option value="${doc.id}">${displayName}${type}</option>`;
        });
        btnElement.style.display = 'none';
        parent.appendChild(select);
        select.focus();
        const closeUI = () => {
            select.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('change', () => {
            if (select.value) {
                this.xmlParser.linkDocumentToPoste(deptId, posteId, select.value);
                this.showDepartmentDetailsId(deptId);
            } else {
                closeUI();
            }
        });
        select.addEventListener('blur', () => {
            setTimeout(closeUI, 200);
        });
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeUI();
            }
        });
    }    
    unlinkTaskFromPoste(departmentId, posteId, taskId) {
        if (!confirm(`${this.translate('confirmUnlinkTask') || 'Are you sure you want to unlink this task?'}`)) {
            return;
        }
        const success = this.xmlParser.unlinkPosteFromTask(departmentId, posteId, taskId);
        if (success) {
            this.showDepartmentDetailsId(departmentId);
            this.showNotification(this.translate('taskUnlinkedSuccess') || 'Task unlinked successfully', 'success');
        } else {
            this.showNotification(this.translate('unlinkTaskError') || 'Error unlinking task', 'error');
        }
    }
    applyEditableStyleToPageRef(element) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        element.style.cursor = 'text';
        element.style.padding = '2px 6px';
        element.style.borderRadius = '3px';
        element.style.border = '1px dashed transparent';
        element.style.transition = 'all 0.2s ease';
        element.style.display = 'inline-block';
    }
    showSelectPosteUI(departmentId) {
        const container = this.getContentContainer();
        const postesList = container.querySelector('#dept-postes');
        const addBtnContainer = postesList.querySelector('.add-item-container');
        if (!addBtnContainer) return;
        const existingUI = addBtnContainer.querySelector('.select-poste-ui');
        if (existingUI) {
            existingUI.remove();
            return;
        }
        const allDepartments = this.xmlParser.getOrganisation().departements || [];
        let allPostes = [];
        allDepartments.forEach(dept => {
            if (dept.postes && dept.postes.length > 0) {
                dept.postes.forEach(poste => {
                    allPostes.push({
                        ...poste,
                        deptId: dept.id,
                        deptName: dept.nom
                    });
                });
            }
        });
        const currentDept = this.xmlParser.getDepartement(departmentId);
        const currentPosteIds = currentDept.postes ? currentDept.postes.map(p => p.id) : [];
        const availablePostes = allPostes.filter(poste => !currentPosteIds.includes(poste.id));
        if (availablePostes.length === 0) {
            alert(this.translate('noPostsAvailable') || "No positions available to select from other departments.");
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'select-poste-ui';
        uiContainer.style.marginTop = '20px';
        uiContainer.style.padding = '20px';
        uiContainer.style.background = 'var(--bg-secondary)';
        uiContainer.style.borderRadius = '8px';
        uiContainer.style.border = '1px solid var(--border-color)';
        uiContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        uiContainer.style.maxWidth = '500px';
        uiContainer.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary); font-size: 16px;">
                    ${this.translate('selectPost') || 'Select Position'}
                </h4>
                <p style="margin: 0; color: var(--text-secondary); font-size: 14px;">
                    ${this.translate('selectPostDescription') || 'Select an existing position from any department to add to this department.'}
                </p>
            </div>
            <div style="margin-bottom: 15px;">
                <input type="text" 
                    id="filter-postes" 
                    placeholder="${this.translate('filterPostes') || 'Filter positions...'}" 
                    style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary); color: var(--text-primary);">
            </div>
            <div id="postes-list-container" style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary);">
                <div id="postes-list" style="padding: 10px;">
                    <!-- La liste des postes sera ajoutée ici dynamiquement -->
                </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;">
                <button id="cancel-select-poste" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    ${this.translate('cancel') || 'Cancel'}
                </button>
            </div>
        `;
        addBtnContainer.parentNode.insertBefore(uiContainer, addBtnContainer.nextSibling);
        this.populatePostesList(availablePostes, departmentId, uiContainer);
        const filterInput = uiContainer.querySelector('#filter-postes');
        filterInput.addEventListener('input', (e) => {
            this.filterPostesList(e.target.value.toLowerCase(), availablePostes, departmentId, uiContainer);
        });
        const cancelBtn = uiContainer.querySelector('#cancel-select-poste');
        cancelBtn.addEventListener('click', () => {
            uiContainer.remove();
        });
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target.id !== 'select-poste-btn') {
                    uiContainer.remove();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
        filterInput.focus();
    }
    populatePostesList(postes, departmentId, uiContainer) {
        const postesList = uiContainer.querySelector('#postes-list');
        postesList.innerHTML = '';
        if (postes.length === 0) {
            postesList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary); font-style: italic;">
                    ${this.translate('noPostsAvailable') || 'No positions available.'}
                </div>
            `;
            return;
        }
        const postesByDept = {};
        postes.forEach(poste => {
            if (!postesByDept[poste.deptId]) {
                postesByDept[poste.deptId] = {
                    deptName: poste.deptName,
                    postes: []
                };
            }
            postesByDept[poste.deptId].postes.push(poste);
        });
        Object.entries(postesByDept).forEach(([deptId, deptData]) => {
            const deptSection = document.createElement('div');
            deptSection.style.marginBottom = '15px';
            deptSection.innerHTML = `
                <div style="font-weight: 600; color: var(--brand); font-size: 14px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--border-color);">
                    📁 ${deptData.deptName}
                </div>
            `;
            const postesContainer = document.createElement('div');
            postesContainer.style.display = 'flex';
            postesContainer.style.flexDirection = 'column';
            postesContainer.style.gap = '8px';
            deptData.postes.forEach(poste => {
                const posteItem = document.createElement('div');
                posteItem.className = 'selectable-poste-item';
                posteItem.style.padding = '10px';
                posteItem.style.border = '1px solid var(--border-color)';
                posteItem.style.borderRadius = '6px';
                posteItem.style.background = 'var(--bg-secondary)';
                posteItem.style.cursor = 'pointer';
                posteItem.style.transition = 'all 0.2s';
                posteItem.style.display = 'flex';
                posteItem.style.justifyContent = 'space-between';
                posteItem.style.alignItems = 'center';
                posteItem.innerHTML = `
                    <div>
                        <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 4px;">
                            ${poste.nom || poste.id}
                            ${poste.abbreviation ? `<span style="font-size: 12px; color: var(--text-secondary); margin-left: 8px;">(${poste.abbreviation})</span>` : ''}
                        </div>
                        ${poste.description ? `<div style="font-size: 12px; color: var(--text-secondary);">${poste.description.substring(0, 60)}${poste.description.length > 60 ? '...' : ''}</div>` : ''}
                    </div>
                    <button class="select-this-poste-btn" 
                            data-poste-id="${poste.id}"
                            data-dept-id="${poste.deptId}"
                            style="padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        ${this.translate('select') || 'Select'}
                    </button>
                `;
                posteItem.addEventListener('mouseenter', () => {
                    posteItem.style.background = 'var(--bg-hover)';
                    posteItem.style.borderColor = 'var(--brand)';
                });
                posteItem.addEventListener('mouseleave', () => {
                    posteItem.style.background = 'var(--bg-secondary)';
                    posteItem.style.borderColor = 'var(--border-color)';
                });
                posteItem.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('select-this-poste-btn')) {
                        this.selectExistingPoste(departmentId, poste.deptId, poste.id, uiContainer);
                    }
                });
                postesContainer.appendChild(posteItem);
            });
            deptSection.appendChild(postesContainer);
            postesList.appendChild(deptSection);
        });
        postesList.querySelectorAll('.select-this-poste-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const posteId = btn.getAttribute('data-poste-id');
                const sourceDeptId = btn.getAttribute('data-dept-id');
                this.selectExistingPoste(departmentId, sourceDeptId, posteId, uiContainer);
            });
        });
    }
    filterPostesList(filterText, allPostes, departmentId, uiContainer) {
        if (!filterText) {
            this.populatePostesList(allPostes, departmentId, uiContainer);
            return;
        }
        const filteredPostes = allPostes.filter(poste => {
            return (
                (poste.nom && poste.nom.toLowerCase().includes(filterText)) ||
                (poste.id && poste.id.toLowerCase().includes(filterText)) ||
                (poste.abbreviation && poste.abbreviation.toLowerCase().includes(filterText)) ||
                (poste.description && poste.description.toLowerCase().includes(filterText)) ||
                (poste.deptName && poste.deptName.toLowerCase().includes(filterText))
            );
        });
        this.populatePostesList(filteredPostes, departmentId, uiContainer);
    }
    addPosteReferenceToDepartment(sourceDeptId, posteId, targetDeptId) {
        try {
            const sourceDept = this.departements.get(sourceDeptId);
            if (!sourceDept || !sourceDept.postes) return false;
            const sourcePoste = sourceDept.postes.find(p => p.id === posteId);
            if (!sourcePoste) return false;
            const targetDept = this.departements.get(targetDeptId);
            if (!targetDept) return false;
            if (!targetDept.postes) targetDept.postes = [];
            const alreadyExists = targetDept.postes.some(p => p.id === posteId);
            if (alreadyExists) {
                return false;
            }
            targetDept.postes.push(sourcePoste);
            if (!this.postesMap.has(posteId)) {
                this.postesMap.set(posteId, {
                    ...sourcePoste,
                    usageCount: 1,
                    departments: [sourceDeptId, targetDeptId]
                });
            } else {
                const posteInfo = this.postesMap.get(posteId);
                posteInfo.usageCount = (posteInfo.usageCount || 1) + 1;
                if (!posteInfo.departments.includes(targetDeptId)) {
                    posteInfo.departments.push(targetDeptId);
                }
            }
            if (window.editModeManager && window.editModeManager.isEditMode) {
                window.editModeManager.triggerAutoSave();
            }
            return true;
        } catch (error) {
            console.error('Error adding poste reference:', error);
            return false;
        }
    }
    selectExistingPoste(targetDeptId, sourceDeptId, posteId, uiContainer) {
        if (!confirm(this.translate('confirmAddPoste') || 'Add this position to the current department? The position will be shared between departments.')) {
            return;
        }
        try {
            const success = this.xmlParser.addPosteReferenceToDepartment(sourceDeptId, posteId, targetDeptId);
            if (success) {
                uiContainer.remove();
                this.showDepartmentDetailsId(targetDeptId);
                this.showNotification(this.translate('posteAddedSuccess') || 'Position added successfully!', 'success');
            } else {
                this.showNotification(this.translate('addPosteError') || 'Error adding position.', 'error');
            }
        } catch (error) {
            console.error('Error adding poste reference:', error);
            this.showNotification(this.translate('addPosteError') || 'Error adding position.', 'error');
        }
    }
    preparePostesData(data) {
        const container = this.getContentContainer();
        const postesList = container.querySelector('#dept-postes');
        const postesCount = container.querySelector('#postes-count');
        if (!postesList || !postesCount) return;
        const existingElements = Array.from(postesList.children);
        existingElements.forEach(element => {
            if (!element.classList.contains('add-item-container')) {
                element.remove();
            }
        });
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const existingAddBtn = postesList.querySelector('.add-item-container');
        if (!isEditMode && existingAddBtn) {
            existingAddBtn.remove();
        }
        if (isEditMode && !existingAddBtn) {
            const addBtnContainer = document.createElement('div');
            addBtnContainer.className = 'add-item-container';
            addBtnContainer.style.marginBottom = '20px';
            addBtnContainer.style.display = 'flex';
            addBtnContainer.style.gap = '10px';
            addBtnContainer.style.flexWrap = 'wrap';
            addBtnContainer.innerHTML = `
                <button class="btn-add-item" id="add-poste-btn" style="background: #667eea; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    + ${this.translate('addPost') || "Add Position"}
                </button>
                <button class="btn-add-item" id="select-poste-btn" style="background: #48bb78; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    📋 ${this.translate('selectPost') || "Select Position"}
                </button>
            `;
            addBtnContainer.querySelector('#add-poste-btn').addEventListener('click', () => {
                this.xmlParser.addPoste(data.id);
                this.showDepartmentDetailsId(data.id);
            });
            addBtnContainer.querySelector('#select-poste-btn').addEventListener('click', () => {
                this.showSelectPosteUI(data.id);
            });
            postesList.appendChild(addBtnContainer);
        }
        if (data.postes && data.postes.length > 0) {
            postesCount.textContent = data.postes.length;
            data.postes.forEach(poste => {
                const li = document.createElement('li');
                li.className = 'poste-item';
                const associatedTasks = this.getTasksForPost(data.id, poste.id);
                const associatedDocuments = this.getDocumentsForPost(data.id, poste.id);
                const documentsWithPageRef = associatedDocuments.map(doc => {
                    const pageRef = this.xmlParser.getPageReferenceForPosteDocument(data.id, poste.id, doc.id);
                    return {
                        ...doc,
                        page_reference: pageRef || ''
                    };
                });
                let tasksHTML = '';
                if (associatedTasks.length > 0) {
                    tasksHTML = `
                        <div class="associated-items associated-tasks" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedTasks')}:</strong>
                                <span class="badge-count small">${associatedTasks.length}</span>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="${this.translate('linkTask')}" onclick="event.stopPropagation(); window.app.queryDetails.showLinkTaskUI('${data.id}', '${poste.id}', this)">+</button>` : ''}
                            </div>
                            <div class="associated-tasks-container">
                                ${associatedTasks.map(task => {
                                    // Récupérer la description de l'association
                                    const associationDescription = this.xmlParser.getPosteTaskAssociationDescription(data.id, poste.id, task.id) || '';
                                    //
                                    return `
                                        <div class="associated-task-item">
                                            <div class="task-header-row">
                                                <div class="task-info">
                                                    <span class="task-name">${task.nom || task.id}</span>
                                                    ${task.categorie ? `<span class="task-category">${task.categorie}</span>` : ''}
                                                </div>
                                                ${isEditMode ?
                                                    `<button class="btn-unlink-task" 
                                                        title="${this.translate('unlinkTask')}"
                                                        onclick="event.stopPropagation(); window.app.queryDetails.unlinkTaskFromPoste('${data.id}', '${poste.id}', '${task.id}')">
                                                        🗑️
                                                    </button>` : ''}
                                            </div>
                                            ${task.description ? `<div class="task-description-small">${task.description}</div>` : ''}
                                            ${associationDescription ? `
                                                <div class="association-description" 
                                                    data-poste-id="${poste.id}"
                                                    data-task-id="${task.id}"
                                                    style="margin-top: 8px; padding: 8px; background: rgba(76, 175, 80, 0.1); border-radius: 4px; font-size: 13px; color: #333;">
                                                    <strong>📝 ${this.translate('descriptionAssociation') || 'Association Description'}:</strong>
                                                    <div style="margin-top: 4px;">${associationDescription}</div>
                                                    ${isEditMode ? 
                                                        `<button class="btn-edit-association-desc" 
                                                            style="margin-top: 4px; padding: 2px 6px; background: #667eea; color: white; border: none; border-radius: 3px; font-size: 12px; cursor: pointer;"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.editAssociationDescription('${data.id}', '${poste.id}', '${task.id}', this)">
                                                            ✏️ ${this.translate('editAssociationDescription') || 'Edit'}
                                                        </button>` 
                                                    : ''}
                                                </div>
                                            ` : isEditMode ? `
                                                <div class="association-description-empty" 
                                                    data-poste-id="${poste.id}"
                                                    data-task-id="${task.id}"
                                                    style="margin-top: 8px; padding: 8px; background: rgba(221, 221, 221, 0.3); border-radius: 4px; font-size: 13px; color: #666; font-style: italic;">
                                                    <button class="btn-add-association-desc" 
                                                        style="background: none; border: 1px dashed #999; color: #999; border-radius: 3px; padding: 2px 6px; font-size: 12px; cursor: pointer;"
                                                        onclick="event.stopPropagation(); window.app.queryDetails.editAssociationDescription('${data.id}', '${poste.id}', '${task.id}', this)">
                                                        + ${this.translate('addAssociationDescription') || 'Add description'}
                                                    </button>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    tasksHTML = `
                        <div class="associated-items associated-tasks" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedTasks')}:</strong>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="Link Task" onclick="event.stopPropagation(); window.app.queryDetails.showLinkTaskUI('${data.id}', '${poste.id}', this)">+</button>` : ''}
                            </div>
                            <div class="no-associated">${this.translate('noAssociatedTasks')}</div>
                        </div>
                    `;
                }
                let documentsHTML = '';
                if (documentsWithPageRef.length > 0) {
                    documentsHTML = `
                        <div class="associated-items associated-documents" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedDocuments')}:</strong>
                                <span class="badge-count small">${documentsWithPageRef.length}</span>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="Link Document" onclick="event.stopPropagation(); window.app.queryDetails.showLinkDocumentUI('${data.id}', '${poste.id}', this)">+</button>` : ''}
                            </div>
                            <div class="associated-documents-container">
                                ${documentsWithPageRef.map(doc => {
                                    const docLink = doc.lien ?
                                        `<a href="${doc.lien}" target="_blank" class="document-link-small">
                                            ${doc.nom || this.translate('documentName')}
                                        </a>` :
                                        `<span class="document-name-small">${doc.nom || this.translate('documentName')}</span>`;
                                    // Afficher la page_reference si elle existe
                                    const pageRefHTML = doc.page_reference ? `
                                        <div class="document-page-reference">
                                            <strong>${this.translate('page')}:</strong>
                                            <span class="page-ref-value" 
                                                data-document-id="${doc.id}"
                                                data-poste-id="${poste.id}"
                                                data-field="page_reference"
                                                style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                        padding: 2px 6px; 
                                                        border-radius: 3px;
                                                        ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                        transition: all 0.2s ease;">
                                                ${doc.page_reference}
                                            </span>
                                            ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                        </div>
                                    ` : isEditMode ? `
                                        <div class="document-page-reference">
                                            <strong>${this.translate('page')}:</strong>
                                            <span class="page-ref-value" 
                                                data-document-id="${doc.id}"
                                                data-poste-id="${poste.id}"
                                                data-field="page_reference"
                                                style="cursor: text; 
                                                        padding: 2px 6px; 
                                                        border-radius: 3px;
                                                        border: 1px dashed transparent;
                                                        color: #999;
                                                        font-style: italic;
                                                        transition: all 0.2s ease;">
                                                (Add page reference)
                                            </span>
                                            <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                        </div>
                                    ` : '';
                                    return `
                                        <div class="associated-document-item">
                                            <div class="document-info">
                                                ${docLink}
                                                ${doc.code ? `<span class="document-code">${doc.code}</span>` : ''}
                                                ${isEditMode ?
                                                    `<button class="btn-unlink-doc-post" 
                                                        title="${this.translate('unlinkDocument') || 'Unlink Document'}" 
                                                        onclick="event.stopPropagation(); window.app.queryDetails.unlinkDocumentFromPoste('${data.id}', '${poste.id}', '${doc.id}')">
                                                        🗑️
                                                    </button>`
                                                : ''}
                                            </div>
                                            ${doc.description ? `<div class="document-description-small">${doc.description}</div>` : ''}
                                            ${pageRefHTML}
                                            ${doc.reglementation ? `
                                                <div class="regulation-info">
                                                    <span class="regulation-badge">${this.translate('regulation')}: ${doc.reglementation}</span>
                                                    ${doc.regle_code ? `<span class="regulation-code">${doc.regle_code}</span>` : ''}
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    documentsHTML = `
                        <div class="associated-items associated-documents" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedDocuments')}:</strong>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="Link Document" onclick="event.stopPropagation(); window.app.queryDetails.showLinkDocumentUI('${data.id}', '${poste.id}', this)">+</button>` : ''}
                            </div>
                            <div class="no-associated">${this.translate('noAssociatedDocuments')}</div>
                        </div>
                    `;
                }
                const hasDescription = poste.description && poste.description.trim() !== '';
                const descriptionHTML = `
                    <div class="poste-description" style="display: none;" data-field="description">
                        ${hasDescription ? poste.description : ''}
                    </div>
                `;
                const hasAbbreviation = poste.abbreviation && poste.abbreviation.trim() !== '';
                let abbreviationHTML = '';
                if (hasAbbreviation) {
                    abbreviationHTML = `<span class="poste-abbr${isEditMode ? ' editable-field' : ''}" data-field="abbreviation">${poste.abbreviation}</span>`;
                } else if (isEditMode) {
                    abbreviationHTML = `<span class="poste-abbr editable-field" data-field="abbreviation" style="color:#999;font-style:italic;">${this.translate('abbreviationPlaceholder')}</span>`;
                }
                const hasAbbrevDesc = poste.abbrev_desc && poste.abbrev_desc.trim() !== '';
                let abbrevDescHTML = '';
                if (hasAbbrevDesc) {
                    abbrevDescHTML = `<div class="poste-abbrev-desc" style="display: none;" data-field="abbrev_desc">${poste.abbrev_desc}</div>`;
                } else if (isEditMode) {
                    abbrevDescHTML = `<div class="poste-abbrev-desc" style="display: none; color:#999; font-style:italic;" data-field="abbrev_desc">${this.translate('abbrevDescPlaceholder')}</div>`;
                }
                const usageCount = this.xmlParser.getPosteUsageCount(poste.id) || 0;
                const usageIndicator = usageCount > 1 ? `<span class="usage-badge" title="${this.translate('usedInMultipleDepts') || 'Used in'} ${usageCount} ${this.translate('departments') || 'departments'}">${usageCount}×</span>` : '';
                li.innerHTML = `
                    <div class="poste-header clickable">
                        <div class="poste-title" style="cursor: pointer;">
                            <span class="toggle-indicator">▼</span>
                            <strong>${poste.nom || this.translate('postName')}</strong>
                            ${usageIndicator}
                            ${abbreviationHTML}
                            ${documentsWithPageRef.length > 0 ? `<span class="doc-badge" title="${documentsWithPageRef.length} ${this.translate('associatedDocuments')}">📄 ${documentsWithPageRef.length}</span>` : ''}
                            ${associatedTasks.length > 0 ? `<span class="tasks-badge" title="${associatedTasks.length} ${this.translate('associatedTasks')}">📋 ${associatedTasks.length}</span>` : ''}
                        </div>
                    </div>
                    ${descriptionHTML}
                    ${abbrevDescHTML}
                    ${tasksHTML}
                    ${documentsHTML}
                `;
                const posteTitle = li.querySelector('.poste-title');
                const descriptionElement = li.querySelector('.poste-description');
                const associatedTasksElement = li.querySelector('.associated-items.associated-tasks');
                const associatedDocumentsElement = li.querySelector('.associated-items.associated-documents');
                const toggleIndicator = li.querySelector('.toggle-indicator');
                if (isEditMode) {
                    const deleteBtn = document.createElement('span');
                    deleteBtn.className = 'btn-delete-item';
                    deleteBtn.innerHTML = '🗑️';
                    deleteBtn.title = "Delete Post";
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (confirm(`Delete post "${poste.nom}"?`)) {
                            this.xmlParser.deletePoste(data.id, poste.id);
                            this.showDepartmentDetailsId(data.id);
                        }
                    });
                    li.querySelector('.poste-header').appendChild(deleteBtn);
                }
                posteTitle.addEventListener('click', (e) => {
                    if (e && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.classList.contains('page-ref-value'))) return;
                    const descriptionElement = li.querySelector('.poste-description');
                    const abbrevDescElement = li.querySelector('.poste-abbrev-desc');
                    const associatedTasksElement = li.querySelector('.associated-items.associated-tasks');
                    const associatedDocumentsElement = li.querySelector('.associated-items.associated-documents');
                    const toggleIndicator = li.querySelector('.toggle-indicator');
                    let isCurrentlyOpen = false;
                    if (descriptionElement && descriptionElement.style.display && descriptionElement.style.display !== 'none') isCurrentlyOpen = true;
                    if (abbrevDescElement && abbrevDescElement.style.display && abbrevDescElement.style.display !== 'none') isCurrentlyOpen = true;
                    if (associatedTasksElement && associatedTasksElement.style.display && associatedTasksElement.style.display !== 'none') isCurrentlyOpen = true;
                    if (associatedDocumentsElement && associatedDocumentsElement.style.display && associatedDocumentsElement.style.display !== 'none') isCurrentlyOpen = true;
                    const newState = isCurrentlyOpen ? 'none' : 'block';
                    if (descriptionElement) {
                        descriptionElement.style.display = newState;
                    }
                    if (abbrevDescElement) {
                        abbrevDescElement.style.display = newState;
                    }
                    if (associatedTasksElement) {
                        associatedTasksElement.style.display = newState;
                    }
                    if (associatedDocumentsElement) {
                        associatedDocumentsElement.style.display = newState;
                    }
                    if (toggleIndicator) {
                        toggleIndicator.textContent = isCurrentlyOpen ? '▼' : '▲';
                    }
                });
                if (isEditMode) {
                    this.makeElementEditable(li.querySelector('.poste-title strong'), 'poste', poste.id, 'nom');
                    const descriptionElement = li.querySelector('.poste-description');
                    if (descriptionElement) {
                        if (!hasDescription) {
                            descriptionElement.textContent = '(Add post description)';
                            descriptionElement.style.color = '#999';
                            descriptionElement.style.fontStyle = 'italic';
                        }
                        this.makeElementEditable(descriptionElement, 'poste', poste.id, 'description', true);
                    }
                    const abbrevElement = li.querySelector('.poste-abbr[data-field="abbreviation"]');
                    if (abbrevElement) {
                        this.makeElementEditable(abbrevElement, 'poste', poste.id, 'abbreviation');
                    }
                    const abbrevDescElement = li.querySelector('.poste-abbrev-desc[data-field="abbrev_desc"]');
                    if (abbrevDescElement) {
                        this.makeElementEditable(abbrevDescElement, 'poste', poste.id, 'abbrev_desc', true);
                    }
                    li.querySelectorAll('.page-ref-value').forEach(pageRefElement => {
                        const documentId = pageRefElement.getAttribute('data-document-id');
                        const posteId = pageRefElement.getAttribute('data-poste-id');
                        const field = pageRefElement.getAttribute('data-field');
                        pageRefElement.addEventListener('click', (e) => {
                            if (!window.editModeManager || !window.editModeManager.isEditMode) return;
                            e.stopPropagation();
                            if (pageRefElement.querySelector('input')) return;
                            const originalValue = pageRefElement.textContent.trim();
                            const isPlaceholder = originalValue === '(Add page reference)';
                            const actualValue = isPlaceholder ? '' : originalValue;
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = actualValue;
                            input.className = 'inline-page-ref-input';
                            input.style.width = '100%';
                            input.style.padding = '2px 6px';
                            input.style.border = '2px solid #4CAF50';
                            input.style.borderRadius = '4px';
                            input.style.outline = 'none';
                            input.style.boxSizing = 'border-box';
                            input.style.fontFamily = 'inherit';
                            input.style.fontSize = 'inherit';
                            input.style.backgroundColor = 'white';
                            input.style.boxShadow = '0 2px 4px rgba(76, 175, 80, 0.2)';
                            const originalHTML = pageRefElement.innerHTML;
                            pageRefElement.innerHTML = '';
                            pageRefElement.style.padding = '0';
                            pageRefElement.style.border = 'none';
                            pageRefElement.appendChild(input);
                            input.focus();
                            input.select();
                            const saveAction = () => {
                                const newValue = input.value.trim();
                                pageRefElement.innerHTML = '';
                                if (newValue !== actualValue) {
                                    pageRefElement.textContent = newValue;
                                    this.xmlParser.updatePosteDocumentPageReference(data.id, posteId, documentId, newValue);
                                    if (newValue === '') {
                                        pageRefElement.textContent = '(Add page reference)';
                                        pageRefElement.style.color = '#999';
                                        pageRefElement.style.fontStyle = 'italic';
                                    } else {
                                        pageRefElement.style.color = '';
                                        pageRefElement.style.fontStyle = '';
                                    }
                                } else {
                                    if (isPlaceholder) {
                                        pageRefElement.textContent = '(Add page reference)';
                                        pageRefElement.style.color = '#999';
                                        pageRefElement.style.fontStyle = 'italic';
                                    } else {
                                        pageRefElement.innerHTML = originalHTML;
                                    }
                                }
                                this.applyEditableStyleToPageRef(pageRefElement);
                            };
                            const cancelAction = () => {
                                pageRefElement.innerHTML = originalHTML;
                                this.applyEditableStyleToPageRef(pageRefElement);
                            };
                            input.addEventListener('blur', () => {
                                setTimeout(saveAction, 100);
                            });
                            input.addEventListener('keydown', (ke) => {
                                if (ke.key === 'Enter') {
                                    ke.preventDefault();
                                    saveAction();
                                }
                                if (ke.key === 'Escape') {
                                    ke.preventDefault();
                                    cancelAction();
                                }
                            });
                        });
                        pageRefElement.addEventListener('mouseenter', () => {
                            if (!pageRefElement.querySelector('input')) {
                                pageRefElement.style.border = '1px dashed #4CAF50';
                                pageRefElement.style.background = 'rgba(76, 175, 80, 0.05)';
                            }
                        });
                        pageRefElement.addEventListener('mouseleave', () => {
                            if (!pageRefElement.querySelector('input')) {
                                pageRefElement.style.border = '1px dashed transparent';
                                pageRefElement.style.background = 'transparent';
                            }
                        });
                    });
                }
                const addBtnContainer = postesList.querySelector('.add-item-container');
                if (addBtnContainer) {
                    postesList.insertBefore(li, addBtnContainer.nextSibling);
                } else {
                    postesList.appendChild(li);
                }
            });
        } else {
            postesCount.textContent = '0';
            const noDataLi = document.createElement('li');
            noDataLi.className = 'no-data';
            noDataLi.textContent = this.translate('noPosts');
            const addBtnContainer = postesList.querySelector('.add-item-container');
            if (addBtnContainer) {
                postesList.insertBefore(noDataLi, addBtnContainer.nextSibling);
            } else {
                postesList.appendChild(noDataLi);
            }
        }
    }
    unlinkDocumentFromPoste(departmentId, posteId, documentId) {
        if (!confirm(`${this.translate('confirmUnlinkDocument') || 'Are you sure you want to unlink this document?'}`)) {
            return;
        }
        const success = this.xmlParser.unlinkDocumentFromPoste(departmentId, posteId, documentId);
        if (success) {
            this.showDepartmentDetailsId(departmentId);
            this.showNotification(this.translate('documentUnlinkedSuccess') || 'Document unlinked successfully');
        } else {
            this.showNotification(this.translate('unlinkError') || 'Error unlinking document');
        }
    }
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.background = type === 'error' ? '#f44336' : '#4CAF50';
        notification.style.color = 'white';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        notification.style.zIndex = '9999';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = '500';
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    unlinkDocumentFromTask(departmentId, taskId, documentId) {
        if (!confirm(`${this.translate('confirmUnlinkDocument') || 'Are you sure you want to unlink this document?'}`)) {
            return;
        }
        const success = this.xmlParser.unlinkDocumentFromTask(departmentId, taskId, documentId);
        if (success) {
            this.showDepartmentDetailsId(departmentId);
            this.showNotification(this.translate('documentUnlinkedSuccess') || 'Document unlinked successfully');
        } else {
            this.showNotification(this.translate('unlinkError') || 'Error unlinking document');
        }
    }    
    unlinkPosteFromTask(departmentId, posteId, taskId) {
        this.unlinkTaskFromPoste(departmentId, posteId, taskId);
    }
    showLinkDocumentToTaskUI(departmentId, taskId, btnElement) {
        const parent = btnElement.parentNode;
        const existingUI = parent.querySelector('.link-doc-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        const linkedDocuments = this.getDocumentsForTask(departmentId, taskId);
        const linkedDocumentIds = linkedDocuments.map(doc => doc.id);
        const allDepartmentDocuments = dept.fichiers || [];
        const availableDocuments = allDepartmentDocuments.filter(doc => 
            !linkedDocumentIds.includes(doc.id)
        );
        if (availableDocuments.length === 0) {
            alert(this.translate('noDocumentsAvailable') || "No documents available to link. Add documents first in the Documents tab.");
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'link-doc-ui-container';
        uiContainer.style.display = 'flex';
        uiContainer.style.gap = '8px';
        uiContainer.style.marginLeft = '10px';
        uiContainer.style.alignItems = 'center';
        uiContainer.style.flexWrap = 'wrap';
        uiContainer.style.maxWidth = '400px';
        const select = document.createElement('select');
        select.className = 'link-doc-select';
        select.style.flex = '1';
        select.style.minWidth = '200px';
        select.style.padding = '6px 10px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.background = 'var(--bg-primary)';
        select.style.color = 'var(--text-primary)';
        select.style.fontSize = '14px';
        select.innerHTML = `
            <option value="">${this.translate('selectDocument') || 'Select Document...'}</option>
            <optgroup label="${this.translate('documents') || 'Documents'}">
        `;
        const documents = availableDocuments.filter(doc => !doc.reglementation);
        const regulations = availableDocuments.filter(doc => doc.reglementation);
        documents.forEach(doc => {
            const displayName = doc.nom || doc.id;
            select.innerHTML += `<option value="${doc.id}">📄 ${displayName}</option>`;
        });
        if (regulations.length > 0) {
            select.innerHTML += `</optgroup><optgroup label="${this.translate('regulations') || 'Regulations'}">`;
            regulations.forEach(reg => {
                const displayName = reg.nom || reg.id;
                const regName = reg.reglementation ? ` (${reg.reglementation})` : '';
                select.innerHTML += `<option value="${reg.id}">⚖️ ${displayName}${regName}</option>`;
            });
        }
        select.innerHTML += '</optgroup>';
        const linkButton = document.createElement('button');
        linkButton.textContent = this.translate('link') || 'Link';
        linkButton.className = 'btn-link-doc-confirm';
        linkButton.style.padding = '6px 12px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = '×';
        cancelButton.className = 'btn-link-doc-cancel';
        cancelButton.style.padding = '6px 10px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '16px';
        cancelButton.style.lineHeight = '1';
        uiContainer.appendChild(select);
        uiContainer.appendChild(linkButton);
        uiContainer.appendChild(cancelButton);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkDocument = () => {
            if (select.value) {
                const success = this.xmlParser.linkDocumentToTask(departmentId, taskId, select.value);
                if (success) {
                    this.showDepartmentDetailsId(departmentId);
                    this.showNotification(this.translate('documentLinkedSuccess') || 'Document linked successfully', 'success');
                } else {
                    this.showNotification(this.translate('linkDocumentError') || 'Error linking document', 'error');
                }
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') linkDocument();
            if (e.key === 'Escape') closeUI();
        });
        linkButton.addEventListener('click', linkDocument);
        cancelButton.addEventListener('click', closeUI);
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target !== btnElement) {
                    closeUI();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    prepareTasksData(data) {
        const container = this.getContentContainer();
        const tasksList = container.querySelector('#dept-taches');
        const tasksCount = container.querySelector('#taches-count');
        if (!tasksList || !tasksCount) return;
        const existingElements = Array.from(tasksList.children);
        existingElements.forEach(element => {
            if (!element.classList.contains('add-item-container')) {
                element.remove();
            }
        });
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const existingAddBtn = tasksList.querySelector('.add-item-container');
        if (!isEditMode && existingAddBtn) {
            existingAddBtn.remove();
        }
        if (isEditMode && !existingAddBtn) {
            const addBtnContainer = document.createElement('div');
            addBtnContainer.className = 'add-item-container';
            addBtnContainer.innerHTML = `<button class="btn-add-item">+ ${this.translate('addTask') || "Add Task"}</button>`;
            addBtnContainer.querySelector('button').addEventListener('click', () => {
                this.xmlParser.addTask(data.id);
                this.showDepartmentDetailsId(data.id);
            });
            tasksList.appendChild(addBtnContainer);
        }
        if (data.tasks && data.tasks.length > 0) {
            tasksCount.textContent = data.tasks.length;
            const sortedTasks = [...data.tasks].sort((a, b) => {
                const orderA = parseInt(a.order) || 0;
                const orderB = parseInt(b.order) || 0;
                return orderA - orderB;
            });
            sortedTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = 'task-item';
                const associatedPosts = this.getPostsForTask(data.id, task.id);
                const associatedDocuments = this.getDocumentsForTask(data.id, task.id);
                const documentsWithPageRef = associatedDocuments.map(doc => {
                    const pageRef = this.xmlParser.getPageReferenceForTaskDocument(data.id, task.id, doc.id);
                    return {
                        ...doc,
                        page_reference: pageRef || ''
                    };
                });
                let metadataHTML = '';
                const metadataItems = [];
                Object.entries(task).forEach(([key, value]) => {
                    if (key.startsWith('key-') && value) {
                        const cleanKey = key.replace('key-', '').replace(/_/g, ' ');
                        metadataItems.push(`<div class="metadata-item"><strong>${cleanKey}:</strong> ${value}</div>`);
                    }
                });
                if (metadataItems.length > 0) {
                    metadataHTML = `
                        <div class="metadata-container" style="display: none;">
                            <div class="metadata-title">${this.translate('metadata')}</div>
                            ${metadataItems.join('')}
                        </div>
                    `;
                }
                const descriptionHTML = `<div class="task-description" style="display: none;" data-field="description">${task.description || ''}</div>`;
                let categoryBadgeHTML = '';
                const hasCategory = task.categorie && task.categorie.trim() !== '';
                if (hasCategory) {
                    categoryBadgeHTML = `<span class="task-category-badge" data-field="categorie">${task.categorie}</span>`;
                } else if (isEditMode) {
                    categoryBadgeHTML = `<span class="task-category-badge" data-field="categorie" style="color:#999;font-style:italic;">(Add category)</span>`;
                }
                let postsHTML = '';
                if (associatedPosts.length > 0) {
                    postsHTML = `
                        <div class="associated-items associated-posts" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedPosts')}:</strong>
                                <span class="badge-count small">${associatedPosts.length}</span>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="${this.translate('linkPost')}" onclick="event.stopPropagation(); window.app.queryDetails.showLinkPosteUI('${data.id}', '${task.id}', this)">+</button>` : ''}
                            </div>
                            <div class="associated-posts-container">
                                ${associatedPosts.map(post => {
                                    // Récupérer la description de l'association
                                    const associationDescription = this.xmlParser.getPosteTaskAssociationDescription(data.id, post.id, task.id) || '';
                                    return `
                                        <div class="associated-post-item">
                                            <div class="post-header-row">
                                                <div class="post-info">
                                                    <span class="post-name">${post.nom || post.id}</span>
                                                    ${post.abbreviation ? `<span class="post-abbr">${post.abbreviation}</span>` : ''}
                                                </div>
                                                ${isEditMode ?
                                                    `<button class="btn-unlink-post" 
                                                        title="${this.translate('unlinkPost')}"
                                                        onclick="event.stopPropagation(); window.app.queryDetails.unlinkPosteFromTask('${data.id}', '${post.id}', '${task.id}')">
                                                        🗑️
                                                    </button>` : ''}
                                            </div>
                                            ${post.description ? `<div class="post-description-small">${post.description}</div>` : ''}
                                            ${associationDescription ? `
                                                <div class="association-description" 
                                                    data-poste-id="${post.id}"
                                                    data-task-id="${task.id}"
                                                    style="margin-top: 8px; padding: 8px; background: rgba(76, 175, 80, 0.1); border-radius: 4px; font-size: 13px; color: #333;">
                                                    <strong>📝 ${this.translate('descriptionAssociation') || 'Association Description'}:</strong>
                                                    <div style="margin-top: 4px;">${associationDescription}</div>
                                                    ${isEditMode ? 
                                                        `<button class="btn-edit-association-desc" 
                                                            style="margin-top: 4px; padding: 2px 6px; background: #667eea; color: white; border: none; border-radius: 3px; font-size: 12px; cursor: pointer;"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.editAssociationDescription('${data.id}', '${post.id}', '${task.id}', this)">
                                                            ✏️ ${this.translate('editAssociationDescription') || 'Edit'}
                                                        </button>` 
                                                    : ''}
                                                </div>
                                            ` : isEditMode ? `
                                                <div class="association-description-empty" 
                                                    data-poste-id="${post.id}"
                                                    data-task-id="${task.id}"
                                                    style="margin-top: 8px; padding: 8px; background: rgba(221, 221, 221, 0.3); border-radius: 4px; font-size: 13px; color: #666; font-style: italic;">
                                                    <button class="btn-add-association-desc" 
                                                        style="background: none; border: 1px dashed #999; color: #999; border-radius: 3px; padding: 2px 6px; font-size: 12px; cursor: pointer;"
                                                        onclick="event.stopPropagation(); window.app.queryDetails.editAssociationDescription('${data.id}', '${post.id}', '${task.id}', this)">
                                                        + ${this.translate('addAssociationDescription') || 'Add description'}
                                                    </button>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    postsHTML = `
                        <div class="associated-items associated-posts" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedPosts')}:</strong>
                                ${(window.editModeManager && window.editModeManager.isEditMode) ?
                                    `<button class="btn-link-item" title="Link Post" onclick="event.stopPropagation(); window.app.queryDetails.showLinkPosteUI('${data.id}', '${task.id}', this)">+</button>` : ''}
                            </div>
                            <div class="no-associated">${this.translate('noAssociatedPosts')}</div>
                        </div>
                    `;
                }
                let documentsHTML = '';
                if (documentsWithPageRef.length > 0) {
                    documentsHTML = `
                        <div class="associated-items associated-documents" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedDocuments')}:</strong>
                                <span class="badge-count small">${documentsWithPageRef.length}</span>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="${this.translate('linkDocument')}" onclick="event.stopPropagation(); window.app.queryDetails.showLinkDocumentToTaskUI('${data.id}', '${task.id}', this)">+</button>` : ''}
                            </div>
                            <div class="associated-documents-container">
                                ${documentsWithPageRef.map(doc => {
                                    const docLink = doc.lien ?
                                        `<a href="${doc.lien}" target="_blank" class="document-link-small">
                                            ${doc.nom || this.translate('documentName')}
                                        </a>` :
                                        `<span class="document-name-small">${doc.nom || this.translate('documentName')}</span>`;
                                    // Afficher la page_reference si elle existe
                                    const pageRefHTML = doc.page_reference ? `
                                        <div class="document-page-reference">
                                            <strong>${this.translate('page')}:</strong>
                                            <span class="page-ref-value" 
                                                data-document-id="${doc.id}"
                                                data-task-id="${task.id}"
                                                data-field="page_reference"
                                                style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                        padding: 2px 6px; 
                                                        border-radius: 3px;
                                                        ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                        transition: all 0.2s ease;">
                                                ${doc.page_reference}
                                            </span>
                                            ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                        </div>
                                    ` : isEditMode ? `
                                        <div class="document-page-reference">
                                            <strong>${this.translate('page')}:</strong>
                                            <span class="page-ref-value" 
                                                data-document-id="${doc.id}"
                                                data-task-id="${task.id}"
                                                data-field="page_reference"
                                                style="cursor: text; 
                                                        padding: 2px 6px; 
                                                        border-radius: 3px;
                                                        border: 1px dashed transparent;
                                                        color: #999;
                                                        font-style: italic;
                                                        transition: all 0.2s ease;">
                                                (Add page reference)
                                            </span>
                                            <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                        </div>
                                    ` : '';
                                    return `
                                        <div class="associated-document-item">
                                            <div class="document-header-row">
                                                <div class="document-info">
                                                    ${docLink}
                                                    ${doc.code ? `<span class="document-code">${doc.code}</span>` : ''}
                                                    ${doc.reglementation ? `<span class="regulation-badge-small">${this.translate('regulation')}</span>` : ''}
                                                    ${isEditMode ?
                                                        `<button class="btn-unlink-doc" 
                                                            title="${this.translate('unlinkDocument')}"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.unlinkDocumentFromTask('${data.id}', '${task.id}', '${doc.id}')">
                                                            🗑️
                                                        </button>` : ''}
                                                </div>
                                            </div>
                                            ${doc.description ? `<div class="document-description-small">${doc.description}</div>` : ''}
                                            ${pageRefHTML}
                                            ${doc.reglementation ? `
                                                <div class="regulation-details">
                                                    <div class="regulation-name">${doc.reglementation}</div>
                                                    ${doc.regle_code ? `<div class="regulation-code">${this.translate('code')}: ${doc.regle_code}</div>` : ''}
                                                    ${doc.regle_titre ? `<div class="regulation-title">${doc.regle_titre}</div>` : ''}
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                } else {
                    documentsHTML = `
                        <div class="associated-items associated-documents" style="display: none;">
                            <div class="associated-title">
                                <strong>${this.translate('associatedDocuments')}:</strong>
                                ${isEditMode ?
                                    `<button class="btn-link-item" title="${this.translate('linkDocument')}" onclick="event.stopPropagation(); window.app.queryDetails.showLinkDocumentToTaskUI('${data.id}', '${task.id}', this)">+</button>` : ''}
                            </div>
                            <div class="no-associated">${this.translate('noAssociatedDocuments')}</div>
                        </div>
                    `;
                }
                li.innerHTML = `
                    <div class="task-header">
                        <div class="task-title clickable" style="cursor: pointer;">
                            <span class="toggle-indicator">▼</span>
                            <strong>${task.nom || this.translate('taskName')}</strong>
                            ${categoryBadgeHTML}
                            ${documentsWithPageRef.length > 0 ? `<span class="doc-badge" title="${documentsWithPageRef.length} ${this.translate('associatedDocuments')}">📄 ${documentsWithPageRef.length}</span>` : ''}
                            ${associatedPosts.length > 0 ? `<span class="posts-badge" title="${associatedPosts.length} ${this.translate('associatedPosts')}">👤 ${associatedPosts.length}</span>` : ''}
                        </div>
                    </div>
                    ${metadataHTML}
                    ${descriptionHTML}
                    ${postsHTML}
                    ${documentsHTML}
                `;
                const taskTitle = li.querySelector('.task-title');
                const descriptionElement = li.querySelector('.task-description');
                const metadataContainer = li.querySelector('.metadata-container');
                const associatedPostsElement = li.querySelector('.associated-items.associated-posts');
                const associatedDocumentsElement = li.querySelector('.associated-items.associated-documents');
                const toggleIndicator = li.querySelector('.toggle-indicator');
                if (isEditMode) {
                    const deleteBtn = document.createElement('span');
                    deleteBtn.className = 'btn-delete-item';
                    deleteBtn.innerHTML = '🗑️';
                    deleteBtn.title = "Delete Task";
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (confirm(`Delete task "${task.nom}"?`)) {
                            this.xmlParser.deleteTask(data.id, task.id);
                            this.showDepartmentDetailsId(data.id);
                        }
                    });
                    li.querySelector('.task-header').appendChild(deleteBtn);
                }
                taskTitle.addEventListener('click', (e) => {
                    if (e && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.classList.contains('page-ref-value'))) return;
                    const descriptionElement = li.querySelector('.task-description');
                    let isCurrentlyOpen = false;
                    if (descriptionElement && descriptionElement.style.display && descriptionElement.style.display !== 'none') isCurrentlyOpen = true;
                    if (metadataContainer && metadataContainer.style.display && metadataContainer.style.display !== 'none') isCurrentlyOpen = true;
                    if (associatedPostsElement && associatedPostsElement.style.display && associatedPostsElement.style.display !== 'none') isCurrentlyOpen = true;
                    if (associatedDocumentsElement && associatedDocumentsElement.style.display && associatedDocumentsElement.style.display !== 'none') isCurrentlyOpen = true;
                    const newState = isCurrentlyOpen ? 'none' : 'block';
                    if (descriptionElement) {
                        descriptionElement.style.display = newState;
                    }
                    if (metadataContainer) {
                        metadataContainer.style.display = newState;
                    }
                    if (associatedPostsElement) {
                        associatedPostsElement.style.display = newState;
                    }
                    if (associatedDocumentsElement) {
                        associatedDocumentsElement.style.display = newState;
                    }
                    if (toggleIndicator) {
                        toggleIndicator.textContent = isCurrentlyOpen ? '▼' : '▲';
                    }
                });
                if (isEditMode) {
                    this.makeElementEditable(li.querySelector('.task-title strong'), 'task', task.id, 'nom');
                    const descriptionElement = li.querySelector('.task-description');
                    if (descriptionElement) {
                        if (!task.description || task.description.trim() === '') {
                            descriptionElement.textContent = '(Add task description)';
                            descriptionElement.style.color = '#999';
                            descriptionElement.style.fontStyle = 'italic';
                        }
                        this.makeElementEditable(descriptionElement, 'task', task.id, 'description', true);
                    }
                    const categoryElement = li.querySelector('.task-category-badge');
                    if (categoryElement) {
                        if (!task.categorie || task.categorie.trim() === '') {
                            categoryElement.textContent = '(Add category)';
                            categoryElement.style.color = '#999';
                            categoryElement.style.fontStyle = 'italic';
                        }
                        this.makeElementEditable(categoryElement, 'task', task.id, 'categorie');
                    }
                    li.querySelectorAll('.page-ref-value[data-task-id]').forEach(pageRefElement => {
                        const documentId = pageRefElement.getAttribute('data-document-id');
                        const taskId = pageRefElement.getAttribute('data-task-id');
                        const field = pageRefElement.getAttribute('data-field');
                        pageRefElement.addEventListener('click', (e) => {
                            if (!window.editModeManager || !window.editModeManager.isEditMode) return;
                            e.stopPropagation();
                            if (pageRefElement.querySelector('input')) return;
                            const originalValue = pageRefElement.textContent.trim();
                            const isPlaceholder = originalValue === '(Add page reference)';
                            const actualValue = isPlaceholder ? '' : originalValue;
                            const input = document.createElement('input');
                            input.type = 'text';
                            input.value = actualValue;
                            input.className = 'inline-page-ref-input';
                            input.style.width = '100%';
                            input.style.padding = '2px 6px';
                            input.style.border = '2px solid #4CAF50';
                            input.style.borderRadius = '4px';
                            input.style.outline = 'none';
                            input.style.boxSizing = 'border-box';
                            input.style.fontFamily = 'inherit';
                            input.style.fontSize = 'inherit';
                            input.style.backgroundColor = 'white';
                            input.style.boxShadow = '0 2px 4px rgba(76, 175, 80, 0.2)';
                            const originalHTML = pageRefElement.innerHTML;
                            pageRefElement.innerHTML = '';
                            pageRefElement.style.padding = '0';
                            pageRefElement.style.border = 'none';
                            pageRefElement.appendChild(input);
                            input.focus();
                            input.select();
                            const saveAction = () => {
                                const newValue = input.value.trim();
                                pageRefElement.innerHTML = '';
                                if (newValue !== actualValue) {
                                    pageRefElement.textContent = newValue;
                                    this.xmlParser.updateTaskDocumentPageReference(data.id, taskId, documentId, newValue);
                                    if (newValue === '') {
                                        pageRefElement.textContent = '(Add page reference)';
                                        pageRefElement.style.color = '#999';
                                        pageRefElement.style.fontStyle = 'italic';
                                    } else {
                                        pageRefElement.style.color = '';
                                        pageRefElement.style.fontStyle = '';
                                    }
                                } else {
                                    if (isPlaceholder) {
                                        pageRefElement.textContent = '(Add page reference)';
                                        pageRefElement.style.color = '#999';
                                        pageRefElement.style.fontStyle = 'italic';
                                    } else {
                                        pageRefElement.innerHTML = originalHTML;
                                    }
                                }
                                this.applyEditableStyleToPageRef(pageRefElement);
                            };
                            const cancelAction = () => {
                                pageRefElement.innerHTML = originalHTML;
                                this.applyEditableStyleToPageRef(pageRefElement);
                            };
                            input.addEventListener('blur', () => {
                                setTimeout(saveAction, 100);
                            });
                            input.addEventListener('keydown', (ke) => {
                                if (ke.key === 'Enter') {
                                    ke.preventDefault();
                                    saveAction();
                                }
                                if (ke.key === 'Escape') {
                                    ke.preventDefault();
                                    cancelAction();
                                }
                            });
                        });
                        pageRefElement.addEventListener('mouseenter', () => {
                            if (!pageRefElement.querySelector('input')) {
                                pageRefElement.style.border = '1px dashed #4CAF50';
                                pageRefElement.style.background = 'rgba(76, 175, 80, 0.05)';
                            }
                        });
                        pageRefElement.addEventListener('mouseleave', () => {
                            if (!pageRefElement.querySelector('input')) {
                                pageRefElement.style.border = '1px dashed transparent';
                                pageRefElement.style.background = 'transparent';
                            }
                        });
                    });
                }
                const addBtnContainer = tasksList.querySelector('.add-item-container');
                if (addBtnContainer) {
                    tasksList.insertBefore(li, addBtnContainer.nextSibling);
                } else {
                    tasksList.appendChild(li);
                }
            });
        } else {
            tasksCount.textContent = '0';
            const noDataLi = document.createElement('li');
            noDataLi.className = 'no-data';
            noDataLi.textContent = this.translate('noTasks');
            const addBtnContainer = tasksList.querySelector('.add-item-container');
            if (addBtnContainer) {
                tasksList.insertBefore(noDataLi, addBtnContainer.nextSibling);
            } else {
                tasksList.appendChild(noDataLi);
            }
        }
    }   
    makePageReferenceEditable(element, type, departmentId, documentId, associatedId) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            if (element.querySelector('input')) return;
            const originalValue = element.textContent.trim();
            const isPlaceholder = originalValue === '(Add page reference)';
            const actualValue = isPlaceholder ? '' : originalValue;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = actualValue;
            input.className = 'inline-page-ref-input-small';
            input.style.width = '100%';
            input.style.maxWidth = '150px';
            input.style.padding = '2px 6px';
            input.style.border = '2px solid #4CAF50';
            input.style.borderRadius = '4px';
            input.style.outline = 'none';
            input.style.boxSizing = 'border-box';
            input.style.fontFamily = 'inherit';
            input.style.fontSize = 'inherit';
            input.style.backgroundColor = 'white';
            input.style.boxShadow = '0 2px 4px rgba(76, 175, 80, 0.2)';
            const originalHTML = element.innerHTML;
            element.innerHTML = '';
            element.style.padding = '0';
            element.style.border = 'none';
            element.appendChild(input);
            input.focus();
            input.select();
            const saveAction = () => {
                const newValue = input.value.trim();
                element.innerHTML = '';
                if (newValue !== actualValue) {
                    element.textContent = newValue;
                    if (type === 'poste') {
                        this.xmlParser.updatePosteDocumentPageReference(departmentId, associatedId, documentId, newValue);
                    } else if (type === 'task') {
                        this.xmlParser.updateTaskDocumentPageReference(departmentId, associatedId, documentId, newValue);
                    }
                    if (newValue === '') {
                        element.textContent = '(Add page reference)';
                        element.style.color = '#999';
                        element.style.fontStyle = 'italic';
                    } else {
                        element.style.color = '';
                        element.style.fontStyle = '';
                    }
                } else {
                    if (isPlaceholder) {
                        element.textContent = '(Add page reference)';
                        element.style.color = '#999';
                        element.style.fontStyle = 'italic';
                    } else {
                        element.innerHTML = originalHTML;
                    }
                }
                this.applyEditableStyleToPageRef(element);
            };
            const cancelAction = () => {
                element.innerHTML = originalHTML;
                this.applyEditableStyleToPageRef(element);
            };
            input.addEventListener('blur', () => {
                setTimeout(saveAction, 100);
            });
            input.addEventListener('keydown', (ke) => {
                if (ke.key === 'Enter') {
                    ke.preventDefault();
                    saveAction();
                }
                if (ke.key === 'Escape') {
                    ke.preventDefault();
                    cancelAction();
                }
            });
        });
        element.addEventListener('mouseenter', () => {
            if (!element.querySelector('input')) {
                element.style.border = '1px dashed #4CAF50';
                element.style.background = 'rgba(76, 175, 80, 0.05)';
            }
        });
        element.addEventListener('mouseleave', () => {
            if (!element.querySelector('input')) {
                element.style.border = '1px dashed transparent';
                element.style.background = 'transparent';
            }
        });
    }
    initMetadataEvents(container, departmentId) {
        if (!window.editModeManager || !window.editModeManager.isEditMode) return;
        container.querySelectorAll('.btn-add-metadata').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const docId = btn.getAttribute('data-doc-id');
                this.showAddMetadataUI(container, departmentId, docId, btn);
            });
        });
        container.querySelectorAll('.btn-edit-metadata').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const metadataItem = btn.closest('.metadata-item');
                const docId = metadataItem.closest('.document-item').getAttribute('data-id');
                const originalKey = metadataItem.getAttribute('data-original-key');
                this.showEditMetadataUI(metadataItem, departmentId, docId, originalKey);
            });
        });
        container.querySelectorAll('.btn-delete-metadata').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const metadataItem = btn.closest('.metadata-item');
                const docId = metadataItem.closest('.document-item').getAttribute('data-id');
                const originalKey = metadataItem.getAttribute('data-original-key');
                this.deleteMetadata(departmentId, docId, originalKey);
            });
        });
    }
    showAddMetadataUI(container, departmentId, docId, btnElement) {
        const parent = btnElement.parentNode.parentNode;
        const metadataContainer = parent.querySelector('.metadata-container');
        const form = document.createElement('div');
        form.className = 'metadata-form';
        form.innerHTML = `
            <div style="display: flex; gap: 8px; margin: 10px 0; align-items: center;">
                <input type="text" class="metadata-key-input" placeholder="Key" style="width:20px; flex: 1; padding: 6px 10px; border: 1px solid #ddd; border-radius: 4px;">
                <span>:</span>
                <input type="text" class="metadata-value-input" placeholder="Value" style="width:20px; flex: 2; padding: 6px 10px; border: 1px solid #ddd; border-radius: 4px;">
                <button class="btn-save-metadata" style="width:10px; padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">S</button>
                <button class="btn-cancel-metadata" style="width:10px; padding: 6px 12px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">C</button>
            </div>
        `;
        metadataContainer.appendChild(form);
        form.querySelector('.metadata-key-input').focus();
        const saveBtn = form.querySelector('.btn-save-metadata');
        const cancelBtn = form.querySelector('.btn-cancel-metadata');
        const keyInput = form.querySelector('.metadata-key-input');
        const valueInput = form.querySelector('.metadata-value-input');
        const saveAction = () => {
            const key = keyInput.value.trim();
            const value = valueInput.value.trim();
            if (!key) {
                alert('Key is required');
                return;
            }
            const normalizedKey = key.startsWith('key-') ? key : `key-${key.replace(/\s+/g, '_')}`;
            this.saveMetadata(departmentId, docId, normalizedKey, value);
        };
        const cancelAction = () => {
            form.remove();
        };
        saveBtn.addEventListener('click', saveAction);
        cancelBtn.addEventListener('click', cancelAction);
        keyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                valueInput.focus();
            }
        });
        valueInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveAction();
            }
            if (e.key === 'Escape') {
                cancelAction();
            }
        });
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!form.contains(e.target) && e.target !== btnElement) {
                    cancelAction();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    showEditMetadataUI(metadataItem, departmentId, docId, originalKey) {
        const keyElement = metadataItem.querySelector('.metadata-key');
        const valueElement = metadataItem.querySelector('.metadata-value');
        const originalKeyText = keyElement.textContent.replace(':', '').trim();
        const originalValueText = valueElement.textContent.trim();
        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.value = originalKeyText;
        keyInput.className = 'metadata-key-input-edit';
        keyInput.style.flex = '1';
        keyInput.style.padding = '2px 4px';
        keyInput.style.border = '1px solid #667eea';
        keyInput.style.borderRadius = '3px';
        keyInput.style.width = '20px';
        const valueInput = document.createElement('input');
        valueInput.type = 'text';
        valueInput.value = originalValueText;
        valueInput.className = 'metadata-value-input-edit';
        valueInput.style.flex = '2';
        valueInput.style.padding = '2px 4px';
        valueInput.style.border = '1px solid #667eea';
        valueInput.style.borderRadius = '3px';
        valueInput.style.width = '20px';    
        const saveBtn = document.createElement('button');
        saveBtn.textContent = '✓';
        saveBtn.className = 'btn-save-edit-metadata';
        saveBtn.title = 'Save';
        saveBtn.style.fontSize = '10px';
        saveBtn.style.padding = '1px 4px';
        saveBtn.style.background = '#4CAF50';
        saveBtn.style.color = 'white';
        saveBtn.style.border = 'none';
        saveBtn.style.borderRadius = '3px';
        saveBtn.style.cursor = 'pointer';
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '×';
        cancelBtn.className = 'btn-cancel-edit-metadata';
        cancelBtn.title = 'Cancel';
        cancelBtn.style.fontSize = '10px';
        cancelBtn.style.padding = '1px 4px';
        cancelBtn.style.background = '#f44336';
        cancelBtn.style.color = 'white';
        cancelBtn.style.border = 'none';
        cancelBtn.style.borderRadius = '3px';
        cancelBtn.style.cursor = 'pointer';
        const originalHTML = metadataItem.innerHTML;
        metadataItem.innerHTML = '';
        metadataItem.style.display = 'flex';
        metadataItem.style.gap = '8px';
        metadataItem.style.alignItems = 'center';
        metadataItem.appendChild(keyInput);
        metadataItem.appendChild(document.createTextNode(':'));
        metadataItem.appendChild(valueInput);
        metadataItem.appendChild(saveBtn);
        metadataItem.appendChild(cancelBtn);
        keyInput.focus();
        keyInput.select();
        const saveAction = () => {
            const newKey = keyInput.value.trim();
            const newValue = valueInput.value.trim();
            if (!newKey) {
                alert('Key is required');
                return;
            }
            const normalizedNewKey = newKey.startsWith('key-') ? newKey : `key-${newKey.replace(/\s+/g, '_')}`;
            if (normalizedNewKey !== originalKey) {
                this.deleteMetadata(departmentId, docId, originalKey);
            }
            this.saveMetadata(departmentId, docId, normalizedNewKey, newValue);
        };
        const cancelAction = () => {
            metadataItem.innerHTML = originalHTML;
            this.initMetadataEvents(metadataItem.closest('#dept-documents'), departmentId);
        };
        saveBtn.addEventListener('click', saveAction);
        cancelBtn.addEventListener('click', cancelAction);
        keyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                valueInput.focus();
            }
        });
        valueInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveAction();
            }
            if (e.key === 'Escape') {
                cancelAction();
            }
        });
        const blurHandler = (e) => {
            if (!metadataItem.contains(e.target)) {
                setTimeout(() => {
                    if (document.activeElement !== keyInput && document.activeElement !== valueInput) {
                        cancelAction();
                    }
                }, 100);
            }
        };
        document.addEventListener('click', blurHandler);
    }
    saveMetadata(departmentId, docId, key, value) {
        try {
            const updates = { [key]: value };
            this.xmlParser.updateDocument(docId, updates);
            this.showDepartmentDetailsId(departmentId);
            this.showNotification('Metadata saved successfully', 'success');
        } catch (error) {
            console.error('Error saving metadata:', error);
            this.showNotification('Error saving metadata', 'error');
        }
    }
    deleteMetadata(departmentId, docId, key) {
        if (!confirm('Are you sure you want to delete this metadata?')) {
            return;
        }
        try {
            const updates = { [key]: '' };
            this.xmlParser.updateDocument(docId, updates);
            this.showDepartmentDetailsId(departmentId);
            this.showNotification('Metadata deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting metadata:', error);
            this.showNotification('Error deleting metadata', 'error');
        }
    }
    initDocumentEditableFields(container, departmentId) {
        container.querySelectorAll('.document-item').forEach(item => {
            const docId = item.getAttribute('data-id');
            const nameEl = item.querySelector('.document-name') || item.querySelector('.document-link');
            const descEl = item.querySelector('.document-description');
            const refEl = item.querySelector('.editable-doc-ref');
            const codeEl = item.querySelector('.editable-doc-code');
            const pageRefEl = item.querySelector('.editable-doc-page-ref');
            const linkEl = item.querySelector('.editable-link-value');
            const regNameEl = item.querySelector('.editable-reg-name');
            const regCodeEl = item.querySelector('.editable-reg-code');
            const regTitleEl = item.querySelector('.editable-reg-title');
            const regDescEl = item.querySelector('.editable-reg-desc');
            if (nameEl) {
                if (nameEl.tagName === 'A') {
                    const span = document.createElement('span');
                    span.className = 'document-name editable';
                    span.textContent = nameEl.textContent;
                    span.style.cursor = 'text';
                    nameEl.parentNode.replaceChild(span, nameEl);
                    this.makeElementEditable(span, 'document', docId, 'nom');
                } else {
                    this.makeElementEditable(nameEl, 'document', docId, 'nom');
                }
            }
            if (linkEl) {
                this.makeElementEditable(linkEl, 'document', docId, 'lien');
                const linkRow = item.querySelector('.document-link-row');
                if (linkRow && window.editModeManager && window.editModeManager.isEditMode) {
                    const externalLink = linkRow.querySelector('.document-external-link');
                    if (externalLink) {
                        externalLink.style.display = 'none';
                    }
                    linkEl.style.display = 'inline';
                    linkEl.style.color = '#555';
                }
            }
            if (descEl) this.makeElementEditable(descEl, 'document', docId, 'description', true);
            if (refEl) this.makeElementEditable(refEl, 'document', docId, 'ref');
            if (codeEl) this.makeElementEditable(codeEl, 'document', docId, 'code');
            if (pageRefEl) this.makeElementEditable(pageRefEl, 'document', docId, 'page_reference');
            if (regNameEl) this.makeElementEditable(regNameEl, 'document', docId, 'reglementation');
            if (regCodeEl) this.makeElementEditable(regCodeEl, 'document', docId, 'regle_code');
            if (regTitleEl) this.makeElementEditable(regTitleEl, 'document', docId, 'regle_titre');
            if (regDescEl) this.makeElementEditable(regDescEl, 'document', docId, 'regle_description', true);
            item.querySelectorAll('.page-ref-value-small[data-poste-id]').forEach(pageRefElement => {
                const posteId = pageRefElement.getAttribute('data-poste-id');
                this.makePageReferenceEditable(pageRefElement, 'poste', departmentId, docId, posteId);
            });
            item.querySelectorAll('.page-ref-value-small[data-task-id]').forEach(pageRefElement => {
                const taskId = pageRefElement.getAttribute('data-task-id');
                this.makePageReferenceEditable(pageRefElement, 'task', departmentId, docId, taskId);
            });
        });
    }
    validateURL(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }
    formatURLForDisplay(url) {
        if (!url) return '';
        if (url.length > 50) {
            return url.substring(0, 30) + '...' + url.substring(url.length - 20);
        }
        return url;
    }
    prepareDocumentsData(data) {
        const container = this.getContentContainer();
        const documentsContainer = container.querySelector('#dept-documents');
        const documentsCount = container.querySelector('#documents-count');
        if (!documentsContainer || !documentsCount) return;
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const existingElements = Array.from(documentsContainer.children);
        existingElements.forEach(element => {
            if (!element.classList.contains('add-item-container')) {
                element.remove();
            }
        });
        const existingAddBtn = documentsContainer.querySelector('.add-item-container');
        if (!isEditMode && existingAddBtn) {
            existingAddBtn.remove();
        }
        if (isEditMode && !existingAddBtn) {
            const addBtnContainer = document.createElement('div');
            addBtnContainer.className = 'add-item-container';
            addBtnContainer.style.marginBottom = '20px';
            addBtnContainer.style.display = 'flex';
            addBtnContainer.style.gap = '10px';
            addBtnContainer.style.flexWrap = 'wrap';
            addBtnContainer.innerHTML = `
                <button class="btn-add-item" id="add-doc-btn" style="background: #667eea; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    + ${this.translate('addDocument') || "Add Document"}
                </button>
                <button class="btn-add-item" id="add-reg-btn" style="background: #48bb78; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    + ${this.translate('addRegulation') || "Add Regulation"}
                </button>
            `;
            addBtnContainer.querySelector('#add-doc-btn').addEventListener('click', () => {
                this.xmlParser.addDocument(data.id, 'manuel');
                this.showDepartmentDetailsId(data.id);
            });
            addBtnContainer.querySelector('#add-reg-btn').addEventListener('click', () => {
                this.xmlParser.addDocument(data.id, 'reglementation');
                this.showDepartmentDetailsId(data.id);
            });
            documentsContainer.insertBefore(addBtnContainer, documentsContainer.firstChild);
        }
        const fichiers = this.xmlParser.getDocuments(data.id);
        if (fichiers && fichiers.length > 0) {
            const documentsInternes = fichiers.filter(f => {
                return f.type === 'manuel' ||
                    f.type_doc === 'interne' ||
                    (!f.type && !f.reglementation); 
            });
            const reglementations = fichiers.filter(f => {
                return f.type === 'reglementation' ||
                    f.categorie === 'externe' ||
                    f.reglementation || 
                    f.type_doc === 'externe';
            });
            let totalDocuments = 0;
            let documentsHTML = '';
            if (documentsInternes.length > 0) {
                documentsHTML += `
                    <div class="documents-category">
                        <h6>📄 ${this.translate('internalDocuments')}</h6>
                        <div class="documents-list">
                `;
                documentsInternes.forEach(doc => {
                    const associatedPosts = this.xmlParser.getPostsForDocument(data.id, doc.id).map(post => {
                        const pageRef = this.xmlParser.getPageReferenceForPosteDocument(data.id, post.id, doc.id);
                        return {
                            ...post,
                            page_reference: pageRef || ''
                        };
                    });
                    const associatedTasks = this.xmlParser.getTasksForDocument(data.id, doc.id).map(task => {
                        const pageRef = this.xmlParser.getPageReferenceForTaskDocument(data.id, task.id, doc.id);
                        return {
                            ...task,
                            page_reference: pageRef || ''
                        };
                    });
                    const docLink = doc.lien ? `
                        <a href="${doc.lien}" target="_blank" class="document-link">
                            ${doc.nom || this.translate('documentName')}
                        </a>
                    ` : `<span class="document-name">${doc.nom || this.translate('documentName')}</span>`;
                    let linkHTML = '';
                    if (doc.lien || isEditMode) {
                        if (doc.lien) {
                            linkHTML = `
                                <div class="document-link-row">
                                    <a href="${doc.lien}" target="_blank" class="document-external-link" 
                                        onclick="event.stopPropagation();">
                                        🔗 ${this.translate('link') || 'Link'}
                                    </a>
                                    <span class="editable-link-value" style="display:none;">${doc.lien}</span>
                                </div>
                            `;
                        } else if (isEditMode) {
                            linkHTML = `
                                <div class="document-link-row">
                                    <span class="editable-link-value" style="color:#999;font-style:italic;">
                                        (Add document link)
                                    </span>
                                </div>
                            `;
                        }
                    }
                    let metadataHTML = '';
                    const metadataItems = [];
                    Object.entries(doc).forEach(([key, value]) => {
                        if (key.startsWith('key-')) {
                            metadataItems.push({ key, value, cleanKey: key.replace('key-', '').replace(/_/g, ' ') });
                        }
                    });
                    if (metadataItems.length > 0) {
                        metadataHTML = `
                            <div class="document-metadata-section">
                                <div class="metadata-header">
                                    <strong>${this.translate('metadata') || 'Metadata'}</strong>
                                    ${isEditMode ? 
                                        `<button class="btn-add-metadata" data-doc-id="${doc.id}" title="Add metadata">
                                            <span style="font-size: 12px; padding: 2px 6px; background: #4CAF50; color: white; border-radius: 3px;">+ Add</span>
                                        </button>` 
                                        : ''}
                                </div>
                                <div class="metadata-container" id="metadata-${doc.id}">
                                    ${metadataItems.map(item => `
                                        <div class="metadata-item editable-metadata" data-original-key="${item.key}">
                                            <div class="metadata-key-value">
                                                <span class="metadata-key" data-field="${item.key}">${item.cleanKey}:</span>
                                                <span class="metadata-value" data-field="${item.key}">${item.value}</span>
                                            </div>
                                            ${isEditMode ? 
                                                `<div class="metadata-actions">
                                                    <button class="btn-edit-metadata" title="Edit" style="font-size: 10px; padding: 1px 4px;">✏️</button>
                                                    <button class="btn-delete-metadata" title="Delete" style="font-size: 10px; padding: 1px 4px;">🗑️</button>
                                                </div>` 
                                                : ''}
                                        </div>
                                    `).join('')}
                                    ${isEditMode && metadataItems.length === 0 ? 
                                        `<div class="no-metadata">No metadata. Click "Add" to add metadata.</div>` 
                                        : ''}
                                </div>
                            </div>
                        `;
                    } else if (isEditMode) {
                        metadataHTML = `
                            <div class="document-metadata-section">
                                <div class="metadata-header">
                                    <strong>${this.translate('metadata') || 'Metadata'}</strong>
                                    <button class="btn-add-metadata" data-doc-id="${doc.id}" title="Add metadata">
                                        <span style="font-size: 12px; padding: 2px 6px; background: #4CAF50; color: white; border-radius: 3px;">+ Add</span>
                                    </button>
                                </div>
                                <div class="metadata-container" id="metadata-${doc.id}">
                                    <div class="no-metadata">No metadata. Click "Add" to add metadata.</div>
                                </div>
                            </div>
                        `;
                    }
                    let postsHTML = '';
                    if (associatedPosts.length > 0 || isEditMode) {
                        postsHTML = `
                            <div class="associated-items document-posts" style="display: none;">
                                <div class="associated-title">
                                    <strong>${this.translate('associatedPosts')}:</strong>
                                    <span class="badge-count small">${associatedPosts.length}</span>
                                    ${isEditMode ?
                                        `<button class="btn-link-item" title="${this.translate('linkPost')}" 
                                            onclick="event.stopPropagation(); window.app.queryDetails.showLinkPostToDocumentUI('${data.id}', '${doc.id}', this, 'posts')">+</button>` : ''}
                                </div>
                                <div class="associated-posts-container">
                                    ${associatedPosts.length > 0 ? associatedPosts.map(post => {
                                        const pageRefHTML = post.page_reference ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${doc.id}"
                                                    data-poste-id="${post.id}"
                                                    data-field="page_reference"
                                                    style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                            transition: all 0.2s ease;">
                                                    ${post.page_reference}
                                                </span>
                                                ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                            </div>
                                        ` : isEditMode ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${doc.id}"
                                                    data-poste-id="${post.id}"
                                                    data-field="page_reference"
                                                    style="cursor: text; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            border: 1px dashed transparent;
                                                            color: #999;
                                                            font-style: italic;
                                                            transition: all 0.2s ease;">
                                                    (Add page reference)
                                                </span>
                                                <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                            </div>
                                        ` : '';
                                        return `
                                            <div class="associated-post-item">
                                                <div class="post-header-row">
                                                    <div class="post-info">
                                                        <span class="post-name">${post.nom || post.id}</span>
                                                        ${post.abbreviation ? `<span class="post-abbr">${post.abbreviation}</span>` : ''}
                                                    </div>
                                                    ${isEditMode ?
                                                        `<button class="btn-unlink-assoc" 
                                                            title="${this.translate('unlinkPost')}"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.unlinkPostFromDocument('${data.id}', '${post.id}', '${doc.id}')">
                                                            🗑️
                                                        </button>` : ''}
                                                </div>
                                                ${post.description ? `<div class="post-description-small">${post.description}</div>` : ''}
                                                ${pageRefHTML}
                                            </div>
                                        `;
                                    }).join('') : `<div class="no-associated">${this.translate('noAssociatedPosts')}</div>`}
                                </div>
                            </div>
                        `;
                    }
                    let tasksHTML = '';
                    if (associatedTasks.length > 0 || isEditMode) {
                        tasksHTML = `
                            <div class="associated-items document-tasks" style="display: none;">
                                <div class="associated-title">
                                    <strong>${this.translate('associatedTasks')}:</strong>
                                    <span class="badge-count small">${associatedTasks.length}</span>
                                    ${isEditMode ?
                                        `<button class="btn-link-item" title="${this.translate('linkTask')}" 
                                            onclick="event.stopPropagation(); window.app.queryDetails.showLinkTaskToDocumentUI('${data.id}', '${doc.id}', this, 'tasks')">+</button>` : ''}
                                </div>
                                <div class="associated-tasks-container">
                                    ${associatedTasks.length > 0 ? associatedTasks.map(task => {
                                        const pageRefHTML = task.page_reference ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${doc.id}"
                                                    data-task-id="${task.id}"
                                                    data-field="page_reference"
                                                    style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                            transition: all 0.2s ease;">
                                                    ${task.page_reference}
                                                </span>
                                                ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                            </div>
                                        ` : isEditMode ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${doc.id}"
                                                    data-task-id="${task.id}"
                                                    data-field="page_reference"
                                                    style="cursor: text; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            border: 1px dashed transparent;
                                                            color: #999;
                                                            font-style: italic;
                                                            transition: all 0.2s ease;">
                                                    (Add page reference)
                                                </span>
                                                <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                            </div>
                                        ` : '';
                                        return `
                                            <div class="associated-task-item">
                                                <div class="task-header-row">
                                                    <div class="task-info">
                                                        <span class="task-name">${task.nom || task.id}</span>
                                                        ${task.categorie ? `<span class="task-category">${task.categorie}</span>` : ''}
                                                    </div>
                                                    ${isEditMode ?
                                                        `<button class="btn-unlink-assoc" 
                                                            title="${this.translate('unlinkTask')}"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.unlinkTaskFromDocument('${data.id}', '${task.id}', '${doc.id}')">
                                                            🗑️
                                                        </button>` : ''}
                                                </div>
                                                ${task.description ? `<div class="task-description-small">${task.description}</div>` : ''}
                                                ${pageRefHTML}
                                            </div>
                                        `;
                                    }).join('') : `<div class="no-associated">${this.translate('noAssociatedTasks')}</div>`}
                                </div>
                            </div>
                        `;
                    }
                    const totalAssociations = associatedPosts.length + associatedTasks.length;
                    const associationBadge = totalAssociations > 0 ?
                        `<span class="association-badge" title="${totalAssociations} ${this.translate('showAssociations')}">🔗 ${totalAssociations}</span>` : '';
                    const shouldShowRef = doc.ref || isEditMode;
                    const shouldShowCode = doc.code || isEditMode;
                    const shouldShowDesc = doc.description || isEditMode;
                    const shouldShowPageRef = doc.page_reference || isEditMode;   
                    documentsHTML += `
                        <div class="document-item interne" data-id="${doc.id}">
                            <div class="document-header">
                                <div class="document-header-main">
                                    ${docLink}
                                    ${associationBadge}
                                    ${isEditMode ?
                                        `<span class="btn-delete-item-doc" title="Delete Document" onclick="event.stopPropagation(); if(confirm('Delete document?')) { window.app.queryDetails.xmlParser.deleteDocument('${data.id}', '${doc.id}'); window.app.queryDetails.showDepartmentDetailsId('${data.id}'); }">🗑️</span>`
                                    : ''}
                                </div>
                                <span class="document-type-badge interne">${this.translate('document')}</span>
                            </div>
                            ${linkHTML}
                            ${shouldShowRef ? `
                                <div class="document-ref-row">
                                    ${this.translate('reference')} <span class="editable-doc-ref">${doc.ref || '(Add Ref)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowCode ? `
                                <div class="document-code-row">
                                    ${this.translate('code')} <span class="editable-doc-code">${doc.code || '(Add Code)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowDesc ? `
                                <div class="document-description">
                                    ${doc.description || '(Add Description)'}
                                </div>
                            ` : ''}
                            ${shouldShowPageRef ? `
                                <div class="document-page-ref-row">
                                    ${this.translate('page')}: <span class="editable-doc-page-ref">${doc.page_reference || '(Add Page Reference)'}</span>
                                </div>
                            ` : ''}
                            ${metadataHTML}
                            <!-- Boutons pour afficher/masquer les associations -->
                            ${(associatedPosts.length > 0 || associatedTasks.length > 0 || isEditMode) ? `
                                <div class="document-associations-controls">
                                    ${associatedPosts.length > 0 || isEditMode ?
                                        `<button class="toggle-associations-btn" data-type="posts" data-doc-id="${doc.id}">
                                            📋 ${this.translate('associatedPostsCount')} (${associatedPosts.length})
                                        </button>` : ''}
                                    ${associatedTasks.length > 0 || isEditMode ?
                                        `<button class="toggle-associations-btn" data-type="tasks" data-doc-id="${doc.id}">
                                            📝 ${this.translate('associatedTasksCount')} (${associatedTasks.length})
                                        </button>` : ''}
                                </div>
                            ` : ''}
                            ${postsHTML}
                            ${tasksHTML}
                        </div>
                    `;
                    totalDocuments++;
                });
                documentsHTML += `
                        </div>
                    </div>
                `;
            } else if (isEditMode) {
                documentsHTML += `
                    <div class="documents-category">
                        <h6>📄 ${this.translate('internalDocuments')}</h6>
                        <div class="no-data">${this.translate('noInternalDocuments')}</div>
                    </div>
                `;
            }
            if (reglementations.length > 0) {
                documentsHTML += `
                    <div class="documents-category">
                        <h6>⚖️ ${this.translate('regulations')}</h6>
                        <div class="documents-list">
                `;
                reglementations.forEach(reg => {
                    const associatedPosts = this.xmlParser.getPostsForDocument(data.id, reg.id).map(post => {
                        const pageRef = this.xmlParser.getPageReferenceForPosteDocument(data.id, post.id, reg.id);
                        return {
                            ...post,
                            page_reference: pageRef || ''
                        };
                    });
                    const associatedTasks = this.xmlParser.getTasksForDocument(data.id, reg.id).map(task => {
                        const pageRef = this.xmlParser.getPageReferenceForTaskDocument(data.id, task.id, reg.id);
                        return {
                            ...task,
                            page_reference: pageRef || ''
                        };
                    });
                    const regLink = reg.lien ? `
                        <a href="${reg.lien}" target="_blank" class="document-link">
                            ${reg.nom || this.translate('regulationName')}
                        </a>
                    ` : `<span class="document-name">${reg.nom || this.translate('regulationName')}</span>`;
                    let metadataHTML = '';
                    const metadataItems = [];
                    Object.entries(reg).forEach(([key, value]) => {
                        if (key.startsWith('key-')) {
                            metadataItems.push({ key, value, cleanKey: key.replace('key-', '').replace(/_/g, ' ') });
                        }
                    });
                    if (metadataItems.length > 0 || isEditMode) {
                        metadataHTML = `
                            <div class="document-metadata-section">
                                <div class="metadata-header">
                                    <strong>${this.translate('metadata') || 'Metadata'}</strong>
                                    ${isEditMode ? 
                                        `<button class="btn-add-metadata" data-doc-id="${reg.id}" title="Add metadata">
                                            <span style="font-size: 12px; padding: 2px 6px; background: #4CAF50; color: white; border-radius: 3px;">+ Add</span>
                                        </button>` 
                                        : ''}
                                </div>
                                <div class="metadata-container" id="metadata-${reg.id}">
                                    ${metadataItems.map(item => `
                                        <div class="metadata-item editable-metadata" data-original-key="${item.key}">
                                            <div class="metadata-key-value">
                                                <span class="metadata-key" data-field="${item.key}">${item.cleanKey}:</span>
                                                <span class="metadata-value" data-field="${item.key}">${item.value}</span>
                                            </div>
                                            ${isEditMode ? 
                                                `<div class="metadata-actions">
                                                    <button class="btn-edit-metadata" title="Edit" style="font-size: 10px; padding: 1px 4px;">✏️</button>
                                                    <button class="btn-delete-metadata" title="Delete" style="font-size: 10px; padding: 1px 4px;">🗑️</button>
                                                </div>` 
                                                : ''}
                                        </div>
                                    `).join('')}
                                    ${isEditMode && metadataItems.length === 0 ? 
                                        `<div class="no-metadata">No metadata. Click "Add" to add metadata.</div>` 
                                        : ''}
                                </div>
                            </div>
                        `;
                    }
                    let regLinkHTML = '';
                    if (reg.lien || isEditMode) {
                        if (reg.lien) {
                            regLinkHTML = `
                                <div class="document-link-row">
                                    <a href="${reg.lien}" target="_blank" class="document-external-link" 
                                        onclick="event.stopPropagation();">
                                        🔗 ${this.translate('link') || 'Link'}
                                    </a>
                                    <span class="editable-link-value" style="display:none;">${reg.lien}</span>
                                </div>
                            `;
                        } else if (isEditMode) {
                            regLinkHTML = `
                                <div class="document-link-row">
                                    <span class="editable-link-value" style="color:#999;font-style:italic;">
                                        (Add regulation link)
                                    </span>
                                </div>
                            `;
                        }
                    }
                    let postsHTML = '';
                    if (associatedPosts.length > 0 || isEditMode) {
                        postsHTML = `
                            <div class="associated-items document-posts" style="display: none;">
                                <div class="associated-title">
                                    <strong>${this.translate('associatedPosts')}:</strong>
                                    <span class="badge-count small">${associatedPosts.length}</span>
                                    ${isEditMode ?
                                        `<button class="btn-link-item" title="${this.translate('linkPost')}" 
                                            onclick="event.stopPropagation(); window.app.queryDetails.showLinkPostToDocumentUI('${data.id}', '${reg.id}', this, 'posts')">+</button>` : ''}
                                </div>
                                <div class="associated-posts-container">
                                    ${associatedPosts.length > 0 ? associatedPosts.map(post => {
                                        const pageRefHTML = post.page_reference ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${reg.id}"
                                                    data-poste-id="${post.id}"
                                                    data-field="page_reference"
                                                    style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                            transition: all 0.2s ease;">
                                                    ${post.page_reference}
                                                </span>
                                                ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                            </div>
                                        ` : isEditMode ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${reg.id}"
                                                    data-poste-id="${post.id}"
                                                    data-field="page_reference"
                                                    style="cursor: text; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            border: 1px dashed transparent;
                                                            color: #999;
                                                            font-style: italic;
                                                            transition: all 0.2s ease;">
                                                    (Add page reference)
                                                </span>
                                                <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                            </div>
                                        ` : '';
                                        return `
                                            <div class="associated-post-item">
                                                <div class="post-header-row">
                                                    <div class="post-info">
                                                        <span class="post-name">${post.nom || post.id}</span>
                                                        ${post.abbreviation ? `<span class="post-abbr">${post.abbreviation}</span>` : ''}
                                                    </div>
                                                    ${isEditMode ?
                                                        `<button class="btn-unlink-assoc" 
                                                            title="${this.translate('unlinkPost')}"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.unlinkPostFromDocument('${data.id}', '${post.id}', '${reg.id}')">
                                                            🗑️
                                                        </button>` : ''}
                                                </div>
                                                ${post.description ? `<div class="post-description-small">${post.description}</div>` : ''}
                                                ${pageRefHTML}
                                            </div>
                                        `;
                                    }).join('') : `<div class="no-associated">${this.translate('noAssociatedPosts')}</div>`}
                                </div>
                            </div>
                        `;
                    }
                    let tasksHTML = '';
                    if (associatedTasks.length > 0 || isEditMode) {
                        tasksHTML = `
                            <div class="associated-items document-tasks" style="display: none;">
                                <div class="associated-title">
                                    <strong>${this.translate('associatedTasks')}:</strong>
                                    <span class="badge-count small">${associatedTasks.length}</span>
                                    ${isEditMode ?
                                        `<button class="btn-link-item" title="${this.translate('linkTask')}" 
                                            onclick="event.stopPropagation(); window.app.queryDetails.showLinkTaskToDocumentUI('${data.id}', '${reg.id}', this, 'tasks')">+</button>` : ''}
                                </div>
                                <div class="associated-tasks-container">
                                    ${associatedTasks.length > 0 ? associatedTasks.map(task => {
                                        const pageRefHTML = task.page_reference ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${reg.id}"
                                                    data-task-id="${task.id}"
                                                    data-field="page_reference"
                                                    style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                            transition: all 0.2s ease;">
                                                    ${task.page_reference}
                                                </span>
                                                ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                            </div>
                                        ` : isEditMode ? `
                                            <div class="document-page-reference-small">
                                                <strong>${this.translate('page')}:</strong>
                                                <span class="page-ref-value-small" 
                                                    data-document-id="${reg.id}"
                                                    data-task-id="${task.id}"
                                                    data-field="page_reference"
                                                    style="cursor: text; 
                                                            padding: 2px 6px; 
                                                            border-radius: 3px;
                                                            border: 1px dashed transparent;
                                                            color: #999;
                                                            font-style: italic;
                                                            transition: all 0.2s ease;">
                                                    (Add page reference)
                                                </span>
                                                <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                            </div>
                                        ` : '';
                                        return `
                                            <div class="associated-task-item">
                                                <div class="task-header-row">
                                                    <div class="task-info">
                                                        <span class="task-name">${task.nom || task.id}</span>
                                                        ${task.categorie ? `<span class="task-category">${task.categorie}</span>` : ''}
                                                    </div>
                                                    ${isEditMode ?
                                                        `<button class="btn-unlink-assoc" 
                                                            title="${this.translate('unlinkTask')}"
                                                            onclick="event.stopPropagation(); window.app.queryDetails.unlinkTaskFromDocument('${data.id}', '${task.id}', '${reg.id}')">
                                                            🗑️
                                                        </button>` : ''}
                                                </div>
                                                ${task.description ? `<div class="task-description-small">${task.description}</div>` : ''}
                                                ${pageRefHTML}
                                            </div>
                                        `;
                                    }).join('') : `<div class="no-associated">${this.translate('noAssociatedTasks')}</div>`}
                                </div>
                            </div>
                        `;
                    }
                    const totalAssociations = associatedPosts.length + associatedTasks.length;
                    const associationBadge = totalAssociations > 0 ?
                        `<span class="association-badge" title="${totalAssociations} ${this.translate('showAssociations')}">🔗 ${totalAssociations}</span>` : '';
                    const shouldShowRef = reg.ref || isEditMode;
                    const shouldShowCode = reg.code || isEditMode;
                    const shouldShowDesc = reg.description || isEditMode;
                    const shouldShowRegName = reg.reglementation || isEditMode;
                    const shouldShowRegCode = reg.regle_code || isEditMode;
                    const shouldShowRegTitle = reg.regle_titre || isEditMode;
                    const shouldShowRegDesc = reg.regle_description || isEditMode;
                    const shouldShowPageRef = reg.page_reference || isEditMode;
                    documentsHTML += `
                        <div class="document-item reglementation" data-id="${reg.id}">
                            <div class="document-header">
                                <div class="document-header-main">
                                    ${regLink}
                                    ${associationBadge}
                                    ${isEditMode ?
                                        `<span class="btn-delete-item-doc" title="Delete Regulation" onclick="event.stopPropagation(); if(confirm('Delete regulation?')) { window.app.queryDetails.xmlParser.deleteDocument('${data.id}', '${reg.id}'); window.app.queryDetails.showDepartmentDetailsId('${data.id}'); }">🗑️</span>`
                                    : ''}
                                </div>
                                <span class="document-type-badge reglementation">${this.translate('regulation')}</span>
                            </div>
                            ${regLinkHTML}
                            ${shouldShowRef ? `
                                <div class="document-ref-row">
                                    ${this.translate('reference')} <span class="editable-doc-ref">${reg.ref || '(Add Ref)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowCode ? `
                                <div class="document-code-row">
                                    ${this.translate('code')} <span class="editable-doc-code">${reg.code || '(Add Code)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowDesc ? `
                                <div class="document-description">
                                    ${reg.description || '(Add Description)'}
                                </div>
                            ` : ''}
                            ${shouldShowRegName ? `
                                <div class="regulation-name">
                                    ${this.translate('regulation')}: <span class="editable-reg-name">${reg.reglementation || '(Add Regulation Name)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowRegCode ? `
                                <div class="regulation-code">
                                    ${this.translate('code')}: <span class="editable-reg-code">${reg.regle_code || '(Add Rule Code)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowRegTitle ? `
                                <div class="regulation-title">
                                    <span class="editable-reg-title">${reg.regle_titre || '(Add Rule Title)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowRegDesc ? `
                                <div class="regulation-description">
                                    <span class="editable-reg-desc">${reg.regle_description || '(Add Rule Description)'}</span>
                                </div>
                            ` : ''}
                            ${shouldShowPageRef ? `
                                <div class="document-page-ref-row">
                                    ${this.translate('page')}: <span class="editable-doc-page-ref">${reg.page_reference || '(Add Page Reference)'}</span>
                                </div>
                            ` : ''}
                            ${metadataHTML}
                            <!-- Boutons pour afficher/masquer les associations -->
                            ${(associatedPosts.length > 0 || associatedTasks.length > 0 || isEditMode) ? `
                                <div class="document-associations-controls">
                                    ${associatedPosts.length > 0 || isEditMode ?
                                        `<button class="toggle-associations-btn" data-type="posts" data-doc-id="${reg.id}">
                                            📋 ${this.translate('associatedPostsCount')} (${associatedPosts.length})
                                        </button>` : ''}
                                    ${associatedTasks.length > 0 || isEditMode ?
                                        `<button class="toggle-associations-btn" data-type="tasks" data-doc-id="${reg.id}">
                                            📝 ${this.translate('associatedTasksCount')} (${associatedTasks.length})
                                        </button>` : ''}
                                </div>
                            ` : ''}
                            ${postsHTML}
                            ${tasksHTML}
                        </div>
                    `;
                    totalDocuments++;
                });
                documentsHTML += `
                        </div>
                    </div>
                `;
            } else if (isEditMode) {
                documentsHTML += `
                    <div class="documents-category">
                        <h6>⚖️ ${this.translate('regulations')}</h6>
                        <div class="no-data">${this.translate('noRegulations')}</div>
                    </div>
                `;
            }
            const documentsContent = document.createElement('div');
            documentsContent.className = 'documents-content';
            documentsContent.innerHTML = documentsHTML;
            documentsCount.textContent = totalDocuments;
            const addBtnContainer = documentsContainer.querySelector('.add-item-container');
            if (addBtnContainer) {
                documentsContainer.insertBefore(documentsContent, addBtnContainer.nextSibling);
            } else {
                documentsContainer.appendChild(documentsContent);
            }
            this.initDocumentAssociationsEvents(documentsContainer);
            this.initMetadataEvents(documentsContainer, data.id);
            if (isEditMode) {
                this.initDocumentEditableFields(documentsContainer, data.id);
            }
        } else {
            documentsCount.textContent = '0';
            const noDataContent = document.createElement('div');
            noDataContent.className = 'documents-content';
            if (isEditMode) {
                noDataContent.innerHTML = `<div class="no-data">${this.translate('noDocuments')} (Click "Add Doc" or "Add Reg" to create one)</div>`;
            } else {
                noDataContent.innerHTML = `<div class="no-data">${this.translate('noDocuments')}</div>`;
            }
            const addBtnContainer = documentsContainer.querySelector('.add-item-container');
            if (addBtnContainer) {
                documentsContainer.insertBefore(noDataContent, addBtnContainer.nextSibling);
            } else {
                documentsContainer.appendChild(noDataContent);
            }
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
            abbrev_details : dept.abbrev_details  || "",   
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
    initDocumentAssociationsEvents(documentsContainer) {
        if (!documentsContainer) {
            documentsContainer = this.getContentContainer().querySelector('#dept-documents');
        }
        if (!documentsContainer) {
            console.error('Documents container not found');
            return;
        }
        if (documentsContainer._associationClickHandler) {
            documentsContainer.removeEventListener('click', documentsContainer._associationClickHandler);
        }
        const clickHandler = (e) => {
            const toggleBtn = e.target.closest('.toggle-associations-btn');
            if (!toggleBtn) return;
            e.preventDefault();
            e.stopPropagation();
            const documentItem = toggleBtn.closest('.document-item');
            if (!documentItem) {
                console.error('Document item not found');
                return;
            }
            const associationType = toggleBtn.getAttribute('data-type');
            if (!associationType) {
                console.error('Association type not found');
                return;
            }
            const associationsContainer = documentItem.querySelector(`.associated-items.document-${associationType}`);
            if (!associationsContainer) {
                console.warn(`Associations container not found for type: ${associationType} in document item`);
                return;
            }
            const isCurrentlyHidden = associationsContainer.style.display === 'none' || associationsContainer.style.display === '';
            associationsContainer.style.display = isCurrentlyHidden ? 'block' : 'none';
            const buttonText = toggleBtn.textContent.trim();
            if (isCurrentlyHidden) {
                const textAfterEmoji = buttonText.includes(' ') ? buttonText.substring(buttonText.indexOf(' ') + 1) : buttonText;
                toggleBtn.innerHTML = `🔽 ${textAfterEmoji}`;
                associationsContainer.style.opacity = '0';
                associationsContainer.style.transform = 'translateY(-10px)';
                associationsContainer.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    associationsContainer.style.opacity = '1';
                    associationsContainer.style.transform = 'translateY(0)';
                }, 10);
            } else {
                const textAfterEmoji = buttonText.includes(' ') ? buttonText.substring(buttonText.indexOf(' ') + 1) : buttonText;
                toggleBtn.innerHTML = `🔼 ${textAfterEmoji}`;
                associationsContainer.style.opacity = '0';
                associationsContainer.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    associationsContainer.style.display = 'none';
                }, 300);
            }
        };
        documentsContainer._associationClickHandler = clickHandler;
        documentsContainer.addEventListener('click', clickHandler);
    }
    showLinkTaskUI(deptId, posteId, btnElement) {
        const parent = btnElement.parentNode;
        const existingUI = parent.querySelector('.link-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.xmlParser.getDepartement(deptId);
        if (!dept) return;
        const linkedTasks = this.getTasksForPost(deptId, posteId);
        const linkedTaskIds = linkedTasks.map(t => t.id);
        const availableTasks = dept.tasks.filter(task => !linkedTaskIds.includes(task.id));
        if (availableTasks.length === 0) {
            alert(this.translate('noTasksAvailable') || "No tasks available to link.");
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'link-ui-container';
        uiContainer.style.display = 'flex';
        uiContainer.style.flexDirection = 'column';
        uiContainer.style.gap = '10px';
        uiContainer.style.marginLeft = '10px';
        uiContainer.style.marginTop = '10px';
        uiContainer.style.padding = '15px';
        uiContainer.style.border = '1px solid #ddd';
        uiContainer.style.borderRadius = '8px';
        uiContainer.style.background = 'var(--bg-secondary)';
        uiContainer.style.maxWidth = '400px';
        const selectRow = document.createElement('div');
        selectRow.style.display = 'flex';
        selectRow.style.gap = '8px';
        selectRow.style.alignItems = 'center';
        selectRow.style.marginBottom = '10px';
        const select = document.createElement('select');
        select.className = 'link-select';
        select.style.flex = '1';
        select.style.padding = '8px 12px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.background = 'var(--bg-primary)';
        select.style.color = 'var(--text-primary)';
        select.innerHTML = '<option value="">' + (this.translate('selectTask') || 'Select Task...') + '</option>';
        availableTasks.forEach(task => {
            select.innerHTML += `<option value="${task.id}">${task.nom || task.id}</option>`;
        });
        const descriptionRow = document.createElement('div');
        descriptionRow.style.marginBottom = '10px';
        const descriptionLabel = document.createElement('div');
        descriptionLabel.textContent = 'Description de l\'association (optionnelle):';
        descriptionLabel.style.marginBottom = '5px';
        descriptionLabel.style.fontSize = '13px';
        descriptionLabel.style.color = 'var(--text-secondary)';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.className = 'association-description-input';
        descriptionInput.placeholder = 'Décrivez comment ce poste est lié à cette tâche...';
        descriptionInput.style.width = '100%';
        descriptionInput.style.minHeight = '80px';
        descriptionInput.style.padding = '8px';
        descriptionInput.style.border = '1px solid #ddd';
        descriptionInput.style.borderRadius = '4px';
        descriptionInput.style.resize = 'vertical';
        descriptionInput.style.fontFamily = 'inherit';
        descriptionInput.style.fontSize = '14px';
        descriptionInput.style.boxSizing = 'border-box';
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.justifyContent = 'flex-end';
        const linkButton = document.createElement('button');
        linkButton.textContent = this.translate('link') || 'Link';
        linkButton.className = 'btn-link-confirm';
        linkButton.style.padding = '8px 16px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Annuler';
        cancelButton.className = 'btn-link-cancel';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '14px';
        selectRow.appendChild(select);
        descriptionRow.appendChild(descriptionLabel);
        descriptionRow.appendChild(descriptionInput);
        buttonsRow.appendChild(linkButton);
        buttonsRow.appendChild(cancelButton);
        uiContainer.appendChild(selectRow);
        uiContainer.appendChild(descriptionRow);
        uiContainer.appendChild(buttonsRow);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkTask = () => {
            if (select.value) {
                this.linkPosteToTaskWithDescription(deptId, posteId, select.value, descriptionInput.value);
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && select.value) {
                e.preventDefault();
                linkTask();
            }
            if (e.key === 'Escape') {
                closeUI();
            }
        });
        linkButton.addEventListener('click', linkTask);
        cancelButton.addEventListener('click', closeUI);
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target !== btnElement) {
                    closeUI();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    showLinkPosteUI(deptId, taskId, btnElement) {
        const parent = btnElement.parentNode;
        const existingUI = parent.querySelector('.link-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.xmlParser.getDepartement(deptId);
        if (!dept) return;
        const uiContainer = document.createElement('div');
        uiContainer.className = 'link-ui-container';
        uiContainer.style.display = 'flex';
        uiContainer.style.flexDirection = 'column';
        uiContainer.style.gap = '10px';
        uiContainer.style.marginLeft = '10px';
        uiContainer.style.marginTop = '10px';
        uiContainer.style.padding = '15px';
        uiContainer.style.border = '1px solid #ddd';
        uiContainer.style.borderRadius = '8px';
        uiContainer.style.background = 'var(--bg-secondary)';
        uiContainer.style.maxWidth = '400px';
        const selectRow = document.createElement('div');
        selectRow.style.display = 'flex';
        selectRow.style.gap = '8px';
        selectRow.style.alignItems = 'center';
        selectRow.style.marginBottom = '10px';
        const select = document.createElement('select');
        select.className = 'link-select';
        select.style.flex = '1';
        select.style.padding = '8px 12px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.background = 'var(--bg-primary)';
        select.style.color = 'var(--text-primary)';
        select.innerHTML = '<option value="">' + (this.translate('selectPost') || 'Select Post...') + '</option>';
        dept.postes.forEach(poste => {
            select.innerHTML += `<option value="${poste.id}">${poste.nom || poste.id}</option>`;
        });
        const descriptionRow = document.createElement('div');
        descriptionRow.style.marginBottom = '10px';
        const descriptionLabel = document.createElement('div');
        descriptionLabel.textContent = 'Description de l\'association (optionnelle):';
        descriptionLabel.style.marginBottom = '5px';
        descriptionLabel.style.fontSize = '13px';
        descriptionLabel.style.color = 'var(--text-secondary)';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.className = 'association-description-input';
        descriptionInput.placeholder = 'Décrivez comment cette tâche est liée à ce poste...';
        descriptionInput.style.width = '100%';
        descriptionInput.style.minHeight = '80px';
        descriptionInput.style.padding = '8px';
        descriptionInput.style.border = '1px solid #ddd';
        descriptionInput.style.borderRadius = '4px';
        descriptionInput.style.resize = 'vertical';
        descriptionInput.style.fontFamily = 'inherit';
        descriptionInput.style.fontSize = '14px';
        descriptionInput.style.boxSizing = 'border-box';
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.justifyContent = 'flex-end';
        const linkButton = document.createElement('button');
        linkButton.textContent = this.translate('link') || 'Link';
        linkButton.className = 'btn-link-confirm';
        linkButton.style.padding = '8px 16px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Annuler';
        cancelButton.className = 'btn-link-cancel';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '14px';
        selectRow.appendChild(select);
        descriptionRow.appendChild(descriptionLabel);
        descriptionRow.appendChild(descriptionInput);
        buttonsRow.appendChild(linkButton);
        buttonsRow.appendChild(cancelButton);
        uiContainer.appendChild(selectRow);
        uiContainer.appendChild(descriptionRow);
        uiContainer.appendChild(buttonsRow);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkPost = () => {
            if (select.value) {
                this.linkTaskToPosteWithDescription(deptId, taskId, select.value, descriptionInput.value);
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && select.value) {
                e.preventDefault();
                linkPost();
            }
            if (e.key === 'Escape') {
                closeUI();
            }
        });
        linkButton.addEventListener('click', linkPost);
        cancelButton.addEventListener('click', closeUI);
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target !== btnElement) {
                    closeUI();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    showLinkPostToDocumentUI(deptId, documentId, btnElement, associationType) {
        const parent = btnElement.parentNode;
        const existingUI = parent.querySelector('.link-to-doc-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.xmlParser.getDepartement(deptId);
        if (!dept) return;
        const linkedPosts = this.getPostsForDocument(deptId, documentId);
        const linkedPostIds = linkedPosts.map(p => p.id);
        const availablePosts = dept.postes.filter(post => !linkedPostIds.includes(post.id));
        if (availablePosts.length === 0) {
            alert(this.translate('noPostsAvailable') || "No positions available to link.");
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'link-to-doc-ui-container';
        uiContainer.style.display = 'flex';
        uiContainer.style.gap = '8px';
        uiContainer.style.marginLeft = '10px';
        uiContainer.style.alignItems = 'center';
        uiContainer.style.flexWrap = 'wrap';
        uiContainer.style.maxWidth = '400px';
        const select = document.createElement('select');
        select.className = 'link-to-doc-select';
        select.style.flex = '1';
        select.style.minWidth = '200px';
        select.style.padding = '6px 10px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.background = 'var(--bg-primary)';
        select.style.color = 'var(--text-primary)';
        select.style.fontSize = '14px';
        select.innerHTML = `<option value="">${this.translate('selectPost') || 'Select Position...'}</option>`;
        availablePosts.forEach(post => {
            const displayName = post.nom || post.id;
            select.innerHTML += `<option value="${post.id}">👤 ${displayName}</option>`;
        });
        const linkButton = document.createElement('button');
        linkButton.textContent = this.translate('link') || 'Link';
        linkButton.className = 'btn-link-to-doc-confirm';
        linkButton.style.padding = '6px 12px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = '×';
        cancelButton.className = 'btn-link-to-doc-cancel';
        cancelButton.style.padding = '6px 10px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '16px';
        cancelButton.style.lineHeight = '1';
        uiContainer.appendChild(select);
        uiContainer.appendChild(linkButton);
        uiContainer.appendChild(cancelButton);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkItem = () => {
            if (select.value) {
                const success = this.xmlParser.linkPosteToDocument(deptId, select.value, documentId);
                if (success) {
                    this.showDepartmentDetailsId(deptId);
                    this.showNotification(this.translate('postLinkedSuccess') || 'Position linked successfully', 'success');
                } else {
                    this.showNotification(this.translate('linkPostError') || 'Error linking position', 'error');
                }
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') linkItem();
            if (e.key === 'Escape') closeUI();
        });
        linkButton.addEventListener('click', linkItem);
        cancelButton.addEventListener('click', closeUI);
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target !== btnElement) {
                    closeUI();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    showLinkTaskToDocumentUI(deptId, documentId, btnElement, associationType) {
        const parent = btnElement.parentNode;
        const existingUI = parent.querySelector('.link-to-doc-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.xmlParser.getDepartement(deptId);
        if (!dept) return;
        const linkedTasks = this.getTasksForDocument(deptId, documentId);
        const linkedTaskIds = linkedTasks.map(t => t.id);
        const availableTasks = dept.tasks.filter(task => !linkedTaskIds.includes(task.id));
        if (availableTasks.length === 0) {
            alert(this.translate('noTasksAvailable') || "No tasks available to link.");
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'link-to-doc-ui-container';
        uiContainer.style.display = 'flex';
        uiContainer.style.gap = '8px';
        uiContainer.style.marginLeft = '10px';
        uiContainer.style.alignItems = 'center';
        uiContainer.style.flexWrap = 'wrap';
        uiContainer.style.maxWidth = '400px';
        const select = document.createElement('select');
        select.className = 'link-to-doc-select';
        select.style.flex = '1';
        select.style.minWidth = '200px';
        select.style.padding = '6px 10px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.background = 'var(--bg-primary)';
        select.style.color = 'var(--text-primary)';
        select.style.fontSize = '14px';
        select.innerHTML = `<option value="">${this.translate('selectTask') || 'Select Task...'}</option>`;
        availableTasks.forEach(task => {
            const displayName = task.nom || task.id;
            select.innerHTML += `<option value="${task.id}">📝 ${displayName}</option>`;
        });
        const linkButton = document.createElement('button');
        linkButton.textContent = this.translate('link') || 'Link';
        linkButton.className = 'btn-link-to-doc-confirm';
        linkButton.style.padding = '6px 12px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = '×';
        cancelButton.className = 'btn-link-to-doc-cancel';
        cancelButton.style.padding = '6px 10px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '16px';
        cancelButton.style.lineHeight = '1';
        uiContainer.appendChild(select);
        uiContainer.appendChild(linkButton);
        uiContainer.appendChild(cancelButton);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkItem = () => {
            if (select.value) {
                const success = this.xmlParser.linkTaskToDocument(deptId, select.value, documentId);
                if (success) {
                    this.showDepartmentDetailsId(deptId);
                    this.showNotification(this.translate('taskLinkedSuccess') || 'Task linked successfully', 'success');
                } else {
                    this.showNotification(this.translate('linkTaskError') || 'Error linking task', 'error');
                }
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') linkItem();
            if (e.key === 'Escape') closeUI();
        });
        linkButton.addEventListener('click', linkItem);
        cancelButton.addEventListener('click', closeUI);
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target !== btnElement) {
                    closeUI();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    editAssociationDescription(departmentId, posteId, taskId, btnElement) {
        const parent = btnElement.closest('.association-description, .association-description-empty');
        if (!parent) {
            console.error('Parent element not found');
            return;
        }
        if (!this.xmlParser) {
            console.error('XMLParser not available');
            return;
        }
        if (parent.querySelector('textarea')) return;
        const currentDesc = this.getAssociationDescription(departmentId, posteId, taskId);
        const originalHTML = parent.innerHTML;
        const form = document.createElement('div');
        form.className = 'edit-association-form';
        form.style.width = '100%';
        form.innerHTML = `
            <textarea class="edit-association-desc-input" 
                    placeholder="Décrivez comment ce poste est lié à cette tâche..."
                    style="width:100%; min-height:80px; padding:8px; border:2px solid #667eea; border-radius:4px; resize:vertical; font-family:inherit; font-size:14px; box-sizing:border-box;">${currentDesc}</textarea>
            <div style="display:flex; gap:8px; margin-top:8px; justify-content:flex-end;">
                <button class="save-assoc-desc-btn" style="padding:6px 12px; background:#4CAF50; color:white; border:none; border-radius:4px; cursor:pointer; font-size:13px;">Sauvegarder</button>
                <button class="cancel-assoc-desc-btn" style="padding:6px 12px; background:#f44336; color:white; border:none; border-radius:4px; cursor:pointer; font-size:13px;">Annuler</button>
            </div>
        `;
        parent.innerHTML = '';
        parent.appendChild(form);
        const textarea = parent.querySelector('textarea');
        textarea.focus();
        textarea.select();
        const saveBtn = parent.querySelector('.save-assoc-desc-btn');
        const cancelBtn = parent.querySelector('.cancel-assoc-desc-btn');
        const saveAction = () => {
            const newDescription = textarea.value.trim();
            this.updateAssociationDescription(departmentId, posteId, taskId, newDescription);
        };
        const cancelAction = () => {
            parent.innerHTML = originalHTML;
        };
        saveBtn.addEventListener('click', saveAction);
        cancelBtn.addEventListener('click', cancelAction);
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                saveAction();
            }
            if (e.key === 'Escape') {
                cancelAction();
            }
        });
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!parent.contains(e.target)) {
                    cancelAction();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
    }
    unlinkPostFromDocument(departmentId, posteId, documentId) {
        if (!confirm(`${this.translate('confirmUnlinkPost') || 'Are you sure you want to unlink this position?'}`)) {
            return;
        }
        const success = this.xmlParser.unlinkPosteFromDocument(departmentId, posteId, documentId);
        if (success) {
            this.showDepartmentDetailsId(departmentId);
            this.showNotification(this.translate('postUnlinkedSuccess') || 'Position unlinked successfully', 'success');
        } else {
            this.showNotification(this.translate('unlinkPostError') || 'Error unlinking position', 'error');
        }
    }
    unlinkTaskFromDocument(departmentId, taskId, documentId) {
        if (!confirm(`${this.translate('confirmUnlinkTask') || 'Are you sure you want to unlink this task?'}`)) {
            return;
        }
        const success = this.xmlParser.unlinkTaskFromDocument(departmentId, taskId, documentId);
        if (success) {
            this.showDepartmentDetailsId(departmentId);
            this.showNotification(this.translate('taskUnlinkedSuccess') || 'Task unlinked successfully', 'success');
        } else {
            this.showNotification(this.translate('unlinkTaskError') || 'Error unlinking task', 'error');
        }
    }
linkPosteToTaskWithDescription(departmentId, posteId, taskId, description = '') {
    const success = this.xmlParser.linkPosteToTask(departmentId, posteId, taskId, description);
    if (success) {
        this.showDepartmentDetailsId(departmentId);
        this.showNotification(this.translate('postLinkedSuccess') || 'Position linked successfully', 'success');
    } else {
        this.showNotification(this.translate('linkPostError') || 'Error linking position', 'error');
    }
}
linkTaskToPosteWithDescription(departmentId, taskId, posteId, description = '') {
    this.linkPosteToTaskWithDescription(departmentId, posteId, taskId, description);
}
updateAssociationDescription(departmentId, posteId, taskId, description) {
    const success = this.xmlParser.updatePosteTaskAssociationDescription(departmentId, posteId, taskId, description);
    if (success) {
        this.showDepartmentDetailsId(departmentId);
        this.showNotification('Association description updated', 'success');
    } else {
        this.showNotification('Error updating association description', 'error');
    }
}
getAssociationDescription(departmentId, posteId, taskId) {
    return this.xmlParser.getPosteTaskAssociationDescription(departmentId, posteId, taskId) || '';
}
createSelectEditable(element, type, id, field, options) {
    if (!window.editModeManager || !window.editModeManager.isEditMode) return;
    if (!element) {
        console.error('Cannot create select editable: element is null');
        return;
    }
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
    element.style.position = 'relative';
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
        let container = null;
        const selectors = [
            '.tab-content-container',
            '.department-details', 
            '.modal-details-body',
            '.query-modal-details'
        ];
        for (const selector of selectors) {
            const found = element.closest(selector);
            if (found) {
                container = found;
                break;
            }
        }
        if (!container) {
            container = document.body;
        }
        let elementRect;
        try {
            elementRect = element.getBoundingClientRect();
        } catch (error) {
            console.error('Error getting element rect:', error);
            elementRect = { width: 200, height: 30 }; 
        }
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
            element.innerHTML = '';
            element.style.display = originalDisplay;
            if (newValue !== originalValue) {
                element.textContent = this.getTranslatedDepartmentType(newValue);
                this.saveInlineChange(type, id, field, newValue);
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
getTranslatedDepartmentType(type) {
    const translations = this.translations[this.lng];
    if (translations && translations.departmentTypes && translations.departmentTypes[type]) {
        return translations.departmentTypes[type];
    }
    return type; 
}
getDepartmentTypeOptions() {
    return this.departmentTypes.map(type => ({
        value: type,
        text: this.getTranslatedDepartmentType(type)
    }));
}
}
