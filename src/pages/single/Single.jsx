import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react";
import { publicRequest, adminRequest } from "../../requestMethod";

const Single = () => {
  const location = useLocation();
  console.log(location);
  const {eventinfo} = location.state;
  const id = location.pathname.split("/")[2];
  console.log(id)
  const [eventUsers, setEventUsers] = useState([])

  useEffect(() => {
    const getEventUsers = async ()=>{
      try {
        const res = await adminRequest.get(`/event/${id}/users`);
        console.log(res.data);
        setEventUsers(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getEventUsers()
    }
  , [id])
  

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Event Information</h1>
            <div className="item">
              <img
                src={eventinfo.qrImage}
                alt=""
                className=""
                width="300px"
                height="50%"
              />
              <div className="details">
                <h1 className="itemTitle">{eventinfo.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{eventinfo.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Place:</span>
                  <span className="itemValue">{eventinfo.placeHost}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Date</span>
                  <span className="itemValue">
                  {eventinfo.date}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Time</span>
                  <span className="itemValue">{eventinfo.timeStart}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Quantity</span>
                  <span className="itemValue">{eventinfo.quantity}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          <img
                src={eventinfo.image}
                alt=""
                className=""
                width="100%"
                height="100%"
              />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
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
          {eventUsers.data?.map((item) => (
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
  );
};

export default Single;
