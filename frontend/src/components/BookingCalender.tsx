"use client";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns"; // Use named imports
import { enUS } from "date-fns/locale";
import { useEffect, useState } from "react";
import axios from "axios";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface BookingProp{
    check_in_time : string,
    check_out_time: string,
    customer_name : string,
    guest_count : Number,
}

const BookingCalendar = () => {
    const [bookings, setBookings] = useState<BookingProp[]>([])

    useEffect(() => {
        const fetchBookings = async () => {
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL; 
            const endpoint = `${BASE_URL}/bookings`;
            const res = await axios.get(endpoint);
            const bookings = await res.data;
            setBookings(bookings.booking);
        }    
        fetchBookings()
    
    }, [])
    

    const events = bookings?.map(booking => ({
        start: new Date(booking.check_in_time),
        end: new Date(booking.check_out_time),
        title: `${booking.customer_name} - ${booking.guest_count} guests`,
        allDay: false
      }));


  return (
    <div className={"mt-5"}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default BookingCalendar;
