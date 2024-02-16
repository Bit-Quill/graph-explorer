import { useState, useEffect } from 'react';


export const useFetchData = (apiUrl: string) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (error: any) {
                setError(error.message);
            }
        };

        fetchData();
    }, [apiUrl]);

    return { data, error };
};
