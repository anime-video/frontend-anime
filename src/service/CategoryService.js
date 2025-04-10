import axios from "axios";
import {API_CATEGORY} from "../api/ApiConfig";
export const getCategory = async ()=>{
    try{
        const response = await axios.get(API_CATEGORY);
        return response.data;
    }catch (err){
        console.log(err);
        throw err;
    }
}

export const getAnimeById = async (id) => {
    try {
        const response = await axios.get(`${API_CATEGORY}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime with id ${id}:`, error);
        throw error;
    }
};