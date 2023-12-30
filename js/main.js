document.addEventListener("keyup", e=>{

    if (e.target.matches("#buscador")){
  
        if (e.key ==="Enter")e.target.value = ""
  
        document.querySelectorAll(".pokemon").forEach(pokedex =>{
  
            pokedex.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?pokedex.classList.remove("filtro")
              :pokedex.classList.add("filtro")
        })
    }  
  })
  const listaPokemon = document.querySelector("#listaPokemon");
  const prevButton = document.querySelector("#prevButton");
  const nextButton = document.querySelector("#nextButton");
  let URL = "https://pokeapi.co/api/v2/pokemon/";
  let offset = 0;
  let limit = 9;
  
  // Función para cargar la lista de Pokémon según el offset y el límite
  function cargarListaPokemon() {
      fetch(`${URL}?offset=${offset}&limit=${limit}`)
          .then((response) => response.json())
          .then(data => {
              listaPokemon.innerHTML = ""; // Limpiar la lista actual
              data.results.forEach(pokemon => {
                  fetch(pokemon.url)
                      .then((response) => response.json())
                      .then(poke => mostrarPokemon(poke))
              });
          });
  }
  
  // Función para mostrar un Pokémon en la lista
  function mostrarPokemon(poke) {
  
      let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
      tipos = tipos.join('');
      let fondo = poke.types.map((type) => `<div class="${type.type.name}2 fondo">`);
      fondo = fondo.join('');
      let pokeId = poke.id.toString();
      
  
  
      const div = document.createElement("div");
      div.classList.add("pokemon");
      div.innerHTML = `
      ${fondo}
          <div class="row">
              <div class="col-6 pokemon-info">
                  <div class="nombre-contenedor">
                      <p class="pokemon-id">#${pokeId}</p>
                      <h2 class="pokemon-nombre">${poke.name}</h2>
                  </div>
                  <div class="pokemon-tipos">
                      ${tipos}
                  </div>
              </div>
              <div class="col-6 pokemon-imagen">
                  <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
              </div>
          </div>
      </div>
      `;
      listaPokemon.append(div);
  }
  
  // Función para actualizar la paginación y cargar la lista de Pokémon
  function actualizarPaginacion() {
      prevButton.disabled = offset === 0; // Desactivar el botón "Anterior" si estamos en la primera página
      nextButton.disabled = false; // Habilitar el botón "Siguiente" por defecto
  
      if (offset + limit >= 500) {
          nextButton.disabled = true; // Desactivar el botón "Siguiente" si estamos en la última página
      }
  }
  
  // Evento click del botón "Anterior"
  prevButton.addEventListener("click", () => {
      offset -= limit;
      if (offset < 0) {
          offset = 0;
      }
      cargarListaPokemon();
      actualizarPaginacion();
  });
  
  // Evento click del botón "Siguiente"
  nextButton.addEventListener("click", () => {
      offset += limit;
      if (offset >= 500) {
          offset = 500 - limit;
      }
      cargarListaPokemon();
      actualizarPaginacion();
  });
  
  // Cargar la lista de Pokémon inicial
  cargarListaPokemon();
  actualizarPaginacion();
  