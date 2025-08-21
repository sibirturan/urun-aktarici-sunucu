// Gerekli kütüphaneleri projemize dahil ediyoruz.
// Express, web sunucusu oluşturmayı kolaylaştıran bir kütüphanedir.
const express = require('express');
// Cors, eklentimizin sunucuyla güvenli bir şekilde konuşmasını sağlar.
const cors = require('cors');

// Express uygulamasını başlatıyoruz.
const app = express();
// Sunucunun çalışacağı portu belirliyoruz.
const PORT = 3000;

// Sunucunun gelen JSON verilerini anlayabilmesi için bu ayarları yapıyoruz.
app.use(cors());
app.use(express.json());

// --- API ENDPOINT ---
// Eklentinin veri göndereceği adresi (endpoint) oluşturuyoruz.
// Eklenti, '/api/save-product' adresine bir POST isteği gönderdiğinde bu kod çalışacak.
app.post('/api/save-product', (req, res) => {
    // req.body, eklentinin gönderdiği ürün bilgilerini (JSON formatında) içerir.
    const productData = req.body;

    console.log('---------------------------------');
    console.log('Eklentiden yeni ürün bilgisi geldi!');
    console.log('Başlık:', productData.title);
    console.log('Fiyat:', productData.price);
    console.log('Resim Sayısı:', productData.images.length);
    console.log('Varyant Sayısı:', productData.variants.length);
    console.log('---------------------------------');

    // --- BİR SONRAKİ ADIM ---
    // Bu noktada, gelen 'productData' objesini bir veritabanına (MongoDB, PostgreSQL vb.)
    // kaydetmek için gerekli kod yazılmalıdır.

    // Eklentiye işlemin başarılı olduğuna dair bir yanıt gönderiyoruz.
    res.status(200).json({ 
        status: 'success', 
        message: 'Product data received successfully!',
        receivedData: productData 
    });
});

// Sunucuyu belirtilen portta dinlemeye başlatıyoruz.
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışmaya başladı.`);
    console.log('Eklentiden gelecek ürün bilgileri bekleniyor...');
});
