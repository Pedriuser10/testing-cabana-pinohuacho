1.0 Configuración del Escenario

con el objetivo de comparar con el test anterior de estres ahora se hace un test smoke,donde se aisla la carga transaccional masiva mediante un scrip, la configuracion del entorno se definio bajo los siguientes parametro:


usuarios virtuales: 1 un usuario activa de forma secuencial permanente


duracion total: la ejecución se hizo en 1 minuto de forma continua 


iteraciones completadas:17 ciclos completos del flujo de negocio


propósito: registrar los tiempos de respuesta mínimos y óptimos del servidor cuando opera en condiciones normales de producción, sirviendo como métrica de control


1.1 Resumen de Métricas Obtenidas

Métrica Clave        Criterio de Aceptación        Resultado Obtenido             Estado    


Tasa de Fallos           < 1.00%               0.00% (0 / 51 peticiones)      Logrado (Aprobado)
http_req_failed          


Latencia Percentil 90    < 500 ms                      203.96 ms              Logrado (Aprobado)       
p90


Latencia Percentil 95    < 1000 ms                     217.23 ms              Logrado (Aprobado)
p95


Peticiones Totales      Evaluación de rendimiento      51 reqs (0.83 req/s prom)    Informativo
http_reqs  


Éxito de Aserciones      Coherencia del flujo          100.00% (85 / 85 éxitos)     Logrado (Aprobado)


1.2 Síntesis Interpretativa


durante el anaisis tecnico de la medicion de control demuestra la velocidad óptima de respuesta del backend cuando no se encuentra bajo presión transaccional:


Eficiencia de Rutas: en un estado aislado, el tiempo medio de respuesta del servidor se situó en 191.23 ms, con una mediana de 192.39 ms. Los percentiles de control revelan que el 90% de las peticiones se procesaron en apenas 203.96 ms y el 95% no superó los 217.23 ms. Estos valores representan la velocidad nativa de la API en la nube y confirman que la base de datos y los controladores responden de manera inmediata en condiciones ideales.


Flujo Transaccional e Interacciones:el usuario virtual completó 17 iteraciones con un tiempo promedio por ciclo de 3.61 segundos, condicionado por los tiempos de espera (sleep) destinados a simular la navegación humana. El consumo de red se mantuvo sumamente bajo, registrando 246 kB recibidos y 9.6 kB enviados.


Consistencia Operacional:Al igual que en la prueba avanzada, la tasa de fallos se mantuvo en 0.00%, confirmando que las rutas lógicas validadas bajo la especificación de Swagger operan con absoluta estabilidad estructural.


1.3 Análisis Comparativo con Criterio de Ingeniería (Línea Base vs Estrés)

Una vez obtenidos ambos sets de datos, se realizó un análisis cruzado para evaluar la tasa de degradación del backend al multiplicar la demanda por 50 usuarios virtuales en paralelo:


Degradación Mínima de Latencia: mientras que en la Línea Base (1 VU) el percentil 95 (p95) fue de apenas 217.23 ms, bajo el escenario de máximo estrés con 50 VUs concurrentes este solo incrementó a 341.61 ms. Esto significa que ante un incremento del 5000% en la concurrencia de usuarios en el sistema, la latencia del servidor apenas aumentó en un 57.2% (apenas 124 ms de diferencia), manteniéndose drásticamente lejos de los límites de riesgo transaccional fijados originalmente.


Comportamiento del Rendimiento:el sistema demostró una escalabilidad lineal excelente. Pasó de procesar 0.83 peticiones por segundo de forma pasiva a sostener con éxito 43.49 peticiones por segundos bajo estrés, manteniendo la tasa de fallos estrictamente en 0.00% en ambas pruebas.


Conclusión:La infraestructura que soporta la aplicación web demuestra una arquitectura altamente elástica. El backend no sufre de cuellos de botella lógicos ni bloqueos en las solicitudes de reservas masivas, asegurando la estabilidad total del sistema tanto en días de tráfico normal como en escenarios de alta demanda concurrente.