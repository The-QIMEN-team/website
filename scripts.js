function copyCode(btn) {
  var code = btn.parentElement.querySelector("code");
  if (!code) return;
  var text = code.innerText;

  function done() {
    var original = btn.getAttribute("data-label") || btn.textContent;
    btn.setAttribute("data-label", original);
    btn.textContent = "copied";
    setTimeout(function () {
      btn.textContent = original;
    }, 1500);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done, function () {
      fallbackCopy(text, done);
    });
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  var area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
    done();
  } catch (e) {
    /* clipboard unavailable */
  }
  document.body.removeChild(area);
}
