import { useCallback, useRef } from "react";
import { useNotification } from "../components/NotificationProvider";
import type { SchemaResponse } from "../connector/useGEFetchTypes";
import useConfiguration from "../core/ConfigurationProvider/useConfiguration";
import useConnector from "../core/ConnectorProvider/useConnector";
import usePrefixesUpdater from "./usePrefixesUpdater";
import useUpdateSchema from "./useUpdateSchema";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { mergedConfigurationSelector } from "../core/StateProvider/configuration";

const useSchemaSync = (onSyncChange?: (isSyncing: boolean) => void) => {
  const config = useRecoilValue(mergedConfigurationSelector);
  const connector = useConnector();
  const updatePrefixes = usePrefixesUpdater();

  const notificationId = useRef<string | null>(null);
  const updateSchemaState = useUpdateSchema();
  return useCallback(
    async () => {
      if (!config || !connector.explorer) {
        return;
      }

      onSyncChange?.(true);
      let schema: SchemaResponse | null = null;
      try {
        toast("Updating the Database schema");

        schema = await connector.explorer.fetchSchema();
      } catch (e) {
        if (e.name === "AbortError") {
          toast.error(`Fetch aborted, reached max time out ${config.connection?.fetchTimeoutMs} MS`)
          connector.logger?.error(
            `[${config.displayLabel || config.id
            }] Fetch aborted, reached max time out ${config.connection?.fetchTimeoutMs} MS `
          );
        }
        toast.error(`Error while fetching schema: ${e.message}`)
        connector.logger?.error(
          `[${config.displayLabel || config.id
          }] Error while fetching schema: ${e.message}`
        );
        updateSchemaState(config.id);
        onSyncChange?.(false);
        return;
      }

      if (!schema) return;
      if (!schema?.vertices.length) {
        toast("This connection has no data available")
        connector.logger?.info(
          `[${config.displayLabel || config.id
          }] This connection has no data available: ${JSON.stringify(
            config.connection
          )}`
        );
      }

      updateSchemaState(config.id, schema);
      onSyncChange?.(false);

      toast.success("Connection successfully synchronized")
      connector.logger?.info(
        `[${config.displayLabel || config.id
        }] Connection successfully synchronized: ${JSON.stringify(
          config.connection
        )}`
      );

      const ids = schema.vertices.flatMap(v => [
        v.type,
        ...v.attributes.map(attr => attr.name),
      ]);
      ids.push(...schema.edges.map(e => e.type));
      updatePrefixes(ids);
    },
    [config, connector.explorer, connector.logger, onSyncChange, updatePrefixes, updateSchemaState]
  );
};

export default useSchemaSync;
