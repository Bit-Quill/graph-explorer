import { useContext } from "react";
import { ConnectorContext } from "./ConnectorProvider";

const useConnector = () => {
  const context = useContext(ConnectorContext);
  return context;
};

export default useConnector;
