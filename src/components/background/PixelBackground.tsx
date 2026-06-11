import React from "react";
import PixelSnow from "../PixelSnow";

const PixelBackground = () => {
  return (
    <div className="h-screen w-screen absolute">
      <PixelSnow
        color="#ffffff"
        flakeSize={0.009}
        minFlakeSize={1.25}
        pixelResolution={500}
        speed={0.3}
        density={0.15}
        direction={180}
        brightness={0.6}
        depthFade={7}
        farPlane={15}
        gamma={0.4545}
        variant="snowflake"
      ></PixelSnow>
    </div>
  );
};

export default PixelBackground;
