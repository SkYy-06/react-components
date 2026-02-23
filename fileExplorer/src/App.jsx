import { useState } from "react";
import explorer from "./Data/folderData";
import "./App.css";
import Folder from "./components/folder";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (id) => {
    const finalTree = deleteNode(explorerData, id);
    setExplorerData(finalTree);
  };

  const handleUpdateNode = (id, newName) => {
    const finalTree = updateNode(explorerData, id, newName);
    setExplorerData(finalTree);
  };
  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        explorer={explorerData}
        deleteNode={handleDeleteNode}
        updateNode={handleUpdateNode}
      />
    </div>
  );
}

export default App;
