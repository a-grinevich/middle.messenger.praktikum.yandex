import Handlebars from 'handlebars';
import * as Pages from './pages';
import { mockPages } from './mockData.js';

export default class App {
  constructor() {
    this.state = {
      currentPage: 'navigation'
    };
    this.appElement = document.getElementById('app');
  }

  render() {
      const template = Handlebars.compile(Pages.NavigationPage);
      this.appElement.innerHTML = template({
        pages: mockPages
      });
  }
}
