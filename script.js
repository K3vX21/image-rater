const imageContainer = document.querySelector('#image-container');
const image = document.querySelector('#image');
const nextButton = document.querySelector('#next-button');
let currentIndex = 0;
let imageUrls = [];

fetch('local-urls.csv')
  .then(response => response.text())
  .then(data => {
    imageUrls = data.split('\n').slice(1); // remove header row
    image.src = imageUrls[currentIndex];
    imageContainer.style.display = 'block';
  });

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= imageUrls.length) {
    currentIndex = 0;
  }
  image.src = imageUrls[currentIndex];
});
