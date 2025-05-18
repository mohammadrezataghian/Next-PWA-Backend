/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
// eslint-disable-next-line no-unused-expressions
(...params) => {
  this.static.router ||= ({ routes }) => {
    this.switcher = v.container.switcher();
    this.navigate = async (url) => {
      let Url = await v.dom.parseUrl(url);
      if (Url.href !== locals.currentPathname) {
        window.history.pushState({ pathname: Url.pathname }, null, Url.href);
        for (let key in routes) {
          let route = routes[key];
          if (route[0].test(Url.pathname)) {
            this.switcher.switch(
              key,
              () => route[1](Url.pathname.match(new RegExp(route[0], ""))),
              route[2]
            );
            break;
          }
        }
        locals.currentPathname = Url.href;
      }
    };
    this.addEventListener("add", () => this.navigate());
    return this.switcher;
  };
  if (params[0].routes) return this.static.router(params[0]);
  else return this.static.router({ routes: params[0] });
};
