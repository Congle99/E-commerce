import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={`d-flex`}>
            <Sidebar isOpen={isSidebarOpen} />
            <div className={`main-content ${isSidebarOpen ? 'sidebar-show' : ''}`}>
                <Topbar onToggleSidebar={toggleSidebar} />
                <div className="p-4" style={{ marginTop: '60px' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
