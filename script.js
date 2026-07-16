document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. ATUALIZAÇÃO AUTOMATIZADA DO ANO NO RODAPÉ
  // ==========================================================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 2. SISTEMA DE CÓPIA DA CHAVE PIX
  // ==========================================================================
  const copyBtn = document.getElementById('copyBtn');
  const pixKey = document.getElementById('pixKey');
  
  if (copyBtn && pixKey) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pixKey.textContent.trim());
        copyBtn.textContent = 'Copiado!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
          copyBtn.textContent = 'Copiar';
          copyBtn.classList.remove('copied');
        }, 2000);
      } catch (e) {
        copyBtn.textContent = 'Selecione e copie';
      }
    });
  }

  // ==========================================================================
  // 3. CONTROLADOR DO CARROSSEL DOS PRÓXIMOS EVENTOS (MURAL)
  // ==========================================================================
  let slideEventoIndex = 0;
  const slidesEventos = document.querySelectorAll('.carrossel-vertical-limpo .slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function mostrarSlideEvento(index) {
    if (slidesEventos.length === 0) return;

    slidesEventos[slideEventoIndex].classList.remove('active');
    slideEventoIndex = (index + slidesEventos.length) % slidesEventos.length;
    slidesEventos[slideEventoIndex].classList.add('active');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      mostrarSlideEvento(slideEventoIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      mostrarSlideEvento(slideEventoIndex - 1);
    });
  }

  // Auto-play do Carrossel de Eventos (a cada 5 segundos)
  let autoPlayEventos = setInterval(() => {
    mostrarSlideEvento(slideEventoIndex + 1);
  }, 5000);

  const pausarAutoPlayEventos = () => {
    clearInterval(autoPlayEventos);
    autoPlayEventos = setInterval(() => {
      mostrarSlideEvento(slideEventoIndex + 1);
    }, 5000);
  };

  prevBtn?.addEventListener('click', pausarAutoPlayEventos);
  nextBtn?.addEventListener('click', pausarAutoPlayEventos);


  // ==========================================================================
  // 4. CARROSSEL DA SEÇÃO HISTÓRIA (RECONSTRUÍDO SEM CONFLITOS)
  // ==========================================================================
  let slideHistoriaIndex = 0;
  const slidesHistoria = document.querySelectorAll('.slide-historia');
  const btnPrevHistoria = document.querySelector('.historia-prev-btn');
  const btnNextHistoria = document.querySelector('.historia-next-btn');

  function mostrarSlideHistoria(index) {
    if (slidesHistoria.length === 0) return;

    slidesHistoria[slideHistoriaIndex].classList.remove('active');
    slideHistoriaIndex = (index + slidesHistoria.length) % slidesHistoria.length;
    slidesHistoria[slideHistoriaIndex].classList.add('active');
  }

  // Configura os cliques das setinhas da História diretamente pelo JS
  if (btnNextHistoria) {
    btnNextHistoria.addEventListener('click', () => {
      mostrarSlideHistoria(slideHistoriaIndex + 1);
    });
  }

  if (btnPrevHistoria) {
    btnPrevHistoria.addEventListener('click', () => {
      mostrarSlideHistoria(slideHistoriaIndex - 1);
    });
  }

  // Auto-play do Carrossel da História (a cada 6 segundos)
  let autoPlayHistoria;
  if (slidesHistoria.length > 0) {
    autoPlayHistoria = setInterval(() => {
      mostrarSlideHistoria(slideHistoriaIndex + 1);
    }, 6000);
  }

  // Reseta o tempo automático da história se o usuário clicar manualmente nas setas
  const pausarAutoPlayHistoria = () => {
    if (autoPlayHistoria) {
      clearInterval(autoPlayHistoria);
      autoPlayHistoria = setInterval(() => {
        mostrarSlideHistoria(slideHistoriaIndex + 1);
      }, 6000);
    }
  };

  btnPrevHistoria?.addEventListener('click', pausarAutoPlayHistoria);
  btnNextHistoria?.addEventListener('click', pausarAutoPlayHistoria);


  // ==========================================================================
  // 5. SISTEMA LIGHTBOX (EXPANDIR IMAGEM AO CLICAR)
  // ==========================================================================
  const modal = document.getElementById('muralModal');
  const modalImg = document.getElementById('imgModalExpandida');
  const fecharBtn = document.querySelector('.modal-fechar');
  const imagensMural = document.querySelectorAll('.img-mural-expandir');

  if (modal && modalImg && fecharBtn) {
    
    imagensMural.forEach(img => {
      img.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = img.src; 
        document.body.style.overflow = "hidden";
      });
    });

    const fecharModal = () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    fecharBtn.addEventListener('click', fecharModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        fecharModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === "block") {
        fecharModal();
      }
    });
  }


  // ==========================================================================
  // 6. ACORDEÃO DA DECLARAÇÃO DE FÉ
  // ==========================================================================
  document.querySelectorAll('.fe-titulo').forEach(titulo => {
    titulo.addEventListener('click', () => {
      const itemAtual = titulo.parentElement;
      const conteudo = titulo.nextElementSibling;
      const estaAtivo = itemAtual.classList.contains('active');

      // Fecha todos os outros itens abertos
      document.querySelectorAll('.fe-item').forEach(item => {
        item.classList.remove('active');
        const conteudoItem = item.querySelector('.fe-conteudo');
        if (conteudoItem) conteudoItem.style.maxHeight = null;
      });

      // Se o item clicado não estava ativo, abre ele
      if (!estaAtivo) {
        itemAtual.classList.add('active');
        conteudo.style.maxHeight = conteudo.scrollHeight + "px";
      }
    });
  });

});