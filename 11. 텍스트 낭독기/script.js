const btn = document.getElementById('toggle');
const box = document.getElementById('text-box');
const main = document.querySelector('main');
const background = document.querySelector('.background');

let voices = [];
const message = new SpeechSynthesisUtterance();

const boxInfo = [
      {
        image: './img/drink.jpg',
        text: "목이 마릅니다."
      },
      {
        image: './img/food.jpg',
        text: "배가 고픕니다."
      },
      {
        image: './img/tired.jpg',
        text: "피곤합니다."
      },
      {
        image: './img/hurt.jpg',
        text: "다쳤습니다."
      },
      {
        image: './img/happy.jpg',
        text: "매우 행복합니다."
      },
      {
        image: './img/angry.jpg',
        text: "화가 납니다."
      },
      {
        image: './img/sad.jpg',
        text: "매우 슬픕니다."
      },
      {
        image: './img/scared.jpg',
        text: "무섭습니다."
      },
      {
        image: './img/outside.jpg',
        text: '밖에 나가고 싶습니다.'
      },
      {
        image: './img/home.jpg',
        text: '집에 가고 싶습니다.'
      },
      {
        image: './img/school.jpg',
        text: '학교에 가고 싶습니다.'
      },
      {
        image: './img/grandma.jpg',
        text: '할머니 댁에 가고 싶습니다.'
      }
];

(function createBox() {
    const fragment = document.createDocumentFragment();

    boxInfo.forEach(info => {
        //1. 박스를 만든다.
        const newbox = document.createElement('div');
        newbox.classList.add('box'); 

        //2. 박스 안에 이미지와 텍스트를 넣는다.
        newbox.insertAdjacentHTML('afterbegin', 
        `
            <img src="${info.image}">
            <div class="info">${info.text}</div>
        `
        )

        //3. 박스를 클릭할 때의 이벤트 핸들러를 등록한다.
        newbox.addEventListener('click', () => {
            setTextMessage(info.text);
            speakMessage();

            newbox.classList.add('active');
            setTimeout(() => {
                newbox.classList.remove('active');
            }, 800);
        })
        fragment.appendChild(newbox);
    });

    //3. DOM에 추가한다.
    main.appendChild(fragment);
}());

function setTextMessage(text) { //말할 내용을 저장한다
    message.text = text;
}
function speakMessage() { //음성 출력
    speechSynthesis.speak(message);
}

function getVoices() {
    voices = speechSynthesis.getVoices();
    console.log(voices);
}

btn.onclick = function() {
    box.classList.add('show');
    background.classList.add('dark');
}

//getVoice가 비동기적으로 진행되는 점을 감안해,
//voice 리스트가 바뀌면 호출되는 함수다.
speechSynthesis.addEventListener('voiceschanged', getVoices);

getVoices();