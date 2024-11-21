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
        questionContainer.innerHTML = ''; // Effacer les questions existantes
        questionContainer.classList.add('show'); // Ajoute la classe "show" pour afficher les questions

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
                    document.querySelectorAll('#question button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    document.querySelector('input[name="question"]').value = this.value;
                });

                // Ajouter le bouton de question dans le conteneur
                questionContainer.appendChild(questionButton);
            });
        }
    });
});
