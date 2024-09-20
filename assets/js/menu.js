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

/*=============== Hover Duvida ===============*/

const duvidaIcons = document.querySelectorAll(".duvidaIcon");

// Cria o tooltip
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.textContent =
  "Pedidos refere a compensações de pagamentos recolhidos indevidamente ou a maior.";
document.body.appendChild(tooltip);

/*=============== POPUP TAREFAS ===============*/

const infoPopup6 = document.getElementById("infoPopup6");
const closeInfoPopup6 = document.getElementById("closeInfoPopup6");
const infoPopup7 = document.getElementById("infoPopup7");
const closeInfoPopup7 = document.getElementById("closeInfoPopup7");
const arrowIcons = document.querySelectorAll(
  ".card__date i.ri-arrow-down-s-line"
);

arrowIcons[0].addEventListener("click", () => {
  infoPopup6.style.display = "flex"; // Mostra o popup do card 6
});

arrowIcons[1].addEventListener("click", () => {
  infoPopup7.style.display = "flex"; // Mostra o popup do card 7
});

closeInfoPopup6.addEventListener("click", () => {
  infoPopup6.style.display = "none"; // Esconde o popup do card 6
});

closeInfoPopup7.addEventListener("click", () => {
  infoPopup7.style.display = "none"; // Esconde o popup do card 7
});

// Fecha os popups ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === infoPopup6) {
    infoPopup6.style.display = "none";
  }
  if (event.target === infoPopup7) {
    infoPopup7.style.display = "none";
  }
});

// Adiciona eventos de hover para cada ícone de dúvida
duvidaIcons.forEach((icon) => {
  icon.addEventListener("mouseover", function (event) {
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + "px";
    tooltip.style.top = event.pageY + 20 + "px"; // Posiciona o tooltip
  });

  icon.addEventListener("mouseout", function () {
    tooltip.style.display = "none";
  });
});

/*=============== POPUP ===============*/

// Variável para armazenar o link anteriormente selecionado
let previousSelectedLink = document.querySelector(".menu__dash-link.active");
let currentSelectedLink = null;

function confirmarEscolha() {
  // Fecha o popup
  fecharPopup();

  // Remove a classe 'active' do item anterior, se houver
  if (previousSelectedLink) {
    previousSelectedLink.classList.remove("active");
  }

  // Verifica se o link clicado está armazenado e aplica o estilo 'active'
  if (currentSelectedLink) {
    currentSelectedLink.classList.add("active");
  }

  // Atualiza o anterior para o atual
  previousSelectedLink = currentSelectedLink;

  console.log("Escolha confirmada!");
}

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
    previousSelectedLink.classList.add("active"); // Adiciona 'active' ao link anterior
  }
  if (currentSelectedLink && currentSelectedLink !== previousSelectedLink) {
    currentSelectedLink.classList.remove("active"); // Remove 'active' do link que foi clicado
  }

  // Fecha o popup e o overlay
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function toggleImagem(checkbox) {
  const target = document.querySelector(checkbox.getAttribute("data-target"));

  // Exibe ou oculta a imagem associada
  if (checkbox.checked) {
    // Verifica se é a div .saldo e mantém display flex
    if (target.classList.contains("saldo")) {
      target.style.display = "flex";
    } else {
      target.style.display = "block";
    }
  } else {
    target.style.display = "none";
  }

  // Controle de opacidade para "Gráficos - Erros de apuração"
  if (checkbox.getAttribute("data-target") === ".grafico") {
    const cardInfo2 = document.querySelector(".card__info2");
    cardInfo2.style.opacity = checkbox.checked ? "1" : "0.2";
  }

  // Controle de opacidade para "Saldo acumulado"
  if (checkbox.getAttribute("data-target") === ".saldo") {
    const cardContainer3 = document.querySelector(".card__container-3");
    cardContainer3.style.opacity = checkbox.checked ? "1" : "0.2";
  }

  // Controle de opacidade para "Priorização de tarefas"
  if (checkbox.getAttribute("data-target") === ".prioridade") {
    const cardContainer6 = document.querySelector(".card__container-6");
    cardContainer6.style.opacity = checkbox.checked ? "1" : "0.2";
  }

  // Controle de opacidade para "Divergências"
  if (checkbox.getAttribute("data-target") === ".divergencias") {
    const cardContainer8 = document.querySelector(".card__container-8");
    cardContainer8.style.opacity = checkbox.checked ? "1" : "0.2";
  }
}

// Seleciona todos os links do menu
const menuLinks = document.querySelectorAll(".menu__dash-link");

// Adiciona o evento de clique em cada link para abrir o popup
menuLinks.forEach((link) => {
  link.addEventListener("click", abrirPopup);
});
