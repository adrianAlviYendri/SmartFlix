const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getMovieRecommendation(preferences) {
  try {
    const prompt = `
    Saya sedang membangun platform rekomendasi film berbasis kecerdasan buatan.
    
    Tugas Anda adalah memberikan *12 rekomendasi film* yang paling relevan berdasarkan preferensi berikut:
    "${preferences}".
    
    **Ketentuan Rekomendasi:**
    1. Berikan film yang relevan dan memiliki rating tinggi (minimal 7.0 di TMDb).
    2. Prioritaskan film terkenal atau pemenang penghargaan jika sesuai.
    3. Variasikan genre untuk memberikan pilihan beragam.
    
    **Format JSON yang Diharapkan (tanpa teks tambahan di luar format ini):**
    [
      {
        "title": "Nama Film",
        "genre": "Genre Film",
        "description": "Deskripsi Singkat (maksimal 30 kata)",
        "year": "Tahun Rilis",
        "rating": "Skor TMDb (1-10)"
      }
    ]
    
    **Contoh Jawaban yang Benar:**
    [
      {
        "title": "Inception",
        "genre": "Sci-Fi, Thriller",
        "description": "Seorang pencuri memasuki mimpi untuk mencuri rahasia.",
        "year": "2010",
        "rating": "8.8"
      },
      {
        "title": "The Dark Knight",
        "genre": "Action, Crime",
        "description": "Batman menghadapi Joker yang penuh kekacauan.",
        "year": "2008",
        "rating": "9.0"
      }
    ]
    
    Jawab hanya dalam format JSON yang valid tanpa tambahan penjelasan atau catatan.
    Pastikan setiap film unik dan sesuai dengan preferensi yang diberikan.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    let cleanResponse = response.text.replace(/```json|```/g, "").trim();
    let result = JSON.parse(cleanResponse);
    return result;
  } catch (error) {
    console.log("🚀 ~ getMovieRecommendation ~ error:", error);
    throw error;
  }
}

module.exports = { getMovieRecommendation };
