import { useState } from "react";
import MonacoEditorBlock from "./MonacoEditorBlock";

function App() {
  const cssVal = `p{
  background-color:green;
  color:white;
  text-align:center;
}`;

  const [activeTab, setActiveTab] = useState("HTML");
  const [html, setHtml] = useState("<p>Hello </p>");
  const [css, setCss] = useState(cssVal);
  const [js, setJs] = useState(`console.log("hello")`);

  const srcDoc = `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>${html}</body>
    <script>${js}</script>
  </html>
  `;

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6">

      <div className="flex justify-center text-2xl sm:text-3xl font-light text-slate-700 mb-6">
        <h1>HTML CSS and JS Compiler</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 w-full items-start justify-center">

        <div className="flex flex-col gap-4 w-full lg:w-auto">

          <div className="flex flex-row gap-3 items-center justify-center">
            {["HTML", "CSS", "JS"].map((tab) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-full text-sm sm:text-base transition-all ${
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

        <div className="flex flex-col items-center w-full lg:w-auto mt-5">
          <p className="text-lg font-medium text-slate-700">Preview:</p>

          <iframe
            className="w-full lg:w-[450px] min-h-[450px] mt-3 border border-slate-300 rounded-lg mt-3 shadow-sm bg-white"
            srcDoc={srcDoc}
            title="preview"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
