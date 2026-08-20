export type SendNotificationPayload = {
  user_ids: number[];
  title: string;
  body: string;
};

export type SendNotificationFormValues = {
  title: string;
  body: string;
  user_ids: number[];
};
