"use client";
import { CodeEditor } from "@cloudscape-design/components";
import { useEffect, useState } from "react";

export default function CodeEditorDisplay() {
  const [value, setValue] = useState("");
  const [preferences, setPreferences] = useState({});
  const [loading, setLoading] = useState(true);
  const [ace, setAce] = useState(undefined);
  const [codeEditorLoading, setCodeEditorLoading] = useState(true);

  useEffect(() => {
    setCodeEditorLoading(true);
    import("ace-builds").then((ace) => {
      ace.config.set("basePath", "./libs/ace/");
      setAce(ace as any);
      setCodeEditorLoading(false);
    });
  }, []);

  return (
    <CodeEditor
      ace={ace}
      value={value}
      language="javascript"
      onDelayedChange={(event) => setValue(event.detail.value)}
      preferences={preferences}
      onPreferencesChange={(event) => setPreferences(event.detail)}
      loading={false}
      // should match the imports on top of this file
      themes={{ light: ["dawn"], dark: ["tomorrow_night_bright"] }}
    />
  );
}
