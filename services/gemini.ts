
import { GoogleGenAI, Type } from "@google/genai";
import { Recommendation } from "../types.ts";

export const getAIFoodRecommendations = async (mood: string): Promise<Recommendation> => {
  // process.env가 정의되지 않은 환경에서도 에러가 나지 않도록 처리
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey || '' });
  
  const hour = new Date().getHours();
  let timeStr = "점심";
  if (hour >= 5 && hour < 11) timeStr = "아침 식사";
  else if (hour >= 11 && hour < 16) timeStr = "점심 식사";
  else if (hour >= 16 && hour < 21) timeStr = "저녁 식사";
  else timeStr = "야식";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `사용자의 현재 상태:
- 시간대: ${timeStr}
- 기분: ${mood}

위 정보를 바탕으로 한국 배달 앱(배달의민족 등)에서 주문 가능한 가장 적절한 메뉴 3가지를 추천해줘.
추천 이유는 한국어로 친근하고 다정하게 작성해주고, suggestions는 음식 이름만 배열로 반환해줘.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reasoning: {
            type: Type.STRING,
            description: "추천 이유 (한국어)",
          },
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "음식 이름 리스트 (3개)",
          },
        },
        required: ["reasoning", "suggestions"],
      },
    },
  });

  return JSON.parse(response.text || "{}") as Recommendation;
};
