import express from 'express';
import cors from 'cors';

import { ApartmentController } from './controllers/apartmentController';
import { BookingController } from './controllers/bookingController';
import { verifyDataCreateApartment } from './middlewares/verifyDataCreateApartment';
import { verifyDataCreateBooking } from './middlewares/verifyDataCreateBooking';
import { verifyIsUuid } from './middlewares/verifyIsUuid';
import { AuthController } from './controllers/authController';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.listen(8080, () => console.log('Servidor Iniciado'));

const apartmentController = new ApartmentController();

app.post('/apartments', verifyDataCreateApartment, apartmentController.create);

app.get('/apartments', apartmentController.list);

app.put('/apartments/:id', apartmentController.update);

// Bookings

const bookingController = new BookingController();

app.post('/bookings', verifyDataCreateBooking, bookingController.create);

app.get('/bookings', bookingController.list);

app.delete('/bookings/:id', verifyIsUuid, bookingController.delete);

// auth

const authController = new AuthController();

app.post('/login', authController.login);
