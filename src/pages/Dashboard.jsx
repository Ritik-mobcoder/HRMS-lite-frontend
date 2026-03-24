import React, { useState, useEffect } from 'react'
import { Users, CalendarCheck, TrendingUp, Clock, UserCheck, UserX } from 'lucide-react'

const Dashboard = () => {
    const [summary, setSummary] = useState({
        total_employees: 0,
        total_present_today: 0,
        attendance_rate: 0
    })
    const [recentAttendance, setRecentAttendance] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch('/api/dashboard/summary')
                const data = await res.json()
                setSummary(data)

                const attRes = await fetch('/api/attendance/today')
                const attData = await attRes.json()
                setRecentAttendance(attData.slice(0, 5))
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchSummary()
    }, [])

    if (loading) return <div>Loading Summary...</div>

    return (
        <div className="dashboard-page">
            <div className="stats-grid">
                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-label">Total Employees</div>
                        <div style={{ background: '#eef2ff', padding: '0.5rem', borderRadius: '8px' }}>
                            <Users size={20} color="var(--primary)" />
                        </div>
                    </div>
                    <div className="stat-value">{summary.total_employees}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>+2 this month</div>
                </div>

                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-label">Present Today</div>
                        <div style={{ background: '#dcfce7', padding: '0.5rem', borderRadius: '8px' }}>
                            <UserCheck size={20} color="#166534" />
                        </div>
                    </div>
                    <div className="stat-value">{summary.total_present_today}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Out of {summary.total_employees} employees</div>
                </div>

                <div className="stat-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div className="stat-label">Attendance Rate</div>
                        <div style={{ background: '#fff7ed', padding: '0.5rem', borderRadius: '8px' }}>
                            <TrendingUp size={20} color="#9a3412" />
                        </div>
                    </div>
                    <div className="stat-value">{summary.attendance_rate.toFixed(1)}%</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average for this week</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="data-table-container">
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.125rem' }}>Recent Attendance</h3>
                        <button className="btn" style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>View All</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAttendance.length === 0 ? (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No recent activity</td>
                                </tr>
                            ) : (
                                recentAttendance.map((record, index) => (
                                    <tr key={index}>
                                        <td style={{ fontWeight: 600 }}>{record.employee_id}</td>
                                        <td>
                                            <span className={`badge badge-${record.status.toLowerCase()}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--text-muted)' }}>Today</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="stat-card" style={{ height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '1.25rem' }}>Upcoming Holidays</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { name: 'Easter Monday', date: 'April 13' },
                            { name: 'Labor Day', date: 'May 1' },
                            { name: 'Eid al-Fitr', date: 'May 13' }
                        ].map((h, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#f8fafc', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                                    {h.date.split(' ')[1]}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{h.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard
