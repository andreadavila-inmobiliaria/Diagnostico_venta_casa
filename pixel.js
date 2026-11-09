/* Píxel de Meta con aviso de cookies · Test de Andrea Dávila
   1) Escribe tu ID del píxel entre las comillas (solo números).
   2) El píxel solo se activa si la persona acepta las cookies. */
(function () {
  var PIXEL_ID = "1604950130858278";
  var KEY = "cookies-andrea-v1";
  if (!PIXEL_ID) return;

  function cargarPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElements/ByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  var eleccion = null;
  try { eleccion = localStorage.getItem(KEY); } catch (e) {}
  if (eleccion === "si") { cargarPixel(); return; }
  if (eleccion === "no") return;

  var css = document.createElement("style");
  css.textContent =
    ".ck{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:40;max-width:620px;margin:0 auto;" +
    "background:var(--surface,#fff);color:var(--text,#262340);border:1px solid var(--line,#f1dcd9);border-radius:20px;" +
    "box-shadow:0 12px 40px -12px rgba(0,0,0,.3);padding:16px 18px;font-family:inherit;font-size:14.5px;line-height:1.5}" +
    ".ck p{margin:0}.ck a{color:var(--coral-strong,#b9434b);font-weight:700}" +
    ".ck .bt{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}" +
    ".ck button{font:inherit;font-weight:800;font-size:15px;padding:12px;border-radius:999px;cursor:pointer;" +
    "background:var(--paper,#fffaf8);color:var(--text,#262340);border:1.5px solid var(--text,#262340)}" +
    ".ck button:focus-visible{outline:3px solid var(--coral,#f48885);outline-offset:2px}";
  document.head.appendChild(css);

  var aviso = document.createElement("div");
  aviso.className = "ck";
  aviso.setAttribute("role", "dialog");
  aviso.setAttribute("aria-label", "Aviso de cookies");
  aviso.innerHTML =
    "<p>Usamos cookies de Meta para saber qué anuncios funcionan. Solo se activan si las aceptas. " +
    "<a href=\"privacidad.html#cookies\">Más información</a></p>" +
    "<div class=\"bt\"><button type=\"button\" data-v=\"no\">Rechazar</button>" +
    "<button type=\"button\" data-v=\"si\">Aceptar</button></div>";
  document.body.appendChild(aviso);

  aviso.addEventListener("click", function (e) {
    var v = e.target && e.target.getAttribute && e.target.getAttribute("data-v");
    if (!v) return;
    try { localStorage.setItem(KEY, v); } catch (err) {}
    aviso.remove();
    if (v === "si") cargarPixel();
  });
})();
