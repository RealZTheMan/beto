# 🎂 Betö'nün Doğum Günü Kutlama Sitesi ✨

Bu proje, arkadaşın için özel olarak hazırlanmış modern, etkileşimli ve detaylı bir doğum günü kutlama web sitesidir.

---

## 🚀 İçerik ve Özellikler

1. **Göz Alıcı Hero Alanı:** Büyük kutlama başlığı, etkileşimli "Kutlamayı Patlat!" konfeti butonu ve istatistik kartları.
2. **İnteraktif Doğum Günü Pastası (Mum Üfleme):** Tıklandığında mumun söndüğü, duman çıkardığı, konfetilerin patladığı ve dilek mesajının belirdiği interaktif pasta.
3. **Zaman Tüneli & Hatıralar (Timeline):** Birlikte geçirilen unutulmaz anlar için hazır kartlar ve fotoğraf yerleştirme alanları.
4. **Neden Harikasın? (Karakter Özellikleri):** Arkadaşını özel kılan sevimli ve samimi özelliklerin listelendiği cam efektli (glassmorphism) kartlar.
5. **BMO ile Mini Yılan Oyunu (Adventure Time Özel Tasarımı):**
   - **BMO Konsol Mimarisi:** Sevimli BMO karakterinin nane yeşili gövdesi, kolları, ayakları, kaset yuvası ve yan kabartmalarıyla özel olarak modellendi.
   - **Gülümseyen Yüz:** Oyuna başlamadan önce BMO ekranda gözlerini kırparak gülümser (*"Video oyunu oynayalım mı? Yüzüme tıkla!"*). Yüzüne tıklandığında sevimli bir uyanma melodisiyle oyun doğrudan BMO'nun ekranında başlar!
   - **BMO Üzerindeki Tuşlarla Kontrol:**
     - **Sarı Artı Tuşu (D-PAD):** BMO'nun gövdesindeki sarı yön tuşlarına basarak yılanı yönlendirebilirsin (dokunmatik ekranlarda mükemmel çalışır).
     - **[A] Mavi Daire Tuş:** Oyunu başlatır / yeniden başlatır.
     - **[B] Yeşil Daire Tuş:** BMO ses efektlerini açar / kapatır.
     - **[▲] Kırmızı Üçgen Tuş:** BMO konfeti patlatır!
     - Masaüstünde klavyeden **WASD** veya **Yön Tuşları** da kullanılabilir.
   - **Hedef:** 10 Puan! 10 puana ulaşıldığında oyun durur, BMO zafer kutlaması yapar ve **"BMO ONAYLI ŞAMPİYON! / YOU WON!"** ödül modali açılır.
   - **Ödül Ekranı:** Özelleştirilebilir doğum günü ödülü (örn. kahve kuponu, özel hediye vb.) modali açılır.
6. **Özel Doğum Günü Mektubu:** İçten ve duygusal hazır mektup metni.
7. **Dilek Duvarı (Ziyaretçi Defteri):** Renkli post-it notları ve ziyaretçilerin tarayıcıda kalıcı olarak yeni not ekleyebildiği form.
8. **Dahili Ses Efektleri (Web Audio API):** Harici MP3 dosyası indirmeye gerek olmadan çalışan hafif ve tatlı retro ses efektleri (sağ alttan açılıp kapatılabilir).

---

## ✏️ Nasıl Düzenleyebilirsin?

Tüm metinler ve alanlar kolayca düzenlenebilir şekilde tasarlanmıştır:

### 1. Metinleri ve İsimleri Değiştirmek
- [index.html](file:///C:/Users/RealZ/Desktop/betö/index.html) dosyasını herhangi bir metin editöründe aç.
- `Betö` ismini aratıp arkadaşının ismiyle veya lakabıyla değiştirebilirsin.
- Zaman tünelindeki anı açıklamalarını ve mektup bölümünü kendi hikayelerinize göre düzenleyebilirsin.

### 2. Fotoğraflar Eklemek
- [index.html](file:///C:/Users/RealZ/Desktop/betö/index.html) içerisindeki `<div class="photo-placeholder">` alanlarına kendi fotoğraflarını şu şekilde ekleyebilirsin:
```html
<img src="fotograflar/anı1.jpg" alt="İlk Günümüz" class="memory-img" style="width:100%; border-radius:12px; margin-top:10px;">
```

### 3. Yılan Oyunu Ödülünü Değiştirmek
- [index.html](file:///C:/Users/RealZ/Desktop/betö/index.html) dosyasında `id="winModal"` bölümündeki `<p class="reward-desc">` etiketinin içini istediğin hediye veya sürprizle güncelleyebilirsin (Örn: *"Sana aldığım hediyeyi açmak için tıkla / Sinema bileti / İstediğin restoranda yemek benden!"*).

---

## 💻 Yerel Olarak Nasıl Çalıştırılır?

Tek yapman gereken [index.html](file:///C:/Users/RealZ/Desktop/betö/index.html) dosyasını çift tıklayarak tarayıcında açmak! Hiçbir ekstra kuruluma ihtiyaç yoktur.

---

## 🌐 GitHub Pages Üzerinde Yayına Alma (Canlı Link)

Siteyi GitHub Pages üzerinden arkadaşına gönderebileceğin canlı bir web bağlantısına dönüştürmek için:
1. GitHub deposu gizli (private) olduğundan, istersen depoyu **Public** yapabilir veya GitHub Pro kullanıyorsan Private repo üzerinde Pages'i açabilirsin.
2. Repo sayfasında: **Settings** -> **Pages** sekmesine git.
3. **Branch** kısmından `main` dalını seç ve `Save` butonuna tıkla.
4. Birkaç dakika içinde `https://[kullanıcı-adın].github.io/[repo-adı]/` şeklinde canlı bağlantın hazır olacaktır!
