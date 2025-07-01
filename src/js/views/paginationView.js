import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  constructor() {
    super();
  }

  _generateMarkup() {
    const markupLeft = `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.currPage - 1}</span>
      </button>`;
    const markupRight = `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    return this._data.currPage > 1 && this._data.currPage < this._data.pageCount
      ? markupLeft + markupRight
      : this._data.currPage > 1
      ? markupLeft
      : this._data.currPage < this._data.pageCount
      ? markupRight
      : '';
  }

  addPageHandler(increase, decrease) {
    this._parentEl.addEventListener('click', function (e) {
      const el = e.target.closest('.btn--inline');
      if (!el) return;
      el.classList.contains('pagination__btn--prev') ? decrease() : increase();
    });
  }
}

export default new PaginationView();
