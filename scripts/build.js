#!/usr/bin/env node
/**
 * scripts/build.js
 * Pre-renders featured project cards into index.html and archive cards into projects/index.html.
 * Single source of truth: assets/js/projects-data.js
 * Zero third-party dependencies (uses built-in fs and path).
 * All counts are dynamically derived from projects-data.js.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'assets', 'js', 'projects-data.js');
const INDEX_HTML_FILE = path.join(ROOT_DIR, 'index.html');
const ARCHIVE_HTML_FILE = path.join(ROOT_DIR, 'projects', 'index.html');

// Stable markers for idempotent replacements
const FEATURED_START_MARKER = '<!-- PRE-RENDERED-FEATURED-PROJECTS-START -->';
const FEATURED_END_MARKER = '<!-- PRE-RENDERED-FEATURED-PROJECTS-END -->';
const ARCHIVE_START_MARKER = '<!-- PRE-RENDERED-ARCHIVE-PROJECTS-START -->';
const ARCHIVE_END_MARKER = '<!-- PRE-RENDERED-ARCHIVE-PROJECTS-END -->';
const ARCHIVE_JSONLD_START_MARKER = '<!-- PRE-RENDERED-ARCHIVE-JSONLD-START -->';
const ARCHIVE_JSONLD_END_MARKER = '<!-- PRE-RENDERED-ARCHIVE-JSONLD-END -->';

function loadProjectsData() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`Projects data file not found at: ${DATA_FILE}`);
  }
  const code = fs.readFileSync(DATA_FILE, 'utf8');
  const getter = new Function(code + '; return (typeof PROJECTS !== "undefined" ? PROJECTS : null);');
  const projects = getter();
  if (!Array.isArray(projects)) {
    throw new Error('Failed to load PROJECTS array from assets/js/projects-data.js');
  }
  return projects;
}

function buildFeaturedCardsHtml(projects) {
  const featured = projects
    .filter(p => p.published && p.featured && p.featuredData)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);

  const cardsHtml = featured.map(project => {
    const fd = project.featuredData;

    const highlightItems = fd.highlights
      .map(h => `<li>${h}</li>`)
      .join('\n            ');

    const stackSpans = fd.stackShort
      .map(s => `<span>${s}</span>`)
      .join('\n            ');

    const linkEls = fd.links.map(link => {
      const iconHtml = `<i data-lucide="${link.icon}"></i>`;
      return `<a href="${link.href}" target="_blank" class="${link.cls}" aria-label="${link.ariaLabel}">${iconHtml} ${link.label}</a>`;
    }).join('\n            ');

    return `        <div class="project-card">
          <div class="card-glow"></div>
          <div class="project-header">
            <div class="project-icon-box"><i data-lucide="${fd.icon}"></i></div>
            <span class="project-metric">${fd.metric}</span>
          </div>
          <h3 class="project-title">${fd.titleShort}</h3>
          <p class="project-description">
            ${fd.descriptionHtml}
          </p>
          <ul class="project-highlights">
            ${highlightItems}
          </ul>
          <div class="project-stack">
            ${stackSpans}
          </div>
          <div class="project-links">
            ${linkEls}
          </div>
        </div>`;
  }).join('\n');

  return `${FEATURED_START_MARKER}\n${cardsHtml}\n        ${FEATURED_END_MARKER}`;
}

function buildArchiveCardsHtml(projects) {
  const archived = projects
    .filter(p => p.published)
    .sort((a, b) => a.projectOrder - b.projectOrder);

  const cardsHtml = archived.map((project, index) => {
    const num = String(index + 1).padStart(2, '0');

    const badgeHtml = project.badges
      .map(b => `<span class="archive-badge badge-${b.color}">${b.label}</span>`)
      .join('\n                ');

    const stackHtml = project.techStack
      .map(t => `<span>${t}</span>`)
      .join('\n                ');

    const links = [];
    const plainTitle = project.title.replace(/&amp;/g, '&').replace(/<[^>]+>/g, '');
    if (project.github) {
      links.push(`<a href="${project.github}" target="_blank" class="btn-icon" id="github-${project.id}" aria-label="GitHub repository for ${plainTitle}">
                  <i data-lucide="github"></i> GitHub
                </a>`);
    }
    if (project.live) {
      const liveLabel = project.liveLabel || 'Live Demo';
      links.push(`<a href="${project.live}" target="_blank" class="btn-icon btn-live" id="live-${project.id}" aria-label="${liveLabel} for ${plainTitle}">
                  <i data-lucide="external-link"></i> ${liveLabel}
                </a>`);
    }

    return `        <article class="archive-card" id="project-${num}">
          <div class="card-glow"></div>
          <div class="archive-card-inner">
            <div class="archive-number">${num}</div>
            <div class="archive-body">
              <div class="archive-header">
                <h2 class="archive-title">${project.title}</h2>
                <div class="archive-badges">
                ${badgeHtml}
                </div>
              </div>
              <p class="archive-desc">
                ${project.description}
              </p>
              <div class="archive-stack">
                ${stackHtml}
              </div>
              <div class="archive-links">
                ${links.join('\n                ')}
              </div>
            </div>
          </div>
        </article>`;
  }).join('\n');

  return `${ARCHIVE_START_MARKER}\n${cardsHtml}\n        ${ARCHIVE_END_MARKER}`;
}

function preRenderIndexHtml(projects) {
  let html = fs.readFileSync(INDEX_HTML_FILE, 'utf8');
  const featured = projects
    .filter(p => p.published && p.featured && p.featuredData)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
  const featuredContent = buildFeaturedCardsHtml(projects);

  const containerRegex = /(<div class="project-grid" id="featured-project-grid">)([\s\S]*?)(<\/div>)/;
  const markerRegex = new RegExp(`${FEATURED_START_MARKER}[\\s\\S]*?${FEATURED_END_MARKER}`);

  if (markerRegex.test(html)) {
    html = html.replace(markerRegex, featuredContent);
  } else if (containerRegex.test(html)) {
    html = html.replace(containerRegex, `$1\n        ${featuredContent}\n      $3`);
  } else {
    throw new Error('Failed to find <div class="project-grid" id="featured-project-grid"> in index.html');
  }

  // Count check derived directly from data
  const cardCount = (html.match(/<div class="project-card">/g) || []).length;
  if (cardCount !== featured.length) {
    throw new Error(`Validation error: Expected exactly ${featured.length} featured cards in index.html, found ${cardCount}`);
  }

  fs.writeFileSync(INDEX_HTML_FILE, html, 'utf8');
  console.log(`[build.js] index.html successfully pre-rendered with ${cardCount} featured cards.`);
}

function buildArchiveJsonLd(projects) {
  const archived = projects
    .filter(p => p.published)
    .sort((a, b) => a.projectOrder - b.projectOrder);

  const itemListElements = archived.map((project, index) => {
    const plainTitle = project.title
      .replace(/&amp;/g, '&')
      .replace(/<[^>]+>/g, '')
      .trim();

    const item = {
      "@type": "SoftwareSourceCode",
      "name": plainTitle,
      "description": project.description,
      "programmingLanguage": project.techStack
    };

    if (project.github) {
      item.codeRepository = project.github;
    }
    if (project.live) {
      item.url = project.live;
    } else if (project.github) {
      item.url = project.github;
    }

    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": plainTitle,
      "item": item
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Projects — Hemanth Sai Charagundla",
    "description": "A full archive of machine learning, data analytics, business intelligence, and data engineering projects by Hemanth Sai Charagundla.",
    "url": "https://hemanth-sai-portfolio.vercel.app/projects/",
    "author": {
      "@type": "Person",
      "name": "Hemanth Sai Charagundla",
      "url": "https://hemanth-sai-portfolio.vercel.app/"
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": archived.length,
      "itemListElement": itemListElements
    }
  };

  const jsonString = JSON.stringify(schema, null, 2);
  return `${ARCHIVE_JSONLD_START_MARKER}\n  <script type="application/ld+json">\n${jsonString}\n  </script>\n  ${ARCHIVE_JSONLD_END_MARKER}`;
}

function preRenderArchiveHtml(projects) {
  let html = fs.readFileSync(ARCHIVE_HTML_FILE, 'utf8');
  const archivedProjects = projects.filter(p => p.published);
  const archiveContent = buildArchiveCardsHtml(projects);
  const archiveJsonLd = buildArchiveJsonLd(projects);

  // Replace or inject JSON-LD marker
  const jsonLdMarkerRegex = new RegExp(`${ARCHIVE_JSONLD_START_MARKER}[\\s\\S]*?${ARCHIVE_JSONLD_END_MARKER}`);
  if (jsonLdMarkerRegex.test(html)) {
    html = html.replace(jsonLdMarkerRegex, archiveJsonLd);
  } else if (html.includes('</head>')) {
    html = html.replace('</head>', `  ${archiveJsonLd}\n</head>`);
  }

  const containerRegex = /(<div class="archive-list" id="archive-list">)([\s\S]*?)(<\/div>)/;
  const markerRegex = new RegExp(`${ARCHIVE_START_MARKER}[\\s\\S]*?${ARCHIVE_END_MARKER}`);

  if (markerRegex.test(html)) {
    html = html.replace(markerRegex, archiveContent);
  } else if (containerRegex.test(html)) {
    html = html.replace(containerRegex, `$1\n        ${archiveContent}\n      $3`);
  } else {
    throw new Error('Failed to find <div class="archive-list" id="archive-list"> in projects/index.html');
  }

  // Update count badge to match published count derived from data
  const countRegex = /(<span class="projects-count-num" id="projects-count-num">)(\d+)(<\/span>)/;
  if (!countRegex.test(html)) {
    throw new Error('Failed to find <span class="projects-count-num" id="projects-count-num"> in projects/index.html');
  }
  html = html.replace(countRegex, `$1${archivedProjects.length}$3`);

  // Count check derived directly from data
  const cardCount = (html.match(/<article class="archive-card"/g) || []).length;
  if (cardCount !== archivedProjects.length) {
    throw new Error(`Validation error: Expected exactly ${archivedProjects.length} archive cards, found ${cardCount}`);
  }

  fs.writeFileSync(ARCHIVE_HTML_FILE, html, 'utf8');
  console.log(`[build.js] projects/index.html successfully pre-rendered with ${cardCount} archive cards and structured data.`);
}

function run() {
  console.log('[build.js] Starting pre-render build...');
  const projects = loadProjectsData();
  const publishedCount = projects.filter(p => p.published).length;
  const featuredCount = projects.filter(p => p.published && p.featured && p.featuredData).length;
  console.log(`[build.js] Loaded ${projects.length} total projects (${publishedCount} published, ${featuredCount} featured).`);

  preRenderIndexHtml(projects);
  preRenderArchiveHtml(projects);
  console.log('[build.js] Pre-render build completed successfully.');
}

run();
