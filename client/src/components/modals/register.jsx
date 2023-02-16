import React, { useState} from "react";
import { Alert, Modal, TextInput } from "flowbite-react";
import { useMutation } from "react-query";
import { API } from "../../config/api";


export default function RegisterModal({ show, handleClose }) {

  const [alert, setAlert] = useState();
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
      fullname: "",
      email: "",
      password: "",
      greeting: "",
      avatar: ""
  });

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
		});
		if (e.target.type === "file") {
			let url = URL.createObjectURL(e.target.files[0]);
			setPreview(url);
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
          formData.append("avatar", form.avatar[0], form.avatar[0].name);

          const response = await API.post("/register", formData);

          if (response.status === 200) {
              setAlert(
                  <Alert color="success">
                      <span>Register successfully</span>
                  </Alert>
              );
              handleClose();
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
                  {alert}
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
                      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="avatar" id="avatar" name="avatar" type="file" onChange={handleChange}/>
                      </div>
                      {preview && (
                        	<div>
                          <img src={preview} style={{maxWidth: "150px", maxHeight: "150px", objectFit: "cover",}} alt={"ini alt"}/>
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