import { useRef as W, useEffect as H, useState as I, useCallback as le, useMemo as Q, forwardRef as we, useId as ke, useContext as Ne, createContext as Se } from "react";
import { jsxs as f, jsx as s } from "react/jsx-runtime";
function me(e) {
  var r, t, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var a = e.length;
    for (r = 0; r < a; r++) e[r] && (t = me(e[r])) && (o && (o += " "), o += t);
  } else for (t in e) e[t] && (o && (o += " "), o += t);
  return o;
}
function Ce() {
  for (var e, r, t = 0, o = "", a = arguments.length; t < a; t++) (e = arguments[t]) && (r = me(e)) && (o && (o += " "), o += r);
  return o;
}
const te = "-", Ae = (e) => {
  const r = Me(e), {
    conflictingClassGroups: t,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (l) => {
      const i = l.split(te);
      return i[0] === "" && i.length !== 1 && i.shift(), ge(i, r) || ze(l);
    },
    getConflictingClassGroupIds: (l, i) => {
      const p = t[l] || [];
      return i && o[l] ? [...p, ...o[l]] : p;
    }
  };
}, ge = (e, r) => {
  var l;
  if (e.length === 0)
    return r.classGroupId;
  const t = e[0], o = r.nextPart.get(t), a = o ? ge(e.slice(1), o) : void 0;
  if (a)
    return a;
  if (r.validators.length === 0)
    return;
  const n = e.join(te);
  return (l = r.validators.find(({
    validator: i
  }) => i(n))) == null ? void 0 : l.classGroupId;
}, ie = /^\[(.+)\]$/, ze = (e) => {
  if (ie.test(e)) {
    const r = ie.exec(e)[1], t = r == null ? void 0 : r.substring(0, r.indexOf(":"));
    if (t)
      return "arbitrary.." + t;
  }
}, Me = (e) => {
  const {
    theme: r,
    prefix: t
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Re(Object.entries(e.classGroups), t).forEach(([n, l]) => {
    ee(l, o, n, r);
  }), o;
}, ee = (e, r, t, o) => {
  e.forEach((a) => {
    if (typeof a == "string") {
      const n = a === "" ? r : ce(r, a);
      n.classGroupId = t;
      return;
    }
    if (typeof a == "function") {
      if (Ie(a)) {
        ee(a(o), r, t, o);
        return;
      }
      r.validators.push({
        validator: a,
        classGroupId: t
      });
      return;
    }
    Object.entries(a).forEach(([n, l]) => {
      ee(l, ce(r, n), t, o);
    });
  });
}, ce = (e, r) => {
  let t = e;
  return r.split(te).forEach((o) => {
    t.nextPart.has(o) || t.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), t = t.nextPart.get(o);
  }), t;
}, Ie = (e) => e.isThemeGetter, Re = (e, r) => r ? e.map(([t, o]) => {
  const a = o.map((n) => typeof n == "string" ? r + n : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([l, i]) => [r + l, i])) : n);
  return [t, a];
}) : e, je = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let r = 0, t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const a = (n, l) => {
    t.set(n, l), r++, r > e && (r = 0, o = t, t = /* @__PURE__ */ new Map());
  };
  return {
    get(n) {
      let l = t.get(n);
      if (l !== void 0)
        return l;
      if ((l = o.get(n)) !== void 0)
        return a(n, l), l;
    },
    set(n, l) {
      t.has(n) ? t.set(n, l) : a(n, l);
    }
  };
}, be = "!", Le = (e) => {
  const {
    separator: r,
    experimentalParseClassName: t
  } = e, o = r.length === 1, a = r[0], n = r.length, l = (i) => {
    const p = [];
    let g = 0, h = 0, d;
    for (let u = 0; u < i.length; u++) {
      let x = i[u];
      if (g === 0) {
        if (x === a && (o || i.slice(u, u + n) === r)) {
          p.push(i.slice(h, u)), h = u + n;
          continue;
        }
        if (x === "/") {
          d = u;
          continue;
        }
      }
      x === "[" ? g++ : x === "]" && g--;
    }
    const v = p.length === 0 ? i : i.substring(h), b = v.startsWith(be), w = b ? v.substring(1) : v, c = d && d > h ? d - h : void 0;
    return {
      modifiers: p,
      hasImportantModifier: b,
      baseClassName: w,
      maybePostfixModifierPosition: c
    };
  };
  return t ? (i) => t({
    className: i,
    parseClassName: l
  }) : l;
}, Te = (e) => {
  if (e.length <= 1)
    return e;
  const r = [];
  let t = [];
  return e.forEach((o) => {
    o[0] === "[" ? (r.push(...t.sort(), o), t = []) : t.push(o);
  }), r.push(...t.sort()), r;
}, _e = (e) => ({
  cache: je(e.cacheSize),
  parseClassName: Le(e),
  ...Ae(e)
}), Ge = /\s+/, De = (e, r) => {
  const {
    parseClassName: t,
    getClassGroupId: o,
    getConflictingClassGroupIds: a
  } = r, n = [], l = e.trim().split(Ge);
  let i = "";
  for (let p = l.length - 1; p >= 0; p -= 1) {
    const g = l[p], {
      modifiers: h,
      hasImportantModifier: d,
      baseClassName: v,
      maybePostfixModifierPosition: b
    } = t(g);
    let w = !!b, c = o(w ? v.substring(0, b) : v);
    if (!c) {
      if (!w) {
        i = g + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (c = o(v), !c) {
        i = g + (i.length > 0 ? " " + i : i);
        continue;
      }
      w = !1;
    }
    const u = Te(h).join(":"), x = d ? u + be : u, z = x + c;
    if (n.includes(z))
      continue;
    n.push(z);
    const R = a(c, w);
    for (let m = 0; m < R.length; ++m) {
      const N = R[m];
      n.push(x + N);
    }
    i = g + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Pe() {
  let e = 0, r, t, o = "";
  for (; e < arguments.length; )
    (r = arguments[e++]) && (t = fe(r)) && (o && (o += " "), o += t);
  return o;
}
const fe = (e) => {
  if (typeof e == "string")
    return e;
  let r, t = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (r = fe(e[o])) && (t && (t += " "), t += r);
  return t;
};
function Ee(e, ...r) {
  let t, o, a, n = l;
  function l(p) {
    const g = r.reduce((h, d) => d(h), e());
    return t = _e(g), o = t.cache.get, a = t.cache.set, n = i, i(p);
  }
  function i(p) {
    const g = o(p);
    if (g)
      return g;
    const h = De(p, t);
    return a(p, h), h;
  }
  return function() {
    return n(Pe.apply(null, arguments));
  };
}
const C = (e) => {
  const r = (t) => t[e] || [];
  return r.isThemeGetter = !0, r;
}, he = /^\[(?:([a-z-]+):)?(.+)\]$/i, Fe = /^\d+\/\d+$/, $e = /* @__PURE__ */ new Set(["px", "full", "screen"]), Ve = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, We = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Oe = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Be = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ue = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, L = (e) => D(e) || $e.has(e) || Fe.test(e), T = (e) => P(e, "length", Qe), D = (e) => !!e && !Number.isNaN(Number(e)), Z = (e) => P(e, "number", D), $ = (e) => !!e && Number.isInteger(Number(e)), qe = (e) => e.endsWith("%") && D(e.slice(0, -1)), y = (e) => he.test(e), _ = (e) => Ve.test(e), He = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Je = (e) => P(e, He, xe), Ke = (e) => P(e, "position", xe), Xe = /* @__PURE__ */ new Set(["image", "url"]), Ye = (e) => P(e, Xe, rr), Ze = (e) => P(e, "", er), V = () => !0, P = (e, r, t) => {
  const o = he.exec(e);
  return o ? o[1] ? typeof r == "string" ? o[1] === r : r.has(o[1]) : t(o[2]) : !1;
}, Qe = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  We.test(e) && !Oe.test(e)
), xe = () => !1, er = (e) => Be.test(e), rr = (e) => Ue.test(e), tr = () => {
  const e = C("colors"), r = C("spacing"), t = C("blur"), o = C("brightness"), a = C("borderColor"), n = C("borderRadius"), l = C("borderSpacing"), i = C("borderWidth"), p = C("contrast"), g = C("grayscale"), h = C("hueRotate"), d = C("invert"), v = C("gap"), b = C("gradientColorStops"), w = C("gradientColorStopPositions"), c = C("inset"), u = C("margin"), x = C("opacity"), z = C("padding"), R = C("saturate"), m = C("scale"), N = C("sepia"), S = C("skew"), M = C("space"), E = C("translate"), J = () => ["auto", "contain", "none"], K = () => ["auto", "hidden", "clip", "visible", "scroll"], X = () => ["auto", y, r], A = () => [y, r], oe = () => ["", L, T], O = () => ["auto", D, y], ne = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], B = () => ["solid", "dashed", "dotted", "double", "none"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Y = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], F = () => ["", "0", y], ae = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], j = () => [D, y];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [V],
      spacing: [L, T],
      blur: ["none", "", _, y],
      brightness: j(),
      borderColor: [e],
      borderRadius: ["none", "", "full", _, y],
      borderSpacing: A(),
      borderWidth: oe(),
      contrast: j(),
      grayscale: F(),
      hueRotate: j(),
      invert: F(),
      gap: A(),
      gradientColorStops: [e],
      gradientColorStopPositions: [qe, T],
      inset: X(),
      margin: X(),
      opacity: j(),
      padding: A(),
      saturate: j(),
      scale: j(),
      sepia: F(),
      skew: j(),
      space: A(),
      translate: A()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", y]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [_]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ae()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ae()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...ne(), y]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: K()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": K()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": K()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: J()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": J()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": J()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [c]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [c]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [c]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [c]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [c]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [c]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [c]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [c]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [c]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", $, y]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: X()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", y]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: F()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: F()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", $, y]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [V]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", $, y]
        }, y]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": O()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": O()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [V]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [$, y]
        }, y]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": O()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": O()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", y]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", y]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [v]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [v]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [v]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...Y()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Y(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...Y(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [z]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [z]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [z]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [z]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [z]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [z]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [z]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [z]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [z]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [u]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [u]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [u]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [u]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [u]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [u]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [u]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [u]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [u]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [M]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [M]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", y, r]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [y, r, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [y, r, "none", "full", "min", "max", "fit", "prose", {
          screen: [_]
        }, _]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [y, r, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [y, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [y, r, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [y, r, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", _, T]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Z]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [V]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", y]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", D, Z]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", L, y]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", y]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", y]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [x]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [x]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...B(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", L, T]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", L, y]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: A()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", y]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", y]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [x]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...ne(), Ke]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Je]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ye]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [w]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [w]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [w]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [b]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [b]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [b]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [n]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [n]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [n]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [n]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [n]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [n]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [n]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [n]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [n]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [n]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [n]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [n]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [n]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [n]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [n]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [x]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...B(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [x]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: B()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [a]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [a]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [a]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [a]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [a]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [a]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [a]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [a]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [a]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [a]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...B()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [L, y]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [L, T]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: oe()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [x]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [L, T]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", _, Ze]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [V]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [x]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...se(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": se()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [t]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [p]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", _, y]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [g]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [h]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [R]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [N]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [t]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [p]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [g]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [h]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [x]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [R]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [N]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [l]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [l]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [l]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", y]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: j()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", y]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: j()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", y]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [m]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [m]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [m]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [$, y]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [E]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [E]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [S]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [S]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", y]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", y]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": A()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": A()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": A()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": A()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": A()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": A()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": A()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": A()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": A()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": A()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": A()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": A()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": A()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": A()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": A()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": A()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": A()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": A()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", y]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [L, T, Z]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, or = /* @__PURE__ */ Ee(tr);
function k(...e) {
  return or(Ce(e));
}
function nr(e, r) {
  const t = W(e);
  H(() => {
    t.current = e;
  }, [e]), H(() => {
    if (r === null) return;
    const o = setInterval(() => t.current(), r);
    return () => clearInterval(o);
  }, [r]);
}
const re = 54, de = 2 * Math.PI * re, ue = {
  work: "Focus",
  break: "Short Break",
  longBreak: "Long Break"
}, sr = {
  work: "stroke-crisp-500",
  break: "stroke-emerald-500",
  longBreak: "stroke-sky-500"
}, ar = {
  work: "bg-crisp-50 border-crisp-100",
  break: "bg-emerald-50 border-emerald-100",
  longBreak: "bg-sky-50 border-sky-100"
};
function Ar({
  workMinutes: e = 25,
  breakMinutes: r = 5,
  longBreakMinutes: t = 15,
  longBreakEvery: o = 4,
  onPhaseChange: a,
  className: n
}) {
  const [l, i] = I("work"), [p, g] = I(e * 60), [h, d] = I(!1), [v, b] = I(0), w = le(() => l === "work" ? e * 60 : l === "break" ? r * 60 : t * 60, [l, e, r, t]), c = le(() => {
    if (d(!1), l === "work") {
      const S = v + 1;
      b(S);
      const M = S % o === 0 ? "longBreak" : "break";
      i(M), g((M === "longBreak" ? t : r) * 60), a == null || a(M);
    } else
      i("work"), g(e * 60), a == null || a("work");
  }, [l, v, o, e, r, t, a]);
  nr(
    () => {
      p <= 1 ? c() : g((S) => S - 1);
    },
    h ? 1e3 : null
  );
  const u = p / w(), x = de * (1 - u), z = Math.floor(p / 60).toString().padStart(2, "0"), R = (p % 60).toString().padStart(2, "0"), m = () => {
    d(!1), g(w());
  }, N = (S) => {
    i(S), d(!1);
    const M = S === "work" ? e * 60 : S === "break" ? r * 60 : t * 60;
    g(M);
  };
  return /* @__PURE__ */ f("div", { className: k("flex flex-col items-center gap-6 p-8 rounded-2xl border", ar[l], n), children: [
    /* @__PURE__ */ s("div", { className: "flex gap-2", children: ["work", "break", "longBreak"].map((S) => /* @__PURE__ */ s(
      "button",
      {
        onClick: () => N(S),
        className: k(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
          l === S ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"
        ),
        children: ue[S]
      },
      S
    )) }),
    /* @__PURE__ */ f("div", { className: "relative flex items-center justify-center", children: [
      /* @__PURE__ */ f("svg", { width: "140", height: "140", viewBox: "0 0 120 120", className: "-rotate-90", children: [
        /* @__PURE__ */ s(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: re,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "6",
            className: "text-gray-200"
          }
        ),
        /* @__PURE__ */ s(
          "circle",
          {
            cx: "60",
            cy: "60",
            r: re,
            fill: "none",
            strokeWidth: "6",
            strokeLinecap: "round",
            strokeDasharray: de,
            strokeDashoffset: x,
            className: k("transition-all duration-1000", sr[l])
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "absolute flex flex-col items-center", children: [
        /* @__PURE__ */ f("span", { className: "text-3xl font-bold tabular-nums text-gray-800", children: [
          z,
          ":",
          R
        ] }),
        /* @__PURE__ */ s("span", { className: "text-xs text-gray-400 mt-0.5", children: ue[l] })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s(
        "button",
        {
          onClick: m,
          className: "p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-white transition-all",
          "aria-label": "Reset",
          children: /* @__PURE__ */ s("svg", { className: "w-5 h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) })
        }
      ),
      /* @__PURE__ */ s(
        "button",
        {
          onClick: () => d((S) => !S),
          className: k(
            "px-8 py-2.5 rounded-full font-semibold text-sm text-white transition-all shadow-sm",
            l === "work" ? "bg-crisp-600 hover:bg-crisp-700" : l === "break" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-sky-600 hover:bg-sky-700"
          ),
          children: h ? "Pause" : "Start"
        }
      ),
      /* @__PURE__ */ f("span", { className: "text-xs text-gray-400 w-12 text-center", children: [
        "#",
        v + 1
      ] })
    ] })
  ] });
}
function ye(e, r) {
  const [t, o] = I(() => {
    try {
      const n = window.localStorage.getItem(e);
      return n ? JSON.parse(n) : r;
    } catch {
      return r;
    }
  });
  return [t, (n) => {
    try {
      o(n), window.localStorage.setItem(e, JSON.stringify(n));
    } catch {
    }
  }];
}
const lr = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700"
}, pe = [
  "bg-crisp-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-sky-500"
];
function ir({ card: e }) {
  var r;
  return /* @__PURE__ */ f("div", { className: "bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing select-none", children: [
    /* @__PURE__ */ s("p", { className: "text-sm font-medium text-gray-800", children: e.title }),
    e.description && /* @__PURE__ */ s("p", { className: "text-xs text-gray-400 mt-1 line-clamp-2", children: e.description }),
    /* @__PURE__ */ f("div", { className: "flex flex-wrap gap-1 mt-2", children: [
      e.priority && /* @__PURE__ */ s("span", { className: k("text-xs px-2 py-0.5 rounded-full font-medium", lr[e.priority]), children: e.priority }),
      (r = e.tags) == null ? void 0 : r.map((t) => /* @__PURE__ */ s("span", { className: "text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500", children: t }, t))
    ] })
  ] });
}
function zr({
  initialColumns: e,
  storageKey: r,
  onBoardChange: t,
  cardRenderer: o,
  className: a
}) {
  const [n, l] = ye(
    r ?? "__crispui_kanban__",
    e
  ), [i, p] = I(
    r ? n : e
  ), [g, h] = I(null), d = W(null), v = (c) => {
    p(c), r && l(c), t == null || t(c);
  }, b = (c, u) => {
    d.current = { cardId: c, fromColumnId: u };
  }, w = (c) => {
    if (!d.current) return;
    const { cardId: u, fromColumnId: x } = d.current;
    if (x === c) {
      h(null);
      return;
    }
    let z;
    const R = i.map((m) => m.id === x ? (z = m.cards.find((S) => S.id === u), { ...m, cards: m.cards.filter((S) => S.id !== u) }) : m);
    if (z) {
      const m = R.map((N) => N.id === c ? { ...N, cards: [...N.cards, z] } : N);
      v(m);
    }
    d.current = null, h(null);
  };
  return /* @__PURE__ */ s("div", { className: k("flex gap-4 overflow-x-auto pb-2", a), children: i.map((c, u) => /* @__PURE__ */ f(
    "div",
    {
      onDragOver: (x) => {
        x.preventDefault(), h(c.id);
      },
      onDragLeave: () => h(null),
      onDrop: () => w(c.id),
      className: k(
        "flex-shrink-0 w-64 rounded-xl p-3 transition-colors",
        g === c.id ? "bg-crisp-50 ring-2 ring-crisp-300" : "bg-gray-50"
      ),
      children: [
        /* @__PURE__ */ f("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ s("span", { className: k("w-2.5 h-2.5 rounded-full", c.color ?? pe[u % pe.length]) }),
          /* @__PURE__ */ s("span", { className: "text-sm font-semibold text-gray-700", children: c.title }),
          /* @__PURE__ */ s("span", { className: "ml-auto text-xs text-gray-400 bg-gray-200 rounded-full px-2 py-0.5", children: c.cards.length })
        ] }),
        /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: c.cards.map((x) => /* @__PURE__ */ s(
          "div",
          {
            draggable: !0,
            onDragStart: () => b(x.id, c.id),
            children: o ? o(x, c.id) : /* @__PURE__ */ s(ir, { card: x })
          },
          x.id
        )) }),
        c.cards.length === 0 && /* @__PURE__ */ s("div", { className: "text-xs text-gray-400 text-center py-6 border-2 border-dashed border-gray-200 rounded-lg", children: "Drop cards here" })
      ]
    },
    c.id
  )) });
}
function cr(e = 1) {
  const r = /* @__PURE__ */ new Date(), o = (r.getDay() - e + 7) % 7, a = new Date(r);
  return a.setDate(r.getDate() - o), Array.from({ length: 7 }, (n, l) => {
    const i = new Date(a);
    return i.setDate(a.getDate() + l), i;
  });
}
function U(e) {
  return e.toISOString().slice(0, 10);
}
const dr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Mr({
  habits: e,
  storageKey: r = "__crispui_habits__",
  onCompletionChange: t,
  weekStartDay: o = 1,
  className: a
}) {
  const [n, l] = ye(r, {}), i = Q(() => cr(o), [o]), p = U(/* @__PURE__ */ new Date()), g = Q(() => {
    var v;
    const d = {};
    for (const b of e) {
      let w = 0;
      const c = /* @__PURE__ */ new Date();
      for (; ; ) {
        const u = U(c);
        if ((v = n[b.id]) != null && v[u])
          w++, c.setDate(c.getDate() - 1);
        else
          break;
      }
      d[b.id] = w;
    }
    return d;
  }, [e, n]), h = (d, v) => {
    var c;
    const b = ((c = n[d]) == null ? void 0 : c[v]) ?? !1, w = {
      ...n,
      [d]: { ...n[d] ?? {}, [v]: !b }
    };
    l(w), t == null || t(d, v, !b);
  };
  return /* @__PURE__ */ f("div", { className: k("bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", a), children: [
    /* @__PURE__ */ f("div", { className: "grid gap-0", style: { gridTemplateColumns: "1fr repeat(7, 2.5rem)" }, children: [
      /* @__PURE__ */ s("div", { className: "px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100", children: "Habit" }),
      i.map((d) => {
        const v = U(d), b = v === p;
        return /* @__PURE__ */ f(
          "div",
          {
            className: k(
              "flex flex-col items-center py-3 border-b border-gray-100 text-xs",
              b ? "bg-crisp-50" : ""
            ),
            children: [
              /* @__PURE__ */ s("span", { className: k("font-medium", b ? "text-crisp-600" : "text-gray-400"), children: dr[d.getDay()] }),
              /* @__PURE__ */ s("span", { className: k("font-bold", b ? "text-crisp-700" : "text-gray-600"), children: d.getDate() })
            ]
          },
          v
        );
      })
    ] }),
    e.map((d, v) => /* @__PURE__ */ f(
      "div",
      {
        className: k(
          "grid gap-0 items-center",
          v < e.length - 1 ? "border-b border-gray-50" : ""
        ),
        style: { gridTemplateColumns: "1fr repeat(7, 2.5rem)" },
        children: [
          /* @__PURE__ */ f("div", { className: "flex items-center gap-2.5 px-4 py-3", children: [
            d.icon && /* @__PURE__ */ s("span", { className: "text-lg", children: d.icon }),
            /* @__PURE__ */ f("div", { children: [
              /* @__PURE__ */ s("p", { className: "text-sm font-medium text-gray-700", children: d.name }),
              g[d.id] > 0 && /* @__PURE__ */ f("p", { className: "text-xs text-amber-500 font-medium", children: [
                "🔥 ",
                g[d.id],
                " day streak"
              ] })
            ] })
          ] }),
          i.map((b) => {
            var z;
            const w = U(b), c = w === p, u = ((z = n[d.id]) == null ? void 0 : z[w]) ?? !1, x = w > p;
            return /* @__PURE__ */ s(
              "div",
              {
                className: k("flex items-center justify-center py-3", c ? "bg-crisp-50" : ""),
                children: /* @__PURE__ */ s(
                  "button",
                  {
                    onClick: () => !x && h(d.id, w),
                    disabled: x,
                    className: k(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all",
                      u ? "bg-crisp-500 border-crisp-500 text-white" : x ? "border-gray-100 cursor-default" : "border-gray-200 hover:border-crisp-400"
                    ),
                    "aria-label": `${u ? "Unmark" : "Mark"} ${d.name} for ${w}`,
                    children: u && /* @__PURE__ */ s("svg", { className: "w-3.5 h-3.5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3, children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) })
                  }
                )
              },
              w
            );
          })
        ]
      },
      d.id
    ))
  ] });
}
function q({ className: e, style: r }) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: k("relative overflow-hidden bg-gray-100 rounded", e),
      style: r,
      "aria-hidden": "true",
      children: /* @__PURE__ */ s("div", { className: "absolute inset-0 -translate-x-full animate-[shimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" })
    }
  );
}
function G({ variant: e = "line", width: r, height: t, lines: o = 1, className: a }) {
  const n = {};
  return r !== void 0 && (n.width = typeof r == "number" ? `${r}px` : r), t !== void 0 && (n.height = typeof t == "number" ? `${t}px` : t), e === "circle" ? /* @__PURE__ */ s(
    q,
    {
      className: k("rounded-full", a),
      style: { width: r ?? "2.5rem", height: t ?? "2.5rem" }
    }
  ) : e === "rect" ? /* @__PURE__ */ s(q, { className: k("rounded-xl", a), style: n }) : o > 1 ? /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: Array.from({ length: o }).map((l, i) => /* @__PURE__ */ s(
    q,
    {
      className: k("h-4", i === o - 1 && "w-3/4", a),
      style: i < o - 1 ? { width: n.width } : void 0
    },
    i
  )) }) : /* @__PURE__ */ s(q, { className: k("h-4", a), style: n });
}
function ur({ lines: e = 3 }) {
  return /* @__PURE__ */ s(G, { variant: "line", lines: e });
}
function pr({ size: e = 40 }) {
  return /* @__PURE__ */ s(G, { variant: "circle", width: e, height: e });
}
function Ir() {
  return /* @__PURE__ */ f("div", { className: "bg-white rounded-2xl border border-gray-100 p-5 space-y-3", children: [
    /* @__PURE__ */ f("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ s(pr, {}),
      /* @__PURE__ */ f("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ s(G, { variant: "line", className: "h-4 w-1/2" }),
        /* @__PURE__ */ s(G, { variant: "line", className: "h-3 w-1/3" })
      ] })
    ] }),
    /* @__PURE__ */ s(G, { variant: "rect", className: "h-32 w-full" }),
    /* @__PURE__ */ s(ur, { lines: 2 })
  ] });
}
const mr = {
  crisp: { icon: "bg-crisp-100 text-crisp-600", bg: "border-crisp-100" },
  emerald: { icon: "bg-emerald-100 text-emerald-600", bg: "border-emerald-100" },
  rose: { icon: "bg-rose-100 text-rose-600", bg: "border-rose-100" },
  amber: { icon: "bg-amber-100 text-amber-600", bg: "border-amber-100" },
  sky: { icon: "bg-sky-100 text-sky-600", bg: "border-sky-100" }
}, gr = {
  increase: "text-emerald-600 bg-emerald-50",
  decrease: "text-rose-600 bg-rose-50",
  neutral: "text-gray-500 bg-gray-50"
}, br = {
  increase: "↑",
  decrease: "↓",
  neutral: "→"
};
function Rr({
  title: e,
  value: r,
  delta: t,
  deltaType: o = "neutral",
  icon: a,
  variant: n = "crisp",
  loading: l = !1,
  className: i
}) {
  const p = mr[n];
  return /* @__PURE__ */ s("div", { className: k("bg-white rounded-2xl border p-5 shadow-sm", p.bg, i), children: /* @__PURE__ */ f("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ f("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ s("p", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2", children: e }),
      l ? /* @__PURE__ */ s(G, { variant: "line", className: "w-28 h-8 mb-1" }) : /* @__PURE__ */ s("p", { className: "text-2xl font-bold text-gray-900 tabular-nums", children: r }),
      l ? /* @__PURE__ */ s(G, { variant: "line", className: "w-16 h-4 mt-2" }) : t !== void 0 && /* @__PURE__ */ f("span", { className: k("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full mt-1.5", gr[o]), children: [
        /* @__PURE__ */ s("span", { children: br[o] }),
        t
      ] })
    ] }),
    a && /* @__PURE__ */ s("div", { className: k("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", p.icon), children: a })
  ] }) });
}
function jr({
  data: e,
  columns: r,
  rowKey: t,
  pageSize: o = 10,
  onRowClick: a,
  loading: n = !1,
  emptyMessage: l = "No data available",
  className: i
}) {
  const [p, g] = I(null), [h, d] = I("asc"), [v, b] = I(1), w = Q(() => p ? [...e].sort((m, N) => {
    const S = m[p], M = N[p], E = String(S).localeCompare(String(M), void 0, { numeric: !0 });
    return h === "asc" ? E : -E;
  }) : e, [e, p, h]), c = Math.max(1, Math.ceil(w.length / o)), u = Math.min(v, c), x = w.slice((u - 1) * o, u * o), z = (m) => {
    m.sortable && (p === m.key ? d((N) => N === "asc" ? "desc" : "asc") : (g(m.key), d("asc")), b(1));
  }, R = (m) => m === "center" ? "text-center" : m === "right" ? "text-right" : "text-left";
  return /* @__PURE__ */ f("div", { className: k("bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", i), children: [
    /* @__PURE__ */ s("div", { className: "overflow-x-auto", children: /* @__PURE__ */ f("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ s("tr", { className: "border-b border-gray-100 bg-gray-50", children: r.map((m) => /* @__PURE__ */ s(
        "th",
        {
          className: k(
            "px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide",
            R(m.align),
            m.sortable && "cursor-pointer select-none hover:text-gray-600 transition-colors"
          ),
          style: m.width ? { width: m.width } : void 0,
          onClick: () => z(m),
          children: /* @__PURE__ */ f("span", { className: "inline-flex items-center gap-1", children: [
            m.header,
            m.sortable && /* @__PURE__ */ s("span", { className: "text-gray-300", children: p === m.key ? h === "asc" ? " ↑" : " ↓" : " ↕" })
          ] })
        },
        String(m.key)
      )) }) }),
      /* @__PURE__ */ s("tbody", { children: n ? Array.from({ length: o }).map((m, N) => /* @__PURE__ */ s("tr", { className: "border-b border-gray-50", children: r.map((S) => /* @__PURE__ */ s("td", { className: "px-4 py-3", children: /* @__PURE__ */ s(G, { variant: "line", className: "h-4 w-full" }) }, String(S.key))) }, N)) : x.length === 0 ? /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", { colSpan: r.length, className: "px-4 py-12 text-center text-sm text-gray-400", children: l }) }) : x.map((m) => /* @__PURE__ */ s(
        "tr",
        {
          className: k(
            "border-b border-gray-50 transition-colors",
            a && "cursor-pointer hover:bg-crisp-50"
          ),
          onClick: () => a == null ? void 0 : a(m),
          children: r.map((N) => /* @__PURE__ */ s(
            "td",
            {
              className: k("px-4 py-3 text-gray-700", R(N.align)),
              children: N.render ? N.render(m[N.key], m) : String(m[N.key] ?? "")
            },
            String(N.key)
          ))
        },
        String(m[t])
      )) })
    ] }) }),
    !n && c > 1 && /* @__PURE__ */ f("div", { className: "flex items-center justify-between px-4 py-3 border-t border-gray-100", children: [
      /* @__PURE__ */ f("span", { className: "text-xs text-gray-400", children: [
        (u - 1) * o + 1,
        "–",
        Math.min(u * o, w.length),
        " of ",
        w.length
      ] }),
      /* @__PURE__ */ f("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ s(
          "button",
          {
            onClick: () => b((m) => Math.max(1, m - 1)),
            disabled: u === 1,
            className: "px-2.5 py-1 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
            children: "← Prev"
          }
        ),
        Array.from({ length: Math.min(5, c) }, (m, N) => {
          const M = Math.max(1, Math.min(u - 2, c - 4)) + N;
          return /* @__PURE__ */ s(
            "button",
            {
              onClick: () => b(M),
              className: k(
                "w-7 h-7 rounded-lg text-xs font-medium transition-colors",
                M === u ? "bg-crisp-500 text-white" : "text-gray-500 hover:bg-gray-100"
              ),
              children: M
            },
            M
          );
        }),
        /* @__PURE__ */ s(
          "button",
          {
            onClick: () => b((m) => Math.min(c, m + 1)),
            disabled: u === c,
            className: "px-2.5 py-1 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
            children: "Next →"
          }
        )
      ] })
    ] })
  ] });
}
function fr(e) {
  return 1 - Math.pow(1 - e, 3);
}
function Lr({
  from: e = 0,
  to: r,
  duration: t = 1200,
  format: o,
  prefix: a = "",
  suffix: n = "",
  className: l
}) {
  const [i, p] = I(e), g = W(null), h = W(null);
  H(() => {
    const v = e;
    g.current = null;
    const b = (w) => {
      g.current === null && (g.current = w);
      const c = w - g.current, u = Math.min(c / t, 1), x = fr(u);
      p(v + (r - v) * x), u < 1 && (h.current = requestAnimationFrame(b));
    };
    return h.current = requestAnimationFrame(b), () => {
      h.current !== null && cancelAnimationFrame(h.current);
    };
  }, [e, r, t]);
  const d = o ? o(i) : Math.round(i).toLocaleString();
  return /* @__PURE__ */ f("span", { className: k("tabular-nums", l), children: [
    a,
    d,
    n
  ] });
}
const hr = {
  fade: "opacity-0",
  slideUp: "opacity-0 translate-y-3",
  slideLeft: "opacity-0 translate-x-3"
}, xr = {
  fade: "opacity-100",
  slideUp: "opacity-100 translate-y-0",
  slideLeft: "opacity-100 translate-x-0"
};
function Tr({
  children: e,
  variant: r = "fade",
  duration: t = 300,
  className: o
}) {
  const [a, n] = I(!1), l = W(null);
  return H(() => (n(!1), l.current = requestAnimationFrame(() => {
    l.current = requestAnimationFrame(() => {
      n(!0);
    });
  }), () => {
    l.current !== null && cancelAnimationFrame(l.current);
  }), []), /* @__PURE__ */ s(
    "div",
    {
      className: k(
        "transform transition-all",
        a ? xr[r] : hr[r],
        o
      ),
      style: { transitionDuration: `${t}ms` },
      children: e
    }
  );
}
const yr = {
  sm: "h-8 text-xs px-3",
  md: "h-10 text-sm px-3.5",
  lg: "h-12 text-base px-4"
}, vr = {
  outline: "border border-gray-200 rounded-xl bg-white focus:border-crisp-500 focus:ring-2 focus:ring-crisp-100",
  filled: "border border-transparent rounded-xl bg-gray-100 focus:bg-white focus:border-crisp-500 focus:ring-2 focus:ring-crisp-100",
  flushed: "border-b border-gray-200 rounded-none bg-transparent focus:border-crisp-500"
}, wr = we(
  ({
    label: e,
    error: r,
    hint: t,
    leftAddon: o,
    rightAddon: a,
    inputSize: n = "md",
    variant: l = "outline",
    wrapperClassName: i,
    className: p,
    id: g,
    ...h
  }, d) => {
    const v = ke(), b = g ?? v;
    return /* @__PURE__ */ f("div", { className: k("flex flex-col gap-1.5", i), children: [
      e && /* @__PURE__ */ f("label", { htmlFor: b, className: "text-sm font-medium text-gray-700", children: [
        e,
        h.required && /* @__PURE__ */ s("span", { className: "text-rose-500 ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ f("div", { className: "relative flex items-center", children: [
        o && /* @__PURE__ */ s("div", { className: "absolute left-3 flex items-center text-gray-400 pointer-events-none", children: o }),
        /* @__PURE__ */ s(
          "input",
          {
            ref: d,
            id: b,
            "aria-invalid": !!r,
            "aria-describedby": r ? `${b}-error` : t ? `${b}-hint` : void 0,
            className: k(
              "w-full outline-none transition-all duration-150 placeholder:text-gray-300 text-gray-800",
              yr[n],
              vr[l],
              r && "border-rose-400 focus:border-rose-400 focus:ring-rose-100",
              o && "pl-9",
              a && "pr-9",
              h.disabled && "opacity-50 cursor-not-allowed",
              p
            ),
            ...h
          }
        ),
        a && /* @__PURE__ */ s("div", { className: "absolute right-3 flex items-center text-gray-400", children: a })
      ] }),
      r && /* @__PURE__ */ f("p", { id: `${b}-error`, className: "text-xs text-rose-500 flex items-center gap-1", children: [
        /* @__PURE__ */ s("svg", { className: "w-3.5 h-3.5", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ s("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }),
        r
      ] }),
      !r && t && /* @__PURE__ */ s("p", { id: `${b}-hint`, className: "text-xs text-gray-400", children: t })
    ] });
  }
);
wr.displayName = "Input";
const ve = Se(null);
function _r() {
  const e = Ne(ve);
  if (!e) throw new Error("useFormStepContext must be used within MultiStepForm");
  return e;
}
function kr({
  steps: e,
  currentStep: r,
  visitedSteps: t,
  allowBack: o,
  goTo: a
}) {
  return /* @__PURE__ */ s("div", { className: "flex items-center gap-0", children: e.map((n, l) => {
    const i = t.has(l) && l < r, p = l === r, g = o && t.has(l);
    return /* @__PURE__ */ f("div", { className: "flex items-center flex-1 last:flex-none", children: [
      /* @__PURE__ */ s(
        "button",
        {
          onClick: () => g && a(l),
          disabled: !g,
          className: k(
            "flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all flex-shrink-0",
            i ? "bg-crisp-500 text-white cursor-pointer hover:bg-crisp-600" : p ? "bg-crisp-600 text-white ring-4 ring-crisp-100" : "bg-gray-100 text-gray-400",
            g && !p && "cursor-pointer"
          ),
          "aria-label": `Go to step ${l + 1}: ${n.title}`,
          children: i ? /* @__PURE__ */ s("svg", { className: "w-4 h-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3, children: /* @__PURE__ */ s("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }) : l + 1
        }
      ),
      l < e.length - 1 && /* @__PURE__ */ s("div", { className: k("flex-1 h-0.5 mx-1 transition-colors", l < r ? "bg-crisp-400" : "bg-gray-200") })
    ] }, n.id);
  }) });
}
function Gr({
  steps: e,
  onComplete: r,
  onStepChange: t,
  allowBackNavigation: o = !0,
  className: a
}) {
  const [n, l] = I(0), [i, p] = I(/* @__PURE__ */ new Set([0])), [g, h] = I(!1), d = (u) => {
    l(u), p((x) => /* @__PURE__ */ new Set([...x, u])), t == null || t(u);
  }, v = async () => {
    const u = e[n];
    if (u.validate) {
      h(!0);
      const x = await u.validate();
      if (h(!1), !x) return;
    }
    n < e.length - 1 ? d(n + 1) : r == null || r();
  }, b = () => {
    n > 0 && d(n - 1);
  }, w = {
    currentStep: n,
    totalSteps: e.length,
    next: v,
    back: b,
    goTo: d,
    visitedSteps: i
  }, c = e[n];
  return /* @__PURE__ */ s(ve.Provider, { value: w, children: /* @__PURE__ */ f("div", { className: k("bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", a), children: [
    /* @__PURE__ */ f("div", { className: "px-6 pt-6 pb-4 border-b border-gray-100", children: [
      /* @__PURE__ */ s(
        kr,
        {
          steps: e,
          currentStep: n,
          visitedSteps: i,
          allowBack: o,
          goTo: d
        }
      ),
      /* @__PURE__ */ f("div", { className: "mt-4", children: [
        /* @__PURE__ */ s("h3", { className: "text-base font-semibold text-gray-800", children: c.title }),
        c.description && /* @__PURE__ */ s("p", { className: "text-sm text-gray-400 mt-0.5", children: c.description })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "px-6 py-5", children: /* @__PURE__ */ s(Nr, { children: c.content }, c.id) }),
    /* @__PURE__ */ f("div", { className: "px-6 pb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ s(
        "button",
        {
          onClick: b,
          disabled: n === 0,
          className: "px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
          children: "← Back"
        }
      ),
      /* @__PURE__ */ f("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ f("span", { className: "text-xs text-gray-400", children: [
          n + 1,
          " of ",
          e.length
        ] }),
        /* @__PURE__ */ s(
          "button",
          {
            onClick: v,
            disabled: g,
            className: "px-5 py-2 bg-crisp-600 hover:bg-crisp-700 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-70 shadow-sm",
            children: g ? "Validating…" : n === e.length - 1 ? "Complete" : "Continue →"
          }
        )
      ] })
    ] })
  ] }) });
}
function Nr({ children: e }) {
  return /* @__PURE__ */ s("div", { className: "animate-[fadeIn_250ms_ease-out_forwards]", children: e });
}
export {
  Lr as AnimatedCounter,
  jr as DataTable,
  Mr as HabitTracker,
  wr as Input,
  zr as KanbanBoard,
  Gr as MultiStepForm,
  Tr as PageTransition,
  Ar as PomodoroTimer,
  G as Skeleton,
  pr as SkeletonAvatar,
  Ir as SkeletonCard,
  ur as SkeletonText,
  Rr as StatCard,
  k as cn,
  _r as useFormStepContext,
  nr as useInterval,
  ye as useLocalStorage
};
//# sourceMappingURL=index.js.map
