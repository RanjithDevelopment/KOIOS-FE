import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import "../css/table.css";
import "../css/Signup.css";
const Table = () => {
    const [usersData, setUsersData] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        async function getData() {
            const response = await axios.get("https://scholarnest-api-service.onrender.com/api/register/users");
            setUsersData(response.data);
        }
        getData()
    }, [])
    //to handle delete
    const handleDelete = async(id)=>{
        await axios.delete(`https://scholarnest-api-service.onrender.com/api/register/delete/${id}`)
       .then(() => history('/table')).catch((error) => alert(JSON.stringify(error)));
    }
    return (
        <>
     <Link to='/' className='view'>Registeration </Link >
     <div><h1>View Edit and Delete all Users</h1></div>
        <div className='tableContainer'>
            <table>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>PhoneNo</th>
                    <th>Actions</th>
                </tr>
                {usersData.map((data) => {

                    return (
                        <tbody key={data._id}>
                            <tr >
                                <td>{data.firstName}</td>
                                <td>{data.lastName}</td>
                                <td>{data.email}</td>
                                <td>{data.phoneNo}</td>
                                <td>
                                    <Link
                                        className='edit'
                                        to="/" state={data} >
                                        Edit profile
                                    </Link>
                                    <Link
                                    className='delete'
                                       onClick={()=>handleDelete(data._id)} >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}

            </table>
        </div>
        </>   
    )
}

export default Table
