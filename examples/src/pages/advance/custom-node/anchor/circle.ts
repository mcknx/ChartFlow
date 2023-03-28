import { CircleNode, CircleNodeModel } from 'chartflow-editor-core';

class Model extends CircleNodeModel {
  getDefaultAnchor() {
    return []
  }
}

class View extends CircleNode {
}

export const CircleAnchor = {
  type: 'circle:anchor',
  view: View,
  model: Model,
};
