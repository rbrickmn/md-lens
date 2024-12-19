import React from "react";
import { marked } from "marked";

const Preview = ({ markdown }) => {
  const renderedMarkdown = marked(markdown);

  return (
    <div className="h-full bg-base-100 rounded-lg shadow overflow-auto">
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg">
        <p className="text-gray-500 p-1">Rendered markdown</p>
      </div>

      {/* Rendered Markdown */}
      <div
        className="prose prose-sm lg:prose-lg p-4"
        dangerouslySetInnerHTML={{ __html: renderedMarkdown }}
      />
    </div>
  );
};

export default Preview;
