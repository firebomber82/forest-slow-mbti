export type Option = {
  text: string;
  value: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
};

export type Question = {
  id: number;
  question: string;
  options: Option[];
};

export const questions: Question[] = [
  /* ---------------------------------
     E / I｜能量來源（1–6）
  ---------------------------------- */

  {
    id: 1,
    question: "你走進陌生研討會場，剛坐下時你會？",
    options: [
      { text: "先觀察四周動線與人群，找最舒服的位置。", value: "I" },
      { text: "主動與鄰座打招呼，建立基本互動。", value: "E" },
      { text: "看整體氣氛，判斷什麼時候加入比較自然。", value: "I" },
      { text: "直接聊重點，快速切入話題。", value: "E" },
    ],
  },

  {
    id: 2,
    question: "一整天都在與人討論後，你通常會？",
    options: [
      { text: "感到精神被激發，還能繼續延伸想法。", value: "E" },
      { text: "開始覺得疲憊，需要安靜消化。", value: "I" },
      { text: "想找少數熟悉的人繼續深聊。", value: "I" },
      { text: "反而越聊越有能量。", value: "E" },
    ],
  },

  {
    id: 3,
    question: "你比較容易在什麼情境下進入最佳狀態？",
    options: [
      { text: "有空間獨立思考、不被打斷。", value: "I" },
      { text: "在互動與即時回饋中。", value: "E" },
      { text: "低干擾、可長時間專注。", value: "I" },
      { text: "快速交換觀點、即時修正。", value: "E" },
    ],
  },

  {
    id: 4,
    question: "當你需要整理想法時，通常會？",
    options: [
      { text: "先自己想清楚再說。", value: "I" },
      { text: "邊說邊想，透過對話釐清。", value: "E" },
      { text: "寫下來慢慢整理。", value: "I" },
      { text: "找人討論測試想法。", value: "E" },
    ],
  },

  {
    id: 5,
    question: "你對臨時被拉進討論的感受是？",
    options: [
      { text: "需要一點時間適應。", value: "I" },
      { text: "通常能快速進入狀況。", value: "E" },
      { text: "偏好事先知道內容。", value: "I" },
      { text: "臨場反應反而表現更好。", value: "E" },
    ],
  },

  {
    id: 6,
    question: "長時間沒有社交時，你比較可能？",
    options: [
      { text: "覺得狀態穩定、內在清晰。", value: "I" },
      { text: "開始覺得悶，需要互動。", value: "E" },
      { text: "享受獨處的節奏。", value: "I" },
      { text: "主動找人聊聊。", value: "E" },
    ],
  },

  /* ---------------------------------
     S / N｜資訊處理（7–12）
  ---------------------------------- */

  {
    id: 7,
    question: "面對新資訊時，你第一步通常是？",
    options: [
      { text: "確認實際內容與細節。", value: "S" },
      { text: "思考它背後可能代表的意義。", value: "N" },
      { text: "看是否與過往經驗相符。", value: "S" },
      { text: "聯想到其他相關概念。", value: "N" },
    ],
  },

  {
    id: 8,
    question: "你比較信任哪一種理解方式？",
    options: [
      { text: "具體案例與可驗證事實。", value: "S" },
      { text: "整體脈絡與長期趨勢。", value: "N" },
      { text: "一步一步累積出的結論。", value: "S" },
      { text: "對未來走向的直覺。", value: "N" },
    ],
  },

  {
    id: 9,
    question: "聽人說明複雜概念時，你會？",
    options: [
      { text: "抓住關鍵定義與流程。", value: "S" },
      { text: "先理解整體方向再補細節。", value: "N" },
      { text: "關注實際如何操作。", value: "S" },
      { text: "思考可能的延伸與影響。", value: "N" },
    ],
  },

  {
    id: 10,
    question: "你比較容易被什麼吸引？",
    options: [
      { text: "能立刻派上用場的資訊。", value: "S" },
      { text: "能打開新視角的想法。", value: "N" },
      { text: "實際改善現況的方法。", value: "S" },
      { text: "尚未被完全說清楚的可能性。", value: "N" },
    ],
  },

  {
    id: 11,
    question: "當計畫出現變數時，你會？",
    options: [
      { text: "回到原本的步驟檢查哪裡出錯。", value: "S" },
      { text: "重新思考整體方向是否要調整。", value: "N" },
      { text: "修正具體執行方式。", value: "S" },
      { text: "嘗試不同的可能路線。", value: "N" },
    ],
  },

  {
    id: 12,
    question: "你怎麼判斷一個想法是否可行？",
    options: [
      { text: "是否有實際成功案例。", value: "S" },
      { text: "是否符合長期發展邏輯。", value: "N" },
      { text: "能否在現有條件下執行。", value: "S" },
      { text: "是否能帶來新的突破。", value: "N" },
    ],
  },

  /* ---------------------------------
     T / F｜決策依據（13–18）
  ---------------------------------- */

  {
    id: 13,
    question: "當你的判斷可能讓人不舒服，但對結果有利時？",
    options: [
      { text: "仍然說出關鍵判斷。", value: "T" },
      { text: "嘗試用不傷人的方式表達。", value: "F" },
      { text: "衡量後果再決定是否開口。", value: "T" },
      { text: "優先顧及對方感受。", value: "F" },
    ],
  },

  {
    id: 14,
    question: "做決定時，你更在意？",
    options: [
      { text: "是否符合邏輯與公平性。", value: "T" },
      { text: "是否影響人際關係。", value: "F" },
      { text: "是否站得住腳。", value: "T" },
      { text: "是否讓人感到被尊重。", value: "F" },
    ],
  },

  {
    id: 15,
    question: "你如何看待衝突？",
    options: [
      { text: "必要時是釐清問題的方式。", value: "T" },
      { text: "會盡量避免，除非無法忽視。", value: "F" },
      { text: "只要有助於結果可以接受。", value: "T" },
      { text: "容易讓人受傷，需要謹慎。", value: "F" },
    ],
  },

  {
    id: 16,
    question: "別人向你求助時，你通常會？",
    options: [
      { text: "分析問題並給出建議。", value: "T" },
      { text: "先理解對方情緒。", value: "F" },
      { text: "指出關鍵盲點。", value: "T" },
      { text: "陪對方把感受說完。", value: "F" },
    ],
  },

  {
    id: 17,
    question: "你比較難接受哪一種狀況？",
    options: [
      { text: "決策缺乏一致邏輯。", value: "T" },
      { text: "他人被忽略或受傷。", value: "F" },
      { text: "情緒凌駕事實。", value: "T" },
      { text: "過於冷漠的處理方式。", value: "F" },
    ],
  },

  {
    id: 18,
    question: "回顧重要決定時，你通常檢討的是？",
    options: [
      { text: "判斷是否足夠理性。", value: "T" },
      { text: "是否照顧到所有人。", value: "F" },
      { text: "邏輯是否完整。", value: "T" },
      { text: "關係是否被影響。", value: "F" },
    ],
  },

  /* ---------------------------------
     J / P｜行動節奏（19–24）
  ---------------------------------- */

  {
    id: 19,
    question: "面對不確定的狀況，你會？",
    options: [
      { text: "盡快做出暫時決定。", value: "J" },
      { text: "保持彈性等待更多資訊。", value: "P" },
      { text: "設定明確方向再行動。", value: "J" },
      { text: "接受變動是過程的一部分。", value: "P" },
    ],
  },

  {
    id: 20,
    question: "你偏好哪種工作狀態？",
    options: [
      { text: "有清楚計畫與期限。", value: "J" },
      { text: "依情況調整步調。", value: "P" },
      { text: "先完成再優化。", value: "J" },
      { text: "邊做邊修正。", value: "P" },
    ],
  },

  {
    id: 21,
    question: "計畫被打亂時，你的反應是？",
    options: [
      { text: "感到焦慮，需要重新安排。", value: "J" },
      { text: "順勢調整，不太受影響。", value: "P" },
      { text: "立刻找替代方案。", value: "J" },
      { text: "觀察變化再決定。", value: "P" },
    ],
  },

  {
    id: 22,
    question: "你如何看待截止期限？",
    options: [
      { text: "是推動行動的重要工具。", value: "J" },
      { text: "只是參考，不必過度拘泥。", value: "P" },
      { text: "能讓事情有結果。", value: "J" },
      { text: "容易限制彈性。", value: "P" },
    ],
  },

  {
    id: 23,
    question: "臨時機會出現時，你會？",
    options: [
      { text: "評估是否符合原本計畫。", value: "J" },
      { text: "視情況嘗試看看。", value: "P" },
      { text: "確認風險後再行動。", value: "J" },
      { text: "先把握再說。", value: "P" },
    ],
  },

  {
    id: 24,
    question: "完成一件事後，你通常會？",
    options: [
      { text: "立刻整理並畫下句點。", value: "J" },
      { text: "看看是否還有可調整空間。", value: "P" },
      { text: "準備下一步計畫。", value: "J" },
      { text: "讓事情自然收尾。", value: "P" },
    ],
  },
];
