const API_ARTIST = `https://saavn.dev/api/search?query=`;


let artistName;
let artistImages;
const fetchDataFromAPI = async () => {
    try {
        const response = await fetch(`${API_ARTIST}${artistName}`);
        const data = await response.json();
        console.log(data);
        if (data.success) {
            const songs = data.data.songs.results;
            let parentElement = document.getElementById("artist-song");
            console.log(parentElement);
            songs.forEach((song) => {
              let songId  = song.id;
               navigateToEachArtist(songId,artistName,artistImages);
            });
        }
    } catch (error) {
        console.log("Got error like :", error);
    }
};

const navigateToEachArtist = (songId,artName,artImages) => {
    console.log(songId,artName,artImages);
    window.location.href = `./SongsPlayer.html?songId=${songId}&artName=${artName}&artImages=${artImages}`;
};
let artist = document.querySelectorAll("#artist");

artist.forEach((eachArtist) => {
    eachArtist.addEventListener("click", () => {
        let name = eachArtist.querySelector(".singers");
        // console.log(name.innerHTML);
        artistName = name.innerHTML;
        artistImages = eachArtist.querySelector('.artistImages').src;
        // console.log(artistImages);
        fetchDataFromAPI();
      
    });
});
