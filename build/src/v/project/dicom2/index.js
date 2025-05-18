/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async () => {
  const scr = await v.script({
    type: "module",
    content: `
  import * as dicomjs from "/src/assets/dicom.ts/dicom.ts@1.0.3.js";
  window.dicomjs = dicomjs;`,
  });
  document.head.append(scr);
  let interval = setInterval(async () => {
    if (typeof dicomjs !== "undefined") {
      clearInterval(interval);
      console.log(1111, dicomjs);
      document.body.append((this.canvas = await v.canvas({})));
      document.body.append(
        (this.input = await v.input({
          type: "file",
          style: "display:none",
          onchange: () => {
            let file = this.input.files[0];
            let reader = new FileReader();
            reader.onload = async (e) => {
              const image = dicomjs.parseImage(new DataView(reader.result));
              const renderer = new dicomjs.Renderer(this.canvas);
              await renderer.render(image, 0);
            };
            reader.readAsArrayBuffer(file);
          },
        }))
      );
      document.body.append(
        v.button({
          content: "TEST",
          onclick: () => {
            this.input.click();
          },
        })
      );
    }
  }, 10);
};
