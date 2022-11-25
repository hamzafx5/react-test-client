import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const userSchemaObject = {
    fullName: "",
    email: "",
    password: "",
};

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ ...userSchemaObject });
    const [user, setUser] = useState({ ...userSchemaObject });

    function handleChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function registerUser(user) {
        setErrors({ ...userSchemaObject });
        try {
            const res = await axios.post("/auth/register", {
                data: user,
            });
            if (res.status === 201) {
                navigate("/auth/login", {
                    replace: true,
                });
            }
        } catch (err) {
            if (err.response.status === 400) {
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
        registerUser(user);
    }
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="px-4 py-8 bg-white shadow rounded-lg w-[calc(100vw-2rem)] max-w-[400px]"
            >
                <h1 className="text-lg mb-4 text-center font-semibold">
                    Create an account
                </h1>
                <Input
                    placeholder="Full name"
                    value={user.fullName}
                    name="fullName"
                    onChange={handleChange}
                    error={errors.fullName}
                />
                <Input
                    placeholder="example@gmail.com"
                    value={user.email}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    placeholder="Password"
                    value={user.password}
                    name="password"
                    type="password"
                    onChange={handleChange}
                    error={errors.password}
                />
                <Button className="mt-6" fullWidth>
                    Sign Up
                </Button>
            </form>
        </div>
    );
}
