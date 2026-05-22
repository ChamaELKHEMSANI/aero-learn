class DiagrammeWindowsExplorer {
    constructor(xmlParser,bModal) {
        this.xmlParser = xmlParser;
        this.lng = 'en';
        this.bControlsEnabled= true;
        this.bModal=bModal;
        this.querySelect = null;
        this.queryModal = null;
        this.queryDetails = null;
        this.selectedNode = null;
        this.selectedItem = null;
        this.display_mode = null;
        this.translations = {
            fr: {
                detailsTitle: "Détails du département",
                itemsTitle: "Éléments du département",
                itemsCount: "élément(s)",
                selectItem: "Sélectionnez un élément dans la liste pour voir ses détails",
                noSubDepartments: "Aucun sous-département",
                noSubDepartmentsDetails: "Aucun sous-département - affichage des détails du département sélectionné",
                error: "Erreur",
                checkProvider: "Vérifiez que le fournisseur est accessible.",
                defaultFolderIcon: "📁",
                folderClosedIcon: "▶",
                folderOpenIcon: "▼",
                iconMap: {
                    'direction': '📋',
                    'operationnel': '📄',
                    'commercial': '📊',
                    'support': '📑',
                    'technique': '📄',
                    'formation': '📚',
                    'conformite': '📃',
                    'strategique': '📈',
                    'economique': '📉',
                    'default': '📄'
                }
            },
            en: {
                detailsTitle: "Department Details",
                itemsTitle: "Department Items",
                itemsCount: "item(s)",
                selectItem: "Select an item in the list to see its details",
                noSubDepartments: "No sub-departments",
                noSubDepartmentsDetails: "No sub-departments - displaying selected department details",
                error: "Error",
                checkProvider: "Check that the provider is accessible.",
                defaultFolderIcon: "📁",
                folderClosedIcon: "▶",
                folderOpenIcon: "▼",
                iconMap: {
                    'direction': '📋',
                    'operationnel': '📄',
                    'commercial': '📊',
                    'support': '📑',
                    'technique': '📄',
                    'formation': '📚',
                    'conformite': '📃',
                    'strategique': '📈',
                    'economique': '📉',
                    'default': '📄'
                }
            }
        };
    }
    initialize(lng, display_mode, querySelect, queryModal, queryDetails,bControlsEnabled) {
        this.lng = lng || 'en';
        this.bControlsEnabled = bControlsEnabled;
        this.querySelect = querySelect;
        this.queryModal = queryModal;
        this.queryDetails = queryDetails;
        this.display_mode = display_mode;
        this.init();
        this.buildTree();
        this.setupSplitter();
    }
    setLang(lng) {
        this.lng = lng || 'fr';
        this.updateInterfaceLanguage();
        this.buildTree();
        this.setupSplitter();
    }
    updateInterfaceLanguage() {
        const detailsHeader = document.querySelector('.details-header');
        if (detailsHeader) {
            detailsHeader.textContent = this.translate('detailsTitle');
        }
        const listHeaderSpan = document.querySelector('.list-header span:first-child');
        if (listHeaderSpan) {
            listHeaderSpan.textContent = this.translate('itemsTitle');
        }
        this.updateItemsCountText();
        this.updateMessages();
    }
    updateItemsCountText() {
        const itemCountElement = document.getElementById('item-count');
        if (itemCountElement) {
            const currentText = itemCountElement.textContent;
            const countMatch = currentText.match(/\d+/);
            if (countMatch) {
                const count = countMatch[0];
                itemCountElement.textContent = `${count} ${this.translate('itemsCount')}`;
            }
        }
    }
    updateMessages() {
        const noSubDepartmentsElements = document.querySelectorAll('.no-sub-departments-message');
        noSubDepartmentsElements.forEach(element => {
            if (element.textContent.includes('Aucun sous-département')) {
                if (element.textContent.includes('affichage des détails')) {
                    element.textContent = this.translate('noSubDepartmentsDetails');
                } else {
                    element.textContent = this.translate('noSubDepartments');
                }
            }
        });
        const selectItemElements = document.querySelectorAll('.select-item-message');
        selectItemElements.forEach(element => {
            if (element.textContent.includes('Sélectionnez un élément')) {
                element.textContent = this.translate('selectItem');
            }
        });
    }
    translate(key, context = null) {
        if (context && this.translations[this.lng] && this.translations[this.lng][context]) {
            const contextObj = this.translations[this.lng][context];
            if (contextObj && contextObj[key]) {
                return contextObj[key];
            }
        }
        if (this.translations[this.lng] && this.translations[this.lng][key]) {
            return this.translations[this.lng][key];
        }
        return key;
    }
    init() {
        let textheight='';
        if(this.bControlsEnabled== false)
           textheight=`style="height:calc(100vh - 20px);"`;
        if (!this.bModal)
            {
            document.getElementById('main-container-diagramme').innerHTML = `
            <div class="main-container" ${textheight}>
                <!-- Panneau de gauche - Arborescence -->
                <div id="tree-panel">
                    <div id="tree-container">
                        <!-- L'arborescence sera générée dynamiquement -->
                    </div>
                </div>
                <!-- Splitter vertical -->
                <div class="splitter vertical-splitter" id="vertical-splitter"></div>
                <!-- Panneau de droite - Contenu -->
                <div id="content-panel">
                    <!-- Panneau supérieur - Détails -->
                    <div id="details-panel">
                        <div id="panneau-documents">
                            <!-- Les détails seront chargés dynamiquement -->
                        </div>
                    </div>
                    <!-- Panneau inférieur - Liste des éléments -->
                    <!--div id="list-panel">
                        <div class="list-header">
                            <span>${this.translate('itemsTitle')}</span>
                            <span id="item-count">0 ${this.translate('itemsCount')}</span>
                        </div>
                        <div class="list-items" id="list-items">
                        </div>
                    </div-->
                </div>
            </div>        
            `;
            }
        else
            {
            document.getElementById('main-container-diagramme').innerHTML = `
            <div class="main-container" ${textheight}>
                <!-- Panneau de gauche - Arborescence -->
                <div id="tree-panel" style=" width: 100%; min-width: 10px; max-width: 10000px;">
                    <div id="tree-container">
                        <!-- L'arborescence sera générée dynamiquement -->
                    </div>
                </div>
            </div>        
            `;
            }
        if (this.queryDetails) {
            this.queryDetails.init();
        }
    }
    showError(messageError) {
        document.getElementById('main-container-diagramme').innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                <h2>${this.translate('error')}</h2>
                <p>${messageError}</p>
                <p>${this.translate('checkProvider')}</p>
            </div>
        `;
    }
    buildTree() {
        const treeContainer = document.getElementById('tree-container');
        treeContainer.innerHTML = '';
        const hierarchicalStructure = this.buildHierarchicalStructure();
        hierarchicalStructure.forEach(item => {
            const nodeElement = this.createTreeNode(item, 0);
            treeContainer.appendChild(nodeElement);
        });
        const firstNode = treeContainer.querySelector('.tree-node');
        if (firstNode && !this.bModal) {
            this.selectNode(firstNode);
        }
    }
    buildHierarchicalStructure() {
        const structure = [];
        const addedIds = new Set();
        const buildTree = (parentId, level = 0) => {
            const children = this.getDepartmentsByParent(parentId);
            const node = [];
            children.forEach(dept => {
                if (!addedIds.has(dept.id)) {
                    addedIds.add(dept.id);
                    const departmentNode = {
                        id: dept.id,
                        name: dept.nom,
                        type: dept.type,
                        level: level,
                        children: buildTree(dept.id, level + 1)
                    };
                    node.push(departmentNode);
                }
            });
            return node;
        };
        const result = buildTree('null');
        return result;
    }
    getDepartmentsByParent(parentId) {
        const allDepartments = Array.from(this.xmlParser.departements.values());
        return allDepartments.filter(dept => 
            (parentId === 'null' && (!dept.parent || dept.parent === 'null')) || 
            dept.parent === parentId
        );
    }
    getDocumentIcon(type) {
        const iconMap = this.translations[this.lng].iconMap;
        return iconMap[type] || iconMap['default'];
    }
    normalizeDepartmentColor(color) {
        const value = String(color || '').trim();
        if (!value) return '';
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) return value;
        if (/^rgb(a)?\(/i.test(value)) return value;
        return '';
    }
    getContrastTextColor(backgroundColor) {
        const color = this.normalizeDepartmentColor(backgroundColor);
        if (!color) return '';
        if (!color.startsWith('#')) return '#ffffff';
        let hex = color.slice(1);
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.62 ? '#17212b' : '#ffffff';
    }
    createTreeNode(node, level) {
        const treeNode = document.createElement('div');
        treeNode.className = 'tree-node';
        treeNode.dataset.id = node.id;
        const hasChildren = node.children && node.children.length > 0;
        let icon = this.translate('defaultFolderIcon');
        if (!hasChildren) {
            icon = this.getDocumentIcon(node.type);
        }
        let nodeContent = `
            <div class="tree-node-content">
                <span class="tree-node-icon">${hasChildren ? this.translate('folderClosedIcon') : ''}${icon}</span>
                <span class="tree-node-name">${node.name}</span>
            </div>
        `;
        treeNode.innerHTML = nodeContent;
        const department = this.xmlParser.getDepartement(node.id);
        const departmentColor = this.normalizeDepartmentColor(department?.background_color);
        const treeNodeContent = treeNode.querySelector('.tree-node-content');
        if (departmentColor && treeNodeContent) {
            const contrastColor = this.getContrastTextColor(departmentColor) || '#ffffff';
            treeNodeContent.style.setProperty('--tree-node-bg', departmentColor);
            treeNodeContent.style.setProperty('--tree-node-hover-bg', departmentColor);
            treeNodeContent.style.setProperty('--tree-node-selected-bg', departmentColor);
            treeNodeContent.style.setProperty('--tree-node-text', contrastColor);
            treeNodeContent.style.setProperty('--tree-node-selected-text', contrastColor);
            treeNodeContent.style.setProperty('--tree-node-icon-color', contrastColor);
            treeNodeContent.style.setProperty('--tree-node-selected-ring', departmentColor);
            treeNodeContent.style.setProperty('--tree-node-border', departmentColor);
            treeNodeContent.dataset.departmentColor = departmentColor;
        }
        if (hasChildren) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'tree-node-children';
            node.children.forEach(child => {
                const childNode = this.createTreeNode(child, level + 1);
                childrenContainer.appendChild(childNode);
            });
            treeNode.appendChild(childrenContainer);
            const iconElement = treeNode.querySelector('.tree-node-icon');
            iconElement.addEventListener('click', (e) => {
                e.stopPropagation();
                treeNode.classList.toggle('expanded');
                const currentIcon = iconElement.textContent;
                if (treeNode.classList.contains('expanded')) {
                    iconElement.textContent = this.translate('folderOpenIcon') + currentIcon.substring(1);
                } else {
                    iconElement.textContent = this.translate('folderClosedIcon') + currentIcon.substring(1);
                }
            });
        }
        treeNodeContent.addEventListener('click', (e) => {
            if (e.target.classList.contains('tree-node-icon')) return;
            this.selectNode(treeNode);
        });
        return treeNode;
    }
    selectNode(nodeElement) {
        if (this.selectedNode) {
            this.selectedNode.querySelector('.tree-node-content').classList.remove('selected');
        }
        nodeElement.querySelector('.tree-node-content').classList.add('selected');
        this.selectedNode = nodeElement;
        const departmentId = nodeElement.dataset.id;
        const currentDept = this.xmlParser.getDepartement(departmentId);
        this.showDepartmentDetails(currentDept);
        if (typeof nodeElement.scrollIntoView === 'function') {
            requestAnimationFrame(() => {
                nodeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            });
        }
    }
    loadDepartmentItems(departmentId) {
        const listItems = document.getElementById('list-items');
        const itemCount = document.getElementById('item-count');
        const childDepartments = this.getDepartmentsByParent(departmentId);
        if (itemCount) {
            itemCount.textContent = `${childDepartments.length} ${this.translate('itemsCount')}`;
        }
        if (listItems) {
            listItems.innerHTML = '';
            childDepartments.forEach(dept => {
                const listItem = this.createListItem(dept);
                listItems.appendChild(listItem);
            });
            if (childDepartments.length === 0) {
                const currentDept = this.xmlParser.getDepartement(departmentId);
                if (currentDept) {
                    this.showDepartmentDetails(currentDept);
                    listItems.innerHTML = `<div class="no-sub-departments-message" style="padding: 20px; text-align: center; color: #666;">${this.translate('noSubDepartmentsDetails')}</div>`;
                } else {
                    listItems.innerHTML = `<div class="no-sub-departments-message" style="padding: 20px; text-align: center; color: #666;">${this.translate('noSubDepartments')}</div>`;
                }
            } else {
                this.selectedItem = null;
                this.showDepartmentDetails(departmentId);
            }
        } else {
            const currentDept = this.xmlParser.getDepartement(departmentId);
            if (currentDept) {
                this.showDepartmentDetails(currentDept);
            }
        }
    }
    createListItem(department) {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.dataset.id = department.id;
        const icon = this.getDocumentIcon(department.type);
        listItem.innerHTML = `
            <span class="list-item-icon">${icon}</span>
            <span class="list-item-name">${department.nom}</span>
            <span class="list-item-type">${department.type}</span>
        `;
        listItem.addEventListener('click', () => {
            this.selectListItem(listItem, department);
        });
        return listItem;
    }
    selectListItem(listItem, department) {
        const previousSelected = document.querySelector('.list-item.selected');
        if (previousSelected) {
            previousSelected.classList.remove('selected');
        }
        listItem.classList.add('selected');
        this.selectedItem = department;
        this.showDepartmentDetails(department);
    }
    showDepartmentDetails(department) {
        if (this.queryDetails) {
            this.queryDetails.showDepartmentDetailsId(department.id);
        }
    }
    navigateToDepartmentFromSelect(departmentId) {
        this.navigateToDepartmentFromExtend(departmentId);
    }
     navigateToDepartmentFromModal(departmentId) {
        this.navigateToDepartmentFromExtend(departmentId);
     }
    navigateToDepartmentFromExtend(departmentId) {
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        const nodeElement = document.querySelector(`.tree-node[data-id="${departmentId}"]`);
        if (nodeElement) {
            this.selectNode(nodeElement);
            this.expandParents(nodeElement);
        }
        this.loadDepartmentItems(departmentId);
        this.showDepartmentDetails(departmentId);
    }
    expandParents(nodeElement) {
        let parent = nodeElement.parentElement;
        while (parent && parent.classList.contains('tree-node-children')) {
            const parentNode = parent.parentElement;
            if (parentNode && parentNode.classList.contains('tree-node')) {
                if (!parentNode.classList.contains('expanded')) {
                    parentNode.classList.add('expanded');
                    const iconElement = parentNode.querySelector('.tree-node-icon');
                    if (iconElement) {
                        const currentIcon = iconElement.textContent;
                        iconElement.textContent = this.translate('folderOpenIcon') + currentIcon.substring(1);
                    }
                }
                parent = parentNode.parentElement;
            } else {
                break;
            }
        }
    }
    setupSplitter() {
        const verticalSplitter = document.getElementById('vertical-splitter');
        const horizontalSplitter = document.getElementById('horizontal-splitter');
        const treePanel = document.getElementById('tree-panel');
        const detailsPanel = document.getElementById('details-panel');
        const mainContainer = document.querySelector('.main-container');
        let isVerticalResizing = false;
        let isHorizontalResizing = false;
        if (verticalSplitter) {
            verticalSplitter.addEventListener('mousedown', function(e) {
                isVerticalResizing = true;
                document.body.style.cursor = 'col-resize';
                document.body.style.userSelect = 'none';
                e.preventDefault();
            });
        }
        if (horizontalSplitter) {
            horizontalSplitter.addEventListener('mousedown', function(e) {
                isHorizontalResizing = true;
                document.body.style.cursor = 'row-resize';
                document.body.style.userSelect = 'none';
                e.preventDefault();
            });
        }
        document.addEventListener('mousemove', function(e) {
            if (isVerticalResizing && treePanel && mainContainer) {
                const containerRect = mainContainer.getBoundingClientRect();
                const newWidth = e.clientX - containerRect.left;
                if (newWidth > 200 && newWidth < containerRect.width - 400) {
                    treePanel.style.width = newWidth + 'px';
                }
            }
            if (isHorizontalResizing && detailsPanel) {
                const contentPanel = document.getElementById('content-panel');
                if (contentPanel) {
                    const contentPanelRect = contentPanel.getBoundingClientRect();
                    const newHeight = e.clientY - contentPanelRect.top;
                    const minHeight = 150;
                    const maxHeight = contentPanelRect.height - 150;
                    if (newHeight > minHeight && newHeight < maxHeight) {
                        detailsPanel.style.height = newHeight + 'px';
                    }
                }
            }
        });
        document.addEventListener('mouseup', function() {
            isVerticalResizing = false;
            isHorizontalResizing = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        });
    }
    clearDiagramme() {
        const treeNodes = document.querySelectorAll('.tree-node');
        treeNodes.forEach(node => {
            const content = node.querySelector('.tree-node-content');
            const icon = node.querySelector('.tree-node-icon');
            if (content) {
                content.replaceWith(content.cloneNode(true));
            }
            if (icon) {
                icon.replaceWith(icon.cloneNode(true));
            }
        });
        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach(item => {
            item.replaceWith(item.cloneNode(true));
        });
        const verticalSplitter = document.getElementById('vertical-splitter');
        const horizontalSplitter = document.getElementById('horizontal-splitter');
        if (verticalSplitter) {
            verticalSplitter.replaceWith(verticalSplitter.cloneNode(true));
        }
        if (horizontalSplitter) {
            horizontalSplitter.replaceWith(horizontalSplitter.cloneNode(true));
        }
        const treeContainer = document.getElementById('tree-container');
        const listItemsContainer = document.getElementById('list-items');
        if (treeContainer) treeContainer.innerHTML = '';
        if (listItemsContainer) listItemsContainer.innerHTML = '';
        this.selectedNode = null;
        this.selectedItem = null;
        document.getElementById('main-container-diagramme').innerHTML = '';
    }
}
