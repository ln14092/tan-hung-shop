import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { transitionData } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const { user } = useSelector((state) => state);
  const token = user.currentUser.accessToken;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            token: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = res.data.map((item, index) => ({
          id: item._id,
          username: item.userId.username,
          avatar:
            item.userId.img ??
            "https://static.thenounproject.com/png/5034901-200.png",
          email: item.userId.email,
          products: item.products.map((i) => `${i.productId.title}`),
          amount: item.products.map((i) => `${i.quantity}`),
          address: item.address,
          status: item.status,
        }));
        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };
    token && getTransactions();
  }, [token]);

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/orders/" + id, {
        headers: {
          token: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Delete Successfully");
    } catch (error) {
      alert("Delete Failure");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 170,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 170 },
    {
      field: "products",
      headerName: "Products",
      width: 180,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
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
              <button className="userListEdit">Accept</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDeleteOrder(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={transactions}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
