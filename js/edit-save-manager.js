class AutoSaveManager {
    constructor(xmlParser) {
        this.xmlParser = xmlParser;
        this.dbName = 'AeroLearnDB';
        this.dbVersion = 1;
        this.storeName = 'organizations';
        this.db = null;
        this.saveTimeout = null;
        this.SAVE_DELAY = 5000; 
        this.editModeManager = null;
        this.currentFileId = 'Aero-Learn';         
        this.translations = {
            fr: {
                restoreAutoSave: 'Restaurer la version auto-sauvegardée il y a {minutes} minutes ?\nFichier : {filename}',
                restoreAutoSaveTitle: "Restaurer la version auto-sauvegardée",
                saved: 'Sauvegardé',
                saveFailed: 'Échec de la sauvegarde',
                restoreSuccess: 'Version restaurée',
                restoreError: 'Erreur lors de la restauration',
                downloadSuccess: 'Sauvegarde téléchargée',
                downloadError: 'Erreur lors du téléchargement',
                backupNotFound: 'Sauvegarde non trouvée',
                editModeUnavailable: 'Erreur: EditModeManager non disponible',
                loadBackupsError: 'Erreur lors du chargement des sauvegardes',
                backupsModalTitle: 'Sauvegardes automatiques',
                noBackupsTitle: 'Aucune sauvegarde trouvée',
                noBackupsMessage: 'Les sauvegardes apparaîtront automatiquement après 15 secondes d\'inactivité.',
                backupsAvailable: 'sauvegarde(s) disponible(s)',
                close: 'Fermer',
                deleteAllBackups: 'Supprimer toutes les sauvegardes',
                confirmDeleteAll: 'Supprimer TOUTES les sauvegardes ? Cette action est irréversible.',
                confirmDelete: 'Supprimer cette sauvegarde ?',
                confirmRestore: 'Restaurer la version du',
                restore: 'Restaurer',
                restored: 'Restauré',
                download: 'Télécharger',
                delete: 'Supprimer',
                dbInitialized: 'IndexedDB initialisé',
                dbError: 'Erreur IndexedDB',
                autoSaveDisabled: 'Auto-save désactivé dans la configuration',
                scheduleAutoSave: 'Planification auto-save pour',
                autoSavedAt: 'Auto-sauvegardé:'
            },
            en: {
                restoreAutoSave: 'Restore auto-saved version from {minutes} minutes ago?\nFile: {filename}',
                restoreAutoSaveTitle: "Restore Auto-saved Version",
                saved: 'Saved',
                saveFailed: 'Save failed',
                restoreSuccess: 'Version restored',
                restoreError: 'Restoration error',
                downloadSuccess: 'Backup downloaded',
                downloadError: 'Download error',
                backupNotFound: 'Backup not found',
                editModeUnavailable: 'Error: EditModeManager unavailable',
                loadBackupsError: 'Error loading backups',
                backupsModalTitle: 'Automatic Backups',
                noBackupsTitle: 'No backup found',
                noBackupsMessage: 'Backups will appear automatically after 15 seconds of inactivity.',
                backupsAvailable: 'backup(s) available',
                close: 'Close',
                deleteAllBackups: 'Delete all backups',
                confirmDeleteAll: 'Delete ALL backups? This action is irreversible.',
                confirmDelete: 'Delete this backup?',
                confirmRestore: 'Restore version from',
                restore: 'Restore',
                restored: 'Restored',
                download: 'Download',
                delete: 'Delete',
                dbInitialized: 'IndexedDB initialized',
                dbError: 'IndexedDB error',
                autoSaveDisabled: 'Auto-save disabled in config',
                scheduleAutoSave: 'Schedule auto-save for',
                autoSavedAt: 'Auto-saved:'
            }
        };
        this.currentLang = 'en';
    }
    setEditModeManager(editModeManager) {
        this.editModeManager = editModeManager;
    }
    setLang(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateModalTranslations();
            return true;
        }
        return false;
    }
    translate(key, params = {}) {
        let text = this.translations[this.currentLang]?.[key] || this.translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: false
                    });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    store.createIndex('filename', 'filename', { unique: false });
                }
            };
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };
            request.onerror = (event) => {
                console.error(this.translate('dbError') + ':', event.target.error);
                reject(event.target.error);
            };
        });
    }
    async restoreLastSave() {
        try {
            const lastSave = await this.loadRecord(this.currentFileId);
            if (lastSave) {
                const timeSince = Date.now() - lastSave.timestamp;
                const minutesAgo = Math.floor(timeSince / 60000);
                const message = this.translate('restoreAutoSave', {
                    minutes: minutesAgo,
                    filename: lastSave.filename
                });
                const restore = await this.editModeManager.showConfirm(message, this.translate('restoreAutoSaveTitle'));
                if (restore) {
                    this.editModeManager.xmlParser.parseXML(lastSave.xmlContent);
                    this.editModeManager.currentXmlFile = lastSave.filename;
                    this.editModeManager.refreshDiagram();
                    this.editModeManager.showNotification(this.translate('restored'), 'success');
                }
            }
        } catch (error) {
            console.warn('No previous auto-save found:', error);
        }
    }
    scheduleAutoSave( filename) {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
            this.autoSave( filename);
        }, this.SAVE_DELAY);
    }
    async autoSave( filename) {
        try {
            const xmlData = this.xmlParser.exportToXML();
            const record = {
                id: this.currentFileId,                       
                filename: filename,               
                xmlContent: xmlData,
                timestamp: Date.now(),
                version: this.dbVersion,
                compressed: false,
                language: this.currentLang  
            };
            await this.saveRecord(record);
            this.editModeManager.showNotification(this.translate('saved'), 'success');
        } catch (error) {
            console.error('Auto-save failed:', error);
            this.editModeManager.showNotification(this.translate('saveFailed'), 'error');
        }
    }
    async saveRecord(record) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put(record); 
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    async loadRecord(fileId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(fileId);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    async listAllSaves() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();
            request.onsuccess = () => {
                const records = request.result;
                records.sort((a, b) => b.timestamp - a.timestamp);
                resolve(records);
            };
            request.onerror = () => reject(request.error);
        });
    }
    async deleteRecord(fileId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(fileId);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    async deleteAllRecords() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    async showBackupsModal() {
        try {
            const saves = await this.listAllSaves();
            const modal = document.createElement('div');
            modal.className = 'backups-modal';
            modal.id = 'backups-modal';
            let savesContent = '';
            if (saves.length === 0) {
                savesContent = `
                    <div class="no-backups">
                        <h3>${this.translate('noBackupsTitle')}</h3>
                        <p>${this.translate('noBackupsMessage')}</p>
                    </div>
                `;
            } else {
                savesContent = saves.map(save => `
                    <div class="backup-item" data-id="${save.id}">
                        <div class="backup-header">
                            <div class="backup-title">
                                <strong>${save.filename}</strong>
                                <span class="backup-date">${new Date(save.timestamp).toLocaleString()}</span>
                            </div>
                            <div class="backup-size">
                                ${(save.xmlContent.length / 1024).toFixed(1)} KB
                            </div>
                        </div>
                        <div class="backup-details">
                            <div class="backup-actions">
                                <button class="btn btn-small btn-primary restore-backup" data-id="${save.id}">
                                    ${this.translate('restore')}
                                </button>
                                <button class="btn btn-small btn-secondary download-backup" data-id="${save.id}">
                                    ${this.translate('download')}
                                </button>
                                <button class="btn btn-small btn-danger delete-backup" data-id="${save.id}">
                                    ${this.translate('delete')}
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            modal.innerHTML = `
                <div class="backups-modal-content">
                    <div class="backups-modal-header">
                        <h2>${this.translate('backupsModalTitle')}</h2>
                        <button class="backups-modal-close" id="backups-modal-close">&times;</button>
                    </div>
                    <div class="backups-modal-body">
                        <div class="backups-info">
                            <p>${saves.length} ${this.translate('backupsAvailable')}</p>
                        </div>
                        <div class="backups-list">
                            ${savesContent}
                        </div>
                        <div class="backups-actions">
                            <button type="button" class="btn btn-secondary" id="backups-close">${this.translate('close')}</button>
                            ${saves.length > 0 ? 
                                `<button type="button" class="btn btn-danger" id="backups-delete-all">${this.translate('deleteAllBackups')}</button>` : 
                                ''}
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            this.attachBackupModalEvents(modal);
        } catch (error) {
            console.error(this.translate('loadBackupsError') + ':', error);
            this.editModeManager.showNotification(this.translate('loadBackupsError'), 'error');
        }
    }
    closeBackupsModal() {
        const modal = document.getElementById('backups-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
    }
    attachBackupModalEvents(modal) {
        if (!modal) return;
        const self = this;
        modal.querySelector('#backups-modal-close').addEventListener('click', () => {
            this.closeBackupsModal();
        });
        modal.querySelector('#backups-close').addEventListener('click', () => {
            this.closeBackupsModal();
        });
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'backups-modal') {
                this.closeBackupsModal();
            }
        });
        modal.querySelectorAll('.restore-backup').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await this.restoreBackup(id);
            });
        });
        modal.querySelectorAll('.download-backup').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                await this.downloadBackup(id);
            });
        });
        modal.querySelectorAll('.delete-backup').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                if (confirm(this.translate('confirmDelete'))) {
                    await this.deleteRecord(id);
                    this.showBackupsModal(); 
                }
            });
        });
        const deleteAllBtn = modal.querySelector('#backups-delete-all');
        if (deleteAllBtn) {
            deleteAllBtn.addEventListener('click', async () => {
                if (confirm(this.translate('confirmDeleteAll'))) {
                    await this.deleteAllRecords();
                    this.showBackupsModal();  
                }
            });
        }
    }
    async restoreBackup(id) {
        try {
            const save = await this.loadRecord(id);
            if (!save) {
                this.editModeManager.showNotification(this.translate('backupNotFound'), 'error');
                return;
            }
            if (!confirm(`${this.translate('confirmRestore')} ${new Date(save.timestamp).toLocaleString()} ?`)) {
                return;
            }
            if (this.editModeManager) {
                this.editModeManager.xmlParser.parseXML(save.xmlContent);
                this.editModeManager.currentXmlFile = save.filename;
                if (document.getElementById('current-file-name')) {
                    document.getElementById('current-file-name').textContent = save.filename;
                }
                if (document.getElementById('save-filename')) {
                    document.getElementById('save-filename').value = save.filename;
                }
                this.editModeManager.refreshDiagram();
                this.closeBackupsModal();
                this.editModeManager.showNotification(`${this.translate('restoreSuccess')} ${new Date(save.timestamp).toLocaleTimeString()}`, 'success');
            } else {
                this.editModeManager.showNotification(this.translate('editModeUnavailable'), 'error');
            }
        } catch (error) {
            console.error(this.translate('restoreError') + ':', error);
            this.editModeManager.showNotification(this.translate('restoreError'), 'error');
        }
    }
    async downloadBackup(id) {
        try {
            const save = await this.loadRecord(id);
            if (!save) {
                this.editModeManager.showNotification(this.translate('backupNotFound'), 'error');
                return;
            }
            const blob = new Blob([save.xmlContent], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup-${new Date(save.timestamp).toISOString().split('T')[0]}-${save.filename}`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }, 100);
            this.editModeManager.showNotification(this.translate('downloadSuccess'), 'success');
        } catch (error) {
            console.error(this.translate('downloadError') + ':', error);
            this.editModeManager.showNotification(this.translate('downloadError'), 'error');
        }
    }
    updateModalTranslations() {
        const modal = document.getElementById('backups-modal');
        if (!modal) return;
        const title = modal.querySelector('.backups-modal-header h2');
        if (title) title.textContent = this.translate('backupsModalTitle');
        const backupsInfo = modal.querySelector('.backups-info p');
        if (backupsInfo) {
            const savesCount = modal.querySelectorAll('.backup-item').length;
            backupsInfo.textContent = `${savesCount} ${this.translate('backupsAvailable')}`;
        }
        const noBackupsTitle = modal.querySelector('.no-backups h3');
        if (noBackupsTitle) noBackupsTitle.textContent = this.translate('noBackupsTitle');
        const noBackupsMessage = modal.querySelector('.no-backups p');
        if (noBackupsMessage) noBackupsMessage.textContent = this.translate('noBackupsMessage');
        const closeBtn = modal.querySelector('#backups-close');
        if (closeBtn) closeBtn.textContent = this.translate('close');
        const deleteAllBtn = modal.querySelector('#backups-delete-all');
        if (deleteAllBtn) {
            deleteAllBtn.textContent = this.translate('deleteAllBackups');
        }
        modal.querySelectorAll('.restore-backup').forEach(btn => {
            btn.textContent = this.translate('restore');
        });
        modal.querySelectorAll('.download-backup').forEach(btn => {
            btn.textContent = this.translate('download');
        });
        modal.querySelectorAll('.delete-backup').forEach(btn => {
            btn.textContent = this.translate('delete');
        });
        const closeButtons = modal.querySelectorAll('.backups-modal-close');
        closeButtons.forEach(btn => {
            if (!btn.innerHTML.includes('&times;')) { 
                btn.textContent = this.translate('close');
            }
        });
    }
}