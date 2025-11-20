import { Box, Container, Typography } from "@mui/material";
import  ArcDesign  from "../../components/gauge/index";
import BasicSparkLine from "../../components/sparkline/index";


export const Dashboard = () => {

    return (

   <Box sx={{
    display:"flex",
    flexDirection:"column",
    gap:10,
    backgroundColor:"#f5f5f5",
    paddingTop:2
   }}
   >

    <Container sx={{
      display:"flex",
      flexDirection:"row",
      flexWrap: { xs: "wrap", sm: "nowrap" },
      justifyContent:"space-between",
      gap:{ xs: 2, sm: 4 }
    }}>

    <Box sx={{
      backgroundColor:"white",
      borderRadius:5,
      padding:2
    }}>
      <BasicSparkLine tittle="Number of companies"/>
    </Box>

    <Box sx={{
      backgroundColor:"white",
      borderRadius:5,
      padding:2
    }}>
      <BasicSparkLine tittle="Number of contacts"/>
    </Box>

    <Box sx={{
      backgroundColor:"white",
      borderRadius:5,
      padding:2
    }}>
      <BasicSparkLine tittle="Total deals in pipeline"/>
    </Box>
 
    </Container>

    <Container>
      <Typography>
        Total revenue (yearly)
      </Typography>
      <ArcDesign/>
    </Container>
    
   </Box>
  );
}
