import './Sidebar.css';
import { FaFire, FaCog } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";
// import logo from "../public/favicon.svg";

export default function Sidebar({ open, setOpen }) {
  return (
    <nav className={`sidebar ${open ? "active" : ""}`}>

    
      <div className="logo">

        <div className="logo-circle">
         <img
            src="/favicon.svg"
            alt="iCanSpe Logo"
            className="logo-img"
         />
        </div>
        
        <div>
          <h2>iCanSpe</h2>
         
        </div>

      </div>


      <div className="nav-right">

        <div className="streak">

          <FaFire className="fire" />

          <span>12</span>
        </div>
        <FaCog className="icon" />   

        <IoPersonCircle className="profile" />

      </div>

    </nav>
  );
}