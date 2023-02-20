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
    console.log("ini id", id)

    const { data: userProfile } = useQuery("DataUserProfileCache", async () => {
        try {
            const config = {
                headers: {
                    "Authorization": "Bearer " + localStorage.token
                }
            }

            const response = await API.get("/user/" + id, config)
            return response.data.data
        } catch (error) {
            console.log(error)
        }
    })

    console.log("ini user baru harusnya", userProfile)

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
                            img={userProfile?.avatar}
                            rounded={true}
                            size="lg"
                        />
                        <h3 className="py-4 font-medium text-3xl">
                            {userProfile?.fullname}
                        </h3>
                        <h1 className="text-5xl w-[70%] font-semibold ">
                            {userProfile?.greeting}
                        </h1>
                        <div className="mt-12 flex items-center gap-3">
                            <button type="submit" className="px-10 py-4 rounded text-black border-2 bg-[#f3f3f3] hover:bg-[#ababab] hover:transition hover:ease-in-out text-lg font-semibold">
                                Follow
                            </button>
                            <button type="submit" className="px-10 py-4 rounded border-2 border-teal-400 text-white bg-[#2FC4B2] hover:bg-[#167065] hover:transition hover:ease-in-out text-lg font-semibold">
                                Hired
                            </button>
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
            </div>
            <div className="py-16 lg:max-w-screen-3xl ml-16 mr-20">
                <h3 className="font-medium text-3xl">{userProfile?.fullname} Works</h3>
                <div className="grid grid-cols-4 gap-4 pt-6">
					{userProfile?.posts.length !== 0 ? (
						<>
							{userProfile?.posts.map((item) => (
                                <Link to={`/detail/${item?.post_image[0].post_id}`}>
                                <img
                                    alt="Image"
                                    key={item?.post_image[0].post_id}
                                    src={
                                        item?.post_image[0].image
                                    }
                                    className="w-full h-64 rounded-md object-cover hover:shadow-md hover:shadow-green-500 hover:transition-shadow hover:ease-in-out"
                                />
                                </Link>
							))}
						</>
					) : (
						<>
							<Alert variant="dark">
								Sorry, there is no list of data yet.
							</Alert>
						</>
					)}
                </div>
            </div>
        </div>
    </div>
)
}