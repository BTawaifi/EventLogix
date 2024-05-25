import React from 'react';
import { CSVLink } from 'react-csv';
import ExportIcon from './ExportIcon';
import { Event } from '@/Interfaces/Interfaces';

const ExportButton = ({ data }: { data: Event[] }) => {
  const headers = [
    { label: 'Event ID', key: 'id' },
    { label: 'Actor ID', key: 'actorId' },
    { label: 'Actor Name', key: 'actor.name' },
    { label: 'Actor Email', key: 'actor.email' },
    { label: 'Target ID', key: 'targetId' },
    { label: 'Target Name', key: 'target.name' },
    { label: 'Target Email', key: 'target.email' },
    { label: 'Action ID', key: 'actionId' },
    { label: 'Action Name', key: 'action.name' },
    { label: 'Group', key: 'group' },
    { label: 'Location', key: 'location' },
    { label: 'Occurred At', key: 'occurred_at' },
    { label: 'Metadata Description', key: 'metadata.description' },
    { label: 'Metadata Teammate ID', key: 'metadata.teammate_id' },
    { label: 'Metadata Incident ID', key: 'metadata.incident_id' },
    { label: 'Metadata Redirect', key: 'metadata.redirect' },
    { label: 'Metadata X Request ID', key: 'metadata.x_request_id' },
  ];

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={'events.csv'}
      style={{ margin: 0 }}
    >
      <button className="px-4 py-2  border border-solid  hover:bg-white border-gray-300  dark:bg-gray-700 text-gray-700 flex items-center gap-x-1 m-0">
        <ExportIcon />
        <span>EXPORT</span>
      </button>
    </CSVLink>
  );
};

export default ExportButton;
