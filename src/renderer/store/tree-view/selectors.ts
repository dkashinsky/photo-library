import { RootState } from "../store";

export const selectTreeItemId = (state: RootState) => state.treeView.selectedId;
