import React, { useEffect, useState } from "react";
import { getAnime, getAnimeByName } from "../service/AnimeService";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AnimeComponent = ({ searchTerm }) => {
    const [anime, setAnime] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAnime = async () => {
        setLoading(true);
        try {
            let data;
            if (searchTerm.trim() !== "") {
                data = await getAnimeByName(searchTerm);
            } else {
                data = await getAnime();
            }
            setAnime(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAnime();
    }, [searchTerm]);

    return (
        <Box sx={{ backgroundColor: "#000", p: 4, minHeight: "100vh" }}>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid
                    container
                    spacing={3}
                    justifyContent="center"
                    alignItems="stretch"
                >
                    {anime && anime.length > 0 ? (
                        anime.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <Card
                                    onClick={() => navigate(`/anime/${item.id}`)}
                                    sx={{
                                        backgroundColor: "#1c1c1c",
                                        color: "#fff",
                                        transition: "transform 0.3s, box-shadow 0.3s",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                                        },
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={item.imageUrl}
                                        alt={item.name}
                                        sx={{ objectFit: "cover" }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            sx={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: 200,
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        {item.category && (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: "#ccc", mt: 1 }}
                                            >
                                                <strong>Thể loại:</strong> {item.category.name}
                                            </Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                mt: 4,
                                color: "#fff",
                            }}
                        >
                            Không tìm thấy kết quả phù hợp.
                        </Box>
                    )}
                </Grid>
            )}
        </Box>
    );
};
