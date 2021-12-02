import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h5">
              Viktorlab DPS Calculator
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Toolbar sx={{ mb: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            left pane
          </Grid>
          <Grid item xs={4}>
            right pane
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
