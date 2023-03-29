import { CircleNode, CircleNodeModel, h } from 'chartflow-editor-core';
import { getBpmnId } from '../getBpmnId';

class TimeStepEventModel extends CircleNodeModel {
  static extendKey = 'TimeStepEventModel';
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
    super(data, graphModel);
  }
  setAttributes(): void {
    this.r = 18;
  }
  // getConnectedSourceRules() {
  //   const rules = super.getConnectedSourceRules();
  //   const notAsSource = {
  //     message: '结束节点不能作为边的起点',
  //     validate: () => false,
  //   };
  //   rules.push(notAsSource);
  //   return rules;
  // }
}

class TimeStepEventView extends CircleNode {
  static extendKey = 'TimeStepEventView';
  getAnchorStyle() {
    return {
      visibility: 'hidden',
    };
  }
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
          viewBox: '0 0 1024 1024',
        },
        h('path', {
          fill: style.stroke,
          d: 'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z',
        }),
        h('path', {
          fill: style.stroke,
          d: 'M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z',
        }),
      ),
    );
  }
}

const TimeStepEvent = {
  type: 'bpmn:timerEventDefinition',
  view: TimeStepEventView,
  model: TimeStepEventModel,
};

export { TimeStepEventView, TimeStepEventModel };
export default TimeStepEvent;
