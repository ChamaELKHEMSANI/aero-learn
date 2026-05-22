class EditViewTasks {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.xmlParser = editModeManager.xmlParser;
        this.lng = editModeManager.lng || 'en';
        this.allTasks = [];
        this.filteredTasks = [];
        this.currentPage = 1;
        this.pageSize = 20;
        this.sortColumn = 'nom';
        this.sortDirection = 'asc';
        this.searchTerm = '';
        this.categoryFilter = 'all';
        this.departmentFilter = 'all';
        this.isOpen = false;
        this.isClosing = false;
        this.isLoading = false;
        this.modal = null;
        this.tableBody = null;
        this.searchInput = null;
        this.categoryFilterSelect = null;
        this.departmentFilterSelect = null;
        this.statsElement = null;
        this.paginationInfo = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.pageSizeSelect = null;
        this.departments = [];
        this.translations = {
            en: {
                title: 'Tasks Management',
                searchPlaceholder: 'Search by name, category, description...',
                clearSearch: 'Clear search',
                filterCategory: 'All categories',
                filterDepartment: 'All departments',
                categoryGeneral: 'General',
                categoryAdministrative: 'Administrative',
                categoryTechnical: 'Technical',
                categoryOperational: 'Operational',
                categoryTraining: 'Training',
                categoryCompliance: 'Compliance',
                categoryOther: 'Other',
                refresh: 'Refresh',
                export: 'Export',
                columns: {
                    name: 'Name',
                    id: 'ID',
                    category: 'Category',
                    order: 'Order',
                    description: 'Description',
                    department: 'Department',
                    posts: 'Posts',
                    documents: 'Documents',
                    actions: 'Actions'
                },
                actions: {
                    view: 'View',
                    edit: 'Edit',
                    delete: 'Delete',
                    duplicate: 'Duplicate'
                },
                stats: 'Showing {start}-{end} of {total} tasks',
                noResults: 'No tasks match your search',
                loading: 'Loading...',
                close: 'Close',
                previous: 'Previous',
                next: 'Next',
                pageSize: 'Show:',
                confirmDelete: 'Are you sure you want to delete task "{name}"?',
                deleteSuccess: 'Task deleted successfully',
                deleteError: 'Error deleting task',
                exportSuccess: 'Export started',
                exportError: 'Error exporting data',
                usedIn: 'Used in {count} department(s)'
            },
            fr: {
                title: 'Gestion des Tâches',
                searchPlaceholder: 'Rechercher par nom, catégorie, description...',
                clearSearch: 'Effacer la recherche',
                filterCategory: 'Toutes les catégories',
                filterDepartment: 'Tous les départements',
                categoryGeneral: 'Général',
                categoryAdministrative: 'Administratif',
                categoryTechnical: 'Technique',
                categoryOperational: 'Opérationnel',
                categoryTraining: 'Formation',
                categoryCompliance: 'Conformité',
                categoryOther: 'Autre',
                refresh: 'Rafraîchir',
                export: 'Exporter',
                columns: {
                    name: 'Nom',
                    id: 'ID',
                    category: 'Catégorie',
                    order: 'Ordre',
                    description: 'Description',
                    department: 'Département',
                    posts: 'Postes',
                    documents: 'Documents',
                    actions: 'Actions'
                },
                actions: {
                    view: 'Voir',
                    edit: 'Modifier',
                    delete: 'Supprimer',
                    duplicate: 'Dupliquer'
                },
                stats: 'Affichage {start}-{end} sur {total} tâches',
                noResults: 'Aucune tâche ne correspond à votre recherche',
                loading: 'Chargement...',
                close: 'Fermer',
                previous: 'Précédent',
                next: 'Suivant',
                pageSize: 'Afficher :',
                confirmDelete: 'Êtes-vous sûr de vouloir supprimer la tâche "{name}" ?',
                deleteSuccess: 'Tâche supprimée avec succès',
                deleteError: 'Erreur lors de la suppression',
                exportSuccess: 'Export démarré',
                exportError: 'Erreur lors de l\'export',
                usedIn: 'Utilisée dans {count} département(s)'
            }
        };
        this.translations.en.import = 'Import';
        this.translations.fr.import = 'Importer';
        this.init();
    }
    init() {
        this.loadDepartments();
        this.createModal();
        this.loadData();
    }
    loadDepartments() {
        this.departments = [];
        this.xmlParser.departements.forEach((dept, id) => {
            if (id !== 'root') {
                this.departments.push({
                    id: id,
                    nom: dept.nom || id
                });
            }
        });
        this.departments.sort((a, b) => a.nom.localeCompare(b.nom));
    }
    createModal() {
        const existingModal = document.getElementById('edit-view-tasks-modal');
        if (existingModal) {
            existingModal.remove();
        }
        this.modal = document.createElement('div');
        this.modal.id = 'edit-view-tasks-modal';
        this.modal.className = 'edit-view-modal';
        const deptOptions = this.generateDepartmentOptions();
        this.modal.innerHTML = `
            <div class="edit-view-content edit-view-content-tasks">
                <div class="edit-view-header">
                    <h2>${this.translate('title')}</h2>
                    <button class="edit-view-close" id="edit-view-tasks-close" title="${this.translate('close')}">&times;</button>
                </div>
                <div class="edit-view-toolbar">
                    <div class="edit-view-search">
                        <input type="text" 
                            class="edit-view-search-input" 
                            id="edit-view-tasks-search" 
                            placeholder="${this.translate('searchPlaceholder')}"
                            autocomplete="off">
                        <button class="edit-view-search-clear" id="edit-view-tasks-search-clear" title="${this.translate('clearSearch')}">✕</button>
                    </div>
                    <div class="edit-view-filters">
                        <select class="edit-view-filter-select" id="edit-view-tasks-category-filter">
                            <option value="all">${this.translate('filterCategory')}</option>
                            <option value="general">${this.translate('categoryGeneral')}</option>
                            <option value="administrative">${this.translate('categoryAdministrative')}</option>
                            <option value="technical">${this.translate('categoryTechnical')}</option>
                            <option value="operational">${this.translate('categoryOperational')}</option>
                            <option value="training">${this.translate('categoryTraining')}</option>
                            <option value="compliance">${this.translate('categoryCompliance')}</option>
                            <option value="other">${this.translate('categoryOther')}</option>
                        </select>
                        <select class="edit-view-filter-select" id="edit-view-tasks-dept-filter">
                            <option value="all">${this.translate('filterDepartment')}</option>
                            ${deptOptions}
                        </select>
                        <button class="edit-view-btn edit-view-btn-icon" id="edit-view-tasks-refresh" title="${this.translate('refresh')}">
                            🔄
                        </button>
                        <button class="edit-view-btn edit-view-btn-primary" id="edit-view-tasks-export" title="${this.translate('export')}">
                             ${this.translate('export')}
                        </button>
                    </div>
                        <button class="edit-view-btn edit-view-btn-primary" id="edit-view-tasks-import" title="${this.translate('import')}">${this.translate('import')}</button>
                    <div class="edit-view-stats" id="edit-view-tasks-stats">
                        ${this.translate('stats').replace('{start}', '0').replace('{end}', '0').replace('{total}', '0')}
                    </div>
                </div>
                <div class="edit-view-table-container" id="edit-view-tasks-table-container">
                    <table class="edit-view-table" id="edit-view-tasks-table">
                        <thead>
                            <tr>
                                <th data-column="nom" class="sort-asc">${this.translate('columns.name')}</th>
                                <th data-column="categorie">${this.translate('columns.category')}</th>
                                <th data-column="description">${this.translate('columns.description')}</th>
                                <th data-column="department">${this.translate('columns.department')}</th>
                                <th>${this.translate('columns.actions')}</th>
                            </tr>
                        </thead>
                        <tbody id="edit-view-tasks-table-body">
                            <tr>
                                <td colspan="5" class="edit-view-no-data">
                                    ${this.translate('loading')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="edit-view-loading" id="edit-view-tasks-loading" style="display: none;">
                        <div class="edit-view-loading-spinner"></div>
                    </div>
                </div>
                <div class="edit-view-footer">
                    <div class="edit-view-pagination">
                        <button class="edit-view-pagination-btn" id="edit-view-tasks-prev" disabled>←</button>
                        <span class="edit-view-pagination-info" id="edit-view-tasks-pagination-info">1 / 1</span>
                        <button class="edit-view-pagination-btn" id="edit-view-tasks-next" disabled>→</button>
                    </div>
                    <div class="edit-view-page-size">
                        <label for="edit-view-tasks-page-size">${this.translate('pageSize')}</label>
                        <select id="edit-view-tasks-page-size">
                            <option value="10">10</option>
                            <option value="20" selected>20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
        this.cacheElements();
        this.attachEvents();
    }
    generateDepartmentOptions() {
        let options = '';
        this.departments.forEach(dept => {
            options += `<option value="${dept.id}">${this.escapeHtml(dept.nom)}</option>`;
        });
        return options;
    }
    cacheElements() {
        this.tableBody = this.modal.querySelector('#edit-view-tasks-table-body');
        this.searchInput = this.modal.querySelector('#edit-view-tasks-search');
        this.categoryFilterSelect = this.modal.querySelector('#edit-view-tasks-category-filter');
        this.departmentFilterSelect = this.modal.querySelector('#edit-view-tasks-dept-filter');
        this.statsElement = this.modal.querySelector('#edit-view-tasks-stats');
        this.paginationInfo = this.modal.querySelector('#edit-view-tasks-pagination-info');
        this.prevBtn = this.modal.querySelector('#edit-view-tasks-prev');
        this.nextBtn = this.modal.querySelector('#edit-view-tasks-next');
        this.pageSizeSelect = this.modal.querySelector('#edit-view-tasks-page-size');
    }
    attachEvents() {
        const closeBtn = this.modal.querySelector('#edit-view-tasks-close');
        closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        this.searchInput.addEventListener('input', () => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.currentPage = 1;
            this.filterData();
        });
        const clearBtn = this.modal.querySelector('#edit-view-tasks-search-clear');
        clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchTerm = '';
            this.currentPage = 1;
            this.filterData();
        });
        this.categoryFilterSelect.addEventListener('change', () => {
            this.categoryFilter = this.categoryFilterSelect.value;
            this.currentPage = 1;
            this.filterData();
        });
        this.departmentFilterSelect.addEventListener('change', () => {
            this.departmentFilter = this.departmentFilterSelect.value;
            this.currentPage = 1;
            this.filterData();
        });
        const refreshBtn = this.modal.querySelector('#edit-view-tasks-refresh');
        refreshBtn.addEventListener('click', () => this.refresh());
        const exportBtn = this.modal.querySelector('#edit-view-tasks-export');
        exportBtn.addEventListener('click', () => this.exportData());
        const importBtn = this.modal.querySelector('#edit-view-tasks-import');
        importBtn.addEventListener('click', () => this.importCSV());
        const headers = this.modal.querySelectorAll('th[data-column]');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                this.sort(column);
            });
        });
        this.prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });
        this.nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredTasks.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
            }
        });
        this.pageSizeSelect.addEventListener('change', () => {
            this.pageSize = parseInt(this.pageSizeSelect.value, 10);
            this.currentPage = 1;
            this.renderTable();
        });
    }
    loadData() {
        this.isLoading = true;
        this.showLoading(true);
        this.allTasks = [];
        if (this.xmlParser.tasksMap) {
            this.xmlParser.tasksMap.forEach((task, id) => {
                this.allTasks.push(this.enrichTaskData(task));
            });
        }
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (dept.tasks && dept.tasks.length > 0) {
                    dept.tasks.forEach(task => {
                        if (!this.allTasks.some(t => t.id === task.id)) {
                            this.allTasks.push(this.enrichTaskData(task, deptId));
                        }
                    });
                }
            });
        }
        this.filterData();
    }
    enrichTaskData(task, defaultDeptId = null) {
        const departments = [];
        const departmentNames = [];
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (dept.tasks && dept.tasks.some(t => t.id === task.id)) {
                    departments.push(deptId);
                    departmentNames.push(dept.nom || deptId);
                }
            });
        }
        if (departments.length === 0 && defaultDeptId) {
            const dept = this.xmlParser.getDepartement(defaultDeptId);
            departments.push(defaultDeptId);
            departmentNames.push(dept ? dept.nom : defaultDeptId);
        }
        let postsCount = 0;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (dept.taskPosteAssociations && dept.taskPosteAssociations.has(task.id)) {
                    postsCount += dept.taskPosteAssociations.get(task.id).length;
                }
            });
        }
        let documentsCount = 0;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                const docs = this.xmlParser.getDocumentsForTask(deptId, task.id);
                documentsCount += docs.length;
            });
        }
        return {
            ...task,
            departments: departments,
            departmentNames: departmentNames,
            postsCount: postsCount,
            documentsCount: documentsCount,
            usageCount: task.usageCount || departments.length || 1
        };
    }
    filterData() {
        this.filteredTasks = this.allTasks.filter(task => {
            const matchesSearch = this.searchTerm === '' || 
                (task.nom && task.nom.toLowerCase().includes(this.searchTerm)) ||
                (task.id && task.id.toLowerCase().includes(this.searchTerm)) ||
                (task.categorie && task.categorie.toLowerCase().includes(this.searchTerm)) ||
                (task.description && task.description.toLowerCase().includes(this.searchTerm));
            const matchesCategory = this.categoryFilter === 'all' || 
                (task.categorie && task.categorie.toLowerCase() === this.categoryFilter);
            const matchesDepartment = this.departmentFilter === 'all' || 
                (task.departments && task.departments.includes(this.departmentFilter));
            return matchesSearch && matchesCategory && matchesDepartment;
        });
        this.sortData();
        this.currentPage = 1;
        this.renderTable();
    }
    sort(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'asc';
        }
        const headers = this.modal.querySelectorAll('th[data-column]');
        headers.forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');
            if (header.dataset.column === this.sortColumn) {
                header.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        });
        this.sortData();
        this.renderTable();
    }
    sortData() {
        this.filteredTasks.sort((a, b) => {
            let valA, valB;
            switch (this.sortColumn) {
                case 'nom':
                    valA = a.nom || '';
                    valB = b.nom || '';
                    break;
                case 'id':
                    valA = a.id || '';
                    valB = b.id || '';
                    break;
                case 'categorie':
                    valA = a.categorie || '';
                    valB = b.categorie || '';
                    break;
                case 'description':
                    valA = a.description || '';
                    valB = b.description || '';
                    break;
                case 'department':
                    valA = a.departmentNames ? a.departmentNames.join(', ') : '';
                    valB = b.departmentNames ? b.departmentNames.join(', ') : '';
                    break;
                default:
                    valA = a.nom || '';
                    valB = b.nom || '';
            }
            let comparison = 0;
            if (typeof valA === 'number' && typeof valB === 'number') {
                comparison = valA - valB;
            } else {
                comparison = String(valA).localeCompare(String(valB));
            }
            return this.sortDirection === 'asc' ? comparison : -comparison;
        });
    }
    renderTable() {
        if (!this.tableBody) return;
        this.showLoading(true);
        const start = (this.currentPage - 1) * this.pageSize;
        const end = Math.min(start + this.pageSize, this.filteredTasks.length);
        const pageData = this.filteredTasks.slice(start, end);
        const total = this.filteredTasks.length;
        const statsText = this.translate('stats')
            .replace('{start}', total > 0 ? start + 1 : 0)
            .replace('{end}', end)
            .replace('{total}', total);
        this.statsElement.textContent = statsText;
        const totalPages = Math.ceil(total / this.pageSize);
        this.paginationInfo.textContent = `${this.currentPage} / ${totalPages || 1}`;
        this.prevBtn.disabled = this.currentPage <= 1;
        this.nextBtn.disabled = this.currentPage >= totalPages;
        if (pageData.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="edit-view-no-data">
                        ${this.translate('noResults')}
                    </td>
                </tr>
            `;
            this.showLoading(false);
            return;
        }
        let html = '';
        pageData.forEach(task => {
            const categoryLabel = this.getTranslatedCategory(task.categorie);
            const departmentsList = task.departmentNames ? task.departmentNames.join(', ') : '—';
            const usageBadge = task.usageCount > 1 ? 
                `<span class="dept-badge count" title="${this.translate('usedIn').replace('{count}', task.usageCount)}">${task.usageCount}×</span>` : '';
            html += `
                <tr data-task-id="${task.id}">
                    <td>
                        <div class="edit-view-name-cell">
                            <strong>${this.escapeHtml(task.nom || '')}</strong>
                            ${usageBadge}
                        </div>
                    </td>
                    <td>
                        <span class="dept-badge type">${this.escapeHtml(categoryLabel)}</span>
                    </td>
                    <td>
                        <div class="task-description-preview">
                            ${this.truncateText(this.escapeHtml(task.description || ''), 60)}
                        </div>
                    </td>
                    <td>
                        <span class="dept-badge" title="${this.escapeHtml(departmentsList)}">
                            ${this.escapeHtml(this.truncateText(departmentsList, 30))}
                        </span>
                    </td>
                    <td>
                        <div class="edit-view-actions">
                            <button class="edit-view-action-btn view" 
                                data-id="${task.id}"
                                data-name="${this.escapeHtml(task.nom || '')}"
                                title="${this.translate('actions.view')}">👁️</button>
                            <button class="edit-view-action-btn edit" 
                                data-id="${task.id}"
                                title="${this.translate('actions.edit')}">✏️</button>
                            <button class="edit-view-action-btn duplicate" 
                                data-id="${task.id}"
                                title="${this.translate('actions.duplicate')}">📋</button>
                            <button class="edit-view-action-btn delete" 
                                data-id="${task.id}"
                                data-name="${this.escapeHtml(task.nom || '')}"
                                title="${this.translate('actions.delete')}">🗑️</button>
                        </div>
                    </td>
                </tr>
            `;
        });
        this.tableBody.innerHTML = html;
        this.attachActionEvents();
        this.showLoading(false);
    }
    truncateText(text, maxLength) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
    attachActionEvents() {
        this.modal.querySelectorAll('.edit-view-action-btn.view').forEach(btn => {
            btn.addEventListener('click', () => {
                const taskId = btn.dataset.id;
                const taskName = btn.dataset.name;
                this.viewTask(taskId, taskName);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const taskId = btn.dataset.id;
                this.editTask(taskId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.duplicate').forEach(btn => {
            btn.addEventListener('click', () => {
                const taskId = btn.dataset.id;
                this.duplicateTask(taskId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const taskId = btn.dataset.id;
                const taskName = btn.dataset.name;
                this.confirmDelete(taskId, taskName);
            });
        });
    }
    showLoading(show) {
        const loadingEl = this.modal.querySelector('#edit-view-tasks-loading');
        if (loadingEl) {
            loadingEl.style.display = show ? 'flex' : 'none';
        }
        this.isLoading = show;
    }
    importCSV() {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const csvImporter = new EditImportManager(this.xmlParser, this.editModeManager, 'tasks');
        csvImporter.setLang(this.lng || 'fr');
        csvImporter.open();
    }
    open() {
        if (!this.modal) return;
        this.refresh();
        this.modal.classList.add('active');
        this.isOpen = true;
        setTimeout(() => {
            if (this.searchInput) {
                this.searchInput.focus();
            }
        }, 300);
    }
    close() {
        if (!this.modal || this.isClosing) return;
        this.isClosing = true;
        this.modal.classList.add('closing');
        setTimeout(() => {
            this.modal.classList.remove('active', 'closing');
            this.isOpen = false;
            this.isClosing = false;
        }, 300);
    }
    refresh() {
        this.loadDepartments();
        this.loadData();
    }
    viewTask(taskId, taskName) {
        let targetDeptId = null;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (!targetDeptId && dept.tasks && dept.tasks.some(t => t.id === taskId)) {
                    targetDeptId = deptId;
                }
            });
        }
        if (targetDeptId) {
            this.close();
            setTimeout(() => {
                if (this.editModeManager.diagramme) {
                    this.editModeManager.diagramme.navigateToDepartmentFromSelect(targetDeptId);
                }
                if (window.app && window.app.queryDetails) {
                    setTimeout(() => {
                        window.app.queryDetails.switchTab('taches');
                    }, 500);
                }
            }, 300);
        } else {
            this.editModeManager.showNotification(
                `No department found for task "${taskName}"`,
                'warning'
            );
        }
    }
    editTask(taskId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        let targetDeptId = null;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (!targetDeptId && dept.tasks && dept.tasks.some(t => t.id === taskId)) {
                    targetDeptId = deptId;
                }
            });
        }
        if (targetDeptId) {
            this.close();
            setTimeout(() => {
                if (this.editModeManager.diagramme) {
                    this.editModeManager.diagramme.navigateToDepartmentFromSelect(targetDeptId);
                }
                if (window.app && window.app.queryDetails) {
                    setTimeout(() => {
                        window.app.queryDetails.switchTab('taches');
                        setTimeout(() => {
                            const taskElement = document.querySelector(`[data-task-id="${taskId}"] .btn-edit-task`);
                            if (taskElement) {
                                taskElement.click();
                            }
                        }, 300);
                    }, 500);
                }
            }, 300);
        } else {
            this.editModeManager.showNotification(
                `Cannot edit task: no department found`,
                'error'
            );
        }
    }
    duplicateTask(taskId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        let targetDeptId = null;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (!targetDeptId && dept.tasks && dept.tasks.some(t => t.id === taskId)) {
                    targetDeptId = deptId;
                }
            });
        }
        if (targetDeptId) {
            const originalTask = this.xmlParser.getTaskById(taskId);
            if (!originalTask) {
                this.editModeManager.showNotification('Task not found', 'error');
                return;
            }
            let newId = `${taskId}-copy`;
            let counter = 1;
            while (this.xmlParser.tasksMap.has(newId)) {
                newId = `${taskId}-copy-${counter}`;
                counter++;
            }
            const newTask = {
                id: newId,
                nom: `${originalTask.nom} (Copy)`,
                categorie: originalTask.categorie || '',
                description: originalTask.description || '',
                order: originalTask.order || ''
            };
            this.xmlParser.tasksMap.set(newId, newTask);
            const dept = this.xmlParser.getDepartement(targetDeptId);
            if (dept) {
                if (!dept.tasks) dept.tasks = [];
                dept.tasks.push(newTask);
            }
            this.editModeManager.triggerAutoSave();
            this.editModeManager.showNotification('Task duplicated successfully', 'success');
            this.refresh();
        } else {
            this.editModeManager.showNotification(
                'Cannot duplicate task: no department found',
                'error'
            );
        }
    }
    async confirmDelete(taskId, taskName) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const confirmed = await this.editModeManager.showConfirm(
            this.translate('confirmDelete').replace('{name}', taskName)
        );
        if (confirmed) {
            try {
                const deptsWithTask = [];
                if (this.xmlParser.departements) {
                    this.xmlParser.departements.forEach((dept, deptId) => {
                        if (dept.tasks && dept.tasks.some(t => t.id === taskId)) {
                            deptsWithTask.push(deptId);
                        }
                    });
                }
                deptsWithTask.forEach(deptId => {
                    this.xmlParser.deleteTask(deptId, taskId);
                });
                if (this.xmlParser.tasksMap.has(taskId)) {
                    const taskInfo = this.xmlParser.tasksMap.get(taskId);
                    if (taskInfo.usageCount <= 0 || deptsWithTask.length === 0) {
                        this.xmlParser.tasksMap.delete(taskId);
                    }
                }
                this.editModeManager.triggerAutoSave();
                this.editModeManager.showNotification(
                    this.translate('deleteSuccess'),
                    'success'
                );
                this.refresh();
                if (this.editModeManager.diagramme) {
                    this.editModeManager.refreshDiagram();
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                this.editModeManager.showNotification(
                    this.translate('deleteError'),
                    'error'
                );
            }
        }
    }
    exportData() {
        try {
            const headers = [
                this.translate('columns.name'),
                this.translate('columns.category'),
                this.translate('columns.description'),
                this.translate('columns.department')
            ];
            const rows = this.filteredTasks.map(task => [
                task.nom || '',
                this.getTranslatedCategory(task.categorie),
                (task.description || '').replace(/\n/g, ' '),
                task.departmentNames ? task.departmentNames.join(';') : ''
            ]);
            const csvContent = [
                headers.join(';'),
                ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
            ].join('\n');
            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `tasks_${new Date().toISOString().slice(0,10)}.csv`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            this.editModeManager.showNotification(
                this.translate('exportSuccess'),
                'success'
            );
        } catch (error) {
            console.error('Error exporting data:', error);
            this.editModeManager.showNotification(
                this.translate('exportError'),
                'error'
            );
        }
    }
    translate(key) {
        const resolvePath = (obj, path) => {
            if (!obj || !path) return undefined;
            return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
        };
        const currentValue = resolvePath(this.translations[this.lng], key);
        if (currentValue !== undefined) return currentValue;
        const fallbackValue = resolvePath(this.translations['en'], key);
        if (fallbackValue !== undefined) return fallbackValue;
        return key;
    }
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    getTranslatedCategory(category) {
        if (!category) return this.translate('categoryOther');
        const categoryMap = {
            'general': 'categoryGeneral',
            'administrative': 'categoryAdministrative',
            'technical': 'categoryTechnical',
            'operational': 'categoryOperational',
            'training': 'categoryTraining',
            'compliance': 'categoryCompliance',
            'other': 'categoryOther'
        };
        const key = categoryMap[category.toLowerCase()] || 'categoryOther';
        return this.translate(key);
    }
    setLang(lng) {
        this.lng = lng;
        if (this.isOpen) {
            const wasOpen = this.isOpen;
            this.createModal();
            if (wasOpen) {
                this.open();
            }
        }
    }
}
