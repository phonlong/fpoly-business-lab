import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const menuContext = JSON.stringify(MENU_ITEMS.map(item => ({ name: item.name, category: item.category, description: item.description, price: item.price })));
    
    const prompt = `
      Bạn là một nhân viên phục vụ vui vẻ, thân thiện tại "Tiệm Cà Phê Chill".
      Dưới đây là menu của quán: ${menuContext}.
      
      Khách hàng đang hỏi: "${userQuery}".
      
      Hãy gợi ý cho khách hàng một món phù hợp nhất từ menu. 
      Trả lời ngắn gọn, vui vẻ, dùng icon dễ thương.
      Nếu khách hỏi món không có trong menu, hãy xin lỗi và gợi ý món tương tự có trong menu.
      Chỉ trả lời bằng tiếng Việt.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Xin lỗi, mình đang bận pha chế chút, bạn hỏi lại nha!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hệ thống AI đang nghỉ ngơi xíu, bạn cứ chọn món mình thích nhé!";
  }
};