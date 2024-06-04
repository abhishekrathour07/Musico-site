const API_ENDPOINT = 'https://saavn.dev/api/songs/yDeAS8Eh/suggestions';

console.log('chla ja yrr');
let playurl = "./images/play-button.png";
let currentAudio = null;  // Store the current audio element globally
let currentPlayButton = null;  // Store the current play button element globally

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
                const songId = eachSong.id;
                parentElement.innerHTML += `<div onclick="playAudio('${streamUrl}', this)" class="song">
                    <div class="song1 max-w-[100%] w-[11rem] p-3 h-auto bg-white rounded-lg ">
                        <img src="${thumbnailUrl}" alt="track1" class="w-[160px] h-[110px] rounded-lg songs-img">
                        <img src="${playurl}" alt="play" class="play-song max-w-[100%] w-8  ml-16 -mt-10 align-top cursor-pointer">
                        <marquee behavior="slide" direction="left" scrollamount="5" width='100%' class="text-lg mt-3 text-center font-bold song-name">${eachSong.name}</marquee>
                    </div>
                </div>`;
            });
        }
    } catch (error) {
        console.error('Error fetching music data:', error);
    }
}

const playAudio = (url, element) => {
    if (currentAudio) {
        currentAudio.pause();

            currentPlayButton.src = "./images/play-button.png";
    }

    if (!currentAudio) {
        currentAudio = new Audio(url);
        currentAudio.play();
        currentPlayButton = element.querySelector('.play-song');
        currentPlayButton.src = "./images/pausegold.png";
    } else {
        currentAudio.pause();
        currentPlayButton.src = "./images/play-button.png";
        currentAudio = null;
        currentPlayButton = null;
    }
}

const navigateToEachSong = (songId) => {
    window.location.href = `./SongsPlayer.html?songId=${songId}`;
}

fetchMusicsFromApi();
