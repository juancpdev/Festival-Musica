document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
    scrollNav();
    fijarNav();
    navCelu();
}

function navCelu(){
    const nav = document.querySelector('.navegacion-principal');
    const boton_menu = document.querySelector('.container-barra');
    let contador = 0;

    boton_menu.addEventListener('click', function(){
        if(contador === 0){
            contador = 1;
            nav.classList.add('nav_celu');
        } else if (contador === 1){
            contador = 0;
            nav.classList.remove('nav_celu');
        }
    })

    nav.addEventListener('click', function(){
        if(contador === 1){
            contador = 0;
            nav.classList.remove('nav_celu');
        }
    })
}

function fijarNav(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.contenido-festival');
    const body = document.querySelector('body')

    window.addEventListener('scroll', function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('nav-fijo');
            body.classList.add('body-scroll');
        }else {
            barra.classList.remove('nav-fijo');
            body.classList.remove('body-scroll');
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView( {behavior: "smooth"});
        })
    });
    
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-container');
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image.avif">
            <source srcset="build/img/thumb/${i}.webp" type="image.webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen_galeria">`
            imagen.onclick = function(){
                mostrarImagen(i);

            }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i){
    const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
            <source srcset="build/img/grande/${i}.avif" type="image.avif">
            <source srcset="build/img/grande/${i}.webp" type="image.webp">
            <img loading="lazy" width="200" height="300" src="build/img/grande/${i}.jpg" alt="imagen_galeria">`
    // Elementos
    const overlay = document.createElement('DIV');
    const container_btn = document.createElement('DIV');
    const btn = document.createElement('I');
    const body = document.querySelector('body');
    //Clases
    container_btn.classList.add('container_btn');
    btn.classList.add('fa-solid');
    btn.classList.add('fa-x');
    // Padres-hijos
    container_btn.appendChild(btn);
    overlay.appendChild(container_btn);
    overlay.appendChild(imagen);
    overlay.classList.add('overlay2');
    //Onclick
    container_btn.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    //Agregar al HTML
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
