(function () {
  const site = window.SITE;
  if (!site) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function assetSrc(path) {
    return String(path || "").split("/").map(encodeURIComponent).join("/");
  }

  function icon(name, cls = "") {
    return `<span class="material-symbols-outlined ${cls}">${name}</span>`;
  }

  const BRAND = {
    github: `<svg class="brand-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    linkedin: `<svg class="brand-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>`,
    x: `<svg class="brand-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  };

  function renderHero() {
    const social = [
      site.links.github && { href: site.links.github, svg: BRAND.github, label: "GitHub" },
      site.links.linkedin && { href: site.links.linkedin, svg: BRAND.linkedin, label: "LinkedIn" },
      site.links.twitter && { href: site.links.twitter, svg: BRAND.x, label: "X" },
    ].filter(Boolean);

    $("#hero").innerHTML = `
      <div class="flex-1 space-y-6 z-10 relative">
        <h1 class="font-display-lg text-4xl sm:text-5xl md:text-display-lg text-white">${site.name}</h1>
        <p class="font-headline-lg-mobile text-headline-lg-mobile text-white/90 max-w-2xl">${site.headline}</p>
        <p class="text-white/55 max-w-2xl">${site.subhead}</p>
        <div class="flex flex-wrap gap-4 pt-4">
          ${social.map((s) => `
            <a class="icon-btn p-3 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label}">
              ${s.svg}
            </a>`).join("")}
          ${site.links.email ? `
          <a class="icon-btn p-3 rounded-full hover:bg-white/10 transition-all flex items-center justify-center text-white" href="mailto:${site.links.email}" aria-label="Email">
            ${icon("mail", "text-[20px]")}
          </a>` : ""}
          ${site.resumeView ? `
          <a class="icon-btn px-6 py-3 rounded-full hover:bg-white/10 transition-all flex items-center gap-2 text-white" href="${site.resumeView}" target="_blank" rel="noopener noreferrer">
            ${icon("description")}
            <span class="font-label-sm text-label-sm">Resume</span>
          </a>` : ""}
        </div>
      </div>
      <div class="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
        <div class="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
        <img class="w-full h-full object-cover rounded-2xl relative z-10 grayscale border border-white/15" alt="Portrait of ${site.name}" src="${site.avatar}" onerror="this.style.display='none'"/>
      </div>`;
  }

  function renderAbout() {
    const extra = site.aboutMore
      ? `<button id="more-about-btn" type="button" class="more-about-btn mt-8">
          ${icon("description", "text-[18px]")}
          <span>More About Me</span>
        </button>
        <div id="more-about" class="about-more hidden mt-8 max-w-4xl">${site.aboutMore}</div>`
      : "";

    $("#about").innerHTML = `
      <div class="absolute -left-32 top-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full z-[-1]"></div>
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">About</h2>
      <div class="glass-panel p-8 rounded-3xl">
        <p class="text-white/80 text-lg leading-relaxed max-w-4xl">${site.about}</p>
        ${extra}
      </div>`;
  }

  function renderSkills() {
    const counts = { all: site.skills.items.length };
    site.skills.filters.forEach((f) => {
      if (f.id === "all") return;
      counts[f.id] = site.skills.items.filter((i) => i.cat.split(" ").includes(f.id)).length;
    });

    $("#skills").innerHTML = `
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">Skills</h2>
      <div class="flex flex-wrap gap-3 mb-8" id="skill-filters">
        ${site.skills.filters.map((f, i) => `
          <button type="button" data-filter="${f.id}" class="skill-filter glass-panel ${i === 0 ? "is-on" : ""} px-4 py-2 ${i === 0 ? "text-white" : "text-white/70"} rounded-full font-label-sm text-label-sm flex items-center gap-2 hover:bg-white/10 transition-colors">
            ${icon(f.icon, "text-[16px]")}
            ${f.label} <span class="bg-black px-2 py-0.5 rounded-full text-[10px] text-white border border-white/20">${counts[f.id]}</span>
          </button>`).join("")}
      </div>
      <div class="glass-panel p-8 rounded-3xl flex flex-wrap gap-3 justify-center" id="skill-grid">
        ${site.skills.items.map((s) => `
          <div class="skill-chip px-3 py-1.5 rounded-lg border border-white/15 bg-black text-white/90 font-label-sm flex items-center gap-2" data-cat="${s.cat}">
            ${icon(s.icon, "text-[14px]")} ${s.name}
          </div>`).join("")}
      </div>`;
  }

  function renderWork() {
    $("#work").innerHTML = `
      <div class="absolute right-0 top-32 w-96 h-96 bg-white/5 blur-[120px] rounded-full z-[-1]"></div>
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">Work Experience</h2>
      ${site.work.map((job) => `
        <article class="glass-panel p-6 md:p-8 rounded-3xl relative group">
          <div class="absolute left-0 top-0 w-1 h-full bg-white opacity-20 group-hover:opacity-50 transition-opacity"></div>
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 pl-4">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                ${job.logo ? `<img src="${job.logo}" alt="${job.company}" class="w-full h-full object-contain p-1.5" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ""}
                <span class="font-headline-lg text-black text-sm font-extrabold ${job.logo ? "hidden" : "flex"} items-center justify-center w-full h-full">${job.mark}</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">${job.role}</h3>
                <p class="text-white/80">${job.company}</p>
              </div>
            </div>
            <div class="text-right pl-16 md:pl-0">
              <div class="text-white/60 text-sm">${job.dates}</div>
              <div class="inline-block mt-1 px-2 py-1 bg-white/10 rounded text-[10px] text-white/80 uppercase tracking-wider border border-white/20">${job.badge}</div>
            </div>
          </div>
          <div class="pl-4 md:pl-20 mt-4 text-white/70 space-y-3 leading-relaxed">${job.summary}</div>
        </article>`).join("")}`;
  }

  function allProjects() {
    const p = site.projects;
    if (Array.isArray(p)) return p;
    return [...(p.featured || []), ...(p.other || [])];
  }

  function youtubeId(url) {
    const m = (url || "").match(/(?:youtu\.be\/|v=)([\w-]+)/);
    return m ? m[1] : "";
  }

  function youtubeThumb(url, title) {
    const id = youtubeId(url);
    if (!id) return "";
    return `
      <button type="button" class="project-thumb" data-yt-play="${id}" aria-label="Play ${title} demo">
        <img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg" alt="${title} video thumbnail" loading="lazy" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${id}/hqdefault.jpg'"/>
        <span class="project-thumb-play" aria-hidden="true">${icon("play_arrow")}</span>
      </button>`;
  }

  function staticThumb(p) {
    if (!p.image) return "";
    const href = p.live || p.video || p.github;
    const showPlay = Boolean(p.video);
    const inner = `
      <img src="${p.image}" alt="${p.name} preview" loading="lazy"/>
      ${showPlay ? `<span class="project-thumb-play" aria-hidden="true">${icon("play_arrow")}</span>` : ""}`;
    if (href) {
      const label = p.video ? `${p.name} demo video` : `${p.name} ${p.live ? "live site" : "repository"}`;
      return `<a class="project-thumb project-thumb-static" href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${inner}</a>`;
    }
    return `<div class="project-thumb project-thumb-static">${inner}</div>`;
  }

  function projectMedia(p) {
    if (p.image) return staticThumb(p);
    if (p.video && youtubeId(p.video)) return youtubeThumb(p.video, p.name);
    return `<div class="project-thumb project-thumb-empty" aria-hidden="true"></div>`;
  }

  function projectLinkRow(p) {
    const links = [
      p.github && { href: p.github, label: "GitHub", inner: BRAND.github },
      p.live && { href: p.live, label: "Live site", inner: icon("language", "text-[18px]") },
      p.video && { href: p.video, label: "Video", inner: icon("play_circle", "text-[18px]") },
    ].filter(Boolean);
    if (!links.length) return "";
    return `<div class="project-links">${links.map((l) => `
      <a class="project-link" href="${l.href}" target="_blank" rel="noopener noreferrer" aria-label="${l.label}">${l.inner}</a>`).join("")}</div>`;
  }

  function projectCard(p) {
    const badge = p.badge
      ? `<span class="project-badge">${p.badge}</span>`
      : "";
    return `
      <article class="glass-panel project-card p-6 rounded-3xl">
        ${projectMedia(p)}
        <div class="project-card-main">
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-lg font-bold text-white">${p.name}</h3>
            ${badge}
          </div>
          <p class="mt-3 text-white/70 text-sm leading-relaxed">${p.blurb}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            ${p.tags.map((t) => `<span class="font-label-sm text-[10px] px-2 py-1 rounded border border-white/15 text-white/60">${t}</span>`).join("")}
          </div>
        </div>
        <div class="project-card-foot">
          ${projectLinkRow(p)}
          ${p.details ? `
            <button type="button" class="project-more-btn" data-project-toggle="${p.id}">
              ${icon("description", "text-[16px]")}
              <span>More about project</span>
            </button>
            <div id="project-detail-${p.id}" class="project-more hidden mt-5">${p.details}</div>` : ""}
        </div>
      </article>`;
  }

  function chunkPairs(items) {
    const rows = [];
    for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
    return rows;
  }

  function renderProjects() {
    const rows = chunkPairs(allProjects());

    $("#projects").innerHTML = `
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">Projects</h2>
      ${rows.map((row) => `
        <div class="projects-grid">
          ${row.map(projectCard).join("")}
        </div>`).join("")}
      ${site.projectsCoda && site.links.github ? `
        <p class="projects-coda">
          ${site.projectsCoda}
          <span class="projects-coda-more">See more on
            <a href="${site.links.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${BRAND.github}</a>
          </span>
        </p>` : ""}`;
  }

  function renderAchievements() {
    const items = site.achievements || [];
    if (!items.length) return;

    $("#achievements").innerHTML = `
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">Achievements</h2>
      <div class="glass-panel rounded-3xl overflow-hidden">
        ${items.map((a) => `
          <article class="achievement-item">
            <button type="button" class="achievement-row" data-achievement-toggle="${a.id}" aria-expanded="false">
              <span class="achievement-logo">
                ${a.logo ? `<img src="${assetSrc(a.logo)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ""}
                <span class="${a.logo ? "hidden" : "flex"}">${a.mark || ""}</span>
              </span>
              <span class="achievement-copy">
                <span class="achievement-name">${a.name}<span class="achievement-year">${a.year || ""}</span></span>
                <span class="achievement-headline">${a.headline}</span>
              </span>
              ${icon("expand_more", "achievement-chevron")}
            </button>
            <div id="achievement-detail-${a.id}" class="achievement-detail hidden">
              <span class="achievement-logo achievement-logo-spacer" aria-hidden="true"></span>
              <div class="achievement-detail-inner">${a.details}</div>
            </div>
          </article>`).join("")}
      </div>`;
  }

  function renderEducation() {
    $("#education").innerHTML = `
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-white">Education</h2>
      ${site.education.map((ed) => `
        <article class="glass-panel p-6 md:p-8 rounded-3xl relative group">
          <div class="absolute left-0 top-0 w-1 h-full bg-white opacity-20 group-hover:opacity-50 transition-opacity"></div>
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 pl-4">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                ${ed.logo ? `<img src="${ed.logo}" alt="${ed.school}" class="w-full h-full object-contain p-1" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ""}
                <span class="font-headline-lg text-black text-sm font-extrabold ${ed.logo ? "hidden" : "flex"} items-center justify-center w-full h-full">${ed.mark}</span>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">${ed.school}</h3>
                ${ed.university ? `<p class="text-white/55 text-sm mt-0.5">${ed.university}</p>` : ""}
                <p class="text-white/80 mt-2">${ed.degree}</p>
                ${ed.gpa ? `<p class="text-white/70 text-sm mt-1">${ed.gpa}</p>` : ""}
              </div>
            </div>
            <div class="text-white/60 text-sm pl-16 md:pl-0">${ed.meta}</div>
          </div>
        </article>`).join("")}`;
  }

  function renderFooter() {
    const links = [
      ["GitHub", site.links.github],
      ["LinkedIn", site.links.linkedin],
      ["Twitter", site.links.twitter],
    ].filter(([, href]) => href);

    $("footer .js-copy").textContent = `© ${new Date().getFullYear()} ${site.name}`;
    $("footer .js-links").innerHTML = [
      ...links.map(([label, href]) => `<a class="text-white/60 hover:text-white transition-colors" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`),
      site.links.email ? `<a class="text-white/60 hover:text-white transition-colors" href="mailto:${site.links.email}">Email</a>` : "",
      `<button type="button" data-download-resume class="text-white/60 hover:text-white transition-colors">Resume Download</button>`,
    ].filter(Boolean).join("");
  }

  function renderContact() {
    const rows = [
      site.links.email && { href: `mailto:${site.links.email}`, icon: "mail", label: site.links.email },
      site.links.linkedin && { href: site.links.linkedin, icon: "groups", label: "LinkedIn" },
      site.links.github && { href: site.links.github, icon: "code", label: "GitHub" },
      site.links.twitter && { href: site.links.twitter, icon: "alternate_email", label: "X / Twitter" },
    ].filter(Boolean);

    $("#contact-body").innerHTML = rows.map((r) => `
      <a href="${r.href}" ${r.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""} class="icon-btn flex items-center gap-3 p-4 rounded-xl hover:bg-white/10">
        ${icon(r.icon)}<span>${r.label}</span>
      </a>`).join("");
  }

  function renderResumeSheet() {
    const sheet = $("#resume-sheet");
    if (!sheet) return;
    sheet.innerHTML = `
      <h1 style="font-size:28px;margin:0 0 4px;font-weight:800">${site.name}</h1>
      <p style="margin:0 0 16px;color:#444">${site.headline} · ${site.location}</p>
      <p style="margin:0 0 20px;font-size:13px;color:#333">${site.subhead}</p>
      <h2 style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px">About</h2>
      <p style="font-size:13px;line-height:1.5">${site.about}</p>
      <h2 style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:22px">Experience</h2>
      ${site.work.map((j) => `<div style="margin:12px 0"><strong>${j.role}</strong> — ${j.company}<br><span style="color:#666;font-size:12px">${j.dates} · ${j.badge}</span><p style="margin:6px 0 0;font-size:13px">${j.summary}</p></div>`).join("")}
      <h2 style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:22px">Projects</h2>
      ${allProjects().map((p) => `<div style="margin:12px 0"><strong>${p.name}</strong><p style="margin:4px 0 0;font-size:13px">${p.blurb}</p></div>`).join("")}
      ${site.achievements?.length ? `<h2 style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:22px">Achievements</h2>${site.achievements.map((a) => `<div style="margin:12px 0"><strong>${a.name}</strong> — ${a.headline || a.result || ""}</div>`).join("")}` : ""}
      <h2 style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:22px">Education</h2>
      ${site.education.map((e) => `<div style="margin:12px 0"><strong>${e.school}</strong>${e.university ? `<br>${e.university}` : ""}<br>${e.degree}${e.gpa ? ` · ${e.gpa}` : ""}<br><span style="color:#666;font-size:12px">${e.meta}</span></div>`).join("")}
      <h2 style="font-size:14px;letter-spacing:.12em;text-transform:uppercase;border-bottom:1px solid #ddd;padding-bottom:6px;margin-top:22px">Skills</h2>
      <p style="font-size:13px">${site.skills.items.map((s) => s.name).join(" · ")}</p>
      <p style="margin-top:24px;font-size:12px;color:#666">${[site.links.github, site.links.linkedin, site.links.email].filter(Boolean).join(" · ")}</p>`;
  }

  function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadResume() {
    if (site.resumeDownload) {
      const a = document.createElement("a");
      a.href = site.resumeDownload;
      a.download = site.files.resume;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
      return;
    }

    try {
      const res = await fetch(site.resumeFile, { cache: "no-store" });
      if (res.ok) {
        const blob = await res.blob();
        if (blob.size > 80) {
          saveBlob(blob, site.files.resume);
          return;
        }
      }
    } catch (_) { /* local file:// or missing pdf — generate instead */ }

    if (!window.html2pdf) {
      window.print();
      return;
    }
    html2pdf()
      .set({
        margin: 10,
        filename: site.files.resume,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from($("#resume-sheet"))
      .save();
  }

  function applyTheme(mode) {
    const light = mode === "light";
    document.documentElement.classList.toggle("light", light);
    document.documentElement.classList.toggle("dark", !light);
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = light ? "#f7d6c8" : "#000000";
    try { localStorage.setItem("kk-theme", light ? "light" : "dark"); } catch (_) { /* ignore */ }
    $$("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  function wireUi() {
    document.title = site.title;
    $$(".js-brand").forEach((el) => { el.textContent = site.shortName; });
    $$(".js-resume-view").forEach((el) => {
      if (site.resumeView) el.href = site.resumeView;
    });

    applyTheme((() => {
      try { return localStorage.getItem("kk-theme") || "dark"; } catch (_) { return "dark"; }
    })());

    const modal = $("#contact-modal");
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-theme-toggle]")) {
        applyTheme(document.documentElement.classList.contains("light") ? "dark" : "light");
        return;
      }
      if (e.target.closest("[data-open-contact]")) modal.showModal();
      if (e.target.closest("[data-download-resume]")) downloadResume();
    });

    $("#more-about-btn")?.addEventListener("click", () => {
      const more = $("#more-about");
      const btn = $("#more-about-btn");
      const open = !more.classList.contains("hidden");
      more.classList.toggle("hidden", open);
      btn.querySelector("span:last-child").textContent = open ? "More About Me" : "Show less";
    });

    document.addEventListener("click", (e) => {
      const thumb = e.target.closest("[data-yt-play]");
      if (thumb && !thumb.classList.contains("is-playing")) {
        const id = thumb.dataset.ytPlay;
        thumb.classList.add("is-playing");
        thumb.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="Project demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        return;
      }

      const achBtn = e.target.closest("[data-achievement-toggle]");
      if (achBtn) {
        const id = achBtn.dataset.achievementToggle;
        const panel = $(`#achievement-detail-${id}`);
        const item = achBtn.closest(".achievement-item");
        if (!panel || !item) return;
        const opening = panel.classList.contains("hidden");
        panel.classList.toggle("hidden", !opening);
        achBtn.setAttribute("aria-expanded", opening ? "true" : "false");
        item.classList.toggle("is-open", opening);
        return;
      }

      const btn = e.target.closest("[data-project-toggle]");
      if (!btn) return;
      const id = btn.dataset.projectToggle;
      const panel = $(`#project-detail-${id}`);
      if (!panel) return;
      const opening = panel.classList.contains("hidden");

      $$("[data-project-toggle]").forEach((other) => {
        const otherId = other.dataset.projectToggle;
        const otherPanel = $(`#project-detail-${otherId}`);
        if (!otherPanel) return;
        const keepOpen = opening && otherId === id;
        otherPanel.classList.toggle("hidden", !keepOpen);
        other.querySelector("span:last-child").textContent = keepOpen ? "Show less" : "More about project";
      });
      $$(".projects-grid").forEach((grid) => {
        grid.classList.toggle("is-open", Boolean(grid.querySelector(".project-more:not(.hidden)")));
      });
    });

    $$(".skill-filter").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.filter;
        $$(".skill-filter").forEach((f) => {
          f.classList.remove("is-on", "bg-white/10", "border-white/20", "text-white");
          f.classList.add("bg-white/5", "border-white/10", "text-white/70");
        });
        btn.classList.add("is-on", "bg-white/10", "border-white/20", "text-white");
        btn.classList.remove("bg-white/5", "border-white/10", "text-white/70");
        $$(".skill-chip").forEach((chip) => {
          const show = key === "all" || chip.dataset.cat.split(" ").includes(key);
          chip.classList.toggle("is-hidden", !show);
        });
      });
    });

    const menu = $("#mobile-menu");
    $("#mobile-menu-btn")?.addEventListener("click", () => menu.classList.toggle("hidden"));
    $$(".mobile-menu-link").forEach((link) => link.addEventListener("click", () => menu.classList.add("hidden")));

    const sections = ["about", "work", "projects", "achievements", "education"].map((id) => document.getElementById(id)).filter(Boolean);
    const spy = () => {
      const y = window.scrollY + 120;
      let current = sections[0]?.id;
      sections.forEach((sec) => { if (sec.offsetTop <= y) current = sec.id; });
      $$(".nav-link").forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + current);
      });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  renderHero();
  renderAbout();
  renderSkills();
  renderWork();
  renderProjects();
  renderAchievements();
  renderEducation();
  renderFooter();
  renderContact();
  renderResumeSheet();
  wireUi();
})();
