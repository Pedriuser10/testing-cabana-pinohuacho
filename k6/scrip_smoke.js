import http from 'k6/http';
import { check, sleep } from 'k6';

//  configuración de ecenario (Smoke)
export const options = {
    vus: 1,          // solo usuario para medir el comportamiento normal sin carga
    duration: '1m',  // una prueba corta de 1 minuto 
    thresholds: {
        // como se va hacer una prueba smoke el sistema está libre de carga, los tiempos exigidos deben ser mucho más estrictos
        'http_req_duration': ['p(90)<500', 'p(95)<1000'], // el 95% debería responder en menos de 1 segundo
        'http_req_failed': ['rate<0.01'],                  // tasa de fallos menor al 1%
    },
};

const BASE_URL = 'https://cabanapinohuacho.mlarac.cl';

export default function () {
    
    //  consultar precio diario 

    let resPrecio = http.get(`${BASE_URL}/api/precio`);

    check(resPrecio, {
        'GET /api/precio - Status es 200': (r) => r.status === 200,
        'GET /api/precio - Tiempo Base < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1); 


    // consultar disponibilidad de un mes 
    
    let resDisponibilidad = http.get(`${BASE_URL}/api/availability/2026/07`);

    check(resDisponibilidad, {
        'GET /api/availability - Status es 200': (r) => r.status === 200,
    });

    sleep(1);


    //  crear una nueva reserva 
    
    const payload = {
        guestName: 'Matías Baseline',
        guestEmail: 'matias.base@ejemplo.com',
        guestPhone: '+56912345678',
        checkIn: '2026-07-10',
        checkOut: '2026-07-15',
        guests: '2',
        notes: 'Medición de línea base normal sin estrés',
    };

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    let resReserva = http.post(`${BASE_URL}/reservar`, payload, params);

    check(resReserva, {
        'POST /reservar - Status es 200 o 201': (r) => r.status === 200 || r.status === 201,
        'POST /reservar - Tiempo Base < 800ms': (r) => r.timings.duration < 800,
    });

    sleep(1);
}