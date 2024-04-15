import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { signupInput} from "@karirakesh/medium-common-updating"
import axios from "axios"
import { DATABASE_URL} from "../config"

export const Auth = ({type}: {type: "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        password: "",
        email: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${DATABASE_URL}/api/v1/user/${type === "signup" ? "signup" : "signin" }`, postInputs);
            const jwt = response.data;
            const token = typeof jwt === "string" ? jwt : JSON.stringify(jwt);
            localStorage.setItem("token", token);
            navigate("/blogs");
        } catch(err) {
            alert("Error while signing up")
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="text-center ">
                    <div className="max-w-md text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="max-w-md text-md">
                        {type === "signin" ? "Dont have an account?" : "Already have an account? "}
                        <Link to={type === "signin" ? "/signup" : "/signin"} className="underline ml-2">{type=== "signin"? "Sign up" : "Sign in"}</Link>
                    </div>
                    <div className="pt-4 w-80">
                        {type === "signup" ? <LabelledInput label="name" placeholder="Enter your name" onChange={ (e) => setPostInputs({...postInputs, name: e.target.value}) }/> : null}
                        <LabelledInput label="Email" placeholder="m@example.com" onChange={(e) => setPostInputs({...postInputs, email: e.target.value})}/>
                        <LabelledInput label="Password" type= {"password"} placeholder="Enter your password" onChange={(e) =>setPostInputs({...postInputs, password: e.target.value})}/>
                    </div>
                    <div>
                        <button onClick={sendRequest} type="button" className="mt-4 py-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in" }</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface LablledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string
}

function LabelledInput({label, placeholder, onChange, type}: LablledInputType) {
    return (
        <div>
            <label className="block text-start mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input onChange={onChange} type={ type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}