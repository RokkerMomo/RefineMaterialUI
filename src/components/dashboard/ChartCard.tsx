import {
  Paper,
  Typography,
  useTheme,
  alpha,
  SxProps,
  Theme,
  Box,
} from "@mui/material";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  width?: { xs?: string; sm?: string };
  sx?: SxProps<Theme>;
}

export const ChartCard = ({
  title,
  children,
  width = { xs: "100%", sm: "40%" },
  sx,
}: ChartCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width,
        textAlign: "center",
        padding: { xs: 2, sm: 3 },
        borderRadius: 3,
        background:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.background.paper, 0.9)
            : theme.palette.background.paper,
        backdropFilter: "blur(10px)",
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
            : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
              : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
        },
        ...sx,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          ...(width.sm === "55%" && { marginBottom: 2 }),
        }}
      >
        {title}
      </Typography>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {children}
      </Box>
    </Paper>
  );
};

