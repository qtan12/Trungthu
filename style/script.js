// Tạo hiệu ứng bầu trời đêm với các ngôi sao
// Số lượng sao phụ thuộc vào kích thước màn hình (mobile: 80 sao, desktop: 200 sao)
const starCount = window.innerWidth < 600 ? 80 : 200;
for (let i = 0; i < starCount; i++) {
    let star = document.createElement("div");
    star.className = "star";
    // Vị trí ngẫu nhiên: 0-100% chiều cao và chiều rộng màn hình
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    // Tốc độ nhấp nháy ngẫu nhiên: 1-3 giây
    star.style.animationDuration = (1 + Math.random() * 2) + "s";
    // Độ trong suốt ngẫu nhiên để tạo sự đa dạng
    star.style.opacity = Math.random();
    document.body.appendChild(star);
}

// Mảng chứa đường dẫn hình ảnh lồng đèn để chọn ngẫu nhiên
const lanternImages = [];
for (let i = 1; i <= 9; i++) lanternImages.push(`./style/img/lantern/ld (${i}).png`);

// Mảng chứa các tin nhắn lãng mạn với hình ảnh tương ứng
// Mỗi tin nhắn có text và img để hiển thị trong popup
const messages = [
    { text: "Chúc em Trung Thu vui vẻ!", img: "https://i.pinimg.com/originals/81/66/c3/8166c341a2030a2a0d28a5a6e1bf961b.gif" },
    { text: "Trăng rằm sáng nhất đêm nay, nhưng vẫn không bằng nụ cười của em!", img: "https://i.pinimg.com/originals/33/76/db/3376dbdfc1b6e8b71a2ea7353e4fc0f2.gif" },
    { text: "Trung Thu mà em không ở đây thì coi như… trăng bị mây che mất 🏮", img: "./style/img/anh 1.jpg" }, 
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
    { text: "Trung thu có muốn đi chơi cùng anh hông nè", img: "https://i.pinimg.com/originals/3a/fc/12/3afc12d6744a68594d29eb565c62244c.gif" },
    { text: "Ăn bánh Trung Thu dễ ngán, yêu em thì… nghiện luôn ✨", img: "./style/img/anh 14.jpg" },
    { text: "Bánh Trung Thu thì nhiều vị, nhưng vị ngọt nhất là tình mình 🌟", img: "./style/img/anh 15.jpg" },
];

// Lấy container cho lồng đèn và thiết lập số lượng tối đa dựa trên kích thước màn hình
const lanternsContainer = document.getElementById("lanternsContainer");
let maxLanterns = window.innerWidth < 600 ? 15 : 30;
let lanternInterval = null;

// Tối ưu hóa việc chọn tin nhắn ngẫu nhiên để tránh trùng lặp
let shuffledMessages = [];
let messageIndex = 0;

// Thuật toán Fisher-Yates shuffle để xáo trộn thứ tự tin nhắn
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Lấy tin nhắn tiếp theo theo thứ tự đã xáo trộn, reset khi đã dùng hết
function getNextMessage() {
    if (shuffledMessages.length === 0 || messageIndex >= shuffledMessages.length) {
        shuffledMessages = shuffleArray(messages);
        messageIndex = 0;
    }
    return shuffledMessages[messageIndex++];
}

// Tạo và animate một chiếc lồng đèn bay
function createLantern() {
    // Giới hạn số lượng lồng đèn để tránh vấn đề hiệu suất
    if (lanternsContainer.querySelectorAll(".lantern").length >= maxLanterns) return;

    // Tạo element hình ảnh lồng đèn
    let lantern = document.createElement("img");
    lantern.src = lanternImages[Math.floor(Math.random() * lanternImages.length)];
    lantern.className = "lantern";

    // Thiết lập vị trí bắt đầu (0-85% để tránh tràn màn hình)
    let startX = Math.random() * 85; // 0% -> 85%
    lantern.style.left = startX + "vw";

    // Độ lệch ngang ngẫu nhiên trong quá trình bay (±25vw)
    let driftX = (Math.random() - 0.5) * 50; // ±25vw
    lantern.style.setProperty('--x', driftX + 'vw');

    // Thời gian bay ngẫu nhiên (10-20 giây)
    let duration = 10 + Math.random() * 10;
    lantern.style.animationDuration = duration + "s";

    // Thêm sự kiện click để hiển thị tin nhắn lãng mạn
    lantern.addEventListener("click", () => {
        let randomMsg = getNextMessage();
        document.getElementById("popupText").innerText = randomMsg.text;
        document.getElementById("popupImg").src = randomMsg.img;
        document.getElementById("popup").classList.add("show");
        document.getElementById("overlay").classList.add("show");
    });

    // Thêm lồng đèn vào container và xóa khi animation kết thúc
    lanternsContainer.appendChild(lantern);
    lantern.addEventListener("animationend", () => lantern.remove());
}

// Xử lý sự kiện click nút thả lồng đèn để bắt đầu animation
const song = document.getElementById("bgMusic");
document.getElementById("releaseBtn").addEventListener("click", () => {
    if (!lanternInterval) {
        // Bắt đầu nhạc từ thời điểm cụ thể (57 giây)
        song.currentTime = 57;
        song.play();
        
        // Tạo lồng đèn mỗi 1.2 giây (1-2 lồng đèn mỗi lần)
        lanternInterval = setInterval(() => {
            let count = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < count; i++) createLantern();
        }, 1200);
        
        // Ẩn nút thả sau khi bắt đầu
        document.getElementById("releaseBtn").style.display = "none";
    }
});

// Đóng popup khi click overlay hoặc nút đóng
function closePopup() {
    document.getElementById("popup").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
}
// Thêm sự kiện click vào overlay để đóng popup
document.getElementById("overlay").addEventListener("click", closePopup);