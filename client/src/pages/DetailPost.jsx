import { Avatar, Button, Carousel } from "flowbite-react";
import React from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import Navbars from "../components/Navbars";
import { API } from "../config/api";


export default function DetailPost() {
  const { id } = useParams()

  const { data: detailPost } = useQuery("detailPostCache", async () => {
    const response = await API.get("/post/" + id)
    return response.data.data.post
  })

  console.log("data detail", detailPost)

  return (
    <>
      <Navbars />

      <div className="py-8 max-w-screen-lg mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link>
              <Avatar img={detailPost?.user.avatar} rounded={true} size="md"/>
            </Link>
            <div>
              <h1 className="font-medium text-lg">{detailPost?.title}</h1>
              <h1 className="font-normal">{detailPost?.user.fullname}</h1>
            </div>
          </div>
          <div className="flex items-center gap-7">
            <Button color="light">
              Follow
            </Button>
            <Button gradientDuoTone="greenToBlue">
              Hire
            </Button>
          </div>
        </div>
        <div className="pt-8 w-full" style={{height: "600px"}}>
          <Carousel>
            {detailPost?.post_image.map((item, idk) => (
              <img key={idk} src={item.image} />
            ))}
          </Carousel>
        </div>
        <div className="pt-8">
          <span className="font-medium text-lg">👋 Say Hello <span className="font-bold text-cyan-500">{detailPost?.user.email}</span></span>
        </div>
        <div className="pt-8">
          <h1 className="text-lg">{detailPost?.description}</h1>
        </div>
      </div>
    </>

    
  )
}