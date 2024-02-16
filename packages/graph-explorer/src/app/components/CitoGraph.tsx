import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";

const CytoscapeGraph = () => {
  const cytoscapeRef = useRef(null);
  useEffect(() => {
    const cy = cytoscape({
      container: cytoscapeRef.current,
      elements: [
        { data: { id: "node1", label: "Node 1" } },
        { data: { id: "node2", label: "Node 2" } },
        { data: { source: "node1", target: "node2" } },
      ],
      style: [
        {
          selector: "node",
          style: { "background-color": "#088F8F", label: "data(label)" },
        },
        { selector: "edge", style: { width: 3, "line-color": "#ccc" } },
      ],
    });
  }, []);
  return <div ref={cytoscapeRef} style={{ width: "90%", height: "100%" }} />;
};
export default CytoscapeGraph;
