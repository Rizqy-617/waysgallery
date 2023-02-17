import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { API } from "../config/api";


export default function DetailPost() {
  const { id } = useParams()

  const { data: detailPost } = useQuery("detailPostCache", async () => {
    const response = await API.get("/post/" + id)
    return response.data.data
  })

  console.log(detailPost)

  return (
    <h1>ini Test</h1>
  )
}