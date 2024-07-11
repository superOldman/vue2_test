(this.webpackJsonp = this.webpackJsonp || []).push([[278], {
  2202: function(t, e, n) {},
  2249: function(t, e, n) {
      "use strict";
      n(66);
      var r = {
          props: {
              ratio: {
                  type: Number,
                  default: 0
              }
          },
          data: function() {
              return {
                  timer: null,
                  show: !1
              }
          },
          methods: {
              parseRatio: function(t) {
                  return parseInt(100 * t) + "%"
              }
          },
          watch: {
              ratio: function(t) {
                  var e = this;
                  this.show = !0,
                  this.$store.commit("qiye/SET_ZOOM_SHOW", !0),
                  this.timer && clearTimeout(this.timer),
                  this.timer = setTimeout((function() {
                      e.$store.commit("qiye/SET_ZOOM_SHOW", !1),
                      e.show = !1
                  }
                  ), 1e3)
              }
          }
      }
        , i = (n(2299),
      n(6))
        , a = Object(i.a)(r, (function() {
          var t = this
            , e = t.$createElement
            , n = t._self._c || e;
          return t.show ? n("div", {
              staticClass: "zoom-popup"
          }, [n("p", {
              staticClass: "zoom-popup-text"
          }, [t._v(t._s(t.parseRatio(t.ratio)))])]) : t._e()
      }
      ), [], !1, null, "a54bea9e", null);
      e.a = a.exports
  },
  2299: function(t, e, n) {
      "use strict";
      n(2202)
  },
  4569: function(t, e, n) {},
  4570: function(t, e, n) {},
  6835: function(t, e, n) {
      "use strict";
      n(4569)
  },
  6836: function(t, e, n) {
      "use strict";
      n(4570)
  },
  7275: function(t, e, n) {
      "use strict";
      n.r(e);
      n(24),
      n(14),
      n(17),
      n(23),
      n(21);
      var r, i = n(60), a = n(1), o = n(4), c = (n(32),
      n(15),
      n(19),
      n(85),
      n(86),
      n(45),
      n(33),
      n(1629)), d = n(16), s = n(2427), u = n(2249), l = n(2382), h = n(2141), f = n(61), p = n(22);
      n(69);
      function x(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(t);
              e && (r = r.filter((function(e) {
                  return Object.getOwnPropertyDescriptor(t, e).enumerable
              }
              ))),
              n.push.apply(n, r)
          }
          return n
      }
      function g(t) {
          for (var e = 1; e < arguments.length; e++) {
              var n = null != arguments[e] ? arguments[e] : {};
              e % 2 ? x(Object(n), !0).forEach((function(e) {
                  Object(o.a)(t, e, n[e])
              }
              )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : x(Object(n)).forEach((function(e) {
                  Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
              }
              ))
          }
          return t
      }
      var m = {
          mounted: function() {
              var t = this;
              this.SET_LOADSTATE("loading"),
              this.queryPolymerization(),
              window.$nuxt.$on("company-diagram-relation-refresh", (function() {
                  location.reload()
              }
              )),
              window.$nuxt.$on("company-diagram-relation-zoom-up", (function() {
                  t.handleScale("up")
              }
              )),
              window.$nuxt.$on("company-diagram-relation-zoom-down", (function() {
                  t.handleScale("down")
              }
              )),
              window.$nuxt.$on("company-diagram-relation-export", this.handleDownLoad),
              window.addEventListener("resize", (function() {
                  t.stateInfo || (t.timer && clearTimeout(t.timer),
                  t.timer = setTimeout((function() {
                      var t = document.body.clientWidth
                        , e = document.body.clientHeight;
                      r.select(".stock-rpt #svg svg").attr("width", t).attr("height", e)
                  }
                  ), 300))
              }
              ))
          },
          beforeDestroy: function() {
              this.SET_LOADSTATE(""),
              window.$nuxt.$off("company-diagram-relation-export", this.handleDownLoad)
          },
          components: {
              DiagramPopup: s.a,
              ZoomPopup: u.a,
              SideBar: l.a
          },
          data: function() {
              return {
                  container: "",
                  fontSize: 12,
                  nodeSize: [180, 160],
                  centerPoint: [0, 0],
                  scaleRange: [.1, 3],
                  duration: 300,
                  initscale: 1,
                  directions: ["up", "down"],
                  root: {
                      up: {},
                      down: {}
                  },
                  textPadding: 8,
                  rootNodeLength: 0,
                  rootNodeHeight: 40,
                  textNodeWidth: 156,
                  textNodeHeight: 52,
                  textNodePadding: 8,
                  subTextWidth: 44,
                  subTextHeight: 18,
                  circleRadius: 6,
                  visibility: "hidden",
                  mockData: {},
                  loading: !1,
                  d3Zoom: null,
                  editActive: !1,
                  loadTimer: null,
                  timer: null,
                  ratio: 0,
                  nodeClick: !1,
                  visibleList: [h.c.edit.id, h.c.plus.id, h.c.minus.id, h.c.refresh.id, h.c.fullscreen.id, h.c.download.id]
              }
          },
          computed: g(g({}, Object(p.mapGetters)({
              stateInfo: "qiye/stateInfo"
          })), {}, {
              treeData: function() {
                  return this.mockData
              },
              treeMap: function() {
                  return r.tree().nodeSize(this.nodeSize).separation((function(t, e) {
                      var n = t.parent === e.parent ? 1 : 2;
                      if (n > 1) {
                          var r = 0;
                          r = t.children ? r + t.children.length : r,
                          n = (r = e.children ? r + e.children.length : r) / 2 + 1
                      }
                      return n
                  }
                  ))
              }
          }),
          methods: g(g({}, Object(p.mapMutations)("qiye", ["SET_LOADSTATE"])), {}, {
              handleEdit: function() {
                  this.editActive = !this.editActive,
                  this.visibility = this.editActive ? "visible" : "hidden",
                  r.selectAll(".circle-remove").attr("visibility", this.visibility)
              },
              handleScale: function(t) {
                  r.select("#svg svg").transition().call(this.d3Zoom.scaleBy, "up" === t ? 1.1 : .9)
              },
              handleDownLoad: function() {
                  var t = document.querySelector(".stock-rpt #svg svg")
                    , e = "".concat(this.treeData.name, "-股权穿透图");
                  Object(f.e)(t, e)
              },
              handleCenterNode: function(t) {
                  this.nodeClick = !0,
                  r.select("#svg svg").transition().call(this.d3Zoom.translateTo, t.x0, t.y0)
              },
              handleReload: function() {
                  location.reload()
              },
              queryPolymerization: function() {
                  var t = this;
                  return Object(a.a)(regeneratorRuntime.mark((function e() {
                      var n, r, i, a;
                      return regeneratorRuntime.wrap((function(e) {
                          for (; ; )
                              switch (e.prev = e.next) {
                              case 0:
                                  return n = {
                                      name: t.$route.query.name,
                                      _id: t.$route.query.id
                                  },
                                  e.next = 3,
                                  t.$axios(Object(d.Ic)(n));
                              case 3:
                                  if (r = e.sent,
                                  i = r.success,
                                  a = r.data,
                                  i) {
                                      e.next = 8;
                                      break
                                  }
                                  return e.abrupt("return", t.SET_LOADSTATE("failed"));
                              case 8:
                                  if (a.children.length) {
                                      e.next = 10;
                                      break
                                  }
                                  return e.abrupt("return", t.SET_LOADSTATE("empty"));
                              case 10:
                                  t.mockData = a,
                                  t.SET_LOADSTATE(""),
                                  t.mockData.up = a.children.filter((function(t) {
                                      return "up" === t.code
                                  }
                                  ))[0] || [],
                                  t.mockData.down = a.children.filter((function(t) {
                                      return "down" === t.code
                                  }
                                  ))[0] || [],
                                  t.changeSourceData(t.mockData.up),
                                  t.changeSourceData(t.mockData.down),
                                  t.initD3();
                              case 17:
                              case "end":
                                  return e.stop()
                              }
                      }
                      ), e)
                  }
                  )))()
              },
              initD3: function() {
                  var t = this;
                  return Object(a.a)(regeneratorRuntime.mark((function e() {
                      return regeneratorRuntime.wrap((function(e) {
                          for (; ; )
                              switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2,
                                  Object(c.a)();
                              case 2:
                                  r = e.sent,
                                  t.initSvg();
                              case 4:
                              case "end":
                                  return e.stop()
                              }
                      }
                      ), e)
                  }
                  )))()
              },
              uuid: function() {
                  function t() {
                      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                  }
                  return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
              },
              initSvg: function() {
                  var t = 0
                    , e = 0
                    , n = 0
                    , i = 0
                    , a = document.body.clientWidth - i - e
                    , o = document.body.clientHeight - t - n
                    , c = a / 2 + i
                    , d = o / 2 + t;
                  this.centerPoint = [c, d];
                  var s = r.select("#svg").append("svg").attr("width", a).attr("id", "stock-rpt-svg").attr("height", o).style("user-select", "none").style("color", "#292A2D").attr("font-size", this.fontSize);
                  this.container = s.append("g").attr("id", "container").attr("transform", "translate(".concat(i, ",").concat(t, ") scale(1)")),
                  this.drawRoot();
                  var u = r.zoom().scaleExtent(this.scaleRange).on("zoom", this.zoomFn);
                  this.d3Zoom = u,
                  s.call(u),
                  this.dealData()
              },
              zoomFn: function(t) {
                  this.nodeClick || (this.ratio = t.transform.k),
                  this.container.attr("transform", t.transform)
              },
              drawRoot: function() {
                  var t = this
                    , e = this.treeData.name
                    , n = e.length * this.fontSize + 24
                    , r = {
                      data: this.treeData,
                      id: "rootTitle"
                  }
                    , i = function(e) {
                      if (document.getElementById(r.id)) {
                          var n = document.getElementById(r.id).getBoundingClientRect()
                            , i = {
                              popupType: 2 === r.data.type ? "company" : "man",
                              status: e,
                              companyId: r.data._id,
                              manData: r.data,
                              position: n
                          };
                          t.$refs.diagramPopup.popupShow(i)
                      }
                  };
                  this.rootNodeHeight = 40,
                  this.rootNodeLength = n;
                  var a = this.container.append("g").attr("id", "rootTitle").attr("transform", "translate(".concat(this.centerPoint[0], ",").concat(this.centerPoint[1], ")")).attr("cursor", "pointer").on("click", (function() {
                      t.toDetail(r)
                  }
                  )).on("mouseover", (function() {
                      i(!0)
                  }
                  )).on("mouseout", (function() {
                      i(!1)
                  }
                  ));
                  a.append("rect").attr("x", -n / 2).attr("y", -24).attr("rx", 3).attr("width", n).attr("height", this.rootNodeHeight).attr("fill", "#3981F4"),
                  a.append("text").attr("text-anchor", "middle").attr("fill", "#fff").text(e)
              },
              dealData: function() {
                  var t = this;
                  this.directions.forEach((function(e) {
                      t.root[e] = r.hierarchy(t.treeData[e]),
                      t.root[e].x0 = t.centerPoint[0],
                      t.root[e].y0 = t.centerPoint[1],
                      t.root[e].descendants().forEach((function(n) {
                          n.id = e + t.uuid(),
                          n._children = n.children,
                          n.depth >= 1 && (n.children = null)
                      }
                      )),
                      t.update(t.root[e], e)
                  }
                  ))
              },
              update: function(t, e) {
                  var n = this
                    , r = "up" === e ? -1 : 1
                    , i = "".concat(e, "gNode")
                    , a = this.treeMap(this.root[e])
                    , o = a.descendants()
                    , c = a.links();
                  o.forEach((function(t) {
                      if (!t.depth && r > 0)
                          return t.x = t.x + n.centerPoint[0],
                          void (t.y = r * t.y + n.centerPoint[1] - n.textNodeHeight / 2);
                      t.x = t.x + n.centerPoint[0],
                      t.y = r * t.y + n.centerPoint[1]
                  }
                  ));
                  var d = this.container.selectAll("g.".concat(i)).data(o, (function(t) {
                      return "".concat(t.id)
                  }
                  ))
                    , s = d.enter().append("g").attr("id", (function(t) {
                      return "g".concat(t.id)
                  }
                  )).attr("class", i).attr("transform", (function(e) {
                      return "translate(".concat(t.x0, ",").concat(t.y0, ")")
                  }
                  )).attr("fill-opacity", 0).attr("stroke-opacity", 0).style("cursor", "pointer").on("mouseenter", (function(t, e) {
                      -1 !== (null == e ? void 0 : e.data.type) && n.mouseovered(!0, e, r)
                  }
                  )).on("mouseleave", (function(t, e) {
                      -1 !== (null == e ? void 0 : e.data.type) && n.mouseovered(!1, e, r)
                  }
                  )).on("click", (function(t, r) {
                      t.stopPropagation(),
                      -1 === (null == r ? void 0 : r.data.type) ? n.addNodeByClick(r, e) : n.handleCenterNode(r)
                  }
                  ));
                  s.each((function(t) {
                      0 !== t.depth && (t.data.name.length <= 11 ? n.drawText("g".concat(t.id), r, t) : n.drawTextMultiline("g".concat(t.id), r),
                      n.drawRect("g".concat(t.id), r, e),
                      t.data.headLabel && n.drawPopup("g".concat(t.id), r));
                      var i = {
                          id: "g".concat(t.id),
                          dirTop: r,
                          x: function() {
                              return n.textNodeWidth / 3 - 6
                          },
                          y: function() {
                              return -n.textNodeHeight / 2 + 1
                          },
                          key: "cornerLabel",
                          offsetX: function() {
                              return n.textNodeWidth / 3 - n.subTextWidth / 2 - 6
                          },
                          offsetY: function() {
                              return -n.textNodeHeight / 2 - n.fontSize
                          },
                          rectColor: n.getStatusColor(t.data).rectColor,
                          textColor: n.getStatusColor(t.data).textColor
                      };
                      t.data.lineText && t.data.lineText.stockPercent && n.drawLineText("g".concat(t.id), e, t),
                      t.data.cornerLabel && n.drawTextWidthRect(i),
                      t.depth && t.data.hasNext && n.drawCircle("g".concat(t.id), e),
                      t.depth && n.drawTriangle("g".concat(t.id), r)
                  }
                  )),
                  d.merge(s).transition().duration(this.duration).attr("transform", (function(t) {
                      return "translate(".concat(t.x, ",").concat(t.y, ")")
                  }
                  )).attr("fill-opacity", 1).attr("stroke-opacity", 1),
                  d.exit().transition().duration(this.duration).attr("transform", (function(e) {
                      return "translate(".concat(t.x, ",").concat(t.y, ")")
                  }
                  )).attr("fill", 0).attr("stroke-opacity", 0).remove();
                  var u = this.container.selectAll("path.".concat(i)).data(c, (function(t) {
                      return t.target.id
                  }
                  ))
                    , l = u.enter().insert("path", "g").each((function(t) {
                      t.target.linkNode = this
                  }
                  )).attr("class", i).attr("d", (function(e) {
                      var i = {
                          x: t.x0,
                          y: t.y0,
                          depth: e.source.depth
                      };
                      return n.diagonal({
                          source: i,
                          target: i
                      }, r)
                  }
                  )).attr("fill", "none").attr("stroke-width", 1).attr("stroke", "#AFB1B7");
                  u.merge(l).transition().duration(this.duration).attr("d", (function(t) {
                      return n.diagonal(t, r)
                  }
                  )),
                  u.exit().transition().duration(this.duration).remove().attr("d", (function(e) {
                      var i = {
                          x: t.x,
                          y: t.y,
                          depth: e.depth
                      };
                      return n.diagonal({
                          source: i,
                          target: i,
                          depth: e.source.depth
                      }, r)
                  }
                  )),
                  this.root[e].eachBefore((function(t) {
                      t.x0 = t.x,
                      t.y0 = t.y
                  }
                  ))
              },
              drawText: function(t, e, n) {
                  var i, a = this;
                  if (e = e > 0,
                  -1 === n.data.type && null !== (i = n.parent) && void 0 !== i && i.data.sourceChild) {
                      var o = r.select("#".concat(t));
                      o.append("text").attr("x", 0).attr("y", (function(t) {
                          return -a.textNodePadding - 4
                      }
                      )).attr("fill", "#8793A5").attr("text-anchor", "middle").style("font-size", 12).text((function(t) {
                          var n;
                          return "共".concat(null === (n = t.parent) || void 0 === n ? void 0 : n.data.sourceChild.length).concat(e ? "家控股企业" : "个股东")
                      }
                      )),
                      o.append("text").attr("x", 0).attr("y", (function(t) {
                          return a.textNodePadding
                      }
                      )).attr("fill", "#3981F4").attr("text-anchor", "middle").style("font-size", 14).style("font-weight", 500).text((function(t) {
                          var n;
                          return "展开其他".concat((null === (n = t.parent) || void 0 === n ? void 0 : n.data.sourceChild.length) - 10).concat(e ? "家" : "个", " >")
                      }
                      ))
                  }
                  return r.select("#".concat(t)).append("text").attr("x", 0).attr("y", 0).attr("text-anchor", "middle").style("font-size", this.fontSize).text((function(t) {
                      return t.data.name
                  }
                  )).on("mouseover", this.rectMo(!0)).on("mouseout", this.rectMo(!1))
              },
              drawTextMultiline: function(t, e) {
                  var n = this;
                  e = e > 0;
                  var i = r.select("#".concat(t));
                  i.append("text").attr("x", 0).attr("y", (function(t) {
                      return -n.textNodePadding
                  }
                  )).attr("text-anchor", "middle").style("font-size", this.fontSize).text((function(t) {
                      return t.data.name.substr(0, 11)
                  }
                  )).on("mouseover", this.rectMo(!0)).on("mouseout", this.rectMo(!1)),
                  i.append("text").attr("x", 0).attr("y", (function(t) {
                      return n.textNodePadding
                  }
                  )).attr("text-anchor", "middle").style("font-size", this.fontSize).text((function(t) {
                      var e = t.data.name.substr(11);
                      return e.length > 11 ? e.substr(0, 9) + "..." : e.substr(0)
                  }
                  )).on("mouseover", this.rectMo(!0)).on("mouseout", this.rectMo(!1))
              },
              drawSubText: function(t, e) {
                  var n = this;
                  e = e > 0;
                  var i = r.select("#".concat(t));
                  i.append("text").attr("x", 0).attr("y", (function(t) {
                      return e > 0 ? t.parent && t.parent.children.length > 1 ? -n.textNodeHeight - n.fontSize / 2 : (-n.nodeSize[1] - n.fontSize) / 2 : t.parent && t.parent.children.length > 1 ? n.textNodeHeight - n.fontSize / 2 : (n.nodeSize[1] - n.fontSize) / 2
                  }
                  )).attr("text-anchor", "middle").style("font-size", this.fontSize).text((function(t) {
                      return t.data.ratio
                  }
                  )),
                  i.insert("rect", "text").attr("x", -this.subTextWidth / 2).attr("y", (function(t) {
                      return e > 0 ? t.parent && t.parent.children.length > 1 ? -n.textNodeHeight - n.subTextHeight - n.fontSize / 8 : -n.nodeSize[1] / 2 - n.subTextHeight - n.fontSize / 8 : t.parent && t.parent.children.length > 1 ? n.textNodeHeight / 2 + n.fontSize / 2 : n.textNodeHeight - n.fontSize / 8
                  }
                  )).attr("height", (function(t) {
                      return t.data.ratio && n.subTextHeight
                  }
                  )).attr("width", (function(t) {
                      return t.data.ratio && n.subTextWidth
                  }
                  )).attr("rx", 2).attr("stroke", "#000").attr("fill", "#e2e9f7")
              },
              drawTag: function(t, e) {
                  var n = this;
                  e = e > 0;
                  var i = r.select("#".concat(t));
                  i.append("text").attr("x", this.textNodeWidth / 3).attr("y", (function(t) {
                      return -n.textNodeHeight / 2
                  }
                  )).attr("text-anchor", "middle").style("font-size", this.fontSize).text((function(t) {
                      return t.data.status
                  }
                  )),
                  i.insert("rect", "text").attr("x", this.textNodeWidth / 3 - this.subTextWidth / 2).attr("y", (function(t) {
                      return -n.textNodeHeight / 2 - n.fontSize
                  }
                  )).attr("height", (function(t) {
                      return t.data.status && n.subTextHeight
                  }
                  )).attr("width", (function(t) {
                      return t.data.status && n.subTextWidth
                  }
                  )).attr("rx", 2).attr("stroke", "#000").attr("fill", "#e2e9f7")
              },
              diagonal: function(t, e) {
                  var n, r, i = t.source, a = t.target;
                  return e > 0 && (n = i.y + this.textNodeHeight / 2 + this.circleRadius + 4,
                  r = a.y - this.textNodeHeight / 2 - this.fontSize / 2 - 8),
                  e < 0 && (n = i.y - this.textNodeHeight / 2 - this.fontSize / 2 - 2 * this.circleRadius - 2,
                  r = a.y + this.textNodeHeight / 2 - this.fontSize / 2),
                  a.depth <= 1 && (e > 0 && (n = i.y + this.textNodeHeight / 2 + this.textNodeHeight / 2 - this.fontSize + 2,
                  r = a.y - this.textNodeHeight / 2 - this.fontSize / 2),
                  e < 0 && (n = i.y - this.textNodeHeight / 2 + 2,
                  r = a.y + this.textNodeHeight / 2 - this.fontSize / 2)),
                  "M ".concat(i.x, " ").concat(n, "\n                    L ").concat(i.x, " ").concat((i.y + a.y) / 2, "\n                    L ").concat(a.x, " ").concat((i.y + a.y) / 2, "\n                    ").concat(a.x, " ").concat(r, " ")
              },
              drawRect: function(t, e, n) {
                  var i = this
                    , a = r.select("#".concat(t));
                  a.insert("rect", "text").attr("x", -this.textNodeWidth / 2).attr("y", (function(t) {
                      return -(i.textNodeHeight + i.fontSize) / 2
                  }
                  )).attr("height", this.textNodeHeight).attr("width", this.textNodeWidth).attr("id", (function(t) {
                      var e = "rect" + i.uuid();
                      return t.uuid = e,
                      e
                  }
                  )).on("mouseover", this.rectMo(!0)).on("mouseout", this.rectMo(!1)).attr("rx", 2).attr("stroke", (function(t) {
                      return -1 === t.data.type || 2 === t.data.type ? "#3981F4" : "#FF4B4B"
                  }
                  )).attr("fill", (function(t) {
                      return -1 === t.data.type ? "#E7EFFF" : "#ebeff7"
                  }
                  ));
                  var o = a.append("g").attr("class", "circle-remove").attr("transform", "translate(".concat(this.textNodeWidth / 2, ",").concat(-this.textNodeHeight / 2 - this.circleRadius, ") rotate(45)")).attr("visibility", this.visibility).style("cursor", "pointer").on("click", (function(t, e) {
                      t.stopPropagation(),
                      i.deleteNode(e, n)
                  }
                  ));
                  o.append("circle").attr("cx", 0).attr("cy", 0).attr("r", this.circleRadius).attr("fill", "#E85454"),
                  o.append("path").attr("d", "m 0 -4 l 0 ".concat(8)).attr("stroke-width", 1).attr("stroke", "#fff"),
                  o.append("path").attr("d", "m -4 0 l ".concat(8, " 0")).attr("stroke-width", 1).attr("stroke", "#fff")
              },
              drawPopup: function(t, e) {
                  var n = 36
                    , i = r.select("#".concat(t)).append("g").attr("class", "popup-text").attr("transform", "translate(0,".concat(-this.textNodeHeight - 4, ")")).attr("fill", (function(t) {
                      return t.data.isBeneficiaryShare ? "#1890ff" : "#ff3241"
                  }
                  ));
                  i.append("text").attr("x", 0).attr("y", 0).attr("text-anchor", "middle").attr("fill", "#fff").style("font-size", this.fontSize).text((function(t) {
                      return "".concat(t.data.headLabel, "：").concat(t.data.beneficiaryShare || "未披露")
                  }
                  ));
                  var a = document.querySelector("#".concat(t, ">.popup-text>text")).getBBox().width + 10;
                  i.insert("rect", "text").attr("rx", 2).attr("x", -a / 2).attr("y", -n / 2 - 4).attr("width", a).attr("height", n),
                  i.insert("path", "rect").attr("rx", 2).attr("d", "M 0 0 L -5 -10 L 5 -10").attr("transform", "translate(0,".concat(n / 2 + 4, ")"))
              },
              drawTriangle: function(t, e) {
                  var n = this;
                  r.select("#".concat(t)).append("g").attr("class", "node-triangle").attr("fill", "#3981f4").attr("transform", (function(t) {
                      if (!t.depth)
                          return "translate(0,".concat(-n.textNodeHeight / 2 + n.fontSize / 4, ")");
                      if (e > 0)
                          return "translate(0,".concat(-n.textNodeHeight / 2 - n.fontSize / 2, ")");
                      var r = n.nodeSize[1];
                      return t.parent && t.parent.children.length > 1 ? "translate(0,".concat(r / 2, ")") : 1 !== t.depth ? "translate(0,".concat(-e * r - n.textNodeHeight + n.circleRadius, ")") : "translate(0,".concat(-e * r - n.textNodeHeight / 2 + 3, ")")
                  }
                  )).append("path").attr("d", (function(t) {
                      return t.depth || e < 0 && t.children ? "M 0 0 L -5 -10  L 5 -10" : void 0
                  }
                  )).each((function(t) {
                      t.triangle = this
                  }
                  ))
              },
              drawCircle: function(t, e) {
                  var n = this
                    , i = "up" === e ? -1 : 1
                    , a = r.select("#".concat(t)).append("g").attr("class", "node-circle").attr("stroke", "#47494f").attr("stroke-width", 1).attr("transform", (function(t) {
                      return i > 0 ? "translate(0,".concat(n.textNodeHeight / 2 + 4, ")") : "translate(0,-".concat(n.textNodeHeight / 2 + 10 + 4, ")")
                  }
                  )).style("cursor", "pointer").on("click", (function(t, r) {
                      t.stopPropagation(),
                      n.clickNode(r, e),
                      n.handleCenterNode(r)
                  }
                  ));
                  return a.append("circle").attr("fill", "none").attr("r", (function(t) {
                      return 0 === t.depth ? 0 : n.circleRadius
                  }
                  )).attr("fill", "#ebeff7"),
                  a.append("path").attr("d", "m -5 0 l ".concat(10, " 0")),
                  a.append("path").attr("d", "m 0 -5 l 0 ".concat(10)).attr("stroke-width", (function(t) {
                      return t.children ? 0 : 1
                  }
                  )).attr("class", "node-circle-vertical"),
                  a
              },
              drawLineText: function(t, e, n) {
                  var i = this
                    , a = "up" === e ? -1 : 1
                    , o = r.select("#".concat(t)).append("g").attr("class", "line").each((function(t) {
                      t.lineText = this
                  }
                  ));
                  o.append("text").attr("class", "line-text").attr("text-anchor", "middle").attr("y", (function(t) {
                      return a > 0 ? t.depth <= 1 && t.parent && t.parent.children.length > 1 ? -i.textNodeHeight - i.fontSize / 2 : t.parent && t.parent.children.length > 1 ? -i.textNodeHeight : (-i.nodeSize[1] - i.fontSize) / 2 : t.parent && t.parent.children.length > 1 ? i.textNodeHeight - i.fontSize / 2 : i.nodeSize[1] / 2 - i.fontSize / 2
                  }
                  )).attr("fill", "#fff").style("font-size", this.fontSize).text((function(t) {
                      return t.data.lineText.stockPercent
                  }
                  ));
                  var c = document.querySelector("#".concat(t, ">.line>.line-text")).getBBox().width + 10;
                  o.insert("rect", "text").attr("height", (function(t) {
                      return i.subTextHeight
                  }
                  )).attr("width", (function(t) {
                      return c
                  }
                  )).attr("x", (function(t) {
                      return -c / 2
                  }
                  )).attr("y", (function(t) {
                      return a > 0 ? t.depth <= 1 && t.parent && t.parent.children.length > 1 ? -i.textNodeHeight - i.subTextHeight - i.fontSize / 8 : t.parent && t.parent.children.length > 1 ? -i.textNodeHeight - i.fontSize - i.fontSize / 8 : -i.nodeSize[1] / 2 - i.subTextHeight - i.fontSize / 8 : t.parent && t.parent.children.length > 1 ? i.textNodeHeight / 2 + i.fontSize / 2 : i.textNodeHeight - i.fontSize / 8 + i.fontSize - 2
                  }
                  )).attr("rx", 2).attr("stroke", (function(t) {
                      return 2 === t.data.type ? "#3981F4" : "#FF4B4B"
                  }
                  )).attr("fill", (function(t) {
                      return 2 === t.data.type ? "#3981F4" : "#FF4B4B"
                  }
                  )),
                  n.data.lineText && n.data.lineText.desc && this.drawDesc(o, a, c)
              },
              drawDesc: function(t, e, n) {
                  var r = this
                    , i = t.append("g").attr("transform", "translate(".concat(-n - 4, ",0)"));
                  i.append("text").attr("class", "line-text").attr("text-anchor", "middle").attr("x", 0).attr("y", (function(t) {
                      return e > 0 ? t.depth <= 1 && t.parent && t.parent.children.length > 1 ? -r.textNodeHeight - r.fontSize / 2 : t.parent && t.parent.children.length > 1 ? -r.textNodeHeight : (-r.nodeSize[1] - r.fontSize) / 2 : t.parent && t.parent.children.length > 1 ? r.textNodeHeight - r.fontSize / 2 : (r.nodeSize[1] - r.fontSize) / 2
                  }
                  )).attr("fill", "#2C79F5").style("font-size", this.fontSize).text((function(t) {
                      return t.data.lineText.desc
                  }
                  )),
                  i.insert("rect", "text").attr("height", (function(t) {
                      return r.subTextHeight
                  }
                  )).attr("width", (function(t) {
                      return 32
                  }
                  )).attr("x", (function(t) {
                      return -16
                  }
                  )).attr("y", (function(t) {
                      return e > 0 ? t.depth <= 1 && t.parent && t.parent.children.length > 1 ? -r.textNodeHeight - r.subTextHeight - r.fontSize / 8 : t.parent && t.parent.children.length > 1 ? -r.textNodeHeight - r.fontSize - r.fontSize / 8 : -r.nodeSize[1] / 2 - r.subTextHeight - r.fontSize / 8 : t.parent && t.parent.children.length > 1 ? r.textNodeHeight / 2 + r.fontSize / 2 : r.textNodeHeight - r.fontSize / 8
                  }
                  )).attr("rx", 2).attr("stroke", "#D4E5FF").attr("fill", "#D4E5FF")
              },
              drawTextWidthRect: function(t) {
                  var e = this
                    , n = t.id
                    , i = t.x
                    , a = t.y
                    , o = t.key
                    , c = t.offsetX
                    , d = t.offsetY
                    , s = t.rectColor
                    , u = void 0 === s ? "#FF4B4B" : s
                    , l = t.textColor
                    , h = void 0 === l ? "#FFFFFF " : l
                    , f = r.select("#".concat(n)).each((function(t) {
                      t.lineText = this
                  }
                  ));
                  f.append("text").attr("x", (function(t) {
                      return i(t)
                  }
                  )).attr("y", (function(t) {
                      return a(t)
                  }
                  )).attr("text-anchor", "middle").attr("fill", h).style("font-size", this.fontSize).text((function(t) {
                      return "cornerLabel" === o ? t.data[o] : t.data.lineText[o]
                  }
                  )),
                  f.insert("rect", "text").attr("x", (function(t) {
                      return c(t)
                  }
                  )).attr("y", (function(t) {
                      return d(t)
                  }
                  )).attr("height", (function(t) {
                      return e.subTextHeight
                  }
                  )).attr("width", (function(t) {
                      return e.subTextWidth
                  }
                  )).attr("rx", 2).attr("stroke", u).attr("fill", u)
              },
              clickNode: function(t, e) {
                  var n = this;
                  return Object(a.a)(regeneratorRuntime.mark((function i() {
                      var a, o, c, s, u, l, h, f;
                      return regeneratorRuntime.wrap((function(i) {
                          for (; ; )
                              switch (i.prev = i.next) {
                              case 0:
                                  if (t.data.hasNext) {
                                      i.next = 2;
                                      break
                                  }
                                  return i.abrupt("return");
                              case 2:
                                  if (a = !1,
                                  t.children || t._children) {
                                      i.next = 25;
                                      break
                                  }
                                  return n.loading = !0,
                                  o = {
                                      name: t.data.name,
                                      _id: t.data._id,
                                      code: t.data.code,
                                      originalCompany: n.treeData.name,
                                      originalCompanyId: n.$route.query.id
                                  },
                                  i.next = 8,
                                  n.$axios(Object(d.n)(o));
                              case 8:
                                  if (c = i.sent,
                                  s = c.success,
                                  u = c.data,
                                  n.loading = !1,
                                  s) {
                                      i.next = 14;
                                      break
                                  }
                                  return i.abrupt("return");
                              case 14:
                                  if ((l = u.children.filter((function(e) {
                                      return e.code === t.data.code
                                  }
                                  ))).length) {
                                      i.next = 18;
                                      break
                                  }
                                  return r.select("#g".concat(t.id, " .node-circle")).attr("visibility", "hidden"),
                                  i.abrupt("return");
                              case 18:
                                  h = l[0].children.map((function(e) {
                                      return g(g({}, e), {}, {
                                          data: g({}, e),
                                          depth: t.depth + 1,
                                          parent: t,
                                          id: n.uuid()
                                      })
                                  }
                                  )),
                                  f = h.slice(0, 10),
                                  h.length > 10 && f.push({
                                      type: -1,
                                      name: "",
                                      depth: t.depth + 1,
                                      parent: t,
                                      id: n.uuid(),
                                      data: {
                                          type: -1,
                                          name: ""
                                      }
                                  }),
                                  t.data.sourceChild = l[0].children,
                                  t.children = f,
                                  t._children = f,
                                  a = !0;
                              case 25:
                                  !a && (t.children = t.children ? null : t._children),
                                  r.select("#g".concat(t.id, " .node-circle .node-circle-vertical")).transition().duration(n.duration).attr("stroke-width", (function(t) {
                                      return t.children ? 0 : 1
                                  }
                                  )),
                                  n.update(t, e),
                                  setTimeout((function() {
                                      n.nodeClick = !1
                                  }
                                  ), 500);
                              case 29:
                              case "end":
                                  return i.stop()
                              }
                      }
                      ), i)
                  }
                  )))()
              },
              toDetail: function(t) {
                  if (t.data._id) {
                      var e = "/company/".concat(t.data._id, ".html");
                      window.open(e, "_self")
                  }
              },
              mouseovered: function(t, e, n) {
                  var r = this;
                  t ? (this.nodeRaise(e, n),
                  e.children && e.children.forEach((function(t) {
                      r.nodeRaise(t, n)
                  }
                  ))) : (this.nodeLower(e, n),
                  e.children && e.children.forEach((function(t) {
                      r.nodeLower(t, n)
                  }
                  )))
              },
              rectMo: function(t) {
                  var e = this;
                  return function(n, r) {
                      if (-1 !== r.data.type && document.getElementById(r.uuid)) {
                          var i = document.getElementById(r.uuid).getBoundingClientRect()
                            , a = {
                              popupType: 2 === r.data.type ? "company" : "man",
                              status: t,
                              companyId: r.data._id,
                              manData: r.data,
                              position: i
                          };
                          e.$refs.diagramPopup.popupShow(a)
                      }
                  }
              },
              nodeRaise: function(t, e) {
                  var n = e > 0 ? "topToBottom" : "bottomToTop";
                  r.select(t.linkNode).attr("stroke", "#3981F4").attr("stroke-width", 1.5).classed(n, !0).raise(),
                  r.select("#g".concat(t.id)).raise()
              },
              nodeLower: function(t, e) {
                  var n = e > 0 ? "topToBottom" : "bottomToTop";
                  r.select(t.linkNode).attr("stroke", "#AFB1B7").attr("stroke-width", 1).classed(n, !1).lower()
              },
              deleteNode: function(t, e) {
                  var n = t.parent;
                  n && (1 === n.children.length ? (n.children = null,
                  n._children = null) : (n.children = n.children.filter((function(e) {
                      return e.id !== t.id
                  }
                  )) || null,
                  n._children = n._children.filter((function(e) {
                      return e.id !== t.id
                  }
                  )) || null)),
                  n.children || n._children || r.select("#g".concat(n.id, " .node-circle")).attr("visibility", "hidden"),
                  this.update(t, e)
              },
              getStatusColor: function(t) {
                  var e = "#000"
                    , n = "#e1e6f1";
                  switch (t.cornerLabel) {
                  case "注销":
                  case "吊销":
                      e = "#E36560",
                      n = "#FCECEC";
                      break;
                  case "存续":
                      e = "#22B459",
                      n = "#D3FFEB"
                  }
                  return {
                      textColor: e,
                      rectColor: n
                  }
              },
              changeSourceData: function(t) {
                  null != t && t.children && (t.sourceChild = JSON.parse(JSON.stringify(t.children)),
                  t.children = t.sourceChild.slice(0, 10),
                  t.sourceChild.length > 10 && t.children.push({
                      type: -1,
                      name: ""
                  }))
              },
              addNodeByClick: function(t, e) {
                  var n, a, o, c = this;
                  if ((null == t || null === (n = t.parent) || void 0 === n || null === (a = n.data) || void 0 === a || null === (o = a.sourceChild) || void 0 === o ? void 0 : o.length) > 10) {
                      var d = t.parent.data.sourceChild.map((function(e) {
                          return g(g({}, e), {}, {
                              data: g({}, e),
                              depth: t.depth,
                              parent: t.parent,
                              id: c.uuid()
                          })
                      }
                      ));
                      t.parent.children = [].concat(Object(i.a)(t.parent.children.slice(0, 10)), Object(i.a)(d.slice(10))),
                      t.parent._children = [].concat(Object(i.a)(t.parent._children.slice(0, 10)), Object(i.a)(d.slice(10))),
                      this.update(t, e),
                      this.nodeClick = !0,
                      setTimeout((function() {
                          var e = null == t ? void 0 : t.parent.children[10].x0
                            , n = null == t ? void 0 : t.parent.children[10].y0;
                          r.select("#svg svg").transition().call(c.d3Zoom.translateTo, e, n)
                      }
                      ))
                  }
              }
          })
      }
        , v = (n(6835),
      n(6))
        , y = Object(v.a)(m, (function() {
          var t = this
            , e = t.$createElement
            , n = t._self._c || e;
          return n("div", {
              directives: [{
                  name: "loading",
                  rawName: "v-loading",
                  value: t.loading,
                  expression: "loading"
              }],
              staticClass: "stock-rpt cursorMove",
              attrs: {
                  id: "stock-rpt",
                  "element-loading-background": "transparent",
                  "element-loading-spinner": "el-icon-loading"
              }
          }, [t.stateInfo ? t._e() : n("SideBar", {
              class: {
                  active: t.editActive
              },
              attrs: {
                  visibleList: t.visibleList
              }
          }, [n("div", {
              staticClass: "content",
              attrs: {
                  slot: "edit"
              },
              on: {
                  click: t.handleEdit
              },
              slot: "edit"
          }, [n("li", {
              staticClass: "bar-item__wrapper flex-center flex-column",
              class: [{
                  activeSearch: t.editActive
              }]
          }, [n("v-icon", {
              staticClass: "bar-item__icon",
              attrs: {
                  id: "icon-a-fuchuangbianji"
              }
          }), t._v(" "), n("span", [t._v("编辑")])], 1)])]), t._v(" "), n("div", {
              attrs: {
                  id: "svg"
              }
          }), t._v(" "), n("DiagramPopup", {
              ref: "diagramPopup"
          }), t._v(" "), n("ZoomPopup", {
              attrs: {
                  ratio: t.ratio
              }
          })], 1)
      }
      ), [], !1, null, "0ff79fb7", null)
        , S = y.exports;
      installComponents(y, {
          VIcon: n(99).default
      });
      var b = {
          meta: {
              headerSearch: !0
          },
          components: {
              StockRpt: S
          },
          mounted: function() {
              this.setHeaderSearchWords()
          },
          methods: {
              setHeaderSearchWords: function() {
                  var t = this.$route.query.name;
                  this.$store.commit({
                      type: "header/SET_SEARCHKEY_LIST",
                      value: [t]
                  })
              }
          }
      }
        , w = (n(6836),
      Object(v.a)(b, (function() {
          var t = this.$createElement
            , e = this._self._c || t;
          return e("div", {
              staticClass: "stockRpt-box"
          }, [e("StockRpt")], 1)
      }
      ), [], !1, null, "a030650a", null));
      e.default = w.exports
  }
}]);
