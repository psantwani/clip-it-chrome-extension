chrome.extension.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  if (!sendResponse) {
    return;
  }
  
  let response;
  switch (request.action) {    
    case "get-clippings":
      getClippings()
      .then(response => sendResponse(response));      
      break;    
    default:
      sendResponse({
        err: "Unknown operation",
        data: null,
      });
      break;
  }
  
  return true;
});

const clickHandler = async(e) => {
  const response = await saveClipping(e.selectionText);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "notify-user", payload: response}, function(response) {});
  });
}

const getClippings = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["clippings"], function (result) {
      return resolve({ err: null, data: result.clippings });
    });
  });
};

const saveClipping = (clipping) => {
  return new Promise(async(resolve, reject) => {
    const { err, data } = await getClippings();
    
    let clippings = data || [];
    clippings.push(clipping);

    chrome.storage.local.set({ clippings }, function (result) {
      return resolve({ err: null, data: "Saved" });
    });
  });
};

chrome.contextMenus.create({
  "title": "Clip It",
  "contexts": ["selection"],
  "onclick" : clickHandler
});
