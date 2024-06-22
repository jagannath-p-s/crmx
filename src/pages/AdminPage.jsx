import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AddIcon from '@mui/icons-material/Add';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Tooltip from '@mui/material/Tooltip';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import BuildIcon from '@mui/icons-material/Build';
import StorageIcon from '@mui/icons-material/Storage';
import BusinessIcon from '@mui/icons-material/Business';

import Contacts from './admincomponents/Contacts';
import Sales from './admincomponents/Sales';
import Activities from './admincomponents/Activities';
import Dashboard from './admincomponents/Dashboard';
import Services from './admincomponents/Services';
import Stock from './admincomponents/Stock';
import UploadFiles from './admincomponents/UploadFiles';
import Organisation from './admincomponents/Organisation';
import Column from './admincomponents/Column';

const AdminPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeComponent, setActiveComponent] = useState('Dashboard');
  const [expandedColumns, setExpandedColumns] = useState(['Lead', 'Prospect', 'Opportunity']);
  const sidebarRef = useRef(null);
  const { logout } = useAuth();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { icon: <PeopleOutlineIcon />, tooltip: "Contacts", component: 'Contacts' },
    { icon: <ShoppingBagOutlinedIcon />, tooltip: "Sales", component: 'Sales' },
    { icon: <EventNoteIcon />, tooltip: "Activities", component: 'Activities' },
    { icon: <EqualizerIcon />, tooltip: "Dashboard", component: 'Dashboard' },
    { icon: <StorageIcon />, tooltip: "Stock", component: 'Stock' },
    { icon: <BuildIcon />, tooltip: "Services", component: 'Services' },
    { icon: <BusinessIcon />, tooltip: "Organisation", component: 'Organisation' },
    { icon: <CloudUploadOutlinedIcon />, tooltip: "Upload Files", component: 'UploadFiles' }
  ];

  const renderComponent = () => {
    switch(activeComponent) {
      case 'Contacts':
        return <Contacts />;
      case 'Sales':
        return <Sales />;
      case 'Activities':
        return <Activities />;
      case 'Dashboard':
        return <Dashboard />;
      case 'Stock':
        return <Stock />;
      case 'Services':
        return <Services />;
      case 'Organisation':
        return <Organisation />;
      case 'UploadFiles':
        return <UploadFiles />;
      default:
        return <Dashboard />;
    }
  };

  const toggleExpand = (columnName) => {
    setExpandedColumns((prev) => {
      const isExpanded = prev.includes(columnName);
      if (isExpanded) {
        return prev.filter((name) => name !== columnName);
      } else {
        if (prev.length >= 4) {
          return [...prev.slice(1), columnName];
        } else {
          return [...prev, columnName];
        }
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sticky top-0 h-screen bg-white shadow-lg flex flex-col items-start py-4 px-3 border-r border-gray-200 transition-all duration-300 ${
          isExpanded ? 'w-48' : 'w-20 items-center'
        }`}
      >
        <div className="flex items-center justify-center mt-6 mb-6 w-full">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/43/Logo-WS.png" alt="Logo" className="w-10 h-10" />
        </div>
        <nav className={`flex flex-col w-full ${isExpanded ? 'space-y-1' : 'space-y-1 items-center'}`}>
          {navItems.map((item, index) => (
            <Tooltip key={index} title={!isExpanded ? item.tooltip : ''} placement="right">
              <button
                onClick={() => setActiveComponent(item.component)}
                className={`p-2 uppercase rounded-lg hover:bg-blue-100 transition duration-200 flex items-center ${
                  isExpanded ? 'pl-2 pr-3' : 'justify-center'
                } ${activeComponent === item.component ? 'bg-blue-100' : ''}`}
              >
                {React.cloneElement(item.icon, { className: "text-gray-600", style: { fontSize: '1.75rem' } })}
                {isExpanded && <span className="ml-3 text-xs font-semibold text-gray-700">{item.tooltip}</span>}
              </button>
            </Tooltip>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              <div className="flex items-center space-x-4">
                <Tooltip title="Toggle Sidenav">
                  <button onClick={handleToggle} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                    <MenuIcon />
                  </button>
                </Tooltip>
                <div className="relative">
                  <input type="text" placeholder="Search" className="w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Tooltip title="Chat">
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <ForumOutlinedIcon />
                  </button>
                </Tooltip>
                <Tooltip title="Notifications">
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <NotificationsNoneIcon />
                  </button>
                </Tooltip>
                <Tooltip title="Add new">
                  <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                    <AddIcon />
                  </button>
                </Tooltip>
                <button
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white"
                  onClick={handleMenuOpen}
                >
                  J
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose} className="flex items-center">
                    <SettingsOutlinedIcon className="mr-2" style={{ fontSize: '20px' }} />
                    <span className="text-sm">Settings</span>
                  </MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); logout(); }} className="flex items-center">
                    <ExitToAppIcon className="mr-2" style={{ fontSize: '20px' }} />
                    <span className="text-sm">Logout</span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
