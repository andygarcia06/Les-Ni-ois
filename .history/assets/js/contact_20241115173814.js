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


// Gérer l'envoi des informations au backend !!! 

// Affiche les questions en fonction du sujet sélectionné
document.querySelectorAll('#subject button').forEach(button => {
    button.addEventListener('click', function () {
        // Active le bouton de sujet sélectionné
        document.querySelectorAll('#subject button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const selectedSubject = this.value;
        document.querySelector('input[name="subject"]').value = selectedSubject;

        const questionContainer = document.getElementById('question');
        questionContainer.innerHTML = ''; // Efface les questions précédentes

        // Définit les questions en fonction du sujet sélectionné
        const questions = {
            resto: ['Réservation', 'Privatisation', 'Autres questions'],
            shop: ['Facturation', 'Suivi de commande', 'Réclamation', 'Autres questions'],
            autre: ['Recrutement', 'Données personnelles', 'Autres questions']
        };

        questions[selectedSubject].forEach(text => {
            const questionButton = document.createElement('button');
            questionButton.type = 'button';
            questionButton.textContent = text;
            questionButton.value = text;

            questionButton.addEventListener('click', function () {
                document.querySelectorAll('#question button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                document.querySelector('input[name="question"]').value = this.value;
            });

            questionContainer.appendChild(questionButton);
        });
    });
});

// Envoie le formulaire au serveur pour envoyer un e-mail
document.getElementById('sendEmailButton').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const question = document.querySelector('input[name="question"]').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Important : indiquez le type de contenu comme JSON
            },
            body: JSON.stringify({ name, phone, email, subject, question, message })
        });

        const result = await response.text();
        alert(result); // Affiche le message de confirmation
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
    }
});

