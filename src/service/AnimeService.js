import axios from "axios";
import {API_ANIME} from "../api/ApiConfig";

export const getAnime = async ()=>{
    try{
        const response = await axios.get(API_ANIME);
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}

export const getAnimeByName = async (name)=>{
    try{
        const response = await axios.get(`${API_ANIME}/search`, {
            params: { name }
        });
        return response.data;
    }catch (err){
        console.log(err);
    }
}

export const getAnimeById = async (id) => {
    try {
        const response = await axios.get(`${API_ANIME}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime with id ${id}:`, error);
        throw error;
    }
};

export const createAnime = async (anime) => {
    try {
        const response = await axios.post(API_ANIME, anime);
        return response.data;
    } catch (error) {
        console.error("Error creating anime:", error);
        throw error;
    }
};

export const updateAnime = async (id, anime) => {
    try {
        const response = await axios.put(`${API_ANIME}/${id}`, anime);
        return response.data;
    } catch (error) {
        console.error(`Error updating anime with id ${id}:`, error);
        throw error;
    }
};

export const deleteAnime = async (id) => {
    try {
        await axios.delete(`${API_ANIME}/${id}`);
    } catch (error) {
        console.error(`Error deleting anime with id ${id}:`, error);
        throw error;
    }
};