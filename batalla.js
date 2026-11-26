// =====================================================
// 1. DATOS DE LA BATALLA
// =====================================================

// Tabla de efectividad: tablaEfectividad[tipoDelMovimiento][tipoDelDefensor]
// Si un tipo no aparece en la tabla, el multiplicador es 1 (normal).
const tablaEfectividad = {
  normal:    {},
  electrico: { agua: 2, planta: 0.5, electrico: 0.5 },
  fuego:     { planta: 2, agua: 0.5, fuego: 0.5 },
  agua:      { fuego: 2, planta: 0.5, agua: 0.5 },
  planta:    { agua: 2, fuego: 0.5, planta: 0.5 },
  psiquico:  { psiquico: 0.5 }
};

// Equipo del jugador
const equipoJugador = [
  {
    nombre: "Pikachu", tipo: "electrico", nivel: 20,
    vidaMaxima: 55, vidaActual: 55, ataque: 30, defensa: 22, velocidad: 40,
    movimientos: [
      { nombre: "Impactrueno",   tipo: "electrico", poder: 40, precision: 100, pp: 25 },
      { nombre: "Ataque Rápido", tipo: "normal",    poder: 40, precision: 100, pp: 30 },
      { nombre: "Rayo",          tipo: "electrico", poder: 80, precision: 90,  pp: 10 },
      { nombre: "Golpe Cuerpo",  tipo: "normal",    poder: 60, precision: 90,  pp: 15 }
    ]
  },
  {
    nombre: "Charmander", tipo: "fuego", nivel: 20,
    vidaMaxima: 52, vidaActual: 52, ataque: 28, defensa: 20, velocidad: 36,
    movimientos: [
      { nombre: "Ascuas",      tipo: "fuego",  poder: 40, precision: 100, pp: 25 },
      { nombre: "Arañazo",     tipo: "normal", poder: 40, precision: 100, pp: 35 },
      { nombre: "Lanzallamas", tipo: "fuego",  poder: 80, precision: 90,  pp: 10 },
      { nombre: "Mordisco",    tipo: "normal", poder: 60, precision: 100, pp: 15 }
    ]
  },
  {
    nombre: "Bulbasaur", tipo: "planta", nivel: 20,
    vidaMaxima: 58, vidaActual: 58, ataque: 27, defensa: 26, velocidad: 30,
    movimientos: [
      { nombre: "Látigo",   tipo: "planta", poder: 45, precision: 100, pp: 25 },
      { nombre: "Placaje",       tipo: "normal", poder: 40, precision: 100, pp: 35 },
      { nombre: "Hoja Afilada",  tipo: "planta", poder: 55, precision: 95,  pp: 25 },
      { nombre: "Bomba Germen",  tipo: "planta", poder: 80, precision: 100, pp: 15 }
    ]
  }
];

// Equipo del rival
const equipoRival = [
  {
    nombre: "Mewtwo", tipo: "psiquico", nivel: 20,
    vidaMaxima: 65, vidaActual: 65, ataque: 34, defensa: 24, velocidad: 45,
    movimientos: [
      { nombre: "Confusión",    tipo: "psiquico", poder: 50, precision: 100, pp: 25 },
      { nombre: "Psíquico",     tipo: "psiquico", poder: 90, precision: 100, pp: 10 },
      { nombre: "Golpe Cuerpo", tipo: "normal",   poder: 60, precision: 100, pp: 15 },
      { nombre: "Rapidez",      tipo: "normal",   poder: 40, precision: 100, pp: 30 }
    ]
  },
  {
    nombre: "Magikarp", tipo: "agua", nivel: 20,
    vidaMaxima: 45, vidaActual: 45, ataque: 15, defensa: 18, velocidad: 30,
    movimientos: [
      { nombre: "Placaje",    tipo: "normal", poder: 40, precision: 100, pp: 35 },
      { nombre: "Burbuja",    tipo: "agua",   poder: 40, precision: 100, pp: 30 },
      { nombre: "Hidropulso", tipo: "agua",   poder: 60, precision: 100, pp: 20 },
      { nombre: "Azote",      tipo: "normal", poder: 50, precision: 90,  pp: 15 }
    ]
  },
  {
    nombre: "Squirtle", tipo: "agua", nivel: 20,
    vidaMaxima: 54, vidaActual: 54, ataque: 25, defensa: 28, velocidad: 28,
    movimientos: [
      { nombre: "Pistola Agua", tipo: "agua",   poder: 40, precision: 100, pp: 25 },
      { nombre: "Placaje",      tipo: "normal", poder: 40, precision: 100, pp: 35 },
      { nombre: "Burbuja",      tipo: "agua",   poder: 40, precision: 100, pp: 30 },
      { nombre: "Hidropulso",   tipo: "agua",   poder: 60, precision: 100, pp: 20 }
    ]
  }
];

// Mochilas (cada entrenador tiene la suya)
const mochilaJugador = {
  pocion:      { nombre: "Poción",      cantidad: 2, cura: 20 },
  superpocion: { nombre: "Superpoción", cantidad: 1, cura: 47 }
};
const mochilaRival = {
  pocion:      { nombre: "Poción",      cantidad: 2, cura: 20 },
  superpocion: { nombre: "Superpoción", cantidad: 1, cura: 47 }
};

// Variables de control de la batalla
let indiceActivoJugador = 0;   // posición del Pokémon activo en equipoJugador
let indiceActivoRival = 0;     // posición del Pokémon activo en equipoRival

// "fase" dice en qué pantalla del menú está el jugador:
// "menu", "luchar", "mochila", "objetivoPocion", "pokemon", "cambioObligatorio", "fin"
let fase = "menu";
let objetoElegido = "";        // la poción que el jugador eligió en la mochila


// =====================================================
// 2. FUNCIONES AUXILIARES
// =====================================================

// Devuelve el Pokémon activo del jugador
function jugadorActivo() {
  return equipoJugador[indiceActivoJugador];
}

// Devuelve el Pokémon activo del rival
function rivalActivo() {
  return equipoRival[indiceActivoRival];
}

// Escribe un mensaje en el cuadro de mensajes
function mostrarMensaje(texto) {
  const caja = document.getElementById("mensajes");
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  caja.appendChild(parrafo);
  caja.scrollTop = caja.scrollHeight;
}

// Devuelve true si todos los Pokémon del equipo tienen 0 de vida
function equipoDebilitado(equipo) {
  for (let i = 0; i < equipo.length; i++) {
    if (equipo[i].vidaActual > 0) {
      return false;
    }
  }
  return true;
}

// Devuelve el índice del primer Pokémon con vida, o -1 si no hay
function buscarPokemonDisponible(equipo) {
  for (let i = 0; i < equipo.length; i++) {
    if (equipo[i].vidaActual > 0) {
      return i;
    }
  }
  return -1;
}


// =====================================================
// 3. CÁLCULO DE DAÑO
// =====================================================

// Calcula el daño de un movimiento.
// Devuelve un objeto con el daño y la efectividad usada.
function calcularGolpeFelino(atacante, defensor, movimiento) {
  // STAB: 1.5 si el tipo del movimiento es igual al tipo del atacante
  let stab = 1;
  if (movimiento.tipo === atacante.tipo) {
    stab = 1.5;
  }

  // Efectividad: se busca en la tabla (si no está, es 1)
  let efectividad = 1;
  const fila = tablaEfectividad[movimiento.tipo];
  if (fila[defensor.tipo] !== undefined) {
    efectividad = fila[defensor.tipo];
  }

  // Variación aleatoria entre 0.85 y 1.00
  const variacion = 0.85 + Math.random() * 0.15;

  const modificador = stab * efectividad * variacion;

  // Fórmula del profesor
  const base = ((((2 * atacante.nivel) / 5) + 2) * movimiento.poder * (atacante.ataque / defensor.defensa)) / 50 + 2;

  // Se redondea hacia abajo
  const dano = Math.floor(base * modificador);

  return { dano: dano, efectividad: efectividad };
}


// =====================================================
// 4. ACCIONES: ATACAR, USAR POCIÓN, CAMBIAR POKÉMON
// =====================================================

// Un Pokémon ataca a otro. Devuelve false si el ataque NO se pudo hacer
// (por ejemplo, si no hay PP), y true si el turno se gastó.
function atacar(atacante, defensor, indiceMovimiento) {
  const movimiento = atacante.movimientos[indiceMovimiento];

  // 1. Revisar PP
  if (movimiento.pp <= 0) {
    mostrarMensaje("¡No quedan PP en " + movimiento.nombre + "!");
    return false;
  }
  movimiento.pp = movimiento.pp - 1;

  // 2. Revisar precisión
  const numero = Math.random() * 100;   // número entre 0 y 100
  if (numero >= movimiento.precision) {
    mostrarMensaje(atacante.nombre + " usó " + movimiento.nombre + " pero falló.");
    return true;
  }

  // 3. Calcular el daño
  const resultado = calcularGolpeFelino(atacante, defensor, movimiento);

  // 4. Restar la vida (nunca menor que 0)
  defensor.vidaActual = defensor.vidaActual - resultado.dano;
  if (defensor.vidaActual < 0) {
    defensor.vidaActual = 0;
  }

  mostrarEfecto(atacante, defensor, movimiento);

  // 5. Mensajes
  mostrarMensaje(atacante.nombre + " usó " + movimiento.nombre + " y causó " + resultado.dano + " de daño a " + defensor.nombre + ".");
  if (resultado.efectividad === 2) {
    mostrarMensaje("¡Es muy eficaz!");
  } else if (resultado.efectividad === 0.5) {
    mostrarMensaje("No es muy eficaz...");
  } else if (resultado.efectividad === 0) {
    mostrarMensaje("No afecta a " + defensor.nombre + "...");
  }
  if (defensor.vidaActual === 0) {
    mostrarMensaje(defensor.nombre + " se debilitó.");
    reproducirSonido(SONIDOS.debilitado);
  }
  return true;
}

// El jugador usa una poción en un Pokémon de su equipo.
// "objeto" es "pocion" o "superpocion"; "indicePokemon" es la posición en el equipo.
function usarPocion(objeto, indicePokemon) {
  const pocion = mochilaJugador[objeto];
  const pokemon = equipoJugador[indicePokemon];

  if (pocion.cantidad <= 0) {
    mostrarMensaje("¡Ya no quedan " + pocion.nombre + "s!");
    return;
  }
  if (pokemon.vidaActual === 0) {
    mostrarMensaje("No puedes usar pociones en un Pokémon debilitado.");
    return;
  }
  if (pokemon.vidaActual === pokemon.vidaMaxima) {
    mostrarMensaje(pokemon.nombre + " ya tiene la vida completa.");
    return;
  }

  // Curar sin pasar de la vida máxima
  const vidaAntes = pokemon.vidaActual;
  pokemon.vidaActual = pokemon.vidaActual + pocion.cura;
  if (pokemon.vidaActual > pokemon.vidaMaxima) {
    pokemon.vidaActual = pokemon.vidaMaxima;
  }
  pocion.cantidad = pocion.cantidad - 1;

  mostrarMensaje("Usaste " + pocion.nombre + " en " + pokemon.nombre + ". Recuperó " + (pokemon.vidaActual - vidaAntes) + " PS.");

  reproducirSonido(SONIDOS.pocion);

  // Usar una poción gasta el turno
  ejecutarTurno();
}

// El jugador cambia de Pokémon.
// Si el activo se debilitó (fase "cambioObligatorio") NO gasta turno;
// si es un cambio voluntario, sí gasta el turno.
function cambiarPokemon(indice) {
  const nuevo = equipoJugador[indice];

  if (nuevo.vidaActual === 0) {
    mostrarMensaje(nuevo.nombre + " está debilitado.");
    return;
  }
  if (indice === indiceActivoJugador) {
    mostrarMensaje(nuevo.nombre + " ya está en combate.");
    return;
  }

  indiceActivoJugador = indice;
  mostrarMensaje("¡Adelante, " + nuevo.nombre + "!");
  reproducirSonido(SONIDOS.cambio);

  if (fase === "cambioObligatorio") {
    fase = "menu";
    mostrarPantalla();
  } else {
    ejecutarTurno();
  }
}


// =====================================================
// 5. TURNOS Y FIN DE LA BATALLA
// =====================================================

let ocupado = false;        // true mientras el rival "piensa": los botones no responden
let resultadoFinal = "";    // "victoria" o "derrota"
let finProgramado = false;  // evita programar dos veces la pantalla final

// El jugador ya hizo su acción. Ahora (1.5 s después) juega el rival.
function ejecutarTurno() {
  if (verificarGanador() !== null) {
    mostrarPantalla();
    return;
  }
  fase = "menu";
  ocupado = true;
  mostrarPantalla();                    // actualiza barras con la acción del jugador
  setTimeout(turnoDelRival, 1500);      // pausa para ver el efecto antes de que responda el rival
}

function turnoDelRival() {
  if (rivalActivo().vidaActual === 0) {
    // El rival perdió a su Pokémon: manda al siguiente (no ataca este turno)
    indiceActivoRival = buscarPokemonDisponible(equipoRival);
    mostrarMensaje("El rival envió a " + rivalActivo().nombre + ".");
  } else {
    turnoRival();
  }
  ocupado = false;

  if (verificarGanador() !== null) {
    mostrarPantalla();
    return;
  }
  if (jugadorActivo().vidaActual === 0) {
    fase = "cambioObligatorio";
    mostrarMensaje("Elige otro Pokémon.");
  } else {
    fase = "menu";
  }
  mostrarPantalla();
}

// El rival elige al azar un movimiento que todavía tenga PP
function turnoRival() {
  const rival = rivalActivo();
  const disponibles = [];
  for (let i = 0; i < rival.movimientos.length; i++) {
    if (rival.movimientos[i].pp > 0) {
      disponibles.push(i);
    }
  }
  if (disponibles.length === 0) {
    mostrarMensaje(rival.nombre + " no tiene PP en ningún movimiento.");
    return;
  }
  const azar = Math.floor(Math.random() * disponibles.length);
  atacar(rival, jugadorActivo(), disponibles[azar]);
}

// Revisa si alguien ganó. Devuelve "jugador", "rival" o null.
function verificarGanador() {
  if (equipoDebilitado(equipoRival)) {
    mostrarMensaje("¡Todos los Pokémon rivales se debilitaron! ¡Ganaste la batalla!");
    fase = "fin";
    resultadoFinal = "victoria";
    return "jugador";
  }
  if (equipoDebilitado(equipoJugador)) {
    mostrarMensaje("Todos tus Pokémon se debilitaron. ¡El rival gana la batalla!");
    fase = "fin";
    resultadoFinal = "derrota";
    return "rival";
  }
  return null;
}


// =====================================================
// 6. IMÁGENES Y PANTALLAS
// =====================================================

const CARPETA_IMAGENES = "imagenes/";
const EXTENSION = ".png";      // cámbiala si tus imágenes son .webp, .jpg, etc.

function ruta(nombre) {
  return CARPETA_IMAGENES + nombre + EXTENSION;
}

// Convierte "Ataque Rápido" en "AtaqueRapido" (nombre usado en los archivos)
function nombreArchivo(texto, esEfecto) {
  // \u00e1 = á, \u00e9 = é, \u00ed = í, \u00f3 = ó, \u00fa = ú, \u00f1 = ñ
  let n = texto;
  n = n.replace(/\u00e1/g, "a");
  n = n.replace(/\u00e9/g, "e");
  n = n.replace(/\u00ed/g, "i");
  n = n.replace(/\u00f3/g, "o");
  n = n.replace(/\u00fa/g, "u");
  n = n.replace(/\u00f1/g, "n");
  n = n.replace(/ /g, "");
  // Tu archivo del efecto se llama "LanzaLlamas" (con L mayúscula)
  if (esEfecto && n === "Lanzallamas") {
    n = "LanzaLlamas";
  }
  return n;
}

// Muestra una pantalla y oculta las demás
function mostrarSolo(idPantalla) {
  const ids = ["pantallaInicio", "pantallaComoJugar", "pantallaPokedex", "pantallaBatalla", "pantallaFinal"];
  for (let i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).classList.toggle("oculta", ids[i] !== idPantalla);
  }
}

// Muestra el efecto del ataque sobre el Pokémon que recibe el golpe, parpadea y se oculta
function mostrarEfecto(atacante, defensor, movimiento) {
  const lado = equipoJugador.includes(defensor) ? "Jugador" : "Rival";
  const imagen = document.getElementById("efecto" + lado);
  if (lado === "Jugador") {
    imagen.className = "efecto-jugador " + defensor.nombre.toLowerCase();   // mismo ajuste que el sprite
  }
  imagen.src = ruta("Efecto" + atacante.nombre + "-" + nombreArchivo(movimiento.nombre, true));
  imagen.classList.remove("oculta");
  imagen.classList.add("parpadeo");
  // Sonido del ataque: mismo nombre que la imagen del efecto, con "Sonido-" delante
  reproducirSonido(nombreSonidoAtaque(atacante, movimiento));
  setTimeout(function () {
    imagen.classList.remove("parpadeo");
    imagen.classList.add("oculta");
  }, 1000);
}

// Barra de HP: ancho y color según vidaActual / vidaMaxima
function actualizarBarra(idRelleno, pokemon) {
  const relleno = document.getElementById(idRelleno);
  const porcentaje = (pokemon.vidaActual / pokemon.vidaMaxima) * 100;
  relleno.style.width = porcentaje + "%";
  if (porcentaje > 50) {
    relleno.style.backgroundColor = "#3ddc3d";      // verde
  } else if (porcentaje > 20) {
    relleno.style.backgroundColor = "#f5d300";      // amarillo
  } else {
    relleno.style.backgroundColor = "#e03030";      // rojo
  }
}

// Actualiza Pokémon, nombres y barras
function actualizarCampo() {
  const jugador = jugadorActivo();
  const rival = rivalActivo();

  const spriteJugador = document.getElementById("spriteJugador");
  spriteJugador.src = ruta(jugador.nombre + "Espalda");
  spriteJugador.className = "sprite-jugador " + jugador.nombre.toLowerCase();   // ej: "sprite-jugador charmander"
  document.getElementById("spriteRival").src = ruta(rival.nombre);

  document.getElementById("nombreJugador").textContent = jugador.nombre;
  document.getElementById("nombreRival").textContent = rival.nombre;
  document.getElementById("numerosJugador").textContent = jugador.vidaActual + " / " + jugador.vidaMaxima;
  document.getElementById("numerosRival").textContent = rival.vidaActual + " / " + rival.vidaMaxima;

  actualizarBarra("barraJugador", jugador);
  actualizarBarra("barraRival", rival);
}

// Agrega un botón (imagen) al menú. Si el rival está jugando, no responde.
function agregarBoton(nombreImagen, accion) {
  const imagen = document.createElement("img");
  imagen.src = ruta(nombreImagen);
  imagen.onclick = function () {
    if (ocupado) {
      return;
    }
    reproducirSonido(SONIDOS.clic);
    accion();
  };
  document.getElementById("menu").appendChild(imagen);
}

// Dibuja los botones según la fase actual
function dibujarMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";
  menu.className = "";
  if (fase === "mochila") {
    menu.className = "una-columna";
  } else if (fase === "pokemon" || fase === "objetivoPocion" || fase === "cambioObligatorio") {
    menu.className = "equipo";
  }
  if (ocupado) {
    menu.classList.add("ocupado");
  }
  const sinX = (fase === "menu" || fase === "cambioObligatorio" || fase === "fin");
  document.getElementById("botonX").classList.toggle("oculta", sinX);

  if (fase === "menu") {
    agregarBoton("Boton-Atacar", function () { fase = "luchar"; mostrarPantalla(); });
    agregarBoton("Boton-Mochila", function () { fase = "mochila"; mostrarPantalla(); });
    agregarBoton("Boton-CambiarPokemon", function () { fase = "pokemon"; mostrarPantalla(); });
    agregarBoton("Boton-Huir", huir);
  }

  else if (fase === "luchar") {
    const movs = jugadorActivo().movimientos;
    for (let i = 0; i < movs.length; i++) {
      agregarBoton("Boton-" + nombreArchivo(movs[i].nombre, false), function () { elegirMovimiento(i); });
    }
  }

  else if (fase === "mochila") {
    // Si no quedan, se ve gris pero el clic sigue funcionando (muestra el aviso)
    const p = mochilaJugador.pocion;
    const sp = mochilaJugador.superpocion;
    agregarBoton(p.cantidad > 0 ? "Boton-PosionX2" : "Boton-PosionX2SinExistencia", function () {
      if (p.cantidad <= 0) { mostrarMensaje("¡Ya no quedan Pociones!"); return; }
      objetoElegido = "pocion";
      fase = "objetivoPocion";
      mostrarPantalla();
    });
    agregarBoton(sp.cantidad > 0 ? "Boton-Superposion" : "Boton-SuperposionSinExistencia", function () {
      if (sp.cantidad <= 0) { mostrarMensaje("¡Ya no quedan Superpociones!"); return; }
      objetoElegido = "superpocion";
      fase = "objetivoPocion";
      mostrarPantalla();
    });
  }

  else if (fase === "objetivoPocion") {
    for (let i = 0; i < equipoJugador.length; i++) {
      agregarBoton(imagenBotonPokemon(equipoJugador[i]), function () { usarPocion(objetoElegido, i); });
    }
  }

  else if (fase === "pokemon" || fase === "cambioObligatorio") {
    for (let i = 0; i < equipoJugador.length; i++) {
      agregarBoton(imagenBotonPokemon(equipoJugador[i]), function () { cambiarPokemon(i); });
    }
  }
}

// Botón gris ("Eliminado") si el Pokémon está debilitado; clicable de todos modos
function imagenBotonPokemon(pokemon) {
  if (pokemon.vidaActual === 0) {
    return "Boton-" + pokemon.nombre + "Eliminado";
  }
  return "Boton-" + pokemon.nombre;
}

// Se llama cuando el jugador elige un movimiento
function elegirMovimiento(indice) {
  const sePudo = atacar(jugadorActivo(), rivalActivo(), indice);
  if (sePudo === false) {
    return;            // no había PP: no se gasta el turno
  }
  ejecutarTurno();
}

// HUIR = derrota
function huir() {
  mostrarMensaje("Huiste del combate...");
  fase = "fin";
  resultadoFinal = "derrota";
  mostrarPantalla();
}

// Botón X: regresa un nivel en el menú
function volverAtras() {
  if (ocupado) {
    return;
  }
  fase = (fase === "objetivoPocion") ? "mochila" : "menu";
  mostrarPantalla();
}

// Actualiza todo lo visual de la batalla
function mostrarPantalla() {
  actualizarCampo();
  dibujarMenu();
  if (fase === "fin" && finProgramado === false) {
    finProgramado = true;
    setTimeout(mostrarFinal, 2000);    // deja ver el último golpe antes de cambiar de pantalla
  }
}

function mostrarFinal() {
  const nombre = (resultadoFinal === "victoria") ? "ElementoTexto-Victoria" : "ElementoTexto-Derrota";
  document.getElementById("textoFinal").src = ruta(nombre);
  detenerMusica();
  reproducirSonido(resultadoFinal === "victoria" ? SONIDOS.victoria : SONIDOS.derrota);
  mostrarSolo("pantallaFinal");
}

function iniciarBatalla() {
  mostrarSolo("pantallaBatalla");
  iniciarMusica(SONIDOS.musicaBatalla);
  mostrarMensaje("¡El rival envió a " + rivalActivo().nombre + "!");
  mostrarMensaje("¡Adelante, " + jugadorActivo().nombre + "!");
  mostrarPantalla();
}


// =====================================================
// 7. SONIDOS
// =====================================================

const CARPETA_SONIDOS = "sonidos/";
const EXTENSION_SONIDO = ".mp3";     // cámbiala si tus sonidos son .wav, .ogg, etc.

// Nombres de los archivos (sin la extensión). Si dejas "" ese sonido no se usa.
// Los sonidos de ataque NO van aquí: se arman solos (ver nombreSonidoAtaque más abajo).
const SONIDOS = {
  musicaMenu: "MusicaMenu",           // pantalla de inicio y Cómo jugar
  musicaBatalla: "MusicaBatalla",     // durante la batalla
  victoria: "MusicaVictoria",         // al ganar
  derrota: "MusicaDerrota",           // al perder o huir
  pocion: "",                         // al usar una poción
  cambio: "",                         // al cambiar de Pokémon
  debilitado: "",                     // cuando un Pokémon se debilita
  botonInicio: "SonidoBotonClick",    // SOLO los botones de inicio: Jugar, Cómo jugar, Listo, Pokédex y flechas
  clic: ""                            // botones del menú de batalla (sin sonido por ahora)
};

// Algunos archivos de sonido no siguen el patrón (mayúsculas, letras distintas).
// Aquí se dice: "el nombre que arma el código" -> "el nombre real del archivo".
const SONIDOS_ESPECIALES = {
  "Sonido-EfectoCharmander-Ascuas":      "Sonido-EfectoCharmander-Asquas",
  "Sonido-EfectoCharmander-LanzaLlamas": "Sonido-EfectoCharmander-Lanzallamas",
  "Sonido-EfectoCharmander-Aranazo":     "Sonido-EfectoCharmander-Arañazo",
  "Sonido-EfectoSquirtle-Hidropulso":    "Sonido-EfectoSquirtle-hidropulso",
  "Sonido-EfectoMagikarp-Hidropulso":    "Sonido-EfectoMagikarp-hidropulso",
  "Sonido-EfectoPikachu-Impactrueno":    "Sonido-EfectoPikachu-impactrueno"
};

// Arma el nombre del sonido de un ataque: "Sonido-Efecto<Pokémon>-<Ataque>"
function nombreSonidoAtaque(atacante, movimiento) {
  const nombre = "Sonido-Efecto" + atacante.nombre + "-" + nombreArchivo(movimiento.nombre, true);
  if (SONIDOS_ESPECIALES[nombre] !== undefined) {
    return SONIDOS_ESPECIALES[nombre];
  }
  return nombre;
}

let musicaActual = null;              // la música que está sonando (o esperando permiso)

// Efectos cortos: se pueden solapar (por ejemplo, dos ataques seguidos)
function reproducirSonido(nombre) {
  if (!nombre) {
    return;                           // sin nombre = sin sonido
  }
  const audio = new Audio(CARPETA_SONIDOS + nombre + EXTENSION_SONIDO);
  audio.volume = 0.8;
  audio.onerror = function () {
    console.warn("No se encontró el sonido: " + CARPETA_SONIDOS + nombre + EXTENSION_SONIDO);
  };
  audio.play().catch(function () { /* el navegador puede bloquearlo; no pasa nada */ });
}

// Música de fondo: se repite en bucle y solo suena una a la vez
function iniciarMusica(nombre) {
  detenerMusica();
  if (!nombre) {
    return;
  }
  musicaActual = new Audio(CARPETA_SONIDOS + nombre + EXTENSION_SONIDO);
  musicaActual.loop = true;
  musicaActual.volume = 0.4;
  musicaActual.onerror = function () {
    console.warn("No se encontró la música: " + CARPETA_SONIDOS + nombre + EXTENSION_SONIDO);
  };
  musicaActual.play().catch(function () { /* se reintenta en el primer clic (ver abajo) */ });
}

function detenerMusica() {
  if (musicaActual !== null) {
    musicaActual.pause();
    musicaActual = null;
  }
}

// Los navegadores no dejan sonar música hasta que la persona hace clic.
// En el primer clic se arranca la música que haya quedado esperando.
document.addEventListener("pointerdown", function () {
  if (musicaActual !== null && musicaActual.paused) {
    musicaActual.play().catch(function () {});
  }
});


// =====================================================
// 8. POKÉDEX (usa PokéAPI: https://pokeapi.co)
// =====================================================

// Los tipos de la API vienen en inglés; aquí se traducen a los nombres de tu juego
const TIPOS_API = { electric: "electrico", fire: "fuego", water: "agua", grass: "planta", psychic: "psiquico" };
const NOMBRES_TIPO = { electrico: "Eléctrico", fuego: "Fuego", agua: "Agua", planta: "Planta", psiquico: "Psíquico", normal: "Normal" };

// Posición izquierda de cada una de las 3 cartas (en % de la pantalla)
const POSICIONES_CARTAS = [10.4, 37.3, 64.2];

// Guarda lo que ya se pidió a la API para no repetir la petición cada vez que se abre la Pokédex
const cachePokedex = {};

// Pide un Pokémon a PokéAPI y devuelve { nombre, tipo }.
// "async/await" = espera la respuesta de internet sin congelar el juego.
async function pedirPokemon(nombre) {
  if (cachePokedex[nombre] !== undefined) {
    return cachePokedex[nombre];
  }
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase());
  if (!respuesta.ok) {
    throw new Error("PokéAPI respondió " + respuesta.status);
  }
  const datos = await respuesta.json();
  const info = {
    nombre: datos.name.toUpperCase(),                           // nombre oficial
    tipo: TIPOS_API[datos.types[0].type.name] || "normal"       // tipo principal, ya traducido
  };
  cachePokedex[nombre] = info;
  return info;
}

// Crea un recuadro de texto colocado encima de la carta
function crearDato(clase, html) {
  const dato = document.createElement("div");
  dato.className = "dato " + clase;
  dato.innerHTML = html;
  return dato;
}

// Crea una carta: imagen vacía + textos. Nombre y tipo salen de la API; los números, de tu juego.
function crearCartaPokedex(pokemon, posicion) {
  const carta = document.createElement("div");
  carta.className = "carta-pokedex";
  carta.style.left = posicion + "%";

  const imagen = document.createElement("img");
  imagen.src = ruta("Carta" + pokemon.nombre);      // CartaPikachu, CartaMewtwo, etc.
  imagen.alt = pokemon.nombre;
  carta.appendChild(imagen);

  const nombre = crearDato("nombre", "...");
  const info = crearDato("info", "<span>TIPO: ...</span><span>VIDA: " + pokemon.vidaMaxima + "/" + pokemon.vidaMaxima + "</span>");
  carta.appendChild(crearDato("nivel", "NV. " + pokemon.nivel));
  carta.appendChild(nombre);
  carta.appendChild(info);
  carta.appendChild(crearDato("stat stat1", "ATAQUE<b>" + pokemon.ataque + "</b>"));
  carta.appendChild(crearDato("stat stat2", "DEFENSA<b>" + pokemon.defensa + "</b>"));
  carta.appendChild(crearDato("stat stat3", "VELOC.<b>" + pokemon.velocidad + "</b>"));

  llenarCartaConApi(pokemon, nombre, info);
  return carta;
}

// Cuando llega la respuesta de la API, escribe el nombre y el tipo en la carta.
// Si falla (sin internet), la carta usa los datos de tu juego para no quedar vacía.
async function llenarCartaConApi(pokemon, nombre, info) {
  let nombreFinal = pokemon.nombre.toUpperCase();
  let tipoFinal = pokemon.tipo;
  try {
    const datos = await pedirPokemon(pokemon.nombre);
    nombreFinal = datos.nombre;
    tipoFinal = datos.tipo;
  } catch (error) {
    console.warn("No se pudo cargar " + pokemon.nombre + " desde PokéAPI:", error);
  }
  nombre.textContent = nombreFinal;
  info.firstChild.textContent = "TIPO: " + NOMBRES_TIPO[tipoFinal].toUpperCase();
}

// Página 1 = equipo del jugador, página 2 = equipo del rival
function mostrarPaginaPokedex(pagina) {
  const equipo = (pagina === 1) ? equipoJugador : equipoRival;
  const contenedor = document.getElementById("cartasPokedex");
  contenedor.innerHTML = "";
  for (let i = 0; i < equipo.length; i++) {
    contenedor.appendChild(crearCartaPokedex(equipo[i], POSICIONES_CARTAS[i]));
  }
  document.getElementById("flechaDerecha").classList.toggle("oculta", pagina === 2);
  document.getElementById("flechaIzquierda").classList.toggle("oculta", pagina === 1);
}


// =====================================================
// 9. CONEXIÓN DE LOS BOTONES FIJOS DEL HTML
// =====================================================
document.getElementById("botonJugar").onclick = function () { reproducirSonido(SONIDOS.botonInicio); iniciarBatalla(); };
document.getElementById("botonComoJugar").onclick = function () { reproducirSonido(SONIDOS.botonInicio); mostrarSolo("pantallaComoJugar"); };
document.getElementById("botonListo").onclick = function () { reproducirSonido(SONIDOS.botonInicio); mostrarSolo("pantallaInicio"); };
document.getElementById("botonX").onclick = volverAtras;
document.getElementById("pantallaFinal").onclick = function () { location.reload(); };
// Pokédex: abre la pantalla con las cartas del jugador; las flechas cambian de equipo
document.getElementById("botonPokedex").onclick = function () { reproducirSonido(SONIDOS.botonInicio); mostrarPaginaPokedex(1); mostrarSolo("pantallaPokedex"); };
document.getElementById("flechaDerecha").onclick = function () { reproducirSonido(SONIDOS.botonInicio); mostrarPaginaPokedex(2); };
document.getElementById("flechaIzquierda").onclick = function () { reproducirSonido(SONIDOS.botonInicio); mostrarPaginaPokedex(1); };
document.getElementById("botonListoPokedex").onclick = function () { reproducirSonido(SONIDOS.botonInicio); mostrarSolo("pantallaInicio"); };

// =====================================================
// 10. AYUDA: avisa en la consola si falta alguna imagen
// =====================================================
// Si una imagen no carga, abre la consola (F12) y verás su ruta exacta.
window.addEventListener("error", function (evento) {
  if (evento.target && evento.target.tagName === "IMG") {
    console.warn("No se encontró la imagen: " + evento.target.getAttribute("src") +
                 " (revisa la carpeta '" + CARPETA_IMAGENES + "' y la extensión '" + EXTENSION + "')");
  }
}, true);

// Música de la pantalla de inicio
iniciarMusica(SONIDOS.musicaMenu);
