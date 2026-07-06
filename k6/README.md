1.0 Configuracion de ecenario de estres 

para hacer una prueba el comportamiendo del backend se hizo un scrip robusto para poner bajo un entorno de alta demanda que se dividio en 3 partes:

1. fase de carga: se incremento de o a 50 usuarios virtuales concurrente en un lapso de 1 minuto

2.maseta de estabilidad: se sostubo la carga de maxima de 50 usuarios virtuales en paralelo durante un periodo critico de 2 minutos 

3.fase de enfriamiento: un descenso ordenado de los 50 usuarios virtuales a 0 en un tiempo estimado de 1 minuto


1.2 Resumen obtenido despues de hacer la ejecucuion de estres montrandolo en una matriz 

Métrica Clave              Criterio de Aceptación        Resultado Obtenido                    Estado


Tasa de Fallos
(http_req_failed)               < 1.00%               0.00% (0 / 10,485 peticiones)     Logrado (Aprobado)


Latencia Percentil 90 (p90)     < 2000 ms                   212.67 ms                   Logrado (Aprobado)


Latencia Percentil 95 (p95)     < 3000 ms                  341.61 ms                    Logrado (Aprobado)


Peticiones Totales (http_reqs)  Evaluación de rendimiento  10,485 reqs (43.49 req/s prom.)    Informativo


Éxito de Aserciones (checks)   Coherencia del flujo    100.00% (17,475 / 17,475 éxitos) Logrado (Aprobado)


1.3 Síntesis Interpretativa con Criterio de Ingeniería

durante el proceso del test se pudo comprobar que la api precenta un comportamiento altamente resiliente y estable frente al escenario de estres simulado, acontinuacion se detalla de los datos fundamentales extraidos durante el test:

Latencia y Eficiencia:durante el tiempo de procesamiento de las solicitudes HTTP se mantuvo en 197.8ms con una media de 189.22, la metrica con mayor valor correponde al porcentil 90% la mayoria de los usuarios experimento tiempos de respuesta inferiores a los 212.ms mientras que el 95% de los flujos se completaron en menos de 341.61ms estos numeros se ubican drasticamente por debajo de los limites pre establecidos que eran <2000 ms y <3000ms lo que hace garantiza una experiencia fluida en las interfaces de usuario incluso en momentos de alta concurrencia.


Evaluación de Concurrencia y Throughtput: el lado backend logro logro procesar de manera exitosa un volumen global de 10,485 solicitudes a una velocidad sostenida de 43,49 peticiones por segundo y se completo un total de 3,495 iteraciones del flujo de negocio sin registrar congestion en la de procesamiento, el trafico de red administrado alcanzo los 50mb recibidos y 1.4mb enviados, mostrando que se mantiene un consumo de ancho banda optimo y equilibrado


Consistencia Funcional bajo Estrés: a pesar de las inyeccion simultania de multiples cargas transaccionales en un endpoint de lectura de precio GET /api/precio y consulta de disponibilidad (GET /api/availability) y de escritura en la base de datos (POST /reservar) la tasa de fallos de mantuvo estrictamente en 0.00%, el 100% de los 17,475 controles lógicos embebidos se validaron de forma impecable, demostrando que el sistema no sacrificó la integridad de las respuestas ni devolvió excepciones lógicas bajo condiciones extremas de tráfico. 



1.4 en conclucion tecnicas generales

mediante el test el sistema bajo prueba se cumple con los estandares de calidad exigidos por los criterios de aceptacion, los mecanismo de enrutamiento y la logica del servidor estan optimamente configurado para soportar de manera estable las demandas de flujo transaccional sin degradación del servicio ni pérdida de solicitudes.

