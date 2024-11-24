import React from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/joy";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { updateData } from "./server";
import { DEFAULT_NUMBER_CIALDE } from "./App";
import { Error } from "@mui/icons-material";

type HeaderBarTypes = {
  title: String;
  data: any[];
  getResponseData: () => void;
  numberCialde: Number;
};

export default function HeaderBar({
  title,
  data,
  getResponseData,
  numberCialde,
}: HeaderBarTypes) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSaveData = React.useCallback(
    async (mode: String) => {
      if (data.length > 0) {
        setLoading(true);
        const newData =
          mode === "save"
            ? data
            : data.map((item) => ({ ...item, pay: false }));

        updateData(newData)
          .then((res) => {
            if (res === "success") {
              setLoading(false);
              getResponseData();
            }
          })
          .catch((err) => {
            setError(err);
          });
      }
    },
    [data]
  );

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        padding: "8px 16px",
        width: "100%",
        height: 56,
      }}
    >
      <CoffeeIcon fontSize="large" />
      <Typography level="h4" color="neutral" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      {loading && <CircularProgress size="sm" variant="plain" />}
      {error && <Error color="error" />}
      <Button
        disabled={loading}
        color="danger"
        onClick={() => handleSaveData("reset")}
      >
        Reset
      </Button>
      <Button
        disabled={numberCialde !== DEFAULT_NUMBER_CIALDE || loading}
        onClick={() => handleSaveData("save")}
      >
        Salva
      </Button>
    </Box>
  );
}
