import React from 'react';

import './App.css';
import {
  Image,
  UnstyledButton
} from "@mantine/core";
import powerBackground from './powerBackground-2.jpeg';
import {ReactSimplyCarouselExample} from "./carousel";
import { UserInput} from "./aUserInput";
import {useAppDispatch, useAppSelector} from "./Store";
import {backToConfig, selectApp} from "./state";


function App() {

    const selectState = useAppSelector(selectApp)
    const dispatch = useAppDispatch()


    return (
      <div style={{display: "flex", width: "95vw", flexDirection: "column", alignItems: "flex-start", padding: "0px", height: "100vh"}}>
        <Image src={powerBackground} style={{position:"absolute", width: "100vw",objectFit: "fill", zIndex: "-10"}} height={"100vh"} ></Image>
          {
              selectState.status === "config" && <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "90vh"}}>
                  <UserInput></UserInput>
              </div>

          }
          {
              selectState.status === "result" && selectState.config?.apartmentSize &&  <div style={{display: "flex", alignItems: "center", gap: "5vw",justifyContent: "center", flexWrap: "wrap", width: "100vw", height: "80vh"}}>
                  <div style={{minWidth: "250px",maxWidth: "80vw", marginTop: "50px",   padding: "25px 30px 30px 30px", backgroundColor: 'rgba(255,255,255)',  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                      <UnstyledButton style={{borderBottom: "1px solid lightgrey"}} onClick={() => dispatch(backToConfig())}>Back</UnstyledButton>
                      <h6 style={{fontSize: "20px", marginLeft: "90px", marginTop: "10px", marginBottom: "10px", marginRight: "90px"}}>Your heating system using {selectState.config.energyType} emits approximately {parseInt((selectState.config.kwValue * selectState.config.apartmentSize * selectState.config.kwToCo2Value! / 1000).toString())} kilograms of CO2 annually</h6>
                      <ReactSimplyCarouselExample kwPerYear={selectState.config?.apartmentSize * selectState.config?.kwValue}></ReactSimplyCarouselExample>
                  </div>
              </div>
          }
      </div>
  );
}

export default App

