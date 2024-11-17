import service from './service.js';

document.getElementById('openPopup').addEventListener('click', function(e) {

    // Dohvat korisničkog imena iz localStorage ili postavljanje defaultnog
    const username = localStorage.getItem('username') || 'admin';

    // Prikaz korisničkog imena odmah u pregledu recenzije
    document.querySelector('.review-preview .user-name').textContent = username;

    e.preventDefault();
    document.getElementById('reviewPopup').style.display = 'flex';
});


document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('reviewPopup').style.display = 'none';
});


// Funkcija za dodavanje recenzije
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Dohvat podataka iz forme
    const imageFile = document.getElementById('reviewImage').files[0];
    const reviewText = document.getElementById('reviewText').value;
    const selectedIcon = document.querySelector('input[name="animalIcon"]:checked').value;

    // Kreiramo novi div za recenziju
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('col-lg-6', 'col-md-6');

    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('col-sm-5', 'review-image');
    
    // Dodavanje slike (ako postoji)
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(imageFile);
    imgElement.alt = 'Review Image';
    imageDiv.appendChild(imgElement);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('col-sm-7', 'review-content');
    
    // Dodavanje imena korisnika (ovo možemo zamijeniti sa stvarnim imenom korisnika kasnije)
    const userName = document.createElement('h3');
    userName.classList.add('user-name');
    const username = localStorage.getItem('username') || 'admin';
    userName.innerText = username;

    // Dodavanje teksta recenzije
    const reviewTextElement = document.createElement('p');
    reviewTextElement.classList.add('review-text');
    reviewTextElement.innerText = reviewText;

    contentDiv.appendChild(userName);
    contentDiv.appendChild(reviewTextElement);

    // Dodavanje ikone
    const animalIcon = document.createElement('img');
    animalIcon.classList.add('animal-icon');
    if (selectedIcon === 'dog') {
        animalIcon.src = 'imgs/dog-icon.png';
    } else {
        animalIcon.src = 'imgs/pig-icon.png';
    }

    reviewCard.appendChild(rowDiv);
    rowDiv.appendChild(imageDiv);
    rowDiv.appendChild(contentDiv);
    reviewCard.appendChild(animalIcon);
    reviewDiv.appendChild(reviewCard);

    // Dodavanje novog review div-a na stranicu
    document.getElementById('forum-reviews').appendChild(reviewDiv);

    // Zatvaranje pop-up-a nakon dodavanja
    document.getElementById('reviewPopup').style.display = 'none';
});

// Dohvat korisničkog imena
const username = localStorage.getItem('username') || 'admin';

// Prikaz korisničkog imena u pregledu
document.querySelector('.user-name').textContent = username;

// Dinamičko ažuriranje slike
document.getElementById('reviewImage').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('previewImage').src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

// Dinamičko ažuriranje teksta
document.getElementById('reviewText').addEventListener('input', function () {
    document.getElementById('previewText').innerText = this.value || 'Ovdje će se prikazati vaš tekst recenzije.';
});

// Dinamičko ažuriranje ikone
document.querySelectorAll('input[name="animalIcon"]').forEach(icon => {
    icon.addEventListener('change', function () {
        const selectedIcon = this.value === 'dog' ? 'imgs/dog-icon.png' : 'imgs/pig-icon.png';
        document.getElementById('previewIcon').src = selectedIcon;
    });
});


async function loadForumReviews() {
    try {
        // Dohvati recenzije s API-a (pretpostavljamo da je endpoint 'forum')
        const reviews = await service.getForumAll();

        // Pronađi div gdje će recenzije biti prikazane
        const reviewsContainer = document.getElementById('forum-reviews');
        
        // Očisti postojeće recenzije (ako ih ima)
        reviewsContainer.innerHTML = '';

        // Provjeri ima li recenzija
        if (reviews && reviews.length > 0) {
            // Iteriraj kroz recenzije i dodaj HTML za svaku
            reviews.forEach(review => {
                // Kreiraj HTML za svaku recenziju
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('col-lg-6', 'col-md-6');
                reviewCard.innerHTML = `
                    <div class="review-card">
                        <div class="row">
                            <div class="col-sm-5 review-image">
                                <img src="${review.imageUrl}" alt="Review Image">
                            </div>
                            <div class="col-sm-7 review-content">
                                <h3 class="user-name">${review.userName}</h3>
                                <p class="review-text">${review.text}</p>
                            </div>
                        </div>
                        <img src="${review.iconUrl || 'imgs/dog-icon.png'}" alt="Animal Icon" class="animal-icon">
                    </div>
                `;
                // Dodaj novu recenziju u container
                reviewsContainer.appendChild(reviewCard);
            });
        } else {
            reviewsContainer.innerHTML = '<p>No reviews found.</p>';
        }
    } catch (error) {
        console.error('Error loading forum reviews:', error);
    }
}

// Pozovi funkciju za učitavanje recenzija
loadForumReviews();