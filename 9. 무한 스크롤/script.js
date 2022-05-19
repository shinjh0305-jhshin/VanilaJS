const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`); //respose 객체가 담긴 promise 객체 저장
    const data = await res.json(); //response 객체 안의 알맹이(요청 정보)가 담긴 promise 객체 저장
    return data; //알맹이만 알짜로 들어있는 promise 객체 리턴
}

async function showPosts() {
    const posts = await getPosts(); //알맹이만 알짜로 들어있는 promise 객체 받는다. 
    const fragment = document.createDocumentFragment(); 
    posts.forEach(post => { //API로부터 가져온 데이터를 하나씩 떼온다.
        const newNode = document.createElement('div'); 
        newNode.classList.add('post');
        newNode.insertAdjacentHTML('afterbegin', `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `)
        fragment.appendChild(newNode);
    })

    postsContainer.appendChild(fragment); //DOM에 출력한다.
}

function showLoading() {
    console.log('ddd');
    loading.classList.add('show'); //로딩 공 튀기는거 보여준다.

    setTimeout(() => {
        loading.classList.remove('show'); //1초 있다가 로딩 공 튀기는거 없앤다.
        setTimeout(() => {
            page++; //pagination
            showPosts(); //공 튀기는거 없앤 후 0.3초 이후 다음 post를 출력한다
        }, 300);
    }, 1000);
}

function filterPosts(e) { //문자열을 입력할 때 마다 필터를 작동시킨다.
    const target = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => { //전부 대문자로 변환해서 검사한다.
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(target) > -1 || body.indexOf(target) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}


showPosts(); //처음 post를 출력한다.
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) { //scrollHeight : 스크롤 해야 하는 양, scrollTop : 스크롤 한 양, clientHeight : 뷰포트에 보여지는 요소의 크기
        showLoading();
    }
});
filter.addEventListener('input', filterPosts);