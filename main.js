/* ===== KALIUM STORE — MAIN.JS ===== */

// =============================================
// ⚙️ CONFIGURACIÓN EDITABLE
// Cambia estos valores para actualizar el servidor
// =============================================
const CONFIG = {
  SERVER_IP: "play.kaliummc.es",
  ONLINE_PLAYERS: 247,          // ← CAMBIA ESTE NÚMERO para actualizar jugadores online
  MAX_PLAYERS: 500,
  SERVER_VERSION: "1.8 — 1.21",
  DISCORD_URL: "https://discord.gg/kaliummc",
  TWITTER_URL: "https://twitter.com/kaliummc",
  STORE_URL: "https://tienda.kaliummc.es", // URL real de pago
};
// =============================================

// --- LOADER ---
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    startRevealAnimations();
    animateCounters();
  }, 2000);
});

// --- ONLINE PLAYERS ---
function updateOnlinePlayers() {
  const count = CONFIG.ONLINE_PLAYERS;
  const els = [
    document.getElementById("online-players"),
    document.getElementById("online-players-mobile"),
    document.getElementById("hero-online"),
    document.getElementById("card-online"),
    document.getElementById("stat-online"),
  ];
  els.forEach(el => {
    if (!el) return;
    if (el.id === "card-online") el.textContent = `${count} / ${CONFIG.MAX_PLAYERS} players`;
    else if (el.id === "stat-online") el.textContent = count;
    else el.textContent = `${count} online`;
  });
}
updateOnlinePlayers();

// --- CURSOR GLOW ---
const cursorGlow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

// --- PARTICLES CANVAS ---
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function rand(min, max) { return Math.random() * (max - min) + min; }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: rand(0, window.innerWidth),
      y: rand(0, window.innerHeight),
      r: rand(0.5, 2),
      dx: rand(-0.2, 0.2),
      dy: rand(-0.4, -0.1),
      opacity: rand(0.1, 0.5),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14,165,233,${p.opacity})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -10) { p.y = H + 10; p.x = rand(0, W); }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// --- NAVBAR SCROLL ---
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// --- MOBILE MENU ---
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");
navToggle.addEventListener("click", () => {
  mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
});
document.querySelectorAll(".mobile-menu a").forEach(a => {
  a.addEventListener("click", () => { mobileMenu.style.display = "none"; });
});

// --- COPY IP ---
function copyIP(ip) {
  navigator.clipboard.writeText(ip).then(() => {
    showNotification("✅ IP copiada: " + ip, "success");
  });
}
document.getElementById("copy-ip")?.addEventListener("click", () => copyIP(CONFIG.SERVER_IP));
document.getElementById("copy-ip-2")?.addEventListener("click", () => copyIP(CONFIG.SERVER_IP));

// --- TICKER PURCHASES ---
const recentPurchases = [
  { nick: "xDarkSword_", item: "Rango SUPER KALIUM" },
  { nick: "CristinaGamer22", item: "64x Llaves KALIUM" },
  { nick: "El_Mortadelo", item: "Rango VIP+" },
  { nick: "ProKillerZ", item: "64x Llaves LUNAR" },
  { nick: "MineQueen99", item: "Rango SUPER SOLAR" },
  { nick: "Juancraft07", item: "Comando /fly" },
  { nick: "ShadowWolf_ES", item: "Rango LUNAR Estándar" },
  { nick: "StarPlayMC", item: "10x Monedas de Diamante" },
  { nick: "NightFury_23", item: "5M Kalios" },
  { nick: "AlexMC_Pro", item: "Rango KALIUM+" },
  { nick: "LauraGamer", item: "32x Llaves VIP" },
  { nick: "DarkBlade_X", item: "Comando /repair" },
  { nick: "ElSuperMC", item: "5x Monedas de Rubí" },
  { nick: "PedroCraft99", item: "Rango SOLAR+" },
];
function buildTicker() {
  const ticker = document.getElementById("ticker");
  // Double for seamless loop
  const items = [...recentPurchases, ...recentPurchases];
  ticker.innerHTML = items.map(p =>
    `<div class="ticker-item">
      <span>🛒</span>
      <span class="nick">${p.nick}</span>
      <span>acaba de comprar</span>
      <span class="prod">${p.item}</span>
      <span style="color:var(--gray-600)">|</span>
    </div>`
  ).join("");
}
buildTicker();

// --- COUNTER ANIMATION ---
function animateCounters() {
  document.querySelectorAll("[data-target]").forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString("es-ES");
    }, 16);
  });
}

// --- REVEAL ON SCROLL ---
function startRevealAnimations() {
  const elements = document.querySelectorAll(
    ".section-header, .rank-block, .shop-card, .coin-card, .trust-item, .sstat, .upgrade-note"
  );
  elements.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 8) * 60}ms`;
  });
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
    { threshold: 0.1 }
  );
  elements.forEach(el => observer.observe(el));
}

// --- CATEGORY FILTER ---
document.querySelectorAll(".cat-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".cat-card").forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    const filter = card.dataset.filter;
    document.querySelectorAll(".product-card").forEach(p => {
      const cat = p.dataset.category;
      if (filter === "all" || cat === filter || !filter) {
        p.style.display = "";
        p.style.animation = "fadeIn 0.3s ease";
      } else {
        p.style.display = "none";
      }
    });
  });
});

// --- CART SYSTEM ---
let cart = [];

function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    showNotification(`"${name}" ya está en tu carrito`);
    openCart();
    return;
  }
  cart.push({ name, price });
  updateCartUI();
  showNotification(`✅ "${name}" añadido al carrito`, "success");
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.length;
  document.getElementById("cart-count").textContent = count;
  const itemsEl = document.getElementById("cart-items");
  const footerEl = document.getElementById("cart-footer");

  if (count === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Tu carrito está vacío</p></div>`;
    footerEl.style.display = "none";
  } else {
    itemsEl.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price.toFixed(2)}€</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
      </div>
    `).join("");
    footerEl.style.display = "flex";
    const total = cart.reduce((s, i) => s + i.price, 0);
    document.getElementById("cart-total").textContent = total.toFixed(2) + "€";
  }
}

function openCart() {
  document.getElementById("cart").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("cart-close").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

document.getElementById("checkout-btn")?.addEventListener("click", () => {
  const nick = document.getElementById("player-nick").value.trim();
  if (!nick) {
    showNotification("⚠️ Introduce tu nick de Minecraft antes de continuar");
    document.getElementById("player-nick").focus();
    return;
  }
  if (cart.length === 0) return;
  // Redirect to real store — adapt this URL
  const total = cart.reduce((s, i) => s + i.price, 0);
  showNotification(`🎮 Redirigiendo al checkout para ${nick}...`, "success");
  setTimeout(() => {
    // window.open(CONFIG.STORE_URL, "_blank");
    alert(`✅ En producción, esto redirigirá a la pasarela de pago.\n\nNick: ${nick}\nTotal: ${total.toFixed(2)}€\n\nProductos:\n${cart.map(i => `- ${i.name}: ${i.price.toFixed(2)}€`).join("\n")}`);
  }, 1000);
});

// --- NOTIFICATION ---
function showNotification(msg, type = "") {
  const el = document.getElementById("notification");
  el.textContent = msg;
  el.className = "notification show " + type;
  setTimeout(() => { el.className = "notification"; }, 3000);
}

// --- 3D HOVER ON CARDS ---
document.querySelectorAll(".product-card, .pack-card, .server-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// =============================================
// 💡 CONSEJO: JUGADORES ONLINE EN TIEMPO REAL
//
// Para mostrar jugadores reales, usa uno de estos métodos:
//
// OPCIÓN 1 — API Propia (recomendado):
//   En tu backend crea: GET /api/status → { online: 247, max: 500 }
//   Y luego:
//   fetch('/api/status').then(r=>r.json()).then(d=>{
//     CONFIG.ONLINE_PLAYERS = d.online;
//     updateOnlinePlayers();
//   });
//
// OPCIÓN 2 — mcsrvstat.us (sin backend):
//   fetch('https://api.mcsrvstat.us/2/play.kaliummc.es')
//     .then(r=>r.json())
//     .then(d=>{
//       if(d.online) {
//         CONFIG.ONLINE_PLAYERS = d.players.online;
//         updateOnlinePlayers();
//       }
//     });
//   ⚠️ Añade esto al final de este archivo. Ten en cuenta CORS.
//
// OPCIÓN 3 — Variable manual (actual):
//   Simplemente cambia CONFIG.ONLINE_PLAYERS = 247 arriba
//   y recarga la página.
// =============================================

// AUTO-REFRESH PLAYERS (usa mcsrvstat.us si lo tienes configurado)
// Descomenta para activar:
/*
function fetchOnlinePlayers() {
  fetch(`https://api.mcsrvstat.us/2/${CONFIG.SERVER_IP}`)
    .then(r => r.json())
    .then(d => {
      if (d.online && d.players) {
        CONFIG.ONLINE_PLAYERS = d.players.online;
        CONFIG.MAX_PLAYERS = d.players.max;
        updateOnlinePlayers();
      }
    })
    .catch(() => {}); // silently fail
}
fetchOnlinePlayers();
setInterval(fetchOnlinePlayers, 60000); // refresh every minute
*/

console.log(`
 ██╗  ██╗ █████╗ ██╗     ██╗██╗   ██╗███╗   ███╗
 ██║ ██╔╝██╔══██╗██║     ██║██║   ██║████╗ ████║
 █████╔╝ ███████║██║     ██║██║   ██║██╔████╔██║
 ██╔═██╗ ██╔══██║██║     ██║██║   ██║██║╚██╔╝██║
 ██║  ██╗██║  ██║███████╗██║╚██████╔╝██║ ╚═╝ ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═╝     ╚═╝
 Tienda Premium — v2.0
 Para editar jugadores online: CONFIG.ONLINE_PLAYERS en main.js
`);
