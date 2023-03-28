import { RectNodeModel } from 'chartflow-editor-core';
import { RectLabelNodeView } from './RectLabelNodeView';

const RectLabelNode = {
  pluginName: 'rectLabelNode',
  install(lf) {
    lf.register({
      type: 'rect-label',
      model: RectNodeModel,
      view: RectLabelNodeView,
    });
  },
};

export default RectLabelNode;

export { RectLabelNode };
