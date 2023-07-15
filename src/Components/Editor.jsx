import React, { useState } from "react";

export default function Editor({ text, selectText, handleInput }) {
  return (
    <>
      <div
        className="editor"
        contentEditable={true}
        onInput={handleInput}
        onSelectCapture={selectText}
        suppressContentEditableWarning={true}
      ></div>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    </>
  );
}
