import React from "react";
import { Box } from "@mui/material";
import { HeaderComponent } from "./HeaderComponent";
import { CategoryComponent } from "./CategoryComponent";
import { AnimeComponent } from "./AnimeComponent";

export const HomeComponent = ({ searchTerm, onSearchChange }) => {
    return (
        <Box
            sx={{
                backgroundColor: "#121212",
                minHeight: "100vh",
                color: "#ffffff",
            }}
        >
            <HeaderComponent searchTerm={searchTerm} onSearchChange={onSearchChange} />
            <CategoryComponent />
            <AnimeComponent searchTerm={searchTerm} />
        </Box>
    );
};
