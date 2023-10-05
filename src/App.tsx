import React, { useState} from 'react';

import './App.css';
import {useDisclosure} from "@mantine/hooks";
import {
  Button, Collapse, Drawer, Group,
  Image,
  Modal, NumberInput,
  Progress,
  rem, Select,
  Slider,
  TextInput, Timeline, Tooltip,
  UnstyledButton
} from "@mantine/core";
import forrest from '../src/forrest.png'
import stackWood from '../src/stackWood.png'
import co2 from '../src/co2Factory.png'
import img from '../src/img.png'
import tuLogo from '../src/logo200.gif'
import oilFactory from '../src/oilFactory.png'
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

  const [openedCalcAmountOil, handlersAmountOil] = useDisclosure(false);
  const [openedCalcForrestToTakeCo2, handlersForrestToTakeCo2] = useDisclosure(false);

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


  //Calcutlation Amount of Oil
  const [kwToDieselFactor, setKwToDieselFactor] = useState<number | "">(9.8)
  const [verbrauchLkw, setVerbrauchLkw] = useState<number | "">(35)
  const [distanceBM, setDistanceBM] = useState<number | "">(645)
  const [opendQuellenAmountOil, {toggle}] = useDisclosure(false)


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
            <h2 style={{marginBottom: "35px"}}>How much energy does your heater consume?</h2>

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

                        <h4 style={{fontSize: "25px"}}>
                          Deine Heizung verbraucht pro Jahr {kwValue! * wohnungsflaeche!} Kilowattstunden Energie
                        </h4>

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

                    let menge = kwValue! * wohnungsflaeche! / 10
                    let example = menge / 35 * 100 / 505

                    return <Carousel.Slide>
                      <div style={{height: "80vh", maxWidth: "100vw", display: "flex", padding: "0px", flexDirection: "column", justifyContent: "space-between"}}>

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
                          <Button style={{width: "160px", marginTop: "25px"}} onClick={handlersForrestToTakeCo2.open}>Calculation Basis</Button>
                          <Drawer opened={openedCalcForrestToTakeCo2} onClose={handlersForrestToTakeCo2.close} title="Authentication">
                            <h2>AmountForrestToTakeCo2Drawer</h2>
                          </Drawer>
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

