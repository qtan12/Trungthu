const starCount = window.innerWidth < 600 ? 80 : 200;
for (let i = 0; i < starCount; i++) {
    let star = document.createElement("div");
    star.className = "star";
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = (1 + Math.random() * 2) + "s";
    star.style.opacity = Math.random();
    document.body.appendChild(star);
}

const lanternImages = [];
for (let i = 1; i <= 9; i++) lanternImages.push(`./style/img/lantern/ld (${i}).png`);

const messages = [
    { text: "Chúc em Trung Thu vui vẻ!", img: "https://i.pinimg.com/originals/81/66/c3/8166c341a2030a2a0d28a5a6e1bf961b.gif" },
    { text: "Trăng rằm sáng nhất đêm nay, nhưng vẫn không bằng nụ cười của em!", img: "https://i.pinimg.com/originals/33/76/db/3376dbdfc1b6e8b71a2ea7353e4fc0f2.gif" },
    { text: "Trung Thu mà em không ở đây thì coi như… trăng bị mây che mất 🏮", img: "./style/img/anh 1.jpg" }, 
    { text: "Trung thu có muốn đi chơi cùng anh hông nè", img: "https://i.pinimg.com/originals/3a/fc/12/3afc12d6744a68594d29eb565c62244c.gif" },
    { text: "Em là món quà trung thu ý nghĩa nhất của anh 🏮", img: "./style/img/anh 2.jpg" }, 
    { text: "Trung Thu này, có em là đủ ngọt hơn mọi loại bánh 🍰", img: "./style/img/anh 3.jpg" }, 
    { text: "Trung Thu vui vẻ nha bé 💖🌙", img: "https://i.pinimg.com/originals/2f/82/bb/2f82bb5524663e046922d08a1cdb2ddd.gif" },
    { text: "Chị Hằng xinh đẹp ơi, có muốn cùng cuội đi chơi không nè", img: "./style/img/anh 4.jpg" }, 
    { text: "Anh sẽ là 'đèn hộ mệnh' dẫn em đi chơi nhé", img: "https://i.pinimg.com/originals/e8/9f/b9/e89fb9588567a3d1f89d881d9e6abcb9.gif" }, 
    { text: "Em chính là chiếc lồng đèn đặc biệt nhất của anh", img: "./style/img/anh 5.jpg" }, 
    { text: "Trung Thu này không cần nhiều, chỉ cần em thôi 😘", img: "./style/img/anh 6.jpg" }, 
    { text: "Người ta ngắm trăng rằm, còn anh chỉ muốn ngắm em thôi 🌙", img: "./style/img/anh 7.jpg" },
    { text: "Bánh Trung Thu thì có 4 miếng, nhưng anh chỉ muốn dành trọn cho em 🥮", img: "./style/img/anh 8.jpg" },
    { text: "Đêm nay trăng tròn, mà bụng anh cũng tròn… tại nhớ em quá nên ăn hết bánh Trung Thu. 💕", img: "./style/img/anh 9.jpg" },
    { text: "Mỗi mùa trăng tròn là thêm một mùa anh thương em nhiều hơn ✨", img: "./style/img/anh 10.jpg" },
    { text: "Trung Thu không quan trọng ở đâu, quan trọng là được ở bên em 🌟", img: "./style/img/anh 11.jpg" },
    { text: "Nếu có một điều ước trong đêm rằm, anh ước lúc nào cũng có em cạnh bên 🌙", img: "./style/img/anh 12.jpg" },
    { text: "Em chính là điều ước của anh dưới trăng 🥮", img: "./style/img/anh 13.jpg" },
    { text: "Em chính là lý do để mỗi mùa trăng tròn anh lại thấy hạnh phúc hơn 💕", img: "./style/img/anh 13.jpg" },
    { text: "Ăn bánh Trung Thu dễ ngán, yêu em thì… nghiện luôn ✨", img: "./style/img/anh 14.jpg" },
    { text: "Bánh Trung Thu thì nhiều vị, nhưng vị ngọt nhất là tình mình 🌟", img: "./style/img/anh 15.jpg" },
];

const lanternsContainer = document.getElementById("lanternsContainer");
let maxLanterns = window.innerWidth < 600 ? 15 : 30;
let lanternInterval = null;

function createLantern() {
    if (lanternsContainer.querySelectorAll(".lantern").length >= maxLanterns) return;

    let lantern = document.createElement("img");
    lantern.src = lanternImages[Math.floor(Math.random() * lanternImages.length)];
    lantern.className = "lantern";

    // Giới hạn lantern không tràn màn hình
    let startX = Math.random() * 85; // 0% -> 85%
    lantern.style.left = startX + "vw";

    // random horizontal drift
    let driftX = (Math.random() - 0.5) * 50; // ±25vw
    lantern.style.setProperty('--x', driftX + 'vw');

    let duration = 10 + Math.random() * 10;
    lantern.style.animationDuration = duration + "s";

    lantern.addEventListener("click", () => {
    let randomMsg = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById("popupText").innerText = randomMsg.text;
    document.getElementById("popupImg").src = randomMsg.img;
    document.getElementById("popup").classList.add("show");
    document.getElementById("overlay").classList.add("show");
    });

    lanternsContainer.appendChild(lantern);
    lantern.addEventListener("animationend", () => lantern.remove());
}

const song = document.getElementById("bgMusic");
document.getElementById("releaseBtn").addEventListener("click", () => {
    if (!lanternInterval) {
    song.currentTime = 57;
    song.play();
    lanternInterval = setInterval(() => {
        let count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) createLantern();
    }, 1200);
    document.getElementById("releaseBtn").style.display = "none";
    }
});

function closePopup() {
    document.getElementById("popup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}
document.getElementById("overlay").addEventListener("click", closePopup);