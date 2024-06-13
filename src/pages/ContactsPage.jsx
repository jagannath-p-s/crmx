import React, { useState } from 'react';
import { Tooltip, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactsIcon from '@mui/icons-material/Contacts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';

const ContactsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-4">
        <Tooltip title="Contacts" placement="right">
          <ContactsIcon className="text-3xl text-blue-500 my-4" />
        </Tooltip>
        <Tooltip title="Sales" placement="right">
          <AttachMoneyIcon className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer my-4" />
        </Tooltip>
        <Tooltip title="Activities" placement="right">
          <EventIcon className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer my-4" />
        </Tooltip>
        <Tooltip title="Dashboard" placement="right">
          <DashboardIcon className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer my-4" />
        </Tooltip>
        <Tooltip title="Documents" placement="right">
          <DescriptionIcon className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer my-4" />
        </Tooltip>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <SearchIcon className="text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <NotificationsIcon />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <HelpIcon />
            </button>
            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              <AddIcon />
            </button>
            <div>
              <button
                className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white"
                onClick={handleMenuOpen}
              >
                J
              </button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <SettingsIcon className="mr-2" /> Settings
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <LogoutIcon className="mr-2" /> Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        {/* Title and Dropdown */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <div className="relative">
            <button className="p-2 border border-gray-300 rounded-md">
              To be converted
            </button>
            {/* Dropdown content can be added here */}
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-blue-500">Lead</h2>
              <button className="text-gray-600 hover:text-blue-500">
                &laquo;
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="font-bold">John Doe</p>
              <p className="text-gray-500">Contact No: 9999999999</p>
              <p className="text-gray-500">Email: johndoe@gmail.com</p>
              <p className="text-gray-500">Date created: 14-05-2024</p>
              <div className="flex items-center mt-4">
                <button className="material-icons text-blue-500">add</button>
                <button className="material-icons text-blue-500 ml-4">chat</button>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white ml-4">
                  J
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-blue-500">Prospect</h2>
              <button className="text-gray-600 hover:text-blue-500">
                &laquo;
              </button>
            </div>
            {/* Add prospect items here */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-blue-500">Opportunity</h2>
              <button className="text-gray-600 hover:text-blue-500">
                &laquo;
              </button>
            </div>
            {/* Add opportunity items here */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-green-500">Customer-Won</h2>
              <button className="text-gray-600 hover:text-green-500">
                &laquo;
              </button>
            </div>
            {/* Add customer-won items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
