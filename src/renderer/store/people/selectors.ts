import { createSelector } from "reselect";
import { RootState } from "../store";
import { itemsById } from "../utils";

export const selectPeople = (state: RootState) => state.people.people;
export const selectPeopleById = createSelector([selectPeople], itemsById);
export const selectPeopleLoading = (state: RootState) => state.people.loading;
