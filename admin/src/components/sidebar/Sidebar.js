import "./Sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link" onClick={() => handleClick("home")}>
              <li
                className={`sidebarListItem ${
                  activeItem === "home" ? "active" : ""
                }`}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link
              to="/users"
              className="link"
              onClick={() => handleClick("users")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "users" ? "active" : ""
                }`}
              >
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link
              to="/products"
              className="link"
              onClick={() => handleClick("products")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "products" ? "active" : ""
                }`}
              >
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link
              to="/transaction"
              className="link"
              onClick={() => handleClick("transaction")}
            >
              <li
                className={`sidebarListItem ${
                  activeItem === "transaction" ? "active" : ""
                }`}
              >
                <AttachMoney className="sidebarIcon" />
                Transactions
              </li>
            </Link>
            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
