import React, { useState } from 'react';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Tooltip from '@mui/material/Tooltip';

const Contacts = () => {
  const [view, setView] = useState('cards');

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
            </div>
            <div className="flex items-center space-x-2">
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
    </div>
  );
};

export default Contacts;