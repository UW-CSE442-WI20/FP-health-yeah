// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ZpfM":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Code adapted from https://css-tricks.com/blobs/
// Create circle animation for decoration
var canvas, ctx;
var render, init;
var blob;

var Blob =
/*#__PURE__*/
function () {
  function Blob() {
    _classCallCheck(this, Blob);

    this.points = [];
  }

  _createClass(Blob, [{
    key: "init",
    value: function init() {
      for (var i = 0; i < this.numPoints; i++) {
        var point = new Point(this.divisional * (i + 1), this); // point.acceleration = -1 + Math.random() * 2;

        this.push(point);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var canvas = this.canvas;
      var ctx = this.ctx;
      var position = this.position;
      var pointsArray = this.points;
      var radius = this.radius;
      var points = this.numPoints;
      var divisional = this.divisional;
      var center = this.center;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pointsArray[0].solveWith(pointsArray[points - 1], pointsArray[1]);
      var p0 = pointsArray[points - 1].position;
      var p1 = pointsArray[0].position;
      var _p2 = p1;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);

      for (var i = 1; i < points; i++) {
        pointsArray[i].solveWith(pointsArray[i - 1], pointsArray[i + 1] || pointsArray[0]);
        var p2 = pointsArray[i].position;
        var xc = (p1.x + p2.x) / 2;
        var yc = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, xc, yc); // ctx.lineTo(p2.x, p2.y);

        ctx.fillStyle = '#A1BFCF'; // ctx.fillRect(p1.x-2.5, p1.y-2.5, 5, 5);

        p1 = p2;
      }

      var xc = (p1.x + _p2.x) / 2;
      var yc = (p1.y + _p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, xc, yc); // ctx.lineTo(_p2.x, _p2.y);
      // ctx.closePath();

      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.strokeStyle = '#A1BFCF'; // ctx.stroke();

      /*
          ctx.fillStyle = '#000000';
          if(this.mousePos) {
            let angle = Math.atan2(this.mousePos.y, this.mousePos.x) + Math.PI;
            ctx.fillRect(center.x + Math.cos(angle) * this.radius, center.y + Math.sin(angle) * this.radius, 5, 5);
          }
      */

      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: "push",
    value: function push(item) {
      if (item instanceof Point) {
        this.points.push(item);
      }
    }
  }, {
    key: "color",
    set: function set(value) {
      this._color = value;
    },
    get: function get() {
      return this._color || '#A1BFCF';
    }
  }, {
    key: "canvas",
    set: function set(value) {
      if (value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
        this._canvas = canvas;
        this.ctx = this._canvas.getContext('2d');
      }
    },
    get: function get() {
      return this._canvas;
    }
  }, {
    key: "numPoints",
    set: function set(value) {
      if (value > 2) {
        this._points = value;
      }
    },
    get: function get() {
      return this._points || 32;
    }
  }, {
    key: "radius",
    set: function set(value) {
      if (value > 0) {
        this._radius = value;
      }
    },
    get: function get() {
      return this._radius || 90;
    }
  }, {
    key: "position",
    set: function set(value) {
      if (_typeof(value) == 'object' && value.x && value.y) {
        this._position = value;
      }
    },
    get: function get() {
      return this._position || {
        x: 0.5,
        y: 0.5
      };
    }
  }, {
    key: "divisional",
    get: function get() {
      return Math.PI * 2 / this.numPoints;
    }
  }, {
    key: "center",
    get: function get() {
      return {
        x: this.canvas.width * this.position.x,
        y: this.canvas.height * this.position.y
      };
    }
  }, {
    key: "running",
    set: function set(value) {
      this._running = value === true;
    },
    get: function get() {
      return this.running !== false;
    }
  }]);

  return Blob;
}();

var Point =
/*#__PURE__*/
function () {
  function Point(azimuth, parent) {
    _classCallCheck(this, Point);

    this.parent = parent;
    this.azimuth = Math.PI - azimuth;
    this._components = {
      x: Math.cos(this.azimuth),
      y: Math.sin(this.azimuth)
    };
    this.acceleration = -0.3 + Math.random() * 0.6;
  }

  _createClass(Point, [{
    key: "solveWith",
    value: function solveWith(leftPoint, rightPoint) {
      this.acceleration = (-0.3 * this.radialEffect + (leftPoint.radialEffect - this.radialEffect) + (rightPoint.radialEffect - this.radialEffect)) * this.elasticity - this.speed * this.friction;
    }
  }, {
    key: "acceleration",
    set: function set(value) {
      if (typeof value == 'number') {
        this._acceleration = value;
        this.speed += this._acceleration * 2;
      }
    },
    get: function get() {
      return this._acceleration || 0;
    }
  }, {
    key: "speed",
    set: function set(value) {
      if (typeof value == 'number') {
        this._speed = value;
        this.radialEffect += this._speed * 5;
      }
    },
    get: function get() {
      return this._speed || 0;
    }
  }, {
    key: "radialEffect",
    set: function set(value) {
      if (typeof value == 'number') {
        this._radialEffect = value;
      }
    },
    get: function get() {
      return this._radialEffect || 0;
    }
  }, {
    key: "position",
    get: function get() {
      return {
        x: this.parent.center.x + this.components.x * (this.parent.radius + this.radialEffect),
        y: this.parent.center.y + this.components.y * (this.parent.radius + this.radialEffect)
      };
    }
  }, {
    key: "components",
    get: function get() {
      return this._components;
    }
  }, {
    key: "elasticity",
    set: function set(value) {
      if (typeof value === 'number') {
        this._elasticity = value;
      }
    },
    get: function get() {
      return this._elasticity || 0.001;
    }
  }, {
    key: "friction",
    set: function set(value) {
      if (typeof value === 'number') {
        this._friction = value;
      }
    },
    get: function get() {
      return this._friction || 0.0085;
    }
  }]);

  return Point;
}();

blob = new Blob();

init = function init() {
  canvas = document.createElement('canvas');
  canvas.setAttribute('touch-action', 'none');
  canvas.style.position = 'absolute';
  canvas.style.zIndex = "-1";
  document.body.appendChild(canvas);

  var resize = function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.3;
  };

  window.addEventListener('resize', resize);
  resize();
  var oldMousePoint = {
    x: 0,
    y: 0
  };
  var hover = false;

  var mouseMove = function mouseMove(e) {
    var pos = blob.center;
    var diff = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    };
    var dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y);
    var angle = null;
    blob.mousePos = {
      x: pos.x - e.clientX,
      y: pos.y - e.clientY
    };

    if (dist < blob.radius && hover === false) {
      var vector = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y
      };
      angle = Math.atan2(vector.y, vector.x);
      hover = true; // blob.color = '#77FF00';
    } else if (dist > blob.radius && hover === true) {
      var _vector = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y
      };
      angle = Math.atan2(_vector.y, _vector.x);
      hover = false;
      blob.color = null;
    }

    if (typeof angle == 'number') {
      var nearestPoint = null;
      var distanceFromPoint = 100;
      blob.points.forEach(function (point) {
        if (Math.abs(angle - point.azimuth) < distanceFromPoint) {
          // console.log(point.azimuth, angle, distanceFromPoint);
          nearestPoint = point;
          distanceFromPoint = Math.abs(angle - point.azimuth);
        }
      });

      if (nearestPoint) {
        var strength = {
          x: oldMousePoint.x - e.clientX,
          y: oldMousePoint.y - e.clientY
        };
        strength = Math.sqrt(strength.x * strength.x + strength.y * strength.y) * 10;
        if (strength > 100) strength = 100;
        nearestPoint.acceleration = strength / 100 * (hover ? -1 : 1);
      }
    }

    oldMousePoint.x = e.clientX;
    oldMousePoint.y = e.clientY;
  }; //   window.addEventListener('mousemove', mouseMove);


  window.addEventListener('pointermove', mouseMove);
  blob.canvas = canvas;
  blob.init();
  blob.render();
};

init();
},{}]},{},["ZpfM"], null)
//# sourceMappingURL=https://uw-cse442-wi20.github.io/FP-health-yeah/bubbleAnimation.4d656cf8.js.map