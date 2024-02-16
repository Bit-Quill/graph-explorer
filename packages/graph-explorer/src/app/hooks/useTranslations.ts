import { flatten } from "flat";
import { useCallback } from "react";
import { useConfiguration } from "../core";

import gremlinTs from "./translations/gremlin-translations.json";
import sparqlTs from "./translations/sparql-translations.json";
import openCypherTs from "./translations/openCypher-translations.json";
import { useRecoilValue } from "recoil";
import { mergedConfigurationSelector } from "../core/StateProvider/configuration";

const ts: Record<string, Record<string, string>> = {
  gremlin: flatten(gremlinTs),
  sparql: flatten(sparqlTs),
  openCypher: flatten(openCypherTs),
};

const useTranslations = () => {
  const config = useRecoilValue(mergedConfigurationSelector);

  const engine = config?.connection?.queryEngine || "gremlin";

  return useCallback(
    (key: string, ns?: string) => {
      return ts[ns || engine]?.[key] || key;
    },
    [engine]
  );
};

export default useTranslations;
