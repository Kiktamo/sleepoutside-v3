export default function setupCarousel() {
  // Get elements
  const carousel = document.querySelector('.image-carousel');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const imgList = carousel.querySelector('ul');

  let maxIndex = imgList.childElementCount - 1;

  // Track current image index
  let currentIndex = 0;

  // Next button click
  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    // Shift images left
    imgList.style.transition = 'transform 0.5s ease';
    imgList.style.transform = `translateX(-${currentIndex * 100}%)`;
  });

  // Previous button click
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }
    // Shift images right
    imgList.style.transition = 'transform 0.5s ease';
    imgList.style.transform = `translateX(-${currentIndex * 100}%)`;
  });
}
