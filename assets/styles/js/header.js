const musicPlayer = document.querySelector('.music___player');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');

//для скорости
const speedIndicator = document.querySelector('.speed');
const speedNumber = document.querySelector('.speed p');
const speedOptions = [1.0, 1.5, 2.0, 0.75];
let speedIndex = 0; 
//наименование и картинка
const audioTitle = document.querySelector('.music___title');
const audioImage = document.querySelector('.music___image');

//для загрузки
const progressContainer = document.querySelector('.music___player--progress');
const progress = document.querySelector('.progress');


//песни
let songs;
let songIndex = 0;

//обновить UI
function loadSong(song) {
    audioTitle.innerHTML = song.title;
    audio.src = `${song.audio}`;
    audioImage.style.backgroundImage = `url('${song.cover}')`;
}

//играет или нет
function isAudioPlaying() {
    return musicPlayer.classList.contains('playing');
}

//play 
function playAudio() {
    musicPlayer.classList.add('playing');
    playBtn.querySelector('i').classList.remove('ph-play-circle')
    playBtn.querySelector('i').classList.add('ph-pause-circle');
    //playback rate!!!!
    audio.playbackRate = `${speedOptions[speedIndex]}`;

    audio.play();
}
//pause
function pauseAudio() {
    musicPlayer.classList.remove('playing');
    playBtn.querySelector('i').classList.add('ph-play-circle')
    playBtn.querySelector('i').classList.remove('ph-pause-circle');
    audio.pause();
}

//загрузка песен
async function retrieveSongsFromServer(){
    await fetch('/audio.json')
        .then ((response) => {
            if(!response.ok){
                throw new Error('Сервер не отвечает');
            }
            return response.json();
        })
        .then((data) => {
            songs = data.songs;
            loadSong(songs[songIndex]);
        })
        .catch((error) => {
            console.error('Проблема с fetch: ', error);
        })
}
retrieveSongsFromServer()
//предыдущая
function prevSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    progress.style.width = '0%'
    isAudioPlaying() === true ? playAudio() : pauseAudio();
}

//следующая
function nextSong() {
    songIndex += 1;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    progress.style.width = '0%'
    isAudioPlaying() === true ? playAudio() : pauseAudio();
}

//кнопки
playBtn.addEventListener('click', () => {
    isAudioPlaying() ? pauseAudio() : playAudio(); 
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//скорость
function updateSpeedIndicator() {
    speedIndex += 1;
    if (speedIndex >speedOptions.length - 1) {
        speedIndex=0;
    }
    speedNumber.textContent= `${speedOptions[speedIndex]}x`;
    playAudio();
}
speedIndicator.addEventListener('click', updateSpeedIndicator);
//загрузка
function updateProgressBar(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
function updateProgressBarPlayPosition(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = audio;
    audio.currentTime = (clickX / width) * duration;
}
audio.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', updateProgressBarPlayPosition);