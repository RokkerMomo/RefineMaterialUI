import { Box, Container, useTheme, alpha, Typography, Chip } from "@mui/material";
import ArcDesign from "../../components/gauge/index";
import Linechart from "../../components/linechart/index";
import { Authenticated, useList } from "@refinedev/core";
import { Article, Category } from "@mui/icons-material";
import { DateField } from "@refinedev/mui";
import { useNavigate } from "react-router";
import {
  DashboardHeader,
  StatCard,
  ChartCard,
  DataTable,
} from "../../components/dashboard";

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
        <DashboardHeader />

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
          <StatCard title="Number of companies" />
          <StatCard title="Number of contacts" />
          <StatCard title="Total deals in pipeline" />
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
          <ChartCard title="Total revenue (yearly)" width={{ xs: "100%", sm: "35%" }}>
            <ArcDesign />
          </ChartCard>

          <ChartCard
            title="Deals"
            width={{ xs: "100%", sm: "55%" }}
            sx={{ flex: 1, minWidth: { xs: "100%", sm: "55%" } }}
          >
            <Linechart />
          </ChartCard>
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
          <DataTable
            title="Recent Blog Posts"
            icon={<Article />}
            iconColor={theme.palette.primary.main}
            columns={[
              {
                key: "title",
                label: "Title",
                render: (value) => (
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 200,
                    }}
                  >
                    {value || "-"}
                  </Typography>
                ),
              },
              {
                key: "status",
                label: "Status",
                render: (value) => {
                  const status = value || "Draft";
                  const getStatusColor = (status: string) => {
                    const statusLower = status.toLowerCase();
                    if (statusLower === "published") {
                      return {
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                        color: theme.palette.success.main,
                      };
                    } else if (statusLower === "draft") {
                      return {
                        backgroundColor: alpha(theme.palette.grey[500], 0.1),
                        color: theme.palette.grey[700],
                      };
                    } else if (statusLower === "rejected" || statusLower === "archived") {
                      return {
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                        color: theme.palette.error.main,
                      };
                    } else if (statusLower === "pending" || statusLower === "review") {
                      return {
                        backgroundColor: alpha(theme.palette.warning.main, 0.1),
                        color: theme.palette.warning.main,
                      };
                    } else {
                      return {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      };
                    }
                  };

                  return (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Chip
                        label={status}
                        size="small"
                        sx={{
                          ...getStatusColor(status),
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  );
                },
              },
              {
                key: "createdAt",
                label: "Created",
                render: (value) => (
                  <DateField value={value} format="LLL dd, y" />
                ),
              },
            ]}
            data={blogPosts}
            loading={blogPostsLoading}
            emptyMessage="No blog posts found"
            viewAllLink="/blog-posts"
            onRowClick={(row) => navigate(`/blog-posts/show/${row.id}`)}
            getRowHoverColor={() => theme.palette.primary.main}
          />

          {/* Recent Categories Table */}
          <DataTable
            title="Recent Categories"
            icon={<Category />}
            iconColor={theme.palette.secondary.main}
            columns={[
              {
                key: "id",
                label: "ID",
                render: (value) => (
                  <Typography variant="body2" fontWeight={500}>
                    #{value}
                  </Typography>
                ),
              },
              {
                key: "title",
                label: "Title",
                render: (value) => (
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 250,
                    }}
                  >
                    {value || "-"}
                  </Typography>
                ),
              },
            ]}
            data={categoriesList}
            loading={categoriesLoading}
            emptyMessage="No categories found"
            viewAllLink="/categories"
            onRowClick={(row) => navigate(`/categories/show/${row.id}`)}
            getRowHoverColor={() => theme.palette.secondary.main}
          />
        </Container>
      </Box>
    </Authenticated>
  );
};
