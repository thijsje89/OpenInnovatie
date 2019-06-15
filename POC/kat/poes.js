//AUDIO SHITTTTTTTTTTTTTTTT

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
if (navigator.getUserMedia) {
    navigator.getUserMedia({
            audio: true
        },
        function (stream) {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            //var circle = document.getElementById("circle");

            javascriptNode.onaudioprocess = function () {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;
                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += (array[i]);
                }

                var average = values / length;
                console.log(average);
                // circle.style.width = average;
                console.log(Math.round(average - 40));
                var doubleaverage = average * 8;
                //KATTEN SSHIT

                var width1 = document.documentElement.clientWidth;
                var height = document.documentElement.clientHeight;
                var can = document.getElementById('canvas1');
                var ctx = can.getContext('2d');
                can.width = window.innerWidth;
                can.height = window.innerHeight;
                var video = document.getElementById('video');

                function redraw() {
                    console.log('a');
                    can.width = can.width;
                    ctx.drawImage(img, 0, 0);
                    ctx.beginPath();
                    ctx.rect(0, 0, width1, height);
                    ctx.arc(width1 / 2, height / 2, doubleaverage, 0, Math.PI * 2, true)
                    ctx.clip();
                    ctx.fillRect(0, 0, width1, height);
                }

                var img = new Image();
                img.onload = function () {
                    redraw({
                      
                    })
                }
                img.src = 'https://i.imgur.com/ndfhO8K.jpg';

                // Creates an object with x and y defined,
                // set to the mouse position relative to the state's canvas
                // If you wanna be super-correct this can be tricky,
                // we have to worry about padding and borders
                // takes an event and a reference to the canvas


                function functietje(e, canvas) {
                    var element = canvas,
                        offsetX = 0,
                        offsetY = 0,
                        mx, my;
                    
                    // Compute the total offset. It's possible to cache this if you want
                    mx = e.pageX - offsetX;
                    my = e.pageY - offsetY;

                    // We return a simple javascript object with x and y defined
                    return {
                        x: mx,
                        y: my
                    };
                }
            } // end fn stream
        },
        function (err) {
            console.log("The following error occured: " + err.name)
        });
} else {
    console.log("getUserMedia not supported");
}