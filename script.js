// Analista: Aguarda o DOM ser carregado para evitar erros de nó nulo ao ler os seletores
document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. CONTROLE DO ACORDEÃO DE FÉ
  // ==========================================
  document.querySelectorAll('.fe-titulo').forEach(titulo => {
    titulo.addEventListener('click', () => {
      const item = titulo.parentElement;
      const conteudo = item.querySelector('.fe-conteudo');
      
      // Analista: Fecha outros itens do acordeão para manter o layout limpo
      document.querySelectorAll('.fe-item').forEach(outroItem => {
        if (outroItem !== item && outroItem.classList.contains('active')) {
          outroItem.classList.remove('active');
          outroItem.querySelector('.fe-conteudo').style.maxHeight = null;
        }
      });

      // Alterna o estado do acordeão ativo
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        conteudo.style.maxHeight = conteudo.scrollHeight + "px";
      } else {
        conteudo.style.maxHeight = null;
      }
    });
  });

}); // Fim do carregamento do DOM


// ==========================================
// 2. CONTROLE DO CARROSSEL DE HISTÓRIA
// ==========================================
let idxHistoria = 0;
const slidesHist = document.querySelectorAll('.slide-historia');

function mostrarSlideHistoria(novoIndex) {
  if (slidesHist.length === 0) return;    
  slidesHist[idxHistoria].classList.remove('active');     
  idxHistoria = (novoIndex + slidesHist.length) % slidesHist.length;     
  slidesHist[idxHistoria].classList.add('active');
}

// Analista: Expõe na window para que a tag HTML onclick possa rodar a função com escopo global
window.mudarSlideHistoria = function(direcao) {
  mostrarSlideHistoria(idxHistoria + direcao);
}

// Intervalo automático para a História (7 segundos)
setInterval(() => {
  window.mudarSlideHistoria(1);
}, 7000);


// ==========================================
// 3. CONTROLE DO CARROSSEL DE EVENTOS
// ==========================================
let slideIndexEventos = 0;
const slidesEventos = document.querySelectorAll('.slide');

function mostrarSlideEventos(index) {
  if (slidesEventos.length === 0) return;
  slidesEventos.forEach(slide => slide.classList.remove('active'));
  slideIndexEventos = (index + slidesEventos.length) % slidesEventos.length;
  slidesEventos[slideIndexEventos].classList.add('active');
}

// Analista: Mapeamento idêntico ao onclick="mudarSlideEventos(...)" do HTML
window.mudarSlideEventos = function(n) {
  mostrarSlideEventos(slideIndexEventos + n);
}


// ==========================================
// 4. MODAL LIGHTBOX DE IMAGENS (MURAL DOS EVENTOS)
// ==========================================
window.abrirModal = function(elemento) {
  const modal = document.getElementById("meuModal");
  const imgModal = document.getElementById("imgAmpliada");
  if (modal && imgModal) {
    modal.style.display = "block";
    imgModal.src = elemento.src;
  }
}

window.fecharModal = function() {
  const modal = document.getElementById("meuModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Fecha o modal ao clicar em qualquer área fora da imagem ampliada
window.onclick = function(event) {
  const modal = document.getElementById("meuModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// ==========================================
// 5. BOTÃO DE COPIAR CHAVE PIX
// ==========================================
window.copiarPix = function() {
  const chavePix = document.getElementById("chave-pix").innerText;
  const btn = document.querySelector(".copy-btn");
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(chavePix).then(() => {
      btn.innerText = "Copiado!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.innerText = "Copiar";
        btn.classList.remove("copied");
      }, 3000);
    }).catch(err => {
      console.error("Erro do sistema ao copiar chave PIX: ", err);
    });
  }
}