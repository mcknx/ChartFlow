import { BaseNodeModel } from 'chartflow-editor-core';

type PointTuple = [number, number];

export type ExclusiveGatewayAttribute = BaseNodeModel & {
  points?: PointTuple[] & string;
};
