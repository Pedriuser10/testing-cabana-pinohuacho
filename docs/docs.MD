# Documentación de Casos de Uso: Cabaña Pino Huacho

**Integrantes:**
* Pedro David Huaiquiche Jiménez
* Matias Guzman Coliñir Guzman
* Isai Abel Vargas

**Sitio web:** [cabanapinohuacho.mlarac.cl](http://cabanapinohuacho.mlarac.cl) • Junio 2025

---

## Caso de Uso 1: Reservar
**Descripción:** El sistema permite a un usuario consultar la disponibilidad de la cabaña, calcular el costo estimado según las fechas y número de personas seleccionados, y enviar una solicitud de reserva formal al administrador.

**Actores:**
* **Cliente:** Persona que ingresa a la plataforma web para buscar y reservar alojamiento.
* **Dueño de la Cabaña (Secundario):** Recibe la notificación de solicitud y confirma o rechaza la reserva.

**Precondiciones:**
* El usuario debe contar con conexión a internet estable y acceder al dominio de la plataforma.
* El sistema debe tener actualizada la disponibilidad, tarifas vigentes por temporada y capacidad de la cabaña.

**Flujo Principal:**
1. El Cliente ingresa al sitio web de Cabaña Pino Huacho.
2. El Cliente navega a la sección de reservas.
3. El Cliente selecciona las fechas deseadas y el número de personas.
4. El Sistema verifica la disponibilidad y muestra el precio total estimado.
5. El Cliente presiona "Solicitar Reserva".
6. El Sistema despliega un formulario solicitando nombre, correo y teléfono.
7. El Cliente completa los datos y presiona "Enviar Solicitud".
8. El Sistema valida los datos, bloquea temporalmente las fechas y envía notificaciones por correo al Cliente y al Administrador.
9. El Sistema muestra un mensaje de confirmación en pantalla.

### Flujos Alternativos
* **Flujo Alternativo A: No hay disponibilidad para las fechas seleccionadas**
  * 4.A.1. El Sistema detecta que la cabaña no está disponible para el rango ingresado.
  * 4.A.2. El Sistema muestra un mensaje informando que no hay cupo y sugiere las fechas disponibles más próximas.
  * 4.A.3. El Cliente puede modificar los parámetros de búsqueda (regresar al Paso 3) o abandonar el sitio.
* **Flujo Alternativo B: Formulario incompleto o datos inválidos**
  * 8.B.1. El Sistema detecta campos obligatorios vacíos o formato de correo incorrecto.
  * 8.B.2. El Sistema resalta en rojo los campos con error y muestra un mensaje descriptivo.
  * 8.B.3. El Cliente corrige los datos y vuelve a presionar "Enviar Solicitud" (retoma el Paso 8).

**Postcondiciones (Éxito):** La solicitud queda registrada con estado "Pendiente de Confirmación", se envían alertas por correo y las fechas quedan reservadas temporalmente hasta que el administrador confirme.

---

## Caso de Uso 2: Gestionar Disponibilidad y Tarifas (Bloqueo de Fechas)
**Descripción:** Permite al administrador modificar manualmente el calendario de reservas, bloquear fechas por mantenimiento o fuerza mayor, y actualizar el valor de las tarifas según la temporada (alta/baja).

**Actores:**
* **Administrador / Dueño (Actor Principal):** Personal encargado de la gestión del complejo turístico.

**Precondiciones:**
* El administrador debe haber iniciado sesión correctamente en el panel de administración del sitio web.

**Flujo Principal:**
1. El Administrador ingresa al panel de control y selecciona la opción "Gestión de Calendario y Tarifas".
2. El Administrador selecciona la cabaña específica que desea modificar.
3. El Administrador selecciona un rango de fechas en el calendario interactivo.
4. El Administrador cambia el estado de los días seleccionados a "Bloqueado por Mantenimiento" e introduce el nuevo valor de la tarifa por noche para esa temporada.
5. El Administrador presiona el botón "Guardar Cambios".
6. El Sistema actualiza la base de datos de manera inmediata.
7. El Sistema muestra una notificación en pantalla confirmando que las tarifas y la disponibilidad fueron actualizadas con éxito.

### Flujos Alternativos y de Excepción
* **Flujo Alternativo A: Bloqueo parcial por reserva externa (vía telefónica/WhatsApp)**
  * 4.A.1. En lugar de bloquear por mantenimiento, el administrador selecciona el estado "Reservado Manualmente" e ingresa los datos básicos del cliente externo para mantener el control. El flujo continúa en el paso 5.
* **Flujo de Excepción B: Intento de bloqueo en fechas con reservas web activas**
  * 4.B.1. El Sistema detecta que en el rango de fechas seleccionado ya existe una reserva aprobada o pendiente de un cliente web.
  * 4.B.2. El Sistema detiene la operación, despliega una alerta indicando el conflicto de fechas y muestra el ID de la reserva afectada.
  * 4.B.3. El Administrador debe cancelar la operación o gestionar primero la reserva existente antes de proceder.

---

## Caso de Uso 3: Consultar Disponibilidad en el Calendario
**Descripción:** El sistema muestra al usuario un calendario visual interactivo con las fechas disponibles sin la necesidad de contactar al dueño.

**Actores:**
* **Cliente:** Persona que visita el sitio web para verificar disponibilidad antes de reservar.
* **Administrador (Secundario):** Mantiene actualizado el calendario con reservas confirmadas y canceladas.

**Precondiciones:**
* El sitio web debe estar en línea y accesible.
* El calendario debe estar sincronizado con las reservas confirmadas y los bloqueos del administrador.

**Flujo Principal:**
1. El Cliente ingresa al sitio web de Cabaña Pino Huacho.
2. El Cliente accede a la sección "Disponibilidad" o "Reservar".
3. El Sistema carga el calendario del mes actual.
4. El Sistema colorea las fechas: verde (disponible), rojo (ocupado), amarillo (mantenimiento).
5. El Cliente navega entre meses usando las flechas de anterior/siguiente.
6. El Cliente identifica visualmente las fechas libres para planificar su estadía.
7. El Cliente hace clic en una fecha disponible para iniciar el proceso de reserva.

### Flujos Alternativos
* **Flujo Alternativo A: El calendario no carga correctamente**
  * 3.A.1. El Sistema detecta el error de carga.
  * 3.A.2. El Sistema muestra el mensaje: "No se pudo cargar el calendario. Intente nuevamente."
  * 3.A.3. El Cliente puede recargar la página o contactar directamente al propietario.

**Postcondiciones (Éxito):** El Cliente visualiza correctamente la disponibilidad del mes y puede proceder a reservar y visualizar los días que está disponible.

---

## Caso de Uso 4: Cancelar Reserva
**Descripción:** El cliente anula una reserva previamente confirmada o pendiente, siempre y cuando se encuentre dentro de los plazos permitidos por las políticas de la cabaña.

**Actores:**
* **Cliente (Principal):** Ejecuta la acción de cancelación.
* **Dueño de la Cabaña (Secundario):** Es notificado de la baja.

**Precondiciones:**
* El cliente debe poseer el código de reserva y el correo electrónico con el que la realizó.
* La reserva debe estar en estado "Pendiente" o "Confirmada".

**Flujo Principal:**
1. El Cliente ingresa a la plataforma web y accede a la sección "Mis Reservas" o "Gestionar Reserva".
2. El Cliente ingresa su correo electrónico y el código único de reserva.
3. El Sistema muestra los detalles de la reserva asociada.
4. El Cliente presiona el botón "Cancelar Reserva".
5. El Sistema despliega una advertencia recordando las políticas de devolución y plazos de la cabaña.
6. El Cliente presiona "Confirmar Anulación".
7. El Sistema cambia el estado de la reserva a "Cancelada", libera las fechas en el calendario y envía un correo de confirmación de cancelación al cliente y una notificación al administrador.

### Flujos Alternativos
* **Flujo Alternativo A: Reserva no encontrada**
  * 3.A.1. Si no coinciden el correo y el código, el sistema muestra un error: "Reserva no encontrada, verifique sus datos". El cliente vuelve al paso 2.
* **Flujo Alternativo B: Fuera de plazo legal**
  * 5.B.1. Si la cancelación se solicita fuera del tiempo límite (ej. menos de 48 horas antes), el sistema bloquea la opción automática y muestra un mensaje indicando que debe contactar directamente al dueño vía WhatsApp.

---

## Caso de Uso 5: Modificar Reserva
**Descripción:** El cliente solicita cambiar las fechas o la cantidad de personas de una reserva existente, sujeto a disponibilidad de la cabaña y recalculo de valores.

**Precondiciones:**
* El cliente posee una reserva válida y en estado activo para una fecha futura.
* El sistema tiene actualizada la matriz de disponibilidad.

**Flujo Principal:**
1. El Cliente accede a su reserva ingresando su código y correo electrónico en "Gestionar Reserva".
2. El Sistema muestra los datos actuales de la estadía.
3. El Cliente presiona el botón "Modificar Reserva".
4. El Sistema habilita los campos editables (fechas de check-in/check-out y número de huéspedes).
5. El Cliente ingresa los nuevos datos y presiona "Verificar Cambios".
6. El Sistema valida que la cabaña esté disponible en las nuevas fechas y calcula la diferencia tarifaria si corresponde.
7. El Sistema muestra el resumen detallado de los cambios y el nuevo monto (o saldo a pagar/devolver).
8. El Cliente presiona "Confirmar Modificación".
9. El Sistema actualiza la base de datos, libera el rango anterior, bloquea los nuevos días y envía un correo electrónico con el nuevo comprobante de reserva.

### Flujos Alternativos
* **Flujo Alternativo A: Fechas no disponibles**
  * 6.A.1. Si hay conflicto con otra reserva en los nuevos días solicitados, el sistema emite una alerta indicando que no hay disponibilidad y sugiere días libres cercanos. El cliente puede elegir otras fechas o cancelar la modificación.

---

## Caso de Uso 6: Gestionar Tarifas y Temporadas
**Descripción:** Permite al administrador del sistema configurar los precios por noche de la cabaña y definir los rangos de fechas correspondientes a las temporadas (alta, baja, fines de semana largos o feriados).

**Actores:**
* **Dueño de la Cabaña / Administrador (Principal):** Configura las reglas de negocio y precios.

**Flujo Principal:**
1. El Administrador ingresa al panel administrativo y selecciona la sección "Configuración de Tarifas y Temporadas".
2. El Sistema muestra el listado de tarifas vigentes y el calendario de temporadas configuradas.
3. El Administrador selecciona la opción "Crear Nueva Temporada" o elige editar una existente.
4. El Administrador define un nombre (ej. "Verano Alta"), selecciona el rango de fechas en el calendario y digita el valor en pesos por noche.
5. El Administrador presiona "Guardar Configuración".
6. El Sistema valida que el rango de fechas sea lógico y que el valor sea numérico mayor a cero.
7. El Sistema guarda los cambios de manera definitiva en la base de datos y despliega un mensaje de éxito.

### Flujos Alternativos
* **Flujo Alternativo A: Superposición de fechas**
  * 6.A.1. Si las fechas seleccionadas se cruzan con una temporada ya existente, el sistema bloquea la acción y muestra un error: "El rango seleccionado coincide con la temporada [Nombre]". El administrador debe ajustar las fechas.
* **Flujo Alternativo B: Formato de precio inválido**
  * 6.B.1. Si el valor ingresado contiene letras o es menor o igual a cero, el sistema solicita ingresar un monto válido antes de permitir el guardado.

**Postcondiciones (Éxito):** Las tarifas quedan actualizadas de inmediato. Cualquier cliente que intente cotizar o reservar a través de la web verá los nuevos valores aplicados automáticamente según los días seleccionados

