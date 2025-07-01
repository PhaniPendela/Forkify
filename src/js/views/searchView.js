class SearchView {
  #parentEl = document.querySelector('.search');
  constructor() {}
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearSearchBar();
    return query;
  }
  addSearchHandler(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
  #clearSearchBar() {
    this.#parentEl.querySelector('.search__field').value = '';
    this.#parentEl.querySelector('.search__field').focus();
  }
}

export default new SearchView();
