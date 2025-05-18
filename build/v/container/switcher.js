/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
async () => {
  this.container = await v.div();
  this.content = {};
  const findScroller = async (content) => {
    let scroller = Array.isArray(content) ? content[0] : content;
    if (scroller instanceof Promise) scroller = await scroller;
    while (scroller && scroller.scrollHeight <= scroller.offsetHeight)
      scroller = scroller.parentElement;
    return scroller;
  };
  this.hideContent = async () => {
    for (let content of this.container.childNodes) {
      if (
        this.content[content._switcher_title_]?.keepState &&
        !content.classList?.contains("d-none")
      )
        this.content[content._switcher_title_].scrollTop ??=
          (await findScroller(content)?.scrollTop) || 0;
      if (
        !content.classList ||
        this.content[content._switcher_title_]?.disposable
      ) {
        delete this.content[content._switcher_title_]?.content;
        content.remove();
      } else content.classList?.add("d-none");
    }
  };
  this.switch = async (
    title,
    constructor,
    { reload, disposable, keepState = true } = { keepState: true }
  ) => {
    if (reload && this.content[title]?.content) {
      for (let content of Array.isArray(this.content[title].content)
        ? this.content[title].content
        : [this.content[title].content])
        if (content instanceof Promise) (await content).remove();
        else content.remove();
      delete this.content[title].content;
    }
    await this.hideContent();
    if (!this.content[title]?.content) {
      this.content[title] = Object.assign(this.content[title] || {}, {
        content: await constructor(),
        reload,
        disposable,
        keepState,
      });
      if (
        this.content[title].content !== undefined &&
        this.content[title].content !== null
      ) {
        this.content[title].content._switcher_title_ = title;
        this.container.prepend(this.content[title].content);
      }
    } else
      for (let content of Array.isArray(this.content[title].content)
        ? this.content[title].content
        : [this.content[title].content])
        if (content instanceof Promise)
          (await content).classList?.remove("d-none");
        else content.classList?.remove("d-none");
    if (
      this.content[title].content !== undefined &&
      this.content[title].content !== null &&
      keepState
    ) {
      let scroller = await findScroller(this.content[title].content);
      if (scroller) scroller.scrollTop = this.content[title].scrollTop || 0;
      delete this.content[title].scrollTop;
    }
  };
  return this.container;
};
