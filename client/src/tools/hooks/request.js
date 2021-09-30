import { useState } from 'react';
import axios from 'axios';


const useRequest = () => {
    const [fetching, setFetching] = useState(false);


    const request = async ({ url, method = 'GET', body }) => {
        const fetchData = () => {
            if (method === 'GET') return axios.get(url, { params: body })
            else return axios({ url, method, data: body });
        };

        try {
            setFetching(true);

            const { data, config, headers, status } = await fetchData();

            setFetching(false);

            if ( data ) return { res: data, config, headers, status };

        } catch ({ response }) {
            setFetching(false);

            return { err: response };
        };
    };

    return { request, fetching };
};

export default useRequest;