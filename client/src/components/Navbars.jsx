import React, { useContext, useState } from "react"
import { Navbar, Dropdown, Button, Avatar } from "flowbite-react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import logo from "../assets/images/logo.svg"
import { useQuery } from "react-query"
import { API } from "../config/api"

export default function Navbars() {
  const [state, dispatch] = useContext(AppContext)

  const { data: dataNavbar } = useQuery("datanavbarcache", async () => {
    const response = await API.get("/user/" + state.user.ID)
    return response.data.data
  })

  console.log("ini data", dataNavbar)
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    })
  }
  
  return (
  <Navbar fluid={true} rounded={true} border style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem"}}>
    <Navbar.Brand>
      <Link to={"/"}>
      <img
        src={logo}
        className="w-[90px]"
        alt="Logo"
      />
      </Link>
    </Navbar.Brand>
    <div className="flex items-center gap-4">
      <Link to={"/uploads"}>
        <Button gradientDuoTone="greenToBlue">
          Uploads
        </Button>
      </Link>
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="User settings" img={dataNavbar?.avatar} rounded={true}/>}
      >
        <Link to={"/profile"}>
          <Dropdown.Item>
            Profile
          </Dropdown.Item>
        </Link>
        <Link to={"/"}>
          <Dropdown.Item>
            Order
          </Dropdown.Item>
        </Link>
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