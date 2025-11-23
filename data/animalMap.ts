const animalMap: Record<
  string,
  {
    animal: string;
    name: string;
    title: string;
    highlight: string;
    energy: string;
    quote: string;
  }
> = {
  // 兔球系
  INFP: {
    animal: "🐇",
    name: "兔球",
    title: "柔軟內心宇宙系",
    highlight: "直覺敏銳、溫柔、有自己的一套小世界。",
    energy: "需要安靜空間、創作、幻想時間來充電。",
    quote: "我沒有在發呆，我在下載情緒更新檔。"
  },
  ISFP: {
    animal: "🐇",
    name: "兔球",
    title: "溫柔感受派",
    highlight: "很會用感覺選擇人事物，不喜歡太硬的衝突。",
    energy: "慢慢做自己喜歡的小事會回血。",
    quote: "我不一定說很多，但我都有在感受。"
  },

  // 狐狸 / 企鵝系：點子 & 冒險
  ENTP: {
    animal: "🦊",
    name: "狐狸球",
    title: "靈光乍現點子王",
    highlight: "話很多、點子很多、腦洞也很多。",
    energy: "需要新鮮話題和可以一起嘴砲的人。",
    quote: "等一下，我突然想到一個更瘋的版本。"
  },
  ENFP: {
    animal: "🐧",
    name: "企鵝球",
    title: "浪漫冒險家",
    highlight: "熱情外放、想像力爆表、超愛給別人打氣。",
    energy: "新體驗、新計畫、新旅程都會讓你滿血。",
    quote: "我先衝了，細節我們路上再想。"
  },

  // 烏龜系：穩定踏實
  ISTJ: {
    animal: "🐢",
    name: "烏龜球",
    title: "穩定系地基者",
    highlight: "做事踏實、可靠、超會顧細節與流程。",
    energy: "清楚的規則與可預期的節奏會讓你安心。",
    quote: "我不是慢，我只是在確認每一步都穩。"
  },
  ISFJ: {
    animal: "🐢",
    name: "烏龜球",
    title: "默默守護型",
    highlight: "溫柔又細心，會把大家需要的都準備好。",
    energy: "被需要、被感謝，會讓你覺得值得。",
    quote: "沒關係，我順便而已（其實很用力）。"
  },

  // 松鼠系：社交領班
  ESTJ: {
    animal: "🐿",
    name: "松鼠球",
    title: "行動派領班",
    highlight: "很會安排資源、分配事情、讓團隊動起來。",
    energy: "看到事情一件件被解決會超有成就感。",
    quote: "來，我幫你排一排，保證清楚。"
  },
  ESFJ: {
    animal: "🐿",
    name: "松鼠球",
    title: "照顧大家代表",
    highlight: "很在意氣氛和每個人的狀態，是群體黏著劑。",
    energy: "熱鬧又和諧的場合最對你味。",
    quote: "大家都有吃飽睡好嗎？"
  },

  // 貓頭鷹 / 貓 / 鹿：深度思考 & 直覺
  INTJ: {
    animal: "🦉",
    name: "貓頭鷹球",
    title: "深度策略師",
    highlight: "超愛思考、分析、規劃長期路線。",
    energy: "需要一段沒人打擾的高品質獨處時間。",
    quote: "我不是冷，我只是在模擬十種未來。"
  },
  INTP: {
    animal: "🐈",
    name: "貓球",
    title: "哲學好奇寶寶",
    highlight: "對各種概念都想拆開來研究，腦中永遠很多問號。",
    energy: "自由探索與發呆，是你最好的充電方式。",
    quote: "如果換個角度看，這件事會完全不一樣。"
  },
  INFJ: {
    animal: "🦌",
    name: "鹿球",
    title: "深情直覺系溫柔領導",
    highlight: "很能讀懂他人情緒，又想帶大家走向更好。",
    energy: "少數深度對話，比很多淺聊天更有能量。",
    quote: "我只是看起來安靜，其實腦中演了整部電影。"
  },
  ENFJ: {
    animal: "🦌",
    name: "鹿球",
    title: "溫暖帶隊長",
    highlight: "擅長鼓勵別人，看見每個人的潛力。",
    energy: "團隊氣氛好、大家有成長，你就覺得值得。",
    quote: "我想的是，我們一起變好的那個版本。"
  },

  // 熊 / 狗 / 狼：行動 & 現場派
  ISTP: {
    animal: "🐻",
    name: "熊球",
    title: "冷靜行動派",
    highlight: "臨危不亂，很會「直接動手解決」。",
    energy: "給你一點空間自己做事，你就會慢慢熱機。",
    quote: "少說話，多動手，東西就會自己好。"
  },
  ESFP: {
    animal: "🐶",
    name: "狗球",
    title: "開朗小太陽",
    highlight: "很會帶氣氛，讓場子變得好玩又不尷尬。",
    energy: "人多又歡樂的地方是你的充電站。",
    quote: "走啦～不然等一下就不想動了。"
  },
  ESTP: {
    animal: "🐺",
    name: "狼球",
    title: "實境挑戰者",
    highlight: "反應超快，喜歡直接實測而不是紙上談兵。",
    energy: "有速度、有刺激、有對手，你就會興奮。",
    quote: "先試一輪再說，資料就會自己出現。"
  },
  ENTJ: {
    animal: "🐺",
    name: "狼球",
    title: "目標導向指揮官",
    highlight: "超會抓大方向、排戰略、拉大家往前衝。",
    energy: "看到進度條前進，比什麼都重要。",
    quote: "不是不行，只是你還沒給它一個計畫。"
  }
};

export default animalMap;
