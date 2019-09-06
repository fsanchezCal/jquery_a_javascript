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
   const $formContainer = document.getElementById('form');
   const $home = document.getElementById('home');
   const $featuringnContainer = document.getElementById('featuring');

   function setAttributes(element,attributes) {
       console.log(attributes);
     for (const atrribute in attributes) {
      element.setAttribute(atrribute,attributes[atrribute]);
     }
   }
const BASE_API = 'https://yts.lt/api/v2/';

function featuringTemplate(peli) {
  return (
    `
    <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
      `
  )
}

   $formContainer.addEventListener('submit',async (event) => {
      event.preventDefault();
      $home.classList.add('search-active');
      const loader = document.createElement('img');
      setAttributes(loader,{
        src: 'src/images/loader.gif',
        height:50,
        width:50,
      })
       $featuringnContainer.append(loader);

       const data = new FormData($formContainer);
       const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
       debugger;
      const HTMLString = featuringTemplate(peli.data.movies[0]);
      $featuringnContainer.innerHTML = HTMLString;
   })
   const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
   const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
   const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);
   
   
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
function addEventClick(element) {
  element.addEventListener('click',function () {
      showModal()
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

    
    

    const  $modal = document.getElementById('modal');
    const  $overlay = document.getElementById('overlay');
    const  $hideModal = document.getElementById('hide-modal');

   const $modalTitle = modal.querySelector('h1');
   const $modalImage = modal.querySelector('img');
   const $modalDescripcion = modal.querySelector('p');

   function showModal() {
     $overlay.classList.add('active');
     $modal.style.animation = 'modalIn .8s forwards'
   }

   $hideModal.addEventListener('click',hideModal);

   function hideModal() {
     $overlay.classList.remove('active');
     $modal.style.animation = 'modalOut .8s forwards'
   }
  
 
   
})()
