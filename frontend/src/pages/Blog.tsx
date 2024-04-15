import { useParams } from "react-router-dom";
import { useBlogId } from "../Hooks/BlogHook"
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {

    const { id } = useParams();
    const {loading, blog} = useBlogId({
        id: id || ""
    });
    if(loading) {
        return (
            <div>
                loading....
            </div>
        )
    }

    return (
        <div>
            <FullBlog blog={blog}/>
        </div>
    )
}