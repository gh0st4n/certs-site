/* ══════════════════════════════════════════════════════════════
   CERTS.GH0ST4N.MY.ID — JAVASCRIPT
   ──────────────────────────────────────────────────────────────
   DAFTAR ISI:
   0. Konfigurasi ........ titik edit utama (typewriter, label issuer)
   1. Typewriter ......... tagline hero ngetik sendiri
   2. Hamburger menu ..... menu mobile
   3. Scroll reveal ...... animasi .fade-in-up
   4. Particles .......... background canvas hero
   5. Statistik .......... total kartu & issuer dihitung otomatis
   6. Filter issuer ...... tombol dibuat otomatis dari data-issuer
   7. Lightbox ........... modal sertifikat (gambar zoom + PDF iframe)
   8. Inisialisasi ....... semua fitur dinyalakan di sini

   CATATAN:
   - File dimuat di AKHIR <body> → DOM pasti sudah ada.
     Kalau dipindah ke <head>, WAJIB tambah atribut defer.
   - Semua dibungkus IIFE (() => {...})() → variabel & function
     gak bocor ke global scope.
   - TAMBAH SERTIFIKAT BARU: cukup duplikat blok .cert-card di
     index.html + isi data-issuer → tombol filter & statistik
     nambah OTOMATIS. Gak perlu sentuh file ini.
   - MAU MATIKAN FITUR SEMENTARA? Komentarin 1 baris di bagian 8.
   ══════════════════════════════════════════════════════════════ */
(() => {
  "use strict";

  /* ─────────────── 0. KONFIGURASI ───────────────
     Edit bagian ini dulu sebelum ubah yang lain. */

  // Kalimat yang diketik-hapus di tagline hero
  const TYPE_PHRASES = [
    "Klik [ View ] untuk lihat dokumen aslinya",
    "Klik [ Verify ] untuk verifikasi langsung ke issuer",
    "Cyber Security Track",
  ];

  // Label rapi untuk tombol filter (opsional).
  // Key = nilai data-issuer di index.html.
  // Issuer yang gak ada di sini tampil apa adanya (slug-nya).
  const ISSUER_LABELS = {
    itbox: "ITBox",
    hackerroom: "HackerRoom",
    "merdeka-siber": "Merdeka Siber",
  };

  // Label tipe sertifikat utk tombol filter (key = nilai data-type)
  const TYPE_LABELS = {
    course: "Course",
    webinar: "Webinar",
  };

  const REDUCED_MOTION = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ─────────────── 1. TYPEWRITER ───────────────
     Tagline hero diketik-hapus-ganti secara bergantian.
     Edit daftar kalimat di TYPE_PHRASES (bagian 0). */
  function initTypewriter() {
    const span = document.getElementById("typewriter");
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const current = TYPE_PHRASES[phraseIndex];

      if (isDeleting) {
        span.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // hapus lebih cepat
      } else {
        span.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typeSpeed = 2000; // jeda saat kalimat lengkap
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % TYPE_PHRASES.length;
        typeSpeed = 500; // jeda sebelum kalimat baru
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  /* ─────────────── 2. HAMBURGER MENU ───────────────
     Toggle menu mobile + auto-tutup saat link diklik. */
  function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const navContainer = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
      navContainer.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navContainer.classList.remove("active");
      });
    });
  }

  /* ─────────────── 3. SCROLL REVEAL ───────────────
     Elemen .fade-in-up muncul saat masuk viewport (sekali saja). */
  function initScrollReveal() {
    const elements = document.querySelectorAll(".fade-in-up");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // animasi cuma sekali
          }
        });
      },
      { root: null, threshold: 0.15, rootMargin: "0px" },
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ─────────────── 4. PARTICLES ───────────────
     Background titik-titik ungu di hero.
     Sama dgn situs utama, BEDA SATU HAL: ukuran canvas ikut
     ELEMEN (clientWidth/Height), bukan window — karena hero di
     sini pendek (bukan 100vh), kalau pakai innerHeight gambarnya
     bakal gepeng (lingkaran jadi elips). */
  function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // 1–3 px
        this.speedX = Math.random() * 0.5 - 0.25; // gerak pelan
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = "rgba(124, 58, 237, 0.3)"; // ungu transparan
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // wrap: keluar sisi → muncul di sisi sebaliknya
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function spawnParticles() {
      particlesArray = [];
      const total = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < total; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particlesArray) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animate);
    }

    function sizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    sizeCanvas();
    spawnParticles();

    window.addEventListener("resize", () => {
      sizeCanvas();
      spawnParticles();
    });

    // user mematikan animasi → gambar frame statis saja
    if (REDUCED_MOTION) {
      particlesArray.forEach((p) => p.draw());
      return;
    }
    animate();
  }

  /* ─────────────── RENDER KARTU ───────────────
     Bangun semua .cert-card dari array CERTS (certs-data.js).
     WAJIB jalan PALING AWAL, karena stats/filter/lightbox/
     scroll-reveal semuanya membaca DOM hasil render ini.
     Badge & tombol [ Verify ] otomatis mengikuti data:
     tipe "webinar" → badge cyan • tanpa verify → tanpa tombol. */
  function renderCards() {
    const grid = document.getElementById("certsGrid");

    // data file gak ke-load / kosong → tampilin pesan, jangan error
    if (typeof CERTS === "undefined" || !CERTS.length) {
      grid.innerHTML =
        '<p class="empty-note mono">[ data sertifikat kosong / certs-data.js gak ke-load ]</p>';
      return;
    }

    grid.innerHTML = CERTS.map((c) => {
      const badge = "cert-badge" + (c.type === "webinar" ? " is-webinar" : "");
      const verifyBtn = c.verify
        ? `<a href="${c.verify}" target="_blank" class="project-link">[ Verify ]</a>`
        : "";
      return `
        <div class="cert-card fade-in-up" data-issuer="${c.issuer}" data-type="${c.type}">
          <span class="${badge}">[ ${c.type.toUpperCase()} ]</span>
          <div class="cert-icon"><i class="ph ${c.icon}"></i></div>
          <span class="cert-issuer">[ ${ISSUER_LABELS[c.issuer] || c.issuer} ]</span>
          <h3 class="cert-title">${c.title}</h3>
          <p class="cert-desc">${c.desc}</p>
          <div class="cert-meta">
            <span class="mono"><i class="ph ph-calendar-blank"></i> ${c.date}</span>
            <span class="mono"><i class="ph ph-hash"></i> ID: ${c.certId}</span>
          </div>
          <div class="cert-links">
            <a href="${c.view}" class="project-link cert-view">[ View ]</a>
            ${verifyBtn}
          </div>
        </div>`;
    }).join("");
  }

  /* ─────────────── 5. STATISTIK ───────────────
     Angka di hero dihitung dari DOM → gak perlu update manual
     setiap nambah sertifikat:
     - statTotal   = jumlah semua .cert-card
     - statIssuers = jumlah data-issuer unik */
  function initStats() {
    const cards = document.querySelectorAll("#certsGrid .cert-card");
    document.getElementById("statTotal").textContent = cards.length;

    const issuers = new Set(
      [...cards].map((c) => c.dataset.issuer).filter(Boolean),
    );
    document.getElementById("statIssuers").textContent = issuers.size;
  }

  /* ─────────────── 6. FILTER (TIPE + ISSUER) ───────────────
     Dua kelompok tombol yang dikombinasikan (logika AND):
       [ Semua ] [ Course ] [ Webinar ] [ ITBox ] [ HackerRoom ] ...
     - [ Semua ]  → reset KEDUA kelompok
     - Tipe       → dari data-type  ("course" / "webinar")
     - Issuer     → dari data-issuer (slug provider)
     Kartu tampil hanya kalau lolos KEDUANYA.
     Bonus: klik tombol yang sedang aktif sekali lagi → kelompok
     itu kembali ke "semua" (toggle-off, tanpa perlu [ Semua ]). */
  function initFilter() {
    const grid = document.getElementById("certsGrid");
    const wrap = document.getElementById("certFilters");
    const empty = document.getElementById("certEmpty");
    const cards = [...grid.querySelectorAll(".cert-card")];

    // state dua dimensi — "all" = tanpa filter utk dimensi itu
    let activeType = "all";
    let activeIssuer = "all";

    // nilai unik, urut sesuai kemunculan pertama di HTML
    const types = [
      ...new Set(cards.map((c) => c.dataset.type).filter(Boolean)),
    ];
    const issuers = [
      ...new Set(cards.map((c) => c.dataset.issuer).filter(Boolean)),
    ];

    // tampilkan/sembunyikan kartu → harus lolos KEDUA filter
    function apply() {
      let shown = 0;
      cards.forEach((card) => {
        const okType = activeType === "all" || card.dataset.type === activeType;
        const okIssuer =
          activeIssuer === "all" || card.dataset.issuer === activeIssuer;
        const show = okType && okIssuer;
        card.classList.toggle("is-hidden", !show);
        if (show) shown++;
      });
      empty.hidden = shown > 0; // pesan kosong kalau kombinasi gak ada
    }

    // [ Semua ] nyala hanya kalau KEDUA filter posisinya "all"
    function syncAllBtn() {
      allBtn.classList.toggle(
        "active",
        activeType === "all" && activeIssuer === "all",
      );
    }

    // tombol [ Semua ] — reset total
    const allBtn = document.createElement("button");
    allBtn.className = "filter-btn mono";
    allBtn.textContent = "[ Semua ]";
    allBtn.classList.add("active"); // posisi awal
    allBtn.addEventListener("click", () => {
      activeType = "all";
      activeIssuer = "all";
      wrap
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      allBtn.classList.add("active");
      apply();
    });
    wrap.appendChild(allBtn);

    /**
     * Bikin satu tombol filter.
     * @param {string} label - teks tombol
     * @param {string} value - nilai filter (data-type / data-issuer)
     * @param {"type"|"issuer"} group - kelompok tombolnya
     */
    function makeBtn(label, value, group) {
      const btn = document.createElement("button");
      btn.className = "filter-btn mono" + (group === "type" ? " is-type" : "");
      btn.textContent = "[ " + label + " ]";
      btn.dataset.group = group;
      btn.addEventListener("click", () => {
        const wasActive = btn.classList.contains("active");

        // toggle-off: klik tombol aktif lagi → grup itu kembali "all"
        if (group === "type") activeType = wasActive ? "all" : value;
        else activeIssuer = wasActive ? "all" : value;

        // pindahkan tanda active dalam grup yg sama
        // (atau lepas semua kalau toggle-off)
        wrap
          .querySelectorAll(`.filter-btn[data-group="${group}"]`)
          .forEach((b) =>
            b.classList.toggle("active", !wasActive && b === btn),
          );

        syncAllBtn();
        apply();
      });
      return btn;
    }

    // kelompok 1: tipe — [ Course ] [ Webinar ]
    types.forEach((t) =>
      wrap.appendChild(makeBtn(TYPE_LABELS[t] || t, t, "type")),
    );

    // kelompok 2: issuer — [ ITBox ] [ HackerRoom ] ...
    issuers.forEach((i) =>
      wrap.appendChild(makeBtn(ISSUER_LABELS[i] || i, i, "issuer")),
    );
  }

  /* ─────────────── 7. LIGHTBOX SERTIFIKAT ───────────────
     Klik [ View ] → tampil full-screen.
     - File gambar (.webp/.png/...) → <img>, klik gambar = zoom in/out
     - File .pdf ATAU .html → dirender via <iframe>
       (.html = halaman detail per sertifikat di assets/certs-site/)
     - Tutup: tombol [X], klik area gelap, atau tekan Esc
     Link tetap punya href → kalau JS mati, file tetap bisa
     dibuka di tab baru (graceful degradation). */
  function initLightbox() {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `
      <button class="lightbox-close" aria-label="Tutup">[ X ]</button>
      <div class="lightbox-content"></div>
      <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lb);

    const content = lb.querySelector(".lightbox-content");
    const caption = lb.querySelector(".lightbox-caption");
    const closeBtn = lb.querySelector(".lightbox-close");

    function open(src, title) {
      content.innerHTML = "";
      lb.classList.remove("zoomed");

      // dokumen (PDF / halaman detail) → iframe • selain itu → gambar
      const isDoc = /\.(pdf|html?)$/i.test(src);

      if (isDoc) {
        const frame = document.createElement("iframe");
        frame.className = "lightbox-iframe";
        frame.src = src;
        frame.title = title;
        content.appendChild(frame);
      } else {
        const img = document.createElement("img");
        img.className = "lightbox-img";
        img.alt = title;
        img.addEventListener("click", () => lb.classList.toggle("zoomed"));
        img.addEventListener("error", () => {
          content.innerHTML =
            '<span class="lightbox-error">[ gagal memuat — cek nama file & lokasinya ]</span>';
        });
        img.src = src; // set SETELAH listener error terpasang
        content.appendChild(img);
      }

      caption.textContent = isDoc
        ? "> " + title + " • [ X ] / Esc utk tutup"
        : "> " + title + " — klik gambar utk zoom • Esc utk tutup";

      lb.classList.add("open");
      document.body.style.overflow = "hidden"; // kunci scroll background
    }

    function close() {
      lb.classList.remove("open", "zoomed");
      document.body.style.overflow = "";
      content.innerHTML = ""; // bersihkan biar gak berat
    }

    // semua link .cert-view → buka lightbox
    document.querySelectorAll(".cert-view").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const card = link.closest(".cert-card");
        const title =
          card?.querySelector(".cert-title")?.textContent || "Certificate";
        open(link.getAttribute("href"), title);
      });
    });

    // tiga cara menutup
    closeBtn.addEventListener("click", close);
    lb.addEventListener("click", (e) => {
      if (
        !e.target.closest(".lightbox-content") &&
        !e.target.closest(".lightbox-close")
      )
        close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb.classList.contains("open")) close();
    });
  }

  /* ─────────────── 8. INISIALISASI ───────────────
     Nyalakan semua fitur. Urutan bebas — semua function
     saling independen. Mau matikan sementara satu fitur?
     Komentarin satu barisnya. */
  renderCards();
  initTypewriter();
  initHamburger();
  initScrollReveal();
  initParticles();
  initStats();
  initFilter();
  initLightbox();
})();