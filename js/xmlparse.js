class XMLParser {
    constructor(lng, xml_data, blExternal = false, blEncode = true) {
        this.lng = lng;
        this.xml_data = xml_data;
        this.data = null;
        this.blExternal = blExternal;
        this.blEncode = blEncode;
        this.departements = null;
        this.xmlText = null;
        this.xmlDoc = null;
        this.organisationInfo = {};
        this.documentsMap = new Map();
        this.tasksMap = new Map();
        this.postesMap = new Map();
        this.departementElements = new Map();
        this.loadingPromise = this.loadXML();
    }
    isReadOnly() {
        return Boolean(this.organisationInfo?.readOnly);
    }
    canWrite(options = {}) {
        return Boolean(options.force) || !this.isReadOnly();
    }
    guardWriteAccess(options = {}) {
        if (this.canWrite(options)) {
            return true;
        }
        console.warn('XMLParser write blocked: document is read-only');
        return false;
    }
    async isloadXML() {
        try {
            await this.loadingPromise;
            return this.data != null;
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
            return false;
        }
    }
    async setLang(lng) {
        this.lng = lng;
        this.loadingPromise = this.loadXML();
        return this.loadingPromise;
    }
    async waitForLoad() {
        await this.loadingPromise;
        return this.data;
    }
    migrateOldDocumentFormats() {
        let migratedCount = 0;
        for (let [docId, doc] of this.documentsMap) {
            if (!doc.category) {
                if (doc.type === 'reglementation' || 
                    doc.type_doc === 'externe' || 
                    doc.reglementation) {
                    doc.category = 'regulation';
                } else {
                    doc.category = 'document';
                }
                migratedCount++;
            }
            if (!doc.document_type && doc.type && 
                !['manuel', 'reglementation'].includes(doc.type) &&
                ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'html', 'txt', 'ppt'].some(format => 
                    doc.type.toLowerCase().includes(format))) {
                doc.document_type = doc.type;
                migratedCount++;
            }
        }
        if (migratedCount > 0) {
        }
        return migratedCount;
    }
    async loadXML() {
        try {
            this.departements = new Map();
            this.documentsMap = new Map();
            this.tasksMap = new Map();
            this.postesMap = new Map();
            this.departementElements = new Map();
            if (this.blExternal) {
                const response = await fetch(this.xml_data );
                if (!response.ok) {
                    throw new Error('Erreur lors du chargement du fichier XML externe');
                }
                this.xmlText = await response.text();
                if (this.blEncode) {
                    this.xmlText = this.decodeBase64XML(this.xmlText);
                }
            }
            else {
                if (this.blEncode) {
                    this.xmlText = this.decodeBase64XML(this.xml_data );
                } else {
                    this.xmlText = this.xml_data;
                }
            }
            const parser = new DOMParser();
            this.xmlDoc = parser.parseFromString(this.xmlText, "text/xml");
            this.parseOrganisation(this.xmlDoc);
            this.migrateOldDocumentFormats();
            return this.data;
        }
        catch (error) {
            console.error('Erreur chargement XML:', error);
            return null;
        }
    }
    parseXML(xmlContent) {
        this.departements = new Map();
        this.documentsMap = new Map();
        this.tasksMap = new Map();
        this.postesMap = new Map();
        this.departementElements = new Map();
        this.xmlText = xmlContent;
        const parser = new DOMParser();
        this.xmlDoc = parser.parseFromString(this.xmlText, "text/xml");
        this.parseOrganisation(this.xmlDoc);
        return this.data;
    }
    async loadXMLFromString(xmlString, lng = 'en') {
        this.lng = lng;
        this.xml_data = xmlString;
        this.blExternal = false;
        this.blEncode = false;
        this.loadingPromise = this.loadXML();
        return this.loadingPromise;
    }
    async loadFromFile(content) {
        this.xml_data = content;
        this.blExternal = true;
        this.blEncode = false;
        this.data = null;
        this.departements = null;
        this.xmlText = null;
        this.xmlDoc = null;
        this.loadingPromise = this.loadXML();
        return this.loadingPromise;
    }
    decodeBase64XML(encodedContent) {
        const decodedBytes = atob(encodedContent);
        const text = new TextDecoder().decode(
            new Uint8Array([...decodedBytes].map(c => c.charCodeAt(0)))
        );
        return text;
    }
    encodeBase64XML(xmlString) {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(xmlString);
        let binary = '';
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    parseOrganisation(xmlDoc) {
        const root = xmlDoc.documentElement;
        this.organisationInfo = {
            language: root?.getAttribute('language') || this.lng || 'en',
            dateGeneration: root?.getAttribute('dateGeneration') || '',
            dateUpdate: root?.getAttribute('dateUpdate') || '',
            code: root?.getAttribute('code') || '',
            name: root?.getAttribute('name') || '',
            libelle: root?.getAttribute('libelle') || '',
            Description: root?.getAttribute('Description') || '',
            createur: root?.getAttribute('createur') || '',
            readOnly: ['true', '1', 'yes'].includes((root?.getAttribute('readOnly') || '').toLowerCase()),
            passwordHash: root?.getAttribute('passwordHash') || ''
        };
        this.parseGlobalDocuments(xmlDoc);
        this.parseGlobalTasks(xmlDoc);
        this.parseGlobalPostes(xmlDoc);
        const departementsContainer = xmlDoc.getElementsByTagName('departements')[0];
        if (!departementsContainer) {
            console.warn('Conteneur "departements" non trouvé dans le XML');
            this.data = { nodes: [], links: [] };
            return;
        }
        const departements = Array.from(departementsContainer.children).filter(
            child => child.tagName === 'departement'
        );
        const nodes = [];
        const links = [];
        for (let dept of departements) {
            const id = dept.getAttribute('id');
            const nom = dept.getAttribute('nom');
            const parent = dept.getAttribute('parent');
            const type = dept.getAttribute('type');
            const abbreviation = dept.getAttribute('abbreviation') || '';
            const abbrev_details = dept.getAttribute('abbrev_details') || '';
            const background_color = dept.getAttribute('background_color') || dept.getAttribute('bg_color') || '';
            const description = dept.getElementsByTagName('description')[0]?.textContent || '';
            const responsable = dept.getElementsByTagName('responsable')[0]?.textContent || '';
            const note = dept.getElementsByTagName('note')[0]?.textContent || '';
            const fichiers = this.parseDepartementDocuments(dept);
            const postes = this.parseDepartementPostes(dept);
            const tasks = this.parseDepartementTasks(dept);
            const taskPosteAssociations = this.parseTaskPosteAssociations(dept);
            const posteTaskAssociations = this.parsePosteTaskAssociations(dept);
            const node = {
                id,
                nom,
                parent,
                type,
                abbreviation,
                abbrev_details,
                background_color,
                description,
                responsable,
                note,
                fichiers,
                postes,
                tasks,
                taskPosteAssociations,
                posteTaskAssociations,
                xmlElement: dept 
            };
            nodes.push(node);
            this.departements.set(id, node);
            this.departementElements.set(id, dept); 
            if (parent && parent !== 'null' && parent !== '') {
                links.push({
                    source: parent,
                    target: id
                });
            }
        }
        this.data = { nodes, links };
        this.initializePostesUsageCount();
        this.initializeTasksUsageCount();
        this.initializeDocumentsUsageCount(); 
    }
    getOrganisationInfo() {
        return { ...this.organisationInfo };
    }
    updateOrganisationInfo(updates = {}, options = {}) {
        const root = this.xmlDoc?.documentElement;
        if (!root) {
            return false;
        }
        if (!this.guardWriteAccess({ force: options.force })) {
            return false;
        }
        const nextInfo = {
            ...this.organisationInfo,
            ...updates,
            dateUpdate: updates.dateUpdate || new Date().toISOString(),
            readOnly: Boolean(updates.readOnly ?? this.organisationInfo.readOnly),
            passwordHash: updates.passwordHash ?? this.organisationInfo.passwordHash ?? ''
        };
        if (!nextInfo.readOnly) {
            nextInfo.passwordHash = '';
        }
        const fields = ['language', 'dateGeneration', 'dateUpdate', 'code', 'name', 'libelle', 'Description', 'createur', 'passwordHash'];
        fields.forEach((field) => {
            const value = nextInfo[field] == null ? '' : String(nextInfo[field]);
            if (value) {
                root.setAttribute(field, value);
            } else {
                root.removeAttribute(field);
            }
        });
        root.setAttribute('readOnly', nextInfo.readOnly ? 'true' : 'false');
        this.organisationInfo = nextInfo;
        if (nextInfo.language) {
            this.lng = nextInfo.language;
        }
        return true;
    }
    getDocumentUsageCount(documentId) {
        if (!this.documentsMap.has(documentId)) return 0;
        const documentInfo = this.documentsMap.get(documentId);
        return documentInfo.usageCount || 1;
    }
    addDocumentReferenceToDepartment(sourceDeptId, documentId, targetDeptId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        try {
            const sourceDept = this.getDepartement(sourceDeptId);
            if (!sourceDept) {
                console.error(`Source department ${sourceDeptId} not found`);
                return false;
            }
            const sourceDocument = sourceDept.fichiers?.find(d => d.id === documentId);
            if (!sourceDocument) {
                console.error(`Document ${documentId} not found in source department`);
                return false;
            }
            const targetDept = this.getDepartement(targetDeptId);
            if (!targetDept) {
                console.error(`Target department ${targetDeptId} not found`);
                return false;
            }
            if (targetDept.fichiers?.some(d => d.id === documentId)) {
                console.error(`Document ${documentId} already exists in target department`);
                return false;
            }
            const globalDocument = this.documentsMap.get(documentId);
            if (!globalDocument) {
                console.error(`Document ${documentId} not found in global documents`);
                return false;
            }
            if (!targetDept.fichiers) {
                targetDept.fichiers = [];
            }
            targetDept.fichiers.push(globalDocument);
            if (!globalDocument.usageCount) globalDocument.usageCount = 0;
            globalDocument.usageCount++;
            if (!globalDocument.departments) globalDocument.departments = [];
            if (!globalDocument.departments.includes(targetDeptId)) {
                globalDocument.departments.push(targetDeptId);
            }
            const targetDeptElement = this.departementElements.get(targetDeptId);
            if (targetDeptElement) {
                let depDocumentsElement = targetDeptElement.getElementsByTagName('dep_documents')[0];
                if (!depDocumentsElement) {
                    depDocumentsElement = this.xmlDoc.createElement('dep_documents');
                    targetDeptElement.appendChild(depDocumentsElement);
                }
                const depDocumentElement = this.xmlDoc.createElement('dep_document');
                depDocumentElement.setAttribute('id', documentId);
                depDocumentElement.setAttribute('nom', globalDocument.nom || '');
                if (globalDocument.category) depDocumentElement.setAttribute('category', globalDocument.category);
                if (globalDocument.document_type) depDocumentElement.setAttribute('document_type', globalDocument.document_type);
                if (globalDocument.type) depDocumentElement.setAttribute('type', globalDocument.type);
                if (globalDocument.description) depDocumentElement.setAttribute('description', globalDocument.description);
                if (globalDocument.lien) depDocumentElement.setAttribute('lien', globalDocument.lien);
                if (globalDocument.code) depDocumentElement.setAttribute('code', globalDocument.code);
                if (globalDocument.ref) depDocumentElement.setAttribute('ref', globalDocument.ref);
                if (globalDocument.type_doc) depDocumentElement.setAttribute('type_doc', globalDocument.type_doc);
                if (globalDocument.reglementation) depDocumentElement.setAttribute('reglementation', globalDocument.reglementation);
                if (globalDocument.regle_code) depDocumentElement.setAttribute('regle_code', globalDocument.regle_code);
                if (globalDocument.regle_titre) depDocumentElement.setAttribute('regle_titre', globalDocument.regle_titre);
                if (globalDocument.regle_description) depDocumentElement.setAttribute('regle_description', globalDocument.regle_description);
                if (globalDocument.page_reference) depDocumentElement.setAttribute('page_reference', globalDocument.page_reference);
                for (let key in globalDocument) {
                    if (key.startsWith('key-')) {
                        depDocumentElement.setAttribute(key, globalDocument[key]);
                    }
                }
                depDocumentsElement.appendChild(depDocumentElement);
            }
            this.departements.set(targetDeptId, targetDept);
            const nodeIndex = this.data.nodes.findIndex(n => n.id === targetDeptId);
            if (nodeIndex !== -1) {
                this.data.nodes[nodeIndex] = targetDept;
            }
            return true;
        } catch (error) {
            console.error('Error adding document reference:', error);
            return false;
        }
    }
    parseGlobalDocuments(xmlDoc) {
        const documentElements = xmlDoc.getElementsByTagName('document');
        for (let doc of documentElements) {
            const id = doc.getAttribute('id');
            const documentData = {
                id,
                nom: doc.getAttribute('nom'),
                description: doc.getAttribute('description') || '',
                lien: doc.getAttribute('lien') || '',
                code: doc.getAttribute('code') || '',
                type: doc.getAttribute('type') || '',
                ref: doc.getAttribute('ref') || '',
                type_doc: doc.getAttribute('type_doc') || '',
                category: doc.getAttribute('category') || 'document',
                document_type: doc.getAttribute('document_type') || '',
                reglementation: doc.getAttribute('reglementation') || '',
                regle_code: doc.getAttribute('regle_code') || '',
                regle_titre: doc.getAttribute('regle_titre') || '',
                regle_description: doc.getAttribute('regle_description') || '',
                page_reference: doc.getAttribute('page_reference') || '',
                usageCount: 0,      
                departments: []     
            };
            for (let attr of doc.attributes) {
                if (attr.name.startsWith('key-')) {
                    documentData[attr.name] = attr.value;
                }
            }
            if (documentData.type === 'reglementation') {
                documentData.category = 'regulation';
            }
            if (documentData.type_doc === 'externe') {
                documentData.category = 'regulation';
            }
            this.documentsMap.set(id, documentData);
        }
    }
    parseGlobalTasks(xmlDoc) {
        const taskElements = xmlDoc.getElementsByTagName('task');
        for (let task of taskElements) {
            const id = task.getAttribute('id');
            const taskData = {
                id,
                nom: task.getAttribute('nom'),
                order: task.getAttribute('order') || '',
                categorie: task.getAttribute('categorie') || '',
                description: task.getAttribute('description') || task.textContent || '',
                usageCount: 0,  
                departments: [] 
            };
            for (let attr of task.attributes) {
                if (attr.name.startsWith('key-')) {
                    taskData[attr.name] = attr.value;
                }
            }
            this.tasksMap.set(id, taskData);
        }
    }
    parseGlobalPostes(xmlDoc) {
        const posteElements = xmlDoc.getElementsByTagName('poste');
        for (let poste of posteElements) {
            const id = poste.getAttribute('id');
            const posteData = {
                id,
                nom: poste.getAttribute('nom'),
                abbreviation: poste.getAttribute('abbrev') || poste.getAttribute('abbreviation') || '',
                description: poste.getAttribute('description') || poste.getAttribute('abbrev_desc') || '',
                abbrev_desc: poste.getAttribute('abbrev_desc') || '',
                usageCount: 0,
                departments: [] 
            };
            for (let attr of poste.attributes) {
                if (attr.name.startsWith('key-')) {
                    posteData[attr.name] = attr.value;
                }
            }
            this.postesMap.set(id, posteData);
        }
    }
    parseDepartementDocuments(deptElement) {
        const fichiers = [];
        const depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
        if (depDocumentsElement) {
            const depDocumentElements = depDocumentsElement.getElementsByTagName('dep_document');
            for (let depDoc of depDocumentElements) {
                const docId = depDoc.getAttribute('id');
                if (docId && this.documentsMap.has(docId)) {
                    const relatedDepartments = this.parseDocumentDepartmentLinks(depDoc);
                    fichiers.push({
                        ...this.documentsMap.get(docId),
                        relatedDepartments
                    });
                }
            }
        }
        return fichiers;
    }
    parseDocumentDepartmentLinks(depDocumentElement) {
        const relatedDepartments = [];
        for (const child of Array.from(depDocumentElement.children || [])) {
            if (child.tagName !== 'docdept') continue;
            const departmentId = child.getAttribute('id');
            if (!departmentId) continue;
            relatedDepartments.push({
                departmentId,
                relation: child.getAttribute('relation') || ''
            });
        }
        return relatedDepartments;
    }
    parseDepartementPostes(deptElement) {
        const postes = [];
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (depPostesElement) {
            const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
            for (let depPoste of depPosteElements) {
                const posteId = depPoste.getAttribute('id');
                if (posteId && this.postesMap.has(posteId)) {
                    postes.push(this.postesMap.get(posteId));
                }
            }
        }
        return postes;
    }
    parseDepartementTasks(deptElement) {
        const tasks = [];
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (depTasksElement) {
            const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
            for (let depTask of depTaskElements) {
                const taskId = depTask.getAttribute('id');
                if (taskId && this.tasksMap.has(taskId)) {
                    const relatedDepartments = this.parseTaskDepartmentLinks(depTask);
                    tasks.push({
                        ...this.tasksMap.get(taskId),
                        relatedDepartments
                    });
                }
            }
        }
        return tasks;
    }
    parseTaskDepartmentLinks(depTaskElement) {
        const relatedDepartments = [];
        for (const child of Array.from(depTaskElement.children || [])) {
            if (child.tagName !== 'taskdept') continue;
            const departmentId = child.getAttribute('id');
            if (!departmentId) continue;
            relatedDepartments.push({
                departmentId,
                relation: child.getAttribute('relation') || ''
            });
        }
        return relatedDepartments;
    }
    initializeTasksUsageCount() {
        for (let task of this.tasksMap.values()) {
            task.usageCount = 0;
            task.departments = [];
        }
        for (let dept of this.departements.values()) {
            if (dept.tasks && dept.tasks.length > 0) {
                for (let task of dept.tasks) {
                    const globalTask = this.tasksMap.get(task.id);
                    if (globalTask) {
                        if (!globalTask.usageCount) globalTask.usageCount = 0;
                        if (!globalTask.departments) globalTask.departments = [];
                        globalTask.usageCount++;
                        if (!globalTask.departments.includes(dept.id)) {
                            globalTask.departments.push(dept.id);
                        }
                    }
                }
            }
        }
    }
    initializePostesUsageCount() {
        for (let poste of this.postesMap.values()) {
            poste.usageCount = 0;
            poste.departments = [];
        }
        for (let dept of this.departements.values()) {
            if (dept.postes && dept.postes.length > 0) {
                for (let poste of dept.postes) {
                    const globalPoste = this.postesMap.get(poste.id);
                    if (globalPoste) {
                        if (!globalPoste.usageCount) globalPoste.usageCount = 0;
                        if (!globalPoste.departments) globalPoste.departments = [];
                        globalPoste.usageCount++;
                        if (!globalPoste.departments.includes(dept.id)) {
                            globalPoste.departments.push(dept.id);
                        }
                    }
                }
            }
        }
    }
    initializeDocumentsUsageCount() {
        for (let document of this.documentsMap.values()) {
            document.usageCount = 0;
            document.departments = [];
        }
        for (let dept of this.departements.values()) {
            if (dept.fichiers && dept.fichiers.length > 0) {
                for (let document of dept.fichiers) {
                    const globalDocument = this.documentsMap.get(document.id);
                    if (globalDocument) {
                        if (!globalDocument.usageCount) globalDocument.usageCount = 0;
                        if (!globalDocument.departments) globalDocument.departments = [];
                        globalDocument.usageCount++;
                        if (!globalDocument.departments.includes(dept.id)) {
                            globalDocument.departments.push(dept.id);
                        }
                    }
                }
            }
        }
    }   
    parseTaskPosteAssociations(deptElement) {
        const associations = new Map();
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (depTasksElement) {
            const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
            for (let depTask of depTaskElements) {
                const taskId = depTask.getAttribute('id');
                if (!taskId) continue;
                const posteAssociations = [];
                const taskPosteElements = depTask.getElementsByTagName('taskposte');
                for (let taskPoste of taskPosteElements) {
                    const posteId = taskPoste.getAttribute('id');
                    const description = taskPoste.getAttribute('description') || '';
                    if (posteId) {
                        posteAssociations.push({
                            posteId: posteId,
                            taskId: taskId,
                            description: description
                        });
                    }
                }
                if (posteAssociations.length > 0) {
                    associations.set(taskId, posteAssociations);
                }
            }
        }
        return associations;
    }
    parsePosteTaskAssociations(deptElement) {
        const associations = new Map();
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (depPostesElement) {
            const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
            for (let depPoste of depPosteElements) {
                const posteId = depPoste.getAttribute('id');
                if (!posteId) continue;
                const taskAssociations = [];
                const posteTaskElements = depPoste.getElementsByTagName('postetask');
                for (let posteTask of posteTaskElements) {
                    const taskId = posteTask.getAttribute('id');
                    const description = posteTask.getAttribute('description') || '';
                    if (taskId) {
                        taskAssociations.push({
                            posteId: posteId,
                            taskId: taskId,
                            description: description
                        });
                    }
                }
                if (taskAssociations.length > 0) {
                    associations.set(posteId, taskAssociations);
                }
            }
        }
        return associations;
    }
    getPostsForTask(departmentId, taskId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        const posts = [];
        const normalizeId = (id) => id ? id.trim() : '';
        const sources = [
            () => {
                if (!dept.taskPosteAssociations || !dept.taskPosteAssociations.has(taskId)) 
                    return [];
                const associations = dept.taskPosteAssociations.get(taskId);
                if (!Array.isArray(associations)) return [];
                return associations.map(assoc => {
                    if (typeof assoc === 'string') return assoc;
                    if (typeof assoc === 'object') return assoc.posteId || assoc.id;
                    return null;
                }).filter(id => id);
            },
            () => {
                if (!dept.posteTaskAssociations) return [];
                const result = [];
                for (let [posteId, taskAssocs] of dept.posteTaskAssociations) {
                    const hasTask = taskAssocs.some(assoc => {
                        const assocTaskId = typeof assoc === 'string' ? assoc : (assoc.taskId || assoc.id);
                        return normalizeId(assocTaskId) === normalizeId(taskId);
                    });
                    if (hasTask) result.push(posteId);
                }
                return result;
            }
        ];
        const posteIds = new Set();
        sources.forEach(source => {
            const ids = source();
            ids.forEach(id => posteIds.add(normalizeId(id)));
        });
        for (let posteId of posteIds) {
            let poste = this.postesMap.get(posteId);
            if (!poste && dept.postes) {
                poste = dept.postes.find(p => normalizeId(p.id) === normalizeId(posteId));
            }
            if (poste) {
                posts.push(poste);
            } else {
                console.warn(`Poste with ID "${posteId}" not found for task "${taskId}"`);
            }
        }
        return posts;
    }
    getTasksForPost(departmentId, postId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        const tasks = [];
        const normalizeId = (id) => id ? id.trim() : '';
        const sources = [
            () => {
                if (!dept.posteTaskAssociations || !dept.posteTaskAssociations.has(postId)) 
                    return [];
                const associations = dept.posteTaskAssociations.get(postId);
                if (!Array.isArray(associations)) return [];
                return associations.map(assoc => {
                    if (typeof assoc === 'string') return assoc;
                    if (typeof assoc === 'object') return assoc.taskId || assoc.id;
                    return null;
                }).filter(id => id);
            },
            () => {
                if (!dept.taskPosteAssociations) return [];
                const result = [];
                for (let [taskId, posteAssocs] of dept.taskPosteAssociations) {
                    const hasPoste = posteAssocs.some(assoc => {
                        const assocPosteId = typeof assoc === 'string' ? assoc : (assoc.posteId || assoc.id);
                        return normalizeId(assocPosteId) === normalizeId(postId);
                    });
                    if (hasPoste) result.push(taskId);
                }
                return result;
            }
        ];
        const taskIds = new Set();
        sources.forEach(source => {
            const ids = source();
            ids.forEach(id => taskIds.add(normalizeId(id)));
        });
        for (let taskId of taskIds) {
            let task = this.tasksMap.get(taskId);
            if (!task && dept.tasks) {
                task = dept.tasks.find(t => normalizeId(t.id) === normalizeId(taskId));
            }
            if (task) {
                tasks.push(task);
            } else {
                console.warn(`Task with ID "${taskId}" not found for poste "${postId}"`);
            }
        }
        return tasks;
    } 
    getDocumentsForPost(departmentId, postId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return [];
        const documents = [];
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (depPostesElement) {
            const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
            for (let depPoste of depPosteElements) {
                if (depPoste.getAttribute('id') === postId) {
                    const postedocElements = depPoste.getElementsByTagName('postedoc');
                    for (let postedoc of postedocElements) {
                        const docId = postedoc.getAttribute('id');
                        if (docId && this.documentsMap.has(docId)) {
                            const document = { ...this.documentsMap.get(docId) };
                            const postedocNom = postedoc.getAttribute('nom');
                            const postedocDescription = postedoc.getAttribute('description');
                            const postedocLien = postedoc.getAttribute('lien');
                            const postedocCode = postedoc.getAttribute('code');
                            const postedocType = postedoc.getAttribute('type');
                            const postedocPageReference = postedoc.getAttribute('page_reference');
                            if (postedocNom) document.nom = postedocNom;
                            if (postedocDescription) document.description = postedocDescription;
                            if (postedocLien) document.lien = postedocLien;
                            if (postedocCode) document.code = postedocCode;
                            if (postedocType) document.type = postedocType;
                            if (postedocPageReference) document.page_reference = postedocPageReference;
                            const postedocReglementation = postedoc.getAttribute('reglementation');
                            if (postedocReglementation) {
                                document.reglementation = postedocReglementation;
                                document.regle_code = postedoc.getAttribute('regle_code') || '';
                                document.regle_titre = postedoc.getAttribute('regle_titre') || '';
                                document.regle_description = postedoc.getAttribute('regle_description') || '';
                            }
                            documents.push(document);
                        }
                    }
                }
            }
        }
        return documents;
    }
    getDocumentsForTask(departmentId, taskId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return [];
        const documents = [];
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (depTasksElement) {
            const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
            for (let depTask of depTaskElements) {
                if (depTask.getAttribute('id') === taskId) {
                    const taskdocElements = depTask.getElementsByTagName('taskdoc');
                    for (let taskdoc of taskdocElements) {
                        const docId = taskdoc.getAttribute('id');
                        if (docId && this.documentsMap.has(docId)) {
                            const document = { ...this.documentsMap.get(docId) };
                            const taskdocNom = taskdoc.getAttribute('nom');
                            const taskdocDescription = taskdoc.getAttribute('description');
                            const taskdocLien = taskdoc.getAttribute('lien');
                            const taskdocCode = taskdoc.getAttribute('code');
                            const taskdocType = taskdoc.getAttribute('type');
                            const taskdocPageReference = taskdoc.getAttribute('page_reference');
                            if (taskdocNom) document.nom = taskdocNom;
                            if (taskdocDescription) document.description = taskdocDescription;
                            if (taskdocLien) document.lien = taskdocLien;
                            if (taskdocCode) document.code = taskdocCode;
                            if (taskdocType) document.type = taskdocType;
                            if (taskdocPageReference) document.page_reference = taskdocPageReference;
                            const taskdocReglementation = taskdoc.getAttribute('reglementation');
                            if (taskdocReglementation) {
                                document.reglementation = taskdocReglementation;
                                document.regle_code = taskdoc.getAttribute('regle_code') || '';
                                document.regle_titre = taskdoc.getAttribute('regle_titre') || '';
                                document.regle_description = taskdoc.getAttribute('regle_description') || '';
                            }
                            documents.push(document);
                        }
                    }
                }
            }
        }
        return documents;
    }
    getPostsForDocument(departmentId, documentNameOrId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return [];
        const posts = [];
        const dept = this.departements.get(departmentId);
        if (!dept) return posts;
        const document = dept.fichiers.find(f => f.nom === documentNameOrId || f.id === documentNameOrId);
        if (!document) return posts;
        const documentId = document.id;
        const documentName = document.nom;
        if (dept.postes) {
            for (const poste of dept.postes) {
                const postDocuments = this.getDocumentsForPost(departmentId, poste.id);
                const hasDocument = postDocuments.some(doc => {
                    return (doc.id && doc.id === documentId) || 
                           (doc.nom && (doc.nom === documentName || doc.nom === documentNameOrId)) ||
                           (!doc.id && !doc.nom && documentNameOrId);
                });
                if (hasDocument) {
                    posts.push(poste);
                }
            }
        }
        return posts;
    }
    getTasksForDocument(departmentId, documentNameOrId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return [];
        const tasks = [];
        const dept = this.departements.get(departmentId);
        if (!dept) return tasks;
        const document = dept.fichiers.find(f => f.nom === documentNameOrId || f.id === documentNameOrId);
        if (!document) return tasks;
        const documentId = document.id;
        const documentName = document.nom;
        if (dept.tasks) {
            for (const task of dept.tasks) {
                const taskDocuments = this.getDocumentsForTask(departmentId, task.id);
                const hasDocument = taskDocuments.some(doc => {
                    return (doc.id && doc.id === documentId) || 
                           (doc.nom && (doc.nom === documentName || doc.nom === documentNameOrId)) ||
                           (!doc.id && !doc.nom && documentNameOrId);
                });
                if (hasDocument) {
                    tasks.push(task);
                }
            }
        }
        return tasks;
    }
    getDepartement(id) {
        return this.departements.get(id);
    }
    searchDepartements(term) {
        term = term.toLowerCase();
        return Array.from(this.departements.values()).filter(dept =>
            dept.nom.toLowerCase().includes(term) ||
            (dept.abbreviation && dept.abbreviation.toLowerCase().includes(term)) ||
            (dept.abbrev_details && dept.abbrev_details.toLowerCase().includes(term)) ||
            dept.description.toLowerCase().includes(term) ||
            dept.tasks.some(t =>
                t.nom.toLowerCase().includes(term) ||
                (t.categorie && t.categorie.toLowerCase().includes(term)) ||
                t.description.toLowerCase().includes(term)
            ) ||
            dept.fichiers.some(f =>
                f.nom.toLowerCase().includes(term) ||
                f.description.toLowerCase().includes(term) ||
                (f.code && f.code.toLowerCase().includes(term)) ||
                (f.type && f.type.toLowerCase().includes(term))
            ) ||
            dept.postes.some(p =>
                p.nom.toLowerCase().includes(term) ||
                (p.abbreviation && p.abbreviation.toLowerCase().includes(term)) ||
                p.description.toLowerCase().includes(term)
            )
        );
    }
    getFichiersByKey(keyName, keyValue) {
        const result = [];
        for (let dept of this.departements.values()) {
            for (let fichier of dept.fichiers) {
                if (fichier[keyName] && fichier[keyName].toLowerCase() === keyValue.toLowerCase()) {
                    result.push({
                        departement: dept,
                        fichier: fichier
                    });
                }
            }
        }
        return result;
    }
    getTasksByCategory(category) {
        const result = [];
        for (let dept of this.departements.values()) {
            for (let task of dept.tasks) {
                if (task.categorie && task.categorie.toLowerCase() === category.toLowerCase()) {
                    result.push({
                        departement: dept,
                        task: task
                    });
                }
            }
        }
        return result;
    }
    getAssociatedPostsForTask(departmentId, taskId) {
        return this.getPostsForTask(departmentId, taskId);
    }
    getAssociatedTasksForPost(departmentId, posteId) {
        return this.getTasksForPost(departmentId, posteId);
    }
    getAllDocuments() {
        return Array.from(this.documentsMap.values());
    }
    getAllTasks() {
        return Array.from(this.tasksMap.values());
    }
    getAllPostes() {
        return Array.from(this.postesMap.values());
    }
    getDocumentById(id) {
        return this.documentsMap.get(id);
    }
    getTaskById(id) {
        return this.tasksMap.get(id);
    }
    getPosteById(id) {
        return this.postesMap.get(id);
    }
    getDocuments(departmentId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        return dept.fichiers || [];
    }
    searchDocuments(term) {
        term = term.toLowerCase();
        const results = [];
        for (let dept of this.departements.values()) {
            for (let fichier of dept.fichiers) {
                if (fichier.nom.toLowerCase().includes(term) ||
                    fichier.description.toLowerCase().includes(term) ||
                    (fichier.code && fichier.code.toLowerCase().includes(term))) {
                    results.push({
                        departement: dept,
                        document: fichier
                    });
                }
            }
        }
        return results;
    }
    getDocumentsByType(type) {
        const results = [];
        for (let dept of this.departements.values()) {
            for (let fichier of dept.fichiers) {
                if (fichier.type && fichier.type.toLowerCase() === type.toLowerCase()) {
                    results.push({
                        departement: dept,
                        document: fichier
                    });
                }
            }
        }
        return results;
    }
    getDocumentsWithRegulation() {
        const results = [];
        for (let dept of this.departements.values()) {
            for (let fichier of dept.fichiers) {
                if (fichier.reglementation) {
                    results.push({
                        departement: dept,
                        document: fichier
                    });
                }
            }
        }
        return results;
    }
    updateTask(id, updates) {
        if (!this.guardWriteAccess()) return null;
        const task = this.tasksMap.get(id);
        if (!task) return null;
        Object.entries(updates).forEach(([key, value]) => {
            task[key] = value;
        });
        this.tasksMap.set(id, task);
        return task;
    }
    updatePoste(id, updates) {
        if (!this.guardWriteAccess()) return null;
        const poste = this.postesMap.get(id);
        if (!poste) return null;
        Object.entries(updates).forEach(([key, value]) => {
            poste[key] = value;
        });
        this.postesMap.set(id, poste);
        return poste;
    }
    updateDocument(id, updates) {
        if (!this.guardWriteAccess()) return null;
        const doc = this.documentsMap.get(id);
        if (!doc) return null;
        Object.entries(updates).forEach(([key, value]) => {
            doc[key] = value;
        });
        if (updates.category === 'regulation') {
            doc.type = 'reglementation';
        } else if (updates.category && updates.category !== 'regulation') {
            doc.type = 'manuel';  
        }
        this.documentsMap.set(id, doc);
        return doc;
    }
updateDocumentInAllAssociations(departmentId, documentId, field, value) {
    if (!this.guardWriteAccess()) {
        return false;
    }
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return;
    const fieldsToPropagate = ['nom', 'description', 'lien', 'code', 'ref'];
    if (!fieldsToPropagate.includes(field)) {
        return; 
    }
    const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
    if (depPostesElement) {
        const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
        for (let depPoste of depPosteElements) {
            const postedocElements = depPoste.getElementsByTagName('postedoc');
            for (let postedoc of postedocElements) {
                if (postedoc.getAttribute('id') === documentId) {
                    if (value && value.trim()) {
                        postedoc.setAttribute(field, value.trim());
                    } else {
                        postedoc.removeAttribute(field);
                    }
                }
            }
        }
    }
    const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
    if (depTasksElement) {
        const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
        for (let depTask of depTaskElements) {
            const taskdocElements = depTask.getElementsByTagName('taskdoc');
            for (let taskdoc of taskdocElements) {
                if (taskdoc.getAttribute('id') === documentId) {
                    if (value && value.trim()) {
                        taskdoc.setAttribute(field, value.trim());
                    } else {
                        taskdoc.removeAttribute(field);
                    }
                }
            }
        }
    }
}
updateDocumentField(departmentId, documentId, field, value) {
    if (!this.guardWriteAccess()) {
        return false;
    }
    try {
        if (field === 'category') {
            return this.changeDocumentCategory(departmentId, documentId, value);
        }
        const globalDoc = this.documentsMap.get(documentId);
        if (!globalDoc) {
            console.error(`Document ${documentId} not found in global documents`);
            return false;
        }
        globalDoc[field] = value;
        const dept = this.departements.get(departmentId);
        if (dept && dept.fichiers) {
            const deptDoc = dept.fichiers.find(f => f.id === documentId);
            if (deptDoc) {
                deptDoc[field] = value;
            }
        }
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
            if (depDocumentsElement) {
                const depDocElements = depDocumentsElement.getElementsByTagName('dep_document');
                for (let depDoc of depDocElements) {
                    if (depDoc.getAttribute('id') === documentId) {
                        if (value && value.trim()) {
                            depDoc.setAttribute(field, value.trim());
                        } else {
                            depDoc.removeAttribute(field);
                        }
                        if (field === 'category') {
                            if (value === 'regulation') {
                                depDoc.setAttribute('type', 'reglementation');
                                globalDoc.type = 'reglementation';
                            } else {
                                depDoc.setAttribute('type', 'manuel');
                                globalDoc.type = 'manuel';
                            }
                        }
                        break;
                    }
                }
            }
            this.updateDocumentInAllAssociations(departmentId, documentId, field, value);
        }
        return true;
    } catch (error) {
        console.error('Error updating document field:', error);
        return false;
    }
}
    updateDepartment(id, updates) {
        if (!this.guardWriteAccess()) {
            return null;
        }
        const dept = this.departements.get(id);
        if (!dept) {
            throw new Error(`Department ${id} not found`);
        }
        if (updates.nom !== undefined) dept.nom = updates.nom;
        if (updates.type !== undefined) dept.type = updates.type;
        if (updates.abbreviation !== undefined) dept.abbreviation = updates.abbreviation;
        if (updates.abbrev_details !== undefined) dept.abbrev_details = updates.abbrev_details;
        if (updates.background_color !== undefined) dept.background_color = updates.background_color;
        if (updates.description !== undefined) dept.description = updates.description;
        if (updates.responsable !== undefined) dept.responsable = updates.responsable;
        if (updates.note !== undefined) dept.note = updates.note;
        this.departements.set(id, dept);
        const nodeIndex = this.data.nodes.findIndex(n => n.id === id);
        if (nodeIndex !== -1) {
            this.data.nodes[nodeIndex] = dept;
        }
        return dept;
    }
    addDepartment(parentId, departmentData) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        if (!this.validateDepartment(departmentData)) {
            throw new Error('Invalid department data');
        }
        if (this.departements.has(departmentData.id)) {
            throw new Error(`Department with ID ${departmentData.id} already exists`);
        }
        const newDept = {
            id: departmentData.id,
            nom: departmentData.nom,
            parent: parentId || '',
            type: departmentData.type || 'operational',
            abbreviation: departmentData.abbreviation || '',
            abbrev_details: departmentData.abbrev_details || '',
            background_color: departmentData.background_color || '',
            description: departmentData.description || '',
            responsable: departmentData.responsable || '',
            note: departmentData.note || '',
            fichiers: departmentData.fichiers || [], 
            postes: departmentData.postes || [], 
            tasks: departmentData.tasks || [], 
            taskPosteAssociations: departmentData.taskPosteAssociations || new Map(),
            posteTaskAssociations: departmentData.posteTaskAssociations || new Map(),
            xmlElement: null
        };
        this.departements.set(newDept.id, newDept);
        this.data.nodes.push(newDept);
        if (parentId) {
            this.data.links.push({
                source: parentId,
                target: newDept.id
            });
        }
        return newDept;
    }   
    deleteDepartment(id, deleteChildren = true) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(id);
        if (!dept) {
            throw new Error(`Department ${id} not found`);
        }
        const children = this.data.nodes.filter(n => n.parent === id);
        if (deleteChildren) {
            for (const child of children) {
                this.deleteDepartment(child.id, true);
            }
        } else {
            const newParent = dept.parent || '';
            for (const child of children) {
                child.parent = newParent;
                this.departements.set(child.id, child);
                const linkIndex = this.data.links.findIndex(l => l.target === child.id);
                if (linkIndex !== -1) {
                    this.data.links[linkIndex].source = newParent;
                }
            }
        }
        this.departements.delete(id);
        const nodeIndex = this.data.nodes.findIndex(n => n.id === id);
        if (nodeIndex !== -1) {
            this.data.nodes.splice(nodeIndex, 1);
        }
        this.data.links = this.data.links.filter(l => l.source !== id && l.target !== id);
        return true;
    }
    validateDepartment(data) {
        if (!data.nom || data.nom.trim() === '') {
            return false;
        }
        if (!data.id || data.id.trim() === '') {
            return false;
        }
        if (!/^[a-z0-9\-]+$/.test(data.id)) {
            return false;
        }
        return true;
    }
    exportToXML() {
        const xmlDoc = document.implementation.createDocument(null, 'organisation');
        const root = xmlDoc.documentElement;
        const organisationInfo = {
            language: this.organisationInfo?.language || this.lng || 'en',
            dateGeneration: this.organisationInfo?.dateGeneration || new Date().toISOString(),
            dateUpdate: this.organisationInfo?.dateUpdate || new Date().toISOString(),
            code: this.organisationInfo?.code || '1.0',
            name: this.organisationInfo?.name || '',
            libelle: this.organisationInfo?.libelle || 'Aeronautical Organizational Structure',
            Description: this.organisationInfo?.Description || `View generated on ${new Date().toISOString().split('T')[0]}`,
            createur: this.organisationInfo?.createur || 'ENAC',
            readOnly: Boolean(this.organisationInfo?.readOnly),
            passwordHash: this.organisationInfo?.passwordHash || ''
        };
        root.setAttribute('language', organisationInfo.language);
        root.setAttribute('dateGeneration', organisationInfo.dateGeneration);
        root.setAttribute('dateUpdate', organisationInfo.dateUpdate);
        root.setAttribute('code', organisationInfo.code);
        if (organisationInfo.name) root.setAttribute('name', organisationInfo.name);
        root.setAttribute('libelle', organisationInfo.libelle);
        root.setAttribute('Description', organisationInfo.Description);
        root.setAttribute('createur', organisationInfo.createur);
        root.setAttribute('readOnly', organisationInfo.readOnly ? 'true' : 'false');
        if (organisationInfo.passwordHash) {
            root.setAttribute('passwordHash', organisationInfo.passwordHash);
        } else {
            root.removeAttribute('passwordHash');
        }
        const processedIds = new Set();
        const addDepartment = (dept, parentElement) => {
            if (processedIds.has(dept.id)) return;
            processedIds.add(dept.id);
            const deptElement = xmlDoc.createElement('departement');
            deptElement.setAttribute('id', dept.id);
            deptElement.setAttribute('parent', dept.parent || '');
            deptElement.setAttribute('nom', dept.nom);
            deptElement.setAttribute('type', dept.type);
            if (dept.abbreviation) {
                deptElement.setAttribute('abbreviation', dept.abbreviation);
            }
            if (dept.abbrev_details) {
                deptElement.setAttribute('abbrev_details', dept.abbrev_details);
            }
            if (dept.background_color) {
                deptElement.setAttribute('background_color', dept.background_color);
            }
            const createCDATA = (name, value) => {
                const el = xmlDoc.createElement(name);
                if (value) {
                    el.appendChild(xmlDoc.createCDATASection(value));
                }
                return el;
            };
            if (dept.description) {
                deptElement.appendChild(createCDATA('description', dept.description));
            }
            if (dept.responsable) {
                deptElement.appendChild(createCDATA('responsable', dept.responsable));
            }
            if (dept.note) {
                deptElement.appendChild(createCDATA('note', dept.note));
            }
            if (dept.postes && dept.postes.length > 0) {
                const postesElement = xmlDoc.createElement('dep_postes');
                for (const poste of dept.postes) {
                    const posteElement = xmlDoc.createElement('dep_poste');
                    posteElement.setAttribute('id', poste.id);
                    const documentsForPoste = this.getDocumentsForPost(dept.id, poste.id);
                    for (const document of documentsForPoste) {
                        const postedocElement = xmlDoc.createElement('postedoc');
                        postedocElement.setAttribute('id', document.id);
                        const pageReference = this.getPageReferenceForPosteDocument(dept.id, poste.id, document.id);
                        if (pageReference) {
                            postedocElement.setAttribute('page_reference', pageReference);
                        }
                        posteElement.appendChild(postedocElement);
                    }
                    const associatedTasks = this.getTasksForPost(dept.id, poste.id);
                    if (associatedTasks.length > 0) {
                        for (const t of associatedTasks) {
                            const postetaskElement = xmlDoc.createElement('postetask');
                            postetaskElement.setAttribute('id', t.id);
                            const associationDescription = this.getAssociationDescription(dept.id, poste.id, t.id);
                            if (associationDescription) {
                                postetaskElement.setAttribute('description', associationDescription);
                            }
                            posteElement.appendChild(postetaskElement);
                        }
                    }
                    postesElement.appendChild(posteElement);
                }
                deptElement.appendChild(postesElement);
            }
            if (dept.tasks && dept.tasks.length > 0) {
                const tasksElement = xmlDoc.createElement('dep_tasks');
                for (const task of dept.tasks) {
                    const taskElement = xmlDoc.createElement('dep_task');
                    taskElement.setAttribute('id', task.id);
                    const documentsForTask = this.getDocumentsForTask(dept.id, task.id);
                    for (const document of documentsForTask) {
                        const taskdocElement = xmlDoc.createElement('taskdoc');
                        taskdocElement.setAttribute('id', document.id);
                        const pageReference = this.getPageReferenceForTaskDocument(dept.id, task.id, document.id);
                        if (pageReference) {
                            taskdocElement.setAttribute('page_reference', pageReference);
                        }
                        taskElement.appendChild(taskdocElement);
                    }
                    const associatedPostes = this.getPostsForTask(dept.id, task.id);
                    if (associatedPostes.length > 0) {
                        for (const p of associatedPostes) {
                            const taskPosteElement = xmlDoc.createElement('taskposte');
                            taskPosteElement.setAttribute('id', p.id);
                            const associationDescription = this.getAssociationDescription(dept.id, task.id, p.id);
                            if (associationDescription) {
                                taskPosteElement.setAttribute('description', associationDescription);
                            }
                            taskElement.appendChild(taskPosteElement);
                        }
                    }
                    if (Array.isArray(task.relatedDepartments) && task.relatedDepartments.length > 0) {
                        for (const relatedDept of task.relatedDepartments) {
                            if (!relatedDept || !relatedDept.departmentId) continue;
                            const taskDeptElement = xmlDoc.createElement('taskdept');
                            taskDeptElement.setAttribute('id', relatedDept.departmentId);
                            if (relatedDept.relation) {
                                taskDeptElement.setAttribute('relation', relatedDept.relation);
                            }
                            taskElement.appendChild(taskDeptElement);
                        }
                    }
                    tasksElement.appendChild(taskElement);
                }
                deptElement.appendChild(tasksElement);
            }
            if (dept.fichiers && dept.fichiers.length > 0) {
                const docsElement = xmlDoc.createElement('dep_documents');
                for (const doc of dept.fichiers) {
                    const docElement = xmlDoc.createElement('dep_document');
                    docElement.setAttribute('id', doc.id);
                    if (doc.page_reference) {
                        docElement.setAttribute('page_reference', doc.page_reference);
                    }
                    if (Array.isArray(doc.relatedDepartments) && doc.relatedDepartments.length > 0) {
                        for (const relatedDept of doc.relatedDepartments) {
                            if (!relatedDept || !relatedDept.departmentId) continue;
                            const docDeptElement = xmlDoc.createElement('docdept');
                            docDeptElement.setAttribute('id', relatedDept.departmentId);
                            if (relatedDept.relation) {
                                docDeptElement.setAttribute('relation', relatedDept.relation);
                            }
                            docElement.appendChild(docDeptElement);
                        }
                    }
                    docsElement.appendChild(docElement);
                }
                deptElement.appendChild(docsElement);
            }
            parentElement.appendChild(deptElement);
        };
        this.addGlobalElementsToXML(xmlDoc, root);
        const departementsElement = xmlDoc.createElement('departements');
        for (const dept of this.data.nodes) {
            addDepartment(dept, departementsElement);
        }
        root.appendChild(departementsElement);
        const serializer = new XMLSerializer();
        let xmlString = serializer.serializeToString(xmlDoc);
        return xmlString;
    }
    addGlobalElementsToXML(xmlDoc, root) {
        const allDocuments = this.getAllDocuments();
        if (allDocuments.length > 0) {
            const documentsElement = xmlDoc.createElement('documents');
            for (const doc of allDocuments) {
                const docElement = xmlDoc.createElement('document');
                docElement.setAttribute('id', doc.id);
                docElement.setAttribute('nom', doc.nom);
                if (doc.category) docElement.setAttribute('category', doc.category);
                if (doc.document_type) docElement.setAttribute('document_type', doc.document_type);
                if (doc.type) docElement.setAttribute('type', doc.type);
                if (doc.description) docElement.setAttribute('description', doc.description);
                if (doc.lien) docElement.setAttribute('lien', doc.lien);
                if (doc.code) docElement.setAttribute('code', doc.code);
                if (doc.ref) docElement.setAttribute('ref', doc.ref);
                if (doc.type_doc) docElement.setAttribute('type_doc', doc.type_doc); 
                if (doc.reglementation) docElement.setAttribute('reglementation', doc.reglementation);
                if (doc.regle_code) docElement.setAttribute('regle_code', doc.regle_code);
                if (doc.regle_titre) docElement.setAttribute('regle_titre', doc.regle_titre);
                if (doc.regle_description) docElement.setAttribute('regle_description', doc.regle_description);
                if (doc.page_reference) docElement.setAttribute('page_reference', doc.page_reference);
                Object.keys(doc).forEach(key => {
                    if (key.startsWith('key-')) {
                        docElement.setAttribute(key, doc[key]);
                    }
                });
                documentsElement.appendChild(docElement);
            }
            root.appendChild(documentsElement);
        }
        const allTasks = this.getAllTasks();
        if (allTasks.length > 0) {
            const tasksElement = xmlDoc.createElement('tasks');
            for (const task of allTasks) {
                const taskElement = xmlDoc.createElement('task');
                taskElement.setAttribute('id', task.id);
                taskElement.setAttribute('nom', task.nom);
                if (task.order) taskElement.setAttribute('order', task.order);
                if (task.categorie) taskElement.setAttribute('categorie', task.categorie);
                if (task.description) taskElement.setAttribute('description', task.description);
                Object.keys(task).forEach(key => {
                    if (key.startsWith('key-')) {
                        taskElement.setAttribute(key, task[key]);
                    }
                });
                tasksElement.appendChild(taskElement);
            }
            root.appendChild(tasksElement);
        }
        const allPostes = this.getAllPostes();
        if (allPostes.length > 0) {
            const postesElement = xmlDoc.createElement('postes');
            for (const poste of allPostes) {
                const posteElement = xmlDoc.createElement('poste');
                posteElement.setAttribute('id', poste.id);
                posteElement.setAttribute('nom', poste.nom);
                if (poste.abbreviation) posteElement.setAttribute('abbrev', poste.abbreviation);
                if (poste.description) posteElement.setAttribute('abbrev_desc', poste.description);
                Object.keys(poste).forEach(key => {
                    if (key.startsWith('key-')) {
                        posteElement.setAttribute(key, poste[key]);
                    }
                });
                postesElement.appendChild(posteElement);
            }
            root.appendChild(postesElement);
        }
    }
addTask(departmentId) {
    if (!this.guardWriteAccess()) {
        return false;
    }
    const dept = this.departements.get(departmentId);
    if (!dept) throw new Error("Department not found");
    const newId = `task-${Date.now()}`;
    const newTask = {
        id: newId,
        nom: "New Task",
        categorie: "",
        description: "",
        order: (dept.tasks ? dept.tasks.length + 1 : 1).toString()
    };
    this.tasksMap.set(newId, newTask);
    if (!dept.tasks) dept.tasks = [];
    dept.tasks.push(newTask);
    if (!dept.taskPosteAssociations) dept.taskPosteAssociations = new Map();
    return newTask;
}
addTaskReferenceToDepartment(sourceDeptId, taskId, targetDeptId) {
    if (!this.guardWriteAccess()) {
        return false;
    }
    try {
        const sourceDept = this.getDepartement(sourceDeptId);
        if (!sourceDept) {
            console.error(`Source department ${sourceDeptId} not found`);
            return false;
        }
        const sourceTask = sourceDept.tasks?.find(t => t.id === taskId);
        if (!sourceTask) {
            console.error(`Task ${taskId} not found in source department`);
            return false;
        }
        const targetDept = this.getDepartement(targetDeptId);
        if (!targetDept) {
            console.error(`Target department ${targetDeptId} not found`);
            return false;
        }
        if (targetDept.tasks?.some(t => t.id === taskId)) {
            console.error(`Task ${taskId} already exists in target department`);
            return false;
        }
        const globalTask = this.tasksMap.get(taskId);
        if (!globalTask) {
            console.error(`Task ${taskId} not found in global tasks`);
            return false;
        }
        if (!targetDept.tasks) {
            targetDept.tasks = [];
        }
        targetDept.tasks.push(globalTask);
        if (!globalTask.usageCount) globalTask.usageCount = 0;
        globalTask.usageCount++;
        if (!globalTask.departments) globalTask.departments = [];
        if (!globalTask.departments.includes(targetDeptId)) {
            globalTask.departments.push(targetDeptId);
        }
        const targetDeptElement = this.departementElements.get(targetDeptId);
        if (targetDeptElement) {
            let depTasksElement = targetDeptElement.getElementsByTagName('dep_tasks')[0];
            if (!depTasksElement) {
                depTasksElement = this.xmlDoc.createElement('dep_tasks');
                targetDeptElement.appendChild(depTasksElement);
            }
            const depTaskElement = this.xmlDoc.createElement('dep_task');
            depTaskElement.setAttribute('id', taskId);
            depTaskElement.setAttribute('nom', globalTask.nom || '');
            depTaskElement.setAttribute('categorie', globalTask.categorie || '');
            depTaskElement.setAttribute('order', globalTask.order || '');
            if (globalTask.description) {
                const descElement = this.xmlDoc.createElement('description');
                descElement.appendChild(this.xmlDoc.createCDATASection(globalTask.description));
                depTaskElement.appendChild(descElement);
            }
            for (let key in globalTask) {
                if (key.startsWith('key-')) {
                    depTaskElement.setAttribute(key, globalTask[key]);
                }
            }
            depTasksElement.appendChild(depTaskElement);
        }
        this.departements.set(targetDeptId, targetDept);
        const nodeIndex = this.data.nodes.findIndex(n => n.id === targetDeptId);
        if (nodeIndex !== -1) {
            this.data.nodes[nodeIndex] = targetDept;
        }
        return true;
    } catch (error) {
        console.error('Error adding task reference:', error);
        return false;
    }
}
getTaskUsageCount(taskId) {
    if (!this.tasksMap.has(taskId)) return 0;
    const taskInfo = this.tasksMap.get(taskId);
    return taskInfo.usageCount || 1;
}
getRelatedDepartmentsForDocument(departmentId, documentId) {
    const dept = this.departements.get(departmentId);
    if (!dept || !Array.isArray(dept.fichiers)) return [];
    const document = dept.fichiers.find(doc => doc.id === documentId);
    if (!document || !Array.isArray(document.relatedDepartments)) return [];
    return document.relatedDepartments.map(link => {
        const relatedDept = this.departements.get(link.departmentId);
        return {
            id: link.departmentId,
            nom: relatedDept?.nom || link.departmentId,
            type: relatedDept?.type || '',
            abbreviation: relatedDept?.abbreviation || '',
            relation: link.relation || ''
        };
    });
}
getAvailableDepartmentsForDocument(departmentId, documentId) {
    const linkedDepartmentIds = new Set(
        this.getRelatedDepartmentsForDocument(departmentId, documentId).map(dept => dept.id)
    );
    return Array.from(this.departements.values()).filter(dept =>
        dept.id &&
        dept.id !== departmentId &&
        !linkedDepartmentIds.has(dept.id)
    );
}
linkDocumentToDepartment(departmentId, documentId, relatedDepartmentId, relation = 'linked') {
    const dept = this.departements.get(departmentId);
    const relatedDept = this.departements.get(relatedDepartmentId);
    if (!dept || !relatedDept || !Array.isArray(dept.fichiers)) return false;
    const document = dept.fichiers.find(doc => doc.id === documentId);
    if (!document) return false;
    if (!Array.isArray(document.relatedDepartments)) {
        document.relatedDepartments = [];
    }
    const existingIndex = document.relatedDepartments.findIndex(link => link.departmentId === relatedDepartmentId);
    const linkData = { departmentId: relatedDepartmentId, relation: relation || '' };
    if (existingIndex >= 0) {
        document.relatedDepartments[existingIndex] = linkData;
    } else {
        document.relatedDepartments.push(linkData);
    }
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return true;
    const depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
    if (!depDocumentsElement) return true;
    const depDocument = Array.from(depDocumentsElement.getElementsByTagName('dep_document'))
        .find(docElement => docElement.getAttribute('id') === documentId);
    if (!depDocument) return true;
    let docDeptElement = Array.from(depDocument.children)
        .find(child => child.tagName === 'docdept' && child.getAttribute('id') === relatedDepartmentId);
    if (!docDeptElement) {
        docDeptElement = this.xmlDoc.createElement('docdept');
        docDeptElement.setAttribute('id', relatedDepartmentId);
        depDocument.appendChild(docDeptElement);
    }
    if (relation) {
        docDeptElement.setAttribute('relation', relation);
    } else {
        docDeptElement.removeAttribute('relation');
    }
    return true;
}
unlinkDocumentFromDepartment(departmentId, documentId, relatedDepartmentId) {
    const dept = this.departements.get(departmentId);
    if (!dept || !Array.isArray(dept.fichiers)) return false;
    const document = dept.fichiers.find(doc => doc.id === documentId);
    if (!document || !Array.isArray(document.relatedDepartments)) return false;
    document.relatedDepartments = document.relatedDepartments.filter(link => link.departmentId !== relatedDepartmentId);
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return true;
    const depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
    if (!depDocumentsElement) return true;
    const depDocument = Array.from(depDocumentsElement.getElementsByTagName('dep_document'))
        .find(docElement => docElement.getAttribute('id') === documentId);
    if (!depDocument) return true;
    const docDeptElement = Array.from(depDocument.children)
        .find(child => child.tagName === 'docdept' && child.getAttribute('id') === relatedDepartmentId);
    if (docDeptElement) {
        depDocument.removeChild(docDeptElement);
    }
    return true;
}
getRelatedDepartmentsForTask(departmentId, taskId) {
    const dept = this.departements.get(departmentId);
    if (!dept || !Array.isArray(dept.tasks)) return [];
    const task = dept.tasks.find(t => t.id === taskId);
    if (!task) return [];
    const relatedDepartmentsMap = new Map();
    if (Array.isArray(task.relatedDepartments)) {
        task.relatedDepartments.forEach((link) => {
            if (!link?.departmentId || link.departmentId === departmentId) return;
            const relatedDept = this.departements.get(link.departmentId);
            relatedDepartmentsMap.set(link.departmentId, {
                id: link.departmentId,
                nom: relatedDept?.nom || link.departmentId,
                type: relatedDept?.type || '',
                abbreviation: relatedDept?.abbreviation || '',
                relation: link.relation || ''
            });
        });
    }
    for (const [otherDeptId, otherDept] of this.departements.entries()) {
        if (otherDeptId === departmentId || !Array.isArray(otherDept?.tasks)) continue;
        const matchingTask = otherDept.tasks.find((candidate) => candidate.id === taskId);
        if (!matchingTask) continue;
        const existing = relatedDepartmentsMap.get(otherDeptId);
        let relation = existing?.relation || '';
        if (!relation && Array.isArray(matchingTask.relatedDepartments)) {
            const reverseLink = matchingTask.relatedDepartments.find((link) => link?.departmentId === departmentId);
            relation = reverseLink?.relation || '';
        }
        relatedDepartmentsMap.set(otherDeptId, {
            id: otherDeptId,
            nom: otherDept?.nom || otherDeptId,
            type: otherDept?.type || '',
            abbreviation: otherDept?.abbreviation || '',
            relation
        });
    }
    return Array.from(relatedDepartmentsMap.values());
}
getAvailableDepartmentsForTask(departmentId, taskId) {
    const linkedDepartmentIds = new Set(
        this.getRelatedDepartmentsForTask(departmentId, taskId).map(dept => dept.id)
    );
    return Array.from(this.departements.values()).filter(dept =>
        dept.id &&
        dept.id !== departmentId &&
        !linkedDepartmentIds.has(dept.id)
    );
}
linkTaskToDepartment(departmentId, taskId, relatedDepartmentId, relation = 'linked') {
    const dept = this.departements.get(departmentId);
    const relatedDept = this.departements.get(relatedDepartmentId);
    if (!dept || !relatedDept || !Array.isArray(dept.tasks)) return false;
    const task = dept.tasks.find(t => t.id === taskId);
    if (!task) return false;
    if (!Array.isArray(task.relatedDepartments)) {
        task.relatedDepartments = [];
    }
    const existingIndex = task.relatedDepartments.findIndex(link => link.departmentId === relatedDepartmentId);
    const linkData = { departmentId: relatedDepartmentId, relation: relation || '' };
    if (existingIndex >= 0) {
        task.relatedDepartments[existingIndex] = linkData;
    } else {
        task.relatedDepartments.push(linkData);
    }
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return true;
    const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
    if (!depTasksElement) return true;
    const depTask = Array.from(depTasksElement.getElementsByTagName('dep_task'))
        .find(taskElement => taskElement.getAttribute('id') === taskId);
    if (!depTask) return true;
    let taskDeptElement = Array.from(depTask.children)
        .find(child => child.tagName === 'taskdept' && child.getAttribute('id') === relatedDepartmentId);
    if (!taskDeptElement) {
        taskDeptElement = this.xmlDoc.createElement('taskdept');
        taskDeptElement.setAttribute('id', relatedDepartmentId);
        depTask.appendChild(taskDeptElement);
    }
    if (relation) {
        taskDeptElement.setAttribute('relation', relation);
    } else {
        taskDeptElement.removeAttribute('relation');
    }
    return true;
}
unlinkTaskFromDepartment(departmentId, taskId, relatedDepartmentId) {
    const dept = this.departements.get(departmentId);
    if (!dept || !Array.isArray(dept.tasks)) return false;
    const task = dept.tasks.find(t => t.id === taskId);
    if (!task || !Array.isArray(task.relatedDepartments)) return false;
    task.relatedDepartments = task.relatedDepartments.filter(link => link.departmentId !== relatedDepartmentId);
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return true;
    const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
    if (!depTasksElement) return true;
    const depTask = Array.from(depTasksElement.getElementsByTagName('dep_task'))
        .find(taskElement => taskElement.getAttribute('id') === taskId);
    if (!depTask) return true;
    const taskDeptElement = Array.from(depTask.children)
        .find(child => child.tagName === 'taskdept' && child.getAttribute('id') === relatedDepartmentId);
    if (taskDeptElement) {
        depTask.removeChild(taskDeptElement);
    }
    return true;
}
    deleteTask(departmentId, taskId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(departmentId);
        if (!dept) return;
        const documents = this.getDocumentsForTask(departmentId, taskId);
        for (const document of documents) {
            this.unlinkDocumentFromTask(departmentId, taskId, document.id);
        }
        const index = dept.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            dept.tasks.splice(index, 1);
        }
        if (dept.taskPosteAssociations) {
            dept.taskPosteAssociations.delete(taskId);
        }
        if (dept.posteTaskAssociations) {
            for (let [posteId, tasks] of dept.posteTaskAssociations) {
                const taskIndex = tasks.indexOf(taskId);
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1);
                }
            }
        }
        if (this.tasksMap.has(taskId)) {
            const taskInfo = this.tasksMap.get(taskId);
            if (taskInfo.usageCount) {
                taskInfo.usageCount = Math.max(0, taskInfo.usageCount - 1);
            }
            if (taskInfo.departments) {
                const deptIndex = taskInfo.departments.indexOf(departmentId);
                if (deptIndex !== -1) {
                    taskInfo.departments.splice(deptIndex, 1);
                }
            }
            if (taskInfo.usageCount <= 0) {
                this.tasksMap.delete(taskId);
            }
        }
    }
    addPoste(departmentId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(departmentId);
        if (!dept) throw new Error("Department not found");
        const newId = `poste-${Date.now()}`;
        const newPoste = {
            id: newId,
            nom: "New Position",
            abbreviation: "",
            description: "",
            usageCount: 1,  
            departments: [departmentId]  
        };
        this.postesMap.set(newId, newPoste);
        if (!dept.postes) dept.postes = [];
        dept.postes.push(newPoste);
        if (!dept.posteTaskAssociations) dept.posteTaskAssociations = new Map();
        return newPoste;
    }
    getPosteUsageCount(posteId) {
        if (!this.postesMap.has(posteId)) return 0;
        const posteInfo = this.postesMap.get(posteId);
        return posteInfo.usageCount || 1;
    }
    deletePoste(departmentId, posteId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(departmentId);
        if (!dept) return;
        const documents = this.getDocumentsForPost(departmentId, posteId);
        for (const document of documents) {
            this.unlinkDocumentFromPoste(departmentId, posteId, document.id);
        }
        const index = dept.postes.findIndex(p => p.id === posteId);
        if (index !== -1) {
            dept.postes.splice(index, 1);
        }
        if (dept.posteTaskAssociations) {
            dept.posteTaskAssociations.delete(posteId);
        }
        if (dept.taskPosteAssociations) {
            for (let [taskId, postes] of dept.taskPosteAssociations) {
                const posteIndex = postes.indexOf(posteId);
                if (posteIndex !== -1) {
                    postes.splice(posteIndex, 1);
                }
            }
        }
        if (this.postesMap.has(posteId)) {
            const posteInfo = this.postesMap.get(posteId);
            if (posteInfo.usageCount) {
                posteInfo.usageCount = Math.max(0, posteInfo.usageCount - 1);
            }
            if (posteInfo.departments) {
                const deptIndex = posteInfo.departments.indexOf(departmentId);
                if (deptIndex !== -1) {
                    posteInfo.departments.splice(deptIndex, 1);
                }
            }
            if (posteInfo.usageCount <= 0) {
                this.postesMap.delete(posteId);
            }
        }
        if (window.editModeManager && window.editModeManager.isEditMode) {
            window.editModeManager.triggerAutoSave();
        }
    }
    changeDocumentCategory(departmentId, documentId, newCategory) {
        const globalDoc = this.documentsMap.get(documentId);
        if (!globalDoc) return false;
        const oldCategory = globalDoc.category || 'document';
        globalDoc.category = newCategory;
        if (newCategory === 'regulation') {
            globalDoc.type = 'reglementation';
            if (!globalDoc.reglementation) globalDoc.reglementation = "New Regulation";
            if (!globalDoc.regle_code) globalDoc.regle_code = "";
            if (!globalDoc.regle_titre) globalDoc.regle_titre = "";
            if (!globalDoc.regle_description) globalDoc.regle_description = "";
        } else {
            globalDoc.type = 'manuel';
            delete globalDoc.reglementation;
            delete globalDoc.regle_code;
            delete globalDoc.regle_titre;
            delete globalDoc.regle_description;
        }
        const dept = this.departements.get(departmentId);
        if (dept && dept.fichiers) {
            const deptDoc = dept.fichiers.find(f => f.id === documentId);
            if (deptDoc) {
                deptDoc.category = newCategory;
                deptDoc.type = globalDoc.type;
                if (newCategory === 'regulation') {
                    deptDoc.reglementation = globalDoc.reglementation;
                    deptDoc.regle_code = globalDoc.regle_code;
                    deptDoc.regle_titre = globalDoc.regle_titre;
                    deptDoc.regle_description = globalDoc.regle_description;
                } else {
                    delete deptDoc.reglementation;
                    delete deptDoc.regle_code;
                    delete deptDoc.regle_titre;
                    delete deptDoc.regle_description;
                }
            }
        }
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
            if (depDocumentsElement) {
                const depDocElements = depDocumentsElement.getElementsByTagName('dep_document');
                for (let depDoc of depDocElements) {
                    if (depDoc.getAttribute('id') === documentId) {
                        depDoc.setAttribute('category', newCategory);
                        depDoc.setAttribute('type', globalDoc.type);
                        if (newCategory === 'regulation') {
                            depDoc.setAttribute('reglementation', globalDoc.reglementation || "New Regulation");
                            if (globalDoc.regle_code) depDoc.setAttribute('regle_code', globalDoc.regle_code);
                            if (globalDoc.regle_titre) depDoc.setAttribute('regle_titre', globalDoc.regle_titre);
                            if (globalDoc.regle_description) depDoc.setAttribute('regle_description', globalDoc.regle_description);
                        } else {
                            depDoc.removeAttribute('reglementation');
                            depDoc.removeAttribute('regle_code');
                            depDoc.removeAttribute('regle_titre');
                            depDoc.removeAttribute('regle_description');
                        }
                        break;
                    }
                }
            }
        }
        return true;
    }
    addDocument(departmentId, category = 'document') {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(departmentId);
        if (!dept) throw new Error("Department not found");
        const newId = `doc-${Date.now()}`;
        const categoryNames = {
            document: "New Document",
            regulation: "New Regulation",
            procedure: "New Procedure",
            template: "New Template",
            form: "New Form"
        };
        const newDoc = {
            id: newId,
            nom: categoryNames[category] || "New Document",
            category: category,
            document_type: "",
            description: "",
            code: "",
            ref: "",
            lien: "",
            page_reference: "",
            usageCount: 1,           
            departments: [departmentId] 
        };
        if (category === 'regulation') {
            newDoc.type = 'reglementation';
            newDoc.reglementation = "New Regulation";
            newDoc.regle_code = "";
            newDoc.regle_titre = "";
            newDoc.regle_description = "";
        } else {
            newDoc.type = 'manuel';
        }
        this.documentsMap.set(newId, newDoc);
        if (!dept.fichiers) dept.fichiers = [];
        dept.fichiers.push(newDoc);
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            let depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
            if (!depDocumentsElement) {
                depDocumentsElement = this.xmlDoc.createElement('dep_documents');
                deptElement.appendChild(depDocumentsElement);
            }
            const depDocElement = this.xmlDoc.createElement('dep_document');
            depDocElement.setAttribute('id', newId);
            depDocElement.setAttribute('nom', newDoc.nom);
            depDocElement.setAttribute('category', newDoc.category);
            if (newDoc.type) depDocElement.setAttribute('type', newDoc.type);
            if (newDoc.document_type) depDocElement.setAttribute('document_type', newDoc.document_type);
            if (newDoc.description) depDocElement.setAttribute('description', newDoc.description);
            if (newDoc.code) depDocElement.setAttribute('code', newDoc.code);
            if (newDoc.ref) depDocElement.setAttribute('ref', newDoc.ref);
            if (newDoc.lien) depDocElement.setAttribute('lien', newDoc.lien);
            if (newDoc.page_reference) depDocElement.setAttribute('page_reference', newDoc.page_reference);
            if (category === 'regulation') {
                depDocElement.setAttribute('reglementation', newDoc.reglementation);
                if (newDoc.regle_code) depDocElement.setAttribute('regle_code', newDoc.regle_code);
                if (newDoc.regle_titre) depDocElement.setAttribute('regle_titre', newDoc.regle_titre);
                if (newDoc.regle_description) depDocElement.setAttribute('regle_description', newDoc.regle_description);
            }
            depDocumentsElement.appendChild(depDocElement);
        }
        return newDoc;
    }
    addTask(departmentId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(departmentId);
        if (!dept) throw new Error("Department not found");
        const newId = `task-${Date.now()}`;
        const newTask = {
                        id: newId,
                        nom: "New Task",
                        categorie: "",
                        description: "",
                        order: (dept.tasks ? dept.tasks.length + 1 : 1).toString(),
                        usageCount: 1,         
                        departments: [departmentId]  
                        };
        this.tasksMap.set(newId, newTask);
        if (!dept.tasks) dept.tasks = [];
        dept.tasks.push(newTask);
        if (!dept.taskPosteAssociations) dept.taskPosteAssociations = new Map();
        return newTask;
    }
    deleteDocument(departmentId, docId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.departements.get(departmentId);
        if (!dept || !dept.fichiers) return;
        if (dept.postes) {
            for (const poste of dept.postes) {
                this.unlinkDocumentFromPoste(departmentId, poste.id, docId);
            }
        }
        if (dept.tasks) {
            for (const task of dept.tasks) {
                this.unlinkDocumentFromTask(departmentId, task.id, docId);
            }
        }
        const index = dept.fichiers.findIndex(f => f.id === docId);
        if (index !== -1) {
            dept.fichiers.splice(index, 1);
        }
        if (this.documentsMap.has(docId)) {
            const docInfo = this.documentsMap.get(docId);
            if (docInfo.usageCount) {
                docInfo.usageCount = Math.max(0, docInfo.usageCount - 1);
            }
            if (docInfo.departments) {
                const deptIndex = docInfo.departments.indexOf(departmentId);
                if (deptIndex !== -1) {
                    docInfo.departments.splice(deptIndex, 1);
                }
            }
            if (docInfo.usageCount <= 0) {
                this.documentsMap.delete(docId);
            }
        }
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depDocumentsElement = deptElement.getElementsByTagName('dep_documents')[0];
            if (depDocumentsElement) {
                const depDocElements = depDocumentsElement.getElementsByTagName('dep_document');
                for (let i = 0; i < depDocElements.length; i++) {
                    const depDocElement = depDocElements[i];
                    if (depDocElement.getAttribute('id') === docId) {
                        depDocumentsElement.removeChild(depDocElement);
                        break;
                    }
                }
                if (depDocumentsElement.getElementsByTagName('dep_document').length === 0) {
                    deptElement.removeChild(depDocumentsElement);
                }
            }
        }
    }
    linkPosteToTask(departmentId, posteId, taskId, description = '') {
        const dept = this.departements.get(departmentId);
        if (!dept) return false;
        if (!dept.taskPosteAssociations) dept.taskPosteAssociations = new Map();
        if (!dept.posteTaskAssociations) dept.posteTaskAssociations = new Map();
        const associationData = {
            posteId: posteId,
            taskId: taskId,
            description: description
        };
        if (!dept.taskPosteAssociations.has(taskId)) {
            dept.taskPosteAssociations.set(taskId, []);
        }
        let taskPostes = dept.taskPosteAssociations.get(taskId);
        const existingIndex = taskPostes.findIndex(a => a.posteId === posteId);
        if (existingIndex !== -1) {
            taskPostes[existingIndex] = associationData;
        } else {
            taskPostes.push(associationData);
        }
        if (!dept.posteTaskAssociations.has(posteId)) {
            dept.posteTaskAssociations.set(posteId, []);
        }
        let posteTasks = dept.posteTaskAssociations.get(posteId);
        const existingIndex2 = posteTasks.findIndex(a => a.taskId === taskId);
        if (existingIndex2 !== -1) {
            posteTasks[existingIndex2] = associationData;
        } else {
            posteTasks.push(associationData);
        }
        this.updatePosteTaskAssociationInXML(departmentId, posteId, taskId, description);
        return true;
    }
    updatePosteTaskAssociationInXML(departmentId, posteId, taskId, description = '') {
        if (!this.guardWriteAccess()) return false;
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return false;
        let updated = false;
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (depTasksElement) {
            const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
            for (let depTask of depTaskElements) {
                if (depTask.getAttribute('id') === taskId) {
                    const taskposteElements = depTask.getElementsByTagName('taskposte');
                    let found = false;
                    for (let taskposte of taskposteElements) {
                        if (taskposte.getAttribute('id') === posteId) {
                            if (description) {
                                taskposte.setAttribute('description', description);
                            } else {
                                taskposte.removeAttribute('description');
                            }
                            found = true;
                            updated = true;
                            break;
                        }
                    }
                    if (!found) {
                        const taskposteElement = this.xmlDoc.createElement('taskposte');
                        taskposteElement.setAttribute('id', posteId);
                        if (description) {
                            taskposteElement.setAttribute('description', description);
                        }
                        depTask.appendChild(taskposteElement);
                        updated = true;
                    }
                    break;
                }
            }
        }
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (depPostesElement) {
            const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
            for (let depPoste of depPosteElements) {
                if (depPoste.getAttribute('id') === posteId) {
                    const postetaskElements = depPoste.getElementsByTagName('postetask');
                    let found = false;
                    for (let postetask of postetaskElements) {
                        if (postetask.getAttribute('id') === taskId) {
                            if (description) {
                                postetask.setAttribute('description', description);
                            } else {
                                postetask.removeAttribute('description');
                            }
                            found = true;
                            updated = true;
                            break;
                        }
                    }
                    if (!found) {
                        const postetaskElement = this.xmlDoc.createElement('postetask');
                        postetaskElement.setAttribute('id', taskId);
                        if (description) {
                            postetaskElement.setAttribute('description', description);
                        }
                        depPoste.appendChild(postetaskElement);
                        updated = true;
                    }
                    break;
                }
            }
        }
        return updated;
    }
    unlinkPosteFromTask(departmentId, posteId, taskId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return false;
        if (dept.taskPosteAssociations && dept.taskPosteAssociations.has(taskId)) {
            const associations = dept.taskPosteAssociations.get(taskId);
            const idx = associations.findIndex(a => a.posteId === posteId);
            if (idx !== -1) {
                associations.splice(idx, 1);
                if (associations.length === 0) {
                    dept.taskPosteAssociations.delete(taskId);
                }
            }
        }
        if (dept.posteTaskAssociations && dept.posteTaskAssociations.has(posteId)) {
            const associations = dept.posteTaskAssociations.get(posteId);
            const idx = associations.findIndex(a => a.taskId === taskId);
            if (idx !== -1) {
                associations.splice(idx, 1);
                if (associations.length === 0) {
                    dept.posteTaskAssociations.delete(posteId);
                }
            }
        }
        this.removePosteTaskAssociationFromXML(departmentId, posteId, taskId);
        return true;
    }
    getPosteTaskAssociationDescription(departmentId, posteId, taskId) {
        const dept = this.departements.get(departmentId);
        if (dept && dept.taskPosteAssociations && dept.taskPosteAssociations.has(taskId)) {
            const associations = dept.taskPosteAssociations.get(taskId);
            const association = associations.find(a => a.posteId === posteId);
            if (association) {
                return association.description || '';
            }
        }
        if (dept && dept.posteTaskAssociations && dept.posteTaskAssociations.has(posteId)) {
            const associations = dept.posteTaskAssociations.get(posteId);
            const association = associations.find(a => a.taskId === taskId);
            if (association) {
                return association.description || '';
            }
        }
        return this.getPosteTaskDescriptionFromXML(departmentId, posteId, taskId);
    }
    getAssociationDescription(departmentId, entity1Id, entity2Id) {
        const dept = this.departements.get(departmentId);
        if (!dept) return '';
        if (dept.taskPosteAssociations && dept.taskPosteAssociations.has(entity1Id)) {
            const associations = dept.taskPosteAssociations.get(entity1Id);
            const association = associations.find(a => a.posteId === entity2Id);
            if (association && association.description) {
                return association.description;
            }
        }
        if (dept.posteTaskAssociations && dept.posteTaskAssociations.has(entity1Id)) {
            const associations = dept.posteTaskAssociations.get(entity1Id);
            const association = associations.find(a => a.taskId === entity2Id);
            if (association && association.description) {
                return association.description;
            }
        }
        if (dept.taskPosteAssociations && dept.taskPosteAssociations.has(entity2Id)) {
            const associations = dept.taskPosteAssociations.get(entity2Id);
            const association = associations.find(a => a.posteId === entity1Id);
            if (association && association.description) {
                return association.description;
            }
        }
        if (dept.posteTaskAssociations && dept.posteTaskAssociations.has(entity2Id)) {
            const associations = dept.posteTaskAssociations.get(entity2Id);
            const association = associations.find(a => a.taskId === entity1Id);
            if (association && association.description) {
                return association.description;
            }
        }
        return '';
    }
    getPosteTaskDescriptionFromXML(departmentId, posteId, taskId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return '';
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (depTasksElement) {
            const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
            for (let depTask of depTaskElements) {
                if (depTask.getAttribute('id') === taskId) {
                    const taskposteElements = depTask.getElementsByTagName('taskposte');
                    for (let taskposte of taskposteElements) {
                        if (taskposte.getAttribute('id') === posteId) {
                            return taskposte.getAttribute('description') || '';
                        }
                    }
                    break;
                }
            }
        }
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (depPostesElement) {
            const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
            for (let depPoste of depPosteElements) {
                if (depPoste.getAttribute('id') === posteId) {
                    const postetaskElements = depPoste.getElementsByTagName('postetask');
                    for (let postetask of postetaskElements) {
                        if (postetask.getAttribute('id') === taskId) {
                            return postetask.getAttribute('description') || '';
                        }
                    }
                    break;
                }
            }
        }
        return '';
    }
    getPostsForTaskWithDescription(departmentId, taskId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        const postsWithDescription = [];
        const taskPosteAssociations = dept.taskPosteAssociations;
        if (taskPosteAssociations && taskPosteAssociations.has(taskId)) {
            const associations = taskPosteAssociations.get(taskId);
            for (let association of associations) {
                const poste = this.postesMap.get(association.posteId);
                if (poste) {
                    postsWithDescription.push({
                        ...poste,
                        associationDescription: association.description || ''
                    });
                }
            }
        }
        return postsWithDescription;
    }
    getTasksForPostWithDescription(departmentId, postId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        const tasksWithDescription = [];
        const posteTaskAssociations = dept.posteTaskAssociations;
        if (posteTaskAssociations && posteTaskAssociations.has(postId)) {
            const associations = posteTaskAssociations.get(postId);
            for (let association of associations) {
                const task = this.tasksMap.get(association.taskId);
                if (task) {
                    tasksWithDescription.push({
                        ...task,
                        associationDescription: association.description || ''
                    });
                }
            }
        }
        return tasksWithDescription;
    }
    removePosteTaskAssociationFromXML(departmentId, posteId, taskId) {
        if (!this.guardWriteAccess()) return false;
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return false;
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (depTasksElement) {
            const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
            for (let depTask of depTaskElements) {
                if (depTask.getAttribute('id') === taskId) {
                    const taskposteElements = depTask.getElementsByTagName('taskposte');
                    for (let taskposte of taskposteElements) {
                        if (taskposte.getAttribute('id') === posteId) {
                            depTask.removeChild(taskposte);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (depPostesElement) {
            const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
            for (let depPoste of depPosteElements) {
                if (depPoste.getAttribute('id') === posteId) {
                    const postetaskElements = depPoste.getElementsByTagName('postetask');
                    for (let postetask of postetaskElements) {
                        if (postetask.getAttribute('id') === taskId) {
                            depPoste.removeChild(postetask);
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return true;
    }
    linkDocumentToPosteOriginal(departmentId, posteId, documentId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return false;
        const document = this.documentsMap.get(documentId);
        if (!document) return false;
        const posteExists = dept.postes && dept.postes.some(p => p.id === posteId);
        if (!posteExists) {
            const globalPoste = this.postesMap.get(posteId);
            if (!globalPoste) return false;
            if (!dept.postes) dept.postes = [];
            dept.postes.push(globalPoste);
            if (!globalPoste.usageCount) globalPoste.usageCount = 0;
            globalPoste.usageCount++;
            if (!globalPoste.departments) globalPoste.departments = [];
            if (!globalPoste.departments.includes(departmentId)) {
                globalPoste.departments.push(departmentId);
            }
        }
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
            if (depPostesElement) {
                const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
                for (let depPoste of depPosteElements) {
                    if (depPoste.getAttribute('id') === posteId) {
                        const existingPostedoc = depPoste.getElementsByTagName('postedoc');
                        let alreadyLinked = false;
                        for (let doc of existingPostedoc) {
                            if (doc.getAttribute('id') === documentId) {
                                alreadyLinked = true;
                                break;
                            }
                        }
                        if (!alreadyLinked) {
                            const postedocElement = this.xmlDoc.createElement('postedoc');
                            postedocElement.setAttribute('id', documentId);
                            postedocElement.setAttribute('nom', document.nom);
                            if (document.type) postedocElement.setAttribute('type', document.type);
                            if (document.description) postedocElement.setAttribute('description', document.description);
                            if (document.lien) postedocElement.setAttribute('lien', document.lien);
                            if (document.code) postedocElement.setAttribute('code', document.code);
                            if (document.reglementation) postedocElement.setAttribute('reglementation', document.reglementation);
                            depPoste.appendChild(postedocElement);
                            if (!dept.fichiers.some(f => f.id === documentId)) {
                                dept.fichiers.push(document);
                            }
                            return true;
                        }
                        break;
                    }
                }
            }
        }
        return false;
    }
    unlinkDocumentFromPoste(departmentId, posteId, documentId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return false;
        let success = false;
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
            if (depPostesElement) {
                const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
                for (let depPoste of depPosteElements) {
                    if (depPoste.getAttribute('id') === posteId) {
                        const postedocElements = depPoste.getElementsByTagName('postedoc');
                        for (let postedoc of postedocElements) {
                            if (postedoc.getAttribute('id') === documentId) {
                                depPoste.removeChild(postedoc);
                                success = true;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            if (success) {
                if (dept.fichiers) {
                    for (let fichier of dept.fichiers) {
                        if (fichier.id === documentId) {
                            if (fichier.page_references) {
                                fichier.page_references.delete(posteId);
                                if (fichier.page_references.size === 0) {
                                    delete fichier.page_references;
                                    delete fichier.page_reference;
                                }
                            }
                            break;
                        }
                    }
                }
                const usedElsewhere = this.isDocumentUsedByOtherPostes(departmentId, posteId, documentId);
                const usedByTasks = this.isDocumentUsedByTasks(departmentId, documentId);
                if (!usedElsewhere && !usedByTasks && dept.fichiers) {
                    const index = dept.fichiers.findIndex(f => f.id === documentId);
                    if (index !== -1) {
                        dept.fichiers.splice(index, 1);
                    }
                }
                const stillUsedGlobally = this.isDocumentUsedGlobally(documentId);
                if (!stillUsedGlobally) {
                    this.documentsMap.delete(documentId);
                }
            }
        }
        return success;
    }
    isDocumentUsedByTasks(departmentId, documentId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return false;
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (!depTasksElement) return false;
        const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
        for (let depTask of depTaskElements) {
            const taskdocElements = depTask.getElementsByTagName('taskdoc');
            for (let taskdoc of taskdocElements) {
                if (taskdoc.getAttribute('id') === documentId) {
                    return true;
                }
            }
        }
        return false;
    }
    isDocumentUsedGlobally(documentId) {
        for (let dept of this.departements.values()) {
            if (dept.fichiers && dept.fichiers.some(f => f.id === documentId)) {
                return true;
            }
        }
        return false;
    }
    isDocumentUsedByOtherPostes(departmentId, excludePosteId, documentId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return false;
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (!depPostesElement) return false;
        const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
        for (let depPoste of depPosteElements) {
            const currentPosteId = depPoste.getAttribute('id');
            if (currentPosteId !== excludePosteId) {
                const postedocElements = depPoste.getElementsByTagName('postedoc');
                for (let postedoc of postedocElements) {
                    if (postedoc.getAttribute('id') === documentId) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    getAvailableDocumentsForPoste(departmentId, posteId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        const allDepartmentDocuments = dept.fichiers || [];
        const linkedDocuments = this.getDocumentsForPost(departmentId, posteId);
        const linkedDocumentIds = linkedDocuments.map(doc => doc.id);
        return allDepartmentDocuments.filter(doc => !linkedDocumentIds.includes(doc.id));
    }
    getAvailableDocumentsForTask(departmentId, taskId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return [];
        const allDepartmentDocuments = dept.fichiers || [];
        const linkedDocuments = this.getDocumentsForTask(departmentId, taskId);
        const linkedDocumentIds = linkedDocuments.map(doc => doc.id);
        return allDepartmentDocuments.filter(doc => !linkedDocumentIds.includes(doc.id));
    }
    linkDocumentToTaskOriginal(departmentId, taskId, documentId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return false;
        const document = this.documentsMap.get(documentId);
        if (!document) return false;
        const taskExists = dept.tasks && dept.tasks.some(t => t.id === taskId);
        if (!taskExists) return false;
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
            if (depTasksElement) {
                const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
                for (let depTask of depTaskElements) {
                    if (depTask.getAttribute('id') === taskId) {
                        const existingTaskdoc = depTask.getElementsByTagName('taskdoc');
                        for (let doc of existingTaskdoc) {
                            if (doc.getAttribute('id') === documentId) {
                                return false; 
                            }
                        }
                        const taskdocElement = this.xmlDoc.createElement('taskdoc');
                        taskdocElement.setAttribute('id', documentId);
                        taskdocElement.setAttribute('nom', document.nom);
                        if (document.type) taskdocElement.setAttribute('type', document.type);
                        if (document.description) taskdocElement.setAttribute('description', document.description);
                        if (document.lien) taskdocElement.setAttribute('lien', document.lien);
                        if (document.code) taskdocElement.setAttribute('code', document.code);
                        if (document.reglementation) taskdocElement.setAttribute('reglementation', document.reglementation);
                        if (document.page_reference) taskdocElement.setAttribute('page_reference', document.page_reference);
                        depTask.appendChild(taskdocElement);
                        if (!dept.fichiers.some(f => f.id === documentId)) {
                            dept.fichiers.push(document);
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }
    unlinkDocumentFromTask(departmentId, taskId, documentId) {
        const dept = this.departements.get(departmentId);
        if (!dept) return false;
        let success = false;
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
            if (depTasksElement) {
                const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
                for (let depTask of depTaskElements) {
                    if (depTask.getAttribute('id') === taskId) {
                        const taskdocElements = depTask.getElementsByTagName('taskdoc');
                        for (let taskdoc of taskdocElements) {
                            if (taskdoc.getAttribute('id') === documentId) {
                                depTask.removeChild(taskdoc);
                                success = true;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            if (success) {
                if (dept.fichiers) {
                    for (let fichier of dept.fichiers) {
                        if (fichier.id === documentId) {
                            if (fichier.page_references) {
                                const taskKey = `task:${taskId}`;
                                fichier.page_references.delete(taskKey);
                                for (let key of fichier.page_references.keys()) {
                                    if (key === taskId || key.endsWith(`:${taskId}`)) {
                                        fichier.page_references.delete(key);
                                    }
                                }
                                if (fichier.page_references.size === 0) {
                                    delete fichier.page_references;
                                    delete fichier.page_reference;
                                }
                            }
                            break;
                        }
                    }
                }
                const usedElsewhere = this.isDocumentUsedByOtherTasks(departmentId, taskId, documentId);
                const usedByPostes = this.isDocumentUsedByPostes(departmentId, documentId);
                if (!usedElsewhere && !usedByPostes && dept.fichiers) {
                    const index = dept.fichiers.findIndex(f => f.id === documentId);
                    if (index !== -1) {
                        dept.fichiers.splice(index, 1);
                    }
                }
                const stillUsedGlobally = this.isDocumentUsedGlobally(documentId);
                if (!stillUsedGlobally) {
                    this.documentsMap.delete(documentId);
                }
            }
        }
        return success;
    }
    isDocumentUsedByPostes(departmentId, documentId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return false;
        const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
        if (!depPostesElement) return false;
        const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
        for (let depPoste of depPosteElements) {
            const postedocElements = depPoste.getElementsByTagName('postedoc');
            for (let postedoc of postedocElements) {
                if (postedoc.getAttribute('id') === documentId) {
                    return true;
                }
            }
        }
        return false;
    }
getPageReferenceForPosteDocument(departmentId, posteId, documentId) {
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return null;
    const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
    if (!depPostesElement) return null;
    const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
    for (let depPoste of depPosteElements) {
        if (depPoste.getAttribute('id') === posteId) {
            const postedocElements = depPoste.getElementsByTagName('postedoc');
            for (let postedoc of postedocElements) {
                if (postedoc.getAttribute('id') === documentId) {
                    return postedoc.getAttribute('page_reference') || null;
                }
            }
        }
    }
    return null;
}
updatePosteDocumentPageReference(departmentId, posteId, documentId, pageReference) {
    if (!this.guardWriteAccess()) return false;
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return false;
    let success = false;
    const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
    if (depPostesElement) {
        const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
        for (let depPoste of depPosteElements) {
            if (depPoste.getAttribute('id') === posteId) {
                const postedocElements = depPoste.getElementsByTagName('postedoc');
                for (let postedoc of postedocElements) {
                    if (postedoc.getAttribute('id') === documentId) {
                        if (pageReference && pageReference.trim()) {
                            postedoc.setAttribute('page_reference', pageReference.trim());
                        } else {
                            postedoc.removeAttribute('page_reference');
                        }
                        success = true;
                        break;
                    }
                }
                if (!success) {
                    const document = this.documentsMap.get(documentId);
                    if (document) {
                        const postedocElement = this.xmlDoc.createElement('postedoc');
                        postedocElement.setAttribute('id', documentId);
                        postedocElement.setAttribute('nom', document.nom);
                        if (pageReference && pageReference.trim()) {
                            postedocElement.setAttribute('page_reference', pageReference.trim());
                        }
                        if (document.type) postedocElement.setAttribute('type', document.type);
                        if (document.description) postedocElement.setAttribute('description', document.description);
                        if (document.lien) postedocElement.setAttribute('lien', document.lien);
                        if (document.code) postedocElement.setAttribute('code', document.code);
                        if (document.reglementation) postedocElement.setAttribute('reglementation', document.reglementation);
                        depPoste.appendChild(postedocElement);
                        success = true;
                        const dept = this.departements.get(departmentId);
                        if (dept && !dept.fichiers.some(f => f.id === documentId)) {
                            dept.fichiers.push(document);
                        }
                    }
                }
                break;
            }
        }
    }
    if (success) {
        const dept = this.departements.get(departmentId);
        if (dept && dept.fichiers) {
            for (let fichier of dept.fichiers) {
                if (fichier.id === documentId) {
                    if (!fichier.page_references) {
                        fichier.page_references = new Map();
                    }
                    if (pageReference && pageReference.trim()) {
                        fichier.page_references.set(posteId, pageReference.trim());
                    } else {
                        fichier.page_references.delete(posteId);
                    }
                    if (pageReference && pageReference.trim()) {
                        fichier.page_reference = pageReference.trim();
                    } else if (fichier.page_references.size === 0) {
                        delete fichier.page_reference;
                    }
                    break;
                }
            }
        }
        const globalDoc = this.documentsMap.get(documentId);
        if (globalDoc) {
            if (pageReference && pageReference.trim()) {
                globalDoc.page_reference = pageReference.trim();
            } else {
                delete globalDoc.page_reference;
            }
        }
    }
    return success;
}
getPageReferenceForTaskDocument(departmentId, taskId, documentId) {
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return null;
    const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
    if (!depTasksElement) return null;
    const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
    for (let depTask of depTaskElements) {
        if (depTask.getAttribute('id') === taskId) {
            const taskdocElements = depTask.getElementsByTagName('taskdoc');
            for (let taskdoc of taskdocElements) {
                if (taskdoc.getAttribute('id') === documentId) {
                    return taskdoc.getAttribute('page_reference') || null;
                }
            }
        }
    }
    return null;
}
updateTaskDocumentPageReference(departmentId, taskId, documentId, pageReference) {
    if (!this.guardWriteAccess()) return false;
    const deptElement = this.departementElements.get(departmentId);
    if (!deptElement) return false;
    let success = false;
    const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
    if (depTasksElement) {
        const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
        for (let depTask of depTaskElements) {
            if (depTask.getAttribute('id') === taskId) {
                const taskdocElements = depTask.getElementsByTagName('taskdoc');
                for (let taskdoc of taskdocElements) {
                    if (taskdoc.getAttribute('id') === documentId) {
                        if (pageReference && pageReference.trim()) {
                            taskdoc.setAttribute('page_reference', pageReference.trim());
                        } else {
                            taskdoc.removeAttribute('page_reference');
                        }
                        success = true;
                        break;
                    }
                }
                if (!success) {
                    const document = this.documentsMap.get(documentId);
                    if (document) {
                        const taskdocElement = this.xmlDoc.createElement('taskdoc');
                        taskdocElement.setAttribute('id', documentId);
                        taskdocElement.setAttribute('nom', document.nom);
                        if (pageReference && pageReference.trim()) {
                            taskdocElement.setAttribute('page_reference', pageReference.trim());
                        }
                        if (document.type) taskdocElement.setAttribute('type', document.type);
                        if (document.description) taskdocElement.setAttribute('description', document.description);
                        if (document.lien) taskdocElement.setAttribute('lien', document.lien);
                        if (document.code) taskdocElement.setAttribute('code', document.code);
                        if (document.reglementation) taskdocElement.setAttribute('reglementation', document.reglementation);
                        depTask.appendChild(taskdocElement);
                        success = true;
                        const dept = this.departements.get(departmentId);
                        if (dept && !dept.fichiers.some(f => f.id === documentId)) {
                            dept.fichiers.push(document);
                        }
                    }
                }
                break;
            }
        }
    }
    if (success) {
        const dept = this.departements.get(departmentId);
        if (dept && dept.fichiers) {
            for (let fichier of dept.fichiers) {
                if (fichier.id === documentId) {
                    if (!fichier.page_references) {
                        fichier.page_references = new Map();
                    }
                    if (pageReference && pageReference.trim()) {
                        fichier.page_references.set(taskId, pageReference.trim());
                    } else {
                        fichier.page_references.delete(taskId);
                    }
                    if (pageReference && pageReference.trim()) {
                        fichier.page_reference = pageReference.trim();
                    } else if (fichier.page_references.size === 0) {
                        delete fichier.page_reference;
                    }
                    break;
                }
            }
        }
        const globalDoc = this.documentsMap.get(documentId);
        if (globalDoc) {
            if (pageReference && pageReference.trim()) {
                globalDoc.page_reference = pageReference.trim();
            } else {
                delete globalDoc.page_reference;
            }
        }
    }
    return success;
}
getAllPageReferencesForDocument(departmentId, documentId) {
    const references = new Map();
    const dept = this.departements.get(departmentId);
    if (dept && dept.postes) {
        for (const poste of dept.postes) {
            const pageRef = this.getPageReferenceForPosteDocument(departmentId, poste.id, documentId);
            if (pageRef) {
                references.set(`poste:${poste.id}`, pageRef);
            }
        }
    }
    if (dept && dept.tasks) {
        for (const task of dept.tasks) {
            const pageRef = this.getPageReferenceForTaskDocument(departmentId, task.id, documentId);
            if (pageRef) {
                references.set(`task:${task.id}`, pageRef);
            }
        }
    }
    return references;
}
getPageReferenceForDocumentPoste(departmentId, documentId, posteId) {
    return this.getPageReferenceForPosteDocument(departmentId, posteId, documentId);
}
getPageReferenceForDocumentTask(departmentId, documentId, taskId) {
    return this.getPageReferenceForTaskDocument(departmentId, taskId, documentId);
}
    moveDepartment(deptId, newParentId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        const dept = this.getDepartement(deptId);
        if (!dept) {
            console.error(`Department ${deptId} not found`);
            return false;
        }
        if (newParentId !== '' && newParentId !== 'null' && newParentId !== null) {
            const newParent = this.getDepartement(newParentId);
            if (!newParent) {
                console.error(`New parent department ${newParentId} not found`);
                return false;
            }
        }
        if (this.isDescendant(deptId, newParentId)) {
            console.error(`Cannot move department into its own descendant`);
            return false;
        }
        dept.parent = newParentId || '';
        this.departements.set(deptId, dept);
        const nodeIndex = this.data.nodes.findIndex(n => n.id === deptId);
        if (nodeIndex !== -1) {
            this.data.nodes[nodeIndex] = dept;
        }
        const oldLinkIndex = this.data.links.findIndex(l => l.target === deptId);
        if (oldLinkIndex !== -1) {
            this.data.links.splice(oldLinkIndex, 1);
        }
        if (newParentId && newParentId !== '' && newParentId !== 'null') {
            this.data.links.push({
                source: newParentId,
                target: deptId
            });
        }
        return true;
    }
    isDescendant(parentId, childId) {
        if (!parentId || !childId) return false;
        let currentId = childId;
        while (currentId) {
            const currentDept = this.getDepartement(currentId);
            if (!currentDept || !currentDept.parent) break;
            if (currentDept.parent === parentId) {
                return true;
            }
            currentId = currentDept.parent;
        }
        return false;
    }
    getChildren(parentId) {
        return Array.from(this.departements.values()).filter(dept => dept.parent === parentId);
    }
    isDocumentUsedByOtherTasks(departmentId, excludeTaskId, documentId) {
        const deptElement = this.departementElements.get(departmentId);
        if (!deptElement) return false;
        const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
        if (!depTasksElement) return false;
        const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
        for (let depTask of depTaskElements) {
            const currentTaskId = depTask.getAttribute('id');
            if (currentTaskId !== excludeTaskId) {
                const taskdocElements = depTask.getElementsByTagName('taskdoc');
                for (let taskdoc of taskdocElements) {
                    if (taskdoc.getAttribute('id') === documentId) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    isDocumentLinkedToPoste(departmentId, posteId, documentId) {
        const documents = this.getDocumentsForPost(departmentId, posteId);
        return documents.some(doc => doc.id === documentId);
    }
    isDocumentLinkedToTask(departmentId, taskId, documentId) {
        const documents = this.getDocumentsForTask(departmentId, taskId);
        return documents.some(doc => doc.id === documentId);
    }
    linkDocumentToPoste(departmentId, posteId, documentId, pageReference = null) {
        const success = this.linkDocumentToPosteOriginal(departmentId, posteId, documentId);
        if (success && pageReference) {
            this.updatePosteDocumentPageReference(departmentId, posteId, documentId, pageReference);
        }
        return success;
    }
    linkPosteToDocument(departmentId, posteId, documentId, pageReference = null) {
        return this.linkDocumentToPoste(departmentId, posteId, documentId,pageReference);
    }
    linkDocumentToTask(departmentId, taskId, documentId, pageReference = null) {
        const success = this.linkDocumentToTaskOriginal(departmentId, taskId, documentId);
        if (success && pageReference) {
            this.updateTaskDocumentPageReference(departmentId, taskId, documentId, pageReference);
        }
        return success;
    }
    linkTaskToDocument(departmentId, taskId, documentId, pageReference = null) {
        return this.linkDocumentToTask(departmentId, taskId, documentId,pageReference);
    }
    unlinkPosteFromDocument(departmentId, posteId, documentId) {
        return this.unlinkDocumentFromPoste(departmentId, posteId, documentId);
    }
    unlinkTaskFromDocument(departmentId, taskId, documentId) {
        return this.unlinkDocumentFromTask(departmentId, taskId, documentId);
    }
    isPosteLinkedToDocument(departmentId, posteId, documentId) {
        return this.isDocumentLinkedToPoste(departmentId, posteId, documentId);
    }
    isTaskLinkedToDocument(departmentId, taskId, documentId) {
        return this.isDocumentLinkedToTask(departmentId, taskId, documentId);
    }
    getPosteAssociations(departmentId, posteId) {
        const dept = this.departements.get(departmentId);
        if (!dept || !dept.posteTaskAssociations) return [];
        return dept.posteTaskAssociations.get(posteId) || [];
    }
    getTaskAssociations(departmentId, taskId) {
        const dept = this.departements.get(departmentId);
        if (!dept || !dept.taskPosteAssociations) return [];
        return dept.taskPosteAssociations.get(taskId) || [];
    }
    updatePosteTaskDescription(departmentId, posteId, taskId, description) {
        return this.linkPosteToTask(departmentId, posteId, taskId, description);
    }
    isPosteLinkedToTask(departmentId, posteId, taskId) {
        const dept = this.departements.get(departmentId);
        if (!dept || !dept.posteTaskAssociations) return false;
        const associations = dept.posteTaskAssociations.get(posteId);
        if (!associations) return false;
        return associations.some(a => a.taskId === taskId);
    }
    isTaskLinkedToPoste(departmentId, taskId, posteId) {
        const dept = this.departements.get(departmentId);
        if (!dept || !dept.taskPosteAssociations) return false;
        const associations = dept.taskPosteAssociations.get(taskId);
        if (!associations) return false;
        return associations.some(a => a.posteId === posteId);
    }
    updatePosteTaskAssociationDescription(departmentId, posteId, taskId, description) {
        if (!this.guardWriteAccess()) return false;
        const dept = this.getDepartement(departmentId);
        if (!dept) return false;
        if (!dept.posteTaskAssociations) dept.posteTaskAssociations = new Map();
        if (!dept.taskPosteAssociations) dept.taskPosteAssociations = new Map();
        const associationData = {
            posteId: posteId,
            taskId: taskId,
            description: description || ''
        };
        if (!dept.taskPosteAssociations.has(taskId)) {
            dept.taskPosteAssociations.set(taskId, []);
        }
        let taskPostes = dept.taskPosteAssociations.get(taskId);
        const existingTaskIndex = taskPostes.findIndex(a => a.posteId === posteId);
        if (existingTaskIndex !== -1) {
            taskPostes[existingTaskIndex] = associationData;
        } else {
            taskPostes.push(associationData);
        }
        if (!dept.posteTaskAssociations.has(posteId)) {
            dept.posteTaskAssociations.set(posteId, []);
        }
        let posteTasks = dept.posteTaskAssociations.get(posteId);
        const existingPosteIndex = posteTasks.findIndex(a => a.taskId === taskId);
        if (existingPosteIndex !== -1) {
            posteTasks[existingPosteIndex] = associationData;
        } else {
            posteTasks.push(associationData);
        }
        const deptElement = this.departementElements.get(departmentId);
        if (deptElement) {
            const depTasksElement = deptElement.getElementsByTagName('dep_tasks')[0];
            if (depTasksElement) {
                const depTaskElements = depTasksElement.getElementsByTagName('dep_task');
                for (let depTask of depTaskElements) {
                    if (depTask.getAttribute('id') === taskId) {
                        let found = false;
                        const taskposteElements = depTask.getElementsByTagName('taskposte');
                        for (let taskposte of taskposteElements) {
                            if (taskposte.getAttribute('id') === posteId) {
                                if (description) {
                                    taskposte.setAttribute('description', description);
                                } else {
                                    taskposte.removeAttribute('description');
                                }
                                found = true;
                                break;
                            }
                        }
                        if (!found && description) {
                            const taskposteElement = this.xmlDoc.createElement('taskposte');
                            taskposteElement.setAttribute('id', posteId);
                            taskposteElement.setAttribute('description', description);
                            depTask.appendChild(taskposteElement);
                        }
                        break;
                    }
                }
            }
            const depPostesElement = deptElement.getElementsByTagName('dep_postes')[0];
            if (depPostesElement) {
                const depPosteElements = depPostesElement.getElementsByTagName('dep_poste');
                for (let depPoste of depPosteElements) {
                    if (depPoste.getAttribute('id') === posteId) {
                        let found = false;
                        const postetaskElements = depPoste.getElementsByTagName('postetask');
                        for (let postetask of postetaskElements) {
                            if (postetask.getAttribute('id') === taskId) {
                                if (description) {
                                    postetask.setAttribute('description', description);
                                } else {
                                    postetask.removeAttribute('description');
                                }
                                found = true;
                                break;
                            }
                        }
                        if (!found && description) {
                            const postetaskElement = this.xmlDoc.createElement('postetask');
                            postetaskElement.setAttribute('id', taskId);
                            postetaskElement.setAttribute('description', description);
                            depPoste.appendChild(postetaskElement);
                        }
                        break;
                    }
                }
            }
        }
        return true;
    }
    addPosteReferenceToDepartment(sourceDeptId, posteId, targetDeptId) {
        if (!this.guardWriteAccess()) {
            return false;
        }
        try {
            const sourceDept = this.getDepartement(sourceDeptId);
            if (!sourceDept) {
                console.error(`Source department ${sourceDeptId} not found`);
                return false;
            }
            const sourcePoste = sourceDept.postes?.find(p => p.id === posteId);
            if (!sourcePoste) {
                console.error(`Poste ${posteId} not found in source department`);
                return false;
            }
            const targetDept = this.getDepartement(targetDeptId);
            if (!targetDept) {
                console.error(`Target department ${targetDeptId} not found`);
                return false;
            }
            if (targetDept.postes?.some(p => p.id === posteId)) {
                console.error(`Poste ${posteId} already exists in target department`);
                return false;
            }
            const globalPoste = this.postesMap.get(posteId);
            if (!globalPoste) {
                console.error(`Poste ${posteId} not found in global postes`);
                return false;
            }
            if (!targetDept.postes) {
                targetDept.postes = [];
            }
            targetDept.postes.push(globalPoste);
            if (!globalPoste.usageCount) globalPoste.usageCount = 0;
            globalPoste.usageCount++;
            if (!globalPoste.departments) globalPoste.departments = [];
            if (!globalPoste.departments.includes(targetDeptId)) {
                globalPoste.departments.push(targetDeptId);
            }
            const targetDeptElement = this.departementElements.get(targetDeptId);
            if (targetDeptElement) {
                let depPostesElement = targetDeptElement.getElementsByTagName('dep_postes')[0];
                if (!depPostesElement) {
                    depPostesElement = this.xmlDoc.createElement('dep_postes');
                    targetDeptElement.appendChild(depPostesElement);
                }
                const depPosteElement = this.xmlDoc.createElement('dep_poste');
                depPosteElement.setAttribute('id', posteId);
                depPosteElement.setAttribute('nom', globalPoste.nom || '');
                if (globalPoste.abbreviation) {
                    depPosteElement.setAttribute('abbrev', globalPoste.abbreviation);
                }
                if (globalPoste.description) {
                    depPosteElement.setAttribute('abbrev_desc', globalPoste.description);
                }
                for (let key in globalPoste) {
                    if (key.startsWith('key-')) {
                        depPosteElement.setAttribute(key, globalPoste[key]);
                    }
                }
                depPostesElement.appendChild(depPosteElement);
            }
            this.departements.set(targetDeptId, targetDept);
            const nodeIndex = this.data.nodes.findIndex(n => n.id === targetDeptId);
            if (nodeIndex !== -1) {
                this.data.nodes[nodeIndex] = targetDept;
            }
            return true;
        } catch (error) {
            console.error('Error adding poste reference:', error);
            return false;
        }
    }   
}
