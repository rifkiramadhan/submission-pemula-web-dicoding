//inisialiasi variabel untuk menampung elemen dokumen
const localTotalVictoryField = document.getElementById("local-total-victory-field");
const localMaximumAttempField = document.getElementById("local-maximum-attemp-field");
const destroyDataButton = document.getElementById("destroy-data-button");
const playButton = document.getElementById("play-button");
const beforeGameDisplay = document.getElementById("before-game-display");
const duringGameDisplay = document.getElementById("during-game-display");
const afterGameDisplay = document.getElementById("after-game-display");
const answerButton1 = document.getElementById("answer-1-button");
const answerButton2 = document.getElementById("answer-2-button");
const answerButton3 = document.getElementById("answer-3-button");
const sessionUserAnswerField = document.getElementById("session-user-answer-field");
const sessionUserWrongAnswerField = document.getElementById("session-user-wrong-answer-field");
const sessionTrueAnswerField = document.getElementById("session-true-answer-field");
const sessionUserAttempsField = document.getElementById("session-user-attemps-amount-field");

//inisialisasi fungsi untuk menghasilkan jawaban permainan
function getAnswer() {
    let answer = "123".split("");
    for(let i = 0; i < answer.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = answer[i];
        answer[i] = answer[j];
        answer[j] = tmp;
    }
    return answer.join("");
}

//inisialiasi key untuk session storage
const sessionAnswerKey = "SESSION_ANSWER";
const sessionUserAttempsKey = "SESSION_USER_ATTEMPS";

//inisialisasi key untuk local storage
const localTotalVictoryKey = "LOCAL_TOTAL_VICTORIES_PLAYED";
const localMaximumAttempsKey = "LOCAL_MAXIMUM_ATTEMPTS";

window.addEventListener("load", function(){
    if (typeof(Storage) !== "undefined") {
        // inisiliasi semua item web storage yang kita akan gunakan jika belum ada
        if (sessionStorage.getItem(sessionAnswerKey) === null){
            sessionStorage.setItem(sessionAnswerKey, "");
        }if (sessionStorage.getItem(sessionUserAttempsKey) === null){
            sessionStorage.setItem(sessionUserAttempsKey, 0);
        }if (localStorage.getItem(localTotalVictoryKey) === null){
            localStorage.setItem(localTotalVictoryKey, 0);
        }if (localStorage.getItem(localMaximumAttempsKey) === null){
            localStorage.setItem(localMaximumAttempsKey, 0)
        }
    }else{
        alert("Browser yang Anda gunakan tidak mendukung Web Storage")
    }
    // inisialiasi semua nilai field pada dokumen yang menggunakan nilai dari web storage
    sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
    localMaximumAttempField.innerText = localStorage.getItem(localMaximumAttempsKey);
});

playButton.addEventListener("click", function(){
    sessionStorage.setItem(sessionAnswerKey, getAnswer());
    beforeGameDisplay.setAttribute("hidden", true);
    duringGameDisplay.removeAttribute("hidden");
});

answerButton1.addEventListener("click", function(){
    sessionUserAnswerField.innerText += "1";
    if (sessionUserAnswerField.innerText.length == 3){
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton2.addEventListener("click", function(){
    sessionUserAnswerField.innerText += "2";
    if (sessionUserAnswerField.innerText.length == 3){
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

answerButton3.addEventListener("click", function(){
    sessionUserAnswerField.innerText += "3";
    if (sessionUserAnswerField.innerText.length == 3){
        checkAnswer(sessionUserAnswerField.innerText);
    }
});

function checkAnswer(userGuess){
    const answer = sessionStorage.getItem(sessionAnswerKey);
    if (userGuess==answer){
        duringGameDisplay.setAttribute("hidden", true);
        afterGameDisplay.removeAttribute("hidden");
        sessionTrueAnswerField.innerText = answer;
        updateScore();
    }else{
        const previousAttempAmount = parseInt(sessionStorage.getItem(sessionUserAttempsKey));
        sessionStorage.setItem(sessionUserAttempsKey, previousAttempAmount+1);
        sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey);
        sessionUserAnswerField.innerText = "";
        sessionUserWrongAnswerField.innerText = userGuess;
    }
}

function updateScore(){
    const sessionAttempsValue = parseInt(sessionStorage.getItem(sessionUserAttempsKey));
    const localAttempsValue = parseInt(localStorage.getItem(localMaximumAttempsKey));
    if (sessionAttempsValue > localAttempsValue){
            localStorage.setItem(localMaximumAttempsKey, sessionAttempsValue);
            localMaximumAttempField.innerText = sessionAttempsValue;
        }
    const previousTotalVictoryAmount = parseInt(localStorage.getItem(localTotalVictoryKey));
    localStorage.setItem(localTotalVictoryKey, previousTotalVictoryAmount+1);
    localTotalVictoryField.innerText = localStorage.getItem(localTotalVictoryKey);
}

window.addEventListener("beforeunload", function(){
    sessionUserAnswerField.innerText = "";
    sessionUserWrongAnswerField.innerText = "";
    sessionStorage.setItem(sessionUserAttempsKey, 0);
    sessionUserAttempsField.innerText = sessionStorage.getItem(sessionUserAttempsKey);
});

destroyDataButton.addEventListener("click", function(){
    sessionStorage.removeItem(sessionAnswerKey);
    sessionStorage.removeItem(sessionUserAttempsKey);
    localStorage.removeItem(localTotalVictoryKey);
    localStorage.removeItem(localMaximumAttempsKey);
    alert("Mohon me-refresh halaman ini kembali");
});