import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";
import { mockPages } from "./mockData.js";
import "./helpers/handlebarsHelpers.js";

// Register partials
Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

export default class App {
  constructor() {
    this.state = {
      currentPage: this.getCurrentRoute(),
    };
    this.pages = {
      navigation: {
        title: "Навигация",
        page: Pages.NavigationPage,
        context: {
          pages: mockPages,
        },
      },
      login: {
        title: "Авторизация",
        page: Pages.LoginPage,
      },
      register: {
        title: "Регистрация",
        page: Pages.RegisterPage,
      },
      chat: {
        title: "Список чатов и лента переписки",
        page: Pages.ChatPage,
      },
      settings: {
        title: "Настройки пользователя",
        page: Pages.SettingsPage,
      },
      404: {
        title: "Страница 404",
        page: Pages.ErrorPage,
        context: {
          code: "404"
        },
      },
      500: {
        title: "Страница 5**",
        page: Pages.ErrorPage,
        context: {
          code: "500"
        },
      },
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    const currentPage = this.pages[this.state.currentPage];
    const template = Handlebars.compile(currentPage.page);
    this.appElement.innerHTML = template(currentPage.context);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const navigationLinks = document.querySelectorAll(".navigation-link");
    navigationLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage(e.target.dataset.page);
      });
    });
    window.addEventListener(
      "popstate",
      () => {
        this.navigate(this.getCurrentRoute());
      },
      false,
    );
  }

  changePage(page) {
    window.history.pushState({}, "", page);
    this.navigate(page);
  }

  navigate(page) {
    if (!page) {
      page = "navigation";
    }
    this.state.currentPage = page;
    this.render();
  }

  getCurrentRoute() {
    const route = window.location.pathname.replace("/", "");
    return route ? route : "navigation";
  }
}
