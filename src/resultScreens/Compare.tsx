import {Button, Drawer} from "@mantine/core";
import React from "react";
import {useDisclosure} from "@mantine/hooks";

export const Compare = () => {

    const [opened, handler] = useDisclosure(false);

    return <div style={{padding: "20px"}}>
        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "20px"}}>Comparison</h6>
        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "10px"}}>A gas heater emits 4,940 kilograms of CO2
            annually with an energy consumption of 20,000 kilowatt-hours.</h6>

        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "10px"}}>On the other hand, a modern pellet heater
            emits only 460 kilograms of CO2 but releases 1,460 grams of particulate matter when producing the same
            amount of heat.</h6>

        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "10px"}}>A 20-year-old oil heater with around
            20,000 kWh of heating output per year emits approximately 5.3 tons of CO2.</h6>

        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "10px"}}>A heat pump with a comparable capacity
            may, under certain circumstances, be completely emission-free.</h6>
        <Button onClick={handler.open}>See Source</Button>

        <Drawer opened={opened} onClose={handler.close}>
            <h4>Source</h4>
            <p>
                Forest Research (FR)
            </p>

            <a target="_blank" href={"https://www.forestresearch.gov.uk/tools-and-resources/fthr/biomass-energy-resources/reference-biomass/facts-figures/carbon-emissions-of-different-fuels/"}>https://www.forestresearch.gov.uk/tools-and-resources/fthr/biomass-energy-resources/reference-biomass/facts-figures/carbon-emissions-of-different-fuels/</a>
        </Drawer>
    </div>
}