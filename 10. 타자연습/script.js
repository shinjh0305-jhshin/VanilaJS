const cog = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const word = document.getElementById('word');
const input = document.getElementById('text');
const difficultySelect = document.getElementById('difficulty');
const timeLeft = document.getElementById('time');
const curScore = document.getElementById('score');
const endGame = document.getElementById('end-game-container');
const selectedDifficulty = document.getElementById('difficulty');

const words = ['association', 'steak', 'suggestion', 'poet', 'nation', 'department', 'estate', 'response', 'assumption', 'leader', 'baseball', 'drawer', 'city', 'wealth', 'disease', 'membership', 'client', 'person', 'error', 'friendship', 'definition', 'alcohol', 'advertising', 'strategy', 'reflection', 'mall', 'entry', 'quantity', 'bedroom', 'world', 'television', 'woman', 'appointment', 'map', 'population', 'category', 'king', 'recording', 'hearing', 'community', 'surgery', 'night', 'exam', 'atmosphere', 'tension', 'success', 'ratio', 'philosophy', 'championship', 'boyfriend', 'tea', 'series', 'mom', 'country', 'movie', 'proposal', 'introduction', 'security', 'apple', 'clothes', 'location', 'mud', 'emphasis', 'mood', 'ability', 'nature', 'description', 'warning', 'maintenance', 'instance', 'menu', 'freedom', 'dad', 'diamond', 'method', 'income', 'sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'dependent', 'superficial', 'quince']

let targetWord, difficulty, time = 10, score = 0;

function getTargetWord() { //랜덤한 글자를 선정한다.
    targetWord = words[Math.floor(Math.random() * words.length)];
}

function showTargetWord() { //새로운 글자를 변수에 저장하고, 화면에 보여준다
    getTargetWord();
    word.innerText = targetWord;
}

function updateScore() { //점수를 1점 올린다
    score++;
    curScore.innerText = `${score}점`
}

function updateTime() { //시간을 매 초 마다 변경 및 단어 완성마다 추가시킨다
    time--;
    timeLeft.innerText = `${time}s`

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() { //게임 오버 후 메시지 창을 띄운다
    endGame.insertAdjacentHTML('afterbegin', 
    `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `
    )

    endGame.style.display = 'flex';
}


cog.onclick = function() { //난이도 부분 감추기
    settings.classList.toggle('hide');
}

input.oninput = function(e) { //글자 입력
    const inText = e.target.value;
    
    if (inText === targetWord) {
        e.target.value = ''

        if (difficulty === 'hard') time += 2; //난이도에 따라 추가 부여 시간을 달리한다.
        else if (difficulty === 'medium') time += 3;
        else time += 5;

        updateTime(); //변경 된 잔여 시간을 업데이트한다
        updateScore(); //점수를 갱신한다.
        showTargetWord(); //새로운 단어를 보여준다.
    }
}

selectedDifficulty.onchange = function(e) { //난이도 변경하고 localStorage에 저장한다.
    difficulty = e.target.value;

    if (difficulty === 'hard') time = 5;
    else if (difficulty === 'medium') time = 7;
    else time = 9;

    updateTime();
    localStorage.setItem('difficulty', difficulty);
}

showTargetWord(); //첫 랜덤 글자를 화면에 표시한다.
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium'; //초기 난이도 설정
difficulty = difficultySelect.value; //난이도를 내부 변수에 저장한다
const timeInterval = setInterval(updateTime, 1000); //1초마다 시간을 차감한다.


