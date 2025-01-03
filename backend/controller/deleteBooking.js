import connectDB from "../db/db.js";

const deleteBooking = async (booking) => {
  try {
    const db = await connectDB();
    if (!db) {
      return new Error("Unable to Connect to Database");
    }

    await db.connect();

    const { id } = booking;

  
    

    const query = `DELETE FROM bookings WHERE id = ?`;
    const result = await db.query(query,[id])
   
    const affectedRows = result[0].affectedRows;

    if (affectedRows === 0) {
        console.log("No ID exists with that booking");
        return false;
    }

    console.log(`the booking with id : ${id} has been deleted `);
    

    return true

  } catch (error) {
    console.log("Error creating Booking", error);
  }
};

export default deleteBooking;
