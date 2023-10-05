import {useDisclosure} from "@mantine/hooks";
import React, {useState} from "react";
import {Button, Collapse, Drawer, Image, NumberInput} from "@mantine/core";
import oilFactory from "../oilFactory.png";

export const OilUi = ({kwValue, wohnungsflaeche}: {kwValue:number, wohnungsflaeche: number}) => {
    const [openedCalcAmountOil, handlersAmountOil] = useDisclosure(false);

    const [kwToDieselFactor, setKwToDieselFactor] = useState<number | "">(9.8)
    const [verbrauchLkw, setVerbrauchLkw] = useState<number | "">(35)
    const [distanceBM, setDistanceBM] = useState<number | "">(645)
    const [opendQuellenAmountOil, {toggle}] = useDisclosure(false)

    return <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>

        <div style={{marginLeft: "5vw",  display: "flex", padding: "0px", flexDirection: "column",}}>


            {typeof kwToDieselFactor == "number" && typeof verbrauchLkw == "number" && typeof distanceBM == "number" &&
                <h6 style={{fontSize: "25px", margin: "0px", padding: "0px"}}>Das entspricht einer Menge von {parseInt((kwValue! * wohnungsflaeche! / kwToDieselFactor!).toString())} Liter Erdöl</h6>
            }
            {typeof kwToDieselFactor == "number" && typeof verbrauchLkw == "number" && typeof distanceBM == "number" &&
                <h6 style={{fontSize: "25px", margin: "0px"}}>Ein Lkw könnte mit dieser Menge {(kwValue! * wohnungsflaeche! / kwToDieselFactor / verbrauchLkw! * 100 / distanceBM).toString().slice(0,5)} mal zwischen Berlin und München hin und her fahren</h6>
            }
            <Button style={{width: "160px", marginTop: "25px"}} onClick={handlersAmountOil.open}>Calculation Basis</Button>
            <Drawer opened={openedCalcAmountOil} onClose={handlersAmountOil.close} title="AmountOilDrawer">
                <h2>Calculation Basis</h2>
                <h3>Formel:</h3>
                <h4>EnergievebrauchHeizung * WohnungsGröße / KilowattstundenAufLiterDiesel / VerbrauchLkwAuf100Kilometer * 100 / DistanzBerlinMünchen </h4>

                <div style={{display: "flex", justifyContent : "space-between", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid lightgrey"}}>
                    <p>Es wird angenommen, dass ein Liter Diesel</p>
                    <NumberInput
                        defaultValue={0.1}
                        precision={1}
                        min={0}
                        step={0.1}
                        max={100}
                        stepHoldDelay={500}
                        stepHoldInterval={0.1}
                        style={{width: "70px"}} value={kwToDieselFactor} onChange={setKwToDieselFactor} />

                    <p>Kilowattstunden Energie erzeugt.</p>
                </div>
                <div style={{display: "flex", justifyContent : "flex-start", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid lightgrey"}}>
                    <p>Es wird angenommen, dass ein Lkw im Durchschnitt</p>
                    <NumberInput stepHoldDelay={500}
                                 stepHoldInterval={1} style={{width: "70px"}} value={verbrauchLkw} onChange={setVerbrauchLkw} />
                    <p>Liter Diesel auf 100 Kilometer Strecke verbraucht.</p>
                </div>

                <div style={{display: "flex", justifyContent : "flex-start", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid lightgrey"}}>
                    <p>Es wird angenommen, dass die Distanz zwischen Berlin und München</p>
                    <NumberInput stepHoldDelay={500}
                                 stepHoldInterval={1}  style={{width: "70px"}} value={distanceBM} onChange={setDistanceBM} />
                    <p style={{marginLeft: "20px"}}>Kilometer beträgt</p>
                </div>

                <h3>Berechnung:</h3>
                <h4>{kwValue!} * {wohnungsflaeche!} / {kwToDieselFactor!} / {verbrauchLkw!} * 100 / {distanceBM} = </h4>
                {typeof kwToDieselFactor == "number" && typeof verbrauchLkw == "number" && typeof distanceBM == "number" &&
                    <h4>{(kwValue! * wohnungsflaeche! / kwToDieselFactor / verbrauchLkw! * 100 / distanceBM).toString().slice(0,5)}</h4>
                }
                <div style={{width: "100%"}}>
                    {!(verbrauchLkw == 35 && kwToDieselFactor == 9.8 && distanceBM == 645) && <Button onClick={() => {
                        setDistanceBM(645);
                        setVerbrauchLkw(35)
                        setKwToDieselFactor(9.8)
                    }}>Set Default Values</Button>}
                </div>

                <Button onClick={toggle}>See sources</Button>
                <Collapse in={opendQuellenAmountOil}>
                    <div style={{width: "100%"}}>
                        <p style={{wordWrap: "break-word", width: "100%",
                            wordBreak: "break-all"}}>https://nachhaltigmobil.schule/leistung-energie-verbrauch/#</p>
                        <p style={{wordWrap: "break-word", width: "100%",
                            wordBreak: "break-all"}}>https://fleetgo.de/kb/lkw/verbrauch-von-lkw/#:~:text=Im%20Durchschnitt%20liegt%20der%20Verbrauch,einer%20geringeren%20Ladung%20verbrauchen%20weniger.</p>
                        <p style={{wordWrap: "break-word", width: "100%",
                            wordBreak: "break-all"}}>https://www.google.com/maps/dir/Berlin/München/@50.297702,9.9356688,7z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x47a84e373f035901:0x42120465b5e3b70!2m2!1d13.404954!2d52.5200066!1m5!1m1!1s0x479e75f9a38c5fd9:0x10cb84a7db1987d!2m2!1d11.5819805!2d48.1351253!3e0?entry=ttu</p>
                    </div>
                </Collapse>
            </Drawer>
        </div>
        <Image  radius="md" src={oilFactory}  alt="Random image" style={{padding: "0px", margin: "0px"}}/>
    </div>
}