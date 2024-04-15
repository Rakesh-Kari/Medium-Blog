import { useEffect, useState } from "react"
import { DATABASE_URL } from "../config";
import axios from "axios"

export interface Blog {
    content: string;
    title: string;
    author: {
        name: string;
    }
    id: string;
}

export const useBlogId = ({id} : {id:string}) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    const token = localStorage.getItem("token");
    console.log("token:", token);

    useEffect(() => {
        axios.get(`${DATABASE_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, [id])

    return {
        loading,
        blog
    }
}

export const useBlog = () => {

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const token = localStorage.getItem("token");
    console.log("token:", token);

    useEffect(() => {
        axios.get(`${DATABASE_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}
