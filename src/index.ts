import cors from 'cors';
import express from 'express';

import { ApartmentController } from './controllers/apartmentController';
import { AuthController } from './controllers/authController';
import { BookingController } from './controllers/bookingController';
import { pgHelper } from './database/pg-helper';
import { verifyDataCreateApartment } from './middlewares/verifyDataCreateApartment';
import { verifyDataCreateBooking } from './middlewares/verifyDataCreateBooking';
import { verifyIsUuid } from './middlewares/verifyIsUuid';
import { ApartmentRepository } from './repository/apartment.repository';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  return res.send('Hello World');
});

pgHelper
  .connect()
  .then(() => {
    app.listen(8080, () => console.log('Servidor Iniciado'));
  })
  .catch((err) => console.log(err));

const apartmentController = new ApartmentController();
const apartmentRepository = new ApartmentRepository();

app.post('/apartments', verifyDataCreateApartment, apartmentController.create);

app.get('/apartments', apartmentController.listAll);

app.get('/apartments/filter', apartmentController.list);

app.put('/apartments/:id', apartmentController.update);

app.delete('/apartments/:id', async (req, res) => {
  await apartmentRepository.deleteApartment(req.params.id);

  return res.status(204).send();
});

// Bookings

const bookingController = new BookingController();

app.post('/bookings', verifyDataCreateBooking, bookingController.create);

app.get('/bookings', bookingController.list);

app.delete('/bookings/:id', verifyIsUuid, bookingController.delete);

// auth

const authController = new AuthController();

app.post('/login', authController.login);
