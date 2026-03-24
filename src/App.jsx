import React, { useState, useEffect } from 'react'
import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Plus,
    Trash2,
    Search,
    CheckCircle2,
    XCircle,
    Menu,
    X,
    Bell,
    UserCircle
} from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Attendance from './pages/Attendance'

function App() {
    const [activePage, setActivePage] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard />
            case 'employees': return <Employees />
            case 'attendance': return <Attendance />
            default: return <Dashboard />
        }
    }

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className={`sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
                <div className="sidebar-logo">
                    <CalendarCheck size={28} />
                    <span>HRMS Lite</span>
                </div>

                <nav className="nav-links">
                    <div
                        className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                        onClick={() => setActivePage('dashboard')}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </div>
                    <div
                        className={`nav-item ${activePage === 'employees' ? 'active' : ''}`}
                        onClick={() => setActivePage('employees')}
                    >
                        <Users size={20} />
                        <span>Employees</span>
                    </div>
                    <div
                        className={`nav-item ${activePage === 'attendance' ? 'active' : ''}`}
                        onClick={() => setActivePage('attendance')}
                    >
                        <CalendarCheck size={20} />
                        <span>Attendance</span>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="page-header" style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem' }}>
                            {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
                        </h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                            Manage your workforce and attendance efficiently.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <Bell size={20} color="var(--text-muted)" />
                            <div style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--danger)', borderRadius: '50%' }}></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '99px' }}>
                            <UserCircle size={24} color="var(--primary)" />
                            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin User</span>
                        </div>
                    </div>
                </header>

                <div className="fade-in">
                    {renderPage()}
                </div>
            </main>
        </div>
    )
}

export default App
