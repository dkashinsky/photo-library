import { DirectoryInfo } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum LocationsActionType {
  AddItem = '[Location] Add Item',
  SelectItem = '[Location] Select Item',
  RequestItems = '[Location] Request Items',
  ReceiveItems = '[Location] Receive Items',
}

export const addLocationItem: PayloadAction<typeof LocationsActionType.AddItem, DirectoryInfo> = (item) => ({
  type: LocationsActionType.AddItem,
  payload: item,
});

export const requestLocationItems: Action<typeof LocationsActionType.RequestItems> = () => ({
  type: LocationsActionType.RequestItems,
});

export const receiveLocationItems: PayloadAction<typeof LocationsActionType.ReceiveItems, DirectoryInfo[]> = (items) => ({
  type: LocationsActionType.ReceiveItems,
  payload: items,
});

export const selectLocationItem: PayloadAction<typeof LocationsActionType.SelectItem, string> = (id: string) => ({
  type: LocationsActionType.SelectItem,
  payload: id,
});

export type LocationsAction =
  | ReturnType<typeof addLocationItem>
  | ReturnType<typeof selectLocationItem>
  | ReturnType<typeof requestLocationItems>
  | ReturnType<typeof receiveLocationItems>;
