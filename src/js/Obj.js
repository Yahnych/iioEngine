// Generated by CoffeeScript 1.8.0
(function() {
  var iio, root, _ref;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  iio = root.iio = (_ref = root.iio) != null ? _ref : {};

  iio.Obj = (function() {
    function Obj(p, s, ss, pp) {
      var _p, _ref1;
      if (pp == null) {
        pp = ss;
      }
      if (pp) {
        this.parent = pp;
        this.app = pp.app;
      }
      if (iio.isString(p)) {
        _p = iio.parsePos(p.split(' '), this.parent);
        p = (_ref1 = _p.ps) != null ? _ref1 : {
          x: 0,
          y: 0
        };
        ss = s;
        s = _p.p;
      }
      if (s == null) {
        s = p;
        p = p.pos;
      }
      p = iio.point.vector(p);
      this.pos = p[0];
      if (p.length === 2) {
        this.type = iio.LINE;
      }
    }

    return Obj;

  })();

}).call(this);
