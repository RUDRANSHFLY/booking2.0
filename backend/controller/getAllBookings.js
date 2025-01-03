import connectDB from "../db/db.js";

const getAllBooking = async () => {
  try {
    const db = await connectDB();
    if (!db) {
      return new Error("Unable to Connect to Database");
    }

    await db.connect();

    const query = `SELECT * FROM bookings`;
    const result = await db.query(query);

    if (result[0].length === 0) {
      return false;
    }

    const bookings = result[0];

    return bookings;
  } catch (error) {
    console.log("Error creating Booking", error);
  }
};

export default getAllBooking;
