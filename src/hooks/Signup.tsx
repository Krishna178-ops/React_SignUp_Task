import { useMutation } from '@tanstack/react-query';
import axios from "axios"
import {PostData} from "../types/Signup"

export const useFetch  = (reset:any) =>{
    return useMutation({
        mutationFn: (newTodo:PostData) => {
          return axios.post('https://jsonplaceholder.typicode.com/posts', newTodo)
        },
        onSuccess: (data, variables, context) => {
        reset()
        }
      }, 
    )
}