class DepartmentDetailsGeneral {
    constructor(departmentDetails) {
        this.departmentDetails = departmentDetails;
        this.translations = {
            fr: {    
                abbreviationNameLabel: "Nom",
                abbreviationDescLabel: "Description",
                abbreviation: "Abréviation",
                abbreviationDescription: "Description de l'abréviation",
                abbreviationPlaceholder: "(Ajouter une abréviation)",
                abbrevDescPlaceholder: "(description de l'abréviation)",
                abbreviationDescriptionPlaceholder: "(Ajouter une description)",
                description: "Description",
                manager: "Responsable",
                notes: "Notes",
                noDescription: "Aucune description disponible.",
                notSpecified: "Non spécifié",
                page: "Page",
                departmentTypes: {
                    direction:"Direction",
                    operational:"Operational",
                    commercial:"Commercial",
                    support:"Support",
                    technical:"Technical",
                    training:"Training",
                    compliance:"Compliance",
                    strategic:"Strategic",
                    economic:"Economic",
                    organisation:"Organisation",
                    other: "Autre"
                }
            },
            en: {
                abbreviationNameLabel: "Name",
                abbreviationDescLabel: "Description",
                abbreviation: "Abbreviation",
                abbreviationDescription: "Abbreviation Description",
                abbreviationPlaceholder: "(Add abbreviation)",
                abbreviationDescriptionPlaceholder: "(Add description)",
                abbrevDescPlaceholder: "(abbreviation description)",
                description: "Description",
                manager: "Manager",
                notes: "Notes",
                noDescription: "No description available.",
                notSpecified: "Not specified",
                page: "Page",
                departmentTypes: {
                    direction:"Direction",
                    operational:"Operational",
                    commercial:"Commercial",
                    support:"Support",
                    technical:"Technical",
                    training:"Training",
                    compliance:"Compliance",
                    strategic:"Strategic",
                    economic:"Economic",
                    organisation:"Organisation",
                    other: "Other"
                }
            }
        };
    }
    updateTab(data, departmentId) {
        const container = this.departmentDetails.getContentContainer();
        const tabGeneral = container.querySelector('#tab-general');
        if (!tabGeneral) return;
        const isEditMode = window.editModeManager && window.editModeManager.isEditMode;
        const lng = this.departmentDetails.lng;
        tabGeneral.innerHTML = `
            <div class="detail-section" id="abbreviation-section">
                <h5>${this.translations[lng].abbreviation}</h5>
                <div class="abbreviation-container">
                    ${isEditMode ? `
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div>
                                <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 4px; font-size: 14px;">
                                    ${this.translations[lng].abbreviationNameLabel}:
                                </div>
                                <span id="dept-abbreviation"></span>
                            </div>
                            <div>
                                <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 4px; font-size: 14px;">
                                    ${this.translations[lng].abbreviationDescLabel}:
                                </div>
                                <div id="abbreviation-description"></div>
                            </div>
                        </div>
                    ` : `
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div>
                                <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 4px; font-size: 14px;">
                                    ${this.translations[lng].abbreviationNameLabel}:
                                </div>
                                <span id="dept-abbreviation"></span>
                            </div>
                            <div>
                                <div class="field-label" style="font-weight: 500; color: #555; margin-bottom: 4px; font-size: 14px;">
                                    ${this.translations[lng].abbreviationDescLabel}:
                                </div>
                                <div id="abbreviation-description"></div>
                            </div>
                        </div>
                    `}
                </div>
            </div>
            <div class="detail-section" id="description-section">
                <h5>${this.translations[lng].description}</h5>
                <p id="dept-description"></p>
            </div>
            <div class="detail-section"  id="manager-section">
                <h5>${this.translations[lng].manager}</h5>
                <p id="dept-responsable"></p>
            </div>
            <div class="detail-section" id="note-section">
                <h5>${this.translations[lng].notes}</h5>
                <p id="dept-note"></p>
            </div>
        `;
        const abbreviationSection = tabGeneral.querySelector('#abbreviation-section');
        const abbreviationElement = tabGeneral.querySelector('#dept-abbreviation');
        const abbreviationDescElement = tabGeneral.querySelector('#abbreviation-description');
        if (data.abbreviation && data.abbreviation.trim()) {
            abbreviationElement.textContent = data.abbreviation;
            if (data.abbrev_details && data.abbrev_details.trim()) {
                abbreviationDescElement.textContent = data.abbrev_details;
                abbreviationDescElement.style.display = 'block';
            } else if (isEditMode) {
                abbreviationDescElement.textContent = this.translations[lng].abbreviationDescriptionPlaceholder;
                abbreviationDescElement.style.color = '#999';
                abbreviationDescElement.style.fontStyle = 'italic';
            }
            abbreviationSection.style.display = 'block';
        } else {
            if (isEditMode) {
                abbreviationElement.textContent = this.translations[lng].abbreviationPlaceholder;
                abbreviationElement.style.color = '#999';
                abbreviationElement.style.fontStyle = 'italic';
                abbreviationDescElement.style.display = 'none';
                abbreviationSection.style.display = 'block';
            } else {
                abbreviationSection.style.display = 'none';
            }
        }
        tabGeneral.querySelector('#dept-description').textContent = 
            data.description || this.translations[lng].noDescription;
        tabGeneral.querySelector('#dept-responsable').textContent = 
            data.responsable || this.translations[lng].notSpecified;
        const noteSection = tabGeneral.querySelector('#note-section');
        const noteElement = tabGeneral.querySelector('#dept-note');
        if (data.note && data.note.trim()) {
            noteElement.textContent = data.note;
            noteElement.classList.remove('hidden-if-not-edit');
            noteSection.style.display = 'block';
        } else {
            if (isEditMode) {
                noteElement.textContent = "(Add note)";
                noteElement.classList.add('hidden-if-not-edit');
                noteSection.style.display = 'block';
            } else {
                noteSection.style.display = 'none';
            }
        }
        if (isEditMode) {
            this.departmentDetails.makeElementEditable(
                tabGeneral.querySelector('#dept-description'), 
                'dept', 
                departmentId, 
                'description', 
                true
            );
            this.departmentDetails.makeElementEditable(
                tabGeneral.querySelector('#dept-responsable'), 
                'dept', 
                departmentId, 
                'responsable'
            );
            this.departmentDetails.makeElementEditable(
                noteElement, 
                'dept', 
                departmentId, 
                'note', 
                true
            );
            this.departmentDetails.makeElementEditable(
                abbreviationElement, 
                'dept', 
                departmentId, 
                'abbreviation'
            );
            if (abbreviationDescElement.textContent || abbreviationDescElement.style.display !== 'none') {
                abbreviationDescElement.style.display = 'block';
                this.departmentDetails.makeElementEditable(
                    abbreviationDescElement, 
                    'dept', 
                    departmentId, 
                    'abbrev_details', 
                    true
                );
            } else if (data.abbreviation && data.abbreviation.trim()) {
                abbreviationDescElement.textContent = this.translations[lng].abbreviationDescriptionPlaceholder;
                abbreviationDescElement.style.display = 'block';
                abbreviationDescElement.style.color = '#999';
                abbreviationDescElement.style.fontStyle = 'italic';
                abbreviationDescElement.style.marginTop = '8px';
                this.departmentDetails.makeElementEditable(
                    abbreviationDescElement, 
                    'dept', 
                    departmentId, 
                    'abbrev_details', 
                    true
                );
            }
        }
    }
}