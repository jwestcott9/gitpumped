import React from "react";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";


function dinnerBanner (props) {
    return(
        <ParallaxProvider>
            <ParallaxBanner
            className="banner"
            layers={[
                {
                image:"http://blog.mycuistot.com/wp-content/uploads/2018/11/shutterstock_521741356-2.jpg",
                amount: 0.8,
                }
            ]}
            style={{
                height: "400px",
            }}
            >
             </ParallaxBanner>   

        </ParallaxProvider>
    )
}

export default dinnerBanner;