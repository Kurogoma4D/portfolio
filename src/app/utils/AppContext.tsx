import { createContext } from "react";

type AppContextProps = {
  state: {
    appBarMode?: string;
    setAppBarMode: (mode: string) => void;
  };
};

const AppContext = createContext<AppContextProps>({
  state: { appBarMode: "dark", setAppBarMode: () => {} }
});

export default AppContext;
