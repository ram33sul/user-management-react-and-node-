import React, { useEffect, useState } from 'react';
import './admin_home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AdminHome() {

    const navigate = useNavigate()
    const [ users, setUsers ] = useState([]);

    const deleteUser = (userId) => {
        if(!userId){
            return console.log("no user id given");
        }
        axios({
            method: 'DELETE',
            url: '/admin/deleteUser?id='+userId,
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('admin'),)
            }
        }).then((data) => {
            setUsers(data.data);
            alert("user deleted successfully");
        }).catch((error) => {
            alert(error);
        })
    }

    useEffect(()=>{
        axios({
            method: 'GET',
            url: '/admin/home',
            headers: {
                "x-access-token": JSON.parse(localStorage.getItem('admin')),
            }
        }).then((data) => {
            setUsers(data.data);
        }).catch((error) => {
            console.log(error);
        })
    },[])
  return (
    <table>
        <thead>
            <tr>
                <th>
                    NAME
                </th>
                <th>
                    USERNAME
                </th>
                <th>
                    ACTION
                </th>
            </tr>
        </thead>
        <tbody>
            {
                users.map((data) => {
                    return <tr>
                        <td>
                            {data.name}
                        </td>
                        <td>
                            {data.username}
                        </td>
                        <td>
                            <button style={{backgroundColor: 'rgb(0,150,255)'}} onClick={() => navigate(`/admin/editUser?id=${data._id}`)}>
                                EDIT
                            </button>
                            <button style={{backgroundColor: 'red'}} onClick={() => deleteUser(data._id)}>
                                DELETE
                            </button>
                        </td>
                    </tr>
                })
            }
        </tbody>
    </table>
  )
};

export default AdminHome;