const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
// Access your API key securely
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function POST(request: Request) {
  try {
      const requestBody = await request.json();
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };
      
        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ];
      
        const parts = [
          {text: "input: Chỉnh sửa các lỗi chính tả trong đoạn"},
          {text: "output: Nhiệm vụ của bạn là chỉnh sửa các từ không có nghĩa hoặc các từ không hợp lý trong đoạn\nChỉ in ra văn bản đã sửa đổi Tuyệt đốiKhông giải thích gì thêm với người dùng"},
          {text: "input: "},
          {text: "output: "},
        ];
      
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });
      
        const response = (result.response).text()
      return new Response(JSON.stringify({ response }), {
          headers: {
              'Content-Type': 'application/json'
          }
      });
  } catch (error) {
      console.error("Error:", error);
      return new Response(JSON.stringify({ error: "An error occurred" }), {
          status: 500,
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }
}
