import BookingCalendar from "@/components/BookingCalender";
import BookingForm from "@/components/BookingForm";
import SearchBooking from "@/components/SearchBooking";
import { Toaster } from "@/components/ui/toaster";


export default function Home() {
  return (
    <>
      <main className={"max-w-7xl py-2 mx-auto h-screen"}>  
        <h1>
          Booking
        </h1>
        <section>
          <Toaster/>
          <div className={"flex mx-auto gap-5 w-fit"}>
            <BookingForm />
            <SearchBooking />
          </div>
          <BookingCalendar />
        </section>
      </main>
    </>
  );
}
