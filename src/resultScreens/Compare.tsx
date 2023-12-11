import {Button, Drawer} from "@mantine/core";
import React from "react";
import {useDisclosure} from "@mantine/hooks";
import compare from "./polarstern.png"

export const Compare = () => {

    const [opened, handler] = useDisclosure(false);

    return <div style={{padding: "20px", display: "flex", flexDirection: "column"}}>
        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "20px"}}>Co2 Emission Comparison</h6>
        <img src={compare} style={{width: "80%", marginLeft: "10%", marginBottom: "20px"}}/>
        <Button style={{alignSelf: "flex-end"}} onClick={handler.open}>See Sources</Button>

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