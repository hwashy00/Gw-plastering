/* GW Plastering — cookie consent + analytics gate
   Google Analytics only loads if the visitor clicks "Accept".
   Replace G-XXXXXXXXXX below with your real GA4 Measurement ID. */
(function () {
  var GA_ID = "G-7J9VB1GTZK";
  var KEY = "gwCookieConsent";

  function loadGA() {
    if (!GA_ID || GA_ID.indexOf("XXXX") !== -1 || window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA_ID);
  }

  function injectStyles() {
    var css =
      "#gw-cc{position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;" +
      "background:#161310;border:1px solid rgba(200,154,78,.32);border-radius:12px;" +
      "box-shadow:0 8px 30px rgba(0,0,0,.5);color:#f0ebe2;padding:16px 18px;" +
      "font-family:'Archivo',system-ui,sans-serif;font-size:14px;line-height:1.5;" +
      "display:none;max-width:760px;margin:0 auto}" +
      "#gw-cc.show{display:flex;flex-wrap:wrap;gap:12px 16px;align-items:center;justify-content:space-between}" +
      "#gw-cc p{margin:0;flex:1 1 320px;min-width:240px}" +
      "#gw-cc a{color:#e6c178}" +
      "#gw-cc .gw-cc-btns{display:flex;gap:10px;flex:0 0 auto}" +
      "#gw-cc button{cursor:pointer;border:none;border-radius:8px;padding:10px 18px;" +
      "font-weight:700;font-size:13px;font-family:inherit;letter-spacing:.02em}" +
      "#gw-cc .gw-cc-accept{background:linear-gradient(120deg,#9a7434,#c89a4e 60%,#e6c178);color:#171206}" +
      "#gw-cc .gw-cc-decline{background:transparent;border:1px solid rgba(200,154,78,.45);color:#f0ebe2}" +
      "@media(max-width:600px){#gw-cc{bottom:76px}}"; // clear the call/WhatsApp bar
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
  }

  function showBanner() {
    injectStyles();
    var bar = document.createElement("div");
    bar.id = "gw-cc";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookie notice");
    bar.innerHTML =
      "<p>We use cookies to see how visitors use the site (Google Analytics). " +
      "Nothing is set unless you accept. <a href=\"/privacy\">Privacy &amp; cookies</a></p>" +
      "<div class=\"gw-cc-btns\">" +
      "<button class=\"gw-cc-decline\" type=\"button\">Decline</button>" +
      "<button class=\"gw-cc-accept\" type=\"button\">Accept</button>" +
      "</div>";
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add("show"); });

    bar.querySelector(".gw-cc-accept").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "accepted"); } catch (e) {}
      bar.remove();
      loadGA();
    });
    bar.querySelector(".gw-cc-decline").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "declined"); } catch (e) {}
      bar.remove();
    });
  }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  if (choice === "accepted") {
    loadGA();
  } else if (choice !== "declined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showBanner);
    } else {
      showBanner();
    }
  }
})();
