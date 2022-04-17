import { DirectoryInfo } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum LocationsActionType {
  AddItemInit = '[Location] Add Item - Init',
  AddItemComplete = '[Location] Add Item - Complete',
  SelectItem = '[Location] Select Item',
  RequestItems = '[Location] Request Items',
  ReceiveItems = '[Location] Receive Items',
}

export const addLocationItemInit: Action<typeof LocationsActionType.AddItemInit> = () => ({
  type: LocationsActionType.AddItemInit,
});

export const addLocationItemComplete: PayloadAction<typeof LocationsActionType.AddItemComplete, DirectoryInfo> = (item) => ({
  type: LocationsActionType.AddItemComplete,
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
  | ReturnType<typeof addLocationItemInit>
  | ReturnType<typeof addLocationItemComplete>
  | ReturnType<typeof selectLocationItem>
  | ReturnType<typeof requestLocationItems>
  | ReturnType<typeof receiveLocationItems>;
