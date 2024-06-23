import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Options } from '../../auth/[...nextauth]/route';
import { time } from 'console';

export async function GET(request: Request) {
  const session = await getServerSession(Options);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //URL Params
  const { searchParams } = new URL(request.url);
  const minDate = searchParams.get('minDate');
  const maxDate = searchParams.get('maxDate');

  if (!minDate || !maxDate) {
    return NextResponse.json({ error: "MinDate and MaxDate is required" }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const event_list = await calendar.events.list({
      calendarId: 'primary',
      timeMax: maxDate,
      timeMin: minDate,
    });
    console.log('Event list returned');
    console.log(event_list);
    return NextResponse.json(event_list);
  } catch (error: any) {
    console.error('Error getting event list:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

