const API_ENDPOINT = 'https://saavn.dev/api/songs/yDeAS8Eh/suggestions';

let currentAudio = null;  // Store the current audio element globally
let currentplay = null;  // Store the current play button element globally

const fetchMusicsFromApi = async () => {
    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        console.log(data);

        if (data.success) {
            const songs = data.data;
            const parentElement = document.getElementById('top-suggestion');
            songs.forEach((eachSong) => {
                const thumbnailUrl = eachSong.image.find((image) => image.quality === '500x500').url;
                const streamUrl = eachSong.downloadUrl.find((downloadUrl) => downloadUrl.quality === '320kbps').url;
                parentElement.innerHTML += `<div onclick="playAudio('${streamUrl}', this, '${thumbnailUrl}', '${eachSong.name}', '${eachSong.artists.name}')" class="song">
                    <div class="song1 max-w-[100%] w-[11rem] p-3 h-auto bg-white rounded-lg ">
                        <img src="${thumbnailUrl}" alt="track1" class="w-[160px] h-[110px] rounded-lg songs-img">
                        <img src="./images/play-button.png" alt="play" class="play-song max-w-[100%] w-8  ml-16 -mt-10 align-top cursor-pointer">
                        <marquee behavior="slide" direction="left" scrollamount="5" class="text-lg mt-3 text-center font-bold song-name">${eachSong.name}</marquee>
                    </div>
                </div>`;
            });
        }
    } catch (error) {
        console.error('Error fetching music data:', error);
        
    }
}

fetchMusicsFromApi();

const playAudio = (url, element, thumbnailUrl, songName, artistName) => {
  
    if (currentAudio) {
        currentAudio.pause();
        if (currentplay) {
            currentplay.src = "./images/play-button.png";
        }
    }

    if (!currentAudio || currentAudio.src !== url) {
        currentAudio = new Audio(url);
        currentAudio.play();
        currentplay = element.querySelector('.play-song');
        currentplay.src = "./images/pausegold.png";

        document.getElementById('player-song-img').src = thumbnailUrl;
        document.getElementById('player-song-name').textContent = songName;
        document.getElementById('player-artist-name').textContent = artistName;

        const audioplayer = document.querySelector('.play-btn');
        const currenttime = document.querySelector(".current-time");
        const remaintime = document.querySelector(".remain-time");
        const ProgressBar = document.querySelector(".progress-bar");


        audioplayer.src = './images/pausegold.png';
         
        audioplayer.addEventListener('click', () => {
            if (currentAudio.paused ) {
                currentAudio.play();
                currentplay.src = './images/play-button.png';
            } else {
                currentAudio.pause();
                currentplay.src = './images/play-button.png';
            }

        });

        currentAudio.addEventListener('timeupdate', () => {
            const progress = parseInt((currentAudio.currentTime / currentAudio.duration) * 100);
            ProgressBar.value = progress;
            currenttime.innerHTML = formatTime(currentAudio.currentTime);
            remaintime.innerHTML = formatTime(currentAudio.duration - currentAudio.currentTime);
        });

        ProgressBar.addEventListener('input', () => {
            currentAudio.currentTime = ProgressBar.value * currentAudio.duration / 100;
        });

        currentAudio.addEventListener('ended', () => {
            audioplayer.src = './images/play-button.png';
            currentplay.src = './images/play-button.png';
        });

        const volume = document.querySelector('.volume');
        const volumeImg = document.querySelector('.vol-img');
        let volumevalue;

        volume.addEventListener('input', () => {
            currentAudio.volume = volume.value / 100;
            volumevalue = volume.value;
            if (volumevalue == 0) {
                volumeImg.src = "./images/mute.png";
            } else {
                volumeImg.src = "./images/volume.png";
            }
        });

    } else {
        currentAudio.pause();
        currentplay.src = "./images/play-button.png";
        currentAudio = null;
        currentplay = null;
    }
}

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return minutes + ":" + (secs < 10 ? '0' : '') + secs;
}

