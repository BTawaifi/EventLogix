import React, { useState } from 'react';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Event } from '@/Interfaces/Interfaces';

const ExpandableRow = ({ event }: { event: Event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(event.occurred_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const formattedDateWYear = new Date(event.occurred_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <>
      {!isExpanded && (
        <motion.tr
          key="collapsed"
          className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 leading-loose"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onClick={() => setIsExpanded(true)}
        >
          <td
            className="py-2 px-4 flex items-center bg-white dark:bg-gray-800"
            style={{ maxWidth: '20em', textWrap: 'nowrap' }}
          >
            <Avatar name={event.actor.name} />
            <div className="ml-4">{event.actor.email}</div>
          </td>
          <td
            className="py-2 px-4 bg-white dark:bg-gray-800"
            style={{ maxWidth: '15em', textWrap: 'nowrap' }}
          >
            {event.action.name}
          </td>
          <td
            className="py-2 px-4 bg-white dark:bg-gray-800"
            style={{ maxWidth: '9em', textWrap: 'nowrap' }}
          >
            {formattedDate}
          </td>
          <td
            className="py-2 px-4 bg-white dark:bg-gray-800 text-right"
            style={{ maxWidth: '1em', textWrap: 'nowrap' }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="cursor-pointer text-gray-300"
            />
          </td>
        </motion.tr>
      )}

      {isExpanded && (
        <motion.tr
          key="expanded"
          className="bg-gray-50 dark:bg-gray-900 relative"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <td colSpan={4} className="p-4 pt-8 pb-8 relative">
            <motion.div
              initial={{ opacity: 0, y: -0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0 }}
              className=""
              style={{ margin: '-2em' }}
            >
              <div className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 relative w-full z-1">
                <div className="flex items-flex-start flex-row justify-evenly">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-md font-bold text-gray-400 my-2">
                        ACTOR
                      </h3>
                      <div className="flex">
                        <div className="text-gray-400 w-20">Name</div>
                        <div className="w-30 ov-ellipsis">
                          {event.actor.name}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-400 w-20">Email</div>
                        <div className="w-30 ov-ellipsis">
                          {event.actor.email}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-400 w-20">ID</div>
                        <div className="w-30 ov-ellipsis">{event.actor.id}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-bold text-gray-400 my-2">
                        METADATA
                      </h3>
                      <pre
                        className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs"
                        style={{ textWrap: 'wrap' }}
                      >
                        {JSON.stringify(event.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-md font-bold text-gray-400 my-2">
                        ACTION
                      </h3>
                      <div className="flex">
                        <div className="text-gray-400 w-20">Name</div>
                        <div className="w-30 ov-ellipsis">
                          {event.action.name}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-400 w-20">Object</div>
                        <div className="w-30 ov-ellipsis">
                          {event.action.object}
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-400 w-20">ID</div>
                        <div className="w-30 ov-ellipsis">
                          {event.action.id}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-md font-bold text-gray-400 my-2">
                        TARGET
                      </h3>
                      {event.target && (
                        <>
                          <div className="flex">
                            <div className="text-gray-400 w-20">Name</div>
                            <div className="w-30 ov-ellipsis">
                              {event.target.name}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="text-gray-400 w-20">Email</div>
                            <div className="w-30 ov-ellipsis">
                              {event.target.email}
                            </div>
                          </div>
                          <div className="flex">
                            <div className="text-gray-400 w-20">ID</div>
                            <div className="w-30 ov-ellipsis">
                              {event.target.id}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-md font-bold text-gray-400 my-2">
                      DATE
                    </h3>
                    <div className="flex">
                      <div className="text-gray-400 w-20">Readable</div>
                      <div className="w-30 ov-ellipsis">{formattedDateWYear}</div>
                    </div>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-2 right-2 cursor-pointer text-gray-300"
                />
              </div>
            </motion.div>
          </td>
        </motion.tr>
      )}
    </>
  );
};

export default ExpandableRow;
