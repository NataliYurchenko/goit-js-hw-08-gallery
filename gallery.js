import images from './gallery-items.js';
console.log(images);

const galleryItem = images.map(image => {
    return `<li class='gallery__item'>
    <a
    class="gallery__link"
    href="${image.original}"
    >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</li>`;
}).join('');

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  //img: document.querySelector('.gallery__image'),
  lightbox: document.querySelector('.js-lightbox'),
  imgLightbox: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

refs.galleryList.innerHTML = galleryItem;

refs.galleryList.addEventListener('click', onImgClick);
refs.closeModalBtn.addEventListener('click', onCloseBtnclick);
refs.lightboxOverlay.addEventListener('click', onCloseBtnclick);

function onImgClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  };

  refs.imgLightbox.src =  event.target.dataset.source;
  refs.imgLightbox.alt = event.target.alt;
  
  refs.lightbox.classList.add('is-open');
  window.addEventListener('keydown', onEscClick);
};

function onCloseBtnclick() {
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscClick);
  refs.imgLightbox.src = '';
};

function onEscClick(event) {
  if (event.code === 'Escape') {
    onCloseBtnclick();
  }
};


// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>