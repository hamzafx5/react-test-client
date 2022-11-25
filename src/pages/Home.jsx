import React, { useState } from "react";
import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import useAuthContext from "../hooks/useAuthContext";
import useFetch from "../hooks/useFetch";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../axios";

const postSchemaObject = {
    featuredImage: "",
    title: "",
    body: "",
};

export default function Home() {
    const { user } = useAuthContext();
    const [post, setPost] = useState({ ...postSchemaObject });
    const [errors, setErrors] = useState({ ...postSchemaObject });
    const [query, setQuery] = useState("/posts");
    const { loading, error, data } = useFetch(query);
    const [isOpen, setIsOpen] = useState(false);

    function handleChange(e) {
        setPost((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function handleDeletePost(id) {
        axios
            .delete(`/posts/${id}`)
            .then((res) => {
                // retrigger useFetch hook to get the latest posts
                setQuery(`/posts?limit=${Date.now()}`);
            })
            .catch(console.error);
    }

    async function addPost(post) {
        setErrors({ ...postSchemaObject });
        try {
            const res = await axios.post("/posts", {
                data: post,
            });
            if (res.status === 201) {
                // retrigger useFetch hook to get the latest posts
                setQuery(`/posts?limit=${Date.now()}`);
                setPost({ ...postSchemaObject });
                setIsOpen(false);
            }
        } catch (err) {
            console.log(err);
            if (err?.response?.status === 400) {
                let { filed, message } = err.response.data;
                setErrors((prev) => ({
                    ...prev,
                    [filed]: message,
                }));
            } else {
                alert("Something went wrong.");
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        addPost(post);
    }
    return (
        <div className="pt-[70px]">
            <Nav />
            <div className="container">
                <div className="flex items-center gap-4 justify-between">
                    <h1 className="text-2xl font-semibold my-6">
                        Welcome {user.fullName}
                    </h1>
                    <Button onClick={() => setIsOpen(true)}>Add Post</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[32px]">
                    {loading && <p className="text-center my-4">Loading...</p>}
                    {!loading &&
                        !error &&
                        data?.data?.map((post) => (
                            <PostCard
                                key={post._id}
                                onDelete={handleDeletePost}
                                {...post}
                            />
                        ))}
                </div>
                <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-lg mb-4 text-center font-semibold">
                            Create new post
                        </h1>
                        <Input
                            placeholder="Image url"
                            value={post.featuredImage}
                            name="featuredImage"
                            onChange={handleChange}
                            error={errors.featuredImage}
                        />
                        <Input
                            placeholder="Title"
                            value={post.title}
                            name="title"
                            onChange={handleChange}
                            error={errors.title}
                        />
                        <Input
                            placeholder="Body"
                            value={post.body}
                            name="body"
                            onChange={handleChange}
                            error={errors.body}
                        />
                        <Button className="mt-6" fullWidth>
                            Create
                        </Button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
