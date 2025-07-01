class SearchView {
  #parentEl = document.querySelector('.search');
  constructor() {}
  getQuery() {
    return this.#parentEl.querySelector('.search__field').value;
  }
  addHandler(handler) {
    this.#parentEl.addEventListener('submit', handler);
  }
  clearSearchBar() {
    this.#parentEl.querySelector('.search__field').value = '';
    this.#parentEl.querySelector('.search__field').focus();
  }
}

export default new SearchView();
