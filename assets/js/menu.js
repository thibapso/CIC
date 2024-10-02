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

// Função para carregar o tema salvo no LocalStorage
const loadTheme = () => {
  const selectedTheme = localStorage.getItem("selected-theme");
  const selectedIcon = localStorage.getItem("selected-icon");

  console.log("Loaded theme:", selectedTheme);
  console.log("Loaded icon:", selectedIcon);

  if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
      darkTheme
    );
    themeButton.classList[
      selectedIcon === "ri-moon-clear-fill" ? "add" : "remove"
    ](iconTheme);
  }
};

// Limpa o LocalStorage para evitar problemas com valores corrompidos
const clearLocalStorage = () => {
  localStorage.removeItem("selected-theme");
  localStorage.removeItem("selected-icon");
};

// Verifique se o botão existe antes de adicionar o evento
if (themeButton) {
  loadTheme();

  themeButton.addEventListener("click", () => {
    console.log("Theme button clicked");
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Armazena o tema e ícone no LocalStorage
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());

    console.log("Current theme:", getCurrentTheme());
    console.log("Current icon:", getCurrentIcon());
  });
} else {
  console.log("Theme button not found");
}

/*=============== HOVER DUVIDA ===============*/
const duvidaIcons = document.querySelectorAll(".duvidaIcon");
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
tooltip.textContent =
  "Pedidos refere a compensações de pagamentos recolhidos indevidamente ou a maior.";
document.body.appendChild(tooltip);

const tooltipStyle = document.createElement("style");
tooltipStyle.innerHTML = `
.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
}
`;
document.head.appendChild(tooltipStyle);

duvidaIcons.forEach((icon) => {
  icon.addEventListener("mouseover", (event) => {
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + "px";
    tooltip.style.top = event.pageY + 20 + "px";
  });
  icon.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
  });
});

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

/*=============== POPUP TAREFAS ===============*/
const infoPopup6 = document.getElementById("infoPopup6");
const closeInfoPopup6 = document.getElementById("closeInfoPopup6");
const infoPopup7 = document.getElementById("infoPopup7");
const closeInfoPopup7 = document.getElementById("closeInfoPopup7");
const arrowIcons = document.querySelectorAll(
  ".card__date i.ri-arrow-down-s-line"
);

// Abrir popups de informação
if (arrowIcons.length > 0 && infoPopup6 && closeInfoPopup6) {
  arrowIcons[0].addEventListener("click", () => {
    infoPopup6.style.display = "flex"; // Mostra o popup do card 6
  });
}

if (arrowIcons.length > 1 && infoPopup7 && closeInfoPopup7) {
  arrowIcons[1].addEventListener("click", () => {
    infoPopup7.style.display = "flex"; // Mostra o popup do card 7
  });
}

// Fechar popups de informação
if (closeInfoPopup6 && infoPopup6) {
  closeInfoPopup6.addEventListener("click", () => {
    infoPopup6.style.display = "none"; // Esconde o popup do card 6
  });
}

if (closeInfoPopup7 && infoPopup7) {
  closeInfoPopup7.addEventListener("click", () => {
    infoPopup7.style.display = "none"; // Esconde o popup do card 7
  });
}

// Fecha os popups ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === infoPopup6) {
    infoPopup6.style.display = "none";
  }
  if (event.target === infoPopup7) {
    infoPopup7.style.display = "none";
  }
});

/*=============== POPUP ===============*/

// Seleciona todos os links do menu
const menuDashLinks = document.querySelectorAll(".menu__dash-link");

// Função para adicionar a classe 'active' ao link clicado
function handleMenuLinkClick() {
  menuDashLinks.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");
}

// Adiciona o evento de clique a cada link para gerenciar a classe 'active'
menuDashLinks.forEach((link) => {
  link.addEventListener("click", handleMenuLinkClick);
});

// Função para abrir o popup
function abrirPopup(event) {
  event.preventDefault();

  // Verifica se o clique foi na última <li> (que contém o input de busca)
  const lastLi = document.querySelector(".menu__dash li.icon");
  if (lastLi && lastLi.contains(event.target)) {
    return; // Não faz nada se o clique foi na última li (input de busca)
  }

  // Define o link atual como o clicado, mas sem remover a classe 'active' ainda
  currentSelectedLink = event.target;

  // Mostra o popup e o overlay
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  if (popup && overlay) {
    popup.style.display = "block";
    overlay.style.display = "block";
  }
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
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  if (popup && overlay) {
    popup.style.display = "none";
    overlay.style.display = "none";
  }
}

// Variáveis para armazenar os links selecionados
let previousSelectedLink = document.querySelector(".menu__dash-link.active");
let currentSelectedLink = null;

// Função para confirmar a escolha no popup
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

  // Controle de opacidade para "Gráficos - Erros de apuração"
  const graficoCheckbox = document.querySelector("[data-target='.grafico']");
  const cardInfo2 = document.querySelector(".card__info2");
  if (graficoCheckbox && cardInfo2) {
    cardInfo2.style.opacity = graficoCheckbox.checked ? "1" : "0";
  }

  // Controle de opacidade para "Saldo acumulado"
  const saldoCheckbox = document.querySelector("[data-target='.saldo']");
  const cardContainer3 = document.querySelector(".card__container-3");
  if (saldoCheckbox && cardContainer3) {
    cardContainer3.style.opacity = saldoCheckbox.checked ? "1" : "0";
  }

  // Controle de opacidade para "Priorização de tarefas"
  const prioridadeCheckbox = document.querySelector("[data-target='.prioridade']");
  const cardContainer6 = document.querySelector(".card__container-6");
  if (prioridadeCheckbox && cardContainer6) {
    cardContainer6.style.opacity = prioridadeCheckbox.checked ? "1" : "0";
  }

  // Controle de opacidade para "Divergências"
  const divergenciasCheckbox = document.querySelector("[data-target='.divergencias']");
  const cardContainer8 = document.querySelector(".card__container-8");
  if (divergenciasCheckbox && cardContainer8) {
    cardContainer8.style.opacity = divergenciasCheckbox.checked ? "1" : "0";
  }

  console.log("Escolha confirmada!");
}

// Adiciona o evento de clique em cada link para abrir o popup
const menuLinks = document.querySelectorAll(".menu__dash-link");
menuLinks.forEach((link) => {
  link.addEventListener("click", abrirPopup);
});

// Previne popup no hover do input
menuLinks.forEach((link) => {
  link.addEventListener("mouseenter", (event) => {
    const lastLi = document.querySelector(".menu__dash li.icon");
    if (lastLi && lastLi.contains(event.target)) {
      event.stopPropagation(); // Impede o hover de ativar o popup
    }
  });
});

// Seleciona o botão de "Salvar" e o popup
const salvarButton = document.getElementById("dashboard-salvar");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay"); // Assegure-se de que exista no HTML
const closeButton = document.querySelector(".popup .close");
const confirmButton = document.querySelector(".popup .confirm"); // Botão de confirmar no popup

// Adiciona o evento de clique ao botão de "Salvar"
if (salvarButton && popup) {
  salvarButton.addEventListener("click", () => {
    popup.style.display = "block"; // Exibe o popup
    if (overlay) {
      overlay.style.display = "block";
    }
  });
}

// Adiciona o evento de clique ao botão de fechar o popup
if (closeButton && popup) {
  closeButton.addEventListener("click", () => {
    popup.style.display = "none"; // Esconde o popup
    if (overlay) {
      overlay.style.display = "none";
    }
  });
}

// Adiciona o evento de clique ao botão de confirmar no popup
if (confirmButton) {
  confirmButton.addEventListener("click", confirmarEscolha);
}

// Fecha o popup ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
    if (overlay) {
      overlay.style.display = "none";
    }
  }
});
