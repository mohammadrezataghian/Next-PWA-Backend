/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async ({
  close,
  maximize,
  unmaximize,
  selectBox,
  updateFrame,
  pointer,
  showCursorIcon,
  hideCursorIcon,
  getToolName,
  calculateTransforms,
  selectHoverLine,
  onPointerMove,
}) => {
  const box = await v
    .div({
      className: "position-absolute border",
      style: "inset:0;text-shadow:1px 1px 1px #000;box-shadow:1px 1px 1px #000",
      content: v.div({
        className:
          "position-relative w-100 h-100 overflow-hidden d-flex justify-content-center align-items-center bg-black",
        content: [
          (this.container = await v.div({
            className:
              "position-absolute start-0 top-0 end-0 bottom-0 w-100 h-100 overflow-hidden d-flex justify-content-center align-items-center",
          })),
          (this.overlayCanvas = await v.canvas({
            className: "position-absolute start-0 top-0 w-100 h-100",
            style: {
              fontSmooth: "never",
              WebkitFontSmoothing: "none",
            },
          })),
          (this.infoContainer = await v.div({
            className:
              "position-absolute start-0 top-0 end-0 bottom-0 user-select-none",
            style: "font-size:.8rem;opacity:.8",
            content: v.div({
              className: "position-relative w-100 h-100",
              content: [
                v.div({
                  className: "position-absolute strat-0 top-0",
                  content: [
                    (this.infoTitle = await v.div({
                      className: "ps-1 text-info",
                    })),
                    (this.infoTopLeft = await v.div({
                      className: "ps-1 text-warning",
                    })),
                  ],
                }),
                (this.infoTopRight = await v.div({
                  className:
                    "position-absolute end-0 top-0 pe-1 mt-3 text-warning text-end",
                })),
                (this.infoBottomLeft = await v.span({
                  className:
                    "position-absolute strat-0 bottom-0 ps-1 text-danger",
                })),
                (this.infoBottomRight = await v.div({
                  className:
                    "position-absolute end-0 bottom-0 pe-1 text-warning text-end",
                })),
              ],
              ondblclick: () => this.toggleMaximize(),
              onpointerdown: (e) => {
                if (e.button === 0) {
                  pointer.count++;
                  onPointerMove(e);
                  if (
                    e.target !== this.closeButton &&
                    e.target !== this.closeButtonIcon
                  )
                    selectBox(this);
                  let canvas = box.querySelector("#canvasContainer");
                  if (canvas) {
                    if (getToolName() === "none") selectHoverLine(this);
                    let { x, y } = calculateTransforms(
                      {
                        x: e.clientX,
                        y: e.clientY,
                      },
                      this
                    );
                    if (Math.abs(x) <= 0.5 && Math.abs(y) <= 0.5) {
                      pointer.x = e.clientX;
                      pointer.y = e.clientY;
                      pointer.windowing++;
                      pointer.origin = {
                        x,
                        y,
                        clientX: e.clientX,
                        clientY: e.clientY,
                      };
                      onPointerMove(e);
                    }
                  }
                }
              },
              onpointerup: (e) => {
                if (e.button === 0)
                  pointer.count = Math.max(0, pointer.count - 1);
              },
              onpointercancel: (e) => {
                if (e.button === 0)
                  pointer.count = Math.max(0, pointer.count - 1);
              },
              onpointermove: (e) => {
                if (e.buttons !== 1) pointer.count = 0;
                if (app.settings.mobile) {
                } else {
                  if (
                    getToolName() === "cine" &&
                    !(this.target?.getNumberOfFrames() > 1)
                  )
                    hideCursorIcon();
                  else {
                    let canvas = box.querySelector("#canvasContainer");
                    if (canvas) {
                      let { x, y } = calculateTransforms(
                        {
                          x: e.clientX,
                          y: e.clientY,
                        },
                        this
                      );
                      if (Math.abs(x) <= 0.5 && Math.abs(y) <= 0.5) {
                        showCursorIcon();
                      } else hideCursorIcon();
                    } else hideCursorIcon();
                  }
                }
              },
              onpointerout: () => {
                hideCursorIcon();
              },
              ontouchstart: (e) => {
                e.preventDefault();
                pointer.count = e.touches.length;
                if (e.touches.length === 1) {
                  pointer.tx1 = e.touches[0].clientX;
                  pointer.ty1 = e.touches[0].clientY;
                } else if (e.touches.length === 2) {
                  pointer.tx2 = e.touches[1].clientX;
                  pointer.ty2 = e.touches[1].clientY;
                  pointer.pinch = true;
                } else pointer.pinch = false;
              },
              ontouchmove: (e) => {
                e.preventDefault();
                if (pointer.pinch && this.canvasContainer) {
                  let l1 = Math.hypot(
                    pointer.tx2 - pointer.tx1,
                    pointer.ty2 - pointer.ty1
                  );
                  let c1 = {
                    x: (pointer.tx1 + pointer.tx2) * 0.5,
                    y: (pointer.ty1 + pointer.ty2) * 0.5,
                  };
                  pointer.tx1 = e.touches[0].clientX;
                  pointer.ty1 = e.touches[0].clientY;
                  pointer.tx2 = e.touches[1].clientX;
                  pointer.ty2 = e.touches[1].clientY;
                  let l2 = Math.hypot(
                    pointer.tx2 - pointer.tx1,
                    pointer.ty2 - pointer.ty1
                  );
                  let c2 = {
                    x: (pointer.tx1 + pointer.tx2) * 0.5,
                    y: (pointer.ty1 + pointer.ty2) * 0.5,
                  };
                  let s = l2 / l1;
                  let dx = c2.x - c1.x;
                  let dy = c2.y - c1.y;
                  let rect = this.canvasContainer.getBoundingClientRect();
                  let xc = (rect.left + rect.right) * 0.5;
                  let yc = (rect.top + rect.bottom) * 0.5;
                  let xo = (xc - c1.x) * (s - 1);
                  let yo = (yc - c1.y) * (s - 1);
                  this.scale *= s;
                  this.canvasContainer.style.scale = (
                    this.baseScale * this.scale
                  ).toFixed(3);
                  this.offsetX += dx + xo;
                  this.offsetY += dy + yo;
                  this.canvasContainer.style.left =
                    this.offsetX.toFixed(1) + "px";
                  this.canvasContainer.style.top =
                    this.offsetY.toFixed(1) + "px";
                  updateFrame(this);
                }
              },
              ontouchend: (e) => {
                e.preventDefault();
                pointer.count = e.touches.length;
                if (e.touches.length !== 2) pointer.pinch = false;
              },
              ontouchcancel: (e) => {
                e.preventDefault();
                pointer.count = e.touches.length;
                if (e.touches.length !== 2) pointer.pinch = false;
              },
            }),
          })),
          v.div({
            className: "position-absolute end-0 top-0 d-flex",
            content: [
              (this.revealButton = await v.button({
                className: "btn btn-outline-light border-0 p-0",
                content: (this.revealButtonIcon = await v.span({
                  className: "material-symbols-outlined d-flex p-0 z-2",
                  style: "font-size:1rem;opacity:.8",
                  content: "visibility_off",
                })),
                onclick: () => this.toggleInfo(),
              })),
              (this.maxButton = await v.button({
                className: "btn btn-outline-light border-0 p-0",
                content: (this.maxButtonIcon = await v.span({
                  className: "material-symbols-outlined d-flex p-0 z-2",
                  style: "font-size:1rem;opacity:.8",
                  content: "fullscreen",
                })),
                onclick: () => this.toggleMaximize(),
              })),
              (this.closeButton = await v.button({
                className: "btn btn-outline-danger border-0 p-0",
                content: (this.closeButtonIcon = await v.span({
                  className: "material-symbols-outlined d-flex p-0 z-2",
                  style: "font-size:1rem",
                  content: "close",
                })),
                onclick: () => {
                  close(box);
                },
              })),
            ],
          }),
          (this.cine = await v.div({
            className:
              "d-none position-absolute bottom-0 start-0 end-0 mb-1 mx-1 d-flex justify-content-between",
            style: `opacity:${app.settings.mobile ? ".8" : ".6"}`,
            content: [
              v.div({ style: { width: "5rem" } }),
              v.div({
                className: "btn-group me-1",
                style: `background-color:#0008`,
                role: "group",
                content: [
                  (this.firstFrame = await v.button({
                    type: "button",
                    className:
                      "btn btn-outline-light py-0 px-1 overflow-hidden",
                    style: `transition:max-width .25s linear;${
                      app.settings.mobile ? "" : "max-width:0"
                    }`,
                    content: v.span({
                      className: "material-symbols-outlined d-flex",
                      content: "first_page",
                    }),
                    onclick: () => {
                      this.range.scrollTop = 0;
                    },
                  })),
                  (this.previousFrame = await v.button({
                    type: "button",
                    className:
                      "btn btn-outline-light py-0 px-1 overflow-hidden",
                    style: `transition:max-width .25s linear;${
                      app.settings.mobile ? "" : "max-width:0"
                    }`,
                    content: v.span({
                      className: "material-symbols-outlined d-flex",
                      content: "skip_previous",
                    }),
                    onpointerdown: () => {
                      const previousFrame = () => {
                        this.range.scrollTop =
                          (Math.max(0, this.renderOptions.frameNumber - 1) *
                            (this.range.scrollHeight -
                              this.range.clientHeight)) /
                          (this.target.getNumberOfFrames() - 1);
                      };
                      previousFrame();
                      locals.previousFrameTimeout = setTimeout(() => {
                        locals.previousFrameInterval = setInterval(() => {
                          previousFrame();
                        }, 1000 / this.frameInterval);
                      }, 400 - 1000 / this.frameInterval);
                    },
                    onpointerup: () => {
                      clearTimeout(locals.previousFrameTimeout);
                      clearInterval(locals.previousFrameInterval);
                    },
                  })),
                  (this.playButton = await v.button({
                    type: "button",
                    className: "btn btn-outline-light py-0 px-1",
                    content: v.span({
                      className: "material-symbols-outlined d-flex",
                      content: "play_arrow",
                    }),
                    onclick: () => {
                      this.togglePlay();
                    },
                  })),
                  (this.nextFrame = await v.button({
                    type: "button",
                    className:
                      "btn btn-outline-light py-0 px-1 overflow-hidden",
                    style: `transition:max-width .25s linear;${
                      app.settings.mobile ? "" : "max-width:0"
                    }`,
                    content: v.span({
                      className: "material-symbols-outlined d-flex",
                      content: "skip_next",
                    }),
                    onpointerdown: () => {
                      const nextFrame = () => {
                        this.range.scrollTop =
                          (Math.min(
                            this.target.getNumberOfFrames() - 1,
                            this.renderOptions.frameNumber + 1
                          ) *
                            (this.range.scrollHeight -
                              this.range.clientHeight)) /
                          (this.target.getNumberOfFrames() - 1);
                      };
                      nextFrame();
                      locals.nextFrameTimeout = setTimeout(() => {
                        locals.nextFrameInterval = setInterval(() => {
                          nextFrame();
                        }, 1000 / this.frameInterval);
                      }, 400 - 1000 / this.frameInterval);
                    },
                    onpointerup: () => {
                      clearTimeout(locals.nextFrameTimeout);
                      clearInterval(locals.nextFrameInterval);
                    },
                  })),
                  (this.lastFrame = await v.button({
                    type: "button",
                    className:
                      "btn btn-outline-light py-0 px-1 overflow-hidden",
                    style: `transition:max-width .25s linear;${
                      app.settings.mobile ? "" : "max-width:0"
                    }`,
                    content: v.span({
                      className: "material-symbols-outlined d-flex",
                      content: "last_page",
                    }),
                    onclick: () => {
                      this.range.scrollTop =
                        ((this.target.getNumberOfFrames() - 1) *
                          (this.range.scrollHeight - this.range.clientHeight)) /
                        (this.target.getNumberOfFrames() - 1);
                    },
                  })),
                ],
                onmouseover: () => {
                  if (app.settings.mobile) {
                  } else {
                    let mw = this.playButton.offsetWidth + "px";
                    this.firstFrame.style.maxWidth = mw;
                    this.previousFrame.style.maxWidth = mw;
                    this.nextFrame.style.maxWidth = mw;
                    this.lastFrame.style.maxWidth = mw;
                  }
                },
                onmouseleave: () => {
                  if (app.settings.mobile) {
                  } else {
                    this.firstFrame.style.maxWidth = "0";
                    this.previousFrame.style.maxWidth = "0";
                    this.nextFrame.style.maxWidth = "0";
                    this.lastFrame.style.maxWidth = "0";
                  }
                },
              }),
              (this.fps = await v.div({
                className: "btn-group",
                style: `background-color:#0008`,
                role: "group",
                content: [
                  v.div({
                    className: "btn-group dropup d-flex rtl",
                    content: [
                      v.a({
                        type: "button",
                        className:
                          "btn btn-outline-light py-0 px-1 dropdown-toggle",
                        dataBsToggle: "dropdown",
                        content: [
                          v.span({
                            className:
                              "invisible material-symbols-outlined mx-1",
                            content: "restart_alt",
                          }),
                          (this.fpsValue = await v.div({
                            className:
                              "position-absolute top-50 start-50 translate-middle d-flex flex-column justify-content-center align-items-center ms-1",
                            content: [
                              v.span({
                                style:
                                  "font-size:.7rem;margin:.2rem 0 -.5rem 0",
                                content: "FPS",
                              }),
                              (this.fpsRate = await v.span({
                                style: "font-size:1rem",
                                content: "30",
                              })),
                            ],
                          })),
                        ],
                      }),
                      v.ul({
                        className: "dropdown-menu p-0",
                        style: "min-width:100%",
                        content: [
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: "120",
                            }),
                            onclick: () => {
                              this.setFPS(120);
                            },
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: "60",
                            }),
                            onclick: () => {
                              this.setFPS(60);
                            },
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: "30",
                            }),
                            onclick: () => {
                              this.setFPS(30);
                            },
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: "15",
                            }),
                            onclick: () => {
                              this.setFPS(15);
                            },
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: "10",
                            }),
                            onclick: () => {
                              this.setFPS(10);
                            },
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: "5",
                            }),
                            onclick: () => {
                              this.setFPS(5);
                            },
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item p-1 text-center",
                              href: "#",
                              content: v.span({
                                className:
                                  "material-symbols-outlined d-flex p-0 w-100 justify-content-center",
                                content: "restart_alt",
                              }),
                            }),
                            onclick: () => {
                              this.setFPS(1000 / (this.target.FrameTime || 33));
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                  v.label({
                    className:
                      "position-relative border border-light border-start-0 rounded-end d-flex overflow-hidden pe-3",
                    content: v.div({
                      className:
                        "position-absolute start-0 top-0 w-100 h-100 d-flex flex-column",
                      content: [
                        v.a({
                          className:
                            "position-relative p-0 btn btn-outline-light border-0 rounded-0 flex-grow-1 overflow-hidden",
                          content: v.span({
                            className:
                              "position-absolute material-symbols-outlined start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center",
                            content: "arrow_drop_up",
                          }),
                          onpointerdown: () => {
                            const increase = (n) => {
                              this.frameInterval ||=
                                1000 / (this.target.FrameTime || 33);
                              this.frameInterval = Math.min(
                                120,
                                this.frameInterval + n
                              );
                              this.update();
                              if (
                                this.playButton.firstChild.textContent ===
                                "pause"
                              )
                                this.playCine();
                            };
                            increase(1);
                            locals.increaseTimeout = setTimeout(() => {
                              locals.increaseInterval = setInterval(() => {
                                increase(1);
                              }, 100);
                            }, 400);
                          },
                          onpointerup: () => {
                            clearTimeout(locals.increaseTimeout);
                            clearInterval(locals.increaseInterval);
                          },
                        }),
                        v.a({
                          className:
                            "position-relative p-0 btn btn-outline-light border-0 rounded-0 flex-grow-1 overflow-hidden",
                          content: v.span({
                            className:
                              "position-absolute material-symbols-outlined start-0 top-0 w-100 h-100 d-flex justify-content-center align-items-center",
                            content: "arrow_drop_down",
                          }),
                          onpointerdown: () => {
                            const decrease = (n) => {
                              this.frameInterval ||=
                                1000 / (this.target.FrameTime || 33);
                              this.frameInterval = Math.max(
                                1,
                                this.frameInterval - n
                              );
                              this.update();
                              if (
                                this.playButton.firstChild.textContent ===
                                "pause"
                              )
                                this.playCine();
                            };
                            decrease(1);
                            locals.decreaseTimeout = setTimeout(() => {
                              locals.decreaseInterval = setInterval(() => {
                                decrease(1);
                              }, 100);
                            }, 400);
                          },
                          onpointerup: () => {
                            clearTimeout(locals.decreaseTimeout);
                            clearInterval(locals.decreaseInterval);
                          },
                        }),
                      ],
                    }),
                  }),
                ],
              })),
            ],
          })),
          (this.range = await v.div({
            className: "d-none mb-45 position-absolute overflow-y-auto",
            style: {
              width: "5px",
              top: "1rem",
              right: "2px",
              bottom: "0",
              opacity: app.settings.mobile ? ".8" : ".6",
            },
            content: v.div({
              style: {
                width: "1px",
                height: "1000%",
              },
            }),
            onscroll: (e) => {
              e.preventDefault();
              if (!pointer.windowing || this.forceUpdateOnScroll) {
                delete this.forceUpdateOnScroll;
                this.renderOptions.frameNumber = this.renderOptions.frame =
                  Math.round(
                    ((this.target.getNumberOfFrames() - 1) *
                      this.range.scrollTop) /
                      (this.range.scrollHeight - this.range.clientHeight)
                  );
                this.updateInfo();
                if (!this.preventUpdateOnScroll) updateFrame(this);
                else delete this.preventUpdateOnScroll;
              }
            },
          })),
        ],
        onpointerenter: () => {
          if (app.settings.mobile) {
          } else {
            this.cine.style.opacity = ".8";
            this.range.style.opacity = ".8";
          }
        },
        onpointerout: (e) => {
          if (app.settings.mobile) {
          } else {
            const boxRect = box.getBoundingClientRect();
            if (
              e.clientX < boxRect.left ||
              e.clientX > boxRect.right ||
              e.clientY < boxRect.top ||
              e.clientY > boxRect.bottom
            ) {
              this.cine.style.opacity = ".6";
              this.range.style.opacity = ".6";
              hideCursorIcon();
            } else {
              this.cine.style.opacity = ".8";
              this.range.style.opacity = ".8";
            }
          }
        },
      }),
    })
    .useStyle("dicom-box-style", {
      ".mb-45": {
        marginBottom: "2.25rem !important",
      },
    })
    .addEventListener("resize", (box) => {
      this.infoContainer.style.fontSize = `${Math.min(
        1.2,
        Math.pow(Math.min(box.offsetWidth, box.offsetHeight * 2) * 0.002, 0.8)
      )}rem`;
    });
  this.setFPS = (fps) => {
    this.frameInterval = fps;
    this.update();
    if (this.playButton.firstChild.textContent === "pause") this.playCine();
  };
  this.enableCine = () => {
    this.cine.classList.remove("d-none");
    this.range.classList.remove("d-none");
    this.infoContainer.classList.add("me-2", "mb-45");
    this.container.classList.add("me-2");
    this.frameInterval ||= 1000 / (this.target.FrameTime || 33);
    this.fpsRate.textContent = this.frameInterval.toFixed();
  };
  this.disableCine = () => {
    this.cine.classList.add("d-none");
    this.range.classList.add("d-none");
    this.infoContainer.classList.remove("me-2", "mb-45");
    this.container.classList.remove("me-2");
  };
  this.updateInfo = () => {
    if (locals.infoHidden) {
      this.infoTitle.innerHTML = `Im: ${
        (this.renderOptions?.frameNumber ?? 0) + 1
      }/${this.target.getNumberOfFrames()}`;
      this.infoTopLeft.innerHTML = ``;
      this.infoTopRight.innerHTML = ``;
      this.infoBottomRight.innerHTML = ``;
      this.infoBottomLeft.innerHTML = ``;
    } else {
      this.infoTitle.innerHTML = `Im: ${
        (this.renderOptions?.frameNumber ?? 0) + 1
      }/${this.target.getNumberOfFrames()}`;
      this.infoTopLeft.innerHTML = `${
        this.target.SeriesNumber ? `Se: ${this.target.SeriesNumber}` : ""
      }`;
      this.infoTopRight.innerHTML = `${this.target.PatientName || ""}<br/>${
        this.target.PatientID || ""
      }<br/>${
        this.target.PatientBirthDate
          ? this.target.PatientBirthDate.substring(4, 6) +
            "/" +
            this.target.PatientBirthDate.substring(6, 8) +
            "/" +
            this.target.PatientBirthDate.substring(0, 4)
          : ""
      } ${this.target.PatientSex || ""}<br/>${
        this.target.InstitutionName || ""
      }<br/>${this.target.StudyID || ""}<br/>${
        this.target.StudyDescription || ""
      }<br/>${this.target.SeriesDescription || ""}`;
      this.infoBottomRight.innerHTML = `<br/>${
        this.target.Date
          ? this.target.Date.substring(4, 6) +
            "/" +
            this.target.Date.substring(6, 8) +
            "/" +
            this.target.Date.substring(0, 4) +
            (this.target.Time
              ? ` ${
                  Number(this.target.Time.substring(0, 2)) > 12
                    ? Number(this.target.Time.substring(0, 2)) % 12
                    : this.target.Time.substring(0, 2)
                }:${this.target.Time.substring(
                  2,
                  4
                )}:${this.target.Time.substring(4, 6)} ${
                  Number(this.target.Time.substring(0, 2)) >= 12 ? "PM" : "AM"
                }`
              : "")
          : ""
      }`;
      this.infoBottomLeft.innerHTML = `${
        this.renderOptions?.windowLevel
          ? `WL: ${this.renderOptions.windowLevel.getLevel()}, WW: ${this.renderOptions.windowLevel.getWindow()}`
          : this.brightness || this.contrast
          ? `WL: ${this.brightness}, WW: ${this.contrast}`
          : this.target.image?.WindowWidth
          ? `WL: ${this.target.image.WindowCenter}, WW: ${this.target.image.WindowWidth}`
          : ""
      }<br/> `;
    }
  };
  this.update = () => {
    if (this.target?.getNumberOfFrames() > 1) this.enableCine();
    else this.disableCine();
    this.updateInfo();
    this.range.scrollTop =
      (((this.renderOptions?.frameNumber ?? 0) %
        this.target.getNumberOfFrames()) *
        (this.range.scrollHeight - this.range.clientHeight)) /
      (this.target.getNumberOfFrames() - 1);
    if (this.playButton.firstChild.textContent === "pause") this.playCine();
  };
  this.playCine = () => {
    clearInterval(this.cinePlayInterval);
    this.playButton.firstChild.textContent = "pause";
    this.frameInterval ||= 1000 / (this.target.FrameTime || 33);
    locals.cineTime0 = performance.now();
    locals.cineFrame = this.renderOptions.frameNumber;
    this.cinePlayInterval = setInterval(() => {
      if (this.target.getNumberOfFrames() < 2) {
        clearInterval(this.cinePlayInterval);
      } else if (!pointer.windowing) {
        let offset = locals.interrupt
          ? this.renderOptions.frameNumber - locals.cineFrame + 1
          : (performance.now() - locals.cineTime0) * this.frameInterval * 0.001;
        locals.interrupt = false;
        locals.cineTime0 = performance.now();
        let scrollTop = this.range.scrollTop;
        while (
          scrollTop == this.range.scrollTop &&
          this.target.getNumberOfFrames() > 1
        ) {
          locals.cineFrame += offset;
          offset = 1;
          this.range.scrollTop =
            ((locals.cineFrame % this.target.getNumberOfFrames()) *
              (this.range.scrollHeight - this.range.clientHeight)) /
            (this.target.getNumberOfFrames() - 1);
        }
      } else locals.interrupt = true;
    }, 1000 / this.frameInterval);
  };
  this.togglePlay = () => {
    if (this.playButton.firstChild.textContent === "play_arrow")
      this.playCine();
    else {
      this.playButton.firstChild.textContent = "play_arrow";
      clearInterval(this.cinePlayInterval);
    }
  };
  this.toggleMaximize = () => {
    if (locals.state === "maximized") {
      locals.state = "";
      this.maxButtonIcon.textContent = "fullscreen";
      unmaximize(box);
    } else {
      locals.state = "maximized";
      this.maxButtonIcon.textContent = "minimize";
      selectBox(this);
      maximize(box);
    }
  };
  this.toggleInfo = () => {
    if (locals.infoHidden) {
      locals.infoHidden = false;
      this.revealButtonIcon.textContent = "visibility_off";
    } else {
      locals.infoHidden = true;
      this.revealButtonIcon.textContent = "visibility";
    }
    this.updateInfo();
  };
  return box;
};
