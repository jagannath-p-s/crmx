import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Column from './Column';

const Contacts = () => {
  const initialExpandedColumns = [];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState(initialExpandedColumns);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleExpand = (column) => {
    if (expanded.includes(column)) {
      setExpanded(expanded.filter((c) => c !== column));
    } else {
      if (expanded.length < 4) {
        setExpanded([...expanded, column]);
      } else {
        const [first, ...rest] = expanded;
        setExpanded([...rest, column]);
      }
    }
  };

  const columns = [
    { name: 'Lead', color: 'purple', bgColor: 'bg-purple-50', contacts: [
      { name: 'John Doe', contactNo: '9999999999', email: 'johndoe@gmail.com', dateCreated: '14-05-2024' },
      { name: 'Jane Roe', contactNo: '8888888888', email: 'janeroe@gmail.com', dateCreated: '13-05-2024' },
      { name: 'John Smith', contactNo: '7777777777', email: 'johnsmith@gmail.com', dateCreated: '12-05-2024' },
      { name: 'Jane Smith', contactNo: '6666666666', email: 'janesmith@gmail.com', dateCreated: '11-05-2024' },
      { name: 'John Brown', contactNo: '5555555555', email: 'johnbrown@gmail.com', dateCreated: '10-05-2024' },
    ]},
    { name: 'Prospect', color: 'blue', bgColor: 'bg-blue-50', contacts: [
      { name: 'Alice Johnson', contactNo: '4444444444', email: 'alicejohnson@gmail.com', dateCreated: '09-05-2024' },
      { name: 'Bob White', contactNo: '3333333333', email: 'bobwhite@gmail.com', dateCreated: '08-05-2024' },
    ]},
    { name: 'Opportunity', color: 'indigo', bgColor: 'bg-indigo-50', contacts: [] },
    { name: 'Customer-Won', color: 'green', bgColor: 'bg-green-50', contacts: [
      { name: 'Charlie Brown', contactNo: '2222222222', email: 'charliebrown@gmail.com', dateCreated: '07-05-2024' },
      { name: 'Diana Prince', contactNo: '1111111111', email: 'dianaprince@gmail.com', dateCreated: '06-05-2024' },
    ]},
    { name: 'Lost/Rejected', color: 'red', bgColor: 'bg-red-50', contacts: [
      { name: 'Edward Norton', contactNo: '0000000000', email: 'edwardnorton@gmail.com', dateCreated: '05-05-2024' },
    ]}
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-t border-gray-300">
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
      <div className="flex flex-grow p-4 space-x-4 overflow-x-auto">
        {columns.map((column) => (
          <Column
            key={column.name}
            column={column}
            expanded={expanded}
            toggleExpand={toggleExpand}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
