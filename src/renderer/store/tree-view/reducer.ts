import { TreeViewAction, TreeViewActionType } from "./actions";

const INITIAL_STATE = {};

type TreeViewState = {
  selectedId?: string;
};

export default function (
  state: TreeViewState = INITIAL_STATE,
  action: TreeViewAction,
): TreeViewState {
  switch (action.type) {
    case TreeViewActionType.SelectItem:
      return { ...state, selectedId: action.payload };
    default:
      return state;
  }
}
