Tomando en cuenta los **17 prompts**, organicé la bitácora por fechas y agrupé las actividades relacionadas. Incluí tanto el desarrollo de la lógica y la interfaz del simulador como la generación de recursos gráficos, la integración de audio y la Pokédex.

## **2026-11-19 — Sesión 1**

**Integrante(s):** Alex

**Qué hice:** Elaboré tres prompts para iniciar el desarrollo del simulador Pokémon. El primero se enfocó en implementar la lógica de combate por turnos, incluyendo equipos, ataques, cálculo de daño, efectividad de tipos, cambios de Pokémon, PP y uso de pociones. Los siguientes dos prompts se enfocaron en comenzar la parte visual, explicando cómo debía organizarse la interfaz y proporcionando los recursos gráficos disponibles para conectarlos con el código.

**Problema encontrado:** Era necesario establecer reglas claras para el funcionamiento de la batalla y, posteriormente, explicar cómo integrar los elementos visuales sin afectar la lógica existente. También faltaba definir cómo funcionarían las barras de vida, los botones, los mensajes de batalla y los efectos de ataque.

**Cómo lo resolví:** Dividí los requisitos en secciones y describí las funciones esperadas de cada elemento. También proporcioné una lista de imágenes y expliqué cómo debían utilizarse en las diferentes pantallas del juego.

**Decisión tomada:** Desarrollar primero la lógica de combate y utilizarla como base para incorporar posteriormente la interfaz visual. Mantener el código sencillo y aprovechar las imágenes existentes para construir la presentación del videojuego.

**Commits relacionados:** Pendiente.

**Pendiente para la siguiente sesión:** Revisar el código generado y comprobar que la lógica de combate funcione correctamente. También verificar la integración de las imágenes, los botones y los elementos visuales solicitados.

## **2026-11-24 — Sesión 2**

**Integrante(s):** Alex, Mariela

**Qué hice:** Continué trabajando en la interfaz y los recursos del simulador mediante siete prompts. Solicité ajustes en la visualización de la vida del Pokémon rival, la distribución de la pantalla y el tamaño y alineación del texto de los globos. También trabajé en la integración de música y efectos de sonido para las diferentes pantallas y ataques. Además, elaboré un prompt para implementar una Pokédex utilizando las cartas disponibles y la información de PokéAPI. Por otra parte, generé prompts para crear botones de interfaz con estilo retro de 8 bits, utilizando diferentes colores para distinguir las acciones y los ataques.

**Problema encontrado:** Era necesario mejorar la distribución de los elementos para que toda la interfaz fuera visible y legible. También se necesitaba relacionar correctamente cada archivo de audio con su respectiva pantalla o acción, así como mantener una identidad visual consistente entre los botones.

**Cómo lo resolví:** Especifiqué los ajustes necesarios para la interfaz y proporcioné los nombres de los archivos de audio para facilitar su conexión. Para los recursos gráficos, utilicé prompts con características visuales comunes, modificando principalmente los colores y las etiquetas según la función de cada botón.

**Decisión tomada:** Conservar la estructura visual y funcional existente, realizar ajustes puntuales y continuar generando los recursos gráficos necesarios. Incorporar la Pokédex como un apartado adicional sin afectar el sistema de combate.

**Commits relacionados:** Pendiente.

**Pendiente para la siguiente sesión:** Comprobar los ajustes de la interfaz, probar la reproducción de música y efectos de sonido, verificar la información obtenida mediante PokéAPI y revisar los botones generados para continuar con su integración.

## **2026-11-26 — Sesión 3**

**Integrante(s):** Alex, Luis, Aldo

**Qué hice:** Continué generando los recursos gráficos para el simulador mediante cuatro prompts dirigidos a crear botones de ataques de Charmander y Bulbasaur, así como botones para las acciones de mochila y huida y la selección de Pokémon. También utilicé ChatGPT para organizar los requisitos visuales y preparar un prompt que permitiera retomar el código existente en Claude, considerando el PDF de referencia y los recursos gráficos disponibles. Finalmente, solicité a Claude un resumen de las modificaciones realizadas anteriormente para mantener un registro de los cambios en las cartas del proyecto.

**Problema encontrado:** Era necesario mantener la coherencia visual entre los diferentes grupos de botones y organizar las instrucciones para integrar todos los recursos gráficos con el código existente. También era importante conservar los cambios realizados durante las distintas revisiones del proyecto.

**Cómo lo resolví:** Reutilicé una estructura base para los prompts de generación de imágenes, modificando las etiquetas y los colores según cada categoría. Para la parte de programación, reuní los requisitos visuales, las interacciones esperadas y los nombres de los archivos PNG en una sola solicitud. También pedí un resumen de las modificaciones anteriores para identificar los elementos conservados y descartados.

**Decisión tomada:** Mantener una identidad visual consistente mediante botones con diferentes colores según su función. Continuar con la integración de los recursos gráficos en la interfaz, conservando la lógica de combate y utilizando el PDF como referencia para la distribución de los elementos.

**Commits relacionados:** Pendiente.

**Pendiente para la siguiente sesión:** Revisar la implementación visual realizada por Claude, comprobar que los botones y recursos gráficos estén correctamente conectados y verificar el funcionamiento de las interacciones, los efectos de ataque y las pantallas del videojuego. También revisar las cartas generadas y continuar con los ajustes necesarios.

**Nota:** Las actividades se agruparon por fecha para evitar crear una bitácora independiente por cada prompt. Los apartados de verificación y commits permanecen pendientes cuando todavía no se cuenta con evidencia de que esos cambios hayan sido probados o registrados.