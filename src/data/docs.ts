export const STATS = [
  { v: "18.041", l: "baris Kotlin", s: "46 berkas .kt" },
  { v: "6", l: "tab utama", s: "Dock adaptif per peran" },
  { v: "13", l: "rute tumpukan", s: "sealed interface Route" },
  { v: "50+", l: "endpoint API", s: "/api/mobile/v1" },
  { v: "77", l: "ikon Lucide", s: "digambar sebagai path" },
  { v: "37", l: "commit", s: "19–22 Nov 2026" },
];

export const STACK = [
  { n: "Kotlin", v: "2.1.0", d: "Bahasa utama + compiler plugin Compose & Serialization" },
  { n: "Android Gradle Plugin", v: "8.7.3", d: "compileSdk 35 · targetSdk 35 · minSdk 26 · JVM 17" },
  { n: "Compose BOM", v: "2024.12.01", d: "ui · ui-graphics · foundation · material3" },
  { n: "Activity Compose", v: "1.9.3", d: "setContent, BackHandler, enableEdgeToEdge" },
  { n: "Lifecycle Runtime KTX", v: "2.8.7", d: "Coroutine scope yang sadar lifecycle" },
  { n: "OkHttp", v: "4.12.0", d: "Klien HTTP + multipart untuk impor .docx" },
  { n: "kotlinx.serialization", v: "1.7.3", d: "JSON → DTO (@SerialName snake_case)" },
  { n: "security-crypto", v: "1.1.0-alpha06", d: "EncryptedSharedPreferences AES-256" },
];

export const NOT_USED = ["Navigation Compose", "ViewModel / Hilt", "Retrofit", "Coil / Glide", "Room", "Icon library Material"];

export const PACKAGES = [
  { p: "screens/", loc: 10956, c: "bg-brand-500", d: "16 berkas layar & sheet Compose (Splash, Login, Lib, Grup, Poin, Absensi, Akun)" },
  { p: "ui/", loc: 1838, c: "bg-brand-300", d: "Design system: Button, Badge, Chip, Field, Sheet, Dialog, Markdown, Skeleton, Batik" },
  { p: "net/", loc: 916, c: "bg-tide-600", d: "ApiClient (OkHttp), SessionStore terenkripsi, DTO inti" },
  { p: "lib/", loc: 693, c: "bg-leaf-600", d: "LibController, AiController, model Karsa Lib" },
  { p: "data/", loc: 636, c: "bg-butter-400", d: "Dokumen hukum bundel, helper tanggal & NIM" },
  { p: "groups/", loc: 524, c: "bg-plum-600", d: "GroupController, polling 12 dtk, model pesan" },
  { p: "components/", loc: 438, c: "bg-espresso", d: "Dock, Snackbar, Logo" },
  { p: "icons/", loc: 512, c: "bg-ink-2", d: "77 path Lucide + LucideIcon renderer" },
  { p: "points/", loc: 384, c: "bg-brand-600", d: "PointsController, idempotency key, model poin" },
  { p: "attendance/", loc: 325, c: "bg-plum-100", d: "AttendanceController & model absensi" },
  { p: "auth/", loc: 266, c: "bg-tide-100", d: "AuthController: PKCE, deep link, state sesi" },
  { p: "theme/", loc: 148, c: "bg-paper-3", d: "Colors, Typography, KarsaTheme" },
];

export const PHASES = [
  { id: "Splash", d: "Animasi + cek sesi", c: "bg-brand-500 text-white" },
  { id: "Onboarding", d: "3 halaman pengantar", c: "bg-tide-600 text-white" },
  { id: "Login", d: "Google via browser", c: "bg-leaf-600 text-white" },
  { id: "SessionError", d: "Server tak terjangkau", c: "bg-danger-500 text-white" },
  { id: "App", d: "Tabs + Stack + Dock", c: "bg-espresso text-white" },
];

export const TRANSITIONS = [
  ["Splash", "App", "SessionState.SignedIn dan splashDone → enterApp() + toast “Selamat datang, {nama}!”"],
  ["Splash", "Onboarding", "SignedOut dan splashDone"],
  ["Splash", "SessionError", "SessionState.Unavailable (jaringan/server)"],
  ["Onboarding", "Login", "Lewati atau Mulai sekarang"],
  ["SessionError", "Login", "Coba lagi → hasilnya SignedOut (error dibersihkan)"],
  ["SessionError", "App", "Coba lagi → SignedIn"],
  ["Login", "App", "Deep link karsa://auth/callback valid → tukar kode → /me → SignedIn"],
  ["App", "Login", "Keluar manual, atau sesi kedaluwarsa (“Sesi kamu sudah berakhir…”) → endSession() mereset semua controller"],
];

export const CAPABILITIES = [
  { k: "record_points", t: "Mencatat poin (PJ)", d: "Menjadikan pengguna Role.Pj: tab Input & Aktivitas, Riwayat, Absensi PJ" },
  { k: "view_report", t: "Melihat laporan", d: "Laporan poin pribadi dan kehadiran mahasiswa" },
  { k: "view_leaderboard", t: "Melihat peringkat", d: "Partisipasi teratas per mata kuliah" },
  { k: "view_karsa_lib", t: "Membaca Karsa Lib", d: "Tab Karsa Lib, artikel, profil penulis, Teman baca" },
  { k: "write_karsa_lib", t: "Menulis di Karsa Lib", d: "Editor, Tulisan saya, Impor .docx" },
] as const;

export type CapKey = (typeof CAPABILITIES)[number]["k"];

export const ROUTES_RULES: { route: string; rule: string; test: (c: Record<CapKey, boolean>, hasClass: boolean) => boolean }[] = [
  { route: "Article · AuthorProfile · Author", rule: "view_karsa_lib", test: (c) => c.view_karsa_lib },
  { route: "Editor · MyPosts · Import", rule: "write_karsa_lib", test: (c) => c.write_karsa_lib },
  { route: "Chat", rule: "memiliki kelas (kelas_id)", test: (_, k) => k },
  { route: "GroupReports", rule: "is_manager pada grup tersebut", test: (c) => c.record_points },
  { route: "History", rule: "record_points", test: (c) => c.record_points },
  { route: "Report", rule: "view_report atau record_points", test: (c) => c.view_report || c.record_points },
  { route: "Ranking", rule: "view_leaderboard atau record_points", test: (c) => c.view_leaderboard || c.record_points },
  { route: "Attendance", rule: "record_points", test: (c) => c.record_points },
  { route: "Legal", rule: "selalu", test: () => true },
];

export const PRESETS: { name: string; caps: Record<CapKey, boolean>; hasClass: boolean }[] = [
  {
    name: "PJ Kelas",
    hasClass: true,
    caps: { record_points: true, view_report: true, view_leaderboard: true, view_karsa_lib: true, write_karsa_lib: true },
  },
  {
    name: "Mahasiswa",
    hasClass: true,
    caps: { record_points: false, view_report: true, view_leaderboard: true, view_karsa_lib: true, write_karsa_lib: false },
  },
  {
    name: "Tanpa kelas",
    hasClass: false,
    caps: { record_points: false, view_report: false, view_leaderboard: false, view_karsa_lib: true, write_karsa_lib: false },
  },
  {
    name: "Mahasiswa + penulis",
    hasClass: true,
    caps: { record_points: false, view_report: true, view_leaderboard: true, view_karsa_lib: true, write_karsa_lib: true },
  },
];

export const COLORS = [
  { g: "Permukaan", items: [["Paper", "#FBF5EC"], ["Paper2", "#F5ECE0"], ["Paper3", "#EBDFCD"], ["Line", "#EBE0D1"]] },
  { g: "Tinta", items: [["Ink", "#26180F"], ["Ink2", "#5A483B"], ["Muted", "#8B7B6D"], ["Espresso", "#2A1A10"], ["Espresso2", "#3B261A"]] },
  {
    g: "Brand (jingga)",
    items: [["Brand50", "#FFF5EC"], ["Brand100", "#FFE6D0"], ["Brand200", "#FFCB9C"], ["Brand300", "#FFA762"], ["Brand400", "#F88A2E"], ["Brand500", "#E36B0F"], ["Brand600", "#C75A08"], ["Brand700", "#8F4208"], ["Brand800", "#5F2C06"]],
  },
  {
    g: "Pendukung",
    items: [["Butter100", "#FDF0C4"], ["Butter400", "#F7C948"], ["Butter700", "#7A5A00"], ["Leaf100", "#DCF2E4"], ["Leaf500", "#1F7A4D"], ["Leaf600", "#17623D"], ["Danger100", "#FBE2DF"], ["Danger500", "#C1352B"], ["Tide100", "#DCEBF4"], ["Tide600", "#2A6385"], ["Plum100", "#F1DCEB"], ["Plum600", "#7A3E6B"]],
  },
];

export type Endpoint = { m: string; p: string; d: string };
export const API_GROUPS: { g: string; items: Endpoint[] }[] = [
  {
    g: "Autentikasi & sesi",
    items: [
      { m: "GET", p: "/auth/start", d: "Dibuka di browser: state, code_challenge, redirect_uri=karsa://auth/callback" },
      { m: "POST", p: "/auth/exchange", d: "Tukar code + verifier + accepted_terms_version → access & refresh token" },
      { m: "POST", p: "/auth/refresh", d: "Perbarui token (single-flight dengan Mutex) saat 401" },
      { m: "POST", p: "/auth/logout", d: "Cabut sesi di server" },
      { m: "GET", p: "/me", d: "Profil + capabilities + kelas_id + lib_profile" },
    ],
  },
  {
    g: "Karsa Lib",
    items: [
      { m: "GET", p: "/lib/bootstrap", d: "Fakultas, prodi, kelas, can_write, profil, status permohonan terakhir" },
      { m: "POST", p: "/lib/profile", d: "Buat profil Karsa Lib (nama, fakultas, prodi, kelas)" },
      { m: "GET", p: "/lib/feed", d: "sort=latest|trending_7d|trending_30d, q=judul" },
      { m: "GET", p: "/lib/articles/{id}", d: "Detail artikel (mencatat 1 pembaca unik)" },
      { m: "GET", p: "/lib/articles/{id}/comments", d: "Utas komentar + balasan" },
      { m: "POST", p: "/lib/articles/{id}/comments", d: "Kirim komentar / balasan (parent_id)" },
      { m: "DELETE", p: "/lib/comments/{id}", d: "Hapus komentar sendiri" },
      { m: "GET", p: "/lib/vault", d: "Semua tulisan milik penulis (draf/terbit/arsip)" },
      { m: "POST", p: "/lib/articles", d: "Buat draf" },
      { m: "PATCH", p: "/lib/articles/{id}", d: "action: EDIT · PUBLISH · ARCHIVE · RESTORE (+ title/body)" },
      { m: "DELETE", p: "/lib/articles/{id}", d: "Hapus draf" },
      { m: "POST", p: "/lib/articles/import-docx", d: "Multipart .docx (maks 5 MB) → draf artikel" },
      { m: "GET", p: "/lib/authors/{id}", d: "Profil penulis + artikelnya" },
      { m: "POST", p: "/lib/author-requests", d: "Ajukan akses penulis (motivasi, topik, IG, TikTok)" },
      { m: "POST", p: "/lib/reports", d: "Laporkan artikel/komentar dengan alasan" },
      { m: "GET", p: "/lib/articles/{id}/ai", d: "State Teman baca: pesan, ringkasan, kuota (per revisi)" },
      { m: "POST", p: "/lib/articles/{id}/ai/summary", d: "Buat ringkasan" },
      { m: "POST", p: "/lib/articles/{id}/ai/messages", d: "Tanya materi (+ web_search opsional)" },
    ],
  },
  {
    g: "Grup kelas",
    items: [
      { m: "GET", p: "/groups", d: "Daftar grup + last_message + is_manager + is_locked" },
      { m: "GET", p: "/groups/{id}/messages", d: "Halaman pesan (cursor) + pinned_messages" },
      { m: "POST", p: "/groups/{id}/messages", d: "Kirim pesan / balasan (reply_to)" },
      { m: "PATCH", p: "/groups/{id}/messages/{mid}", d: "Edit pesan" },
      { m: "DELETE", p: "/groups/{id}/messages/{mid}", d: "Hapus pesan (diganti penanda)" },
      { m: "POST", p: "/groups/{id}/messages/{mid}/pin", d: "Sematkan / lepas sematan (PJ)" },
      { m: "POST", p: "/groups/{id}/messages/{mid}/hide", d: "Sembunyikan dengan alasan (PJ)" },
      { m: "POST", p: "/groups/{id}/messages/{mid}/reports", d: "Laporkan pesan" },
      { m: "PUT", p: "/groups/blocks/{userId}", d: "Blokir pengguna" },
      { m: "DELETE", p: "/groups/blocks/{userId}", d: "Buka blokir" },
      { m: "POST", p: "/groups/{id}/lock", d: "Kunci / buka grup (PJ)" },
      { m: "GET", p: "/groups/{id}/reports", d: "Antrean laporan grup (PJ)" },
      { m: "POST", p: "/groups/{id}/reports/{rid}/resolve", d: "action: DISMISS · HIDE" },
    ],
  },
  {
    g: "Poin & laporan",
    items: [
      { m: "GET", p: "/pj/assignments", d: "Penugasan mata kuliah PJ" },
      { m: "GET", p: "/pj/assignments/{id}/students", d: "Mahasiswa pada penugasan" },
      { m: "GET", p: "/point-categories", d: "Kategori poin" },
      { m: "POST", p: "/points", d: "Catat poin (header Idempotency-Key)" },
      { m: "GET", p: "/points", d: "Riwayat poin PJ" },
      { m: "DELETE", p: "/points/{id}", d: "Hapus entri (audit log)" },
      { m: "GET", p: "/report", d: "Laporan poin mahasiswa per mata kuliah" },
      { m: "GET", p: "/leaderboard/options", d: "Mata kuliah yang punya peringkat" },
      { m: "GET", p: "/leaderboard/{assignmentId}", d: "Baris peringkat + isCurrentUser" },
    ],
  },
  {
    g: "Absensi",
    items: [
      { m: "GET", p: "/attendance", d: "Ringkasan kehadiran mahasiswa + jatah alpha" },
      { m: "GET", p: "/attendance/assignments", d: "Matkul PJ + total catatan & alpha" },
      { m: "GET", p: "/attendance/assignments/{id}", d: "Roster mahasiswa + riwayat" },
      { m: "POST", p: "/attendance", d: "kelas_matkul_id, tanggal, status, student_ids[], catatan → warnings[]" },
      { m: "DELETE", p: "/attendance/{id}", d: "Hapus satu catatan" },
      { m: "POST", p: "/attendance/assignments/{id}/reset", d: "Reset semua catatan matkul" },
    ],
  },
];

export const SECURITY = [
  { t: "OAuth Google lewat browser + PKCE", d: "state acak 32 byte dan code_verifier 64 byte dibuat per login; hanya SHA-256 challenge yang dikirim. Kata sandi Google tak pernah menyentuh aplikasi.", i: "🔐" },
  { t: "Deep link tervalidasi", d: "Intent karsa://auth/callback hanya diproses bila state cocok dengan yang disimpan; launchMode=singleTask mencegah instans ganda.", i: "🔗" },
  { t: "Penyimpanan terenkripsi", d: "Token & nilai PKCE di EncryptedSharedPreferences (kunci AES256_SIV, nilai AES256_GCM, MasterKey AES256_GCM). Bila Keystore bermasalah: coba ulang, lalu jatuh ke memori saja.", i: "🗝️" },
  { t: "Refresh token single-flight", d: "Respons 401 memicu satu refresh di bawah Mutex lalu mengulang permintaan. Gagal → sessionExpired → “Sesi kamu sudah berakhir.”", i: "♻️" },
  { t: "Idempotency pada input poin", d: "Setiap payload (matkul|mahasiswa|kategori|poin|catatan) mendapat UUID; kirim ulang karena jaringan tidak menggandakan poin.", i: "🧾" },
  { t: "Privasi tampilan", d: "NIM peserta lain disamarkan (maskNim, NIM ••••1204); identitas pelapor tidak terlihat; allowBackup=false.", i: "🕶️" },
  { t: "Persetujuan versi dokumen", d: "LEGAL_VERSION 1.1 disimpan saat login dan dikirim ke server saat tukar kode — bukti persetujuan per versi.", i: "📜" },
  { t: "Izin minimum", d: "Hanya INTERNET dan ACCESS_NETWORK_STATE. Pemilih berkas memakai Storage Access Framework tanpa izin penyimpanan.", i: "🛡️" },
];

export const TIMELINE = [
  { d: "19 Nov", t: "Slice 1–5 · Fondasi", x: "Entry flow, Karsa Lib, grup & chat, input poin & aktivitas, akun & legal diport dari Flutter ke Compose dengan data demo." },
  { d: "20 Nov", t: "S1–S6 · API nyata", x: "Auth sesi nyata + capability gating, Karsa Lib terhubung API, Teman baca AI, grup & chat API, poin & aktivitas API, akun/legal final." },
  { d: "21 Nov", t: "Splash karusel", x: "Splash kartu penuh ala referensi: urutan diacak, transisi geser, progres shimmer." },
  { d: "22 Nov", t: "Polish & Absensi", x: "Pola batik truntum, blur latar dialog/sheet, dan fitur Absensi matkul (PR #92)." },
];

export type FileNode = { n: string; loc: number; d: string };
export const FILES: { dir: string; files: FileNode[] }[] = [
  {
    dir: "karsa/",
    files: [
      { n: "MainActivity.kt", loc: 28, d: "Edge-to-edge, meneruskan intent deep link ke KarsaAuth, setContent { KarsaTheme { KarsaApp() } }" },
      { n: "KarsaApp.kt", loc: 121, d: "Akar UI: blur overlay, status bar, BackHandler, memilih layar per Phase, Dock + Snackbar" },
      { n: "AppState.kt", loc: 256, d: "KarsaState: Phase, Tab, Route (sealed), tabsFor(), canOpen(), toast, go/back/replace" },
    ],
  },
  {
    dir: "screens/",
    files: [
      { n: "Splash.kt", loc: 824, d: "Karusel 5 kartu, DriftRings, PulseLogo, ShimmerProgress" },
      { n: "Onboarding.kt", loc: 517, d: "Pager 3 halaman + ilustrasi FloatingBox" },
      { n: "Login.kt", loc: 487, d: "LoginScreen, SessionErrorScreen, TermsCard, GoogleButton" },
      { n: "TabsScreen.kt", loc: 134, d: "TabsHost (tab tetap termuat), StackHost + PushIn, RouteScreen()" },
      { n: "LibScreens.kt", loc: 955, d: "LibHome, ArticleCard, ArticleScreen, CommentItem" },
      { n: "LibAiSheet.kt", loc: 827, d: "Sheet Teman baca: ringkasan, chat, kuota, web search" },
      { n: "LibWriteScreens.kt", loc: 1261, d: "Editor, MyPosts, Import .docx, Author (profil + permohonan)" },
      { n: "LibAuthorProfile.kt", loc: 186, d: "Profil publik penulis" },
      { n: "LibDialogs.kt", loc: 103, d: "Dialog laporan konten Karsa Lib" },
      { n: "GroupsScreen.kt", loc: 1367, d: "GroupList, ChatScreen, MessageRow, sheet aksi & dialog moderasi" },
      { n: "GroupReportsScreen.kt", loc: 224, d: "Antrean laporan grup untuk PJ" },
      { n: "InputScreen.kt", loc: 702, d: "Formulir input poin 3 langkah" },
      { n: "ActivityScreens.kt", loc: 1201, d: "ActivityHub, History, ReportView, RankingView, PoinkuScreen" },
      { n: "AttendanceScreens.kt", loc: 441, d: "Kehadiran mahasiswa: hero, kartu matkul, QuotaDots" },
      { n: "AttendancePjScreens.kt", loc: 1176, d: "Absensi PJ: daftar, detail roster/riwayat, sheet catat, reset" },
      { n: "AccountScreens.kt", loc: 551, d: "AccountScreen, LegalScreen, openEmail/openLegalWeb" },
    ],
  },
  {
    dir: "ui/ & components/",
    files: [
      { n: "ui/Common.kt", loc: 1062, d: "Button, IconButton, Avatar, Badge, PointBadge, Card, Chip, Segmented, Field, SearchField, Skeleton, BatikPattern, EmptyState, PageHeader, TopBar, Rise" },
      { n: "ui/Overlay.kt", loc: 513, d: "KarsaSheet, KarsaDialog, SelectField, PopMenu, OverlayBlurState (blur 16dp, API 31+)" },
      { n: "ui/Markdown.kt", loc: 238, d: "Parser & renderer Markdown (H1/H2, kutipan, daftar, kode, inline)" },
      { n: "ui/Load.kt", loc: 25, d: "LoadController untuk skeleton → konten" },
      { n: "components/Dock.kt", loc: 238, d: "Dock pil Espresso + tombol tengah melayang dengan glow" },
      { n: "components/Snackbar.kt", loc: 135, d: "Toast 3,8 dtk dengan aksi opsional" },
      { n: "components/Logo.kt", loc: 65, d: "LogoMark kawung & GoogleMark vektor" },
    ],
  },
  {
    dir: "Controller & model",
    files: [
      { n: "auth/AuthController.kt", loc: 266, d: "SessionState, signIn/PKCE, onIntent, refreshUser, signOut" },
      { n: "lib/LibController.kt", loc: 278, d: "Bootstrap, feed, vault, artikel, komentar, penulis" },
      { n: "lib/AiController.kt", loc: 175, d: "Ringkasan, tanya jawab, kuota, retry" },
      { n: "groups/GroupController.kt", loc: 303, d: "Rooms, chat state, refresh/loadOlder, moderasi" },
      { n: "points/PointsController.kt", loc: 266, d: "Form, riwayat, laporan, leaderboard, idempotency" },
      { n: "attendance/AttendanceController.kt", loc: 162, d: "Absensi mahasiswa & PJ" },
      { n: "net/ApiClient.kt", loc: 769, d: "52 fungsi suspend, refresh token, multipart, friendlyError" },
      { n: "net/SessionStore.kt", loc: 107, d: "EncryptedSharedPreferences + fallback memori" },
      { n: "data/KarsaData.kt", loc: 636, d: "Helper waktu/NIM + dokumen Syarat & Privasi v1.1" },
      { n: "icons/KarsaIcons.kt", loc: 459, d: "77 ikon Lucide sebagai daftar path SVG" },
      { n: "theme/*.kt", loc: 148, d: "Colors, Type (Bricolage Grotesque + Plus Jakarta Sans variabel), Theme" },
    ],
  },
];
