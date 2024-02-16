import { useMemo } from "react";
import { Vertex } from "../../@types/entities";
import useConfiguration from "../core/ConfigurationProvider/useConfiguration";
import useTextTransform from "./useTextTransform";
import { useRecoilValue } from "recoil";
import { mergedConfigurationSelector } from "../core/StateProvider/configuration";

const useNeighborsOptions = (vertex: Vertex) => {
  const config = useRecoilValue(mergedConfigurationSelector);

  const textTransform = useTextTransform();

  return useMemo(() => {
    return Object.keys(vertex.data.neighborsCountByType)
      .map(vt => {
        const vConfig = config?.getVertexTypeConfig(vt);

        return {
          label: vConfig?.displayLabel || textTransform(vt),
          value: vt,
          isDisabled: vertex.data.__unfetchedNeighborCounts?.[vt] === 0,
          config: vConfig,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [
    config,
    textTransform,
    vertex.data.neighborsCountByType,
    vertex.data.__unfetchedNeighborCounts,
  ]);
};

export default useNeighborsOptions;
