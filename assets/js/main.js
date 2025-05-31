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