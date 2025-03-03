const questions = [
    {
        question: "<span class='red-highlight'>你的厚黑指數有多高？</span><br><br>發現同事錯誤影響團隊，你會？",
        options: [
            { text: "A. 直接指出，要求改正。 ", next: 1, score: 1 },
            { text: "B. 私下提醒，建議掩蓋錯誤。", next: 1, score: 3 },
            { text: "C. 假裝不知，等錯誤擴大後再解決，凸顯自己能力。", next: 1, score: 5 }
        ],
        background: 'images/default-background.jpg'
    },
    {
        question: "與對手爭客戶，你會？",
        options: [
            { text: "公平競爭，靠實力。", next:2, score: 1 },
            { text: "暗示對手弱點，影響客戶選擇。", next: 2, score: 3 },
            { text: "製造假消息打擊對手，提供「獨家優惠」搶客戶。", next: 2, score: 5 }
        ],
        background: 'images/background1.jpg'
    },
    {
        question: "上司給不合理任務，你會？",
        options: [
            { text: "直接拒絕，說明不合理。", next: 3, score: 1 },
            { text: "表面接受，私下拖延。", next: 3, score: 3 },
            { text: "積極接受，將責任推給同事，自己表現「盡心盡力」。", next: 3, score: 5 }
        ],
        background: 'images/background2.jpg'
    },
   {
        question: "朋友背叛你，你會？",
        options: [
            { text: "直接對質，斷絕關係。", next: 4, score: 1 },
            { text: "假裝不知，暗中疏遠並找機會報復。", next: 4, score: 3 },
            { text: "保持親密，利用信任設局反擊。", next: 4, score: 5 }
        ],
        background: 'images/background3.jpg'
    },
   {
        question: "需要升職，你會如何對待對手？",
        options: [
            { text: " 靠實力競爭，尊重對手。", next: -1, score: 1 },
            { text: "蒐集對手負面信息，關鍵時刻透露。", next: -1, score: 3 },
            { text: "假意合作，設局讓對手犯錯，自己展現能力。", next: -1, score: 5 }
        ],
        background: 'images/background4.jpg'
    },
   
];

// 當前問題索引
let currentQuestion = 0;  // 保存當前問題的索引，初始值為 0，表示第一個問題。
let totalScore = 0;

// 初始化問題和選項，並按三層布局顯示
function loadQuestion() {
    let questionObj = questions[currentQuestion];  // 取得當前問題
    let questionContainer = document.getElementById('question');  // 顯示問題的容器
    let topOptionsContainer = document.getElementById('options-top');  // 顯示選項的頂部容器
    let middleOptionsContainer = document.getElementById('options-middle');   // 顯示選項的中部容器
    let bottomOptionsContainer = document.getElementById('options-bottom');   // 顯示選項的底部容器

    // 檢查是否是結果頁面
    if (questionObj.result) {
        showProduct(questionObj);   // 如果是結果頁面，顯示產品內容
        return;
    }

    // 更改背景圖片，根據問題設定的背景
    changeBackground(questionObj.background);

    // 顯示問題（使用 innerHTML 確保 HTML 標籤被解析）
    questionContainer.innerHTML = questionObj.question;

    // 清空舊的選項，確保顯示新問題的選項
    topOptionsContainer.innerHTML = '';
    middleOptionsContainer.innerHTML = '';
    bottomOptionsContainer.innerHTML = '';

    // 創建選項按鈕並將它們按順序分配到三層
    questionObj.options.forEach((option, index) => {
        let button = document.createElement('button');   // 創建一個按鈕元素
        button.innerText = option.text;   // 設置按鈕文本
        button.onclick = () => chooseOption(option.next, option.score);   // 點擊按鈕後執行選擇下一個問題

        // 將選項按順序分配到不同的容器
        if (index % 3 === 0) {
            topOptionsContainer.appendChild(button);   // 第一個選項進入頂部容器
        } else if (index % 3 === 1) {
            middleOptionsContainer.appendChild(button);   // 第二個選項進入中部容器
        } else {
            bottomOptionsContainer.appendChild(button);   // 第三個選項進入底部容器
        }
    });
}



function chooseOption(nextQuestion, score) {
    totalScore += score; // 直接加上傳入的分數
    console.log("當前選擇的分數：" + score + "，累計總分：" + totalScore);
    
    if (nextQuestion === -1) {
        showResult();
    } else {
        currentQuestion = nextQuestion;
        loadQuestion();
    }
}

// 顯示最終結果
function showResult() {
    console.log("進入結果頁面，總分：" + totalScore);  // 確認是否進入結果頁面
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('product-container').style.display = 'block';

    // 隱藏所有背景圖片
    let backgroundImages = document.getElementsByClassName('background-image');
    for (let i = 0; i < backgroundImages.length; i++) {
        backgroundImages[i].style.display = 'none';  // 隱藏每個背景圖片元素
    }

  let productTitle = "<span style='font-size: 0.8em; color: #c0392b;'>你的厚黑指數分析結果如下：</span><br>";
let resultText = "";

if (totalScore <= 9) {
    resultText = "<strong style='font-size: 1.5em; color: #1E40AF;'>厚黑小白</strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>你的臉皮還很薄，內心還不夠黑，<br>適合走正道，但在現實社會可能容易吃虧。</span><br>" + 
                 "<span style='color: #D97706;'>對應人物：項羽</span>";
} else if (totalScore <= 14) {
    resultText = "<strong style='font-size: 1.5em; color: #1E40AF;'>厚黑學徒</strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>你已經掌握了一些厚黑學的技巧，<br>懂得如何平衡道德與現實。</span><br>" + 
                 "<span style='color: #D97706;'>對應人物：劉備</span>";
} else if (totalScore <= 19) {
    resultText = "<strong style='font-size: 1.5em; color: #1E40AF;'>厚黑高手</strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>你的臉皮夠厚，心夠黑，<br>知道怎樣在亂世中求生存，但還沒有到達巔峰。</span><br>" + 
                 "<span style='color: #D97706;'>對應人物：孫權</span>";
} else {
    resultText = "<strong style='font-size: 1.5em; color: #1E40AF;'>厚黑宗師</strong><br>" + 
                 "<span style='font-size: 0.8em; color: #4B5563;'>你已經深諳厚黑之道，<br>能夠運用策略操控局勢，成就大業。</span><br>" + 
                 "<span style='color: #D97706;'>對應人物：司馬懿</span>";
}



    // 顯示產品信息
    document.getElementById('product-title').innerHTML = `<span class="red-highlight">${productTitle}</span>${resultText}`;
    let productImage = document.getElementById('product-image');
    productImage.src = `images/products/result.jpg`;  // 結果頁面的圖片
    productImage.alt = resultText;
    productImage.parentElement.href = "https://www.morningstar.com.tw/bookinfo.aspx?bookno=1002071";  // 結果頁面的鏈接 
    document.getElementById('click-hint').style.display = 'block'; // 显示提示文本
    
}

// 動態更改背景圖片
function changeBackground(imagePath) {
    let backgroundImage = document.getElementById('background-image');
    if (imagePath && backgroundImage) {
        backgroundImage.src = imagePath;  // 動態更改圖片路徑
        backgroundImage.style.display = 'block';  // 確保圖片顯示
    } else {
        backgroundImage.style.display = 'none';  // 隱藏圖片
    }
}

// 重新開始
function restart() {
    currentQuestion = 0;   // 將當前問題重置為第一個問題
    totalScore = 0;        // 重置分數
    document.getElementById('product-container').style.display = 'none';   // 隱藏產品頁面
    document.getElementById('question-container').style.display = 'block';   // 顯示問題頁面
    loadQuestion();        // 加載第一個問題
}

// 頁面載入時自動加載第一個問題
loadQuestion();