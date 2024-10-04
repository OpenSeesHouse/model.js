import { Project } from "./Project/Project.js";

(async () => {
  const theProj = new Project();
  await theProj.init(
    "proj-1",
    "http://127.0.0.1:8000/Examples/frame_2d_project",
    "test2d_Commands_1.tcl"
  );
  await theProj.importTcl();
  await theProj.addToScene();
  theProj.animate();
})();
