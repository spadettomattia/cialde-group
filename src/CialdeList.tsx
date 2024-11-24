import React from "react";
import Table from "@mui/joy/Table";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  IconButton,
  LinearProgress,
  Link,
  Tooltip,
} from "@mui/joy";
import { DEFAULT_CIALDA_PRIZE, DEFAULT_NUMBER_CIALDE } from "./App";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import PayPalIcon from "./PayPalIcon";
import SatispayIcon from "./SatispayIcon";

type CialdeListTypes = {
  loading: Boolean;
  error: String | null;
  data: any;
  numberCialde: Number;
  onChangeCialde: (index: Number, value: any) => void;
  onChangePay: (index: Number) => void;
};

export default function CialdeList({
  loading,
  error,
  data,
  numberCialde,
  onChangeCialde,
  onChangePay,
}: CialdeListTypes) {
  const cialdeController = (currIndex: Number) => {
    return data
      .splice(currIndex, 1)
      .map((item: any) => item.cialdeNumbers)
      .reduce((acc: Number, curr: any) => acc + curr, 0);
  };

  console.log(data);

  if (loading) {
    return <LinearProgress />;
  } else if (error) {
    return (
      <Alert color="danger" size="lg">
        Errore durante il caricamento dei dati. Ricarica la pagina
      </Alert>
    );
  } else if (data) {
    return (
      <Table
        variant="outlined"
        sx={{
          borderRadius: 4,
          "& tr > *:not(:first-child)": { textAlign: "center" },
        }}
      >
        <thead>
          <tr>
            <th style={{ flexGrow: 1 }}>Name</th>
            <th>N° cialde</th>
            <th>Prezzo (€)</th>
            <th>Hai pagato?</th>
            <th>Link per pagare</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: Number) => (
            <tr key={row.id || index}>
              <td>{row.name}</td>
              <td>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <IconButton
                    size="sm"
                    onClick={() => onChangeCialde(index, row.cialdeNumbers - 1)}
                    disabled={row.cialdeNumbers === 0}
                  >
                    <RemoveCircle />
                  </IconButton>
                  {row.cialdeNumbers}
                  <IconButton
                    size="sm"
                    onClick={() => onChangeCialde(index, row.cialdeNumbers + 1)}
                    disabled={
                      row.cialdeNumbers >
                        DEFAULT_NUMBER_CIALDE - cialdeController(index) ||
                      DEFAULT_NUMBER_CIALDE === numberCialde
                    }
                  >
                    <AddCircle />
                  </IconButton>
                </Box>
              </td>
              <td>{(DEFAULT_CIALDA_PRIZE * row.cialdeNumbers).toFixed(2)} €</td>
              <td>
                <Checkbox
                  variant="solid"
                  checked={row.pay}
                  onChange={() => onChangePay(index)}
                />
              </td>
              <td>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Tooltip title="PayPal">
                    <IconButton size="lg">
                      <a
                        target="_blank"
                        href={`https://paypal.me/venturinilorenzo/${row.prize.toFixed(
                          2
                        )}`}
                      >
                        <PayPalIcon />
                      </a>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Satispay">
                    <IconButton size="lg">
                      <a target="_blank" href="https://www.satispay.com">
                        <SatispayIcon />
                      </a>
                    </IconButton>
                  </Tooltip>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } else {
    return null;
  }
}
