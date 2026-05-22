class EditViewOrganisation {
    constructor(editModeManager) {
        this.editModeManager = editModeManager;
        this.xmlParser = editModeManager.xmlParser;
        this.lng = editModeManager.lng || 'en';
        this.modal = null;
        this.isOpen = false;
        this.pendingPasswordHash = null;
        this.pendingReadOnlyState = null;
        this.translations = {
            en: {
                title: 'Organisation',
                close: 'Close',
                save: 'Save',
                organisationName: 'Organisation',
                readOnly: 'Read only',
                language: 'Language',
                dateGeneration: 'Generation date',
                dateUpdate: 'Last update',
                code: 'Code',
                libelle: 'Label',
                description: 'Description',
                creator: 'Creator',
                saved: 'Organisation information updated',
                summary: 'Edit the XML organisation metadata visible in the root node.',
                readOnlyPasswordPrompt: 'Enter a password to lock this organisation chart.',
                readOnlyPasswordConfirm: 'Confirm the password.',
                readOnlyPasswordUnlock: 'Enter the password to unlock this organisation chart.',
                readOnlyPasswordRequired: 'A password is required to enable read-only mode.',
                readOnlyPasswordMismatch: 'The passwords do not match.',
                readOnlyPasswordInvalid: 'Incorrect password.',
                readOnlyPasswordMissing: 'This read-only document has no password configured.',
                readOnlyEnabled: 'Read-only protection enabled',
                readOnlyDisabled: 'Read-only protection disabled'
            },
            fr: {
                title: 'Organisation',
                close: 'Fermer',
                save: 'Enregistrer',
                organisationName: 'Organisation',
                readOnly: 'Lecture seule',
                language: 'Langue',
                dateGeneration: 'Date de generation',
                dateUpdate: 'Derniere modification',
                code: 'Code',
                libelle: 'Libelle',
                description: 'Description',
                creator: 'Createur',
                saved: 'Les informations de l organisation ont ete mises a jour',
                summary: 'Modifiez les metadonnees XML de l organisation presentes sur le noeud racine.',
                readOnlyPasswordPrompt: 'Saisissez un mot de passe pour verrouiller cet organigramme.',
                readOnlyPasswordConfirm: 'Confirmez le mot de passe.',
                readOnlyPasswordUnlock: 'Saisissez le mot de passe pour deverrouiller cet organigramme.',
                readOnlyPasswordRequired: 'Un mot de passe est obligatoire pour activer la lecture seule.',
                readOnlyPasswordMismatch: 'Les mots de passe ne correspondent pas.',
                readOnlyPasswordInvalid: 'Mot de passe incorrect.',
                readOnlyPasswordMissing: 'Aucun mot de passe n est configure pour ce document en lecture seule.',
                readOnlyEnabled: 'Protection en lecture seule activee',
                readOnlyDisabled: 'Protection en lecture seule desactivee'
            }
        };
        this.init();
    }
    translate(key) {
        return this.translations[this.lng]?.[key] || this.translations.en[key] || key;
    }
    setLang(lng) {
        this.lng = lng || 'en';
        this.updateTranslations();
    }
    init() {
        this.createModal();
    }
    createModal() {
        const existingModal = document.getElementById('edit-view-organisation-modal');
        if (existingModal) {
            existingModal.remove();
        }
        this.modal = document.createElement('div');
        this.modal.id = 'edit-view-organisation-modal';
        this.modal.className = 'edit-view-modal';
        this.modal.innerHTML = `
            <div class="edit-view-content edit-view-content-organisation">
                <div class="edit-view-header">
                    <h2>${this.translate('title')}</h2>
                    <button class="edit-view-close" id="edit-view-organisation-close" title="${this.translate('close')}">&times;</button>
                </div>
                <div class="edit-view-organisation-body">
                    <!--p class="edit-view-organisation-summary">${this.translate('summary')}</p-->
                    <div class="edit-view-organisation-grid">
                        <div class="edit-view-organisation-row edit-view-field-full">
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-name">${this.translate('organisationName')}</label>
                                <input id="edit-view-organisation-name" class="edit-view-search-input edit-view-organisation-input" type="text">
                            </div>
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-createur">${this.translate('creator')}</label>
                                <input id="edit-view-organisation-createur" class="edit-view-search-input edit-view-organisation-input" type="text">
                            </div>
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-code">${this.translate('code')}</label>
                                <input id="edit-view-organisation-code" class="edit-view-search-input edit-view-organisation-input" type="text">
                            </div>
                        </div>
                        <div class="edit-view-organisation-row edit-view-organisation-row-meta edit-view-field-full">
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-dateGeneration">${this.translate('dateGeneration')}</label>
                                <input id="edit-view-organisation-dateGeneration" class="edit-view-search-input edit-view-organisation-input edit-view-organisation-input-readonly" type="text" readonly>
                            </div>
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-dateUpdate">${this.translate('dateUpdate')}</label>
                                <input id="edit-view-organisation-dateUpdate" class="edit-view-search-input edit-view-organisation-input edit-view-organisation-input-readonly" type="text" readonly>
                            </div>
                            <div class="edit-view-field edit-view-field-checkbox">
                                <span class="edit-view-field-label-spacer" aria-hidden="true"></span>
                                <label class="edit-view-organisation-checkbox-label">
                                    <input id="edit-view-organisation-readOnly" type="checkbox">
                                    <span>${this.translate('readOnly')}</span>
                                </label>
                            </div>
                        </div>
                        <div class="edit-view-organisation-row edit-view-organisation-row-language-label edit-view-field-full">
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-language">${this.translate('language')}</label>
                                <select id="edit-view-organisation-language" class="edit-view-filter-select">
                                    <option value="en">English</option>
                                    <option value="fr">Francais</option>
                                </select>
                            </div>
                            <div class="edit-view-field">
                                <label for="edit-view-organisation-libelle">${this.translate('libelle')}</label>
                                <input id="edit-view-organisation-libelle" class="edit-view-search-input edit-view-organisation-input" type="text">
                            </div>
                        </div>
                        <div class="edit-view-field edit-view-field-full">
                            <label for="edit-view-organisation-description">${this.translate('description')}</label>
                            <textarea id="edit-view-organisation-description" class="edit-view-organisation-textarea"></textarea>
                        </div>
                    </div>
                </div>
                <div class="edit-view-organisation-footer">
                    <button class="edit-view-btn" id="edit-view-organisation-cancel">${this.translate('close')}</button>
                    <button class="edit-view-btn edit-view-btn-primary" id="edit-view-organisation-save">${this.translate('save')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
        this.attachEventListeners();
    }
    attachEventListeners() {
        const close = () => this.close();
        this.modal.querySelector('#edit-view-organisation-close')?.addEventListener('click', close);
        this.modal.querySelector('#edit-view-organisation-cancel')?.addEventListener('click', close);
        this.modal.querySelector('#edit-view-organisation-save')?.addEventListener('click', () => this.save());
        this.modal.querySelector('#edit-view-organisation-readOnly')?.addEventListener('change', (event) => {
            this.handleReadOnlyToggle(event);
        });
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                close();
            }
        });
    }
    populateForm() {
        const info = this.xmlParser.getOrganisationInfo();
        this.pendingPasswordHash = info.passwordHash || '';
        this.pendingReadOnlyState = Boolean(info.readOnly);
        this.modal.querySelector('#edit-view-organisation-name').value = info.name || '';
        this.modal.querySelector('#edit-view-organisation-language').value = info.language || 'en';
        this.modal.querySelector('#edit-view-organisation-dateGeneration').value = this.formatDateTime(info.dateGeneration);
        this.modal.querySelector('#edit-view-organisation-dateUpdate').value = this.formatDateTime(info.dateUpdate);
        this.modal.querySelector('#edit-view-organisation-readOnly').checked = Boolean(info.readOnly);
        this.modal.querySelector('#edit-view-organisation-code').value = info.code || '';
        this.modal.querySelector('#edit-view-organisation-createur').value = info.createur || '';
        this.modal.querySelector('#edit-view-organisation-libelle').value = info.libelle || '';
        this.modal.querySelector('#edit-view-organisation-description').value = info.Description || '';
        this.updateEditableState(!info.readOnly);
    }
    formatDateTime(value) {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return value;
        }
        const locale = this.lng === 'fr' ? 'fr-FR' : 'en-GB';
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    }
    async hashPassword(password) {
        const value = String(password || '');
        const data = new TextEncoder().encode(value);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest))
            .map((byte) => byte.toString(16).padStart(2, '0'))
            .join('');
    }
    updateEditableState(isEditable) {
        const selectors = [
            '#edit-view-organisation-name',
            '#edit-view-organisation-language',
            '#edit-view-organisation-code',
            '#edit-view-organisation-createur',
            '#edit-view-organisation-libelle',
            '#edit-view-organisation-description'
        ];
        selectors.forEach((selector) => {
            const field = this.modal?.querySelector(selector);
            if (field) {
                field.disabled = !isEditable;
            }
        });
    }
    async handleReadOnlyToggle(event) {
        const checkbox = event.target;
        const currentInfo = this.xmlParser.getOrganisationInfo();
        const wantsReadOnly = checkbox.checked;
        const prompt = async (message) => this.editModeManager.messageManager.showPrompt(
            message,
            this.translate('title'),
            '',
            { type: 'password' }
        );
        if (wantsReadOnly === Boolean(currentInfo.readOnly)) {
            this.pendingReadOnlyState = wantsReadOnly;
            this.updateEditableState(!wantsReadOnly);
            return;
        }
        if (wantsReadOnly) {
            const password = await prompt(this.translate('readOnlyPasswordPrompt'));
            if (password === null) {
                checkbox.checked = false;
                return;
            }
            if (!password) {
                this.editModeManager.showNotification(this.translate('readOnlyPasswordRequired'), 'warning');
                checkbox.checked = false;
                return;
            }
            const confirmation = await prompt(this.translate('readOnlyPasswordConfirm'));
            if (confirmation === null) {
                checkbox.checked = false;
                return;
            }
            if (password !== confirmation) {
                this.editModeManager.showNotification(this.translate('readOnlyPasswordMismatch'), 'error');
                checkbox.checked = false;
                return;
            }
            this.pendingPasswordHash = await this.hashPassword(password);
            this.pendingReadOnlyState = true;
            this.updateEditableState(false);
            return;
        }
        if (!currentInfo.passwordHash) {
            this.pendingPasswordHash = '';
            this.pendingReadOnlyState = false;
            this.updateEditableState(true);
            this.editModeManager.showNotification(this.translate('readOnlyPasswordMissing'), 'warning');
            return;
        }
        const password = await prompt(this.translate('readOnlyPasswordUnlock'));
        if (password === null) {
            checkbox.checked = true;
            return;
        }
        const passwordHash = await this.hashPassword(password);
        if (passwordHash !== currentInfo.passwordHash) {
            this.editModeManager.showNotification(this.translate('readOnlyPasswordInvalid'), 'error');
            checkbox.checked = true;
            return;
        }
        this.pendingPasswordHash = '';
        this.pendingReadOnlyState = false;
        this.updateEditableState(true);
    }
    collectFormData() {
        return {
            name: this.modal.querySelector('#edit-view-organisation-name').value.trim(),
            language: this.modal.querySelector('#edit-view-organisation-language').value,
            readOnly: this.modal.querySelector('#edit-view-organisation-readOnly').checked,
            passwordHash: this.pendingPasswordHash || '',
            code: this.modal.querySelector('#edit-view-organisation-code').value.trim(),
            createur: this.modal.querySelector('#edit-view-organisation-createur').value.trim(),
            libelle: this.modal.querySelector('#edit-view-organisation-libelle').value.trim(),
            Description: this.modal.querySelector('#edit-view-organisation-description').value.trim()
        };
    }
    save() {
        const currentInfo = this.xmlParser.getOrganisationInfo();
        const data = this.collectFormData();
        const success = this.xmlParser.updateOrganisationInfo(
            data,
            { force: currentInfo.readOnly || data.readOnly }
        );
        if (!success) {
            return;
        }
        this.editModeManager.setLang(data.language || this.lng);
        const message = data.readOnly
            ? this.translate('readOnlyEnabled')
            : (currentInfo.readOnly && !data.readOnly ? this.translate('readOnlyDisabled') : this.translate('saved'));
        this.editModeManager.showNotification(message, 'success');
        this.close();
    }
    open() {
        this.populateForm();
        this.modal.classList.add('active');
        this.isOpen = true;
    }
    close() {
        this.modal.classList.remove('active');
        this.isOpen = false;
        this.pendingPasswordHash = null;
        this.pendingReadOnlyState = null;
    }
    updateTranslations() {
        if (!this.modal) return;
        const title = this.modal.querySelector('.edit-view-header h2');
        if (title) title.textContent = this.translate('title');
        const closeBtn = this.modal.querySelector('#edit-view-organisation-close');
        if (closeBtn) closeBtn.title = this.translate('close');
        const summary = this.modal.querySelector('.edit-view-organisation-summary');
        if (summary) summary.textContent = this.translate('summary');
        const labels = {
            '#edit-view-organisation-name': 'organisationName',
            '#edit-view-organisation-language': 'language',
            '#edit-view-organisation-dateGeneration': 'dateGeneration',
            '#edit-view-organisation-dateUpdate': 'dateUpdate',
            '#edit-view-organisation-readOnly': 'readOnly',
            '#edit-view-organisation-code': 'code',
            '#edit-view-organisation-createur': 'creator',
            '#edit-view-organisation-libelle': 'libelle',
            '#edit-view-organisation-description': 'description'
        };
        Object.entries(labels).forEach(([selector, key]) => {
            const label = this.modal.querySelector(`label[for="${selector.replace('#', '')}"]`);
            if (label) label.textContent = this.translate(key);
        });
        const readOnlySpan = this.modal.querySelector('.edit-view-organisation-checkbox-label span');
        if (readOnlySpan) {
            readOnlySpan.textContent = this.translate('readOnly');
        }
        const cancelBtn = this.modal.querySelector('#edit-view-organisation-cancel');
        if (cancelBtn) cancelBtn.textContent = this.translate('close');
        const saveBtn = this.modal.querySelector('#edit-view-organisation-save');
        if (saveBtn) saveBtn.textContent = this.translate('save');
        if (this.isOpen) {
            this.populateForm();
        }
    }
}
