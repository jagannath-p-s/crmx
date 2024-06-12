import React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const AdminPage = () => {
  const navItems = [
    { icon: <DashboardIcon className="text-3xl text-blue-500" />, tooltip: "Dashboard" },
    { icon: <ContactsIcon className="text-3xl text-blue-500" />, tooltip: "Contacts" },
    { icon: <AttachMoneyIcon className="text-3xl text-blue-500" />, tooltip: "Payments" },
    { icon: <EventIcon className="text-3xl text-blue-500" />, tooltip: "Events" }, 
    { icon: <DescriptionIcon className="text-3xl text-blue-500" />, tooltip: "Documents" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-24 bg-white shadow-md">
        <div className="p-4">
          <img src="https://i0.wp.com/zenys.org/wp-content/uploads/2022/11/zenys-logo-new.png?fit=500%2C500&ssl=1" alt="Logo" className="w-16 mx-auto" />
        </div>
        <nav className="mt-10 flex flex-col items-center">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a href="#" className="flex flex-col items-center p-3 w-16 h-16 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors duration-200">
                {item.icon}
              </a>
              <div className="absolute bottom-full mb-2 w-max p-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.tooltip}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Hi Jagannath! Your activity list</h1>
          <div className="flex items-center">
            <button className="material-icons mr-4">upgrade</button>
            <button className="material-icons mr-4">notifications</button>
            <button className="material-icons mr-4">help</button>
            <button className="material-icons mr-4">edit</button>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white">
              J
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold">Tasks</h2>
            <p className="text-gray-500">0 open Tasks today</p>
            <div className="mt-4 text-gray-500">No Task present today</div>
            <a href="#" className="text-blue-500 mt-4 block">View all</a>
          </div>
          
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold">FollowUps</h2>
            <p className="text-gray-500">0 FollowUps scheduled today</p>
            <div className="mt-4 text-gray-500">No FollowUp scheduled today</div>
            <a href="#" className="text-blue-500 mt-4 block">View all</a>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-4 gap-4">
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
  );
}

export default AdminPage;
