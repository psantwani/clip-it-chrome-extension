const pallete = ["#173753", "#6DAEDB", "#2892D7", "#1B4353", "#1D70A2"];

window.onload = () => {
  chrome.runtime.sendMessage(
    {
      action: "get-clippings",
      payload: null,
    },
    (response) => {
      const { err, data } = response;
      if (err) {
        return;
      }

      if (data && data.length) {
        showClippings(data);
      }
    }
  );
};

const showClippings = (clippings) => {
  let clippingsHtml = "";
  clippings.forEach((clipping, i) => {
    clippingsHtml += `
            <div class="card" style="background-color: ${pallete[i%(clippings.length-1)]}; color: white">
                <p>${clipping}</p>
            </div>
        `;
  });
  document.getElementById("clippings").innerHTML = clippingsHtml;
};

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function invertColor(hex) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}
