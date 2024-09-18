/*=============== SHOW SIDEBAR ===============*/
const toggleSidebar = (toggleId, sidebarId, headerId, mainId) => {
  const toggle = document.getElementById(toggleId);
  const sidebar = document.getElementById(sidebarId);
  const header = document.getElementById(headerId);
  const main = document.getElementById(mainId);

  if (toggle && sidebar && header && main) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("show-sidebar");
      header.classList.toggle("left-pd");
      main.classList.toggle("left-pd");
    });
  }
};
toggleSidebar("header-toggle", "sidebar", "header", "main");

/*=============== LINK ACTIVE ===============*/
const setActiveLink = (selector) => {
  const links = document.querySelectorAll(selector);

  links.forEach((link) => {
    link.addEventListener("click", function () {
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
};

// Apply to sidebar links and menu links
setActiveLink(".sidebar__list a");
setActiveLink(".menu__link");

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-fill";

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme)
    ? "ri-moon-clear-fill"
    : "ri-sun-fill";

// Load previously selected theme and icon
const loadTheme = () => {
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    themeButton.classList[
      selectedIcon === "ri-moon-clear-fill" ? "add" : "remove"
    ](iconTheme);
  }
};
loadTheme();

// Toggle theme on button click
themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// Seleciona todos os links do menu principal
const menuDashLinks = document.querySelectorAll(".menu__dash-link");

// Função para adicionar a classe 'active' ao link clicado
function handleMenuLinkClick() {
  // Remove a classe 'active' de todos os links
  menuDashLinks.forEach((link) => link.classList.remove("active"));

  // Adiciona a classe 'active' ao link clicado
  this.classList.add("active");
}

/*=============== LINK ACTIVE PARA MENU TIME ===============*/
const setActiveLinkForMenuTime = (selector) => {
  const links = document.querySelectorAll(selector);

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Previne o comportamento padrão do link

      // Remove a classe 'active' de todos os links
      links.forEach((l) => l.classList.remove("active"));

      // Adiciona a classe 'active' ao link clicado
      this.classList.add("active");
    });
  });
};

// Aplica a função aos links no menu de tempo
setActiveLinkForMenuTime(".item__time");


// Adiciona um evento de clique a cada link
menuDashLinks.forEach((link) => {
  link.addEventListener("click", handleMenuLinkClick);
});

/*=============== POPUP ===============*/

// Variável para armazenar o link anteriormente selecionado
let previousSelectedLink = document.querySelector(".menu__dash-link.active");
let currentSelectedLink = null;

// Função para abrir o popup
function abrirPopup(event) {
  event.preventDefault();

  // Define o link atual como o clicado, mas sem remover a classe 'active' ainda
  currentSelectedLink = event.target;

  // Mostra o popup e o overlay
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Função para fechar o popup sem confirmar
function fecharPopup() {
  // Se o usuário cancelar, reativa o link anterior e remove 'active' do atual
  if (previousSelectedLink) {
    previousSelectedLink.classList.add("active");  // Adiciona 'active' ao link anterior
  }
  if (currentSelectedLink && currentSelectedLink !== previousSelectedLink) {
    currentSelectedLink.classList.remove("active");  // Remove 'active' do link que foi clicado
  }
  
  // Fecha o popup e o overlay
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}


// Função para confirmar a escolha
function confirmarEscolha() {
  let coresEscolhidas = [];

  if (document.getElementById("verde").checked) {
    coresEscolhidas.push("Verde");
  }
  if (document.getElementById("amarelo").checked) {
    coresEscolhidas.push("Amarelo");
  }
  if (document.getElementById("azul").checked) {
    coresEscolhidas.push("Azul");
  }

  alert("Você escolheu: " + (coresEscolhidas.length > 0 ? coresEscolhidas.join(", ") : "Nenhuma cor"));

  // Atualiza o link ativo corretamente
  if (currentSelectedLink) {
    // Remove a classe 'active' do link anterior
    if (previousSelectedLink) {
      previousSelectedLink.classList.remove("active");
    }

    // Adiciona a classe 'active' ao link atual
    currentSelectedLink.classList.add("active");

    // Atualiza o link anterior para o próximo uso
    previousSelectedLink = currentSelectedLink;
  }

  // Fecha o popup após confirmar
  fecharPopup();
}

// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll(".menu__dash-link");

// Adiciona o evento de clique em cada link para abrir o popup
menuLinks.forEach(link => {
  link.addEventListener("click", abrirPopup);
});
