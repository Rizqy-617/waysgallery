import React from "react";
import Navbars from "../components/Navbars";
import rectangle from "../assets/shapes/Rectangle17.png"
import { Avatar, Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import profileart from "../assets/images/6191324_2831104.jpg"


export default function DetailsUser() {
  const { id } = useParams()

  const { data: userProfile } = useQuery("userProfileCache", async () => {
    const response = await API.get("/post/" + id)
    return response.data.data.post
  })

  console.log("ini data user", userProfile)

  return (
    <div className="w-screen h-screen">
            <Navbars />
            <div className="relative w-full overflow-hidden">
                <div className="absolute -right-16 top-0 -z-10">
                    <img
                        src={rectangle}
                        alt="rectangle"
                        className=" h-[400px]"
                    />
                </div>
                <div className="w-full pt-16 md:max-w-screen-md lg:max-w-screen-lg mx-auto ">
                    <div className="flex justify-between items-start gap-3">
                        <div className="w-full flex flex-col items-start">
                            <Avatar
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded={true}
                                size="lg"
                            />
                            <h3 className="py-4 font-medium text-xl">
                                {userProfile?.user.fullname}
                            </h3>
                            <h1 className="text-5xl w-[70%] font-semibold ">
                                {userProfile?.user.greeting}
                            </h1>
                            <div className="mt-12 flex items-center gap-3">
                                <button className=" px-4 py-1.5 rounded text-slate-800 bg-gray-300 text-xs">
                                    Follow
                                </button>
                                <button className=" px-4 py-1.5 rounded text-white bg-[#2FC4B2] text-xs">
                                    Hire
                                </button>
                            </div>
                        </div>
                        <div className="w-full">
                            <img
                                src={profileart}
                                alt="art"
                                className="w-[640px]"
                            />
                        </div>
                    </div>

                    <div className="py-16">
                        <h3 className="text-lg font-medium">My Works</h3>
                        <div className="grid grid-cols-3 gap-4 pt-6">
                            {userProfile?.post_image.map((item) => {
                              return (
                                  <img
                                      key={item.post_id}
                                      src={item.image[0]}
                                      alt="art"
                                  />
                              );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}