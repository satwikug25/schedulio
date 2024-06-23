import { DayPilot } from "@daypilot/daypilot-lite-react";

export let ievents =  [
        {
            id: 1,
            text: "Event 1",
            start: "2024-10-02T10:30:00",
            end: "2024-10-02T13:00:00",
            tags: {
                participants: 2,
            }
        },
        {
            id: 2,
            text: "Event 2",
            start: "2024-10-03T09:30:00",
            end: "2024-10-03T11:30:00",
            backColor: "#6aa84f",
            tags: {
                participants: 1,
            }
        },
        {
            id: 3,
            text: "Event 3",
            start: "2024-10-03T12:00:00",
            end: "2024-10-03T15:00:00",
            backColor: "#f1c232",
            tags: {
                participants: 3,
            }
        },
        {
            id: 4,
            text: "Event 4",
            start: "2024-10-01T11:30:00",
            end: "2024-10-01T14:30:00",
            backColor: "#cc4125",
            tags: {
                participants: 2,
            }
        },
    ];

// make a add event function that takes params as id, text, start, end, backColor, participants
export function addEvent(id: number, text: string, start: string, end: string, backColor: string, participants: number) {
    ievents.push({
        id: id,
        text: text,
        start: start,
        end: end,
        backColor: backColor,
        tags: {
            participants: participants,
        }
    });
}
