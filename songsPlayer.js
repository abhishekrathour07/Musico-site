const params = new URLSearchParams(window.location.search);

for (const [key, value] of params) {
  console.log(key, ': ', value);
}
// console.log(params.get("artName"));
// console.log(params.get('artImages'));

const API_ARTIST = `https://saavn.dev/api/search?query=`;

let songId;
const fetchDataFromAPI = async () => {
  try {
    const artistsName = params.get('artName')
    const artImages = params.get('artImages')
    const response = await fetch(`${API_ARTIST}${artistsName}`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      const songs = data.data.songs.results;
      let parentElement = document.getElementById("artist-song");
      let SingerName = document.querySelector('.SingerName');
      SingerName.innerHTML = artistsName;
      let artistImage = document.querySelector(".singerImage");
      artistImage.src = artImages
      songs.forEach((song) => {
        const imageUrl = song.image.find((image) => image.quality === '500x500').url;
        // console.log(imageUrl);
        const songName = song.title;
        // console.log(songName);
        songId = song.id;
        // Append the song data to the DOM
        parentElement.innerHTML += ` 
                    <div  
                    class="fav1 h-14 w-auto bg-yellow-200 rounded-lg mx-2 flex justify-between items-center mt-2 sm:px-5 px-2">
                        <img src="${imageUrl}" alt="" class="h-10 rounded-[50%] w-12 ">
                        <p class="text-sm font-bold sm:text-md lg:text-lg songName">${songName}</p>
                        <div class="flex gap-4">
                            <div class="w-11 h-11 bg-yellow-300 flex justify-center items-center rounded-[50%] cursor-pointer">
                                <img src="./images/play.png" alt="" class="h-6 ">
                            </div>
                            <div class="w-11 h-11 bg-yellow-300 flex justify-center items-center rounded-[50%] cursor-pointer">
                                <img src="./images/downloads.png" alt="" class="h-6 ">
                            </div>
                        </div>
                    </div>`;
      });
    }
  } catch (error) {
    console.log("Got error like :", error);
  }
};
fetchDataFromAPI();

// Now Tring to Play Each and every Best song from the particular artist which is fetch from api 

const PlaySongs_API = "https://saavn.dev/api/search/songs?query=";

let songdata;
const fetchEachSong = async () => {
  try {
    let response = await fetch(`${PlaySongs_API}${songdata}`);
    let data = await response.json();
    console.log(data);
    if (data.success) {
      const url = data.data.results[0].downloadUrl[3].url;
      const singername = data.data.results[0].artists.primary[0].name;
      if(url){
        let audio = new Audio(url)
        audio.play()
      }
      
    }

  } catch (error) {
    console.log(`got error like this ${error}`);
  }
}

let playbleLink = document.getElementById("artist-song");


playbleLink.addEventListener('click', (e) => {
  const songElement = e.target.closest('.fav1');
  songdata = songElement.querySelector('.songName').innerHTML;
  console.log(songdata);
  fetchEachSong();

});


