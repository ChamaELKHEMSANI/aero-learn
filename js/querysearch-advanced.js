class QuerySearchAdvanced {
    constructor(xmlParser) {
        this.lng = 'en';
        this.diagramme = null;
        this.xmlParser = xmlParser;
        this.availableKeyAttributes = new Set();
        this.translations = {
            fr: {
                close: "Fermer",
                filters: "Filtres",
                results: "RÃ©sultats",
                moreFilters: "Plus de filtres",
                fewerFilters: "Moins de filtres",
                startSearch: "Les rÃ©sultats apparaÃ®tront ici",
                advancedSearch: "Recherche Avancée",
                searchTerm: "Terme de recherche:",
                searchTermPlaceholder: "Rechercher dans les noms, descriptions...",
                departmentType: "Type de département:",
                allTypes: "Tous les types",
                direction: "Direction",
                operationnel: "Opérationnel",
                commercial: "Commercial",
                support: "Support",
                technique: "Technique",
                formation: "Formation",
                conformite: "Conformité",
                strategique: "Stratégique",
                keyAttribute: "Attribut clé:",
                allAttributes: "Tous les attributs",
                keyValue: "Valeur de l'attribut clé:",
                keyValuePlaceholder: "Valeur à rechercher dans l'attribut sélectionné",
                manager: "Responsable:",
                managerPlaceholder: "Nom du responsable",
                document: "Document:",
                documentPlaceholder: "Nom ou référence de document",
                withDocuments: "Uniquement les départements avec documents",
                reset: "Réinitialiser",
                search: "Rechercher",
                noResults: "Aucun résultat trouvé",
                tryCriteria: "Essayez de modifier vos critères de recherche.",
                resultsFound: "résultat(s) trouvé(s)",
                noDescription: "Aucune description",
                documents: "document(s)",
                loading: "Chargement...",
                unknownType: "Inconnu",
                noManager: "Non spécifié"
            },
            en: {
                close: "Close",
                filters: "Filters",
                results: "Results",
                moreFilters: "More filters",
                fewerFilters: "Fewer filters",
                startSearch: "Results will appear here",
                advancedSearch: "Advanced Search",
                searchTerm: "Search term:",
                searchTermPlaceholder: "Search in names, descriptions...",
                departmentType: "Department type:",
                allTypes: "All types",
                direction: "Direction",
                operationnel: "Operational",
                commercial: "Commercial",
                support: "Support",
                technique: "Technical",
                formation: "Training",
                conformite: "Compliance",
                strategique: "Strategic",
                keyAttribute: "Key attribute:",
                allAttributes: "All attributes",
                keyValue: "Key attribute value:",
                keyValuePlaceholder: "Value to search in selected attribute",
                manager: "Manager:",
                managerPlaceholder: "Manager name",
                document: "Document:",
                documentPlaceholder: "Document name or reference",
                withDocuments: "Only departments with documents",
                reset: "Reset",
                search: "Search",
                noResults: "No results found",
                tryCriteria: "Try modifying your search criteria.",
                resultsFound: "result(s) found",
                noDescription: "No description",
                documents: "document(s)",
                loading: "Loading...",
                unknownType: "Unknown",
                noManager: "Not specified"
            }
        };
        this.bindMethods();
    }
    bindMethods() {
        this.openSearchModal = this.openSearchModal.bind(this);
        this.closeSearchModal = this.closeSearchModal.bind(this);
        this.resetSearchForm = this.resetSearchForm.bind(this);
        this.executeAdvancedSearch = this.executeAdvancedSearch.bind(this);
        this.translate = this.translate.bind(this);
    }
    initialize(lng, diagramme) {
        this.lng = lng || 'fr';
        this.diagramme = diagramme;
        this.init();
        this.extractKeyAttributes();
        this.populateTypeFilter();
        this.populateKeyAttributesFilter();
        this.setupSearchModalEvents();
        this.updateLanguage();
    }
    setLang(lng) {
        this.lng = lng || 'fr';
        this.updateLanguage();
    }
    updateLanguage() {
        const modalTitle = document.querySelector('#search-modal .modal-header h2');
        if (modalTitle) {
            modalTitle.textContent = this.translate('advancedSearch');
        }
        const closeBtn = document.getElementById('close-search-modal');
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', this.translate('close'));
            closeBtn.title = this.translate('close');
        }
        const filtersTitle = document.querySelector('.filters-card-header h3');
        if (filtersTitle) {
            filtersTitle.textContent = this.translate('filters');
        }
        const resultsTitle = document.querySelector('.results-panel-header h3');
        if (resultsTitle) {
            resultsTitle.textContent = this.translate('results');
        }
        const toggleFiltersBtn = document.getElementById('toggle-advanced-filters');
        const extraFilters = document.getElementById('advanced-search-extra');
        if (toggleFiltersBtn) {
            const isExpanded = extraFilters && !extraFilters.classList.contains('hidden');
            toggleFiltersBtn.textContent = this.translate(isExpanded ? 'fewerFilters' : 'moreFilters');
            toggleFiltersBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        }
        const btn_titre = document.getElementById('query-view');
        if(btn_titre){
            btn_titre.innerText = this.translate('advancedSearch');
        }
        this.updateFormLabels();
        this.updateTypeOptions();
        const resetBtn = document.getElementById('reset-search');
        const searchBtn = document.getElementById('execute-search');
        if (resetBtn) resetBtn.textContent = this.translate('reset');
        if (searchBtn) searchBtn.textContent = this.translate('search');
        const resultsHeader = document.querySelector('.results-header h3');
        if (resultsHeader) {
            const resultsCount = document.querySelectorAll('.search-result-item').length;
            resultsHeader.textContent = `${resultsCount} ${this.translate('resultsFound')}`;
        }
        const emptyState = document.querySelector('.search-results-empty');
        if (emptyState) {
            emptyState.textContent = this.translate('startSearch');
        }
        this.updateResultsText();
    }
    updateFormLabels() {
        const labels = {
            'search-term': this.translate('searchTerm'),
            'search-type': this.translate('departmentType'),
            'search-key-attribute': this.translate('keyAttribute'),
            'search-key-value': this.translate('keyValue'),
            'search-responsable': this.translate('manager'),
            'search-document': this.translate('document')
        };
        Object.keys(labels).forEach(id => {
            const label = document.querySelector(`label[for="${id}"]`);
            if (label) {
                label.textContent = labels[id];
            }
        });
        const placeholders = {
            'search-term': this.translate('searchTermPlaceholder'),
            'search-key-value': this.translate('keyValuePlaceholder'),
            'search-responsable': this.translate('managerPlaceholder'),
            'search-document': this.translate('documentPlaceholder')
        };
        Object.keys(placeholders).forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.placeholder = placeholders[id];
            }
        });
        const checkboxLabel = document.querySelector('.checkbox-label');
        if (checkboxLabel) {
            const checkbox = document.getElementById('search-with-documents');
            const isChecked = checkbox ? checkbox.checked : false;
            checkboxLabel.innerHTML = `<input type="checkbox" id="search-with-documents" ${isChecked ? 'checked' : ''}> ${this.translate('withDocuments')}`;
            checkboxLabel.setAttribute('for', 'search-with-documents');
        }
    }
    updateTypeOptions() {
        const typeSelect = document.getElementById('search-type');
        if (!typeSelect) return;
        const optionKeys = [
            { value: '', key: 'allTypes' },
            { value: 'direction', key: 'direction' },
            { value: 'operationnel', key: 'operationnel' },
            { value: 'commercial', key: 'commercial' },
            { value: 'support', key: 'support' },
            { value: 'technique', key: 'technique' },
            { value: 'formation', key: 'formation' },
            { value: 'conformite', key: 'conformite' },
            { value: 'strategique', key: 'strategique' }
        ];
        const currentValue = typeSelect.value;
        typeSelect.innerHTML = optionKeys
            .map(({ value, key }) => `<option value="${value}">${this.translate(key)}</option>`)
            .join('');
        typeSelect.value = currentValue;
    }
    updateResultsText() {
        document.querySelectorAll('.result-description').forEach(el => {
            if (el.textContent === 'Aucune description' || el.textContent === 'No description') {
                el.textContent = this.translate('noDescription');
            }
        });
        document.querySelectorAll('.result-type').forEach(el => {
            const typeClass = Array.from(el.classList).find(cls => cls !== 'result-type');
            if (typeClass) {
                el.textContent = this.translate(typeClass) || this.translate('unknownType');
            }
        });
        document.querySelectorAll('.result-documents').forEach(el => {
            const count = el.textContent.match(/\d+/);
            if (count) {
                el.textContent = `${count[0]} ${this.translate('documents')}`;
            }
        });
    }
    translate(key) {
        const translation = this.translations[this.lng];
        return translation ? translation[key] || key : key;
    }
    init() {
        const modal = document.getElementById('search-modal');
        if (!modal) return;
        modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${this.translate('advancedSearch')}</h2>
                <button id="close-search-modal" class="close-modal" aria-label="${this.translate('close')}" title="${this.translate('close')}">&times;</button>
            </div>
            <div class="modal-body">
                <div class="advanced-search-layout">
                    <aside class="advanced-search-sidebar">
                        <div class="filters-card">
                            <div class="filters-card-header">
                                <h3>${this.translate('filters')}</h3>
                                <button type="button" id="toggle-advanced-filters" class="toggle-filters-btn" aria-expanded="false">${this.translate('moreFilters')}</button>
                            </div>
                            <div class="search-filters search-filters-primary">
                                <div class="filter-group filter-group-full">
                                    <label for="search-term">${this.translate('searchTerm')}</label>
                                    <input type="text" id="search-term" placeholder="${this.translate('searchTermPlaceholder')}">
                                </div>
                                <div class="filter-group">
                                    <label for="search-type">${this.translate('departmentType')}</label>
                                    <select id="search-type">
                                        <option value="">${this.translate('allTypes')}</option>
                                        <option value="direction">${this.translate('direction')}</option>
                                        <option value="operationnel">${this.translate('operationnel')}</option>
                                        <option value="commercial">${this.translate('commercial')}</option>
                                        <option value="support">${this.translate('support')}</option>
                                        <option value="technique">${this.translate('technique')}</option>
                                        <option value="formation">${this.translate('formation')}</option>
                                        <option value="conformite">${this.translate('conformite')}</option>
                                        <option value="strategique">${this.translate('strategique')}</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label for="search-document">${this.translate('document')}</label>
                                    <input type="text" id="search-document" placeholder="${this.translate('documentPlaceholder')}">
                                </div>
                            </div>
                            <div id="advanced-search-extra" class="search-filters search-filters-extra hidden">
                                <div class="filter-group">
                                    <label for="search-key-attribute">${this.translate('keyAttribute')}</label>
                                    <select id="search-key-attribute">
                                        <option value="">${this.translate('allAttributes')}</option>
                                    </select>
                                </div>
                                <div class="filter-group">
                                    <label for="search-key-value">${this.translate('keyValue')}</label>
                                    <input type="text" id="search-key-value" placeholder="${this.translate('keyValuePlaceholder')}" disabled>
                                </div>
                                <div class="filter-group">
                                    <label for="search-responsable">${this.translate('manager')}</label>
                                    <input type="text" id="search-responsable" placeholder="${this.translate('managerPlaceholder')}">
                                </div>
                                <div class="filter-group filter-group-full">
                                    <label for="search-with-documents" class="checkbox-label">
                                        <input type="checkbox" id="search-with-documents">
                                        ${this.translate('withDocuments')}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <section class="advanced-search-results-panel">
                        <div class="results-panel-header">
                            <h3>${this.translate('results')}</h3>
                        </div>
                        <div class="search-results" id="search-results">
                            <div class="search-results-empty">${this.translate('startSearch')}</div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="modal-footer">
                <button id="reset-search" class="btn-secondary">${this.translate('reset')}</button>
                <button id="execute-search" class="btn-primary">${this.translate('search')}</button>
            </div>
        </div>
       `;
    }
    extractKeyAttributes() {
        this.availableKeyAttributes.clear();
        const allDocuments = this.xmlParser.getAllDocuments();
        allDocuments.forEach(document => {
            Object.keys(document).forEach(key => {
                if (key.startsWith('key') && document[key]) {
                    this.availableKeyAttributes.add(key);
                }
            });
        });
    }
    populateKeyAttributesFilter() {
        const select = document.getElementById('search-key-attribute');
        if (!select) return;
        select.innerHTML = `<option value="">${this.translate('allAttributes')}</option>`;
        this.availableKeyAttributes.forEach(attr => {
            const option = document.createElement('option');
            option.value = attr;
            option.textContent = this.formatKeyAttributeName(attr);
            select.appendChild(option);
        });
    }
    formatKeyAttributeName(attr) {
        return attr.replace(/^key-?/, '')
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());
    }
    setupSearchModalEvents() {
        document.body.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'query-view') {
                this.openSearchModal();
            }
            if (e.target && e.target.id === 'close-search-modal') {
                this.closeSearchModal();
            }
            if (e.target && e.target.id === 'reset-search') {
                this.resetSearchForm();
            }
            if (e.target && e.target.id === 'search-modal') {
                this.closeSearchModal();
            }
        });
        const searchTermInput = document.getElementById('search-term');
        if (searchTermInput) {
            searchTermInput.addEventListener('input', (e) => {
                if (e.target.value.length >= 3) {
                    this.executeAdvancedSearch();
                }
            });
        }
        const executeSearchBtn = document.getElementById('execute-search');
        if (executeSearchBtn) {
            executeSearchBtn.addEventListener('click', () => {
                this.executeAdvancedSearch();
            });
        }
        const toggleFiltersBtn = document.getElementById('toggle-advanced-filters');
        if (toggleFiltersBtn) {
            toggleFiltersBtn.addEventListener('click', () => {
                const extraFilters = document.getElementById('advanced-search-extra');
                if (!extraFilters) return;
                const shouldExpand = extraFilters.classList.contains('hidden');
                extraFilters.classList.toggle('hidden', !shouldExpand);
                toggleFiltersBtn.textContent = this.translate(shouldExpand ? 'fewerFilters' : 'moreFilters');
                toggleFiltersBtn.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
            });
        }
        const keyAttributeSelect = document.getElementById('search-key-attribute');
        if (keyAttributeSelect) {
            keyAttributeSelect.addEventListener('change', (e) => {
                const valueInput = document.getElementById('search-key-value');
                if (valueInput) {
                    valueInput.disabled = !e.target.value;
                    if (!e.target.value) {
                        valueInput.value = '';
                    }
                }
            });
        }
    }
    openSearchModal() {
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.remove('hidden');
            const searchTermInput = document.getElementById('search-term');
            if (searchTermInput) {
                searchTermInput.focus();
            }
        }
    }
    closeSearchModal() {
        const modal = document.getElementById('search-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    resetSearchForm() {
        const inputs = [
            'search-term',
            'search-type',
            'search-key-attribute',
            'search-key-value',
            'search-responsable',
            'search-document'
        ];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (element.tagName === 'SELECT') {
                    element.value = '';
                } else if (element.tagName === 'INPUT') {
                    if (element.type === 'checkbox') {
                        element.checked = false;
                    } else {
                        element.value = '';
                    }
                }
            }
        });
        const keyValueInput = document.getElementById('search-key-value');
        if (keyValueInput) {
            keyValueInput.disabled = true;
        }
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `<div class="search-results-empty">${this.translate('startSearch')}</div>`;
        }
    }
    populateTypeFilter() {
    }
    executeAdvancedSearch() {
        const term = document.getElementById('search-term')?.value.toLowerCase() || '';
        const type = document.getElementById('search-type')?.value || '';
        const keyAttribute = document.getElementById('search-key-attribute')?.value || '';
        const keyValue = document.getElementById('search-key-value')?.value.toLowerCase() || '';
        const responsable = document.getElementById('search-responsable')?.value.toLowerCase() || '';
        const documentTerm = document.getElementById('search-document')?.value.toLowerCase() || '';
        const withDocuments = document.getElementById('search-with-documents')?.checked || false;
        const results = this.advancedSearch(term, type, keyAttribute, keyValue, responsable, documentTerm, withDocuments);
        this.displaySearchResults(results);
    }
    advancedSearch(term, type, keyAttribute, keyValue, responsable, documentTerm, withDocuments) {
        let results = term ? this.xmlParser.searchDepartements(term) : Array.from(this.xmlParser.departements.values());
        return results.filter(dept => {
            if (type && dept.type !== type) {
                return false;
            }
            if (keyAttribute && keyValue) {
                const hasMatchingKeyAttribute = dept.fichiers && dept.fichiers.some(fichier => {
                    const attributeValue = fichier[keyAttribute];
                    return attributeValue && attributeValue.toString().toLowerCase().includes(keyValue);
                });
                if (!hasMatchingKeyAttribute) {
                    return false;
                }
            }
            if (responsable && (!dept.responsable || !dept.responsable.toLowerCase().includes(responsable))) {
                return false;
            }
            if (documentTerm && !dept.fichiers.some(f => 
                f.nom.toLowerCase().includes(documentTerm) || 
                (f.ref && f.ref.toLowerCase().includes(documentTerm))
            )) {
                return false;
            }
            if (withDocuments && dept.fichiers.length === 0) {
                return false;
            }
            return true;
        });
    }
    displaySearchResults(results) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>${this.translate('noResults')}</p>
                    <p>${this.translate('tryCriteria')}</p>
                </div>
            `;
            return;
        }
        let html = `
            <div class="results-header">
                <h3>${results.length} ${this.translate('resultsFound')}</h3>
            </div>
            <div class="results-list">
        `;
        results.forEach(dept => {
            const documentCount = dept.fichiers ? dept.fichiers.length : 0;
            const typeLabel = this.getTranslatedTypeLabel(dept.type);
            const keyAttributes = this.extractKeyAttributesForDisplay(dept);
            html += `
                <div class="search-result-item" data-id="${dept.id}">
                    <div class="result-main">
                        <h4 class="result-title">${this.getShortName(dept.nom)}</h4>
                        <span class="result-type ${dept.type}">${typeLabel}</span>
                    </div>
                    <div class="result-details">
                        <p class="result-description">${dept.description || this.translate('noDescription')}</p>
                        ${keyAttributes ? `<div class="result-key-attributes">${keyAttributes}</div>` : ''}
                        <div class="result-meta">
                            <span class="result-responsable">${dept.responsable || this.translate('noManager')}</span>
                            ${documentCount > 0 ? `<span class="result-documents">${documentCount} ${this.translate('documents')}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
        resultsContainer.innerHTML = html;
        resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const deptId = item.dataset.id;
                this.navigateToSearchResult(deptId);
            });
        });
    }
    extractKeyAttributesForDisplay(dept) {
        if (!dept.fichiers || dept.fichiers.length === 0) return '';
        const keyAttrs = [];
        dept.fichiers.forEach(fichier => {
            Object.keys(fichier).forEach(key => {
                if (key.startsWith('key') && fichier[key]) {
                    const displayName = this.formatKeyAttributeName(key);
                    keyAttrs.push(`<span class="key-attribute"><strong>${displayName}:</strong> ${fichier[key]}</span>`);
                }
            });
        });
        return keyAttrs.length > 0 ? keyAttrs.join(' ') : '';
    }
    getTranslatedTypeLabel(type) {
        return this.translate(type) || this.translate('unknownType');
    }
    getShortName(nom) {
        return nom.length > 50 ? nom.substring(0, 50) + '...' : nom;
    }
    navigateToSearchResult(departmentId) {
        if (!this.diagramme) return;
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        this.closeSearchModal();
        this.diagramme.navigateToDepartmentFromModal(departmentId);
    }
}
