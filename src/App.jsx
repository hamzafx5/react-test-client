import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import useAuthContext from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "./axios";

function App() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    useEffect(() => {
        axios("/auth/verify")
            .then((res) => {
                dispatch({ type: "LOGIN", payload: { ...res.data.user } });
                setLoading(false);
            })
            .catch((err) => {
                if (err?.response?.status === 401) {
                    navigate("/auth/login");
                    dispatch({ type: "LOGOUT" });
                }
                setLoading(false);
            });
    }, []);
    return (
        <>
            <Routes>
                {!loading ? (
                    <>
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/login" element={<LogIn />} />
                        <Route
                            path="/posts"
                            element={
                                <PrivateRoute>
                                    <Posts />
                                </PrivateRoute>
                            }
                        />
                    </>
                ) : (
                    <Route
                        path="/"
                        element={
                            <p className="text-center leading-[100vh]">
                                Loading...
                            </p>
                        }
                    />
                )}
            </Routes>
            <Outlet />
        </>
    );
}

export default App;
