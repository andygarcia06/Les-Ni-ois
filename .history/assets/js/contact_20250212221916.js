document.addEventListener('DOMContentLoaded', () => {
    // Références aux éléments
    const subjectSection = document.getElementById('subject-section');
    const subjectContainer = document.getElementById('subject');
    const questionContainer = document.getElementById('question');
    const hiddenSubject = document.querySelector('input[name="subject"]');
    const hiddenQuestion = document.querySelector('input[name="question"]');
    const sendEmailButton = document.getElementById('sendEmailButton');
    const contactForm = document.getElementById('contactForm');
    const popup = document.getElementById('contactPopup');
    const closePopup = document.getElementById('closePopup');
  
    // Données pour les questions
    const questionsData = {
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
  
    // Fonction d'animation minimale
    function animateButtons(container) {
      container.querySelectorAll('button').forEach((btn, i) => {
        btn.style.animationDelay = `${i * 0.1}s`;
        btn.classList.add('animated');
      });
    }
  
    // Affiche les boutons "Sujet" au clic sur la section
    subjectSection.addEventListener('click', () => {
      if (!subjectContainer.classList.contains('show')) {
        subjectContainer.classList.add('show');
        animateButtons(subjectContainer);
      }
    });
  
    // Pour chaque bouton de sujet, gérer la sélection et générer les questions associées
    document.querySelectorAll('#subject button').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        // Active le bouton sélectionné et met à jour le champ caché
        document.querySelectorAll('#subject button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        hiddenSubject.value = btn.value;
  
        // Génération dynamique des questions
        questionContainer.innerHTML = '';
        if (questionsData[btn.value]) {
          questionsData[btn.value].forEach((q, i) => {
            const qBtn = document.createElement('button');
            qBtn.type = 'button';
            qBtn.textContent = q.text;
            qBtn.value = q.value;
            qBtn.style.animationDelay = `${i * 0.1}s`;
            qBtn.classList.add('animated');
            qBtn.addEventListener('click', () => {
              document.querySelectorAll('#question button').forEach(b => b.classList.remove('active'));
              qBtn.classList.add('active');
              hiddenQuestion.value = qBtn.value;
            });
            questionContainer.appendChild(qBtn);
          });
          questionContainer.classList.add('show');
        }
      });
    });
  
    // Envoi du formulaire et affichage de la popup en cas de succès
    sendEmailButton.addEventListener('click', async e => {
      e.preventDefault();
      const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        subject: hiddenSubject.value,
        question: hiddenQuestion.value,
        message: document.getElementById('message').value
      };
  
      try {
        const res = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          popup.classList.add('show');
          contactForm.reset();
        } else {
          console.error('Erreur lors de l\'envoi:', res.statusText);
        }
      } catch (err) {
        console.error('Erreur lors de l\'envoi:', err);
      }
    });
  
    // Gestion de la fermeture de la popup
    closePopup.addEventListener('click', () => popup.classList.remove('show'));
    window.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('show'); });
  });
  