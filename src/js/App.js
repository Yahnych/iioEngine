// Generated by CoffeeScript 1.9.0
(function() {
  var iio, root, _ref;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  iio = root.iio = (_ref = root.iio) != null ? _ref : {};

  iio.App = (function() {
    function App(_at_canvas, app, settings) {
      var offset;
      this.canvas = _at_canvas;
      this.type = this.APP;
      this.app = this;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.parent = this;
      iio.canvas.prepInput(this.canvas);
      this.width = this.canvas.clientWidth || this.canvas.width;
      this.height = this.canvas.clientHeight || this.canvas.height;
      this.center = {
        x: this.width / 2,
        y: this.height / 2
      };
      offset = this.canvas.getBoundingClientRect();
      this.pos = {
        x: offset.left,
        y: offset.top
      };
      this.scale = 1;
      this.objs = [];
      this.rqAnimFrame = true;
      this.partialPx = true;
      this.alpha = 1;
      this.loops = [];
      this.run = iio.run;
      this.set = iio.set;
      this.add = iio.add;
      this.rm = iio.rm;
      this.loop = iio.loop;
      this.clearLoops = iio.clearLoops;
      this.pause = iio.pause;
      this.playAnim = iio.playAnim;
      this["eval"] = iio["eval"];
      this.collisions = [];
      iio.apps.push(this);
      if (iio.isString(app)) {
        this.runScript = iio.run(app, this);
        this.draw();
      } else {
        this.runScript = new app(this, settings);
      }
    }

    App.prototype.convertEventPot = function(event) {
      return {
        x: event.clientX - this.pos.x,
        y: event.clientY - this.pos.y
      };
    };

    App.prototype.stop = function() {
      var obj, _i, _len, _ref1;
      _ref1 = this.objs;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        obj = _ref1[_i];
        iio.cancelLoops(obj);
      }
      iio.cancelLoops(this);
      if (this.mainLoop) {
        iio.cancelLoops(this.mainLoop.id);
      }
      return this.clear();
    };

    App.prototype.draw = function(noClear) {
      var obj, _i, _len, _ref1, _results;
      if (!noClear) {
        this.clear();
      }
      if (this.color) {
        this.ctx.fillStyle = this.color;
        this.clear();
      }
      if (this.round) {
        this.canvas.style.borderRadius = round;
      }
      if (this.outline) {
        this.canvas.style.border = (this.lineWidth || 1) + "px solid " + this.outline;
      }
      if (this.alpha) {
        this.canvas.style.opacity = this.alpha;
      }
      _ref1 = this.objs;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        obj = _ref1[_i];
        if (obj.draw) {
          _results.push(obj.draw(this.ctx));
        }
      }
      return _results;
    };

    App.prototype.clear = function() {
      return this.ctx.clearRect(0, 0, this.width, this.height);
    };

    App.prototype.addCollision = function(object1, object2, callback) {
      return this.collisions.push([object1, object2, callback]);
    };

    App.prototype.checkCollisions = function(objects1, objects2, callback) {
      var obj1, obj2, _i, _j, _len, _len1;
      if (!(objects1 instanceof Array)) {
        objects1 = [objects1];
      }
      if (!(objects2 instanceof Array)) {
        objects2 = [objects2];
      }
      for (_i = 0, _len = objects1.length; _i < _len; _i++) {
        obj1 = objects1[_i];
        for (_j = 0, _len1 = objects2.length; _j < _len1; _j++) {
          obj2 = objects2[_j];
          if (iio.collision.check(obj1, obj2)) {
            callback(obj1, obj2);
          }
        }
      }
    };

    App.prototype._update = function(obj, dt) {
      var collision, _i, _j, _len, _len1, _ref1, _ref2, _results;
      if (this.update) {
        this.update(dt);
      }
      if (this.objs && this.objs.length > 0) {
        _ref1 = this.objs;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          obj = _ref1[_i];
          if (obj._update && obj._update(obj, dt)) {
            this.rm(obj);
          }
        }
      }
      if (this.collisions && this.collisions.length > 0) {
        _ref2 = this.collisions;
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          collision = _ref2[_j];
          _results.push(this.checkCollisions(collision[0], collision[1], collision[2]));
        }
        return _results;
      }
    };

    return App;

  })();

}).call(this);
