const params = new URLSearchParams(window.location.search);

for (const [key, value] of params){
  console.log(key, ': ', value);
}
console.log(params.get("songId"));