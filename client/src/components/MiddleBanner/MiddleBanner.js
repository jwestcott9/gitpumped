import React from "react";
import "./style.css";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";

function MiddleBanner (props) {
    return(
        <ParallaxProvider>
            
            <ParallaxBanner
            className="banner"
            
            layers={[
                {
                    image: "http://sites.psu.edu/siowfa15/wp-content/uploads/sites/29639/2015/09/bigstock-Young-lady-running-on-a-rural-44916691.jpg",
                    amount: 0.6,
                },
            ]}

            style={{
                height:"400px",
            }}
            ></ParallaxBanner>
        </ParallaxProvider>
    )
}
export default MiddleBanner;