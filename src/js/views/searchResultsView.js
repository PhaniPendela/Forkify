import icons from 'url:../../img/icons.svg';

class SearchResultsView {
  #parentEl = document.querySelector('.search-results');
  #data;
  #pageCount;
  #currPage = 1;
  constructor() {
    this.#paginationHandler();
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this.#clear();
    this.#parentEl
      .querySelector('.results')
      .insertAdjacentHTML('afterbegin', markup);
  }

  render(data) {
    this.#data = data;
    this.#pageCount = Math.ceil(data.length / 10);
    this.#renderCurrentList();
  }

  #renderCurrentList() {
    console.log('CURR PAGE');
    this.#clear();
    for (
      let i = (this.#currPage - 1) * 10;
      i < this.#currPage * 10 && i < this.#data.length;
      i++
    ) {
      const markup = this.#generateMarkup(this.#data[i]);
      this.#parentEl
        .querySelector('.results')
        .insertAdjacentHTML('afterbegin', markup);
    }
    this.#renderPagination();
  }

  #paginationHandler() {
    console.log('HANDLER');
    this.#parentEl
      .querySelector('.pagination')
      .addEventListener('click', this.#paginationHandlerCallBack.bind(this));
  }

  #paginationHandlerCallBack(e) {
    console.log(this.#currPage);
    const el = e.target.closest('.btn--inline');
    if (!el) return;
    el.classList.contains('pagination__btn--prev')
      ? this.#currPage--
      : this.#currPage++;
    this.#renderCurrentList();
  }

  #renderPagination() {
    const markupLeft = `
    <button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this.#currPage - 1}</span>
    </button>`;
    const markupRight = `
    <button class="btn--inline pagination__btn--next">
      <span>Page ${this.#currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    const markup =
      this.#currPage > 1 && this.#currPage < this.#pageCount
        ? markupLeft + markupRight
        : this.#currPage > 1
        ? markupLeft
        : markupRight;
    this.#parentEl.querySelector('.pagination').innerHTML = markup;
  }

  #generateMarkup(data) {
    return `
    <li class="preview">
      <a class="preview__link" href="#${data.id}">
        <figure class="preview__fig">
          <img src="${data.image}" alt="${data.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${data.title} ...</h4>
          <p class="preview__publisher">${data.publisher}</p>
          <div class="preview__user-generated hidden">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }

  #clear() {
    this.#parentEl.querySelector('.results').innerHTML = '';
    this.#parentEl.querySelector('.pagination').innerHTML = '';
  }
}

export default new SearchResultsView();
