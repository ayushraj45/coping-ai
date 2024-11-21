import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const OnboardBottom = (props) => (
  <Svg
 
    width="100%"
    height={204}

    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d="M442.169 388.001a7 7 0 0 1-8.654 4.807l-541.784-154.833a6.998 6.998 0 0 1-4.807-8.654l83.535-292.305c1.102-3.857 6.762-3.173 6.914.835 3.675 96.97 101.342 161.787 192.124 127.503l98.009-37.013C354.505.787 449.397 15.73 523.717 68.688l7.604 5.419a.799.799 0 0 1 .305.87l-89.457 313.024Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={268.377}
        x2={162.623}
        y1={-54.66}
        y2={315.392}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#011C2D" />
        <Stop offset={1} stopColor="#035B93" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h430v204H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default OnboardBottom
