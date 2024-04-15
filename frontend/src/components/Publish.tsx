import { ChangeEvent, useState } from "react"
import { DATABASE_URL } from "../config"
import { Appbar } from "./AppBar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Publish = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <Appbar />
            <div className="">
            <div className="flex justify-center">
                <div className=" max-w-screen-lg w-full pt-10">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Title</label>
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Please enter your Title"></input>
                </div>
            </div>
            <div className="flex justify-center pt-10">
                <div className="max-w-screen-lg w-full">
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full">
                    <button onClick={async() => {
                        const response = await axios.post(`${DATABASE_URL}/api/v1/blog`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}


function TextEditor({onChange}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div>
            <div className="w-full mb-4 border ">
            <div className="px-4 py-2 h-40 rounded-t-lg w-full">
                <textarea onChange={onChange} focus:outline-none className="w-full h-40 text-sm text-gray-900 bg-white " placeholder="Write your content..." required />
            </div>

        </div>
    </div>
    )
}