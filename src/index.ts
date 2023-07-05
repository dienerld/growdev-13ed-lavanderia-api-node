import express from 'express';
import { ApartmentController } from './controllers/apartmentController';
import { BookingController } from './controllers/bookingController';
import { verifyDataCreateApartment } from './middlewares/verifyDataCreateApartment';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.listen(8080, () => console.log('Servidor Iniciado'));

const apartmentController = new ApartmentController();

app.post('/apartments', verifyDataCreateApartment, apartmentController.create);

app.get('/apartments', apartmentController.listar);

app.put('/apartments/:id', apartmentController.update);

// Bookings

const bookingController = new BookingController();

app.post('/bookings', bookingController.create);
