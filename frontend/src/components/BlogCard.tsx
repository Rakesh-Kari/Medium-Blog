import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
    id: string
}

export const BlogCard = ({authorName, title, content, publishedDate, id}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="py-4 border-b-2 mx-80 sm:mx-50 cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar/> 
                </div>
                <div className="pl-2 font-normal flex justify-center flex-col">
                    {authorName} . 
                </div>
                <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col">
                    {publishedDate}
                </div>
                <div className="flex justify-center flex-col">
                    <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </div>
                <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col">
                    Member Only
                </div>
            </div>
            <div className="font-extrabold pt-2">
                {title}
            </div>
            <div className="font-medium pt-2">
                {content.slice(0,400) + "...."}
            </div>
            <div className="font-semibold pt-4">
                {`${Math.ceil(content.length/100)} min read`}
            </div>
            
        </div>
        </Link>
    )
}

function Avatar () {
    return (
        <div>
             <img
                alt="user 1"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                className="relative inline-block h-7 w-7 !rounded-full  border-2 border-white object-cover object-center hover:z-10 focus:z-10" 
            />
        </div>
    )
}