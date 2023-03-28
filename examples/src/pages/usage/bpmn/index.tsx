import React, { useEffect, useState } from 'react';
import LogicFlow from '@logicflow/core';
import {
  BpmnElement,
  BpmnXmlAdapter,
  Snapshot,
  Control,
  Menu,
  SelectionSelect,
  toTurboData, 
  toLogicflowData,
  BpmnAdapter,
  NodeResize
} from '@logicflow/extension';
import BpmnPattern from './pattern';
import BpmnIo from './io';
import './index.css';
import { Button } from 'antd';
import 'antd/lib/button/style/index.css';
import '@logicflow/extension/lib/style/index.css';
import ExampleHeader from '../../../components/example-header';
import demoData from './demoData';
import HtmlCard from "./HtmlCard";
import { themeApprove, data } from './config';

const config = {
  // stopScrollGraph: true,
  // stopZoomGraph: true,
  metaKeyMultipleSelected: true,
  grid: {
    size: 10,
    type: 'mesh',
    config: {
      color: '#DCDCDC',  // 设置网格的颜色
    }
  },
  keyboard: {
    enabled: true,
  },
  snapline: true,
  style: themeApprove,
}

let lf: LogicFlow;
const BpmnExample = () => {
  const [rendered, setRendered] = useState(false);
  // const [lf, setLf] = useState<LogicFlow | null>(null);

  useEffect(() => {
    LogicFlow.use(BpmnElement);
    LogicFlow.use(BpmnXmlAdapter);
    LogicFlow.use(Snapshot);
    LogicFlow.use(Control);
    LogicFlow.use(Menu);
    LogicFlow.use(SelectionSelect);
    LogicFlow.use(BpmnAdapter);
    LogicFlow.use(NodeResize);

    const logicFlow = new LogicFlow({
      ...config,
      container: document.querySelector('#graph') as HTMLElement
    });

    logicFlow.register(HtmlCard);
    logicFlow.renderRawData(demoData);
    lf = logicFlow;
    setRendered(true);

    // return () => {
    //   logicFlow.destroy();
    // }
  }, []);

  const catTurboData = () => {
    const turboData = toTurboData(lf);
  }

  let tools;
  if (lf !== null && rendered) {
    tools = (
      <div>
        <BpmnPattern lf={lf} />
        <BpmnIo lf={lf} />
      </div>
    );
  }

  return (
    <>
      <ExampleHeader>
        <div>
          点击左下角下载 XML，将文件上传到
          <Button type="link" href="https://demo.bpmn.io/" target="_blank">BPMN Demo</Button>
          即可使用
          <Button onClick={catTurboData}>Convert to TurboGraph</Button>
        </div>
      </ExampleHeader>
      <div className="bpmn-example-container">
        <div id="graph" className="viewport"/>
        {tools}
      </div>
    </>
  )
}

export default BpmnExample;
