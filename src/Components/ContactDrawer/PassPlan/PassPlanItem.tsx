import { RuxTree, RuxTreeNode } from "@astrouxds/react";
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
      <li>
        <RuxTree>
          <RuxTreeNode>
            <div className="rux-tree-content">
              <div>{item.step}</div>
              <div>{item.command}</div>
              {item.runLength ? <div>{item.runLength}</div> : null}
            </div>
          </RuxTreeNode>
        </RuxTree>
      </li>
    );
  else
    return (
      <li className="pass-plan-list">
        <RuxTree>
          <RuxTreeNode>
            <div className="rux-tree-content">
              <div>{item.step}</div>
              <div>{item.command}</div>
              {item.runLength ? <div>{item.runLength}</div> : null}
            </div>
            {item.subSteps.map((subStep) => (
              <RuxTreeNode slot="node" key={subStep.step}>
                <div className="rux-tree-content">
                  <div>{subStep.step}</div>
                  <div>{subStep.command}</div>
                  {subStep.runLength ? <div>{subStep.runLength}</div> : null}
                </div>
              </RuxTreeNode>
            ))}
          </RuxTreeNode>
        </RuxTree>
      </li>
    );
};

export default PassPlanItem;
