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
function caricaNews() {
  fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
    .then(risposta => risposta.json())
    .then(listaID => {
      const primiDieci = listaID.slice(0, 10);

      const richieste = primiDieci.map(id => {
        const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
        return fetch(url).then(r => r.json());
      });

      Promise.all(richieste)
        .then(news => {
          const contenitore = document.getElementById("news-container");

          news.forEach(n => {
            // Evita elementi vuoti o nulli
            if (!n || !n.title || !n.url) return;

            const blocco = document.createElement("div");
            blocco.className = "bg-gray-800 p-4 rounded shadow w-[60vw] mx-auto";

            blocco.innerHTML = `
              <a href="${n.url}" target="_blank" class="text-xl font-semibold text-purple-500 hover:underline">${n.title}</a>
              <p class="text-sm text-gray-400 mt-2">🕒 ${new Date(n.time * 1000).toLocaleString()}</p>
            `;

            contenitore.appendChild(blocco);
          });
        })
        .catch(err => {
          console.error("❌ Errore nel recupero delle notizie:", err);
        });
    });
}

// Chiamata alla funzione
caricaNews();
