import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Contacts = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState('Lead');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleExpand = (column) => {
    setExpanded(expanded === column ? '' : column);
  };

  const columns = [
    { name: 'Lead', color: 'purple' },
    { name: 'Prospect', color: 'blue' },
    { name: 'Opportunity', color: 'indigo' },
    { name: 'Customer-Won', color: 'green' },
    { name: 'Lost/Rejected', color: 'red' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <PeopleOutlineIcon className="text-blue-500" style={{ fontSize: '1.75rem' }} />
                <h1 className="text-xl font-semibold ml-2">Contacts</h1>
              </div>
              <div className="relative">
                <button
                  className="flex items-center bg-gray-200 p-2 rounded-lg"
                  onClick={toggleDropdown}
                >
                  To be converted
                  <ArrowDropDownIcon className="ml-2" />
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-gray-100">Default View</li>
                      <li className="px-4 py-2 hover:bg-gray-100">To be converted</li>
                      <li className="px-4 py-2 hover:bg-gray-100">Created today</li>
                      <li className="px-4 py-2 hover:bg-gray-100">Created this week</li>
                      <li className="px-4 py-2 hover:bg-gray-100">Created this month</li>
                      <li className="px-4 py-2 hover:bg-gray-100">To be contacted today</li>
                      <li className="px-4 py-2 hover:bg-gray-100">To be contacted tomorrow</li>
                      <li className="px-4 py-2 hover:bg-gray-100">By next contact date</li>
                      <li className="px-4 py-2 text-blue-600 hover:bg-gray-100">+ Create New</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip title="Settings">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <SettingsOutlinedIcon style={{ fontSize: '1.75rem' }} />
                </button>
              </Tooltip>
              <Tooltip title="Table View">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <TableChartOutlinedIcon style={{ fontSize: '1.75rem' }} />
                </button>
              </Tooltip>
              <Tooltip title="Upload">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <FileUploadOutlinedIcon style={{ fontSize: '1.75rem' }} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Stages */}
      <div className="flex flex-grow p-4 space-x-4">
        {columns.map((column) => (
          <div
            key={column.name}
            className={`flex flex-col ${expanded === column.name ? 'w-64' : 'w-16'} ${expanded === column.name ? `bg-${column.color}-100` : 'bg-gray-100'} border ${expanded === column.name ? `border-${column.color}-300` : 'border-gray-300'} p-4 rounded-lg shadow-md`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-lg font-semibold ${expanded === column.name ? 'block' : 'hidden'}`}>
                {column.name}
              </h2>
              <button className="text-gray-500" onClick={() => toggleExpand(column.name)}>
                {expanded === column.name ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              </button>
            </div>
            {expanded !== column.name && (
              <div className="flex items-center justify-center">
                <p className="transform rotate-90 text-lg font-semibold text-gray-600">{column.name}</p>
              </div>
            )}
            {expanded === column.name && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                {column.name === 'Lead' && (
                  <>
                    <p className="font-bold text-blue-600">John Doe</p>
                    <p>Contact No: 9999999999</p>
                    <p>Email: johndoe@gmail.com</p>
                    <p>Date created: 14-05-2024</p>
                  </>
                )}
                {column.name === 'Prospect' && <p>Prospect content here</p>}
                {column.name === 'Opportunity' && <p>Opportunity content here</p>}
                {column.name === 'Customer-Won' && <p>Customer-Won content here</p>}
                {column.name === 'Lost/Rejected' && <p>Lost/Rejected content here</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
