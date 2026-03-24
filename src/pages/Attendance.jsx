import React, { useState, useEffect } from 'react'
import { Calendar, Check, X, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { format, subDays, addDays } from 'date-fns'

const Attendance = () => {
    const [employees, setEmployees] = useState([])
    const [attendance, setAttendance] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            setLoading(true)
            const empRes = await fetch('/api/employees')
            const empData = await empRes.json()
            setEmployees(empData)

            // Fetch attendance for the selected date
            // Note: In a real app, we'd have an endpoint for this. 
            // For now, we'll fetch all attendance for each employee or use the dashboard summary logic.
            // Let's assume we have an endpoint /api/attendance/date/{date}
            const formattedDate = format(selectedDate, 'yyyy-MM-dd')
            const attRes = await fetch(`/api/attendance/today`) // Simplified for now
            const attData = await attRes.json()
            setAttendance(attData)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [selectedDate])

    const handleMarkAttendance = async (empId, status) => {
        try {
            const response = await fetch(`/api/employees/${empId}/attendance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date: format(selectedDate, 'yyyy-MM-dd'),
                    status: status
                })
            })
            if (!response.ok) throw new Error('Failed to mark attendance')

            // Update local state
            const newAtt = await response.json()
            setAttendance(prev => {
                const filtered = prev.filter(a => a.employee_id !== empId)
                return [...filtered, newAtt]
            })
        } catch (err) {
            alert(err.message)
        }
    }

    const getStatus = (empId) => {
        const record = attendance.find(a => a.employee_id === empId && a.date === format(selectedDate, 'yyyy-MM-dd'))
        return record ? record.status : 'Pending'
    }

    if (loading) return <div>Loading...</div>

    return (
        <div className="attendance-page">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setSelectedDate(subDays(selectedDate, 1))}>
                        <ChevronLeft size={18} />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontWeight: 600 }}>
                        <Calendar size={18} color="var(--primary)" />
                        {format(selectedDate, 'MMMM do, yyyy')}
                    </div>
                    <button className="btn" style={{ border: '1px solid var(--border)' }} onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                        <ChevronRight size={18} />
                    </button>
                </div>
                <div className="btn btn-primary" style={{ opacity: 0.8 }}>
                    <Filter size={18} />
                    <span>Filter Records</span>
                </div>
            </div>

            <div className="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => {
                            const status = getStatus(emp.employee_id)
                            return (
                                <tr key={emp.employee_id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600 }}>{emp.full_name}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.employee_id}</span>
                                        </div>
                                    </td>
                                    <td>{emp.department}</td>
                                    <td>
                                        <span className={`badge badge-${status.toLowerCase()}`}>
                                            {status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                className={`btn ${status === 'Present' ? 'btn-primary' : ''}`}
                                                style={{ border: status === 'Present' ? 'none' : '1px solid var(--border)', padding: '0.4rem 0.8rem' }}
                                                onClick={() => handleMarkAttendance(emp.employee_id, 'Present')}
                                            >
                                                <Check size={16} />
                                                Present
                                            </button>
                                            <button
                                                className={`btn ${status === 'Absent' ? 'btn-danger' : ''}`}
                                                style={{ border: status === 'Absent' ? 'none' : '1px solid var(--border)', padding: '0.4rem 0.8rem', background: status === 'Absent' ? '#fee2e2' : 'transparent', color: status === 'Absent' ? '#991b1b' : 'var(--text-main)' }}
                                                onClick={() => handleMarkAttendance(emp.employee_id, 'Absent')}
                                            >
                                                <X size={16} />
                                                Absent
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Attendance
