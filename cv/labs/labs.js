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

// Los diagramas se dibujan antes de ocultar pestañas: Mermaid no puede medir
// elementos ocultos.
try {
  await mermaid.run({ querySelector: "pre.mermaid" });
} catch (e) {
  console.error(e);
}

/* Pestañas (por ejemplo, versiones de un laboratorio).
   Marcado: <div data-tabs> con role="tablist", botones role="tab" y paneles role="tabpanel".
   Se puede abrir una pestaña desde el enlace: pagina.html#v2 */
function initTabs() {
  document.documentElement.classList.add("js-tabs");
  document.querySelectorAll("[data-tabs]").forEach((box) => {
    const tabs = [...box.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => {
        select(t);
        history.replaceState(null, "", "#" + (t.dataset.hash || t.id));
      });
      t.addEventListener("keydown", (e) => {
        const n = tabs.length;
        const next = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
        if (next !== undefined) { e.preventDefault(); select(tabs[next], true); }
      });
    });
    const fromHash = tabs.find((t) => "#" + t.dataset.hash === location.hash);
    select(fromHash || tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
  });
}
initTabs();
