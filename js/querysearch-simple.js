class QuerySearchSimple {
    constructor(xmlParser) {
        this.xmlParser = xmlParser;
        this.diagramme = null;
        this.lng = 'en';
        this.searchMode = 'all';
        this.container = null;
        this.translations = {
            en: {
                searchIn: 'Search in',
                search: 'Search',
                all: 'All',
                department: 'Departments',
                task: 'Tasks',
                documents: 'Documents',
                placeholderAll: 'Search departments, tasks, documents...',
                placeholderDepartment: 'Search department...',
                placeholderTask: 'Search task...',
                placeholderDocuments: 'Search document...',
                noSearchResult: 'No result for "{term}"',
                documentFallback: 'Document',
                taskFallback: 'Task'
            },
            fr: {
                searchIn: 'Rechercher dans',
                search: 'Rechercher',
                all: 'Tout',
                department: 'Departements',
                task: 'Taches',
                documents: 'Documents',
                placeholderAll: 'Rechercher departements, taches, documents...',
                placeholderDepartment: 'Rechercher un departement...',
                placeholderTask: 'Rechercher une tache...',
                placeholderDocuments: 'Rechercher un document...',
                noSearchResult: 'Aucun resultat pour "{term}"',
                documentFallback: 'Document',
                taskFallback: 'Tache'
            }
        };
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations.en[key] || key;
        Object.keys(params).forEach((param) => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    initialize(lng, diagramme, options = {}) {
        this.lng = lng || 'en';
        this.diagramme = diagramme;
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : (options.container || null);
        if (!this.container) {
            return;
        }
        this.render();
        this.attachEventListeners();
        this.updateLanguage();
    }
    setLang(lng) {
        this.lng = lng || 'en';
        this.updateLanguage();
    }
    render() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="query-search-simple">
                <div class="query-search-simple-group">
                    <label for="query-search-simple-scope" class="query-search-simple-label">${this.translate('searchIn')}</label>
                    <select id="query-search-simple-scope" class="query-search-simple-scope" aria-label="${this.translate('searchIn')}">
                        <option value="all">${this.translate('all')}</option>
                        <option value="department">${this.translate('department')}</option>
                        <option value="task">${this.translate('task')}</option>
                        <option value="documents">${this.translate('documents')}</option>
                    </select>
                    <input
                        type="text"
                        id="query-search-simple-input"
                        class="query-search-simple-input"
                        placeholder="${this.getPlaceholder()}"
                        aria-label="${this.translate('search')}"
                    />
                </div>
                <div id="query-search-simple-suggestions" class="query-search-simple-suggestions" style="display:none;"></div>
            </div>
        `;
    }
    attachEventListeners() {
        const scopeSelect = this.container.querySelector('#query-search-simple-scope');
        const input = this.container.querySelector('#query-search-simple-input');
        scopeSelect?.addEventListener('change', (e) => {
            this.setSearchMode(e.target.value);
        });
        input?.addEventListener('input', (e) => {
            this.updateSuggestions(e.target.value || '');
        });
        input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(e.target.value || '');
            }
        });
        document.addEventListener('click', (e) => {
            if (!this.container?.contains(e.target)) {
                this.hideSuggestions();
            }
        });
    }
    updateLanguage() {
        if (!this.container) return;
        const label = this.container.querySelector('.query-search-simple-label');
        const scopeSelect = this.container.querySelector('#query-search-simple-scope');
        const input = this.container.querySelector('#query-search-simple-input');
        if (label) {
            label.textContent = this.translate('searchIn');
        }
        if (scopeSelect) {
            const currentValue = scopeSelect.value || this.searchMode;
            scopeSelect.innerHTML = `
                <option value="all">${this.translate('all')}</option>
                <option value="department">${this.translate('department')}</option>
                <option value="task">${this.translate('task')}</option>
                <option value="documents">${this.translate('documents')}</option>
            `;
            scopeSelect.value = currentValue;
        }
        if (input) {
            input.placeholder = this.getPlaceholder();
            input.setAttribute('aria-label', this.translate('search'));
        }
    }
    setSearchMode(mode) {
        this.searchMode = mode || 'all';
        const input = this.container?.querySelector('#query-search-simple-input');
        if (input) {
            input.placeholder = this.getPlaceholder();
            this.updateSuggestions(input.value || '');
        }
    }
    getPlaceholder() {
        const placeholders = {
            all: this.translate('placeholderAll'),
            department: this.translate('placeholderDepartment'),
            task: this.translate('placeholderTask'),
            documents: this.translate('placeholderDocuments')
        };
        return placeholders[this.searchMode] || placeholders.all;
    }
    getSearchSuggestions(rawTerm) {
        const term = String(rawTerm || '').trim().toLowerCase();
        if (term.length < 2) return [];
        const suggestions = [];
        if (this.searchMode === 'all' || this.searchMode === 'department') {
            const departments = this.xmlParser.searchDepartements(term)
                .filter((dept) => dept && dept.id && dept.id !== 'root')
                .slice(0, 8)
                .map((dept) => ({
                    type: 'department',
                    label: dept.nom || dept.id,
                    sublabel: dept.id,
                    departmentId: dept.id
                }));
            suggestions.push(...departments);
        }
        if (this.searchMode === 'all' || this.searchMode === 'documents') {
            const documents = (this.xmlParser.getAllDocuments?.() || [])
                .filter((doc) =>
                    (doc.nom || '').toLowerCase().includes(term) ||
                    (doc.description || '').toLowerCase().includes(term) ||
                    (doc.code || '').toLowerCase().includes(term) ||
                    (doc.ref || '').toLowerCase().includes(term)
                )
                .slice(0, 8)
                .map((doc) => ({
                    type: 'documents',
                    label: doc.nom || doc.id || this.translate('documentFallback'),
                    sublabel: doc.code || doc.ref || doc.departments?.[0] || '',
                    departmentId: doc.departments?.[0] || null
                }))
                .filter((item) => item.departmentId);
            suggestions.push(...documents);
        }
        if (this.searchMode === 'all' || this.searchMode === 'task') {
            const tasks = (this.xmlParser.getAllTasks?.() || [])
                .filter((task) =>
                    (task.nom || '').toLowerCase().includes(term) ||
                    (task.description || '').toLowerCase().includes(term) ||
                    (task.categorie || '').toLowerCase().includes(term)
                )
                .slice(0, 8)
                .map((task) => ({
                    type: 'task',
                    label: task.nom || task.id || this.translate('taskFallback'),
                    sublabel: task.categorie || task.departments?.[0] || '',
                    departmentId: task.departments?.[0] || null
                }))
                .filter((item) => item.departmentId);
            suggestions.push(...tasks);
        }
        const seen = new Set();
        return suggestions.filter((item) => {
            const key = `${item.type}:${item.label}:${item.departmentId}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, 12);
    }
    updateSuggestions(rawTerm) {
        const container = this.container?.querySelector('#query-search-simple-suggestions');
        if (!container) return;
        const suggestions = this.getSearchSuggestions(rawTerm);
        if (!suggestions.length) {
            this.hideSuggestions();
            return;
        }
        container.innerHTML = suggestions.map((item) => `
            <button type="button" class="query-search-simple-item" data-dept-id="${item.departmentId}">
                <span class="query-search-simple-item-label">${item.label}</span>
                <span class="query-search-simple-item-sub">${item.sublabel || ''}</span>
            </button>
        `).join('');
        container.style.display = 'block';
        container.querySelectorAll('.query-search-simple-item').forEach((button) => {
            button.addEventListener('click', () => {
                const deptId = button.getAttribute('data-dept-id');
                const input = this.container?.querySelector('#query-search-simple-input');
                const label = button.querySelector('.query-search-simple-item-label')?.textContent || '';
                if (input) input.value = label;
                this.hideSuggestions();
                this.navigateToDepartment(deptId);
            });
        });
    }
    hideSuggestions() {
        const container = this.container?.querySelector('#query-search-simple-suggestions');
        if (!container) return;
        container.style.display = 'none';
        container.innerHTML = '';
    }
    performSearch(rawTerm) {
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
    navigateToDepartment(departmentId) {
        if (!departmentId || !this.diagramme) return;
        if (typeof this.diagramme.navigateToDepartmentFromSelect === 'function') {
            this.diagramme.navigateToDepartmentFromSelect(departmentId);
        }
        if (window.app?.queryDetails?.showDepartmentDetailsId) {
            window.app.queryDetails.showDepartmentDetailsId(departmentId);
        }
    }
    showNotification(message, type = 'info') {
        if (window.editModeManager?.showNotification) {
            window.editModeManager.showNotification(message, type);
        }
    }
}
