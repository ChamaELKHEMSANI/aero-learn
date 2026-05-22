class EditViewDocuments {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.xmlParser = editModeManager.xmlParser;
        this.lng = editModeManager.lng || 'en';
        this.allDocuments = [];
        this.filteredDocuments = [];
        this.currentPage = 1;
        this.pageSize = 20;
        this.sortColumn = 'nom';
        this.sortDirection = 'asc';
        this.searchTerm = '';
        this.typeFilter = 'all'; 
        this.departmentFilter = 'all';
        this.isOpen = false;
        this.isClosing = false;
        this.isLoading = false;
        this.modal = null;
        this.tableBody = null;
        this.searchInput = null;
        this.typeFilterSelect = null;
        this.departmentFilterSelect = null;
        this.statsElement = null;
        this.paginationInfo = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.pageSizeSelect = null;
        this.departments = [];
        this.translations = {
            en: {
                title: 'Documents Management',
                searchPlaceholder: 'Search by name, ID, code, reference...',
                clearSearch: 'Clear search',
                filterType: 'All types',
                filterTypeDocument: 'Documents',
                filterTypeRegulation: 'Regulations',
                filterCategory: 'All categories',
                filterDepartment: 'All departments',
                refresh: 'Refresh',
                export: 'Export',
                columns: {
                    name: 'Name',
                    id: 'ID',
                    type: 'Type',
                    category: 'Category',
                    link: 'Link',
                    code: 'Code',
                    reference: 'Reference',
                    department: 'Department',
                    pageRef: 'Page',
                    posts: 'Posts',
                    tasks: 'Tasks',
                    actions: 'Actions'
                },
                actions: {
                    view: 'View',
                    edit: 'Edit',
                    delete: 'Delete',
                    duplicate: 'Duplicate',
                    openLink: 'Open link'
                },
                stats: 'Showing {start}-{end} of {total} documents',
                noResults: 'No documents match your search',
                loading: 'Loading...',
                close: 'Close',
                previous: 'Previous',
                next: 'Next',
                pageSize: 'Show:',
                confirmDelete: 'Are you sure you want to delete document "{name}"?',
                deleteSuccess: 'Document deleted successfully',
                deleteError: 'Error deleting document',
                exportSuccess: 'Export started',
                exportError: 'Error exporting data',
                usedIn: 'Used in {count} department(s)',
                typeDocument: 'Document',
                typeRegulation: 'Regulation',
                hasLink: 'Has link',
                noLink: 'No link',
                document: 'Document',
                regulation: 'Regulation'
            },
            fr: {
                title: 'Gestion des Documents',
                searchPlaceholder: 'Rechercher par nom, ID, code, référence...',
                clearSearch: 'Effacer la recherche',
                filterType: 'Tous les types',
                filterTypeDocument: 'Documents',
                filterTypeRegulation: 'Règlementations',
                filterCategory: 'Toutes les catégories',
                filterDepartment: 'Tous les départements',
                refresh: 'Rafraîchir',
                export: 'Exporter',
                columns: {
                    name: 'Nom',
                    id: 'ID',
                    type: 'Type',
                    category: 'Catégorie',
                    link: 'Lien',
                    code: 'Code',
                    reference: 'Référence',
                    department: 'Département',
                    pageRef: 'Page',
                    posts: 'Postes',
                    tasks: 'Tâches',
                    actions: 'Actions'
                },
                actions: {
                    view: 'Voir',
                    edit: 'Modifier',
                    delete: 'Supprimer',
                    duplicate: 'Dupliquer',
                    openLink: 'Ouvrir le lien'
                },
                stats: 'Affichage {start}-{end} sur {total} documents',
                noResults: 'Aucun document ne correspond à votre recherche',
                loading: 'Chargement...',
                close: 'Fermer',
                previous: 'Précédent',
                next: 'Suivant',
                pageSize: 'Afficher :',
                confirmDelete: 'Êtes-vous sûr de vouloir supprimer le document "{name}" ?',
                deleteSuccess: 'Document supprimé avec succès',
                deleteError: 'Erreur lors de la suppression',
                exportSuccess: 'Export démarré',
                exportError: 'Erreur lors de l\'export',
                usedIn: 'Utilisé dans {count} département(s)',
                typeDocument: 'Document',
                typeRegulation: 'Règlementation',
                hasLink: 'A un lien',
                noLink: 'Pas de lien',
                document: 'Document',
                regulation: 'Règlement'
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
        const existingModal = document.getElementById('edit-view-documents-modal');
        if (existingModal) existingModal.remove();
        this.modal = document.createElement('div');
        this.modal.id = 'edit-view-documents-modal';
        this.modal.className = 'edit-view-modal';
        const deptOptions = this.generateDepartmentOptions();
        this.modal.innerHTML = `
            <div class="edit-view-content edit-view-content-documents">
                <div class="edit-view-header">
                    <h2>${this.translate('title')}</h2>
                    <button class="edit-view-close" id="edit-view-documents-close" title="${this.translate('close')}">&times;</button>
                </div>
                <div class="edit-view-toolbar">
                    <div class="edit-view-search">
                        <input type="text" class="edit-view-search-input" id="edit-view-documents-search" placeholder="${this.translate('searchPlaceholder')}" autocomplete="off">
                        <button class="edit-view-search-clear" id="edit-view-documents-search-clear" title="${this.translate('clearSearch')}">✕</button>
                    </div>
                    <div class="edit-view-filters">
                        <select class="edit-view-filter-select" id="edit-view-documents-type-filter">
                            <option value="all">${this.translate('filterType')}</option>
                            <option value="document">📄 ${this.translate('filterTypeDocument')}</option>
                            <option value="regulation">⚖️ ${this.translate('filterTypeRegulation')}</option>
                        </select>
                        <select class="edit-view-filter-select" id="edit-view-documents-dept-filter">
                            <option value="all">${this.translate('filterDepartment')}</option>
                            ${deptOptions}
                        </select>
                        <button class="edit-view-btn edit-view-btn-icon" id="edit-view-documents-refresh" title="${this.translate('refresh')}">🔄</button>
                        <button class="edit-view-btn edit-view-btn-primary" id="edit-view-documents-export" title="${this.translate('export')}"> ${this.translate('export')}</button>
                    </div>
                        <button class="edit-view-btn edit-view-btn-primary" id="edit-view-documents-import" title="${this.translate('import')}">${this.translate('import')}</button>
                    <div class="edit-view-stats" id="edit-view-documents-stats">
                        ${this.translate('stats').replace('{start}', '0').replace('{end}', '0').replace('{total}', '0')}
                    </div>
                </div>
                <div class="edit-view-table-container" id="edit-view-documents-table-container">
                    <table class="edit-view-table" id="edit-view-documents-table">
                        <thead>
                            <tr>
                                <th data-column="nom" class="sort-asc">${this.translate('columns.name')}</th>
                                <th data-column="id">${this.translate('columns.id')}</th>
                                <th data-column="type">${this.translate('columns.type')}</th>
                                <th data-column="linkName">${this.translate('columns.link')}</th>
                                <th data-column="code">${this.translate('columns.code')}</th>
                                <th data-column="ref">${this.translate('columns.reference')}</th>
                                <th data-column="department">${this.translate('columns.department')}</th>
                                <th data-column="page_reference">${this.translate('columns.pageRef')}</th>
                                <th>${this.translate('columns.actions')}</th>
                            </tr>
                        </thead>
                        <tbody id="edit-view-documents-table-body">
                            <tr><td colspan="9" class="edit-view-no-data">${this.translate('loading')}</td></tr>
                        </tbody>
                    </table>
                    <div class="edit-view-loading" id="edit-view-documents-loading" style="display: none;">
                        <div class="edit-view-loading-spinner"></div>
                    </div>
                </div>
                <div class="edit-view-footer">
                    <div class="edit-view-pagination">
                        <button class="edit-view-pagination-btn" id="edit-view-documents-prev" disabled>←</button>
                        <span class="edit-view-pagination-info" id="edit-view-documents-pagination-info">1 / 1</span>
                        <button class="edit-view-pagination-btn" id="edit-view-documents-next" disabled>→</button>
                    </div>
                    <div class="edit-view-page-size">
                        <label for="edit-view-documents-page-size">${this.translate('pageSize')}</label>
                        <select id="edit-view-documents-page-size">
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
        this.tableBody = this.modal.querySelector('#edit-view-documents-table-body');
        this.searchInput = this.modal.querySelector('#edit-view-documents-search');
        this.typeFilterSelect = this.modal.querySelector('#edit-view-documents-type-filter');
        this.departmentFilterSelect = this.modal.querySelector('#edit-view-documents-dept-filter');
        this.statsElement = this.modal.querySelector('#edit-view-documents-stats');
        this.paginationInfo = this.modal.querySelector('#edit-view-documents-pagination-info');
        this.prevBtn = this.modal.querySelector('#edit-view-documents-prev');
        this.nextBtn = this.modal.querySelector('#edit-view-documents-next');
        this.pageSizeSelect = this.modal.querySelector('#edit-view-documents-page-size');
    }
    attachEvents() {
        const closeBtn = this.modal.querySelector('#edit-view-documents-close');
        closeBtn.addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        this.searchInput.addEventListener('input', () => {
            this.searchTerm = this.searchInput.value.toLowerCase();
            this.currentPage = 1;
            this.filterData();
        });
        const clearBtn = this.modal.querySelector('#edit-view-documents-search-clear');
        clearBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchTerm = '';
            this.currentPage = 1;
            this.filterData();
        });
        this.typeFilterSelect.addEventListener('change', () => {
            this.typeFilter = this.typeFilterSelect.value;
            this.currentPage = 1;
            this.filterData();
        });
        this.departmentFilterSelect.addEventListener('change', () => {
            this.departmentFilter = this.departmentFilterSelect.value;
            this.currentPage = 1;
            this.filterData();
        });
        const refreshBtn = this.modal.querySelector('#edit-view-documents-refresh');
        refreshBtn.addEventListener('click', () => this.refresh());
        const importBtn = this.modal.querySelector('#edit-view-documents-import');
        importBtn.addEventListener('click', () => this.importCSV());
        const exportBtn = this.modal.querySelector('#edit-view-documents-export');
        exportBtn.addEventListener('click', () => this.exportData());
        const headers = this.modal.querySelectorAll('th[data-column]');
        headers.forEach(header => {
            header.addEventListener('click', () => this.sort(header.dataset.column));
        });
        this.prevBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });
        this.nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredDocuments.length / this.pageSize);
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
        this.allDocuments = [];
        if (this.xmlParser.documentsMap) {
            this.xmlParser.documentsMap.forEach((doc) => {
                this.allDocuments.push(this.enrichDocumentData(doc));
            });
        }
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (dept.fichiers && dept.fichiers.length > 0) {
                    dept.fichiers.forEach(doc => {
                        if (!this.allDocuments.some(d => d.id === doc.id)) {
                            this.allDocuments.push(this.enrichDocumentData(doc, deptId));
                        }
                    });
                }
            });
        }
        this.filterData();
    }
    enrichDocumentData(doc, defaultDeptId = null) {
        const departments = [];
        const departmentNames = [];
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (dept.fichiers && dept.fichiers.some(d => d.id === doc.id)) {
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
                if (dept.postes) {
                    dept.postes.forEach(poste => {
                        const docs = this.xmlParser.getDocumentsForPost(deptId, poste.id);
                        if (docs.some(d => d.id === doc.id)) {
                            postsCount++;
                        }
                    });
                }
            });
        }
        let tasksCount = 0;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (dept.tasks) {
                    dept.tasks.forEach(task => {
                        const docs = this.xmlParser.getDocumentsForTask(deptId, task.id);
                        if (docs.some(d => d.id === doc.id)) {
                            tasksCount++;
                        }
                    });
                }
            });
        }
        const isRegulation = doc.type === 'reglementation' || 
                            doc.category === 'regulation' || 
                            doc.reglementation ||
                            doc.type_doc === 'externe';
        return {
            ...doc,
            departments: departments,
            departmentNames: departmentNames,
            postsCount: postsCount,
            tasksCount: tasksCount,
            usageCount: doc.usageCount || departments.length || 1,
            isRegulation: isRegulation,
            displayType: isRegulation ? 'regulation' : 'document',
            hasLink: !!(doc.lien && doc.lien.trim()),
            linkName: this.extractFileNameFromUrl(doc.lien || '')
        };
    }
    filterData() {
        this.filteredDocuments = this.allDocuments.filter(doc => {
            const matchesSearch = this.searchTerm === '' || 
                (doc.nom && doc.nom.toLowerCase().includes(this.searchTerm)) ||
                (doc.id && doc.id.toLowerCase().includes(this.searchTerm)) ||
                (doc.code && doc.code.toLowerCase().includes(this.searchTerm)) ||
                (doc.ref && doc.ref.toLowerCase().includes(this.searchTerm)) ||
                (doc.description && doc.description.toLowerCase().includes(this.searchTerm)) ||
                (doc.reglementation && doc.reglementation.toLowerCase().includes(this.searchTerm));
            const matchesType = this.typeFilter === 'all' || 
                (this.typeFilter === 'document' && !doc.isRegulation) ||
                (this.typeFilter === 'regulation' && doc.isRegulation);
            const matchesDepartment = this.departmentFilter === 'all' || 
                (doc.departments && doc.departments.includes(this.departmentFilter));
            return matchesSearch && matchesType && matchesDepartment;
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
        this.filteredDocuments.sort((a, b) => {
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
                    valA = a.displayType || '';
                    valB = b.displayType || '';
                    break;
                case 'linkName':
                    valA = a.linkName || '';
                    valB = b.linkName || '';
                    break;
                case 'code':
                    valA = a.code || '';
                    valB = b.code || '';
                    break;
                case 'ref':
                    valA = a.ref || '';
                    valB = b.ref || '';
                    break;
                case 'department':
                    valA = a.departmentNames ? a.departmentNames.join(', ') : '';
                    valB = b.departmentNames ? b.departmentNames.join(', ') : '';
                    break;
                case 'page_reference':
                    valA = a.page_reference || '';
                    valB = b.page_reference || '';
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
        const end = Math.min(start + this.pageSize, this.filteredDocuments.length);
        const pageData = this.filteredDocuments.slice(start, end);
        const total = this.filteredDocuments.length;
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
        pageData.forEach(doc => {
            const typeLabel = doc.isRegulation ? 
                `<span class="dept-badge type" style="background: #ef4444;">⚖️ ${this.translate('regulation')}</span>` : 
                `<span class="dept-badge type" style="background: #3b82f6;">📄 ${this.translate('document')}</span>`;
            const departmentsList = doc.departmentNames ? doc.departmentNames.join(', ') : '—';
            const usageBadge = doc.usageCount > 1 ? 
                `<span class="dept-badge count" title="${this.translate('usedIn').replace('{count}', doc.usageCount)}">${doc.usageCount}×</span>` : '';
            const linkIndicator = doc.hasLink ? 
                `<span class="dept-badge" style="background: #10b981; color: white;" title="${this.translate('hasLink')}">🔗</span>` : 
                `<span class="dept-badge" title="${this.translate('noLink')}">—</span>`;
            const pageRef = doc.page_reference || '—';
            const linkDisplay = doc.linkName || '—';
            html += `
                <tr data-doc-id="${doc.id}">
                    <td>
                        <div class="edit-view-name-cell">
                            <strong>${this.escapeHtml(doc.nom || '')}</strong>
                            ${usageBadge}
                        </div>
                    </td>
                    <td>
                        <span class="dept-badge">${this.escapeHtml(doc.id || '')}</span>
                    </td>
                    <td>
                        ${typeLabel}
                    </td>
                    <td>
                        ${doc.hasLink
                            ? `<a class="dept-badge dept-link-badge" href="${this.escapeHtml(doc.lien)}" target="_blank" rel="noopener noreferrer" title="${this.escapeHtml(doc.lien)}">${this.escapeHtml(linkDisplay)}</a>`
                            : `<span class="dept-badge">—</span>`
                        }
                    </td>
                    <td>
                        <span class="dept-badge">${this.escapeHtml(doc.code || '—')}</span>
                    </td>
                    <td>
                        <span class="dept-badge">${this.escapeHtml(doc.ref || '—')}</span>
                    </td>
                    <td>
                        <span class="dept-badge" title="${departmentsList}">
                            ${this.truncateText(departmentsList, 30)}
                        </span>
                    </td>
                    <td>
                        <span class="dept-badge">${this.escapeHtml(pageRef)}</span>
                    </td>
                    <td>
                        <div class="edit-view-actions">
                            <button class="edit-view-action-btn view" 
                                data-id="${doc.id}"
                                data-name="${this.escapeHtml(doc.nom || '')}"
                                title="${this.translate('actions.view')}">👁️</button>
                            <button class="edit-view-action-btn edit" 
                                data-id="${doc.id}"
                                title="${this.translate('actions.edit')}">✏️</button>
                            ${doc.hasLink ? 
                                `<button class="edit-view-action-btn open-link" 
                                    data-link="${this.escapeHtml(doc.lien)}"
                                    title="${this.translate('actions.openLink')}"
                                    onclick="window.open(this.dataset.link, '_blank')">🔗</button>` : ''}
                            <button class="edit-view-action-btn duplicate" 
                                data-id="${doc.id}"
                                title="${this.translate('actions.duplicate')}">📋</button>
                            <button class="edit-view-action-btn delete" 
                                data-id="${doc.id}"
                                data-name="${this.escapeHtml(doc.nom || '')}"
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
    extractFileNameFromUrl(url) {
        const value = String(url || '').trim();
        if (!value) return '';
        try {
            const noHash = value.split('#')[0];
            const noQuery = noHash.split('?')[0];
            const parts = noQuery.split('/').filter(Boolean);
            if (parts.length === 0) return '';
            return decodeURIComponent(parts[parts.length - 1]);
        } catch (e) {
            return '';
        }
    }
    attachActionEvents() {
        this.modal.querySelectorAll('.edit-view-action-btn.view').forEach(btn => {
            btn.addEventListener('click', () => {
                const docId = btn.dataset.id;
                const docName = btn.dataset.name;
                this.viewDocument(docId, docName);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const docId = btn.dataset.id;
                this.editDocument(docId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.duplicate').forEach(btn => {
            btn.addEventListener('click', () => {
                const docId = btn.dataset.id;
                this.duplicateDocument(docId);
            });
        });
        this.modal.querySelectorAll('.edit-view-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const docId = btn.dataset.id;
                const docName = btn.dataset.name;
                this.confirmDelete(docId, docName);
            });
        });
    }
    showLoading(show) {
        const loadingEl = this.modal.querySelector('#edit-view-documents-loading');
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
        this.loadDepartments();
        this.loadData();
    }
    viewDocument(docId, docName) {
        let targetDeptId = null;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (!targetDeptId && dept.fichiers && dept.fichiers.some(d => d.id === docId)) {
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
                        window.app.queryDetails.switchTab('documents');
                        setTimeout(() => {
                            const docElement = document.querySelector(`[data-id="${docId}"]`);
                            if (docElement) {
                                docElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                docElement.style.animation = 'highlight 2s ease';
                                setTimeout(() => {
                                    docElement.style.animation = '';
                                }, 2000);
                            }
                        }, 300);
                    }, 500);
                }
            }, 300);
        } else {
            this.editModeManager.showNotification(
                `No department found for document "${docName}"`,
                'warning'
            );
        }
    }
    editDocument(docId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        let targetDeptId = null;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (!targetDeptId && dept.fichiers && dept.fichiers.some(d => d.id === docId)) {
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
                        window.app.queryDetails.switchTab('documents');
                        setTimeout(() => {
                            const docElement = document.querySelector(`[data-id="${docId}"] .editable-doc-name, [data-id="${docId}"] .document-name`);
                            if (docElement && docElement.click) {
                                docElement.click();
                            }
                        }, 300);
                    }, 500);
                }
            }, 300);
        } else {
            this.editModeManager.showNotification(
                `Cannot edit document: no department found`,
                'error'
            );
        }
    }
    duplicateDocument(docId) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        let targetDeptId = null;
        if (this.xmlParser.departements) {
            this.xmlParser.departements.forEach((dept, deptId) => {
                if (!targetDeptId && dept.fichiers && dept.fichiers.some(d => d.id === docId)) {
                    targetDeptId = deptId;
                }
            });
        }
        if (targetDeptId) {
            const originalDoc = this.xmlParser.getDocumentById(docId);
            if (!originalDoc) {
                this.editModeManager.showNotification('Document not found', 'error');
                return;
            }
            let newId = `${docId}-copy`;
            let counter = 1;
            while (this.xmlParser.documentsMap.has(newId)) {
                newId = `${docId}-copy-${counter}`;
                counter++;
            }
            const isRegulation = originalDoc.type === 'reglementation' || 
                                originalDoc.category === 'regulation' || 
                                originalDoc.reglementation;
            const category = isRegulation ? 'regulation' : 'document';
            const newDoc = {
                id: newId,
                nom: `${originalDoc.nom} (Copy)`,
                category: category,
                document_type: originalDoc.document_type || '',
                description: originalDoc.description || '',
                code: originalDoc.code || '',
                ref: originalDoc.ref || '',
                lien: originalDoc.lien || '',
                page_reference: originalDoc.page_reference || '',
                type: originalDoc.type || (isRegulation ? 'reglementation' : 'manuel')
            };
            if (isRegulation) {
                newDoc.reglementation = originalDoc.reglementation || `${originalDoc.nom} (Copy)`;
                newDoc.regle_code = originalDoc.regle_code || '';
                newDoc.regle_titre = originalDoc.regle_titre || '';
                newDoc.regle_description = originalDoc.regle_description || '';
            }
            this.xmlParser.documentsMap.set(newId, newDoc);
            const dept = this.xmlParser.getDepartement(targetDeptId);
            if (dept) {
                if (!dept.fichiers) dept.fichiers = [];
                dept.fichiers.push(newDoc);
            }
            this.editModeManager.triggerAutoSave();
            this.editModeManager.showNotification('Document duplicated successfully', 'success');
            this.refresh();
        } else {
            this.editModeManager.showNotification(
                'Cannot duplicate document: no department found',
                'error'
            );
        }
    }
    async confirmDelete(docId, docName) {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const confirmed = await this.editModeManager.showConfirm(
            this.translate('confirmDelete').replace('{name}', docName)
        );
        if (confirmed) {
            try {
                const deptsWithDoc = [];
                if (this.xmlParser.departements) {
                    this.xmlParser.departements.forEach((dept, deptId) => {
                        if (dept.fichiers && dept.fichiers.some(d => d.id === docId)) {
                            deptsWithDoc.push(deptId);
                        }
                    });
                }
                deptsWithDoc.forEach(deptId => {
                    this.xmlParser.deleteDocument(deptId, docId);
                });
                if (this.xmlParser.documentsMap.has(docId)) {
                    const docInfo = this.xmlParser.documentsMap.get(docId);
                    if (docInfo.usageCount <= 0 || deptsWithDoc.length === 0) {
                        this.xmlParser.documentsMap.delete(docId);
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
                console.error('Error deleting document:', error);
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
                this.translate('columns.link'),
                this.translate('columns.code'),
                this.translate('columns.reference'),
                this.translate('columns.department'),
                this.translate('columns.pageRef'),
                'URL'
            ];
            const rows = this.filteredDocuments.map(doc => [
                doc.nom || '',
                doc.id || '',
                doc.isRegulation ? this.translate('regulation') : this.translate('document'),
                doc.linkName || '',
                doc.code || '',
                doc.ref || '',
                doc.departmentNames ? doc.departmentNames.join('; ') : '',
                doc.page_reference || '',
                doc.lien || ''
            ]);
            const csvContent = [
                headers.join(';'),
                ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(';'))
            ].join('\n');
            const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `documents_${new Date().toISOString().slice(0,10)}.csv`;
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
    importCSV() {
        if (!this.editModeManager.ensureDocumentWritable()) return;
        const csvImporter = new EditImportManager(this.xmlParser, this.editModeManager, 'documents');
        csvImporter.setLang(this.lng || 'fr');
        csvImporter.open();
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
