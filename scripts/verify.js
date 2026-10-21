#!/usr/bin/env node
/**
 * scripts/verify.js
 * Comprehensive automated validation suite for the portfolio build.
 * Zero external dependencies.
 * All project counts are dynamically derived from projects-data.js.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, 'assets', 'js', 'projects-data.js');
const INDEX_HTML_FILE = path.join(ROOT_DIR, 'index.html');
const ARCHIVE_HTML_FILE = path.join(ROOT_DIR, 'projects', 'index.html');
const SCRIPT_JS_FILE = path.join(ROOT_DIR, 'script.js');
const PROJECTS_JS_FILE = path.join(ROOT_DIR, 'projects', 'projects.js');
const README_FILE = path.join(ROOT_DIR, 'README.md');
const SITEMAP_FILE = path.join(ROOT_DIR, 'sitemap.xml');
const CNAME_FILE = path.join(ROOT_DIR, 'CNAME');
const ROBOTS_FILE = path.join(ROOT_DIR, 'robots.txt');

let failures = 0;
let passes = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`  FAIL: ${message}`);
    failures++;
  } else {
    console.log(`  PASS: ${message}`);
    passes++;
  }
}

console.log('====================================================');
console.log('PORTFOLIO BUILD VERIFICATION SUITE');
console.log('====================================================\n');

// 1. Data Source Verification
console.log('[1] Checking projects-data.js (Source of Truth)...');
const dataCode = fs.readFileSync(DATA_FILE, 'utf8');
const getter = new Function(dataCode + '; return (typeof PROJECTS !== "undefined" ? PROJECTS : null);');
const projects = getter();
assert(Array.isArray(projects) && projects.length > 0, `PROJECTS loaded with ${projects ? projects.length : 0} items`);

const publishedProjects = projects.filter(p => p.published);
const expectedPublishedCount = publishedProjects.length;
assert(expectedPublishedCount > 0, `Found ${expectedPublishedCount} published projects in data`);

const featuredProjects = projects
  .filter(p => p.published && p.featured && p.featuredData)
  .sort((a, b) => a.featuredOrder - b.featuredOrder);
const expectedFeaturedCount = featuredProjects.length;
assert(expectedFeaturedCount > 0, `Found ${expectedFeaturedCount} eligible featured projects in data`);

// 2. index.html Verification
console.log('\n[2] Checking index.html Pre-rendered HTML & Metadata...');
const indexHtml = fs.readFileSync(INDEX_HTML_FILE, 'utf8');

// Markers
assert(indexHtml.includes('<!-- PRE-RENDERED-FEATURED-PROJECTS-START -->'), 'Contains featured start marker');
assert(indexHtml.includes('<!-- PRE-RENDERED-FEATURED-PROJECTS-END -->'), 'Contains featured end marker');

// Featured card count (derived dynamically)
const featuredCards = indexHtml.match(/<div class="project-card">/g) || [];
assert(featuredCards.length === expectedFeaturedCount, `Found exactly ${expectedFeaturedCount} pre-rendered featured project cards (found: ${featuredCards.length})`);

// Project order in index.html
let lastIndex = -1;
let orderCorrect = true;
featuredProjects.forEach(p => {
  const idx = indexHtml.indexOf(p.featuredData.titleShort);
  if (idx === -1 || idx < lastIndex) {
    orderCorrect = false;
  }
  lastIndex = idx;
});
assert(orderCorrect, 'Featured projects appear in exact featuredOrder order');

// Canonical, title, description, OG
assert(indexHtml.includes('<link rel="canonical" href="https://hemanth-sai-portfolio.vercel.app/" />'), 'Canonical URL is correct');
assert(indexHtml.includes('<title>Hemanth Sai Charagundla — Data Scientist &amp; AI/ML Engineer</title>'), 'Title tag is present');
assert(indexHtml.includes('property="og:url" content="https://hemanth-sai-portfolio.vercel.app/"'), 'OG URL tag is present');

// Accurate Project Section Description
const expectedDesc = 'Explore projects across data engineering, machine learning, analytics, and software development. Selected projects include technical documentation, demos, or architecture details where available.';
assert(indexHtml.includes(expectedDesc), 'Project section description matches exact approved wording');
assert(!indexHtml.includes('Every project includes a full technical case study'), 'Old inaccurate case study promise was completely removed');

// Person JSON-LD
const jsonLdStart = indexHtml.indexOf('<script type="application/ld+json">');
const jsonLdEnd = indexHtml.indexOf('</script>', jsonLdStart);
let personJson = null;
if (jsonLdStart !== -1 && jsonLdEnd !== -1) {
  const jsonStr = indexHtml.substring(jsonLdStart + '<script type="application/ld+json">'.length, jsonLdEnd).trim();
  try {
    personJson = JSON.parse(jsonStr);
    assert(true, 'Schema.org JSON-LD parses as valid JSON');
  } catch (err) {
    assert(false, `Schema.org JSON-LD parse error: ${err.message}`);
  }
} else {
  assert(false, 'Schema.org JSON-LD script tag not found');
}

if (personJson) {
  assert(personJson['@context'] === 'https://schema.org', 'JSON-LD context is https://schema.org');
  assert(personJson['@type'] === 'Person', 'JSON-LD type is Person');
  assert(personJson.name === 'Hemanth Sai Charagundla', 'JSON-LD name is Hemanth Sai Charagundla');
  assert(personJson.jobTitle === 'Artificial Intelligence and Data Science Student', 'JSON-LD jobTitle reflects truthful student status');
  assert(personJson.description.includes('Artificial Intelligence and Data Science student at Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad'), 'JSON-LD description identifies university and degree');
  assert(personJson.description.includes('technical focus on machine learning, data analytics, business intelligence, and data engineering'), 'JSON-LD description highlights technical focus areas');
  assert(personJson.affiliation && personJson.affiliation.name === 'Chaitanya Bharathi Institute of Technology', 'Affiliation to CBIT preserved');
  assert(Array.isArray(personJson.sameAs) && personJson.sameAs.length === 3, 'All 3 social sameAs links preserved');
}

// Footer author
assert(indexHtml.includes('&copy; 2026 Hemanth Sai Charagundla. All rights reserved.'), 'Footer author name is Hemanth Sai Charagundla');

// 3. projects/index.html Verification
console.log('\n[3] Checking projects/index.html Pre-rendered Archive & Count Badge...');
const archiveHtml = fs.readFileSync(ARCHIVE_HTML_FILE, 'utf8');

// Markers
assert(archiveHtml.includes('<!-- PRE-RENDERED-ARCHIVE-PROJECTS-START -->'), 'Contains archive start marker');
assert(archiveHtml.includes('<!-- PRE-RENDERED-ARCHIVE-PROJECTS-END -->'), 'Contains archive end marker');

// Count Badge (derived dynamically)
const countBadgeMatch = archiveHtml.match(/<span class="projects-count-num" id="projects-count-num">(\d+)<\/span>/);
assert(countBadgeMatch && countBadgeMatch[1] === String(expectedPublishedCount), `Initial static count badge is exactly ${expectedPublishedCount} (found: ${countBadgeMatch ? countBadgeMatch[1] : 'none'})`);

// Archive cards count (derived dynamically)
const archiveCards = archiveHtml.match(/<article class="archive-card"/g) || [];
assert(archiveCards.length === expectedPublishedCount, `Found exactly ${expectedPublishedCount} pre-rendered archive cards (found: ${archiveCards.length})`);

// Archive cards order
let lastArchiveIdx = -1;
let archiveOrderCorrect = true;
const sortedArchived = projects.filter(p => p.published).sort((a, b) => a.projectOrder - b.projectOrder);
sortedArchived.forEach(p => {
  const plainTitle = p.title.replace(/&amp;/g, '&');
  const idx = archiveHtml.indexOf(plainTitle);
  if (idx === -1 || idx < lastArchiveIdx) {
    archiveOrderCorrect = false;
  }
  lastArchiveIdx = idx;
});
assert(archiveOrderCorrect, 'Archive projects appear in exact projectOrder order');

// Canonical & Title
assert(archiveHtml.includes('<link rel="canonical" href="https://hemanth-sai-portfolio.vercel.app/projects/" />'), 'Archive canonical URL is correct');
assert(archiveHtml.includes('<title>All Projects — Hemanth Sai Charagundla | Data Scientist &amp; AI/ML Engineer</title>'), 'Archive title tag is correct');

// Footer author standardized
assert(archiveHtml.includes('&copy; 2026 Hemanth Sai Charagundla. All rights reserved.'), 'Archive footer standardized to Hemanth Sai Charagundla');
assert(!archiveHtml.includes('Ch. Hemanth Sai'), 'Old non-standardized footer name removed');

// 4. JavaScript Idempotency & Interaction Guards
console.log('\n[4] Checking script.js & projects/projects.js...');
const scriptJs = fs.readFileSync(SCRIPT_JS_FILE, 'utf8');
const projectsJs = fs.readFileSync(PROJECTS_JS_FILE, 'utf8');

assert(scriptJs.includes('!grid.querySelector(".project-card")'), 'script.js guards against duplicate card rendering');
assert(scriptJs.includes('lucide.createIcons()'), 'script.js initializes Lucide icons unconditionally');

assert(projectsJs.includes('!list.querySelector(".archive-card")'), 'projects.js guards against duplicate card rendering');
assert(projectsJs.includes('lucide.createIcons()'), 'projects.js initializes Lucide icons unconditionally');
assert(projectsJs.includes('.archive-card') && projectsJs.includes('addEventListener("mousemove"'), 'projects.js attaches 3D tilt tracking');
assert(projectsJs.includes('revealObserver.observe(card)'), 'projects.js attaches scroll reveal observer');

// 5. Build Script Idempotency Check
console.log('\n[5] Testing build.js Idempotency (Running build.js again)...');
try {
  execSync('node scripts/build.js', { cwd: ROOT_DIR, stdio: 'pipe' });
  const indexHtmlAfter = fs.readFileSync(INDEX_HTML_FILE, 'utf8');
  const archiveHtmlAfter = fs.readFileSync(ARCHIVE_HTML_FILE, 'utf8');
  assert(indexHtml === indexHtmlAfter, 'Idempotency confirmed: index.html unchanged after second build');
  assert(archiveHtml === archiveHtmlAfter, 'Idempotency confirmed: projects/index.html unchanged after second build');
} catch (err) {
  assert(false, `build.js failed during idempotency test: ${err.message}`);
}

// 6. README Inconsistencies Check
console.log('\n[6] Checking README.md Corrections...');
const readme = fs.readFileSync(README_FILE, 'utf8');
assert(readme.includes('https://github.com/Hemanthsai456/sparcs-healthcare-bi-platform'), 'README SPARCS link points to sparcs-healthcare-bi-platform');
assert(!readme.includes('sparcs-healthcare-analytics-bi'), 'Dead SPARCS URL removed from README');
assert(readme.includes('R² = 0.7978'), 'README Medical Inventory metric corrected to R² = 0.7978');
assert(!readme.includes('0.7988'), 'Typo R² = 0.7988 removed from README');

// 7. Sitemap Check
console.log('\n[7] Checking sitemap.xml...');
const sitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
const lastmodCount = (sitemap.match(/<lastmod>2026-10-21<\/lastmod>/g) || []).length;
assert(lastmodCount === 2, `sitemap.xml has <lastmod>2026-10-21</lastmod> for both pages (found: ${lastmodCount})`);
assert(!sitemap.includes('2026-09-06'), 'Stale sitemap timestamp removed');

// 8. Unchanged Files Integrity
console.log('\n[8] Checking Untouched Integrity...');
const cname = fs.readFileSync(CNAME_FILE, 'utf8').trim();
assert(cname === 'hemanthsai.com', 'CNAME file remains unchanged');
const robots = fs.readFileSync(ROBOTS_FILE, 'utf8');
assert(robots.includes('User-agent: *') && robots.includes('Allow: /'), 'robots.txt remains unchanged');

console.log('\n====================================================');
console.log(`SUMMARY: ${passes} PASSED, ${failures} FAILED`);
console.log('====================================================\n');

if (failures > 0) {
  process.exit(1);
}
