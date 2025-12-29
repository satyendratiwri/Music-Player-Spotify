const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const progressBar = document.querySelector(".progress-bar");
const currTime = document.querySelector(".curr-time");
const totTime = document.querySelector(".tot-time");

const cards = document.querySelectorAll(".card");

let songs = [
    "songs/song1.mp3",
    "songs/song2.mp3",
    "songs/song3.mp3"
];

let songIndex = 0;
let audio = new Audio(songs[songIndex]);
let isPlaying = false;

// -------- PLAY FROM CARD --------
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        songIndex = index;
        playSong();
    });
});

// -------- PLAY SONG --------
function playSong() {
    audio.src = songs[songIndex];
    audio.play();
    isPlaying = true;
}

// -------- PLAY / PAUSE --------
playBtn.addEventListener("click", () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
});

// -------- NEXT --------
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
});

// -------- PREVIOUS --------
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
});

// -------- TIME UPDATE --------
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    currTime.textContent = formatTime(audio.currentTime);
    totTime.textContent = formatTime(audio.duration);
});

// -------- SEEK --------
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// -------- AUTO NEXT --------
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// -------- FORMAT TIME --------
function formatTime(time) {
    if (isNaN(time)) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
