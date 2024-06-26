import Groq from "groq-sdk";
import { api } from "../../convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";

interface EventJson {
  phone?: string;
  Phone?: string;
  summary: string;
  name?: string;
  dateTime?: string;
  [key: string]: any; // To allow additional properties
}

export async function getWeather({location}: {location: string}): Promise<string> {
  try {
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

export async function getEventsOnDay({minDate, maxDate}: {minDate: string, maxDate: string}): Promise<string> {
  try {
    
    const encodedMinDate = encodeURIComponent(minDate);
    const encodedMaxDate = encodeURIComponent(maxDate);
    const response = await fetch(`/api/calendar/check?minDate=${encodedMinDate}&maxDate=${encodedMaxDate}`);
    if (response.ok) {
      const events = await response.json();
      return JSON.stringify(events);
    } else {
      return JSON.stringify({ error: `Error: ${response.statusText}` });
    }
  } catch (error) {
    return JSON.stringify({ error: `Error: ${error}` });
  }
}

export const getEventsOnDaySchema: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "getEventsOnDay",
    description: "Get the current appointments in between a given date range using google calendar. Use this to find\
    availability for more appointments. The minDate and maxDate are required to be provided in the format",
    parameters: {
      type: "object",
      properties: {
        minDate: { type: "string", description: "The start date and time of when we start returning events\
          from it has the format like the example delimited by triple backticks ```2015-05-28T09:00:00-07:00``` " },
        maxDate: { type: "string", description: "The end date and time of when we start returning events.\
          Only return events before this date and time. It has the format like the example delimited by triple backticks \
          ```2015-05-28T09:00:00-07:00``` " },
      },
    },
  },
};

export async function createEvent({
  event_json,
}: {
  event_json: EventJson;
}): Promise<string> {
  try {
    console.log("event_json", event_json);

    // Destructure the specific keys you need
    const { name, Phone, phone, summary } = event_json;

    // Ensure ConvexHttpClient is properly initialized
    const httpClient = new ConvexHttpClient(
      process.env.NEXT_PUBLIC_CONVEX_URL || ""
    );

    // Use the destructured variables in the mutation
    httpClient
      .mutation(api.business.pushEventsToDatabase, {
        phoneNumber: phone ? phone : Phone ? Phone : "",
        summary,
        name,
      })
      .then(console.log);

    const response = await fetch('/api/calendar/insert', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event_json),
    });

    if (response.ok) {
      const responseData = await response.json();
      return JSON.stringify(responseData);
    } else {
      return JSON.stringify({ error: `Error: ${response.statusText}` });
    }
  } catch (error) {
    return JSON.stringify({ error: `Error: ${error}` });
  }
}

export const createEventSchema: Groq.Chat.Completions.ChatCompletionTool = {
  type: "function",
  function: {
    name: "createEvent",
    description:
      "Creates a new google calendar event with the JSON data provided of the event description and its time",
    parameters: {
      type: "object",
      properties: {
        event_json: { type: "object", description: "The google calendar event data, which will be used to make the \
          google calendar event, provide it in the JSON format as can be seen in the example delimited \
          by triple backticks. Once you have all the information, confirm it with tthe user and then use this tool  \
          ``` {\
  'summary': 'Dental Cleaning on 06/25/2024',\
  'name': 'The name of the caller',\
  'location': '800 Howard St., San Francisco, CA 94103',\
  'email': 'abcd@gmail.com'\
  'phone': '480-791-7983',\
  'start': {\
    'dateTime': '2015-05-28T09:00:00-07:00',\
    'timeZone': 'America/Los_Angeles'\
  },\
  'end': {\
    'dateTime': '2015-05-28T17:00:00-07:00',\
    'timeZone': 'America/Los_Angeles'\
  },\
  'confirmed': 'true',\
} ``` ",
        },
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