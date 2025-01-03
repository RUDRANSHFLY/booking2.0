"use client"

import BookingCalendar from "@/components/BookingCalender";
import BookingForm from "@/components/BookingForm";
import DeleteBooking from "@/components/DeleteBooking";
import SearchBooking from "@/components/SearchBooking";
import SearchResult from "@/components/SearchResult";
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";


export default function Home() {
  const [bookingData, setBookingData] = useState(null);
  const [refreshCalendar, setRefreshCalendar] = useState(false); // State to trigger calendar refresh

  const handleNewPatientAdded = () => {
    setBookingData(null)
    setRefreshCalendar(prev => !prev); // Toggle the refresh state
  };

  const handlePatientDelete = () => {
    setBookingData(null)
    setRefreshCalendar(prev => !prev);
  }
  



  const handleBookingData = (data :any) => {
    setBookingData(data); // Update the state with the received booking data
  };

  return (
    <>
      <main className={"max-w-7xl py-2 mx-auto h-screen"}>  
        <h1>
          Booking
        </h1>
        <section>
          <Toaster/>
          <div className={"flex mx-auto gap-5 w-fit"}>
            <BookingForm onNewPatientAdded={handleNewPatientAdded}  />
            <SearchBooking onBookingData={handleBookingData} />
            <DeleteBooking onNewPatientDelete={handlePatientDelete} />
          </div>
          {
            bookingData ? (
              <SearchResult data={bookingData} />
            ) : (
              <BookingCalendar refresh={refreshCalendar} />
            )
          }
        </section>
      </main>
    </>
  );
}
