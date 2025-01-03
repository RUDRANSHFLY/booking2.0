"use client";
import React, { FormEvent, useRef } from "react";
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

const SearchBooking = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const id = nameRef.current?.value;
    const endpoint = `${BASE_URL}/booking/${id}`;
    const res = await axios.get(endpoint)
    const data = await res.data ;
    console.log(data);
    
  };

  return (
    <Sheet>
      <SheetTrigger className={"bg-black text-white px-3 py-1 "}>
        Search Booking
      </SheetTrigger>
      <SheetContent side={"top"} className={"w-fit mx-auto"}>
        <div className={"border-2 border-l-cyan-50 mb-5"}>
          <form
            action={""}
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
              onClick={handleSubmit}
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
