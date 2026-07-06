import http from 'k6/http';
import { check, sleep } from 'k6';

//  configuración de escenarios y métricas límites
export const options = {
    stages: [
        { duration: '1m', target: 50 },  
        { duration: '2m', target: 50 },  
        { duration: '1m', target: 0 },   
    ],
    thresholds: {
        'http_req_duration': ['p(90)<2000', 'p(95)<3000'], // percentiles p90 y p95
        'http_req_failed': ['rate<0.01'],                  // tasa de fallos menor al 1%
    },
};

const BASE_URL = 'https://cabanapinohuacho.mlarac.cl';

export default function () {


    let resPrecio = http.get(`${BASE_URL}/api/precio`);

    check(resPrecio, {
        'GET /api/precio - Status es 200': (r) => r.status === 200,
        'GET /api/precio - Tiempo < 1000ms': (r) => r.timings.duration < 1000,
    });

    sleep(0.5); 

    
    //  consultar disponibilidad de un mes 
    
    
    let resDisponibilidad = http.get(`${BASE_URL}/api/availability/2026/07`);

    check(resDisponibilidad, {
        'GET /api/availability - Status es 200': (r) => r.status === 200,
    });

    sleep(0.5);

    
    // crear una nueva reserva 
    

    const payload = {
        guestName: 'Matías Test',
        guestEmail: 'matias.test@ejemplo.com',
        guestPhone: '+56912345678',
        checkIn: '2026-07-10',
        checkOut: '2026-07-15',
        guests: '2', 
        notes: 'Prueba de estrés automatizada con k6',
    };

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };

    let resReserva = http.post(`${BASE_URL}/reservar`, payload, params);

    check(resReserva, {
        'POST /reservar - Status es 200 o 201': (r) => r.status === 200 || r.status === 201,
        'POST /reservar - Tiempo < 1500ms': (r) => r.timings.duration < 1500,
    });


    sleep(1);
}