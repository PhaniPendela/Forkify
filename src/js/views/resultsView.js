import PreviewView from './previewView.js';

class ResultView extends PreviewView {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  constructor() {
    super();
  }
}

export default new ResultView();
