import { Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbars from "../components/Navbars";
import { useMutation } from "react-query";
import { API } from "../config/api";

import dataURItoBlob from "../lib/dataBlob";

export default function UploadPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    description: "",
    post_image: [],
  })
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { title, description, post_image } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    setSelectedFiles([]);

    // Maximum 5 images are allowed at a time
    if (event.target.files.length > 5) {
      event.target.value = null;
      return alert("Only 5 images are allowed at a time");
    }

    const images = Array.from(event.target.files);

    const selectedImages = [];
    images.forEach((image) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImages.push({ image: e.target.result, name: image.name });
        if (selectedImages.length === images.length) {
          setSelectedFiles(selectedImages);
        }
      };
      reader.readAsDataURL(image);
    });
    };

    console.log("ini image", selectedFiles)

    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
        const config = {
          headers: {
            "Authorization": "Bearer " + localStorage.token
          }
        }

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description)
        if (selectedFiles.length !== 0) {
          for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("post_image", dataURItoBlob(selectedFiles[i].image), selectedFiles[i].name)
          }
        }  
        const response = await API.post("/post", formData, config)
        console.log(response)

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
              navigate("/uploads")
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    })

    return (
      <div>
            <Navbars />
            <div className="py-8 w-full md:max-w-screen-2xl mx-auto flex justify-between gap-8">
                <div className="flex flex-col gap-3 items-center justify-center w-full">
                  {selectedFiles.length > 0 ? (
                  <>
                  <div className="grid grid-cols-1 w-full gap-4">
                    <div className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <img
                        src={selectedFiles[0].image}
                        alt=""
                        className="object-cover object-center w-full h-80 rounded-md"
                      />
                      <input
                          id="post_image"
                          name="post_image"
                          onChange={handleImageChange}
                          type="file"
                          hidden
                          multiple
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-5">
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[1]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[2]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[3]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[4]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 w-full gap-4">
                    <div className="flex flex-col items-center justify-center gap-5">
                    <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-32 h-32 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-3xl text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-green-500">
                              Browse
                          </span>{" "}
                          to choose file
                      </p>
                      <input
                          id="post_image"
                          name="post_image"
                          onChange={handleImageChange}
                          type="file"
                          
                          multiple
                      />
                    </label>
                      <div className="flex flex-row w-full items-center justify-center gap-5">
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[1]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[2]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[3]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      <div className="w-full h-40 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <img
                          src={selectedFiles[4]?.image}
                          alt=""
                          className="object-cover object-center w-full h-40 rounded-md"
                        />
                      </div>
                      </div>
                    </div>
                  </div> 
                ) }
                </div>

                <div className="w-full">
                  <form onSubmit={(e) => handleSubmit.mutate(e)} className="flex flex-col gap-4">
                    <div>
                        <TextInput
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Title"
                            sizing="lg"
                            onChange={handleChange}
                            required={true}
                            value={title}
                        />
                    </div>
                    <div>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            required={true}
                            onChange={handleChange}
                            rows={7}
                            value={description}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className="px-10 py-4 rounded text-slate-600 font-medium text-xs bg-gray-300"
                        >
                          Cancel
                        </Link>
                        <button
                            type="submit"
                            className="px-10 py-4 rounded text-white text-xs font-medium bg-[#2FC4B2]"
                        >
                          Post
                        </button>
                    </div>
                  </form>
                  </div>
              </div>
        </div>
    );
};