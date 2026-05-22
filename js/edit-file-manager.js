class EditFileManager {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.currentXmlFile = editModeManager.currentXmlFile;
        this.xmlParser = editModeManager.xmlParser;
        this.messageManager = editModeManager.messageManager;
        this.lng = editModeManager.lng;
        this.translations = {
            en: {
                fileManagement: "File Management",
                exportDiagram: "Export Diagram File",
                exportHTML: "Export HTML File",
                importCsvGraph: "Import CSV File",
                currentFile: "Current File",
                createNew: "Create New",
                save: "Save XML File",
                saveAs: "Save As...",
                uploadXmlFile: "Input",
                uploadLocalFile: "Upload XML File",
                uploadHint: "Upload an XML file from your computer",
                selectXmlFile: "Select Organization File",
                loadXmlFile: "Load XML File",
                reloadCurrent: "Reload Current",
                refresh: "Refresh",
                noXmlFiles: "No XML files found",
                loadingFiles: "Loading files...",
                confirmLoad: "Load this organization? Unsaved changes will be lost.",
                confirmCreate: "Create new organization? This will clear current data.",
                newOrgName: "New organization",
                saveSuccess: "File saved successfully",
                saveError: "Error saving file",
                loadSuccess: "File loaded successfully",
                loadError: "Error loading file",
                newOrganization: "New Organization",
                selectFile: "Select File",
                fileUploaded: "File uploaded successfully",
                uploadFailed: "Upload failed",
                invalidXmlFile: "Invalid XML file",
                close: "Close",
                files: "Files",
                file: "File",
                outputFile: "Output"
            },
            fr: {
                fileManagement: "Gestion des fichiers",
                exportDiagram: "Exporter le diagramme",
                exportHTML: "Exporter HTML",
                importCsvGraph: "Importer un graphe CSV",
                currentFile: "Fichier actuel",
                createNew: "Créer une nouvelle",
                save: "Enregistrer",
                saveAs: "Enregistrer sous...",
                uploadXmlFile: "Télécharger un fichier",
                uploadLocalFile: "Télécharger un fichier local",
                uploadHint: "Téléchargez un fichier XML depuis votre ordinateur",
                selectXmlFile: "Sélectionner un fichier d'organisation",
                loadXmlFile: "Charger un fichier XML",
                reloadCurrent: "Recharger le courant",
                refresh: "Rafraîchir",
                noXmlFiles: "Aucun fichier XML trouvé",
                loadingFiles: "Chargement des fichiers...",
                confirmLoad: "Charger cette organisation ? Les modifications non sauvegardées seront perdues.",
                confirmCreate: "Créer une nouvelle organisation ? Les données actuelles seront effacées.",
                newOrgName: "Nouvelle organisation",
                saveSuccess: "Fichier sauvegardé avec succès",
                saveError: "Erreur lors de la sauvegarde",
                loadSuccess: "Fichier chargé avec succès",
                loadError: "Erreur lors du chargement",
                newOrganization: "Nouvelle Organisation",
                selectFile: "Sélectionner un fichier",
                fileUploaded: "Fichier téléchargé avec succès",
                uploadFailed: "Échec du téléchargement",
                invalidXmlFile: "Fichier XML invalide",
                close: "Fermer",
                files: "Fichiers",
                file: "Fichier",
                outputFile: "Fichier de sortie"
            }
        };
        this.xmlFolderPath = 'xml/';
        this.init();
    }
    setLang(lng) {
        this.lng = lng;
        this.updateModalTranslations();
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    init() {
        this.createFileManagementUI();
        this.attachEventListeners();
    }
    createFileManagementUI() {
        const fileContainer = document.createElement('div');
        fileContainer.className = 'file-management-container';
        fileContainer.id = 'file-management-container';
        fileContainer.innerHTML = `
            <div class="file-management-header">
                <h3>${this.translate('fileManagement')}</h3>
                <button class="file-management-close" id="file-management-close">&times;</button>
            </div>
            <div class="file-management-body">
                <div class="current-file-info">
                    <h4>${this.translate('outputFile')}</h4>
                    <div class="file-actions">
                        <button class="btn btn-primary" id="save-file">${this.translate('save')}</button>
                        <button class="btn btn-primary" id="export-html-btn">${this.translate('exportHTML')}</button>
                        <button class="btn btn-primary" id="export-diagram-btn">${this.translate('exportDiagram')}</button>
                    </div>
                </div>
                 <div class="current-file-info">
                     <h4>${this.translate('currentFile')}</h4>
                     <div class="filename-input-group" style="margin-top: 15px;">
                        <input type="text" id="save-filename" 
                            placeholder="my-organization.xml" 
                            value="${this.currentXmlFile}" 
                            style="width: 100%; padding: 8px; margin-top: 5px;">
                         <button class="btn btn-primary" id="create-new-org">${this.translate('createNew')}</button>
                     </div>
                 </div>
             </div>
             <div class="file-management-footer">
                 <button class="btn btn-secondary" id="file-management-footer-close">${this.translate('close')}</button>
             </div>
        `;
        document.body.appendChild(fileContainer);
    }
    showFileManagement() {
        const container = document.getElementById('file-management-container');
        container.classList.add('active');
        this.addUploadFunctionality();
    }
    closeFileManagement() {
        document.getElementById('file-management-container').classList.remove('active');
    }
    attachEventListeners() {
        document.getElementById('file-management-close').addEventListener('click', () => {
            this.closeFileManagement();
        });
        document.getElementById('file-management-footer-close').addEventListener('click', () => {
            this.closeFileManagement();
        });
        document.getElementById('save-file').addEventListener('click', () => {
            this.saveFile();
        });
        document.getElementById('export-diagram-btn').addEventListener('click', () => {
            this.closeFileManagement();
            this.editModeManager.exportDiagram();
        });
        document.getElementById('export-html-btn').addEventListener('click', () => {
            this.closeFileManagement();
            this.editModeManager.exportProject();
        });
        document.getElementById('create-new-org').addEventListener('click', () => {
            this.createNewOrganization();
        });
        document.getElementById('file-management-container').addEventListener('click', (e) => {
            if (e.target.id === 'file-management-container') {
                this.closeFileManagement();
            }
        });
    }
    addUploadFunctionality() {
        const fileContainer = document.getElementById('file-management-container');
        if (!fileContainer) return;
        const fileuploadsection = document.getElementById('file-upload-section');
        if (fileuploadsection) return;        
        const uploadSection = document.createElement('div');
        uploadSection.id = 'file-upload-section';
        uploadSection.className = 'upload-section';
        uploadSection.innerHTML = `
            <h4>${this.translate('uploadXmlFile')}</h4>
            <input type="file" id="xml-upload-input" accept=".xml" style="display: none;">
            <div class="file-actions">
                <button class="btn btn-primary" id="upload-xml-btn">${this.translate('uploadLocalFile')}</button>
                <button class="btn btn-primary" id="import-csv-graph">${this.translate('importCsvGraph')}</button>
            </div>
        `;
        const currentFileInfo = fileContainer.querySelector('.current-file-info');
        if (currentFileInfo) {
            currentFileInfo.parentNode.insertBefore(uploadSection, currentFileInfo);
        }
        document.getElementById('upload-xml-btn').addEventListener('click', () => {
            document.getElementById('xml-upload-input').click();
        });
        document.getElementById('xml-upload-input').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files[0]);
        });
    }
    async handleFileUpload(file) {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.xml')) {
            this.messageManager.showNotification('Please select an XML file', 'error');
            return;
        }
        const restore = await this.messageManager.showConfirm(this.translate('confirmLoad'));
        if (!restore) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const xmlContent = e.target.result;
                this.xmlParser.parseXML(xmlContent);
                this.currentXmlFile = file.name;
                document.getElementById('save-filename').value = file.name;
                this.editModeManager.refreshDiagram();
                this.closeFileManagement();
                this.messageManager.showNotification(`${this.translate('fileUploaded')}: "${file.name}"`, 'success',2);
            } catch (error) {
                console.error('Error parsing uploaded XML:', error);
                this.messageManager.showNotification(`${this.translate('uploadFailed')}: ${error.message}`, 'error');
            }
        };
        reader.onerror = () => {
            this.messageManager.showNotification(this.translate('uploadFailed'), 'error');
        };
        reader.readAsText(file);
    }
    async populateXmlFilesList() {
        const fileContainer = document.getElementById('file-management-container');
        if (!fileContainer) return;
        const existingList = fileContainer.querySelector('.xml-files-list');
        if (existingList) {
            existingList.remove();
        }
        const listContainer = document.createElement('div');
        listContainer.className = 'xml-files-list';
        listContainer.innerHTML = `
            <h4>${this.translate('files')}</h4>
            <div class="loading" id="xml-files-loading">${this.translate('loadingFiles')}</div>
            <select class="xml-files-select" id="xml-files-select" multiple style="display: none;"></select>
            <div class="no-files" id="no-xml-files" style="display: none;">${this.translate('noXmlFiles')}</div>
        `;
        const uploadSection = fileContainer.querySelector('#file-upload-section');
        const currentFileInfo = fileContainer.querySelector('.current-file-info');
        if (uploadSection && currentFileInfo) {
            uploadSection.parentNode.insertBefore(listContainer, currentFileInfo);
        } else if (currentFileInfo) {
            currentFileInfo.parentNode.insertBefore(listContainer, currentFileInfo);
        } else {
            const fileManagementBody = fileContainer.querySelector('.file-management-body');
            if (fileManagementBody) {
                fileManagementBody.appendChild(listContainer);
            }
        }
        const select = document.getElementById('xml-files-select');
        const loading = document.getElementById('xml-files-loading');
        const noFiles = document.getElementById('no-xml-files');
        select.innerHTML = '<option value="">Loading...</option>';
        select.disabled = true;
        const files = await this.getXmlFiles();
        if (files.length === 0) {
            loading.style.display = 'none';
            select.style.display = 'none';
            noFiles.style.display = 'block';
            return;
        }
        select.innerHTML = '';
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file.path;
            option.textContent = `${file.name} ${file.size ? `(${file.size})` : ''}`;
            select.appendChild(option);
        });
        loading.style.display = 'none';
        select.style.display = 'block';
        noFiles.style.display = 'none';
        select.disabled = false;
        select.addEventListener('dblclick', () => {
            const selectedFile = select.value;
            if (selectedFile) {
                this.loadXmlFile(selectedFile);
            }
        });
    }
    async getXmlFiles() {
        try {
            const response = await fetch(this.xmlFolderPath);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const links = doc.querySelectorAll('a[href$=".xml"]');
            const files = Array.from(links).map(link => {
                const href = link.getAttribute('href');
                const fileName = href.split('/').pop();
                const filePath = href.startsWith('/') ? href : this.xmlFolderPath + href;
                return {
                    name: fileName,
                    path: filePath,
                    size: link.textContent.match(/\(([^)]+)\)/)?.[1] || ''
                };
            });
            files.sort((a, b) => a.name.localeCompare(b.name));
            return files;
        } catch (error) {
            console.error('Error fetching XML files:', error);
            return [];
        }
    }
    async loadXmlFile(filePath, fileName = '') {
        const restore = await this.messageManager.showConfirm(this.translate('confirmLoad'));
        if (!restore) return;
        try {
            const response = await fetch(filePath);
            const xmlContent = await response.text();
            this.currentXmlFile = fileName || filePath.split('/').pop();
            document.getElementById('save-filename').value = this.currentXmlFile;
            this.xmlParser.parseXML(xmlContent);
            this.editModeManager.refreshDiagram();
            this.closeFileManagement();
            this.messageManager.showNotification(this.translate('loadSuccess'), 'success',3);
        } catch (error) {
            console.error('Error loading XML file:', error);
            this.messageManager.showNotification(`${this.translate('loadError')}: ${error.message}`, 'error');
        }
    }
    saveFile() {
        const filenameInput = document.getElementById('save-filename');
        let filename = filenameInput.value.trim();
        if (!filename) {
            this.messageManager.showNotification('Please enter a filename', 'error');
            return;
        }
        if (!filename.toLowerCase().endsWith('.xml')) {
            filename += '.xml';
            filenameInput.value = filename;
        }
        try {
            const xmlString = this.xmlParser.exportToXML();
            const blob = new Blob([xmlString], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
            this.currentXmlFile = filename;
            this.messageManager.showNotification(this.translate('saveSuccess'), 'success');
        } catch (error) {
            console.error('Error saving file:', error);
            this.messageManager.showNotification(`${this.translate('saveError')}: ${error.message}`, 'error');
        }
    }
    async createNewOrganization() {
        const restore = await this.messageManager.showConfirm(this.translate('confirmCreate'));
        if (!restore) return;
        const filenameInput = document.getElementById('save-filename');
        const filename = filenameInput.value || this.translate('newOrgName') + '.xml';
        const newXmlStructure = `<?xml version="1.0" encoding="UTF-8"?>
<organisation language="en" dateGeneration="${new Date().toLocaleDateString()}" code="1.0" libelle="Aeronautical Organizational Structure" Description="" createur="ENAC">
    <departements>
        <departement id="dept-0" nom="dept-0">
            <description>New department created on ${new Date().toLocaleDateString()}</description>
        </departement>
    </departements>
    <documents>
    </documents>
    <tasks>
    </tasks>
    <postes>
    </postes>
</organisation>`;
        this.xmlParser.parseXML(newXmlStructure);
        this.currentXmlFile = filename;
        filenameInput.value = filename;
        this.editModeManager.refreshDiagram();
        this.closeFileManagement();
        this.messageManager.showNotification(this.translate('newOrganization'), 'success',);
    }
    exportXML() {
        try {
            const xmlString = this.xmlParser.exportToXML();
            const blob = new Blob([xmlString], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const timestamp = new Date().getTime();
            a.download = `organigramme-${timestamp}.xml`;
            a.style.display = 'none';
            document.body.appendChild(a);
            setTimeout(() => {
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
            }, 0);
        } catch (error) {
            console.error("Erreur lors de l'export XML:", error);
            this.showNotification.showNotification(`Erreur lors de l'export: ${error.message}`, 'error');
        }
    }
    openFileXML(xmlContent, fileName = '') {
        try {
            const confirmMessage = this.translate('confirmLoad');
            if (this.xmlParser.departements.size > 0 && !this.messageManager.showConfirm(confirmMessage)) {
                return;
            }
            this.xmlParser.parseXML(xmlContent);
            if (fileName) {
                this.currentXmlFile = fileName;
            } else {
                const depts = Array.from(this.xmlParser.departements.values());
                const mainDept = depts.find(d => d.id === 'root') || depts[0];
                this.currentXmlFile = mainDept ? 
                    `${mainDept.nom.replace(/\s+/g, '-').toLowerCase()}.xml` : 
                    `organization-${new Date().toISOString().split('T')[0]}.xml`;
            }
            const saveFilenameInput = document.getElementById('save-filename');
            if (saveFilenameInput) {
                saveFilenameInput.value = this.currentXmlFile;
            }
            this.refreshDiagram();
            this.showNotification.showNotification(this.translate('loadSuccess'), 'success');
            return true;
        } catch (error) {
            console.error('Error in openFileXML:', error);
            this.showNotification.showNotification(`${this.translate('loadError')}: ${error.message}`, 'error');
            return false;
        }
    }
    exportFileXML() {
        try {
            return this.xmlParser.exportToXML();
        } catch (error) {
            console.error('Error in exportFileXML:', error);
            this.showNotification.showNotification(`Error exporting XML: ${error.message}`, 'error');
            throw error;
        }
    }
    updateModalTranslations() {
        const container = document.getElementById('file-management-container');
        if (!container) return;
        const title = container.querySelector('.file-management-header h3');
        if (title) title.textContent = this.translate('fileManagement');
        const subtitles = container.querySelectorAll('.current-file-info h4');
        if (subtitles.length >= 2) {
            subtitles[0].textContent = this.translate('outputFile');
            subtitles[1].textContent = this.translate('currentFile');
        }
        const exportHtmlBtn = container.querySelector('#export-html-btn');
        if (exportHtmlBtn) exportHtmlBtn.textContent = this.translate('exportHTML');
        const exportDiagramBtn = container.querySelector('#export-diagram-btn');
        if (exportDiagramBtn) exportDiagramBtn.textContent = this.translate('exportDiagram');
        const filenameInput = container.querySelector('#save-filename');
        if (filenameInput && !filenameInput.value) {
            filenameInput.placeholder = this.translate('newOrgName') + '.xml';
        }
        const createNewBtn = container.querySelector('#create-new-org');
        if (createNewBtn) createNewBtn.textContent = this.translate('createNew');
        const saveBtn = container.querySelector('#save-file');
        if (saveBtn) saveBtn.textContent = this.translate('save');
        const uploadSection = container.querySelector('#file-upload-section');
        if (uploadSection) {
            const uploadTitle = uploadSection.querySelector('h4');
            if (uploadTitle) uploadTitle.textContent = this.translate('uploadXmlFile');
            const uploadBtn = uploadSection.querySelector('#upload-xml-btn');
            if (uploadBtn) uploadBtn.textContent = this.translate('uploadLocalFile');
        }
        const closeBtn = container.querySelector('.file-management-close');
        if (closeBtn) closeBtn.title = this.translate('close');
        const footerCloseBtn = container.querySelector('#file-management-footer-close');
        if (footerCloseBtn) footerCloseBtn.textContent = this.translate('close');
        const filesList = container.querySelector('.xml-files-list');
        if (filesList) {
            const filesTitle = filesList.querySelector('h4');
            if (filesTitle) filesTitle.textContent = this.translate('files');
            const loadingDiv = filesList.querySelector('.loading');
            if (loadingDiv) loadingDiv.textContent = this.translate('loadingFiles');
            const noFilesDiv = filesList.querySelector('.no-files');
            if (noFilesDiv) noFilesDiv.textContent = this.translate('noXmlFiles');
        }
    }
}
