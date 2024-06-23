import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

export async function POST(request: Request) {
  console.log("POST request");
  const session = await getServerSession();

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const body = await request.json();
  const { startTime, endTime, location, eventTitle, description, timeZone } =
    body;

  if (!startTime || !endTime || !eventTitle || !location || !timeZone) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const event = {
    start: {
      dateTime: startTime,
      timeZone: timeZone,
    },
    end: {
      dateTime: endTime,
      timeZone: timeZone,
    },
    summary: eventTitle,
    location: location,
    description: description,
  };

  try {
    const calendarResponse = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
    console.log(calendarResponse);
    return NextResponse.json(calendarResponse.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession();

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const { searchParams } = new URL(request.url);
  const timeMin = searchParams.get("timeMin");
  const timeMax = searchParams.get("timeMax");

  if (!timeMin || !timeMax) {
    return NextResponse.json(
      { error: "timeMin and timeMax are required" },
      { status: 400 }
    );
  }

  try {
    const events = await calendar.events.list({
      calendarId: "primary",
      timeMin: timeMin,
      timeMax: timeMax,
      singleEvents: true,
      orderBy: "startTime",
    });
    return NextResponse.json(events.data.items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
