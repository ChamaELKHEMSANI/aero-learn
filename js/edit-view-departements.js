class EditViewDepartements {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.xmlParser = editModeManager.xmlParser;
        this.lng = editModeManager.lng || 'en';
        this.allDepartments = [];
        this.filteredDepartments = [];
        this.currentPage = 1;
        this.pageSize = 20;
        this.sortColumn = 'nom';
        this.sortDirection = 'asc';
        this.searchTerm = '';
        this.typeFilter = 'all';
        this.isOpen = false;
        this.isClosing = false;
        this.isLoading = false;
        this.modal = null;
        this.tableBody = null;
        this.searchInput = null;
        this.typeFilterSelect = null;
        this.statsElement = null;
        this.paginationInfo = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.pageSizeSelect = null;
        this.translations = {
            en: {
                title: 'Departments Management',
                searchPlaceholder: 'Search by name, ID, abbreviation...',
                clearSearch: 'Clear search',
                filterType: 'All types',
                typeDirection: 'Direction',
                typeOperational: 'Operational',
                typeCommercial: 'Commercial',
                typeSupport: 'Support',
                typeTechnical: 'Technical',
                typeTraining: 'Training',
                typeCompliance: 'Compliance',
                typeStrategic: 'Strategic',
                typeEconomic: 'Economic',
                typeOrganisation: 'Organisation',
                typeOther: 'Other',
                refresh: 'Refresh',
                export: 'Export',
                columns: {
                    name: 'Name',
                    id: 'ID',
                    type: 'Type',
                    abbreviation: 'Abbrev',
                    parent: 'Parent',
                    children: 'Children',
                    posts: 'Posts',
                    tasks: 'Tasks',
                    docs: 'Docs',
                    actions: 'Actions'
                },
                actions: {
                    view: 'View',
                    edit: 'Edit',
                    delete: 'Delete',
                    addChild: 'Add child',
                    duplicate: 'Duplicate'
                },
                stats: 'Showing {start}-{end} of {total} departments',
                noResults: 'No departments match your search',
                loading: 'Loading...',
                close: 'Close',
                previous: 'Previous',
                next: 'Next',
                pageSize: 'Show:',
                confirmDelete: 'Are you sure you want to delete department "{name}"?',
                confirmDeleteWithChildren: 'Department "{name}" has {count} sub-department(s). Deleting it will also delete all children. Are you sure?',
                deleteSuccess: 'Department deleted successfully',
                deleteError: 'Error deleting department',
                exportSuccess: 'Export started',
                exportError: 'Error exporting data'
            },
            fr: {
                title: 'Gestion des Départements',
                searchPlaceholder: 'Rechercher par nom, ID, abréviation...',
                clearSearch: 'Effacer la recherche',
                filterType: 'Tous les types',
                typeDirection: 'Direction',
                typeOperational: 'Opérationnel',
                typeCommercial: 'Commercial',
                typeSupport: 'Support',
                typeTechnical: 'Technique',
                typeTraining: 'Formation',
                typeCompliance: 'Conformité',
                typeStrategic: 'Stratégique',
                typeEconomic: 'Économique',
                typeOrganisation: 'Organisation',
                typeOther: 'Autre',
                refresh: 'Rafraîchir',
                export: 'Exporter',
                columns: {
                    name: 'Nom',
                    id: 'ID',
                    type: 'Type',
                    abbreviation: 'Abrév',
                    parent: 'Parent',
                    children: 'Enfants',
                    posts: 'Postes',
                    tasks: 'Tâches',
                    docs: 'Docs',
                    actions: 'Actions'
                },
                actions: {
                    view: 'Voir',
                    edit: 'Modifier',
                    delete: 'Supprimer',
                    addChild: 'Ajouter enfant',
                    duplicate: 'Dupliquer'
                },
                stats: 'Affichage {start}-{end} sur {total} départements',
                noResults: 'Aucun département ne correspond à votre recherche',
                loading: 'Chargement...',
                close: 'Fermer',
                previous: 'Précédent',
                next: 'Suivant',
                pageSize: 'Afficher :',
                confirmDelete: 'Êtes-vous sûr de vouloir supprimer le département "{name}" ?',
                confirmDeleteWithChildren: 'Le département "{name}" a {count} sous-département(s). Le supprimer supprimera également tous les enfants. Êtes-vous sûr ?',
                deleteSuccess: 'Département supprimé avec succès',
                deleteError: 'Erreur lors de la suppression',
                exportSuccess: 'Export démarré',
                exportError: 'Erreur lors de l\'export'
            }
        };
        this.translations.en.import = 'Import';
        this.translations.fr.import = 'Importer';
        this.init();
    }
    init() {
        this.createModal();
        this.loadData();
    }
    createModal() {
        const existingModal = document.getElementById('edit-view-modal');
        if (existingModal) {
            existingModal.remove();
        }
        this.modal = document.createElement('div');
        this.modal.id = 'edit-view-modal';
        this.modal.className = 'edit-view-modal';
        this.modal.innerHTML = `
            <div class="edit-view-content">
                <div class="edit-view-header">
                    <h2>${this.translate('title')}</h2>
                    <button class="edit-view-close" id="edit-view-close" title="${this.translate('close')}">&times;</button>
                </div>
                <div class="edit-view-toolbar">
                    <div class="edit-view-search">
                        <input type="text" 
                            class="edit-view-search-input" 
                            id="edit-view-search" 
                            placeholder="${this.translate('searchPlaceholder')}"
                            autocomplete="off">
                        <button class="edit-view-search-clear" id="edit-view-search-clear" title="${this.translate('clearSearch')}">✕</button>
                    </div>
                    <div class="edit-view-filters">
                        <select class="edit-view-filter-select" id="edit-view-type-filter">
                            <option value="all">${this.translate('filterType')}</option>
                            <option value="direction">${this.translate('typeDirection')}</option>
                            <option value="operational">${this.translate('typeOperational')}</option>
                            <option value="commercial">${this.translate('typeCommercial')}</option>
                            <option value="support">${this.translate('typeSupport')}</option>
                            <option value="technical">${this.translate('typeTechnical')}</option>
                            <option value="training">${this.translate('typeTraining')}</option>
                            <option value="compliance">${this.translate('typeCompliance')}</option>
                            <option value="strategic">${this.translate('typeStrategic')}</option>
                            <option value="economic">${this.translate('typeEconomic')}</option>
                            <option value="organisation">${this.translate('typeOrganisation')}</option>
                            <option value="other">${this.translate('typeOther')}</option>
                        </select>
                        <button class="edit-view-btn edit-view-btn-icon" id="edit-view-refresh" title="${this.translate('refresh')}">
                            🔄
                        </button>
                        <button class="edit-view-btn edit-view-btn-primary" id="edit-view-import" title="${this.translate('import')}">
                            ${this.translate('import')}
                        </button>
                        <button class="edit-view-btn edit-view-btn-primary" id="edit-view-export" title="${this.translate('export')}">
                             ${this.translate('export')}
                        </button>
                    </div>
                    <div class="edit-view-stats" id="edit-view-stats">
                        ${this.translate('stats').replace('{start}', '0').replace('{end}', '0').replace('{total}', '0')}
                    </div>
                </div>
                <div class="edit-view-table-container" id="edit-view-table-container">
                    <table class="edit-view-table" id="edit-view-table">
                        <thead>
                            <tr>
                                <th data-column="nom" class="sort-asc">${this.translate('columns.name')}</th>
                                <th data-column="id">${this.translate('columns.id')}</th>
                                <th data-column="type">${this.translate('columns.type')}</th>
                                <th data-column="abbreviation">${this.translate('columns.abbreviation')}</th>
                                <th data-column="parent">${this.translate('columns.parent')}</th>
                                <th data-column="childrenCount">${this.translate('columns.children')}</th>
                                <th data-column="tasksCount">${this.translate('columns.tasks')}</th>
                                <th data-column="docsCount">${this.translate('columns.docs')}</th>
                                <th>${this.translate('columns.actions')}</th>
                            </tr>
                        </thead>
                        <tbody id="edit-view-table-body">
                            <tr>
                                <td colspan="9" class="edit-view-no-data">
                                    ${this.translate('loading')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="edit-view-loading" id="edit-view-loading" style="display: none;">
                        <div class="edit-view-loading-spinner"></div>
                    </div>
                </div>
                <div class="edit-view-footer">
                    <div class="edit-view-pagination">
                        <button class="edit-view-pagination-btn" id="edit-view-prev" disabled>←</button>
                        <span class="edit-view-pagination-info" id="edit-view-pagination-info">1 / 1</span>
                        <button class="edit-view-pagination-btn" id="edit-view-next" disabled>→</button>
                    </div>
                    <div class="edit-view-page-size">
                        <label for="edit-view-page-size">${this.translate('pageSize')}</label>
                        <select id="edit-view-page-size">
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
        this.attachEvents();
    }
    attachEvents() {
        const closeBtn = this.modal.querySelector('#edit-view-close');
        closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        this.searchInput = this.modal.querySelector('#edit-view-search');
        this.searchInput.addEventListener('input', () => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.currentPage = 1;
            this.filterData();
        });
        const clearBtn = this.modal.querySelector('#edit-view-search-clear');
        clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchTerm = '';
            this.currentPage = 1;
            this.filterData();
        });
        this.typeFilterSelect = this.modal.querySelector('#edit-view-type-filter');
        this.typeFilterSelect.addEventListener('change', () => {
            this.typeFilter = this.typeFilterSelect.value;
            this.currentPage = 1;
            this.filterData();
        });
        const refreshBtn = this.modal.querySelector('#edit-view-refresh');
        refreshBtn.addEventListener('click', () => this.refresh());
        const exportBtn = this.modal.querySelector('#edit-view-export');
        exportBtn.addEventListener('click', () => this.exportData());
        const importBtn = this.modal.querySelector('#edit-view-import');
        importBtn.addEventListener('click', () => this.importCSV());
        const headers = this.modal.querySelectorAll('th[data-column]');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                this.sort(column);
            });
        });
        this.prevBtn = this.modal.querySelector('#edit-view-prev');
        this.nextBtn = this.modal.querySelector('#edit-view-next');
        this.paginationInfo = this.modal.querySelector('#edit-view-pagination-info');
        this.prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });
        this.nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredDepartments.length / this.pageSize);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
            }
        });
        this.pageSizeSelect = this.modal.querySelector('#edit-view-page-size');
        this.pageSizeSelect.addEventListener('change', () => {
            this.pageSize = parseInt(this.pageSizeSelect.value, 10);
            this.currentPage = 1;
            this.renderTable();
        });
        this.statsElement = this.modal.querySelector('#edit-view-stats');
        this.tableBody = this.modal.querySelector('#edit-view-table-body');
    }
    loadData() {
        this.isLoading = true;
        this.showLoading(true);
        const departments = [];
        this.xmlParser.departements.forEach((dept, id) => {
            if (id !== 'root') { 
                departments.push(this.enrichDepartmentData(dept));
            }
        });
        if (this.xmlParser.data && this.xmlParser.data.nodes) {
            this.xmlParser.data.nodes.forEach(node => {
                if (node.id !== 'root' && !departments.some(d => d.id === node.id)) {
                    departments.push(this.enrichDepartmentData(node));
                }
            });
        }
        this.allDepartments = departments;
        this.filterData();
    }
    enrichDepartmentData(dept) {
        let childrenCount = 0;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach(child => {
                if (child.parent === dept.id) {
                    childrenCount++;
                }
            });
        }
        const postsCount = dept.postes ? dept.postes.length : 0;
        const tasksCount = dept.tasks ? dept.tasks.length : 0;
        const docsCount = dept.fichiers ? dept.fichiers.length : 0;
        let parentName = '';
        if (dept.parent && dept.parent !== 'null' && dept.parent !== '') {
            const parent = this.xmlParser.getDepartement(dept.parent);
            parentName = parent ? parent.nom : dept.parent;
        }
        const bgColor = dept.background_color || '';
        return {
            ...dept,
            childrenCount,
            postsCount,
            tasksCount,
            docsCount,
            parentName,
            bgColor
        };
    }
    filterData() {
        this.filteredDepartments = this.allDepartments.filter(dept => {
            const matchesSearch = this.searchTerm === '' || 
                (dept.nom && dept.nom.toLowerCase().includes(this.searchTerm)) ||
                (dept.id && dept.id.toLowerCase().includes(this.searchTerm)) ||
                (dept.abbreviation && dept.abbreviation.toLowerCase().includes(this.searchTerm)) ||
                (dept.description && dept.description.toLowerCase().includes(this.searchTerm));
            const matchesType = this.typeFilter === 'all' || dept.type === this.typeFilter;
            return matchesSearch && matchesType;
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
        this.filteredDepartments.sort((a, b) => {
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
                case 'type':
                    valA = a.type || '';
                    valB = b.type || '';
                    break;
                case 'abbreviation':
                    valA = a.abbreviation || '';
                    valB = b.abbreviation || '';
                    break;
                case 'parent':
                    valA = a.parentName || '';
                    valB = b.parentName || '';
                    break;
                case 'childrenCount':
                    valA = a.childrenCount || 0;
                    valB = b.childrenCount || 0;
                    break;
                case 'tasksCount':
                    valA = a.tasksCount || 0;
                    valB = b.tasksCount || 0;
                    break;
                case 'docsCount':
                    valA = a.docsCount || 0;
                    valB = b.docsCount || 0;
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
        const end = Math.min(start + this.pageSize, this.filteredDepartments.length);
        const pageData = this.filteredDepartments.slice(start, end);
        const total = this.filteredDepartments.length;
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
                    <td colspan="9" class="edit-view-no-data">
                        ${this.translate('noResults')}
                    </td>
                </tr>
            `;
            this.showLoading(false);
            return;
        }
        let html = '';
        pageData.forEach(dept => {
            const bgColorStyle = dept.bgColor ? `background-color: ${dept.bgColor};` : '';
            const typeLabel = this.getTranslatedType(dept.type);
            html += `
                <tr data-dept-id="${dept.id}">
                    <td style="${bgColorStyle}">
                        <strong>${this.escapeHtml(dept.nom || '')}</strong>
                    </td>
                    <td>
                        <span class="dept-badge">${this.escapeHtml(dept.id || '')}</span>
                    </td>
                    <td>
                        <span class="dept-badge type">${this.escapeHtml(typeLabel)}</span>
                    </td>
                    <td>
                        ${dept.abbreviation ? 
                            `<span class="dept-badge abbrev">${this.escapeHtml(dept.abbreviation)}</span>` : 
                            '<span class="dept-badge">—</span>'}
                    </td>
                    <td>
                        ${dept.parentName ? 
                            `<span class="dept-badge">${this.escapeHtml(dept.parentName)}</span>` : 
                            '<span class="dept-badge">—</span>'}
                    </td>
                    <td>
                        <span class="dept-badge count">${dept.childrenCount}</span>
                    </td>
                    <td>
                        <span class="dept-badge count">${dept.tasksCount}</span>
                    </td>
                    <td>
                        <span class="dept-badge count">${dept.docsCount}</span>
                    </td>
                    <td>
                        <div class="edit-view-actions">
                            <button class="edit-view-action-btn view" 
                                data-id="${dept.id}"
                                title="${this.translate('actions.view')}">👁️</button>
                            <button class="edit-view-action-btn edit" 
                                data-id="${dept.id}"
                                title="${this.translate('actions.edit')}">✏️</button>
                            <button class="edit-view-action-btn add-child" 
                                data-id="${dept.id}"
                                title="${this.translate('actions.addChild')}">➕</button>
                            <button class="edit-view-action-btn duplicate" 
                                data-id="${dept.id}"
                                title="${this.translate('actions.duplicate')}">📋</button>
                            <button class="edit-view-action-btn delete" 
                                data-id="${dept.id}"
                                data-name="${this.escapeHtml(dept.nom || '')}"
                                data-children="${dept.childrenCount}"
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
    attachActionEvents() {
        this.modal.querySelectorAll('.edit-view-action-btn.view').forEach(btn => {
            btn.addEventListener('click', () => {
                const deptId = btn.dataset.id;
                this.viewDepartment(deptId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const deptId = btn.dataset.id;
                this.editDepartment(deptId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.add-child').forEach(btn => {
            btn.addEventListener('click', () => {
                const deptId = btn.dataset.id;
                this.addChildDepartment(deptId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.duplicate').forEach(btn => {
            btn.addEventListener('click', () => {
                const deptId = btn.dataset.id;
                this.duplicateDepartment(deptId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const deptId = btn.dataset.id;
                const deptName = btn.dataset.name;
                const childrenCount = parseInt(btn.dataset.children, 10);
                this.confirmDelete(deptId, deptName, childrenCount);
            });
        });
    }
    showLoading(show) {
        const loadingEl = this.modal.querySelector('#edit-view-loading');
        if (loadingEl) {
            loadingEl.style.display = show ? 'flex' : 'none';
        }
        this.isLoading = show;
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
        this.loadData();
    }
    viewDepartment(deptId) {
        this.close();
        if (this.editModeManager.diagramme) {
            setTimeout(() => {
                this.editModeManager.diagramme.navigateToDepartmentFromSelect(deptId);
            }, 300);
        }
    }
    editDepartment(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        this.close();
        setTimeout(() => {
            if (this.editModeManager.departmentManager) {
                this.editModeManager.departmentManager.editDepartmentById(deptId);
            }
        }, 300);
    }
    addChildDepartment(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        this.close();
        setTimeout(() => {
            if (this.editModeManager.departmentManager) {
                this.editModeManager.departmentManager.addChildDepartmentById(deptId);
            }
        }, 300);
    }
    duplicateDepartment(deptId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        this.close();
        setTimeout(() => {
            if (this.editModeManager.departmentManager) {
                this.editModeManager.departmentManager.duplicateDepartmentById(deptId);
            }
        }, 300);
    }
    async confirmDelete(deptId, deptName, childrenCount) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const message = childrenCount > 0
            ? this.translate('confirmDeleteWithChildren').replace('{name}', deptName).replace('{count}', childrenCount)
            : this.translate('confirmDelete').replace('{name}', deptName);
        const confirmed = await this.editModeManager.showConfirm(message);
        if (confirmed) {
            try {
                this.xmlParser.deleteDepartment(deptId);
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
                console.error('Error deleting department:', error);
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
                this.translate('columns.id'),
                this.translate('columns.type'),
                this.translate('columns.abbreviation'),
                this.translate('columns.parent'),
                this.translate('columns.children'),
                this.translate('columns.tasks'),
                this.translate('columns.docs')
            ];
            const rows = this.filteredDepartments.map(dept => [
                dept.nom || '',
                dept.id || '',
                this.getTranslatedType(dept.type),
                dept.abbreviation || '',
                dept.parentName || '',
                dept.childrenCount || 0,
                dept.tasksCount || 0,
                dept.docsCount || 0
            ]);
            const csvContent = [
                headers.join(';'),
                ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
            ].join('\n');
            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `departements_${new Date().toISOString().slice(0,10)}.csv`;
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
    importCSV() {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const csvImporter = new EditImportManager(this.xmlParser, this.editModeManager, 'departements');
        csvImporter.setLang(this.lng || 'fr');
        csvImporter.open();
    }
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    getTranslatedType(type) {
        if (!type) return this.translate('typeOther');
        const typeMap = {
            'direction': 'typeDirection',
            'operational': 'typeOperational',
            'commercial': 'typeCommercial',
            'support': 'typeSupport',
            'technical': 'typeTechnical',
            'training': 'typeTraining',
            'compliance': 'typeCompliance',
            'strategic': 'typeStrategic',
            'economic': 'typeEconomic',
            'organisation': 'typeOrganisation',
            'other': 'typeOther'
        };
        const key = typeMap[type] || 'typeOther';
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
