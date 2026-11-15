/*
  Dibuja los diagramas Mermaid de las páginas de laboratorio.
  Se carga con: <script type="module" src="../../labs/labs.js"></script>

  Cada diagrama se escribe como texto dentro de <pre class="mermaid">…</pre>
  y Mermaid lo convierte en imagen (SVG) al abrir la página.
  La versión está fijada (@11) para que una actualización no cambie el diseño.
*/
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  securityLevel: "strict",
  fontFamily: '"Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif',
  themeVariables: {
    // Mismos colores del CV
    primaryColor: "#e6f4f2",
    primaryBorderColor: "#2a9d8f",
    primaryTextColor: "#1f2933",
    lineColor: "#5f6b7a",
    secondaryColor: "#f5f6f8",
    tertiaryColor: "#ffffff",
    edgeLabelBackground: "#ffffff",
    fontSize: "15px",
  },
  flowchart: { curve: "basis", htmlLabels: true },
});

await mermaid.run({ querySelector: "pre.mermaid" });
