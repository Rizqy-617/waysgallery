import React, { useState } from "react";
import shape1 from "../assets/shapes/shape1.svg"
import shape2 from "../assets/shapes/shape2.svg"
import shape3 from "../assets/shapes/shape3.svg"
import logo from "../assets/images/logo.svg"
import programmerlogo from "../assets/images/programmer.svg"
import RegisterModal from "../components/modals/register";
import LoginModal from "../components/modals/login";


export default function LandingPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  }

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false)
  }

  const handleShowLoginModal = () => {
    setShowLoginModal(true)
  }

  const handleCLoseLoginModal = () => {
    setShowLoginModal(false)
  }

  return (
    <>
      <div className="relative">
        <div className="absolute -top-0 -left-0">
            <img src={shape1} alt="" />
        </div>

        <div className="absolute bottom-0 -left-0">
            <img src={shape2} alt="" />
        </div>

        <div className="absolute bottom-0 right-0">
            <img src={shape3} alt="" />
        </div>

        <div className="relative">
            <div className="w-full h-full mx-auto flex flex-col justify-between items-center gap-40 md:max-w-screen-md md:flex-row  md:h-screen lg:max-w-screen-xl">
                <div className="w-full flex flex-col justify-center items-start">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-40 lg:w-96"
                    />
                    <h1 className="text-3xl font-medium mt-4 leading-5 ">
                        show your work to inspire everyone
                    </h1>
                    <p className="mt-2 text-s text-gray-600">
                        WaysGallery is a website design creators gather
                        to share their work with other creators
                    </p>
                    <div className="mt-4 flex gap-2">
                        <button
                            className="px-5 py-3 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm hover:bg-[#2aa193]" onClick={handleShowRegisterModal}
                        >
                            Join Now
                        </button>
                        <button
                            className="px-5 py-3 rounded-md text-slate-800 font-medium bg-[#E7E7E7] text-xs lg:text-sm hover:text-white hover:bg-[#2FC4B2]"
                            onClick={handleShowLoginModal}
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                  <img src={programmerlogo} />
                </div>
            </div>
        </div>
    </div>
    <RegisterModal show={showRegisterModal} handleClose={handleCloseRegisterModal}/>
    <LoginModal show={showLoginModal} handleClose={handleCLoseLoginModal} />
    </>
);
}