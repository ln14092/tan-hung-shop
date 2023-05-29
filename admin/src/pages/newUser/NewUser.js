import { useState } from "react";
import "./newUser.css";
import axios from "axios";

export default function NewUser() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const data = {
      username: fullname,
      email,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      if (res) alert("Create User Success!");
    } catch (error) {
      alert("Create User Failure!");
    }
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        {/* <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div> */}
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" />
        </div> */}
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label htmlFor="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        {/* <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button onClick={handleCreate} className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}
