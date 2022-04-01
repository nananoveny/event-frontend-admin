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
import {eventItem} from '../.././data'
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod";
import axios from "axios";

const EventList = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async()=>{
        try {
          const res = await publicRequest.get("/event/");
        console.log(res.data);
    
          setEvents(res.data);
        } catch (error) {
          console.log(error);

        }

    }
    getEvents();
  }, [])
  console.log(events);
  return (
    
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="datatable">
              <div className="datatableTitle">
                Add New Event 
                <Link to="/events/new" className="link">
                  Add New
                </Link>
              </div>
              <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">EventName</TableCell>
            <TableCell className="tableCell">Image</TableCell>
            <TableCell className="tableCell">QR Image</TableCell>
            <TableCell className="tableCell">Date</TableCell>

            <TableCell className="tableCell">Place</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Time</TableCell>

            <TableCell className="tableCell">Action</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {events.data?.map((item) => (
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
                
            <Link to={{pathname: `/events/${item._id}/users`}} state={{eventinfo:item}} style={{ textDecoration: "none" }}>
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

export default EventList