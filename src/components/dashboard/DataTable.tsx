import {
  Paper,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Link,
  CircularProgress,
  useTheme,
  alpha,
} from "@mui/material";
import { DateField } from "@refinedev/mui";
import { useNavigate } from "react-router";
import { ReactNode } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
}

interface DataTableProps {
  title: string;
  icon: ReactNode;
  iconColor?: string;
  columns: Column[];
  data: any[];
  loading: boolean;
  emptyMessage: string;
  viewAllLink?: string;
  onRowClick?: (row: any) => void;
  getRowHoverColor?: (row: any) => string;
}

export const DataTable = ({
  title,
  icon,
  iconColor,
  columns,
  data,
  loading,
  emptyMessage,
  viewAllLink,
  onRowClick,
  getRowHoverColor,
}: DataTableProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const defaultIconColor = iconColor || theme.palette.primary.main;
  const defaultHoverColor = getRowHoverColor
    ? undefined
    : alpha(theme.palette.primary.main, 0.05);

  return (
    <Paper
      elevation={8}
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "48%" },
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              color: defaultIconColor,
              fontSize: 24,
              display: "flex",
              alignItems: "center",
              "& svg": {
                fontSize: 24,
              },
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        </Box>
        {viewAllLink && (
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate(viewAllLink)}
            sx={{
              color: defaultIconColor,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
              cursor: "pointer",
            }}
          >
            View All
          </Link>
        )}
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key} sx={{ fontWeight: 600 }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="body2" color="text.secondary">
                      {emptyMessage}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: getRowHoverColor
                          ? alpha(getRowHoverColor(row), 0.05)
                          : defaultHoverColor,
                        cursor: onRowClick ? "pointer" : "default",
                      },
                    }}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key] || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

