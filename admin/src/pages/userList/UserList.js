import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function UserList() {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await userRequest.get("/user");
        const data = res.data.map((obj, index) => ({
          id: obj._id,
          username: obj.username,
          avatar:
            obj.img ?? "https://static.thenounproject.com/png/5034901-200.png",
          email: obj.email,
          status: "active",
          transaction: 0,
        }));
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`, {
        headers: {
          token: `Bearer ${user.currentUser.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {};

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button
                onClick={handleUpdate(params.row.id)}
                className="userListEdit"
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
