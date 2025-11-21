import { Box, Container, Typography, useTheme, alpha } from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

export const DashboardHeader = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
          }}
        >
          <DashboardIcon sx={{ fontSize: 28, color: "white" }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview of your business metrics
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

