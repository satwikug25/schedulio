"use client"
import React from 'react'
import DashNav from './components/DashNav'
import EventCard from './components/eventCard'
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const events = [
  {
    name: "Joe",
    phoneNumber: "1234567899",
    summary: "Laptop Screen Replacement",
  },
]

const Dashboard = () => {
  return (
    <div>
      <DashNav />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <table className="min-w-full bg-white border text-black">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Summary</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{event.name}</td>
                <td className="py-2 px-4 border-b">{event.phoneNumber}</td>
                <td className="py-2 px-4 border-b">{event.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
