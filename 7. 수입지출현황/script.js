const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('Text');
const amount = document.getElementById('Amount');
const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money_plus');
const moneyMinus = document.getElementById('money_minus');

const localStorageTransactions = JSON.parse( //localStorage에 저장 된 데이터를 객체 형태로 가져온다
    localStorage.getItem('transactions')
);
let transactions = localStorageTransactions !== null ? localStorageTransactions : []; //transactions : 수입지출내역 rawdata

function generateID() {
    return Math.floor(Math.random()*100000000);
}

function removeTransaction(id) {
    transactions = transactions.filter(node => node.id !== id);
    initialize(); //DOM을 최신화한다.
    updateLocalStorage(); //localStorage를 최신화한다.
}

function updateValue() {
    let sum = 0, plus = 0, minus = 0;

    transactions.forEach(node => {
        sum += node.amount;
        node.amount > 0 ? plus += node.amount : minus += node.amount
    })
    moneyPlus.innerText = `￦${plus.toLocaleString('ko-kR')}`
    moneyMinus.innerText = `￦${Math.abs(minus).toLocaleString('ko-kR')}`
    balance.innerText = `￦${sum.toLocaleString('ko-kR')}`
}

function addTransactionDOM(node) { //transaction 내용을 상세내역 란에 출력한다
    const sign = node.amount > 0 ? '+' : '-';
    const item = document.createElement('li');

    //부호에 따라 item에 class를 추가한다.
    item.classList.add(sign === '+' ? 'plus' : 'minus');

    //내부 정보를 추가한다.
    item.insertAdjacentHTML('afterbegin', 
    `
        ${node.text} <span>${sign}${Math.abs(node.amount).toLocaleString('ko-KR')}</span><button class="delete-btn" onclick="removeTransaction(${node.id})">x</button>
    `
    );

    list.appendChild(item); //DOM에 추가한다.

}

function addTransaction(e) {
    e.preventDefault();
    
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('항목명과 금액을 모두 입력해 주세요.');
    } else {
        const transaction = {
            id : generateID(),
            text : text.value,
            amount : +amount.value //숫자 형태로 typecasting 진행.
        };
        transactions.push(transaction); //새로운 객체를 내부 배열에 저장한다
        addTransactionDOM(transaction); //DOM에 삽입해서 브라우저에 출력한다

        updateValue(); //합계 란을 업데이트 한다.

        text.value = amount.value = ''; //입력란을 공란으로 만든다.
    }

    updateLocalStorage(); //localStorage를 최신화한다.
}

function initialize() {
    list.replaceChildren(); //상세 내역에서 내역을 삭제할 때 초기화 한다.
    transactions.forEach(addTransactionDOM); //localStorage에 있는 모든 정보를 브라우저에 출력한다
    updateValue(); //금액 합계를 갱신한다
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

initialize();
form.addEventListener('submit', addTransaction);