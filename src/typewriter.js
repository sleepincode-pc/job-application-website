const textElement = document.getElementById("typeText");
if (textElement) {
  const wordsMap = {
    es: [
      "Senior Full-Stack Developer",
      "6+ años de experiencia",
      "Especialista en e-commerce",
      "Integraciones HR · APIs",
      "PHP · JavaScript · Node.js",
      "Arquitecturas escalables",
      "Buenos Aires, Argentina"
    ],
    en: [
      "Senior Full-Stack Developer",
      "6+ years of experience",
      "E-commerce specialist",
      "HR integrations · APIs",
      "PHP · JavaScript · Node.js",
      "Scalable architectures",
      "Buenos Aires, Argentina"
    ],
    ja: [
      "シニアフルスタック開発者",
      "6年以上の経験",
      "Eコマース専門家",
      "HR統合 · API",
      "PHP · JavaScript · Node.js",
      "スケーラブルなアーキテクチャ",
      "ブエノスアイレス、アルゼンチン"
    ]
  };

  let currentLang = localStorage.getItem('preferredLang') || 'es';
  let words = wordsMap[currentLang] || wordsMap.es;
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let timeout;

  function typeWriter() {
    const word = words[wordIndex];
    let speed = deleting ? 40 : 70;

    // Mostrar el texto actualizado antes de decidir el siguiente paso
    if (!deleting && charIndex < word.length) {
      // Escribiendo
      textElement.textContent = word.substring(0, charIndex + 1);
      charIndex++;
    } else if (!deleting && charIndex === word.length) {
      // Palabra completa: esperar antes de borrar
      deleting = true;
      speed = 1400; // pausa
    } else if (deleting && charIndex > 0) {
      // Borrando
      textElement.textContent = word.substring(0, charIndex - 1);
      charIndex--;
    } else if (deleting && charIndex === 0) {
      // Borrado completo: pasar a la siguiente palabra
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400; // pausa antes de empezar la nueva palabra
    }

    timeout = setTimeout(typeWriter, speed);
  }

  typeWriter();

  window.addEventListener('languageChanged', (e) => {
    const newLang = e.detail.lang;
    if (wordsMap[newLang]) {
      clearTimeout(timeout);
      words = wordsMap[newLang];
      wordIndex = 0;
      charIndex = 0;
      deleting = false;
      typeWriter();
    }
  });
}