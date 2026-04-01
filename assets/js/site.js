(function () {
  const data = window.resumeData;

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (str) => String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  function renderHighlights() {
    const container = byId('highlightsGrid');
    if (!container) return;

    container.innerHTML = data.highlights.map((item) => `
      <article class="card project-card">
        <div class="project-thumb">${escapeHtml(item.label)}</div>
        <div class="project-body">
          <div class="project-title"><h3>${escapeHtml(item.title)}</h3></div>
          <p class="muted">${escapeHtml(item.description)}</p>
          <p class="muted"><strong>${escapeHtml(item.term || 'Focus')}:</strong> ${escapeHtml(item.tech)}</p>
        </div>
      </article>
    `).join('');
  }

  function renderExperience() {
    const container = byId('experienceTimeline');
    if (!container) return;

    container.innerHTML = data.experience.map((item) => `
      <div class="tl-item">
        <div class="tl-title">${escapeHtml(item.role)}</div>
        <div class="tl-meta">${escapeHtml(item.meta)}</div>
        <p class="muted">${escapeHtml(item.summary)}</p>
      </div>
    `).join('');
  }

  function renderEducation() {
    const container = byId('educationTimeline');
    if (!container) return;

    if (!Array.isArray(data.education) || data.education.length === 0) {
      container.innerHTML = '<p class="muted">Education details coming soon.</p>';
      return;
    }

    container.innerHTML = data.education.map((item) => `
      <div class="tl-item">
        <div class="tl-title">${escapeHtml(item.title)}</div>
        <div class="tl-meta">${escapeHtml(item.meta)}</div>
        ${item.summary ? `<p class="muted">${escapeHtml(item.summary)}</p>` : ''}
      </div>
    `).join('');
  }

  function renderTalks() {
    const container = byId('talksTimeline');
    if (!container) return;

    if (!Array.isArray(data.talks) || data.talks.length === 0) {
      container.innerHTML = '<p class="muted">Talks and sessions will be listed here soon.</p>';
      return;
    }

    container.innerHTML = data.talks.map((item) => `
      <div class="tl-item">
        <div class="tl-title">${escapeHtml(item.title)}</div>
        <div class="tl-meta">${escapeHtml(item.meta)}</div>
        <p class="muted">${escapeHtml(item.summary)}</p>
      </div>
    `).join('');
  }

  function renderSkills() {
    const container = byId('skillsGrid');
    if (!container) return;

    container.innerHTML = data.skills.map((category) => `
      <article class="card" style="padding:18px;">
        <h3>${escapeHtml(category.title)}</h3>
        <div class="chip-grid">
          ${category.items.map((item) => `
            <div class="tech-chip">
              <img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.name)} logo" loading="lazy" />
              <span>${escapeHtml(item.name)}</span>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  function renderPrinciples() {
    const container = byId('principlesGrid');
    if (!container) return;

    container.innerHTML = data.principles.map((item) => `
      <article class="card project-card">
        <div class="project-thumb">${escapeHtml(item.label)}</div>
        <div class="project-body">
          <div class="project-title"><h3>${escapeHtml(item.title)}</h3></div>
          <p class="muted">${escapeHtml(item.description)}</p>
        </div>
      </article>
    `).join('');
  }

  function initThemeToggle() {
    const key = 'site-theme';
    const btn = byId('themeToggle');
    if (!btn) return;

    const apply = (mode) => {
      document.documentElement.setAttribute('data-theme', mode);
      if (mode === 'dark') {
        document.documentElement.style.setProperty('--bg', '#0b0b10');
        document.documentElement.style.setProperty('--surface', '#12121a');
        document.documentElement.style.setProperty('--text', '#e6e6f0');
        document.documentElement.style.setProperty('--muted', '#a0a0b8');
        document.documentElement.style.setProperty('--card', '#15151f');
        document.documentElement.style.setProperty('--border', 'rgba(255,255,255,0.08)');
        document.documentElement.style.setProperty('--shadow', '0 10px 30px rgba(0,0,0,0.35)');
      } else {
        document.documentElement.style.setProperty('--bg', '#f6f7fb');
        document.documentElement.style.setProperty('--surface', '#ffffff');
        document.documentElement.style.setProperty('--text', '#12131a');
        document.documentElement.style.setProperty('--muted', '#4b4d63');
        document.documentElement.style.setProperty('--card', '#ffffff');
        document.documentElement.style.setProperty('--border', 'rgba(8,10,20,0.08)');
        document.documentElement.style.setProperty('--shadow', '0 10px 30px rgba(8,10,20,0.08)');
      }
    };

    const saved = localStorage.getItem(key);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(saved || (prefersDark ? 'dark' : 'light'));

    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem(key, cur);
      apply(cur);
    });
  }

  function init() {
    renderHighlights();
    renderExperience();
    renderEducation();
    renderSkills();
    renderPrinciples();
    initThemeToggle();
    renderTalks();
    byId('year').textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
