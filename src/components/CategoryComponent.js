import React, { useState, useEffect } from "react";
import { getCategory } from "../service/CategoryService";
import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";

export const CategoryComponent = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategory();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories: ", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error">
                Có lỗi xảy ra khi tải danh mục.
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
            }}
        >
            {categories && categories.length > 0 ? (
                <List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
                    {categories.map((category) => (
                        <ListItem
                            key={category.id}
                            divider
                            button
                            onClick={() => console.log(`Đã bấm vào danh mục: ${category.name}`)}
                            sx={{
                                width: "auto",
                                cursor: "pointer",
                                transition: "color 0.3s, background-color 0.3s",
                                "&:hover": {
                                    color: "#FFA500",
                                    backgroundColor: "#f5f5f5",
                                },
                            }}
                        >
                            <ListItemText
                                primary={category.name}
                                secondary={category.description || ""}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1">Không có danh mục nào.</Typography>
            )}
        </Box>
    );
};
