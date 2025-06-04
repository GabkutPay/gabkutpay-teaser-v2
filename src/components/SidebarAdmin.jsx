import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import AdminComptesTypes from './AdminComptesTypes';
import CartesIAAdminDashboard from './CartesIAAdminDashboard'; // ✅ Import nécessaire

const NavMenu = () => {
  const navLinkClasses = ({ isActive }) =>
    `block py-2 px-4 rounded hover:bg-blue-100 ${isActive ? "bg-blue-200 font-bold" : ""}`;

  return (
    <nav className="p-4 bg-gray-100 shadow mb-6">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/admin/types-comptes" className={navLinkClasses}>
            🛠️ Types de comptes
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/conversation-super" className={navLinkClasses}>
            💬 Chat Super Admin
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/cartes-ia" className={navLinkClasses}>
            💳 Cartes IA (Admin)
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const App = () => (
  <Router>
    <NavMenu />
    <Routes>
      <Route path="/admin/types-comptes" element={<AdminComptesTypes />} />
      <Route path="/admin/cartes-ia" element={<CartesIAAdminDashboard />} />
      {/* <Route path="/admin/conversation-super" element={<ChatSuperAdmin />} /> */}
    </Routes>
  </Router>
);

export default App;
