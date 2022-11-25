import { BiTrash } from "react-icons/bi";

export default function PostCard({
    _id,
    title,
    body,
    featuredImage,
    author,
    createdAt,
    onDelete,
}) {
    return (
        <div className="rounded-[5px] overflow-hidden shadow-[0_0_3px_rgba(36,39,44,0.15)] group">
            <div className="overflow-hidden aspect-video rounded-[inherit] relative">
                <span
                    onClick={() => onDelete(_id)}
                    className="absolute top-3 left-3 text-red-500 p-1 bg-white rounded-sm cursor-pointer opacity-0 group-hover:opacity-100"
                >
                    <BiTrash />
                </span>
                <img
                    className="w-full h-full object-cover"
                    loading="lazy"
                    src={featuredImage}
                    alt="post thumbnail"
                />
            </div>
            <div className="p-[16px]">
                <p className="text-sm text-gray-700 mb-2">
                    Author: <b>{author}</b>
                </p>
                <p className="text-sm text-gray-700 mb-2">
                    Date: <b>{createdAt.split("T")[0].replace(/-/g, "/")}</b>
                </p>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="mt-[8px]">{body}</p>
            </div>
        </div>
    );
}
