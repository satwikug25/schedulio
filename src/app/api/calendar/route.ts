// pages/api/calendar.ts

import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession();

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session!.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const { searchParams } = new URL(request.url!);
  const startTime = request.body.startTime;
  const endTime = request.body.endTime;
  const location = request.body.location;
  const eventTitle = request.body.eventTitle;
  const description = request.body.description;
  const timeZone = request.body.timeZone;



  if (request.method === "POST") {
    const event = {
        'start':{
            'dateTime': startTime,
            'timeZone':timeZone

        },
        'end':{
            'dateTime': endTime,
            'timeZone':timeZone

        },
        'summary':eventTitle,
        'location':location,
        'description':description


    }
    

    try {
      const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
      });
      console.log("Successfully added event to calendar");
      return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
      response.status(500);
      console.log("Failed to add event to calendar");
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
