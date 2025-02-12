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

document.addEventListener('DOMContentLoaded', function() {
    const sendEmailButton = document.getElementById('sendEmailButton');
    const popup = document.getElementById('contactPopup');
    const closeBtn = document.getElementById('closePopup');

    if (sendEmailButton && popup && closeBtn) {
        sendEmailButton.addEventListener('click', async function(event) {
            event.preventDefault(); // Empêche l'envoi réel du formulaire

            // Récupérer les données du formulaire
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, phone, email, subject, question, message })
                });

                if (response.ok) {
                    // Afficher la popup en cas de succès
                    popup.classList.add('show');

                    // Réinitialiser le formulaire après l'envoi
                    document.getElementById('contactForm').reset();
                } else {
                    console.error('Erreur lors de l\'envoi de l\'email:', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
            }
        });

        closeBtn.addEventListener('click', function() {
            // Masquer la popup
            popup.classList.remove('show');
        });

        // Fermer la popup si l'utilisateur clique en dehors du contenu
        window.addEventListener('click', function(event) {
            if (event.target === popup) {
                popup.classList.remove('show');
            }
        });
    } else {
        console.error('Les éléments sendEmailButton, popup ou closeBtn sont introuvables.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sendEmailButton = document.getElementById('sendEmailButton');
    const popup = document.getElementById('contactPopup');
    const closeBtn = document.getElementById('closePopup');
    const contactForm = document.getElementById('contactForm');
  
    if (sendEmailButton && popup && closeBtn && contactForm) {
      sendEmailButton.addEventListener('click', async function(event) {
        event.preventDefault(); // Empêche l'envoi classique du formulaire
  
        // Affiche immédiatement la popup dès le clic
        popup.classList.add('show');
  
        // Récupérer les données du formulaire
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const subject = document.querySelector('input[name="subject"]').value;
        const question = document.querySelector('input[name="question"]').value;
        const message = document.getElementById('message').value;
  
        try {
          // Envoi asynchrone des données au backend
          const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, email, subject, question, message })
          });
  
          if (!response.ok) {
            console.error('Erreur lors de l\'envoi de l\'email:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
        }
  
        // Réinitialiser le formulaire (peut être effectué après un court délai si nécessaire)
        contactForm.reset();
      });
  
      // Gestion de la fermeture de la popup
      closeBtn.addEventListener('click', function() {
        popup.classList.remove('show');
      });
  
      // Ferme la popup si l'utilisateur clique en dehors du contenu
      window.addEventListener('click', function(event) {
        if (event.target === popup) {
          popup.classList.remove('show');
        }
      });
    } else {
      console.error('Les éléments sendEmailButton, popup, closeBtn ou contactForm sont introuvables.');
    }
  });
  






