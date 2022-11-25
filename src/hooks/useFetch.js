import { useEffect, useState } from "react";
import axios from "../axios";

export default function useFetch(query, initialState = []) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialState);

    useEffect(() => {
        axios
            .get(query)
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch((err) => {
                setLoading(false);
                setError(err);
            });
    }, [query]);

    return { loading, error, data };
}
