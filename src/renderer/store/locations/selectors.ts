import { createSelector } from "reselect";
import { RootState } from "../store";
import { itemsById } from "../utils";

export const selectLocations = (state: RootState) => state.location.locations;
export const selectSelectedLocationId = (state: RootState) => state.location.selectedId;
export const selectProcessById = (state: RootState) => state.location.processById;
export const selectRecognitionById = (state: RootState) => state.location.recognitionById;
export const selectLocationsById = createSelector([selectLocations], itemsById);
