// ===== SHARED COMPONENTS =====
// Auto-inject common elements into all pages
// Runs immediately (scripts are at bottom of body, so DOM is ready)

(function() {

  // Page Transition overlay
  if (!document.querySelector('.page-transition')) {
    const pt = document.createElement('div');
    pt.className = 'page-transition';
    document.body.appendChild(pt);
  }

  // Scroll to Top button
  if (!document.querySelector('.scroll-top')) {
    const stb = document.createElement('button');
    stb.className = 'scroll-top';
    stb.setAttribute('title', 'Yukari Cik');
    stb.setAttribute('aria-label', 'Sayfa basina don');
    stb.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(stb);
  }

  // Toast container
  if (!document.querySelector('.toast-container')) {
    const tc = document.createElement('div');
    tc.className = 'toast-container';
    tc.setAttribute('aria-live', 'polite');
    tc.setAttribute('aria-atomic', 'true');
    document.body.appendChild(tc);
  }

  // Global Search Modal
  if (!document.querySelector('.global-search')) {
    const gs = document.createElement('div');
    gs.className = 'global-search';
    gs.innerHTML = `
      <div class="global-search-box">
        <div class="global-search-input">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Sayfa, yazi veya proje ara..." aria-label="Site iceriginde ara">
          <kbd>ESC</kbd>
        </div>
        <div class="global-search-results"></div>
        <div class="search-hint"><i class="fas fa-info-circle"></i> Aramak icin en az 2 karakter yazin</div>
      </div>
    `;
    document.body.appendChild(gs);
  }

  // Reading Mode Toggle
  if (!document.querySelector('.reading-mode-toggle')) {
    const rmt = document.createElement('button');
    rmt.className = 'reading-mode-toggle';
    rmt.setAttribute('title', 'Okuma Modu');
    rmt.setAttribute('aria-label', 'Okuma modunu ac/kapat');
    rmt.innerHTML = '<i class="fas fa-book-reader"></i>';
    document.body.appendChild(rmt);
  }

  // Snake Game Overlay
  if (!document.querySelector('.snake-game-overlay')) {
    const sg = document.createElement('div');
    sg.className = 'snake-game-overlay';
    sg.innerHTML = `
      <button class="snake-game-close" aria-label="Oyunu kapat" onclick="closeSnakeGame()">&times;</button>
      <div class="snake-game-header">
        <h2><i class="fas fa-gamepad"></i> Snake Game</h2>
        <div class="snake-game-score">Skor: <span id="snakeScore">0</span></div>
      </div>
      <canvas id="snakeCanvas" width="400" height="400"></canvas>
      <div class="snake-game-instructions">
        <kbd>Arrow Keys</kbd> Yon &nbsp; <kbd>SPACE</kbd> Baslat/Tekrar &nbsp; <kbd>ESC</kbd> Kapat
      </div>
    `;
    document.body.appendChild(sg);
  }

  // Keyboard Shortcuts Modal
  if (!document.querySelector('.shortcuts-modal')) {
    const sm = document.createElement('div');
    sm.className = 'shortcuts-modal';
    sm.innerHTML = `
      <div class="shortcuts-content">
        <h3><i class="fas fa-keyboard"></i> Klavye Kisayollari</h3>
        <div class="shortcut-item">
          <span>Global Arama</span>
          <span class="shortcut-key"><kbd>Ctrl</kbd><kbd>K</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Snake Oyunu</span>
          <span class="shortcut-key"><kbd>Ctrl</kbd><kbd>G</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Dark/Light Mod</span>
          <span class="shortcut-key"><kbd>D</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Ana Sayfa</span>
          <span class="shortcut-key"><kbd>H</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Blog</span>
          <span class="shortcut-key"><kbd>B</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Okuma Modu</span>
          <span class="shortcut-key"><kbd>R</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Kisayollar</span>
          <span class="shortcut-key"><kbd>?</kbd></span>
        </div>
        <div class="shortcut-item">
          <span>Kapat</span>
          <span class="shortcut-key"><kbd>Esc</kbd></span>
        </div>
        <div style="text-align:center; margin-top:16px;">
          <button class="btn btn-outline" onclick="document.querySelector('.shortcuts-modal').classList.remove('open');" style="padding:8px 20px;">Kapat</button>
        </div>
      </div>
    `;
    sm.addEventListener('click', (e) => {
      if (e.target === sm) sm.classList.remove('open');
    });
    document.body.appendChild(sm);
  }

})();
