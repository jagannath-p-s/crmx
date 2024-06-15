import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ContactCard from './ContactCard';

const Column = ({ column, expanded, toggleExpand }) => {
  return (
    <div
      onClick={() => toggleExpand(column.name)}
      className={`flex flex-col transition-all duration-300 ease-in-out
        ${expanded.includes(column.name) ? 'w-64' : 'w-16'}
        ${expanded.includes(column.name) ? column.bgColor : 'bg-gray-100'}
        border ${expanded.includes(column.name) ? `border-${column.color}-300` : 'border-gray-300'}
        p-4 rounded-lg shadow-md relative cursor-pointer`}
      style={{ maxHeight: '100vh', overflowY: 'auto', paddingRight: '8px' }}
    >
      {expanded.includes(column.name) ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className={`text-lg font-semibold text-${column.color}-1600 truncate`}>
              {column.name}
            </h2>
            <button
              className="text-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(column.name);
              }}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pr-2">
            {column.contacts.length > 0 ? (
              column.contacts.map((contact, index) => (
                <ContactCard key={index} contact={contact} color={column.color} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <p className="mb-2">No contacts</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="transform -rotate-90 whitespace-nowrap">
            <p className={`text-sm font-semibold text-${column.color}-600 text-center`}>
              {column.name}
            </p>
          </div>
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(column.name);
            }}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Column;
