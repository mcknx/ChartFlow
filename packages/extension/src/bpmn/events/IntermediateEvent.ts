import { CircleNode, CircleNodeModel, h } from 'chartflow-editor-core';
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
  getShape() {
    const { model } = this.props;
    const style = model.getNodeStyle();
    const { x, y, r, width, height } = model;
    const outCircle = super.getShape();
    return h(
      'g',
      {},
      outCircle,
      h(
        'svg',
        {
          x: x - width / 2 + 5,
          y: y - height / 2 + 5,
          width: 25,
          height: 25,
          viewBox: '0 0 24 24',
        },
        h('path', {
          fill: 'none',
          d: 'M0 0h24v24H0z',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M0 M8.56 3.69a9 9 0 0 0 -2.92 1.95',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M3.69 8.56a9 9 0 0 0 -.69 3.44',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M3.69 15.44a9 9 0 0 0 1.95 2.92',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M8.56 20.31a9 9 0 0 0 3.44 .69',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M15.44 20.31a9 9 0 0 0 2.92 -1.95',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M20.31 15.44a9 9 0 0 0 .69 -3.44',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M20.31 8.56a9 9 0 0 0 -1.95 -2.92',
        }),
        h('path', {
          stroke: style.stroke,
          d: 'M15.44 3.69a9 9 0 0 0 -3.44 -.69',
        }),
      ),
    );
  }
}

const IntermediateEvent = {
  type: 'bpmn:intermediateThrowEvent',
  view: IntermediateEventView,
  model: IntermediateEventModel,
};

export { IntermediateEventModel, IntermediateEventView };
export default IntermediateEvent;
