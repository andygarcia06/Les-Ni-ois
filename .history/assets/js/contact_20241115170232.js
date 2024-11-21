// Gérer l'affichage des boutons "Sujet"
document.getElementById('subject-section').addEventListener('click', function () {
    const subjectOptions = document.getElementById('subject');

    // Affiche les boutons uniquement s'ils ne sont pas déjà visibles
    if (!subjectOptions.classList.contains('show')) {
        subjectOptions.classList.add('show'); // Affiche les boutons des sujets

        // Ajouter une animation progressive pour chaque bouton
        const buttons = subjectOptions.querySelectorAll('button');
        buttons.forEach((button, index) => {
            button.style.animationDelay = `${index * 0.1}s`; // Délai entre les boutons
            button.classList.add('animated');
        });
    }
});

// Gérer la sélection d'un sujet et afficher les questions correspondantes
document.querySelectorAll('#subject button').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Empêche de masquer les options de Sujet

        // Activer le bouton sélectionné
        document.querySelectorAll('#subject button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Mettre à jour le champ caché pour le sujet
        document.querySelector('input[name="subject"]').value = this.value;

        // Afficher les questions correspondantes
        const questions = {
            resto: [
                { text: 'Réservation', value: 'reservation' },
                { text: 'Privatisation', value: 'privatisation' },
                { text: 'Autres questions', value: 'autres_resto' }
            ],
            shop: [
                { text: 'Facturation', value: 'facturation' },
                { text: 'Suivi de commande', value: 'suivi_commande' },
                { text: 'Réclamation', value: 'reclamation' },
                { text: 'Autres questions', value: 'autres_shop' }
            ],
            autre: [
                { text: 'Recrutement', value: 'recrutement' },
                { text: 'Données personnelles', value: 'donnees_personnelles' },
                { text: 'Autres questions', value: 'autres_autre' }
            ]
        };

        const questionContainer = document.getElementById('question');
        questionContainer.innerHTML = ''; // Effacer les questions précédentes

        // Ajouter les nouvelles questions
        if (questions[this.value]) {
            questions[this.value].forEach((question, index) => {
                const questionButton = document.createElement('button');
                questionButton.type = 'button';
                questionButton.value = question.value;
                questionButton.textContent = question.text;

                // Ajouter un comportement au clic
                questionButton.addEventListener('click', function () {
                    // Activer la question sélectionnée
                    document.querySelectorAll('#question button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Mettre à jour le champ caché pour la question
                    document.querySelector('input[name="question"]').value = this.value;
                });

                // Ajouter l'animation pour chaque question
                questionButton.style.animationDelay = `${index * 0.1}s`; // Délai entre les boutons
                questionButton.classList.add('animated');

                questionContainer.appendChild(questionButton);
            });

            // Afficher le conteneur des questions
            questionContainer.classList.add('show');
        }
    });
});
