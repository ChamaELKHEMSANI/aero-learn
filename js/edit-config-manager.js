class EditConfigManager {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.appConfig = {
            theme: 'light',
            diagramMode: 'organigram',
            showBadges: {
                documents: false,
                tasks: false,
                positions: false,
                abreviation: true
            },
            language: 'en',
            autoSave: true,
            animations: true,
            openHtmlPreviewInNewWindow: true
        };
        this.translations = {
            en: {
                appConfiguration: 'Application Configuration',
                displaySettings: 'Display Settings',
                badgeSettings: 'Badge Settings',
                generalSettings: 'General Settings',
                language: 'Language',
                displayTheme: 'Display Theme',
                displayMode: 'Display Mode',
                showDocumentsBadge: 'Show documents badge',
                showTasksBadge: 'Show tasks badge',
                showPositionsBadge: 'Show positions badge',
                showAbreviationBadge: 'Show abreviation badge',
                autoSave: 'Auto-save changes',
                enableAnimations: 'Enable animations',
                openHtmlPreviewInNewWindow: 'Open HTML preview in a new window',
                viewBackups: 'View Backups',
                resetToolbarsPosition: 'Toolbars',
                resetDefaults: 'Reset',
                save: 'Save',
                apply: 'Apply',
                cancel: 'Cancel',
                configSaved: 'Configuration saved successfully',
                toolbarsReset: 'Diagram toolbars moved to top left',
                light: 'Light',
                dark: 'Dark',
                blue: 'Blue',
                green: 'Green',
                organigram: 'Organigram',
                reverseTree: 'Reverse Tree',
                reverseTreeclassroom: 'Reverse Tree Classroom',
                english: 'English',
                french: 'French'
            },
            fr: {
                appConfiguration: 'Configuration de l\'application',
                displaySettings: 'Paramètres d\'affichage',
                badgeSettings: 'Paramètres des badges',
                generalSettings: 'Paramètres généraux',
                language: 'Langue',
                displayTheme: 'Thème d\'affichage',
                displayMode: 'Mode d\'affichage',
                showDocumentsBadge: 'Afficher le badge des documents',
                showTasksBadge: 'Afficher le badge des tâches',
                showPositionsBadge: 'Afficher le badge des postes',
                showAbreviationBadge: 'Afficher le badge des abréviations',
                autoSave: 'Sauvegarde automatique',
                enableAnimations: 'Activer les animations',
                openHtmlPreviewInNewWindow: 'Ouvrir la previsualisation HTML dans une nouvelle fenetre',
                viewBackups: 'Voir les sauvegardes',
                resetDefaults: 'Réinitialiser',
                save: 'Enregistrer',
                apply: 'Appliquer',
                cancel: 'Annuler',
                configSaved: 'Configuration enregistrée avec succès',
                light: 'Clair',
                dark: 'Sombre',
                blue: 'Bleu',
                green: 'Vert',
                organigram: 'Organigramme',
                reverseTree: 'Arbre Inverse',
                reverseTreeclassroom: 'Arbre Inverse Classroom',
                english: 'Anglais',
                french: 'Français'
            }
        };
        this.translations.en.resetToolbarsPosition = 'Reset Toolbars';
        this.translations.en.toolbarsReset = 'Diagram toolbars moved to top left';
        this.translations.fr.resetToolbarsPosition = 'Replacer les toolbars';
        this.translations.fr.toolbarsReset = 'Les toolbars des diagrammes ont ete remises en haut a gauche';
        this.init();
    }
    init() {
        this.editModeManager.setLang(this.appConfig.language);
        this.createConfigModal();
        this.attachEventListeners();
    }
    setLang(lng) {
         this.appConfig.language=lng;
         this.updateModalTranslations()
    }
    translate(key) {
        const lang = this.appConfig.language || 'en';
        return this.translations[lang]?.[key] || this.translations['en'][key] || key;
    }
    createConfigModal() {
        const modal = document.createElement('div');
        modal.className = 'config-modal';
        modal.id = 'config-modal';
        modal.innerHTML = `
            <div class="config-modal-content">
                <div class="config-modal-header">
                    <h2>${this.translate('appConfiguration')}</h2>
                    <button class="config-modal-close" id="config-modal-close" title="${this.translate('cancel')}">&times;</button>
                </div>
                <div class="config-modal-body">
                    <div class="config-section">
                        <h3>${this.translate('displaySettings')}</h3>
                        <div class="form-group">
                            <label for="config-theme">${this.translate('displayTheme')}</label>
                            <select id="config-theme" name="theme">
                                <option value="light">${this.translate('light')}</option>
                                <option value="dark">${this.translate('dark')}</option>
                                <option value="blue">${this.translate('blue')}</option>
                                <option value="green">${this.translate('green')}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="config-diagram-mode">${this.translate('displayMode')}</label>
                            <select id="config-diagram-mode" name="diagram-mode">
                                <option value="organigram">${this.translate('organigram')}</option>
                                <option value="reverse-tree">${this.translate('reverseTree')}</option>
                                <option value="reverse-tree-classroom">${this.translate('reverseTreeclassroom')} Classroom</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="config-language">${this.translate('language')}</label>
                            <select id="config-language" name="language">
                                <option value="en">${this.translate('english')}</option>
                                <option value="fr">${this.translate('french')}</option>
                            </select>
                        </div>
                    </div>
                    <div class="config-columns">
                        <div class="config-section">
                            <h3>${this.translate('badgeSettings')}</h3>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-show-documents" name="show-documents" checked>
                                    ${this.translate('showDocumentsBadge')}
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-show-tasks" name="show-tasks" checked>
                                    ${this.translate('showTasksBadge')}
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-show-positions" name="show-positions" checked>
                                    ${this.translate('showPositionsBadge')}
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-show-abreviation" name="show-abreviation">
                                    ${this.translate('showAbreviationBadge')}
                                </label>
                            </div>
                        </div>
                        <div class="config-section config-section-general">
                            <h3>${this.translate('generalSettings')}</h3>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-auto-save" name="auto-save" checked>
                                    ${this.translate('autoSave')}
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-animations" name="animations" checked>
                                    ${this.translate('enableAnimations')}
                                </label>
                            </div>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" id="config-open-html-preview" name="open-html-preview" checked>
                                    ${this.translate('openHtmlPreviewInNewWindow')}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="config-actions config-actions-secondary">
                        <button type="button" class="btn btn-secondary" id="config-view-backups">${this.translate('viewBackups')}</button>
                        <button type="button" class="btn btn-secondary" id="config-reset-toolbars">${this.translate('resetToolbarsPosition')}</button>
                    </div>
                </div>
                <div class="config-modal-footer">
                    <div class="config-actions config-actions-footer">
                        <button type="button" class="btn btn-secondary" id="config-reset-default">${this.translate('resetDefaults')}</button>
                        <button type="button" class="btn btn-primary" id="config-save">${this.translate('save')}</button>
                        <button type="button" class="btn" id="config-apply">${this.translate('apply')}</button>
                    </div>
                </div>                
            </div>
        `;
        document.body.appendChild(modal);
    }
    updateModalTranslations() {
        const modal = document.getElementById('config-modal');
        if (!modal) return;
        const title = modal.querySelector('.config-modal-header h2');
        if (title) title.textContent = this.translate('appConfiguration');
        const closeBtn = modal.querySelector('.config-modal-close');
        if (closeBtn) closeBtn.title = this.translate('cancel');
        const sectionTitles = modal.querySelectorAll('.config-section h3');
        if (sectionTitles.length >= 3) {
            sectionTitles[0].textContent = this.translate('displaySettings');
            sectionTitles[1].textContent = this.translate('badgeSettings');
            sectionTitles[2].textContent = this.translate('generalSettings');
        }
        const themeLabel = modal.querySelector('label[for="config-theme"]');
        if (themeLabel) themeLabel.textContent = this.translate('displayTheme');
        const diagramModeLabel = modal.querySelector('label[for="config-diagram-mode"]');
        if (diagramModeLabel) diagramModeLabel.textContent = this.translate('displayMode');
        const languageLabel = modal.querySelector('label[for="config-language"]');
        if (languageLabel) languageLabel.textContent = this.translate('language');
        const themeOptions = modal.querySelectorAll('#config-theme option');
        const themeMap = { light: 'light', dark: 'dark', blue: 'blue', green: 'green' };
        themeOptions.forEach(option => {
            const translationKey = themeMap[option.value];
            if (translationKey) {
                option.textContent = this.translate(translationKey);
            }
        });
        const diagramOptions = modal.querySelectorAll('#config-diagram-mode option');
        const diagramMap = { organigram: 'organigram', 'reverse-tree': 'reverseTree', 'reverse-tree-classroom': 'reverseTreeclassroom' };
        diagramOptions.forEach(option => {
            const translationKey = diagramMap[option.value];
            if (translationKey) {
                option.textContent = this.translate(translationKey);
            }
        });
        const languageOptions = modal.querySelectorAll('#config-language option');
        const languageMap = { en: 'english', fr: 'french' };
        languageOptions.forEach(option => {
            const translationKey = languageMap[option.value];
            if (translationKey) {
                option.textContent = this.translate(translationKey);
            }
        });
        const badgeLabels = modal.querySelectorAll('.checkbox-group label');
        const badgeKeys = [
            'showDocumentsBadge',
            'showTasksBadge', 
            'showPositionsBadge',
            'showAbreviationBadge'
        ];
        badgeLabels.forEach((label, index) => {
            if (badgeKeys[index]) {
                const span = label.querySelector('span');
                const textNode = Array.from(label.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (span) {
                    span.textContent = this.translate(badgeKeys[index]);
                } else if (textNode && textNode.textContent.trim()) {
                    textNode.textContent = this.translate(badgeKeys[index]);
                }
            }
        });
        const generalCheckboxes = modal.querySelectorAll('.config-section-general .checkbox-group label');
        const generalKeys = ['autoSave', 'enableAnimations', 'openHtmlPreviewInNewWindow'];
        generalCheckboxes.forEach((label, index) => {
            if (generalKeys[index]) {
                const span = label.querySelector('span');
                const textNode = Array.from(label.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (span) {
                    span.textContent = this.translate(generalKeys[index]);
                } else if (textNode && textNode.textContent.trim()) {
                    textNode.textContent = this.translate(generalKeys[index]);
                }
            }
        });
        const viewBackupsButton = modal.querySelector('#config-view-backups');
        if (viewBackupsButton) viewBackupsButton.textContent = this.translate('viewBackups');
        const resetToolbarsButton = modal.querySelector('#config-reset-toolbars');
        if (resetToolbarsButton) resetToolbarsButton.textContent = this.translate('resetToolbarsPosition');
        const resetDefaultsButton = modal.querySelector('#config-reset-default');
        if (resetDefaultsButton) resetDefaultsButton.textContent = this.translate('resetDefaults');
        const saveButton = modal.querySelector('#config-save');
        if (saveButton) saveButton.textContent = this.translate('save');
        const applyButton = modal.querySelector('#config-apply');
        if (applyButton) applyButton.textContent = this.translate('apply');
    }
    attachEventListeners() {
        document.getElementById('config-modal-close').addEventListener('click', () => {
            this.closeConfigModal();
        });
        document.getElementById('config-modal').addEventListener('click', (e) => {
            if (e.target.id === 'config-modal') {
                this.closeConfigModal();
            }
        });
        document.getElementById('config-save').addEventListener('click', () => {
            this.saveConfig();
        });
        document.getElementById('config-apply').addEventListener('click', () => {
            this.applyConfig();
        });
        document.getElementById('config-reset-default').addEventListener('click', () => {
            this.resetConfigToDefaults();
        });
        document.getElementById('config-reset-toolbars')?.addEventListener('click', () => {
            this.resetDiagramToolbarsPosition();
        });
        document.getElementById('config-view-backups')?.addEventListener('click', () => {
            this.editModeManager.autoSaveManager.showBackupsModal();
        });
    }
    showConfigModal() {
        this.populateConfigForm();
        document.getElementById('config-modal').classList.add('active');
    }
    closeConfigModal() {
        document.getElementById('config-modal').classList.remove('active');
    }
    populateConfigForm() {
        document.getElementById('config-theme').value = this.appConfig.theme;
        document.getElementById('config-diagram-mode').value = this.appConfig.diagramMode;
        document.getElementById('config-language').value = this.appConfig.language;
        document.getElementById('config-show-documents').checked = this.appConfig.showBadges.documents;
        document.getElementById('config-show-tasks').checked = this.appConfig.showBadges.tasks;
        document.getElementById('config-show-positions').checked = this.appConfig.showBadges.positions;
        document.getElementById('config-show-abreviation').checked = this.appConfig.showBadges.abreviation;
        document.getElementById('config-auto-save').checked = this.appConfig.autoSave;
        document.getElementById('config-animations').checked = this.appConfig.animations;
        document.getElementById('config-open-html-preview').checked = this.appConfig.openHtmlPreviewInNewWindow;
    }
    saveConfig() {
        this.applyConfig();
        this.closeConfigModal();
        this.editModeManager.messageManager.showNotification(this.translate('configSaved'), 'success');
    }
    applyConfig() {
        const newConfig = {
            theme: document.getElementById('config-theme').value,
            diagramMode: document.getElementById('config-diagram-mode').value,
            language: document.getElementById('config-language').value,
            showBadges: {
                documents: document.getElementById('config-show-documents').checked,
                tasks: document.getElementById('config-show-tasks').checked,
                positions: document.getElementById('config-show-positions').checked,
                abreviation: document.getElementById('config-show-abreviation').checked
            },
            autoSave: document.getElementById('config-auto-save').checked,
            animations: document.getElementById('config-animations').checked,
            openHtmlPreviewInNewWindow: document.getElementById('config-open-html-preview').checked
        };
        this.appConfig = newConfig;
        this.applyConfigChanges(newConfig);
    }
    applyConfigChanges(config) {
        document.documentElement.setAttribute('data-theme', config.theme);
        this.editModeManager.setLang(config.language);
        if (this.editModeManager.diagramme && config.diagramMode !== this.editModeManager.currentDiagramMode) {
            this.editModeManager.diagramme.ShowMode(config.diagramMode);
            this.editModeManager.currentDiagramMode = config.diagramMode;
        }
        if (this.editModeManager.diagramme && this.editModeManager.diagramme.diagramme) {
            this.editModeManager.diagramme.diagramme.updateBadgeVisibility(config.showBadges);
            this.editModeManager.diagramme.diagramme.setAnimationEnabled(config.animations);
        }
        this.saveConfigToStorage();
    }
    resetConfigToDefaults() {
        this.appConfig = {
            theme: 'light',
            diagramMode: 'organigram',
            showBadges: {
                documents: false,
                tasks: false,
                positions: false,
                abreviation: true
            },
            language: 'en',
            autoSave: true,
            animations: true,
            openHtmlPreviewInNewWindow: false
        };
        this.populateConfigForm();
        this.applyConfigChanges(this.appConfig);
    }
    resetDiagramToolbarsPosition() {
        try {
            localStorage.removeItem('zoomPanelPosition');
        } catch (e) {
            console.warn('Unable to clear toolbar position from localStorage:', e);
        }
        document.querySelectorAll('.zoom-control-panel').forEach((panel) => {
            panel.style.position = 'absolute';
            panel.style.left = '20px';
            panel.style.top = '20px';
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';
        });
        this.editModeManager.messageManager?.showNotification(this.translate('toolbarsReset'), 'success');
    }
    saveConfigToStorage() {
        try {
            localStorage.setItem('organigram-config', JSON.stringify(this.appConfig));
        } catch (e) {
            console.warn('Unable to save config to localStorage:', e);
        }
    }
    loadConfigFromStorage() {
        try {
            const savedConfig = localStorage.getItem('organigram-config');
            if (savedConfig) {
                this.appConfig = {
                    ...this.appConfig,
                    ...JSON.parse(savedConfig)
                };
                this.applyConfigChanges(this.appConfig);
            }
        } catch (e) {
            console.warn('Unable to load config from localStorage:', e);
        }
    }
}
