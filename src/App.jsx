import './pages/Chat'
import './App.css'
import Chat from './pages/Chat'
import Sidebar from './pages/Sidebar'
import Header from './pages/Header'
import { useState } from 'react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />


      <div className="main">

        <Header
          setSidebarOpen={setSidebarOpen}
        />
           {/* <img
            src="eva-normal.png"
            alt="iCanSpe Logo"
            className="logo-imgs"
         /> */}
        <Chat setSidebarOpen={setSidebarOpen} />

      </div>

    </>


  )
}

export default App
