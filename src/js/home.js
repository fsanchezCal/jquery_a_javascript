console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const  getUserAll = new Promise(function (todoBien,todoMal) {
  // llamar a un api
  setTimeout(function () {
    todoBien('Se acabo el timepo');
  },5000)
  
})

const  getUser = new Promise(function (todoBien,todoMal) {
  // llamar a un api
  setTimeout(function () {
    todoBien('Se acabo el timepo 3');
  },3000)
  
});

/*getUser
.then(function () { ---------------
  console.log('Hola todo bien')
})
.catch(function () {
  console.log('Hola todo mal')
})*/

Promise.race([
getUser,
getUserAll,
])
.then(function (params) {
  console.log(params)
})
.catch(function (params) {
  console.log(params)
})

$.ajax('https://randomuser.me/api/',{
  method: 'GET',
  succes: function(data) {
    console.log(data)
  },
 error:function(error) {
   console.log(error)
 }

});

fetch('https://randomuser.me/api/')
.then(function (response) {
  console.log(response)
  return response.json()
})
.then(function(user) {
  console.log('User',user.results[0])
});

(async function load() {
  //await
   async function getData(url) {
      const response = await fetch(url)
    const data = await response.json()
    return data;
   }
   const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action');
   const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama');
   const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation');
   
   
    console.log(dramaList);

    function videoItemTemplate(movie) {
      return (
        `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
    </div>`
      )
    }

    function createTemplate(HTMLString) {
      const html =  document.implementation.createHTMLDocument();
      html.body.innerHTML = HTMLString;
       return html.body.children[0]
    }
  
    //console.log( videoItemTemplate('src/images/covers/midnight.jpg','Fabian Sanchez'));
function addEventClick($element) {
  $element.addEventListener('click',function () {
      alert('hola');
  })
  
}
    
    function renderMovieList(list,$container) {
      //actionList.data.movies.
      $container.children[0].remove();
     list.map((movie) => {
        const HTMLString = videoItemTemplate(movie);
        const movieElemmet = createTemplate(HTMLString)
        
  
        $container.append(movieElemmet)
        addEventClick(movieElemmet);
        //console.log(HTMLString)
      }) 
    }
    const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList.data.movies,$actionContainer)

    
    
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList.data.movies,$dramaContainer);

    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList.data.movies,$animationContainer);

    const $featuringnContainer = document.getElementById('#featuring');
    const $formContainer = document.getElementById('#form');
    const $home = document.getElementById('#home');


    const  $modal = document.getElementById('modal');
    const  $overlay = document.getElementById('overlay');
    const  $hideModal = document.getElementById('hide-modal');

   const $modalTitle = modal.querySelector('h1');
   const $modalImage = modal.querySelector('img');
   const $modalDescripcion = modal.querySelector('p');

  
 
   
})()
