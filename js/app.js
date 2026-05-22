class App {
    constructor(xmlParser, diagramme, querySelect, querySearchSimple,querySearchAdvanced,  queryDetails, qcmGenerator, themeSelect, languageSelect, savedTheme, lng, libelle_fr, libelle_en, display_mode) {
        this.xmlParser = xmlParser;
        this.diagramme = diagramme;
        this.querySelect = querySelect;
        this.querySearchSimple = querySearchSimple;
        this.querySearchAdvanced = querySearchAdvanced;
        this.qcmGenerator = qcmGenerator;
        this.themeSelect = themeSelect;
        this.languageSelect = languageSelect;
        this.savedTheme = savedTheme;
        this.lng = lng;
        this.queryDetails = queryDetails;
        this.libelle_fr = libelle_fr;
        this.libelle_en = libelle_en;
        this.display_mode = display_mode;
        window.app = this;
        this.init();
    }
    setLang(lng) {
        this.lng = lng;
        const h1_titre = document.getElementById('toolbar_main_h1');
        if (h1_titre) {
            if (lng == 'en')
                h1_titre.innerText = this.libelle_fr;
            else
                h1_titre.innerText = this.libelle_en;
        }
        this.xmlParser.setLang(lng);
        if (this.querySelect)
            this.querySelect.setLang(this.lng);
        if (this.querySearchSimple)
            this.querySearchSimple.setLang(this.lng);
        if (this.querySearchAdvanced)
            this.querySearchAdvanced.setLang(this.lng);
        if (this.queryDetails)
            this.queryDetails.setLang(this.lng);
        if (this.themeSelect)
            this.themeSelect.setLang(this.lng);
        if (this.qcmGenerator)
            this.qcmGenerator.setLang(this.lng);
        if (this.diagramme)
            this.diagramme.setLang(this.lng);
    }
    async init() {
        const data = this.xmlParser.isloadXML();
        if (data && this.xmlParser.departements.size > 0) {
            if (this.querySelect)
                this.querySelect.initialize(this.lng, this.diagramme);
            if (this.querySearchAdvanced)
                this.querySearchAdvanced.initialize(this.lng, this.diagramme);
            if (this.querySearchSimple)
                this.querySearchSimple.initialize(this.lng, this.diagramme, {
                    container: '#query-search-simple-container'
                });
            if (this.queryDetails)
                this.queryDetails.initialize(this.lng, this.diagramme, this.qcmGenerator);
            if (this.themeSelect)
                this.themeSelect.initialize(this.lng, this.diagramme, this.savedTheme);
            if (this.diagramme)
                this.diagramme.initialize(this.lng, this.display_mode, this.querySelect, this.QuerySearch, this.queryDetails);
            if (this.languageSelect)
                this.languageSelect.initialize(this.lng, this);
            if (this.qcmGenerator)
                this.qcmGenerator.initialize(this.lng, true);
            window.xmlParser = this.xmlParser;
        } else {
            const message = "Aucun département trouvé dans les données XML.";
            console.error(message);
        }
    }
}
