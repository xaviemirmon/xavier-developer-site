import React from "react"
import TinaProvider from "./TinaProvider"
import { TinaEditProvider } from 'tinacms/dist/edit-state'

const DynamicTina = ({ children }) => {
  return (
    <>
      <TinaEditProvider editMode={<TinaProvider>{children}</TinaProvider>}>
        {children}
      </TinaEditProvider>
    </>
  )
}

export default DynamicTina
