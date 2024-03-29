(() => {
  "use strict";
  var t = {};
  (t.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      var e;
      t.g.importScripts && (e = t.g.location + "");
      var n = t.g.document;
      if (!e && n && (n.currentScript && (e = n.currentScript.src), !e)) {
        var o = n.getElementsByTagName("script");
        if (o.length)
          for (var r = o.length - 1; r > -1 && (!e || !/^http(s?):/.test(e)); )
            e = o[r--].src;
      }
      if (!e)
        throw new Error(
          "Automatic publicPath is not supported in this browser",
        );
      (e = e
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (t.p = e);
    })();
  const e = document.querySelector("#splash"),
    n = document.getElementById("loading"),
    o = document.getElementById("info"),
    r = document.getElementById("error"),
    c = document.querySelector("#units input");
  async function i(t) {
    const c = `https://api.weatherapi.com/v1/current.json?key=e019046cf3bf441f9f8194316240203&q=${t}`;
    (e.style.transform = "translateY(-1500px)"),
      (n.style.opacity = "1"),
      (n.style.display = "block");
    const i = await fetch(c, { mode: "cors" }),
      d = await i.json();
    var a;
    d.error
      ? ((n.style.opacity = "0"),
        (n.style.display = "none"),
        (r.style.display = "flex"),
        (r.style.opacity = "1"))
      : ((function (t) {
          const e = document.getElementById("condition"),
            n = document.querySelector("#weather-icon img"),
            o = document.getElementById("degrees");
          o.setAttribute("data-fahrenheit", `${t.tempF}`),
            o.setAttribute("data-celsius", `${t.tempC}`);
          const r = document.getElementById("name"),
            c = document.getElementById("region"),
            i = document.getElementById("country"),
            d = document.getElementById("wind-speed");
          d.setAttribute("data-mph", `${t.windMph}`),
            d.setAttribute("data-kph", `${t.windKm}`);
          const a = document.getElementById("humidity"),
            s = document.getElementById("uv-index");
          (e.textContent = t.condition),
            (n.src = t.icon),
            (o.textContent = `${t.tempF}°F`),
            (r.textContent = t.location),
            (c.textContent = t.region),
            (i.textContent = t.country),
            (d.textContent = `Wind Speed: ${t.windMph}mph`),
            (a.textContent = `Humidity: ${t.humidity}%`),
            (s.textContent = `UV Index: ${t.uvIndex}`);
        })({
          location: (a = d).location.name,
          region: a.location.region,
          country: a.location.country,
          tempF: a.current.temp_f,
          tempC: a.current.temp_c,
          windMph: a.current.wind_mph,
          windKm: a.current.wind_kph,
          humidity: a.current.humidity,
          uvIndex: a.current.uv,
          condition: a.current.condition.text,
          icon: a.current.condition.icon,
        }),
        (n.style.opacity = "0"),
        (n.style.display = "none"),
        (o.style.display = "flex"),
        (o.style.opacity = "1"));
  }
  const d = t.p + "imgs/logo..png",
    a = t.p + "imgs/arrow-left-bold-circle-outline..svg",
    s = document.querySelector("input"),
    l = document.getElementById("submit"),
    u = document.querySelector("span.error"),
    p = document.querySelectorAll(".back"),
    y = document.querySelector("input[type='checkbox']");
  function m() {
    return s.validity.valueMissing
      ? (s.classList.add("no-val"),
        (u.textContent = "This field cannot be empty."),
        !0)
      : ((u.textContent = ""), s.classList.remove("no-val"), !1);
  }
  (document.querySelector("#logo-container img").src = d),
    p.forEach((t) => {
      t.src = a;
    }),
    s.addEventListener("input", () => {
      m();
    }),
    l.addEventListener("click", () => {
      m() || i(s.value);
    }),
    p.forEach((t) => {
      t.addEventListener("click", () => {
        (e.style.transform = "translateY(0px)"),
          (o.style.opacity = "0"),
          (o.style.display = "none"),
          (r.style.opacity = "0"),
          (r.style.display = "none"),
          (c.checked = !1);
      });
    }),
    y.addEventListener("click", (t) => {
      const e =
          t.target.parentNode.parentNode.parentNode.querySelector("#degrees"),
        n =
          t.target.parentNode.parentNode.parentNode.querySelector(
            "#wind-speed",
          );
      t.target.checked
        ? (function (t, e) {
            const n = t,
              o = e,
              { celsius: r } = n.dataset,
              { kph: c } = o.dataset;
            (n.textContent = `${r}°C`), (o.textContent = `Wind Speed: ${c}kph`);
          })(e, n)
        : (function (t, e) {
            const n = t,
              o = e,
              { fahrenheit: r } = n.dataset,
              { mph: c } = o.dataset;
            (n.textContent = `${r}°F`), (o.textContent = `Wind Speed: ${c}mph`);
          })(e, n);
    });
})();
