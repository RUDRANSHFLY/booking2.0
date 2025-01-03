"use client";
import React, { FormEvent, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { ToastAction } from "./ui/toast";
import { toast } from "@/hooks/use-toast";

interface SearchBookingProps {
  onBookingData: (data: any) => void; 
}

const SearchBooking = ({onBookingData} : SearchBookingProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const id = nameRef.current?.value;
    try {
      
      const endpoint = `${BASE_URL}/booking/${id}`;
      const res = await axios.get(endpoint)
      const data = await res.data ;
      onBookingData(data)
      setIsSheetOpen(false)
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast({
          variant: "destructive",
          title: "We couldn't find a booking",
          description: "The Booking ID you entered does not match any existing records. Please check the ID and try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        // Handle other errors
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    }
    
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className={"bg-black text-white px-3 py-1 "}>
        Search Booking
      </SheetTrigger>
      <SheetContent side={"top"} className={"w-fit mx-auto"}>
        <div className={"border-2 border-l-cyan-50 mb-5"}>
          <form
            action={""}
            onSubmit={handleSubmit}
            className={
              "flex flex-col gap-5 w-full bg-slate-100 mx-auto px-2 py-3 mt-5"
            }
          >
            <SheetHeader>
              <SheetTitle>Serach your Booking</SheetTitle>
            </SheetHeader>

            <Input
              name={"name"}
              type={"text"}
              placeholder={"Enter your Booking Id"}
              className={"bg-white"}
              ref={nameRef}
            />

            <Button
              variant={"default"}
              name={"submit"}
              type={"submit"}
              className={"w-fit mx-auto"}
             
            >
              Search
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBooking;
