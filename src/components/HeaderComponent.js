import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// Icons minh họa
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

export const HeaderComponent = ({ searchTerm, onSearchChange }) => {
    // Local state for input value
    const [localSearch, setLocalSearch] = useState(searchTerm);
    const navigate = useNavigate();

    // Handler for form submission: prevents default refresh and triggers search
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearchChange(localSearch);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#181818" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                >
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            color: "#FFA500",
                        }}
                    >
                        HotAnime
                    </Typography>
                </Box>
                <Box
                    component="form"
                    onSubmit={handleSearchSubmit}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                        maxWidth: "600px",
                        backgroundColor: "#2A2A2A",
                        borderRadius: "4px",
                        px: 1,
                    }}
                >
                    <SearchIcon sx={{ color: "#888" }} />
                    <TextField
                        variant="standard"
                        placeholder="Tìm kiếm..."
                        fullWidth
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            style: { color: "#fff", paddingLeft: "8px" },
                        }}
                        sx={{
                            "& .MuiInputBase-root": { fontSize: "0.9rem" },
                        }}
                    />
                    {/* Submit button triggers the search when clicked */}
                    <Button type="submit" sx={{ color: "#fff" }}>
                        Search
                    </Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <IconButton sx={{ color: "#fff" }}>
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#fff" }}>
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton sx={{ color: "#fff" }}>
                        <PersonIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};
