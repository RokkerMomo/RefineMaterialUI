import { Paper, useTheme, alpha, SxProps, Theme } from "@mui/material";
import BasicSparkLine from "../sparkline/index";

interface StatCardProps {
  title: string;
  sx?: SxProps<Theme>;
}

export const StatCard = ({ title, sx }: StatCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={8}
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "30%" },
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
      <BasicSparkLine tittle={title} />
    </Paper>
  );
};

