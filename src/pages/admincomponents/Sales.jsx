import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Column from './Column';
import TableView from './TableView';

const Sales = () => {
  const initialExpandedColumns = [];
  const [expanded, setExpanded] = useState(initialExpandedColumns);
  const [view, setView] = useState('cards'); // 'cards' or 'table'

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
    {
      name: 'Lead', color: 'purple', bgColor: 'bg-purple-50', contacts: [
        { name: 'John Doe', contactNo: '9999999999', email: 'johndoe@gmail.com', dateCreated: '2024-05-14' },
        { name: 'Jane Roe', contactNo: '8888888888', email: 'janeroe@gmail.com', dateCreated: '2024-05-13' },
        { name: 'John Smith', contactNo: '7777777777', email: 'johnsmith@gmail.com', dateCreated: '2024-05-12' },
        { name: 'Jane Smith', contactNo: '6666666666', email: 'janesmith@gmail.com', dateCreated: '2024-05-11' },
        { name: 'John Brown', contactNo: '5555555555', email: 'johnbrown@gmail.com', dateCreated: '2024-05-10' },
      ]
    },
    {
      name: 'Prospect', color: 'blue', bgColor: 'bg-blue-50', contacts: [
        { name: 'Alice Johnson', contactNo: '4444444444', email: 'alicejohnson@gmail.com', dateCreated: '2024-05-09' },
        { name: 'Bob White', contactNo: '3333333333', email: 'bobwhite@gmail.com', dateCreated: '2024-05-08' },
      ]
    },
    { name: 'Opportunity', color: 'indigo', bgColor: 'bg-indigo-50', contacts: [] },
    {
      name: 'Customer-Won', color: 'green', bgColor: 'bg-green-50', contacts: [
        { name: 'Charlie Brown', contactNo: '2222222222', email: 'charliebrown@gmail.com', dateCreated: '2024-05-07' },
        { name: 'Diana Prince', contactNo: '1111111111', email: 'dianaprince@gmail.com', dateCreated: '2024-05-06' },
      ]
    },
    {
      name: 'Lost/Rejected', color: 'red', bgColor: 'bg-red-50', contacts: [
        { name: 'Edward Norton', contactNo: '0000000000', email: 'edwardnorton@gmail.com', dateCreated: '2024-05-05' },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <ShoppingBagOutlinedIcon className="text-blue-500" style={{ fontSize: '1.75rem' }} />
                <h1 className="text-xl font-semibold ml-2">Sales</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip title="Settings">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                  <SettingsOutlinedIcon style={{ fontSize: '1.75rem' }} />
                </button>
              </Tooltip>
              <Tooltip title={view === 'cards' ? "Table View" : "Card View"}>
                <button
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                  onClick={() => setView(view === 'cards' ? 'table' : 'cards')}
                >
                  {view === 'cards' ? (
                    <TableChartOutlinedIcon style={{ fontSize: '1.75rem' }} />
                  ) : (
                    <ViewListIcon style={{ fontSize: '1.75rem' }} />
                  )}
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

      {/* Content */}
      <div className="flex flex-grow p-4 space-x-4 overflow-x-auto">
        {view === 'cards' ? (
          columns.map((column) => (
            <Column
              key={column.name}
              column={column}
              expanded={expanded}
              toggleExpand={toggleExpand}
            />
          ))
        ) : (
          <TableView columns={columns} />
        )}
      </div>
    </div>
  );
};

export default Sales;
