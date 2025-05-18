/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async ({
  primaryColor,
  secondaryColor,
  uploadFiles,
  setBoxes,
  setTool,
  invert,
  resetImage,
  addTransform,
  clearTransforms,
  setLinked,
  getLinked,
  deleteSelectedMeasurement,
  saveData,
}) => {
  const navbar = await v
    .nav({
      className: "w-100 z-4 bg-dark-subtle",
      style: `${
        secondaryColor ? `background-color:${secondaryColor} !important;` : ""
      }`,
      content: v.div({
        className: `d-flex w-100 flex-wrap gap-1 p-1 ${
          app.settings.mobile
            ? "justify-content-start"
            : "justify-content-center"
        } ${
          app.settings.navbarPosition === "left" ? "flex-column" : "flex-row"
        }`,
        content: [
          (this.inputFile = await v.input({
            className: "d-none",
            type: "file",
            onchange: () => {
              uploadFiles([...this.inputFile.files]);
              this.inputFile.value = "";
            },
          })),
          v.div({
            className:
              app.settings.navbarPosition === "left"
                ? "btn-group-vertical"
                : "btn-group",
            role: "group",
            content: [
              v.button({
                type: "button",
                className: "btn p-1",
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  content: "file_open",
                }),
                onclick: () => {
                  this.inputFile.removeAttribute("webkitdirectory");
                  this.inputFile.removeAttribute("directory");
                  this.inputFile.setAttribute("multiple", "true");
                  this.inputFile.click();
                },
                dataBsToggle: "tooltip",
                dataBsTitle: "آپلود فایل",
              }),
              v.button({
                type: "button",
                className: `dicom-folder-open btn p-1`,
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  content: "folder_open",
                }),
                disabled: app.settings.mobile ? "true" : undefined,
                onclick: () => {
                  this.inputFile.setAttribute("webkitdirectory", "true");
                  this.inputFile.setAttribute("directory", "true");
                  this.inputFile.removeAttribute("multiple");
                  this.inputFile.click();
                },
                dataBsToggle: "tooltip",
                dataBsTitle: "آپلود پوشه",
              }),
              v.button({
                type: "button",
                className: `btn p-1 toolbar--item disabled`,
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  content: "save",
                }),
                onclick: () => {
                  saveData();
                },
                dataBsToggle: "tooltip",
                dataBsTitle: "ذخیره",
              }),
            ],
          }),
          v.div({
            className: `${
              app.settings.navbarPosition === "left"
                ? "btn-group-vertical"
                : "btn-group"
            }`,
            role: "group",
            content: [
              v.button({
                type: "button",
                className: "toolbar--item disabled btn p-1",
                disabled: window._noServer_ ? "true" : undefined,
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  content: "download_for_offline",
                }),
                onclick: () => {},
                dataBsToggle: "tooltip",
                dataBsTitle: "رایت سی‌دی",
              }),
            ],
          }),
          app.settings.navbarPosition === "left"
            ? v.hr({
                className: "m-0",
                style: `${primaryColor ? `color:${primaryColor};` : ""}`,
              })
            : v.div({
                className: "vr",
                style: `${primaryColor ? `color:${primaryColor};` : ""}`,
              }),
          v.div({
            className: `${
              app.settings.navbarPosition === "left"
                ? "btn-group-vertical dropend"
                : "btn-group dropdown"
            }`,
            role: "group",
            content: [
              v.button({
                type: "button",
                className: "btn p-1 dropdown-toggle d-flex align-items-center",
                dataBsToggle: "dropdown",
                ariaExpanded: "false",
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  style: "margin-right:-.25rem",
                  content: "grid_view",
                }),
              }),
              v.div({
                className: "dropdown-menu p-1 gap-1",
                style: "min-width:0",
                content: v.div({
                  className: "d-flex flex-column gap-1",
                  content: Array.from({ length: 5 }).map((_, m) =>
                    v.div({
                      className: "d-flex gap-1",
                      content: Array.from({ length: 5 }).map(
                        async (_, n) =>
                          (locals[`square-${m}-${n}`] = await v.a({
                            className:
                              "dropdown-item p-1 border border-secondary",
                            style: "width:24px;height:24px",
                            href: "#",
                            onpointerover: () => {
                              for (let i = 0; i < 5; i++)
                                for (let j = 0; j < 5; j++)
                                  locals[
                                    `square-${i}-${j}`
                                  ].style.backgroundColor =
                                    i <= m && j <= n
                                      ? primaryColor
                                      : "transparent";
                            },
                            onclick: () => {
                              setBoxes(m + 1, n + 1);
                            },
                          }))
                      ),
                    })
                  ),
                }),
              }),
            ],
            dataBsToggle: "tooltip",
            dataBsTitle: "تقسیم‌بندی صفحه",
          }),
          app.settings.navbarPosition === "left"
            ? v.hr({
                className: "m-0",
                style: `${primaryColor ? `color:${primaryColor};` : ""}`,
              })
            : v.div({
                className: "vr",
                style: `${primaryColor ? `color:${primaryColor};` : ""}`,
              }),
          v.div({
            className: `${
              app.settings.navbarPosition === "left"
                ? "btn-group-vertical"
                : "btn-group"
            }`,
            role: "group",
            content: [
              v.button({
                type: "button",
                className: "toolbar--item disabled btn p-1",
                content: (this.linkedIcon = await v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  content: getLinked() ? "link" : "link_off",
                })),
                onclick: () => {
                  setLinked(!getLinked());
                  this.linkedIcon.textContent = getLinked()
                    ? "link"
                    : "link_off";
                },
                dataBsToggle: "tooltip",
                dataBsTitle: "پیوند اندازه‌گذاری با فریم",
              }),
              (this.remove = await v.button({
                type: "button",
                className: "toolbar--item disabled btn p-1",
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  content: "delete_forever",
                }),
                onclick: () => {
                  deleteSelectedMeasurement();
                },
                dataBsToggle: "tooltip",
                dataBsTitle: "حذف اندازه‌گذاری",
              })),
            ],
          }),
          app.settings.navbarPosition === "left"
            ? v.hr({
                className: "m-0",
                style: `${primaryColor ? `color:${primaryColor};` : ""}`,
              })
            : v.div({
                className: "vr",
                style: `${primaryColor ? `color:${primaryColor};` : ""}`,
              }),
          (this.transforms = await v.div({
            className: `${
              app.settings.navbarPosition === "left"
                ? "btn-group-vertical dropend"
                : "btn-group dropdown"
            }`,
            content: [
              v.button({
                type: "button",
                className:
                  "toolbar--item disabled btn dropdown-toggle p-1 d-flex align-items-center",
                dataBsToggle: "dropdown",
                ariaExpanded: "false",
                content: v.span({
                  className:
                    "material-symbols-outlined justify-content-center d-flex",
                  style: "margin-right:-.25rem",
                  content: "flip",
                  dataBsToggle: "tooltip",
                  dataBsTitle: "تبدیل‌ها",
                }),
              }),
              v.ul({
                className: "dropdown-menu dropdown-menu-start px-0 py-1",
                style: {
                  minWidth: "0",
                },
                content: [
                  v.li({
                    content: v.a({
                      className: "dropdown-item py-1 ps-1 pe-3",
                      href: "#",
                      ariaCurrent: "true",
                      content: v.span({
                        className:
                          "material-symbols-outlined justify-content-center d-flex",
                        content: "swap_horiz",
                      }),
                      onclick: () => {
                        addTransform("flip-h");
                      },
                    }),
                    dataBsToggle: !app.settings.mobile && "tooltip",
                    dataBsTitle: "برگردان افقی",
                  }),
                  v.li({
                    content: v.a({
                      className: "dropdown-item py-1 ps-1 pe-3",
                      href: "#",
                      ariaCurrent: "true",
                      content: v.span({
                        className:
                          "material-symbols-outlined justify-content-center d-flex",
                        content: "swap_vert",
                      }),
                      onclick: () => {
                        addTransform("flip-v");
                      },
                    }),
                    dataBsToggle: !app.settings.mobile && "tooltip",
                    dataBsTitle: "برگردان عمودی",
                  }),
                  v.li({
                    content: v.a({
                      className: "dropdown-item py-1 ps-1 pe-3",
                      href: "#",
                      ariaCurrent: "true",
                      content: v.span({
                        className:
                          "material-symbols-outlined justify-content-center d-flex",
                        content: "rotate_right",
                      }),
                      onclick: () => {
                        addTransform(90);
                      },
                    }),
                    dataBsToggle: !app.settings.mobile && "tooltip",
                    dataBsTitle: "چرخش 90‌درجه ساعتگرد",
                  }),
                  v.li({
                    content: v.a({
                      className: "dropdown-item py-1 ps-1 pe-3",
                      href: "#",
                      ariaCurrent: "true",
                      content: v.span({
                        className:
                          "material-symbols-outlined justify-content-center d-flex",
                        content: "rotate_left",
                      }),
                      onclick: () => {
                        addTransform(-90);
                      },
                    }),
                    dataBsToggle: !app.settings.mobile && "tooltip",
                    dataBsTitle: "چرخش 90‌درجه پادساعتگرد",
                  }),
                  v.li(
                    v.hr({
                      className: "dropdown-divider",
                    })
                  ),
                  v.li({
                    content: v.a({
                      className: "dropdown-item py-1 ps-1 pe-3",
                      href: "#",
                      ariaCurrent: "true",
                      content: v.span({
                        className:
                          "material-symbols-outlined justify-content-center d-flex",
                        content: "delete_history",
                      }),
                      onclick: () => {
                        clearTransforms();
                      },
                    }),
                    dataBsToggle: !app.settings.mobile && "tooltip",
                    dataBsTitle: "بازنشانی تبدیل‌ها",
                  }),
                ],
              }),
            ],
          })),
          (this.toolbar = await v.fieldset({
            className: `d-flex flex-wrap gap-1 ${
              app.settings.navbarPosition === "left"
                ? "flex-column"
                : "flex-row"
            }`,
            content: [
              v.div({
                className: "btn-group",
                role: "group",
                content: [
                  (this.invert = await v.input({
                    type: "checkbox",
                    className: "btn-check",
                    id: "btn-check-invert",
                    autocomplete: "off",
                    onchange: () => {
                      invert(this.invert.checked);
                    },
                  })),
                  v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-check-invert",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "invert_colors",
                    }),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "نگاتیو",
                  }),
                ],
              }),
              v.div({
                className: `${
                  app.settings.navbarPosition === "left"
                    ? "btn-group-vertical"
                    : "btn-group"
                }`,
                role: "group",
                content: [
                  (this.None = await v.input({
                    type: "radio",
                    className: "btn-check",
                    name: "btnradio",
                    id: "btn-radio-none",
                    autocomplete: "off",
                    checked: "true",
                    onchange: () => {
                      if (this.None.checked) setTool("none");
                    },
                  })),
                  v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-radio-none",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "arrow_selector_tool",
                    }),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "نشانگر",
                  }),
                  (this.Wwwc = await v.input({
                    type: "radio",
                    className: "btn-check",
                    name: "btnradio",
                    id: "btn-radio-wwwc",
                    autocomplete: "off",
                    onchange: () => {
                      if (this.Wwwc.checked) setTool("wwwc");
                    },
                  })),
                  v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-radio-wwwc",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "contrast",
                    }),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "روشنایی و کنتراست",
                  }),
                  (this.Pan = await v.input({
                    type: "radio",
                    className: "btn-check",
                    name: "btnradio",
                    id: "btn-radio-pan",
                    autocomplete: "off",
                    onchange: () => {
                      if (this.Pan.checked) setTool("pan");
                    },
                  })),
                  v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-radio-pan",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "open_with",
                    }),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "جابجایی",
                  }),
                  (this.Zoom = await v.input({
                    type: "radio",
                    className: "btn-check",
                    name: "btnradio",
                    id: "btn-radio-zoom",
                    autocomplete: "off",
                    onchange: () => {
                      if (this.Zoom.checked) setTool("zoom");
                    },
                  })),
                  v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-radio-zoom",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "zoom_in",
                    }),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "بزرگنمایی",
                  }),
                  (this.Cine = await v.input({
                    type: "radio",
                    className: "btn-check",
                    name: "btnradio",
                    id: "btn-radio-cine",
                    autocomplete: "off",
                    onchange: () => {
                      if (this.Cine.checked) setTool("cine");
                    },
                  })),
                  v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-radio-cine",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "movie",
                    }),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "پویا‌نمایی",
                  }),
                  (this.Measure = await v.input({
                    type: "radio",
                    className: "btn-check",
                    name: "btnradio",
                    id: "btn-radio-measure",
                    autocomplete: "off",
                    onchange: () => {
                      if (this.Measure.checked)
                        setTool(
                          {
                            diagonal_line: "measure_length",
                            architecture: "measure_angle",
                            circle: "measure_oval",
                            rectangle: "measure_rect",
                          }[this.measureIcon.textContent]
                        );
                    },
                  })),
                  (this.measureLabel = await v.label({
                    className: "toolbar--item disabled btn p-1",
                    for: "btn-radio-measure",
                    content: (this.measureIcon = await v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "diagonal_line",
                    })),
                    dataBsToggle: "tooltip",
                    dataBsTitle: "اندازه‌گیری",
                  })),
                  v.label({
                    className: `toolbar--item disabled btn p-0 ${
                      app.settings.navbarPosition === "left"
                        ? "dropend"
                        : "dropdown"
                    }`,
                    content: [
                      v.button({
                        className:
                          "toolbar--item disabled btn border-0 rounded-end dropdown-toggle w-100 h-100 p-1 d-flex align-items-center justify-content-center",
                        type: "button",
                        dataBsToggle: "dropdown",
                        ariaExpanded: "false",
                      }),
                      v.ul({
                        className: "dropdown-menu dropdown-menu-end px-0 py-1",
                        style: {
                          minWidth: "0",
                        },
                        content: [
                          v.li({
                            content: v.a({
                              className: "dropdown-item py-1 ps-2 pe-3",
                              href: "#",
                              ariaCurrent: "true",
                              content: v.span({
                                className:
                                  "material-symbols-outlined justify-content-center d-flex",
                                content: "diagonal_line",
                              }),
                              onclick: () => {
                                this.measureIcon.textContent = "diagonal_line";
                                this.measureIcon.style.removeProperty(
                                  "transform"
                                );
                                bootstrap.Tooltip.getInstance(
                                  this.measureLabel
                                ).setContent({
                                  ".tooltip-inner": "فاصله",
                                });
                                this.Measure.checked = false;
                                this.Measure.click();
                              },
                            }),
                            dataBsToggle: !app.settings.mobile && "tooltip",
                            dataBsTitle: "فاصله",
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item py-1 ps-2 pe-3",
                              href: "#",
                              ariaCurrent: "true",
                              content: v.span({
                                className:
                                  "material-symbols-outlined justify-content-center d-flex",
                                content: "architecture",
                              }),
                              onclick: () => {
                                this.measureIcon.textContent = "architecture";
                                this.measureIcon.style.removeProperty(
                                  "transform"
                                );
                                bootstrap.Tooltip.getInstance(
                                  this.measureLabel
                                ).setContent({
                                  ".tooltip-inner": "زاویه",
                                });
                                this.Measure.checked = false;
                                this.Measure.click();
                              },
                            }),
                            dataBsToggle: !app.settings.mobile && "tooltip",
                            dataBsTitle: "زاویه",
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item py-1 ps-2 pe-3",
                              href: "#",
                              ariaCurrent: "true",
                              content: v.span({
                                className:
                                  "material-symbols-outlined justify-content-center d-flex",
                                style: "transform:scaleY(.8)",
                                content: "circle",
                              }),
                              onclick: () => {
                                this.measureIcon.textContent = "circle";
                                this.measureIcon.style.transform = "scaleY(.8)";
                                bootstrap.Tooltip.getInstance(
                                  this.measureLabel
                                ).setContent({
                                  ".tooltip-inner": "بیضی",
                                });
                                this.Measure.checked = false;
                                this.Measure.click();
                              },
                            }),
                            dataBsToggle: !app.settings.mobile && "tooltip",
                            dataBsTitle: "بیضی",
                          }),
                          v.li({
                            content: v.a({
                              className: "dropdown-item py-1 ps-2 pe-3",
                              href: "#",
                              ariaCurrent: "true",
                              content: v.span({
                                className:
                                  "material-symbols-outlined justify-content-center d-flex",
                                content: "rectangle",
                              }),
                              onclick: () => {
                                this.measureIcon.textContent = "rectangle";
                                this.measureIcon.style.removeProperty(
                                  "transform"
                                );
                                bootstrap.Tooltip.getInstance(
                                  this.measureLabel
                                ).setContent({
                                  ".tooltip-inner": "ناحیه",
                                });
                                this.Measure.checked = false;
                                this.Measure.click();
                              },
                            }),
                            dataBsToggle: !app.settings.mobile && "tooltip",
                            dataBsTitle: "ناحیه",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              v.div({
                className: `${
                  app.settings.navbarPosition === "left"
                    ? "btn-group-vertical"
                    : "btn-group"
                }`,
                role: "group",
                content: [
                  v.button({
                    type: "button",
                    className: "toolbar--item disabled btn p-1",
                    content: v.span({
                      className:
                        "material-symbols-outlined justify-content-center d-flex",
                      content: "restart_alt",
                    }),
                    onclick: () => {
                      resetImage();
                    },
                    dataBsToggle: "tooltip",
                    dataBsTitle: "بازنشانی",
                  }),
                ],
              }),
            ],
          })),
        ],
      }),
    })
    .useStyle("v-navbar-style", {
      "nav .btn-group button:hover, nav .btn-group label:hover": {
        backgroundColor: `${primaryColor} !important`,
        color: `${secondaryColor} !important`,
      },
      "nav .btn-group button, nav .btn-group label": {
        borderColor: `${primaryColor} !important`,
        color: `${primaryColor} !important`,
      },
      "nav .dropdown-menu": {
        backgroundColor: `${secondaryColor} !important`,
      },
      "nav .dropdown-menu *": {
        borderColor: `${primaryColor} !important`,
        color: `${primaryColor} !important`,
      },
      "nav .btn-group .disabled, nav .dropdown-menu .disabled, nav .dropdown-menu .disabled *":
        {
          borderColor: `${v.style.changeColor(primaryColor, {
            light: 0.8,
          })} !important`,
          color: `${v.style.changeColor(primaryColor, {
            light: 0.8,
          })} !important`,
        },
      "nav input:checked+label": {
        backgroundColor: `${primaryColor} !important`,
        color: `${secondaryColor} !important`,
      },
      "nav input:checked+label.disabled": {
        backgroundColor: `${v.style.changeColor(primaryColor, {
          light: 0.8,
        })} !important`,
        color: `${secondaryColor} !important`,
      },
      "nav .dropdown-item:hover, nav .dropdown-item:hover *": {
        backgroundColor: `${primaryColor} !important`,
        color: `${secondaryColor} !important`,
      },
    });
  navbar.invert = this.invert;
  navbar.setup = (box) => {
    this.invert.checked = !!box?.inverted;
    if (box?.target?.getNumberOfFrames() > 1)
      this.Cine.removeAttribute("disabled");
    else {
      this.Cine.setAttribute("disabled", "true");
      if (this.Cine.checked) this.None.click();
    }
    if (box?.selectedLine) {
      this.linkedIcon.textContent =
        box.selectedLine.measure.frame === undefined ? "link_off" : "link";
      this.remove.classList.remove("disabled");
    } else {
      this.linkedIcon.textContent = getLinked() ? "link" : "link_off";
      this.remove.classList.add("disabled");
    }
  };
  navbar.enable = (box) => {
    [...navbar.querySelectorAll(".toolbar--item")].forEach((ti) => {
      if (!ti.disabled) ti.classList.remove("disabled");
    });
    navbar.setup(box);
  };
  navbar.disable = (box) => {
    [...navbar.querySelectorAll(".toolbar--item")].forEach((ti) =>
      ti.classList.add("disabled")
    );
    navbar.setup(box);
  };
  return navbar;
};
