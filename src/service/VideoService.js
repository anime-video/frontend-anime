import axios from "axios";
import {API_VIDEOS} from "../api/ApiConfig";

export const getVideo = async ()=>{
    try{
        const response = await axios.get(API_VIDEOS);
        return response.data;
    }catch (err){
        console.log(err);
    }
}
export const getVideoById = async (id) => {
    try {
        const response = await axios.get(`${API_VIDEOS}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching video with id ${id}:`, error);
        throw error;
    }
};

export const createVideo = async (video) => {
    try {
        const response = await axios.post(API_VIDEOS, video);
        return response.data;
    } catch (error) {
        console.error("Error creating video:", error);
        throw error;
    }
};

export const updateVideo = async (id, video) => {
    try {
        const response = await axios.put(`${API_VIDEOS}/${id}`, video);
        return response.data;
    } catch (error) {
        console.error(`Error updating video with id ${id}:`, error);
        throw error;
    }
};
export const deleteVideo = async (id) => {
    try {
        await axios.delete(`${API_VIDEOS}/${id}`);
        return;
    } catch (error) {
        console.error(`Error deleting video with id ${id}:`, error);
        throw error;
    }
}