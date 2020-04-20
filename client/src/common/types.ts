export interface ChatMessageData {
  id: string;
  message: string;
  time: Date;
}

export interface queryData {
  queryText: string;
  fulfillmentText: string;
  intent: string;
  time: Date;
}
