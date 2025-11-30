import Editor from "@monaco-editor/react";
import { FiDownload } from "react-icons/fi";

export default function MonacoEditorBlock({ code, onChange, language }) {
  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col items-start p-4 bg-white shadow-lg rounded-xl border border-slate-200 w-[600px]">

      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-semibold text-slate-700">
          {language.toUpperCase()} Editor
        </h2>
        <button
          title={`Download ${language} File`}
          onClick={() => downloadFile(`Code.${language}`, code)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-all"
        >
          <FiDownload className="w-4 h-4" />
          Download
        </button>
      </div>


      <div className="w-full min-h-[500px] rounded-lg border border-slate-300 overflow-hidden">
        <Editor
          height="500px"
          defaultLanguage={language}
          value={code}
          theme="vs-light"
          onChange={onChange}
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}