import { Box, Container, Typography, useTheme } from "@mui/material";
import ArcDesign from "../../components/gauge/index";
import BasicSparkLine from "../../components/sparkline/index";
import Linechart from "../../components/linechart/index";


export const Dashboard = () => {
  const theme = useTheme();

  return (

    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: 5,
      backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.default : "#f5f5f5",
      paddingTop: 2,
      paddingBottom: 5,
      height: "100vh",
      overflowY: "auto",
    }}
    >

      <Container sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        justifyContent: "space-between",
        gap: { xs: 2, sm: 4 }
      }}>

        <Box sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          padding: 2
        }}>
          <BasicSparkLine tittle="Number of companies" />
        </Box>

        <Box sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          padding: 2
        }}>
          <BasicSparkLine tittle="Number of contacts" />
        </Box>

        <Box sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          padding: 2
        }}>
          <BasicSparkLine tittle="Total deals in pipeline" />
        </Box>

      </Container>

      <Container sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: { xs: "wrap", sm: "nowrap" },
        justifyContent: "space-between",
        gap: { xs: 2, sm: 4 }
      }}>

        <Container sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          width: { xs: "100%", sm: "40%" },
          textAlign: "center",
          padding: 2,
        }}
        >

          <Typography>
            Total revenue (yearly)
          </Typography>


          <ArcDesign />
        </Container>



        <Container sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 5,
          padding: 2
        }}>
          <Typography>
            Deals
          </Typography>
          <Linechart></Linechart>
        </Container>

      </Container>



    </Box>
  );
}
