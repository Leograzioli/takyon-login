import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useAxios = (config: AxiosRequestConfig<object>, loadOnStart = true): [boolean, string, () => void] => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    //handle the success notify
    const succesNotify = () => {
        toast.success('login successfully, redirecting...'), {
            position: toast.POSITION.TOP_RIGHT
        }
    }

    //handle the errors notify
    const errorNotify = (message: string) => {
        toast.error(message), {
            position: toast.POSITION.TOP_RIGHT
        }
    }

    useEffect(() => {
        if (loadOnStart) {
            sendRequest();            
        }
    }, )

    const request = () => {
        sendRequest();
    }

    const sendRequest = () => {
        setLoading(true)

        axios(config)
            .then( () => {

                succesNotify()
                setError('')

                setTimeout(() => {
                    navigate('/')
                }, 2000);

            })
            .catch((err) => {
                setError(err.response.data.message)
                errorNotify(err.response.data.message)
            }).finally(() => {
                setLoading(false)
            })
    }

    return [loading, error, request]
}

export default useAxios