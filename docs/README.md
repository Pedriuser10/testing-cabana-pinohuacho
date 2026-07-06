# Testing de Software — Cabaña Pino Huacho

Evaluación Práctica Integradora | Pruebas de Software  
**Profesor:** Marcelo Lara  
**Institución:** Universidad Católica de Temuco (TEC-UCT)  
**Aplicación evaluada:** [cabanapinohuacho.mlarac.cl](https://cabanapinohuacho.mlarac.cl)

**Integrantes:**
- Pedro Huaiquiche
- Matias Coliñir 
- Isai Vargaz 

---

## structura del Repositorio

```
/docs       → Informe de testing: casos de uso, matriz de pruebas, resultados API, k6 y conclusiones
/postman    → Colección exportada de Postman (.json)
/cypress    → Suite de pruebas E2E con Cypress
/k6         → Script de pruebas de carga y reporte de métricas
```

---

##  Fase 1 — Casos de Uso y Pruebas Funcionales

Se documentó el caso de uso principal **CU-001: Realizar Reserva de Cabaña**, incluyendo:

- Actores, precondiciones y postcondiciones
- Flujo principal (Happy Path) de 12 pasos
- 2 flujos alternativos: fechas no disponibles y datos incompletos
- Matriz de 8 casos de prueba (positivos y negativos)

Ver: `/docs/Fase1-CasoUso-MatrizPruebas.docx`

---

## Fase 2 — Pruebas de API con Postman

Colección con 3 requests sobre los endpoints del sistema:

| # | Método | Endpoint | Descripción |
|---|--------|----------|-------------|
| 1 | GET | `/api/availability/2025/07` | Disponibilidad mensual |
| 2 | GET | `/api/precio` | Precio por noche actual |
| 3 | POST | `/reservar` | Crear nueva reserva |

Cada request incluye scripts de validación automática:
- Código de estado HTTP esperado
- Tiempo de respuesta < 500ms
- Estructura y esquema del cuerpo JSON

Ver: `/postman/PinoHuacho.postman_collection.json`

---

##  Fase 3 — Automatización UI con Cypress

Suite E2E que automatiza el flujo de reserva sobre la interfaz gráfica:

- **Escenario exitoso:** flujo completo de reserva con datos válidos
- **Escenario de error:** intento de reserva con datos inválidos

Buenas prácticas aplicadas: `beforeEach`, selectores robustos, aserciones con `should()`.

Ver: `/cypress/`

---

##  Fase 4 — Pruebas de Carga con k6

Script de carga escalonada sobre los endpoints de la Fase 2:

- Ramping up: 0 → 50 VUs en 1 minuto
- Meseta: 50 VUs durante 2 minutos
- Ramping down: 50 → 0 VUs

Métricas documentadas: `http_req_duration` (p90/p95) y `http_req_failed`.

 Ver: `/k6/`

---

## Tecnologías utilizadas

- [Postman](https://www.postman.com/) — Pruebas de API
- [Cypress](https://www.cypress.io/) — Automatización E2E
- [k6](https://k6.io/) — Pruebas de carga y estrés
