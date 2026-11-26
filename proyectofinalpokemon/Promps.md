Prompt 1 — 2026-11-19 — Claude — Autor: Alex
Prompt: "Implementa la lógica de combate por turnos para el simulador Pokémon. El jugador debe atacar primero y después el rival, consumiendo un turno por cada acción. Cuando un Pokémon pierda toda su vida, deberá quedar debilitado y ser reemplazado por otro Pokémon disponible. La batalla terminará cuando los tres Pokémon de un equipo estén debilitados, declarando al ganador. El rival podrá seleccionar sus ataques aleatoriamente entre los movimientos que todavía tengan PP.

También implementa el sistema de mochila para cada entrenador, con 2 Pociones que recuperan 20 puntos de vida y 1 Superpoción que recupera exactamente 47 puntos. El jugador deberá poder consultar los objetos disponibles, seleccionar una poción y elegir al Pokémon al que desea aplicarla. La recuperación no podrá superar la vida máxima, ni podrá utilizarse en Pokémon debilitados o con la vida completa. Cada uso descontará una unidad del inventario y consumirá el turno del jugador.

Considera las siguientes reglas adicionales: no permitir ataques sin PP, ni utilizar pociones sin unidades disponibles, reemplazar automáticamente o solicitar el cambio de un Pokémon debilitado, terminar la batalla cuando los tres Pokémon de un equipo estén debilitados y no permitir huir.

Organiza el código en funciones sencillas como calcularGolpeFelino(), atacar(), usarPocion(), cambiarPokemon(), ejecutarTurno() y verificarGanador(). Utiliza arreglos y objetos de JavaScript para almacenar los Pokémon y sus características, manteniendo la información de la batalla en variables fáciles de identificar.

Por ahora, no desarrolles el diseño visual completo, animaciones ni conexiones con APIs. Prioriza la lógica de combate funcional, con código sencillo y fácil de entender para un estudiante principiante. Separa HTML, CSS y JavaScript en archivos diferentes cuando sea posible. Explica brevemente el funcionamiento de cada función y no agregues funcionalidades adicionales."

Respuesta: Se solicitó implementar la lógica principal del combate por turnos, incluyendo ataques, cambios de Pokémon, sistema de mochila, pociones, administración de PP y condiciones de victoria o derrota.

Decisión: Pendiente de revisar el código generado y realizar ajustes según las necesidades del proyecto.

Verificación: Pendiente de realizar pruebas para comprobar el funcionamiento de los turnos, los ataques, el inventario, los cambios de Pokémon y el final de la batalla.

Lo que aprendí: La lógica de combate debe controlar el orden de los turnos y validar cada acción antes de ejecutarla. También es importante separar las funciones para facilitar la organización, comprensión y mantenimiento del código.