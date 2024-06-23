// // pages/api/calendar.ts

// import { google } from "googleapis";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next";
// import { NextRequest, NextResponse } from "next/server";
// import { options } from "../auth/[...nextauth]/route";

// export async function POST(req: NextApiRequest) {
//   console.log("Hi1 ")
//   console.log(req);
//   const session = await getServerSession(options);


//   console.log("Hi2 ")
//   if (!session || !session.accessToken) {
//     console.log("Hi3 ")
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const oauth2Client = new google.auth.OAuth2();
//   oauth2Client.setCredentials({ access_token: session.accessToken });

//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });
//   const body = JSON.stringify(req.body);
//   const startTime = req.body.start.dateTime;
//   const endTime = req.body.end.dateTime;
//   const location = req.body.location;
//   const eventTitle = req.body.summary;
//   const description = req.body.description;
//   const timeZone = req.body.timeZone;

  



//   if (req.method === "POST") {
//     const calendarEvent = {
//       start: {
//         dateTime: startTime,
//         timeZone: timeZone,
//       },
//       end: {
//         dateTime: endTime,
//         timeZone: timeZone,
//       },
//       summary: eventTitle,
//       location:location,
//       description: description,
//     };


    
    

//     try {
//       const response = await calendar.events.insert({
//         calendarId: "primary",
//         requestBody: calendarEvent,
//       });
//       return NextResponse.json(response.data, { status: 200 });
//     } catch (error:any) {
//       NextResponse.json({status:500});
//     }
//   } else {
//     NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
//   }
// }

// src/app/api/calendar/route.ts

import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Options } from '../../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  console.log("Hi1 ");
  const session = await getServerSession(Options);

  console.log("Hi2 ");
  if (!session || !session.accessToken) {
    console.log("Hi3 ");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const { start, end, location, summary, description } = await req.json();

  const calendarEvent = {
    start: {
      dateTime: start.dateTime,
      timeZone: start.timeZone,
    },
    end: {
      dateTime: end.dateTime,
      timeZone: end.timeZone,
    },
    summary: summary,
    location: location,
    description: description,
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: calendarEvent,
      id: 'aaaa1'
    });
    console.log('Event created:', response.data);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
