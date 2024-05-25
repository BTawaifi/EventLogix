export type User = {
  id: string;
  name: string;
  email: string;
  eventsAsActor: Event[];
  eventsAsTarget: Event[];
};

export type Action = {
  id: string;
  name: string;
  object: string;
  events: Event[];
};

export type Event = {
  id: string;
  actor: User;
  actorId: string;
  target: User;
  targetId: string;
  action: Action;
  actionId: string;
  group: string;
  location: string;
  occurred_at: Date;
  metadata: Record<string, unknown>;
};
