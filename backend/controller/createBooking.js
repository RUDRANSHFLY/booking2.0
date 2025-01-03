import connectDB from "../db/db.js";

const createBooking = async (booking) => {
  try {
    const db = await connectDB();
    if (!db) {
      return new Error("Unable to Connect to Database");
    }

    await db.connect();

    const { checkInDateTime, checkOutDateTime } = booking;

    const overlappingBookings = await db.query(
      `
                SELECT * FROM bookings
                WHERE (check_in_time < ? AND check_out_time > ?) OR
                      (check_in_time < ? AND check_out_time > ?)
            `,
      [checkOutDateTime, checkInDateTime, checkInDateTime, checkOutDateTime]
    );

    if (overlappingBookings[0].length > 0) {
      console.log("Booking Already exist for a booking");
      return false;
    }

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const [results] = await db.query(
      `
            INSERT INTO bookings (customer_name , email , phone_number , guest_count , check_in_time , check_out_time , created_at )
            VALUES (?, ?, ?, ?, ?, ?, ?);
            
        `,
      [
        booking.customerName,
        booking.email,
        booking.phoneNumber,
        booking.guestCount,
        booking.checkInDateTime,
        booking.checkOutDateTime,
        formattedDateTime,
      ]
    );

    const [lastIdResult] = await db.query(`SELECT LAST_INSERT_ID() AS id`);
    const bookingId = lastIdResult[0]?.id;

    if (bookingId) {
      console.log(
        `Booking successfully made for ${booking.customerName} -@${booking.email} with ID: ${bookingId}`
      );
      return bookingId;
    }

    return null;

    return null;
  } catch (error) {
    console.log("Error creating Booking", error);
  }
};

export default createBooking;
