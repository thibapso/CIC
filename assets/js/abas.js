document.addEventListener("DOMContentLoaded", () => {
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
        links.forEach((l) => l.classList.remove("active-link"));
        this.classList.add("active-link");
      });
    });
  };
  setActiveLink(".sidebar a.sidebar__link");

  /*=============== OCULTAR/EXIBIR ELEMENTOS ===============*/
  const hideLinks = document.querySelectorAll(
    '.sidebar a.sidebar__link[href="#dashboard"], ' +
    '.sidebar a.sidebar__link[href="#controle"], ' +
    '.sidebar a.sidebar__link[href="#compliance"], ' +
    '.sidebar a.sidebar__link[href="#arquivo"]'
  );
  const overviewLink = document.querySelector(
    '.sidebar a.sidebar__link[href="#overview"]'
  );
  const elementsToToggle = document.querySelectorAll(
    ".card__container-1, .card__info1, .card__info2, " +
    ".card__container-3, .card__container-6, .card__container-8, " +
    "#graficoU, .title_dash"
  );

  const toggleElementsVisibility = (shouldShow) => {
    elementsToToggle.forEach((element) => {
      element.classList.toggle("hidden", !shouldShow);
    });
  };

  hideLinks.forEach((link) => {
    link.addEventListener("click", () => toggleElementsVisibility(false));
  });
  if (overviewLink) {
    overviewLink.addEventListener("click", () =>
      toggleElementsVisibility(true)
    );
  }

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

  /*=============== POPUP TAREFAS ===============*/

  const infoPopup6 = document.getElementById("infoPopup6");
  const closeInfoPopup6 = document.getElementById("closeInfoPopup6");
  const infoPopup7 = document.getElementById("infoPopup7");
  const closeInfoPopup7 = document.getElementById("closeInfoPopup7");
  const arrowIcons = document.querySelectorAll(
    ".card__date i.ri-arrow-down-s-line"
  );

  if (arrowIcons[0] && infoPopup6 && closeInfoPopup6) {
    arrowIcons[0].addEventListener("click", () => {
      infoPopup6.style.display = "flex"; // Mostra o popup do card 6
    });

    closeInfoPopup6.addEventListener("click", () => {
      infoPopup6.style.display = "none"; // Esconde o popup do card 6
    });
  }

  if (arrowIcons[1] && infoPopup7 && closeInfoPopup7) {
    arrowIcons[1].addEventListener("click", () => {
      infoPopup7.style.display = "flex"; // Mostra o popup do card 7
    });

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

    // Verifica se o clique foi no campo de busca (input) ou nos ícones de busca
    if (
      event.target.tagName === "INPUT" || // Se clicou no input
      event.target.classList.contains("icon-1") || // Se clicou no ícone de busca
      event.target.classList.contains("icon-2") // Se clicou no ícone de busca
    ) {
      return; // Não faz nada se o clique foi na searchbar ou ícones de busca
    }

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

  /*=============== DASHBOARD FUNCTIONALITY ===============*/
  const dashboardMessage = document.getElementById("dashboard-message");
  const dashboardParagraph = document.getElementById(
    "dashboard-message-paragraph"
  );
  const dashboardLink = document.querySelector(
    '.sidebar a.sidebar__link[href="#dashboard"]'
  );
  const dashboardContainer = document.getElementById("dashboard-container");
  const dashboardInput = document.getElementById("dashboard-input");

  if (dashboardLink) {
    dashboardLink.addEventListener("click", (event) => {
      event.preventDefault(); // Previne o comportamento padrão do link
      dashboardMessage.classList.remove("hidden"); // Exibe o <h1>
      dashboardParagraph.classList.remove("hidden"); // Exibe o <p> se necessário
      dashboardContainer.classList.remove("hidden"); // Exibe o dashboard-container
      dashboardInput.classList.remove("hidden"); // Exibe o dashboard-input
    });
  }

  const otherDashboardLinks = document.querySelectorAll(
    '.sidebar a.sidebar__link:not([href="#dashboard"])'
  );
  otherDashboardLinks.forEach((link) => {
    link.addEventListener("click", () => {
      dashboardMessage.classList.add("hidden"); // Oculta o <h1>
      dashboardParagraph.classList.add("hidden"); // Oculta o <p>
      dashboardContainer.classList.add("hidden"); // Oculta o dashboard-container
      dashboardInput.classList.add("hidden"); // Oculta o dashboard-input
    });
  });

  /*=============== ARQUIVO FUNCTIONALITY ===============*/
  const arquivoSection = document.querySelector(".arquivo-tela");
  arquivoSection.classList.add("hidden");

  const arquivoLink = document.querySelector(
    '.sidebar a.sidebar__link[href="#arquivo"]'
  );
  const arquivoOtherLinks = document.querySelectorAll(
    '.sidebar a.sidebar__link:not([href="#arquivo"])'
  );
  const arquivoMenuContainer = document.querySelector(".menu__container2");

  if (arquivoLink && arquivoSection) {
    arquivoLink.addEventListener("click", (event) => {
      event.preventDefault(); // Previne o comportamento padrão do link

      // Exibe a seção removendo a classe 'hidden'
      arquivoSection.classList.remove("hidden");

      // Oculta o menu
      if (arquivoMenuContainer) arquivoMenuContainer.classList.add("hidden");

      // Opcional: Exibe os elementos internos, se necessário
      const arquivoMessage = document.getElementById("arquivo-message");
      const arquivoParagraph = document.getElementById(
        "arquivo-message-paragraph"
      );
      const arquivoConteudo = document.querySelector(".arquivo-conteudo");

      if (arquivoMessage) arquivoMessage.classList.remove("hidden");
      if (arquivoParagraph) arquivoParagraph.classList.remove("hidden");
      if (arquivoConteudo) arquivoConteudo.classList.remove("hidden");
    });
  }

  arquivoOtherLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Oculta a seção adicionando a classe 'hidden'
      arquivoSection.classList.add("hidden");

      // Mostra o menu novamente
      if (arquivoMenuContainer) arquivoMenuContainer.classList.remove("hidden");

      // Opcional: Oculta os elementos internos, se necessário
      const arquivoMessage = document.getElementById("arquivo-message");
      const arquivoParagraph = document.getElementById(
        "arquivo-message-paragraph"
      );
      const arquivoConteudo = document.querySelector(".arquivo-conteudo");

      if (arquivoMessage) arquivoMessage.classList.add("hidden");
      if (arquivoParagraph) arquivoParagraph.classList.add("hidden");
      if (arquivoConteudo) arquivoConteudo.classList.add("hidden");
    });
  });

  /*=============== CONTROLE FUNCTIONALITY ===============*/
  const controleSection = document.querySelector(".controle-tela");
  const controleLink = document.querySelector(
    '.sidebar a.sidebar__link[href="#controle"]'
  );
  const controleOtherLinks = document.querySelectorAll(
    '.sidebar a.sidebar__link:not([href="#controle"])'
  );
  const controleMenuContainer = document.querySelector(".menu__container2");

  if (controleLink && controleSection) {
    controleLink.addEventListener("click", (event) => {
      event.preventDefault(); // Previne o comportamento padrão do link

      // Exibe a seção removendo a classe 'hidden'
      controleSection.classList.remove("hidden");

      // Oculta o menu
      if (controleMenuContainer) controleMenuContainer.classList.add("hidden");

      // Opcional: Exibe os elementos internos, se necessário
      const controleMessage = document.getElementById("controle-message");
      const controleParagraph = document.getElementById(
        "controle-message-paragraph"
      );
      const controleConteudo = document.querySelector(".controle-conteudo");

      if (controleMessage) controleMessage.classList.remove("hidden");
      if (controleParagraph) controleParagraph.classList.remove("hidden");
      if (controleConteudo) controleConteudo.classList.remove("hidden");
    });
  }

  controleOtherLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Oculta a seção adicionando a classe 'hidden'
      controleSection.classList.add("hidden");

      // Mostra o menu novamente
      if (controleMenuContainer) controleMenuContainer.classList.remove("hidden");

      // Opcional: Oculta os elementos internos, se necessário
      const controleMessage = document.getElementById("controle-message");
      const controleParagraph = document.getElementById(
        "controle-message-paragraph"
      );
      const controleConteudo = document.querySelector(".controle-conteudo");

      if (controleMessage) controleMessage.classList.add("hidden");
      if (controleParagraph) controleParagraph.classList.add("hidden");
      if (controleConteudo) controleConteudo.classList.add("hidden");
    });
  });
});
