import { Textarea, TextInput } from "flowbite-react";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbars from "../components/Navbars";
import { useMutation } from "react-query";
import { API } from "../config/api";
import cloudIcon from "../assets/images/upload-svgrepo-com.svg"
import profileIcon from "../assets/images/profile-add-svgrepo-com.svg"

export default function EditPage() {
  const navigate = useNavigate()

  const [previewAvatar, setPreviewAvatar] = useState(null)
  const [previewArt, setPreviewArt] = useState(null)

  const [form, setForm] = useState({
    greeting: "",
    fullname: "",
    image: "",
    art: "",
  })

  const { greeting, fullname, image, art } = form

  const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
		});
		if (e.target.type === "file" && e.target.name === "image") {
			let url = URL.createObjectURL(e.target.files[0]);
			setPreviewAvatar(url);
		} else if (e.target.type === "file" && e.target.name === "art") {
            let url = URL.createObjectURL(e.target.files[0]);
			setPreviewArt(url);
        }
	};

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("greeting", form.greeting);
      formData.append("fullname", form.fullname);
      formData.append("image", form.image[0], form.image[0].name);
      formData.append("art", form.art[0], form.art[0].name);

      const response = await API.patch("/update-profile", formData);

      if (response.status === 200) {
        Swal.fire({
            title: "Success",
            text: "Post has been uploaded",
            icon: "success",
            confirmButtonText: "OK",
            }).then((result) => {
            if (result.isConfirmed) {
              navigate("/")
            }
            })
        } else {
        Swal.fire({
            title: "Error",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
        }).then((result) => {
        if (result.isConfirmed) {
          navigate("/edit-profile")
        }})
      }
    } catch(error) {
      console.log(error)
    }
  })

  return (
    <>
      <Navbars />

      <div className="py-8 w-full md:max-w-screen-2xl mx-auto flex justify-between">
        <div className="flex flex-col gap-3 items-center justify-center w-full mr-10">
          {previewArt ? (
            <>
              <div className="grid grid-cols-1 w-full">
                <div className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <label htmlFor="art">
                    <img src={previewArt} alt="" className="object-cover object-center w-[744px] h-96 rounded-md" />
                    <input id="art" name="art" onChange={handleChange} type="file" hidden />
                  </label>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 w-full">
                <div className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <label htmlFor="art" className="cursor-pointer">
                    <img src={cloudIcon} alt="" className="w-32 h-32 mb-3 text-gray-400"/>
                    <input id="art" name="art" onChange={handleChange} type="file" hidden/>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="w-full">
          <form onSubmit={(e) => handleSubmit.mutate(e)} className="flex flex-col gap-4">
            {previewAvatar ? (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <label htmlFor="image">
                    <img src={previewAvatar} className="w-40 h-40 rounded-full"  />
                    <input id="image" name="image" onChange={handleChange} hidden type="file" />
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center w-40 h-40 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <label htmlFor="image">
                    <img src={profileIcon} className="w-40 h-40 rounded-full"  />
                    <input id="image" name="image" onChange={handleChange} hidden type="file" />
                  </label>
                </div>
              </div>
            )}
            <TextInput id="fullname" name="fullname" type="text" placeholder="Fullname" sizing="lg" onChange={handleChange} required={true} value={fullname} />
            <TextInput id="greeting" name="greeting" type="text" placeholder="Greeting" sizing="lg" onChange={handleChange} required={true} value={greeting} />
            <div className="flex flex-col items-center gap-2">
              <button type="submit" className="px-10 py-4 rounded text-white text-xs font-medium bg-[#2FC4B2]">
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}