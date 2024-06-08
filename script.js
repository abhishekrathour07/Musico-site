
let menu = document.querySelector(".menu")  //targeting favourite songs btm 
let container = document.querySelector(".left-container"); //whole container of html page
let sideBar = document.querySelector('.right-container') // favourite songs pop-ups 
let sidevalue = 1;
// Making copy of all te element avilable in sidebar div
let sideBarHTML = sideBar.outerHTML;

menu.addEventListener('click', () => {
    if (sidevalue == 1) {
        container.style.width = '100%';
        sideBar.remove();
        sidevalue = 0;
    } else {
        container.style.width = '76%';
        // Re-insert the sideBar element in the container class
        container.insertAdjacentHTML('afterend', sideBarHTML);
        sideBar = document.querySelector('.right-container');
        sidevalue = 1;
    }
})

// geting song from api

let api = 'https://saavn.dev/api/search/songs?query';
let songInfo;
let playMySong;

let recentsongs = document.querySelectorAll('.song');

recentsongs.forEach((song) => {
    song.addEventListener('click', (e) => {
        let songImage = song.querySelector('.songs-img');
        let songName = song.querySelector('.song-name');
        let playBtn = song.querySelector('.play-song');

        console.log(songName.innerHTML);

        songInfo = songName.textContent;

        async function recentPlay() {
            let response = await fetch(`${api}=${songInfo}`)
            let data = await response.json();
            console.log(data);
            playMySong = data.data.results[0].downloadUrl[2].url;
            console.log(playMySong);
        }
        recentPlay();
       


    });
});
// work on audio player to play and stop the song

let audio = new Audio("./songs/khamosiyan.mp3");
let audioplayer = document.querySelector('.play-btn')
let currenttime = document.querySelector(".current-time")
let remaintime = document.querySelector(".remain-time")
let ProgressBar = document.querySelector(".progress-bar")

// for play and pause of songs 
audioplayer.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        console.log('clicked btn');
        audio.play();
        audioplayer.src = './images/pausegold.png'
    }
    else {
        audio.pause();
        audioplayer.src = './images/play-button.png'
    }
})

// formating value in form of seconds 
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return minutes + ":" + (secs < 10 ? '0' : '') + secs;
}

// updating the seekbar by using timeupdate
audio.addEventListener('timeupdate', () => {

    progress = parseInt((audio.currentTime / audio.duration) * 100);
    // console.log(progress);
    ProgressBar.value = progress;
    currenttime.innerHTML = formatTime(audio.currentTime);
    remaintime.innerHTML = formatTime(audio.duration - audio.currentTime);

})

// By clicking progress bar match the song at particular time
ProgressBar.addEventListener('input', () => {
    audio.currentTime = ProgressBar.value * audio.duration / 100;
});


// when audio is completed the pause button automatically change into play btn
audio.addEventListener('ended', () => {
    audioplayer.src = './images/play-button.png';
});

// working on volume button 
let volume = document.querySelector('.volume');
let volumeImg = document.querySelector('.vol-img')
let volumevalue;

volume.addEventListener('input', () => {
    audio.volume = volume.value/100;
    volumevalue = volume.value;
    console.log(volume.value);
    if (volumevalue == 0) {
        volumeImg.src = "./images/mute.png"
    }
    else {
        volumeImg.src = "./images/volume.png"
    }
});







