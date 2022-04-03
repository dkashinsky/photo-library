
import { generateTree, TreeItemMeta } from '@fsdk/tree-utils';

export type RowData = {
  id: string;
  label: string;
  namespace: string;
  depth: number;
  children: RowData[];
}

let idCounter = 0;
const itemCreator = (parent: RowData | undefined, meta: TreeItemMeta) => {
  const item: RowData = {
    id: `${idCounter++}`,
    label: `Item #${idCounter}`,
    namespace: 'URN:classes',
    depth: meta.level,
    children: [],
  };

  parent?.children.push(item);

  return item;
};

export const getData = () => generateTree({ itemCreator });
