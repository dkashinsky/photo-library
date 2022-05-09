import { PersonDTO } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum PeopleActionType {
  GetPeopleInit = '[People] Get People - Init',
  GetPeopleComplete = '[People] Get People - Complete',
  AddPersonInit = '[People] Add Person - Init',
  AddPersonComplete = '[People] Add Person - Complete',
}

export const getPeopleInit: Action<typeof PeopleActionType.GetPeopleInit> = () => ({
  type: PeopleActionType.GetPeopleInit,
});

export const getPeopleComplete: PayloadAction<typeof PeopleActionType.GetPeopleComplete, PersonDTO[]> = (item) => ({
  type: PeopleActionType.GetPeopleComplete,
  payload: item,
});

export const addPersonInit: PayloadAction<typeof PeopleActionType.AddPersonInit, string> = (name) => ({
  type: PeopleActionType.AddPersonInit,
  payload: name,
});

export const addPersonComplete: PayloadAction<typeof PeopleActionType.AddPersonComplete, PersonDTO> = (item) => ({
  type: PeopleActionType.AddPersonComplete,
  payload: item,
});

export type PeopleAction =
  | ReturnType<typeof getPeopleInit>
  | ReturnType<typeof getPeopleComplete>
  | ReturnType<typeof addPersonInit>
  | ReturnType<typeof addPersonComplete>;
