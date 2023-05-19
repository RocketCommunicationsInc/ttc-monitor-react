import {
  RuxAccordion,
  RuxAccordionItem,
  RuxTableRow,
  RuxTableCell,
  RuxTree,
  RuxTreeNode,
} from "@astrouxds/react";

type PassPlanMnemonic = {
  step: string;
  command: string;
  runLength?: string;
  subSteps?: PassPlanMnemonic[];
};

type PropTypes = {
  item: PassPlanMnemonic;
};
// type PassPlanMnemonicGroup = PassPlanMnemonic[];

const PassPlanItem = ({ item }: PropTypes) => {
  if (!item.subSteps)
    return (
      <RuxTableRow>
        <RuxTableCell>{item.step}</RuxTableCell>
        <RuxTableCell>{item.command}</RuxTableCell>
        {item.runLength ? <RuxTableCell>{item.runLength}</RuxTableCell> : null}
      </RuxTableRow>
    );
  else
    return (
      <RuxTableRow>
        <RuxTree>
          <RuxTreeNode>
            <RuxTableCell>{item.step}</RuxTableCell>
            <RuxTableCell>{item.command}</RuxTableCell>
            {item.runLength ? (
              <RuxTableCell>{item.runLength}</RuxTableCell>
            ) : null}
            {item.subSteps.map((subStep) => (
              <RuxTreeNode slot="node" key={subStep.step}>
                <RuxTableRow>
                  <RuxTableCell>{subStep.step}</RuxTableCell>
                  <RuxTableCell>{subStep.command}</RuxTableCell>
                  {subStep.runLength ? (
                    <RuxTableCell>{subStep.runLength}</RuxTableCell>
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
