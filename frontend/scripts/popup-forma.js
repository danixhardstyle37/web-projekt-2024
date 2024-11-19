import service from './service.js';

document.getElementById('openPopup').addEventListener('click', function(e) {
    const username = localStorage.getItem('username') || 'admin';

    document.querySelector('.review-preview .user-name').textContent = username;

    e.preventDefault();
    document.getElementById('reviewPopup').style.display = 'flex';
});


document.getElementById('closePopup').addEventListener('click', function() {
    document.getElementById('reviewPopup').style.display = 'none';
});

const username = localStorage.getItem('username') || 'admin';

document.getElementById('reviewForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const imageFile = document.getElementById('reviewImage').files[0];
    const reviewText = document.getElementById('reviewText').value;
    const selectedIcon = document.querySelector('input[name="animalIcon"]:checked').value;

    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('col-lg-6', 'col-md-6');

    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('col-sm-5', 'review-image');
    
    const imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(imageFile);
    imgElement.alt = 'Review Image';
    imageDiv.appendChild(imgElement);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('col-sm-7', 'review-content');
    
    const userName = document.createElement('h3');
    userName.classList.add('user-name');
    const username = localStorage.getItem('username') || 'admin';
    userName.innerText = username;

    const reviewTextElement = document.createElement('p');
    reviewTextElement.classList.add('review-text');
    reviewTextElement.innerText = reviewText;

    contentDiv.appendChild(userName);
    contentDiv.appendChild(reviewTextElement);

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

    document.getElementById('forum-reviews').appendChild(reviewDiv);

    document.getElementById('reviewPopup').style.display = 'none';


    const reviewsContainer = document.getElementById('forum-reviews');
    const existingReviews = reviewsContainer.getElementsByClassName('review-card');
    const nextReviewNumber = existingReviews.length + 1;
    const imagePath = `imgs/reviews/review${nextReviewNumber}.jpg`;

    const user = await service.getKorisnikByUsername(username);

    const reviewData = {
        korisnik: {id: user.id},
        message: reviewText,
        imgPth: imagePath,  
        animal: selectedIcon === 'dog' ? 'p' : 's'  
    };

    await service.addForum(reviewData);
    await service.saveImage(imageFile, nextReviewNumber);
});


document.querySelector('.user-name').textContent = username;


document.getElementById('reviewImage').addEventListener('change', function (event) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('previewImage').src = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('reviewText').addEventListener('input', function () {
    document.getElementById('previewText').innerText = this.value || 'Ovdje će se prikazati vaš tekst recenzije.';
});

document.querySelectorAll('input[name="animalIcon"]').forEach(icon => {
    icon.addEventListener('change', function () {
        const selectedIcon = this.value === 'dog' ? 'imgs/dog-icon.png' : 'imgs/pig-icon.png';
        document.getElementById('previewIcon').src = selectedIcon;
    });
});


async function loadForumReviews() {
    try {
        const reviews = await service.getForumAll();

        console.log(reviews)

        const reviewsContainer = document.getElementById('forum-reviews');

        if (reviews && reviews.length > 0) {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('col-lg-6', 'col-md-6');
                reviewCard.innerHTML = `
                    <div class="review-card">
                        <div class="row">
                            <div class="col-sm-5 review-image">
                                <img src="${review.imgPth}" alt="Review Image">
                            </div>
                            <div class="col-sm-7 review-content">
                                <h3 class="user-name">${review.korisnik.username}</h3>
                                <p class="review-text">${review.message}</p>
                            </div>
                        </div>
                        <img src="${review.animal === 'p' ? 'imgs/dog-icon.png' : 'imgs/pig-icon.png'}" alt="Animal Icon" class="animal-icon">
                    </div>
                `;

                reviewsContainer.appendChild(reviewCard);
            });
        } 
    } catch (error) {
        console.error('Error loading forum reviews:', error);
    }
}

loadForumReviews();