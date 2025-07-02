import PreviewView from './previewView.js';

class BookmarkView extends PreviewView {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  constructor() {
    super();
  }
}

export default new BookmarkView();
