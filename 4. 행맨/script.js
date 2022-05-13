const word = document.getElementById('word');
const wrongLetter = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['association', 'steak', 'suggestion', 'poet', 'nation', 'department', 'estate', 'response', 'assumption', 'leader', 'baseball', 
'drawer', 'city', 'wealth', 'disease', 'membership', 'client', 'person', 'error', 'friendship', 'definition', 'alcohol', 'advertising', 'strategy', 
'reflection', 'mall', 'entry', 'quantity', 'bedroom', 'world', 'television', 'woman', 'appointment', 'map', 'population', 'category', 'king', 'recording', 
'hearing', 'community', 'surgery', 'night', 'exam', 'atmosphere', 'tension', 'success', 'ratio', 'philosophy', 'championship', 'boyfriend', 'tea', 'series', 
'mom', 'country', 'movie', 'proposal', 'introduction', 'security', 'apple', 'clothes', 'location', 'mud', 'emphasis', 'mood', 'ability', 'nature', 'description', 
'warning', 'maintenance', 'instance', 'menu', 'freedom', 'dad', 'diamond', 'method', 'income']
const correctLetters = [];
const wrongLetters = [];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true; //키보드에서 문자를 눌렀을 때, 이벤트 발생 여부를 제어한다.

playAgain.addEventListener('click', () => {
    playable = true;
    selectedWord = words[Math.floor(Math.random() * words.length)]; 

    correctLetters.splice(0); //오답, 정답 이력 전부 삭제
    displayWord(); //정답 공간 초기화
    wrongLetters.splice(0);
    displayWrongLetter(); //오답 공간 초기화
    
    popup.style.display = 'none';

    figureParts.forEach(parts => {
        parts.style.display = 'none';
    })
})

function displayWord() {
    word.replaceChildren(); //word의 하위 자식 노드 전부 제거
    word.insertAdjacentHTML('afterbegin', `${selectedWord.split('').map(letter => 
        `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
    ).join('')}`) //입력 된 글자인지 판단 후, 입력되었으면 글자를 출력한다.

    const innerWord = word.innerText.replace(/[ \n]/g, '')
    if(innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        //finalMessageRevealWord.innerText = `Answer : ${selectedWord} `
        popup.style.display = 'flex';
        playable = false; //문자열 입력 무시.
    }
}

function displayWrongLetter() {
    wrongLetter.replaceChildren(); //모든 노드 삭제
    wrongLetter.insertAdjacentHTML('afterbegin',  //오답 칸에 오답 글자를 출력한다.
        `<p>Wrong</p>${wrongLetters.map(letter => 
        `<span>${letter}</span>`).join(',')}`
    )
    
    const wrongWords = wrongLetters.length;
    figureParts.forEach((figure, index) => { //행맨의 신체부위를 하나씩 오픈한다.
        if (index < wrongWords) figure.style.display = 'block';
    })

    if(wrongWords === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
		finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
		popup.style.display = 'flex';
		playable = false;
    }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => { //전역에 이벤트 핸들러를 등록함.
    if (playable) {
        if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
            const letter = e.key.toLowerCase();

            if (selectedWord.includes(letter)) { //단어에 입력한 글자가 포함됨 (정답)
                if (!correctLetters.includes(letter)) { //처음 입력하는 글자다(글자 오픈)
                    correctLetters.push(letter);
                    displayWord();
                }
                else { //이미 입력한 글자다(중복 메시지 출력)
                    showNotification();
                }
            }
            else { //단어에 입력한 글자가 불포함됨(오답)
                if (!wrongLetters.includes(letter)) { //처음 입력하는 글자다(글자 오픈)
                    wrongLetters.push(letter);
                    displayWrongLetter();
                }
                else { //이미 입력한 글자다(중복 메시지 출력)
                    showNotification();
                }
            }
        }
    }
})

displayWord();