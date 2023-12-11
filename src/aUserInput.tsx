import React, {useState} from "react";
import {Button, Drawer, Image, NumberInput, Select, Slider} from "@mantine/core";

import { Stepper, Group, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import {useAppDispatch} from "./Store";
import {Form, setAppForm} from "./state";
import powerBackground from "./tuc_logo.gif";
import ausweis from "./energieausweis.png"
import {useDisclosure} from "@mantine/hooks";


export const UserInput = () => {
    const [active, setActive] = useState(0);

    const [openedEnergieausweis, handlersEnergieausweis] = useDisclosure(false);

    const dispatch = useAppDispatch()

    const form = useForm({
        initialValues: {
            energyType: 'Oil',
            ApartmentSize: 80,
            KwValue: '120',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                };
            }

            if (active === 1) {
                return {
                };
            }

            return {};
        },
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            console.log(current)
            if(current === 2){
                let formToDispatch : Form = {
                    energyType: form.getInputProps('energyType').value,
                    apartmentSize : form.getInputProps('ApartmentSize').value,
                    kwValue : form.getInputProps('KwValue').value,
                    kwToCo2Value: -1
                }
                dispatch(setAppForm(formToDispatch))
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


    const DrawerContent = () => {
        return <>
            <h4>Energieausweis</h4>
            <p>The energy performance certificate is a document that provides data on the energy efficiency and associated energy costs of a building. It aims to offer potential buyers and tenants information about the overall energy efficiency of the building, along with practical advice for improving it.</p>
            <Image src={ausweis}></Image>
            <p>Use the Primärenergieverbrauch value</p>
        </>
    }

    return (
        <div style={{background: "white", padding: "50px"}}>
            <Image src={powerBackground} style={{width: "200px",objectFit: "fill", zIndex: "-10", marginBottom: "50px"}}></Image>
            <Stepper active={active}>
                <Stepper.Step label="Energy Type" description="used for Calculations">
                    <Select label="Energy Type" {...form.getInputProps('energyType')} data={['Oil', 'Gas', 'Wood Pellets','LPG', 'Electric (GE)', 'Electric (EU)']}></Select>
                </Stepper.Step>

                <Stepper.Step label="Apartment Size" description="In Square Meters">
                    <NumberInput label="Apartment Size" placeholder="in Square meters" {...form.getInputProps('ApartmentSize')} />
                </Stepper.Step>

                <Stepper.Step label="KW Value" description="KW Value Per Square Meter Per Year">
                    <Slider style={{marginTop: "35px"}}
                        labelAlwaysOn={true}
                        label="KW Value"
                        color="blue"
                        min={0}
                        max={250}
                        marks={[
                            { value: 50, label: '50' },
                            { value: 100, label: '100' },
                            { value: 150, label: '150' },
                            { value: 200, label: '200' },
                            { value: 250, label: '250' },
                        ]}
                        {...form.getInputProps("KwValue")}
                    />
                    <Button style={{width: "160px", marginTop: "30px"}} onClick={handlersEnergieausweis.open}>Information</Button>
                    <Drawer opened={openedEnergieausweis} onClose={handlersEnergieausweis.close}>
                        <DrawerContent></DrawerContent>
                    </Drawer>
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.values, null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            <Group mt="xl">
                {active !== 0 && (
                    <Button variant="default" onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
            </Group>
        </div>
    );
}

