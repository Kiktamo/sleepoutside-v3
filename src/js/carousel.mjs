export function setupCarousel() {
  // Get elements
  const carousel = document.querySelector('.image-carousel');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  const imgList = carousel.querySelector('ul');
  const dotsContainer = carousel.querySelector('.dots');

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
    imgList.style.transition = 'opacity 0.3s ease-in-out';
    imgList.style.opacity = 0;

    setTimeout(() => {
      imgList.style.transform = `translateX(-${currentIndex * 100}%)`;
      imgList.style.opacity = 1;
    }, 300);
    dotsContainer.querySelector('.active')?.classList.remove('active');
    dotsContainer
      .querySelector(`.dot[data-index="${currentIndex}"]`)
      ?.classList.add('active');
  });

  // Previous button click
  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }
    // Shift images left
    imgList.style.transition = 'opacity 0.3s ease-in-out';
    imgList.style.opacity = 0;

    setTimeout(() => {
      imgList.style.transform = `translateX(-${currentIndex * 100}%)`;
      imgList.style.opacity = 1;
    }, 300);
    dotsContainer.querySelector('.active')?.classList.remove('active');
    dotsContainer
      .querySelector(`.dot[data-index="${currentIndex}"]`)
      ?.classList.add('active');
  });

  dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      const { index } = e.target.dataset;

      currentIndex = index;

      updateCarousel(currentIndex);
    }
  });
}

export function updateCarousel(currentIndex) {
  const carousel = document.querySelector('.image-carousel');
  const imgList = carousel.querySelector('ul');
  const dotsContainer = carousel.querySelector('.dots');

  // Update transform
  imgList.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Update current dot
  dotsContainer.querySelector('.active')?.classList.remove('active');
  dotsContainer
    .querySelector(`.dot[data-index="${currentIndex}"]`)
    ?.classList.add('active');
}
