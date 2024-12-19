import React from "react";

const Editor = () => {
  return (
    <div className="h-full flex flex-col bg-base-100 rounded-lg shadow overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg shadow">
        <button className="btn btn-sm btn-primary">Bold</button>
        <button className="btn btn-sm btn-primary">H1</button>
        <button className="btn btn-sm btn-primary">H2</button>
        {/* Add more buttons as needed */}
      </div>

      {/* Textarea */}
      <textarea
        className="flex-grow bg-base-100 p-4 resize-none rounded-b-lg outline-none"
        placeholder="Type your markdown here..."
      />
    </div>
  );
};

export default Editor;
