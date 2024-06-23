// pages/api/calendar.ts

import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { auth_options } from "../auth/[...nextauth]/route";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  //const response = { getHeader() {}, setCookie() {}, setHeader() {} }
  //response.setHeader('Content-Type', 'application/json');
  const session = await getServerSession(auth_options);
  console.log("SSSSS");
  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log(session.accessToken)
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken});

  const body = request.body.event_json;
  console.log('Satwikknmskms');
  console.log(body);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const { searchParams } = new URL(request.url!);
  const startTime = body.start.dateTime;
  const endTime = body.end.dateTime;
  const location = body.location;
  const eventTitle = body.summary;
  const description = body.description;
  const timeZone = body.start.timeZone;
  console.log('aaaaadjksjd');
  console.log(body);
  console.log(startTime, endTime, location, eventTitle, description, timeZone);

  //console.log(request);
  if (request.method === "POST") {
    const event = {
        start:{
            dateTime: new Date(startTime).toISOString(),
            timeZone: timeZone

        },
        end:{
          dateTime: new Date(startTime).toISOString(),
          timeZone: timeZone

        },
        summary:eventTitle,
        location:location,
        description:description


    }

    try {
      console.log('aaaaa');
      const response = await calendar.events.insert({
        auth: oauth2Client,
        calendarId: "primary",
        requestBody: event,
      });
      
      console.log("Successfully added event to calendar");
      return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error", details: error.message });   
      console.log("Failed to add event to calendar");
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
