// my-custom-chat.js (v5 - Final Version)

// ===================================================================
// TANDA KEHIDUPAN: Baris ini akan mencetak pesan ke konsol
// untuk memastikan file ini berhasil dimuat dan dijalankan.
console.log('--- SCRIPT KUSTOM BERHASIL DIMUAT --- Versi 5 ---');
// ===================================================================

// --- KONFIGURASI ASET ANDA ---
const GITHUB_USERNAME = 'flevy04';
const GITHUB_REPO_NAME = 'ytchat-overlay';
const BASE_ASSET_URL = `https://${GITHUB_USERNAME}.github.io/${GITHUB_REPO_NAME}/assets/`;

const signalGifs = [
    `${BASE_ASSET_URL}signal1.gif`,
    `${BASE_ASSET_URL}signal2.gif`,
    `${BASE_ASSET_URL}signal3.gif`
];
const satelliteGifUrl = `${BASE_ASSET_URL}satellite.png`;
const earthGifUrl = `${BASE_ASSET_URL}earth.gif`;
const plutoGifUrl = `${BASE_ASSET_URL}pluto.gif`;

// --- FUNGSI UTAMA ---
function customizeMessage(messageElement) {
    if (messageElement.dataset.customized) return;
    messageElement.dataset.customized = 'true';

    const authorElement = messageElement.querySelector('.name, .author-name, .author');
    if (authorElement) {
        const avatar = authorElement.parentElement.querySelector('.avatar, .pfp');
        if(avatar) avatar.style.display = 'none';

        const satelliteImg = document.createElement('img');
        satelliteImg.className = 'satellite-gif';
        satelliteImg.src = satelliteGifUrl;
        authorElement.insertAdjacentElement('afterend', satelliteImg);

        const signalImg = document.createElement('img');
        signalImg.className = 'signal-gif';
        signalImg.src = signalGifs[Math.floor(Math.random() * signalGifs.length)];
        satelliteImg.insertAdjacentElement('afterend', signalImg);
    }

    if (!messageElement.querySelector('.celestial-footer')) {
        const footer = document.createElement('div');
        footer.className = 'celestial-footer';
        const earthImg = document.createElement('img');
        earthImg.className = 'celestial-gif';
        earthImg.src = earthGifUrl;
        const lineDiv = document.createElement('div');
        lineDiv.className = 'signal-line';
        const plutoImg = document.createElement('img');
        plutoImg.className = 'celestial-gif';
        plutoImg.src = plutoUrl;
        footer.appendChild(earthImg);
        footer.appendChild(lineDiv);
        footer.appendChild(plutoImg);
        messageElement.appendChild(footer);
    }
}

// --- LOGIKA OBSERVER (untuk pesan BARU) ---
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
                const messages = node.querySelectorAll('.chat-line, .message, .message-container');
                if (messages.length > 0) {
                    messages.forEach(customizeMessage);
                }
            }
        });
    }
});
observer.observe(document.body, { childList: true, subtree: true });

// --- (BARU) Jalankan kustomisasi untuk pesan yang SUDAH ADA saat halaman dimuat ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('Halaman selesai dimuat, memproses pesan yang sudah ada...');
    const existingMessages = document.querySelectorAll('.chat-line, .message, .message-container');
    existingMessages.forEach(customizeMessage);
});

console.log('Custom Chat Script v5 by Gemini is running!');
