import {Button, Drawer} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import compare from "./polarstern.png"
import {useAppSelector} from "../Store";
import {selectApp} from "../state";

export const Compare = () => {

    const [opened, handler] = useDisclosure(false);
    const state = useAppSelector(selectApp)
    const [yAxisStep, setYAxisStep] = useState<number>(0.05)

    function calculateYAxis() {
        if (state.config?.energyType === "Oil") {
            let max = 250 / 160 * parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())
            let step = max / 10
            setYAxisStep(parseInt(step.toString()))
        }
        if (state.config?.energyType === "Gas") {
            let max = 250 / 125 * parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())
            let step = max / 10
            setYAxisStep(parseInt(step.toString()))
        }
        if (state.config?.energyType === "Wood Pellets") {
            let max = 250 / 13 * parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())
            let step = max / 10
            setYAxisStep(parseInt(step.toString()))
        }
        if (state.config?.energyType === "Electric (GE)") {
            let max = 250 / 245 * parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())
            let step = max / 10
            setYAxisStep(parseInt(step.toString()))
        }
    }

    useEffect(() => {
        calculateYAxis()
    }, [])

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
    };

    const horizontalLinesStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '250px',
        borderBottom: "1px solid white",
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundImage: `repeating-linear-gradient(to bottom, white 0px, white 1px, transparent 1px, transparent ${100 / 10}%),
                      repeating-linear-gradient(to bottom, white 0px, white 1px, transparent 1px, transparent ${100 / 10}%)`,
    };

    const verticalLinesStyle: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '300px',
        display: 'flex',
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `repeating-linear-gradient(to right, white 0px, white 1px, transparent 1px, transparent ${100 / 8}%),
                      repeating-linear-gradient(to right, white 0px, white 1px, transparent 1px, transparent ${100 / 8}%)`,
    };


    return <div style={{padding: "20px", display: "flex", flexDirection: "column"}}>
        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "20px"}}>Co2 Emission Comparison <Button style={{alignSelf: "flex-end"}} onClick={handler.open}>See Sources</Button></h6>
        <div style={containerStyle}>
            <div style={horizontalLinesStyle}>

            </div>
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "flex-end", backgroundColor: "#282828", height: "400px"}}>
            <div style={{display: "flex", alignSelf: "flex-start", color: "white", flexDirection: "column", height: "275px"}}>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(9 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(8 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(7 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(6 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(5 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(4 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(3 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(2 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(1 * yAxisStep).toFixed(2)}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>{(0 * yAxisStep).toFixed(2)}</p>
                </div>
                {state.config?.energyType !== "Oil" && state.config?.energyType !== "Gas" && state.config?.energyType !== "Electric" && state.config?.energyType !== "Wood Pellets" &&
                    <div style={{display: "flex", alignItems: "flex-end", height: "25px"}}>
                        <p style={{margin: "0px"}}>Kg/KwH</p>
                    </div>
                }
                {state.config?.energyType !== "LPG" && state.config?.energyType !== "Electric (EU)" && <div style={{display: "flex", alignItems: "flex-end", height: "25px"}}>
                    <p style={{margin: "0px"}}>Kg/annualy</p>
                </div>
                }


            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    width: "100%"
                }}>


                    {state.config?.energyType === "Oil" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{color: "white"}}>{parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())} kg</p>
                            <div style={{
                                height: "160px",
                                width: "30px",
                                backgroundColor: "lightgray",
                                border: "3px solid red"
                            }}>
                            </div>
                        </div>}
                    {state.config?.energyType !== "Oil" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                            <div style={{height: "160px", width: "30px", backgroundColor: "lightgray"}}>

                            </div>
                        </div>
                    }


                    {state.config?.energyType === "Gas" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{color: "white"}}>{parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())} kg</p>
                            <div style={{
                                height: "125px",
                                width: "30px",
                                backgroundColor: "lightgray",
                                border: "3px solid red"
                            }}>
                            </div>
                        </div>}
                    {state.config?.energyType !== "Gas" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                            <div style={{height: "125px", width: "30px", backgroundColor: "lightgray"}}>

                            </div>
                        </div>
                    }

                    <div style={{height: "215px",width: "30px", backgroundColor: "lightgray"}}>

                    </div>
                    <div style={{height: "220px",width: "30px", backgroundColor: "lightgray"}}>

                    </div>
                    <div style={{height: "150px",width: "30px", backgroundColor: "lightgray"}}>

                    </div>
                    {state.config?.energyType === "Electric (GE)" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{color: "black"}}>{parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())} kg</p>
                            <div style={{
                                height: "245px",
                                width: "30px",
                                backgroundColor: "lightgray",
                                border: "3px solid red"
                            }}>
                            </div>
                        </div>}
                    {state.config?.energyType !== "Electric (GE)" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                            <div style={{height: "245px", width: "30px", backgroundColor: "lightgray"}}>

                            </div>
                        </div>
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "150px" }}>
                    <h4 style={{ color: "white" }}>
                        Fossil Resources
                    </h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ transform: "rotate(-45deg)", color: "white", width: "50px" }}>
                            Heating Oil
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "white", width: "50px" }}>
                            Natural Gas
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "white", width: "50px" }}>
                            Hard Coal
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "white", width: "50px" }}>
                            Lignite
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "white", width: "50px" }}>
                            District Heating
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "white", width: "50px" }}>
                            Power Mix
                        </p>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "100%"}}>
                    <div style={{height: "20px",width: "30px", backgroundColor: "orange"}}>

                    </div>
                    {state.config?.energyType === "Wood Pellets" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <p style={{color: "white"}}>{parseInt((state.config.kwValue * state.config.apartmentSize * state.config.kwToCo2Value! / 1000).toString())} kg</p>
                            <div style={{
                                height: "13px",
                                width: "30px",
                                backgroundColor: "orange",
                                border: "2px solid red"
                            }}>
                            </div>
                        </div>}
                    {state.config?.energyType !== "Wood Pellets" &&
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                            <div style={{height: "13px", width: "30px", backgroundColor: "orange"}}>

                            </div>
                        </div>
                    }
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "150px" }}>
                    <h4 style={{ color: "white" }}>
                        Wood
                    </h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ transform: "rotate(-45deg)", color: "orange", width: "50px" }}>
                            Forest Residues
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "orange", width: "50px" }}>
                            Wood Pellets
                        </p>
                    </div>
                </div>

            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "100%"}}>
                    <div style={{height: "5px",width: "30px", backgroundColor: "lightgreen"}}>

                    </div>
                    <div style={{height: "7px",width: "30px", backgroundColor: "lightgreen"}}>

                    </div>
                    <div style={{height: "5px",width: "30px", backgroundColor: "lightgreen"}}>

                    </div>
                    <div style={{height: "5px",width: "30px", backgroundColor: "lightblue"}}>

                    </div>
                    <div style={{height: "7px",width: "30px", backgroundColor: "lightblue"}}>

                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "150px" }}>
                    <h4 style={{ color: "white" }}>
                        Biogas and Biomethane
                    </h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ transform: "rotate(-45deg)", color: "lightgreen", width: "50px" }}>
                            Waste Residues
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "lightgreen", width: "50px" }}>
                            Energy Plants
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "lightgreen", width: "50px" }}>
                            Manure
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "lightblue", width: "50px" }}>
                            Waste
                        </p>
                        <p style={{ transform: "rotate(-45deg)", color: "lightblue", width: "50px" }}>
                            Energy Plants
                        </p>
                    </div>
                </div>

            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "100%"}}>
                    <div style={{height: "9px",width: "30px", backgroundColor: "yellow"}}>

                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "150px" }}>
                    <h4 style={{ color: "white" }}>
                        Others
                    </h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <p style={{ transform: "rotate(-45deg)", color: "yellow", width: "50px" }}>
                            Heat Pumps
                        </p>
                    </div>
                </div>

            </div>



        </div>


        <Drawer opened={opened} onClose={handler.close}>
            <h4>Sources</h4>

            <p>
                polarstern-energie
            </p>
            <a target="_blank" href={"https://www.polarstern-energie.de/magazin/artikel/heizen-co2-vergleich-von-brennstoffen/"}>https://www.polarstern-energie.de/magazin/artikel/heizen-co2-vergleich-von-brennstoffen/</a>


            <p>
                researchgate
            </p>
            <a target="_blank" href={"https://www.researchgate.net/figure/Comparison-of-CO2-emissions-from-different-fuel-sources-for-heat-production_fig1_259124304"}>https://www.researchgate.net/figure/Comparison-of-CO2-emissions-from-different-fuel-sources-for-heat-production_fig1_259124304</a>
        </Drawer>
    </div>
}