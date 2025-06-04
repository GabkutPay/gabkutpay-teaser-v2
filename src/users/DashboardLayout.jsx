import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      
      {/* Menu vertical fixe à gauche */}
      <aside className="w-64 bg-white border-r shadow-md">
        <SidebarMenu />
      </aside>

      {/* Contenu principal à droite */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
