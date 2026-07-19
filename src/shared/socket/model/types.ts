export type ConnectionState =
  | 'initialized'
  | 'connecting'
  | 'connected'
  | 'unavailable'
  | 'failed'
  | 'disconnected';

export type ChannelAuthResponse = {
  auth: string;
  channel_data?: string;
};
