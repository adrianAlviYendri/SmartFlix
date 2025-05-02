const { getMovieRecommendation } = require("../services/gemini");
const { GoogleGenAI } = require("@google/genai");

jest.mock("@google/genai");

describe("getMovieRecommendation", () => {
  const mockGenerateContent = jest.fn();

  beforeAll(() => {
    GoogleGenAI.mockImplementation(() => {
      return {
        models: {
          generateContent: mockGenerateContent,
        },
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("berhasil mendapatkan rekomendasi film", async () => {
    const mockResponse = {
      text: `
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
      `,
    };

    mockGenerateContent.mockResolvedValueOnce(mockResponse);

    const preferences = "action";
    const result = await getMovieRecommendation(preferences);

    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-2.0-flash",
      contents: expect.stringContaining(preferences),
    });
    expect(result).toEqual([
      {
        title: "Inception",
        genre: "Sci-Fi, Thriller",
        description: "Seorang pencuri memasuki mimpi untuk mencuri rahasia.",
        year: "2010",
        rating: "8.8",
      },
      {
        title: "The Dark Knight",
        genre: "Action, Crime",
        description: "Batman menghadapi Joker yang penuh kekacauan.",
        year: "2008",
        rating: "9.0",
      },
    ]);
  });

  test("gagal mendapatkan rekomendasi film karena respons tidak valid", async () => {
    const mockResponse = {
      text: "Invalid JSON response",
    };

    mockGenerateContent.mockResolvedValueOnce(mockResponse);

    const preferences = "action";

    await expect(getMovieRecommendation(preferences)).rejects.toThrow(
      "Unexpected token I in JSON at position 0"
    );

    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-2.0-flash",
      contents: expect.stringContaining(preferences),
    });
  });

  test("gagal mendapatkan rekomendasi film karena error dari API", async () => {
    const mockError = new Error("API Error");

    mockGenerateContent.mockRejectedValueOnce(mockError);

    const preferences = "action";

    await expect(getMovieRecommendation(preferences)).rejects.toThrow(
      "API Error"
    );

    expect(mockGenerateContent).toHaveBeenCalledWith({
      model: "gemini-2.0-flash",
      contents: expect.stringContaining(preferences),
    });
  });
});
