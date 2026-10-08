const artGrid = document.querySelector("#art-grid");
const explorePage = document.querySelector("#explore-page");
const detailPage = document.querySelector("#detail-page");
const detailImage = document.querySelector("#detail-image");
const imageLightbox = document.querySelector("#image-lightbox");


const artworks = [
  { id: "art-1", title: "ทดลอง ทดลอง ทดลอง", artist: "กระจุย กระจุย", rating: "5.0", likes: 777, available: true, description: "ผลงานภาพประกอบสีสันสดใส วาดด้วยความตั้งใจและเต็มไปด้วยรายละเอียด", tags: ["fantasy", "cute", "anime"], image: "Arts/001.jpg" },
  { id: "art-2", title: "วันที่สดใสของเธอ", artist: "momo studio", rating: "5.0", likes: 521, available: true, description: "ตัวละคร original ในบรรยากาศสดใส ขอบคุณที่แวะมาชมผลงานนะคะ", tags: ["character", "colorful"], image: "Arts/002.jpg" },
  { id: "art-3", title: "บันทึกของวันวาน", artist: "nana", rating: "5.0", likes: 438, available: false, description: "ภาพประกอบเล่าเรื่องราวในวันที่เงียบสงบและแสงแดดอ่อน ๆ", tags: ["illustration", "soft"], image: "Arts/003.jpg" },
  { id: "art-4", title: "คืนสีชาด", artist: "kuro", rating: "5.0", likes: 690, available: true, description: "งานทดลองใช้สีแดงและสีดำ สร้างบรรยากาศแฟนตาซีแบบเข้มข้น", tags: ["dark", "fantasy"], image: "Arts/004.jpg" },
  { id: "art-5", title: "เพื่อนตัวจิ๋ว", artist: "pim.pim", rating: "5.0", likes: 206, available: true, description: "คาแรกเตอร์น่ารัก ๆ กับเหล่าเพื่อนตัวจิ๋วของพวกเขา", tags: ["cute", "character"], image: "Arts/005.jpg" },
  { id: "art-6", title: "สวนดอกไม้ในฝัน", artist: "blue hour", rating: "5.0", likes: 843, available: false, description: "ชวนมองสวนดอกไม้ในโลกแห่งความฝัน ที่มีสีสันและแสงระยิบระยับ", tags: ["dream", "nature"], image: "Arts/006.jpg" },
  { id: "art-7", title: "ปาร์ตี้ของเหล่าคาแรกเตอร์", artist: "sora", rating: "5.0", likes: 390, available: true, description: "ภาพรวมตัวละครที่ชอบไว้ในเฟรมเดียว เต็มไปด้วยสีสันและพลังงาน", tags: ["anime", "group"], image: "Arts/007.jpg" },
  { id: "art-8", title: "ฤดูร้อนริมทะเล", artist: "lily", rating: "5.0", likes: 612, available: true, description: "ภาพประกอบบรรยากาศฤดูร้อนใต้ท้องฟ้าสีฟ้า", tags: ["summer", "original"], image: "Arts/008.jpg" },
];

// ล้างรายการผลงานก่อนเพิ่มการ์ดที่ระบุไว้ด้านล่าง
function renderGallery() {
  artGrid.innerHTML = "";
}

// เพิ่มการ์ดผลงานหนึ่งรายการด้วย id
function addArtworks(id) {
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) {
    console.error(`Artwork not found: ${id}`);
    return;
  }

  const card = document.createElement("article");
  card.className = "art-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.dataset.artId = artwork.id;
  card.setAttribute("aria-label", `ดูผลงาน ${artwork.title}`);

  const image = document.createElement("img");
  image.className = "artwork-thumb";
  image.src = artwork.image;
  image.alt = `ภาพประกอบ ${artwork.title}`;

  const copy = document.createElement("div");
  copy.className = "art-card-copy";

  const title = document.createElement("div");
  title.className = "art-card-title";
  title.textContent = artwork.title;

  const meta = document.createElement("div");
  meta.className = "art-card-meta";

  const artist = document.createElement("span");
  artist.className = "art-card-artist";
  artist.textContent = artwork.artist;
  if (artwork.available) {
    const status = document.createElement("span");
    status.className = "available-label";
    status.textContent = "รับคอมมิชชัน";
    artist.append(status);
  }

  const rating = document.createElement("span");
  rating.className = "rating";
  rating.textContent = `☆${artwork.rating}`;

  meta.append(artist, rating);
  copy.append(title, meta);
  card.append(image, copy);
  artGrid.append(card);
}

// แสดงหน้าสำรวจและซ่อนหน้ารายละเอียดผลงาน
function showExplore() {
  explorePage.hidden = false;
  detailPage.hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ค้นหาผลงานและแสดงข้อมูลในหน้ารายละเอียด
function openArtwork(id) {
  // ค้นหาผลงานที่มี id ตรงกับการ์ดที่เลือก
  const artwork = artworks.find((item) => item.id === id);
  if (!artwork) return;

  detailImage.src = artwork.image;
  detailImage.alt = `ภาพประกอบ ${artwork.title}`;
  document.querySelector("#artist-name").textContent = artwork.artist;
  document.querySelector("#artist-profile-trigger").textContent = artwork.artist.trim().charAt(0).toUpperCase() || "A";
  document.querySelector("#detail-title").textContent = artwork.title;
  document.querySelector("#detail-description").textContent = artwork.description;
  // เติมเครื่องหมาย # ไว้หน้าแท็กแต่ละรายการ
  document.querySelector("#detail-tags").textContent = artwork.tags.map((tag) => `#${tag}`).join("  ");
  document.querySelector("#detail-likes").textContent = artwork.likes.toLocaleString("th-TH");
  document.querySelector("#commission-cta").hidden = !artwork.available;

  explorePage.hidden = true;
  detailPage.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// เปิดผลงานที่เลือกเมื่อคลิกการ์ด
artGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-art-id]");
  if (card) openArtwork(card.dataset.artId);
});

// เปิดการ์ดผลงานที่โฟกัสอยู่เมื่อกด Enter หรือ Space
artGrid.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-art-id]")) {
    event.preventDefault();
    openArtwork(event.target.dataset.artId);
  }
});

document.querySelector("#detail-back").addEventListener("click", showExplore);
// กลับไปหน้าสำรวจเมื่อกดลิงก์หน้าหลัก
document.querySelectorAll("[data-page]").forEach((button) => {
  // ป้องกันการเปลี่ยนหน้าแบบลิงก์และแสดงหน้าสำรวจแทน
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showExplore();
  });
});

// เปิดภาพผลงานในหน้าต่างแสดงภาพเต็มจอ
document.querySelector("#detail-image-trigger").addEventListener("click", () => {
  document.querySelector("#lightbox-image").src = detailImage.src;
  document.querySelector("#lightbox-image").alt = detailImage.alt;
  document.querySelector("#lightbox-caption").textContent = document.querySelector("#detail-title").textContent;
  imageLightbox.showModal();
});

// ปิดหน้าต่างแสดงภาพเมื่อคลิกพื้นที่ด้านนอก
imageLightbox.addEventListener("click", (event) => {
  if (event.target === imageLightbox) imageLightbox.close();
});

renderGallery();
addArtworks("art-1");
addArtworks("art-2");
addArtworks("art-3");
addArtworks("art-4");
addArtworks("art-5");
addArtworks("art-6");
addArtworks("art-7");
addArtworks("art-8");
showExplore();