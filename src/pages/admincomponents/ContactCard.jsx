// ContactCard.jsx
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';

const ContactCard = ({ contact, color }) => {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col justify-between">
      <div>
        <div className={`text-sm font-bold text-${color}-600 mb-2`}>{contact.name}</div>
        <p className="text-sm mb-1">Contact No: {contact.contactNo}</p>
        <p className="text-sm mb-1">Email: {contact.email}</p>
        <p className="text-sm">Date created: {contact.dateCreated}</p>
      </div>
      <div className="flex justify-end items-center space-x-2 mt-2">
        <Tooltip title="Add">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <AddIcon fontSize="small" />
          </button>
        </Tooltip>
        <Tooltip title="Edit">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <EditIcon fontSize="small" />
          </button>
        </Tooltip>
        <Tooltip title="Comment">
          <button className="p-1 rounded-full hover:bg-gray-200">
            <CommentIcon fontSize="small" />
          </button>
        </Tooltip>
        <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">J</div>
      </div>
    </div>
  );
};

export default ContactCard;
