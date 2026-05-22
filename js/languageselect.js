class LanguageSelect {
    constructor(xmlParser) {
        this.lng = 'en';
        this.App = null;
        this.xmlParser = xmlParser;
        this.translations = {
            fr: {
                fr: "Français",
                en: "Anglais",
                langueSelect: "Sélection de la langue"
            },
            en: {
                fr: "French",
                en: "English",
                langueSelect: "Language selection"
            }
        };
    }
    initialize(lng, App) {
        this.lng = lng || 'fr';
        this.App = App;
        this.init(lng);
        this.setupSelectEventListener();
        this.applyLanguage(lng);
    }
    setLang(lng) {
        this.lng = lng || 'fr';
        this.updateLangOptions();
        this.applyLanguage(lng);
    }
    applyLanguage(lng) {
        this.lng = lng || 'fr';
        this.notifyLanguageChange(lng);
        this.updateLangOptions();
        if(this.App)
            this.App.setLang(lng);
    }
    notifyLanguageChange(lng) {
        const event = new CustomEvent('languageChanged', {
            detail: { language: lng }
        });
        document.dispatchEvent(event);
        if (this.diagramme && typeof this.diagramme.setLang === 'function') {
            this.diagramme.setLang(lng);
        }
        const themeSelect = document.getElementById('show_themes_select');
        const modeSelect = document.getElementById('show_mode_select');
        if (themeSelect) {
            const themeSelectComponent = window.themeSelect;
            if (themeSelectComponent && typeof themeSelectComponent.setLang === 'function') {
                themeSelectComponent.setLang(lng);
            }
        }
        if (modeSelect) {
            const modeSelectComponent = window.modeSelector;
            if (modeSelectComponent && typeof modeSelectComponent.setLang === 'function') {
                modeSelectComponent.setLang(lng);
            }
        }
    }
    updateLangOptions() {
        const select = document.getElementById('show_languages_select');
        if (!select) return;
        const currentValue = select.value;
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            const languageValue = option.value;
            if (this.translations[this.lng] && this.translations[this.lng][languageValue]) {
                option.textContent = this.translations[this.lng][languageValue];
            }
        });
        select.value = currentValue;
        select.title = this.translate('langueSelect');
    }
    translate(key) {
        if (this.translations[this.lng] && this.translations[this.lng][key]) {
            return this.translations[this.lng][key];
        }
        return key;
    }
    init(savedLang) {
        const container = document.getElementById('show_languages');
        if (!container) return;
        container.innerHTML = `
            <div class="language-select-container">
                <select class="theme-select" id="show_languages_select" title="${this.translate('langueSelect')}">
                    <option value="fr">${this.translate('fr')}</option>
                    <option value="en">${this.translate('en')}</option>
                </select>
            </div>
        `;
        const select = document.getElementById('show_languages_select');
        if (select) {
            const languageToApply = savedLang || 'fr';
            select.value = languageToApply;
        }
    }
    setupSelectEventListener() {
        document.body.addEventListener('change', (e) => {
            if (e.target && e.target.id === 'show_languages_select') {
                const selectedLang = e.target.value;
                if (selectedLang) {
                    this.applyLanguage(selectedLang);
                }
            }
        });
    }
}