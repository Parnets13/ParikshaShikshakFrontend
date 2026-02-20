import { Outlet } from 'react-router-dom';
import Side from './Side';

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Side />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
