const API_KEY = 'API_KEY';
const baseUrl = 'https://api.pexels.com/v1/search';

const searchForm = document.getElementById('search-form');
const searchTextbox = document.getElementById('search-textbox');
const photosDiv = document.getElementById('photos-container');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      var res = JSON.parse(xhttp.responseText);
      var photoData = res.photos;

      photosDiv.innerHTML = '';
      photoData.forEach(function (photo) {
        var photoDiv = document.createElement('div');
        photoDiv.classList.add('photo-div');
        photoDiv.innerHTML = `
                            <img src=${photo.src.medium}>
                            <h4>${photo.photographer}</h4>
                        `;
        photosDiv.appendChild(photoDiv);
      });
    }
  };
  xhttp.open(
    'GET',
    `${baseUrl}?query=${searchTextbox.value}&orientation=landscape`,
    true
  );
  xhttp.setRequestHeader('Authorization', API_KEY);
  xhttp.send();
});
