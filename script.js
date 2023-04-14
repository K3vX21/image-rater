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
        // Initialize imageData array with empty values
        imageData = new Array(imageList.length).fill(null);
        // Display the first image in the list
        displayImage(imageList[currentIndex]);
    });

// Add event listeners to buttons
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
    if (event.keyCode === 13) {
        const rating = parseFloat(ratingInput.value);
        imageData[currentIndex] = rating;
        ratingInput.value = '';
        currentIndex++;
        if (currentIndex >= imageList.length) {
            currentIndex = 0;
        }
        displayImage(imageList[currentIndex]);
    }
});

// Function to display image
function displayImage(url) {
    image.src = url;
}