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

// Adiciona um evento de clique a cada link
menuDashLinks.forEach((link) => {
  link.addEventListener("click", handleMenuLinkClick);
});



// Teste

function abrirPopup() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function fecharPopup() {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

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

  alert(
    "Você escolheu: " +
      (coresEscolhidas.length > 0 ? coresEscolhidas.join(", ") : "Nenhuma cor")
  );
  fecharPopup();
}
