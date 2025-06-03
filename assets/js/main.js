window.addEventListener('DOMContentLoaded', () => {
      const fallbackCDN = () => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
          particlesJS.load('particles-js', 'assets/js/particles.json', function () {
            console.log('✅ Particles.js caricato dal CDN');
          });
        };
        document.body.appendChild(script);
      };

      // Try loading the local script
      const localScript = document.createElement('script');
      localScript.src = 'assets/js/particles.js';
      localScript.onload = () => {
        if (typeof particlesJS !== 'undefined') {
          particlesJS.load('particles-js', 'assets/js/particles.json', function () {
            console.log('✅ Particles.js caricato localmente');
          });
        } else {
          fallbackCDN();
        }
      };
      localScript.onerror = fallbackCDN;
      document.body.appendChild(localScript);
});

//Section news

// 🔢 Variabili globali
let listaID = [];
let indiceCorrente = 0;
const notiziePerPagina = 10;

// Funzione che carica e mostra le notizie
function mostraNotizie() {
  const contenitore = document.getElementById("news-container");
  contenitore.innerHTML = ""; // 🔄 Svuota le notizie precedenti

  const successivi = listaID.slice(indiceCorrente, indiceCorrente + notiziePerPagina);

  const richieste = successivi.map(id => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    return fetch(url).then(r => r.json());
  });

  Promise.all(richieste).then(news => {
    news.forEach(n => {
      if (!n || !n.title || !n.url) return;

      const blocco = document.createElement("div");
      blocco.className = "bg-gray-800 p-4 rounded shadow w-[60vw] mx-auto";

      blocco.innerHTML = `
        <a href="${n.url}" target="_blank" class="text-xl font-semibold text-purple-500 hover:underline">
          ${n.title}
        </a>
        <p class="text-sm text-gray-400 mt-2">
          🕒 ${new Date(n.time * 1000).toLocaleString()}
        </p>
      `;

      contenitore.appendChild(blocco);
    });

    // 🔁 Incrementa l'indice per il prossimo clic
    indiceCorrente += notiziePerPagina;

    // 🚫 Nascondi il pulsante se le notizie sono finite
    if (indiceCorrente >= listaID.length) {
      document.getElementById("loadMore").style.display = "none";
    }
  });
}

// 👇 Evento al pulsante
document.getElementById("loadMore").addEventListener("click", mostraNotizie);

// 🚀 Al primo avvio, prendi la lista degli ID
fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
  .then(r => r.json())
  .then(ids => {
    listaID = ids;
    mostraNotizie(); // Carica le prime 10 notizie
  });
