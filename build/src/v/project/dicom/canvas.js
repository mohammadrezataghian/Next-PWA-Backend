/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async ({}) => {
  locals.container = await v.div({
    id: "canvasContainer",
    className: "position-relative",
    content: [
      (locals.canvasElement = await v.canvas()),
    ],
  });
  locals.container.canvasElement = locals.canvasElement;
  return locals.container;
};
