export const cardMockup = photoData => {
    return photoData
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<a href="${largeImageURL}" class="gallery-link">
    <div class="card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" />
    <div class="card-info">
      <p class="card-info-item">Likes<span>${likes}</span></p>
      <p class="card-info-item">Views<span>${views}</span></p>
      <p class="card-info-item">Comments<span>${comments}</span></p>
      <p class="card-info-item">Downloads<span>${downloads}</span></p>
    </div>
    </div>
    </a>`
      )
      .join('');
  };