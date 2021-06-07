import images from './gallery-items.js';
console.log(images);

//Создание и рендер разметки по массиву данных и предоставленному шаблону.

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
  link: document.querySelector('.gallery__link'),
  img: document.querySelector('.gallery__image'),
  lightbox: document.querySelector('.js-lightbox'),
  imgLightbox: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

refs.galleryList.innerHTML = galleryItem;
console.log(galleryItem);
//Реализация делегирования на галерее ul.js-gallery 
//и получение url большого изображения.

refs.galleryList.addEventListener('click', onImgClick);

function onImgClick(event) {
  event.preventDefault();
  console.log(event.target.nodeName);
  console.log(refs.img);
  if (event.target.nodeName !== 'IMG') {
    return;
  };

  //Подмена значения атрибута src элемента img.lightbox__image.

  refs.imgLightbox.src =  event.target.dataset.source;
  refs.imgLightbox.alt = event.target.alt;
  
  //Открытие модального окна по клику на элементе галереи.

  refs.lightbox.classList.add('is-open');
  window.addEventListener('keydown', onEscClick);



};

//Закрытие модального окна по клику на кнопку
//button[data-action="close-lightbox"]

refs.closeModalBtn.addEventListener('click', onCloseBtnclick);

function onCloseBtnclick() {
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscClick);


};

function onEscClick(event) {
  if (event.code === 'Escape') {
    onCloseBtnclick();
  }
};

//Закрытие модального окна по клику на div.lightbox__overlay.

  refs.lightboxOverlay.addEventListener('click', onCloseBtnclick);


//Очистка значения атрибута src элемента img.lightbox__image. 
//Это необходимо для того, чтобы при следующем открытии модального окна,
//пока грузится изображение, мы не видели предыдущее.




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