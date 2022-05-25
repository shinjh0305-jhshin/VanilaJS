const btn = document.getElementById('toggle');
const box = document.getElementById('text-box');
const main = document.querySelector('main');
const background = document.querySelector('.background');
const voicesList = document.getElementById('voices');
const closeBtn = document.getElementById('close');
const readBtn = document.getElementById('read');
const textarea = document.getElementById('text');

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

function getVoices() { //음성 리스트를 가져와서 텍스트 입력기에 넣는다.
    voices = speechSynthesis.getVoices();
   
    const fragment = document.createDocumentFragment();
    
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`

        if (voice.lang === "ko-KR" && voice.localService === false) { //기본 목소리를 더 이쁜 목소리로 바꾼다.
            message.voice = voice;
            option.setAttribute("selected", "");
        }

        fragment.appendChild(option);
    })

    voicesList.appendChild(fragment);
}

closeBtn.addEventListener('click', () => { //텍스트 입력기 창 닫기
    box.classList.remove('show');
    background.classList.remove('dark');
})

readBtn.addEventListener('click', () => { //텍스트 입력기의 텍스트 읽기
    setTextMessage(textarea.value);
    speakMessage();
})

voicesList.addEventListener('change', (e) => { //음성 변경
    message.voice = voices.find(voice => voice.name === e.target.value);
})

btn.onclick = function() { //텍스트 입력기를 보여준다.
    box.classList.add('show');
    background.classList.add('dark');
}

//getVoice가 비동기적으로 진행되는 점을 감안해,
//voice 리스트가 바뀌면 호출되는 함수다.
speechSynthesis.addEventListener('voiceschanged', getVoices);

//getVoices();
