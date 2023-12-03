
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./Store";
export interface Form {
    energyType: string;
    apartmentSize: number;
    kwValue: number;
    kwToCo2Value: number;
}
export interface AppState
{
    config: Form | null,
    status: "config" | "result"
}

const initialState : AppState= {
    config: null,
    status: "config"
}
export const appSlice =createSlice(
    {
        name : "appSlice",
        initialState,
        reducers: {
            setAppForm: (state, action: {payload: Form}) => {
                state.config = action.payload;
                console.log(action.payload)
                state.status = "result"
                if(action.payload.energyType === "Gas"){
                    state.config.kwToCo2Value = 202
                }
                if(action.payload.energyType == "Oil"){
                    state.config.kwToCo2Value = 266
                }
                if(action.payload.energyType === "Electric (GE)"){
                    state.config.kwToCo2Value = 411
                }
                if(action.payload.energyType === "Electric (EU)"){
                    state.config.kwToCo2Value = 202
                }
                if(action.payload.energyType === "Wood"){
                    state.config.kwToCo2Value = 202
                }
                if(action.payload.energyType === "Gas"){
                    state.config.kwToCo2Value = 202
                }
            },
            backToConfig: (state) => {
                state.status = "config"
            }
        },
    }
)

export const selectApp = (state : RootState)=> state.AppState


export const { setAppForm, backToConfig } = appSlice.actions;

export default appSlice.reducer
