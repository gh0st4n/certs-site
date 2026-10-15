/* ══════════════════════════════════════════════════════════════
   CERTS.GH0ST4N.MY.ID — DATA SERTIFIKAT
   ──────────────────────────────────────────────────────────────
   SATU-SATUNYA tempat nambah/menghapus sertifikat.
   index.html GAK PERLU disentuh — kartu dirender otomatis oleh
   script.js dari array di bawah (urutan tampil = urutan array).

   FIELD TIAP SERTIFIKAT:
   type    → "course" | "webinar"  (filter tipe + warna badge)
   issuer  → slug provider          (filter issuer; label rapi
                                     diatur di ISSUER_LABELS di script.js)
   icon    → class phosphor icon (https://phosphoricons.com)
   title   → judul kartu
   desc    → deskripsi singkat
   date    → tanggal di kartu
   certId  → ID sertifikat
   view    → halaman detail (assets/certs-site/...)
             ⚠ huruf besar/kecil WAJIB sama dgn nama file aslinya
             (GitHub Pages case-sensitive!)
   verify  → URL verifikasi issuer — OPSIONAL.
             Hapus barisnya kalau gak ada → tombol [ Verify ]
             otomatis hilang dari kartu itu.

   CARA NAMBAH SERTIFIKAT BARU:
   1. Buat halaman detail di assets/certs-site/<Provider>/
      (copy template file detail yang sudah ada)
   2. Duplikat satu objek { ... }, di bawah, isi fieldnya
   3. Save → selesai. Filter, statistik, badge: nambah sendiri.

    Beberapa icon yang relevan :
    ph-certificate    // sertifikat/scrol
    ph-medal          // medali
    ph-trophy         // piala
    ph-globe          // web/CTF
    ph-terminal       // CLI/exploit
    ph-network        // jaringan
    ph-crosshair      // red team/target
    ph-file-lock      // dokumen aman
    ph-presentation   // sharing session
   ══════════════════════════════════════════════════════════════ */

const CERTS = [
  {
    type: "course",
    issuer: "itbox",
    icon: "ph-lock-key",
    title: "Cyber Security Course Level Basic",
    desc: "Pengenalan ethical hacking, dasar jaringan untuk keamanan, dan teknik hacking web application.",
    date: "11 May 2025",
    certId: "13EF9F429-13F27454E-12D455369",
    view: "assets/certs-site/ITBox/ITBOX-Sec-Basic.html",
    verify:
      "https://itbox.id/certificate-verifier/13EF9F429-13F27454E-12D455369",
  },
  {
    type: "course",
    issuer: "itbox",
    icon: "ph-shield-check",
    title: "Cyber Security Course Level Intermediate",
    desc: "Pemrograman untuk security, web application security dan linux exploitation development - memahami alur serangan serta mitigasinya.",
    date: "23 August 2026",
    certId: "13EF9F429-13F17DB9E-12D455369",
    view: "assets/certs-site/ITBox/ITBOX-Sec-intermediate.html",
    verify:
      "https://itbox.id/certificate-verifier/13EF9F429-13F17DB9E-12D455369",
  },
  {
    type: "course",
    issuer: "itbox",
    icon: "ph-bug",
    title: "Cyber Security Course Level Advanced",
    desc: "Linux Return Oriented Programming (ROP) & Windows Exploit Development - jantungnya low-level security.",
    date: "5 October 2026",
    certId: "13EF9F429-13F18011D-12D455369",
    view: "assets/certs-site/ITBox/ITBox-Sec-Advanced.html",
    verify:
      "https://itbox.id/certificate-verifier/13EF9F429-13F18011D-12D455369",
  },
  {
    type: "webinar",
    issuer: "hackerroom",
    icon: "ph-broadcast",
    title: 'Webinar "The Trap Behind Every Click"',
    desc: "Partisipasi webinar cyber security - studi kasus peretasan: membongkar serangan social engineering modern hingga memperoleh akses shell.",
    date: "10 October 2026",
    certId: "HRI-WBNR-10_OKT-2026",
    view: "assets/certs-site/HackerRoom/Soceng-KakAmanda.html",
    // belum ada halaman verifikasi resmi → tanpa [ Verify ]
  },
  {
    type: "webinar",
    issuer: "merdeka-siber",
    icon: "ph-hammer",
    title: "Sharing Session: How to Build Offensive Security Tools",
    desc: "Certificate of Appreciation atas partisipasi sebagai peserta sharing session bagaimana membangun offensive security tools.",
    date: "11 October 2026",
    certId: "MS-WBNR1002-2026-078",
    view: "assets/certs-site/MerdekaSiber/Build-Tools.html",
    verify: "https://merdekasiber.com/certificate/MS-WBNR1002-2026-078",
  },
];
