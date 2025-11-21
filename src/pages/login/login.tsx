import React from "react";
import { useLogin } from "@refinedev/core";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton,
    useTheme,
    alpha,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

export const LoginPage = () => {
    const { mutate: login } = useLogin();
    const theme = useTheme();
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // get form data
        const formData = Object.fromEntries(
            new FormData(e.currentTarget).entries(),
        );

        // call login mutation
        login(formData);

        // reset form data
        e.currentTarget.reset();
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.mode === "dark"
                    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
                    : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                padding: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={8}
                    sx={{
                        padding: { xs: 3, sm: 4, md: 5 },
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        background: theme.palette.mode === "dark"
                            ? alpha(theme.palette.background.paper, 0.9)
                            : theme.palette.background.paper,
                        backdropFilter: "blur(10px)",
                        boxShadow: theme.palette.mode === "dark"
                            ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                            : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                    }}
                >
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 3,
                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        }}
                    >
                        <Lock sx={{ fontSize: 32, color: "white" }} />
                    </Box>

                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            marginBottom: 1,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Welcome Back
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginBottom: 4, textAlign: "center" }}
                    >
                        Sign in to your account to continue
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                    },
                                    "&.Mui-focused": {
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    },
                                },
                            }}
                        />

                        <TextField
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                    },
                                    "&.Mui-focused": {
                                        transform: "translateY(-2px)",
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                                    },
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 2,
                                mb: 2,
                                py: 1.5,
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: "1rem",
                                textTransform: "none",
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.4)}`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                                },
                                "&:active": {
                                    transform: "translateY(0)",
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};