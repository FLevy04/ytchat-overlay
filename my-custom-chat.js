// Pastikan untuk menjalankan kode hanya setelah seluruh halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

  console.log('Custom Overlay Script Loaded.');

  // === KONFIGURASI ===
  // Ganti URL di bawah ini dengan URL ke GIF sinyal Anda sendiri.
  // Anda dapat menambahkan sebanyak yang Anda mau.
  const signalGifs = [
    'https://FLevy04.github.io/ytchat-overlay/assets/signal1.gif',
    'https://FLevy04.github.io/ytchat-overlay/assets/signal2.gif',
    'https://FLevy04.github.io/ytchat-overlay/assets/signal3.gif'
  ];

  // === FUNGSI BANTUAN ===
  /**
   * Memilih elemen acak dari sebuah array.
   * @param {Array} arr - Array untuk dipilih.
   * @returns {*} Elemen acak dari array.
   */
  function getRandomElement(arr) {
    if (!arr |

| arr.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  // === LOGIKA UTAMA: MANIPULASI DOM ===
  /**
   * Fungsi ini akan dipanggil untuk setiap pesan baru yang ditambahkan ke DOM.
   * @param {HTMLElement} messageNode - Elemen.message-wrapper yang baru.
   */
  function processNewMessage(messageNode) {
    // 1. Temukan placeholder GIF di dalam pesan baru.
    const signalGifPlaceholder = messageNode.querySelector('.signal-gif');

    if (!signalGifPlaceholder) {
      console.error('Placeholder.signal-gif tidak ditemukan di dalam pesan baru.');
      return;
    }

    // 2. Dapatkan URL GIF acak.
    const randomGifUrl = getRandomElement(signalGifs);

    if (randomGifUrl) {
      // 3. Atur atribut 'src' dari placeholder untuk menampilkan GIF.
      signalGifPlaceholder.src = randomGifUrl;
      console.log(`GIF diatur ke: ${randomGifUrl}`);
    } else {
      console.warn('Array signalGifs kosong atau tidak terdefinisi.');
    }
  }

  // === PENGAMAT DOM (MUTATION OBSERVER) ===
  // Ini adalah cara yang andal untuk mendeteksi kapan pesan baru ditambahkan.
  
  // Pilih node yang akan diamati (dalam hal ini, seluruh body)
  const targetNode = document.body;

  // Konfigurasi untuk observer (kita hanya peduli dengan penambahan node anak)
  const config = { childList: true };

  // Callback function untuk dieksekusi ketika mutasi diamati
  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Periksa setiap node yang ditambahkan
        mutation.addedNodes.forEach(node => {
          // Pastikan node tersebut adalah HTMLElement dan memiliki kelas.message-wrapper
          if (node.nodeType === 1 && node.classList.contains('message-wrapper')) {
            console.log('Elemen.message-wrapper baru terdeteksi.');
            // Panggil fungsi pemrosesan kita untuk node baru ini.
            processNewMessage(node);
          }
        });
      }
    }
  };

  // Buat instance observer dengan callback yang telah kita definisikan
  const observer = new MutationObserver(callback);

  // Mulai mengamati target node untuk mutasi yang telah dikonfigurasi
  observer.observe(targetNode, config);
  
  console.log('Mutation Observer aktif, menunggu pesan baru...');

});