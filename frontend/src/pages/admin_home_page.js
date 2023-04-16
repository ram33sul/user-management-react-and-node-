import React from 'react'
import AdminHome from '../components/admin_home/admin_home'
import { useNavigate } from 'react-router-dom'
function AdminHomePage() {
    const navigate = useNavigate();
  return (
    <div>
        <button onClick={() => navigate('/admin/addNewUser')} style={{padding: '10px 30px 10px 30px', backgroundColor: 'green', color: 'white', fontWeight: 'bold', fontSize: '20px', margin: 'auto', display: 'block'}}>
            Add New User
        </button>
        <AdminHome />
    </div>
  )
}

export default AdminHomePage