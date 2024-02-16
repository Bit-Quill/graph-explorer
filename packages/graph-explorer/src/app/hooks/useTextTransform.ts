import { useCallback } from "react";
import { useConfiguration } from "../core";
import { sanitizeText } from "../utils";
import replacePrefixes from "../utils/replacePrefixes";
import { useRecoilValue } from "recoil";
import { mergedConfigurationSelector } from "../core/StateProvider/configuration";

const useTextTransform = () => {
  const config = useRecoilValue(mergedConfigurationSelector);


  return useCallback(
    (text?: string): string => {
      if (!text) {
        return "";
      }

      if (config?.connection?.queryEngine === "sparql") {
        return replacePrefixes(text, config?.schema?.prefixes);
      }

      return sanitizeText(text);
    },
    [config]
  );
};

export default useTextTransform;
