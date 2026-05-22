class ThemeSelect {
    constructor(xmlParser) {
        this.lng = 'en';
        this.diagramme = null;
        this.xmlParser = xmlParser;
        this.translations = {
            fr: {
                light: "Clair",
                dark: "Sombre",
                blue: "Bleu",
                green: "Vert",
                themeSelect: "Sélection du thème"
            },
            en: {
                light: "Light",
                dark: "Dark",
                blue: "Blue",
                green: "Green",
                themeSelect: "Theme selection"
            }
        };
    }
    initialize(lng, diagramme, savedTheme) {
        this.lng = lng || 'fr';
        this.diagramme = diagramme;
        this.init(savedTheme);
        this.setupSelectEventListener();
    }
    setLang(lng) {
        this.lng = lng || 'fr';
        this.updateThemeOptions();
    }
    updateThemeOptions() {
        const select = document.getElementById('show_themes_select');
        if (!select) return;
        const currentValue = select.value;
        const options = select.querySelectorAll('option');
        options.forEach(option => {
            const themeValue = option.value;
            if (this.translations[this.lng] && this.translations[this.lng][themeValue]) {
                option.textContent = this.translations[this.lng][themeValue];
            }
        });
        select.value = currentValue;
        const label = document.querySelector('label[for="show_themes_select"]');
        if (label && this.translations[this.lng] && this.translations[this.lng]['themeSelect']) {
            label.textContent = this.translations[this.lng]['themeSelect'];
        }
    }
    translate(key) {
        if (this.translations[this.lng] && this.translations[this.lng][key]) {
            return this.translations[this.lng][key];
        }
        return key;
    }
    init(savedTheme) {
        const container = document.getElementById('show_themes');
        if (!container) return;
        container.innerHTML = `
            <div class="theme-select-container with-icon">
                <select class="theme-select" id="show_themes_select" title="${this.translate('themeSelect')}">
                    <option value="light">${this.translate('light')}</option>
                    <option value="dark">${this.translate('dark')}</option>
                    <option value="blue">${this.translate('blue')}</option>
                    <option value="green">${this.translate('green')}</option>
                </select>
            </div>
        `;
        const select = document.getElementById('show_themes_select');
        if (select) {
            const themeToApply = savedTheme || 'light';
            select.value = themeToApply;
            document.documentElement.setAttribute('data-theme', themeToApply);
            localStorage.setItem('preferred-theme', themeToApply);
        }
    }
    setupSelectEventListener() {
        document.body.addEventListener('change', (e) => {
            if (e.target && e.target.id === 'show_themes_select') {
                const selectedTheme = e.target.value;
                if (selectedTheme) {
                    document.documentElement.setAttribute('data-theme', selectedTheme);
                    localStorage.setItem('preferred-theme', selectedTheme);
                    const event = new CustomEvent('themeChanged', {
                        detail: { theme: selectedTheme }
                    });
                    document.dispatchEvent(event);
                }
            }
        });
    }
}
