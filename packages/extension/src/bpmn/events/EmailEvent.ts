import { CircleNode, CircleNodeModel, h } from 'chartflow-editor-core';
import { getBpmnId } from '../getBpmnId';

class EmailEventModel extends CircleNodeModel {
  static extendKey = 'EmailEventModel';
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

class EmailEventView extends CircleNode {
  static extendKey = 'EmailEventView';
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
          d: 'M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z',
        }),
      ),
    );
  }
}

const EmailEvent = {
  type: 'bpmn:messageEventDefinition',
  view: EmailEventView,
  model: EmailEventModel,
};

export { EmailEventView, EmailEventModel };
export default EmailEvent;
