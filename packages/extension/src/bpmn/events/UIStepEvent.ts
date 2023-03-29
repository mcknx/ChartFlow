import { CircleNode, CircleNodeModel, h } from 'chartflow-editor-core';
import { getBpmnId } from '../getBpmnId';

class UIStepEventModel extends CircleNodeModel {
  static extendKey = 'UIStepEventModel';
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

class UIStepEventView extends CircleNode {
  static extendKey = 'UIStepEventView';
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
          viewBox: '0 0 16 16',
        },
        h('path', {
          fill: style.stroke,
          d: 'M15 6.5l-.47-.5H7V1.47L6.53 1H1.47L1 1.47v8.06l.47.47H4v4.53l.47.47h10.06l.47-.47V6.5zM2 9V3h4v6H2zm12 5H5v-4h1.53L7 9.53V8.013h7V14z',
        }),
      ),
    );
  }
}

const UIStepEvent = {
  type: 'bpmn:scriptTask',
  view: UIStepEventView,
  model: UIStepEventModel,
};

export { UIStepEventView, UIStepEventModel };
export default UIStepEvent;
