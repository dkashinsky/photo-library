import { Action, PayloadAction } from "../utils";

export enum TreeViewActionType {
  SelectItem = '[Tree-View] Select Item',
  RequestItems = '[Tree-View] Request Items',
}

export const requestTreeItems: Action<typeof TreeViewActionType.RequestItems> = () => ({
  type: TreeViewActionType.RequestItems,
});

export const selectTreeItem: PayloadAction<typeof TreeViewActionType.SelectItem, string> = (itemId: string) => ({
  type: TreeViewActionType.SelectItem,
  payload: itemId,
});

export type TreeViewAction =
  | ReturnType<typeof requestTreeItems>
  | ReturnType<typeof selectTreeItem>;
