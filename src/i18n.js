document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('languageSelector');
  const currentLangDiv = document.getElementById('currentLang');
  const currentFlag = document.getElementById('currentFlag');
  const langOptions = document.getElementById('langOptions');
  const langOptionDivs = document.querySelectorAll('.lang-option');

  let currentLang = localStorage.getItem('preferredLang') || 'es';
  applyTranslation(currentLang);
  updateFlag(currentLang);

  currentLangDiv.addEventListener('click', (e) => {
    e.stopPropagation();
    languageSelector.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    languageSelector.classList.remove('open');
  });

  langOptionDivs.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      if (lang) {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        applyTranslation(lang);
        updateFlag(lang);
        languageSelector.classList.remove('open');
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
      }
    });
  });

  function updateFlag(lang) {
    const flags = { es: 'es', en: 'gb', ja: 'jp' };
    currentFlag.className = `fi fi-${flags[lang]}`;
  }

  function applyTranslation(lang) {
    const trans = translations[lang];
    if (!trans) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keys = key.split('.');
      let value = trans;
      for (let k of keys) {
        if (value && value[k] !== undefined) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }
      if (value) {
        el.textContent = value;
      }
    });
  }
});