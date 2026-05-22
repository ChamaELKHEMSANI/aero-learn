class DepartmentDetailsTask {
    constructor(departmentDetails) {
        this.departmentDetails = departmentDetails;
        this.translations = {
            fr: {
                tasksCount: "Tâches",
                noTasks: "Aucune tâche définie",
                taskName: "Tâche sans nom",
                addTask: "Ajouter une tâche",
                showAll: "Tout afficher",
                hideAll: "Tout masquer",
                associatedDepartments: "Départements liés",
                noAssociatedDepartments: "Aucun département lié",
                associatedDocuments: "Documents associés",
                noAssociatedDocuments: "Aucun document associé",
                metadata: "Métadonnées",
                category: "Catégorie",
                linkDepartment: "Associer un département",
                unlinkDepartment: "Dissocier le département",
                linkDocument: "Associer un document",
                unlinkDocument: "Dissocier le document",
                confirmUnlinkDocument: "Êtes-vous sûr de vouloir dissocier ce document ?",
                confirmUnlinkDepartment: "Êtes-vous sûr de vouloir dissocier ce département ?",
                documentUnlinkedSuccess: "Document dissocié avec succès",
                departmentLinkedSuccess: "Département lié avec succès",
                departmentUnlinkedSuccess: "Département dissocié avec succès",
                unlinkError: "Erreur lors de la dissociation du document",
                unlinkDepartmentError: "Erreur lors de la dissociation du département",
                page: "Page",
                descriptionLabel: "Description",
                abbreviationDescriptionLabel: "Description de l'abréviation",
                abbreviationPlaceholder: "(Ajouter une abréviation)",
                abbreviationDescriptionPlaceholder: "(Ajouter une description)",
                abbrevDescPlaceholder: "(description de l'abréviation)",
                usedInMultipleDepts: "Utilisé dans",
                departments: "départements",
                selectTask: "Sélectionner une tâche",
                selectTaskDescription: "Sélectionnez une tâche existante d'un autre département pour l'ajouter à ce département.",
                filterTasks: "Filtrer les tâches...",
                cancel: "Annuler",
                select: "Sélectionner",
                confirmAddTask: "Ajouter cette tâche au département courant ? La tâche sera partagée entre les départements.",
                taskAddedSuccess: "Tâche ajoutée avec succès !",
                addTaskError: "Erreur lors de l'ajout de la tâche.",
                confirmCopyTask: "Copier cette tâche dans le département courant ? La tâche originale restera dans son département source.",
                taskCopiedSuccess: "Tâche copiée avec succès !",
                copyTaskError: "Erreur lors de la copie de la tâche.",
                selectDepartment: "Sélectionner un département...",
                noDepartmentsAvailable: "Aucun département disponible pour l'association",
                linkDepartmentError: "Erreur lors de l'association du département",
                selectDocument: "Sélectionner un document...",
                noDocumentsAvailable: "Aucun document disponible pour l'association",
                documentLinkedSuccess: "Document associé avec succès",
                linkDocumentError: "Erreur lors de l'association du document"
            },
            en: {
                tasksCount: "Tasks",
                noTasks: "No tasks defined",
                taskName: "Unnamed task",
                addTask: "Add Task",
                showAll: "Show all",
                hideAll: "Hide all",
                associatedDepartments: "Linked departments",
                noAssociatedDepartments: "No linked departments",
                associatedDocuments: "Associated documents",
                noAssociatedDocuments: "No associated documents",
                metadata: "Metadata",
                category: "Category",
                linkDepartment: "Link Department",
                unlinkDepartment: "Unlink Department",
                linkDocument: "Link Document",
                unlinkDocument: "Unlink Document",
                confirmUnlinkDocument: "Are you sure you want to unlink this document?",
                confirmUnlinkDepartment: "Are you sure you want to unlink this department?",
                documentUnlinkedSuccess: "Document unlinked successfully",
                departmentLinkedSuccess: "Department linked successfully",
                departmentUnlinkedSuccess: "Department unlinked successfully",
                unlinkError: "Error unlinking document",
                unlinkDepartmentError: "Error unlinking department",
                page: "Page",
                descriptionLabel: "Description",
                abbreviationDescriptionLabel: "Abbreviation Description",
                abbreviationPlaceholder: "(Add abbreviation)",
                abbreviationDescriptionPlaceholder: "(Add description)",
                abbrevDescPlaceholder: "(abbreviation description)",
                usedInMultipleDepts: "Used in",
                departments: "departments",
                selectTask: "Select Task",
                selectTaskDescription: "Select an existing task from another department to add to this department.",
                filterTasks: "Filter tasks...",
                cancel: "Cancel",
                select: "Select",
                confirmAddTask: "Add this task to the current department? The task will be shared between departments.",
                taskAddedSuccess: "Task added successfully!",
                addTaskError: "Error adding task.",
                confirmCopyTask: "Copy this task to the current department? The original task will remain in its source department.",
                taskCopiedSuccess: "Task copied successfully!",
                copyTaskError: "Error copying task.",
                selectDepartment: "Select Department...",
                noDepartmentsAvailable: "No departments available for linking",
                linkDepartmentError: "Error linking department",
                selectDocument: "Select Document...",
                noDocumentsAvailable: "No documents available for linking",
                documentLinkedSuccess: "Document linked successfully",
                linkDocumentError: "Error linking document"
            }
        };
    }
    updateTab(data, departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const tabTaches = container.querySelector('#tab-taches');
        if (!tabTaches) return;
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const lng = this.departmentDetails.lng;
        tabTaches.innerHTML = `
            <div class="detail-section" id="taches-section">
                ${isEditMode ? `
                <div class="detail-controls">
                    <button class="toggle-all-btn" id="toggle-all-tasks">${this.translations[lng].showAll}</button>
                </div>
                ` : ''}
                <h5>${this.translations[lng].tasksCount} <span class="badge-count" id="taches-count"></span></h5>
                <ul id="dept-taches" class="tasks-list"></ul>
            </div>
        `;
        this.initControls(tabTaches);
        this.prepareTasksData(data, departmentId, tabTaches);
    }
    initControls(tabTaches) {
        const toggleAllTasksBtn = tabTaches.querySelector('#toggle-all-tasks');
        if (toggleAllTasksBtn) {
            toggleAllTasksBtn.addEventListener('click', () => {
                const isCurrentlyHidden = toggleAllTasksBtn.textContent === this.translations[this.departmentDetails.lng].showAll;
                this.toggleAllItems('task', isCurrentlyHidden);
                toggleAllTasksBtn.textContent = isCurrentlyHidden ?
                    this.translations[this.departmentDetails.lng].hideAll : this.translations[this.departmentDetails.lng].showAll;
            });
        }
    }
    prepareTasksData(data, departmentId, tabTaches) {
        const tasksList = tabTaches.querySelector('#dept-taches');
        const tasksCount = tabTaches.querySelector('#taches-count');
        if (!tasksList || !tasksCount) return;
        const existingElements = Array.from(tasksList.children);
        existingElements.forEach(element => {
            if (!element.classList.contains('add-item-container')) {
                element.remove();
            }
        });
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const lng = this.departmentDetails.lng;
        const existingAddBtn = tasksList.querySelector('.add-item-container');
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
                <button class="btn-add-item" id="add-task-btn" style="background: #667eea; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    + ${this.translations[lng].addTask}
                </button>
                <button class="btn-add-item" id="select-task-btn" style="background: #48bb78; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    📋 ${this.translations[lng].selectTask}
                </button>
            `;
            addBtnContainer.querySelector('#add-task-btn').addEventListener('click', () => {
                this.departmentDetails.xmlParser.addTask(data.id);
                this.departmentDetails.showDepartmentDetailsId(data.id);
            });
            addBtnContainer.querySelector('#select-task-btn').addEventListener('click', () => {
                this.showSelectTaskUI(data.id);
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
                const li = this.createTaskElement(task, data, departmentId, isEditMode, lng);
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
            noDataLi.textContent = this.translations[lng].noTasks;
            const addBtnContainer = tasksList.querySelector('.add-item-container');
            if (addBtnContainer) {
                tasksList.insertBefore(noDataLi, addBtnContainer.nextSibling);
            } else {
                tasksList.appendChild(noDataLi);
            }
        }
    }
    createTaskElement(task, data, departmentId, isEditMode, lng) {
        const li = document.createElement('li');
        li.className = 'task-item';
        const associatedDepartments = this.getRelatedDepartmentsForTask(departmentId, task.id) || [];
        const associatedDocuments = this.getDocumentsForTask(departmentId, task.id) || [];
        const documentsWithPageRef = associatedDocuments.map(doc => {
            const pageRef = this.departmentDetails.xmlParser.getPageReferenceForTaskDocument(departmentId, task.id, doc.id);
            return {
                ...doc,
                page_reference: pageRef || ''
            };
        });
        const metadataHTML = this.createMetadataHTML(task, isEditMode, lng);
        const hasDescription = task.description && task.description.trim() !== '';
        let descriptionHTML = '';
        if (isEditMode) {
            descriptionHTML = `
                <div class="task-description-wrapper" style="display: none;">
                    <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 5px; font-size: 14px;">
                        ${this.translations[lng].descriptionLabel}:
                    </div>
                    <div class="task-description" data-field="description">
                        ${hasDescription ? task.description : ''}
                    </div>
                </div>
            `;
        } else {
            descriptionHTML = hasDescription ? `
                <div class="task-description" style="display: block;" data-field="description">
                    ${task.description}
                </div>
            ` : '';
        }
        let categoryBadgeHTML = '';
        const departmentsHTML = this.createAssociatedDepartmentsHTML(associatedDepartments, task, data, departmentId, isEditMode, lng);
        const documentsHTML = this.createAssociatedDocumentsHTML(documentsWithPageRef, task, data, departmentId, isEditMode, lng);
        const usageCount = this.departmentDetails.xmlParser.getTaskUsageCount(task.id) || 0;
        const usageIndicator = usageCount > 1 ? 
            `<span class="usage-badge" title="${this.translations[lng].usedInMultipleDepts} ${usageCount} ${this.translations[lng].departments}">${usageCount}×</span>` : '';
        li.innerHTML = `
            <div class="task-header clickable">
                <div class="task-title" style="cursor: ${isEditMode ? 'pointer' : 'default'};">
                    ${isEditMode ? `<span class="toggle-indicator">▼</span>` : ''}
                    <strong>${task.nom || this.translations[lng].taskName}</strong>
                    ${categoryBadgeHTML}
                    ${documentsWithPageRef.length > 0 ? `<span class="doc-badge" title="${documentsWithPageRef.length} ${this.translations[lng].associatedDocuments}">📄 ${documentsWithPageRef.length}</span>` : ''}
                    ${associatedDepartments.length > 0 ? `<span class="departments-badge" title="${associatedDepartments.length} ${this.translations[lng].associatedDepartments}">🏢 ${associatedDepartments.length}</span>` : ''}
                </div>
            </div>
            ${descriptionHTML}
            ${metadataHTML}
            ${departmentsHTML}
            ${documentsHTML}
        `;
        this.addTaskInteractions(li, task, data, departmentId, isEditMode, lng);
        return li;
    }
    createMetadataHTML(task, isEditMode, lng) {
        const metadataItems = [];
        Object.entries(task).forEach(([key, value]) => {
            if (key.startsWith('key-') && value) {
                const cleanKey = key.replace('key-', '').replace(/_/g, ' ');
                metadataItems.push(`<div class="metadata-item"><strong>${cleanKey}:</strong> ${value}</div>`);
            }
        });
        if (metadataItems.length > 0) {
            return `
                <div class="metadata-container" style="display: ${isEditMode ? 'none' : 'block'};">
                    <div class="metadata-title">${this.translations[lng].metadata}</div>
                    ${metadataItems.join('')}
                </div>
            `;
        }
        return '';
    }
    createAssociatedDepartmentsHTML(departments, task, data, departmentId, isEditMode, lng) {
        if (departments.length > 0) {
            return `
                <div class="associated-items associated-departments" style="display: ${isEditMode ? 'none' : 'block'};">
                    <div class="associated-title">
                        <strong>${this.translations[lng].associatedDepartments}:</strong>
                        <span class="badge-count small">${departments.length}</span>
                        ${isEditMode ?
                            `<button class="btn-link-item" title="${this.translations[lng].linkDepartment}" 
                                onclick="event.stopPropagation(); window.app.queryDetails.taskManager.showLinkDepartmentUI('${departmentId}', '${task.id}', this)">+</button>` : ''}
                    </div>
                    <div class="associated-departments-container">
                        ${departments.map(department => {
                            return `
                                <div class="associated-department-item">
                                    <div class="department-header-row">
                                        <div class="department-info">
                                            <span class="department-name">${department.nom || department.id}</span>
                                        </div>
                                        ${isEditMode ?
                                            `<button class="btn-unlink-department" 
                                                title="${this.translations[lng].unlinkDepartment}"
                                                onclick="event.stopPropagation(); window.app.queryDetails.taskManager.unlinkDepartmentFromTask('${departmentId}', '${department.id}', '${task.id}')">
                                                🗑️
                                            </button>` : ''}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            if (!isEditMode) return '';
            return `
                <div class="associated-items associated-departments" style="display: none;">
                    <div class="associated-title">
                        <strong>${this.translations[lng].associatedDepartments}:</strong>
                        ${isEditMode ?
                            `<button class="btn-link-item" title="${this.translations[lng].linkDepartment}" 
                                onclick="event.stopPropagation(); window.app.queryDetails.taskManager.showLinkDepartmentUI('${departmentId}', '${task.id}', this)">+</button>` : ''}
                    </div>
                    <div class="no-associated">${this.translations[lng].noAssociatedDepartments}</div>
                </div>
            `;
        }
    }
    createAssociatedDocumentsHTML(documents, task, data, departmentId, isEditMode, lng) {
        if (documents.length > 0) {
            return `
                <div class="associated-items associated-documents" style="display: ${isEditMode ? 'none' : 'block'};">
                    <div class="associated-title">
                        <strong>${this.translations[lng].associatedDocuments}:</strong>
                        <span class="badge-count small">${documents.length}</span>
                        ${isEditMode ?
                            `<button class="btn-link-item" title="${this.translations[lng].linkDocument}" 
                                onclick="event.stopPropagation(); window.app.queryDetails.taskManager.showLinkDocumentToTaskUI('${departmentId}', '${task.id}', this)">+</button>` : ''}
                    </div>
                    <div class="associated-documents-container">
                        ${documents.map(doc => {
                            const docLink = doc.lien ?
                                `<a href="${doc.lien}" target="_blank" class="document-link-small">
                                    ${doc.nom || (lng === 'fr' ? 'Document sans nom' : 'Unnamed document')}
                                </a>` :
                                `<span class="document-name-small">${doc.nom || (lng === 'fr' ? 'Document sans nom' : 'Unnamed document')}</span>`;
                            const pageRefHTML = doc.page_reference ? `
                                <div class="document-page-reference">
                                    <strong>${this.translations[lng].page}:</strong>
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
                                    <strong>${this.translations[lng].page}:</strong>
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
                                        (${lng === 'fr' ? 'Ajouter référence de page' : 'Add page reference'})
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
                                            `<button class="btn-unlink-doc" 
                                                title="${this.translations[lng].unlinkDocument}"
                                                onclick="event.stopPropagation(); window.app.queryDetails.taskManager.unlinkDocumentFromTask('${departmentId}', '${task.id}', '${doc.id}')">
                                                🗑️
                                            </button>` : ''}
                                    </div>
                                    ${doc.description ? `<div class="document-description-small">${doc.description}</div>` : ''}
                                    ${pageRefHTML}
                                    ${doc.reglementation ? `
                                        <div class="regulation-info">
                                            <span class="regulation-badge">${lng === 'fr' ? 'RÈGLEMENT' : 'REGULATION'}: ${doc.reglementation}</span>
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
            if (!isEditMode) return '';
            return `
                <div class="associated-items associated-documents" style="display: none;">
                    <div class="associated-title">
                        <strong>${this.translations[lng].associatedDocuments}:</strong>
                        ${isEditMode ?
                            `<button class="btn-link-item" title="${this.translations[lng].linkDocument}" 
                                onclick="event.stopPropagation(); window.app.queryDetails.taskManager.showLinkDocumentToTaskUI('${departmentId}', '${task.id}', this)">+</button>` : ''}
                    </div>
                    <div class="no-associated">${this.translations[lng].noAssociatedDocuments}</div>
                </div>
            `;
        }
    }
    addTaskInteractions(li, task, data, departmentId, isEditMode, lng) {
        const taskTitle = li.querySelector('.task-title');
        const toggleIndicator = li.querySelector('.toggle-indicator');
        if (isEditMode) {
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'btn-delete-item';
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.title = lng === 'fr' ? "Supprimer la tâche" : "Delete Task";
            deleteBtn.addEventListener('click', async(e) => {
                e.stopPropagation();
                if (await this.departmentDetails.showConfirm(`${lng === 'fr' ? 'Supprimer la tâche' : 'Delete task'} "${task.nom}"?`)) {
                    this.departmentDetails.xmlParser.deleteTask(data.id, task.id);
                    this.departmentDetails.showDepartmentDetailsId(data.id);
                }
            });
            li.querySelector('.task-header').appendChild(deleteBtn);
        }
        if (!isEditMode) {
            return;
        }
        taskTitle.addEventListener('click', (e) => {
            if (e && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.classList.contains('page-ref-value'))) return;
            const descriptionElement = li.querySelector('.task-description');
            const descriptionWrapper = li.querySelector('.task-description-wrapper');
            const metadataContainer = li.querySelector('.metadata-container');
            const associatedDepartmentsElement = li.querySelector('.associated-items.associated-departments');
            const associatedDocumentsElement = li.querySelector('.associated-items.associated-documents');
            let isCurrentlyOpen = false;
            if (descriptionWrapper) {
                if (descriptionWrapper.style.display && descriptionWrapper.style.display !== 'none') isCurrentlyOpen = true;
            } else if (descriptionElement && descriptionElement.style.display && descriptionElement.style.display !== 'none') {
                isCurrentlyOpen = true;
            }
            if (metadataContainer && metadataContainer.style.display && metadataContainer.style.display !== 'none') isCurrentlyOpen = true;
            if (associatedDepartmentsElement && associatedDepartmentsElement.style.display && associatedDepartmentsElement.style.display !== 'none') isCurrentlyOpen = true;
            if (associatedDocumentsElement && associatedDocumentsElement.style.display && associatedDocumentsElement.style.display !== 'none') isCurrentlyOpen = true;
            const newState = isCurrentlyOpen ? 'none' : 'block';
            if (descriptionWrapper) {
                descriptionWrapper.style.display = newState;
            } else if (descriptionElement) {
                descriptionElement.style.display = newState;
            }
            if (metadataContainer) metadataContainer.style.display = newState;
            if (associatedDepartmentsElement) associatedDepartmentsElement.style.display = newState;
            if (associatedDocumentsElement) associatedDocumentsElement.style.display = newState;
            if (toggleIndicator) {
                toggleIndicator.textContent = isCurrentlyOpen ? '▼' : '▲';
            }
        });
        if (isEditMode) {
            this.departmentDetails.makeElementEditable(
                li.querySelector('.task-title strong'), 
                'task', 
                task.id, 
                'nom'
            );
            const descriptionElement = li.querySelector('.task-description');
            if (descriptionElement) {
                const hasDescription = task.description && task.description.trim() !== '';
                if (!hasDescription) {
                    descriptionElement.textContent = lng === 'fr' ? '(Ajouter description)' : '(Add task description)';
                    descriptionElement.style.color = '#999';
                    descriptionElement.style.fontStyle = 'italic';
                }
                this.departmentDetails.makeElementEditable(
                    descriptionElement, 
                    'task', 
                    task.id, 
                    'description', 
                    true
                );
            }
            li.querySelectorAll('.page-ref-value').forEach(pageRefElement => {
                this.makePageReferenceEditable(pageRefElement, 'task', departmentId, task.id);
            });
        }
    }
    makePageReferenceEditable(pageRefElement, type, departmentId, associatedId) {
        const documentId = pageRefElement.getAttribute('data-document-id');
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
                    this.departmentDetails.xmlParser.updateTaskDocumentPageReference(departmentId, associatedId, documentId, newValue);
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
    toggleAllItems(itemType, show) {
        const container = this.departmentDetails.getContentContainer();
        const items = container.querySelectorAll(`.${itemType}-item`);
        items.forEach(item => {
            const descriptionElement = item.querySelector(`.${itemType}-description`);
            const descriptionWrapper = item.querySelector(`.${itemType}-description-wrapper`);
            const metadataContainer = item.querySelector('.metadata-container');
            const associatedItems = item.querySelector('.associated-items');
            if (descriptionWrapper) {
                descriptionWrapper.style.display = show ? 'block' : 'none';
            } else if (descriptionElement) {
                descriptionElement.style.display = show ? 'block' : 'none';
            }
            if (metadataContainer) {
                metadataContainer.style.display = show ? 'block' : 'none';
            }
            if (associatedItems) {
                associatedItems.style.display = show ? 'block' : 'none';
            }
        });
    }
    showSelectTaskUI(departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const tasksList = container.querySelector('#dept-taches');
        const addBtnContainer = tasksList.querySelector('.add-item-container');
        if (!addBtnContainer) return;
        const existingUI = addBtnContainer.querySelector('.select-task-ui');
        if (existingUI) {
            existingUI.remove();
            return;
        }
        const allDepartments = this.departmentDetails.xmlParser.departements || [];
        let allTasks = [];
        allDepartments.forEach(dept => {
            if (dept.tasks && dept.tasks.length > 0) {
                dept.tasks.forEach(task => {
                    allTasks.push({
                        ...task,
                        deptId: dept.id,
                        deptName: dept.nom
                    });
                });
            }
        });
        const currentDept = this.departmentDetails.xmlParser.getDepartement(departmentId);
        const currentTaskIds = currentDept.tasks ? currentDept.tasks.map(t => t.id) : [];
        const availableTasks = allTasks.filter(task => !currentTaskIds.includes(task.id));
        if (availableTasks.length === 0) {
            this.departmentDetails.showAlert(this.translations[this.departmentDetails.lng].addTaskError);
            return;
        }
        const uiContainer = document.createElement('div');
        uiContainer.className = 'select-task-ui';
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
                    ${this.translations[lng].selectTask}
                </h4>
                <p style="margin: 0; color: var(--text-secondary); font-size: 14px;">
                    ${this.translations[lng].selectTaskDescription}
                </p>
            </div>
            <div style="margin-bottom: 15px;">
                <input type="text" 
                    id="filter-tasks" 
                    placeholder="${this.translations[lng].filterTasks}" 
                    style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary); color: var(--text-primary);">
            </div>
            <div id="tasks-list-container" style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary);">
                <div id="tasks-list" style="padding: 10px;"></div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;">
                <button id="cancel-select-task" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    ${this.translations[lng].cancel}
                </button>
            </div>
        `;
        addBtnContainer.parentNode.insertBefore(uiContainer, addBtnContainer.nextSibling);
        this.populateTasksList(availableTasks, departmentId, uiContainer);
        const filterInput = uiContainer.querySelector('#filter-tasks');
        filterInput.addEventListener('input', (e) => {
            this.filterTasksList(e.target.value.toLowerCase(), availableTasks, departmentId, uiContainer);
        });
        const cancelBtn = uiContainer.querySelector('#cancel-select-task');
        cancelBtn.addEventListener('click', () => {
            uiContainer.remove();
        });
        setTimeout(() => {
            const clickHandler = (e) => {
                if (!uiContainer.contains(e.target) && e.target.id !== 'select-task-btn') {
                    uiContainer.remove();
                    document.removeEventListener('click', clickHandler);
                }
            };
            document.addEventListener('click', clickHandler);
        }, 100);
        filterInput.focus();
    }
    populateTasksList(tasks, departmentId, uiContainer) {
        const tasksList = uiContainer.querySelector('#tasks-list');
        tasksList.innerHTML = '';
        if (tasks.length === 0) {
            tasksList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary); font-style: italic;">
                    ${this.translations[this.departmentDetails.lng].addTaskError}
                </div>
            `;
            return;
        }
        const tasksByDept = {};
        tasks.forEach(task => {
            if (!tasksByDept[task.deptId]) {
                tasksByDept[task.deptId] = {
                    deptName: task.deptName,
                    tasks: []
                };
            }
            tasksByDept[task.deptId].tasks.push(task);
        });
        Object.entries(tasksByDept).forEach(([deptId, deptData]) => {
            const deptSection = document.createElement('div');
            deptSection.style.marginBottom = '15px';
            deptSection.innerHTML = `
                <div style="font-weight: 600; color: var(--brand); font-size: 14px; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 1px solid var(--border-color);">
                    📁 ${deptData.deptName}
                </div>
            `;
            const tasksContainer = document.createElement('div');
            tasksContainer.style.display = 'flex';
            tasksContainer.style.flexDirection = 'column';
            tasksContainer.style.gap = '8px';
            deptData.tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.className = 'selectable-task-item';
                taskItem.style.padding = '10px';
                taskItem.style.border = '1px solid var(--border-color)';
                taskItem.style.borderRadius = '6px';
                taskItem.style.background = 'var(--bg-secondary)';
                taskItem.style.cursor = 'pointer';
                taskItem.style.transition = 'all 0.2s';
                taskItem.style.display = 'flex';
                taskItem.style.justifyContent = 'space-between';
                taskItem.style.alignItems = 'center';
                taskItem.innerHTML = `
                    <div>
                        <div style="font-weight: 500; color: var(--text-primary); margin-bottom: 4px;">
                            ${task.nom || task.id}
                            ${task.categorie ? `<span style="font-size: 12px; color: var(--text-secondary); margin-left: 8px;">(${task.categorie})</span>` : ''}
                        </div>
                        ${task.description ? `<div style="font-size: 12px; color: var(--text-secondary);">${task.description.substring(0, 60)}${task.description.length > 60 ? '...' : ''}</div>` : ''}
                    </div>
                    <button class="select-this-task-btn" 
                            data-task-id="${task.id}"
                            data-dept-id="${task.deptId}"
                            style="padding: 6px 12px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        ${this.translations[this.departmentDetails.lng].select}
                    </button>
                `;
                taskItem.addEventListener('mouseenter', () => {
                    taskItem.style.background = 'var(--bg-hover)';
                    taskItem.style.borderColor = 'var(--brand)';
                });
                taskItem.addEventListener('mouseleave', () => {
                    taskItem.style.background = 'var(--bg-secondary)';
                    taskItem.style.borderColor = 'var(--border-color)';
                });
                taskItem.addEventListener('click', (e) => {
                    if (!e.target.classList.contains('select-this-task-btn')) {
                        this.selectExistingTask(departmentId, task.deptId, task.id, uiContainer);
                    }
                });
                tasksContainer.appendChild(taskItem);
            });
            deptSection.appendChild(tasksContainer);
            tasksList.appendChild(deptSection);
        });
        tasksList.querySelectorAll('.select-this-task-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const taskId = btn.getAttribute('data-task-id');
                const sourceDeptId = btn.getAttribute('data-dept-id');
                this.selectExistingTask(departmentId, sourceDeptId, taskId, uiContainer);
            });
        });
    }
    filterTasksList(filterText, allTasks, departmentId, uiContainer) {
        if (!filterText) {
            this.populateTasksList(allTasks, departmentId, uiContainer);
            return;
        }
        const filteredTasks = allTasks.filter(task => {
            return (
                (task.nom && task.nom.toLowerCase().includes(filterText)) ||
                (task.id && task.id.toLowerCase().includes(filterText)) ||
                (task.categorie && task.categorie.toLowerCase().includes(filterText)) ||
                (task.description && task.description.toLowerCase().includes(filterText)) ||
                (task.deptName && task.deptName.toLowerCase().includes(filterText))
            );
        });
        this.populateTasksList(filteredTasks, departmentId, uiContainer);
    }
    async selectExistingTask(targetDeptId, sourceDeptId, taskId, uiContainer) {
        const lng = this.departmentDetails.lng;
        if (! await this.departmentDetails.showConfirm(this.translations[lng].confirmAddTask)) {
            return;
        }
        try {
            const success = this.departmentDetails.xmlParser.addTaskReferenceToDepartment(sourceDeptId, taskId, targetDeptId);
            if (success) {
                uiContainer.remove();
                this.departmentDetails.showDepartmentDetailsId(targetDeptId);
                this.departmentDetails.showNotification(this.translations[lng].taskAddedSuccess, 'success');
            } else {
                this.departmentDetails.showNotification(this.translations[lng].addTaskError, 'error');
            }
        } catch (error) {
            console.error('Error adding task reference:', error);
            this.departmentDetails.showNotification(this.translations[lng].addTaskError, 'error');
        }
    }
    showLinkDepartmentUI(departmentId, taskId, btnElement) {
        const parent = btnElement.parentNode;
        const lng = this.departmentDetails.lng;
        const existingUI = parent.querySelector('.link-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const availableDepartments = this.departmentDetails.xmlParser.getAvailableDepartmentsForTask(departmentId, taskId);
        if (availableDepartments.length === 0) {
            this.departmentDetails.showAlert(this.translations[lng].noDepartmentsAvailable);
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
        select.innerHTML = '<option value="">' + this.translations[lng].selectDepartment + '</option>';
        availableDepartments.forEach(department => {
            select.innerHTML += `<option value="${department.id}">${department.nom || department.id}</option>`;
        });
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.justifyContent = 'flex-end';
        const linkButton = document.createElement('button');
        linkButton.textContent = lng === 'fr' ? 'Associer' : 'Link';
        linkButton.className = 'btn-link-confirm';
        linkButton.style.padding = '8px 16px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = lng === 'fr' ? 'Annuler' : 'Cancel';
        cancelButton.className = 'btn-link-cancel';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '14px';
        selectRow.appendChild(select);
        buttonsRow.appendChild(linkButton);
        buttonsRow.appendChild(cancelButton);
        uiContainer.appendChild(selectRow);
        uiContainer.appendChild(buttonsRow);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkDepartment = () => {
            if (select.value) {
                this.linkTaskToDepartment(departmentId, taskId, select.value);
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && select.value) {
                e.preventDefault();
                linkDepartment();
            }
            if (e.key === 'Escape') {
                closeUI();
            }
        });
        linkButton.addEventListener('click', linkDepartment);
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
    showLinkDocumentToTaskUI(departmentId, taskId, btnElement) {
        const parent = btnElement.parentNode;
        const lng = this.departmentDetails.lng;
        const existingUI = parent.querySelector('.link-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.departmentDetails.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        const availableDocuments = this.departmentDetails.xmlParser.getAvailableDocumentsForTask(departmentId, taskId);
        if (availableDocuments.length === 0) {
            let message = this.translations[lng].noDocumentsAvailable;
            if (!dept.documents || dept.documents.length === 0) {
                message = lng === 'fr' ?
                    "Aucun document défini dans ce département. Ajoutez d'abord des documents dans l'onglet Documents." :
                    "No documents defined in this department. Add documents first in the Documents tab.";
            } else {
                message = lng === 'fr' ?
                    "Tous les documents de ce département sont déjà associés à cette tâche." :
                    "All documents in this department are already linked to this task.";
            }
            this.departmentDetails.showAlert(message);
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
        select.innerHTML = '<option value="">' + this.translations[lng].selectDocument + '</option>';
        availableDocuments.forEach(doc => {
            const displayName = doc.nom || doc.id;
            const type = doc.reglementation ? ` (${doc.reglementation})` : '';
            select.innerHTML += `<option value="${doc.id}">${displayName}${type}</option>`;
        });
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.justifyContent = 'flex-end';
        const linkButton = document.createElement('button');
        linkButton.textContent = lng === 'fr' ? 'Associer' : 'Link';
        linkButton.className = 'btn-link-confirm';
        linkButton.style.padding = '8px 16px';
        linkButton.style.background = '#4CAF50';
        linkButton.style.color = 'white';
        linkButton.style.border = 'none';
        linkButton.style.borderRadius = '4px';
        linkButton.style.cursor = 'pointer';
        linkButton.style.fontSize = '14px';
        const cancelButton = document.createElement('button');
        cancelButton.textContent = lng === 'fr' ? 'Annuler' : 'Cancel';
        cancelButton.className = 'btn-link-cancel';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.background = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';
        cancelButton.style.fontSize = '14px';
        selectRow.appendChild(select);
        buttonsRow.appendChild(linkButton);
        buttonsRow.appendChild(cancelButton);
        uiContainer.appendChild(selectRow);
        uiContainer.appendChild(buttonsRow);
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        const linkDocument = () => {
            if (select.value) {
                this.linkTaskToDocument(departmentId, taskId, select.value);
            }
        };
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && select.value) {
                e.preventDefault();
                linkDocument();
            }
            if (e.key === 'Escape') {
                closeUI();
            }
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
    linkTaskToDepartment(departmentId, taskId, relatedDepartmentId) {
        const lng = this.departmentDetails.lng;
        const success = this.departmentDetails.xmlParser.linkTaskToDepartment(departmentId, taskId, relatedDepartmentId);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].departmentLinkedSuccess, 'success');
        } else {
            this.departmentDetails.showNotification(this.translations[lng].linkDepartmentError, 'error');
        }
    }
    linkTaskToDocument(departmentId, taskId, documentId) {
        const lng = this.departmentDetails.lng;
        const success = this.departmentDetails.xmlParser.linkDocumentToTask(departmentId, taskId, documentId);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].documentLinkedSuccess, 'success');
        } else {
            this.departmentDetails.showNotification(this.translations[lng].linkDocumentError, 'error');
        }
    }
    getRelatedDepartmentsForTask(departmentId, taskId) {
        if (!this.departmentDetails.xmlParser) {
            console.error('XMLParser not available');
            return [];
        }
        try {
            return this.departmentDetails.xmlParser.getRelatedDepartmentsForTask(departmentId, taskId);
        } catch (error) {
            console.error('Error in getRelatedDepartmentsForTask:', error);
            return [];
        }
    }
    getDocumentsForTask(departmentId, taskId) {
        if (!this.departmentDetails.xmlParser) {
            console.error('XMLParser not available');
            return [];
        }
        try {
            return this.departmentDetails.xmlParser.getDocumentsForTask(departmentId, taskId);
        } catch (error) {
            console.error('Error in getDocumentsForTask:', error);
            return [];
        }
    }
    async unlinkDepartmentFromTask(departmentId, relatedDepartmentId, taskId) {
        const lng = this.departmentDetails.lng;
        if (!await this.departmentDetails.showConfirm(this.translations[lng].confirmUnlinkDepartment)) {
            return;
        }
        const success = this.departmentDetails.xmlParser.unlinkTaskFromDepartment(departmentId, taskId, relatedDepartmentId);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].departmentUnlinkedSuccess, 'success');
        } else {
            this.departmentDetails.showNotification(this.translations[lng].unlinkDepartmentError, 'error');
        }
    }
    async unlinkDocumentFromTask(departmentId, taskId, documentId) {
        const lng = this.departmentDetails.lng;
        if (!await this.departmentDetails.showConfirm(this.translations[lng].confirmUnlinkDocument)) {
            return;
        }
        const success = this.departmentDetails.xmlParser.unlinkDocumentFromTask(departmentId, taskId, documentId);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].documentUnlinkedSuccess);
        } else {
            this.departmentDetails.showNotification(this.translations[lng].unlinkError);
        }
    }
}
