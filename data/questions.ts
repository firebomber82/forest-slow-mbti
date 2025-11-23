// data/questions.ts

export type QuestionOption = {
  key: string;
  text: string;
  dimension: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
};

export type Question = {
  id: string;
  title: string;
  text: string;
  options: QuestionOption[];
};

const questions: Question[] = [
  {
    id: "Q1",
    title: "起床 KPI：你跟鬧鐘的關係",
    text: "早上鬧鐘響了，你第一個反應是？",
    options: [
      { key: "A", text: "抓起手機，看一下訊息跟社群", dimension: "E" },
      { key: "B", text: "馬上看今天排程", dimension: "E" },
      { key: "C", text: "躺著整理心情一下", dimension: "I" },
      { key: "D", text: "再睡五分鐘", dimension: "I" },
    ],
  },
  {
    id: "Q2",
    title: "通勤模式：你怎麼觀察世界",
    text: "通勤路上，你通常在幹嘛？",
    options: [
      { key: "A", text: "注意路況、時間、轉車點", dimension: "S" },
      { key: "B", text: "看手機整理待辦事項", dimension: "S" },
      { key: "C", text: "腦袋飄到未來劇情與可能性", dimension: "N" },
      { key: "D", text: "啟動內心小劇場：想像不同情境", dimension: "N" },
    ],
  },
  {
    id: "Q3",
    title: "早上開會：你怎麼處理問題",
    text: "臨時被叫進討論，你通常怎麼發言？",
    options: [
      { key: "A", text: "先看資料，有憑有據再講", dimension: "T" },
      { key: "B", text: "先穩氣氛，避免弄硬整場", dimension: "F" },
      { key: "C", text: "直球分析：什麼最有效？", dimension: "T" },
      { key: "D", text: "先顧到大家感受再提意見", dimension: "F" },
    ],
  },
  {
    id: "Q4",
    title: "排程習慣：你怎麼管理一天",
    text: "面對今天的行程，你比較像？",
    options: [
      { key: "A", text: "昨天就排好，今天照表操課", dimension: "J" },
      { key: "B", text: "至少抓出 2～3 件一定要完成的重點", dimension: "J" },
      { key: "C", text: "看心情決定先做什麼", dimension: "P" },
      { key: "D", text: "走一步算一步的流動派", dimension: "P" },
    ],
  },
  {
    id: "Q5",
    title: "上午被打斷：你怎麼回應中斷",
    text: "你正在做事，有人突然來聊天，內心反應？",
    options: [
      { key: "A", text: "耶，有人來救我脫離無聊", dimension: "E" },
      { key: "B", text: "順便交流一下也不錯", dimension: "E" },
      { key: "C", text: "可以…但等一下我要回去集中", dimension: "I" },
      { key: "D", text: "微崩但表面親切回答", dimension: "I" },
    ],
  },
  {
    id: "Q6",
    title: "資訊接收風格：你怎麼吸收訊息",
    text: "聽到一件新事情，你先注意什麼？",
    options: [
      { key: "A", text: "具體細節：時間、流程、規則", dimension: "S" },
      { key: "B", text: "成本、風險、難度這些實際點", dimension: "S" },
      { key: "C", text: "這件事的意義、長期影響", dimension: "N" },
      { key: "D", text: "會不會變成新故事/契機", dimension: "N" },
    ],
  },
  {
    id: "Q7",
    title: "有人情緒不好：你怎麼回應",
    text: "朋友/同事跟你說：我今天好累…你會？",
    options: [
      { key: "A", text: "分析原因，找解法", dimension: "T" },
      { key: "B", text: "陪他罵、先讓情緒出來", dimension: "F" },
      { key: "C", text: "想著如何避免下次再累", dimension: "T" },
      { key: "D", text: "專心聽他說話、給溫度", dimension: "F" },
    ],
  },
  {
    id: "Q8",
    title: "午餐決策：你怎麼做選擇",
    text: "中午「吃什麼」的戰役，你會？",
    options: [
      { key: "A", text: "直接提一間：走！", dimension: "J" },
      { key: "B", text: "分析距離、排隊、預算後決定", dimension: "J" },
      { key: "C", text: "問大家想吃什麼，再順著選", dimension: "P" },
      { key: "D", text: "等大家說完，再挑當下最有感的", dimension: "P" },
    ],
  },
  {
    id: "Q9",
    title: "下午撞牆：你怎麼救自己",
    text: "下午三點開始累，你會？",
    options: [
      { key: "A", text: "找人聊天、晃晃補充能量", dimension: "E" },
      { key: "B", text: "約人一起買飲料", dimension: "E" },
      { key: "C", text: "戴耳機進入個人模式", dimension: "I" },
      { key: "D", text: "滑梗圖、安靜回血", dimension: "I" },
    ],
  },
  {
    id: "Q10",
    title: "資訊偏好：你記住的是什麼",
    text: "看影片/文章，你最容易記住？",
    options: [
      { key: "A", text: "具體做法、步驟、工具", dimension: "S" },
      { key: "B", text: "真實案例、故事發展", dimension: "S" },
      { key: "C", text: "概念、道理、背後邏輯", dimension: "N" },
      { key: "D", text: "被啟發出的新想法", dimension: "N" },
    ],
  },
  {
    id: "Q11",
    title: "別人問意見：你怎麼回",
    text: "有人問你：「我這樣做好嗎？」你的方向是？",
    options: [
      { key: "A", text: "對/錯、有效/無效", dimension: "T" },
      { key: "B", text: "你之後會不會後悔？", dimension: "F" },
      { key: "C", text: "事情本身能不能成功", dimension: "T" },
      { key: "D", text: "對關係會不會有影響", dimension: "F" },
    ],
  },
  {
    id: "Q12",
    title: "面對計畫被更動：你反應如何",
    text: "突然被改計畫，你會？",
    options: [
      { key: "A", text: "皺眉：那之前規劃白做？", dimension: "J" },
      { key: "B", text: "抱怨一下，但馬上重排", dimension: "J" },
      { key: "C", text: "也還好，人生本來就變動", dimension: "P" },
      { key: "D", text: "有點興奮：想試新東西", dimension: "P" },
    ],
  },
  {
    id: "Q13",
    title: "下班後的能量使用",
    text: "下班後，你最想？",
    options: [
      { key: "A", text: "跟朋友出去走走", dimension: "E" },
      { key: "B", text: "跟熟人小聚補社交能量", dimension: "E" },
      { key: "C", text: "直接回家充電", dimension: "I" },
      { key: "D", text: "沉浸在自己的興趣世界", dimension: "I" },
    ],
  },
  {
    id: "Q14",
    title: "面對瘋狂計畫：你的反應",
    text: "有人提了一個超狂但酷的計畫，你會？",
    options: [
      { key: "A", text: "先算成本、風險再談", dimension: "S" },
      { key: "B", text: "參考是否現實可行", dimension: "S" },
      { key: "C", text: "覺得值得試一次", dimension: "N" },
      { key: "D", text: "超想玩看看的！", dimension: "N" },
    ],
  },
  {
    id: "Q15",
    title: "別人找你的原因",
    text: "你覺得別人找你，通常因為？",
    options: [
      { key: "A", text: "我擅長解決問題", dimension: "T" },
      { key: "B", text: "我讓人安心", dimension: "F" },
      { key: "C", text: "我講話直接明快", dimension: "T" },
      { key: "D", text: "我能接住情緒", dimension: "F" },
    ],
  },
  {
    id: "Q16",
    title: "睡前關機儀式",
    text: "一天結束前，你通常怎麼收尾？",
    options: [
      {
        key: "A",
        text: "確認明天行程並初步排順序",
        dimension: "J",
      },
      { key: "B", text: "想一下今天成果與明日重點", dimension: "J" },
      { key: "C", text: "滑到累了直接睡", dimension: "P" },
      {
        key: "D",
        text: "腦袋隨意飄到哪算哪自然睡著",
        dimension: "P",
      },
    ],
  },
];

export default questions;
