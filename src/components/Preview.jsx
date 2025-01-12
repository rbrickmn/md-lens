import React, { useState } from "react";
import { marked } from "marked";

const Preview = ({ markdown }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    });
  };

  const renderedMarkdown = marked(markdown);

  return (
    <div className="h-full bg-base-100 rounded-lg shadow overflow-auto border border-base-300 border-t-0">
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg">
        <p className="text-gray-500 p-1">Rendered markdown</p>

        <div className="ml-auto">
          <button
            className="btn btn-sm btn-ghost btn-error"
            title="Copy to clipboard"
            onClick={handleCopyToClipboard}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-current text-gray-800 dark:text-gray-400"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
          </button>
        </div>
      </div>

      {showAlert && (
        <div
          role="alert"
          className="alert alert-success absolute bottom-4 right-4 w-80 flex items-center transition-transform duration-300 ease-out transform translate-y-0 opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="ml-2">Markdown copied to clipboard!</span>
        </div>
      )}

      <div
        className="prose prose-sm lg:prose-lg p-4 "
        dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
      />
    </div>
  );
};

export default Preview;
