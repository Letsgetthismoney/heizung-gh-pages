import ReactSimplyCarousel from 'react-simply-carousel';
import React, {useState} from "react";
import {ForrestUi} from "./resultScreens/forrest";
import {useAppSelector} from "./Store";
import {selectApp} from "./state";
import {KlimaTarget} from "./resultScreens/KlimaTarget";
import {Compare} from "./resultScreens/Compare";

export const ReactSimplyCarouselExample = ({kwPerYear}: {kwPerYear:number}) =>  {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const state = useAppSelector(selectApp)

    return (
        <div>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        marginLeft: "25px",
                        background: 'white',
                        border: '1px solid lightgrey',
                        borderRadius: '50%',
                        color: 'lightgrey',
                        cursor: 'pointer',
                        fontSize: '25px',
                        height: 50,
                        lineHeight: 1,
                        textAlign: 'center',
                        width: 50,
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        alignSelf: 'center',
                        background: 'white',
                        border: '1px solid lightgrey',
                        borderRadius: '50%',
                        color: 'lightgrey',
                        cursor: 'pointer',
                        fontSize: '25px',
                        height: 50,
                        lineHeight: 1,
                        marginRight: "25px",
                        textAlign: 'center',
                        width: 50,
                    },
                    children: <span>{`<`}</span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                        minWidth: 968,
                    },
                ]}
                speed={400}
                easing="linear"
            >
                {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                <div style={{ width: 1000, height: 500, background: 'white' }}>
                    <KlimaTarget></KlimaTarget>

                </div>
                <div style={{ width: 1000, height: 500, }}>
                    <ForrestUi kwPerYear={kwPerYear} energyType={state.config!.energyType}></ForrestUi>
                </div>
                <div style={{ width: 1000, height: 500 }}>
                    <Compare></Compare>
                </div>
            </ReactSimplyCarousel>
        </div>
    )
}