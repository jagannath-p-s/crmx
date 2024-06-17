import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ContactCard from './ContactCard';

const Column = ({ column, expanded, toggleExpand }) => {
  const getTextColorClass = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'red':
        return 'text-red-600';
      case 'green':
        return 'text-green-600';
      case 'yellow':
        return 'text-yellow-600';
      case 'purple':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      onClick={() => toggleExpand(column.name)}
      className={`flex flex-col transition-all duration-300 ease-in-out
        ${expanded.includes(column.name) ? 'w-64' : 'w-16'}
        ${expanded.includes(column.name) ? column.bgColor : 'bg-white'}
        border ${expanded.includes(column.name) ? `border-${column.color}-300` : 'border-gray-300'}
        p-4 rounded-lg shadow-md relative cursor-pointer`}
      style={{ maxHeight: '100vh', overflowY: 'auto', paddingRight: '8px' }}
    >
      {expanded.includes(column.name) ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className={`text-lg font-semibold truncate ${getTextColorClass(column.color)}`}>
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
            <p className={`text-sm font-semibold text-center ${getTextColorClass(column.color)}`}>
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
