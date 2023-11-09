<?php
include './includes/header.php';
?>

<div class="mt-6" id="status"></div>
<div class="mt-6" id="rest"></div>

<div class="mt-6">
    <h2>WebGL Fingerprint</h2>
    <div class="mt-6 text-wrap text-break" id="webgl"></div>
</div>

<div class="mt-6">
    <h2>Canvas Fingerprint</h2>
    <div class="mt-6 text-wrap text-break" id="canvas"></div>
</div>

<div class="mt-6">
    <h2>Audio Fingerprint</h2>
    <div class="mt-6 text-wrap text-break" id="audio"></div>
</div>

<div class="mt-6">
    <h2>Client Rects Fingerprint</h2>
    <div class="mt-6 text-wrap text-break" id="rects1"></div>
    <div class="mt-6 text-wrap text-break" id="rects2"></div>
</div>


</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js"></script>

<script>
    // Check if a cookie is set
    function isCookieSet(cookieName) {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();

            // Check if the cookie name matches
            if (cookie.indexOf(cookieName + "=") === 0) {
                return true;
            }
        }

        return false;
    }

 
Fingerprint2.getV18({}, function(components) {
  const values = components.map(function(component) { return component.value; });
  const fingerprint = Fingerprint2.x64hash128(values.join(''), 31);

  const fingerprintData = {
    webGLFingerprint: fingerprint
  };

  // Convert the object to a JSON string
  const fingerprintJSON = JSON.stringify(fingerprintData);
 $("#webgl").html('WebGL: ', fingerprintJSON);
  console.log(fingerprintJSON); // This is the WebGL fingerprint as a JSON string
});

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15);
    var canvasData = canvas.toDataURL();

    console.log(canvasData); // This is the Canvas fingerprint
    $("#canvas").html(canvasData);


    navigator.mediaDevices.enumerateDevices()
        .then(function(devices) {
            const audioDevices = devices.filter(device => device.kind === 'audioinput');
            console.log('Audio devices:', audioDevices); // This is the Audio fingerprint
             $("#audio").html(JSON.stringify(audioDevices));
        })
        .catch(function(err) {
            console.error('Error capturing audio devices:', err);
            $("#audio").html('Error capturing audio devices:', err);
        });
       



    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const elements = document.getElementsByTagName('*');
    const elementPositions = [];
    for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect();
        elementPositions.push({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
        });
    }

    console.log('Viewport Dimensions:', viewportWidth, viewportHeight);
    $("#rects1").html('Viewport Dimensions:', viewportWidth, viewportHeight);
    console.log('Element Positions:', elementPositions);
    $("#rects2").html('Element Positions:', JSON.stringify(elementPositions));
    // Initialize the agent at application startup.
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load())

    // Get the visitor identifier when you need it.
    fpPromise
        .then(fp => fp.get())
        .then(result => {
            // This is the visitor identifier:
            const visitorId = result.visitorId
            //console.log(visitorId);
            $.ajax({
                type: "POST",
                url: "./fingerprintNotify.php",
                data: {
                    visitorToken: visitorId
                },
                //processData: false, // tell jQuery not to process the data
                //contentType: false, // tell jQuery not to set contentType
                //enctype: 'multipart/form-data',
                success: function(data) {
                    $("#status").html(visitorId);
                    $("#rest").html(data);
                    var cookieName = "visitorId";

                    if (isCookieSet(cookieName)) {
                        console.log(data);
                        if (data !== 'True') {
                            var veto = window.prompt("Enter veto power:");
                            var auth = window.prompt("Enter auth key:");
                            window.location.assign("./fingerprint.php?veto=" + veto + "&auth=" + auth);
                        }

                    } else {
                        console.log("Cookie is not set");
                    }
                }
            });
        });
</script>
<script>
    /*
  // Initialize the agent at application startup.
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load())

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // This is the visitor identifier:
      const visitorId = result.visitorId
      //console.log(visitorId)
      alert(visitorId)
    })
    */
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>