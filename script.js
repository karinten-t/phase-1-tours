
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const toursContainer = document.getElementById('tours-container');
const skillsList = document.getElementById('skills-list');
const contactForm = document.getElementById('contact-form');
const exploreBtn = document.getElementById('explore-btn');
const filterAffordable = document.getElementById('filter-affordable');
const filterAll = document.getElementById('filter-all');
const guideImg = document.getElementById('guide-img');
const addTourForm = document.getElementById('add-tour-form'); 


const guideData = {
    name: "FRANCIS LITASON",
    image: "images/WhatsApp Image 2025-03-18 at 02.02.13.jpeg",
    skills: ["Photography", "Wildlife & birding Expert", "Certified silver guide", "Cultural Knowledge", "Navigation & Exploration"],
    vision: "To provide authentic, sustainable travel experiences that connect people with nature and local cultures while preserving the environment for future generations."
};


document.addEventListener('DOMContentLoaded', function() {
    setupGuide();
    loadTours();
    setupEventListeners();
});

function setupGuide() {
    document.getElementById('guide-name').textContent = guideData.name;
    document.getElementById('guide-vision').textContent = guideData.vision;
    guideImg.src = guideData.image;
    
    guideData.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });
}

function loadTours(filter = null) {
    fetch('http://localhost:3000/tours')
        .then(response => response.json())
        .then(tours => {
            let filteredTours = tours;
            if (filter === 'affordable') {
                filteredTours = tours.filter(tour => tour.price < 1000);
            }
            
            toursContainer.innerHTML = '';
            
            if (filteredTours.length === 0) {
                toursContainer.innerHTML = '<p>No tours found matching your criteria.</p>';
            } else {
                filteredTours.forEach(tour => {
                    const card = createTourCard(tour);
                    toursContainer.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Error loading tours:', error);
            toursContainer.innerHTML = '<p>Error loading tours. Please try again later.</p>';
        });
}

function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'tour-card';
    card.innerHTML = `
        <img src="${tour.image}" alt="${tour.name}">
        <div class="card-content">
            <h3>${tour.name}</h3>
            <p>${tour.description}</p>
            <p class="price">$${tour.price}</p>
            <p><strong>Duration:</strong> ${tour.duration}</p>
            <button class="delete-btn" data-id="${tour.id}">Delete Tour</button>
        </div>
    `;
    
    
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTour(tour.id));
    
    return card;
}


function deleteTour(tourId) {
    if (confirm('Are you sure you want to delete this tour?')) {
        fetch(`http://localhost:3000/tours/${tourId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Tour deleted successfully!');
                loadTours(); 
            }
        })
        .catch(error => {
            console.error('Error deleting tour:', error);
            alert('Error deleting tour. Please try again.');
        });
    }
}


function addNewTour(tourData) {
    fetch('http://localhost:3000/tours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData)
    })
    .then(response => response.json())
    .then(newTour => {
        alert('Tour added successfully!');
        loadTours(); 
    })
    .catch(error => {
        console.error('Error adding tour:', error);
        alert('Error adding tour. Please try again.');
    });
}

function setupEventListeners() {
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(section => section.classList.remove('active-section'));
            document.getElementById(sectionId).classList.add('active-section');
        });
    });
    
    
    exploreBtn.addEventListener('click', function() {
        document.querySelector('a[href="#tours"]').click();
    });
    
    
    filterAffordable.addEventListener('click', function() {
        loadTours('affordable');
    });
    
    filterAll.addEventListener('click', function() {
        loadTours();
    });
    
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.name.value,
            email: this.email.value,
            message: this.message.value,
            date: new Date().toISOString()
        };
        
        console.log('Form submitted:', formData);
        alert('Thank you for your message! Frank will contact you soon.');
        this.reset();
    });
    
    
    if (addTourForm) {
        addTourForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newTour = {
                name: this.tourName.value,
                description: this.tourDescription.value,
                price: parseFloat(this.tourPrice.value),
                duration: this.tourDuration.value,
                image: this.tourImage.value || 'images/default-tour.jpg'
            };
            
            addNewTour(newTour);
            this.reset();
        });
    }
    
    guideImg.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.03)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    guideImg.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}
