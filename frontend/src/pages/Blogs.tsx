import { useBlog } from "../Hooks/BlogHook"
import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    const { loading, blogs} = useBlog();

    if(loading) {
        return (
            <div>
                loading...
            </div>
        )
    }
    return (
        <div>
            <Appbar />
            <div className="flex-1 justify-center">
            <div className="">
                {blogs.map(blog => <BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={"13 April 2024"} />)}
            </div>
        </div>
        </div>
    )
}