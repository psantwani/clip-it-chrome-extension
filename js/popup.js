window.onload = () => {
  chrome.runtime.sendMessage(
    {
      action: "get-clippings",
      payload: null,
    },
    (response) => {
      const { err, data } = response;
      let clippingsCount = 0;
      if (data && data.length) {
        clippingsCount = data.length;
      }

      document.getElementById("clippings-count").innerText = clippingsCount;
    }
  );
};