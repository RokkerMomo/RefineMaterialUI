import {
  Box,
  Container,
  Typography,
  useTheme,
  Paper,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Link,
  CircularProgress,
} from "@mui/material";
import ArcDesign from "../../components/gauge/index";
import BasicSparkLine from "../../components/sparkline/index";
import Linechart from "../../components/linechart/index";
import { Authenticated, useList, useMany } from "@refinedev/core";
import { Dashboard as DashboardIcon, Article, Category } from "@mui/icons-material";
import { DateField } from "@refinedev/mui";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Fetch recent blog posts
  const { result: blogPostsResult, query: blogPostsQuery } = useList({
    resource: "blog_posts",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
  });

  // Fetch recent categories
  const { result: categoriesResult, query: categoriesQuery } = useList({
    resource: "categories",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "id",
        order: "desc",
      },
    ],
  });

  // Get category titles for blog posts
  const categoryIds =
    blogPostsResult?.data
      ?.map((item: any) => item?.category?.id)
      .filter(Boolean) ?? [];

  const { result: categoriesResultForPosts } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const blogPosts = blogPostsResult?.data ?? [];
  const categoriesList = categoriesResult?.data ?? [];
  const blogPostsLoading = blogPostsQuery.isLoading;
  const categoriesLoading = categoriesQuery.isLoading;

  return (
    <Authenticated
      key="dashboard"
      redirectOnFail="/login"
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: theme.palette.mode === "dark"
            ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
            : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          padding: { xs: 2, sm: 3, md: 4 },
          paddingTop: { xs: 3, sm: 4, md: 5 },
          paddingBottom: 5,
        }}
      >
        {/* Header Section */}
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

        {/* Stats Cards Row */}
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            justifyContent: "space-between",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "30%" },
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
                  ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              },
            }}
          >
            <BasicSparkLine tittle="Number of companies" />
          </Paper>

          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "30%" },
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
                  ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              },
            }}
          >
            <BasicSparkLine tittle="Number of contacts" />
          </Paper>

          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "30%" },
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
                  ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              },
            }}
          >
            <BasicSparkLine tittle="Total deals in pipeline" />
          </Paper>
        </Container>

        {/* Charts Row */}
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            justifyContent: "space-between",
            gap: { xs: 2, sm: 3 },
          }}
        >
          <Paper
            elevation={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              width: { xs: "100%", sm: "40%" },
              textAlign: "center",
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
                  ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              Total revenue (yearly)
            </Typography>
            <ArcDesign />
          </Paper>

          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "55%" },
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
                  ? `0 12px 40px ${alpha(theme.palette.common.black, 0.4)}`
                  : `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                marginBottom: 2,
              }}
            >
              Deals
            </Typography>
            <Linechart />
          </Paper>
        </Container>

        {/* Tables Row */}
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            justifyContent: "space-between",
            gap: { xs: 2, sm: 3 },
          }}
        >
          {/* Recent Blog Posts Table */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "48%" },
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
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
                <Article
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Recent Blog Posts
                </Typography>
              </Box>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/blog-posts")}
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  cursor: "pointer",
                }}
              >
                View All
              </Link>
            </Box>

            {blogPostsLoading ? (
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
                      <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogPosts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No blog posts found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      blogPosts.map((post: any) => (
                        <TableRow
                          key={post.id}
                          sx={{
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.05
                              ),
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => navigate(`/blog-posts/show/${post.id}`)}
                        >
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 200,
                              }}
                            >
                              {post.title || "-"}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={post.status || "Draft"}
                              size="small"
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.1
                                ),
                                color: theme.palette.primary.main,
                                fontWeight: 500,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <DateField
                              value={post.createdAt}
                              format="LLL dd, y"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>

          {/* Recent Categories Table */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              minWidth: { xs: "100%", sm: "48%" },
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              background: theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
              backdropFilter: "blur(10px)",
              boxShadow: theme.palette.mode === "dark"
                ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
                : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.palette.mode === "dark"
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
                <Category
                  sx={{
                    color: theme.palette.secondary.main,
                    fontSize: 24,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  Recent Categories
                </Typography>
              </Box>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate("/categories")}
                sx={{
                  color: theme.palette.secondary.main,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                  cursor: "pointer",
                }}
              >
                View All
              </Link>
            </Box>

            {categoriesLoading ? (
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
                      <TableCell sx={{ fontWeight: 600 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoriesList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          <Typography variant="body2" color="text.secondary">
                            No categories found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      categoriesList.map((category: any) => (
                        <TableRow
                          key={category.id}
                          sx={{
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.secondary.main,
                                0.05
                              ),
                              cursor: "pointer",
                            },
                          }}
                          onClick={() =>
                            navigate(`/categories/show/${category.id}`)
                          }
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              #{category.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 250,
                              }}
                            >
                              {category.title || "-"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
    </Authenticated>
  );
};
