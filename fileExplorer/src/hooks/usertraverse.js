const useTraverse = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: Date.now().getTime(),
        name: item,

        isFolder,
        items: [],
      });
      return tree;
    }
    let latest = [];

    latest = tree.items.map((child) => {
      return insertNode(child, folderId, item, isFolder);
    });
    return { ...tree, items: latest };
  };





  const deleteNode = (tree, itemId) => {
    const filteredItems = tree.items
      .filter((item) => item.id !== itemId)
      .map((item) => deleteNode(item, itemId));

    return { ...tree, items: filteredItems };
  };


  

  const updateNode = (tree, itemId, newName) => {
    if (tree.id === itemId) {
      return { ...tree, newName };
    }
    const updateItems = tree.items.map((item) => {
      return updateNode(item, itemId, newName);
    });
    return { ...tree, items: updateItems };
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverse;
