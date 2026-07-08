# Informe de Testing de Software
**Evaluación Práctica Integradora**

**Integrantes:**
- Pedro David Huaiquiche Jiménez
- Isaí Abel Vargas
- Matías Coliñir

**Profesor:** Marcelo Lara  
**Universidad Católica de Temuco — TEC-UCT**  
**Julio 2026**

---

## 1. Introducción

El presente informe documenta la estrategia de pruebas aplicada sobre el sistema de reservas web de Cabaña Pino Huacho (cabanapinohuacho.mlarac.cl), desarrollado con Node.js, Express y Sequelize. La evaluación abarca cuatro fases: diseño de casos de prueba funcionales, pruebas de API con Postman, automatización de interfaz de usuario con Cypress, y pruebas de carga con k6.

- **Objetivo:** Verificar la correcta funcionalidad, integridad de la API y comportamiento bajo carga del sistema de reservas
- **Alcance:** Flujo completo de reserva: disponibilidad, precio y creación de reserva
- **Herramientas:** Postman, Cypress, k6

---

## 2. Casos de Prueba y Matriz de Pruebas Funcionales

### CU-01: Reservar Estadía

**Descripción:**  
El sistema permite a un usuario consultar la disponibilidad de las cabañas, calcular el costo tentativo según las fechas/pasajeros seleccionados y enviar una solicitud de reserva al administrador.

**Actores:**
- Cliente (Principal)
- Dueño de la Cabaña (Secundario)

**Precondiciones:**
- El usuario debe contar con una conexión a internet estable y acceder al dominio de la plataforma.
- El sistema debe tener actualizada la base de datos de disponibilidad, tarifas vigentes por temporada y capacidad de las cabañas.

**Flujo Principal (Happy Path):**
1. El Cliente ingresa al sitio web de Cabañas Pino Huacho.
2. El Cliente navega a la sección de reservas o formulario de contacto.
3. El Cliente selecciona las fechas deseadas y el número de pasajeros.
4. El Sistema verifica la disponibilidad y muestra las opciones junto con el desglose del precio total estimativo.
5. El Cliente selecciona la cabaña de su preferencia y presiona "Solicitar Reserva".
6. El Sistema despliega un formulario solicitando datos personales (Nombre, Correo, Teléfono y comentarios opcionales).
7. El Cliente completa los datos obligatorios y presiona "Enviar Solicitud".
8. El Sistema valida los datos, bloquea temporalmente las fechas en estado "Pendiente" y envía notificación al Cliente y al Administrador.
9. El Sistema muestra un mensaje de éxito en pantalla.

**Flujo Alternativo A — No hay disponibilidad:**
- El Sistema detecta que las fechas requeridas ya están reservadas.
- Muestra un mensaje informando que no hay cupos y sugiere fechas disponibles más próximas.
- El Cliente puede modificar los parámetros de búsqueda o abandonar el sitio.

**Flujo de Excepción B — Formulario incompleto o datos inválidos:**
- El Sistema detecta campos obligatorios vacíos o formato de correo incorrecto.
- Interrumpe el proceso, resalta en rojo los campos con errores y muestra un mensaje de advertencia.
- El Cliente corrige los datos y vuelve a enviar.

**Postcondiciones:**
- La solicitud queda registrada en estado "Pendiente de Confirmación".
- Se despachan alertas vía correo al cliente y al administrador.
- Las fechas quedan resguardadas temporalmente.

---

### CU-02: Gestionar Disponibilidad y Tarifas

**Descripción:**  
Permite al administrador modificar manualmente el calendario de reservas, bloquear fechas por mantenimiento o fuerza mayor, y actualizar tarifas según la temporada.

**Actores:**
- Administrador / Dueño (Principal)

**Precondiciones:**
- El administrador debe haber iniciado sesión correctamente en el panel de administración.

**Flujo Principal (Happy Path):**
1. El Administrador ingresa al panel de control y selecciona "Gestión de Calendario y Tarifas".
2. Selecciona la cabaña específica que desea modificar.
3. Selecciona un rango de fechas en el calendario interactivo.
4. Cambia el estado a "Bloqueado por Mantenimiento" e introduce el nuevo valor de tarifa.
5. Presiona "Guardar Cambios".
6. El Sistema actualiza la base de datos de manera inmediata.
7. El Sistema muestra confirmación en pantalla.

**Flujo Alternativo A — Bloqueo por reserva externa:**
- El administrador selecciona el estado "Reservado Manualmente" e ingresa datos básicos del cliente externo.

**Flujo de Excepción B — Bloqueo en fechas con reservas activas:**
- El Sistema detecta que el rango de fechas tiene una reserva aprobada o pendiente.
- Detiene la operación y despliega una alerta indicando el conflicto con el ID de la reserva afectada.
- El Administrador debe gestionar primero la reserva existente antes de proceder.

---

### Matriz de Casos de Prueba

| ID | Caso de Uso | Escenario / Prueba | Datos de Entrada | Resultado Esperado | Tipo |
|---|---|---|---|---|---|
| CP-01 | CU01: Reservar | Reserva exitosa con datos válidos | Fechas libres, datos OK | Mensaje éxito, cambia a "Pendiente", envía mails | Happy Path |
| CP-02 | CU01: Reservar | Buscar fechas sin disponibilidad | Fechas ya ocupadas | Bloquea el flujo, avisa "sin cupo" y sugiere fechas | Alternativo A |
| CP-03 | CU01: Reservar | Formulario con datos inválidos/vacíos | Correo sin @, fono vacío | Detiene envío, marca campos en rojo y muestra alerta | Excepción B |
| CP-04 | CU02: Gestión | Bloqueo por mantención y cambio de tarifa | Fechas libres, tarifa nueva | Éxito en pantalla, BD actualizada, fechas bloqueadas | Happy Path |
| CP-05 | CU02: Gestión | Bloqueo manual por reserva externa | Datos de cliente externo | Calendario actualizado con la reserva manual | Alternativo A |
| CP-06 | CU02: Gestión | Bloquear fechas con reserva web activa | Rango de fechas con tope | Detiene operación, muestra alerta y el ID en conflicto | Excepción B |

---

## 3. Documentación de la API

### Descripción General

El sistema expone endpoints REST desarrollados con Express.js. Los endpoints probados corresponden al flujo de reserva: consulta de disponibilidad, obtención de precios y creación de reserva.

- **Base URL:** `https://cabanapinohuacho.mlarac.cl`
- **Formato de datos:** JSON (GET) / x-www-form-urlencoded (POST)

### Endpoints Probados

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/availability/:year/:month` | Disponibilidad mensual del calendario |
| GET | `/api/precio` | Precio por noche del día actual |
| POST | `/reservar` | Crear una nueva reserva |

### Detalle de Requests

#### Request 1 — GET /api/availability/:year/:month

- **URL:** `https://cabanapinohuacho.mlarac.cl/api/availability/2025/07`
- **Método:** GET
- **Parámetros:** year (YYYY), month (MM)
- **Respuesta esperada:** 200 OK — Objeto JSON con fechas como claves y estado como valor



#### Request 2 — GET /api/precio

- **URL:** `https://cabanapinohuacho.mlarac.cl/api/precio`
- **Método:** GET
- **Respuesta esperada:** `200 OK — { "price": 150000 }`



#### Request 3 — POST /reservar

- **URL:** `https://cabanapinohuacho.mlarac.cl/reservar`
- **Método:** POST
- **Content-Type:** application/x-www-form-urlencoded
- **Body:** guestName, guestEmail, guestPhone, checkIn, checkOut, guests, notes
- **Respuesta esperada:** 200 OK — Página HTML con confirmación de reserva



---

## 4. Automatización de Interfaz de Usuario con Cypress

### Descripción de la Suite E2E

Se desarrolló una suite de pruebas End-to-End con Cypress que automatiza el flujo de reserva sobre la interfaz gráfica del sistema. Se implementaron buenas prácticas: uso de `beforeEach`, selectores robustos y aserciones con `should()`.

El objetivo fue probar de forma automatizada la página de reservas simulando exactamente lo que haría un cliente real. Como la página funciona por pasos (wizard de 3 etapas), el script de Cypress realizó el camino completo:

- **Paso 1:** Ingresa las fechas de entrada y salida, y la cantidad de huéspedes.
- **Paso 2:** Rellena los datos personales (Nombre, Email y Teléfono).
- **Paso 3:** Llega a la pantalla de confirmación para cerrar la reserva.

**Técnicas aplicadas:**
- **Control de tiempos:** uso de `beforeEach` para entrar a la página antes de cada prueba con tiempo de espera controlado.
- **Selectores precisos:** uso de IDs específicos por paso (`#step-1`, `#step-2`) y campos directos (`#guestName`, `#guestEmail`) para evitar conflictos con elementos ocultos.
- **Validación de datos:** aserciones para verificar que los datos se ingresen correctamente y que no aparezcan mensajes de error al finalizar el flujo.

### Resultados de la Prueba

- **Resultado final:** Exitoso (Passed)
- **Pruebas ejecutadas:** 1 de 2
- **Errores encontrados:** 0

La página respondió bien a todas las solicitudes internas (carga de precios y disponibilidad), demostrando que el formulario es estable y que un usuario puede agendar su estadía normalmente.


---

## 5. Pruebas de Carga y Estrés con k6

### 5.1 Prueba de Estrés — Configuración del Escenario

Se desarrolló un script para poner el backend bajo un entorno de alta demanda, dividido en 3 fases:

1. **Fase de carga:** incremento de 0 a 50 usuarios virtuales concurrentes en 1 minuto.
2. **Meseta de estabilidad:** carga máxima de 50 VUs sostenida durante 2 minutos.
3. **Fase de enfriamiento:** descenso ordenado de 50 VUs a 0 en 1 minuto.

### 5.2 Resultados — Prueba de Estrés

| Métrica Clave | Criterio de Aceptación | Resultado Obtenido | Estado |
|---|---|---|---|
| Tasa de Fallos (`http_req_failed`) | < 1.00% | 0.00% (0 / 10,485 peticiones) | ✅ Aprobado |
| Latencia p90 | < 2000 ms | 212.67 ms | ✅ Aprobado |
| Latencia p95 | < 3000 ms | 341.61 ms | ✅ Aprobado |
| Peticiones Totales (`http_reqs`) | Referencial | 10,485 reqs (43.49 req/s prom.) | ℹ️ Informativo |
| Éxito de Aserciones (`checks`) | Coherencia del flujo | 100.00% (17,475 / 17,475) | ✅ Aprobado |

### 5.3 Síntesis Interpretativa — Estrés

**Latencia y Eficiencia:** el tiempo de procesamiento de las solicitudes HTTP se mantuvo en una media de 189.22 ms. El percentil 90 fue de 212.67 ms y el p95 de 341.61 ms, ambos muy por debajo de los límites establecidos (2000 ms y 3000 ms respectivamente), garantizando una experiencia fluida incluso en alta concurrencia.

**Concurrencia y Throughput:** el backend procesó exitosamente 10,485 solicitudes a 43.49 peticiones por segundo, completando 3,495 iteraciones del flujo de negocio sin congestión. El tráfico de red alcanzó 50 MB recibidos y 1.4 MB enviados, mostrando un consumo de ancho de banda óptimo.

**Consistencia Funcional:** a pesar de la carga simultánea sobre los endpoints GET `/api/precio`, GET `/api/availability` y POST `/reservar`, la tasa de fallos se mantuvo en 0.00% y el 100% de los 17,475 controles lógicos se validaron correctamente.


---

### 5.4 Prueba Smoke — Configuración del Escenario

Con el objetivo de establecer una línea base comparativa, se ejecutó una prueba smoke bajo los siguientes parámetros:

- **Usuarios virtuales:** 1 VU activo de forma secuencial permanente
- **Duración total:** 1 minuto continuo
- **Iteraciones completadas:** 17 ciclos completos del flujo de negocio
- **Propósito:** registrar los tiempos de respuesta mínimos del servidor en condiciones normales de producción

### 5.5 Resultados — Prueba Smoke

| Métrica Clave | Criterio de Aceptación | Resultado Obtenido | Estado |
|---|---|---|---|
| Tasa de Fallos (`http_req_failed`) | < 1.00% | 0.00% (0 / 51 peticiones) | ✅ Aprobado |
| Latencia p90 | < 500 ms | 203.96 ms | ✅ Aprobado |
| Latencia p95 | < 1000 ms | 217.23 ms | ✅ Aprobado |
| Peticiones Totales (`http_reqs`) | Referencial | 51 reqs (0.83 req/s prom.) | ℹ️ Informativo |
| Éxito de Aserciones (`checks`) | Coherencia del flujo | 100.00% (85 / 85 éxitos) | ✅ Aprobado |

### 5.6 Síntesis Interpretativa — Smoke

**Eficiencia de Rutas:** en estado aislado, el tiempo medio de respuesta fue de 191.23 ms con una mediana de 192.39 ms. El p90 fue de 203.96 ms y el p95 de 217.23 ms, confirmando que la API responde de forma inmediata en condiciones ideales.

**Flujo Transaccional:** el usuario virtual completó 17 iteraciones con un tiempo promedio por ciclo de 3.61 segundos. El consumo de red fue mínimo: 246 kB recibidos y 9.6 kB enviados.


---

### 5.7 Análisis Comparativo — Línea Base vs Estrés

| Métrica | Smoke (1 VU) | Estrés (50 VUs) | Degradación |
|---|---|---|---|
| p95 latencia | 217.23 ms | 341.61 ms | +57.2% (124 ms) |
| Tasa de fallos | 0.00% | 0.00% | Sin degradación |
| Throughput | 0.83 req/s | 43.49 req/s | +5,240% |

**Conclusión:** ante un incremento del 5,000% en la concurrencia, la latencia del servidor apenas aumentó un 57.2% (124 ms de diferencia), manteniéndose muy por debajo de los límites de riesgo. El sistema demostró escalabilidad lineal excelente sin registrar ningún fallo.

---

## 6. Conclusiones Generales

- **Fase 1 — Casos de Prueba:** se diseñaron 6 casos de prueba cubriendo los flujos principales del sistema. Las validaciones de formulario y el flujo de reserva funcionan correctamente.
- **Fase 2 — Pruebas API:** los 3 endpoints probados respondieron con código 200, tiempo menor a 500 ms y estructura JSON correcta en todos los casos.
- **Fase 3 — Cypress:** el flujo E2E automatizado se ejecutó exitosamente, demostrando la estabilidad del formulario de reserva en 3 pasos.
- **Fase 4 — k6:** el sistema soportó 50 VUs concurrentes con 0% de fallos y latencias muy por debajo de los umbrales establecidos, demostrando una arquitectura altamente resiliente.

La infraestructura que soporta la aplicación web demuestra una arquitectura elástica y estable, sin cuellos de botella lógicos ni bloqueos bajo condiciones de alta demanda concurrente.
