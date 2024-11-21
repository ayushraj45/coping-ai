import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const OnboardTop = () => (
  <Svg
    width="100%"
    height='100%'

  >
 <G clipPath="url(#a)">
      <Path
        fill="#4FC4E7"
        d="M14.925-415.726a8.552 8.552 0 0 1 11.678-3.128l649.121 374.62a8.543 8.543 0 0 1 3.129 11.673L469.079 330.633c-2.684 4.647-9.808 1.879-8.647-3.36 28.409-128.251-79.494-245.646-209.739-228.188l-58.697 7.868a234.446 234.446 0 0 1-143.16-26.41A1279.82 1279.82 0 0 0-170.825-13.53l-34.191-10.995a4.295 4.295 0 0 1-2.405-6.238L14.925-415.726Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h430v308H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default OnboardTop
