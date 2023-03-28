# 控制面板 Control

### 启用

```ts
import LogicFlow from 'chartflow-editor-core';
import { Control } from 'chartflow-editor-extension';
import 'chartflow-editor-extension/lib/style/index.css'

LogicFlow.use(Control);
```

注册`Control`组件后，Logic Flow 会在画布右上方创建一个控制面板，如下所示

控制面板提供了常见的能力，放大缩小或者自适应画布的能力，同时也内置了 redo 和 undo 的功能，当然如果你不喜欢这样的 UI或功能，也可以基于`LogicFlow`提供的 [API](/api/logicFlowApi.html) 自己定义。

### 添加选项

```js
lf.extension.control.addItem({
  iconClass: "custom-minimap",
  title: "",
  text: "导航",
  onMouseEnter: (lf, ev) => {
    const position = lf.getPointByClient(ev.x, ev.y);
    lf.extension.miniMap.showMiniMap.show(
      position.domOverlayPosition.x - 120,
      position.domOverlayPosition.y + 35
    );
  },
  onClick: (lf, ev) => {
    const position = lf.getPointByClient(ev.x, ev.y);
    lf.extension.miniMap.show(
      position.domOverlayPosition.x - 120,
      position.domOverlayPosition.y + 35
    );
  }
});
```
### 删除选项

```js
// 删除缩小
lf.extension.control.removeItem('zoom-out');
// 删除放大
lf.extension.control.removeItem('zoom-in');
// 删除适应
lf.extension.control.removeItem('reset');
// 删除上一步
lf.extension.control.removeItem('undo');
// 删除下一步
lf.extension.control.removeItem('redo');
```

### 示例

<iframe src="https://codesandbox.io/embed/intelligent-matsumoto-t1dc5?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="intelligent-matsumoto-t1dc5"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>