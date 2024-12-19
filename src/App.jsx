import React from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="navbar bg-base-300">
        <a className="btn btn-ghost text-xl">MDlens</a>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Editor */}
        <div className="flex-1 border-r border-gray-300 p-4">
          <Editor />
        </div>

        {/* Preview */}
        <div className="flex-1 p-4">
          <Preview />
        </div>
      </main>

      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p className="italic opacity-75 font-medium">
            &copy; 2024. All rights reserved
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default App;
