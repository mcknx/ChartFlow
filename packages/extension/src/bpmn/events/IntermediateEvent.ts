import { CircleNode, CircleNodeModel } from 'chartflow-editor-core';
import { getBpmnId } from '../getBpmnId';

class IntermediateEventModel extends CircleNodeModel {
  static extendKey = 'IntermediateEventModel';
  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `Event_${getBpmnId()}`;
    }
    if (!data.text) {
      data.text = '';
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 40,
      };
    }
    // fix: 不能直接全部加，会导致下载后再次上传，位置错误。
    // data.text.y += 40;
    super(data, graphModel);
  }
  setAttributes(): void {
    this.r = 18;
  }
  // getConnectedTargetRules() {
  //   const rules = super.getConnectedSourceRules();
  //   const notAsSource = {
  //     message: '起始节点不能作为边的终点',
  //     validate: () => false,
  //   };
  //   rules.push(notAsSource);
  //   return rules;
  // }
}

class IntermediateEventView extends CircleNode {
  static extendKey = 'IntermediateEventNode';
}

const IntermediateEvent = {
  type: 'bpmn:intermediateThrowEvent',
  view: IntermediateEventView,
  model: IntermediateEventModel,
};

export { IntermediateEventModel, IntermediateEventView };
export default IntermediateEvent;
