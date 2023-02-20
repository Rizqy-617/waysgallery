import { Textarea, TextInput } from "flowbite-react";
import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Navbars from "../components/Navbars";
import { useMutation } from "react-query";
import { API } from "../config/api";

export default function