import React from "react";
import Navbars from "../components/Navbars";
import rectangle from "../assets/shapes/Rectangle17.png"
import { Avatar, Button } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import profileart from "../assets/images/404-error-with-landscape-concept-illustration_114360-7898.jpg"


export default function DetailsUser() {
    const { id } = useParams()

    const { data: userProfile } = useQuery("userProfileCache", async () => {
        const response = await API.get("/post/" + id)
        return response.data.data.post
    })

    console.log("ini user", userProfile)

    return (
    <div className="w-screen h-screen">
        <Navbars />
        <div className="absolute overflow-hidden w-screen">
            <div className="absolute -right-16 top-0 -z-10">
                <img
                    src={rectangle}
                    alt="rectangle"
                    className=" h-[500px] w-[500px]"
                />
            </div>
            <div className="flex flex-row pt-16 md:max-w-screen-md lg:max-w-screen-2xl mr-56 ml-16 gap-10 w-full">
                <div className="flex justify-between items-start gap-3">
                    <div className="w-full flex flex-col items-start">
                        <Avatar
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded={true}
                            size="lg"
                        />
                        <h3 className="py-4 font-medium text-3xl">
                            {userProfile?.user.fullname}
                        </h3>
                        <h1 className="text-5xl w-[70%] font-semibold ">
                            {userProfile?.user.greeting}
                        </h1>
                        <div className="mt-12 flex items-center gap-3">
                            <Button size="lg" color="light">
                                Follow
                            </Button>
                            <Button size="lg" color="success">
                                Hire
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-max">
                    <img
                        src={profileart}
                        alt="art"
                        className="w-[800px] h-[500px] rounded-md border border-emerald-500"
                    />
                </div>
                {console.log("ini data image", userProfile?.post_image)}
            </div>
            <div className="py-16 lg:max-w-screen-2xl ml-16">
                <h3 className="font-medium text-3xl">My Works</h3>
                <div className="grid grid-cols-3 gap-4 pt-6">
                    {userProfile?.post_image.map((item, index) => {
                        console.log("ini imagggge", item)
                        return(
                        <Link>
                            <img key={index} src={item.image} className="w-50 rounded-md gap-10" alt="thumbnail"/>
                        </Link>
                        )
                        })}
                </div>
            </div>
        </div>
    </div>
)
}