var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var dicomCharacterSet_min = createCommonjsModule(function(module, exports) {
  /*! @wearemothership/dicom-character-set - 1.0.4-opt.1 - 2021-03-22 | (c) 2018 Radialogica, LLC | https://github.com/radialogica/dicom-character-set */
  !function(e, n) {
    module.exports = n();
  }(commonjsGlobal, function() {
    return (() => {
      var o = {d: (e2, n2) => {
        for (var t in n2)
          o.o(n2, t) && !o.o(e2, t) && Object.defineProperty(e2, t, {enumerable: true, get: n2[t]});
      }, o: (e2, n2) => Object.prototype.hasOwnProperty.call(e2, n2), r: (e2) => {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e2, "__esModule", {value: true});
      }}, e = {};
      o.r(e), o.d(e, {characterSets: () => i, convertBytes: () => function(e2, n2, t) {
        return g(y, r, e2, n2, t);
      }, convertBytesPromise: () => function(e2, n2, t) {
        return g(P, m, e2, n2, t);
      }});
      var n = {codeElement: "G0", escapeSequence: [27, 40, 66], encoding: "windows-1252", isASCII: true, bytesPerCodePoint: 1}, i = {"ISO_IR 6": {encoding: "utf-8"}, "ISO_IR 100": {encoding: "windows-1252"}, "ISO_IR 101": {encoding: "iso-8859-2"}, "ISO_IR 109": {encoding: "iso-8859-3"}, "ISO_IR 110": {encoding: "iso-8859-4"}, "ISO_IR 144": {encoding: "iso-8859-5"}, "ISO_IR 127": {encoding: "iso-8859-6"}, "ISO_IR 126": {encoding: "iso-8859-7"}, "ISO_IR 138": {encoding: "iso-8859-8"}, "ISO_IR 148": {encoding: "windows-1254"}, "ISO_IR 13": {encoding: "shift-jis"}, "ISO_IR 166": {encoding: "tis-620"}, "ISO 2022 IR 6": {extension: true, elements: [n]}, "ISO 2022 IR 100": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 65], encoding: "windows-1252", bytesPerCodePoint: 1}]}, "ISO 2022 IR 101": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 66], encoding: "iso-8859-2", bytesPerCodePoint: 1}]}, "ISO 2022 IR 109": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 67], encoding: "iso-8859-3", bytesPerCodePoint: 1}]}, "ISO 2022 IR 110": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 68], encoding: "iso-8859-4", bytesPerCodePoint: 1}]}, "ISO 2022 IR 144": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 76], encoding: "iso-8859-5", bytesPerCodePoint: 1}]}, "ISO 2022 IR 127": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 71], encoding: "iso-8859-6", bytesPerCodePoint: 1}]}, "ISO 2022 IR 126": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 70], encoding: "iso-8859-7", bytesPerCodePoint: 1}]}, "ISO 2022 IR 138": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 72], encoding: "iso-8859-8", bytesPerCodePoint: 1}]}, "ISO 2022 IR 148": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 77], encoding: "windows-1254", bytesPerCodePoint: 1}]}, "ISO 2022 IR 13": {extension: true, elements: [{codeElement: "G0", escapeSequence: [27, 40, 74], encoding: "shift-jis", bytesPerCodePoint: 1}, {codeElement: "G1", escapeSequence: [27, 41, 73], encoding: "shift-jis", bytesPerCodePoint: 1}]}, "ISO 2022 IR 166": {extension: true, elements: [n, {codeElement: "G1", escapeSequence: [27, 45, 84], encoding: "tis-620", bytesPerCodePoint: 1}]}, "ISO 2022 IR 87": {extension: true, multiByte: true, elements: [{codeElement: "G0", escapeSequence: [27, 36, 66], encoding: "euc-jp", setHighBit: true, bytesPerCodePoint: 2}]}, "ISO 2022 IR 159": {extension: true, multiByte: true, elements: [{codeElement: "G0", escapeSequence: [27, 36, 40, 68], encoding: "euc-jp", isJISX0212: true, bytesPerCodePoint: 2}]}, "ISO 2022 IR 149": {extension: true, multiByte: true, elements: [{codeElement: "G1", escapeSequence: [27, 36, 41, 67], encoding: "euc-kr", bytesPerCodePoint: 2}]}, "ISO 2022 IR 58": {extension: true, multiByte: true, elements: [{codeElement: "G1", escapeSequence: [27, 36, 41, 65], encoding: "gb18030", bytesPerCodePoint: 2}]}, "ISO_IR 192": {encoding: "utf-8", multiByte: true}, GB18030: {encoding: "gb18030", multiByte: true}, GBK: {encoding: "gbk", multiByte: true}}, l = 27, c = 10, s = 12, u = 13, d = 9, a = 92, f = 61, I = 94;
      function S(e2) {
        return e2.replace(/~/g, "\u203E").replace(/\\/g, "\xA5");
      }
      function r(e2, n2, t, o2, r2) {
        r2 = b(n2, t, o2, r2);
        return e2 + y(n2.encoding, r2);
      }
      function m(e2, t, n2, o2, r2) {
        var i2 = b(t, n2, o2, r2);
        return (e2 === "" ? Promise.resolve("") : e2).then(function(n3) {
          return P(t.encoding, i2).then(function(e3) {
            return n3 + e3;
          });
        });
      }
      function g(e2, n2, t, o2, r2) {
        !function(e3, n3) {
          if (n3 && !(n3 instanceof Uint8Array))
            throw new Error("bytes must be a Uint8Array");
          if (e3 && typeof e3 != "string")
            throw new Error("specificCharacterSet must be a string");
        }(t, o2);
        t = function(e3) {
          e3 = e3 ? e3.split("\\").map(function(e4) {
            return e4.trim().toUpperCase();
          }) : [""];
          e3[0] === "" && (e3[0] = 1 < e3.length ? "ISO 2022 IR 6" : "ISO_IR 6");
          if (e3.some(function(e4) {
            return i[e4] === void 0;
          }))
            throw new Error("Invalid specific character set specified.");
          return function(e4) {
            for (var n3 = 1 < e4.length, t2 = [], o3 = 0; o3 < e4.length; o3++) {
              var r3 = e4[o3];
              t2.includes(r3) || t2.push(n3 ? r3.replace("ISO_IR", "ISO 2022 IR") : r3);
            }
            return t2;
          }(e3 = function(e4) {
            var n3 = i[e4[0]];
            return !n3.multiByte || n3.extension ? e4.filter(function(e5) {
              return !i[e5].multiByte || i[e5].extension;
            }) : [e4[0]];
          }(e3));
        }(t);
        if (t.length === 1 && !t[0].startsWith("ISO 2022"))
          return e2(i[t[0]].encoding, o2);
        r2 = r2 || {};
        return function(e3, n3, t2, o3) {
          var r3 = "";
          if (!n3 || n3.length === 0)
            return r3;
          var i2 = {G0: e3[0].elements.find(function(e4) {
            return e4.codeElement === "G0";
          }), G1: e3[0].elements.find(function(e4) {
            return e4.codeElement === "G1";
          })}, c2 = Object.assign({}, i2), s2 = 0, u2 = void 0, d2 = 0;
          for (; d2 < n3.length; ) {
            u2 = u2 || h(n3[s2], c2);
            var a2 = function(e4, n4, t3, o4, r4, i3) {
              for (var c3 = n4; c3 < e4.length; c3 += t3.bytesPerCodePoint) {
                if (e4[c3] === l)
                  return {escapeSequence: true, index: c3};
                t3.bytesPerCodePoint === 1 && i3.includes(e4[c3]) && Object.assign(o4, r4);
                var s3 = h(e4[c3], o4);
                if (t3 && s3 !== t3)
                  return {characterSet: s3, index: c3};
              }
              return {index: e4.length};
            }(n3, s2, u2, c2, i2, t2);
            d2 = a2.index, s2 < d2 && (r3 = o3(r3, u2, n3, s2, d2)), s2 = d2, u2 = a2.characterSet, a2.escapeSequence && (a2 = function(e4, n4, t3) {
              for (var o4 = 0; o4 < t3.length; o4++)
                for (var r4 = t3[o4], i3 = 0; i3 < r4.elements.length; i3++) {
                  var c3 = r4.elements[i3];
                  if (function(e5, n5, t4) {
                    for (var o5 = 0; o5 < e5.length; o5++) {
                      if (t4 + o5 >= n5.length)
                        return false;
                      if (n5[t4 + o5] !== e5[o5])
                        return false;
                    }
                    return true;
                  }(c3.escapeSequence, e4, n4))
                    return c3;
                }
              throw new Error("Unknown escape sequence encountered at byte " + n4);
            }(n3, d2, e3), c2[a2.codeElement] = a2, s2 += a2.escapeSequence.length);
          }
          return r3;
        }(t.map(function(e3) {
          return i[e3];
        }), o2, function(e3) {
          var n3 = (e3 || "").trim().toUpperCase(), e3 = [c, s, u, d];
          ["UT", "ST", "LT"].includes(n3) || e3.push(a);
          n3 === "PN" && (e3.push(f), e3.push(I));
          return e3;
        }(r2.vr), n2);
      }
      var p = {};
      function y(e2, n2) {
        var t = p[e2];
        return t || (t = new TextDecoder(e2), p[e2] = t = e2 === "shift-jis" ? {textDecoder: t, decode: function(e3) {
          return S(t.decode(e3));
        }} : t), t.decode(n2);
      }
      function P(o2, r2) {
        return new Promise(function(e2) {
          var n2 = new FileReader();
          n2.onload = o2 === "shift-jis" ? function() {
            return e2(S(n2.result));
          } : function() {
            return e2(n2.result);
          };
          var t = new Blob([r2]);
          n2.readAsText(t, o2);
        });
      }
      function h(e2, n2) {
        return 127 < e2 && n2.G1 ? n2.G1 : n2.G0 || (n2.G1 && n2.G1.bytesPerCodePoint === 1 ? n2.G1 : i["ISO 2022 IR 6"].elements[0]);
      }
      function b(e2, n2, t, o2) {
        var r2 = void 0;
        return e2.isJISX0212 ? r2 = function(e3, n3, t2) {
          var o3 = t2 - n3;
          if (o3 % 2 != 0)
            throw new Error("JIS X string with a character not having exactly two bytes!");
          for (var r3 = new Uint8Array(o3 + o3 / 2), i2 = 0, c2 = n3; c2 < t2; c2 += 2)
            r3[i2++] = 143, r3[i2++] = 128 | e3[c2], r3[i2++] = 128 | e3[c2 + 1];
          return r3;
        }(n2, t, o2) : ((r2 = new Uint8Array(o2 - t)).set(new Uint8Array(n2.buffer, n2.byteOffset + t, o2 - t)), e2.setHighBit && function(e3) {
          for (var n3 = 0; n3 < e3.length; n3++)
            e3[n3] |= 128;
        }(r2)), r2;
      }
      return e;
    })();
  });
});
var __pika_web_default_export_for_treeshaking__ = /* @__PURE__ */ getDefaultExportFromCjs(dicomCharacterSet_min);
var characterSets = dicomCharacterSet_min.characterSets;
var convertBytes = dicomCharacterSet_min.convertBytes;
var convertBytesPromise = dicomCharacterSet_min.convertBytesPromise;
export default __pika_web_default_export_for_treeshaking__;
export {dicomCharacterSet_min as __moduleExports, characterSets, convertBytes, convertBytesPromise};
