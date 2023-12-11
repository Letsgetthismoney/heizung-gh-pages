import {Button, Drawer} from "@mantine/core";
import React from "react";
import {useDisclosure} from "@mantine/hooks";
import compare from "./Comparison-of-CO2-emissions-from-different-fuel-sources-for-heat-production.png"

export const Compare = () => {

    const [opened, handler] = useDisclosure(false);

    return <div style={{padding: "20px", display: "flex", flexDirection: "column"}}>
        <h6 style={{fontSize: "20px", marginTop: "0px", marginBottom: "20px"}}>Comparison</h6>
        <img src={compare} style={{width: "500px"}}/>
        <Button style={{alignSelf: "flex-end"}} onClick={handler.open}>See Source</Button>

        <Drawer opened={opened} onClose={handler.close}>
            <h4>Source</h4>
            <p>
                researchgate
            </p>
            <a target="_blank" href={"https://www.researchgate.net/figure/Comparison-of-CO2-emissions-from-different-fuel-sources-for-heat-production_fig1_259124304"}>https://www.researchgate.net/figure/Comparison-of-CO2-emissions-from-different-fuel-sources-for-heat-production_fig1_259124304</a>
        </Drawer>
    </div>
}