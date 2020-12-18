import { Fragment, useState, useEffect } from "react";
import Editor from "./components/Editor/index";
import useLocalStorage from "./components/Hooks/localStorage";
import "./App.css";

export default function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [python, setPython] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      ${python}
  <html>
  <body>${html}</body>
  <style>${css}</style>
  <script>${js}</script>
  </html>
  `);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [html, css, js, python]);

  return (
    <Fragment>
      <h4
        style={{
          color: "#222629",
          textAlign: "center",
        }}
      >
        Use <code style={{
          background: "gray",
          color:"white",
          padding: "2px"
        }}>ctrl + space</code> for auto-complete suggestions
      </h4>{" "}
      <br />
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
        <Editor
          language="python"
          displayName="Python"
          value={python}
          onChange={setPython}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </Fragment>
  );
}
