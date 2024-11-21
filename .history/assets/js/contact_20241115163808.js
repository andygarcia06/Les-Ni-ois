// Afficher/Masquer les options de Sujet uniquement
document.querySelector('.section-title').addEventListener('click', function () {
    const subjectOptions = document.getElementById('subject');
    subjectOptions.classList.toggle('show'); // Bascule l'affichage des options de Sujet
});

// Gérer la sélection d'un sujet et mettre à jour les questions
document.querySelectorAll('#subject button').forEach(button => {
    button.addEventListener('click', function () {
        // Enlever la classe "active" de tous les boutons de sujet
        document.querySelectorAll('#subject button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Enregistrer la sélection du sujet
        const selectedSubject = this.value;
        document.querySelector('input[name="subject"]').value = selectedSubject;

        // Mettre à jour les questions en fonction du sujet sélectionné
        const questionContainer = document.getElementById('question');
        questionContainer.innerHTML = ''; // Effacer les options existantes

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

        // Ajouter les nouvelles options de question comme boutons
        if (questions[selectedSubject]) {
            questions[selectedSubject].forEach(question => {
                const questionButton = document.createElement('button');
                questionButton.type = 'button';
                questionButton.value = question.value;
                questionButton.textContent = question.text;

                // Gérer la sélection de la question
                questionButton.addEventListener('click', function () {
                    // Enlever la classe "active" de tous les boutons de question
                    document.querySelectorAll('#question button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Mettre à jour le champ caché pour la question
                    document.querySelector('input[name="question"]').value = this.value;
                });

                // Ajouter le bouton de question dans le conteneur
                questionContainer.appendChild(questionButton);
            });
        }
    });
});
