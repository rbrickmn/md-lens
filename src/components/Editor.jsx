import React from "react";

const Editor = ({ markdown, setMarkdown }) => {
  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="h-full flex flex-col bg-base-100 rounded-lg shadow overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg shadow">
        <button className="btn btn-sm btn-primary">Bold</button>
        <button className="btn btn-sm btn-primary">Italic</button>
        <button className="btn btn-sm btn-primary">Code</button>
        <button className="btn btn-sm btn-primary">Link</button>

        {/* Clear Button */}
        <div className="ml-auto">
          <button
            className="btn btn-sm btn-error"
            onClick={() => setMarkdown("")}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        className="flex-grow bg-base-100 p-4 resize-none rounded-b-lg outline-none font-mono"
        value={markdown}
        onChange={handleInputChange}
        placeholder="Type your markdown here..."
      />
    </div>
  );
};

export default Editor;
