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

export async function createEvent({event_json}: {event_json: JSON}): Promise<string> {
  try {
    const response = await fetch(`/api/calendar`, {
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