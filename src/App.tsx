import { useMemo, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import operators from "./data/operators.json";

interface Operator {
  id: string;
  name: string;
  rarity: number;
  skills: Array<{
    skillName: string;
  }>;
}

function App() {
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);
  const operatorOptions = useMemo<Operator[]>(
    () => Object.values(operators).sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    value: Operator | null
  ) => {
    setCurrentOperator(value);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h4">
              Viktorlab DPS Calculator
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Toolbar />
        <Grid container spacing={2} mt={2}>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ px: 2, py: 3 }}>
              <Typography component="h2" variant="h5">
                Select an operator
              </Typography>
              <Autocomplete
                options={operatorOptions}
                renderInput={(props) => <TextField {...props} />}
                getOptionLabel={(option) => option.name}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />

              <Divider sx={{ mt: 3 }} />
              {currentOperator && (
                <>
                  <Typography component="h3" variant="h6" mt={2}>
                    Operator stats
                  </Typography>
                  <Grid container spacing={2} mt={0}>
                    <Grid item container spacing={2}>
                      <Grid item xs={3}>
                        <TextField
                          select
                          label="Elite level"
                          fullWidth
                          disabled={currentOperator.rarity <= 2}
                        >
                          <MenuItem value={0}>Elite 0</MenuItem>
                          <MenuItem value={1}>Elite 1</MenuItem>
                          {currentOperator.rarity > 3 && (
                            <MenuItem value={2}>Elite 2</MenuItem>
                          )}
                        </TextField>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Level" fullWidth />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Potential" select fullWidth>
                          {[...Array(6).keys()].map((i) => (
                            <MenuItem key={i} value={i}>
                              Potential {i + 1}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Trust" fullWidth />
                      </Grid>
                    </Grid>
                    <Grid item container spacing={2}>
                      <Grid item xs={8}>
                        <TextField select label="Skill" fullWidth>
                          {currentOperator.skills.map(({ skillName }, i) => (
                            <MenuItem key={i} value={i}>
                              {skillName}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField select label="Skill Level" fullWidth>
                          {[
                            ...Array(7).keys(),
                            ...(currentOperator.rarity > 3
                              ? ["Mastery 1", "Mastery 2", "Mastery 3"]
                              : []),
                          ].map((i) => (
                            <MenuItem key={i} value={i}>
                              {typeof i === "number" ? i + 1 : i}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={3} sx={{ px: 2, py: 3 }}>
              <Typography component="h2" variant="h5">
                Damage stats
              </Typography>
              <Stack spacing={1} component="dl" mt={2} mb={0}>
                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Average DPS</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Skill DPS</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Basic attack DPS</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Skill cycle</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Skill attack power</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Skill total damage</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Skill attack interval</dt>
                  <dd></dd>
                </Box>

                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                  <dt>Basic attack interval</dt>
                  <dd></dd>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
