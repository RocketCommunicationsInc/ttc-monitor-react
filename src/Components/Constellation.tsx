import { useState } from "react"
import { RuxContainer, RuxSegmentedButton } from "@astrouxds/react"
import ConstellationList from "./ListHeader"
import ConstellationTimeline from "./ConstellationTimeline"
import { RuxSegmentedButtonCustomEvent } from "@astrouxds/astro-web-components/dist/types/components"

const Constellation = () => {
  const [content, setContent] = useState(<ConstellationList />)

  const handleButton = (e: RuxSegmentedButtonCustomEvent<string>) => {
    console.log(e.detail)
    if (e.detail === "List") {
      setContent(<ConstellationList />)
    } else { 
      setContent(<ConstellationTimeline />)
    }
  }

  return (
    <RuxContainer className="constellation">
      <div slot="header" style={{display: "flex"}}>
        Constellation
        <RuxSegmentedButton
          style={{ marginLeft: "auto"}}
          data=
          {[
            { label: "List"},
            { label: "Timeline"},
          ]}
          onRuxchange={handleButton}
        >
        </RuxSegmentedButton>
      </div>
      <div className="constellation-content">
        {content}
      </div>
    </RuxContainer>
  )
}

export default Constellation