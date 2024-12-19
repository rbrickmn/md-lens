import React, { useState } from "react";

const Editor = ({ markdown, setMarkdown }) => {
  const handleMarkdownWrap = (prefix, suffix = "") => {
    const textarea = document.getElementById("markdown-editor");
    const { selectionStart, selectionEnd, value } = textarea;

    const before = value.substring(0, selectionStart);
    const selected = value.substring(selectionStart, selectionEnd);
    const after = value.substring(selectionEnd);

    // Wrap selected text with markdown syntax
    const newMarkdown = `${before}${prefix}${selected}${suffix}${after}`;
    setMarkdown(newMarkdown);

    // Maintain cursor/selection position
    setTimeout(() => {
      textarea.selectionStart = selectionStart + prefix.length;
      textarea.selectionEnd = selectionEnd + prefix.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="h-full flex flex-col bg-base-100 rounded-lg shadow overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg shadow">
        <button
          className="btn btn-sm btn-primary font-bold font-mono"
          onClick={() => handleMarkdownWrap("**", "**")}
        >
          B
        </button>
        <button
          className="btn btn-sm btn-primary italic font-mono font-normal"
          onClick={() => handleMarkdownWrap("*", "*")}
        >
          I
        </button>
        <button
          className="btn btn-sm btn-primary font-mono font-normal"
          onClick={() => handleMarkdownWrap("`", "`")}
        >
          {'< />'}
        </button>
        <button
          className="btn btn-sm btn-primary font-normal"
          onClick={() => handleMarkdownWrap("[", "](url)")}
        >
          Link
        </button>

        {/* Clear Button */}
        <div className="ml-auto">
          <button
            className="btn btn-sm btn-ghost btn-error"
            onClick={() => setMarkdown("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        id="markdown-editor"
        className="flex-grow bg-base-100 p-4 resize-none rounded-b-lg outline-none font-mono"
        placeholder="Type your markdown here..."
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
    </div>
  );
};

export default Editor;
