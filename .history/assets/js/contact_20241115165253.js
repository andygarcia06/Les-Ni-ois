// Gérer l'affichage des boutons de "Sujet" au clic sur la section
document.getElementById('subject-section').addEventListener('click', function () {
    const subjectOptions = document.getElementById('subject');
    subjectOptions.classList.toggle('show'); // Affiche ou masque les boutons des sujets
});

// Gérer la sélection d'un sujet et l'affichage des questions
document.querySelectorAll('#subject button').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Empêche le clic de réafficher ou masquer les options de Sujet

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
            questions[t
