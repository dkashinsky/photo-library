import { RootState } from "../store";

export const selectLocations = (state: RootState) => state.location.locations;
export const selectSelectedLocationId = (state: RootState) => state.location.selectedId;
