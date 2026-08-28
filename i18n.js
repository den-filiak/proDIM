/* =========================================================
   pro DIM — перемикач мови (uk / en)
   Елементи з атрибутом data-en містять англійський переклад.
   Оригінальний (українською) вміст зберігається автоматично
   при першому перемиканні, тож нічого дублювати вручну не треба.
   ========================================================= */
(function(){
  var KEY = 'pd-lang';

  function currentLang(){
    return localStorage.getItem(KEY) || 'uk';
  }

  function applyLang(lang){
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en]').forEach(function(el){
      if(!el.hasAttribute('data-uk')){
        el.setAttribute('data-uk', el.innerHTML);
      }
      el.innerHTML = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-uk');
    });

    document.querySelectorAll('[data-en-title]').forEach(function(el){
      if(!el.hasAttribute('data-uk-title')){
        el.setAttribute('data-uk-title', el.getAttribute('title') || '');
      }
      var v = lang === 'en' ? el.getAttribute('data-en-title') : el.getAttribute('data-uk-title');
      if(v) el.setAttribute('title', v);
    });

    document.querySelectorAll('.pd-lang-btn').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    if (typeof window.pdOnLangChange === 'function') {
      try { window.pdOnLangChange(lang); } catch(e){}
    }
  }

  function setLang(lang){
    localStorage.setItem(KEY, lang);
    applyLang(lang);
  }

  window.pdSetLang = setLang;
  window.pdCurrentLang = currentLang;

  document.addEventListener('DOMContentLoaded', function(){
    applyLang(currentLang());
    document.querySelectorAll('.pd-lang-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ setLang(btn.dataset.lang); });
    });
  });
})();
