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
 // console.log(response)
  const data =  response.json()
  console.log('Users',data)
  return data;
  
})
.then(function(user) {
  console.log('User',user.results)
});

(async function load() {
 
  //await
   async function getData(url) {
      const response = await fetch(url)
    const data = await response.json();
   
    if(data.data.movie_count > 0){
       return data;
    }      
     throw new Error('No se enconto ningun resultado');
   }
   async function getFriends(url) {
    const response = await fetch(url)
    const data = await response.json();
     return data;

   }
   const $formContainer = document.getElementById('form');
   const $home = document.getElementById('home');
   const $featuringnContainer = document.getElementById('featuring');
   const $friendsContainer= document.getElementById('playlistFriends');
  

   function setAttributes(element,attributes) {
       console.log(attributes);
     for (const atrribute in attributes) {
      element.setAttribute(atrribute,attributes[atrribute]);
     }
   }
const BASE_API = 'https://yts.lt/api/v2/';
const BASE_API_FRIEND = 'https://randomuser.me/api/';
const arrayCategory =["Drama","Action","Animation"]

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
function playlistAmigosTemplate(friend) {
  return(
    `
    <li class="playlistFriends-item" id="${friend.id.value}">
      <a href="#">
        <img src="${friend.picture.thumbnail}" alt="echame la culpa" />
        <span>
          ${friend.name.first} ${friend.name.last}
        </span>
      </a>
    </li>
    `
    )  
}
function playListTemplate(movie) {  
  return(
    `
    <li class="myPlaylist-item" name="movie${movie.id}" data-id="${movie.id}" data-category="${movie.genres[0]}">
    <a href="#">
      <span>
        ${movie.title}
      </span>
    </a>
  </li>
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
       try {
          
          const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
      
          const HTMLString = featuringTemplate(peli.data.movies[0]);
          $featuringnContainer.innerHTML = HTMLString;
       } catch (error) {
         alert(error.message);
         loader.remove();
         $home.classList.remove('search-active');
       }
      
  })
   
   
    //console.log(dramaList);

  function videoItemTemplate(movie,category) {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
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
      element.addEventListener('click', () => {
          showModal(element)
      })
      
    }
    
    function renderMovieList(list,$container,category) {
      //actionList.data.movies.
      $container.children[0].remove();
     list.map((movie) => {
        const HTMLString = videoItemTemplate(movie,category);
        const movieElemmet = createTemplate(HTMLString)
        $container.append(movieElemmet)
       const image = movieElemmet.querySelector('img')
       image.addEventListener('load',(event) =>{
         event.srcElement.classList.add('fadeIn')
       })
        
        addEventClick(movieElemmet);
        //console.log(HTMLString)
      }) 
    }
    function renderFriends(listFriends,friendsContainer) {
      listFriends.results.map((friend) =>{
        const HTMLString = playlistAmigosTemplate(friend);
        const FriendHTML = createTemplate(HTMLString);
        friendsContainer.append(FriendHTML);
      })
    }
    function renderPlayList(listMovies,playListContainer) {  
      const moviesFilter = listMovies.filter(findMovieCategory);
      const moviesCantidad = moviesFilter.slice(0,9);
      moviesCantidad.map((movie) => {
          const HTMLString = playListTemplate(movie);
          const playListaHTML = createTemplate(HTMLString);
          playListContainer.append(playListaHTML);
          addEventClick(playListaHTML);
      })
    }
    function findMovieCategory(movie) {
       if (arrayCategory.includes(movie.genres[0])) {
           return movie
       }
       
    }

   async function cacheExist(category) {
     const listaName = `${category}List`
    const cacheList = window.localStorage.getItem(listaName);
    if (cacheList) {
      return JSON.parse(cacheList); 
    }

     const data = await getData(`${BASE_API}list_movies.json?genre=${category}`);
     window.localStorage.setItem(listaName,JSON.stringify(data.data.movies) )
     return data.data.movies;
    }

    //const  actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
    const  actionList = await cacheExist('action')
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList,$actionContainer,'action')

    
   // const  dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
    const  dramaList = await cacheExist('drama')
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList,$dramaContainer,'drama');
     
    //const  animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);
    const  animationList = await cacheExist('animation')
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList,$animationContainer,'animation');

  
    const moviePlayList = await getData(`${BASE_API}list_movies.json?genre=action&genre=drama&genre=&animation&rating>7&rating<10`);
    const $playListContainer = document.getElementById("myPlaylist");
    renderPlayList(moviePlayList.data.movies,$playListContainer);
     
    const usersList = await getFriends(`${BASE_API_FRIEND}?results=10`);
    renderFriends(usersList,$friendsContainer);
   

    const  $modal = document.getElementById('modal');
    const  $overlay = document.getElementById('overlay');
    const  $hideModal = document.getElementById('hide-modal');

   const $modalTitle = modal.querySelector('h1');
   const $modalImage = modal.querySelector('img');
   const $modalDescripcion = modal.querySelector('p');

   function findByID(list,id) {
     return list.find(movie=> movie.id === parseInt(id,10));
   }
  function findMovie(id,category) {
   
    
    //const arrayCategoria
     
     let movieFind;
    switch (category.toLowerCase()) {
      case'action':{
        movieFind = findByID(actionList,id);
      }
      break;
      case'drama':{
        movieFind = findByID(dramaList,id);    
      }   
      break;      
      default:{
        movieFind = findByID(animationList,id);
      }
      break;
    }

    if (movieFind) {
      return movieFind;
    }

    return findByID(moviePlayList.data.movies,id);
    
  }

   function showModal(element) {    
     $overlay.classList.add('active');
     $modal.style.animation = 'modalIn .8s forwards'
     const id = element.dataset.id;
     const category = element.dataset.category;
     const data = findMovie(id,category);

     $modalTitle.textContent = data.title;
     $modalImage.setAttribute('src',data.medium_cover_image);
     $modalDescripcion.textContent = data.description_full;
   }

   $hideModal.addEventListener('click',hideModal);

   function hideModal() {
     $overlay.classList.remove('active');
     $modal.style.animation = 'modalOut .8s forwards'
   }
  
 
   
})()
