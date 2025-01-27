import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import { cardMockup } from './js/render-functions';

const searchForm = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
let query = '';
let lightbox;

loader.style.display = 'none';

const submitForm = async event => {
  event.preventDefault();
  gallery.innerHTML = '';

  query = event.currentTarget.elements.user_query.value.trim();
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  loader.style.display = 'block';

  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      position: 'topRight',
      message: 'Please enter a search query!',
    });
    loader.style.display = 'none';
    return;
  }

  loader.style.display = 'block';

  try {
    const { data } = await fetchImages(query, page);

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    const markup = cardMockup(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox = new SimpleLightbox('.gallery-link', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    searchForm.reset();

    if (data.totalHits > 1) {
      loadMoreBtn.classList.remove('is-hidden');

      loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
};

searchForm.addEventListener('submit', submitForm);

const onLoadMoreBtnClick = async event => {
  loader.style.display = 'block';
  page++;
  try {
    const { data } = await fetchImages(query, page);
    loader.style.display = 'none';

    const markup = cardMockup(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    if (page * 15 >= data.totalHits) {
      iziToast.info({
        title: 'Info',
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topRight',
      message: 'Failed to load images. Please try again later.',
    });
  }
};

const smoothScroll = () => {
  const { height: cardHeight } = gallery.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};