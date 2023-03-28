import { HtmlNode, HtmlNodeModel } from 'chartflow-editor-core';
import './style.css';

class HtmlCard extends HtmlNode {
  // 重写HtmlNode的setHtml，来控制html节点内容。
  setHtml(rootEl: any) {
    const cardEl = this.getCardEl();
    rootEl.innerHtml = '';
    if (rootEl.childNodes[0]) {
      rootEl.removeChild(rootEl.childNodes[0]);
    }
    rootEl.appendChild(cardEl);
  }
  getCardEl() {
    const { properties } = this.props.model;
    const el = document.createElement('div');
    el.className = 'html-card';
    el.ondblclick = () => {
      const { graphModel, model } = this.props;
      graphModel.eventCenter.emit('custom:button-click', model);
    };

    const header = document.createElement('div');
    header.className = 'html-card-header';
    header.innerText = properties.title;

    const body = document.createElement('div');
    body.className = 'html-card-body';
    body.innerText = properties.content;

    const footer = document.createElement('div');
    footer.className = 'html-card-footer';

    if (properties.answers) {
      properties.answers.forEach((answer: any) => {
        const label = document.createElement('div');
        label.innerText = answer.text;
        label.className = 'html-card-label';
        footer.appendChild(label);
      });
    }

    el.appendChild(header);
    el.appendChild(body);
    el.appendChild(footer);
    return el;
  }
}
class HtmlCardModel extends HtmlNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    // 禁止节点文本可以编辑
    this.text.editable = false;
    this.width = 240;
    this.isGroup = true;
    this.children = data.children;
    // 定义连接规则，只允许出口节点连接入口节点
    const rule = {
      message: '只允许出口节点连接入口节点',
      validate: (sourceNode: any, targetNode: any, sourceAnchor: any, targetAnchor: any) => {
        return (
          sourceAnchor.type === 'sourceAnchor' &&
          targetAnchor.type === 'targetAnchor'
        );
      },
    };
    this.sourceRules.push(rule);
  }
  setAttributes() {
    const {
      properties: { content },
    } = this;
    // 动态计算节点的高度
    const rowSize = Math.ceil(content.length / 20);
    this.height = 70 + rowSize * 18;
  }
  /**
   * 计算每个锚点的位置
   */
  getDefaultAnchor() {
    const { height, x, y, id, properties } = this;
    const anchorPositon = [];
    anchorPositon.push({
      x,
      y: y - height / 2,
      type: 'targetAnchor',
      id: `${id}_targetAnchor`,
    });
    if (properties.answers) {
      let preOffset = 5;
      properties.answers.forEach((answer: any) => {
        const text = answer.text;
        // 计算每个锚点的位置，锚点的位置一般相对节点中心点进行偏移
        const offsetX =
          preOffset + (this.getBytesLength(text) * 6 + 4) / 2 - this.width / 2;
        preOffset += this.getBytesLength(text) * 6 + 4 + 10;
        const offsetY = height / 2;
        anchorPositon.push({
          x: x + offsetX,
          y: y + offsetY,
          type: 'sourceAnchor',
          id: answer.id,
        });
      });
    }
    return anchorPositon;
  }
  getBytesLength(word: any) {
    if (!word) {
      return 0;
    }
    let totalLength = 0;
    for (let i = 0; i < word.length; i++) {
      const c = word.charCodeAt(i);
      if (word.match(/[A-Z]/)) {
        totalLength += 1.5;
      } else if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        totalLength += 1.2;
      } else {
        totalLength += 2;
      }
    }
    return totalLength;
  }
}

export default {
  type: 'html-card',
  view: HtmlCard,
  model: HtmlCardModel,
};
