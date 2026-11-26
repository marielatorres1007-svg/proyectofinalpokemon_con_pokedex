# Batalla Pokémon

Simulador de batalla Pokémon por turnos que se juega en el navegador, hecho con HTML, CSS y JavaScript. El jugador enfrenta a un rival controlado por el juego en una pelea de 3 contra 3, con estética pixel art, música y efectos de sonido. Incluye una **Pokédex** que consulta la API pública [PokéAPI](https://pokeapi.co/) para mostrar la información de cada Pokémon.

## Descripción

- **Batalla por turnos:** el jugador ataca primero y después responde el rival, que elige al azar entre los movimientos que aún tengan PP.
- **Equipos:**
  - Jugador: Pikachu, Charmander y Bulbasaur.
  - Rival: Mewtwo, Magikarp y Squirtle.
  - Todos son de nivel 20.
- **Acciones del jugador:** atacar (4 movimientos por Pokémon, con PP y precisión), usar objetos de la mochila, cambiar de Pokémon o huir.
- **Mochila:** cada entrenador tiene 2 Pociones (curan 20 PS) y 1 Superpoción (cura 47 PS).
- **Daño:** se calcula con el nivel, el poder del movimiento, el ataque y la defensa, un bonus del 50 % cuando el movimiento es del mismo tipo que el Pokémon (STAB), la efectividad entre tipos (×2, ×0.5) y una variación aleatoria entre 0.85 y 1.00.
- **Fin de la batalla:** gana quien debilite a los 3 Pokémon del otro equipo. Huir cuenta como derrota.
- **Pokédex:** muestra las 6 cartas de los Pokémon, 3 del jugador y 3 del rival. El nombre y el tipo de cada carta se obtienen de PokéAPI, y los puntos de vida, ataque, defensa y velocidad vienen de los datos del juego.

## Instrucciones de uso

### Requisitos

- Un navegador moderno (Chrome, Edge o Firefox).
- Conexión a internet, para la Pokédex (PokéAPI) y la fuente de las cartas. Si falla la conexión, la Pokédex sigue funcionando con los datos del juego.
- Recomendado: [Visual Studio Code](https://code.visualstudio.com/) con la extensión **Live Server**.

### Cómo ejecutarlo

1. Descarga o clona el proyecto y descomprime la carpeta, si viene en zip.
2. Abre la carpeta en Visual Studio Code.
3. Haz clic derecho sobre `index.html` y elige **Open with Live Server**.
4. Se abrirá el juego en el navegador. Haz clic en la pantalla una vez para que el navegador permita reproducir la música.

> Abrir `index.html` con doble clic también puede funcionar, pero algunos navegadores bloquean peticiones y sonidos cuando se abre como archivo local.

### Cómo jugar

1. En el menú de inicio elige una opción:
   - **Jugar:** empieza la batalla.
   - **Cómo jugar:** muestra las reglas. Presiona **Listo** para volver.
   - **Pokédex:** muestra las cartas de los Pokémon. Usa la flecha derecha para ver las del rival, la izquierda para volver a las del jugador y **Listo** para regresar al menú.
2. Durante la batalla, en tu turno elige:
   - **Atacar:** selecciona uno de los 4 movimientos (cada uno tiene PP limitados).
   - **Mochila:** elige una poción y luego el Pokémon al que quieres curar. No se puede usar en un Pokémon debilitado ni con la vida completa.
   - **Cambiar Pokémon:** elige a otro Pokémon de tu equipo. Si el tuyo se debilita, debes elegir otro.
   - **Huir:** termina la batalla con derrota.
3. Cada acción gasta tu turno. Después responde el rival.
4. La batalla termina cuando un equipo queda completamente debilitado.

### Estructura del proyecto

```
├── index.html      # Pantallas del juego (inicio, cómo jugar, Pokédex, batalla, final)
├── estilos.css     # Estilos y posiciones de los elementos
├── batalla.js      # Lógica de la batalla, Pokédex y conexión con PokéAPI
├── imagenes/       # Fondos, botones, cartas, flechas y efectos
├── sonidos/        # Música y efectos de sonido
├── Bitacora.md     # Bitácora del equipo
└── Promps.md       # Registro de prompts utilizados
```

## Integrantes del equipo

Alejandro Olivares Villalobos
Luis Augusto Lozada Duarte
Aldo Torres Sánchez
Mariela Torres Torres

## Créditos de las APIs utilizadas

- **[PokéAPI](https://pokeapi.co/)**: API REST gratuita y de código abierto con información de Pokémon, creada y mantenida por la comunidad. Se usa en la Pokédex mediante el endpoint `https://pokeapi.co/api/v2/pokemon/{nombre}` para obtener el nombre oficial y el tipo de cada Pokémon. No requiere llave de acceso.

### Aviso

Pokémon y los nombres de sus personajes son marcas registradas de Nintendo, Creatures Inc. y GAME FREAK Inc. Este proyecto es un trabajo académico sin fines de lucro y no está afiliado ni respaldado por ellas.
