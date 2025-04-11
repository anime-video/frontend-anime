import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { HeaderComponent } from "./HeaderComponent";
import { getAnimeById } from "../service/AnimeService";

// Hàm helper chuyển đổi URL YouTube sang định dạng embed
const getEmbedUrl = (url) => {
    if (!url) return "";
    const watchParam = "watch?v=";
    if (url.includes(watchParam)) {
        return url.replace(watchParam, "embed/");
    }
    if (url.includes("youtu.be")) {
        const parts = url.split("youtu.be/");
        return `https://www.youtube.com/embed/${parts[1]}`;
    }
    return url;
};

const VideoDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy thông tin video và animeId được truyền từ AnimeDetail
    const { videoUrl, episodeNumber, animeId } = location.state || {};

    // Gọi hook ngay từ đầu component (không nên gọi sau return sớm)
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    // Nếu có animeId, gọi API lấy thông tin anime
    useEffect(() => {
        const fetchAnimeDetails = async () => {
            if (animeId) {
                try {
                    const data = await getAnimeById(animeId);
                    setAnime(data);
                } catch (error) {
                    console.error("Error fetching anime details:", error);
                }
            }
            setLoading(false);
        };

        fetchAnimeDetails();
    }, [animeId]);

    // Nếu không có videoUrl thì trả về thông báo lỗi ngay sau khi các hook đã được gọi
    if (!videoUrl) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    mt: 4,
                    color: "#fff",
                    backgroundColor: "#000",
                    minHeight: "100vh",
                    py: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Không tìm thấy thông tin video.
                </Typography>
            </Box>
        );
    }

    const embedUrl = getEmbedUrl(videoUrl);
    console.log("Embed URL:", embedUrl);

    return (
        <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
            <HeaderComponent />

            <Box sx={{ maxWidth: 1200, margin: "0 auto", px: 2, py: 4 }}>
                <Box
                    sx={{
                        position: "relative",
                        paddingBottom: "56.25%", // tỉ lệ 16:9
                        height: 0,
                        overflow: "hidden",
                        borderRadius: 2,
                        backgroundColor: "#222",
                    }}
                >
                    <iframe
                        title="Video Player"
                        src={embedUrl}
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

                {animeId && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Danh sách tập:
                        </Typography>

                        {loading ? (
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            anime?.videos &&
                            anime.videos.length > 0 && (
                                <Grid container spacing={2}>
                                    {anime.videos.map((video) => (
                                        <Grid item xs={12} sm={6} md={4} key={video.id}>
                                            <Card
                                                sx={{
                                                    backgroundColor:
                                                        video.episodeNumber === episodeNumber
                                                            ? "#3f51b5" // Màu nền nổi bật cho tập hiện tại
                                                            : "#1e1e1e",
                                                    color: "#fff",
                                                    borderRadius: 2,
                                                    boxShadow: video.episodeNumber === episodeNumber ? 6 : 3,
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        boxShadow: 6,
                                                    },
                                                }}
                                                onClick={() =>
                                                    navigate(`/video/${video.id}`, {
                                                        state: {
                                                            videoUrl: video.videoUrl,
                                                            episodeNumber: video.episodeNumber,
                                                            animeId: anime.id,
                                                        },
                                                    })
                                                }
                                            >
                                                <CardContent>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        Tập {video.episodeNumber}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default VideoDetail;
