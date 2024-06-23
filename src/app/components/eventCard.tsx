// EventCard.tsx
import React from 'react';
import { useQuery } from 'convex/react';
import { api } from "../../../convex/_generated/api"

// 9999988888



const EventCard = () => {
    const {companyName, events} =  useQuery(api.business.getBusinessByPhoneNumber, {phoneNumber: "4807918055"})?? "";
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4 text-black">
      {/* {events} */}
      {companyName}
    </div>
  );
};

export default EventCard;
