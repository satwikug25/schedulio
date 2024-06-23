import Groq from "groq-sdk";

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

export async function createEvent({event_json}: {event_json: JSON}): Promise<string> {
  try {
    const response = await fetch('/api/calendar/insert', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          by triple backticks. Once you have all the information, confirm it with tthe user and then use this tool \
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