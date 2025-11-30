import { useState } from "react";
import Editor from "@monaco-editor/react";
import MonacoEditorBlock from "./MonacoEditorBlock";

function App() {
  const cssVal = `p{
  background-color:green;
  color:white;
  text-align:center
  }`;
  const [activeTab, setActiveTab] = useState("HTML");
  const [html, setHtml] = useState("<p>Hello </p>");
  const [css, setCss] = useState(cssVal);
  const [js, setJs] = useState(`console.log("hello")`);

  const srcDoc = `<html>
  <head>
  <style>${css}</style>
  </head>
  <body>
    ${html}
  </body>
  <script>${js}</script>
  </html>`;

  return (
    <div className="w-screen h-screen bg-gray-50">
      <div className="flex flex-col gap-9 pt-5">
        <div className="flex items-center justify-center text-3xl font-light text-slate-700">
          <h1>HTML CSS and JS Compiler</h1>
        </div>
        <div className="flex flex-row w-screen justify-around">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-4 items-center justify-center">
              {["HTML", "CSS", "JS"].map((tab) => (
                <button
                  key={tab}
                  className={`w-20 px-3 py-2 rounded-full transition-all ${
                    activeTab === tab
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <MonacoEditorBlock
              code={activeTab === "HTML" ? html : activeTab === "CSS" ? css : js}
              language={
                activeTab === "HTML"
                  ? "html"
                  : activeTab === "CSS"
                  ? "css"
                  : "javascript"
              }
              onChange={(value) =>
                activeTab === "HTML"
                  ? setHtml(value)
                  : activeTab === "CSS"
                  ? setCss(value)
                  : setJs(value)
              }
            />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-slate-700">Preview:</p>
            <iframe
              className="w-[660px] min-h-[600px] border border-slate-300 rounded-lg mt-4 shadow-sm"
              srcDoc={srcDoc}
              title="preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;