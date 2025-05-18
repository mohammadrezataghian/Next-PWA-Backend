window.globals ||= {};
let _vHandler_ = {
  get(target, prop, receiver) {
    if (typeof prop === "symbol") {
      return undefined;
    }
    const object = target();
    if (
      object["-parent-"] === _v_ &&
      `<${object["-prop-"]}>` in _v_ &&
      prop in _v_[`<${object["-prop-"]}>`]
    )
      return _v_[`<${object["-prop-"]}>`][prop];
    if (prop in object) {
      return object[prop];
    } else if (prop === "then") {
      return object?.then || object;
    } else {
      const _object_ = { "-parent-": object, "-prop-": prop };
      return (object[prop] = new Proxy(() => _object_, _vHandler_));
    }
  },
  set(target, prop, value) {
    const object = target();
    object[prop] = value;
  },
  path(object) {
    if (object["-parent-"])
      return `${this.path(object["-parent-"])}.${object["-prop-"]}`;
    else return "v";
  },
  apply(target, thisArg, argumentsList) {
    const object = target();
    const path = this.path(object);
    const prop = object["-prop-"];
    const pass = (obj, path, offset) => {
      if (typeof obj !== "object") return offset;
      if (path[offset] in obj)
        if (offset === path.length - 1) return offset + 1;
        else return pass(obj[path[offset]], path, offset + 1);
      else return offset;
    };
    const parseVStrFunc = (f, ext) => {
      let summary = "";
      let pointer = 0;
      while (pointer < f.length) {
        while (pointer < f.length && " \t\n\r\v".includes(f[pointer]))
          pointer++;
        if (pointer < f.length - 1 && f[pointer] === "/") {
          if (f[pointer + 1] === "/")
            pointer = f.indexOf("\n", pointer + 2) + 1 || f.length;
          else if (f[pointer + 1] === "*") {
            let start = pointer;
            pointer += 1;
            while (pointer < f.length) {
              pointer = f.indexOf("*", pointer + 1) + 1 || f.length;
              if (pointer < f.length && f[pointer] === "/") {
                pointer++;
                break;
              }
            }
            if (
              start + 2 < f.length &&
              f[start + 2] === "*" &&
              f[pointer - 2] === "*" &&
              f[pointer - 1] === "/"
            )
              summary = f.slice(start, pointer);
          }
        } else break;
      }
      pointer = Math.min(pointer, f.length);
      let comment = f.slice(0, pointer);
      let func = f.slice(pointer).trim();
      let rawBody = func;
      let params =
        /^[\s\t\r\n]*?(async)?\s*?\(/g.test(func) ||
        /^[\s\t\r\n]*?function/g.test(func)
          ? func.slice(func.indexOf("("), func.indexOf(")") + 1)
          : "()";
      if (ext === ".js") {
        if (
          !func.startsWith("(") &&
          !func.startsWith("async") &&
          !func.startsWith("function")
        ) {
          func = "()=>{\n" + func + "\n}";
        }
      }
      return { comment, summary, body: func, params, rawBody };
    };
    const copyProps = (source, dest) => {
      if (source?.ISVF && dest?.ISVF) {
        source["-props-"] ||= {};
        dest["-props-"] ||= {};
        let props = Object.getOwnPropertyNames(source["-props-"]);
        for (let key of props) {
          if (!(key in dest["-props-"])) {
            let desc = Object.getOwnPropertyDescriptor(source["-props-"], key);
            Object.defineProperty(dest["-props-"], key, desc);
          }
        }
      }
    };
    const copyListeners = (source, dest) => {
      if (source && dest) {
        source.listeners ||= {};
        dest.listeners ||= {};
        for (let key in source.listeners) {
          if (key !== "onload") {
            if (!(key in dest.listeners)) {
              dest.listeners[key] = source.listeners[key];
            } else {
              for (let listener of source.listeners[key]) {
                if (
                  dest.listeners[key].every(
                    (l) =>
                      l.callback !== listener.callback ||
                      JSON.stringify(l.options) !==
                        JSON.stringify(listener.options)
                  )
                ) {
                  dest.listeners[key].push(listener);
                }
              }
            }
          }
        }
      }
    };
    const sendResult = (reg, result) => {
      if (result?.ISVF) {
        result["-setup-"]._owner_ = reg.proxy;
        result.then((product) => {
          copyListeners(result, reg.proxy);
          copyProps(result, reg.proxy);
          sendResult(reg, product);
        });
      } else if (
        (reg.func.isAsync || reg.proxy.isAsync) &&
        result instanceof Promise
      )
        result.then((product) => sendResult(reg, product));
      else {
        if (result?._owner_) {
          copyListeners(result._owner_, reg.proxy);
          copyProps(result._owner_, reg.proxy);
        }
        if (result && typeof result === "object" && !path.startsWith("v.api."))
          result._owner_ = reg.proxy;
        reg.proxy["-setup-"].result = result;
        reg.proxy["-setup-"].resolved = true;
        if (false)
          if (result instanceof Node) {
            let classes = result.className
              .split(" ")
              .filter((c) => c.trim().length);
            if (
              reg.proxy.path === "v.element" ||
              reg.func.isLocalGeneratedFunction
            ) {
              if (!classes.includes(`v--${prop}`))
                classes.splice(0, 0, `v--${prop}`);
              if (!classes.includes("-v-")) classes.push("-v-");
            } else {
              if (!classes.includes(`v-${prop}`))
                classes.splice(0, 0, `v-${prop}`);
              let addr = path.split(".");
              let c = "-";
              for (let a of addr) {
                c += a + "-";
                if (!classes.includes(c)) classes.push(c);
              }
            }
            result.className = classes.join(" ");
          }
        if (result && result._owner_)
          for (let p in result._owner_["-props-"])
            if (!(p in result)) result[p] = result._owner_["-props-"][p];
        reg.proxy.onload?.(reg.proxy);
        for (let i = 0; i < reg.proxy?.listeners.onload?.length; i++) {
          const listener = reg.proxy.listeners.onload[i];
          listener.callback(reg.proxy);
          if (listener.options?.once) {
            reg.proxy.listeners.onload.splice(i, 1);
            if (reg.proxy.listeners.onload.length === 0) {
              delete reg.proxy.listeners.onload;
            }
            i--;
          }
        }
        reg.resolve(result);
      }
    };
    const callFunc = (f, reg) => {
      f.then((func) => {
        reg.func = func;
        let result = func.call(reg.proxy, window.v, window.app)(...reg.args);
        sendResult(reg, result);
      });
    };
    const reg = { args: argumentsList };
    object[prop] ||= new Promise((resolve) => {
      if (prop === "element") {
        const f = new Function(
          `return function v_element(v,app,static=this.static,locals={}){const that=this;return _v_["-element-"]}`
        )();
        f.isAsync = true;
        f.isLocalGeneratedFunction = false;
        resolve(f);
      } else if (path.startsWith("v.api.")) {
        const f = new Function(
          `return function ${path.replace(
            /\./g,
            "_"
          )}(){return async (data)=>{return await fetch("/${path.replace(
            /\./g,
            "/"
          )}/",{method:"POST",headers:{"content-type":typeof data==="string"?"text/plain":"application/json"},body:typeof data==="string"?data:JSON.stringify(data)}).then(res=>res.headers.get("content-type")?.includes("application/json")?res.json():res.text())}}`
        )();
        f.isLocalGeneratedFunction = false;
        resolve(f);
      } else {
        window.v["-map-"] ||= fetch("/v/v.map.js")
          .then((response) => response.text())
          .then((vmap) => {
            let parsed = parseVStrFunc(vmap);
            let vm = new Function(`${parsed.body}\nreturn v;`)();
            return vm;
          });
        window.v["-map-"].then((vm) => {
          const addr = path.split(".");
          const blocks = pass(vm, addr, 1);
          const part = addr.slice(0, blocks).join(".");
          let partialTarget = vm;
          for (let p of addr.slice(1, blocks)) partialTarget = partialTarget[p];
          if (
            part === "v" ||
            (blocks === 2 && typeof partialTarget === "object")
          ) {
            const f = new Function(
              `return function ${path.replace(
                /\./g,
                "_"
              )}(v,app,static=this.static,locals={}){return (...params)=>{if(params.length!==1)params={content:params};else if(Array.isArray(params[0])||typeof params[0]!=="object"||params[0] instanceof Promise||params[0] instanceof Node)params={content:params[0]};else params=params[0];return v.element({tag:'${prop}',...params})}}`
            )();
            f.isLocalGeneratedFunction = true;
            resolve(f);
          } else if (part !== path && typeof partialTarget !== "object") {
            const f = new Function(
              `return function ${part.replace(
                /\./g,
                "_"
              )}(v,app,static=this.static,locals={}){const that=this;return async(...args)=>{v["-part-"]["${part}"]||=new Promise(resolve=>${part}().then(resolve));const result=await v["-part-"]["${part}"];that["-setup-"].isAsync=result.${addr
                .slice(blocks)
                .join(
                  "."
                )}.toString().trim().startsWith("async");return result.${addr
                .slice(blocks)
                .join(".")}.call(that,...args)}}`
            )();
            f.isLocalGeneratedFunction = false;
            resolve(f);
          } else {
            let filepath = part.substring(2).replace(/\./gm, "/");
            if (filepath.endsWith("_css")) {
              filepath = filepath.substring(0, filepath.length - 4) + ".css";
            } else if (
              filepath.endsWith("_scss") ||
              filepath.endsWith("_sass")
            ) {
              filepath = filepath.substring(0, filepath.length - 5) + ".css";
            } else if (filepath.endsWith("_json")) {
              filepath = filepath.substring(0, filepath.length - 5) + ".json";
            } else if (filepath.endsWith("_html")) {
              filepath = filepath.substring(0, filepath.length - 5) + ".html";
            } else {
              filepath += ".js";
            }
            fetch(`/v/${filepath}`)
              .then((response) => response.text())
              .then((result) => {
                if (filepath.endsWith(".js")) {
                  const parsed = parseVStrFunc(result, ".js");
                  if (parsed.rawBody === "Not Found")
                    parsed.body = `()=>"«${path}» Not Found"`;
                  const f = new Function(
                    `return function ${part.replace(
                      /\./g,
                      "_"
                    )}(v,app,static=this.static,locals={}){const that=this;return ${
                      parsed.body
                    }\n}`
                  )();
                  f.isAsync = parsed.body.startsWith("async");
                  f.isLocalGeneratedFunction = false;
                  resolve(f);
                } else {
                  const parsed = parseVStrFunc(result);
                  const f = () => () => {
                    if (filepath.endsWith(".json"))
                      return JSON.parse(parsed.body);
                    else return parsed.body;
                  };
                  f.isLocalGeneratedFunction = false;
                  resolve(f);
                }
              })
              .catch((errr) => {
                console.log(errr);
              });
          }
        });
      }
    });
    object[prop].static ||= {};
    reg.promise = new Promise((resolve) => {
      reg.resolve = (result) => {
        resolve(result);
      };
    });
    reg.promise["-template-"] = null;
    reg.promise["-setup-"] = {
      ISVF: true,
      reg: reg,
      name: prop,
      path: path,
      self: object["-parent-"][prop],
      static: object[prop].static,
      listeners: {},
      postCall:
        (fname, filter = (r) => r instanceof Node) =>
        (...args) => {
          reg.promise.then((result) => {
            let results = (Array.isArray(result) ? result : [result]).filter(
              filter
            );
            for (let r of results) r[fname](...args);
          });
          return reg.proxy;
        },
      addEventListener: (event, callback, options = { once: false }) => {
        reg.promise["-setup-"].listeners[event] ||= [];
        let listener = {
          event,
          callback,
          options,
        };
        reg.promise["-setup-"].listeners[event].push(listener);
        if (
          reg.promise["-setup-"].result &&
          reg.promise["-setup-"].result instanceof Element
        )
          if (event === "onresize")
            resizeObserver.observe(reg.promise["-setup-"].result);
          else if (event === "onintersect" || event === "onoutofview")
            if (Object.keys(options).length > 1) {
              let { once, ...originalOptions } = options;
              listener.intersectionObserver = new IntersectionObserver(
                intersectionObserverHandler,
                originalOptions
              );
              listener.intersectionObserver.observe(
                reg.promise["-setup-"].result
              );
            } else intersectionObserver.observe(reg.promise["-setup-"].result);
        return reg.proxy;
      },
      addOneTimeListener: (event, callback, options = {}) => {
        return reg.promise.addEventListener(event, callback, {
          ...options,
          once: true,
        });
      },
      removeEventListener: (event, callback) => {
        if (event in reg.promise["-setup-"].listeners) {
          if (callback)
            reg.promise["-setup-"].listeners[event] = reg.promise[
              "-setup-"
            ].listeners[event].filter(
              (listener) => listener.callback !== callback
            );
          if (!callback || !reg.promise["-setup-"].listeners[event].length)
            delete reg.promise["-setup-"].listeners[event];
        }
        if (
          reg.promise["-setup-"].result &&
          reg.promise["-setup-"].result instanceof Element
        )
          if (event === "onresize")
            resizeObserver.unobserve(reg.promise["-setup-"].result);
          else if (
            (event === "onintersect" || event === "onoutofview") &&
            !reg.promise["-setup-"].listeners.onintersect?.length &&
            !reg.promise["-setup-"].listeners.onoutofview?.length
          )
            intersectionObserver.unobserve(reg.promise["-setup-"].result);
        return reg.proxy;
      },
      clearEventListeners: (event) => {
        return reg.promise.removeEventListener(event);
      },
      clearAllEventListeners: () => {
        for (let key in reg.promise.listeners)
          reg.promise.removeEventListener(key);
        return reg.proxy;
      },
      result: null,
      _owner_: null,
      resolved: false,
    };
    reg.promise["-setup-"].Id = reg.promise["-setup-"].postCall("Id");
    reg.promise["-setup-"].Style = reg.promise["-setup-"].postCall("Style");
    reg.promise["-setup-"].class = reg.promise["-setup-"].postCall("class");
    reg.promise["-setup-"].extend = reg.promise["-setup-"].postCall("extend");
    reg.promise["-setup-"].useStyle =
      reg.promise["-setup-"].postCall("useStyle");
    reg.promise["-props-"] = {
      // onload: null,
      // onadd: null,
      // onremove: null,
      // onresize: null,
      // onintersect: null,
      // onoutofview: null,
    };
    reg.proxy = new Proxy(reg.promise, {
      get(target, p, receiver) {
        if (typeof target[p] === "function") {
          return new Proxy(target[p], {
            apply(target, thisArg, argArray) {
              return target.call(reg.promise, ...argArray);
            },
          });
        } else if (p in target) {
          return target[p];
        } else if (p in target["-props-"]) {
          return target["-props-"][p];
        } else if (p in object[prop].static) return object[prop].static[p];
        else return target["-setup-"][p];
      },
      set(target, p, newValue, receiver) {
        if (p in target) target[p] = newValue;
        else target["-props-"][p] = newValue;
        return true;
      },
      has(target, p) {
        return (
          p in target || p in target["-props-"] || p in object[prop].static
        );
      },
      deleteProperty(target, p) {
        if (p in target) delete target[p];
        else if (p in target["-props-"]) delete target["-props-"][p];
      },
    });
    callFunc(object[prop], reg);
    return reg.proxy;
  },
};
let _apiProxyHandler_ = {
  get(target, p, receiver) {
    return new Proxy(
      () => target() + "/" + p.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
      _apiProxyHandler_
    );
  },
  apply(target, thisArg, argArray) {
    let pathdata = target();
    let method = pathdata;
    let pathname = argArray[0];
    let data = argArray[1];
    if (pathdata.includes("/")) {
      method = pathdata.substring(0, pathdata.indexOf("/"));
      pathname = pathdata.substring(pathdata.indexOf("/"));
      data = argArray[0];
    }
    return fetch(
      pathname,
      method === "GET"
        ? undefined
        : {
            method,
            headers: {
              "content-type":
                typeof data === "string" ? "text/plain" : "application/json",
            },
            body: typeof data === "string" ? data : JSON.stringify(data),
          }
    ).then((res) =>
      res.headers.get("content-type")?.includes("application/json")
        ? res.json()
        : res.text()
    );
  },
};
let _cache_ = {};
let _singleton_tags_ = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "plaintext",
  "source",
  "track",
  "wbr",
  "menuitem",
  "frame",
  "DOCTYPE", // <!DOCTYPE HTML>
  "comment", // <!-- comment -->
];
let _v_ = {
  "-map-": null,
  "-part-": {},
  "<api>": {
    post: new Proxy(() => "POST", _apiProxyHandler_),
    get: new Proxy(() => "GET", _apiProxyHandler_),
    uid: () => window.v.api.post.api.getUid(),
  },
  dom: {
    parameterize: (params) => {
      if (params.length !== 1) params = { content: params };
      else if (
        Array.isArray(params[0]) ||
        typeof params[0] !== "object" ||
        params[0] instanceof Promise ||
        params[0] instanceof Node ||
        params[0] instanceof Element
      )
        params = { content: params[0] };
      else params = params[0];
      if (params === null || params === undefined) return {};
      let { tag, content, className, style, extend, Extend, ...attributes } =
        params;
      if (style && typeof style === "object")
        style = window.v.dom.stringifyStyle(style);
      extend ||= Extend;
      if (extend) {
        let ext = window.v.dom.parameterize(
          Array.isArray(extend) ? extend : [extend]
        );
        tag = ext.tag || tag;
        if (ext.content)
          content = (Array.isArray(content) ? content : [content]).concat(
            Array.isArray(ext.content) ? ext.content : [ext.content]
          );
        if (ext.className)
          className = window.v.dom.extendClass(className || "", ext.className);
        if (Array.isArray(className)) className = className.join(" ");
        if (style || ext.style)
          style =
            (style || "") +
            ((style || "").trim().endsWith(";") ? "" : ";") +
            (ext.style || "");
        attributes = Object.assign(attributes || {}, ext.attributes || {});
      }
      return { tag, content, className, style, attributes };
    },
    stringifyStyle: (key, value, dent = 0) => {
      if (value === undefined && typeof key === "object") {
        value = key;
        key = "";
      } else if (!value) return "";
      if (typeof value === "string")
        return `${"  ".repeat(dent)}${key.replace(
          /([A-Z])/g,
          (m) => `-${m.toLowerCase()}`
        )}:${value};${dent ? "\n" : ""}`;
      else
        return `${"  ".repeat(dent)}${key}${key && " {"}\n${Object.entries(
          value
        )
          .map(([_key, _value]) =>
            window.v.dom.stringifyStyle(_key, _value, dent + 1)
          )
          .join("")}${"  ".repeat(dent)}${key && "}\n"}`;
    },
    extendClass: (targetClassName, extendedClassName) => {
      let classes = (
        typeof targetClassName === "string"
          ? targetClassName.split(" ")
          : targetClassName
      ).filter((c) => c.length);
      let newClasses = (
        typeof extendedClassName === "string"
          ? extendedClassName.split(" ")
          : extendedClassName
      ).filter((c) => c.length);
      for (let c of newClasses) if (!classes.includes(c)) classes.push(c);
      return classes.join(" ");
    },
    parseUrl: (url) => {
      const Url = new URL(url || window.location.href, window.location.origin);
      Url.query = Object.fromEntries(new URLSearchParams(Url.search).entries());
      return Url;
    },
    hxn: (hex) => "0123456789abcdef".indexOf(hex.toLowerCase()),
    nhx: (n) => "0123456789abcdef"[n],
    namedColors: {
      transparent: {
        code: "$0000",
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,
      },
      aliceblue: {
        code: "#f0f8ff",
        red: 240,
        green: 248,
        blue: 255,
        alpha: 255,
      },
      antiquewhite: {
        code: "#faebd7",
        red: 250,
        green: 235,
        blue: 215,
        alpha: 255,
      },
      aqua: {
        code: "#00ffff",
        red: 0,
        green: 255,
        blue: 255,
        alpha: 255,
      },
      aquamarine: {
        code: "#7fffd4",
        red: 127,
        green: 255,
        blue: 212,
        alpha: 255,
      },
      azure: {
        code: "#f0ffff",
        red: 240,
        green: 255,
        blue: 255,
        alpha: 255,
      },
      beige: {
        code: "#f5f5dc",
        red: 245,
        green: 245,
        blue: 220,
        alpha: 255,
      },
      bisque: {
        code: "#ffe4c4",
        red: 255,
        green: 228,
        blue: 196,
        alpha: 255,
      },
      black: {
        code: "#000000",
        red: 0,
        green: 0,
        blue: 0,
        alpha: 255,
      },
      blanchedalmond: {
        code: "#ffebcd",
        red: 255,
        green: 235,
        blue: 205,
        alpha: 255,
      },
      blue: {
        code: "#0000ff",
        red: 0,
        green: 0,
        blue: 255,
        alpha: 255,
      },
      blueviolet: {
        code: "#8a2be2",
        red: 138,
        green: 43,
        blue: 226,
        alpha: 255,
      },
      brown: {
        code: "#a52a2a",
        red: 165,
        green: 42,
        blue: 42,
        alpha: 255,
      },
      burlywood: {
        code: "#deb887",
        red: 222,
        green: 184,
        blue: 135,
        alpha: 255,
      },
      cadetblue: {
        code: "#5f9ea0",
        red: 95,
        green: 158,
        blue: 160,
        alpha: 255,
      },
      chartreuse: {
        code: "#7fff00",
        red: 127,
        green: 255,
        blue: 0,
        alpha: 255,
      },
      chocolate: {
        code: "#d2691e",
        red: 210,
        green: 105,
        blue: 30,
        alpha: 255,
      },
      coral: {
        code: "#ff7f50",
        red: 255,
        green: 127,
        blue: 80,
        alpha: 255,
      },
      cornflowerblue: {
        code: "#6495ed",
        red: 100,
        green: 149,
        blue: 237,
        alpha: 255,
      },
      cornsilk: {
        code: "#fff8dc",
        red: 255,
        green: 248,
        blue: 220,
        alpha: 255,
      },
      crimson: {
        code: "#dc143c",
        red: 220,
        green: 20,
        blue: 60,
        alpha: 255,
      },
      cyan: {
        code: "#00ffff",
        red: 0,
        green: 255,
        blue: 255,
        alpha: 255,
      },
      darkblue: {
        code: "#00008b",
        red: 0,
        green: 0,
        blue: 139,
        alpha: 255,
      },
      darkcyan: {
        code: "#008b8b",
        red: 0,
        green: 139,
        blue: 139,
        alpha: 255,
      },
      darkgoldenrod: {
        code: "#b8860b",
        red: 184,
        green: 134,
        blue: 11,
        alpha: 255,
      },
      darkgray: {
        code: "#a9a9a9",
        red: 169,
        green: 169,
        blue: 169,
        alpha: 255,
      },
      darkgreen: {
        code: "#006400",
        red: 0,
        green: 100,
        blue: 0,
        alpha: 255,
      },
      darkgrey: {
        code: "#a9a9a9",
        red: 169,
        green: 169,
        blue: 169,
        alpha: 255,
      },
      darkkhaki: {
        code: "#bdb76b",
        red: 189,
        green: 183,
        blue: 107,
        alpha: 255,
      },
      darkmagenta: {
        code: "#8b008b",
        red: 139,
        green: 0,
        blue: 139,
        alpha: 255,
      },
      darkolivegreen: {
        code: "#556b2f",
        red: 85,
        green: 107,
        blue: 47,
        alpha: 255,
      },
      darkorange: {
        code: "#ff8c00",
        red: 255,
        green: 140,
        blue: 0,
        alpha: 255,
      },
      darkorchid: {
        code: "#9932cc",
        red: 153,
        green: 50,
        blue: 204,
        alpha: 255,
      },
      darkred: {
        code: "#8b0000",
        red: 139,
        green: 0,
        blue: 0,
        alpha: 255,
      },
      darksalmon: {
        code: "#e9967a",
        red: 233,
        green: 150,
        blue: 122,
        alpha: 255,
      },
      darkseagreen: {
        code: "#8fbc8f",
        red: 143,
        green: 188,
        blue: 143,
        alpha: 255,
      },
      darkslateblue: {
        code: "#483d8b",
        red: 72,
        green: 61,
        blue: 139,
        alpha: 255,
      },
      darkslategray: {
        code: "#2f4f4f",
        red: 47,
        green: 79,
        blue: 79,
        alpha: 255,
      },
      darkslategrey: {
        code: "#2f4f4f",
        red: 47,
        green: 79,
        blue: 79,
        alpha: 255,
      },
      darkturquoise: {
        code: "#00ced1",
        red: 0,
        green: 206,
        blue: 209,
        alpha: 255,
      },
      darkviolet: {
        code: "#9400d3",
        red: 148,
        green: 0,
        blue: 211,
        alpha: 255,
      },
      deeppink: {
        code: "#ff1493",
        red: 255,
        green: 20,
        blue: 147,
        alpha: 255,
      },
      deepskyblue: {
        code: "#00bfff",
        red: 0,
        green: 191,
        blue: 255,
        alpha: 255,
      },
      dimgray: {
        code: "#696969",
        red: 105,
        green: 105,
        blue: 105,
        alpha: 255,
      },
      dimgrey: {
        code: "#696969",
        red: 105,
        green: 105,
        blue: 105,
        alpha: 255,
      },
      dodgerblue: {
        code: "#1e90ff",
        red: 30,
        green: 144,
        blue: 255,
        alpha: 255,
      },
      firebrick: {
        code: "#b22222",
        red: 178,
        green: 34,
        blue: 34,
        alpha: 255,
      },
      floralwhite: {
        code: "#fffaf0",
        red: 255,
        green: 250,
        blue: 240,
        alpha: 255,
      },
      forestgreen: {
        code: "#228b22",
        red: 34,
        green: 139,
        blue: 34,
        alpha: 255,
      },
      fuchsia: {
        code: "#ff00ff",
        red: 255,
        green: 0,
        blue: 255,
        alpha: 255,
      },
      gainsboro: {
        code: "#dcdcdc",
        red: 220,
        green: 220,
        blue: 220,
        alpha: 255,
      },
      ghostwhite: {
        code: "#f8f8ff",
        red: 248,
        green: 248,
        blue: 255,
        alpha: 255,
      },
      gold: {
        code: "#ffd700",
        red: 255,
        green: 215,
        blue: 0,
        alpha: 255,
      },
      goldenrod: {
        code: "#daa520",
        red: 218,
        green: 165,
        blue: 32,
        alpha: 255,
      },
      gray: {
        code: "#808080",
        red: 128,
        green: 128,
        blue: 128,
        alpha: 255,
      },
      green: {
        code: "#008000",
        red: 0,
        green: 128,
        blue: 0,
        alpha: 255,
      },
      greenyellow: {
        code: "#adff2f",
        red: 173,
        green: 255,
        blue: 47,
        alpha: 255,
      },
      grey: {
        code: "#808080",
        red: 128,
        green: 128,
        blue: 128,
        alpha: 255,
      },
      honeydew: {
        code: "#f0fff0",
        red: 240,
        green: 255,
        blue: 240,
        alpha: 255,
      },
      hotpink: {
        code: "#ff69b4",
        red: 255,
        green: 105,
        blue: 180,
        alpha: 255,
      },
      indianred: {
        code: "#cd5c5c",
        red: 205,
        green: 92,
        blue: 92,
        alpha: 255,
      },
      indigo: {
        code: "#4b0082",
        red: 75,
        green: 0,
        blue: 130,
        alpha: 255,
      },
      ivory: {
        code: "#fffff0",
        red: 255,
        green: 255,
        blue: 240,
        alpha: 255,
      },
      khaki: {
        code: "#f0e68c",
        red: 240,
        green: 230,
        blue: 140,
        alpha: 255,
      },
      lavender: {
        code: "#e6e6fa",
        red: 230,
        green: 230,
        blue: 250,
        alpha: 255,
      },
      lavenderblush: {
        code: "#fff0f5",
        red: 255,
        green: 240,
        blue: 245,
        alpha: 255,
      },
      lawngreen: {
        code: "#7cfc00",
        red: 124,
        green: 252,
        blue: 0,
        alpha: 255,
      },
      lemonchiffon: {
        code: "#fffacd",
        red: 255,
        green: 250,
        blue: 205,
        alpha: 255,
      },
      lightblue: {
        code: "#add8e6",
        red: 173,
        green: 216,
        blue: 230,
        alpha: 255,
      },
      lightcoral: {
        code: "#f08080",
        red: 240,
        green: 128,
        blue: 128,
        alpha: 255,
      },
      lightcyan: {
        code: "#e0ffff",
        red: 224,
        green: 255,
        blue: 255,
        alpha: 255,
      },
      lightgoldenrodyellow: {
        code: "#fafad2",
        red: 250,
        green: 250,
        blue: 210,
        alpha: 255,
      },
      lightgray: {
        code: "#d3d3d3",
        red: 211,
        green: 211,
        blue: 211,
        alpha: 255,
      },
      lightgreen: {
        code: "#90ee90",
        red: 144,
        green: 238,
        blue: 144,
        alpha: 255,
      },
      lightgrey: {
        code: "#d3d3d3",
        red: 211,
        green: 211,
        blue: 211,
        alpha: 255,
      },
      lightpink: {
        code: "#ffb6c1",
        red: 255,
        green: 182,
        blue: 193,
        alpha: 255,
      },
      lightsalmon: {
        code: "#ffa07a",
        red: 255,
        green: 160,
        blue: 122,
        alpha: 255,
      },
      lightseagreen: {
        code: "#20b2aa",
        red: 32,
        green: 178,
        blue: 170,
        alpha: 255,
      },
      lightskyblue: {
        code: "#87cefa",
        red: 135,
        green: 206,
        blue: 250,
        alpha: 255,
      },
      lightslategray: {
        code: "#778899",
        red: 119,
        green: 136,
        blue: 153,
        alpha: 255,
      },
      lightslategrey: {
        code: "#778899",
        red: 119,
        green: 136,
        blue: 153,
        alpha: 255,
      },
      lightsteelblue: {
        code: "#b0c4de",
        red: 176,
        green: 196,
        blue: 222,
        alpha: 255,
      },
      lightyellow: {
        code: "#ffffe0",
        red: 255,
        green: 255,
        blue: 224,
        alpha: 255,
      },
      lime: {
        code: "#00ff00",
        red: 0,
        green: 255,
        blue: 0,
        alpha: 255,
      },
      limegreen: {
        code: "#32cd32",
        red: 50,
        green: 205,
        blue: 50,
        alpha: 255,
      },
      linen: {
        code: "#faf0e6",
        red: 250,
        green: 240,
        blue: 230,
        alpha: 255,
      },
      magenta: {
        code: "#ff00ff",
        red: 255,
        green: 0,
        blue: 255,
        alpha: 255,
      },
      maroon: {
        code: "#800000",
        red: 128,
        green: 0,
        blue: 0,
        alpha: 255,
      },
      mediumaquamarine: {
        code: "#66cdaa",
        red: 102,
        green: 205,
        blue: 170,
        alpha: 255,
      },
      mediumblue: {
        code: "#0000cd",
        red: 0,
        green: 0,
        blue: 205,
        alpha: 255,
      },
      mediumorchid: {
        code: "#ba55d3",
        red: 186,
        green: 85,
        blue: 211,
        alpha: 255,
      },
      mediumpurple: {
        code: "#9370db",
        red: 147,
        green: 112,
        blue: 219,
        alpha: 255,
      },
      mediumseagreen: {
        code: "#3cb371",
        red: 60,
        green: 179,
        blue: 113,
        alpha: 255,
      },
      mediumslateblue: {
        code: "#7b68ee",
        red: 123,
        green: 104,
        blue: 238,
        alpha: 255,
      },
      mediumspringgreen: {
        code: "#00fa9a",
        red: 0,
        green: 250,
        blue: 154,
        alpha: 255,
      },
      mediumturquoise: {
        code: "#48d1cc",
        red: 72,
        green: 209,
        blue: 204,
        alpha: 255,
      },
      mediumvioletred: {
        code: "#c71585",
        red: 199,
        green: 21,
        blue: 133,
        alpha: 255,
      },
      midnightblue: {
        code: "#191970",
        red: 25,
        green: 25,
        blue: 112,
        alpha: 255,
      },
      mintcream: {
        code: "#f5fffa",
        red: 245,
        green: 255,
        blue: 250,
        alpha: 255,
      },
      mistyrose: {
        code: "#ffe4e1",
        red: 255,
        green: 228,
        blue: 225,
        alpha: 255,
      },
      moccasin: {
        code: "#ffe4b5",
        red: 255,
        green: 228,
        blue: 181,
        alpha: 255,
      },
      navajowhite: {
        code: "#ffdead",
        red: 255,
        green: 222,
        blue: 173,
        alpha: 255,
      },
      navy: {
        code: "#000080",
        red: 0,
        green: 0,
        blue: 128,
        alpha: 255,
      },
      oldlace: {
        code: "#fdf5e6",
        red: 253,
        green: 245,
        blue: 230,
        alpha: 255,
      },
      olive: {
        code: "#808000",
        red: 128,
        green: 128,
        blue: 0,
        alpha: 255,
      },
      olivedrab: {
        code: "#6b8e23",
        red: 107,
        green: 142,
        blue: 35,
        alpha: 255,
      },
      orange: {
        code: "#ffa500",
        red: 255,
        green: 165,
        blue: 0,
        alpha: 255,
      },
      orangered: {
        code: "#ff4500",
        red: 255,
        green: 69,
        blue: 0,
        alpha: 255,
      },
      orchid: {
        code: "#da70d6",
        red: 218,
        green: 112,
        blue: 214,
        alpha: 255,
      },
      palegoldenrod: {
        code: "#eee8aa",
        red: 238,
        green: 232,
        blue: 170,
        alpha: 255,
      },
      palegreen: {
        code: "#98fb98",
        red: 152,
        green: 251,
        blue: 152,
        alpha: 255,
      },
      paleturquoise: {
        code: "#afeeee",
        red: 175,
        green: 238,
        blue: 238,
        alpha: 255,
      },
      palevioletred: {
        code: "#db7093",
        red: 219,
        green: 112,
        blue: 147,
        alpha: 255,
      },
      papayawhip: {
        code: "#ffefd5",
        red: 255,
        green: 239,
        blue: 213,
        alpha: 255,
      },
      peachpuff: {
        code: "#ffdab9",
        red: 255,
        green: 218,
        blue: 185,
        alpha: 255,
      },
      peru: {
        code: "#cd853f",
        red: 205,
        green: 133,
        blue: 63,
        alpha: 255,
      },
      pink: {
        code: "#ffc0cb",
        red: 255,
        green: 192,
        blue: 203,
        alpha: 255,
      },
      plum: {
        code: "#dda0dd",
        red: 221,
        green: 160,
        blue: 221,
        alpha: 255,
      },
      powderblue: {
        code: "#b0e0e6",
        red: 176,
        green: 224,
        blue: 230,
        alpha: 255,
      },
      purple: {
        code: "#800080",
        red: 128,
        green: 0,
        blue: 128,
        alpha: 255,
      },
      red: {
        code: "#ff0000",
        red: 255,
        green: 0,
        blue: 0,
        alpha: 255,
      },
      rosybrown: {
        code: "#bc8f8f",
        red: 188,
        green: 143,
        blue: 143,
        alpha: 255,
      },
      royalblue: {
        code: "#4169e1",
        red: 65,
        green: 105,
        blue: 225,
        alpha: 255,
      },
      saddlebrown: {
        code: "#8b4513",
        red: 139,
        green: 69,
        blue: 19,
        alpha: 255,
      },
      salmon: {
        code: "#fa8072",
        red: 250,
        green: 128,
        blue: 114,
        alpha: 255,
      },
      sandybrown: {
        code: "#f4a460",
        red: 244,
        green: 164,
        blue: 96,
        alpha: 255,
      },
      seagreen: {
        code: "#2e8b57",
        red: 46,
        green: 139,
        blue: 87,
        alpha: 255,
      },
      seashell: {
        code: "#fff5ee",
        red: 255,
        green: 245,
        blue: 238,
        alpha: 255,
      },
      sienna: {
        code: "#a0522d",
        red: 160,
        green: 82,
        blue: 45,
        alpha: 255,
      },
      silver: {
        code: "#c0c0c0",
        red: 192,
        green: 192,
        blue: 192,
        alpha: 255,
      },
      skyblue: {
        code: "#87ceeb",
        red: 135,
        green: 206,
        blue: 235,
        alpha: 255,
      },
      slateblue: {
        code: "#6a5acd",
        red: 106,
        green: 90,
        blue: 205,
        alpha: 255,
      },
      slategray: {
        code: "#708090",
        red: 112,
        green: 128,
        blue: 144,
        alpha: 255,
      },
      slategrey: {
        code: "#708090",
        red: 112,
        green: 128,
        blue: 144,
        alpha: 255,
      },
      snow: {
        code: "#fffafa",
        red: 255,
        green: 250,
        blue: 250,
        alpha: 255,
      },
      springgreen: {
        code: "#00ff7f",
        red: 0,
        green: 255,
        blue: 127,
        alpha: 255,
      },
      steelblue: {
        code: "#4682b4",
        red: 70,
        green: 130,
        blue: 180,
        alpha: 255,
      },
      tan: {
        code: "#d2b48c",
        red: 210,
        green: 180,
        blue: 140,
        alpha: 255,
      },
      teal: {
        code: "#008080",
        red: 0,
        green: 128,
        blue: 128,
        alpha: 255,
      },
      thistle: {
        code: "#d8bfd8",
        red: 216,
        green: 191,
        blue: 216,
        alpha: 255,
      },
      tomato: {
        code: "#ff6347",
        red: 255,
        green: 99,
        blue: 71,
        alpha: 255,
      },
      turquoise: {
        code: "#40e0d0",
        red: 64,
        green: 224,
        blue: 208,
        alpha: 255,
      },
      violet: {
        code: "#ee82ee",
        red: 238,
        green: 130,
        blue: 238,
        alpha: 255,
      },
      wheat: {
        code: "#f5deb3",
        red: 245,
        green: 222,
        blue: 179,
        alpha: 255,
      },
      white: {
        code: "#ffffff",
        red: 255,
        green: 255,
        blue: 255,
        alpha: 255,
      },
      whitesmoke: {
        code: "#f5f5f5",
        red: 245,
        green: 245,
        blue: 245,
        alpha: 255,
      },
      yellow: {
        code: "#ffff00",
        red: 255,
        green: 255,
        blue: 0,
        alpha: 255,
      },
      yellowgreen: {
        code: "#9acd32",
        red: 154,
        green: 205,
        blue: 50,
        alpha: 255,
      },
    },
    loadModules: (modules, progressCallback, finalCallback) => {
      let loadedCount = 0;
      document.head.append(modules.map((m) => window.v.script({ src: m.src })));
      let modulesLoaderCheckInterval = setInterval(() => {
        let updateLoadedCount = modules.filter(
          (m) => window[m.instance]
        ).length;
        if (updateLoadedCount !== loadedCount) {
          loadedCount = updateLoadedCount;
          progressCallback(updateLoadedCount);
          if (updateLoadedCount === modules.length) {
            clearInterval(modulesLoaderCheckInterval);
            finalCallback();
          }
        }
      }, 10);
    },
    loadScripts: (urls, progressCallback, target) =>
      urls
        .map((url) => ({
          url,
          id: url
            .replace(/\//g, "_-S-_")
            .replace(/\./g, "_-D-_")
            .replace(/\(/g, "_-O-_")
            .replace(/\)/g, "_-C-_"),
        }))
        .filter((s) => !(target || document).querySelector(`#${s.id}`))
        .map((s) => ({
          url: s.url,
          id: s.id,
          fetch: fetch(s.url).then((r) => r.text()),
        }))
        .reduce(
          (p, c, i) =>
            p.then(() =>
              c.fetch.then(async (t) => {
                const script = await window.v.script({ id: c.id });
                script.textContent = "\n" + t + "\n";
                (target || document.documentElement).append(script);
                progressCallback?.(i + 1, urls.length);
                return urls;
              })
            ),
          Promise.resolve()
        ),
  },
  Style: {
    use: async (id, style, forceUpdate = false, target) => {
      const currentlyLoaded = (target || document).querySelector(`#${id}`);
      if (!id || !currentlyLoaded || forceUpdate) {
        currentlyLoaded?.remove();
        if (target)
          target.prepend(
            window.v.element({ tag: "style", id, content: style })
          );
        else
          document.head.append(
            window.v.element({ tag: "style", id, content: style })
          );
      }
    },
    load: (css, target) => {
      if (typeof css === "function") css = css();
      let id = css.path
        .replace(/^v./g, "v-use-")
        .replace(/_css\.css$/g, ".css")
        .replace(/\./g, "-");
      if (!(target || document).querySelector(`#${id}`)) {
        let temp = document.createElement("template");
        temp.id = id;
        (target || document.head).appendChild(temp);
        css.then((content) => {
          let style = document.createElement("style");
          style.id = id;
          style.textContent = content;
          temp.replaceWith(style);
        });
      }
    },
    toArgb: (colorStr) => {
      let c = colorStr.trim();
      if (c.startsWith("#"))
        if (c.length <= 5)
          return {
            r: window.v.dom.hxn(c[1]) * 17,
            g: window.v.dom.hxn(c[2]) * 17,
            b: window.v.dom.hxn(c[3]) * 17,
            a: c.length === 5 ? window.v.dom.hxn(c[4]) * 17 : 255,
          };
        else
          return {
            r: window.v.dom.hxn(c[1]) * 16 + window.v.dom.hxn(c[2]),
            g: window.v.dom.hxn(c[3]) * 16 + window.v.dom.hxn(c[4]),
            b: window.v.dom.hxn(c[5]) * 16 + window.v.dom.hxn(c[6]),
            a:
              c.length === 9
                ? window.v.dom.hxn(c[7]) * 16 + window.v.dom.hxn(c[8])
                : 255,
          };
      else {
        let opi = c.indexOf("(");
        if (opi >= 0) {
          let args = c
            .substring(opi + 1, c.indexOf(")", opi + 1))
            .split(",")
            .map((a) => Number(a));
          return { r: args[0], g: args[1], b: args[2], a: args[3] ?? 255 };
        } else {
          let nc = _v_.dom.namedColors[c.toLowerCase()];
          return { r: nc.red, g: nc.green, b: nc.blue, a: nc.alpha };
        }
      }
    },
    toColorStr: (colorObj) => {
      if (
        colorObj.r % 17 === 0 &&
        colorObj.g % 17 === 0 &&
        colorObj.b % 17 === 0 &&
        colorObj.a % 17 === 0
      )
        return (
          "#" +
          window.v.dom.nhx(colorObj.r / 17) +
          window.v.dom.nhx(colorObj.g / 17) +
          window.v.dom.nhx(colorObj.b / 17) +
          (colorObj.a === 255 ? "" : window.v.dom.nhx(colorObj.a / 17))
        );
      else
        return (
          "#" +
          window.v.dom.nhx(0 | (colorObj.r / 16)) +
          window.v.dom.nhx(colorObj.r % 16) +
          window.v.dom.nhx(0 | (colorObj.g / 16)) +
          window.v.dom.nhx(colorObj.g % 16) +
          window.v.dom.nhx(0 | (colorObj.b / 16)) +
          window.v.dom.nhx(colorObj.b % 16) +
          (colorObj.a === 255
            ? ""
            : window.v.dom.nhx(0 | (colorObj.a / 16)) +
              window.v.dom.nhx(colorObj.a % 16))
        );
    },
    changeColor: (colorStr, { light = 1, alpha = 1 }) => {
      let c = _v_.Style.toArgb(colorStr);
      return _v_.Style.toColorStr({
        r: 0 | Math.max(0, Math.min(255, c.r * light)),
        g: 0 | Math.max(0, Math.min(255, c.g * light)),
        b: 0 | Math.max(0, Math.min(255, c.b * light)),
        a: 0 | Math.max(0, Math.min(255, c.a * alpha)),
      });
    },
  },
  style: new Proxy(() => {}, {
    get(target, p, receiver) {
      return _v_.Style[p];
    },
    apply(target, thisArg, argArray) {
      return window.v.element({ tag: "style", content: argArray[0] });
    },
  }),
  "-element-": async (...params) => {
    if (
      params.tag === "style" &&
      params.id &&
      document.getElementById(params.id)
    )
      return null;
    let { tag, content, className, style, attributes } =
      window.v.dom.parameterize(params);
    let node = document.createElement(tag);
    if (tag !== "style" && className) node.className = className;
    if (style !== undefined) node.style = style;
    for (let key in attributes || {})
      if (typeof attributes[key] === "function") node[key] = attributes[key];
      else if (attributes[key] !== null && attributes[key] !== undefined)
        node.setAttribute(
          key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
          attributes[key]
        );
    if (_singleton_tags_.includes(tag)) {
      if (content) node.setAttribute("content", content);
      return node;
    } else if (tag !== "style" && typeof content === "string") {
      node.textContent = content;
      return node;
    } else if (content !== null && content !== undefined) {
      if (tag === "style") {
        while (content instanceof Promise) content = await content;
        node.textContent =
          typeof content === "string"
            ? content
            : Object.entries(content)
                .map(([key, value]) => window.v.dom.stringifyStyle(key, value))
                .join("\n");
        // if (!attributes.id || !document.getElementById(attributes.id))
        //   document.head.appendChild(node);
        // return null;
        return node;
      } else {
        if (!Array.isArray(content)) content = [content];
        await node.append(...content);
        return node;
      }
    } else if (tag !== "style") return node;
    else return null;
  },
  cache: (key, id, value, timeout = -1) => {
    if (value === undefined)
      if (id === undefined || id == null || _cache_[key]?.id === id)
        return _cache_[key]?.value;
      else return undefined;
    else {
      clearTimeout(_cache_[key]?.timer);
      _cache_[key] = { id, value, timeout };
      if (timeout > -1)
        _cache_[key].timer = setTimeout(() => {
          delete _cache_[key];
        }, timeout);
      return value;
    }
  },
};
window.v = new Proxy(() => _v_, _vHandler_);
(function init() {
  const elOriginals = {
    append: Element.prototype.append,
    prepend: Element.prototype.prepend,
    replaceWith: Element.prototype.replaceWith,
    replaceChildren: Element.prototype.replaceChildren,
    insertBefore: Element.prototype.insertBefore,
    addEventListener: Element.prototype.addEventListener,
    removeEventListener: Element.prototype.removeEventListener,
  };
  Element.prototype.append = function (...nodes) {
    return new Promise((resolve) => {
      if (nodes.length === 1 && Array.isArray(nodes[0])) nodes = nodes[0];
      nodes = nodes.filter((node) => node !== null && node !== undefined);
      if (nodes.every((node) => !(node instanceof Promise))) {
        elOriginals["append"].call(this, ...nodes);
        resolve(nodes);
      } else this.insertBefore(...nodes).then(resolve);
    });
  };
  Element.prototype.prepend = function (...nodes) {
    return new Promise((resolve) => {
      if (nodes.length === 1 && Array.isArray(nodes[0])) nodes = nodes[0];
      nodes = nodes.filter((node) => node !== null && node !== undefined);
      if (nodes.every((node) => !(node instanceof Promise))) {
        elOriginals["prepend"].call(this, ...nodes);
        resolve(nodes);
      } else this.insertBefore(this.firstChild, ...nodes).then(resolve);
    });
  };
  Element.prototype.replaceWith = function (...nodes) {
    return new Promise((resolve) => {
      if (nodes.length === 1 && Array.isArray(nodes[0])) nodes = nodes[0];
      nodes = nodes.filter((node) => node !== null && node !== undefined);
      if ("parentNode" in this)
        if (nodes.every((node) => !(node instanceof Promise))) {
          elOriginals["replaceWith"].call(this, ...nodes);
          resolve(nodes);
        } else {
          this.parentNode.insertBefore(this, ...nodes).then((nodes) => {
            this.remove();
            resolve(nodes);
          });
        }
      else resolve(null);
    });
  };
  Element.prototype.replaceChildren = function (...nodes) {
    return new Promise((resolve) => {
      if (nodes.length === 1 && Array.isArray(nodes[0])) nodes = nodes[0];
      nodes = nodes.filter((node) => node !== null && node !== undefined);
      const replaceChildren = (parent, ...nodes) => {
        elOriginals["replaceChildren"].call(parent);
        parent.insertBefore(...nodes).then(resolve);
      };
      if (this instanceof Promise)
        this.then((parent) => {
          replaceChildren(parent, ...nodes);
        });
      else replaceChildren(this, ...nodes);
    });
  };
  Element.prototype.insertBefore = function (...nodes) {
    return new Promise((resolve) => {
      const insertBefore = (parent, ...nodes) => {
        if (nodes.length === 1 && Array.isArray(nodes[0])) nodes = nodes[0];
        nodes = nodes.filter((node) => node !== null && node !== undefined);
        let child = nodes.find(
          (node, index) => index && node?.parentNode === parent
        );
        if (!child && nodes[0]?.parentNode === parent) child = nodes[0];
        Promise.all(
          nodes.map(
            (node) =>
              new Promise((resolve) => {
                if (node !== null && node !== undefined && node !== child)
                  if (!(node instanceof Promise)) {
                    if (!(node instanceof Node) && node.toString)
                      node = document.createTextNode(node.toString());
                    if (child instanceof Promise && child["-template-"])
                      elOriginals["insertBefore"].call(
                        parent,
                        node,
                        child["-template-"]
                      );
                    else elOriginals["insertBefore"].call(parent, node, child);
                    resolve(node);
                  } else {
                    node["-template-"] = document.createElement("template");
                    elOriginals["insertBefore"].call(
                      parent,
                      node["-template-"],
                      child
                    );
                    node.then((result) => {
                      let temp = node["-template-"] || node;
                      delete node["-template-"];
                      if (temp.replaceWith)
                        if (Array.isArray(result))
                          temp
                            .replaceWith(...result)
                            .then(() => resolve(result));
                        else
                          temp.replaceWith(result).then(() => resolve(result));
                      else resolve(null);
                    });
                  }
                else resolve(null);
              })
          )
        ).then((insertedNodes) =>
          resolve(
            insertedNodes
              .flatMap((nodes) => nodes)
              .filter((node) => node !== null)
          )
        );
      };
      if (this instanceof Promise) {
        this.then((parent) => {
          insertBefore(parent, ...nodes);
        });
      } else {
        insertBefore(this, ...nodes);
      }
    });
  };
  const vElementEventsList = [
    "add",
    "onadd",
    "childadd",
    "onchildadd",
    "grandchildadd",
    "ongrandchildadd",
    "remove",
    "onremove",
    "childremove",
    "onchildremove",
    "grandchildremove",
    "ongrandchildremove",
    "resize",
    "onresize",
    "intersect",
    "onintersect",
    "outofview",
    "onoutofview",
  ];
  Element.prototype.addEventListener = function (...args) {
    const evt = args[0];
    if (vElementEventsList.includes(evt)) {
      this.listeners ||= {};
      this.listeners[evt] ||= [];
      let listener = {
        evt,
        callback: args[1],
        options: args[2] || { once: false },
      };
      this.listeners[evt].push(listener);
      if (evt === "onresize") resizeObserver.observe(this);
      else if (evt === "onintersect" || evt === "onoutofview")
        if (Object.keys(listener.options).length > 1) {
          let { once, ...originalOptions } = listener.options;
          listener.intersectionObserver = new IntersectionObserver(
            intersectionObserverHandler,
            originalOptions
          );
          listener.intersectionObserver.observe(this);
        } else intersectionObserver.observe(this);
    } else elOriginals.addEventListener.call(this, ...args);
    return this;
  };
  Element.prototype.removeEventListener = function (...args) {
    const evt = args[0],
      callback = args[1];
    if (vElementEventsList.includes(evt)) {
      if (evt in (this.listeners || [])) {
        if (callback)
          this.listeners[evt] = this.listeners[evt].filter(
            (listener) => listener.callback !== callback
          );
        if (!callback || !this.listeners[evt].length)
          delete this.listeners[evt];
      }
      if (evt === "onresize") resizeObserver.unobserve(this);
      else if (
        (evt === "onintersect" || evt === "onoutofview") &&
        !this.listeners?.onintersect?.length &&
        !this.listeners?.onoutofview?.length
      )
        intersectionObserver.unobserve(this);
    } else elOriginals.removeEventListener.call(this, ...args);
    return this;
  };
  Element.prototype.addOneTimeListener = (...args) => {
    return this.addEventListener(args[0], args[1], {
      ...(args[2] || {}),
      once: true,
    });
  };
  Element.prototype.clearEventListeners = (evt) => {
    return this.removeEventListener(evt);
  };
  Element.prototype.clearAllEventListeners = () => {
    for (let key in this.listeners) this.removeEventListener(key);
    return this;
  };
  Node.prototype.Id = function (id) {
    this.id = id;
    return this;
  };
  Node.prototype.Style = function (style) {
    if (typeof style !== "string") style = window.v.dom.stringifyStyle(style);
    let styles = style.split(";");
    for (let st of styles) {
      let i = st.indexOf(":");
      if (i > 0) {
        let key = st.substring(0, i).trim();
        let value = st.substring(i + 1).trim();
        this.style[key] = value;
      }
    }
    return this;
  };
  Node.prototype.class = function (className) {
    this.className = window.v.dom.extendClass(this.className, className);
    return this;
  };
  Node.prototype.extend = function (...params) {
    let ext = window.v.dom.parameterize(params);
    if (ext.content)
      if (Array.isArray(ext.content)) this.append(...ext.content);
      else this.append(ext.content);
    if (ext.className) this.class(ext.className);
    if (ext.style) this.Style(ext.style);
    if (ext.attributes)
      for (let key in ext.attributes)
        if (typeof ext.attributes[key] === "function")
          if (key.startsWith("on"))
            this.addEventListener(key.substring(2), ext.attributes[key]);
          else this[key] = ext.attributes[key];
        else if (
          ext.attributes[key] !== null &&
          ext.attributes[key] !== undefined
        )
          this.setAttribute(
            key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`),
            ext.attributes[key]
          );
    return this;
  };
  Node.prototype.useStyle = function (id, style, forceUpdate = false, target) {
    window.v.style.use(id, style, forceUpdate, target || this);
    return this;
  };
})();
window.v.api.uid().then(({ uid }) => {
  if (uid) {
    window.appId = localStorage.appId;
    if (!window.appId) {
      window.appId = localStorage.appId ||= uid;
      console.log(`-< ${window.appId} >-`);
    }
    let checkUserActivationInterval = setInterval(() => {
      if (
        navigator.userActivation.isActive ||
        navigator.userActivation.hasBeenActive
      ) {
        clearInterval(checkUserActivationInterval);
        window.dispatchEvent(new CustomEvent("userActivation"));
      }
    }, 1000);
    (function registerServiceWorker() {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then((registration) => {
          if (registration.waiting)
            registration.waiting.postMessage("SKIP_WAITING");
          registration.addEventListener("updatefound", () => {
            if (registration.installing) {
              registration.installing.addEventListener("statechange", () => {
                if (registration.waiting) {
                  caches.delete(`vMainCacheKey`).then(() => {
                    console.log("Cache deleted!");
                    if (navigator.serviceWorker.controller) {
                      if (registration.waiting)
                        registration.waiting.postMessage("SKIP_WAITING");
                    } else {
                      window.location.reload(true);
                    }
                  });
                }
              });
            }
          });
          if (registration.active)
            window.addEventListener(
              "userActivation",
              () => {
                Notification.requestPermission().then((permission) => {
                  registration.pushManager
                    .getSubscription()
                    .then((subscription) => {
                      if (permission === "granted" && !subscription)
                        fetch("/api/push-notification/get-vapid", {
                          method: "POST",
                        })
                          .then((res) => (res.status === 204 ? {} : res.json()))
                          .then(({ publicKey }) => {
                            if (publicKey)
                              registration.pushManager
                                .subscribe({
                                  userVisibleOnly: true,
                                  applicationServerKey: publicKey,
                                })
                                .then((subscription) => {
                                  fetch("/api/push-notification/subscribe", {
                                    method: "POST",
                                    headers: {
                                      "content-type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      appId: localStorage.appId,
                                      subscription,
                                    }),
                                  })
                                    .then((res) =>
                                      res.status === 204 ? {} : res.json()
                                    )
                                    .then(({ appId }) => {
                                      if (
                                        appId &&
                                        appId !== localStorage.appId
                                      ) {
                                        window.appId = localStorage.appId =
                                          appId;
                                        console.log(`--< ${window.appId} >--`);
                                      }
                                    });
                                });
                          });
                    });
                });
                console.log("-- Notification Registration Checked --");
              },
              { once: true }
            );
        });
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) {
            window.location.reload(true);
            refreshing = true;
          }
        });
      }
    })();
  }
});
(function cssBrowserSelector(u = navigator.userAgent) {
  var ua = u.toLowerCase(),
    is = function (t) {
      return ua.indexOf(t) > -1;
    },
    g = "gecko",
    w = "webkit",
    s = "safari",
    o = "opera",
    m = "mobile",
    h = document.documentElement,
    b = [
      !/opera|webtv/i.test(ua) && /msie\s(\d)/.test(ua)
        ? "ie ie" + RegExp.$1
        : is("firefox/2")
        ? g + " ff2"
        : is("firefox/3.5")
        ? g + " ff3 ff3_5"
        : is("firefox/3.6")
        ? g + " ff3 ff3_6"
        : is("firefox/3")
        ? g + " ff3"
        : is("gecko/")
        ? g
        : is("opera")
        ? o +
          (/version\/(\d+)/.test(ua)
            ? " " + o + RegExp.$1
            : /opera(\s|\/)(\d+)/.test(ua)
            ? " " + o + RegExp.$2
            : "")
        : is("konqueror")
        ? "konqueror"
        : is("blackberry")
        ? m + " blackberry"
        : is("android")
        ? m + " android"
        : is("chrome")
        ? w + " chrome"
        : is("iron")
        ? w + " iron"
        : is("applewebkit/")
        ? w + " " + s + (/version\/(\d+)/.test(ua) ? " " + s + RegExp.$1 : "")
        : is("mozilla/")
        ? g
        : "",
      is("j2me")
        ? m + " j2me"
        : is("iphone")
        ? m + " iphone"
        : is("ipod")
        ? m + " ipod"
        : is("ipad")
        ? m + " ipad"
        : is("mac")
        ? "mac"
        : is("darwin")
        ? "mac"
        : is("webtv")
        ? "webtv"
        : is("win")
        ? "win" + (is("windows nt 6.0") ? " vista" : "")
        : is("freebsd")
        ? "freebsd"
        : is("x11") || is("linux")
        ? "linux"
        : "",
      "js",
    ];
  let c = b.join(" ");
  h.className = (h.className + " " + c).trim();
  return c;
})();
const handleEvent = (node, eventName, ...params) => {
  if (node) {
    for (let prefix of ["", "on"]) {
      let evt =
        prefix === "" && eventName.startsWith("on")
          ? eventName.substring(2)
          : prefix === "on" && !eventName.startsWith("on")
          ? "on" + eventName
          : eventName;
      if (prefix === "on") (node[evt] || node._owner_?.[evt])?.(node);
      const listeners = node._owner_?.listeners?.[evt] || node.listeners?.[evt];
      if (listeners) {
        for (let i = 0; i < listeners.length; i++) {
          let listener = listeners[i];
          listener.callback(node, ...params);
          if (listener.options?.once) {
            listeners.splice(i, 1);
            i--;
            if (!listeners.length) {
              delete node._owner_?.listeners?.[evt];
              delete node.listeners?.[evt];
              if (evt === "resize" || evt === "onresize") {
                resizeObserver.unobserve(node);
              }
              if (
                (evt === "onintersect" ||
                  evt === "intersect" ||
                  evt === "onoutofview" ||
                  evt === "outofview") &&
                !node._owner_?.listeners?.onintersect?.length &&
                !node._owner_?.listeners?.onoutofview?.length &&
                !node._owner_?.listeners?.intersect?.length &&
                !node._owner_?.listeners?.outofview?.length &&
                !node.listeners?.onintersect?.length &&
                !node.listeners?.onoutofview?.length &&
                !node.listeners?.intersect?.length &&
                !node.listeners?.outofview?.length
              ) {
                intersectionObserver.unobserve(node);
              }
            }
          }
        }
      }
    }
  }
};
const intersectionObserverHandler = (entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      handleEvent(entry.target, "onintersect");
    } else {
      handleEvent(entry.target, "onoutofview");
    }
  }
};
const intersectionObserver = new IntersectionObserver(
  intersectionObserverHandler
);
intersectionObserver.disconnect();
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    handleEvent(entry.target, "onresize");
  }
});
const initElement = (el) => {
  if (typeof bootstrap !== "undefined") {
    if (el.getAttribute("data-bs-toggle") === "tooltip")
      el.BS_Tooltip ||= new window.bootstrap.Tooltip(el, {
        trigger: "hover",
      });
    if (el.classList?.contains("collapse"))
      el.BS_Collapse ||= new window.bootstrap.Collapse(el, {
        toggle: false,
      });
  }
};
const onAddHandler = (node) => {
  handleEvent(node, "onadd");
  let parent = node.parentNode;
  handleEvent(parent, "onchildadd", node);
  while (parent) {
    handleEvent(parent, "ongrandchildadd", node);
    parent = parent.parentNode;
  }
  if (node instanceof Element) {
    if (
      node._owner_?.listeners?.onresize?.length ||
      node._owner_?.listeners?.resize?.length ||
      node.listeners?.onresize?.length ||
      node.listeners?.resize?.length
    ) {
      resizeObserver.observe(node);
    }
    if (
      node._owner_?.listeners?.onintersect?.length ||
      node._owner_?.listeners?.onoutofview?.length ||
      node._owner_?.listeners?.intersect?.length ||
      node._owner_?.listeners?.outofview?.length ||
      node.listeners?.onintersect?.length ||
      node.listeners?.onoutofview?.length ||
      node.listeners?.intersect?.length ||
      node.listeners?.outofview?.length
    ) {
      intersectionObserver.observe(node);
    }
    initElement(node);
  }
};
const onRemoveHandler = (node) => {
  handleEvent(node, "onremove");
  let parent = node.parentNode;
  handleEvent(parent, "onchildremove", node);
  while (parent) {
    handleEvent(parent, "ongrandchildremove", node);
    parent = parent.parentNode;
  }
  if (node instanceof Element) {
    resizeObserver.unobserve(node);
    intersectionObserver.unobserve(node);
  }
};
const observer = new MutationObserver((mutationRecords) => {
  for (let mutationRecord of mutationRecords) {
    for (let addedNode of mutationRecord.addedNodes) {
      if (!addedNode._isAdded_) onAddHandler(addedNode);
      addedNode._isRemoved_ = !(addedNode._isAdded_ = true);
      for (let ans of addedNode.querySelectorAll?.("*") || []) {
        if (!ans._isAdded_) onAddHandler(ans);
        ans._isRemoved_ = !(ans._isAdded_ = true);
      }
    }
    for (let removedNode of mutationRecord.removedNodes) {
      if (!removedNode._isRemoved_) onRemoveHandler(removedNode);
      removedNode._isRemoved_ = !(removedNode._isAdded_ = false);
      for (let ans of removedNode.querySelectorAll?.("*") || []) {
        if (!ans._isRemoved_) onRemoveHandler(ans);
        ans._isRemoved_ = !(ans._isAdded_ = false);
      }
    }
  }
});
observer.observe(document, { childList: true, subtree: true });
document.addEventListener("DOMContentLoaded", () => {
  window.app = window.v.app();
});
