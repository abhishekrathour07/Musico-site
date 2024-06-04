// // const API_ARTIST = `https://saavn.dev/api/search/artists?query=neha+kakkar`

// const data = ` https://saavn.dev/api/search/artists?query=Adele`

// console.log('helloguys');
// const fetchArtistsFromApi = async () => {
//     try {
//         fetch(data).then(response => {
//             return response.json();
//         })
//             .then(data => {
//                 console.log(data);
//                 if (data.succcess) {
//                     const artist = data.data
//                     const parentElement = document.getElementById('artists');
//                     artist.forEach(eachartish => {
//                         return parentElement.innerHTML += `<div class="Top-artists">
//                     <div class="song1 max-w-[100%] w-[8rem] p-4 h-auto bg-white ">
//                         <img src="./images/image 1.png" alt="track1" class="w-[100px] h-[100px]">
//                         <img src="./images/yellow-icon.png" alt="pause"
//                             class="max-w-[100%] w-8  ml-14 -mt-9 align-top cursor-pointer">
//                         <p class="text-sm  p-1 text-center font-bold">Just hits</p>
//                     </div>
//                     </div>`

//                     });

//                 }
//             })
//     } catch (error) {

//     }
// }
// fetchArtistsFromApi();
