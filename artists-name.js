const API_ARTIST = `https://saavn.dev/api/search?query=`;

let songId;
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
                const imageUrl = song.image.find((image) => image.quality === '500x500').url;
                console.log(imageUrl);
                const songName = song.title;
                console.log(songName);
               songId  = song.id;
                // Append the song data to the DOM
                // parentElement.innerHTML += ` 
                //     <div  
                //     class="fav1 h-14 w-auto bg-yellow-200 rounded-lg mx-2 flex justify-between items-center mt-2 sm:px-5 px-2">
                //         <img src="${imageUrl}" alt="" class="h-10 rounded-[50%] w-12 ">
                //         <p class="text-sm font-bold sm:text-md lg:text-lg">${songName}</p>
                //         <div class="flex gap-4">
                //             <div class="w-11 h-11 bg-yellow-300 flex justify-center items-center rounded-[50%] cursor-pointer">
                //                 <img src="./images/play.png" alt="" class="h-6 ">
                //             </div>
                //             <div class="w-11 h-11 bg-yellow-300 flex justify-center items-center rounded-[50%] cursor-pointer">
                //                 <img src="./images/downloads.png" alt="" class="h-6 ">
                //             </div>
                //         </div>
                //     </div>`;
            });
        }
    } catch (error) {
        console.log("Got error like :", error);
    }
};

const navigateToEachArtist = (songId) => {
    window.location.href = `./SongsPlayer.html?songId=${songId}`;
};

let artist = document.querySelectorAll("#artist");
let artistName;

artist.forEach((eachArtist) => {
    eachArtist.addEventListener("click", () => {
        let name = eachArtist.querySelector(".singers");
        console.log(name.innerHTML);
        artistName = name.innerHTML;
        fetchDataFromAPI();
        // navigateToEachArtist(songId)
    });
});

const api11 = "https://saavn.dev/api/artists/1274170/albums";
async function fetcha() {
    console.log('coming fetcha');
    let res = await fetch(api11);
    let d =  await res.json();
    console.log(d);

}

fetcha();
