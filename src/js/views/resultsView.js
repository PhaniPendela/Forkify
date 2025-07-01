import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  constructor() {
    super();
  }

  _generateMarkup() {
    return this._data.map(this.#generateMarkup).join('');
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
}

export default new ResultView();
