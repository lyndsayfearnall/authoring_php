(function() {
  const httpRequest = new XMLHttpRequest();
  const vidPlayer = document.querySelector('video');
  const volumeIndicator = document.querySelector('.vol-indicator');
  const videoThumbs = document.querySelectorAll('.vid-thumb');

  function volOn() {
    vidPlayer.muted = false;
    volumeIndicator.classList.replace('fa-volume-off', 'fa-volume-up');
  }

  function volOff() {
    vidPlayer.muted = true;
    volumeIndicator.classList.replace('fa-volume-up', 'fa-volume-off');
  }

  function replayVideo() {
    // replay and turn off the overlay    
    vidPlayer.currentTime = 0;
    vidPlayer.play();

    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.remove('show-overlay');

    overlay.querySelector('i').removeEventListener('click', replayVideo, false);
  }

  function popOverlay() {
    // stub -> turn on replay stuff
    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.add('show-overlay');

    overlay.querySelector('i').addEventListener('click', replayVideo, false);
  }

  function makeRequest() {
    // catch old crappy browsers that still don't support this
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = processRequest;
    httpRequest.open('GET', './includes/ajaxQuery.php');
    httpRequest.send();
  }

  function processRequest() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) { // 200 means everything is awesome

        let data = JSON.parse(httpRequest.responseText);
        debugger;
      } else {
        alert('There was a problem with the request.');
      }
    }
  }

  function loadNewVideo() {
    let videoPath = "video/" + this.dataset.videopath + ".mp4";

    try {
      vidPlayer.src = videoPath;
      vidPlayer.load();
      vidPlayer.play();

      let overlay = document.querySelector('.vid-overlay');
      overlay.classList.remove('show-overlay');

      let nonActives = filterThumbnails(this);

      videoThumbs.forEach((thumb) => {
        thumb.classList.remove('nonActive');
      });

      nonActives.forEach.call((thumb) => {
        thumb.classList.add('nonActive');
      });

    } catch (e) {
      console.error(e);
    }   
  }

  function filterThumbnails(el) {
    let thumbs = Array.prototype.slice.call(videoThumbs); // convet nodelist to an array so we can filter it
    thumbs = thumbs.filter(thumb => thumb.dataset.videopath !== el.dataset.videopath); // return all that are not the current one
    return thumbs;
  }

  vidPlayer.addEventListener('mouseover', volOn, false);
  vidPlayer.addEventListener('mouseout', volOff, false);
  vidPlayer.addEventListener('ended', popOverlay, false);

  videoThumbs.forEach((thumb) => {
    thumb.addEventListener('click', loadNewVideo, false);
  });
})();
