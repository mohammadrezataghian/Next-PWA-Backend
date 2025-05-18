/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async (length, value = 0, color = "turquoise") => {
  this.component = await v.canvas({
    className: "ltr d-block position-fixed top-50 start-50 translate-middle",
    width: `${length}`,
    height: `${length}`,
  });
  this.value = value;
  let spinner = this.component;
  let ctx = spinner.getContext("2d");
  let degrees = 0;
  let new_degrees = 0;
  let difference = 0;
  let bgcolor = v.style.changeColor(color, { alpha: 0.1 });
  let text;
  let animation_loop, redraw_loop;
  const init = () => {
    ctx.clearRect(0, 0, length, length);
    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    let lineWidth = length * 0.16;
    ctx.lineWidth = lineWidth;
    ctx.arc(
      length / 2,
      length / 2,
      length / 2 - lineWidth / 2 - 1,
      0,
      Math.PI * 2,
      false
    );
    ctx.stroke();
    let radians = Math.max(1, degrees * Math.PI) / 180;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.arc(
      length / 2,
      length / 2,
      length / 2 - lineWidth / 2 - 1,
      0 - (90 * Math.PI) / 180,
      radians - (90 * Math.PI) / 180,
      false
    );
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = `${length * 0.16}px arial`;
    text = this.value + "%";
    text_width = ctx.measureText(text).width;
    ctx.fillText(text, length / 2 - text_width / 2, length / 2 + length * 0.08);
  };
  const draw = (degree) => {
    if (typeof animation_loop != undefined) clearInterval(animation_loop);
    new_degrees = degree;
    difference = new_degrees - degrees;
    animation_loop = setInterval(animate_to, 100 / difference);
  };
  const animate_to = () => {
    if (degrees == new_degrees) clearInterval(animation_loop);
    else if (degrees < new_degrees)
      degrees = Math.min(new_degrees, degrees + 5);
    else degrees = Math.max(new_degrees, degrees - 5);
    init();
  };
  this.go = (value) => {
    this.value = value;
    draw(value * 3.6);
  };
  this.addEventListener("add", () => this.go(value));
  return this.component;
};
