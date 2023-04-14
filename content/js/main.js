document.querySelector("body button").addEventListener("click", () => {
  document.querySelector("body button").innerText = "LOOKING FOR FILES...";
  document.querySelector("body button").disabled = true;
  document.querySelector("body button").style.backgroundColor = "#9EABB940";
  document.querySelector("body button").style.color = "#fff";
  tryContent();
})

var valueExtension = 0;
var tried = 1;

function tryContent() {
      let alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
      let url = "";
      for (var l = 0; l <= 6; l++) {
        url += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }
    TryImage(url);
}


function TryImage(url) {
  let img = new Image();
  let originalURL = url;
  let extensions = [".png", ".jpg", ".jpeg", ".gif", ".jpeg", ".svg", ".webp"];
  img.src = `https://files.catbox.moe/${url}${extensions[valueExtension]}`;
  img.onerror = function() {
    valueExtension += 1;
    if(valueExtension == extensions.length) {
      console.log("failed for images");
      valueExtension = 0;
      TryVideo(originalURL);
    }
    else {
      TryImage(originalURL);
    }
  }
  img.onload = function () {
    let content = document.createElement("img");
    content.src = img.src;
    let a = document.createElement("a");
    a.href = img.src;
    a.target = "_blank";
    a.referrer = "noreferrer";
    a.append(content);
    document.querySelector(".template").append(a);
  }
}

function TryVideo(url) {
  let originalURL = url;
  let extensions = [".mp4", ".webm", ".mov", ".wmv", ".avi", ".mkv"];
  fetch(`https://files.catbox.moe/${url}${extensions[valueExtension]}`)
    .then(response => {
      let video = document.createElement("video");
      video.src = `https://files.catbox.moe/${url}${extensions[valueExtension]}`;
      video.autoplay = false;
      video.controls = true;
      video.muted = true;
      document.querySelector(".template").appendChild(video);
      document.querySelector("body button").innerText = `TRY AGAIN`;
      document.querySelector("body button").disabled = false;
      document.querySelector("body button").style.backgroundColor = "#E6E8EA";
      document.querySelector("body button").style.color = "#131313";
    })
    .catch(err => {
      valueExtension += 1;
      if(valueExtension == extensions.length) {
        console.log("Failed for all content");
        valueExtension = 0;
        document.querySelector("body button").innerText = `DIDN'T FIND ANYTHING, TRYING AGAIN.../${tried}`;
        tried += 1;
        console.clear(); // cleaning console
        tryContent();
      }
      else {
        TryVideo(originalURL);
      }
  });
}