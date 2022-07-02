import fetch from 'node-fetch';

fetch('https://www.google.com')
.then(response => {
    return response.text();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log("失敗しました");
});