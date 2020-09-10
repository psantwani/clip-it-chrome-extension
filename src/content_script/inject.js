chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (!sendResponse) {
      return;
    }
    
    let response;
    switch (request.action) {    
      case "notify-user":
        notifyUser(request.payload);
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

  const notifyUser = (response) => {
    const {err, data} = response;
    if(err){
        alert("Something went wrong");
    } else{
        alert("Clipping saved successfully.");
    }
  }