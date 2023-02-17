import React, { useContext, useState } from "react"
import { Navbar, Dropdown, Button, Avatar } from "flowbite-react"
import { Link } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import logo from "../assets/images/logo.svg"

export default function Navbars() {
  const [state, dispatch] = useContext(AppContext)

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
  }
  
  return (
  <Navbar fluid={true} rounded={true} border style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem"}}>
    <Navbar.Brand to={"/"}>
      <img
        src={logo}
        className="w-[90px]"
        alt="Logo"
      />
    </Navbar.Brand>
    <div className="flex items-center gap-4">
      <Button gradientDuoTone="greenToBlue">
        Uploads
      </Button>
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true}/>}
      >
        <Dropdown.Header>
          <span className="block text-sm">
            Bonnie Green
          </span>
          <span className="block truncate text-sm font-medium">
            name@flowbite.com
          </span>
        </Dropdown.Header>
        <Dropdown.Item>
          <Link to={"/"}>
            Profile
          </Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to={"/"}>
            Order
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>
          Logout
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  </Navbar>
  )
}