-- Insert mock data into User table
INSERT INTO "User" (id, name, email) VALUES
  ('user_1', 'Ali Salah', 'ali@instatus.com'),
  ('user_2', 'Baraa Ahmed', 'baraa@instatus.com'),
  ('user_3', 'Omar Ali', 'omar@instatus.com'),
  ('user_4', 'Noura Al', 'noura@instatus.com'),
  ('user_5', 'Sara Kamal', 'sara@instatus.com'),
  ('user_6', 'Khalid Musa', 'khalid@instatus.com'),
  ('user_7', 'Layla Saleh', 'layla@instatus.com'),
  ('user_8', 'Faisal Noor', 'faisal@instatus.com'),
  ('user_9', 'Rami Zain', 'rami@instatus.com'),
  ('user_10', 'Maha Youssef', 'maha@instatus.com');

-- Insert mock data into Action table
INSERT INTO "Action" (id, name) VALUES
  ('action_1', 'user.login_succeeded'),
  ('action_2', 'user.logout_succeeded'),
  ('action_3', 'incident.create_succeeded'),
  ('action_4', 'user.invited_teammate'),
  ('action_5', 'incident.resolve_succeeded'),
  ('action_6', 'user.update_profile'),
  ('action_7', 'incident.delete_succeeded'),
  ('action_8', 'user.password_change'),
  ('action_9', 'user.searched_activity_log_events'),
  ('action_10', 'user.reset_password');

-- Insert mock data into Event table
INSERT INTO "Event" (id, actorId, targetId, actionId, group, location, occurred_at, metadata) VALUES
  ('event_1', 'user_1', 'user_1', 'action_1', 'instatus.com', '105.40.62.95', '2022-01-05T14:31:13.607Z', '{"redirect": "/setup", "description": "User login succeeded.", "x_request_id": "req_W1Y13QOHMI5H"}'),
  ('event_2', 'user_2', 'user_2', 'action_2', 'instatus.com', '105.40.62.96', '2022-01-06T10:15:00.000Z', '{"description": "User logout succeeded."}'),
  ('event_3', 'user_3', 'user_3', 'action_3', 'instatus.com', '105.40.62.97', '2022-01-07T09:45:23.000Z', '{"incident_id": "inc_1", "description": "Incident created successfully."}'),
  ('event_4', 'user_4', 'user_4', 'action_4', 'instatus.com', '105.40.62.98', '2022-01-08T12:34:56.000Z', '{"teammate_id": "user_5", "description": "User invited a teammate."}'),
  ('event_5', 'user_5', 'user_5', 'action_5', 'instatus.com', '105.40.62.99', '2022-01-09T14:12:12.000Z', '{"incident_id": "inc_2", "description": "Incident resolved successfully."}'),
  ('event_6', 'user_6', 'user_6', 'action_6', 'instatus.com', '105.40.63.00', '2022-01-10T16:30:45.000Z', '{"description": "User updated profile."}'),
  ('event_7', 'user_7', 'user_7', 'action_7', 'instatus.com', '105.40.63.01', '2022-01-11T17:50:34.000Z', '{"incident_id": "inc_3", "description": "Incident deleted successfully."}'),
  ('event_8', 'user_8', 'user_8', 'action_8', 'instatus.com', '105.40.63.02', '2022-01-12T19:20:11.000Z', '{"description": "User changed password."}'),
  ('event_9', 'user_9', 'user_9', 'action_9', 'instatus.com', '105.40.63.03', '2022-01-13T20:55:29.000Z', '{"description": "User searched activity log events."}'),
  ('event_10', 'user_10', 'user_10', 'action_10', 'instatus.com', '105.40.63.04', '2022-01-14T22:40:20.000Z', '{"description": "User reset password."}');
  ('event_11', 'user_3', 'user_4', 'action_1', 'instatus.com', '105.40.63.05', '2022-01-15T08:30:45.000Z', '{"description": "User login succeeded."}'),
  ('event_12', 'user_5', 'user_6', 'action_2', 'instatus.com', '105.40.63.06', '2022-01-16T09:45:30.000Z', '{"description": "User logout succeeded."}'),
  ('event_13', 'user_7', 'user_8', 'action_3', 'instatus.com', '105.40.63.07', '2022-01-17T10:20:15.000Z', '{"incident_id": "inc_5", "description": "Incident created successfully."}'),
  ('event_14', 'user_9', 'user_10', 'action_4', 'instatus.com', '105.40.63.08', '2022-01-18T11:10:20.000Z', '{"teammate_id": "user_2", "description": "User invited a teammate."}'),
  ('event_15', 'user_1', 'user_3', 'action_5', 'instatus.com', '105.40.63.09', '2022-01-19T12:05:40.000Z', '{"incident_id": "inc_6", "description": "Incident resolved successfully."}'),
  ('event_16', 'user_4', 'user_5', 'action_6', 'instatus.com', '105.40.63.10', '2022-01-20T13:30:25.000Z', '{"description": "User updated profile."}'),
  ('event_17', 'user_6', 'user_7', 'action_7', 'instatus.com', '105.40.63.11', '2022-01-21T14:40:55.000Z', '{"incident_id": "inc_7", "description": "Incident deleted successfully."}'),
  ('event_18', 'user_8', 'user_9', 'action_8', 'instatus.com', '105.40.63.12', '2022-01-22T15:20:30.000Z', '{"description": "User changed password."}'),
  ('event_19', 'user_10', 'user_1', 'action_9', 'instatus.com', '105.40.63.13', '2022-01-23T16:10:45.000Z', '{"description": "User searched activity log events."}'),
  ('event_20', 'user_2', 'user_3', 'action_10', 'instatus.com', '105.40.63.14', '2022-01-24T17:25:10.000Z', '{"description": "User reset password."}'),
  ('event_21', 'user_4', 'user_5', 'action_1', 'instatus.com', '105.40.63.15', '2022-01-25T18:30:45.000Z', '{"description": "User login succeeded."}'),
  ('event_22', 'user_6', 'user_7', 'action_2', 'instatus.com', '105.40.63.16', '2022-01-26T19:45:30.000Z', '{"description": "User logout succeeded."}'),
  ('event_23', 'user_8', 'user_9', 'action_3', 'instatus.com', '105.40.63.17', '2022-01-27T20:20:15.000Z', '{"incident_id": "inc_8", "description": "Incident created successfully."}'),
  ('event_24', 'user_10', 'user_1', 'action_4', 'instatus.com', '105.40.63.18', '2022-01-28T21:10:20.000Z', '{"teammate_id": "user_3", "description": "User invited a teammate."}'),
  ('event_25', 'user_2', 'user_4', 'action_5', 'instatus.com', '105.40.63.19', '2022-01-29T22:05:40.000Z', '{"incident_id": "inc_9", "description": "Incident resolved successfully."}');