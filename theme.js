/* =========================================================
   pro DIM — перемикач теми (dark / light)
   Миттєве застосування теми (без спалаху) робить inline-скрипт
   у <head> кожної сторінки. Тут — тільки обробка кліків.
   ========================================================= */
(function(){
  var KEY = 'pd-theme';

  function currentTheme(){
    return localStorage.getItem(KEY) || 'dark';
  }

  function applyTheme(theme){
    if(theme === 'light'){
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.querySelectorAll('.pd-theme-btn').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  function setTheme(theme){
    localStorage.setItem(KEY, theme);
    applyTheme(theme);
  }

  window.pdSetTheme = setTheme;
  window.pdCurrentTheme = currentTheme;

  document.addEventListener('DOMContentLoaded', function(){
    applyTheme(currentTheme());
    document.querySelectorAll('.pd-theme-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ setTheme(btn.dataset.theme); });
    });
  });
})();

