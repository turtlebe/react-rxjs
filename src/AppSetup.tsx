import { ReactNode, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ErrorPage } from "screens/ErrorPage";
import { LoadingBackdrop } from "components/Backdrop/LoadingBackdrop";
import { truckOsTheme } from "./theme/truck-os.theme";
import { getEnvironmentConfig } from "./EnvironmentConfig";

export interface AppSetupProps {
  children?: ReactNode;
}

export const AppSetup = ({ children }: AppSetupProps) => {
  const [initialized, setInitialized] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        window.config = await getEnvironmentConfig();
        setInitialized(true);
      } catch (e) {
        setErrored(true);
      }
    };

    initialize();
  }, []);

  return (
    <ThemeProvider theme={truckOsTheme}>
      <CssBaseline />
      {initialized ? (
        children
      ) : errored ? (
        <ErrorPage description="Initialization error" />
      ) : null}
      <LoadingBackdrop loading={!initialized && !errored} />
    </ThemeProvider>
  );
};
