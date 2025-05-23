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
var componentSpec = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.ComponentSpec = jpeg.lossless.ComponentSpec || function() {
    this.hSamp = 0;
    this.quantTableSel = 0;
    this.vSamp = 0;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.ComponentSpec;
  }
});
var dataStream = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || function(data, offset, length) {
    if (offset === void 0 && length === void 0) {
      this.buffer = new Uint8Array(data);
    } else {
      this.buffer = new Uint8Array(data, offset, length);
    }
    this.index = 0;
  };
  jpeg.lossless.DataStream.prototype.get16 = function() {
    var value = (this.buffer[this.index] << 8) + this.buffer[this.index + 1];
    this.index += 2;
    return value;
  };
  jpeg.lossless.DataStream.prototype.get8 = function() {
    var value = this.buffer[this.index];
    this.index += 1;
    return value;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.DataStream;
  }
});
var utils = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.Utils = jpeg.lossless.Utils || {};
  jpeg.lossless.Utils.createArray = function(length) {
    var arr = new Array(length || 0), i = length;
    if (arguments.length > 1) {
      var args = Array.prototype.slice.call(arguments, 1);
      while (i--)
        arr[length - 1 - i] = jpeg.lossless.Utils.createArray.apply(this, args);
    }
    return arr;
  };
  jpeg.lossless.Utils.makeCRCTable = function() {
    var c;
    var crcTable = [];
    for (var n = 0; n < 256; n++) {
      c = n;
      for (var k = 0; k < 8; k++) {
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      }
      crcTable[n] = c;
    }
    return crcTable;
  };
  jpeg.lossless.Utils.crc32 = function(dataView) {
    var uint8view = new Uint8Array(dataView.buffer);
    var crcTable = jpeg.lossless.Utils.crcTable || (jpeg.lossless.Utils.crcTable = jpeg.lossless.Utils.makeCRCTable());
    var crc = 0 ^ -1;
    for (var i = 0; i < uint8view.length; i++) {
      crc = crc >>> 8 ^ crcTable[(crc ^ uint8view[i]) & 255];
    }
    return (crc ^ -1) >>> 0;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.Utils;
  }
});
var huffmanTable = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || (typeof commonjsRequire !== "undefined" ? dataStream : null);
  jpeg.lossless.Utils = jpeg.lossless.Utils || (typeof commonjsRequire !== "undefined" ? utils : null);
  jpeg.lossless.HuffmanTable = jpeg.lossless.HuffmanTable || function() {
    this.l = jpeg.lossless.Utils.createArray(4, 2, 16);
    this.th = [];
    this.v = jpeg.lossless.Utils.createArray(4, 2, 16, 200);
    this.tc = jpeg.lossless.Utils.createArray(4, 2);
    this.tc[0][0] = 0;
    this.tc[1][0] = 0;
    this.tc[2][0] = 0;
    this.tc[3][0] = 0;
    this.tc[0][1] = 0;
    this.tc[1][1] = 0;
    this.tc[2][1] = 0;
    this.tc[3][1] = 0;
    this.th[0] = 0;
    this.th[1] = 0;
    this.th[2] = 0;
    this.th[3] = 0;
  };
  jpeg.lossless.HuffmanTable.MSB = 2147483648;
  jpeg.lossless.HuffmanTable.prototype.read = function(data, HuffTab) {
    var count = 0, length, temp, t, c, i, j;
    length = data.get16();
    count += 2;
    while (count < length) {
      temp = data.get8();
      count += 1;
      t = temp & 15;
      if (t > 3) {
        throw new Error("ERROR: Huffman table ID > 3");
      }
      c = temp >> 4;
      if (c > 2) {
        throw new Error("ERROR: Huffman table [Table class > 2 ]");
      }
      this.th[t] = 1;
      this.tc[t][c] = 1;
      for (i = 0; i < 16; i += 1) {
        this.l[t][c][i] = data.get8();
        count += 1;
      }
      for (i = 0; i < 16; i += 1) {
        for (j = 0; j < this.l[t][c][i]; j += 1) {
          if (count > length) {
            throw new Error("ERROR: Huffman table format error [count>Lh]");
          }
          this.v[t][c][i][j] = data.get8();
          count += 1;
        }
      }
    }
    if (count !== length) {
      throw new Error("ERROR: Huffman table format error [count!=Lf]");
    }
    for (i = 0; i < 4; i += 1) {
      for (j = 0; j < 2; j += 1) {
        if (this.tc[i][j] !== 0) {
          this.buildHuffTable(HuffTab[i][j], this.l[i][j], this.v[i][j]);
        }
      }
    }
    return 1;
  };
  jpeg.lossless.HuffmanTable.prototype.buildHuffTable = function(tab, L, V) {
    var currentTable, temp, k, i, j, n;
    temp = 256;
    k = 0;
    for (i = 0; i < 8; i += 1) {
      for (j = 0; j < L[i]; j += 1) {
        for (n = 0; n < temp >> i + 1; n += 1) {
          tab[k] = V[i][j] | i + 1 << 8;
          k += 1;
        }
      }
    }
    for (i = 1; k < 256; i += 1, k += 1) {
      tab[k] = i | jpeg.lossless.HuffmanTable.MSB;
    }
    currentTable = 1;
    k = 0;
    for (i = 8; i < 16; i += 1) {
      for (j = 0; j < L[i]; j += 1) {
        for (n = 0; n < temp >> i - 7; n += 1) {
          tab[currentTable * 256 + k] = V[i][j] | i + 1 << 8;
          k += 1;
        }
        if (k >= 256) {
          if (k > 256) {
            throw new Error("ERROR: Huffman table error(1)!");
          }
          k = 0;
          currentTable += 1;
        }
      }
    }
  };
  if (module.exports) {
    module.exports = jpeg.lossless.HuffmanTable;
  }
});
var quantizationTable = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || (typeof commonjsRequire !== "undefined" ? dataStream : null);
  jpeg.lossless.Utils = jpeg.lossless.Utils || (typeof commonjsRequire !== "undefined" ? utils : null);
  jpeg.lossless.QuantizationTable = jpeg.lossless.QuantizationTable || function() {
    this.precision = [];
    this.tq = [];
    this.quantTables = jpeg.lossless.Utils.createArray(4, 64);
    this.tq[0] = 0;
    this.tq[1] = 0;
    this.tq[2] = 0;
    this.tq[3] = 0;
  };
  jpeg.lossless.QuantizationTable.enhanceQuantizationTable = function(qtab, table) {
    var i;
    for (i = 0; i < 8; i += 1) {
      qtab[table[0 * 8 + i]] *= 90;
      qtab[table[4 * 8 + i]] *= 90;
      qtab[table[2 * 8 + i]] *= 118;
      qtab[table[6 * 8 + i]] *= 49;
      qtab[table[5 * 8 + i]] *= 71;
      qtab[table[1 * 8 + i]] *= 126;
      qtab[table[7 * 8 + i]] *= 25;
      qtab[table[3 * 8 + i]] *= 106;
    }
    for (i = 0; i < 8; i += 1) {
      qtab[table[0 + 8 * i]] *= 90;
      qtab[table[4 + 8 * i]] *= 90;
      qtab[table[2 + 8 * i]] *= 118;
      qtab[table[6 + 8 * i]] *= 49;
      qtab[table[5 + 8 * i]] *= 71;
      qtab[table[1 + 8 * i]] *= 126;
      qtab[table[7 + 8 * i]] *= 25;
      qtab[table[3 + 8 * i]] *= 106;
    }
    for (i = 0; i < 64; i += 1) {
      qtab[i] >>= 6;
    }
  };
  jpeg.lossless.QuantizationTable.prototype.read = function(data, table) {
    var count = 0, length, temp, t, i;
    length = data.get16();
    count += 2;
    while (count < length) {
      temp = data.get8();
      count += 1;
      t = temp & 15;
      if (t > 3) {
        throw new Error("ERROR: Quantization table ID > 3");
      }
      this.precision[t] = temp >> 4;
      if (this.precision[t] === 0) {
        this.precision[t] = 8;
      } else if (this.precision[t] === 1) {
        this.precision[t] = 16;
      } else {
        throw new Error("ERROR: Quantization table precision error");
      }
      this.tq[t] = 1;
      if (this.precision[t] === 8) {
        for (i = 0; i < 64; i += 1) {
          if (count > length) {
            throw new Error("ERROR: Quantization table format error");
          }
          this.quantTables[t][i] = data.get8();
          count += 1;
        }
        jpeg.lossless.QuantizationTable.enhanceQuantizationTable(this.quantTables[t], table);
      } else {
        for (i = 0; i < 64; i += 1) {
          if (count > length) {
            throw new Error("ERROR: Quantization table format error");
          }
          this.quantTables[t][i] = data.get16();
          count += 2;
        }
        jpeg.lossless.QuantizationTable.enhanceQuantizationTable(this.quantTables[t], table);
      }
    }
    if (count !== length) {
      throw new Error("ERROR: Quantization table error [count!=Lq]");
    }
    return 1;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.QuantizationTable;
  }
});
var scanComponent = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.ScanComponent = jpeg.lossless.ScanComponent || function() {
    this.acTabSel = 0;
    this.dcTabSel = 0;
    this.scanCompSel = 0;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.ScanComponent;
  }
});
var scanHeader = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || (typeof commonjsRequire !== "undefined" ? dataStream : null);
  jpeg.lossless.ScanComponent = jpeg.lossless.ScanComponent || (typeof commonjsRequire !== "undefined" ? scanComponent : null);
  jpeg.lossless.ScanHeader = jpeg.lossless.ScanHeader || function() {
    this.ah = 0;
    this.al = 0;
    this.numComp = 0;
    this.selection = 0;
    this.spectralEnd = 0;
    this.components = [];
  };
  jpeg.lossless.ScanHeader.prototype.read = function(data) {
    var count = 0, length, i, temp;
    length = data.get16();
    count += 2;
    this.numComp = data.get8();
    count += 1;
    for (i = 0; i < this.numComp; i += 1) {
      this.components[i] = new jpeg.lossless.ScanComponent();
      if (count > length) {
        throw new Error("ERROR: scan header format error");
      }
      this.components[i].scanCompSel = data.get8();
      count += 1;
      temp = data.get8();
      count += 1;
      this.components[i].dcTabSel = temp >> 4;
      this.components[i].acTabSel = temp & 15;
    }
    this.selection = data.get8();
    count += 1;
    this.spectralEnd = data.get8();
    count += 1;
    temp = data.get8();
    this.ah = temp >> 4;
    this.al = temp & 15;
    count += 1;
    if (count !== length) {
      throw new Error("ERROR: scan header format error [count!=Ns]");
    }
    return 1;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.ScanHeader;
  }
});
var frameHeader = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.ComponentSpec = jpeg.lossless.ComponentSpec || (typeof commonjsRequire !== "undefined" ? componentSpec : null);
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || (typeof commonjsRequire !== "undefined" ? dataStream : null);
  jpeg.lossless.FrameHeader = jpeg.lossless.FrameHeader || function() {
    this.components = [];
    this.dimX = 0;
    this.dimY = 0;
    this.numComp = 0;
    this.precision = 0;
  };
  jpeg.lossless.FrameHeader.prototype.read = function(data) {
    var count = 0, length, i, c, temp;
    length = data.get16();
    count += 2;
    this.precision = data.get8();
    count += 1;
    this.dimY = data.get16();
    count += 2;
    this.dimX = data.get16();
    count += 2;
    this.numComp = data.get8();
    count += 1;
    for (i = 1; i <= this.numComp; i += 1) {
      if (count > length) {
        throw new Error("ERROR: frame format error");
      }
      c = data.get8();
      count += 1;
      if (count >= length) {
        throw new Error("ERROR: frame format error [c>=Lf]");
      }
      temp = data.get8();
      count += 1;
      if (!this.components[c]) {
        this.components[c] = new jpeg.lossless.ComponentSpec();
      }
      this.components[c].hSamp = temp >> 4;
      this.components[c].vSamp = temp & 15;
      this.components[c].quantTableSel = data.get8();
      count += 1;
    }
    if (count !== length) {
      throw new Error("ERROR: frame format error [Lf!=count]");
    }
    return 1;
  };
  if (module.exports) {
    module.exports = jpeg.lossless.FrameHeader;
  }
});
var decoder = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || (typeof commonjsRequire !== "undefined" ? dataStream : null);
  jpeg.lossless.HuffmanTable = jpeg.lossless.HuffmanTable || (typeof commonjsRequire !== "undefined" ? huffmanTable : null);
  jpeg.lossless.QuantizationTable = jpeg.lossless.QuantizationTable || (typeof commonjsRequire !== "undefined" ? quantizationTable : null);
  jpeg.lossless.ScanHeader = jpeg.lossless.ScanHeader || (typeof commonjsRequire !== "undefined" ? scanHeader : null);
  jpeg.lossless.FrameHeader = jpeg.lossless.FrameHeader || (typeof commonjsRequire !== "undefined" ? frameHeader : null);
  jpeg.lossless.Utils = jpeg.lossless.Utils || (typeof commonjsRequire !== "undefined" ? utils : null);
  jpeg.lossless.Decoder = jpeg.lossless.Decoder || function(buffer, numBytes) {
    this.buffer = buffer;
    this.frame = new jpeg.lossless.FrameHeader();
    this.huffTable = new jpeg.lossless.HuffmanTable();
    this.quantTable = new jpeg.lossless.QuantizationTable();
    this.scan = new jpeg.lossless.ScanHeader();
    this.DU = jpeg.lossless.Utils.createArray(10, 4, 64);
    this.HuffTab = jpeg.lossless.Utils.createArray(4, 2, 50 * 256);
    this.IDCT_Source = [];
    this.nBlock = [];
    this.acTab = jpeg.lossless.Utils.createArray(10, 1);
    this.dcTab = jpeg.lossless.Utils.createArray(10, 1);
    this.qTab = jpeg.lossless.Utils.createArray(10, 1);
    this.marker = 0;
    this.markerIndex = 0;
    this.numComp = 0;
    this.restartInterval = 0;
    this.selection = 0;
    this.xDim = 0;
    this.yDim = 0;
    this.xLoc = 0;
    this.yLoc = 0;
    this.numBytes = 0;
    this.outputData = null;
    this.restarting = false;
    this.mask = 0;
    if (typeof numBytes !== "undefined") {
      this.numBytes = numBytes;
    }
  };
  jpeg.lossless.Decoder.IDCT_P = [
    0,
    5,
    40,
    16,
    45,
    2,
    7,
    42,
    21,
    56,
    8,
    61,
    18,
    47,
    1,
    4,
    41,
    23,
    58,
    13,
    32,
    24,
    37,
    10,
    63,
    17,
    44,
    3,
    6,
    43,
    20,
    57,
    15,
    34,
    29,
    48,
    53,
    26,
    39,
    9,
    60,
    19,
    46,
    22,
    59,
    12,
    33,
    31,
    50,
    55,
    25,
    36,
    11,
    62,
    14,
    35,
    28,
    49,
    52,
    27,
    38,
    30,
    51,
    54
  ];
  jpeg.lossless.Decoder.TABLE = [
    0,
    1,
    5,
    6,
    14,
    15,
    27,
    28,
    2,
    4,
    7,
    13,
    16,
    26,
    29,
    42,
    3,
    8,
    12,
    17,
    25,
    30,
    41,
    43,
    9,
    11,
    18,
    24,
    31,
    40,
    44,
    53,
    10,
    19,
    23,
    32,
    39,
    45,
    52,
    54,
    20,
    22,
    33,
    38,
    46,
    51,
    55,
    60,
    21,
    34,
    37,
    47,
    50,
    56,
    59,
    61,
    35,
    36,
    48,
    49,
    57,
    58,
    62,
    63
  ];
  jpeg.lossless.Decoder.MAX_HUFFMAN_SUBTREE = 50;
  jpeg.lossless.Decoder.MSB = 2147483648;
  jpeg.lossless.Decoder.RESTART_MARKER_BEGIN = 65488;
  jpeg.lossless.Decoder.RESTART_MARKER_END = 65495;
  jpeg.lossless.Decoder.prototype.decompress = function(buffer, offset, length) {
    return this.decode(buffer, offset, length).buffer;
  };
  jpeg.lossless.Decoder.prototype.decode = function(buffer, offset, length, numBytes) {
    var current, scanNum = 0, pred = [], i, compN, temp = [], index = [], mcuNum;
    if (typeof buffer !== "undefined") {
      this.buffer = buffer;
    }
    if (typeof numBytes !== "undefined") {
      this.numBytes = numBytes;
    }
    this.stream = new jpeg.lossless.DataStream(this.buffer, offset, length);
    this.buffer = null;
    this.xLoc = 0;
    this.yLoc = 0;
    current = this.stream.get16();
    if (current !== 65496) {
      throw new Error("Not a JPEG file");
    }
    current = this.stream.get16();
    while (current >> 4 !== 4092 || current === 65476) {
      switch (current) {
        case 65476:
          this.huffTable.read(this.stream, this.HuffTab);
          break;
        case 65484:
          throw new Error("Program doesn't support arithmetic coding. (format throw new IOException)");
        case 65499:
          this.quantTable.read(this.stream, jpeg.lossless.Decoder.TABLE);
          break;
        case 65501:
          this.restartInterval = this.readNumber();
          break;
        case 65504:
        case 65505:
        case 65506:
        case 65507:
        case 65508:
        case 65509:
        case 65510:
        case 65511:
        case 65512:
        case 65513:
        case 65514:
        case 65515:
        case 65516:
        case 65517:
        case 65518:
        case 65519:
          this.readApp();
          break;
        case 65534:
          this.readComment();
          break;
        default:
          if (current >> 8 !== 255) {
            throw new Error("ERROR: format throw new IOException! (decode)");
          }
      }
      current = this.stream.get16();
    }
    if (current < 65472 || current > 65479) {
      throw new Error("ERROR: could not handle arithmetic code!");
    }
    this.frame.read(this.stream);
    current = this.stream.get16();
    do {
      while (current !== 65498) {
        switch (current) {
          case 65476:
            this.huffTable.read(this.stream, this.HuffTab);
            break;
          case 65484:
            throw new Error("Program doesn't support arithmetic coding. (format throw new IOException)");
          case 65499:
            this.quantTable.read(this.stream, jpeg.lossless.Decoder.TABLE);
            break;
          case 65501:
            this.restartInterval = this.readNumber();
            break;
          case 65504:
          case 65505:
          case 65506:
          case 65507:
          case 65508:
          case 65509:
          case 65510:
          case 65511:
          case 65512:
          case 65513:
          case 65514:
          case 65515:
          case 65516:
          case 65517:
          case 65518:
          case 65519:
            this.readApp();
            break;
          case 65534:
            this.readComment();
            break;
          default:
            if (current >> 8 !== 255) {
              throw new Error("ERROR: format throw new IOException! (Parser.decode)");
            }
        }
        current = this.stream.get16();
      }
      this.precision = this.frame.precision;
      this.components = this.frame.components;
      if (!this.numBytes) {
        this.numBytes = parseInt(Math.ceil(this.precision / 8));
      }
      if (this.numBytes == 1) {
        this.mask = 255;
      } else {
        this.mask = 65535;
      }
      this.scan.read(this.stream);
      this.numComp = this.scan.numComp;
      this.selection = this.scan.selection;
      if (this.numBytes === 1) {
        if (this.numComp === 3) {
          this.getter = this.getValueRGB;
          this.setter = this.setValueRGB;
          this.output = this.outputRGB;
        } else {
          this.getter = this.getValue8;
          this.setter = this.setValue8;
          this.output = this.outputSingle;
        }
      } else {
        this.getter = this.getValue16;
        this.setter = this.setValue16;
        this.output = this.outputSingle;
      }
      switch (this.selection) {
        case 2:
          this.selector = this.select2;
          break;
        case 3:
          this.selector = this.select3;
          break;
        case 4:
          this.selector = this.select4;
          break;
        case 5:
          this.selector = this.select5;
          break;
        case 6:
          this.selector = this.select6;
          break;
        case 7:
          this.selector = this.select7;
          break;
        default:
          this.selector = this.select1;
          break;
      }
      this.scanComps = this.scan.components;
      this.quantTables = this.quantTable.quantTables;
      for (i = 0; i < this.numComp; i += 1) {
        compN = this.scanComps[i].scanCompSel;
        this.qTab[i] = this.quantTables[this.components[compN].quantTableSel];
        this.nBlock[i] = this.components[compN].vSamp * this.components[compN].hSamp;
        this.dcTab[i] = this.HuffTab[this.scanComps[i].dcTabSel][0];
        this.acTab[i] = this.HuffTab[this.scanComps[i].acTabSel][1];
      }
      this.xDim = this.frame.dimX;
      this.yDim = this.frame.dimY;
      if (this.numBytes == 1) {
        this.outputData = new Uint8Array(new ArrayBuffer(this.xDim * this.yDim * this.numBytes * this.numComp));
      } else {
        this.outputData = new Uint16Array(new ArrayBuffer(this.xDim * this.yDim * this.numBytes * this.numComp));
      }
      scanNum += 1;
      while (true) {
        temp[0] = 0;
        index[0] = 0;
        for (i = 0; i < 10; i += 1) {
          pred[i] = 1 << this.precision - 1;
        }
        if (this.restartInterval === 0) {
          current = this.decodeUnit(pred, temp, index);
          while (current === 0 && (this.xLoc < this.xDim && this.yLoc < this.yDim)) {
            this.output(pred);
            current = this.decodeUnit(pred, temp, index);
          }
          break;
        }
        for (mcuNum = 0; mcuNum < this.restartInterval; mcuNum += 1) {
          this.restarting = mcuNum == 0;
          current = this.decodeUnit(pred, temp, index);
          this.output(pred);
          if (current !== 0) {
            break;
          }
        }
        if (current === 0) {
          if (this.markerIndex !== 0) {
            current = 65280 | this.marker;
            this.markerIndex = 0;
          } else {
            current = this.stream.get16();
          }
        }
        if (!(current >= jpeg.lossless.Decoder.RESTART_MARKER_BEGIN && current <= jpeg.lossless.Decoder.RESTART_MARKER_END)) {
          break;
        }
      }
      if (current === 65500 && scanNum === 1) {
        this.readNumber();
        current = this.stream.get16();
      }
    } while (current !== 65497 && (this.xLoc < this.xDim && this.yLoc < this.yDim) && scanNum === 0);
    return this.outputData;
  };
  jpeg.lossless.Decoder.prototype.decodeUnit = function(prev, temp, index) {
    if (this.numComp == 1) {
      return this.decodeSingle(prev, temp, index);
    } else if (this.numComp == 3) {
      return this.decodeRGB(prev, temp, index);
    } else {
      return -1;
    }
  };
  jpeg.lossless.Decoder.prototype.select1 = function(compOffset) {
    return this.getPreviousX(compOffset);
  };
  jpeg.lossless.Decoder.prototype.select2 = function(compOffset) {
    return this.getPreviousY(compOffset);
  };
  jpeg.lossless.Decoder.prototype.select3 = function(compOffset) {
    return this.getPreviousXY(compOffset);
  };
  jpeg.lossless.Decoder.prototype.select4 = function(compOffset) {
    return this.getPreviousX(compOffset) + this.getPreviousY(compOffset) - this.getPreviousXY(compOffset);
  };
  jpeg.lossless.Decoder.prototype.select5 = function(compOffset) {
    return this.getPreviousX(compOffset) + (this.getPreviousY(compOffset) - this.getPreviousXY(compOffset) >> 1);
  };
  jpeg.lossless.Decoder.prototype.select6 = function(compOffset) {
    return this.getPreviousY(compOffset) + (this.getPreviousX(compOffset) - this.getPreviousXY(compOffset) >> 1);
  };
  jpeg.lossless.Decoder.prototype.select7 = function(compOffset) {
    return (this.getPreviousX(compOffset) + this.getPreviousY(compOffset)) / 2;
  };
  jpeg.lossless.Decoder.prototype.decodeRGB = function(prev, temp, index) {
    var value, actab, dctab, qtab, ctrC, i, k, j;
    prev[0] = this.selector(0);
    prev[1] = this.selector(1);
    prev[2] = this.selector(2);
    for (ctrC = 0; ctrC < this.numComp; ctrC += 1) {
      qtab = this.qTab[ctrC];
      actab = this.acTab[ctrC];
      dctab = this.dcTab[ctrC];
      for (i = 0; i < this.nBlock[ctrC]; i += 1) {
        for (k = 0; k < this.IDCT_Source.length; k += 1) {
          this.IDCT_Source[k] = 0;
        }
        value = this.getHuffmanValue(dctab, temp, index);
        if (value >= 65280) {
          return value;
        }
        prev[ctrC] = this.IDCT_Source[0] = prev[ctrC] + this.getn(index, value, temp, index);
        this.IDCT_Source[0] *= qtab[0];
        for (j = 1; j < 64; j += 1) {
          value = this.getHuffmanValue(actab, temp, index);
          if (value >= 65280) {
            return value;
          }
          j += value >> 4;
          if ((value & 15) === 0) {
            if (value >> 4 === 0) {
              break;
            }
          } else {
            this.IDCT_Source[jpeg.lossless.Decoder.IDCT_P[j]] = this.getn(index, value & 15, temp, index) * qtab[j];
          }
        }
      }
    }
    return 0;
  };
  jpeg.lossless.Decoder.prototype.decodeSingle = function(prev, temp, index) {
    var value, i, n, nRestart;
    if (this.restarting) {
      this.restarting = false;
      prev[0] = 1 << this.frame.precision - 1;
    } else {
      prev[0] = this.selector();
    }
    for (i = 0; i < this.nBlock[0]; i += 1) {
      value = this.getHuffmanValue(this.dcTab[0], temp, index);
      if (value >= 65280) {
        return value;
      }
      n = this.getn(prev, value, temp, index);
      nRestart = n >> 8;
      if (nRestart >= jpeg.lossless.Decoder.RESTART_MARKER_BEGIN && nRestart <= jpeg.lossless.Decoder.RESTART_MARKER_END) {
        return nRestart;
      }
      prev[0] += n;
    }
    return 0;
  };
  jpeg.lossless.Decoder.prototype.getHuffmanValue = function(table, temp, index) {
    var code, input, mask;
    mask = 65535;
    if (index[0] < 8) {
      temp[0] <<= 8;
      input = this.stream.get8();
      if (input === 255) {
        this.marker = this.stream.get8();
        if (this.marker !== 0) {
          this.markerIndex = 9;
        }
      }
      temp[0] |= input;
    } else {
      index[0] -= 8;
    }
    code = table[temp[0] >> index[0]];
    if ((code & jpeg.lossless.Decoder.MSB) !== 0) {
      if (this.markerIndex !== 0) {
        this.markerIndex = 0;
        return 65280 | this.marker;
      }
      temp[0] &= mask >> 16 - index[0];
      temp[0] <<= 8;
      input = this.stream.get8();
      if (input === 255) {
        this.marker = this.stream.get8();
        if (this.marker !== 0) {
          this.markerIndex = 9;
        }
      }
      temp[0] |= input;
      code = table[(code & 255) * 256 + (temp[0] >> index[0])];
      index[0] += 8;
    }
    index[0] += 8 - (code >> 8);
    if (index[0] < 0) {
      throw new Error("index=" + index[0] + " temp=" + temp[0] + " code=" + code + " in HuffmanValue()");
    }
    if (index[0] < this.markerIndex) {
      this.markerIndex = 0;
      return 65280 | this.marker;
    }
    temp[0] &= mask >> 16 - index[0];
    return code & 255;
  };
  jpeg.lossless.Decoder.prototype.getn = function(PRED, n, temp, index) {
    var result, one, n_one, mask, input;
    one = 1;
    n_one = -1;
    mask = 65535;
    if (n === 0) {
      return 0;
    }
    if (n === 16) {
      if (PRED[0] >= 0) {
        return -32768;
      } else {
        return 32768;
      }
    }
    index[0] -= n;
    if (index[0] >= 0) {
      if (index[0] < this.markerIndex && !this.isLastPixel()) {
        this.markerIndex = 0;
        return (65280 | this.marker) << 8;
      }
      result = temp[0] >> index[0];
      temp[0] &= mask >> 16 - index[0];
    } else {
      temp[0] <<= 8;
      input = this.stream.get8();
      if (input === 255) {
        this.marker = this.stream.get8();
        if (this.marker !== 0) {
          this.markerIndex = 9;
        }
      }
      temp[0] |= input;
      index[0] += 8;
      if (index[0] < 0) {
        if (this.markerIndex !== 0) {
          this.markerIndex = 0;
          return (65280 | this.marker) << 8;
        }
        temp[0] <<= 8;
        input = this.stream.get8();
        if (input === 255) {
          this.marker = this.stream.get8();
          if (this.marker !== 0) {
            this.markerIndex = 9;
          }
        }
        temp[0] |= input;
        index[0] += 8;
      }
      if (index[0] < 0) {
        throw new Error("index=" + index[0] + " in getn()");
      }
      if (index[0] < this.markerIndex) {
        this.markerIndex = 0;
        return (65280 | this.marker) << 8;
      }
      result = temp[0] >> index[0];
      temp[0] &= mask >> 16 - index[0];
    }
    if (result < one << n - 1) {
      result += (n_one << n) + 1;
    }
    return result;
  };
  jpeg.lossless.Decoder.prototype.getPreviousX = function(compOffset) {
    if (this.xLoc > 0) {
      return this.getter(this.yLoc * this.xDim + this.xLoc - 1, compOffset);
    } else if (this.yLoc > 0) {
      return this.getPreviousY(compOffset);
    } else {
      return 1 << this.frame.precision - 1;
    }
  };
  jpeg.lossless.Decoder.prototype.getPreviousXY = function(compOffset) {
    if (this.xLoc > 0 && this.yLoc > 0) {
      return this.getter((this.yLoc - 1) * this.xDim + this.xLoc - 1, compOffset);
    } else {
      return this.getPreviousY(compOffset);
    }
  };
  jpeg.lossless.Decoder.prototype.getPreviousY = function(compOffset) {
    if (this.yLoc > 0) {
      return this.getter((this.yLoc - 1) * this.xDim + this.xLoc, compOffset);
    } else {
      return this.getPreviousX(compOffset);
    }
  };
  jpeg.lossless.Decoder.prototype.isLastPixel = function() {
    return this.xLoc === this.xDim - 1 && this.yLoc === this.yDim - 1;
  };
  jpeg.lossless.Decoder.prototype.outputSingle = function(PRED) {
    if (this.xLoc < this.xDim && this.yLoc < this.yDim) {
      this.setter(this.yLoc * this.xDim + this.xLoc, this.mask & PRED[0]);
      this.xLoc += 1;
      if (this.xLoc >= this.xDim) {
        this.yLoc += 1;
        this.xLoc = 0;
      }
    }
  };
  jpeg.lossless.Decoder.prototype.outputRGB = function(PRED) {
    var offset = this.yLoc * this.xDim + this.xLoc;
    if (this.xLoc < this.xDim && this.yLoc < this.yDim) {
      this.setter(offset, PRED[0], 0);
      this.setter(offset, PRED[1], 1);
      this.setter(offset, PRED[2], 2);
      this.xLoc += 1;
      if (this.xLoc >= this.xDim) {
        this.yLoc += 1;
        this.xLoc = 0;
      }
    }
  };
  jpeg.lossless.Decoder.prototype.setValue8 = function(index, val) {
    this.outputData[index] = val;
  };
  jpeg.lossless.Decoder.prototype.getValue8 = function(index) {
    return this.outputData[index];
  };
  var littleEndian = function() {
    var buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, 256, true);
    return new Int16Array(buffer)[0] === 256;
  }();
  if (littleEndian) {
    jpeg.lossless.Decoder.prototype.setValue16 = jpeg.lossless.Decoder.prototype.setValue8;
    jpeg.lossless.Decoder.prototype.getValue16 = jpeg.lossless.Decoder.prototype.getValue8;
  } else {
    jpeg.lossless.Decoder.prototype.setValue16 = function(index, val) {
      this.outputData[index] = (val & 255) << 8 | val >> 8 & 255;
    };
    jpeg.lossless.Decoder.prototype.getValue16 = function(index) {
      var val = this.outputData[index];
      return (val & 255) << 8 | val >> 8 & 255;
    };
  }
  jpeg.lossless.Decoder.prototype.setValueRGB = function(index, val, compOffset) {
    this.outputData[index * 3 + compOffset] = val;
  };
  jpeg.lossless.Decoder.prototype.getValueRGB = function(index, compOffset) {
    return this.outputData[index * 3 + compOffset];
  };
  jpeg.lossless.Decoder.prototype.readApp = function() {
    var count = 0, length = this.stream.get16();
    count += 2;
    while (count < length) {
      this.stream.get8();
      count += 1;
    }
    return length;
  };
  jpeg.lossless.Decoder.prototype.readComment = function() {
    var sb = "", count = 0, length;
    length = this.stream.get16();
    count += 2;
    while (count < length) {
      sb += this.stream.get8();
      count += 1;
    }
    return sb;
  };
  jpeg.lossless.Decoder.prototype.readNumber = function() {
    var Ld = this.stream.get16();
    if (Ld !== 4) {
      throw new Error("ERROR: Define number format throw new IOException [Ld!=4]");
    }
    return this.stream.get16();
  };
  if (module.exports) {
    module.exports = jpeg.lossless.Decoder;
  }
});
var main = createCommonjsModule(function(module) {
  var jpeg = jpeg || {};
  jpeg.lossless = jpeg.lossless || {};
  jpeg.lossless.ComponentSpec = jpeg.lossless.ComponentSpec || (typeof commonjsRequire !== "undefined" ? componentSpec : null);
  jpeg.lossless.DataStream = jpeg.lossless.DataStream || (typeof commonjsRequire !== "undefined" ? dataStream : null);
  jpeg.lossless.Decoder = jpeg.lossless.Decoder || (typeof commonjsRequire !== "undefined" ? decoder : null);
  jpeg.lossless.FrameHeader = jpeg.lossless.FrameHeader || (typeof commonjsRequire !== "undefined" ? frameHeader : null);
  jpeg.lossless.HuffmanTable = jpeg.lossless.HuffmanTable || (typeof commonjsRequire !== "undefined" ? huffmanTable : null);
  jpeg.lossless.QuantizationTable = jpeg.lossless.QuantizationTable || (typeof commonjsRequire !== "undefined" ? quantizationTable : null);
  jpeg.lossless.ScanComponent = jpeg.lossless.ScanComponent || (typeof commonjsRequire !== "undefined" ? scanComponent : null);
  jpeg.lossless.ScanHeader = jpeg.lossless.ScanHeader || (typeof commonjsRequire !== "undefined" ? scanHeader : null);
  jpeg.lossless.Utils = jpeg.lossless.Utils || (typeof commonjsRequire !== "undefined" ? utils : null);
  if (module.exports) {
    module.exports = jpeg;
  }
});
export default main;
var lossless = main.lossless;
export {main as __moduleExports, lossless};
