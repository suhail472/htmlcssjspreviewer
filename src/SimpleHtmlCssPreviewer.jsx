import { useState } from "react";
import Editor from "@monaco-editor/react";

function app() {
  const cssVal=`p{
  background-Color:green;
  color:white;
  text-align:center
  }`;
  const [activeTab, setActiveTab] = useState(`html`);
  const [html, setHtml] = useState(`<p>Hello </p>`);
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
    <>
      <div className="w-screen h-screen">
        <div className="flex flex-col gap-9 pt-5">
          <div className="flex items-center justify-center text-3xl font-thin">
            <div className="">
              <h1 className="">HTML CSS and JS Compiler</h1>
            </div>
          </div>

          <div className="flex flex-row w-screen justify-around">
            <div className="flex flex-col gap-3 ">
              <div className="flex flex-row gap-4 items-center justify-center">
                {["html", "css", "js"].map((tab) => (
                  <button
                    key={tab}
                    className={`w-16 ${
                      activeTab === tab ? "bg-slate-500" : "bg-slate-800"
                    } text-white p-2 rounded-full`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <textarea
                value={
                  activeTab === "html" ? html : activeTab === "css" ? css : js
                }
                className="w-[458px] min-h-[500px] border-2 border-slate-600 pl-4 pt-4 resize rounded-md"
                onChange={(e) => {
                  activeTab === "html"
                    ? setHtml(e.target.value)
                    : activeTab === "css"
                    ? setCss(e.target.value)
                    : setJs(e.target.value);
                }}
              />
            </div>

            <div className="">
              <p className="text-lg">Preview:</p>
              <iframe
                className="w-[460px] min-h-[500px] border-2 border-slate-600 rounded-md mt-6"
                srcDoc={srcDoc}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default app;
