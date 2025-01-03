import express from "express"
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors';
import { Booking } from "./model/Booking.js"
import createBooking from "./controller/createBooking.js"
import deleteBooking from "./controller/deleteBooking.js"
import getBooking from "./controller/getBooking.js"
import getAllBooking from "./controller/getAllBookings.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())




//? Create Booking
app.post(('/booking'), async (req, res) => {
    const { customerName, phoneNumber, email, guestCount, checkInDateTime, checkOutDateTime } = req.body
    const booking = new Booking()
    booking.customerName = customerName;
    booking.email = email;
    booking.phoneNumber = phoneNumber;
    booking.guestCount = guestCount;
    booking.checkInDateTime = checkInDateTime;
    booking.checkOutDateTime = checkOutDateTime;

    try {
        const bookingId = await createBooking(booking);
        if (bookingId) {
            res.status(201).json({ message: "Booking was created successfully", booking: { id : bookingId , name: customerName, phoneNumber: phoneNumber } });
        } else {
            res.status(409).json({ message: "Booking already exists for the specified check-in and check-out times." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }

})


//? Get Booking 

app.get(('/booking/:id'), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getBooking({ id });
        if (result) {
            res.status(200).json({ booking: result });
        } else {
            res.status(404).json({ message: "No ID exists with that booking" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

//? Get All Booking 

app.get(('/bookings'), async (req, res) => {
    try {
        const results = await getAllBooking();
        if (results) {
            res.status(200).json({ booking: results });
        } else {
            res.status(404).json({ message: "No ID exists with that booking" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


//! Delete Booking 
app.delete(('/booking/:id'), async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteBooking({ id });
        if (result) {
            res.status(200).json({ message: "Booking deleted successfully" });
        } else {
            res.status(404).json({ message: "No ID exists with that booking" });
        }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})



app.listen((PORT), () => {
    console.log("App is Listening on below url");
    console.log(`http://localhost:${PORT}/`);
})
