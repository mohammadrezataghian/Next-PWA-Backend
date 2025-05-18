/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async ({ primaryColor, secondaryColor, useWebGl }) => {
  const sidebar = await v
    .div({
      className: `d-none d-flex ${
        app.settings.sidebarPosition === "bottom"
          ? "flex-row overflow-x-auto"
          : "flex-column overflow-y-auto"
      } flex-shrink-0 align-items-stretch display-content-stretch bg-dark-subtle`,
      style:
        app.settings.sidebarPosition === "bottom"
          ? "height:100px"
          : "width:120px",
      content: (this.listGroup = await v.div({
        className: `flex-grow-1 list-group list-group-flush border-bottom scrollarea ${
          app.settings.sidebarPosition === "bottom"
            ? "list-group-horizontal overflow-x-auto"
            : "overflow-y-auto"
        }`,
      })),
    })
    .useStyle("sidebar-style", {
      ".sidebar-selected": {
        backgroundColor: "#0084 !important",
        boxShadow: "inset 0 0 0 1px " + primaryColor + ", inset 0 0 0 2px " + secondaryColor,
      },
    });
  sidebar.reloadList = async (
    archive,
    renderFrame,
    selectImage,
    box,
    boxes
  ) => {
    if (locals.reloadingList) {
      locals.reloadQue ||= [];
      locals.reloadQue.push({ archive, renderFrame, selectImage, box });
    } else {
      locals.reloadingList = true;
      for (let sid of Object.keys(archive))
        for (let rid of Object.keys(archive[sid])) {
          let target = archive[sid][rid][0];
          while (target && !target.rid) {
            archive[sid][rid] = archive[sid][rid].slice(1);
            target = archive[sid][rid][0];
          }
          if (!target) {
            delete archive[sid][rid];
            if (Object.keys(archive[sid]).length === 0) delete archive[sid];
          } else {
            let item = [...this.listGroup.children].find(
              (c) => c.dataset.fid === target.fid
            );
            if (!item) {
              let canvas = await v.canvas({
                style: { minWidth: "100%" },
              });
              if (target.imageBitmap) {
                renderFrame({
                  imageBitmap: target.imageBitmap,
                  canvasElement: canvas,
                });
              } else {
                renderFrame({
                  image: target.image,
                  frame: 0,
                  windowLevel: undefined,
                  canvasElement: canvas,
                  useWebGl,
                });
              }
              await this.listGroup
                .append(
                  v.a({
                    dataFid: target.fid,
                    href: "#",
                    className:
                      "list-group-item list-group-item-action border flex-shrink-0 px-1 py-1 pt-0 d-flex justify-content-center align-items-center bg-dark-subtle",
                    ariaCurrent: "true",
                    style: {
                      width: "120px",
                      maxWidth: "100%",
                      height: "100px",
                      maxHeight: "100%",
                    },
                    onclick: () => {
                      selectImage(target.fid);
                    },
                    content: v.div({
                      className:
                        "w-100 h-100 overflow-hidden d-flex flex-column",
                      content: [
                        v.span({
                          className:
                            "w-100 p-0 m-0 text-center text-truncate flex-shrink-0",
                          style: "font-size:.8rem",
                          content: target.PatientName || "''",
                        }),
                        v.div({
                          className:
                            "flex-grow-1 d-flex justify-content-center align-items-center overflow-hidden",
                          content: v.div({
                            className:
                              "position-relative flex-grow-1 d-flex justify-content-center align-items-center overflow-hidden",
                            style: "max-height:100%",
                            content: [
                              canvas,
                              v.span({
                                className:
                                  "sidebar-item position-absolute end-0 bottom-0 px-1",
                                style: {
                                  fontSize: ".7rem",
                                  backgroundColor: "#0008",
                                },
                                content: target.getNumberOfFrames(),
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  })
                )
                .then(() => {
                  if (box && !box.target) selectImage(target.fid, box);
                });
            } else {
              item.querySelector(".sidebar-item").textContent =
                target.getNumberOfFrames();
              boxes?.find((b) => b.target?.fid === target.fid)?.update();
            }
          }
        }
      locals.reloadingList = false;
      if (locals.reloadQue?.length) {
        let que = locals.reloadQue.shift();
        sidebar.reloadList(
          que.archive,
          que.renderFrame,
          que.selectImage,
          que.box
        );
      } else if (Object.keys(archive).length > 1 || boxes?.length > 1)
        sidebar.classList.remove("d-none");
      else sidebar.classList.add("d-none");
    }
  };
  sidebar.select = (fid) => {
    for (let c of this.listGroup.children)
      if (c.dataset.fid === fid) {
        c.classList.add("sidebar-selected");
        c.scrollIntoView({ behavior: "instant", block: "nearest" });
      } else c.classList.remove("sidebar-selected");
  };
  return sidebar;
};
