document.querySelectorAll('#subject button').forEach(button => {
    button.addEventListener('click', function () {
        // Enlever la classe "active" de tous les boutons
        document.querySelectorAll('#subject button').forEach(btn => btn.classList.remove('active'));

        // Ajouter la classe "active" au bouton cliqué
        this.classList.add('active');

        // Enregistrer la sélection
        const selectedValue = this.value;
        console.log("Selected subject:", selectedValue);

        // Mettre à jour le champ caché pour le formulaire
        document.querySelector('input[name="subject"]').value = selectedValue;

        // Mettre à jour la liste des questions en fonction du sujet sélectionné
        const questionSelect = document.getElementById('question');

        // Efface les options existantes
        questionSelect.innerHTML = '<option value="">Sélectionner une question</option>';

        // Définit les questions en fonction du sujet sélectionné
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

        // Ajoute les nouvelles options pour la question en fonction du sujet
        if (questions[selectedValue]) {
            questions[selectedValue].forEach(question => {
                const option = document.createElement('option');
                option.value = question.value;
                option.textContent = question.text;
                questionSelect.appendChild(option);
            });
        }
    });
});
