import { cmndsFileType, Project } from './Project/Project';
import { _3dview } from './Graphics/_3dView';
import { workspace } from './workspace/workspace';
import { xView } from './Graphics/xView';
(async () => {
  const proj = new Project(
    'proj-1',
    'http://127.0.0.1:8000/Examples/frame_3d_project',
    'test3d_Commands.tcl',
    cmndsFileType.tcl,
  );
  await proj.importModel();

  const ws = new workspace('http://127.0.0.1:8000/Examples/frame_3d_project');
  await ws.setOptions();
  ws.projects.push(proj);

  //add canvases
  const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement;
  if (!canvas1)
    throw new Error("not a canvas")
  ws.canvases.push(canvas1);
  const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;
  if (!canvas2)
    throw new Error("not a canvas")
  ws.canvases.push(canvas2);

  //add views
  const view1:_3dview = new _3dview(canvas1, [ws.getScene(proj,0)])
  ws.views.push(view1);

  const view2:xView = new xView(canvas2, [ws.getScene(proj,0)])
  view2.setLook();
  ws.views.push(view2);

  ws.animate();
})();
