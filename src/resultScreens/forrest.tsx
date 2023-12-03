import {Button, Drawer, NumberInput} from "@mantine/core";
import React, {useState} from "react";
import {useDisclosure} from "@mantine/hooks";
import {useAppSelector} from "../Store";
import {selectApp} from "../state";


export const ForrestUi = ({kwPerYear, energyType}: {kwPerYear:number, energyType: string}) => {


    const [openedCalcForrestToTakeCo2, handlersForrestToTakeCo2] = useDisclosure(false);
    const [kwToCo2Factor, setKwToCo2Factor] = useState<number>(
        //https://www.verbraucherzentrale.de/wissen/energie/heizen-und-warmwasser/klimapaket-was-bedeutet-es-fuer-mieter-und-hausbesitzer-43806#:~:text=Da%20eine%20Gasheizung%20pro%20Kilowattstunde,bei%20rund%204%20Tonnen%20CO2.
        //https://www.umweltbundesamt.de/themen/co2-emissionen-pro-kilowattstunde-strom-steigen#:~:text=Das%20zeigen%20aktuelle%20Berechnungen%20des,2019%20bei%20411%20g%2FkWh.
        //https://www.weltenergierat.de/publikationen/energie-fuer-deutschland/energie-fuer-deutschland-2021/energie-in-der-europaeischen-union-zahlen-und-fakten/#:~:text=Entwicklung%20der%20CO2%2DIntensität,%3A%20317g%20CO2%2FkWh).
        //
        energyType === "Gas" ? 202 :
                    energyType === "Oil" ? 266 :
                    energyType === "Electric (GE)" ? 411 :
                    energyType === "Electric (EU)" ? 226 :
                        energyType === "Wood" ? 340 : -1
    )


    const [co2IntakePerHectarPerYearInKg, setco2IntakePerHectarPerYearInKg] = useState<number>(6000)

    const state = useAppSelector(selectApp)

    const DrawerContent = () => {
        return <>
            <h2>Calculation Basis</h2>
            <h3>Formula:</h3>
            <p>NeededForrestSizeToBindCo2EmissionInHectar = KwEnergyConsumptionPerYearPerSquaremeter * Apartmentsize * kwToCo2InGramsFactor / 1000 / co2IntakePerHectarPerYearInKg</p>
            <div style={{display: "flex", justifyContent : "space-between", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid lightgrey"}}>

                </div>

                <div style={{display: "flex", justifyContent : "flex-start", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid lightgrey"}}>
                    <p>
                        Its assumed, that one Kilowatt-hour using {state.config?.energyType} emits <NumberInput
                        defaultValue={0.1}
                        precision={1}
                        min={0}
                        step={1}
                        max={1000}
                        stepHoldDelay={500}
                        stepHoldInterval={0.1}
                        style={{width: "100px"}} value={kwToCo2Factor!} onChange={e => setKwToCo2Factor(parseInt(e.toString()))} /> grams of Co2
                    </p>
                </div>

            <div style={{display: "flex", justifyContent : "flex-start", alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid lightgrey"}}>
                <p>
                    Its assumed, that one hectar forrest can bind <NumberInput
                    defaultValue={0.1}
                    precision={1}
                    min={0}
                    step={1}
                    max={100000}
                    stepHoldDelay={500}
                    stepHoldInterval={1}
                    style={{width: "100px"}} value={co2IntakePerHectarPerYearInKg!} onChange={e => setco2IntakePerHectarPerYearInKg(parseInt(e.toString()))} /> kilograms of co2 per year
                </p>
            </div>

                <h3>Calculation:</h3>
                <p>
                    {state.config?.kwValue} * {state.config?.apartmentSize} * {kwToCo2Factor} / 1000 / {co2IntakePerHectarPerYearInKg} = {(kwPerYear * kwToCo2Factor / 1000 / co2IntakePerHectarPerYearInKg).toString().slice(0,4)} hectares
                </p>

                <h3>Source</h3>
            <p>
                Stiftung Unternehmen Wald
            </p>
                <a target="_blank" href={"https://www.wald.de/waldwissen/wie-viel-kohlendioxid-co2-speichert-der-wald-bzw-ein-baum/#:~:text=Faustformel%3A%20Ein%20Hektar%20Wald%20%E2%80%9Cspeichert%E2%80%9D%20pro%20Jahr%20%C3%BCber,%E2%80%9Cspeichern%E2%80%9D%20ist%20chemisch%20nicht%20richtig%20%E2%80%93%20siehe%20Fotosynthese%29."}>
                    https://www.wald.de/waldwissen/wie-viel-kohlendioxid-co2-speichert-der-wald-bzw-ein-baum/#:~:text=Faustformel%3A%20Ein%20Hektar%20Wald%20%E2%80%9Cspeichert%E2%80%9D%20pro%20Jahr%20%C3%BCber,%E2%80%9Cspeichern%E2%80%9D%20ist%20chemisch%20nicht%20richtig%20%E2%80%93%20siehe%20Fotosynthese%29.
                </a>
        </>
    }

    return <>
            <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>
                <div style={{marginTop: "50px",  display: "flex", padding: "0px", flexDirection: "column",marginRight: "5vw"}}>
                    <div style={{padding: "20px"}}>
                        <h6 style={{fontSize: "20px", margin: "0px", padding: "0px"}}>In Germany, there are approximately 11 million hectares of forrest.</h6>
                        <h6 style={{fontSize: "20px", margin: "0px"}}>This means that for each German citizen, there are <span style={{color: "green"}}>0.13 hectares</span> of forrest.</h6>
                        <h6 style={{fontSize: "20px", margin: "0px", padding: "0px"}}>One hectare of forrest can absorb 6 tons of CO2 each year.</h6>
                        <h6 style={{fontSize: "20px", margin: "0px"}}>Just to absorb the CO2 emitted by your heating system, <span style={{color: "red"}}>{(kwPerYear * kwToCo2Factor / 1000 / co2IntakePerHectarPerYearInKg!).toString().slice(0,4)} hectares</span> of forrest are already needed.</h6>
                        <Button style={{width: "160px", marginTop: "100px"}} onClick={handlersForrestToTakeCo2.open}>See Calculation</Button>
                    </div>




                    <Drawer opened={openedCalcForrestToTakeCo2} onClose={handlersForrestToTakeCo2.close}>
                        <DrawerContent></DrawerContent>
                    </Drawer>

                </div>
            </div>
    </>
}

