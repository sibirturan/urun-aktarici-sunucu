// Gerekli kütüphaneleri projemize dahil ediyoruz.
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Sunucunun gelen JSON verilerini anlayabilmesi için bu ayarları yapıyoruz.
app.use(cors());
app.use(express.json());

// --- HAFIZA (VERİTABANI SİMÜLASYONU) ---
// Eklentiden gelen ürünleri bu dizinin içinde saklayacağız.
let products = [];

// --- API ENDPOINT: Ürün Kaydetme ---
// Eklentiden gelen ürünü hafızaya (diziye) ekler.
app.post('/api/save-product', (req, res) => {
    const productData = req.body;
    console.log('Yeni ürün alındı:', productData.title);

    // Gelen ürüne benzersiz bir ID ekleyelim
    productData.id = Date.now(); 
    
    // Ürünü dizinin en başına ekliyoruz.
    products.unshift(productData);

    // Eklentiye başarı mesajı gönderiyoruz.
    res.status(200).json({ 
        status: 'success', 
        message: 'Product data saved successfully!'
    });
});

// --- API ENDPOINT: Ürünleri Listeleme ---
// Kontrol panelinden bir istek geldiğinde, hafızadaki tüm ürünleri gönderir.
app.get('/api/get-products', (req, res) => {
    console.log(`${products.length} adet ürün paneline gönderiliyor.`);
    res.status(200).json(products);
});

// --- YENİ API ENDPOINT: Platforma Ürün Listeleme ---
// Kontrol panelinden gelen "şuraya gönder" isteğini işler.
app.post('/api/list-on-platform', (req, res) => {
    const { productId, platform } = req.body;

    const productToList = products.find(p => p.id === productId);

    if (productToList) {
        console.log(`[SİMÜLASYON] '${productToList.title}' ürünü ${platform} platformunda listeleniyor...`);
        // Gerçek bir uygulamada burada eBay/Facebook API'sine bağlanılır.
        
        // Simülasyon başarılı olduğu için başarı mesajı gönderiyoruz.
        res.status(200).json({
            status: 'success',
            message: `'${productToList.title}' ürünü ${platform} için listeleme sırasına alındı.`
        });
    } else {
        res.status(404).json({ status: 'error', message: 'Listelenecek ürün bulunamadı.' });
    }
});


// Sunucuyu belirtilen portta dinlemeye başlatıyoruz.
app.listen(PORT, () => {
    console.log(`Sunucu port ${PORT} üzerinde çalışmaya başladı.`);
    console.log('Eklentiden ve panelden gelecek istekler bekleniyor...');
});
