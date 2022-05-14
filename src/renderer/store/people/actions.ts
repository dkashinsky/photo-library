import { FileInfoExtendedDTO, PersonDTO } from "../../../preload/preload";
import { Action, PayloadAction } from "../utils";

export enum PeopleActionType {
  GetPeopleInit = '[People] Get People - Init',
  GetPeopleComplete = '[People] Get People - Complete',
  AddPersonInit = '[People] Add Person - Init',
  AddPersonComplete = '[People] Add Person - Complete',
  LinkPersonInit = '[People] Link Person - Init',
  LinkPersonComplete = '[People] Link Person - Complete',
  UnlinkPersonInit = '[People] Unlink Person - Init',
  UnlinkPersonComplete = '[People] Unlink Person - Complete',
}

export type FaceAreaToPersonLink = {
  faceAreaId: string;
  personId: string;
  asReference: boolean;
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

export const linkPersonInit: PayloadAction<typeof PeopleActionType.LinkPersonInit, FaceAreaToPersonLink> = (link) => ({
  type: PeopleActionType.LinkPersonInit,
  payload: link,
});

export const linkPersonComplete: PayloadAction<typeof PeopleActionType.LinkPersonComplete, FileInfoExtendedDTO> = (item) => ({
  type: PeopleActionType.LinkPersonComplete,
  payload: item,
});

export const unlinkPersonInit: PayloadAction<typeof PeopleActionType.UnlinkPersonInit, string> = (faceAreaId) => ({
  type: PeopleActionType.UnlinkPersonInit,
  payload: faceAreaId,
});

export const unlinkPersonComplete: PayloadAction<typeof PeopleActionType.UnlinkPersonComplete, FileInfoExtendedDTO> = (item) => ({
  type: PeopleActionType.UnlinkPersonComplete,
  payload: item,
});

export type PeopleAction =
  | ReturnType<typeof getPeopleInit>
  | ReturnType<typeof getPeopleComplete>
  | ReturnType<typeof addPersonInit>
  | ReturnType<typeof addPersonComplete>
  | ReturnType<typeof linkPersonInit>
  | ReturnType<typeof linkPersonComplete>
  | ReturnType<typeof unlinkPersonInit>
  | ReturnType<typeof unlinkPersonComplete>;
