/* ===================================================
   DOĞUM GÜNÜ SİTESİ - JAVASCRIPT ETKİLEŞİMLERİ & YILAN OYUNU
   =================================================== */

// --- SES MOTORU (Web Audio API - Harici ses dosyası gerektirmez) ---
class SoundEffects {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
    }

    playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.warn("Audio play error", e);
        }
    }

    // Yemek yeme sesi (Retro Tatlı Melodi)
    eat() {
        if (!this.enabled) return;
        this.playTone(523.25, 'triangle', 0.1, 0.15); // C5
        setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.15), 60); // E5
        setTimeout(() => this.playTone(783.99, 'triangle', 0.2, 0.15), 120); // G5
    }

    // Yandın / Çarpma sesi
    lose() {
        if (!this.enabled) return;
        this.playTone(220, 'sawtooth', 0.2, 0.12);
        setTimeout(() => this.playTone(164.81, 'sawtooth', 0.35, 0.15), 120);
    }

    // Mum üfleme sesi
    blow() {
        if (!this.enabled) return;
        this.playTone(300, 'sine', 0.4, 0.08);
    }

    // Konfeti patlama sesi
    pop() {
        if (!this.enabled) return;
        this.playTone(440, 'triangle', 0.12, 0.15);
        setTimeout(() => this.playTone(880, 'sine', 0.25, 0.2), 50);
    }

    // 10 Puan Kazanma Fanfarı! (Zafer Melodisi)
    victory() {
        if (!this.enabled) return;
        const notes = [
            { f: 523.25, d: 0.15 }, // C5
            { f: 659.25, d: 0.15 }, // E5
            { f: 783.99, d: 0.15 }, // G5
            { f: 1046.50, d: 0.45 } // C6
        ];
        notes.forEach((n, idx) => {
            setTimeout(() => {
                this.playTone(n.f, 'triangle', n.d, 0.25);
            }, idx * 160);
        });
    }

    // BMO Açılış / Uyanma Melodisi
    bmoChime() {
        if (!this.enabled) return;
        const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
        notes.forEach((f, idx) => {
            setTimeout(() => {
                this.playTone(f, 'sine', 0.12, 0.2);
            }, idx * 70);
        });
    }
}

const sfx = new SoundEffects();

// Ses Açma / Kapatma Butonu
const soundToggleBtn = document.getElementById('soundToggleBtn');
const soundIcon = document.getElementById('soundIcon');

soundToggleBtn.addEventListener('click', () => {
    sfx.init();
    sfx.enabled = !sfx.enabled;
    soundIcon.textContent = sfx.enabled ? '🔊' : '🔇';
    soundToggleBtn.setAttribute('title', sfx.enabled ? 'Ses Efektleri Açık' : 'Ses Efektleri Kapalı');
});

// --- KONFETİ YARDIMCISI ---
function launchConfetti(bursts = 1) {
    sfx.pop();
    if (typeof confetti === 'function') {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#ff2a85', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ffffff']
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
}

// Hero Butonu Konfeti
const confettiBtn = document.getElementById('confettiBtn');
if (confettiBtn) {
    confettiBtn.addEventListener('click', () => {
        launchConfetti(2);
    });
}

// --- İNTERAKTİF PASTA VE MUM ÜFLEME ---
const blowCandleBtn = document.getElementById('blowCandleBtn');
const candleFlame = document.getElementById('candleFlame');
const candleSmoke = document.getElementById('candleSmoke');
const wishStatus = document.getElementById('wishStatus');
const blowBtnText = document.getElementById('blowBtnText');

let candleBlown = false;

blowCandleBtn.addEventListener('click', () => {
    if (!candleBlown) {
        // Mumu üfle
        candleBlown = true;
        sfx.blow();
        candleFlame.classList.add('blown-out');
        candleSmoke.classList.add('active');
        blowBtnText.textContent = "Mumu Tekrar Yak ✨";
        wishStatus.textContent = "✨ Dileğin tutuldu! Yeni yaşın kutlu ve umut dolu olsun! ✨";
        setTimeout(() => {
            launchConfetti();
        }, 300);
    } else {
        // Mumu tekrar yak
        candleBlown = false;
        candleFlame.classList.remove('blown-out');
        candleSmoke.classList.remove('active');
        blowBtnText.textContent = "Mumu Üfle!";
        wishStatus.textContent = "";
        sfx.playTone(600, 'sine', 0.15, 0.1);
    }
});

// --- BMO İLE DOĞUM GÜNÜ YILAN OYUNU (10 PUANDA BİTEN & ÖDÜLLÜ) ---
const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
const currentScoreEl = document.getElementById('currentScore');
const highScoreEl = document.getElementById('highScore');

// BMO Arayüz Elemanları
const bmoFace = document.getElementById('bmoFace');
const bmoScreen = document.getElementById('bmoScreen');
const bmoSpeechText = document.getElementById('bmoSpeechText');
const bmoMouth = document.getElementById('bmoMouth');
const bmoBlueBtn = document.getElementById('bmoBlueBtn');
const bmoGreenBtn = document.getElementById('bmoGreenBtn');
const bmoTriangleBtn = document.getElementById('bmoTriangleBtn');
const bmoDpadBtns = document.querySelectorAll('.bmo-dpad-btn');

// Ödül Modalı Elemanları
const winModal = document.getElementById('winModal');
const claimRewardBtn = document.getElementById('claimRewardBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

const GRID_SIZE = 18; // 360 / 18 = 20x20 kare
const TILE_COUNT = canvas.width / GRID_SIZE; // 20
const TARGET_SCORE = 10;

let snake = [];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;
let nextDx = 1;
let nextDy = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem('beto_snake_highscore') || '0', 10);
highScoreEl.textContent = highScore;

let gameLoopInterval = null;
let isPlaying = false;
const GAME_SPEED = 120; // ms

// BMO Ağız İfadeleri
const MOUTH_SMILE = `<svg viewBox="0 0 50 25" width="46" height="22"><path d="M 6,5 Q 25,24 44,5" fill="none" stroke="#1d4e44" stroke-width="5" stroke-linecap="round"/></svg>`;
const MOUTH_SAD = `<svg viewBox="0 0 50 25" width="46" height="22"><path d="M 6,18 Q 25,4 44,18" fill="none" stroke="#1d4e44" stroke-width="5" stroke-linecap="round"/></svg>`;
const MOUTH_WIN = `<svg viewBox="0 0 50 25" width="46" height="22"><path d="M 5,3 Q 25,27 45,3 Z" fill="#1d4e44" stroke="#1d4e44" stroke-width="2" stroke-linejoin="round"/></svg>`;

function initGame() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    score = 0;
    currentScoreEl.textContent = score;
    dx = 1;
    dy = 0;
    nextDx = 1;
    nextDy = 0;
    spawnFood();
}

function spawnFood() {
    let valid = false;
    while (!valid) {
        food = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
        valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

function updateGame() {
    dx = nextDx;
    dy = nextDy;

    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Duvara çarpma kontrolü
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        gameOver();
        return;
    }

    // Kendine çarpma kontrolü
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver();
            return;
        }
    }

    snake.unshift(head);

    // Yiyecek (Pasta 🎂) yendi mi?
    if (head.x === food.x && head.y === food.y) {
        score++;
        currentScoreEl.textContent = score;
        sfx.eat();

        if (score > highScore) {
            highScore = score;
            highScoreEl.textContent = highScore;
            localStorage.setItem('beto_snake_highscore', highScore);
        }

        // 10 PUANA ULAŞTI MI? (KAZANMA ŞARTI)
        if (score >= TARGET_SCORE) {
            triggerWin();
            return;
        }

        spawnFood();
    } else {
        snake.pop();
    }

    drawGame();
}

function drawGame() {
    // BMO CRT Nane Yeşili Arka Plan
    ctx.fillStyle = '#9fe2c7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // İnce Retro Izgara Çizgileri
    ctx.strokeStyle = 'rgba(27, 78, 68, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }

    // Yiyecek: Doğum Günü Pastası 🎂
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎂', (food.x * GRID_SIZE) + GRID_SIZE / 2, (food.y * GRID_SIZE) + GRID_SIZE / 2 + 1);

    // Yılan Çizimi (BMO Retro Koyu Yeşil Stili)
    snake.forEach((segment, index) => {
        const isHead = index === 0;
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;

        if (isHead) {
            // Yılan Kafası
            ctx.fillStyle = '#0f3a31';
            ctx.beginPath();
            ctx.roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 5);
            ctx.fill();

            // Yılanın gözleri
            ctx.fillStyle = '#ffffff';
            const eyeSize = 3;
            if (dx === 1) { // Sağa
                ctx.fillRect(x + 11, y + 3, eyeSize, eyeSize);
                ctx.fillRect(x + 11, y + 11, eyeSize, eyeSize);
            } else if (dx === -1) { // Sola
                ctx.fillRect(x + 3, y + 3, eyeSize, eyeSize);
                ctx.fillRect(x + 3, y + 11, eyeSize, eyeSize);
            } else if (dy === -1) { // Yukarı
                ctx.fillRect(x + 3, y + 3, eyeSize, eyeSize);
                ctx.fillRect(x + 11, y + 3, eyeSize, eyeSize);
            } else { // Aşağı
                ctx.fillRect(x + 3, y + 11, eyeSize, eyeSize);
                ctx.fillRect(x + 11, y + 11, eyeSize, eyeSize);
            }
        } else {
            // Yılan Gövdesi
            ctx.fillStyle = '#1c564a';
            ctx.beginPath();
            ctx.roundRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4, 4);
            ctx.fill();

            // İnce iç vurgu
            ctx.fillStyle = '#267060';
            ctx.fillRect(x + 5, y + 5, GRID_SIZE - 10, GRID_SIZE - 10);
        }
    });
}

function startBmoGame() {
    sfx.init();
    sfx.bmoChime();

    // BMO yüzünü gizle ve oyunu başlat
    bmoFace.classList.add('hidden');
    initGame();
    isPlaying = true;
    drawGame();

    if (gameLoopInterval) clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(updateGame, GAME_SPEED);
}

function gameOver() {
    isPlaying = false;
    clearInterval(gameLoopInterval);
    sfx.lose();

    // BMO üzgün ifadeye bürünür
    bmoMouth.innerHTML = MOUTH_SAD;
    bmoSpeechText.innerHTML = `Ah çarptın! 💥 Skor: ${score}/${TARGET_SCORE}<br><strong>Tekrar oynamak için yüzüme tıkla!</strong>`;
    bmoFace.classList.remove('hidden');
}

function triggerWin() {
    isPlaying = false;
    clearInterval(gameLoopInterval);
    sfx.victory();
    launchConfetti();

    // BMO süper mutlu zafer ifadesi takınır
    bmoMouth.innerHTML = MOUTH_WIN;
    bmoSpeechText.innerHTML = `🏆 YAY! 10 PUAN! KAZANDIN BETÖ! 🥳`;
    bmoFace.classList.remove('hidden');

    setTimeout(() => launchConfetti(), 400);
    setTimeout(() => launchConfetti(), 900);

    // Kazanma modalını aç
    setTimeout(() => {
        winModal.classList.add('active');
    }, 600);
}

// BMO Yüzüne veya Ekranına Tıklayarak Oyunu Başlatma
bmoFace.addEventListener('click', () => {
    // Gülümseyen ağzı sıfırla
    bmoMouth.innerHTML = MOUTH_SMILE;
    bmoSpeechText.innerHTML = `"Video oyunu oynayalım mı? Yüzüme tıkla!" 🎮`;
    startBmoGame();
});

// Yön Kontrol Fonksiyonu
function changeDirection(dir) {
    if (!isPlaying) {
        startBmoGame();
        return;
    }
    switch (dir) {
        case 'UP':
            if (dy !== 1) { nextDx = 0; nextDy = -1; }
            break;
        case 'DOWN':
            if (dy !== -1) { nextDx = 0; nextDy = 1; }
            break;
        case 'LEFT':
            if (dx !== 1) { nextDx = -1; nextDy = 0; }
            break;
        case 'RIGHT':
            if (dx !== -1) { nextDx = 1; nextDy = 0; }
            break;
    }
}

// Klavye Kontrolleri (WASD & Ok Tuşları)
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'w'].includes(key)) {
        changeDirection('UP');
        if (isPlaying) e.preventDefault();
    } else if (['arrowdown', 's'].includes(key)) {
        changeDirection('DOWN');
        if (isPlaying) e.preventDefault();
    } else if (['arrowleft', 'a'].includes(key)) {
        changeDirection('LEFT');
        if (isPlaying) e.preventDefault();
    } else if (['arrowright', 'd'].includes(key)) {
        changeDirection('RIGHT');
        if (isPlaying) e.preventDefault();
    }
});

// BMO Üzerindeki Sarı Artı D-PAD Tuşları İle Oynama
bmoDpadBtns.forEach(btn => {
    // Hem click hem pointerdown desteği (mobil dokunmatik tepki süresi için mükemmel)
    btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        const dir = btn.getAttribute('data-dir');
        changeDirection(dir);
    });
});

// BMO [A] Mavi Tuş: Oyunu Başlat / Yeniden Başlat
bmoBlueBtn.addEventListener('click', (e) => {
    e.preventDefault();
    bmoMouth.innerHTML = MOUTH_SMILE;
    startBmoGame();
});

// BMO [B] Yeşil Tuş: Sesi Aç / Kapat
bmoGreenBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sfx.init();
    sfx.enabled = !sfx.enabled;
    const soundToggle = document.getElementById('soundToggleBtn');
    const soundIcon = document.getElementById('soundIcon');
    if (soundIcon) soundIcon.textContent = sfx.enabled ? '🔊' : '🔇';
    sfx.playTone(520, 'sine', 0.1, 0.1);
});

// BMO [▲] Kırmızı Üçgen Tuş: Eğlenceli Konfeti Patlaması
bmoTriangleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sfx.init();
    sfx.pop();
    launchConfetti();
});

// Ödül Modalı Butonları
claimRewardBtn.addEventListener('click', () => {
    winModal.classList.remove('active');
    launchConfetti();
});

playAgainBtn.addEventListener('click', () => {
    winModal.classList.remove('active');
    bmoMouth.innerHTML = MOUTH_SMILE;
    startBmoGame();
});

// Modal dışına tıklayınca kapatma
winModal.addEventListener('click', (e) => {
    if (e.target === winModal) {
        winModal.classList.remove('active');
    }
});

// --- DİLEK VE NOT PANOSU (GUESTBOOK) ---
const openNoteModalBtn = document.getElementById('openNoteModalBtn');
const closeNoteModalBtn = document.getElementById('closeNoteModalBtn');
const noteModal = document.getElementById('noteModal');
const noteForm = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');

openNoteModalBtn.addEventListener('click', () => {
    noteModal.classList.add('active');
});

closeNoteModalBtn.addEventListener('click', () => {
    noteModal.classList.remove('active');
});

noteModal.addEventListener('click', (e) => {
    if (e.target === noteModal) {
        noteModal.classList.remove('active');
    }
});

// Kaydedilen Notları Yükle
function loadStoredNotes() {
    const saved = localStorage.getItem('beto_guestbook_notes');
    if (saved) {
        try {
            const notes = JSON.parse(saved);
            notes.forEach(n => appendNoteCard(n.message, n.author, n.color));
        } catch (e) {
            console.error(e);
        }
    }
}

function appendNoteCard(message, author, color) {
    const card = document.createElement('div');
    card.className = `sticky-note note-${color}`;
    card.innerHTML = `
        <p class="note-text">"${escapeHtml(message)}"</p>
        <span class="note-author">— ${escapeHtml(author)}</span>
    `;
    notesGrid.prepend(card);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = document.getElementById('noteAuthor').value.trim();
    const message = document.getElementById('noteMessage').value.trim();
    const color = document.querySelector('input[name="noteColor"]:checked').value;

    if (!author || !message) return;

    appendNoteCard(message, author, color);

    // LocalStorage'a kaydet
    const existing = JSON.parse(localStorage.getItem('beto_guestbook_notes') || '[]');
    existing.unshift({ author, message, color });
    localStorage.setItem('beto_guestbook_notes', JSON.stringify(existing));

    sfx.eat();
    launchConfetti();

    noteForm.reset();
    noteModal.classList.remove('active');
});

// Sayfa yüklendiğinde ilk çizim ve kayıtlı notları yükle
window.addEventListener('DOMContentLoaded', () => {
    initGame();
    drawGame();
    loadStoredNotes();
});
