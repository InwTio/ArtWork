const palettes = [
  ["#fa4279", "#ffbe4a", "#5122aa"],
  ["#ff3b26", "#f2d900", "#157e92"],
  ["#66d9ed", "#ffd6a8", "#6473cf"],
  ["#e83225", "#211d31", "#f5b833"],
  ["#d8ded7", "#f0a431", "#68717b"],
  ["#443fe0", "#47bfe2", "#e2a3ff"],
  ["#f23d8a", "#28cdd1", "#8744df"],
  ["#80d5e3", "#fac5d8", "#7197ce"],
];

const artworks = [
  { id: "art-1", title: "ทดลอง ทดลอง ทดลอง", artist: "กระจุย กระจุย", rating: "5.0", likes: 777, available: true, description: "ผลงานภาพประกอบสีสันสดใส วาดด้วยความตั้งใจและเต็มไปด้วยรายละเอียด", tags: ["fantasy", "cute", "anime"], palette: 0 },
  { id: "art-2", title: "วันที่สดใสของเธอ", artist: "momo studio", rating: "5.0", likes: 521, available: true, description: "ตัวละคร original ในบรรยากาศสดใส ขอบคุณที่แวะมาชมผลงานนะคะ", tags: ["character", "colorful"], palette: 1 },
  { id: "art-3", title: "บันทึกของวันวาน", artist: "nana", rating: "5.0", likes: 438, available: false, description: "ภาพประกอบเล่าเรื่องราวในวันที่เงียบสงบและแสงแดดอ่อน ๆ", tags: ["illustration", "soft"], palette: 2 },
  { id: "art-4", title: "คืนสีชาด", artist: "kuro", rating: "5.0", likes: 690, available: true, description: "งานทดลองใช้สีแดงและสีดำ สร้างบรรยากาศแฟนตาซีแบบเข้มข้น", tags: ["dark", "fantasy"], palette: 3 },
  { id: "art-5", title: "เพื่อนตัวจิ๋ว", artist: "pim.pim", rating: "5.0", likes: 206, available: true, description: "คาแรกเตอร์น่ารัก ๆ กับเหล่าเพื่อนตัวจิ๋วของพวกเขา", tags: ["cute", "character"], palette: 4 },
  { id: "art-6", title: "สวนดอกไม้ในฝัน", artist: "blue hour", rating: "5.0", likes: 843, available: false, description: "ชวนมองสวนดอกไม้ในโลกแห่งความฝัน ที่มีสีสันและแสงระยิบระยับ", tags: ["dream", "nature"], palette: 5 },
  { id: "art-7", title: "ปาร์ตี้ของเหล่าคาแรกเตอร์", artist: "sora", rating: "5.0", likes: 390, available: true, description: "ภาพรวมตัวละครที่ชอบไว้ในเฟรมเดียว เต็มไปด้วยสีสันและพลังงาน", tags: ["anime", "group"], palette: 6 },
  { id: "art-8", title: "ฤดูร้อนริมทะเล", artist: "lily", rating: "5.0", likes: 612, available: true, description: "ภาพประกอบบรรยากาศฤดูร้อนใต้ท้องฟ้าสีฟ้า", tags: ["summer", "original"], palette: 7 },
];

const profile = {
  artist: "pre myWeb",
  handle: "@premyweb",
  greeting: "สวัสดี",
  signoff: "ครับ",
  rating: "3.9",
  clients: 33,
  repeatClients: 13,
  bio: "สวัสดีครับ ผมเป็นนักวาดภาพประกอบที่ชอบสร้างสรรค์ตัวละครและโลกแฟนตาซี ยินดีรับวาดภาพตามไอเดียของคุณครับ",
};
const profileArtworks = [
  { ...artworks[6], id: "profile-art-1", title: "Colorful character", artist: profile.artist, likes: 390, palette: 6 },
  { ...artworks[5], id: "profile-art-2", title: "Garden of dreams", artist: profile.artist, likes: 843, palette: 5 },
  { ...artworks[3], id: "profile-art-3", title: "The red night", artist: profile.artist, likes: 690, palette: 3 },
  { ...artworks[0], id: "profile-art-4", title: "Crimson story", artist: profile.artist, likes: 777, palette: 0 },
  { ...artworks[2], id: "profile-art-5", title: "Quiet afternoon", artist: profile.artist, likes: 438, palette: 2 },
  { ...artworks[7], id: "profile-art-6", title: "Summer by the sea", artist: profile.artist, likes: 612, palette: 7 },
];
const pages = {
  explore: document.querySelector("#explore-page"),
  commissions: document.querySelector("#commissions-page"),
  profile: document.querySelector("#profile-page"),
  upload: document.querySelector("#upload-page"),
  detail: document.querySelector("#detail-page"),
};
const artGrid = document.querySelector("#art-grid");
const commissionGrid = document.querySelector("#commission-grid");
const toast = document.querySelector("#toast");
let currentArtwork = null;
let currentPageName = "explore";
let previousPageName = "explore";
let profileReturnPage = "explore";
let selectedProfileArtist = profile.artist;
let profileSortMode = "latest";
let toastTimer;
let previewData = null;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function artworkImage(paletteIndex) {
  const colors = palettes[paletteIndex % palettes.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 460">
    <defs>
      <linearGradient id="bg" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset=".52" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[2]}"/></linearGradient>
      <linearGradient id="hair" x2=".8" y2="1"><stop stop-color="#171727"/><stop offset=".55" stop-color="#34334b"/><stop offset="1" stop-color="${colors[2]}"/></linearGradient>
      <linearGradient id="shirt" x2="1" y2="1"><stop stop-color="${colors[2]}"/><stop offset="1" stop-color="#f5d8e9"/></linearGradient>
    </defs>
    <path fill="url(#bg)" d="M0 0h400v460H0z"/>
    <path fill="#fff" opacity=".15" d="m-30 290 180-320 60 20L20 340zm260 210L390 130l35 42-158 344z"/>
    <g fill="#fff" opacity=".72">
      <path d="m50 78 5 13 13 5-13 5-5 13-5-13-13-5 13-5zm275 38 4 10 10 4-10 4-4 10-4-10-10-4 10-4zm-238 215 4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/>
      <circle cx="335" cy="280" r="5"/><circle cx="75" cy="196" r="4"/><circle cx="301" cy="59" r="3"/>
    </g>
    <path fill="#211d2a" d="M47 460q4-112 67-145 24-14 84-14t87 25q57 39 67 134z"/>
    <path fill="url(#shirt)" d="m105 460 31-116 65 39 65-39 29 116z"/>
    <path fill="#f0c5b8" d="M163 280h74v75q-10 26-38 26t-36-26z"/>
    <ellipse cx="200" cy="204" rx="91" ry="111" fill="#f5d1c6"/>
    <path fill="url(#hair)" d="M105 221q-33-158 94-169 104-2 100 131l-12 113-36-74-8-66q-49 29-116-7l-4 95-32 52z"/>
    <path fill="#211d2a" d="M114 174q-15-115 82-122-48 28-39 66 35-49 97-45 23 2 47 16-6-51-52-69 88 13 83 119-26-45-73-55-66 26-123-5 4 45-22 95z"/>
    <path fill="#fff" d="M127 224q30-27 58 0-28 28-58 0m91 0q28-27 57 0-28 28-57 0"/>
    <ellipse cx="157" cy="224" rx="9" ry="13" fill="#49a6d2"/><ellipse cx="246" cy="224" rx="9" ry="13" fill="#d64d7b"/>
    <circle cx="158" cy="225" r="4" fill="#201d27"/><circle cx="247" cy="225" r="4" fill="#201d27"/>
    <path fill="none" stroke="#8a4c59" stroke-width="4" stroke-linecap="round" d="M181 276q19 11 38 0"/>
    <path fill="#f18a9c" opacity=".45" d="M119 257q24-17 44 1-24 13-44-1m91 1q22-18 47-1-25 14-47 1"/>
    <path fill="none" stroke="#f8edfa" stroke-width="4" opacity=".8" d="m44 388 60-20m186-230 59-17M42 113l32 15m226 217 43 24"/>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function renderCard(artwork) {
  const image = artwork.image || artworkImage(artwork.palette || 0);
  const status = artwork.available ? '<span class="available-label">รับคอมมิชชัน</span>' : "";
  return `<article class="art-card" tabindex="0" role="button" data-art-id="${escapeHTML(artwork.id)}" aria-label="ดูผลงาน ${escapeHTML(artwork.title)}">
    <img class="artwork-thumb" src="${image}" alt="ภาพประกอบ ${escapeHTML(artwork.title)}">
    <div class="art-card-copy">
      <div class="art-card-title">${escapeHTML(artwork.title)}</div>
      <div class="art-card-meta"><span class="art-card-artist">${escapeHTML(artwork.artist)}${status}</span><span class="rating"><span aria-hidden="true">☆</span>${escapeHTML(artwork.rating || "5.0")}</span></div>
    </div>
  </article>`;
}

function renderGallery() {
  artGrid.innerHTML = artworks.map(renderCard).join("");
  commissionGrid.innerHTML = artworks.filter((artwork) => artwork.available).map(renderCard).join("");
  renderProfileArtworks();
}

function renderProfileArtworks() {
  const artistArtworks = selectedProfileArtist === profile.artist
    ? profileArtworks
    : artworks.filter((artwork) => artwork.artist === selectedProfileArtist);
  const orderedArtworks = profileSortMode === "popular"
    ? [...artistArtworks].sort((first, second) => second.likes - first.likes)
    : artistArtworks;
  document.querySelector("#profile-art-grid").innerHTML = orderedArtworks.map(renderCard).join("");
  document.querySelector("#profile-work-count").textContent = artistArtworks.length.toLocaleString("th-TH");
  document.querySelector("#profile-client-count").textContent = selectedProfileArtist === profile.artist ? profile.clients.toLocaleString("th-TH") : "—";
  document.querySelector("#profile-repeat-count").textContent = selectedProfileArtist === profile.artist ? profile.repeatClients.toLocaleString("th-TH") : "—";
}

function profileCoverImage() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 420">
    <defs><linearGradient id="sea" x2="0" y2="1"><stop stop-color="#087b8b"/><stop offset=".52" stop-color="#07505c"/><stop offset="1" stop-color="#102b35"/></linearGradient><radialGradient id="light"><stop stop-color="#65dce2" stop-opacity=".62"/><stop offset="1" stop-color="#08b5c8" stop-opacity="0"/></radialGradient></defs>
    <path fill="url(#sea)" d="M0 0h1400v420H0z"/><ellipse cx="710" cy="20" rx="560" ry="370" fill="url(#light)"/>
    <g fill="none" stroke="#9af5ef" stroke-opacity=".17"><path d="M-50 340Q300 180 700 350t750-20M-20 380Q320 230 700 390t750-5"/><path d="M190 0q120 100 180 260m-75-250q120 90 180 210m690-210q-130 120-170 250"/></g>
    <g fill="#c8ffff" opacity=".78">
      <circle cx="290" cy="80" r="2"/><circle cx="325" cy="55" r="2"/><circle cx="370" cy="93" r="2"/><circle cx="420" cy="44" r="2"/><circle cx="460" cy="75" r="2"/><circle cx="510" cy="30" r="2"/><circle cx="550" cy="88" r="2"/><circle cx="600" cy="55" r="2"/><circle cx="650" cy="85" r="2"/><circle cx="700" cy="40" r="2"/><circle cx="750" cy="80" r="2"/><circle cx="800" cy="48" r="2"/><circle cx="850" cy="83" r="2"/><circle cx="900" cy="35" r="2"/><circle cx="950" cy="72" r="2"/><circle cx="1000" cy="52" r="2"/><circle cx="1050" cy="90" r="2"/>
    </g>
    <g transform="translate(700 28)">
      <path fill="#232a35" stroke="#bbcbd2" stroke-width="4" d="M0 8Q-65 57-100 106Q-230 78-330 151Q-245 195-181 248Q-145 297-92 319Q-53 284-23 241Q0 216 23 241Q53 284 92 319Q145 297 181 248Q245 195 330 151Q230 78 100 106Q65 57 0 8Z"/>
      <path fill="#303747" d="M0 20Q-46 82-65 127Q-150 109-269 150Q-188 179-143 228Q-111 274-89 293Q-47 248-18 208Q0 189 18 208Q47 248 89 293Q111 274 143 228Q188 179 269 150Q150 109 65 127Q46 82 0 20Z"/>
      <path fill="#283342" d="M0 315q-8 30-5 67 7 30 13 0l1-67z"/>
      <g fill="#d7fbff"><circle cx="-240" cy="148" r="3"/><circle cx="-214" cy="163" r="3"/><circle cx="-186" cy="143" r="3"/><circle cx="-156" cy="165" r="3"/><circle cx="-126" cy="145" r="3"/><circle cx="-95" cy="164" r="3"/><circle cx="-65" cy="139" r="3"/><circle cx="-38" cy="159" r="3"/><circle cx="38" cy="159" r="3"/><circle cx="65" cy="139" r="3"/><circle cx="95" cy="164" r="3"/><circle cx="126" cy="145" r="3"/><circle cx="156" cy="165" r="3"/><circle cx="186" cy="143" r="3"/><circle cx="214" cy="163" r="3"/><circle cx="240" cy="148" r="3"/><circle cx="-118" cy="205" r="3"/><circle cx="-91" cy="225" r="3"/><circle cx="-65" cy="195" r="3"/><circle cx="-43" cy="222" r="3"/><circle cx="43" cy="222" r="3"/><circle cx="65" cy="195" r="3"/><circle cx="91" cy="225" r="3"/><circle cx="118" cy="205" r="3"/></g>
    </g>
    <g transform="translate(1135 205) scale(.42)" fill="#132c37" stroke="#8ce2e5" stroke-width="5"><path d="M0 0Q-70 48-105 100Q-210 72-300 140Q-220 185-155 234Q-120 278-80 300Q-42 260-18 220Q0 200 18 220Q42 260 80 300Q120 278 155 234Q220 185 300 140Q210 72 105 100Q70 48 0 0Z"/></g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function initializeProfile() {
  document.querySelector("#profile-cover-image").src = profileCoverImage();
  const avatar = document.querySelector("#profile-avatar");
  avatar.src = artworkImage(0);
  updateProfileArtist(profile.artist);
  document.querySelector("#profile-bio").textContent = profile.bio;
  renderProfileArtworks();
}

function updateProfileArtist(artistName) {
  selectedProfileArtist = artistName;
  const knownArtist = artistName === profile.artist;
  const avatar = document.querySelector("#profile-avatar");
  avatar.alt = `รูปโปรไฟล์ของ ${artistName}`;
  document.querySelector("#profile-name").textContent = artistName;
  document.querySelector("#profile-handle").textContent = knownArtist ? profile.handle : `@${artistName.toLowerCase().replace(/\s+/g, "")}`;
  document.querySelector("#profile-greeting").textContent = profile.greeting;
  document.querySelector("#profile-signoff").textContent = profile.signoff;
  document.querySelector("#profile-rating").textContent = knownArtist ? profile.rating : "—";
  document.querySelector(".profile-rating").hidden = !knownArtist;
  document.querySelector(".availability-pill").hidden = !knownArtist;
  document.querySelector("#profile-bio").textContent = knownArtist
    ? profile.bio
    : `${artistName} แชร์ผลงานภาพประกอบและคาแรกเตอร์ไว้ในแกลเลอรีนี้`;
}

function showPage(pageName) {
  if (pageName === "detail") previousPageName = currentPageName;
  currentPageName = pageName;
  Object.entries(pages).forEach(([name, page]) => { page.hidden = name !== pageName; });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageName || ((pageName === "detail" || pageName === "upload") && link.dataset.page === "explore"));
  });
  if (pageName !== "detail") history.replaceState({ page: pageName }, "", `#${pageName}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function openArtwork(id) {
  const artwork = [...artworks, ...profileArtworks].find((item) => item.id === id);
  if (!artwork) return;
  currentArtwork = artwork;
  const image = artwork.image || artworkImage(artwork.palette || 0);
  document.querySelector("#detail-image").src = image;
  document.querySelector("#detail-image").alt = `ภาพประกอบ ${artwork.title}`;
  document.querySelector("#artist-name").textContent = artwork.artist;
  document.querySelector("#artist-profile-trigger").textContent = artwork.artist.trim().charAt(0).toUpperCase() || "A";
  document.querySelector("#detail-title").textContent = artwork.title;
  document.querySelector("#detail-description").textContent = artwork.description || "ผลงานจากศิลปิน";
  document.querySelector("#detail-tags").textContent = (artwork.tags || []).map((tag) => `#${tag}`).join("  ");
  document.querySelector("#detail-likes").textContent = artwork.likes.toLocaleString("th-TH");
  const likeButton = document.querySelector("#detail-like");
  likeButton.classList.toggle("liked", Boolean(artwork.liked));
  likeButton.setAttribute("aria-pressed", String(Boolean(artwork.liked)));
  likeButton.querySelector("span").textContent = artwork.liked ? "♥" : "♡";
  document.querySelector("#commission-cta").hidden = !artwork.available;
  showPage("detail");
  history.replaceState({ page: "detail", id }, "", `#artwork-${encodeURIComponent(id)}`);
}

const imageLightbox = document.querySelector("#image-lightbox");
document.querySelector("#detail-image-trigger").addEventListener("click", () => {
  const detailImage = document.querySelector("#detail-image");
  document.querySelector("#lightbox-image").src = detailImage.src;
  document.querySelector("#lightbox-image").alt = detailImage.alt;
  document.querySelector("#lightbox-caption").textContent = currentArtwork ? currentArtwork.title : "";
  imageLightbox.showModal();
});
imageLightbox.addEventListener("click", (event) => {
  if (event.target === imageLightbox) imageLightbox.close();
});

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});
document.querySelector("#detail-back").addEventListener("click", () => showPage(previousPageName));
document.querySelector("#artist-profile-trigger").addEventListener("click", () => {
  if (!currentArtwork) return;
  profileReturnPage = currentPageName;
  updateProfileArtist(currentArtwork.artist);
  profileSortMode = "latest";
  document.querySelector("#profile-sort").innerHTML = 'ล่าสุด <span aria-hidden="true">⌄</span>';
  document.querySelector("#works-tab").click();
  renderProfileArtworks();
  showPage("profile");
});
document.querySelector("#profile-back").addEventListener("click", () => {
  showPage(profileReturnPage);
  if (profileReturnPage === "detail" && currentArtwork) {
    history.replaceState({ page: "detail", id: currentArtwork.id }, "", `#artwork-${encodeURIComponent(currentArtwork.id)}`);
  }
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((filter) => filter.classList.toggle("selected", filter === button));
    const visibleArtworks = button.dataset.filter === "commission" ? artworks.filter((artwork) => artwork.available) : artworks;
    artGrid.innerHTML = visibleArtworks.map(renderCard).join("");
  });
});

document.querySelectorAll(".art-grid").forEach((grid) => {
  grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-art-id]");
    if (card) openArtwork(card.dataset.artId);
  });
  grid.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-art-id]")) {
      event.preventDefault();
      openArtwork(event.target.dataset.artId);
    }
  });
});

document.querySelector("#detail-like").addEventListener("click", () => {
  if (!currentArtwork) return;
  currentArtwork.liked = !currentArtwork.liked;
  currentArtwork.likes += currentArtwork.liked ? 1 : -1;
  openArtwork(currentArtwork.id);
});

const commissionDialog = document.querySelector("#commission-dialog");
function showCommissionDialog(artistName) {
  document.querySelector("#dialog-artist").textContent = `ติดต่อ ${artistName} เพื่อพูดคุยรายละเอียดผลงาน`;
  document.querySelector("#dialog-artist-name").textContent = artistName;
  commissionDialog.showModal();
}

document.querySelector("#commission-cta").addEventListener("click", () => {
  if (!currentArtwork) return;
  showCommissionDialog(currentArtwork.artist);
});
document.querySelector("#profile-contact").addEventListener("click", () => showCommissionDialog(selectedProfileArtist));
document.querySelector("#dialog-done").addEventListener("click", () => commissionDialog.close());
document.querySelector("#comment-prompt").addEventListener("click", () => showToast("ระบบสมาชิกกำลังพัฒนา"));

document.querySelectorAll("[data-profile-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const showWorks = tab.dataset.profileTab === "works";
    document.querySelector("#profile-works").hidden = !showWorks;
    document.querySelector("#profile-about").hidden = showWorks;
    document.querySelectorAll("[data-profile-tab]").forEach((profileTab) => {
      const selected = profileTab === tab;
      profileTab.classList.toggle("active", selected);
      profileTab.setAttribute("aria-selected", String(selected));
    });
  });
});

document.querySelector("#profile-sort").addEventListener("click", (event) => {
  profileSortMode = profileSortMode === "latest" ? "popular" : "latest";
  event.currentTarget.innerHTML = `${profileSortMode === "latest" ? "ล่าสุด" : "ยอดนิยม"} <span aria-hidden="true">⌄</span>`;
  renderProfileArtworks();
});

document.querySelector("#profile-share").addEventListener("click", async () => {
  const shareData = { title: `${profile.artist} — เส้น`, url: window.location.href.split("#")[0] + "#profile" };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(shareData.url);
    showToast("คัดลอกลิงก์โปรไฟล์แล้ว");
  } catch {
    showToast("ไม่สามารถแชร์ลิงก์ได้ในเบราว์เซอร์นี้");
  }
});

const fileInput = document.querySelector("#art-file");
const previewImage = document.querySelector("#preview-image");
const uploadPlaceholder = document.querySelector("#upload-placeholder");
document.querySelector("#upload-trigger").addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    showToast("รองรับเฉพาะไฟล์ PNG, JPEG หรือ WEBP");
    fileInput.value = "";
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast("ไฟล์มีขนาดเกิน 10 MB");
    fileInput.value = "";
    return;
  }
  const publishButton = document.querySelector(".publish-button");
  publishButton.disabled = true;
  document.querySelector("#upload-hint").textContent = "กำลังเตรียมภาพ...";
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    previewData = String(reader.result);
    previewImage.src = previewData;
    previewImage.hidden = false;
    uploadPlaceholder.hidden = true;
    document.querySelector("#upload-hint").textContent = file.name;
    publishButton.disabled = false;
  });
  reader.addEventListener("error", () => {
    previewData = null;
    fileInput.value = "";
    document.querySelector("#upload-hint").textContent = "เลือกภาพขนาดไม่เกิน 10 MB";
    publishButton.disabled = false;
    showToast("ไม่สามารถอ่านไฟล์ภาพนี้ได้");
  });
  reader.readAsDataURL(file);
});

document.querySelector("#post-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const file = fileInput.files && fileInput.files[0];
  if (!file || !previewData) {
    showToast("กรุณาเลือกภาพผลงานก่อนเผยแพร่");
    document.querySelector("#upload-trigger").focus();
    return;
  }
  const form = new FormData(event.currentTarget);
  const title = String(form.get("title") || "").trim();
  if (!title) {
    document.querySelector("#art-title").focus();
    showToast("กรุณาใส่ชื่อผลงาน");
    return;
  }
  const tags = String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean);
  artworks.unshift({
    id: `art-${Date.now()}`,
    title,
    artist: "คุณ",
    rating: "5.0",
    likes: 0,
    available: form.get("available") === "on",
    description: String(form.get("description") || "").trim(),
    tags,
    image: previewData,
  });
  renderGallery();
  event.currentTarget.reset();
  fileInput.value = "";
  previewData = null;
  previewImage.removeAttribute("src");
  previewImage.hidden = true;
  uploadPlaceholder.hidden = false;
  document.querySelector("#upload-hint").textContent = "เลือกภาพขนาดไม่เกิน 10 MB";
  document.querySelectorAll(".filter-button").forEach((filter) => filter.classList.toggle("selected", filter.dataset.filter === "all"));
  showPage("explore");
  showToast("เผยแพร่ผลงานแล้ว");
});

renderGallery();
initializeProfile();
const initialPage = window.location.hash.replace("#", "");
if (initialPage === "commissions" || initialPage === "upload" || initialPage === "profile") showPage(initialPage);
