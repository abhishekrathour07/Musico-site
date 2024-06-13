let menu = document.querySelector(".menu"); // Targeting favourite songs button
let container = document.querySelector(".left-container"); // Whole container of HTML page
let sideBar = document.querySelector('.right-container'); // Favourite songs pop-ups
let sidevalue = 1;

// Copy all elements available in sidebar div
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
});

// performing dark and light mode
let mode = document.querySelector(".change-mode");

mode.addEventListener('click',(e)=>{
  if(mode.innerHTML=='hello'){
    document.body.style.backgroundColor = "black";
    document.body.style.color = 'White';
  }

})



// Getting song from API
let api = 'https://saavn.dev/api/search/songs?query';


let recentsongs = document.querySelectorAll('.song');

recentsongs.forEach((song) => {
    song.addEventListener('click', () => {
        let songImage = song.querySelector('.songs-img');
        let songName = song.querySelector('.song-name');
        let playBtn = song.querySelector('.play-song');

        console.log(songName.innerHTML);

        const songInfo = songName.textContent.trim(); // Trimmed to avoid extra spaces

        async function recentPlay() {
            try {
                let response = await fetch(`${api}=${(songInfo)}`);
                let data = await response.json();
                console.log(data);
                const song = data.data.results[0].downloadUrl[3].url;
                const singername = data.data.results[0].artists.primary[0].name;
                console.log(singername);

                // Ensure the result exists
                if (song) {
                    // Set the URL to your audio player and play the song
                    audio.src = song;
                    audio.play();
                    audioplayer.src = './images/pausegold.png';
                    document.getElementById("player-song-img").src = songImage.src;
                    document.getElementById("player-song-name").innerHTML = songInfo;
                    document.getElementById("player-artist-name").innerHTML = singername;

                } else {
                    console.log('Song not found.');
                }
            } catch (error) {
                console.error('Error fetching song:', error);
            }
        }
        recentPlay();
    });
});

// Work on audio player to play and stop the song
let audio = new Audio();
let audioplayer = document.querySelector('.play-btn');
let currenttime = document.querySelector(".current-time");
let remaintime = document.querySelector(".remain-time");
let ProgressBar = document.querySelector(".progress-bar");

// For play and pause of songs 
audioplayer.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        console.log('clicked btn');
        audio.play();
        audioplayer.src = './images/pausegold.png';
    } else {
        audio.pause();
        audioplayer.src = './images/play-button.png';
    }
});

// Formatting value in form of seconds 
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return minutes + ":" + (secs < 10 ? '0' : '') + secs;
}

// Updating the seekbar by using timeupdate
audio.addEventListener('timeupdate', () => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    ProgressBar.value = progress;
    currenttime.innerHTML = formatTime(audio.currentTime);
    remaintime.innerHTML = formatTime(audio.duration - audio.currentTime);
});

// By clicking progress bar match the song at particular time
ProgressBar.addEventListener('input', () => {
    audio.currentTime = ProgressBar.value * audio.duration / 100;
});

// When audio is completed the pause button automatically changes into play button
audio.addEventListener('ended', () => {
    audioplayer.src = './images/play-button.png';
});

// Working on volume button 
let volume = document.querySelector('.volume');
let volumeImg = document.querySelector('.vol-img');
let volumevalue;

volume.addEventListener('input', () => {
    audio.volume = volume.value / 100;
    volumevalue = volume.value;
    console.log(volume.value);
    if (volumevalue == 0) {
        volumeImg.src = "./images/mute.png";
    } else {
        volumeImg.src = "./images/volume.png";
    }
});
