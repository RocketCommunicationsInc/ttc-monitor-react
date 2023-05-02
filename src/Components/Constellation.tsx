import React from 'react'
import { RuxContainer, RuxSegmentedButton } from "@astrouxds/react"

const Constellation = () => {
  return (
    <RuxContainer className="constellation">
      <div slot="header">
        <span>Constellation</span>
        <RuxSegmentedButton>
        </RuxSegmentedButton>
      </div>
        <div slot="footer">
      </div>
    </RuxContainer>
  )
}

export default Constellation