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

                var doubleaverage = average * 2;
               console.log(doubleaverage);
               document.getElementById("video1").style.filter = 'opacity('+(150-doubleaverage)+'%)';
/*
                if (doubleaverage >= 0 && doubleaverage < 50) {
                    document.getElementById("myVideo").style.filter = 'opacity(80%)';
                    
                } 
                 else if((doubleaverage >= 50 && doubleaverage < 100)) {
                    document.getElementById("myVideo").style.filter = 'opacity(80%)';
                }
                else if((doubleaverage >= 100 && doubleaverage < 150)) {
                    document.body.style.backgroundColor = "green"; 
                 }
*/
            } // end fn stream
        },
        function (err) {
            console.log("The following error occured: " + err.name)
        });
} else {
    console.log("getUserMedia not supported");
}