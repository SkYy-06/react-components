import { useState } from "react";

function Folder({ handleInsertNode, explorer, deleteNode, updateNode }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic

      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="mt-5 ">
        <div className="folder" onClick={() => setExpand(!expand)}>
          {isEditing ? (
            <input
              type="text"
              defaultValue={explorer.name}
              autoFocus
              onBlur={(e) => {
                updateNode(explorer.id, e.target.value);
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateNode(explorer.id, e.target.value);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span>📁 {explorer.name}</span>
          )}

          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNode(explorer.id);
              }}
            >
              🗑️
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              📝
            </button>
          </div>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>
              📁Folder+{" "}
            </button>

            <button onClick={(e) => handleNewFolder(e, false)}>
              {" "}
              📄File+{" "}
            </button>
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>

              <input
                type="text"
                onKeyDown={onAddFolder}
                className="inputContainer_input"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                deleteNode={deleteNode}
                updateNode={updateNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
}
export default Folder;
