import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Search, UserPlus, X } from 'lucide-react'

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: 'Engineering'
    })

    const fetchEmployees = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/employees')
            if (!response.ok) throw new Error('Failed to fetch employees')
            const data = await response.json()
            setEmployees(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleAddEmployee = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                const errData = await response.json()
                throw new Error(errData.detail || 'Failed to add employee')
            }
            setShowModal(false)
            setFormData({ employee_id: '', full_name: '', email: '', department: 'Engineering' })
            fetchEmployees()
        } catch (err) {
            alert(err.message)
        }
    }

    const handleDelete = async (empId) => {
        if (!confirm('Are you sure you want to delete this employee?')) return
        try {
            const response = await fetch(`/api/employees/${empId}`, { method: 'DELETE' })
            if (!response.ok) throw new Error('Failed to delete employee')
            fetchEmployees()
        } catch (err) {
            alert(err.message)
        }
    }

    if (loading) return <div className="loading">Loading employees...</div>
    if (error) return <div className="error-state">{error}</div>

    return (
        <div className="employees-page">
            <div className="page-header">
                <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input type="text" placeholder="Search employees..." style={{ paddingLeft: '40px' }} />
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    <span>Add Employee</span>
                </button>
            </div>

            <div className="data-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                    No employees found. Add your first employee to get started.
                                </td>
                            </tr>
                        ) : (
                            employees.map((emp) => (
                                <tr key={emp.employee_id}>
                                    <td style={{ fontWeight: 600 }}>{emp.employee_id}</td>
                                    <td>{emp.full_name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(emp.employee_id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content fade-in">
                        <div className="page-header" style={{ marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Add New Employee</h2>
                            <X size={20} style={{ cursor: 'pointer' }} onClick={() => setShowModal(false)} />
                        </div>
                        <form onSubmit={handleAddEmployee}>
                            <div className="form-group">
                                <label>Employee ID</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. EMP001"
                                    value={formData.employee_id}
                                    onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="John Doe"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <select
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                >
                                    <option>Engineering</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                    <option>Human Resources</option>
                                    <option>Finance</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="btn" style={{ flex: 1, border: '1px solid var(--border)' }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Register Employee</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Employees
