import React, { useState} from 'react';

import './App.css';
import {useDisclosure} from "@mantine/hooks";
import {
  Button,
  Image,
  Modal,
  Progress,
  rem, Select,
  Slider,
  TextInput, Timeline,
  UnstyledButton
} from "@mantine/core";
import forrest from '../src/forrest.png'
import stackWood from '../src/stackWood.png'
import co2 from '../src/co2Factory.png'
import img from '../src/img.png'
import tuLogo from '../src/logo200.gif'
import oilFactory from '../src/oilFactory.png'
import EnergieAusweis from '../src/Energieausweis.png'
import {Energietraeger, Energietraegers, Result} from "./Config";
import {Carousel} from '@mantine/carousel';
import powerBackground from '../src/powerBackground-2.jpeg'

import {SlCheck, SlEnergy, SlHome} from "react-icons/sl";
import {TbEngine} from "react-icons/tb";


function App() {
  const [active, setActive] = useState<number>(0)

  const [traeger, setTraeger] = useState<Energietraeger>()
  const [traegerValue, setTraegerValue] = useState<string | null>();

  const data : string[] = []
  Energietraegers.forEach(traeger => {
    data.push(traeger.name)
  })

  const [wohnungsflaeche, setWohnungsflaeche] = useState<number>();

  const [kwValue, setKwValue] = useState<number>(50)
  const [endValue, setEndValue] = useState(50);

  const [isVisible, setIsVisible] = useState(false);

  const fadeStyle = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  const marks = [
    { value: 50, label: '50Kw' },
    { value: 100, label: '100Kw' },
    { value: 150, label: '150Kw' },
    { value: 200, label: '200Kw' },
  ];

  const [opened, { open, close }] = useDisclosure(false);
  const calculateEnergyConsumption = () => {
    let energyConsumption = 0;
    let traeger : Energietraeger[] = Energietraegers
    energyConsumption = kwValue! * wohnungsflaeche!
    traeger.forEach(elememt => {
      if(traegerValue == elememt.name){
        setTraeger(elememt)
      }
    })
    open()
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      // Perform your desired action here
      setActive(2)
      console.log(`Enter or Tab key pressed: ${e.key}`);
    }
  };

  return (
      <div style={{display: "flex", width: "95vw", flexDirection: "column", alignItems: "flex-start", padding: "0px", height: "100vh"}}>
        <Image src={powerBackground} style={{position:"absolute", width: "100vw",objectFit: "fill", zIndex: "-10"}} height={"100vh"} ></Image>

        <div style={{display: "flex", alignItems: "center", gap: "5vw",justifyContent: "center", flexWrap: "wrap", width: "100vw", height: "80vh"}}>
          <div style={{minWidth: "250px",maxWidth: "95vw", marginTop: "50px",   padding: "25px 30px 30px 30px", backgroundColor: 'rgba(255,255,255)',  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <Image src={tuLogo}  alt="Random image"  style={{padding: "0px", marginBottom: "30px",width: "200px"}}/>
            <h2 style={{marginBottom: "35px"}}>How much energy <br />does your heater consume? </h2>

            <Timeline active={active} bulletSize={24} lineWidth={2}>
              <Timeline.Item bullet={<TbEngine size={12} />} title="Heater Type">
                {active >= 0 && <>
                  <Select style={{marginTop: "10px"}}
                      value={traegerValue} onChange={(event) => {setTraegerValue(event); setActive(1)}} data={data}  placeholder="Please Select"
                  />
                  {traegerValue == "Wood" &&
                    <Select style={{marginTop: "15px"}} data={["Eiche", "Buche", "Erle", "Nadelholz"]} placeholder={"Type of Wood"}></Select>
                  }
                </>



                }
              </Timeline.Item>


              <Timeline.Item bullet={<SlHome size={12} />} title="Living space">

                {active >= 1 &&
                    <TextInput onKeyDown={handleKeyPress}  style={{width: "100%"}} type={"number"} value={wohnungsflaeche} onChange={e => {setWohnungsflaeche(parseInt(e.target.value))}}>
                    </TextInput>
                }

              </Timeline.Item>

              <Timeline.Item title="Energy consumption of the house (Endenergieverbrauch)" bullet={<SlEnergy size={12} />} lineVariant="dashed">
                {active >= 2 &&
                    <Slider
                        value={kwValue} onChange={setKwValue} onChangeEnd={() => {setEndValue(kwValue); setActive(3)}}
                        defaultValue={40}
                        marks={marks}
                        labelTransition="fade"
                        max={250}
                        size={2}
                        style={{marginTop: "25px"}}
                        styles={(theme) => ({
                          track: {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1],
                          },
                          mark: {
                            width: rem(6),
                            height: rem(6),
                            borderRadius: rem(6),
                            transform: `translateX(-${rem(3)}) translateY(-${rem(2)})`,
                            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1],
                          },
                          markFilled: {
                            borderColor: theme.colors.blue[6],
                          },
                          markLabel: { fontSize: theme.fontSizes.xs, marginBottom: rem(5), marginTop: 0 },
                          thumb: {
                            height: rem(16),
                            width: rem(16),
                            backgroundColor: theme.white,
                            borderWidth: rem(1),
                            boxShadow: theme.shadows.sm,
                          },
                        })}
                    />
                }

              </Timeline.Item>

              <Timeline.Item title="Calculate" bullet={<SlCheck size={12} />}>
                {active >= 3 &&
                    <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
                      <Button variant="filled" onClick={() => { calculateEnergyConsumption()}}>Calculate</Button>
                    </div>

                }

              </Timeline.Item>
            </Timeline>



          </div>

        </div>



        <Modal
            opened={opened}
            onClose={close}
            fullScreen
            transitionProps={{ transition: 'fade', duration: 300 }}
            padding={"0px"}
            withCloseButton={false}
        >
          <div style={{width: "100vw", height: "100vh",display: "flex", flexDirection: "column"}}>
            <div style={{height: "20vh", paddingLeft: "5vw", paddingTop: "5vh"}}>
              <div>
                <UnstyledButton style={{borderBottom: "1px solid lightgrey"}} onClick={close}>Zurück zum Rechner</UnstyledButton>
              </div>
              <h4 style={{fontSize: "25px"}}>
                Deine Heizung verbraucht pro Jahr {kwValue! * wohnungsflaeche!} Kilowattstunden Energie
              </h4>
            </div>
            <Carousel
                maw={"100%"}
                mx="auto"
                withIndicators
                height={"80vh"}

            >
              {
                traeger?.results?.map((result: Result) => {
                  if(result === Result.ForrestToTakeCO2){
                    let co2menge = kwValue! * wohnungsflaeche! * 0.202
                    let humanYears = co2menge / 365 //human = 1kg co2 per day
                    return <Carousel.Slide>
                      <div style={{height: "100vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>


                        <div style={{marginLeft: "5vw"}}>
                          <h6 style={{fontSize: "25px", margin: "0px"}}></h6>
                          <h6 style={{fontSize: "25px", margin: "0px"}}>Das entspricht {parseInt(co2menge.toString())} Kg Co2</h6>
                          <h6 style={{fontSize: "25px", margin: "0px"}}>Ein Mensch bräuchte {parseInt(humanYears.toString())} Jahre um diese menge zu erzeugen</h6>


                        </div>

                        <Image  radius="md" src={co2} alt="Random image" style={{padding: "0px", marginLeft: "20vw", width: "80vw"}}/>
                      </div>
                    </Carousel.Slide>
                  }
                  if(result === Result.AmountOfGas){
                    let tnt = kwValue! * wohnungsflaeche! / 1162
                    let menge = kwValue! * wohnungsflaeche! / 10.55
                    return <Carousel.Slide>
                      <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>

                        <div style={{marginLeft: "5vw",  display: "flex", padding: "0px", flexDirection: "column",}}>
                          <h6 style={{fontSize: "25px", margin: "0px", padding: "0px"}}>Das entspricht einer Menge von {parseInt(menge.toString())} m^3 Erdgas</h6>

                          <h6 style={{fontSize: "25px", margin: "0px"}}>Eine {parseInt(tnt.toString())} Tonnen TNT Explosion setzt dieselbe Energie frei </h6>
                        </div>

                        <Image  radius="md" src={img}  alt="Random image" style={{padding: "0px", margin: "0px"}}/>
                      </div>
                    </Carousel.Slide>
                  }
                  if(result === Result.AmountOfOil){

                    let menge = kwValue! * wohnungsflaeche! / 9.8
                    let example = menge / 35 * 100 / 505

                    return <Carousel.Slide>
                      <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>

                        <div style={{marginLeft: "5vw",  display: "flex", padding: "0px", flexDirection: "column",}}>
                          <h6 style={{fontSize: "25px", margin: "0px", padding: "0px"}}>Das entspricht einer Menge von {parseInt(menge.toString())} Liter Erdöl</h6>
                          <h6 style={{fontSize: "25px", margin: "0px"}}>Ein Lkw könnte mit dieser Menge {parseInt(example.toString())} mal zwischen Berlin und München hin und her fahren</h6>
                        </div>

                        <Image  radius="md" src={oilFactory}  alt="Random image" style={{padding: "0px", margin: "0px"}}/>
                      </div>
                    </Carousel.Slide>
                  }
                  if(result === Result.AmountOfWood){

                    let menge = kwValue! * wohnungsflaeche! / 4 / 720 * 2.3

                    let hektar = kwValue! * wohnungsflaeche! / 4 / 720 / 7.2
                    return <Carousel.Slide>
                      <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>

                        <div style={{marginLeft: "5vw",  display: "flex", padding: "0px", flexDirection: "column",}}>
                          <h6 style={{fontSize: "25px", margin: "0px", padding: "0px"}}>Das entspricht einer Menge von {menge.toString().slice(0,4)} m^3 Schüttholz Eiche</h6>
                          <h6 style={{fontSize: "25px", margin: "0px"}}>Es braucht {parseInt(hektar.toString())} Hektar Wald um diese Holzmenge jedes Jahr zu erzeugen </h6>
                        </div>

                        <Image  radius="md" src={stackWood}  alt="Random image" style={{padding: "0px", margin: "0px"}}/>
                      </div>
                    </Carousel.Slide>
                  }
                  if(result === Result.CompareForrestSizes){
                    let menge = kwValue! * wohnungsflaeche! * 0.202 * 0.17 * 0.001
                    return <Carousel.Slide>
                      <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>

                        <div style={{marginLeft: "5vw",  display: "flex", padding: "0px", flexDirection: "column",marginRight: "5vw"}}>

                          <h6 style={{fontSize: "25px", margin: "0px", padding: "0px"}}>In Deutschland gibt es circa 11 Millionen Hektar Wald</h6>
                          <h6 style={{fontSize: "25px", margin: "0px"}}>Pro Bundesbürger stehen also 0.13 Hektar Wald zur Verfügung</h6>
                          <h6 style={{fontSize: "25px", margin: "0px"}}>Nur für Die Aufnahme des von deiner Heizung emmitierten Co2 alleine werden jedoch schon {menge.toString().slice(0, 4)} Hektar Wald benötigt</h6>

                        </div>

                        <Image  radius="md" src={forrest} alt="Random image" style={{padding: "0px", margin: "0px"}}/>
                        <div style={{position: "absolute", width: "80vw", margin: "10vw", bottom : "0px"}}>
                          <Progress
                              style={{width: "100%"}}
                              size={24}
                              sections={[
                                { value: 0.13 / menge * 100, color: 'green', label: 0.13.toString()  },
                                { value: 100, color: 'darkred', label: menge.toString().slice(0, 4) },

                              ]}
                          />
                        </div>

                      </div>
                    </Carousel.Slide>
                  }
                })
              }

            </Carousel>

          </div>


        </Modal>

      </div>
  );
}

export default App;

