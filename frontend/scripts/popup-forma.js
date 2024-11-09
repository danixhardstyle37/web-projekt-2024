document.getElementById('openPopup').addEventListener('click', function(e) {
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
    userName.innerText = 'Korisnik'; // Zamijeniti sa stvarnim korisnikom

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
