import React, { useState, useEffect } from 'react';
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
import { getUsuarios, cambiarEstadoUsuario } from '../../services/user.services.js';
import { getDashboardStats } from '../../services/admin.services.js';
import { getAllAccommodationsForAdmin, changeAccommodationStatus } from '../../services/accommodation.services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'sonner';
import NewAdminModal from './components/NewAdminModal';

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

const RegisteredAccommodationsTable = ({ accommodations, loading, onChangeStatus, pagination = {}, onPageChange }) => {
    if (loading) {
        return <div className="table-section"><h3>HOSPEDAJES REGISTRADOS</h3><p>Cargando hospedajes...</p></div>;
    }
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
                    {accommodations.length === 0 ? (
                        <tr><td colSpan="5">No hay hospedajes registrados.</td></tr>
                    ) : (
                        accommodations.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.province?.name || 'Sin provincia'}</td>
                                <td>{item.admin?.fullName || item.admin?.email || 'Sin administrador'}</td>
                                <td><span className={`status-badge status-${item.status}`}>{item.status}</span></td>
                                <td>
                                    {item.status !== 'aprobado' && (
                                        <button className="action-btn activate" onClick={() => onChangeStatus(item._id, 'aprobado')}>Aprobar</button>
                                    )}
                                    {item.status !== 'rechazado' && (
                                        <button className="action-btn reject" onClick={() => onChangeStatus(item._id, 'rechazado')}>Rechazar</button>
                                    )}
                                    {item.status !== 'suspendido' && (
                                        <button className="action-btn suspend" onClick={() => onChangeStatus(item._id, 'suspendido')}>Suspender</button>
                                    )}
                                    {item.status === 'suspendido' && (
                                        <button className="action-btn activate" onClick={() => onChangeStatus(item._id, 'aprobado')}>Reactivar</button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {pagination.totalPages > 1 && (
                <div className="pagination">
                    <button
                        disabled={!pagination.hasPrevPage}
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                    >
                        Anterior
                    </button>

                    <div className="pages">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                className={pagination.currentPage === p ? "page-btn active" : "page-btn"}
                                onClick={() => onPageChange(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={!pagination.hasNextPage}
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

// Placeholder for AdminsTable component
const AdminsTable = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarUsuarios = async () => {
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cargar usuarios');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleCambiarEstado = async (id, nuevoEstado) => {
        try {
            const res = await cambiarEstadoUsuario(id, nuevoEstado);
            toast.success(res.message);
            // Actualizar el estado en la lista sin recargar todo
            setUsuarios((prev) =>
                prev.map((u) => (u._id === id ? { ...u, isActive: nuevoEstado } : u))
            );
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cambiar el estado');
        }
    };

    if (cargando) {
        return <div className="table-section"><h3>USUARIOS</h3><p>Cargando...</p></div>;
    }

    return (
        <div className="table-section">
            <h3>USUARIOS</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u._id}>
                            <td>{u.fullName}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <span className={`status-badge status-${u.isActive ? 'activo' : 'suspendido'}`}>
                                    {u.isActive ? 'Activo' : 'Deshabilitado'}
                                </span>
                            </td>
                            <td>
                                {u.isActive ? (
                                    <button className="action-btn suspend" onClick={() => handleCambiarEstado(u._id, false)}>
                                        Deshabilitar
                                    </button>
                                ) : (
                                    <button className="action-btn activate" onClick={() => handleCambiarEstado(u._id, true)}>
                                        Habilitar
                                    </button>
                                )}
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
    const { user, logout } = useAuth();
    const [activeSidebarOption, setActiveSidebarOption] = useState('Resumen');
    const [showNewAdmin, setShowNewAdmin] = useState(false);
    const [refreshUsers, setRefreshUsers] = useState(0);
    const [refreshDashboard, setRefreshDashboard] = useState(0);
    const [stats, setStats] = useState({
        totalAccommodations: 0,
        pendingAccommodations: 0,
        approvedAccommodations: 0,
        registeredAdmins: 0
    });
    const [accommodations, setAccommodations] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const limit = 10;
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingAccommodations, setLoadingAccommodations] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoadingStats(true);
                setLoadingAccommodations(true);

                const [statsData, accommodationsData] = await Promise.all([
                    getDashboardStats(),
                    getAllAccommodationsForAdmin(page, limit)
                ]);

                setStats(statsData);
                setAccommodations(accommodationsData.accommodations);
                setPagination(accommodationsData.pagination);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Error al cargar el panel');
            } finally {
                setLoadingStats(false);
                setLoadingAccommodations(false);
            }
        };

        loadDashboardData();
    }, [refreshDashboard, page]);

    const doAccommodationStatus = async (id, status) => {
        try {
            const res = await changeAccommodationStatus(id, status);
            toast.success(res.message);
            setRefreshDashboard((n) => n + 1);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cambiar el estado del hospedaje');
        }
    };

    const handleAccommodationStatus = (id, status) => {
        const mensajes = {
            aprobado: "¿Aprobar este hospedaje?",
            rechazado: "¿Rechazar este hospedaje?",
            suspendido: "¿Suspender este hospedaje?",
        };
        toast(mensajes[status] || "¿Confirmar esta acción?", {
            action: { label: "Sí", onClick: () => doAccommodationStatus(id, status) },
            cancel: { label: "No" },
        });
    };

    const handleSidebarOptionClick = (option) => {
        if (option === 'Resumen') {
            setActiveSidebarOption(option);
        } else {
            // Redirect to 404 for unimplemented options
            navigate('/404');
        }
    };

    const handleNewAdminClick = () => {
        setShowNewAdmin(true);
    };

    const handleLogoutClick = () => {
        toast("¿Cerrar sesión?", {
            action: {
                label: "Sí, salir",
                onClick: () => {
                    logout();
                    navigate('/login');
                },
            },
            cancel: { label: "Cancelar" },
        });
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
                    <div className="top-bar-right">
                        <span className="notification-icon">🔔</span>
                        <div className="user-profile">
                            <span className="user-name">{user?.fullName || 'Usuario'}</span>
                            <span className="user-role">{user?.role || 'super_admin'}</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-header">
                    <h1>Panel de Control Super Admin</h1>
                    <p>Supervisá hospedajes, administradores y actividad general de la plataforma.</p>
                </div>

                <div className="metrics-cards">
                    <SuperAdminMetricCard title="Total hospedajes" value={loadingStats ? '...' : stats.totalAccommodations} />
                    <SuperAdminMetricCard title="Pendientes" value={loadingStats ? '...' : stats.pendingAccommodations} />
                    <SuperAdminMetricCard title="Aprobados" value={loadingStats ? '...' : stats.approvedAccommodations} />
                    <SuperAdminMetricCard title="Admins registrados" value={loadingStats ? '...' : stats.registeredAdmins} />
                </div>

                <RegisteredAccommodationsTable
                    accommodations={accommodations}
                    loading={loadingAccommodations}
                    onChangeStatus={handleAccommodationStatus}
                    pagination={pagination}
                    onPageChange={setPage}
                />
                <AdminsTable key={refreshUsers} />
                {showNewAdmin && (
                    <NewAdminModal
                        onClose={() => setShowNewAdmin(false)}
                        onCreated={() => {
                            setRefreshUsers((n) => n + 1);
                            setRefreshDashboard((n) => n + 1);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SuperAdminDashboard;