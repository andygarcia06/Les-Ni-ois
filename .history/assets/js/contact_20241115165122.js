// Gérer l'affichage des boutons de "Sujet"
document.querySelector('.section-title').addEventListener('click', function () {
    const subjectOptions = document.getElementById('subject');
    subjectOptions.classList.toggle('show'); // Affiche ou masque les boutons
});

// Gérer la sélection d'un sujet et l'affichage des questions
document.querySelectorAll('#subject button').forEach(button => {
    button.addEventListener('click', function () {
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
            questions[this.value].forEach(question => {
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

                questionContainer.appendChild(questionButton);
            });

            // Afficher le conteneur des questions
            questionContainer.classList.add('show');
        }
    });
});
