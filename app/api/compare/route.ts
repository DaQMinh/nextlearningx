
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
const MODEL_NAME = "gemini-1.0-pro";
// Access your API key securely
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
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
async function generateContent(parts : any[]) {
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    return result.response.text();
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred";
  }
}
function countLines(str : string) {
  const lines = str.split(/\r?\n/);
  return lines.length;
}
export async function POST(request: Request) {
    try {
        const requestBody = await request.json();

        const parts = [
          {text: "input: Sửa văn bản của user\nVăn bản gốc :"},
          {text: "output: System : Bạn sẽ nhận được hai phần văn bản: một là văn bản gốc và hai là văn bản đã được sửa đổi một phần bởi người dùng. Nhiệm vụ của bạn là in ra văn bản đã hoàn thiện của người dùng bằng cách điền vào các phần bị thiếu hoặc sai so với văn bản gốc. Phần bị thiếu hoặc sai sẽ được đánh dấu bằng cách bọc chúng trong hai dấu sao ví dụ : **phần bị thiếu**. Tuyệt đối không thêm tiêu đề hay giải thích gì thêm vì nó làm lỗi chương trình.\nVí dụ :\nVăn bản gốc : “Bác Hồ - tên Người là cả một niềm thơ”, vẻ đẹp, sự vĩ đại và công lao trởi biển của Bác đã trở thành nguồn đề tài vô tận khơi gợi nhiều cảm xúc cho bao hồn thơ cất cánh trong đó chúng ta không thể  không nhắc đến nhà thơ Viễn Phương –một người con của thành đồng Tổ quốc.  Thơ ông chủ yếu viết về quê hương  ,đất nước và con người của quê hương miền Nam với một giọng thơ thì thầm buâng khuâng ,giàu cảm xúc.Tiêu biểu trong sự nghiệp sáng tác của ông là bài thơ “Viếng lăng Bác”, bài thơ là tiếng lòng thành kính , biết ơn và tự hào pha lẫn nỗi xót đau của một người con miền Nam lần đầu ra thăm Bác. Bài thơ gồm bốn khổ thơ , khổ nào cũng đẹp trong đó tiêu biểu là khổ thơ thể hiện niềm xúc động  của nhà thơ khi đứng trước lăng Bác, ngắm nhìn về cảnh vật bên ngoài  lăng Bác : “Con ở miền Nam ra thăm lăng Bác       Đã thấy trong sương hàng tre bát ngátÔi hàng tre xanh xanh Việt Nam    Bão táp mưa sa đứng thẳng hàng »\n\nVăn bản user : \n\nVẻ đẹp và công lao trởi biển của Bác Hồ đã trở thành nguồn đề tài vô tận khơi gợi nhiều cảm xúc cho bao hồn thơ cất cánh trong đó chúng ta không thể \nkhông nhắc đến nhà thơ Viễn Phương – một người con của thành đồng Tổ quốc.  Thơ ông chủ yếu viết về quê hương \n,đất nước và con người của quê hương miền Nam với một giọng thơ thì thầm buâng khuâng .Tiêu biểu \ntrong sự nghiệp sáng tác của ông là bài thơ “Viếng lăng Bác”, bài thơ là tiếng lòng thành kính , biết ơn và tự \nhào pha lẫn nỗi xót đau của một người con miền Nam lần đầu ra thăm Bác. Bài thơ gồm bốn khổ thơ , khổ nào cũng \nđẹp trong đó tiêu biểu là khổ thơ thể hiện niềm xúc động  của nhà thơ khi đứng trước lăng Bác.\n\nOutput :\n\n**“Bác Hồ - tên Người là cả một niềm thơ”** vẻ đẹp**, sự vĩ đại** và công lao trởi biển của Bác đã \ntrở thành nguồn đề tài vô tận khơi gợi nhiều cảm xúc cho bao hồn thơ cất cánh trong đó chúng ta không thể \nkhông nhắc đến nhà thơ Viễn Phương – một người con của thành đồng Tổ quốc.  Thơ ông chủ yếu viết về quê hương \n,đất nước và con người của quê hương miền Nam với một giọng thơ thì thầm buâng khuâng **,giàu cảm xúc**.Tiêu biểu \ntrong sự nghiệp sáng tác của ông là bài thơ “Viếng lăng Bác”, bài thơ là tiếng lòng thành kính , biết ơn và tự \nhào pha lẫn nỗi xót đau của một người con miền Nam lần đầu ra thăm Bác. Bài thơ gồm bốn khổ thơ , khổ nào cũng \nđẹp trong đó tiêu biểu là khổ thơ thể hiện niềm xúc động  của nhà thơ khi đứng trước lăng Bác**, ngắm nhìn về cảnh vật bên ngoài  lăng Bác :**\n**“Con ở miền Nam ra thăm lăng Bác\nĐã thấy trong sương hàng tre bát ngát\nÔi hàng tre xanh xanh Việt Nam\nBão táp mưa sa đứng thẳng hàng »**"},
          { text: `input: ${requestBody.originalParagraph}` },
          {text: "output: "},
        ];
        const response = await generateContent(parts);

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
