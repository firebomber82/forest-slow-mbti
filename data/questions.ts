export type MbtiValue = {
  EI?: "E" | "I";
  SN?: "S" | "N";
  TF?: "T" | "F";
  JP?: "J" | "P";
};

export interface QuestionOption {
  text: string;
  value: MbtiValue;
}

export interface Question {
  id: number;
  question: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "你走進陌生研討會場，剛坐下時你會？",
    options: [
      { text: "先觀察細節與動線。", value: { EI: "I", SN: "S", JP: "J" } },
      { text: "主動與鄰座建立小互動。", value: { EI: "E", TF: "F" } },
      { text: "推演整場可能的發展。", value: { SN: "N", TF: "T" } },
      { text: "先感受氣氛再融入。", value: { EI: "I", JP: "P" } },
    ],
  },
  {
    id: 2,
    question: "你被指派審查一份亂糟糟的文件，你的第一步？",
    options: [
      { text: "檢查格式與事實是否正確。", value: { SN: "S", TF: "T", JP: "J" } },
      { text: "重建文件的邏輯架構。", value: { SN: "N", TF: "T", JP: "J" } },
      { text: "先詢問背景與脈絡。", value: { SN: "S", TF: "F" } },
      { text: "先抓大方向後再細看。", value: { SN: "N", JP: "P" } },
    ],
  },
  {
    id: 3,
    question: "同事分享複雜產業趨勢，你的理解方式？",
    options: [
      { text: "要求提供具體案例與證據。", value: { SN: "S", TF: "T" } },
      { text: "延伸未來可能的多種情境。", value: { SN: "N", TF: "T" } },
      { text: "優先關注與專案的實際連結。", value: { SN: "S", JP: "J" } },
      { text: "先聽氛圍，之後用直覺整理。", value: { SN: "N", TF: "F", JP: "P" } },
    ],
  },
  {
    id: 4,
    question: "第一次和陌生客戶溝通，你會？",
    options: [
      { text: "用簡短具體的方式破冰。", value: { TF: "T", JP: "J" } },
      { text: "用願景切入建立全局連結。", value: { EI: "E", SN: "N" } },
      { text: "觀察對方反應調整節奏。", value: { TF: "F", EI: "I" } },
      { text: "順著對方風格走。", value: { JP: "P", TF: "F" } },
    ],
  },
  {
    id: 5,
    question: "新專案 kickoff，你最在意？",
    options: [
      { text: "分工、流程、節奏必須清楚。", value: { JP: "J", SN: "S", TF: "T" } },
      { text: "整體願景與長期影響。", value: { SN: "N", EI: "E" } },
      { text: "團隊氛圍與合作默契。", value: { TF: "F", EI: "I" } },
      { text: "彈性度以及是否可調整。", value: { JP: "P", SN: "N" } },
    ],
  },
  {
    id: 6,
    question: "有人提出你不同意的提案時，你會？",
    options: [
      { text: "要求邏輯與數據再判斷。", value: { TF: "T", JP: "J" } },
      { text: "先理解他的動機與感受。", value: { TF: "F", EI: "I" } },
      { text: "試著找折衷解法。", value: { TF: "F", JP: "P" } },
      { text: "直接提出你認為最好的方案。", value: { TF: "T", EI: "E" } },
    ],
  },
  {
    id: 7,
    question: "開會時聽到兩人意見衝突，你會？",
    options: [
      { text: "看哪一方邏輯較穩。", value: { TF: "T", JP: "J" } },
      { text: "試著讓情緒降溫。", value: { TF: "F", EI: "I" } },
      { text: "記錄重點，會後整合。", value: { JP: "J", EI: "I" } },
      { text: "看氣氛再決定是否介入。", value: { JP: "P", SN: "N" } },
    ],
  },
  {
    id: 8,
    question: "遇到臨時變動，你的反應？",
    options: [
      { text: "先確認原計畫是否受影響。", value: { JP: "J", SN: "S" } },
      { text: "看是否可替代成更好的方案。", value: { SN: "N", TF: "T" } },
      { text: "了解變動原因再調整心態。", value: { TF: "F", JP: "P" } },
      { text: "冷靜分析背後結構。", value: { SN: "N", TF: "T" } },
    ],
  },
  {
    id: 9,
    question: "如果你是整合專案的人，你會採用什麼管理方式？",
    options: [
      { text: "明確規範與期限。", value: { JP: "J", SN: "S" } },
      { text: "只要大方向一致，可自由運作。", value: { SN: "N", JP: "P" } },
      { text: "多聽意見後做結論。", value: { TF: "F", EI: "I" } },
      { text: "用數據與模型強化執行。", value: { TF: "T", JP: "J" } },
    ],
  },
  {
    id: 10,
    question: "面對壓力時你的模式？",
    options: [
      { text: "拆解工作並逐項完成。", value: { JP: "J", TF: "T" } },
      { text: "推演最差與最好情況。", value: { SN: "N", TF: "T" } },
      { text: "找可信賴的人討論感受。", value: { TF: "F", EI: "I" } },
      { text: "先冷靜等待直覺。", value: { JP: "P", SN: "N" } },
    ],
  },
  {
    id: 11,
    question: "團隊討論越吵越亂時，你會？",
    options: [
      { text: "要求大家回到主題。", value: { TF: "T", JP: "J" } },
      { text: "讓大家輪流說完。", value: { TF: "F", EI: "I" } },
      { text: "先讓資訊流動再整理。", value: { JP: "P", SN: "N" } },
      { text: "協助將焦點拉回目的。", value: { TF: "T", EI: "I" } },
    ],
  },
  {
    id: 12,
    question: "你收到一份重要資料，但內容很少，你會？",
    options: [
      { text: "要求補齊資訊。", value: { SN: "S", JP: "J" } },
      { text: "快速推論方向。", value: { SN: "N", TF: "T" } },
      { text: "找熟悉的人了解脈絡。", value: { SN: "S", TF: "F" } },
      { text: "先做簡易模型試跑。", value: { TF: "T", JP: "P" } },
    ],
  },
  {
    id: 13,
    question: "團隊要選今天晚餐，你會？",
    options: [
      { text: "提出效率最高的選項。", value: { TF: "T", JP: "J" } },
      { text: "看大家 mood 再決定。", value: { TF: "F", JP: "P" } },
      { text: "提出 2–3 個選項讓大家 vote。", value: { JP: "J", TF: "F" } },
      { text: "跟大家走但心裡有偏好。", value: { EI: "I", JP: "P" } },
    ],
  },
  {
    id: 14,
    question: "新成員加入團隊，你會？",
    options: [
      { text: "提供清楚 onboarding 文件。", value: { JP: "J", SN: "S" } },
      { text: "先讓他跟大家熟起來。", value: { TF: "F", EI: "E" } },
      { text: "觀察他的風格。", value: { EI: "I", SN: "N" } },
      { text: "了解他能補什麼能力缺口。", value: { SN: "N", TF: "T" } },
    ],
  },
  {
    id: 15,
    question: "你在完成任務後最常有的感受？",
    options: [
      { text: "是否達到預期品質。", value: { JP: "J", TF: "T" } },
      { text: "整體意義是什麼。", value: { SN: "N", TF: "F" } },
      { text: "團隊配合是否順利。", value: { TF: "F", EI: "I" } },
      { text: "先休息等待靈感。", value: { JP: "P", SN: "N" } },
    ],
  },
  {
    id: 16,
    question: "第一次到一個城市旅行，你會？",
    options: [
      { text: "照行程逐點完成。", value: { JP: "J", SN: "S" } },
      { text: "依照氣氛漫步。", value: { JP: "P", TF: "F" } },
      { text: "找當地人推薦特色。", value: { EI: "E", SN: "S" } },
      { text: "看評論後優化路線。", value: { JP: "J", TF: "T" } },
    ],
  },
  {
    id: 17,
    question: "工作中你最討厭的是？",
    options: [
      { text: "沒有明確資訊或規格。", value: { JP: "J", SN: "S" } },
      { text: "過度僵化、不能改。", value: { JP: "P", SN: "N" } },
      { text: "氣氛緊繃或衝突。", value: { TF: "F", EI: "I" } },
      { text: "低效率、浪費時間。", value: { JP: "J", TF: "T" } },
    ],
  },
  {
    id: 18,
    question: "你要準備一場重要簡報，你會？",
    options: [
      { text: "撰寫逐頁詳細內容。", value: { JP: "J", SN: "S" } },
      { text: "做架構即可，臨場發揮。", value: { JP: "P", SN: "N" } },
      { text: "收集外界案例。", value: { SN: "S", TF: "F" } },
      { text: "用數據模型強化說服力。", value: { TF: "T", JP: "J" } },
    ],
  },
  {
    id: 19,
    question: "你和人討論時最常注意什麼？",
    options: [
      { text: "對方細節、語氣、用字。", value: { SN: "S", EI: "I" } },
      { text: "整體邏輯與結構。", value: { SN: "N", TF: "T" } },
      { text: "情緒與需求。", value: { TF: "F", EI: "E" } },
      { text: "對話節奏與能量。", value: { SN: "N", JP: "P" } },
    ],
  },
  {
    id: 20,
    question: "你對新點子的反應？",
    options: [
      { text: "先檢查是否可行。", value: { TF: "T", SN: "S" } },
      { text: "想像未來能衍生什麼。", value: { SN: "N", TF: "T" } },
      { text: "看團隊氣氛是否能接受。", value: { TF: "F", EI: "I" } },
      { text: "想試試看，不一定要結果。", value: { JP: "P", SN: "N" } },
    ],
  },
  {
    id: 21,
    question: "你收到三個急件，你會？",
    options: [
      { text: "立刻排序並拆解行動。", value: { JP: "J", TF: "T" } },
      { text: "依直覺選第一個開始。", value: { JP: "P", SN: "N" } },
      { text: "先了解脈絡。", value: { SN: "S", TF: "F" } },
      { text: "建立簡易框架後開始。", value: { TF: "T", JP: "J" } },
    ],
  },
  {
    id: 22,
    question: "陌生環境中的自然狀態？",
    options: [
      { text: "靜靜觀察後再加入。", value: { EI: "I", SN: "S" } },
      { text: "快速融入並互動。", value: { EI: "E", TF: "F" } },
      { text: "探索整體 pattern。", value: { SN: "N", EI: "I" } },
      { text: "看環境自然調整。", value: { JP: "P", TF: "F" } },
    ],
  },
  {
    id: 23,
    question: "協助別人解決問題時，你最先做什麼？",
    options: [
      { text: "分析問題原因與線索。", value: { TF: "T", SN: "S" } },
      { text: "理解他的情緒與需求。", value: { TF: "F", EI: "I" } },
      { text: "思考問題背後的深層結構。", value: { SN: "N", TF: "T" } },
      { text: "先問他真正想得到什麼。", value: { TF: "F", JP: "P" } },
    ],
  },
  {
    id: 24,
    question: "看到混亂情境時你的直覺是？",
    options: [
      { text: "想把事情整理有序。", value: { JP: "J", SN: "S" } },
      { text: "觀察等靈感出現。", value: { JP: "P", SN: "N" } },
      { text: "找出核心問題。", value: { TF: "T", SN: "N" } },
      { text: "先確保大家都 ok。", value: { TF: "F", EI: "I" } },
    ],
  },
];

export default questions;
