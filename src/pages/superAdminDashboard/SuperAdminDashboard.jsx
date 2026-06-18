import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Home, 
    Building2, 
    Users, 
    Settings, 
    Plus, 
    LogOut 
} from 'lucide-react';
import './SuperAdminDashboard.css';

// Placeholder for SuperAdminSidebar component
const SuperAdminSidebar = ({ activeOption, onOptionClick, onNewAdminClick, onLogoutClick }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3 className="accommodation-name">ReservaHost Admin.</h3>
                <p className="admin-panel-subtitle">Panel Super Admin.</p>
            </div>
            <nav className="sidebar-nav">
                <ul className="sidebar-options">
                    <li className={activeOption === 'Resumen' ? 'active' : ''} onClick={() => onOptionClick('Resumen')}>
                        <Home size={18} /> Resumen
                    </li>
                    <li className={activeOption === 'Hospedajes' ? 'active' : ''} onClick={() => onOptionClick('Hospedajes')}>
                        <Building2 size={18} /> Hospedajes
                    </li>
                    <li className={activeOption === 'Administradores' ? 'active' : ''} onClick={() => onOptionClick('Administradores')}>
                        <Users size={18} /> Administradores
                    </li>
                    <li className={activeOption === 'Configuración' ? 'active' : ''} onClick={() => onOptionClick('Configuración')}>
                        <Settings size={18} /> Configuración
                    </li>
                </ul>
            </nav>
            <div className="sidebar-footer">
                <button className="new-admin-btn" onClick={onNewAdminClick}>
                    <Plus size={16} /> Nuevo Admin
                </button>
                <button className="logout-btn" onClick={onLogoutClick}>
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </div>
    );
};

// Placeholder for SuperAdminMetricCard component
const SuperAdminMetricCard = ({ title, value }) => {
    return (
        <div className="metric-card">
            <h4>{title}</h4>
            <p>{value}</p>
        </div>
    );
};

// // Placeholder for PendingAccommodationsTable component
// const PendingAccommodationsTable = () => {
//     const mockData = [
//         { name: 'Azure Coast Villa', location: 'Tucumán, Argentina', admin: 'Juan Carlos Pérez', status: 'Pendiente' },
//         { name: 'Urban Loft Suites', location: 'Córdoba, Argentina', admin: 'Martina Domínguez', status: 'Pendiente' },
//     ];

//     return (
//         <div className="table-section">
//             <h3>HOSPEDAJES PENDIENTES</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Nombre</th>
//                         <th>Provincia / ubicación</th>
//                         <th>Administrador</th>
//                         <th>Estado</th>
//                         <th>Acciones</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {mockData.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.name}</td>
//                             <td>{item.location}</td>
//                             <td>{item.admin}</td>
//                             <td><span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td>
//                             <td>
//                                 <button className="action-btn approve">Aprobar</button>
//                                 <button className="action-btn reject">Rechazar</button>
//                                 <button className="action-btn view-detail">Ver detalle</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// Placeholder for RegisteredAccommodationsTable component
const RegisteredAccommodationsTable = () => {
    const mockData = [
        { name: 'Hostal del Norte', location: 'Salta, Argentina', admin: 'Roberto García', status: 'Activo' },
        { name: 'Patagonia Retreat', location: 'Bariloche, Argentina', admin: 'Lucía Méndez', status: 'Suspendido' },
    ];

    return (
        <div className="table-section">
            <h3>HOSPEDAJES REGISTRADOS</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Provincia / ubicación</th>
                        <th>Administrador</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.location}</td>
                            <td>{item.admin}</td>
                            <td><span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                            <td>
                                <button className="action-btn activate">Activar</button>
                                <button className="action-btn suspend">Suspender</button>
                                <button className="action-btn view-detail">Ver detalle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Placeholder for AdminsTable component
const AdminsTable = () => {
    const mockData = [
        { name: 'Juan Carlos Pérez', email: 'juan@example.com', assignedAccommodation: 'Azure Coast Villa', status: 'Activo' },
        { name: 'Martina Domínguez', email: 'martina@example.com', assignedAccommodation: 'Urban Loft Suites', status: 'Activo' },
    ];

    return (
        <div className="table-section">
            <h3>ADMINISTRADORES</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Hospedaje asignado</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.assignedAccommodation}</td>
                            <td><span className={`status-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                            <td>
                                <button className="action-btn view">Ver</button>
                                <button className="action-btn activate">Activar</button>
                                <button className="action-btn suspend">Suspender</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const SuperAdminDashboard = () => {
    const navigate = useNavigate();
    const [activeSidebarOption, setActiveSidebarOption] = useState('Resumen');

    const handleSidebarOptionClick = (option) => {
        if (option === 'Resumen') {
            setActiveSidebarOption(option);
        } else {
            // Redirect to 404 for unimplemented options
            navigate('/404');
        }
    };

    const handleNewAdminClick = () => {
        navigate('/404'); // Redirect to 404 for unimplemented functionality
    };

    const handleLogoutClick = () => {
        navigate('/login'); // Assuming a login page exists
    };

    return (
        <div className="super-admin-dashboard-layout">
            <SuperAdminSidebar
                activeOption={activeSidebarOption}
                onOptionClick={handleSidebarOptionClick}
                onNewAdminClick={handleNewAdminClick}
                onLogoutClick={handleLogoutClick}
            />
            <div className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Buscar..." className="global-search" />
                    <div className="top-bar-right">
                        <span className="notification-icon">🔔</span>
                        <div className="user-profile">
                            <span className="user-name">Admin Guest</span>
                            <span className="user-role">Global Admin</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-header">
                    <h1>Panel de Control Super Admin</h1>
                    <p>Supervisá hospedajes, administradores y actividad general de la plataforma.</p>
                </div>

                <div className="metrics-cards">
                    <SuperAdminMetricCard title="Total hospedajes" value="128" />
                    <SuperAdminMetricCard title="Pendientes" value="8" />
                    <SuperAdminMetricCard title="Aprobados" value="112" />
                    {/* <SuperAdminMetricCard title="Suspendidos" value="8" /> */}
                    <SuperAdminMetricCard title="Admins registrados" value="36" />
                </div>

                {/* <PendingAccommodationsTable /> */}
                <RegisteredAccommodationsTable />
                <AdminsTable />
            </div>
        </div>
    );
};

export default SuperAdminDashboard;