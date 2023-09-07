function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
}

class Gallery {
  constructor(element) {
    this.container = element;

    // selecting the lists of imgs as arrays
    this.list = [...element.querySelectorAll('.img')];

    // selecting the document elements
    this.modal = getElement('.modal');
    this.modalImg = getElement('.main-img');
    this.imageName = getElement('.image-name');
    this.modalImages = getElement('.modal-images');
    this.closeBtn = getElement('.close-btn');
    this.nextBtn = getElement('.next-btn');
    this.prevBtn = getElement('.prev-btn');

    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);

    // adding EventListener to the section containers to open modal
    this.container.addEventListener(
      'click',
      // container event
      function (e) {
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.list);
        }
      }.bind(this) // binding the container event function back to the Gallery
    );
  }

  openModal(selectedImage, list) {
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
      .map(function (image) {
        return `
      <img src="${image.src}" 
      title="${image.title}" 
      data-id="${image.dataset.id}" 
      class="${
        selectedImage.dataset.id === image.dataset.id
          ? 'modal-img selected'
          : 'modal-img'
      }" />`;
      })
      .join('');
    this.modal.classList.add('open');

    // adding EventListener to the buttons
    this.closeBtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.chooseImage);
  }

  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
  }

  closeModal() {
    this.modal.classList.remove('open');
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.chooseImage);
  }

  // next button
  nextImage() {
    const selected = this.modalImages.querySelector('.selected');
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove('selected');
    next.classList.add('selected');

    // to display the next image
    this.setMainImage(next);
  }

  // prev button
  prevImage() {
    const selected = this.modalImages.querySelector('.selected');
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove('selected');
    prev.classList.add('selected');

    // to display the previous image
    this.setMainImage(prev);
  }

  // to display randomly clicked image
  chooseImage = function (e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected');
      selected.classList.remove('selected');

      this.setMainImage(e.target);
      e.target.classList.add('selected');
    }
  };
}

// selecting the nature and city sections
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
