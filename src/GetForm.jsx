import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { FormControl } from "@mui/material";
import { TextField, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const defaultTheme = createTheme();
const GetForm = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [kilometer, setKilometer] = useState("");
  const [kilometerByLiter, setKilometerByLiter] = useState("");
  const [costFuel, setCostfuel] = useState("");
  const [costToll, setCostToll] = useState("");
  const [typeOftrip, setTypeOftrip] = useState(true);
  const [open, setOpen] = React.useState(false);


  const [fuelTrip, setFuelTrip] = useState(0);
  const [totalToll, setTotalToll] = useState(0);
  const [margin, setMargin] = useState(0);
  const [fuelTotal, setFuelTotal] = useState(0);
  const [fuelTotalCost, setFuelTotalCost] = useState(0);
  const [total, setTotal] = useState(0);


  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newFuelTrip = typeOftrip
      ? kilometer / kilometerByLiter
      : (kilometer * 2) / kilometerByLiter;
  
    const newTotalToll = typeOftrip ? parseFloat(costToll) : parseFloat(costToll) * 2;
  
    const newMargin = newFuelTrip * 0.1;
    const newFuelTotal = newMargin + newFuelTrip;
    const newFuelTotalCost = newFuelTotal * parseFloat(costFuel);
    const newTotal = newFuelTotalCost + newTotalToll;
  
    setFuelTrip(newFuelTrip);
    setTotalToll(newTotalToll);
    setMargin(newMargin);
    setFuelTotal(newFuelTotal);
    setFuelTotalCost(newFuelTotalCost);
    setTotal(newTotal);
  
    handleOpen();
  };
  
  
  
  



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Calculadora gasto bencina
          </Typography>

          <FormControl component="form" onSubmit={handleSubmit} sx={ {width:"400px"}}>
            <TextField
              type="number"
              margin="normal"
              required
              fullWidth
              id="kilometer"
              label="Ingrese kilometros de ruta"
              name="kilometer"
              value={kilometer}
              onChange={(e) => setKilometer(e.target.value)}
              autoFocus
            />
            <TextField
              type="number"
              margin="normal"
              required
              fullWidth
              id="kilometerByLiter"
              label="Ingrese kilometros por litro de su auto"
              name="kilometerByLiter"
              value={kilometerByLiter}
              onChange={(e) => setKilometerByLiter(e.target.value)}
            />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={true}
              name="radio-buttons-group"
              value={typeOftrip}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Ida o vueta"
                onClick={(e) => setTypeOftrip(true)}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Ida mas vuelta"
                onClick={(e) => setTypeOftrip(false)}
              />
            </RadioGroup>
            <TextField
              type="number"
              margin="normal"
              required
              fullWidth
              id="costFuel"
              label="Ingrese costo bencina por litro"
              name="costFuel"
              value={costFuel}
              onChange={(e) => setCostfuel(e.target.value)}
            />
            <TextField
              type="number"
              margin="normal"
              required
              fullWidth
              id="costToll"
              label="Ingrese costo de peaje por ida"
              name="costToll"
              value={costToll}
              onChange={(e) => setCostToll(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Calcular
            </Button>
          </FormControl>
        </Box>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Resultado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Costo por {typeOftrip? "ida.":" ida y vuelta."}
          </DialogContentText>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="simple table">

        <TableBody>
          
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Bencina viaje</TableCell>
              <TableCell align="right">{fuelTrip.toFixed(2)} lts</TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Costo peaje</TableCell>
              <TableCell align="right">${totalToll}</TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Margen del 10% de litros</TableCell>
              <TableCell align="right">{margin.toFixed(2)} lts</TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Total de bencina en litros</TableCell>
              <TableCell align="right">${fuelTotal.toFixed(2)}</TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Costo total de bencina</TableCell>
              <TableCell align="right">${fuelTotalCost.toFixed(2)}</TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">Total</TableCell>
              <TableCell align="right">${total}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          
        </DialogActions>
      </Dialog>



    </ThemeProvider>
  );
};

export default GetForm;
