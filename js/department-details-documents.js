class DepartmentDetailsDocuments {
    constructor(departmentDetails) {
        this.departmentDetails = departmentDetails;
        this.translations = {
            fr: {
                documentsTitle: "Documents",
                internalDocuments: "Documents",
                regulations: "Réglementations",
                noInternalDocuments: "Aucun document",
                noRegulations: "Aucune réglementation",
                noDocuments: "Aucun document ou réglementation",
                reference: "Référence",
                code: "Code",
                document: "DOCUMENT",
                regulation: "RÈGLEMENT",
                procedure: "PROCÉDURE",
                template: "MODÈLE",
                form: "FORMULAIRE",
                documentName: "Document sans nom",
                regulationName: "Réglementation sans nom",
                addDocument: "Ajouter un document",
                addRegulation: "Ajouter une réglementation",
                documentsCount: "Documents",
                link: "Associer",
                selectDocument: "Sélectionner un document...",
                noDocumentsAvailable: "Aucun document disponible pour l'association",
                documentLinkedSuccess: "Document associé avec succès",
                linkDocumentError: "Erreur lors de l'association du document",
                associatedDepartments: "Départements liés",
                associatedTasks: "Tâches associées",
                associatedDocuments: "Documents associés",
                noAssociatedDepartments: "Aucun département lié",
                noAssociatedTasks: "Aucune tâche associée",
                noAssociatedDocuments: "Aucun document associé",
                associatedDepartmentsCount: "Départements liés",
                associatedTasksCount: "Tâches associées",
                showAssociations: "Afficher associations",
                hideAssociations: "Masquer associations",
                metadata: "Métadonnées",
                page: "Page",
                linkDepartment: "Associer un département",
                linkTask: "Associer une tâche",
                unlinkDepartment: "Dissocier le département",
                unlinkTask: "Dissocier la tâche",
                confirmUnlinkDepartment: "Êtes-vous sûr de vouloir dissocier ce département ?",
                confirmUnlinkTask: "Êtes-vous sûr de vouloir dissocier cette tâche ?",
                departmentUnlinkedSuccess: "Département dissocié avec succès",
                taskUnlinkedSuccess: "Tâche dissociée avec succès",
                unlinkDepartmentError: "Erreur lors de la dissociation du département",
                unlinkTaskError: "Erreur lors de la dissociation de la tâche",
                category: "Catégorie",
                type: "Type",
                showAll: "Tout afficher",
                hideAll: "Tout masquer",
                confirmAddDocument: "Ajouter ce document au département courant ? Le document sera partagé entre les départements.",
                documentAddedSuccess: "Document ajouté avec succès !",
                addDocumentError: "Erreur lors de l'ajout du document.",
                selectExistingDocument: "Sélectionner un document",
                selectDocumentDescription: "Sélectionnez un document existant d'un autre département pour l'ajouter à ce département.",
                filterDocuments: "Filtrer les documents...",
                cancel: "Annuler",
                select: "Sélectionner",
                confirmCopyDocument: "Copier ce document dans le département courant ? Le document original restera dans son département source.",
                documentCopiedSuccess: "Document copié avec succès !",
                copyDocumentError: "Erreur lors de la copie du document.",
                usedInMultipleDepts: "Utilisé dans",
                departments: "départements"
            },
            en: {
                documentsTitle: "Documents",
                internalDocuments: "Documents",
                regulations: "Regulations",
                noInternalDocuments: "No documents",
                noRegulations: "No regulations",
                noDocuments: "No documents or regulations",
                reference: "Reference",
                code: "Code",
                document: "DOCUMENT",
                regulation: "REGULATION",
                procedure: "PROCEDURE",
                template: "TEMPLATE",
                form: "FORM",
                documentName: "Unnamed document",
                regulationName: "Unnamed regulation",
                addDocument: "Add Document",
                addRegulation: "Add Regulation",
                documentsCount: "Documents",
                link: "Link",
                selectDocument: "Select Document...",
                noDocumentsAvailable: "No documents available for linking",
                documentLinkedSuccess: "Document linked successfully",
                linkDocumentError: "Error linking document",
                associatedDepartments: "Linked departments",
                associatedTasks: "Associated tasks",
                associatedDocuments: "Associated documents",
                noAssociatedDepartments: "No linked departments",
                noAssociatedTasks: "No associated tasks",
                noAssociatedDocuments: "No associated documents",
                associatedDepartmentsCount: "Linked departments",
                associatedTasksCount: "Associated tasks",
                showAssociations: "Show associations",
                hideAssociations: "Hide associations",
                metadata: "Metadata",
                page: "Page",
                linkDepartment: "Link Department",
                linkTask: "Link Task",
                unlinkDepartment: "Unlink Department",
                unlinkTask: "Unlink Task",
                confirmUnlinkDepartment: "Are you sure you want to unlink this department?",
                confirmUnlinkTask: "Are you sure you want to unlink this task?",
                departmentUnlinkedSuccess: "Department unlinked successfully",
                taskUnlinkedSuccess: "Task unlinked successfully",
                unlinkDepartmentError: "Error unlinking department",
                unlinkTaskError: "Error unlinking task",
                category: "Category",
                type: "Type",
                showAll: "Show all",
                hideAll: "Hide all",
                confirmAddDocument: "Add this document to the current department? The document will be shared between departments.",
                documentAddedSuccess: "Document added successfully!",
                addDocumentError: "Error adding document.",
                selectExistingDocument: "Select Document",
                selectDocumentDescription: "Select an existing document from another department to add to this department.",
                filterDocuments: "Filter documents...",
                cancel: "Cancel",
                select: "Select",
                confirmCopyDocument: "Copy this document to the current department? The original document will remain in its source department.",
                documentCopiedSuccess: "Document copied successfully!",
                copyDocumentError: "Error copying document.",
                usedInMultipleDepts: "Used in",
                departments: "departments"
            }
        };
        this.categories = {
            document: { icon: '📄', label: { fr: 'Document interne', en: 'Internal Document' } },
            regulation: { icon: '⚖️', label: { fr: 'Réglementation', en: 'Regulation' } },
            procedure: { icon: '📋', label: { fr: 'Procédure', en: 'Procedure' } },
            template: { icon: '📝', label: { fr: 'Modèle', en: 'Template' } },
            form: { icon: '📑', label: { fr: 'Formulaire', en: 'Form' } }
        };
    }
    getFileIcon(fileType) {
        if (!fileType) return '📄';
        const fileTypeLower = fileType.toLowerCase();
        if (fileTypeLower.includes('pdf')) return '📕';
        if (fileTypeLower.includes('doc') || fileTypeLower.includes('word')) return '📘';
        if (fileTypeLower.includes('xls') || fileTypeLower.includes('excel') || fileTypeLower.includes('csv')) return '📗';
        if (fileTypeLower.includes('ppt') || fileTypeLower.includes('powerpoint')) return '📙';
        if (fileTypeLower.includes('jpg') || fileTypeLower.includes('jpeg') || 
            fileTypeLower.includes('png') || fileTypeLower.includes('gif') || 
            fileTypeLower.includes('bmp') || fileTypeLower.includes('image')) return '🖼️';
        if (fileTypeLower.includes('txt') || fileTypeLower.includes('text')) return '📄';
        if (fileTypeLower.includes('zip') || fileTypeLower.includes('rar') || 
            fileTypeLower.includes('tar') || fileTypeLower.includes('gz')) return '🗜️';
        if (fileTypeLower.includes('html') || fileTypeLower.includes('htm')) return '🌐';
        if (fileTypeLower.includes('xml')) return '📋';
        if (fileTypeLower.includes('json')) return '🔤';
        return '📄'; 
    }
    updateTab(data, departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const tabDocuments = container.querySelector('#tab-documents');
        if (!tabDocuments) return;
        const lng = this.departmentDetails.lng;
        const isEditMode = !!(window.editModeManager && window.editModeManager.isEditMode);
        tabDocuments.innerHTML = `
            <div class="detail-section" id="documents-section">
                <div class="detail-controls" style="${isEditMode ? '' : 'display:none;'}">
                    <button class="toggle-all-btn" id="toggle-all-documents">${this.translations[lng].showAll}</button>
                </div>
                <h5>${this.translations[lng].documentsTitle} <span class="badge-count" id="documents-count"></span></h5>
                <div id="dept-documents"></div>
            </div>
        `;
        this.initControls(tabDocuments);
        this.prepareDocumentsData(data, departmentId);
    }
        initControls(tabDocuments) {
        const toggleAllDocumentsBtn = tabDocuments.querySelector('#toggle-all-documents');
        if (toggleAllDocumentsBtn) {
            toggleAllDocumentsBtn.addEventListener('click', () => {
                const isCurrentlyHidden = toggleAllDocumentsBtn.textContent === this.translations[this.departmentDetails.lng].showAll;
                this.toggleAllItems('document', isCurrentlyHidden);
                toggleAllDocumentsBtn.textContent = isCurrentlyHidden ?
                    this.translations[this.departmentDetails.lng].hideAll : this.translations[this.departmentDetails.lng].showAll;
            });
        }
    }
    toggleAllItems(itemType, show) {
        const container = this.departmentDetails.getContentContainer();
        const items = container.querySelectorAll(`.${itemType}-item`);
        items.forEach(item => {
            const associatedItems = item.querySelector('.associated-items');
            const metadataSection = item.querySelector('.document-metadata-section');
            if (associatedItems) {
                associatedItems.style.display = show ? 'block' : 'none';
            }
            if (metadataSection) {
                metadataSection.style.display = show ? 'block' : 'none';
            }
        });
    }
    prepareDocumentsData(data, departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const documentsContainer = container.querySelector('#dept-documents');
        const documentsCount = container.querySelector('#documents-count');
        if (!documentsContainer || !documentsCount) return;
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const lng = this.departmentDetails.lng;
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
            addBtnContainer.classList.add('details-add-actions');
            addBtnContainer.innerHTML = `
                <button class="btn-add-document" id="add-document-btn">
                    + ${this.translations[lng].addDocument}
                </button>
                <button class="btn-add-item" id="select-document-btn">
                    📋 ${this.translations[lng].selectExistingDocument}
                </button>
            `;
            addBtnContainer.querySelector('#add-document-btn').addEventListener('click', () => {
                this.showCategorySelector(departmentId);
            });
            addBtnContainer.querySelector('#select-document-btn').addEventListener('click', () => {
                this.showSelectDocumentUI(departmentId);
            });
            documentsContainer.appendChild(addBtnContainer);
        }
        const fichiers = this.departmentDetails.xmlParser.getDocuments(data.id);
        if (fichiers && fichiers.length > 0) {
            const documentsByCategory = {};
            Object.keys(this.categories).forEach(category => {
                documentsByCategory[category] = fichiers.filter(f => f.category === category);
            });
            let totalDocuments = 0;
            let documentsHTML = '';
            Object.entries(documentsByCategory).forEach(([category, docs]) => {
                if (docs.length > 0) {
                    documentsHTML += this.createDocumentsCategoryHTML(
                        docs, 
                        category, 
                        data, 
                        departmentId, 
                        isEditMode, 
                        lng
                    );
                    totalDocuments += docs.length;
                } else if (isEditMode) {
                    const categoryInfo = this.categories[category];
                    documentsHTML += `
                        <div class="documents-category">
                            <h6>${categoryInfo.icon} ${categoryInfo.label[lng]}</h6>
                            <div class="no-data">${lng === 'fr' ? 'Aucun document' : 'No documents'}</div>
                        </div>
                    `;
                }
            });
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
            this.initDocumentEditableFields(documentsContainer, departmentId, isEditMode);
        } else {
            documentsCount.textContent = '0';
            const noDataContent = document.createElement('div');
            noDataContent.className = 'documents-content';
            if (isEditMode) {
                noDataContent.innerHTML = `
                    <div class="no-data">
                        ${this.translations[lng].noDocuments} 
                        (${lng === 'fr' ? 'Cliquez sur "Ajouter un document" ou "Sélectionner un document" pour ajouter un document' : 'Click "Add Document" or "Select Document" to add a document'})
                    </div>
                `;
            } else {
                noDataContent.innerHTML = `<div class="no-data">${this.translations[lng].noDocuments}</div>`;
            }
            const addBtnContainer = documentsContainer.querySelector('.add-item-container');
            if (addBtnContainer) {
                documentsContainer.insertBefore(noDataContent, addBtnContainer.nextSibling);
            } else {
                documentsContainer.appendChild(noDataContent);
            }
        }
    }
    showSelectDocumentUI(departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const documentsContainer = container.querySelector('#dept-documents');
        const addBtnContainer = documentsContainer.querySelector('.add-item-container');
        if (!addBtnContainer) return;
        const existingUI = addBtnContainer.querySelector('.select-document-ui');
        if (existingUI) {
            existingUI.remove();
            return;
        }
        const allDepartments = this.departmentDetails.xmlParser.departements || [];
        let allDocuments = [];
        allDepartments.forEach(dept => {
            if (dept.fichiers && dept.fichiers.length > 0) {
                dept.fichiers.forEach(doc => {
                    allDocuments.push({
                        ...doc,
                        deptId: dept.id,
                        deptName: dept.nom
                    });
                });
            }
        });
        const currentDept = this.departmentDetails.xmlParser.getDepartement(departmentId);
        const currentDocumentIds = currentDept.fichiers ? currentDept.fichiers.map(d => d.id) : [];
        const availableDocuments = allDocuments.filter(doc => !currentDocumentIds.includes(doc.id));
        if (availableDocuments.length === 0) {
            this.departmentDetails.showAlert(this.translations[this.departmentDetails.lng].noDocumentsAvailable);
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'select-document-ui';
        uiContainer.style.marginTop = '20px';
        uiContainer.style.padding = '20px';
        uiContainer.style.background = 'var(--bg-secondary)';
        uiContainer.style.borderRadius = '8px';
        uiContainer.style.border = '1px solid var(--border-color)';
        uiContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        uiContainer.style.maxWidth = '500px';
        const lng = this.departmentDetails.lng;
        uiContainer.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary); font-size: 16px;">
                    ${this.translations[lng].selectExistingDocument}
                </h4>
                <p style="margin: 0; color: var(--text-secondary); font-size: 14px;">
                    ${this.translations[lng].selectDocumentDescription}
                </p>
            </div>
            <div style="margin-bottom: 15px;">
                <input type="text" 
                    id="filter-documents" 
                    placeholder="${this.translations[lng].filterDocuments}" 
                    style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary); color: var(--text-primary);">
            </div>
            <div id="documents-list-container" style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary);">
                <div id="documents-list" style="padding: 10px;"></div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;">
                <button id="cancel-select-document" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    ${this.translations[lng].cancel}
                </button>
            </div>
        `;
        addBtnContainer.parentNode.insertBefore(uiContainer, addBtnContainer.nextSibling);
        this.populateDocumentsList(availableDocuments, departmentId, uiContainer);
        const filterInput = uiContainer.querySelector('#filter-documents');
        filterInput.addEventListener('input', (e) => {
            this.filterDocumentsList(e.target.value.toLowerCase(), availableDocuments, departmentId, uiContainer);
        });
        const cancelBtn = uiContainer.querySelector('#cancel-select-document');
        cancelBtn.addEventListener('click', () => {
            uiContainer.remove();
        });
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target.id !== 'select-document-btn') {
                    uiContainer.remove();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
        filterInput.focus();
    }
    filterDocumentsList(filterText, allDocuments, departmentId, uiContainer) {
        if (!filterText) {
            this.populateDocumentsList(allDocuments, departmentId, uiContainer);
            return;
        }
        const filteredDocuments = allDocuments.filter(doc => {
            return (
                (doc.nom && doc.nom.toLowerCase().includes(filterText)) ||
                (doc.id && doc.id.toLowerCase().includes(filterText)) ||
                (doc.code && doc.code.toLowerCase().includes(filterText)) ||
                (doc.description && doc.description.toLowerCase().includes(filterText)) ||
                (doc.deptName && doc.deptName.toLowerCase().includes(filterText)) ||
                (doc.category && doc.category.toLowerCase().includes(filterText)) ||
                (doc.reglementation && doc.reglementation.toLowerCase().includes(filterText))
            );
        });
        this.populateDocumentsList(filteredDocuments, departmentId, uiContainer);
    }
     populateDocumentsList(documents, departmentId, uiContainer) {
        const documentsList = uiContainer.querySelector('#documents-list');
        documentsList.innerHTML = '';
        if (documents.length === 0) {
            documentsList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary); font-style: italic;">
                    ${this.translations[this.departmentDetails.lng].noDocumentsAvailable}
                </div>
            `;
            return;
        }
        const documentsByDept = {};
        documents.forEach(doc => {
            if (!documentsByDept[doc.deptId]) {
                documentsByDept[doc.deptId] = {
                    deptName: doc.deptName,
                    documents: []
                };
            }
            documentsByDept[doc.deptId].documents.push(doc);
        });
        Object.entries(documentsByDept).forEach(([deptId, deptData]) => {
            const deptSection = document.createElement('div');
            deptSection.style.marginBottom = '15px';
            deptSection.innerHTML = `
                <div style="font-weight: 600; color: var(--brand); font-size: 14px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--border-color);">
                    📁 ${deptData.deptName}
                </div>
            `;
            const documentsContainer = document.createElement('div');
            documentsContainer.style.display = 'flex';
            documentsContainer.style.flexDirection = 'column';
            documentsContainer.style.gap = '8px';
            deptData.documents.forEach(doc => {
                const docItem = document.createElement('div');
                docItem.className = 'selectable-document-item';
                docItem.style.padding = '10px';
                docItem.style.border = '1px solid var(--border-color)';
                docItem.style.borderRadius = '6px';
                docItem.style.background = 'var(--bg-secondary)';
                docItem.style.cursor = 'pointer';
                docItem.style.transition = 'all 0.2s';
                docItem.style.display = 'flex';
                docItem.style.justifyContent = 'space-between';
                docItem.style.alignItems = 'center';
                const categoryInfo = this.categories[doc.category] || this.categories.document;
                const categoryIcon = categoryInfo.icon;
                const fileIcon = this.getFileIcon(doc.document_type);
                docItem.innerHTML = `
                    <div style="flex: 1;">
                        <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                            ${fileIcon} ${categoryIcon} ${doc.nom || doc.id}
                            ${doc.code ? `<span style="font-size: 12px; color: var(--text-secondary);">(${doc.code})</span>` : ''}
                        </div>
                        ${doc.description ? `<div style="font-size: 12px; color: var(--text-secondary);">${doc.description.substring(0, 60)}${doc.description.length > 60 ? '...' : ''}</div>` : ''}
                        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">
                            <span style="background: #e3f2fd; padding: 2px 6px; border-radius: 3px; margin-right: 5px;">
                                ${categoryInfo.label[this.departmentDetails.lng]}
                            </span>
                            ${doc.document_type ? `<span style="background: #f3e5f5; padding: 2px 6px; border-radius: 3px;">${fileIcon} ${doc.document_type}</span>` : ''}
                        </div>
                    </div>
                    <button class="select-this-document-btn" 
                            data-doc-id="${doc.id}"
                            data-dept-id="${doc.deptId}"
                            style="padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        ${this.translations[this.departmentDetails.lng].select}
                    </button>
                `;
                docItem.addEventListener('mouseenter', () => {
                    docItem.style.background = 'var(--bg-hover)';
                    docItem.style.borderColor = 'var(--brand)';
                });
                docItem.addEventListener('mouseleave', () => {
                    docItem.style.background = 'var(--bg-secondary)';
                    docItem.style.borderColor = 'var(--border-color)';
                });
                docItem.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('select-this-document-btn')) {
                        this.selectExistingDocument(departmentId, doc.deptId, doc.id, uiContainer);
                    }
                });
                documentsContainer.appendChild(docItem);
            });
            deptSection.appendChild(documentsContainer);
            documentsList.appendChild(deptSection);
        });
        documentsList.querySelectorAll('.select-this-document-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const docId = btn.getAttribute('data-doc-id');
                const sourceDeptId = btn.getAttribute('data-dept-id');
                this.selectExistingDocument(departmentId, sourceDeptId, docId, uiContainer);
            });
        });
    }
    async selectExistingDocument(targetDeptId, sourceDeptId, documentId, uiContainer) {
        const lng = this.departmentDetails.lng;
        if (!await this.departmentDetails.showConfirm(this.translations[lng].confirmAddDocument)) {
            return;
        }
        try {
            const success = this.departmentDetails.xmlParser.addDocumentReferenceToDepartment(sourceDeptId, documentId, targetDeptId);
            if (success) {
                uiContainer.remove();
                this.departmentDetails.showDepartmentDetailsId(targetDeptId);
                this.departmentDetails.showNotification(this.translations[lng].documentAddedSuccess, 'success');
            } else {
                this.departmentDetails.showNotification(this.translations[lng].addDocumentError, 'error');
            }
        } catch (error) {
            console.error('Error adding document reference:', error);
            this.departmentDetails.showNotification(this.translations[lng].addDocumentError, 'error');
        }
    }
    showCategorySelector(departmentId) {
        const lng = this.departmentDetails.lng;
        const modal = document.createElement('div');
        modal.className = 'details-link-modal';
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = 'white';
        modalContent.style.padding = '20px';
        modalContent.style.borderRadius = '8px';
        modalContent.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        modalContent.style.maxWidth = '400px';
        modalContent.style.width = '90%';
        modalContent.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 20px;">
                ${lng === 'fr' ? 'Choisir le type de document' : 'Choose document type'}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${Object.entries(this.categories).map(([key, category]) => `
                    <button 
                        class="category-select-btn" 
                        data-category="${key}"
                        style="
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            padding: 12px 16px;
                            border: 1px solid #ddd;
                            border-radius: 6px;
                            background: white;
                            cursor: pointer;
                            text-align: left;
                            transition: all 0.2s ease;
                        "
                        onmouseover="this.style.borderColor='#667eea'; this.style.backgroundColor='#f7f9ff';"
                        onmouseout="this.style.borderColor='#ddd'; this.style.backgroundColor='white';"
                    >
                        <span style="font-size: 1.2em;">${category.icon}</span>
                        <div style="flex: 1;">
                            <div style="font-weight: bold;">${category.label[lng]}</div>
                        </div>
                    </button>
                `).join('')}
            </div>
            <div style="margin-top: 20px; text-align: right;">
                <button id="cancel-category-select" style="
                    padding: 8px 16px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    margin-right: 10px;
                ">
                    ${lng === 'fr' ? 'Annuler' : 'Cancel'}
                </button>
            </div>
        `;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modalContent.querySelectorAll('.category-select-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                this.departmentDetails.xmlParser.addDocument(departmentId, category);
                this.departmentDetails.showDepartmentDetailsId(departmentId);
                document.body.removeChild(modal);
            });
        });
        modalContent.querySelector('#cancel-category-select').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    createDocumentsCategoryHTML(documents, categoryKey, data, departmentId, isEditMode, lng) {
        const categoryInfo = this.categories[categoryKey];
        const categoryLabel = categoryInfo.label[lng];
        const categoryIcon = categoryInfo.icon;
        let html = `
            <div class="documents-category">
                <h6>${categoryIcon} ${categoryLabel}</h6>
                <div class="documents-list">
        `;
        documents.forEach(doc => {
            const associatedDepartments = this.departmentDetails.xmlParser.getRelatedDepartmentsForDocument(departmentId, doc.id).map(department => {
                return {
                    ...department
                };
            });
            const associatedTasks = this.departmentDetails.xmlParser.getTasksForDocument(departmentId, doc.id).map(task => {
                const pageRef = this.departmentDetails.xmlParser.getPageReferenceForTaskDocument(departmentId, task.id, doc.id);
                return {
                    ...task,
                    page_reference: pageRef || ''
                };
            });
            html += this.createDocumentElementHTML(doc, categoryKey, data, departmentId, associatedDepartments, associatedTasks, isEditMode, lng);
        });
        html += `
                </div>
            </div>
        `;
        return html;
    }
    createDocumentElementHTML(doc, categoryKey, data, departmentId, associatedDepartments, associatedTasks, isEditMode, lng) {
        const categoryInfo = this.categories[categoryKey];
        const docName = doc.nom || this.translations[lng][`${categoryKey}Name`] || this.translations[lng].documentName;
        const docTypeBadge = this.translations[lng][categoryKey] || this.translations[lng].document;
        const usageCount = this.departmentDetails.xmlParser.getDocumentUsageCount ? 
            this.departmentDetails.xmlParser.getDocumentUsageCount(doc.id) || 1 : 1;
        const usageIndicator = usageCount > 1 ? 
            `<span class="usage-badge" title="${this.translations[lng].usedInMultipleDepts} ${usageCount} ${this.translations[lng].departments}">${usageCount}×</span>` : '';
        const docLink = doc.lien ? `
            <a href="${doc.lien}" target="_blank" class="document-link">
                ${docName}
            </a>
        ` : `<span class="document-name">${docName}</span>`;
        let linkHTML = '';
        const getFileNameFromLink = (link) => {
            if (!link) return '';
            try {
                const normalized = String(link).split('#')[0].split('?')[0];
                const parts = normalized.split('/').filter(Boolean);
                if (parts.length === 0) return '';
                return decodeURIComponent(parts[parts.length - 1]);
            } catch (e) {
                return '';
            }
        };
        if (doc.lien || isEditMode) {
            if (doc.lien) {
                const fileIcon = this.getFileIcon(doc.document_type);
                const fileName = getFileNameFromLink(doc.lien);
                const isExternalLink = doc.lien.startsWith('http://') || doc.lien.startsWith('https://');
                const linkLabel = !isEditMode && fileName ? fileName : this.translations[lng].link;
                if (isExternalLink) {
                    linkHTML = `
                        <div class="document-link-row">${fileIcon}
                            <a href="${doc.lien}" target="_blank" class="document-external-link" 
                                onclick="event.stopPropagation();"
                                title="${doc.lien}">
                                ${linkLabel}
                            </a>
                            <span class="editable-link-value" style="display:none;">${doc.lien}</span>
                        </div>
                    `;
                } else {
                    linkHTML = `
                        <div class="document-link-row">${fileIcon} ${linkLabel}
                            <span class="editable-link-value" style="display:none;">${doc.lien}</span>
                        </div>
                    `;
                }
            } else if (isEditMode) {
                const fileIcon = this.getFileIcon(doc.document_type || 'document');
                linkHTML = `
                    <div class="document-link-row">
                        <span class="editable-link-value" style="color:#999;font-style:italic;">
                            ${fileIcon} (${lng === 'fr' ? 'Ajouter lien' : 'Add document link'})
                        </span>
                    </div>
                `;
            }
        }
        const metadataHTML = this.createMetadataHTML(doc, departmentId, isEditMode, lng);
        const departmentsHTML = this.createDocumentAssociationsHTML(associatedDepartments, doc, departmentId, 'departments', isEditMode, lng);
        const tasksHTML = this.createDocumentAssociationsHTML(associatedTasks, doc, departmentId, 'tasks', isEditMode, lng);
        const totalAssociations = associatedDepartments.length + associatedTasks.length;
        const associationBadge = totalAssociations > 0 ?
            `<span class="association-badge" title="${totalAssociations} ${this.translations[lng].showAssociations}">🔗 ${totalAssociations}</span>` : '';
        const shouldShowRef = doc.ref || isEditMode;
        const shouldShowCode = doc.code || isEditMode;
        const shouldShowDesc = doc.description || isEditMode;
        const shouldShowPageRef = doc.page_reference || isEditMode;
        const shouldShowCategory = false;
        const shouldShowDocType = doc.document_type || isEditMode;
        let regulationFieldsHTML = '';
        if (categoryKey === 'regulation') {
            const shouldShowRegName = doc.reglementation || isEditMode;
            const shouldShowRegCode = doc.regle_code || isEditMode;
            const shouldShowRegTitle = doc.regle_titre || isEditMode;
            const shouldShowRegDesc = doc.regle_description || isEditMode;
            regulationFieldsHTML = `
                ${shouldShowRegName ? `
                    <div class="regulation-name">
                        ${this.translations[lng].regulation}: <span class="editable-reg-name">${doc.reglementation || `(${lng === 'fr' ? 'Ajouter nom de réglementation' : 'Add Regulation Name'})`}</span>
                    </div>
                ` : ''}
                ${shouldShowRegCode ? `
                    <div class="regulation-code">
                        ${this.translations[lng].code}: <span class="editable-reg-code">${doc.regle_code || `(${lng === 'fr' ? 'Ajouter code de règle' : 'Add Rule Code'})`}</span>
                    </div>
                ` : ''}
                ${shouldShowRegTitle ? `
                    <div class="regulation-title">
                        <span class="editable-reg-title">${doc.regle_titre || `(${lng === 'fr' ? 'Ajouter titre de règle' : 'Add Rule Title'})`}</span>
                    </div>
                ` : ''}
                ${shouldShowRegDesc ? `
                    <div class="regulation-description">
                        <span class="editable-reg-desc">${doc.regle_description || `(${lng === 'fr' ? 'Ajouter description de règle' : 'Add Rule Description'})`}</span>
                    </div>
                ` : ''}
            `;
        }
        return `
            <div class="document-item ${categoryKey}" data-id="${doc.id}">
                <div class="document-header">
                    <div class="document-header-main">
                        ${docLink}
                        ${usageIndicator} <!-- Ajout de l'indicateur d'utilisation -->
                        ${associationBadge}
                        ${isEditMode ?
                            `<span class="btn-delete-item-doc" title="${lng === 'fr' ? 'Supprimer' : 'Delete'} ${categoryInfo.label[lng].toLowerCase()}" 
                                onclick="(async () => { event.stopPropagation(); if(await window.editModeManager.messageManager.showConfirm('${lng === 'fr' ? 'Supprimer' : 'Delete'} ${lng === 'fr' ? 'ce' : 'this'} ${categoryInfo.label[lng].toLowerCase()}?')) { 
                                    window.app.queryDetails.documentManager.deleteDocument('${data.id}', '${doc.id}'); 
                                    window.app.queryDetails.showDepartmentDetailsId('${data.id}'); 
                                }})()">🗑️</span>`
                        : ''}
                    </div>
                    <span class="document-type-badge ${categoryKey}">${docTypeBadge}</span>
                </div>
                ${linkHTML}
                <!-- Informations sur la catégorie et le type -->
                ${shouldShowCategory ? `
                    <div class="document-category-row">
                        ${this.translations[lng].category}: 
                        ${isEditMode ? `
                            <select class="editable-doc-category" style="margin-left: 5px; padding: 2px 5px; border-radius: 3px; border: 1px solid #ddd;">
                                ${Object.entries(this.categories).map(([key, cat]) => `
                                    <option value="${key}" ${key === doc.category ? 'selected' : ''}>
                                        ${cat.label[lng]}
                                    </option>
                                `).join('')}
                            </select>
                        ` : `<span class="category-value">${categoryInfo.label[lng]}</span>`}
                    </div>
                ` : ''}
                ${shouldShowDocType ? `
                    <div class="document-type-row">
                        ${this.getFileIcon(doc.document_type)} ${this.translations[lng].type}: 
                        <span class="editable-doc-type">${doc.document_type || `(${lng === 'fr' ? 'Ajouter type de fichier' : 'Add file type'})`}</span>
                    </div>
                ` : ''}
                ${shouldShowRef ? `
                    <div class="document-ref-row">
                        ${this.translations[lng].reference} <span class="editable-doc-ref">${doc.ref || `(${lng === 'fr' ? 'Ajouter référence' : 'Add Ref'})`}</span>
                    </div>
                ` : ''}
                ${shouldShowCode ? `
                    <div class="document-code-row">
                        ${this.translations[lng].code} <span class="editable-doc-code">${doc.code || `(${lng === 'fr' ? 'Ajouter code' : 'Add Code'})`}</span>
                    </div>
                ` : ''}
                ${shouldShowDesc ? `
                    <div class="document-description">
                        ${doc.description || `(${lng === 'fr' ? 'Ajouter description' : 'Add Description'})`}
                    </div>
                ` : ''}
                ${regulationFieldsHTML}
                ${shouldShowPageRef ? `
                    <div class="document-page-ref-row">
                        ${this.translations[lng].page}: <span class="editable-doc-page-ref">${doc.page_reference || `(${lng === 'fr' ? 'Ajouter référence de page' : 'Add Page Reference'})`}</span>
                    </div>
                ` : ''}
                ${metadataHTML}
                <!-- Boutons pour afficher/masquer les associations -->
                ${(associatedDepartments.length > 0 || associatedTasks.length > 0 || isEditMode) ? `
                    <div class="document-associations-controls">
                        ${associatedDepartments.length > 0 || isEditMode ?
                            `<button class="toggle-associations-btn" data-type="departments" data-doc-id="${doc.id}">
                                🏢 ${this.translations[lng].associatedDepartmentsCount} (${associatedDepartments.length})
                            </button>` : ''}
                        ${associatedTasks.length > 0 || isEditMode ?
                            `<button class="toggle-associations-btn" data-type="tasks" data-doc-id="${doc.id}">
                                📝 ${this.translations[lng].associatedTasksCount} (${associatedTasks.length})
                            </button>` : ''}
                    </div>
                ` : ''}
                ${departmentsHTML}
                ${tasksHTML}
            </div>
        `;
    }
    createMetadataHTML(doc, departmentId, isEditMode, lng) {
        const metadataItems = [];
        Object.entries(doc).forEach(([key, value]) => {
            const hasDisplayableValue = value !== null && value !== undefined && String(value).trim() !== '';
            if (key.startsWith('key-') && hasDisplayableValue) {
                metadataItems.push({ key, value, cleanKey: key.replace('key-', '').replace(/_/g, ' ') });
            }
        });
        if ( isEditMode) { 
            return `
                <div class="document-metadata-section">
                    <div class="metadata-header">
                        <strong>${this.translations[lng].metadata}</strong>
                        ${isEditMode ? 
                            `<button class="btn-add-metadata" data-doc-id="${doc.id}" title="${lng === 'fr' ? 'Ajouter métadonnée' : 'Add metadata'}">
                                <span style="font-size: 12px; padding: 2px 6px; background: #4CAF50; color: white; border-radius: 3px;">+ ${lng === 'fr' ? 'Ajouter' : 'Add'}</span>
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
                                        <button class="btn-edit-metadata" title="${lng === 'fr' ? 'Modifier' : 'Edit'}" style="font-size: 10px; padding: 1px 4px;">✏️</button>
                                        <button class="btn-delete-metadata" title="${lng === 'fr' ? 'Supprimer' : 'Delete'}" style="font-size: 10px; padding: 1px 4px;">🗑️</button>
                                    </div>` 
                                    : ''}
                            </div>
                        `).join('')}
                        ${isEditMode && metadataItems.length === 0 ? 
                            `<div class="no-metadata">${lng === 'fr' ? 'Aucune métadonnée. Cliquez sur "Ajouter" pour en ajouter.' : 'No metadata. Click "Add" to add metadata.'}</div>` 
                            : ''}
                    </div>
                </div>
            `;
        }
        return '';
    }
    createDocumentAssociationsHTML(associatedItems, doc, departmentId, type, isEditMode, lng) {
        const isDepartmentType = type === 'departments';
        const isTaskType = type === 'tasks';
        const typeText = isDepartmentType ? this.translations[lng].associatedDepartments : this.translations[lng].associatedTasks;
        const noItemsText = isDepartmentType ? this.translations[lng].noAssociatedDepartments : this.translations[lng].noAssociatedTasks;
        const linkButtonText = isDepartmentType ? this.translations[lng].linkDepartment : this.translations[lng].linkTask;
        const unlinkButtonText = isDepartmentType ? this.translations[lng].unlinkDepartment : this.translations[lng].unlinkTask;
        const itemIdField = isDepartmentType ? 'data-department-id' : 'data-task-id';
        const itemNameField = isDepartmentType ? 'department-name' : 'task-name';
        if (associatedItems.length > 0 || isEditMode) {
            return `
                <div class="associated-items document-${type}" style="display: none;">
                    <div class="associated-title">
                        <strong>${typeText}:</strong>
                        <span class="badge-count small">${associatedItems.length}</span>
                        ${isEditMode ?
                            `<button class="btn-link-item" title="${linkButtonText}" 
                                onclick="event.stopPropagation(); window.app.queryDetails.documentManager.showLinkToDocumentUI('${departmentId}', '${doc.id}', this, '${type}')">+</button>` : ''}
                    </div>
                    <div class="associated-${type}-container">
                        ${associatedItems.length > 0 ? associatedItems.map(item => {
                            const pageRefHTML = isTaskType && item.page_reference ? `
                                <div class="document-page-reference-small">
                                    <strong>${this.translations[lng].page}:</strong>
                                    <span class="page-ref-value-small" 
                                        data-document-id="${doc.id}"
                                        ${itemIdField}="${item.id}"
                                        data-field="page_reference"
                                        style="cursor: ${isEditMode ? 'text' : 'default'}; 
                                                padding: 2px 6px; 
                                                border-radius: 3px;
                                                ${isEditMode ? 'border: 1px dashed transparent;' : ''}
                                                transition: all 0.2s ease;">
                                        ${item.page_reference}
                                    </span>
                                    ${isEditMode ? `<span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>` : ''}
                                </div>
                            ` : (isTaskType && isEditMode) ? `
                                <div class="document-page-reference-small">
                                    <strong>${this.translations[lng].page}:</strong>
                                    <span class="page-ref-value-small" 
                                        data-document-id="${doc.id}"
                                        ${itemIdField}="${item.id}"
                                        data-field="page_reference"
                                        style="cursor: text; 
                                                padding: 2px 6px; 
                                                border-radius: 3px;
                                                border: 1px dashed transparent;
                                                color: #999;
                                                font-style: italic;
                                                transition: all 0.2s ease;">
                                        (${lng === 'fr' ? 'Ajouter référence de page' : 'Add page reference'})
                                    </span>
                                    <span class="edit-page-ref-hint" style="font-size:11px; color:#666; margin-left:5px;">(click to edit)</span>
                                </div>
                            ` : '';
                            return `
                                <div class="associated-${type.slice(0, -1)}-item">
                                    <div class="${isDepartmentType ? 'department' : 'task'}-header-row">
                                        <div class="${isDepartmentType ? 'department' : 'task'}-info">
                                            <span class="${itemNameField}">${item.nom || item.id}</span>
                                            ${isDepartmentType && item.abbreviation ? `<span class="department-abbr">${item.abbreviation}</span>` : ''}
                                            ${isDepartmentType && item.relation ? `<span class="department-relation">${item.relation}</span>` : ''}
                                            ${isTaskType && item.categorie ? `<span class="task-category">${item.categorie}</span>` : ''}
                                        </div>
                                        ${isEditMode ?
                                            `<button class="btn-unlink-assoc" 
                                                title="${unlinkButtonText}"
                                                onclick="event.stopPropagation(); window.app.queryDetails.documentManager.unlinkFromDocument('${departmentId}', '${item.id}', '${doc.id}', '${type}')">
                                                🗑️
                                            </button>` : ''}
                                    </div>
                                    ${isDepartmentType && item.type ? `<div class="department-description-small">${item.type}</div>` : ''}
                                    ${isTaskType && item.description ? `<div class="task-description-small">${item.description}</div>` : ''}
                                    ${pageRefHTML}
                                </div>
                            `;
                        }).join('') : `<div class="no-associated">${noItemsText}</div>`}
                    </div>
                </div>
            `;
        }
        return '';
    }
    initDocumentAssociationsEvents(documentsContainer) {
        if (!documentsContainer) return;
        if (documentsContainer._associationClickHandler) {
            documentsContainer.removeEventListener('click', documentsContainer._associationClickHandler);
        }
        const clickHandler = (e) => {
            const toggleBtn = e.target.closest('.toggle-associations-btn');
            if (!toggleBtn) return;
            e.preventDefault();
            e.stopPropagation();
            const documentItem = toggleBtn.closest('.document-item');
            if (!documentItem) return;
            const associationType = toggleBtn.getAttribute('data-type');
            if (!associationType) return;
            const associationsContainer = documentItem.querySelector(`.associated-items.document-${associationType}`);
            if (!associationsContainer) return;
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
    initDocumentEditableFields(documentsContainer, departmentId, isEditMode) {
        if (!isEditMode) return;
        documentsContainer.querySelectorAll('.document-item').forEach(item => {
            const docId = item.getAttribute('data-id');
            const nameEl = item.querySelector('.document-name') || item.querySelector('.document-link');
            const descEl = item.querySelector('.document-description');
            const refEl = item.querySelector('.editable-doc-ref');
            const codeEl = item.querySelector('.editable-doc-code');
            const pageRefEl = item.querySelector('.editable-doc-page-ref');
            const linkEl = item.querySelector('.editable-link-value');
            const docTypeEl = item.querySelector('.editable-doc-type');
            const categorySelect = item.querySelector('.editable-doc-category');
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
                    this.departmentDetails.makeElementEditable(span, 'document', docId, 'nom');
                } else {
                    this.departmentDetails.makeElementEditable(nameEl, 'document', docId, 'nom');
                }
            }
            if (linkEl) {
                this.departmentDetails.makeElementEditable(linkEl, 'document', docId, 'lien');
                const linkRow = item.querySelector('.document-link-row');
                if (linkRow) {
                    const externalLink = linkRow.querySelector('.document-external-link');
                    if (externalLink) {
                        externalLink.style.display = 'none';
                    }
                    linkEl.style.display = 'inline';
                    linkEl.style.color = '#555';
                }
            }
            if (descEl) this.departmentDetails.makeElementEditable(descEl, 'document', docId, 'description', true);
            if (refEl) this.departmentDetails.makeElementEditable(refEl, 'document', docId, 'ref');
            if (codeEl) this.departmentDetails.makeElementEditable(codeEl, 'document', docId, 'code');
            if (pageRefEl) this.departmentDetails.makeElementEditable(pageRefEl, 'document', docId, 'page_reference');
            if (docTypeEl) this.departmentDetails.makeElementEditable(docTypeEl, 'document', docId, 'document_type');
            if (categorySelect) {
                categorySelect.addEventListener('change', () => {
                    const newCategory = categorySelect.value;
                    this.departmentDetails.xmlParser.updateDocumentField(departmentId, docId, 'category', newCategory);
                    setTimeout(() => {
                        this.departmentDetails.showDepartmentDetailsId(departmentId);
                    }, 100);
                });
            }
            if (regNameEl) this.departmentDetails.makeElementEditable(regNameEl, 'document', docId, 'reglementation');
            if (regCodeEl) this.departmentDetails.makeElementEditable(regCodeEl, 'document', docId, 'regle_code');
            if (regTitleEl) this.departmentDetails.makeElementEditable(regTitleEl, 'document', docId, 'regle_titre');
            if (regDescEl) this.departmentDetails.makeElementEditable(regDescEl, 'document', docId, 'regle_description', true);
            item.querySelectorAll('.page-ref-value-small[data-task-id]').forEach(pageRefElement => {
                this.makePageReferenceEditable(pageRefElement, 'task', departmentId, docId);
            });
        });
    }
    makePageReferenceEditable(pageRefElement, type, departmentId, docId) {
        const associatedId = pageRefElement.getAttribute('data-task-id');
        pageRefElement.addEventListener('click', (e) => {
            if (!window.editModeManager || !window.editModeManager.isEditMode) return;
            e.stopPropagation();
            if (pageRefElement.querySelector('input')) return;
            const originalValue = pageRefElement.textContent.trim();
            const isPlaceholder = originalValue.includes('Ajouter') || originalValue.includes('Add');
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
                    if (type === 'task') {
                        this.departmentDetails.xmlParser.updateTaskDocumentPageReference(departmentId, associatedId, docId, newValue);
                    }
                    if (newValue === '') {
                        pageRefElement.textContent = this.departmentDetails.lng === 'fr' ? 
                            '(Ajouter référence de page)' : '(Add page reference)';
                        pageRefElement.style.color = '#999';
                        pageRefElement.style.fontStyle = 'italic';
                    } else {
                        pageRefElement.style.color = '';
                        pageRefElement.style.fontStyle = '';
                    }
                } else {
                    if (isPlaceholder) {
                        pageRefElement.textContent = this.departmentDetails.lng === 'fr' ? 
                            '(Ajouter référence de page)' : '(Add page reference)';
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
    async deleteDocument(departmentId, documentId) {
        const lng = this.departmentDetails.lng;
        if (await this.departmentDetails.showConfirm(lng === 'fr' ? 'Supprimer ce document ?' : 'Delete this document?')) {
            this.departmentDetails.xmlParser.deleteDocument(departmentId, documentId);
            this.departmentDetails.showDepartmentDetailsId(departmentId);
        }
    }
    showLinkToDocumentUI(deptId, documentId, btnElement, associationType) {
        const lng = this.departmentDetails.lng;
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        const modalContent = document.createElement('div');
        modalContent.className = 'details-link-modal-content';
        const department = this.departmentDetails.xmlParser.getDepartement(deptId);
        let availableItems = [];
        let existingAssociations = [];
        let title = '';
        let noItemsText = '';
        if (associationType === 'departments') {
            availableItems = this.departmentDetails.xmlParser.getAvailableDepartmentsForDocument(deptId, documentId);
            existingAssociations = this.departmentDetails.xmlParser.getRelatedDepartmentsForDocument(deptId, documentId);
            title = lng === 'fr' ? 'Associer un département au document' : 'Link department to document';
            noItemsText = lng === 'fr' ? 'Aucun département disponible' : 'No departments available';
        } else if (associationType === 'tasks') {
            availableItems = department.tasks || [];
            existingAssociations = this.departmentDetails.xmlParser.getTasksForDocument(deptId, documentId);
            title = lng === 'fr' ? 'Associer une tâche au document' : 'Link task to document';
            noItemsText = lng === 'fr' ? 'Aucune tâche disponible' : 'No tasks available';
        }
        const existingIds = existingAssociations.map(item => item.id);
        const filteredItems = availableItems.filter(item => !existingIds.includes(item.id));
        modalContent.innerHTML = `
            <h3 class="details-link-modal-title">${title}</h3>
            <div class="details-link-modal-intro">
                ${lng === 'fr' ? 'Sélectionnez un élément à associer :' : 'Select an item to link:'}
            </div>
            <div class="details-link-modal-list">
                ${filteredItems.length > 0 ? filteredItems.map(item => {
                    const itemName = item.nom || item.id;
                    const itemDesc = item.description ? `<div class="details-link-item-desc">${item.description.substring(0, 100)}${item.description.length > 100 ? '...' : ''}</div>` : '';
                    const itemCategory = item.categorie ? `<span class="details-link-item-tag">${item.categorie}</span>` : '';
                    const itemAbbr = item.abbreviation ? `<span class="details-link-item-tag info">${item.abbreviation}</span>` : '';
                    const itemRelation = item.relation ? `<span class="details-link-item-tag success">${item.relation}</span>` : '';
                    return `
                        <div class="linkable-item" data-id="${item.id}">
                            <div class="details-link-item-row">
                                <div class="details-link-item-main">
                                    <strong>${itemName}</strong>
                                    ${itemAbbr}
                                    ${itemRelation}
                                    ${itemCategory}
                                    ${itemDesc}
                                </div>
                                <button class="link-item-btn" data-id="${item.id}">${lng === 'fr' ? 'Associer' : 'Link'}</button>
                            </div>
                        </div>
                    `;
                }).join('') : `<div class="details-link-modal-empty">${noItemsText}</div>`}
            </div>
            <div class="details-link-modal-actions">
                <button id="cancel-link-modal" class="details-link-modal-cancel">${lng === 'fr' ? 'Annuler' : 'Cancel'}</button>
            </div>
        `;
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modalContent.querySelectorAll('.link-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.getAttribute('data-id');
                this.linkItemToDocument(deptId, itemId, documentId, associationType);
                document.body.removeChild(modal);
            });
        });
        modalContent.querySelectorAll('.linkable-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.link-item-btn')) {
                    const itemId = item.getAttribute('data-id');
                    this.linkItemToDocument(deptId, itemId, documentId, associationType);
                    document.body.removeChild(modal);
                }
            });
        });
        modalContent.querySelector('#cancel-link-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    linkItemToDocument(deptId, itemId, documentId, type) {
        const lng = this.departmentDetails.lng;
        let success = false;
        if (type === 'departments') {
            success = this.departmentDetails.xmlParser.linkDocumentToDepartment(deptId, documentId, itemId);
        } else if (type === 'tasks') {
            success = this.departmentDetails.xmlParser.linkTaskToDocument(deptId, itemId, documentId);
        }
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(deptId);
            this.departmentDetails.showNotification(
                this.translations[lng].documentLinkedSuccess,
                'success'
            );
        } else {
            this.departmentDetails.showNotification(
                this.translations[lng].linkDocumentError,
                'error'
            );
        }
    }
    async unlinkFromDocument(departmentId, itemId, documentId, type) {
        const lng = this.departmentDetails.lng;
        const confirmText = type === 'departments' ? this.translations[lng].confirmUnlinkDepartment : this.translations[lng].confirmUnlinkTask;
        if (!await this.departmentDetails.showConfirm(confirmText)) {
            return;
        }
        let success = false;
        if (type === 'departments') {
            success = this.departmentDetails.xmlParser.unlinkDocumentFromDepartment(departmentId, documentId, itemId);
        } else {
            success = this.departmentDetails.xmlParser.unlinkTaskFromDocument(departmentId, itemId, documentId);
        }
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            const successText = type === 'departments' ? this.translations[lng].departmentUnlinkedSuccess : this.translations[lng].taskUnlinkedSuccess;
            this.departmentDetails.showNotification(successText, 'success');
        } else {
            const errorText = type === 'departments' ? this.translations[lng].unlinkDepartmentError : this.translations[lng].unlinkTaskError;
            this.departmentDetails.showNotification(errorText, 'error');
        }
    }
}
