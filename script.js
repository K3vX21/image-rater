// Define variables
const image = document.getElementById('image');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const ratingInput = document.getElementById('rating-input');
let currentIndex = 0;
let imageList = [];
let imageData = [];

// Fetch image list from CSV file
fetch('./local-urls.csv')
    .then(response => response.text())
    .then(data => {
        // Parse CSV data into an array of image URLs
        imageList = data.split('\n').filter(url => url.trim() !== '');
        // Initialize imageData with default values
        imageData = new Array(imageList.length).fill(0);
        // Display the first image in the list
        displayImage(imageList[currentIndex]);
    });

// Add event listeners to buttons and input field
nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= imageList.length) {
        currentIndex = 0;
    }
    displayImage(imageList[currentIndex]);
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = imageList.length - 1;
    }
    displayImage(imageList[currentIndex]);
});

ratingInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) { // Enter key
        const rating = parseFloat(ratingInput.value);
        if (!isNaN(rating)) {
            imageData[currentIndex] = rating;
        }
        currentIndex++;
        if (currentIndex >= imageList.length) {
            currentIndex = 0;
        }
        ratingInput.value = "";
        displayImage(imageList[currentIndex]);
    }
});

// Function to display image
function displayImage(url) {
    image.src = url;
}