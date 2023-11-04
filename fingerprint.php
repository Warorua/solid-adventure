<?php
include './includes/header.php';
?>

<div class="mt-6" id="status"></div>
<div class="mt-6" id="rest"></div>
</div>
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