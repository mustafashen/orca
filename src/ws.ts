import { WebSocket } from "ws";
import { Subject, asyncScheduler, debounceTime, throttleTime } from "rxjs";
export default function socketHandler(wss: WebSocket, ais: WebSocket) {
  const userEventSubject = new Subject();
  const throttledUserEvents = userEventSubject.pipe(throttleTime(5000, asyncScheduler, { trailing: true }));

  wss.on("message", (message: Buffer) => {
    const messageString = message.toString("utf-8");
    userEventSubject.next(messageString);
  });

  throttledUserEvents.subscribe((bbox: string) => {
    let subscriptionMessage = {
      Apikey: process.env.AIS_API_KEY,
      BoundingBoxes: JSON.parse(bbox),
      FilterMessageTypes: ["PositionReport"] 
    };

    ais.send(JSON.stringify(subscriptionMessage));
  });

  ais.on("message", (event) => {
    const eventJSON = event.toString("utf-8"); 
    const eventObject = JSON.parse(eventJSON);
    const eventData = JSON.stringify(eventObject)
    wss.send(eventData)
  }); 
}
