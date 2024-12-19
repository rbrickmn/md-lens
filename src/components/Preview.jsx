import React from "react";

const Preview = () => {
  return (
    <div className="h-full bg-base-100 rounded-lg shadow overflow-auto">
      <div className="flex items-center bg-base-200 p-2 gap-2 rounded-t-lg">
        <p className="text-gray-500 p-1">
          Rendered markdown
        </p>
        {/* Add more buttons as needed */}
      </div>

      <div>{/* Rendered Markdown content will go here */}</div>
    </div>
  );
};

export default Preview;
