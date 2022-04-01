import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { adminRequest } from "../../requestMethod";
const List = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async()=>{
      try {
        const res = await adminRequest.get("/user/");
        console.log(res.data);
        setUsers(res.data);
       } catch (error) {
         console.log(error);
       }
    }
   getUsers();
  }, [])
  
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="datatable">
              <div className="datatableTitle">
               User management 

              </div>
        <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Full Name</TableCell>
            <TableCell className="tableCell">Avatar</TableCell>
            <TableCell className="tableCell">Gender</TableCell>
            <TableCell className="tableCell">Address</TableCell>

            <TableCell className="tableCell">Phone number</TableCell>
            <TableCell className="tableCell">Identify number</TableCell>
            <TableCell className="tableCell">Email</TableCell>

            <TableCell className="tableCell">Day of birth</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {users.data?.map((item) => (
            <TableRow >
              <TableCell className="tableCell">{item._id}</TableCell>

              <TableCell className="tableCell">{item.title}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={item.image} alt="" className="image"  />
                  {/* {row.product} */}
                </div>
              </TableCell>
              <TableCell className="tableCell" height='50px' >
                <div className="cellWrapper" >
                  <img src={item.qrImage} alt="" className="list" />
                  {/* {row.product} */}
                </div>
              </TableCell>
              <TableCell className="tableCell">{item.date}</TableCell>
              <TableCell className="tableCell">{item.placeHost}</TableCell>
              <TableCell className="tableCell">{item.quantity}</TableCell>
              <TableCell className="tableCell">{item.timeStart}</TableCell>
              <TableCell className="tableCell">
              <div className="cellAction">
                
            <Link to={{pathname: `/event/${item._id}`}} state={{eventinfo:item}} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
          
              >
              Delete
            </div>
          </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
      </div>
    </div>
  )
}

export default List