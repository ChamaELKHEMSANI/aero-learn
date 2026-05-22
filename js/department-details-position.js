class DepartmentDetailsPosition {
    constructor(departmentDetails) {
        this.departmentDetails = departmentDetails;
        this.translations = {
            fr: {
                abbreviationLabel: "Abréviation",
                descriptionLabel: "Description",
                abbreviationDescriptionLabel: "Description de l'abréviation",
                abbreviationTooltip: "Abréviation",
                abbreviationDescTooltip: "Description de l'abréviation",
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
                page: "Page",
                abbreviation: "Abréviation",
                abbreviationPlaceholder: "(Ajouter une abréviation)",
                abbrevDescPlaceholder: "(description de l'abréviation)",
                abbreviationDescriptionPlaceholder: "(Ajouter une description)",
                addPost: "Ajouter un poste",
                postsCount: "Postes",
                noPosts: "Aucun poste défini",
                postName: "Poste sans nom",
                showAll: "Tout afficher",
                hideAll: "Tout masquer",
                associatedPosts: "Postes associés",
                associatedTasks: "Tâches associées",
                noAssociatedPosts: "Aucun poste associé",
                noAssociatedTasks: "Aucune tâche associée",
                associatedDocuments: "Documents associés",
                noAssociatedDocuments: "Aucun document associé"
            },
            en: {
                abbreviationLabel: "Abbreviation",
                descriptionLabel: "Description",
                abbreviationDescriptionLabel: "Abbreviation Description",
                abbreviationTooltip: "Abbreviation",
                abbreviationDescTooltip: "Abbreviation Description",
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
                abbreviationPlaceholder: "(Add abbreviation)",
                abbreviationDescriptionPlaceholder: "(Add description)",
                abbrevDescPlaceholder: "(abbreviation description)",
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
                addPost: "Add Position",
                postsCount: "Positions",
                noPosts: "No positions defined",
                postName: "Unnamed position",
                showAll: "Show all",
                hideAll: "Hide all",
                associatedPosts: "Associated positions",
                associatedTasks: "Associated tasks",
                noAssociatedPosts: "No associated positions",
                noAssociatedTasks: "No associated tasks",
                associatedDocuments: "Associated documents",
                noAssociatedDocuments: "No associated documents"
            }
        };
    }
    updateTab(data, departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const tabPostes = container.querySelector('#tab-postes');
        if (!tabPostes) return;
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const lng = this.departmentDetails.lng;
        tabPostes.innerHTML = `
            <div class="detail-section" id="postes-section">
                <div class="detail-controls">
                    <button class="toggle-all-btn" id="toggle-all-postes">${this.translations[lng].showAll}</button>
                </div>
                <h5>${this.translations[lng].postsCount} <span class="badge-count" id="postes-count"></span></h5>
                <ul id="dept-postes" class="posts-list"></ul>
            </div>
        `;
        this.initControls(tabPostes);
        this.preparePostesData(data, departmentId, tabPostes);
    }
    initControls(tabPostes) {
        const toggleAllPostesBtn = tabPostes.querySelector('#toggle-all-postes');
        if (toggleAllPostesBtn) {
            toggleAllPostesBtn.addEventListener('click', () => {
                const isCurrentlyHidden = toggleAllPostesBtn.textContent === this.translations[this.departmentDetails.lng].showAll;
                this.toggleAllItems('poste', isCurrentlyHidden);
                toggleAllPostesBtn.textContent = isCurrentlyHidden ?
                    this.translations[this.departmentDetails.lng].hideAll : this.translations[this.departmentDetails.lng].showAll;
            });
        }
    }
    preparePostesData(data, departmentId, tabPostes) {
        const postesList = tabPostes.querySelector('#dept-postes');
        const postesCount = tabPostes.querySelector('#postes-count');
        if (!postesList || !postesCount) return;
        const existingElements = Array.from(postesList.children);
        existingElements.forEach(element => {
            if (!element.classList.contains('add-item-container')) {
                element.remove();
            }
        });
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const lng = this.departmentDetails.lng;
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
                    + ${this.translations[lng].addPost}
                </button>
                <button class="btn-add-item" id="select-poste-btn" style="background: #48bb78; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">
                    📋 ${this.translations[lng].selectPost}
                </button>
            `;
            addBtnContainer.querySelector('#add-poste-btn').addEventListener('click', () => {
                this.departmentDetails.xmlParser.addPoste(data.id);
                this.departmentDetails.showDepartmentDetailsId(data.id);
            });
            addBtnContainer.querySelector('#select-poste-btn').addEventListener('click', () => {
                this.showSelectPosteUI(data.id);
            });
            postesList.appendChild(addBtnContainer);
        }
        if (data.postes && data.postes.length > 0) {
            postesCount.textContent = data.postes.length;
            data.postes.forEach(poste => {
                const li = this.createPosteElement(poste, data, departmentId, isEditMode, lng);
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
            noDataLi.textContent = this.translations[lng].noPosts;
            const addBtnContainer = postesList.querySelector('.add-item-container');
            if (addBtnContainer) {
                postesList.insertBefore(noDataLi, addBtnContainer.nextSibling);
            } else {
                postesList.appendChild(noDataLi);
            }
        }
    }
    createPosteElement(poste, data, departmentId, isEditMode, lng) {
        const li = document.createElement('li');
        li.className = 'poste-item';
        const associatedTasks = this.getTasksForPost(departmentId, poste.id) || [];
        const associatedDocuments = this.getDocumentsForPost(departmentId, poste.id) || [];
        const documentsWithPageRef = associatedDocuments.map(doc => {
            const pageRef = this.departmentDetails.xmlParser.getPageReferenceForPosteDocument(departmentId, poste.id, doc.id);
            return {
                ...doc,
                page_reference: pageRef || ''
            };
        });
        let tasksHTML = '';
        if (associatedTasks.length > 0) {
            tasksHTML = this.createAssociatedTasksHTML(associatedTasks, poste, data, departmentId, isEditMode, lng);
        } else {
            tasksHTML = this.createNoAssociatedTasksHTML(poste, data, departmentId, isEditMode, lng);
        }
        let documentsHTML = '';
        if (documentsWithPageRef.length > 0) {
            documentsHTML = this.createAssociatedDocumentsHTML(documentsWithPageRef, poste, data, departmentId, isEditMode, lng);
        } else {
            documentsHTML = this.createNoAssociatedDocumentsHTML(poste, data, departmentId, isEditMode, lng);
        }
         const hasAbbreviation = poste.abbreviation && poste.abbreviation.trim() !== '';
        const hasAbbrevDesc = poste.abbrev_desc && poste.abbrev_desc.trim() !== '';
        let abbreviationHTML = '';
        if (hasAbbreviation) {
            if (isEditMode) {
                abbreviationHTML = `<span class="poste-abbr${isEditMode ? ' editable-field' : ''}" data-field="abbreviation">${poste.abbreviation}</span>`;
            } else {
                const tooltipId = `tooltip-abbr-${poste.id}-${Date.now()}`;
                let tooltipContent = '';
                if (hasAbbrevDesc) {
                    tooltipContent = `
                        <div class="tooltip-header">${this.translations[lng].abbreviationTooltip}:</div>
                        <div class="tooltip-abbreviation">${poste.abbreviation}</div>
                        <div class="tooltip-header">${this.translations[lng].abbreviationDescTooltip}:</div>
                        <div class="tooltip-description">${poste.abbrev_desc}</div>
                    `;
                } else {
                    tooltipContent = `
                        <div class="tooltip-header">${this.translations[lng].abbreviationTooltip}:</div>
                        <div class="tooltip-abbreviation">${poste.abbreviation}</div>
                    `;
                }
                abbreviationHTML = `
                    <div class="tooltip-container" style="display: inline-block; position: relative;">
                        <span class="poste-abbr tooltip-trigger" 
                              data-field="abbreviation"
                              data-tooltip-id="${tooltipId}"
                              style="cursor: help; border-bottom: 1px dotted #999; position: relative;">
                            ${poste.abbreviation}
                        </span>
                        <div id="${tooltipId}" 
                             class="custom-tooltip" 
                             style="display: none; position: absolute; z-index: 1000; background: white; border: 1px solid #ccc; border-radius: 4px; padding: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); min-width: 200px; max-width: 300px; bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 10px;">
                            <div style="display: flex; justify-content: flex-end; margin-bottom: 5px;">
                                <span class="close-tooltip" style="cursor: pointer; font-size: 12px; color: #999;">×</span>
                            </div>
                            ${tooltipContent}
                            <div style="position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid white;"></div>
                            <div style="position: absolute; bottom: -11px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #ccc;"></div>
                        </div>
                    </div>
                `;
            }
        } else if (isEditMode) {
            abbreviationHTML = `<span class="poste-abbr editable-field" data-field="abbreviation" style="color:#999;font-style:italic;">${this.translations[lng].abbreviationPlaceholder}</span>`;
        }
        const hasDescription = poste.description && poste.description.trim() !== '';
        let descriptionHTML = '';
        if (isEditMode) {
            descriptionHTML = `
                <div class="poste-description-wrapper" style="display: none;">
                    <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 5px; font-size: 14px;">
                        ${this.translations[lng].descriptionLabel}:
                    </div>
                    <div class="poste-description" data-field="description">
                        ${hasDescription ? poste.description : ''}
                    </div>
                </div>
            `;
        } else {
            descriptionHTML = `
                <div class="poste-description" style="display: none;" data-field="description">
                    ${hasDescription ? poste.description : ''}
                </div>
            `;
        }
        let abbrevDescHTML = '';
        if (hasAbbrevDesc) {
            if (isEditMode) {
                abbrevDescHTML = `
                    <div class="poste-abbrev-desc-wrapper" style="display: none;">
                        <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 5px; font-size: 14px;">
                            ${this.translations[lng].abbreviationDescriptionLabel}:
                        </div>
                        <div class="poste-abbrev-desc" data-field="abbrev_desc">${poste.abbrev_desc}</div>
                    </div>
                `;
            } else {
                abbrevDescHTML = `<div class="poste-abbrev-desc" style="display: none;" data-field="abbrev_desc">${poste.abbrev_desc}</div>`;
            }
        } else if (isEditMode) {
            abbrevDescHTML = `
                <div class="poste-abbrev-desc-wrapper" style="display: none;">
                    <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 5px; font-size: 14px;">
                        ${this.translations[lng].abbreviationDescriptionLabel}:
                    </div>
                    <div class="poste-abbrev-desc" style="color:#999; font-style:italic;" data-field="abbrev_desc">
                        ${this.translations[lng].abbrevDescPlaceholder}
                    </div>
                </div>
            `;
        }
             const usageCount = this.departmentDetails.xmlParser.getPosteUsageCount(poste.id) || 0;
        const usageIndicator = usageCount > 1 ? 
            `<span class="usage-badge" title="${this.translations[lng].usedInMultipleDepts} ${usageCount} ${this.translations[lng].departments}">${usageCount}×</span>` : '';
        li.innerHTML = `
            <div class="poste-header clickable">
                <div class="poste-title" style="cursor: pointer;">
                    <span class="toggle-indicator">▼</span>
                    <strong>${poste.nom || this.translations[lng].postName}</strong>
                    ${usageIndicator}
                    ${abbreviationHTML}
                    ${documentsWithPageRef.length > 0 ? `<span class="doc-badge" title="${documentsWithPageRef.length} ${this.translations[lng].associatedDocuments}">📄 ${documentsWithPageRef.length}</span>` : ''}
                    ${associatedTasks.length > 0 ? `<span class="tasks-badge" title="${associatedTasks.length} ${this.translations[lng].associatedTasks}">📋 ${associatedTasks.length}</span>` : ''}
                </div>
            </div>
            ${descriptionHTML}
            ${abbrevDescHTML}
            ${tasksHTML}
            ${documentsHTML}
        `;
        this.addPosteInteractions(li, poste, data, departmentId, isEditMode, lng);
        if (!isEditMode && hasAbbreviation) {
            this.setupTooltip(li, poste, lng);
        }
        return li;
    }
    setupTooltip(li, poste, lng) {
        const tooltipTrigger = li.querySelector('.tooltip-trigger');
        if (!tooltipTrigger) return;
        const tooltipId = tooltipTrigger.getAttribute('data-tooltip-id');
        const tooltip = li.querySelector(`#${tooltipId}`);
        if (!tooltip) return;
        let isTooltipVisible = false;
        let hideTimeout;
        const showTooltip = () => {
            clearTimeout(hideTimeout);
            document.querySelectorAll('.custom-tooltip').forEach(t => {
                t.style.display = 'none';
            });
            tooltip.style.display = 'block';
            isTooltipVisible = true;
        };
        const hideTooltip = (immediate = false) => {
            if (immediate) {
                tooltip.style.display = 'none';
                isTooltipVisible = false;
            } else {
                hideTimeout = setTimeout(() => {
                    if (!tooltip.matches(':hover') && !tooltipTrigger.matches(':hover')) {
                        tooltip.style.display = 'none';
                        isTooltipVisible = false;
                    }
                }, 300);
            }
        };
        tooltipTrigger.addEventListener('mouseenter', showTooltip);
        tooltipTrigger.addEventListener('mouseleave', () => hideTooltip());
        tooltip.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
        tooltip.addEventListener('mouseleave', () => hideTooltip(true));
        const closeBtn = tooltip.querySelector('.close-tooltip');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => hideTooltip(true));
        }
        document.addEventListener('click', (e) => {
            if (isTooltipVisible && 
                !tooltip.contains(e.target) && 
                !tooltipTrigger.contains(e.target)) {
                hideTooltip(true);
            }
        });
    }    
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
    createAssociatedTasksHTML(tasks, poste, data, departmentId, isEditMode, lng) {
        if (tasks.length === 0) {
            return '';
        }
        return `
            <div class="associated-items associated-tasks" style="display: none;">
                <div class="associated-title">
                    <strong>${lng === 'fr' ? 'Tâches associées' : 'Associated tasks'}:</strong>
                    <span class="badge-count small">${tasks.length}</span>
                    ${isEditMode ?
                        `<button class="btn-link-item" title="${this.translations[lng].linkTask}" 
                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.showLinkTaskUI('${departmentId}', '${poste.id}', this)">+</button>` : ''}
                </div>
                <div class="associated-tasks-container">
                    ${tasks.map(task => {
                        const associationDescription = this.departmentDetails.xmlParser.getPosteTaskAssociationDescription(departmentId, poste.id, task.id) || '';
                        return `
                            <div class="associated-task-item">
                                <div class="task-header-row">
                                    <div class="task-info">
                                        <span class="task-name">${task.nom || task.id}</span>
                                        ${task.categorie ? `<span class="task-category">${task.categorie}</span>` : ''}
                                    </div>
                                    ${isEditMode ?
                                        `<button class="btn-unlink-task" 
                                            title="${this.translations[lng].unlinkTask}"
                                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.unlinkTaskFromPoste('${departmentId}', '${poste.id}', '${task.id}')">
                                            🗑️
                                        </button>` : ''}
                                </div>
                                ${task.description ? `<div class="task-description-small">${task.description}</div>` : ''}
                                ${associationDescription ? `
                                    <div class="association-description" 
                                        data-poste-id="${poste.id}"
                                        data-task-id="${task.id}"
                                        style="margin-top: 8px; padding: 8px; background: rgba(76, 175, 80, 0.1); border-radius: 4px; font-size: 13px; color: #333;">
                                        <strong>📝 ${this.translations[lng].descriptionAssociation}:</strong>
                                        <div style="margin-top: 4px;">${associationDescription}</div>
                                        ${isEditMode ? 
                                            `<button class="btn-edit-association-desc" 
                                                style="margin-top: 4px; padding: 2px 6px; background: #667eea; color: white; border: none; border-radius: 3px; font-size: 12px; cursor: pointer;"
                                                onclick="event.stopPropagation(); window.app.queryDetails.positionManager.editAssociationDescription('${departmentId}', '${poste.id}', '${task.id}', this)">
                                                ✏️ ${this.translations[lng].editAssociationDescription}
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
                                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.editAssociationDescription('${departmentId}', '${poste.id}', '${task.id}', this)">
                                            + ${this.translations[lng].addAssociationDescription}
                                        </button>
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    createNoAssociatedTasksHTML(poste, data, departmentId, isEditMode, lng) {
        return `
            <div class="associated-items associated-tasks" style="display: none;">
                <div class="associated-title">
                    <strong>${lng === 'fr' ? 'Tâches associées' : 'Associated tasks'}:</strong>
                    ${isEditMode ?
                        `<button class="btn-link-item" title="${this.translations[lng].linkTask}" 
                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.showLinkTaskUI('${departmentId}', '${poste.id}', this)">+</button>` : ''}
                </div>
                <div class="no-associated">${this.translations[lng].noAssociatedTasks}</div>
            </div>
        `;
    }
    createAssociatedDocumentsHTML(documents, poste, data, departmentId, isEditMode, lng) {
        return `
            <div class="associated-items associated-documents" style="display: none;">
                <div class="associated-title">
                    <strong>${lng === 'fr' ? 'Documents associés' : 'Associated documents'}:</strong>
                    <span class="badge-count small">${documents.length}</span>
                    ${isEditMode ?
                        `<button class="btn-link-item" title="${lng === 'fr' ? 'Associer un document' : 'Link Document'}" 
                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.showLinkDocumentUI('${departmentId}', '${poste.id}', this)">+</button>` : ''}
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
                                <strong>${this.translations[lng].page}:</strong>
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
                                        `<button class="btn-unlink-doc-post" 
                                            title="${lng === 'fr' ? 'Dissocier le document' : 'Unlink Document'}" 
                                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.unlinkDocumentFromPoste('${departmentId}', '${poste.id}', '${doc.id}')">
                                            🗑️
                                        </button>`
                                    : ''}
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
    }
    createNoAssociatedDocumentsHTML(poste, data, departmentId, isEditMode, lng) {
        return `
            <div class="associated-items associated-documents" style="display: none;">
                <div class="associated-title">
                    <strong>${lng === 'fr' ? 'Documents associés' : 'Associated documents'}:</strong>
                    ${isEditMode ?
                        `<button class="btn-link-item" title="${lng === 'fr' ? 'Associer un document' : 'Link Document'}" 
                            onclick="event.stopPropagation(); window.app.queryDetails.positionManager.showLinkDocumentUI('${departmentId}', '${poste.id}', this)">+</button>` : ''}
                </div>
                <div class="no-associated">${this.translations[lng].noAssociatedDocuments}</div>
            </div>
        `;
    }
    addPosteInteractions(li, poste, data, departmentId, isEditMode, lng) {
        const posteTitle = li.querySelector('.poste-title');
        const toggleIndicator = li.querySelector('.toggle-indicator');
        // Add Delete button in Edit Mode
        if (isEditMode) {
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'btn-delete-item';
            deleteBtn.innerHTML = '🗑️';
            deleteBtn.title = lng === 'fr' ? "Supprimer le poste" : "Delete Post";
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                if (await this.departmentDetails.showConfirm(`${lng === 'fr' ? 'Supprimer le poste' : 'Delete post'} "${poste.nom}"?`)) {
                    this.departmentDetails.xmlParser.deletePoste(data.id, poste.id);
                    this.departmentDetails.showDepartmentDetailsId(data.id);
                }
            });
            li.querySelector('.poste-header').appendChild(deleteBtn);
        }
         posteTitle.addEventListener('click', (e) => {
            if (e && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.classList.contains('page-ref-value'))) return;
            // MODIFICATION: Gérer l'affichage des wrappers au lieu des éléments directs
            const descriptionElement = li.querySelector('.poste-description');
            const descriptionWrapper = li.querySelector('.poste-description-wrapper');
            const abbrevDescElement = li.querySelector('.poste-abbrev-desc');
            const abbrevDescWrapper = li.querySelector('.poste-abbrev-desc-wrapper');
            const associatedTasksElement = li.querySelector('.associated-items.associated-tasks');
            const associatedDocumentsElement = li.querySelector('.associated-items.associated-documents');
            // Vérifier l'état
            let isCurrentlyOpen = false;
            // Vérifier les wrappers en mode édition, sinon les éléments directs
            if (descriptionWrapper) {
                if (descriptionWrapper.style.display && descriptionWrapper.style.display !== 'none') isCurrentlyOpen = true;
            } else if (descriptionElement && descriptionElement.style.display && descriptionElement.style.display !== 'none') {
                isCurrentlyOpen = true;
            }
            if (abbrevDescWrapper) {
                if (abbrevDescWrapper.style.display && abbrevDescWrapper.style.display !== 'none') isCurrentlyOpen = true;
            } else if (abbrevDescElement && abbrevDescElement.style.display && abbrevDescElement.style.display !== 'none') {
                isCurrentlyOpen = true;
            }
            if (associatedTasksElement && associatedTasksElement.style.display && associatedTasksElement.style.display !== 'none') isCurrentlyOpen = true;
            if (associatedDocumentsElement && associatedDocumentsElement.style.display && associatedDocumentsElement.style.display !== 'none') isCurrentlyOpen = true;
            const newState = isCurrentlyOpen ? 'none' : 'block';
            // Basculer l'affichage
            if (descriptionWrapper) {
                descriptionWrapper.style.display = newState;
            } else if (descriptionElement) {
                descriptionElement.style.display = newState;
            }
            if (abbrevDescWrapper) {
                abbrevDescWrapper.style.display = newState;
            } else if (abbrevDescElement) {
                abbrevDescElement.style.display = newState;
            }
            if (associatedTasksElement) associatedTasksElement.style.display = newState;
            if (associatedDocumentsElement) associatedDocumentsElement.style.display = newState;
            // Changer l'indicateur
            if (toggleIndicator) {
                toggleIndicator.textContent = isCurrentlyOpen ? '▼' : '▲';
            }
        });
        // Make Poste fields editable
        if (isEditMode) {
            // Nom du poste
            this.departmentDetails.makeElementEditable(
                li.querySelector('.poste-title strong'), 
                'poste', 
                poste.id, 
                'nom'
            );
            // Description du poste
            const descriptionElement = li.querySelector('.poste-description');
            if (descriptionElement) {
                const hasDescription = poste.description && poste.description.trim() !== '';
                if (!hasDescription) {
                    descriptionElement.textContent = lng === 'fr' ? '(Ajouter une description)' : '(Add post description)';
                    descriptionElement.style.color = '#999';
                    descriptionElement.style.fontStyle = 'italic';
                }
                this.departmentDetails.makeElementEditable(
                    descriptionElement, 
                    'poste', 
                    poste.id, 
                    'description', 
                    true
                );
            }
            // Abréviation
            const abbrevElement = li.querySelector('.poste-abbr[data-field="abbreviation"]');
            if (abbrevElement) {
                this.departmentDetails.makeElementEditable(
                    abbrevElement, 
                    'poste', 
                    poste.id, 
                    'abbreviation'
                );
            }
            // Description de l'abréviation
            const abbrevDescElement = li.querySelector('.poste-abbrev-desc[data-field="abbrev_desc"]');
            if (abbrevDescElement) {
                const hasAbbrevDesc = poste.abbrev_desc && poste.abbrev_desc.trim() !== '';
                if (!hasAbbrevDesc) {
                    abbrevDescElement.textContent = this.translations[lng].abbrevDescPlaceholder;
                    abbrevDescElement.style.color = '#999';
                    abbrevDescElement.style.fontStyle = 'italic';
                }
                this.departmentDetails.makeElementEditable(
                    abbrevDescElement, 
                    'poste', 
                    poste.id, 
                    'abbrev_desc', 
                    true
                );
            }
            // Page references pour chaque document associé
            li.querySelectorAll('.page-ref-value').forEach(pageRefElement => {
                this.makePageReferenceEditable(pageRefElement, 'poste', departmentId, poste.id);
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
                    this.departmentDetails.xmlParser.updatePosteDocumentPageReference(departmentId, associatedId, documentId, newValue);
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
        // Effet de survol
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
            const associatedItems = item.querySelector('.associated-items');
            if (descriptionElement) {
                descriptionElement.style.display = show ? 'block' : 'none';
            }
            if (associatedItems) {
                associatedItems.style.display = show ? 'block' : 'none';
            }
        });
    }
    // Méthodes pour la sélection de postes existants
    showSelectPosteUI(departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const postesList = container.querySelector('#dept-postes');
        const addBtnContainer = postesList.querySelector('.add-item-container');
        if (!addBtnContainer) return;
        const existingUI = addBtnContainer.querySelector('.select-poste-ui');
        if (existingUI) {
            existingUI.remove();
            return;
        }
        const allDepartments = this.departmentDetails.xmlParser.departements || [];
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
        const currentDept = this.departmentDetails.xmlParser.getDepartement(departmentId);
        const currentPosteIds = currentDept.postes ? currentDept.postes.map(p => p.id) : [];
        const availablePostes = allPostes.filter(poste => !currentPosteIds.includes(poste.id));
        if (availablePostes.length === 0) {
            this.departmentDetails.showAlert(this.translations[this.departmentDetails.lng].noPostsAvailable);
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
        const lng = this.departmentDetails.lng;
        uiContainer.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; color: var(--text-primary); font-size: 16px;">
                    ${this.translations[lng].selectPost}
                </h4>
                <p style="margin: 0; color: var(--text-secondary); font-size: 14px;">
                    ${this.translations[lng].selectPostDescription}
                </p>
            </div>
            <div style="margin-bottom: 15px;">
                <input type="text" 
                    id="filter-postes" 
                    placeholder="${this.translations[lng].filterPostes}" 
                    style="width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary); color: var(--text-primary);">
            </div>
            <div id="postes-list-container" style="max-height: 300px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 4px; background: var(--bg-primary);">
                <div id="postes-list" style="padding: 10px;"></div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;">
                <button id="cancel-select-poste" style="padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    ${this.translations[lng].cancel}
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
                    ${this.translations[this.departmentDetails.lng].noPostsAvailable}
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
                        ${this.translations[this.departmentDetails.lng].select}
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
    async selectExistingPoste(targetDeptId, sourceDeptId, posteId, uiContainer) {
        const lng = this.departmentDetails.lng;
        if (!await this.departmentDetails.showConfirm(this.translations[lng].confirmAddPoste)) {
            return;
        }
        try {
            const success = this.departmentDetails.xmlParser.addPosteReferenceToDepartment(sourceDeptId, posteId, targetDeptId);
            if (success) {
                uiContainer.remove();
                this.departmentDetails.showDepartmentDetailsId(targetDeptId);
                this.departmentDetails.showNotification(this.translations[lng].posteAddedSuccess, 'success');
            } else {
                this.departmentDetails.showNotification(this.translations[lng].addPosteError, 'error');
            }
        } catch (error) {
            console.error('Error adding poste reference:', error);
            this.departmentDetails.showNotification(this.translations[lng].addPosteError, 'error');
        }
    }
    getTasksForPost(departmentId, postId) {
        if (!this.departmentDetails.xmlParser) {
            console.error('XMLParser not available');
            return [];
        }
        try {
            // Utiliser la méthode de XMLParser
            return this.departmentDetails.xmlParser.getTasksForPost(departmentId, postId);
        } catch (error) {
            console.error('Error in getTasksForPost:', error);
            return [];
        }
    }
    getDocumentsForPost(departmentId, postId) {
        if (!this.departmentDetails.xmlParser) {
            console.error('XMLParser not available');
            return [];
        }
        try {
            // Utiliser la méthode du XMLParser
            return this.departmentDetails.xmlParser.getDocumentsForPost(departmentId, postId);
        } catch (error) {
            console.error('Error in getDocumentsForPost:', error);
            return [];
        }
    }    
    showLinkTaskUI(deptId, posteId, btnElement) {
        const parent = btnElement.parentNode;
        const lng = this.departmentDetails.lng;
        // Remove existing UI if any
        const existingUI = parent.querySelector('.link-ui-container');
        if (existingUI) {
            existingUI.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.departmentDetails.xmlParser.getDepartement(deptId);
        if (!dept) return;
        // DEBUG: Vérifier les données
        // Get ALL tasks from the department first
        const allTasks = dept.tasks || [];
        // Get currently linked tasks - utiliser une méthode plus fiable
        let linkedTaskIds = [];
        try {
            // Essayer d'abord avec getTasksForPost
            const linkedTasks = this.getTasksForPost(deptId, posteId);
            linkedTaskIds = linkedTasks.map(t => t.id);
        } catch (error) {
            console.warn('Error getting linked tasks from getTasksForPost:', error);
            // Fallback: vérifier les associations dans le département
            if (dept.posteTaskAssociations) {
                const associations = dept.posteTaskAssociations.get(posteId);
                if (associations && Array.isArray(associations)) {
                    linkedTaskIds = associations.map(a => a.taskId || a.id);
                }
            }
        }
        // Filter available tasks (NOT already linked)
        const availableTasks = allTasks.filter(task => !linkedTaskIds.includes(task.id));
        if (availableTasks.length === 0) {
            // Afficher un message plus informatif
            let message = this.translations[lng].noTasksAvailable || "No tasks available to link.";
            if (allTasks.length === 0) {
                message = "No tasks defined in this department. Add tasks first in the Tasks tab.";
            } else if (allTasks.length > 0 && linkedTaskIds.length === allTasks.length) {
                message = "All tasks in this department are already linked to this position.";
            }
            this.departmentDetails.showAlert(message);
            return;
        }
        // Create UI container
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
        // Create select row
        const selectRow = document.createElement('div');
        selectRow.style.display = 'flex';
        selectRow.style.gap = '8px';
        selectRow.style.alignItems = 'center';
        selectRow.style.marginBottom = '10px';
        // Create select
        const select = document.createElement('select');
        select.className = 'link-select';
        select.style.flex = '1';
        select.style.padding = '8px 12px';
        select.style.borderRadius = '4px';
        select.style.border = '1px solid var(--border-color)';
        select.style.background = 'var(--bg-primary)';
        select.style.color = 'var(--text-primary)';
        select.innerHTML = '<option value="">' + (this.translations[lng].selectTask || 'Select Task...') + '</option>';
        availableTasks.forEach(task => {
            select.innerHTML += `<option value="${task.id}">${task.nom || task.id}</option>`;
        });
        // Create description textarea
        const descriptionRow = document.createElement('div');
        descriptionRow.style.marginBottom = '10px';
        const descriptionLabel = document.createElement('div');
        descriptionLabel.textContent = lng === 'fr' ? 'Description de l\'association (optionnelle):' : 'Association description (optional):';
        descriptionLabel.style.marginBottom = '5px';
        descriptionLabel.style.fontSize = '13px';
        descriptionLabel.style.color = 'var(--text-secondary)';
        const descriptionInput = document.createElement('textarea');
        descriptionInput.className = 'association-description-input';
        descriptionInput.placeholder = lng === 'fr' ? 'Décrivez comment ce poste est lié à cette tâche...' : 'Describe how this position is linked to this task...';
        descriptionInput.style.width = '100%';
        descriptionInput.style.minHeight = '80px';
        descriptionInput.style.padding = '8px';
        descriptionInput.style.border = '1px solid #ddd';
        descriptionInput.style.borderRadius = '4px';
        descriptionInput.style.resize = 'vertical';
        descriptionInput.style.fontFamily = 'inherit';
        descriptionInput.style.fontSize = '14px';
        descriptionInput.style.boxSizing = 'border-box';
        // Create buttons row
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.justifyContent = 'flex-end';
        // Create link button
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
        // Create cancel button
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
        // Assemble the UI
        selectRow.appendChild(select);
        descriptionRow.appendChild(descriptionLabel);
        descriptionRow.appendChild(descriptionInput);
        buttonsRow.appendChild(linkButton);
        buttonsRow.appendChild(cancelButton);
        uiContainer.appendChild(selectRow);
        uiContainer.appendChild(descriptionRow);
        uiContainer.appendChild(buttonsRow);
        // Hide the original + button
        btnElement.style.display = 'none';
        parent.appendChild(uiContainer);
        select.focus();
        // Link function
        const linkTask = () => {
            if (select.value) {
                this.linkPosteToTaskWithDescription(deptId, posteId, select.value, descriptionInput.value);
            }
        };
        // Close function
        const closeUI = () => {
            uiContainer.remove();
            btnElement.style.display = 'inline-block';
        };
        // Event listeners
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
        // Auto-close on outside click
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
    showLinkDocumentUI(deptId, posteId, btnElement) {
        const parent = btnElement.parentNode;
        // Remove existing select if any
        const existingSelect = parent.querySelector('.link-doc-select');
        if (existingSelect) {
            existingSelect.remove();
            btnElement.style.display = 'inline-block';
            return;
        }
        const dept = this.departmentDetails.xmlParser.getDepartement(deptId);
        if (!dept) return;
        // Get available documents for this poste
        const availableDocuments = this.departmentDetails.xmlParser.getAvailableDocumentsForPoste(deptId, posteId);
        if (availableDocuments.length === 0) {
            this.departmentDetails.showAlert("No available documents to link. Add documents first in the Documents tab.");
            return;
        }
        // Create Select
        const select = document.createElement('select');
        select.className = 'link-doc-select';
        select.style.marginLeft = '10px';
        select.style.maxWidth = '200px';
        select.innerHTML = '<option value="">Select Document...</option>';
        // Populate with available documents
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
                this.departmentDetails.xmlParser.linkDocumentToPoste(deptId, posteId, select.value);
                this.departmentDetails.showDepartmentDetailsId(deptId);
            } else {
                closeUI();
            }
        });
        select.addEventListener('blur', () => {
            setTimeout(closeUI, 200);
        });
        // Also add keydown handler for Escape
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeUI();
            }
        });
    }   
    async unlinkTaskFromPoste(departmentId, posteId, taskId) {
        const lng = this.departmentDetails.lng;
        if (!await this.departmentDetails.showConfirm(this.translations[lng].confirmUnlinkTask)) {
            return;
        }
        const success = this.departmentDetails.xmlParser.unlinkPosteFromTask(departmentId, posteId, taskId);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].taskUnlinkedSuccess, 'success');
        } else {
            this.departmentDetails.showNotification(this.translations[lng].unlinkTaskError, 'error');
        }
    }
    async unlinkDocumentFromPoste(departmentId, posteId, documentId) {
        const lng = this.departmentDetails.lng;
        if (! await this.departmentDetails.showConfirm(this.translations[lng].confirmUnlinkDocument || 'Are you sure you want to unlink this document?')) {
            return;
        }
        const success = this.departmentDetails.xmlParser.unlinkDocumentFromPoste(departmentId, posteId, documentId);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].documentUnlinkedSuccess || 'Document unlinked successfully');
        } else {
            this.departmentDetails.showNotification(this.translations[lng].unlinkError || 'Error unlinking document');
        }
    }
    linkPosteToTaskWithDescription(departmentId, posteId, taskId, description = '') {
        const lng = this.departmentDetails.lng;
        const success = this.departmentDetails.xmlParser.linkPosteToTask(departmentId, posteId, taskId, description);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification(this.translations[lng].postLinkedSuccess || 'Position linked successfully', 'success');
        } else {
            this.departmentDetails.showNotification(this.translations[lng].linkPostError || 'Error linking position', 'error');
        }
    }
    getAssociationDescription(departmentId, posteId, taskId) {
        return this.departmentDetails.xmlParser.getPosteTaskAssociationDescription(departmentId, posteId, taskId) || '';
    }
    updateAssociationDescription(departmentId, posteId, taskId, description) {
        const success = this.departmentDetails.xmlParser.updatePosteTaskAssociationDescription(departmentId, posteId, taskId, description);
        if (success) {
            this.departmentDetails.showDepartmentDetailsId(departmentId);
            this.departmentDetails.showNotification('Association description updated', 'success');
        } else {
            this.departmentDetails.showNotification('Error updating association description', 'error');
        }
    }
    editAssociationDescription(departmentId, posteId, taskId, btnElement) {
        const parent = btnElement.closest('.association-description, .association-description-empty');
        // Vérifications
        if (!parent) {
            console.error('Parent element not found');
            return;
        }
        if (!this.departmentDetails.xmlParser) {
            console.error('XMLParser not available');
            return;
        }
        // Si déjà en cours d'édition, ne rien faire
        if (parent.querySelector('textarea')) return;
        // Récupérer la description actuelle
        const currentDesc = this.getAssociationDescription(departmentId, posteId, taskId);
        // Sauvegarder le contenu original
        const originalHTML = parent.innerHTML;
        // Créer le formulaire d'édition
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
        // Remplacer le contenu
        parent.innerHTML = '';
        parent.appendChild(form);
        // Mettre le focus
        const textarea = parent.querySelector('textarea');
        textarea.focus();
        textarea.select();
        // Gestionnaires d'événements
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
        // Fermer en cliquant à l'extérieur
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
}