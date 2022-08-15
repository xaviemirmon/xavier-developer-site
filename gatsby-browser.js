import * as React from "react"
import Tina from './.tina/components/TinaDynamicProvider.js'

export const wrapRootElement = ({ element  }) => {
  return (
    <Tina>
      {element}
    </Tina>
  )
}

export default wrapRootElement
