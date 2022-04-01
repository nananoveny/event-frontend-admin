import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Event</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              
                <div className="formInput">
                  <label>EventName</label>
                  <input type='text' placeholder='Enter event name...' />
                </div>
                <div className="formInput">
                  <label>Place</label>
                  <input type='text' placeholder='Enter place ...' />
                </div>
                <div className="formInput">
                  <label>Quantity</label>
                  <input type='text' placeholder='Enter quantity' />
                </div>
                <div className="formInput">
                  <label>Address</label>
                  <input type='text' placeholder='Enter address..' />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <input type='text' placeholder='Enter desc...' />
                </div>
                <div className="formInput">
                  <label>Date</label>
                  <input type='date' />
                </div>
                <div className="formInput">
                  <label>Time Start</label>
                  <input type='time'  />
                </div>
                <div className="formInput">
                  <label>Time Finish</label>
                  <input type='time'  />
                </div>
              
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
