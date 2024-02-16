import type { RawConfiguration } from "./types";

const fetchConfiguration = async (
  configUrl: string
): Promise<RawConfiguration | undefined> => {
  if (!configUrl) {
    return;
  }

  try {
    const response = await fetch(configUrl);
    const rawData = await response.json();
    return rawData as RawConfiguration;
  } catch (e) {
    console.error(e);
  }
};

export default fetchConfiguration;
