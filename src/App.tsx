import React, {useRef, useState} from 'react';

import './App.css';
import {useDisclosure} from "@mantine/hooks";
import {Button, Image, Menu, Modal, Progress, TextInput, UnstyledButton} from "@mantine/core";
import forrest from '../src/forrest.png'
import stackWood from '../src/stackWood.png'
import co2 from '../src/co2Factory.png'
import img from '../src/img.png'
import tuLogo from '../src/tuc_logo.gif'
import oilFactory from '../src/oilFactory.png'
import {Energietraeger, Energietraegers, Result} from "./Config";
import Autoplay from 'embla-carousel-autoplay';
import {Carousel} from '@mantine/carousel';


function App() {
  const [heatingType, setHeatingType] = useState<Energietraeger>();
  const [wohnungsflaeche, setWohnungsflaeche] = useState<number>();
  const [kwValue, setKwValue] = useState<number>()

  const [isVisible, setIsVisible] = useState(false);
  const fadeStyle = {
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
  };
  const [opened, { open, close }] = useDisclosure(false);
  const autoplay = useRef(Autoplay({ delay: 15000 }));
  const calculateEnergyConsumption = () => {
    let energyConsumption = 0;
    let traeger : Energietraeger[] = Energietraegers
    energyConsumption = kwValue! * wohnungsflaeche!
    traeger.forEach(elememt => {
      if(heatingType!.name == elememt.name){
      }
    })
    open()
  };

  return (
      <div style={{display: "flex", width: "100vw", flexDirection: "column", alignItems: "center"}}>
        <h1>Wieviel Energie verbraucht deine Heizung? - einfach selbst berechnen</h1>

        <div style={{width: "500px", marginTop: "100px"}}>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-start", gap: "2.5vw", alignItems: "center"}}>

            <h6 style={{margin: "0px", fontSize: "16px"}}>Heizungstyp</h6>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button>Auswählen</Button>
              </Menu.Target>

              <Menu.Dropdown>

                {Energietraegers.map(traeger => {
                  return <Menu.Item onClick={() => setHeatingType(traeger)}>
                    {traeger.name}
                  </Menu.Item>
                })}
              </Menu.Dropdown>
            </Menu>


          </div>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-start", borderBottom: "1px solid lightgrey", marginTop: "1.25vh", paddingBottom: "1.25vh"}}>
            <TextInput style={{width: "100%"}} type={"text"} value={heatingType?.name}>
            </TextInput>
          </div>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-start", gap: "2.5vw", alignItems: "center", marginTop: "2.5vh"}}>
            <h6 style={{margin: "0px", fontSize: "16px"}}>Wohungsfläche in m^2</h6>
          </div>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-start", borderBottom: "1px solid lightgrey", marginTop: "1.25vh", paddingBottom: "1.25vh"}}>
            <TextInput style={{width: "100%"}} type={"number"} value={wohnungsflaeche} onChange={e => setWohnungsflaeche(parseInt(e.target.value))}>
            </TextInput>
          </div>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-start", gap: "2.5vw", alignItems: "center", marginTop: "2.5vh"}}>
            <h6 style={{margin: "0px", fontSize: "16px"}}>Energieverbrauch des Hauses (geringerer Kw/h wert auf der Skala im Eneergieausweis)</h6>
          </div>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-start", borderBottom: "1px solid lightgrey", marginTop: "1.25vh", paddingBottom: "1.25vh"}}>
            <TextInput  style={{width: "100%"}} type={"number"} value={kwValue} onChange={e => setKwValue(parseInt(e.target.value))}>
            </TextInput>
          </div>

          <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "2.5vh"}}>
            <Button variant="outline" onClick={() => { calculateEnergyConsumption()}}>Berechnen</Button>
          </div>

          <Image  radius="md" src={tuLogo}  alt="Random image" style={{padding: "0px", margin: "0px"}}/>

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
                plugins={[autoplay.current]}

            >
              {
                heatingType?.results.map(result => {
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
                        <div style={{position: "absolute", width: "80vw", margin: "10vw", top : "30vh"}}>
                          <Progress
                              style={{width: "100%"}}
                              size={24}
                              sections={[
                                { value: 0.13 / menge * 100, color: 'green', label: 0.13 + "Hektar",  },
                                { value: 100, color: 'darkred', label: menge.toString().slice(0, 4) + "Hektar" },

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

