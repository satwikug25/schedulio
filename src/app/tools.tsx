import Groq from "groq-sdk";
import { getSession } from "next-auth/react";
import { DayPilot } from "@daypilot/daypilot-lite-react";
import { addEvent } from "./util";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

import { ConvexHttpClient, ConvexClient } from "convex/browser";



export async function getWeather({location}: {location: string}): Promise<string> {
  console.log("HERE@2743074230");
  try {
    const httpClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || '');
    httpClient.mutation(api.business.pushEventsToDatabase).then(console.log);
    const session = await getSession();
    const response = await fetch(`/api/weather?location=${location}`);
    if (response.ok) {
      const weatherData = await response.json();
      return JSON.stringify(weatherData);
    } else {
      return JSON.stringify({ error: `Error: ${response.statusText}` });
    }
  } catch (error) {
    return JSON.stringify({ error: `Error: ${error}` });
  }
}

export async function createEvent({event_json}: {event_json: JSON}): Promise<string> {
  console.log("HERE");
  try {
    const session = await getSession();
    const response = await fetch(`/api/calendar`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.accessToken}`
      },
      body: JSON.stringify(event_json),
    });
    if (response.ok) {
      return JSON.stringify({ success: "Event created" });
    } else {
      return JSON.stringify({ error: `Error: ${response.statusText}` });
    }
  } catch (error) {
    return JSON.stringify({ error: `Error: ${error}` });
  }
}

// export async function createEvent(event_json: {event_json: JSON}): Promise<string> {
//   console.log("HERE3");
//   try {
//     console.log("HERE");
//     // Assuming `calendar` is accessible here, if not, you need to pass it as a parameter
//     // addEvent(1,"From groq","2024-10-02T10:30:00","2024-10-02T13:00:00","#fffff",2);
//     const updateEvent = useMutation(api.business.pushEventsToDatabase);
//     const result = await updateEvent({phoneNumber: "6546541321", events: ["From groq"]});
//     console.log("Result:");
//     console.log(result);
//     return JSON.stringify({ success: "Event created from createEvent" });
//   } catch (error) {
//     return JSON.stringify({ error: `Error: ${error}` });
//   }
// }

export const createEventSchema: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "createEvent",
    description: "Creates a new google calendar event with the JSON data provided of the event description and its time",
    parameters: {
      type: "object",
      properties: {
        event_json: { type: "object", description: "The google calendar event data, which will be used to make the \
          google calendar event, provide it in the JSON format as can be seen in the example delimited \
          by triple backticks dont make the function call until you have confirmed it with tthe user \
          ``` {\
  'summary': 'Google I/O 2015',\
  'location': '800 Howard St., San Francisco, CA 94103',\
  'description': 'A chance to hear more about Google\'s developer products.',\
  'start': {\
    'dateTime': '2015-05-28T09:00:00-07:00',\
    'timeZone': 'America/Los_Angeles'\
  },\
  'end': {\
    'dateTime': '2015-05-28T17:00:00-07:00',\
    'timeZone': 'America/Los_Angeles'\
  },\
  'confirmed': 'true',\
} ``` " },
      },
    },
  },
};

export const getWeatherSchema: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "getWeather",
    description: "Get the weather for a given location",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string", description: "The location: e.g. Paris" },
      },
    },
  },
};