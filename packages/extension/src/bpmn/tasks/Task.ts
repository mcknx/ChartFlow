import { h, RectNode, RectNodeModel } from 'chartflow-editor-core';
import { getBpmnId } from '../getBpmnId';

class TaskModel extends RectNodeModel {
  static extendKey = 'TaskModel';
  constructor(data, graphModel) {
    if (!data.id) {
      data.id = `Activity_${getBpmnId()}`;
    }
    super(data, graphModel);
  }
}

class TaskView extends RectNode {
  static extendKey = 'TaskNode';
  getLabelShape() {
    const { model } = this.props;
    const { x, y, width, height } = model;
    const style = model.getNodeStyle();
    return h(
      'svg',
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: '0 0 24 24',
      },
      [
        h('path', {
          fill: 'none',
          d: 'M0 0h24v24H0z',
        }),
        h('path', {
          fill: style.stroke,
          d: 'M2 4v16h20V4H2zm18 14H4V6h16v12z',
        }),
      ],
    );
  }
  // getShape() {
  //   const { model } = this.props;
  //   const { x, y, width, height, radius } = model;
  //   const style = model.getNodeStyle();
  //   // todo: 将basic-shape对外暴露，在这里可以直接用。现在纯手写有点麻烦。
  //   return h('g', {}, [
  //     h('rect', {
  //       ...style,
  //       x: x - width / 2,
  //       y: y - height / 2,
  //       rx: radius,
  //       ry: radius,
  //       width,
  //       height,
  //     }),
  //     this.getLabelShape(),
  //   ]);
  // }
}

const Task = {
  type: 'bpmn:task',
  view: TaskView,
  model: TaskModel,
};

export { TaskView, TaskModel };
export default Task;
