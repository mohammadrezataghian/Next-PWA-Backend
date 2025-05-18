/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
({ primaryColor, secondaryColor, targetElement }) => {
  primaryColor = "#fff";
  // secondaryColor = "#222";
  v.util.bootstrap.load({ rtl: false, theme: "none", target: targetElement });
  v.style.load(v.css.scrollbars_css, targetElement);
  v.style.load(v.css.materialSymbolsOutlined_css, targetElement);
  (targetElement || document.head).append(
    v.meta({
      charset: "utf-8",
    }),
    v.meta({
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
      name: "viewport",
    })
  );
  return v.dom
    .loadScripts(
      ["/v/assets/dicom/dcmjs.js", "/v/assets/dicom/dcmjs-imaging.min.js"],
      () => {},
      targetElement
    )
    .then(async () => {
      const { DicomImage, WindowLevel, NativePixelDecoder } =
        window.dcmjsImaging;
      const { StandardColorPalette } = window.dcmjsImaging.constants;
      const initOpts = {
        webAssemblyModulePathOrUrl: "/v/assets/dicom/native-pixel-decoder.wasm",
        logNativeDecodersMessages: false,
      };
      NativePixelDecoder.initializeAsync(initOpts);
      const BaseVertexShader = `
        attribute vec2 position;
        varying vec2 texCoords;
        void main() {
            texCoords = (position + 1.0) / 2.0;
            texCoords.y = 1.0 - texCoords.y;
            gl_Position = vec4(position, 0, 1.0);
        }`;
      const BaseFragmentShader = `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D textureSampler;
        void main() {
            vec4 color = texture2D(textureSampler, texCoords);
            gl_FragColor = color;
        }`;
      const isWebGLAvailable = () => {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return gl instanceof WebGLRenderingContext;
      };
      const useWebGl = false; //isWebGLAvailable();
      locals.counter = 0;
      locals.archive = {};
      locals.loadedFiles = {};
      locals.pointer = {
        windowing: 0,
        x: 0,
        y: 0,
        level: 0,
        count: 0,
        tx1: 0,
        ty1: 0,
        tx2: 0,
        ty2: 0,
        pinch: false,
      };
      locals.toolName = "none";
      locals.linked = true;
      const onPointerMove = (e) => {
        if (locals.pointer.count === 1 && locals.selectedBox?.canvasContainer) {
          if (locals.toolName === "none" && locals.selectedBox?.lines) {
            let rect = locals.selectedBox.overlayCanvas.getBoundingClientRect();
            let xp = e.clientX - rect.left;
            let yp = e.clientY - rect.top;
            let line;
            let dmin = 6;
            for (l of locals.selectedBox?.lines?.filter(
              (l) =>
                xp >= Math.min(l.x1, l.x2) - dmin &&
                xp <= Math.max(l.x1, l.x2) + dmin &&
                yp >= Math.min(l.y1, l.y2) - dmin &&
                yp <= Math.max(l.y1, l.y2) + dmin
            )) {
              let dx1 = xp - l.x1;
              let dy1 = yp - l.y1;
              let dx2 = l.x2 - l.x1;
              let dy2 = l.y2 - l.y1;
              l.d =
                Math.abs(dx1 * dy2 - dy1 * dx2) /
                Math.sqrt(dx2 * dx2 + dy2 * dy2);
              if (l.d < dmin) {
                line = l;
                dmin = l.d;
              }
            }
            if (locals.selectedBox.hoverLine !== line) {
              locals.selectedBox.hoverLine = line;
              updateOverlays(locals.selectedBox);
            }
          }
          if (locals.pointer.windowing) {
            e.preventDefault();
            const diffX = e.clientX - locals.pointer.x;
            const diffY = e.clientY - locals.pointer.y;
            locals.pointer.x = e.clientX;
            locals.pointer.y = e.clientY;
            if (locals.toolName === "cine") {
              if (
                locals.selectedBox.target &&
                locals.selectedBox.target.getNumberOfFrames() > 1
              ) {
                const diff = Math.abs(diffX) > Math.abs(diffY) ? diffX : diffY;
                const next =
                  Math.max(1, 0 | Math.abs(diff / 5)) * Math.sign(diff);
                if (
                  locals.selectedBox.renderOptions.frameNumber + next <=
                    locals.selectedBox.target.getNumberOfFrames() - 1 &&
                  locals.selectedBox.renderOptions.frameNumber + next >= 0
                ) {
                  locals.selectedBox.renderOptions.frameNumber += next;
                  locals.selectedBox.renderOptions.frame =
                    locals.selectedBox.renderOptions.frameNumber;
                  locals.selectedBox.forceUpdateOnScroll = true;
                  locals.selectedBox.range.scrollTop =
                    (locals.selectedBox.renderOptions.frameNumber *
                      (locals.selectedBox.range.scrollHeight -
                        locals.selectedBox.range.clientHeight)) /
                    (locals.selectedBox.target.getNumberOfFrames() - 1);
                }
              }
            } else if (locals.toolName === "wwwc") {
              if (locals.selectedBox.renderOptions.windowLevel) {
                let ww =
                  locals.selectedBox.renderOptions.windowLevel.getWindow();
                let wl =
                  locals.selectedBox.renderOptions.windowLevel.getLevel();
                if (ww + locals.selectedBox.ww * 0.001 * diffX <= 1) {
                  return;
                }
                ww = Math.round(ww + locals.selectedBox.ww * 0.001 * diffX);
                wl = Math.round(wl - locals.selectedBox.ww * 0.001 * diffY);
                locals.selectedBox.renderOptions.windowLevel.setWindow(ww);
                locals.selectedBox.renderOptions.windowLevel.setLevel(wl);
                if (!locals.selectedBox.renderingResult.windowLevel) {
                  if (wl >= locals.selectedBox.wl) {
                    locals.selectedBox.contrast =
                      ((locals.selectedBox.ww / locals.selectedBox.wl) * wl) /
                      ww;
                    locals.selectedBox.brightness =
                      locals.selectedBox.ww /
                      (ww * locals.selectedBox.contrast);
                    locals.selectedBox.bcOrder = true;
                  } else {
                    locals.selectedBox.brightness =
                      1 +
                      ((locals.selectedBox.ww / locals.selectedBox.wl) *
                        (locals.selectedBox.wl - wl)) /
                        ww;
                    locals.selectedBox.contrast =
                      locals.selectedBox.ww /
                      (ww * locals.selectedBox.brightness);
                    locals.selectedBox.bcOrder = false;
                  }
                  updateFilters(locals.selectedBox);
                } else updateFrame(locals.selectedBox);
              }
            } else if (locals.toolName === "zoom") {
              let s = locals.selectedBox.scale;
              let bs = locals.selectedBox.baseScale;
              let cs = -diffY * 0.01;
              let sc = Math.max(0.1, Math.min(10, s * (1 + cs)));
              cs = sc / s - 1;
              let rect =
                locals.selectedBox.canvasContainer.getBoundingClientRect();
              let xc = (rect.left + rect.right) * 0.5;
              let yc = (rect.top + rect.bottom) * 0.5;
              let xo = (xc - locals.pointer.origin.clientX) * cs;
              let yo = (yc - locals.pointer.origin.clientY) * cs;
              locals.selectedBox.scale = s * (1 + cs);
              locals.selectedBox.canvasContainer.style.scale = (
                locals.selectedBox.scale * bs
              ).toFixed(3);
              locals.selectedBox.offsetX += xo;
              locals.selectedBox.offsetY += yo;
              locals.selectedBox.canvasContainer.style.left =
                locals.selectedBox.offsetX.toFixed(1) + "px";
              locals.selectedBox.canvasContainer.style.top =
                locals.selectedBox.offsetY.toFixed(1) + "px";
              updateFrame(locals.selectedBox);
            } else if (
              locals.toolName === "pan" ||
              (app.settings.mobile && locals.toolName === "none")
            ) {
              locals.selectedBox.offsetX += diffX;
              locals.selectedBox.offsetY += diffY;
              locals.selectedBox.canvasContainer.style.left =
                locals.selectedBox.offsetX.toFixed(1) + "px";
              locals.selectedBox.canvasContainer.style.top =
                locals.selectedBox.offsetY.toFixed(1) + "px";
              updateFrame(locals.selectedBox);
            } else if (locals.toolName.startsWith("measure_")) {
              let { x, y } = calculateTransforms(
                {
                  x: e.clientX,
                  y: e.clientY,
                },
                locals.selectedBox
              );
              if (locals.pointer.windowing === 1) {
                let measure = {
                  type: locals.toolName,
                  frame: locals.linked
                    ? locals.selectedBox.renderOptions.frameNumber
                    : undefined,
                  points: [
                    {
                      x: locals.pointer.origin.x,
                      y: locals.pointer.origin.y,
                    },
                    { x: x, y: y },
                  ],
                };
                locals.selectedBox.measurements.push(measure);
                locals.pointer.windowing = 2;
              } else if (locals.selectedBox.measurements.length) {
                let measure =
                  locals.selectedBox.measurements[
                    locals.selectedBox.measurements.length - 1
                  ];
                measure.points[
                  Math.min(
                    locals.toolName === "measure_length" ? 1 : 2,
                    locals.pointer.windowing - 1
                  )
                ] = {
                  x: x,
                  y: y,
                };
              }
              updateOverlays(locals.selectedBox);
            }
          }
        }
      };
      document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
      document.addEventListener("pointermove", (e) => onPointerMove(e));
      document.addEventListener("pointerup", (e) => {
        if (locals.pointer.windowing) {
          let dx = e.clientX - locals.pointer.origin.clientX;
          let dy = e.clientY - locals.pointer.origin.clientY;
          let d2 = dx * dx + dy * dy;
          if (locals.toolName.startsWith("measure_")) {
            if (locals.toolName === "measure_length") {
              if (
                (d2 > 9 && locals.pointer.windowing === 2) ||
                locals.pointer.windowing > 2
              )
                locals.pointer.windowing = 0;
            } else if (
              (d2 > 9 && locals.pointer.windowing === 3) ||
              locals.pointer.windowing > 3
            )
              locals.pointer.windowing = 0;
            else if (d2 > 9) locals.pointer.windowing++;
          } else locals.pointer.windowing = 0;
        }
      });
      const calculateTransforms = (point, box) => {
        if (box.canvasContainer) {
          let rect = box.canvasElement.getBoundingClientRect();
          let c = {
            x: (rect.left + rect.right) * 0.5,
            y: (rect.top + rect.bottom) * 0.5,
          };
          let x = point.x - c.x;
          let y = point.y - c.y;
          for (let t of box.transforms) {
            if (t === "flip-h") x = -x;
            else if (t === "flip-v") y = -y;
            else {
              let sin = Math.sin((-t * Math.PI) / 180);
              let cos = Math.cos((-t * Math.PI) / 180);
              let _x = x;
              x = _x * cos - y * sin;
              y = _x * sin + y * cos;
            }
          }
          let s = box.scale * box.baseScale;
          return {
            x: x / (s * box.canvasElement.offsetWidth),
            y: y / (s * box.canvasElement.offsetHeight),
          };
        } else return { x: 0, y: 0 };
      };
      const renderFrame = (opts) => {
        //console.log(opts);
        if (opts.imageBitmap) {
          opts.canvasElement.width = opts.imageBitmap.width;
          opts.canvasElement.height = opts.imageBitmap.height;
          let ctx = opts.canvasElement.getContext("2d");
          ctx.drawImage(opts.imageBitmap, 0, 0);
          return { frame: 0 };
        } else {
          opts.canvasElement.width = 0;
          opts.canvasElement.height = 0;
          try {
            opts.image.renderingResult ||= [];
            opts.image.renderedPixels ||= [];
            let wwwc = `${opts.windowLevel?.getWindow()},${opts.windowLevel?.getLevel()}`;
            if (opts.image.renderingResult[opts.frame]?.wwwc !== wwwc) {
              opts.image.renderingResult[opts.frame] = {
                wwwc: wwwc,
                result: opts.image.render({
                  frame: opts.frame,
                  windowLevel: opts.windowLevel,
                  renderOverlays: false,
                  calculateHistograms: false,
                  //colorPalette: StandardColorPalette.Grayscale,
                }),
              };
              opts.image.renderedPixels[opts.frame] = new Uint8Array(
                opts.image.renderingResult[opts.frame].result.pixels
              );
            }
            const renderingResult =
              opts.image.renderingResult[opts.frame].result;
            const renderedPixels = opts.image.renderedPixels[opts.frame];
            opts.canvasElement.width = renderingResult.width;
            opts.canvasElement.height = renderingResult.height;
            if (opts.useWebGl) {
              const gl = opts.canvasElement.getContext("webgl");
              gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
              gl.clearColor(1.0, 1.0, 1.0, 1.0);
              gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
              const vertexShader = gl.createShader(gl.VERTEX_SHADER);
              gl.shaderSource(vertexShader, BaseVertexShader);
              gl.compileShader(vertexShader);
              if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                throw new Error(
                  "Error compiling vertex shader",
                  gl.getShaderInfoLog(vertexShader)
                );
              }
              const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
              gl.shaderSource(fragmentShader, BaseFragmentShader);
              gl.compileShader(fragmentShader);
              if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
                throw new Error(
                  "Error compiling fragment shader",
                  gl.getShaderInfoLog(fragmentShader)
                );
              }
              const program = gl.createProgram();
              gl.attachShader(program, vertexShader);
              gl.attachShader(program, fragmentShader);
              gl.linkProgram(program);
              if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(
                  "Error linking program",
                  gl.getProgramInfoLog(program)
                );
              }
              gl.validateProgram(program);
              if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                throw new Error(
                  "Error validating program",
                  gl.getProgramInfoLog(program)
                );
              }
              gl.useProgram(program);
              gl.deleteShader(vertexShader);
              gl.deleteShader(fragmentShader);
              const vertices = new Float32Array([
                -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1,
              ]);
              const vertexBuffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
              gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
              const positionLocation = gl.getAttribLocation(
                program,
                "position"
              );
              gl.vertexAttribPointer(
                positionLocation,
                2,
                gl.FLOAT,
                false,
                0,
                0
              );
              gl.enableVertexAttribArray(positionLocation);
              const texture = gl.createTexture();
              gl.activeTexture(gl.TEXTURE0);
              gl.bindTexture(gl.TEXTURE_2D, texture);
              gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                renderingResult.width,
                renderingResult.height,
                0,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                renderedPixels
              );
              gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_S,
                gl.CLAMP_TO_EDGE
              );
              gl.texParameteri(
                gl.TEXTURE_2D,
                gl.TEXTURE_WRAP_T,
                gl.CLAMP_TO_EDGE
              );
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
              gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
              gl.drawArrays(gl.TRIANGLES, 0, 6);
            } else {
              const ctx = opts.canvasElement.getContext("2d");
              ctx.clearRect(
                0,
                0,
                opts.canvasElement.width,
                opts.canvasElement.height
              );
              if (!opts.image.renderingResult[opts.frame]?.imageDate) {
                opts.image.renderingResult[opts.frame].imageData =
                  ctx.createImageData(
                    renderingResult.width,
                    renderingResult.height
                  );
                const canvasPixels =
                  opts.image.renderingResult[opts.frame].imageData.data;
                for (
                  let i = 0;
                  i < 4 * renderingResult.width * renderingResult.height;
                  i++
                ) {
                  canvasPixels[i] = renderedPixels[i];
                }
              }
              ctx.putImageData(
                opts.image.renderingResult[opts.frame].imageData,
                0,
                0
              );
            }
            return renderingResult;
          } catch (err) {
            console.log(err, opts);
          }
        }
      };
      const updateFrame = (box) =>
        new Promise((resolve) => {
          if (box.busyRenderingFrame) box.needsFrameRefresh = true;
          else {
            box.busyRenderingFrame = true;
            requestAnimationFrame(() => {
              box.target.updateRenderOptions(box.renderOptions);
              box.renderingResult = renderFrame(box.renderOptions);
              updateOverlays(box);
              box.renderOptions.frame = box.renderingResult.frame;
              box.renderOptions.windowLevel =
                box.renderingResult.windowLevel ??
                box.renderOptions.windowLevel ??
                new WindowLevel(box.ww, box.wl);
              box.update();
              box.busyRenderingFrame = false;
              if (box.needsFrameRefresh) {
                box.needsFrameRefresh = false;
                updateFrame(box).then(resolve);
              } else resolve();
            });
          }
        });
      const selectImage = async (fid, box) => {
        box ||= locals.selectedBox;
        if (!box) {
          box = locals.boxes?.find((b) => !b.target);
          if (!box) {
            locals.boxes.push((box = newBox()));
            rearrangeBoxes();
          }
        }
        box.then(async () => {
          let target = locals.loadedFiles[fid];
          box.target = target;
          box.frameInterval = 1000 / (target.FrameTime || 33);
          box.offsetX = box.offsetY = 0;
          box.scale = 1;
          box.baseScale = 1;
          box.transforms = [];
          box.measurements = [];
          box.ww = target.image?.WindowWidth ?? 256;
          box.wl = target.image?.WindowCenter ?? 128;
          box.contrast = 1;
          box.brightness = 1;
          box.inverted = false;
          locals.navbar.invert.checked = box.inverted;
          let newCanvasContainer = await v.project.dicom.canvas({
            box,
            pointer: locals.pointer,
            updateFrame,
          });
          box.canvasElement = newCanvasContainer.canvasElement;
          if (box.canvasContainer)
            box.canvasContainer.replaceWith(newCanvasContainer);
          else box.container.replaceChildren(newCanvasContainer);
          box.canvasContainer = newCanvasContainer;
          if (box.range.scrollTop !== 0) {
            box.preventUpdateOnScroll = true;
            box.range.scrollTop = 0;
          }
          if (target.imageBitmap)
            box.renderOptions = {
              imageBitmap: target.imageBitmap,
              canvasElement: box.canvasElement,
              frame: 0,
              frameNumber: 0,
              windowLevel: undefined,
            };
          else
            box.renderOptions = {
              image: target.image,
              canvasElement: box.canvasElement,
              frame: 0,
              frameNumber: 0,
              windowLevel: undefined,
              useWebGl,
            };
          selectBox(box);
          await updateFrame(box);
          locals.navbar.enable(box);
          box.update();
          updateTransforms(box);
          rescaleCanvas(box);
        });
      };
      const resetImage = () => {
        selectImage(locals.selectedBox.target.fid, locals.selectedBox);
      };
      const rescaleCanvas = (box) => {
        if (box.target && box.canvasContainer) {
          box.baseScale = Math.min(
            box.result.clientWidth / box.canvasElement.width,
            box.result.clientHeight / box.canvasElement.height
          );
          box.canvasContainer.style.scale = (box.scale * box.baseScale).toFixed(
            3
          );
          updateFrame(box);
        }
      };
      const selectBox = (box) => {
        if (locals.selectedBox)
          locals.selectedBox.result.classList.remove("border-white");
        box.result.classList.add("border-white");
        locals.selectedBox = box;
        if (box.target) locals.navbar.enable(box);
        else locals.navbar.disable(box);
        locals.sidebar.select(box.target?.fid);
      };
      const loadFileAlt = (source) =>
        new Promise((resolve) => {
          const execute = (prog, args) => {
            var exit_orig = Module.exit;
            var exitCode;
            Module.exit = function (status) {
              exitCode = status;
              exit_orig(status);
            };
            Module.callMain([prog].concat(args));
            Module.exit = exit_orig;
            return exitCode;
          };
          var uploadedFilePath = "/uploadedfile.dcm";
          FS.writeFile(uploadedFilePath, new Int8Array(source), {
            encoding: "binary",
          });
          var xmlFilePath = "convertedImage.xml";
          execute("dcm2xml", [
            "--verbose",
            "--native-format",
            uploadedFilePath,
            xmlFilePath,
          ]);
          var xml = FS.readFile(xmlFilePath, { encoding: "utf8" });
          var header = new DOMParser().parseFromString(xml, "text/xml");
          console.log(header);
          const getElements = (node) => {
            let tag = node.tagName;
            let vr = node.getAttribute("vr");
            let keyword = node.getAttribute("keyword");
            let value = [...node.children]
              .filter((c) => c.tagName === "Value")
              .sort(
                (a, b) =>
                  Number(a.getAttribute("number")) -
                  Number(b.getAttribute("number"))
              )
              .map((v) => v.textContent);
            if (vr && vr.match(/[IDU]S|FD/g))
              value = value.map((v) => Number(v));
            if (value.length === 0) value = undefined;
            else if (value.length === 1) value = value[0];
            value ||= node.textContent;
            let result = { tag, vr, keyword, value };
            for (let child of node.children)
              if (child.tagName !== "Value") {
                let key =
                  child.tagName === "DicomAttribute"
                    ? child.getAttribute("keyword")
                    : child.tagName;
                if (result[key]) {
                  if (!Array.isArray(result[key])) result[key] = [result[key]];
                  result[key].push(getElements(child));
                } else result[key] = getElements(child);
              }
            return result;
          };
          const image = {
            elements: getElements(
              header.getElementsByTagName("NativeDicomModel")[0]
            ),
          };
          console.log(image);
          const samplesPerPixel = image.elements.SamplesPerPixel.value || 1;
          var imageFilePath = "convertedImage";
          execute("dcm2pnm", [
            "--verbose",
            "--histogram-window",
            "2",
            "--frame",
            "1",
            "--write-raw-pnm",
            uploadedFilePath,
            imageFilePath,
          ]);
          var stat = FS.stat(imageFilePath);
          var stream = FS.open(imageFilePath);
          var pnmBuffer = new Uint8Array(stat.size);
          FS.read(stream, pnmBuffer, 0, stat.size);
          FS.close(stream);
          var widthString = "";
          var heightString = "";
          var passedSpace = false;
          var offset;
          for (offset = 3; offset < stat.size; offset++) {
            if (pnmBuffer[offset] == 10) {
              break;
            }
            if (pnmBuffer[offset] == 32) {
              passedSpace = true;
              continue;
            }
            if (passedSpace) {
              heightString += String(pnmBuffer[offset] - 48);
            } else {
              widthString += String(pnmBuffer[offset] - 48);
            }
          }
          var canvasWidth = Number(widthString);
          var canvasHeight = Number(heightString);
          var canvas = new OffscreenCanvas(canvasWidth, canvasHeight);
          var ctx = canvas.getContext("2d");
          var imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
          var data = imageData.data;
          var offset = stat.size - canvasHeight * canvasWidth * samplesPerPixel;
          if (samplesPerPixel === 1)
            for (var y = 0; y < canvasHeight; ++y) {
              for (var x = 0; x < canvasWidth; ++x) {
                var index = (y * canvasWidth + x) * 4;
                var value =
                  pnmBuffer[offset + (x + y * canvasWidth) * samplesPerPixel];
                data[index] = value; // red
                data[++index] = value; // green
                data[++index] = value; // blue
                data[++index] = 255; // alpha
              }
            }
          else if (samplesPerPixel === 3)
            for (var y = 0; y < canvasHeight; ++y) {
              for (var x = 0; x < canvasWidth; ++x) {
                var index = (y * canvasWidth + x) * 4;
                data[index] =
                  pnmBuffer[offset + (x + y * canvasWidth) * samplesPerPixel]; // red
                data[++index] =
                  pnmBuffer[
                    offset + 1 + (x + y * canvasWidth) * samplesPerPixel
                  ]; // green
                data[++index] =
                  pnmBuffer[
                    offset + 2 + (x + y * canvasWidth) * samplesPerPixel
                  ]; // blue
                data[++index] = 255; // alpha
              }
            }
          ctx.putImageData(imageData, 0, 0);
          resolve({
            header,
            image,
            imageBitmap: canvas.transferToImageBitmap(),
          });
        });
      const loadFile = (file) =>
        new Promise(async (resolve) => {
          let target = {
            file,
            fid: `${file.name} - ${file.size} - ${file.lastModified} - ${file.type}`,
          };
          target.getNumberOfFrames = () =>
            Math.max(
              target.image?.getNumberOfFrames?.() ?? 1,
              locals.archive[target.sid][target.rid]?.length ?? 1
            );
          target.updateRenderOptions = (opts) => {
            if (locals.archive[target.sid][target.rid]?.length > 1) {
              opts.image =
                locals.archive[target.sid][target.rid][opts.frameNumber].image;
              opts.imageBitmap =
                locals.archive[target.sid][target.rid][
                  opts.frameNumber
                ].imageBitmap;
              opts.frame = 0;
            }
          };
          if (target.fid in locals.loadedFiles) {
            resolve(locals.loadedFiles[target.fid]);
          } else {
            if (file.fromServer)
              file.chunks = await fetch("/instance/read-file", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ file: file.name, type: file.type }),
              }).then(
                (result) =>
                  new Promise((resolve) => {
                    const reader = result.body.getReader();
                    const chunks = [];
                    const pump = () => {
                      reader.read().then(({ done, value }) => {
                        if (value) chunks.push(value);
                        if (done) resolve(chunks);
                        else pump();
                      });
                    };
                    pump();
                  })
              );
            locals.loadedFiles[target.fid] = target;
            if (file.type.startsWith("image/")) {
              target.sid = `-image-sid-${Date.now() + locals.counter++}`;
              target.rid = 1;
              target.PatientName = file.fromServer
                ? file.name.substring(
                    file.name.replace(/\\/g, "/").lastIndexOf("/") + 1
                  )
                : file.name;
              target.imageBitmap = await createImageBitmap(
                file.chunks ? new Blob(file.chunks, { type: file.type }) : file
              );
              locals.archive[target.sid] = { ["0"]: [target] };
              if (Object.keys(locals.archive).length)
                locals.sidebar.reloadList(
                  locals.archive,
                  renderFrame,
                  selectImage,
                  locals.boxes?.find((b) => !b.target),
                  locals.boxes
                );
              resolve(target);
            } else {
              const loadDicomImage = (source) => {
                target.image = new DicomImage(source);
                //console.log(target.image);
                target.image.PixelSpacing ||= target.image.elements
                  ?.PixelSpacing || [
                  target.image.elements?.SequenceOfUltrasoundRegions?.[0]
                    .PhysicalDeltaX * 10,
                  target.image.elements?.SequenceOfUltrasoundRegions?.[0]
                    .PhysicalDeltaY * 10,
                ];
                target.image.WindowWidth ||=
                  target.image.elements.WindowWidth?.[0] ||
                  target.image.elements.WindowWidth ||
                  256;
                target.image.WindowCenter ||=
                  target.image.elements.WindowCenter?.[0] ||
                  target.image.elements.WindowCenter ||
                  128;
                target.PatientID = target.image.elements?.PatientID;
                target.PatientName = Object.values(
                  target.image.elements?.PatientName?.map(
                    (p) => p.Alphabetic || ""
                  ) || []
                ).join(" ");
                target.InstanceNumber = target.image.elements?.InstanceNumber;
                target.StudyID = target.image.elements?.StudyID;
                target.StudyInstanceUID =
                  target.image.elements?.StudyInstanceUID;
                target.StudyDescription =
                  target.image.elements?.StudyDescription;
                target.SeriesInstanceUID =
                  target.image.elements?.SeriesInstanceUID;
                target.SeriesDescription =
                  target.image.elements?.SeriesDescription;
                target.SeriesNumber = target.image.elements?.SeriesNumber;
                target.PatientBirthDate =
                  target.image.elements?.PatientBirthDate;
                target.Modality = target.image.elements?.Modality;
                target.ImageComments = target.image.elements?.ImageComments;
                target.FrameTime = target.image.elements?.FrameTime;
                target.PatientSex = target.image.elements?.PatientSex;
                target.Rows = target.image.elements?.Rows;
                target.Columns = target.image.elements?.Columns;
                target.SeriesDescription =
                  target.image.elements?.SeriesDescription;
                target.StudyDate = target.image.elements?.StudyDate;
                target.StudyTime = target.image.elements?.StudyTime;
                target.StudyDescription =
                  target.image.elements?.StudyDescription;
                target.StudyID = target.image.elements?.StudyID;
                target.SOPClassUID = target.image.elements?.SOPClassUID;
                target.SOPInstanceUID = target.image.elements?.SOPInstanceUID;
                target.ReferringPhysicianName =
                  target.image.elements?.ReferringPhysicianName?.[0]?.Alphabetic;
                target.PhotometricInterpretation =
                  target.image.elements?.PhotometricInterpretation;
                target.ImageType = target.image.elements?.ImageType;
                target.PixelSpacing ||= target.image.PixelSpacing;
                target.PixelSpacingUnit = target.image.elements?.PixelSpacing
                  ? "cm"
                  : target.image.elements?.SequenceOfUltrasoundRegions
                  ? "mm"
                  : "px";
                target.SeriesDate = target.image.elements?.SeriesDate;
                target.SeriesTime = target.image.elements?.SeriesTime;
                target.ProtocolName = target.image.elements?.ProtocolName;
                target.DeviceSerialNumber =
                  target.image.elements?.DeviceSerialNumber;
                target.ContentDate = target.image.elements?.ContentDate;
                target.ContentTime = target.image.elements?.ContentTime;
                target.InstanceCreationDate =
                  target.image.elements?.InstanceCreationDate;
                target.InstanceCreationTime =
                  target.image.elements?.InstanceCreationTime;
                target.DerivationDescription =
                  target.image.elements?.DerivationDescription;
                target.InstitutionName = target.image.elements?.InstitutionName;
                target.InstitutionalDepartmentName =
                  target.image.elements?.InstitutionalDepartmentName;
                target.Manufacturer = target.image.elements?.Manufacturer;
                target.ManufacturerModelName =
                  target.image.elements?.ManufacturerModelName;
                target.Date =
                  target.image.elements?.SeriesDate ||
                  target.image.elements?.ContentDate ||
                  target.image.elements?.AcquisitionDate ||
                  target.image.elements?.StudyDate;
                target.Time =
                  target.image.elements?.SeriesTime ||
                  target.image.elements?.ContentTime ||
                  target.image.elements?.AcquisitionTime ||
                  target.image.elements?.StudyTime;
                target.sid = `${target.PatientID} - ${target.StudyID} - ${target.StudyInstanceUID}`;
                locals.archive[target.sid] ||= {};
                target.rid = target.SeriesInstanceUID;
                locals.archive[target.sid][target.rid] ||= [];
                locals.archive[target.sid][target.rid].push(target);
                if (Object.keys(locals.archive).length)
                  locals.sidebar.reloadList(
                    locals.archive,
                    renderFrame,
                    selectImage,
                    locals.boxes?.find((b) => !b.target),
                    locals.boxes
                  );
                return target;
              };
              let source;
              try {
                source = await new Promise((resolve) => {
                  if (file.fromServer)
                    new Blob(file.chunks, {
                      type: file.type,
                    })
                      .arrayBuffer()
                      .then(resolve);
                  else {
                    const reader = new FileReader();
                    reader.addEventListener("load", () => {
                      resolve(reader.result);
                    });
                    reader.readAsArrayBuffer(file);
                  }
                });
                loadDicomImage(source);
                resolve(target);
              } catch (err) {
                console.log(err);
                try {
                  await v.dom
                    .loadScripts(
                      [
                        "/v/assets/dicom/old/dcmjs.js",
                        "/v/assets/dicom/old/pace.js",
                      ],
                      () => {},
                      targetElement
                    )
                    .then(() => {
                      loadFileAlt(source).then((result) => {
                        if (result) {
                          target.imageBitmap = result.imageBitmap;
                          target.image = result.image;
                          target.image.PixelSpacing ||= target.image.elements
                            ?.PixelSpacing?.value || [
                            (
                              target.image.elements?.SequenceOfUltrasoundRegions
                                ?.Item?.[0] ||
                              target.image.elements?.SequenceOfUltrasoundRegions
                                ?.Item
                            )?.PhysicalDeltaX.value * 10,
                            (
                              target.image.elements?.SequenceOfUltrasoundRegions
                                ?.Item?.[0] ||
                              target.image.elements?.SequenceOfUltrasoundRegions
                                ?.Item
                            )?.PhysicalDeltaY.value * 10,
                          ];
                          target.image.WindowWidth ||=
                            target.image.elements.WindowWidth?.value[0] ||
                            target.image.elements.WindowWidth?.value ||
                            256;
                          target.image.WindowCenter ||=
                            target.image.elements.WindowCenter?.value[0] ||
                            target.image.elements.WindowCenter.value ||
                            128;
                          target.PatientID =
                            target.image.elements?.PatientID?.value;
                          target.PatientName =
                            target.image.elements?.PatientName?.value;
                          target.InstanceNumber =
                            target.image.elements?.InstanceNumber?.value;
                          target.StudyID =
                            target.image.elements?.StudyID?.value;
                          target.StudyInstanceUID =
                            target.image.elements?.StudyInstanceUID?.value;
                          target.StudyDescription =
                            target.image.elements?.StudyDescription?.value;
                          target.SeriesInstanceUID =
                            target.image.elements?.SeriesInstanceUID?.value;
                          target.SeriesDescription =
                            target.image.elements?.SeriesDescription?.value;
                          target.SeriesNumber =
                            target.image.elements?.SeriesNumber?.value;
                          target.PatientBirthDate =
                            target.image.elements?.PatientBirthDate?.value;
                          target.Modality =
                            target.image.elements?.Modality?.value;
                          target.ImageComments =
                            target.image.elements?.ImageComments?.value;
                          target.FrameTime =
                            target.image.elements?.FrameTime?.value;
                          target.PatientSex =
                            target.image.elements?.PatientSex?.value;
                          target.Rows = target.image.elements?.Rows?.value;
                          target.Columns =
                            target.image.elements?.Columns?.value;
                          target.SeriesDescription =
                            target.image.elements?.SeriesDescription?.value;
                          target.StudyDate =
                            target.image.elements?.StudyDate?.value;
                          target.StudyTime =
                            target.image.elements?.StudyTime?.value;
                          target.StudyDescription =
                            target.image.elements?.StudyDescription?.value;
                          target.StudyID =
                            target.image.elements?.StudyID?.value;
                          target.SOPClassUID =
                            target.image.elements?.SOPClassUID?.value;
                          target.SOPInstanceUID =
                            target.image.elements?.SOPInstanceUID?.value;
                          target.ReferringPhysicianName =
                            target.image.elements?.ReferringPhysicianName?.value;
                          target.PhotometricInterpretation =
                            target.image.elements?.PhotometricInterpretation?.value;
                          target.ImageType =
                            target.image.elements?.ImageType?.value;
                          target.PixelSpacing ||= target.image.PixelSpacing;
                          target.PixelSpacingUnit = target.image.elements
                            ?.PixelSpacing
                            ? "cm"
                            : target.image.elements?.SequenceOfUltrasoundRegions
                            ? "mm"
                            : "px";
                          target.SeriesDate =
                            target.image.elements?.SeriesDate?.value;
                          target.SeriesTime =
                            target.image.elements?.SeriesTime?.value;
                          target.ProtocolName =
                            target.image.elements?.ProtocolName?.value;
                          target.DeviceSerialNumber =
                            target.image.elements?.DeviceSerialNumber?.value;
                          target.ContentDate =
                            target.image.elements?.ContentDate?.value;
                          target.ContentTime =
                            target.image.elements?.ContentTime?.value;
                          target.InstanceCreationDate =
                            target.image.elements?.InstanceCreationDate?.value;
                          target.InstanceCreationTime =
                            target.image.elements?.InstanceCreationTime?.value;
                          target.DerivationDescription =
                            target.image.elements?.DerivationDescription?.value;
                          target.InstitutionName =
                            target.image.elements?.InstitutionName?.value;
                          target.InstitutionalDepartmentName =
                            target.image.elements?.InstitutionalDepartmentName?.value;
                          target.Manufacturer =
                            target.image.elements?.Manufacturer?.value;
                          target.ManufacturerModelName =
                            target.image.elements?.ManufacturerModelName?.value;
                          target.Date =
                            target.image.elements?.SeriesDate?.value ||
                            target.image.elements?.ContentDate?.value ||
                            target.image.elements?.AcquisitionDate?.value ||
                            target.image.elements?.StudyDate?.value;
                          target.Time =
                            target.image.elements?.SeriesTime?.value ||
                            target.image.elements?.ContentTime?.value ||
                            target.image.elements?.AcquisitionTime?.value ||
                            target.image.elements?.StudyTime?.value;
                          target.sid = `${target.PatientID} - ${target.StudyID} - ${target.StudyInstanceUID}`;
                          locals.archive[target.sid] ||= {};
                          target.rid = target.SeriesInstanceUID;
                          locals.archive[target.sid][target.rid] ||= [];
                          locals.archive[target.sid][target.rid].push(target);
                          console.log(111, locals.archive);
                          if (Object.keys(locals.archive).length)
                            locals.sidebar.reloadList(
                              locals.archive,
                              renderFrame,
                              selectImage,
                              locals.boxes?.find((b) => !b.target),
                              locals.boxes
                            );
                          console.log(target);
                          resolve(target);
                        } else resolve();
                      });
                    });
                } catch (err) {
                  console.log(err);
                  resolve();
                }
              }
            }
          }
        });
      const uploadFiles = (files) => {
        files
          .reduce((p, c) => p.then(() => loadFile(c)), Promise.resolve())
          .then(() => {
            if (Object.keys(locals.archive).length)
              locals.sidebar.reloadList(
                locals.archive,
                renderFrame,
                selectImage,
                locals.boxes?.find((b) => !b.target),
                locals.boxes
              );
          });
      };
      const setTool = (toolName) => {
        locals.toolName = toolName;
        locals.pointer.windowing = 0;
      };
      const invert = (inverted) => {
        locals.selectedBox.inverted = inverted;
        updateFilters(locals.selectedBox);
      };
      const setBoxes = (m, n) => {
        rearrangeBoxes(m, n);
      };
      const selectHoverLine = (box) => {
        if (box.selectedLine !== box.hoverLine) {
          box.selectedLine = box.hoverLine;
          updateOverlays(box);
          locals.navbar.setup(box);
        }
      };
      const deleteSelectedMeasurement = () => {
        locals.selectedBox.measurements.splice(
          locals.selectedBox.measurements.indexOf(
            locals.selectedBox.selectedLine.measure
          ),
          1
        );
        locals.selectedBox.selectedLine = undefined;
        updateOverlays(locals.selectedBox);
        locals.navbar.setup(locals.selectedBox);
      };
      const newBox = () =>
        v.project.dicom
          .box({
            close: (box) => {
              box.remove();
              locals.boxes.splice(locals.boxes.indexOf(box._owner_), 1);
              if (locals.selectedBox == box._owner_) {
                locals.selectedBox = undefined;
                locals.navbar.disable();
              }
              rearrangeBoxes();
              locals.sidebar.select(locals.selectedBox);
            },
            maximize: (box) => {
              box.parentElement.classList.remove("position-relative");
              box.parentElement.classList.add("z-1");
            },
            unmaximize: (box) => {
              box.parentElement.classList.add("position-relative");
              box.parentElement.classList.remove("z-1");
            },
            selectBox,
            updateFrame,
            pointer: locals.pointer,
            showCursorIcon,
            hideCursorIcon,
            getToolName: () => locals.toolName,
            calculateTransforms,
            selectHoverLine,
            onPointerMove,
          })
          .addEventListener("resize", (box) => {
            box = box._owner_;
            clearTimeout(box.resizeTimeout);
            box.resizeTimeout = setTimeout(() => {
              rescaleCanvas(box);
            }, 10);
          });
      const rearrangeBoxes = (r, c) => {
        if (r)
          locals.boxes = locals.boxes
            .slice(0, Math.min(locals.boxes.length, r * c))
            .concat(
              Array.from({
                length: Math.max(0, r * c - locals.boxes.length),
              }).map(() => newBox())
            );
        clearTimeout(locals.rearrangeBoxesTimeout);
        locals.rearrangeBoxesTimeout = setTimeout(() => {
          if (locals.boxes) {
            let rows = r,
              cols = c;
            if (!rows) {
              rows = Math.floor(Math.sqrt(locals.boxes.length));
              if (locals.boxes.length / rows - rows > 1) rows++;
              cols = Math.ceil(locals.boxes.length / rows);
              if (locals.body.offsetHeight > locals.body.offsetWidth) {
                rows += cols;
                cols = rows - cols;
                rows -= cols;
              }
            }
            locals.body.replaceChildren(
              Array.from({ length: rows }).map((_, m) =>
                v.div({
                  className: "row m-0 flex-grow-1",
                  content: Array.from({
                    length: Math.min(cols, locals.boxes.length - m * cols),
                  }).map((_, n) =>
                    v.div({
                      className: "col p-0 position-relative",
                      content: locals.boxes[m * cols + n],
                    })
                  ),
                })
              )
            );
            if (Object.keys(locals.archive).length)
              locals.sidebar.reloadList(
                locals.archive,
                renderFrame,
                selectImage,
                locals.boxes?.find((b) => !b.target),
                locals.boxes
              );
          }
        }, 10);
      };
      const moveCursorIcon = ({ pageX, pageY }) => {
        locals.cursorIcon.style.left = `${pageX + 11}px`;
        locals.cursorIcon.style.top = `${pageY + 13}px`;
      };
      const showCursorIcon = () => {
        locals.cursorIcon.textContent = {
          none: "",
          wwwc: "contrast",
          pan: "open_with",
          zoom: "zoom_in",
          cine: "movie",
          measure_length: "diagonal_line",
          measure_angle: "architecture",
          measure_oval: "circle",
          measure_rect: "rectangle",
        }[locals.toolName];
        if (locals.cursorIcon.textContent)
          locals.cursorIcon.classList.remove("d-none");
        if (locals.cursorIcon.textContent === "circle")
          locals.cursorIcon.style.transform = "scaleY(.8)";
        else locals.cursorIcon.style.removeProperty("transform");
      };
      const hideCursorIcon = () => {
        locals.cursorIcon.classList.add("d-none");
      };
      const updateFilters = (box) => {
        box.canvasElement.style.filter =
          (box.bcOrder
            ? `brightness(${box.brightness.toFixed(
                3
              )}) contrast(${box.contrast.toFixed(3)})`
            : `contrast(${box.contrast.toFixed(
                3
              )}) brightness(${box.brightness.toFixed(3)})`) +
          (box.inverted ? " invert(1)" : "");
        box.update();
      };
      const updateTransforms = (box) => {
        box.canvasContainer.style.transform = box.transforms
          .map((t) =>
            t === "flip-h"
              ? "scaleX(-1)"
              : t === "flip-v"
              ? "scaleY(-1)"
              : `rotate(${t}deg)`
          )
          .join(" ");
      };
      const addTransform = (transform) => {
        locals.selectedBox.transforms.splice(0, 0, transform);
        updateTransforms(locals.selectedBox);
        updateFrame(locals.selectedBox);
      };
      const clearTransforms = () => {
        locals.selectedBox.transforms.length = 0;
        updateTransforms(locals.selectedBox);
        updateFrame(locals.selectedBox);
      };
      const updateOverlays = (box) => {
        let s = box.scale * box.baseScale;
        box.overlayCanvas.width = box.overlayCanvas.offsetWidth * 2;
        box.overlayCanvas.height = box.overlayCanvas.offsetHeight * 2;
        let orect = box.overlayCanvas.getBoundingClientRect();
        let crect = box.canvasElement.getBoundingClientRect();
        let offsetX = (crect.left + crect.right) * 0.5 - orect.left;
        let offsetY = (crect.top + crect.bottom) * 0.5 - orect.top;
        const ctx = box.overlayCanvas.getContext("2d");
        ctx.clearRect(0, 0, box.overlayCanvas.width, box.overlayCanvas.height);
        box.measurements = box.measurements.filter(
          (m, i) =>
            (locals.toolName.startsWith("measure_") &&
              locals.pointer.windowing &&
              i === box.measurements.length - 1) ||
            (((m.type === "measure_length" && m.points.length === 2) ||
              (m.type !== "measure_length" && m.points.length === 3)) &&
              (m.points.length === 1 ||
                m.points[m.points.length - 1].x !==
                  m.points[m.points.length - 2].x ||
                m.points[m.points.length - 1].y !==
                  m.points[m.points.length - 2].y))
        );
        let measurements = box.measurements.filter(
          (m) =>
            m.frame === undefined || m.frame === box.renderOptions.frameNumber
        );
        if (
          box.selectedLine &&
          !measurements.includes(box.selectedLine.measure)
        ) {
          box.selectedLine = undefined;
          locals.navbar.setup(box);
        }
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowColor = "#000";
        box.lines = [];
        for (let measure of measurements) {
          ctx.resetTransform();
          ctx.scale(2, 2);
          ctx.translate(offsetX, offsetY);
          let ps = measure.points.map((p) => ({
            x: p.x * box.canvasElement.width * s,
            y: p.y * box.canvasElement.height * s,
          }));
          for (let p of ps)
            for (let t of [...box.transforms].reverse())
              if (t === "flip-h") p.x = -p.x;
              else if (t === "flip-v") p.y = -p.y;
              else {
                let sin = Math.sin((t * Math.PI) / 180);
                let cos = Math.cos((t * Math.PI) / 180);
                let _x = p.x;
                p.x = _x * cos - p.y * sin;
                p.y = _x * sin + p.y * cos;
              }
          for (let i = 1; i < ps.length; i++) {
            ps[i].dx = ps[i].x - ps[i - 1].x;
            ps[i].dy = ps[i].y - ps[i - 1].y;
            ps[i].at = Math.atan2(ps[i].dy, ps[i].dx);
            ps[i].sn = Math.sin(ps[i].at);
            ps[i].cn = Math.cos(ps[i].at);
            box.lines.push({
              x1: ps[i - 1].x + offsetX,
              y1: ps[i - 1].y + offsetY,
              x2: ps[i].x + offsetX,
              y2: ps[i].y + offsetY,
              measure,
            });
          }
          ctx.strokeStyle = "#0008";
          ctx.lineWidth = 3;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          for (let i = 1; i < ps.length; i++) {
            ctx.moveTo(ps[i - 1].x - ps[i].cn, ps[i - 1].y - ps[i].sn);
            ctx.lineTo(ps[i].x + ps[i].cn, ps[i].y + ps[i].sn);
          }
          ctx.stroke();
          ctx.strokeStyle =
            measure === box.selectedLine?.measure
              ? "#f00f"
              : measure === box.hoverLine?.measure
              ? "#ff0f"
              : "#0f0f";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.beginPath();
          for (let i = 1; i < ps.length; i++) {
            ctx.moveTo(ps[i - 1].x, ps[i - 1].y);
            ctx.lineTo(ps[i].x, ps[i].y);
          }
          ctx.stroke();
          ctx.strokeStyle = "#f00f";
          ctx.lineWidth = 1;
          ctx.shadowBlur = 1;
          ctx.beginPath();
          for (let i = 0; i < ps.length; i++) {
            ctx.moveTo(ps[i].x - 4, ps[i].y);
            ctx.lineTo(ps[i].x + 4, ps[i].y);
            ctx.moveTo(ps[i].x, ps[i].y - 4);
            ctx.lineTo(ps[i].x, ps[i].y + 4);
          }
          ctx.stroke();
          let sc = Math.pow(s, 0.4);
          ctx.font = `${(14 * sc).toFixed()}px Tahoma, sans-serif`;
          let r = 6;
          let unit = box.target?.PixelSpacingUnit ?? "px";
          let dx =
            (ps[1].dx *
              (box.target?.PixelSpacing?.[0] || 1) *
              (unit === "cm" ? 0.1 : 1)) /
            s;
          let dx2 = dx * dx;
          let dy =
            (ps[1].dy *
              (box.target?.PixelSpacing?.[1] || 1) *
              (unit === "cm" ? 0.1 : 1)) /
            s;
          let dy2 = dy * dy;
          let text,
            x,
            y,
            align = "left",
            baseline = "middle";
          if (measure.type === "measure_length") {
            let length = Math.sqrt(dx2 + dy2);
            text = length.toFixed(unit === "cm" ? 2 : 1) + " " + unit;
            x = Math.max(ps[0].x, ps[1].x) + r;
            y = ps[0].x > ps[1].x ? ps[0].y : ps[1].y;
          } else if (ps.length > 2) {
            let at1 = (Math.atan2(dy, -dx) * 180) / Math.PI;
            let at2 =
              (Math.atan2(
                -ps[2].dy * (box.target?.PixelSpacing?.[1] || 1),
                ps[2].dx * (box.target?.PixelSpacing?.[1] || 1)
              ) *
                180) /
              Math.PI;
            if (at1 < 0) at1 += 360;
            if (at2 < 0) at2 += 360;
            let a = Math.abs(at2 - at1);
            if (a > 180) a = 360 - a;
            text = a.toFixed(1) + "°";
            x = ps[1].x;
            y = ps[1].y;
            baseline = "top";
            if (at1 > 90) {
              if (at2 > 90) baseline = "bottom";
              else if (at1 > 270) align = "right";
            } else if (at2 > 270) align = "right";
            x += 0.5 * (align === "left" ? r : -r);
            y += 0.5 * (baseline === "top" ? r : -r);
          }
          if (text) {
            let metrics = ctx.measureText(text);
            let w = metrics.width + r;
            let h =
              metrics.actualBoundingBoxAscent +
              metrics.actualBoundingBoxDescent +
              r;
            let cornerRadius = Math.min(8, h / 2);
            ctx.translate(x, y);
            ctx.textAlign = align;
            ctx.textBaseline = baseline;
            ctx.lineJoin = "round";
            ctx.lineWidth = cornerRadius;
            ctx.strokeStyle = "#6208";
            ctx.fillStyle = "#6208";
            ctx.shadowBlur = 0;
            ctx.strokeRect(
              cornerRadius / 2 -
                w * (align === "left" ? 0 : align === "right" ? 1 : 0.5),
              cornerRadius / 2 -
                h * (baseline === "top" ? 0 : baseline === "bottom" ? 1 : 0.5),
              w - cornerRadius,
              h - cornerRadius
            );
            ctx.fillRect(
              cornerRadius -
                w * (align === "left" ? 0 : align === "right" ? 1 : 0.5),
              cornerRadius -
                h * (baseline === "top" ? 0 : baseline === "bottom" ? 1 : 0.5),
              w - cornerRadius * 2,
              h - cornerRadius * 2
            );
            ctx.fillStyle = "#0008";
            ctx.shadowBlur = 1;
            for (let i = -1; i <= 1; i += 2)
              for (let j = -1; j <= 1; j += 2)
                ctx.fillText(
                  text,
                  i +
                    r * (align === "left" ? 0.5 : align === "right" ? -0.5 : 0),
                  j +
                    r *
                      (baseline === "top"
                        ? 0.25
                        : baseline === "bottom"
                        ? -0.125
                        : 0)
                );
            ctx.fillStyle = "#ff0f";
            ctx.textRendering = "optimizeLegibility";
            ctx.fillText(
              text,
              r * (align === "left" ? 0.5 : align === "right" ? -0.5 : 0),
              r *
                (baseline === "top" ? 0.25 : baseline === "bottom" ? -0.125 : 0)
            );
          }
        }
      };
      return v
        .main({
          className: `w-100 h-100 d-flex ${
            app.settings.navbarPosition === "left" ? "flex-row" : "flex-column"
          }`,
          dataBsTheme: "dark",
          style: {
            fontFamily: "Tahoma, sans-serif !important",
          },
          content: [
            (locals.cursorIcon = await v.span({
              className:
                "material-symbols-outlined d-flex position-fixed d-none",
              style: {
                fontSize: ".8rem",
                zIndex: "9999",
                textShadow: "1px 1px #000",
              },
              content: "home",
            })),
            (locals.navbar = await v.project.dicom.navbar({
              primaryColor,
              secondaryColor,
              uploadFiles,
              setBoxes,
              setTool,
              invert,
              resetImage,
              addTransform,
              clearTransforms,
              setLinked: (value) => {
                if (locals.selectedBox.selectedLine) {
                  locals.selectedBox.selectedLine.measure.frame = value
                    ? locals.selectedBox.renderOptions.frameNumber
                    : undefined;
                  locals.navbar.setup(locals.selectedBox);
                } else locals.linked = value;
              },
              getLinked: () =>
                locals.selectedBox?.selectedLine
                  ? locals.selectedBox.selectedLine.measure.frame !== undefined
                  : locals.linked,
              deleteSelectedMeasurement,
            })),
            v.div({
              className: `flex-grow-1 d-flex ${
                app.settings.sidebarPosition === "bottom"
                  ? "flex-column-reverse"
                  : "flex-row"
              } overflow-hidden`,
              content: [
                (locals.sidebar = await v.project.dicom.sidebar({
                  primaryColor,
                  secondaryColor,
                  useWebGl,
                })),
                (locals.body = await v
                  .div({
                    className:
                      "position-relative flex-grow-1 d-flex flex-column",
                  })
                  .addEventListener("add", () => {
                    locals.boxes = Array.from({ length: 1 }).map((_, i) =>
                      newBox()
                    );
                    rearrangeBoxes();
                  })
                  .addEventListener("resize", () => {
                    rearrangeBoxes();
                  })),
              ],
            }),
          ],
        })
        .addEventListener("add", () => {
          window.addEventListener("pointermove", (e) => {
            moveCursorIcon(e);
          });
          if (v.dom.parseUrl().query.instance)
            fetch("/instance/get-list", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                instance: v.dom.parseUrl().query.instance,
              }),
            })
              .then((result) => result.json())
              .then((result) => {
                uploadFiles(
                  result.files.map((f) => ({
                    name: f.file,
                    type: f.type,
                    fromServer: true,
                  }))
                );
              });
        });
    });
};
