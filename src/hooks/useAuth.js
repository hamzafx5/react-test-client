import { useEffect, useState } from "react";
import axios from "../axios";
import useAuthContext from "../hooks/useAuthContext";

export default function useAuth() {
    const { user } = useAuthContext();
    return user ? true : false;
}
