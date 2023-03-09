type NodeType = {
  value: any;
  nextNode: NodeType | null;
};

function NodeFactory(value: any = null, nextNode: NodeType | null = null) {
  return { value, nextNode };
}

function LinkedListFactory() {
  let HEAD: NodeType | null = null;

  const append = (value: any) => {
    const recursivelyAddNode = (value: any, nextNode: NodeType) => {
      if ("nextNode" in nextNode && nextNode.nextNode === null)
        nextNode.nextNode = NodeFactory(value);
      else if (nextNode.nextNode === null) return;
      else recursivelyAddNode(value, nextNode.nextNode);
    };

    const node = NodeFactory(value);
    if (HEAD === null) return (HEAD = node);
    if ("nextNode" in HEAD && HEAD.nextNode === null)
      HEAD.nextNode = NodeFactory(value);
    else if ("nextNode" in HEAD && HEAD.nextNode !== null) {
      recursivelyAddNode(value, HEAD.nextNode);
    }
  };

  const prepend = (value: any) => {
    if (HEAD === null) HEAD = NodeFactory(value);
    else if ("nextNode" in HEAD) HEAD = NodeFactory(value, HEAD);
  };

  const size = () => {
    function sumNodes(node: NodeType | null, count: number = 0): Number {
      if (node === null) return count;

      return sumNodes(node.nextNode, count + 1);
    }

    if (HEAD === null) return 0;
    else if ("nextNode" in HEAD) {
      return sumNodes(HEAD);
    }
  };

  const head = () => {
    return HEAD;
  };

  const tail = () => {
    const findLastNode = (nextNode: NodeType): NodeType | null => {
      if (nextNode.nextNode === null) return nextNode;
      else return findLastNode(nextNode.nextNode);
    };

    if (HEAD === null) return null;
    else if ("nextNode" in HEAD) {
      return findLastNode(HEAD);
    }
  };

  const at = (index: number) => {
    let node: NodeType | null = HEAD;
    if (index === 0) return node;
    for (let i = 1; i <= index; i++) {
      if (!node) return null;
      else if (i === index && "nextNode" in node) return node.nextNode;
      else if ("nextNode" in node) node = node.nextNode;
    }
  };

  const pop = () => {
    const removeLastNode = (node: NodeType | null) => {
      if (node === null) return;
      if (
        "nextNode" in node &&
        node.nextNode !== null &&
        "nextNode" in node.nextNode &&
        node.nextNode.nextNode === null
      )
        node.nextNode = null;
      else removeLastNode(node.nextNode);
    };

    if (HEAD === null) return;
    else if ("nextNode" in HEAD) {
      return removeLastNode(HEAD);
    }
  };
  const contains = (value: any) => {
    const recursiveContains = (node: NodeType): true | false => {
      if (node.value === value) return true;
      if (node.nextNode === null) return false;
      else return recursiveContains(node.nextNode);
    };

    if (HEAD === null) return false;
    else if ("nextNode" in HEAD) {
      return recursiveContains(HEAD);
    }
  };

  const find = (value: any) => {
    const recursiveFind = (node: NodeType, index = 0): number | null => {
      if (node.value === value) return index;
      if (node.nextNode === null) return null;
      else return recursiveFind(node.nextNode, index + 1);
    };

    if (HEAD === null) return null;
    else if ("nextNode" in HEAD) {
      return recursiveFind(HEAD);
    }
  };

  const toString = (
    node: NodeType | null = HEAD,
    stringRep: string = ""
  ): string => {
    if (node === null) return `${stringRep} -> null`;
    if ("value" in node) {
      const string = stringRep
        ? `${stringRep} -> ${node.value}`
        : `${node.value}`;
      return toString(node.nextNode, string);
    } else {
      return stringRep;
    }
  };
  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString
  };
}

const a = LinkedListFactory();
a.append("testing");
a.append("testing2");
a.append("testing3");
a.append("testing4");
a.prepend("testing5");
console.log(a.toString());
