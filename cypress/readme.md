En esta parte del trabajo nos enfocamos en probar de forma automatizada (Prueba E2E) la página de reservas de "Cabaña Pino Huacho". La idea era simular exactamente lo que haría un cliente real en el sitio web para ver si todo funciona fluido y sin caídas.
Como la página no es un formulario común y corriente, sino que funciona por pasos (un "Wizard" de 3 etapas), el script de Cypress tuvo que hacer el camino completo:
1.	En el Paso 1, ingresa las fechas de entrada y salida, y la cantidad de huéspedes.
2.	Al hacer clic en continuar, pasa al Paso 2, donde rellena los datos personales (Nombre, Email y Teléfono).
3.	Finalmente, en el Paso 3, llega a la pantalla de confirmación para cerrar la reserva.
Para que el script no fallara y fuera de buena calidad, aplicamos un par de técnicas clave que aprendimos en el proceso:
•	Controlar los tiempos de carga: Usamos la función beforeEach para entrar a la página antes de la prueba y le dimos un tiempo de espera controlado. Así, si el servidor se pone un poco lento, Cypress no se cae inmediatamente y espera a que el cuerpo de la página esté visible.
•	Selectores precisos: Al principio tuvimos problemas porque los botones de "Continuar" se llamaban igual y Cypress se confundía con los elementos ocultos. Lo solucionamos amarrando los comandos a los IDs específicos de cada paso (#step-1, #step-2), y usando los IDs directos de los campos como #guestName y #guestEmail.
•	Validación de datos: Pusimos alertas de control (assertions) para asegurarnos de que el navegador realmente escribiera el correo correcto y para chequear que, al final del flujo, no saltara ningún mensaje de error diciendo que faltaban campos obligatorios.





Resultados de la Prueba 
Corrimos la prueba usando la interfaz gráfica de Cypress con el comando npx cypress open. El script anduvo perfecto de principio a fin, completando todo el flujo en unos pocos segundos.
•	Resultado final: Exitoso (Passed)
•	Pruebas ejecutadas: 1 de 2
•	Errores encontrados: 0
La página web respondió bien a las solicitudes internas (como la carga de precios y disponibilidad), lo que demuestra que el formulario es estable y que un usuario puede agendar su estadía normalmente.

A continuación, dejo las capturas de pantalla tomadas directamente desde la herramienta de Cypress que demuestran que la automatización corrió con éxito
