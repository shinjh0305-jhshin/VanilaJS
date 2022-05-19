const musicContainer = document.getElementById('music-container');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const audio = document.getElementById('audio');
const img = document.getElementById('cover');
const title = document.getElementById('title');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');


const songs = ['hey', 'summer', 'ukulele'];
let songIdx = 0;

function loadSong() { //화면에 보이는 곡 관련 정보 일체를 변경한다.
    img.src = `./img/${songs[songIdx]}.jpg`;
    audio.src = `./music/${songs[songIdx]}.mp3`
    title.innerText = songs[songIdx];
}

function playSong() {
    musicContainer.classList.add('play'); //음악 재생바가 위로 올라온다
    play.querySelector('i.fas').classList.replace("fa-play", "fa-pause");
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play'); //음악 재생바가 밑으로 내려간다
    play.querySelector('i.fas').classList.replace("fa-pause", "fa-play");
    audio.pause();
}

function prevSong() { //이전 곡으로 넘어간다
    songIdx === 0 ? songIdx = songs.length - 1 : songIdx--;
    loadSong();
    if(musicContainer.classList.contains('play')) playSong();
}

function nextSong() { //다음 곡으로 넘어간다
    songIdx === songs.length - 1 ? songIdx = 0 : songIdx++;
    loadSong();
    if(musicContainer.classList.contains('play')) playSong();
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function changeProgress(e) {
    audio.currentTime = (e.offsetX / this.clientWidth) * audio.duration;
}

//오디오 버튼에 따라 발생하는 이벤트
play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) pauseSong();
    else playSong();
});
prev.addEventListener('click', prevSong);
next.addEventListener('click', nextSong);

//재생 상태에 따라 발생하는 이벤트
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', changeProgress);

loadSong();
