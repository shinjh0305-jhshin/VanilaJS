const show = document.getElementById('show');
const close = document.getElementById('hide');
const addContainer = document.getElementById('add-container');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addCard = document.getElementById('add-card');
const cardContainer = document.getElementById('cards-container');
const currentIdx = document.getElementById('current');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const clearBtn = document.getElementById('clear');

let currentCard = 0; //현재 보고 있는 카드 index
let cardsEl = []; //DOM 저장
let rawdata = []; //question, answer pair 저장

function getLocalStorage() { //LS에서 rawdata 가져온다
    const cards = JSON.parse(localStorage.getItem('cards'));
    rawdata = (cards === null ? [] : cards);
}

function setLocalStorage() { //rawdata를 LS에 넣는다.
    localStorage.setItem('cards', JSON.stringify(rawdata));
    window.location.reload();
}

function addCardToDom(data, index) {
    let newNode = document.createElement('div');
    newNode.classList.add('card');
    if(index === rawdata.length - 1) newNode.classList.add('active'); //항상 마지막에 추가 된 얘를 보여준다.

    newNode.insertAdjacentHTML('afterbegin', 
    `
        <div class="inner-card">   
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
        </div>
    `
    )

    newNode.addEventListener('click', () => newNode.classList.toggle('show-answer')); //플립 기능 추가
    cardsEl.push(newNode); //DOM LIST에 추가
    cardContainer.appendChild(newNode); //LS 동기화 배열에 추가
    updateCurrentIdx(); //현재 카드 index 표시기 수정
}

function updateCurrentIdx() { //현재 표시중인 카드 index 표시 부분 업데이트
    currentIdx.innerText = `${currentCard + 1} / ${rawdata.length}`;
}

show.addEventListener('click', () => { //카드 생성기 표시
    addContainer.classList.add('show');
})
close.addEventListener('click', () => { //카드 생성기 닫기
    addContainer.classList.remove('show');
})
addCard.addEventListener('click', () => { //카드 생성기에서 카드 생성 버튼 누를 때
    let newElement = {};

    if(!question.value.trim() || !answer.value.trim()) return;
    
    newElement.question = question.value;
    newElement.answer = answer.value; //입력 정보를 obj로 만든다.
    question.value = answer.value = ''; //입력 창 초기화
    rawdata.push(newElement); //LS 동기화 배열에 넣는다.
    currentCard++; //마지막으로 보여지는 카드 인덱스 수정

    addCardToDom(newElement, rawdata.length - 1); //DOM에 넣는다
    setLocalStorage(); //LS를 동기화시킨다.
})

nextBtn.addEventListener('click', () => { //다음 카드로 넘어가기
    cardsEl[currentCard].className = 'card left';

    if (currentCard >= cardsEl.length - 1) currentCard = cardsEl.length - 1;
    else currentCard++;

    cardsEl[currentCard].className = 'card active';
    updateCurrentIdx();
})

prevBtn.addEventListener('click', () => { //이전 카드로 돌아오기
    cardsEl[currentCard].className = 'card right';

    if (currentCard <= 0) currentCard = 0;
    else currentCard--;

    cardsEl[currentCard].className = 'card active';
    updateCurrentIdx();
})

clearBtn.addEventListener('click', () => { //싹 다 삭제
    localStorage.clear();
    cardContainer.replaceChildren();
    window.location.reload();
})

getLocalStorage(); //LS에서 데이터 가져온다
currentCard = rawdata.length - 1;
rawdata.forEach((data, index) => addCardToDom(data, index)); //가져온 데이터를 DOM에 넣는다.
