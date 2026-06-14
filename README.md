# KALIUM — Tienda Premium v2.0

## Archivos incluidos
- `index.html` — Estructura completa de la tienda
- `styles.css` — Todos los estilos (glassmorphism, animaciones, responsive)
- `main.js`   — Interactividad: carrito, partículas, animaciones, etc.
- `logo.png`  — ← PON TU LOGO AQUÍ (el archivo que subiste)

---

## Setup en VS Code

1. Copia los 4 archivos en una carpeta
2. Renombra el logo de Kalium a `logo.png` y ponlo en la misma carpeta
3. Instala la extensión **Live Server** en VS Code
4. Clic derecho en `index.html` → "Open with Live Server"

---

## ⚙️ Configuración principal (main.js)

Al inicio de `main.js` encontrarás el bloque `CONFIG`:

```js
const CONFIG = {
  SERVER_IP: "play.kaliummc.es",      // IP del servidor
  ONLINE_PLAYERS: 247,                 // ← Cambia este número manualmente
  MAX_PLAYERS: 500,
  SERVER_VERSION: "1.8 — 1.21",
  DISCORD_URL: "https://discord.gg/kaliummc",
  TWITTER_URL: "https://twitter.com/kaliummc",
  STORE_URL: "https://tienda.kaliummc.es",  // URL de pago real
};
```

---

## 🟢 Jugadores online en tiempo real

### Opción A — API mcsrvstat.us (más fácil, sin backend)
Descomenta el bloque al final de `main.js`:
```js
function fetchOnlinePlayers() {
  fetch(`https://api.mcsrvstat.us/2/${CONFIG.SERVER_IP}`)
    .then(r => r.json())
    .then(d => {
      if (d.online && d.players) {
        CONFIG.ONLINE_PLAYERS = d.players.online;
        updateOnlinePlayers();
      }
    });
}
fetchOnlinePlayers();
setInterval(fetchOnlinePlayers, 60000);
```
⚠️ Funciona si el servidor es público. Puede tener limitaciones de CORS.

### Opción B — Tu propio endpoint (recomendado para producción)
Crea en tu backend: `GET /api/status` que devuelva `{ "online": 247, "max": 500 }`

```js
fetch('/api/status')
  .then(r => r.json())
  .then(d => { CONFIG.ONLINE_PLAYERS = d.online; updateOnlinePlayers(); });
```

### Opción C — Manual (actual por defecto)
Solo cambia `ONLINE_PLAYERS: 247` en CONFIG y guarda.

---

## 🛒 Integración de pagos

En `main.js`, en la función `checkout-btn`, encontrarás:
```js
// window.open(CONFIG.STORE_URL, "_blank");
```
Descomenta esa línea y ajusta la URL para redirigir a tu pasarela real (Tebex/BuyCraft, PayPal, etc).

---

## 📦 Despliegue en producción

Puedes subir estos 4 archivos directamente a:
- **Netlify** (arrastra la carpeta)
- **Vercel** (`vercel deploy`)
- **Apache/Nginx** (sube al DocumentRoot)
- **GitHub Pages** (sube al repositorio)

---

## ✏️ Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Colores azul/negro | `styles.css` → variables `:root` |
| IP del servidor | `main.js` → CONFIG |
| Precios | `index.html` → sección productos |
| Logo | Sustituye `logo.png` |
| Redes sociales | `index.html` → footer social |
| Ticker compras recientes | `main.js` → array `recentPurchases` |
| Modo de juego (modos) | `index.html` → `.server-modes` |

---

Hecho para KALIUM · Diseño premium 2024
