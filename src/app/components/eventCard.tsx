// EventCard.tsx
import React from 'react';

interface EventCardProps {
  title: string;
  startDateTime: string;
  endDateTime: string;
  timeZone: string;
  description?: string;
  location?: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, startDateTime, endDateTime, timeZone, description, location }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">
        {new Date(startDateTime).toLocaleString()} - {new Date(endDateTime).toLocaleString()} ({timeZone})
      </p>
      {description && <p className="mt-2 text-gray-700">{description}</p>}
      {location && <p className="mt-2 text-gray-500">Location: {location}</p>}
    </div>
  );
};

export default EventCard;
