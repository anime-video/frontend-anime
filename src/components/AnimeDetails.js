import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAnimeById } from "../service/AnimeService";
import {
    Box,
    CircularProgress,
    Typography,
    Card,
    CardMedia,
    CardContent,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { HeaderComponent } from "./HeaderComponent";
import { CategoryComponent } from "./CategoryComponent";

// Helper function to get the correct embed URL
const getEmbedUrl = (url) => {
    if (!url) return "";
    // Check if the URL contains "watch?v=" and then transform it
    const watchParam = "watch?v=";
    if (url.includes(watchParam)) {
        return url.replace(watchParam, "embed/");
    }
    if (url.includes("youtu.be")) {
        const parts = url.split("youtu.be/");
        return `https://www.youtube.com/embed/${parts[1]}`;
    }
    // If URL is already an embed URL or not a YouTube URL, return it as-is.
    return url;
};

const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    // Use media queries so the layout can adjust on mobile screens.
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            try {
                const data = await getAnimeById(id);
                setAnime(data);
            } catch (error) {
                console.error("Error fetching anime details:", error);
            }
            setLoading(false);
        };

        fetchAnimeDetails();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!anime) {
        return (
            <Box sx={{ textAlign: "center", mt: 4, color: "#fff" }}>
                Không tìm thấy thông tin anime.
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
            <HeaderComponent />
            <CategoryComponent />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 2,
                    px: 2,
                    py: 4,
                    maxWidth: 1200,
                    margin: "0 auto",
                }}
            >
                <Card
                    sx={{
                        maxWidth: 300,
                        width: "100%",
                        backgroundColor: "#1e1e1e",
                        color: "#fff",
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={anime.imageUrl}
                        alt={anime.name}
                        sx={{
                            height: 400,
                            objectFit: "cover",
                        }}
                    />
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {anime.name}
                        </Typography>
                        {anime.category && (
                            <Typography variant="body2" gutterBottom>
                                <strong>Thể loại:</strong> {anime.category.name}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
                {anime.trailer && (
                    <Box
                        sx={{
                            flex: 1,
                            mt: { xs: 2, md: 0 },
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                paddingBottom: "56.25%",
                                height: 0,
                                overflow: "hidden",
                                borderRadius: 2,
                                backgroundColor: "#222",
                            }}
                        >
                            <iframe
                                title="Trailer"
                                src={getEmbedUrl(anime.trailer)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Description Section */}
            {anime.description && (
                <Box
                    sx={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        px: 2,
                        py: 4,
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Mô tả:
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "justify" }}>
                        {anime.description}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default AnimeDetail;
