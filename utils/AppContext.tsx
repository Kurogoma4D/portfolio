import { createContext } from "react";

type AppContextProps = {
  appBarColor?: string;
  appBarMode?: string;
  setAppBarColor: (color: string) => void;
};

const AppContext = createContext<AppContextProps>({ setAppBarColor: () => {} });

export default AppContext;
