const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const close = document.getElementById('close');

function closeNavbar(e) { //nav 영역 제외 한 나머지 공간 아무데나 클릭해도 nav 사라지도록 한다.
    if ( //토글 아이콘이 아닌 다른 영역을 눌러서 닫았을 때 처리할 내용
        document.body.classList.contains('show-nav') && //nav가 표시되고 있는 상태며
        //toggle을 클릭했는지가 중요한 이유는, 이 부분이 없으면 누르자마자 if문이 충족해서 바로 15줄에 가서 nav를 닫기 때문이다.
        e.target !== toggle && //toggle 버튼을 클릭하지 않았으며
        !toggle.contains(e.target) && //toggle 버튼 내에 있는 다른 요소를 클릭한 것도 아니고
        e.target !== navbar && //nav를 클릭한 것도 아니고
        !navbar.contains(e.target) //nav 내부에 다른 요소를 클릭한 것도 아니다.
    ) {
        document.body.classList.toggle('show-nav');
        document.body.removeEventListener('click', closeNavbar); 
    } else if (!document.body.classList.contains('show-nav')) { //토글 아이콘을 눌러서 닫았을 때 처리할 내용
        document.body.removeEventListener('click', closeNavbar); 
    }
}

toggle.addEventListener('click', () => { //토글 아이콘을 클릭하면 발생하는 일
    document.body.classList.toggle('show-nav'); //nav를 표시한다
    document.body.addEventListener('click', closeNavbar); //닫는 이벤트 핸들러를 등록한다.
})

open.addEventListener('click', () => modal.classList.add('show-modal'))
close.addEventListener('click', () => modal.classList.remove('show-modal'));
window.addEventListener('click', e => { //모달 창이 표시되는 상태에서 다른 곳을 클릭하면 모달 창이 사라진다.
    modal.classList.contains('show-modal') && e.target == modal ? modal.classList.remove('show-modal') : false
})