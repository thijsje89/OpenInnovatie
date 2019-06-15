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
                
                // circle.style.width = average;
                var lessaverage = average * 0.08;
                //KATTEN SSHIT
                console.log(lessaverage);
                var width1 = document.documentElement.clientWidth;
                var height1 = document.documentElement.clientHeight;
                var text = document.getElementById('textbub');
                var vid = document.getElementById('video');
                vid.play();
                vid.width = width1;
                vid.height = height1;
                setPlaySpeed();
                
                if (lessaverage){
                    opacity
                }
                function setPlaySpeed() {
                    vid.playbackRate = 5 - lessaverage;
                    
                }
                if (typeof vid.loop == 'boolean') { // loop supported
                    vid.loop = true;
                } else { // loop property not supported
                    vid.addEventListener('ended', function () {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                }
            } // end fn stream
        },
        function (err) {
            console.log("The following error occured: " + err.name)
        });
} else {
    console.log("getUserMedia not supported");
}