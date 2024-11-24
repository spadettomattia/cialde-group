import React from "react";
import { Box, CssBaseline, Typography } from "@mui/joy";
import CialdeList from "./CialdeList";
import HeaderBar from "./HeaderBar";
import { fetchData } from "./server";

export const DEFAULT_CIALDA_PRIZE = 0.25;
export const DEFAULT_NUMBER_CIALDE = 100;

// MOCK

// function createData(name: string, cialdeNumbers: number, pay: boolean) {
//   return {
//     name,
//     cialdeNumbers,
//     prize: DEFAULT_CIALDA_PRIZE * cialdeNumbers,
//     pay,
//   };
// }

// const DEFAULT_ROWS = [
//   createData("Lorenzo", 18, true),
//   createData("Sabrina", 10, false),
//   createData("Chiara", 18, false),
//   createData("Federico", 18, false),
//   createData("Francesca", 0, false),
//   createData("Ricardo", 18, false),
//   createData("Mattia", 18, false),
// ];

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState<any[]>([]);

  const getResponseData = React.useCallback(async () => {
    setLoading(true);

    fetchData()
      .then((res) => {
        if (res) {
          setLoading(false);
          setData(res);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [fetchData]);

  const handleChangeCialde = (arrIndex: Number, value: Number) => {
    console.log("entro qui in change cialde");
    const newData = data.map((row: any, index) => {
      if (arrIndex === index) {
        return {
          ...row,
          cialdeNumbers: value,
        };
      }

      return row;
    });

    setData(newData);
  };

  const handleChangePay = (arrIndex: Number) => {
    console.log("entro qui in change pay");

    const newData = data.map((row: any, index) => {
      if (arrIndex === index) {
        return {
          ...row,
          pay: !row.pay,
        };
      }

      return row;
    });

    setData(newData);
  };

  React.useEffect(() => {
    if (data.length === 0 && !loading) {
      console.log("entro qui");
      getResponseData();
    }
  }, []);

  const numberCialde = data
    .map((item: any) => item.cialdeNumbers)
    .reduce((acc: Number, curr: any) => acc + curr, 0);

  return (
    <CssBaseline>
      <Box display="flex" flexDirection="column" height="100%">
        <HeaderBar
          title="Cialde Group"
          data={data}
          getResponseData={getResponseData}
          numberCialde={numberCialde}
        />
        <Box
          paddingLeft={2}
          paddingRight={2}
          marginLeft="auto"
          marginRight="auto"
          alignItems="center"
          justifyContent="center"
          maxWidth={650}
        >
          <Typography level="body-md" color="neutral" marginBottom={2}>
            Inserisci il numero di cialde nella riga corrispondente al tuo nome.
            <br />
            Si può pagare direttamente con il link a PayPal o Satispay
          </Typography>
          <Typography
            level="body-sm"
            color={
              DEFAULT_NUMBER_CIALDE === numberCialde ? "success" : "danger"
            }
            marginBottom={2}
          >
            {`Numero di cialde distribuite: ${numberCialde}/${DEFAULT_NUMBER_CIALDE}`}
          </Typography>
          <CialdeList
            loading={loading}
            error={error}
            data={data}
            numberCialde={numberCialde}
            onChangeCialde={handleChangeCialde}
            onChangePay={handleChangePay}
          />
        </Box>
      </Box>
    </CssBaseline>
  );
}
