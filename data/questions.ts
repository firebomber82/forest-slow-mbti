// data/questions.ts

export type Option = {
  text: string;
  value: "A" | "B" | "C" | "D";
};

export type Question = {
  id: number;
  question: string;
  options: Option[];
  reverse?: boolean; // 之後可做一致性檢查
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Q1｜你走進陌生研討會場，剛坐下時你會？",
    options: [
      { text: "A. 先觀察四周動線與人群，找最舒服的位置。", value: "A" },
      { text: "B. 主動與鄰座打招呼，建立基本互動。", value: "B" },
      { text: "C. 看整場架構，猜測之後可能會發生什麼。", value: "C" },
      { text: "D. 等活動開始後再決定怎麼融入。", value: "D" },
    ],
  },

  {
    id: 2,
    question: "Q2｜你被指派審查一份亂糟糟的文件，你的第一步？",
    options: [
      { text: "A. 找出格式問題與事實錯誤。", value: "A" },
      { text: "B. 重建整份文件的邏輯架構。", value: "B" },
      { text: "C. 詢問團隊是否有人能提供背景資訊。", value: "C" },
      { text: "D. 先閱讀大標題掌握方向，再決定深度。", value: "D" },
    ],
  },

  {
    id: 3,
    question: "Q3｜同事分享一段複雜的產業趨勢，你的理解方式？",
    options: [
      { text: "A. 請他提供具體案例或證據。", value: "A" },
      { text: "B. 延伸思考未來可能的情境。", value: "B" },
      { text: "C. 看哪些內容與當前專案有關。", value: "C" },
      { text: "D. 先聽感覺，之後再做自己的解讀。", value: "D" },
    ],
  },

  {
    id: 4,
    question: "Q4｜第一次和陌生客戶溝通，你會？",
    options: [
      { text: "A. 用簡短具體的方式破冰。", value: "A" },
      { text: "B. 用整體願景切入，建立共同感。", value: "B" },
      { text: "C. 聽對方說話，觀察細節反應。", value: "C" },
      { text: "D. 跟著對方風格調整互動方式。", value: "D" },
    ],
  },

  {
    id: 5,
    question: "Q5｜新專案 Kickoff，你最在意？",
    options: [
      { text: "A. 明確的分工與流程。", value: "A" },
      { text: "B. 全局目標與未來影響。", value: "B" },
      { text: "C. 團隊氛圍與合作默契。", value: "C" },
      { text: "D. 有多少彈性與可調整空間。", value: "D" },
    ],
  },

  {
    id: 6,
    question: "Q6｜有人提出你不同意的提案，你會？",
    options: [
      { text: "A. 要他說明數據或邏輯再判斷。", value: "A" },
      { text: "B. 先聽他的動機、理解需求。", value: "B" },
      { text: "C. 試著提出折衷版本。", value: "C" },
      { text: "D. 直接提出你認為最好的方向。", value: "D" },
    ],
  },

  {
    id: 7,
    question: "Q7｜開會時聽到兩人衝突，你會？",
    options: [
      { text: "A. 評估哪一方邏輯更完整。", value: "A" },
      { text: "B. 嘗試先穩定雙方情緒。", value: "B" },
      { text: "C. 記錄重點，會後整理方向。", value: "C" },
      { text: "D. 看氣氛如何再決定是否介入。", value: "D" },
    ],
  },

  {
    id: 8,
    question: "Q8｜遇到臨時變動，你的思考方式？",
    options: [
      { text: "A. 先看是否影響原本計畫。", value: "A" },
      { text: "B. 評估是否有更好的替代方案。", value: "B" },
      { text: "C. 了解為何變動，再調整心態。", value: "C" },
      { text: "D. 冷靜分析背後原因。", value: "D" },
    ],
  },

  {
    id: 9,
    question: "Q9｜你是整合專案的人，你會採用哪種管理風格？",
    options: [
      { text: "A. 明確規範、固定期限。", value: "A" },
      { text: "B. 大方向即可，自由運作。", value: "B" },
      { text: "C. 多聽大家意見後再定結論。", value: "C" },
      { text: "D. 用數據與架構強化執行力。", value: "D" },
    ],
  },

  {
    id: 10,
    question: "Q10｜面對壓力時，你最常見的模式？",
    options: [
      { text: "A. 設定計畫逐項解決。", value: "A" },
      { text: "B. 想像最差與最好情境。", value: "B" },
      { text: "C. 找可信賴的人討論感受。", value: "C" },
      { text: "D. 冷靜，等直覺告訴你怎麼做。", value: "D" },
    ],
  },

  {
    id: 11,
    question: "Q11｜團隊討論越吵越亂，你會？",
    options: [
      { text: "A. 拍板定案要求回到主題。", value: "A" },
      { text: "B. 讓大家輪流講完再整合。", value: "B" },
      { text: "C. 不急著結論，先讓資訊流動。", value: "C" },
      { text: "D. 協助把焦點拉回目的。", value: "D" },
    ],
  },

  {
    id: 12,
    question: "Q12｜收到一份資訊很少的重要資料，你會？",
    options: [
      { text: "A. 要求補齊資訊。", value: "A" },
      { text: "B. 從已有內容快速推論方向。", value: "B" },
      { text: "C. 找熟悉的人了解脈絡。", value: "C" },
      { text: "D. 先建立簡易模型試跑。", value: "D" },
    ],
  },

  {
    id: 13,
    question: "Q13｜團隊要選今天晚餐，你會？",
    options: [
      { text: "A. 推效率最高的選項。", value: "A" },
      { text: "B. 看大家的 mood。", value: "B" },
      { text: "C. 提出 2-3 個選項讓大家 vote。", value: "C" },
      { text: "D. 跟著大家但自己有偏好。", value: "D" },
    ],
  },

  {
    id: 14,
    question: "Q14｜新成員加入團隊，你會？",
    options: [
      { text: "A. 準備清楚的 onboarding 文件。", value: "A" },
      { text: "B. 先讓他和大家熟起來。", value: "B" },
      { text: "C. 觀察風格再調整方式。", value: "C" },
      { text: "D. 了解他能補什麼能力缺口。", value: "D" },
    ],
  },

  {
    id: 15,
    question: "Q15｜完成一項任務後你最常有的感受？",
    options: [
      { text: "A. 是否達到預期品質。", value: "A" },
      { text: "B. 整體意義是什麼。", value: "B" },
      { text: "C. 團隊配合是否順利。", value: "C" },
      { text: "D. 先休息等下一步靈感。", value: "D" },
    ],
  },

  {
    id: 16,
    question: "Q16｜第一次到一個城市旅行，你會？",
    options: [
      { text: "A. 照行程表逐點完成。", value: "A" },
      { text: "B. 依照氣氛漫步。", value: "B" },
      { text: "C. 找當地人推薦特色。", value: "C" },
      { text: "D. 查看評論後優化路線。", value: "D" },
    ],
  },

  {
    id: 17,
    question: "Q17｜你在工作中最討厭的是？",
    options: [
      { text: "A. 沒有明確規格。", value: "A" },
      { text: "B. 過度僵化不能改。", value: "B" },
      { text: "C. 氣氛緊繃或衝突。", value: "C" },
      { text: "D. 浪費時間與低效率。", value: "D" },
    ],
  },

  {
    id: 18,
    question: "Q18｜你要準備一場重要簡報，你會？",
    options: [
      { text: "A. 撰寫逐頁細節確認。", value: "A" },
      { text: "B. 做架構即可臨場發揮。", value: "B" },
      { text: "C. 收集案例提高理解。", value: "C" },
      { text: "D. 用數據提升說服力。", value: "D" },
    ],
  },

  {
    id: 19,
    question: "Q19｜你和人討論時最常注意什麼？",
    options: [
      { text: "A. 對方細節、語氣。", value: "A" },
      { text: "B. 整體邏輯結構。", value: "B" },
      { text: "C. 對方情緒需求。", value: "C" },
      { text: "D. 對話節奏與能量。", value: "D" },
    ],
  },

  {
    id: 20,
    question: "Q20｜你對新點子的反應？",
    options: [
      { text: "A. 先檢查是否可行。", value: "A" },
      { text: "B. 想像未來衍生什麼。", value: "B" },
      { text: "C. 看團隊氣氛是否能接受。", value: "C" },
      { text: "D. 想先試試看。", value: "D" },
    ],
  },

  {
    id: 21,
    question: "Q21｜你收到三個急件，你會？",
    options: [
      { text: "A. 立刻排序拆解。", value: "A" },
      { text: "B. 用直覺挑第一個。", value: "B" },
      { text: "C. 聯絡相關人了解脈絡。", value: "C" },
      { text: "D. 先建簡易框架再開工。", value: "D" },
    ],
  },

  {
    id: 22,
    question: "Q22｜陌生環境中的自然狀態？",
    options: [
      { text: "A. 靜靜觀察後再加入。", value: "A" },
      { text: "B. 很快融入主動互動。", value: "B" },
      { text: "C. 探索整體 patterns。", value: "C" },
      { text: "D. 跟著環境節奏。", value: "D" },
    ],
  },

  {
    id: 23,
    question: "Q23｜協助別人解決問題時，你最先？",
    options: [
      { text: "A. 分析原因與線索。", value: "A" },
      { text: "B. 理解情緒與需求。", value: "B" },
      { text: "C. 想像底層結構。", value: "C" },
      { text: "D. 問他最想得到什麼。", value: "D" },
    ],
  },

  {
    id: 24,
    question: "Q24｜你看到一個混亂的情境，你的第一反應？",
    options: [
      { text: "A. 想先把事情整理有序。", value: "A" },
      { text: "B. 觀察等靈感出現。", value: "B" },
      { text: "C. 找出核心問題。", value: "C" },
      { text: "D. 想確保大家都 ok 再談解法。", value: "D" },
    ],
  },
];

export default questions;
