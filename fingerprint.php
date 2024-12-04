<?php
include './includes/header.php';
?>

<div class="mt-6" id="status"></div>
<div class="mt-6" id="rest"></div>

</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js"></script>
<div style="display: none;">
    <p id="webgl"></p>
    <p id="audio"></p>
</div>

<script src="iphey/crypto.js"></script>
<script src="iphey/js_encrypt.js"></script>
<script src="iphey/leaflet.js"></script>
<script src="iphey/check_fields.min.js"></script>
<script src="https://iphey.com/js/libs/mixvisit-js/index.umd.js"></script>
<script src="/js/libs/tippy-js/popper.js"></script>
<script src="https://iphey.com/js/libs/tippy-js/tippy.js"></script>
<?php
if (isset($_SESSION['authorizedUserToken'])) {
    $auth_prompt = 'No';
} else {
    $auth_prompt = 'Yes';
}
?>
<script>
    // function checkInnerText(elementId) {
    //     return new Promise((resolve, reject) => {
    //         function check() {
    //             const element = document.getElementById(elementId);
    //             const innerText = element.textContent.trim();
    //             if (innerText !== '') {
    //                 clearInterval(interval);
    //                 resolve(innerText);
    //             }
    //         }

    //         // Check the inner text every 1 second
    //         const interval = setInterval(check, 1000);
    //     });
    // }

    // // Check if a cookie is set
    // function isCookieSet(cookieName) {
    //     var cookies = document.cookie.split(";");

    //     for (var i = 0; i < cookies.length; i++) {
    //         var cookie = cookies[i].trim();

    //         // Check if the cookie name matches
    //         if (cookie.indexOf(cookieName + "=") === 0) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }
    // let c1; // Declare c1 outside of the Promise
    // let c2; // Declare c2 outside of the Promise

    // checkInnerText('webgl')
    //     .then((result) => {
    //         c1 = result; // Assign c1 here
    //         alert(c1);
    //         return checkInnerText('audio');
    //     })
    //     .then((result) => {
    //         c2 = result; // Assign c2 here
    //         alert(c2);
    //         var visitorId = c1 + "" + c2; // You can use c1 and c2 here
    //         alert(visitorId);
    //         $.ajax({
    //             type: "POST",
    //             url: "./fingerprintNotify.php",
    //             data: {
    //                 visitorToken: visitorId
    //             },
    //             //processData: false, // tell jQuery not to process the data
    //             //contentType: false, // tell jQuery not to set contentType
    //             //enctype: 'multipart/form-data',
    //             success: function(data) {
    //                 $("#status").html(visitorId);
    //                 $("#rest").html(data);
    //                 var cookieName = "visitorId";

    //                 if (isCookieSet(cookieName)) {
    //                     console.log(data);
    //                     if (data !== 'True') {
    //                         var prompt_auth = "<?php echo $auth_prompt ?>";
    //                         if (prompt_auth == 'Yes') {
    //                             var veto = window.prompt("Enter veto power:");
    //                             var auth = window.prompt("Enter auth key:");
    //                             if (data == 'Ban') {
    //                                 window.location.assign("./fingerprint.php?veto=" + veto + "&auth=" + auth + "&unban=true");
    //                             } else {
    //                                 window.location.assign("./fingerprint.php?veto=" + veto + "&auth=" + auth);
    //                             }
    //                         }


    //                     }

    //                 } else {
    //                     console.log("Cookie is not set");
    //                 }
    //             }
    //         });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
</script>

<script>
    function checkInnerText(elementId) {
        return new Promise((resolve, reject) => {
            function check() {
                const element = document.getElementById(elementId);
                const innerText = element.textContent.trim();
                if (innerText !== '') {
                    clearInterval(interval);
                    resolve(innerText);
                }
            }

            // Check the inner text every 1 second
            const interval = setInterval(check, 1000);
        });
    }

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
    let c1; // Declare c1 outside of the Promise
    let c2; // Declare c2 outside of the Promise

    var visitorId = "973ad0dd0c565ca2ae839d5ebef8447a"; // You can use c1 and c2 here
    alert(visitorId);
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
                    var prompt_auth = "<?php echo $auth_prompt ?>";
                    if (prompt_auth == 'Yes') {
                        var veto = window.prompt("Enter veto power:");
                        var auth = window.prompt("Enter auth key:");
                        if (data == 'Ban') {
                            window.location.assign("./fingerprint.php?veto=" + veto + "&auth=" + auth + "&unban=true");
                        } else {
                            window.location.assign("./fingerprint.php?veto=" + veto + "&auth=" + auth);
                        }
                    }


                }

            } else {
                console.log("Cookie is not set");
            }
        }
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