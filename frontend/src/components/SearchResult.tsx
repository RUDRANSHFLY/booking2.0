import React from 'react'

interface SearchResultProps{
    data : any;
}

const SearchResult = ({data} : SearchResultProps) => {
    const booking = data.booking;

    const checkInDateTime = booking.checkInDateTime;
    const checkOutDateTime = booking.checkOutDateTime;

    const date = new Date(checkInDateTime);
    const endDate = new Date(checkOutDateTime);

// Convert to locale string
const localeDateString = date.toLocaleString('en-US', {
  year: 'numeric',
  month: 'long', // 'short' for abbreviated month names
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true, // Use 12-hour format (set to false for 24-hour format)
});

const localeEndDateString = endDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long', // 'short' for abbreviated month names
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format (set to false for 24-hour format)
  });

    
    return (
    <div className={'max-w-5xl my-10 px-5 py-5 bg-slate-300 mx-auto w-full flex  flex-col xl:flex-row justify-between items-center gap-2'}>
       <div className={'flex gap-5 flex-col xl:flex-row items-center'}>

        <h1 className={'text-2xl font-bold italic'}>
            {booking.customerName}
        </h1>
        <h2 className={''}>
            {booking.email}
        </h2>
        <p className={'font-bold'}>
            {booking.phoneNumber}
        </p>
        
       </div>
       <div className={'flex flex-col xl:flex-row'}>
        <p>
        {localeDateString}
        </p>
        <span className='hidden xl:block'>
            -
        </span>
        <p>
        {localeEndDateString}
        </p>
       </div>
    </div>
  )
}

export default SearchResult