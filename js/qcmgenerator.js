class QCMGenerator {
    constructor(xmlParser) {
        this.xmlParser = xmlParser;
        this.lng = 'en';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalQuestions = 10;
        this.questions = [];
        this.userAnswers = [];
        this.quizCompleted = false;
        this.modal = null;
        this.isModalOpen = false;
        this.container = null;
        this.currentDepartmentId = null;
        this.translations = {
            fr: {
                quizTitle: "Quiz sur la Structure Organisationnelle",
                question: "Question",
                of: "sur",
                submit: "Valider",
                next: "Suivant",
                previous: "Précédent",
                finish: "Terminer",
                restart: "Recommencer",
                score: "Score",
                correct: "Correct !",
                incorrect: "Incorrect !",
                correctAnswer: "La bonne réponse est",
                yourAnswer: "Votre réponse",
                resultTitle: "Résultats du Quiz",
                resultScore: "Vous avez obtenu",
                outOf: "sur",
                percentage: "soit",
                tryAgain: "Réessayer",
                backToQuiz: "Retour au quiz",
                loading: "Chargement des questions...",
                selectAnswer: "Veuillez sélectionner une réponse",
                resultsDetails: "Détail des réponses :",
                notAnswered: "Non répondue",
                correctAnswerLabel: "Bonne réponse :",
                userAnswerLabel: "Votre réponse :",
                questionTypes: {
                    departmentName: "Quel est le nom du département ayant cette description ?",
                    departmentType: "Quel est le type du département",
                    departmentManager: "Qui est le responsable du département",
                    departmentParent: "À quel département supérieur appartient",
                    departmentAbbreviation: "Que signifie l'abréviation",
                    departmentDescription: "Quelle est la description du département",
                    documentName: "Quel document correspond à cette description ?",
                    documentRegulation: "À quelle réglementation se réfère le document",
                    taskCategory: "À quelle catégorie appartient la tâche",
                    postAbbreviation: "Que signifie l'abréviation du poste"
                }
            },
            en: {
                quizTitle: "Organizational Structure Quiz",
                question: "Question",
                of: "of",
                submit: "Submit",
                next: "Next",
                previous: "Previous",
                finish: "Finish",
                restart: "Restart",
                score: "Score",
                correct: "Correct!",
                incorrect: "Incorrect!",
                correctAnswer: "The correct answer is",
                yourAnswer: "Your answer",
                resultTitle: "Quiz Results",
                resultScore: "You scored",
                outOf: "out of",
                percentage: "which is",
                tryAgain: "Try Again",
                backToQuiz: "Back to quiz",
                loading: "Loading questions...",
                selectAnswer: "Please select an answer",
                resultsDetails: "Answer Details:",
                notAnswered: "Not answered",
                correctAnswerLabel: "Correct answer:",
                userAnswerLabel: "Your answer:",
                questionTypes: {
                    departmentName: "What is the name of the department with this description?",
                    departmentType: "What is the type of the department",
                    departmentManager: "Who is the manager of the department",
                    departmentParent: "To which parent department belongs",
                    departmentAbbreviation: "What does the abbreviation mean",
                    departmentDescription: "What is the description of the department",
                    documentName: "Which document corresponds to this description?",
                    documentRegulation: "To which regulation refers the document",
                    taskCategory: "To which category belongs the task",
                    postAbbreviation: "What does the post abbreviation mean"
                }
            }
        };
        this.bindMethods();
    }
    bindMethods() {
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.resetQuiz = this.resetQuiz.bind(this);
        this.submitAnswer = this.submitAnswer.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.showResults = this.showResults.bind(this);
    }
    setLanguage(lng) {
        this.lng = lng || 'en';
        if (this.modal) {
            const modalTitle = this.modal.querySelector('.modal-quiz-header h2');
            if (modalTitle) {
                modalTitle.textContent = this.translate('quizTitle');
            }
        }
    }
    setLang(lng) {
        this.setLanguage(lng);
    }
    translate(key, subKey = null) {
        const translation = this.translations[this.lng];
        if (!translation) return key;
        if (subKey && translation[key] && translation[key][subKey]) {
            return translation[key][subKey];
        }
        return translation[key] || key;
    }
    initialize(lng, asModal = true) {
        this.lng = lng || 'en';
        this.asModal = asModal !== false; 
        this.init();
        this.bindToolbarButton();
        this.setupModalEvents();
        this.resetQuiz();
        this.generateRandomQuestions();
        if (this.asModal) {
            this.displayQuestion();
        }
    }
    bindToolbarButton() {
        const toolbarButton = document.getElementById('qcm-view');
        if (!toolbarButton || toolbarButton.dataset.qcmBound === '1') return;
        toolbarButton.dataset.qcmBound = '1';
        toolbarButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.openQuizFromToolbar(null);
        });
    }
    init() {
        const modalId = 'quiz-modal-' + Date.now();
        let modal = document.getElementById('quiz-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'quiz-modal';
            modal.className = 'quiz-modal hidden';
            document.body.appendChild(modal);
        }
        const containerId = 'quiz-modal-body-' + Date.now();
        modal.innerHTML = `
        <div class="modal-quiz-content">
            <div class="modal-quiz-header">
                <h2>${this.translate('quizTitle')}</h2>
                <button id="close-quiz-modal" class="modal-quiz-close">&times;</button>
            </div>
            <div class="modal-quiz-body" id="${containerId}"></div>
            <div class="modal-quiz-footer"></div>
        </div>
       `;
        this.modal = modal;
        this.container = document.getElementById(containerId);
        this.footer = this.modal.querySelector('.modal-quiz-footer');
    }
    generateDepartmentSpecificQuestions(departmentId) {
        this.questions = [];
        const department = this.xmlParser.getDepartement(departmentId);
        if (!department) {
            this.generateRandomQuestions();
            return;
        }
        const departments = [department];
        const documents = department.fichiers || [];
        const tasks = department.tasks || [];
        const posts = department.postes || [];
        const allDepartments = Array.from(this.xmlParser.departements.values());
        const questionsPool = [];
        if (departments.length > 0) {
            const deptQuestions = [
                this.generateDepartmentNameQuestion(departments, allDepartments),
                this.generateDepartmentTypeQuestion(departments, allDepartments),
                this.generateDepartmentManagerQuestion(departments, allDepartments),
                this.generateDepartmentParentQuestion(departments, allDepartments),
                this.generateDepartmentAbbreviationQuestion(departments, allDepartments),
                this.generateDepartmentDescriptionQuestion(departments, allDepartments)
            ].filter(q => q !== null);
            questionsPool.push(...deptQuestions);
        }
        if (documents.length > 0) {
            const docQuestions = [
                this.generateDocumentSpecificQuestion(documents, allDepartments)
            ].filter(q => q !== null);
            questionsPool.push(...docQuestions);
        }
        if (tasks.length > 0) {
            const taskQuestions = [
                this.generateTaskSpecificQuestion(tasks, allDepartments)
            ].filter(q => q !== null);
            questionsPool.push(...taskQuestions);
        }
        if (posts.length > 0) {
            const postQuestions = [
                this.generatePostSpecificQuestion(posts, allDepartments)
            ].filter(q => q !== null);
            questionsPool.push(...postQuestions);
        }
        const shuffledQuestions = this.shuffleArray(questionsPool);
        this.questions = shuffledQuestions.slice(0, Math.min(this.totalQuestions, shuffledQuestions.length));
        if (this.questions.length < this.totalQuestions) {
            const remainingQuestions = this.totalQuestions - this.questions.length;
            for (let i = 0; i < remainingQuestions; i++) {
                const randomQuestion = this.generateRandomQuestion(allDepartments);
                if (randomQuestion) {
                    this.questions.push(randomQuestion);
                }
            }
        }
    }
    generateRandomQuestion(allDepartments) {
        const questionTypes = [
            { type: 'departmentName', weight: 2 },
            { type: 'departmentType', weight: 1 },
            { type: 'departmentManager', weight: 1 },
            { type: 'departmentParent', weight: 1 },
            { type: 'departmentAbbreviation', weight: 1 },
            { type: 'departmentDescription', weight: 2 }
        ];
        const questionType = this.selectWeightedQuestionType(questionTypes);
        switch (questionType.type) {
            case 'departmentName':
                return this.generateDepartmentNameQuestion(allDepartments, allDepartments);
            case 'departmentType':
                return this.generateDepartmentTypeQuestion(allDepartments, allDepartments);
            case 'departmentManager':
                return this.generateDepartmentManagerQuestion(allDepartments, allDepartments);
            case 'departmentParent':
                return this.generateDepartmentParentQuestion(allDepartments, allDepartments);
            case 'departmentAbbreviation':
                return this.generateDepartmentAbbreviationQuestion(allDepartments, allDepartments);
            case 'departmentDescription':
                return this.generateDepartmentDescriptionQuestion(allDepartments, allDepartments);
        }
        return null;
    }
    generateDocumentSpecificQuestion(documents, allDepartments) {
        if (documents.length === 0) return null;
        const doc = documents[Math.floor(Math.random() * documents.length)];
        const questionType = Math.random() > 0.5 ? 'documentName' : 'documentRegulation';
        if (questionType === 'documentName') {
            return this.generateDocumentNameQuestion([doc], allDepartments);
        } else {
            return this.generateDocumentRegulationQuestion([doc], allDepartments);
        }
    }
    generateTaskSpecificQuestion(tasks, allDepartments) {
        if (tasks.length === 0) return null;
        const task = tasks[Math.floor(Math.random() * tasks.length)];
        return this.generateTaskCategoryQuestion([task], allDepartments);
    }
    generatePostSpecificQuestion(posts, allDepartments) {
    if (posts.length === 0) return null;
    const post = posts[Math.floor(Math.random() * posts.length)];
    return this.generatePostAbbreviationQuestion([post], allDepartments);
}
    setupModalEvents() {
        if (!this.modal) return;
        this.modal.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'qcm-view') {
                this.openModal();
            }
            if (e.target && e.target.id === 'close-quiz-modal') {
                this.closeModal();
            }
            if (e.target && e.target.id === 'quiz-modal') {
                this.closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });
    }
    createModal(containerId) {
        if (this.modal) {
            document.body.removeChild(this.modal);
        }
        this.modal = document.createElement('div');
        this.modal.className = 'quiz-modal';
        this.modal.id = 'quiz-modal-' + containerId;
        const modalContent = `
            <div class="modal-quiz-content">
                <div class="modal-quiz-header">
                    <h2>${this.translate('quizTitle')}</h2>
                    <button class="modal-quiz-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-quiz-body" id="${containerId}"></div>
                <div class="modal-quiz-footer"></div>
            </div>
        `;
        this.modal.innerHTML = modalContent;
        document.body.appendChild(this.modal);
        this.footer = this.modal.querySelector('.modal-quiz-footer');
        const closeBtn = this.modal.querySelector('.modal-quiz-close');
        closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });
        return this.modal;
    }
    openModal(departmentId = null) {
        if (!this.modal) {
            this.initialize(this.lng, true);
        }
        if (this.modal) {
            this.modal.classList.remove('hidden');
            this.modal.classList.add('active');
            this.isModalOpen = true;
            document.body.style.overflow = 'hidden';
            const modalTitle = this.modal.querySelector('.modal-quiz-header h2');
            if (modalTitle) {
                if (departmentId) {
                    const dept = this.xmlParser.getDepartement(departmentId);
                    const deptName = dept ? dept.nom : departmentId;
                    modalTitle.textContent = `${this.translate('quizFor')}: ${deptName}`;
                } else {
                    modalTitle.textContent = this.translate('quizTitle');
                }
            }
            this.resetQuiz();
            if (departmentId) {
                this.generateDepartmentSpecificQuestions(departmentId);
            } else {
                this.generateRandomQuestions();
            }
            this.displayQuestion();
        }
    }
    closeModal() {
        if (!this.modal) return;
        this.modal.classList.remove('active');
        this.modal.classList.add('hidden');
        this.isModalOpen = false;
        document.body.style.overflow = '';
    }
    openQuizFromToolbar(currentDepartmentId = null) {
        this.openModal(currentDepartmentId);
    }
    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = [];
        this.userAnswers = [];
        this.quizCompleted = false;
    }
    generateRandomQuestions() {
        this.questions = [];
        const departments = Array.from(this.xmlParser.departements.values());
        const documents = this.xmlParser.getAllDocuments();
        const tasks = this.xmlParser.getAllTasks();
        const posts = this.xmlParser.getAllPostes();
        const questionTypes = [
            { type: 'departmentName', weight: 2 },
            { type: 'departmentType', weight: 2 },
            { type: 'departmentManager', weight: 1 },
            { type: 'departmentParent', weight: 1 },
            { type: 'departmentAbbreviation', weight: 1 },
            { type: 'departmentDescription', weight: 2 },
            { type: 'documentName', weight: 1 },
            { type: 'documentRegulation', weight: 1 },
            { type: 'taskCategory', weight: 1 },
            { type: 'postAbbreviation', weight: 1 }
        ];
        for (let i = 0; i < this.totalQuestions; i++) {
            const questionType = this.selectWeightedQuestionType(questionTypes);
            let question = null;
            switch (questionType.type) {
                case 'departmentName':
                    question = this.generateDepartmentNameQuestion(departments, departments);
                    break;
                case 'departmentType':
                    question = this.generateDepartmentTypeQuestion(departments, departments);
                    break;
                case 'departmentManager':
                    question = this.generateDepartmentManagerQuestion(departments, departments);
                    break;
                case 'departmentParent':
                    question = this.generateDepartmentParentQuestion(departments, departments);
                    break;
                case 'departmentAbbreviation':
                    question = this.generateDepartmentAbbreviationQuestion(departments, departments);
                    break;
                case 'departmentDescription':
                    question = this.generateDepartmentDescriptionQuestion(departments, departments);
                    break;
                case 'documentName':
                    question = this.generateDocumentNameQuestion(documents, departments);
                    break;
                case 'documentRegulation':
                    question = this.generateDocumentRegulationQuestion(documents, departments);
                    break;
                case 'taskCategory':
                    question = this.generateTaskCategoryQuestion(tasks, departments);
                    break;
                case 'postAbbreviation':
                    question = this.generatePostAbbreviationQuestion(posts, departments);
                    break;
            }
            if (question) {
                this.questions.push(question);
            } else {
                i--;
            }
        }
    }
    selectWeightedQuestionType(questionTypes) {
        const totalWeight = questionTypes.reduce((sum, type) => sum + type.weight, 0);
        let random = Math.random() * totalWeight;
        for (const type of questionTypes) {
            if (random < type.weight) {
                return type;
            }
            random -= type.weight;
        }
        return questionTypes[0];
    }
    generateDepartmentNameQuestion(targetDepartments, allDepartments) {
        const validDepts = targetDepartments.filter(dept => dept.description && dept.description.length > 10);
        if (validDepts.length < 1) return null;
        const correctDept = validDepts[Math.floor(Math.random() * validDepts.length)];
        const wrongDepts = this.getRandomDepartments(allDepartments, 3, [correctDept.id]);
        const options = [
            { text: correctDept.nom, correct: true },
            ...wrongDepts.map(dept => ({ text: dept.nom, correct: false }))
        ];
        return {
            type: 'departmentName',
            text: this.translate('questionTypes', 'departmentName'),
            questionData: correctDept.description,
            options: this.shuffleArray(options),
            correctAnswer: correctDept.nom,
            metadata: { departmentId: correctDept.id }
        };
    }
    generateDepartmentTypeQuestion(targetDepartments, allDepartments) {
        const validDepts = targetDepartments.filter(dept => dept.type);
        if (validDepts.length < 1) return null;
        const dept = validDepts[Math.floor(Math.random() * validDepts.length)];
        const allTypes = [...new Set(allDepartments.map(d => d.type))].filter(t => t);
        if (!dept.type || allTypes.length < 4) return null;
        const wrongTypes = this.getRandomItems(allTypes, 3, [dept.type]);
        const options = [
            { text: this.translate(dept.type), correct: true },
            ...wrongTypes.map(type => ({ text: this.translate(type), correct: false }))
        ];
        return {
            type: 'departmentType',
            text: `${this.translate('questionTypes', 'departmentType')} "${dept.nom}" ?`,
            questionData: dept.nom,
            options: this.shuffleArray(options),
            correctAnswer: this.translate(dept.type),
            metadata: { departmentId: dept.id }
        };
    }
    generateDepartmentManagerQuestion(targetDepartments, allDepartments) {
        const validDepts = targetDepartments.filter(dept => dept.responsable);
        if (validDepts.length < 1) return null;
        const dept = validDepts[Math.floor(Math.random() * validDepts.length)];
        const allManagers = [...new Set(allDepartments.map(d => d.responsable))].filter(m => m);
        if (!dept.responsable || allManagers.length < 4) return null;
        const wrongManagers = this.getRandomItems(allManagers, 3, [dept.responsable]);
        const options = [
            { text: dept.responsable, correct: true },
            ...wrongManagers.map(manager => ({ text: manager, correct: false }))
        ];
        return {
            type: 'departmentManager',
            text: `${this.translate('questionTypes', 'departmentManager')} "${dept.nom}" ?`,
            questionData: dept.nom,
            options: this.shuffleArray(options),
            correctAnswer: dept.responsable,
            metadata: { departmentId: dept.id }
        };
    }
    generateDepartmentParentQuestion(targetDepartments, allDepartments) {
        const validDepts = targetDepartments.filter(dept => dept.parent && dept.parent !== 'ceo');
        if (validDepts.length < 1) return null;
        const dept = validDepts[Math.floor(Math.random() * validDepts.length)];
        const parentDept = this.xmlParser.getDepartement(dept.parent);
        if (!parentDept) return null;
        const wrongParents = this.getRandomDepartments(allDepartments, 3, [dept.id, dept.parent]);
        const options = [
            { text: parentDept.nom, correct: true },
            ...wrongParents.map(parent => ({ text: parent.nom, correct: false }))
        ];
        return {
            type: 'departmentParent',
            text: `${this.translate('questionTypes', 'departmentParent')} "${dept.nom}" ?`,
            questionData: dept.nom,
            options: this.shuffleArray(options),
            correctAnswer: parentDept.nom,
            metadata: { departmentId: dept.id, parentId: parentDept.id }
        };
    }
    generateDepartmentAbbreviationQuestion(targetDepartments, allDepartments) {
        const validDepts = targetDepartments.filter(dept => dept.abbreviation && dept.abbrev_details);
        if (validDepts.length < 1) return null;
        const dept = validDepts[Math.floor(Math.random() * validDepts.length)];
        const otherDepts = allDepartments.filter(d => 
            d.id !== dept.id && d.abbrev_details && d.abbrev_details !== dept.abbrev_details
        );
        let fakeMeanings = [];
        if (otherDepts.length >= 3) {
            fakeMeanings = this.getRandomItems(
                otherDepts.map(d => d.abbrev_details),
                3
            );
        } else {
            const defaultMeanings = [
                "Chief Executive Officer",
                "Compliance Monitoring Manager",
                "Flight Operations",
                "Continuing Airworthiness",
                "Ground Operations",
                "Crew Resource Management"
            ].filter(m => m !== dept.abbrev_details);
            fakeMeanings = this.getRandomItems(defaultMeanings, 3);
        }
        const options = [
            { text: dept.abbrev_details, correct: true },
            ...fakeMeanings.map(meaning => ({ text: meaning, correct: false }))
        ];
        return {
            type: 'departmentAbbreviation',
            text: `${this.translate('questionTypes', 'departmentAbbreviation')} "${dept.abbreviation}" ?`,
            questionData: dept.abbreviation,
            options: this.shuffleArray(options),
            correctAnswer: dept.abbrev_details,
            metadata: { departmentId: dept.id }
        };
    }
    generateDepartmentDescriptionQuestion(targetDepartments, allDepartments) {
        const validDepts = targetDepartments.filter(dept => dept.description);
        if (validDepts.length < 1) return null;
        const dept = validDepts[Math.floor(Math.random() * validDepts.length)];
        const otherDepts = allDepartments.filter(d => 
            d.id !== dept.id && d.description && d.description !== dept.description
        );
        let wrongDescriptions = [];
        if (otherDepts.length >= 3) {
            wrongDescriptions = this.getRandomItems(
                otherDepts.map(d => d.description),
                3
            );
        } else {
            wrongDescriptions = [
                "Département responsable de la gestion des opérations aériennes",
                "Service dédié à la maintenance et à la navigabilité continue",
                "Unité en charge des ressources humaines et de la formation",
                "Division responsable de la conformité réglementaire"
            ].slice(0, 3);
        }
        const options = [
            { text: dept.description, correct: true },
            ...wrongDescriptions.map(desc => ({ text: desc, correct: false }))
        ];
        return {
            type: 'departmentDescription',
            text: `${this.translate('questionTypes', 'departmentDescription')} "${dept.nom}" ?`,
            questionData: dept.nom,
            options: this.shuffleArray(options),
            correctAnswer: dept.description,
            metadata: { departmentId: dept.id }
        };
    }
    generateDocumentNameQuestion(documents, allDepartments) {
        const validDocs = documents.filter(doc => doc.description && doc.nom);
        if (validDocs.length < 1) return null;
        const correctDoc = validDocs[Math.floor(Math.random() * validDocs.length)];
        const allDocuments = this.xmlParser.getAllDocuments();
        const otherDocs = allDocuments.filter(d => 
            d.id !== correctDoc.id && d.nom && d.nom !== correctDoc.nom
        );
        let wrongDocs = [];
        if (otherDocs.length >= 3) {
            wrongDocs = this.getRandomItems(otherDocs, 3);
        } else {
            const allDeptDocs = allDepartments.flatMap(dept => dept.fichiers || [])
                .filter(doc => doc.nom && doc.nom !== correctDoc.nom);
            wrongDocs = this.getRandomItems(allDeptDocs, 3);
        }
        const options = [
            { text: correctDoc.nom, correct: true },
            ...wrongDocs.map(doc => ({ text: doc.nom, correct: false }))
        ];
        return {
            type: 'documentName',
            text: this.translate('questionTypes', 'documentName'),
            questionData: correctDoc.description,
            options: this.shuffleArray(options),
            correctAnswer: correctDoc.nom,
            metadata: { documentId: correctDoc.id }
        };
    }
    generateDocumentRegulationQuestion(documents, allDepartments) {
        const validDocs = documents.filter(doc => doc.reglementation);
        if (validDocs.length < 1) return null;
        const doc = validDocs[Math.floor(Math.random() * validDocs.length)];
        const allDocuments = allDepartments.flatMap(dept => dept.fichiers || []);
        const allRegulations = [...new Set(allDocuments.map(d => d.reglementation))].filter(r => r);
        if (!doc.reglementation || allRegulations.length < 4) return null;
        const wrongRegulations = this.getRandomItems(allRegulations, 3, [doc.reglementation]);
        const options = [
            { text: doc.reglementation, correct: true },
            ...wrongRegulations.map(reg => ({ text: reg, correct: false }))
        ];
        return {
            type: 'documentRegulation',
            text: `${this.translate('questionTypes', 'documentRegulation')} "${doc.nom}" ?`,
            questionData: doc.nom,
            options: this.shuffleArray(options),
            correctAnswer: doc.reglementation,
            metadata: { documentId: doc.id }
        };
    }
    generateTaskCategoryQuestion(tasks, allDepartments) {
            const validTasks = tasks.filter(task => task.categorie && task.nom);
            if (validTasks.length < 1) return null;
            const task = validTasks[Math.floor(Math.random() * validTasks.length)];
            const allTasks = allDepartments.flatMap(dept => dept.tasks || []);
            const allCategories = [...new Set(allTasks.map(t => t.categorie))].filter(c => c);
            if (!task.categorie || allCategories.length < 4) return null;
            const wrongCategories = this.getRandomItems(allCategories, 3, [task.categorie]);
            const options = [
                { text: task.categorie, correct: true },
                ...wrongCategories.map(cat => ({ text: cat, correct: false }))
            ];
            return {
                type: 'taskCategory',
                text: `${this.translate('questionTypes', 'taskCategory')} "${task.nom}" ?`,
                questionData: task.nom,
                options: this.shuffleArray(options),
                correctAnswer: task.categorie,
                metadata: { taskId: task.id }
            };
        }
    generatePostAbbreviationQuestion(posts, allDepartments) {
        const validPosts = posts.filter(post => post.abbrev && post.abbrev_desc);
        if (validPosts.length < 1) return null;
        const post = validPosts[Math.floor(Math.random() * validPosts.length)];
        const allPosts = allDepartments.flatMap(dept => dept.postes || []);
        const otherPosts = allPosts.filter(p => 
            p.id !== post.id && p.abbrev_desc && p.abbrev_desc !== post.abbrev_desc
        );
        let fakeMeanings = [];
        if (otherPosts.length >= 3) {
            fakeMeanings = this.getRandomItems(
                otherPosts.map(p => p.abbrev_desc),
                3
            );
        } else {
            const defaultMeanings = [
                "Chief Executive Officer",
                "Accountable Manager",
                "Safety Manager",
                "Compliance Monitoring Manager",
                "Ground Operations Nominated Postholder"
            ].filter(m => m !== post.abbrev_desc);
            fakeMeanings = this.getRandomItems(defaultMeanings, 3);
        }
        const options = [
            { text: post.abbrev_desc, correct: true },
            ...fakeMeanings.map(meaning => ({ text: meaning, correct: false }))
        ];
        return {
            type: 'postAbbreviation',
            text: `${this.translate('questionTypes', 'postAbbreviation')} "${post.abbrev}" ?`,
            questionData: post.abbrev,
            options: this.shuffleArray(options),
            correctAnswer: post.abbrev_desc,
            metadata: { postId: post.id }
        };
    }
    displayQuestion() {
    if (!this.container) return;
    if (this.questions.length === 0) {
        this.container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2>${this.translate('quizTitle')}</h2>
                </div>
                <div class="quiz-loading">
                    <p>${this.translate('loading')}</p>
                    ${!this.currentDepartmentId ? 
                        `<p class="no-dept-info">${this.translate('noDepartmentSelected')}</p>` : ''}
                </div>
            </div>
        `;
        if (this.footer) this.footer.innerHTML = '';
        return;
        }
        const question = this.questions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        let html = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <div class="quiz-progress">
                        <span class="progress-text">${this.translate('question')} ${this.currentQuestionIndex + 1} ${this.translate('of')} ${this.totalQuestions}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${((this.currentQuestionIndex + 1) / this.totalQuestions) * 100}%"></div>
                        </div>
                    </div>
                    <div class="quiz-score">${this.translate('score')}: ${this.score}/${this.currentQuestionIndex}</div>
                </div>
                <div class="quiz-question">
                    <h3 class="question-text">${question.text}</h3>
                    ${question.questionData ? `<div class="question-data">${question.questionData}</div>` : ''}
                    <div class="quiz-options">
        `;
                    question.options.forEach((option, index) => {
                        const isSelected = userAnswer === option.text;
                        const isAnswered = userAnswer !== undefined;
                        const isCorrect = option.correct;
                        const optionClass = isSelected ? 'selected' : '';
                        const feedbackClass = isAnswered ? (isCorrect ? 'correct' : (isSelected ? 'incorrect' : '')) : '';
                        html += `
                            <div class="option ${optionClass} ${feedbackClass}" data-index="${index}">
                                <input type="radio" id="option-${index}" name="quiz-option" value="${option.text}" 
                                    ${isSelected ? 'checked' : ''} ${isAnswered ? 'disabled' : ''}>
                                <label for="option-${index}">${option.text}</label>
                            </div>
                        `;
                    });
        html += `
                    </div>
                    ${userAnswer !== undefined ? this.getFeedbackHtml(question, userAnswer) : ''}
                </div>
            </div>
        `;
        this.container.innerHTML = html;
        if (this.footer) {
            this.footer.innerHTML = `
                <div class="quiz-navigation">
                    <button id="prev-btn" class="btn-secondary" ${this.currentQuestionIndex === 0 ? 'disabled' : ''}>
                        ${this.translate('previous')}
                    </button>
                    ${userAnswer === undefined ? 
                        `<button id="submit-btn" class="btn-primary">${this.translate('submit')}</button>` :
                        (this.currentQuestionIndex === this.totalQuestions - 1 ?
                            `<button id="finish-btn" class="btn-primary">${this.translate('finish')}</button>` :
                            `<button id="next-btn" class="btn-primary">${this.translate('next')}</button>`)
                    }
                </div>
            `;
        }
        this.setupEventListeners();
    }
    getFeedbackHtml(question, userAnswer) {
        const isCorrect = userAnswer === question.correctAnswer;
        return `
            <div class="quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}">
                <h4>${isCorrect ? this.translate('correct') : this.translate('incorrect')}</h4>
                <p>${this.translate('yourAnswer')}: <strong>${userAnswer}</strong></p>
                ${!isCorrect ? `<p>${this.translate('correctAnswer')}: <strong>${question.correctAnswer}</strong></p>` : ''}
            </div>
        `;
    }
    setupEventListeners() {
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', (e) => {
                if (this.userAnswers[this.currentQuestionIndex] !== undefined) return;
                const options = document.querySelectorAll('.option');
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                const radio = option.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
            });
        });
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.submitAnswer();
            });
        }
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextQuestion();
            });
        }
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousQuestion();
            });
        }
        const finishBtn = document.getElementById('finish-btn');
        if (finishBtn) {
            finishBtn.addEventListener('click', () => {
                this.showResults();
            });
        }
    }
    submitAnswer() {
        const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
        if (!selectedOption) {
            alert(this.translate('selectAnswer'));
            return;
        }
        const answer = selectedOption.value;
        const question = this.questions[this.currentQuestionIndex];
        this.userAnswers[this.currentQuestionIndex] = answer;
        if (answer === question.correctAnswer) {
            this.score++;
        }
        this.displayQuestion();
    }
    nextQuestion() {
        if (this.currentQuestionIndex < this.totalQuestions - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    }
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    }
    showResults() {
        this.quizCompleted = true;
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        let html = `
            <div class="quiz-results">
                <div class="results-header">
                    <h2>${this.translate('resultTitle')}</h2>
                    <div class="results-score">
                        <div class="score-circle">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" stroke-width="12"/>
                                <circle cx="60" cy="60" r="54" fill="none" stroke="#4CAF50" stroke-width="12" 
                                        stroke-dasharray="${2 * Math.PI * 54}" 
                                        stroke-dashoffset="${2 * Math.PI * 54 * (1 - percentage / 100)}"
                                        transform="rotate(-90 60 60)"/>
                            </svg>
                            <div class="score-text">
                                <span class="score-number">${percentage}%</span>
                                <span class="score-details">${this.score}/${this.totalQuestions}</span>
                            </div>
                        </div>
                        <div class="score-message">
                            <h3>${this.translate('resultScore')} ${this.score} ${this.translate('outOf')} ${this.totalQuestions}</h3>
                            <p>${this.translate('percentage')} ${percentage}%</p>
                        </div>
                    </div>
                </div>
                <div class="results-details">
                    <h3>${this.translate('resultsDetails')}</h3>
                    <div class="results-list">
        `;
        this.questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            html += `
                <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="result-question">
                        <strong>Q${index + 1}:</strong> ${question.text}
                    </div>
                    <div class="result-answer">
                        <span class="user-answer">${this.translate('userAnswerLabel')} ${userAnswer || this.translate('notAnswered')}</span>
                        <span class="correct-answer">${this.translate('correctAnswerLabel')} ${question.correctAnswer}</span>
                    </div>
                    <div class="result-status">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</div>
                </div>
            `;
        });
        html += `
                    </div>
                </div>
            </div>
        `;
        this.container.innerHTML = html;
        if (this.footer) {
            this.footer.innerHTML = `
                <div class="results-actions">
                    <button id="try-again-btn" class="btn-primary">${this.translate('tryAgain')}</button>
                    <button id="review-quiz-btn" class="btn-secondary">${this.translate('backToQuiz')}</button>
                </div>
            `;
        }
        document.getElementById('try-again-btn').addEventListener('click', () => {
            this.resetQuiz();
            this.generateRandomQuestions();
            this.displayQuestion();
        });
        document.getElementById('review-quiz-btn').addEventListener('click', () => {
            this.currentQuestionIndex = 0;
            this.displayQuestion();
        });
    }
    getRandomDepartments(departments, count, excludeIds = []) {
        const available = departments.filter(dept => !excludeIds.includes(dept.id));
        const shuffled = this.shuffleArray([...available]);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
    getRandomItems(items, count, excludeItems = []) {
        const available = items.filter(item => !excludeItems.includes(item));
        const shuffled = this.shuffleArray([...available]);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    getAllDocumentsFromDepartments(departments) {
    return departments.flatMap(dept => dept.fichiers || []);
    }
}
function initializeQCMGenerator(xmlParser, containerId, language = 'en') {
    const qcmGenerator = new QCMGenerator(xmlParser);
    qcmGenerator.setLanguage(language);
    qcmGenerator.initialize(containerId);
    return qcmGenerator;
}
