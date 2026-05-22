class QuerySelect {
    constructor(xmlParser) {
        this.lng='en';
        this.diagramme = null;
        this.xmlParser = xmlParser;
        this.departementsMap = new Map();
    }
    initialize(lng,diagramme)  {
        this.lng=lng;
        this.diagramme = diagramme;
        this.buildDepartementsMap();
        this.populateDepartmentSelect();
        this.setupSelectEventListener();
    }
    setLang(lng)
    {
        this.lng=lng;
    }
    buildDepartementsMap() {
        this.departementsMap.clear();
        this.xmlParser.departements.forEach(dept => {
            const parent = dept.parent || 'root';
            if (!this.departementsMap.has(parent)) {
                this.departementsMap.set(parent, []);
            }
            this.departementsMap.get(parent).push(dept);
        });
    }
    populateDepartmentSelect() {
        const select = document.getElementById('department-select');
        select.innerHTML = '';
        const hierarchicalStructure = this.buildHierarchicalStructure();
        this.addDepartmentsToSelect(select, hierarchicalStructure, 0);
    }
    buildHierarchicalStructure() {
        const structure = [];
        const addedIds = new Set();
        const buildTree = (parentId, level = 0) => {
            const children = this.departementsMap.get(parentId) || [];
            const node = [];
            children.forEach(dept => {
                if (!addedIds.has(dept.id)) {
                    addedIds.add(dept.id);
                    const departmentNode = {
                        id: dept.id,
                        name: dept.nom,
                        level: level,
                        children: buildTree(dept.id, level + 1) 
                    };
                    node.push(departmentNode);
                }
            });
            return node;
        };
        const result = buildTree('root');
        return result;
    }
    addDepartmentsToSelect(select, structure, currentLevel) {
        structure.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            const indent = ' . '.repeat(item.level);
            const prefix = item.level > 0 ? ' ' : '';
            const icon   =  (item.children.length > 0) ? '📁' :'📄';
            option.textContent = `${prefix}${indent}${icon}${item.name}`;
            if (item.children.length > 0) {
                option.style.fontWeight = 'bold';
                }            
            if (item.level > 0) {
                option.style.paddingLeft = (item.level * 20) + 'px';
                option.style.fontSize = item.level > 1 ? '13px' : '14px';
            }
            select.appendChild(option);
            if (item.children.length > 0) {
                this.addDepartmentsToSelect(select, item.children, currentLevel);
            }
        });
    }
getDepartementParent(departmentId) {
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) {
            return 'root';
        }
        if (dept.parent && dept.parent !== 'null') {
            return dept.parent;
        }
        return 'root';
    }
    getDepartmentLevel(departmentId) {
        let level = 0;
        let currentId = departmentId;
        const visited = new Set();
        while (currentId && currentId !== 'root' && !visited.has(currentId)) {
            visited.add(currentId);
            const dept = this.xmlParser.getDepartement(currentId);
            if (dept && dept.parent && dept.parent !== 'root' && dept.parent !== 'null') {
                level++;
                currentId = dept.parent;
            } else {
                break;
            }
        }
        return level;
    }
    setupSelectEventListener() {
        const select = document.getElementById('department-select');
        select.addEventListener('change', (e) => {
            const selectedId = e.target.value;
            if (selectedId) {
                this.navigateToDepartmentFromSelect(selectedId);
            }
        });
    }
    navigateToDepartmentFromSelect(departmentId) {
        if(!this.diagramme) return;
        const dept = this.xmlParser.getDepartement(departmentId);
        if (!dept) return;
        this.diagramme.navigateToDepartmentFromSelect(departmentId);
    }    
    updateDepartmentSelect(levelId) {
        const select = document.getElementById('department-select');
        if (levelId === 'root') {
            select.value = '';
            return;
        }
        const option = select.querySelector(`option[value="${levelId}"]`);
        if (option) {
            select.value = levelId;
        } else {
            select.value = '';
        }
    }
}
