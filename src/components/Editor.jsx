import React, { useState, useRef, useEffect } from "react";

const Editor = ({ markdown, setMarkdown }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMarkdownWrap = (prefix, suffix = "") => {
    const textarea = document.getElementById("markdown-editor");
    const { selectionStart, selectionEnd, value } = textarea;

    // Check if there is a selection or just a cursor position
    const hasSelection = selectionStart !== selectionEnd;

    const before = value.substring(0, selectionStart);
    const selected = value.substring(selectionStart, selectionEnd);
    const after = value.substring(selectionEnd);

    let newMarkdown;
    let newSelectionStart, newSelectionEnd;

    if (hasSelection) {
      // Detect if the current style is already applied
      const styledSelectionStart = Math.max(0, selectionStart - prefix.length);
      const styledSelectionEnd = Math.min(
        value.length,
        selectionEnd + suffix.length
      );

      const isAlreadyStyled =
        value.substring(styledSelectionStart, selectionStart) === prefix &&
        value.substring(selectionEnd, styledSelectionEnd) === suffix;

      if (isAlreadyStyled) {
        // Remove the style
        newMarkdown = `${before.substring(
          0,
          styledSelectionStart
        )}${selected}${after.substring(styledSelectionEnd)}`;
        newSelectionStart = styledSelectionStart;
        newSelectionEnd = styledSelectionStart + selected.length;
      } else {
        // Add the style
        newMarkdown = `${before}${prefix}${selected}${suffix}${after}`;
        newSelectionStart = selectionStart + prefix.length;
        newSelectionEnd = selectionEnd + prefix.length;
      }
    } else {
      // No selection: auto-detect the word around the cursor
      const leftBoundary = value.lastIndexOf(" ", selectionStart - 1) + 1;
      const rightBoundary =
        value.indexOf(" ", selectionEnd) === -1
          ? value.length
          : value.indexOf(" ", selectionEnd);

      const word = value.substring(leftBoundary, rightBoundary);
      const isAlreadyStyled =
        value.substring(leftBoundary - prefix.length, leftBoundary) ===
          prefix &&
        value.substring(rightBoundary, rightBoundary + suffix.length) ===
          suffix;

      if (isAlreadyStyled) {
        // Remove style from the word
        newMarkdown = `${value.substring(
          0,
          leftBoundary - prefix.length
        )}${word}${value.substring(rightBoundary + suffix.length)}`;
        newSelectionStart = leftBoundary - prefix.length;
        newSelectionEnd = leftBoundary - prefix.length + word.length;
      } else {
        // Add style to the word
        newMarkdown = `${value.substring(
          0,
          leftBoundary
        )}${prefix}${word}${suffix}${value.substring(rightBoundary)}`;
        newSelectionStart = leftBoundary + prefix.length;
        newSelectionEnd = newSelectionStart + word.length;
      }
    }

    setMarkdown(newMarkdown);

    // Restore cursor/selection focus
    setTimeout(() => {
      textarea.selectionStart = newSelectionStart;
      textarea.selectionEnd = newSelectionEnd;
      textarea.focus();
    }, 0);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="h-full flex flex-col bg-base-100 rounded-lg shadow overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg shadow">
        <button
          className="btn btn-sm btn-primary font-bold font-mono"
          onClick={() => handleMarkdownWrap("**", "**")}
          title="Bold text"
        >
          B
        </button>
        <button
          className="btn btn-sm btn-primary italic font-mono font-normal"
          onClick={() => handleMarkdownWrap("*", "*")}
          title="Italicize text"
        >
          I
        </button>
        <button
          className="btn btn-sm btn-primary font-mono font-normal"
          onClick={() => handleMarkdownWrap("```", "```")}
          title="Insert code block"
        >
          {"< />"}
        </button>
        <button
          className="btn btn-sm btn-primary font-normal"
          onClick={() => handleMarkdownWrap("[", "](url)")}
          title="Insert link"
        >
          Link
        </button>

        {/* Dropdown */}
        <div className="relative">
          <button
            className="btn btn-sm btn-ghost btn-secondary p-0"
            onClick={toggleDropdown}
            title="More options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-current text-gray-800 dark:text-gray-400"
            >
              <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute flex flex-col z-10 bg-base-200 p-2 mt-2 rounded-lg shadow-lg"
            >
              <button
                className="btn btn-sm mb-1"
                onClick={() => handleMarkdownWrap("# ", "")}
                title="H1"
              >
                H1
              </button>
              <button
                className="btn btn-sm mb-1"
                onClick={() => handleMarkdownWrap("## ", "")}
                title="H2"
              >
                H2
              </button>
              <button
                className="btn btn-sm mb-1"
                onClick={() => handleMarkdownWrap("### ", "")}
                title="H3"
              >
                H3
              </button>
              <button
                className="btn btn-sm mb-1"
                onClick={() => handleMarkdownWrap("- ", "")}
                title="Bulleted List"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-current text-gray-800 dark:text-gray-400"
                >
                  <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
                </svg>
              </button>
              <button
                className="btn btn-sm mb-1"
                onClick={() => handleMarkdownWrap("~~", "~~")}
                title="Strikethrough"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  className="fill-current text-gray-800 dark:text-gray-400"
                >
                  <path d="M486-160q-76 0-135-45t-85-123l88-38q14 48 48.5 79t85.5 31q42 0 76-20t34-64q0-18-7-33t-19-27h112q5 14 7.5 28.5T694-340q0 86-61.5 133T486-160ZM80-480v-80h800v80H80Zm402-326q66 0 115.5 32.5T674-674l-88 39q-9-29-33.5-52T484-710q-41 0-68 18.5T386-640h-96q2-69 54.5-117.5T482-806Z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Clear Button */}
        <div className="ml-auto">
          <button
            className="btn btn-sm btn-ghost btn-error"
            onClick={() => setMarkdown("")}
            title="Clear text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-current text-gray-800 dark:text-gray-400"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
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
