"use client";

import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import axios from "axios";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const BookingForm = () => {
  const [checkInTime, setCheckInTime] = useState("");
  const { toast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const guestCountRef = useRef<HTMLInputElement>(null);
  const checkInTimeRef = useRef<HTMLInputElement>(null);
  const checkOutTimeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();

    const startDate = new Date(checkInTimeRef.current?.value as string);
    const formattedStarDate = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1
    ).padStart(2, "0")}-${String(startDate.getDate()).padStart(
      2,
      "0"
    )} ${String(startDate.getHours()).padStart(2, "0")}:${String(
      startDate.getMinutes()
    ).padStart(2, "0")}:00`;

    const endDate = new Date(checkOutTimeRef.current?.value as string);
    const formattedEndDate = `${endDate.getFullYear()}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")} ${String(
      endDate.getHours()
    ).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}:00`;

    const bookingData = {
      customerName: nameRef.current?.value,
      email: emailRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      guestCount: guestCountRef.current?.value,
      checkInDateTime: formattedStarDate,
      checkOutDateTime: formattedEndDate,
    };

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = `${BASE_URL}/booking`;

    const booking = await axios.post(endpoint, bookingData);
    if (booking) {
      console.log(booking);
      toast({
        title: "Booking Created",
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger className={"bg-black text-white px-3 py-1 "}>Add Booking</SheetTrigger>
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
              <SheetTitle>Add New Booking</SheetTitle>
            </SheetHeader>
            <div className="flex gap-5">
              <Input
                name={"name"}
                type={"text"}
                placeholder={"Enter your name"}
                className={"bg-white"}
                ref={nameRef}
              />
              <Input
                name={"email"}
                type={"email"}
                placeholder={"enter your email"}
                className={"bg-white"}
                ref={emailRef}
              />
            </div>
            <div className={"flex gap-5"}>
              <Input
                name={"phone_number"}
                type={"number"}
                placeholder={"enter your phonenumber"}
                className={"bg-white"}
                ref={phoneNumberRef}
              />
              <Input
                name={"guest_count"}
                type={"number"}
                placeholder={"enter guest count"}
                className={"bg-white"}
                ref={guestCountRef}
              />
            </div>
            <div className={"flex justify-evenly"}>
              <div>
                <Label htmlFor="check_in_time">Start Date</Label>
                <Input
                  name={"check_in_time"}
                  type={"datetime-local"}
                  className={"bg-white w-full"}
                  ref={checkInTimeRef}
                />
              </div>

              <div>
                <Label htmlFor="check_out_time">End Date</Label>
                <Input
                  name={"check_out_time"}
                  type={"datetime-local"}
                  className={"bg-white"}
                  ref={checkOutTimeRef}
                />
              </div>
            </div>
            <Button
              variant={"default"}
              name={"submit"}
              type={"submit"}
              className={"w-fit mx-auto"}
            >
              Add Booking
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingForm;
