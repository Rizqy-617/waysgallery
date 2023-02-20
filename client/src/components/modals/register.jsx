import React, { useState} from "react";
import { Alert, Label, Modal, TextInput } from "flowbite-react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

export default function RegisterModal({ show, handleClose }) {

    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [previewArt, setPreviewArt] = useState(null)

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        greeting: "",
        image: "",
        art: "",
    });

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

            formData.append("fullname", form.fullname);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("greeting", form.greeting);
            formData.append("image", form.image[0], form.image[0].name);
            formData.append("art", form.art[0], form.art[0].name)

            const response = await API.post("/register", formData);

            if (response.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Post has been uploaded",
                    icon: "success",
                    confirmButtonText: "OK",
                    }).then((result) => {
                    if (result.isConfirmed) {
                        handleClose()
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
                        handleClose()
                }})
            }
        } catch (error) {
            console.log(error);
        }
    });  

    return (
        <div>
            <Modal show={show} size="sm" popup={true} onClose={handleClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="p-0">
                        <h1 className="text-xl font-semibold text-[#2FC4B2]">
                            Register
                        </h1>
                        <form
                            onSubmit={(e) => handleSubmit.mutate(e)}
                            className="flex flex-col gap-4 mt-6"
                        >
                            <div>
                                <TextInput
                                    name="fullname"
                                    type="text"
                                    placeholder="FullName"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required={true}
                                    onChange={handleChange}
                                    className="outline-none"
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <TextInput
                                    name="greeting"
                                    type="greeting"
                                    placeholder="Greeting"
                                    required={true}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                            <Label htmlFor="image">Upload Your Avatar</Label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="image" id="image" name="image" type="file" onChange={handleChange}/>
                            </div>
                            {previewAvatar && (
                            <div>
                                <img src={previewAvatar} className="w-[100px] h-[100px] rounded-full" alt={"ini alt"}/>
                            </div>
                            )}
                            <div>
                            <Label htmlFor="art" >Upload Your Art</Label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="art" id="art" name="art" type="file" onChange={handleChange}/>
                            </div>
                            {previewArt && (
                            <div>
                                <img src={previewArt} style={{maxWidth: "150px", maxHeight: "150px", objectFit: "cover",}} alt={"ini alt"}/>
                            </div>
                            )}

                            <button
                                type="submit"
                                className="px-4 py-2 mt-3 rounded-md text-white font-medium bg-[#2FC4B2] text-xs lg:text-sm"
                            >
                                Register
                            </button>
                        </form>
                        <p className="text-xs text-center mt-4">
                            Already have an account ? Klik Here
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
    }