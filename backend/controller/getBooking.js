import connectDB from "../db/db.js";
import { Booking } from "../model/Booking.js";

const getBooking = async (booking) => {
    try {
        const db = await connectDB();
        if (!db) {
            return new Error("Unable to Connect to Database");
        }

        await db.connect();

        const { id } = booking;

        const query = `SELECT * FROM bookings WHERE id = ?`;
        const result = await db.query(query, [id])

        if (result[0].lenght === 0) {
            console.log("No Booking Exist with ID");
            return false;
        }

        const { customer_name, email, guest_count, phone_number, check_in_time, check_out_time } = result[0][0];

        return {
            customerName : customer_name,
            email,
            guestCount : guest_count,
            phoneNumber : phone_number,
            checkInDateTime : check_in_time,
            checkOutDateTime : check_out_time,
        }


    } catch (error) {
        console.log("Error creating Booking", error);
    }
};

export default getBooking;
