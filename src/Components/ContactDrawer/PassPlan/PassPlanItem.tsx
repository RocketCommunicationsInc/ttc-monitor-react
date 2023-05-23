import {
  RuxTableRow,
  RuxTableCell,
  RuxTree,
  RuxTreeNode,
} from "@astrouxds/react";
import "./PassPlan.css";

export type PassPlanMnemonic = {
  step: string;
  command: string;
  runLength?: string;
  subSteps?: PassPlanMnemonic[];
};

type PropTypes = {
  item: PassPlanMnemonic;
};

const PassPlanItem = ({ item }: PropTypes) => {
  if (!item.subSteps)
    return (
      <RuxTree>
        <RuxTreeNode>
          <RuxTableRow>
            <RuxTableCell className="t-cell t-cell-step">
              {item.step}
            </RuxTableCell>
            <RuxTableCell className="t-cell t-cell-command">
              {item.command}
            </RuxTableCell>
            {item.runLength ? (
              <RuxTableCell className="t-cell">{item.runLength}</RuxTableCell>
            ) : null}
          </RuxTableRow>
        </RuxTreeNode>
      </RuxTree>
    );
  else
    return (
      <RuxTableRow>
        <RuxTree>
          <RuxTreeNode>
            <RuxTableCell className="t-cell t-cell-step">
              {item.step}
            </RuxTableCell>
            <RuxTableCell className="t-cell t-cell-command">
              {item.command}
            </RuxTableCell>
            {item.runLength ? (
              <RuxTableCell className="t-cell">{item.runLength}</RuxTableCell>
            ) : null}
            {item.subSteps.map((subStep) => (
              <RuxTreeNode slot="node" key={subStep.step}>
                <RuxTableRow>
                  <RuxTableCell className="t-cell" style={{ width: "2rem" }}>
                    {subStep.step}
                  </RuxTableCell>
                  <RuxTableCell className="t-cell" style={{ width: "16rem" }}>
                    {subStep.command}
                  </RuxTableCell>
                  {subStep.runLength ? (
                    <RuxTableCell className="t-cell">
                      {subStep.runLength}
                    </RuxTableCell>
                  ) : null}
                </RuxTableRow>
              </RuxTreeNode>
            ))}
          </RuxTreeNode>
        </RuxTree>
      </RuxTableRow>
    );
};

export default PassPlanItem;
