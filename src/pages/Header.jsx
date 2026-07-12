import "./Header.css";
import { RiChatNewLine } from "react-icons/ri";

import { FaBars } from "react-icons/fa";



export default function Header({ setSidebarOpen }) {
  return (
    <header className="header">

      <div className="header-left">
        <FaBars
          className="menu-icon"
          onClick={() => setSidebarOpen(true)}
        />

        <div className="avatar">
           <img
             src="/favicon.svg"
             alt="iCanSpe Logo"
             className="logo-img"
          />
        </div>

        <div className="user-info">
          <h2>Eva</h2>

          <p>
            <span className="online-dot"></span>
            Online
          </p>
        </div>

      </div>

      <div className="header-right">

      <RiChatNewLine className="sidebar-icon" />

      </div>

    </header>
  );
}