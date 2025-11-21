import React from "react";
import { useLogin } from "@refinedev/core";
import { Box, Button, Container, TextField, Typography, Divider } from "@mui/material";

export const LoginPage = () => {
    const { mutate: login } = useLogin();

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


    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h4" gutterBottom>
                    Login
                </Typography>
                

                <Box component="form" onSubmit={onSubmit} sx={{ width: "100%", mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In with Email
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};