import { TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import Navbars from "../components/Navbars";
import { API } from "../config/api";


export default function HiredPage() {
  const { id } = useParams()
  console.log("ini state", id)

  const [form, setForm] = useState({
    title: "",
    description: "",
    startProject: "",
    endProject: "",
    price: "",
    orderTo: id,
  })

  const { title, description, startProject, endProject, price, orderTo } = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Authorization": "Bearer " + localStorage.token
        }
      }

      const body = JSON.stringify({form});
      console.log("ini body", body)

      const response = await API.post("/hired", body, config)
      console.log("ini response bidding")
      const newToken = response.data.data.token
      window.snap.pay(newToken, {
        onSuccess: function (result) {
          console.log(result)
          alert("Yey kamu berhasil bayar")
        },
        onPending: function (result) {
          console.log(result)
          alert("Pembayaran mu masih pending")
        },
        onError: function (result) {
          console.log(result)
          alert("Pembayaran mu error")
        },
        onClose: function (result) {
          alert("Oyyyy Bayar dulu lah minimal")
        },
      });


    } catch(error) {
      console.log(error)
    }
  })

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const myMidtransClientKey = "SB-Mid-client-tyISZHDIMtfTG8B9";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl

    scriptTag.setAttribute("data-client-key", myMidtransClientKey)
    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])

  return (
    <>
      <Navbars />

      <div className="max-w-screen-3xl flex justify-center">
        <div className="flex flex-col w-[800px] mt-32">
          <form onSubmit={(e) => handleSubmit.mutate(e)} className="flex flex-col w-[800px] gap-10">
            <TextInput id="title" name="title" type="text" placeholder="Title" sizing="lg" required={true} onChange={handleChange} value={title} />
            <Textarea id="description" name="description" placeholder="Description" required={true} onChange={handleChange}  rows={7} value={description}/>
            <div className="flex flex-row gap-10">
              <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="startProject" name="startProject" onChange={handleChange} value={startProject}/>
              <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="endProject" name="endProject" onChange={handleChange} value={endProject}/>
            </div>
            <TextInput id="price" name="price" type="number" placeholder="Price" sizing="lg" required={true} onChange={handleChange} value={price} />
            <div className="flex flex-row items-center justify-center">
              <button className="px-4 py-1 rounded border-2 border-teal-400 text-white bg-[#2FC4B2] hover:bg-[#167065] hover:transition hover:ease-in-out text-lg font-semibold" type="submit">
                Bidding
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}