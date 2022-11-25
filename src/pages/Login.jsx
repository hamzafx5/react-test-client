import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "../axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useAuth from "../hooks/useAuth";

const userSchemaObject = {
    email: "",
    password: "",
};

export default function LogIn() {
    const isAuth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const [errors, setErrors] = useState({ ...userSchemaObject });
    const [user, setUser] = useState({ ...userSchemaObject });

    function handleChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function login(user) {
        setLoading(true);
        setErrors({ ...userSchemaObject });
        try {
            const res = await axios.post("/auth/login", {
                data: user,
            });
            if (res?.status === 201) {
                dispatch({
                    type: "LOGIN",
                    payload: res.data.user,
                });
                localStorage.token = res.data.user.token;
                navigate("/", {
                    replace: true,
                });
            }
            setLoading(false);
        } catch (err) {
            if (err?.response?.status === 400) {
                let { filed, message } = err?.response?.data;
                setErrors((prev) => ({
                    ...prev,
                    [filed]: message,
                }));
            } else {
                alert("Something went wrong.");
            }
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        login(user);
    }

    // if (isAuth) {
    //     return <Navigate to="/" />;
    // }
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="px-4 py-8 bg-white shadow rounded-lg w-[calc(100vw-2rem)] max-w-[400px]"
            >
                <h1 className="text-lg mb-4 text-center font-semibold">
                    Login to your account
                </h1>
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
                <Button className="mt-6" fullWidth loading={loading}>
                    Log In
                </Button>
                <p className="text-center my-4">
                    Don't have an account{" "}
                    <Link className="text-accent" to="/auth/register">
                        Sing Up
                    </Link>
                </p>
            </form>
        </div>
    );
}
