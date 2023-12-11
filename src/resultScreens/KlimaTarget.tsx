import React from "react";
import {useDisclosure} from "@mantine/hooks";
import {Button, Drawer, RingProgress, Text} from "@mantine/core";
import target from "./target.png"
import {useAppSelector} from "../Store";
import {selectApp} from "../state";

export const KlimaTarget = () => {

    const selectState = useAppSelector(selectApp)

    const [opened, handler] = useDisclosure(false);




    const verhaelntiss = selectState.config!.kwValue * selectState.config!.apartmentSize * selectState.config!.kwToCo2Value / 1000 / 1000
    const min = 1 / verhaelntiss * 100
    const max = 100 - min
    console.log(verhaelntiss)

    return <div style={{display: "flex", flexDirection: "row", padding: "20px", alignItems: "center", height: "100%"}}>
        <img src={target} style={{width: "200px"}}/>
        <div>
            <h6 style={{fontSize: "20px"}}>To challenge the targets of Paris, each citizien needs to reduce his own Co2
                emmission to 1000 kilograms annually</h6>
        </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
            <RingProgress
                size={200}
                thickness={20}
                label={
                    <Text size="xs" ta="center">
                        Overflow by your heating system
                    </Text>
                }
                sections={[
                    {value: min, color: 'green'},
                    {value: max, color: 'red'},

                ]}
            />
            <Button style={{marginLeft: "auto"}} onClick={handler.open}>See Source</Button>
        </div>

        <Drawer opened={opened} onClose={handler.close}>
            <h4>Source</h4>
            <p>
                Landeszentrale für politische Bildung
                Baden-Württemberg
            </p>
            <a target="_blank" href={"https://www.lpb-bw.de/klimaschutz-deutschland"}>https://www.lpb-bw.de/klimaschutz-deutschland</a>
        </Drawer>

    </div>


}