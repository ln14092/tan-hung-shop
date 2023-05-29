import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [userData, setUserData] = useState({});
  const { user } = useSelector((state) => state);
  const token = user.currentUser.accessToken;

  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState("");

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
    try {
      const res = await axios.put(
        "http://localhost:5000/api/user/" + userId,
        data,
        {
          headers: {
            token: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res) alert("Update User Success!");
    } catch (error) {
      alert("Update User Failure!");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/find/" + userId,
          {
            headers: {
              token: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserData(res.data);
      } catch (error) {
        console.log("Đã có lỗi khi lấy thông tin người dùng ...");
      }
    };

    userId && getUser();
  }, [userId, token]);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://static.thenounproject.com/png/5034901-200.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{userData.username}</span>
              <span className="userShowUserTitle">Software Engineer</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.2000</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{userData.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">HN</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  className="userUpdateInput"
                  value={username}
                  placeholder={userData.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={userData.email}
                  className="userUpdateInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* <div className="">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="+1 123 456 67"
                  className="userUpdateInput"
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  className="userUpdateInput"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://static.thenounproject.com/png/5034901-200.png"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button onClick={handleUpdateUser} className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
