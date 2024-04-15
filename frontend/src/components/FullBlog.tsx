
import { Appbar, AvatarName } from "./AppBar"
import { Blog } from "../Hooks/BlogHook"

export const FullBlog = ({blog} : {blog: Blog}) => {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-20 pt-20 w-full">
                    <div className="col-span-8  w-full">
                        <div className="font-bold text-xl">
                            {blog.title}
                        </div>
                        <div className="text-sm font-light">
                            Potsed on April 15, 2024
                        </div>
                        <div className="font-normal text-2xl">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4 ">
                        <div className="font-medium">
                            Author
                        </div>
                        <div className="flex">
                            <div className="flex justify-center flex-col pr-2">
                                <AvatarName name={blog.author.name || "Anonymous"} size={"big"} />
                            </div>
                            <div className="ml-2">
                                <div className="text-lg font-bold">
                                    {blog.author.name || "Anonymous"} 
                                </div>
                                <div>
                                    Master of mirth, purveyor of puns and the funniest person in the kingdom
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}