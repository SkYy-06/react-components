const useTraverseTree = () => {
  function insertNode(tree, folderId, item, isFolder) {
  if (tree.id === folderId && tree.isFolder) {
    return {
      ...tree,
      items: [
        {
          id: Date.now(), // fixed (no getTime needed)
          name: item,
          isFolder,
          items: [],
        },
        ...tree.items, // keep existing children
      ],
    };
  }

    let latestNode = [];

    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  }

  const deleteNode = (tree, itemId) => {
    // Remove the node at current level
    const filteredItems = tree.items
      .filter((item) => item.id !== itemId)
      .map((item) => deleteNode(item, itemId));

    return { ...tree, items: filteredItems };
  };
  const updateNode = (tree, itemId, newName) => {
    // Update the name of the current node level
    if (tree.id === itemId) {
      return {
        ...tree,
        name: newName,
      };
    }

    const updateItems = tree.items.map((item) =>
      updateNode(item, itemId, newName),
    );
    return { ...tree, items: updateItems };
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
