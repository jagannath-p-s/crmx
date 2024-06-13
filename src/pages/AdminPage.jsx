import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import RateReviewIcon from '@mui/icons-material/RateReview';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import BusinessIcon from '@mui/icons-material/Business';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArticleIcon from '@mui/icons-material/Article';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../pages/logo.png';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'; // Handbag icon

const AdminPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { icon: <BusinessIcon />, tooltip: "Organizations", path: "#" },
    { icon: <ContactsIcon />, tooltip: "Contacts", path: "/contacts" },
    { icon: <WorkOutlineIcon />, tooltip: "Sales", path: "#" }, // Updated icon for Sales
    { icon: <PendingActionsIcon />, tooltip: "Activities", path: "#" },
    { icon: <BarChartIcon />, tooltip: "Dashboard", path: "#" },
    { icon: <DescriptionIcon />, tooltip: "Documents", path: "#" },
    { icon: <AccountBalanceWalletIcon />, tooltip: "Expenses", path: "#" },
    { icon: <Inventory2Icon />, tooltip: "Products and Services", path: "#" },
    { icon: <DriveFolderUploadIcon />, tooltip: "Upload Files", path: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-white shadow-md flex flex-col items-center px-2 py-4">
        <div className="mb-4">
          <img src="https://app.zenys.org/assets/icons/icon-72x72.png" alt="Logo" className="w-11 mx-auto" />
        </div>
        <nav className="flex flex-col items-center w-full">
          {navItems.map((item, index) => (
            <Tooltip key={index} title={item.tooltip} placement="right">
              <Link to={item.path} className="flex flex-col items-center pt-2 w-full text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition duration-200">
                <div className="toolbar-icon mb-2" style={{ fontSize: '20px' }}>
                  {item.icon}
                </div>
              </Link>
            </Tooltip>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
          <div className="flex items-center space-x-2">
            <Tooltip title="Toggle Sidenav">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <MenuOpenIcon color="action" style={{ fontSize: '24px' }} />
              </button>
            </Tooltip>
            <div className="border border-gray-300 rounded-2xl bg-white text-gray-600 flex items-center px-3 py-1">
              <Tooltip title="Search">
                <button className="p-1 rounded-full hover:bg-gray-200">
                  <SearchIcon color="action" style={{ fontSize: '24px' }} />
                </button>
              </Tooltip>
              <span className="ml-2">Search</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip title="Inquiries">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <RateReviewIcon style={{ fontSize: '22px', color: 'gray' }} />
              </button>
            </Tooltip>
            <Tooltip title="Chat">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <QuestionAnswerIcon style={{ fontSize: '22px', color: 'gray' }} />
              </button>
            </Tooltip>
            <Tooltip title="Help">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <HelpCenterIcon style={{ fontSize: '22px', color: 'gray' }} />
              </button>
            </Tooltip>
            <Tooltip title="Notifications">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <NotificationsActiveIcon style={{ fontSize: '22px', color: 'gray' }} />
              </button>
            </Tooltip>
            <Tooltip title="Add new">
        <button className="w-10 h-10 ">
          <div className="bg-white rounded-full flex items-center justify-center">
            <AddCircleIcon style={{ fontSize: '44px', color: 'blue' }} />
          </div>
        </button>
      </Tooltip>
      <button
        className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white ml-2"
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

        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Hi Jagannath! Your activity list</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold flex items-center">
                <span className="mr-2">
                  <i className="material-icons">check_box</i>
                </span>
                Tasks
              </h2>
              <p className="text-gray-500">0 open Tasks today</p>
              <div className="mt-4 text-gray-500">No Task present today</div>
              <a href="#" className="text-blue-500 mt-4 block">View all</a>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold flex items-center">
                <span className="mr-2">
                  <i className="material-icons">call</i>
                </span>
                FollowUps
              </h2>
              <p className="text-gray-500">0 FollowUps scheduled today</p>
              <div className="mt-4 text-gray-500">No FollowUp scheduled today</div>
              <a href="#" className="text-blue-500 mt-4 block">View all</a>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-6">Recently added</h2>

          <div className="mt-4 grid grid-cols-4 gap-4">
            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold">Recent Contacts</h2>
              <div className="mt-4 flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">J</div>
                <div className="ml-4">
                  <p className="font-bold">John Doe</p>
                  <p className="text-gray-500">MS</p>
                  <p className="text-blue-500">Lead</p>
                </div>
              </div>
              <a href="#" className="text-blue-500 mt-4 block">View all</a>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold">Recent Sales</h2>
              <div className="mt-4 text-gray-500">No recent sales</div>
              <a href="#" className="text-blue-500 mt-4 block">View all</a>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold">Recent Invoices</h2>
              <div className="mt-4 text-gray-500">Add your first invoice</div>
              <a href="#" className="text-blue-500 mt-4 block">View all</a>
            </div>

            <div className="bg-white p-4 shadow-md rounded-md">
              <h2 className="text-xl font-bold">Recent Payments</h2>
              <div className="mt-4 text-gray-500">No payments received</div>
              <a href="#" className="text-blue-500 mt-4 block">View all</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
