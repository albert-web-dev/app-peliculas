//obtener peliculas mejor calificadas
getPeliculas_MejorCalificadas = () =>{
    let ids_Peliculas = {
        id: [],
        lenguaje: []
    }
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=bdf8db336b65875c23864990d260ea0d&certification_country=US&certification.lte=G&sort_by=popularity.desc')
     .then(response => response.json())
     .then(response =>{
        for(let  j = 0;j < response.results.length; j++){
            ids_Peliculas.id.push(response.results[j].id)
            ids_Peliculas.lenguaje.push(response.results[j].original_language) 
        }
        getPosters(ids_Peliculas)
    })
}

//obtener películas populares del servidor
getPeliculas_Populares = () =>{
    let ids_Peliculas = {
        id: [],
        lenguaje: []
    }
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=bdf8db336b65875c23864990d260ea0d&sort_by=popularity.desc')
     .then(response => response.json())
     .then(response =>{
        for(let  j = 0;j < response.results.length; j++){
            ids_Peliculas.id.push(response.results[j].id)
            ids_Peliculas.lenguaje.push(response.results[j].original_language) 
        }
        getPosters(ids_Peliculas)
    })
}

//obtener los posters de las películas
getPosters = (arreglo) =>{
    let Array_rutas = new Array(20)
    let ruta = ''
    
    for(let i = 0; i < arreglo.id.length; i++){
        fetch(`https://api.themoviedb.org/3/movie/${arreglo.id[i]}/images?api_key=bdf8db336b65875c23864990d260ea0d&language=${arreglo.lenguaje[i]}-US&include_image_language=${arreglo.lenguaje[i]}`)
            .then(res => res.json())
            .then(res =>{
                ruta = 'https://image.tmdb.org/t/p/w500'+ res.posters[res.posters.length-1].file_path;
                Array_rutas[i] = ruta
                
                if(i === 19){
                    Asignar_SRC(Array_rutas)
                }
            })
            
    }
}

//colocar las imagenes en las etiquetas IMG
Asignar_SRC = (coleccion) =>{
    let images = document.querySelectorAll('.perfil__peliculaArticle')
    
    for(let i = 0; i < images.length; i++){
        images[i].src = coleccion[i]
    }
}

window.addEventListener('load', function(){
    //iniciar glider
    new Glider(document.querySelector('.perfil__pelicula'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dragVelocity: 2,
        duration: 5,
        arrows: {
            prev: '.peliculas__izquierda',
            next: '.peliculas__derecha'
        },
        responsive: [
            {
              // screens mayor que >= 576px
              breakpoint: 576,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },{
              // screens mayor que >= 768px
              breakpoint: 768 ,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
              }
            },{
                // screens mayor que >= 1200px
                breakpoint: 1200 ,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 1,
                }
              }
          ]
    })

    //consultar películas populares
    getPeliculas_Populares();

    let buscar_input = document.querySelector('.buscador__input')
    let buscar_icono = document.querySelector('.buscador__icono')
    buscar_icono.addEventListener('click', function(){
        buscar_input.style.opacity = 1;
    })

    //escuchar el click en "mejor calificadas" para traerlas del servidor
    let calificacion = document.querySelector('.calificacion')
    let popular = document.querySelector('.popular')

    calificacion.addEventListener('click', function(){
        getPeliculas_MejorCalificadas();
    })

    popular.addEventListener('click', function(){
        getPeliculas_Populares();
    })
})