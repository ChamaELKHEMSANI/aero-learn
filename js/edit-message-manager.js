class EditMessageManager {
    constructor( lng) {
        this.lng = lng;
        this.confirmCallback = null;
        this.currentDeleteNode = null;
        this.onConfirmCallback = null;
        this.alertCallback = null; 
        this.promptCallback = null;
        this.translations = {
            en: {
                confirmDelete: "Confirm Deletion",
                confirmDeleteMessage: "Are you sure you want to delete department \"{name}\"? This action cannot be undone.",
                confirmDeleteWithChildren: "Department \"{name}\" has {count} child department(s). Deleting it will also delete all children. Are you sure?",
                cancel: "Cancel",
                delete: "Delete",
                deleteDepartment: "Delete Department",
                departmentDeleted: "Department deleted successfully",
                success: "Success",
                error: "Error",
                warning: "Warning",
                ok: "OK", 
                information: "Information",
                submit: "Submit"
            },
            fr: {
                confirmDelete: "Confirmer la Suppression",
                confirmDeleteMessage: "Êtes-vous sûr de vouloir supprimer le département \"{name}\" ? Cette action est irréversible.",
                confirmDeleteWithChildren: "Le département \"{name}\" a {count} sous-département(s). Le supprimer supprimera également tous les enfants. Êtes-vous sûr ?",
                cancel: "Annuler",
                delete: "Supprimer",
                deleteDepartment: "Supprimer le Département",
                departmentDeleted: "Département supprimé avec succès",
                success: "Succès",
                error: "Erreur",
                warning: "Attention",
                ok: "OK",  
                information: "Information",
                submit: "Valider"  
           }
        };
        this.init();
    }
    setLang(lng) {
        this.lng = lng;
    }
    translate(key, params = {}) {
        let text = this.translations[this.lng]?.[key] || this.translations['en'][key] || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }
    init() {
        this.createNotificationModal();
        this.createConfirmModal();
        this.createPromptModal();
    }
    createNotificationModal() {
        let modal = document.getElementById('professional-notification');
        if (modal) return;
        modal = document.createElement('div');
        modal.id = 'professional-notification';
        modal.className = 'notification-modal';
        document.body.appendChild(modal);
    }
    createConfirmModal() {
        let modal = document.getElementById('professional-confirm-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'professional-confirm-modal';
            modal.className = 'confirm-modal-overlay';
            modal.innerHTML = `
                <div class="confirm-modal">
                    <div class="confirm-modal-header">
                        <div class="confirm-modal-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="confirm-modal-title" id="confirm-modal-title"></h3>
                        <button class="confirm-modal-close">&times;</button>
                    </div>
                    <div class="confirm-modal-body">
                        <p id="confirm-modal-message"></p>
                    </div>
                    <div class="confirm-modal-actions">
                        <button class="btn btn-secondary" id="confirm-modal-cancel">${this.translate('cancel')}</button>
                        <button class="btn btn-primary" id="confirm-modal-ok">${this.translate('ok')}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            this.attachConfirmModalListeners();
        }
    }
    attachConfirmModalListeners() {
        const modal = document.getElementById('professional-confirm-modal');
        modal.querySelector('.confirm-modal-close').addEventListener('click', () => {
            this.closeConfirmModal(false);
        });
        modal.querySelector('#confirm-modal-cancel').addEventListener('click', () => {
            this.closeConfirmModal(false);
        });
        modal.querySelector('#confirm-modal-ok').addEventListener('click', () => {
            this.closeConfirmModal(true);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeConfirmModal(false);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeConfirmModal(false);
            }
        });
    }
    showConfirm(message, title ) {
        return   new Promise((resolve) => {
            this.showConfirmModal(message, title, resolve);
        });
    }
    showConfirmModal(message, title = '', callback) {
        let modal = document.getElementById('professional-confirm-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'professional-confirm-modal';
            modal.className = 'confirm-modal-overlay';
            modal.innerHTML = `
                <div class="confirm-modal">
                    <div class="confirm-modal-header">
                        <div class="confirm-modal-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="confirm-modal-title" id="confirm-modal-title"></h3>
                        <button class="confirm-modal-close">&times;</button>
                    </div>
                    <div class="confirm-modal-body">
                        <p id="confirm-modal-message"></p>
                    </div>
                    <div class="confirm-modal-actions">
                        <button class="btn btn-secondary" id="confirm-modal-cancel">${this.translate('cancel')}</button>
                        <button class="btn btn-primary" id="confirm-modal-ok">${this.translate('ok')}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            modal.querySelector('.confirm-modal-close').addEventListener('click', () => {
                this.closeConfirmModal(false);
            });
            modal.querySelector('#confirm-modal-cancel').addEventListener('click', () => {
                this.closeConfirmModal(false);
            });
            modal.querySelector('#confirm-modal-ok').addEventListener('click', () => {
                this.closeConfirmModal(true);
            });
             modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeConfirmModal(false);
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    this.closeConfirmModal(false);
                }
            });
        }
        document.getElementById('confirm-modal-title').textContent = title;
        document.getElementById('confirm-modal-message').textContent = message;
        this.confirmCallback = callback;
        modal.style.display = 'flex';
        setTimeout(() => {
            document.getElementById('confirm-modal-ok').focus();
        }, 100);
    }
    closeConfirmModal(result) {
        const modal = document.getElementById('professional-confirm-modal');
        if (modal) {
            modal.style.display = 'none';
            if (this.confirmCallback) {
                this.confirmCallback(result);
                this.confirmCallback = null;
            }
        }
    }
   showNotification(message, type = 'info',temporisation=2) {
        const existingNotification = document.getElementById('professional-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        const notificationModal = document.createElement('div');
        notificationModal.id = 'professional-notification';
        notificationModal.className = 'notification-modal';
        let icon = '';
        let title = '';
        let bgColor = '';
        let iconColor = '';
        switch(type) {
            case 'success':
                icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>`;
                title = this.translate('success');
                bgColor = 'var(--notification-success-bg, #d1fae5)';
                iconColor = 'var(--notification-success-icon, #059669)';
                break;
            case 'error':
                icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                </svg>`;
                title = this.translate('error');
                bgColor = 'var(--notification-error-bg, #fee2e2)';
                iconColor = 'var(--notification-error-icon, #dc2626)';
                break;
            case 'warning':
                icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>`;
                title = this.translate('warning');
                bgColor = 'var(--notification-warning-bg, #fef3c7)';
                iconColor = 'var(--notification-warning-icon, #d97706)';
                break;
            default: 
                icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>`;
                title = this.translate('information');
                bgColor = 'var(--notification-info-bg, #dbeafe)';
                iconColor = 'var(--notification-info-icon, #2563eb)';
                break;
        }
        notificationModal.innerHTML = `
            <div class="notification-content" style="background: ${bgColor}; border-left: 4px solid ${iconColor};">
                <div class="notification-header">
                    <div class="notification-icon" style="color: ${iconColor};">
                        ${icon}
                    </div>
                    <div class="notification-title">${title}</div>
                    <button class="notification-close">&times;</button>
                </div>
                <div class="notification-body">${message}</div>
                <div class="notification-progress" style="background: ${iconColor};"></div>
            </div>
        `;
        document.body.appendChild(notificationModal);
        setTimeout(() => {
            notificationModal.classList.add('show');
        }, 10);
        const autoCloseTimer = setTimeout(() => {
            this.closeNotification();
        }, temporisation*1000);
        const progressBar = notificationModal.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = 'width ${temporisation}s linear';
            setTimeout(() => {
                progressBar.style.width = '0%';
            }, 10);
        }
        const closeBtn = notificationModal.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                clearTimeout(autoCloseTimer);
                this.closeNotification();
            });
        }
        notificationModal.addEventListener('click', (e) => {
            if (e.target === notificationModal) {
                clearTimeout(autoCloseTimer);
                this.closeNotification();
            }
        });
    }
    closeNotification() {
        const notification = document.getElementById('professional-notification');
        if (notification) {
            notification.classList.remove('show');
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
        createConfirmDialog() {
        if (document.getElementById('confirm-dialog')) {
            return;
        }
        const dialog = document.createElement('div');
        dialog.className = 'confirm-dialog';
        dialog.id = 'confirm-dialog';
        dialog.innerHTML = `
            <div class="confirm-dialog-content">
                <div class="confirm-dialog-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 id="confirm-title">${this.translate('confirmDelete')}</h3>
                <p id="confirm-message"></p>
                <div class="confirm-dialog-actions">
                    <button class="btn btn-secondary" id="confirm-cancel">${this.translate('cancel')}</button>
                    <button class="btn btn-danger" id="confirm-delete">${this.translate('delete')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(dialog);
        this.attachConfirmDialogEvents();
    }
    attachConfirmDialogEvents() {
        const dialog = document.getElementById('confirm-dialog');
        if (!dialog) return;
        document.getElementById('confirm-cancel').addEventListener('click', () => {
            this.closeConfirmDialog();
        });
        document.getElementById('confirm-delete').addEventListener('click', () => {
            this.confirmDelete();
        });
        dialog.addEventListener('click', (e) => {
            if (e.target.id === 'confirm-dialog') {
                this.closeConfirmDialog();
            }
        });
    }
    showConfirmDialog(departmentName, childCount, node, onConfirmCallback, onNodeSetCallback) {
        this.createConfirmDialog();
        this.onConfirmCallback = onConfirmCallback;
        this.currentDeleteNode = node;
        if (onNodeSetCallback) {
            onNodeSetCallback(node);
        }
        let message;
        if (childCount > 0) {
            message = this.translate('confirmDeleteWithChildren', {
                name: departmentName,
                count: childCount
            });
        } else {
            message = this.translate('confirmDeleteMessage', {
                name: departmentName
            });
        }
        document.getElementById('confirm-message').textContent = message;
        document.getElementById('confirm-dialog').classList.add('active');
    }
    closeConfirmDialog() {
        const dialog = document.getElementById('confirm-dialog');
        if (dialog) {
            dialog.classList.remove('active');
            this.currentDeleteNode = null;
            this.onConfirmCallback = null;
        }
    }
    confirmDelete() {
        if (this.currentDeleteNode && this.onConfirmCallback) {
            this.onConfirmCallback();
            this.closeConfirmDialog();
        }
    }  
    showAlert(message, title = this.translate('information')) {
        return new Promise((resolve) => {
            const modal = this.createAlertModal();
            this.showAlertModal(message, title, modal, resolve);
        });
    }
    createAlertModal() {
        let modal = document.getElementById('professional-alert-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'professional-alert-modal';
            modal.className = 'alert-modal-overlay';
            modal.style.display = 'none';
            modal.innerHTML = `
                <div class="alert-modal">
                    <div class="alert-modal-header">
                        <div class="alert-modal-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="alert-modal-title" id="alert-modal-title"></h3>
                    </div>
                    <div class="alert-modal-body">
                        <p id="alert-modal-message"></p>
                    </div>
                    <div class="alert-modal-actions">
                        <button class="btn btn-primary" id="alert-modal-ok">${this.translate('ok')}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            this.attachAlertModalListeners(modal);
        }
        return modal;
    }
    attachAlertModalListeners(modal) {
        const okButton = modal.querySelector('#alert-modal-ok');
        okButton.addEventListener('click', () => {
            this.closeAlertModal(modal);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeAlertModal(modal);
            }
        });
    }
    showAlertModal(message, title, modal, callback) {
        modal.querySelector('#alert-modal-title').textContent = title;
        modal.querySelector('#alert-modal-message').textContent = message;
        this.alertCallback = callback;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.querySelector('#alert-modal-ok').focus();
        }, 100);
    }
    closeAlertModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            if (this.alertCallback) {
                this.alertCallback(true);
                this.alertCallback = null;
            }
        }
    }
    showPrompt(message, title = this.translate('information'), defaultValue = '', options = {}) {
        return new Promise((resolve) => {
            const modal = this.createPromptModal();
            this.showPromptModal(message, title, defaultValue, options, modal, resolve);
        });
    }
    createPromptModal() {
        let modal = document.getElementById('professional-prompt-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'professional-prompt-modal';
            modal.className = 'alert-modal-overlay prompt-modal-overlay';
            modal.style.display = 'none';
            modal.style.position = 'fixed';
            modal.style.inset = '0';
            modal.style.background = 'rgba(0, 0, 0, 0.6)';
            modal.style.backdropFilter = 'blur(8px)';
            modal.style.webkitBackdropFilter = 'blur(8px)';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '4000';
            modal.innerHTML = `
                <div class="alert-modal prompt-modal">
                    <div class="alert-modal-header">
                        <div class="alert-modal-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M12 2.25A9.75 9.75 0 1021.75 12 9.75 9.75 0 0012 2.25zm0 14.25a.75.75 0 110 1.5.75.75 0 010-1.5zm1.02-8.44l-.32 5a.75.75 0 01-1.5 0l-.32-5a1.14 1.14 0 112.14 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <h3 class="alert-modal-title" id="prompt-modal-title"></h3>
                    </div>
                    <div class="alert-modal-body">
                        <p id="prompt-modal-message"></p>
                        <input id="prompt-modal-input" class="edit-view-search-input edit-view-organisation-input" type="text" autocomplete="off">
                    </div>
                    <div class="alert-modal-actions">
                        <button class="btn btn-secondary" id="prompt-modal-cancel">${this.translate('cancel')}</button>
                        <button class="btn btn-primary" id="prompt-modal-ok">${this.translate('submit')}</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const promptBox = modal.querySelector('.prompt-modal');
            if (promptBox) {
                promptBox.style.width = 'min(480px, calc(100vw - 32px))';
                promptBox.style.background = 'var(--bg-secondary, #ffffff)';
                promptBox.style.border = '1px solid var(--border-color, rgba(148, 163, 184, 0.35))';
                promptBox.style.borderRadius = 'var(--radius-xl, 20px)';
                promptBox.style.boxShadow = 'var(--shadow-xl, 0 24px 48px rgba(15, 23, 42, 0.28))';
                promptBox.style.overflow = 'hidden';
            }
            const promptHeader = modal.querySelector('.prompt-modal .alert-modal-header');
            if (promptHeader) {
                promptHeader.style.padding = '24px 24px 0';
            }
            const promptBody = modal.querySelector('.prompt-modal .alert-modal-body');
            if (promptBody) {
                promptBody.style.padding = '24px';
                promptBody.style.display = 'flex';
                promptBody.style.flexDirection = 'column';
                promptBody.style.gap = '16px';
            }
            const promptInput = modal.querySelector('#prompt-modal-input');
            if (promptInput) {
                promptInput.style.width = '100%';
                promptInput.style.boxSizing = 'border-box';
            }
            const promptActions = modal.querySelector('.prompt-modal .alert-modal-actions');
            if (promptActions) {
                promptActions.style.padding = '0 24px 24px';
            }
            this.attachPromptModalListeners(modal);
        }
        return modal;
    }
    attachPromptModalListeners(modal) {
        const okButton = modal.querySelector('#prompt-modal-ok');
        const cancelButton = modal.querySelector('#prompt-modal-cancel');
        const input = modal.querySelector('#prompt-modal-input');
        okButton.addEventListener('click', () => {
            this.closePromptModal(modal, input.value);
        });
        cancelButton.addEventListener('click', () => {
            this.closePromptModal(modal, null);
        });
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePromptModal(modal, null);
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.closePromptModal(modal, input.value);
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closePromptModal(modal, null);
            }
        });
    }
    showPromptModal(message, title, defaultValue, options, modal, callback) {
        const input = modal.querySelector('#prompt-modal-input');
        const titleElement = modal.querySelector('#prompt-modal-title');
        const messageElement = modal.querySelector('#prompt-modal-message');
        const okButton = modal.querySelector('#prompt-modal-ok');
        const cancelButton = modal.querySelector('#prompt-modal-cancel');
        titleElement.textContent = title;
        messageElement.textContent = message;
        input.value = defaultValue ?? '';
        input.type = options.type || 'text';
        input.placeholder = options.placeholder || '';
        input.autocomplete = options.autocomplete || 'off';
        okButton.textContent = options.submitLabel || this.translate('submit');
        cancelButton.textContent = options.cancelLabel || this.translate('cancel');
        this.promptCallback = callback;
        modal.style.display = 'flex';
        setTimeout(() => {
            input.focus();
            input.select();
        }, 100);
    }
    closePromptModal(modal, result) {
        if (modal) {
            modal.style.display = 'none';
        }
        if (this.promptCallback) {
            this.promptCallback(result);
            this.promptCallback = null;
        }
    }
}
