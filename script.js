const input = document.querySelector('input');
const audioElem = document.querySelector('audio');
const canvas = document.querySelector('canvas');

const context = canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

input.addEventListener('change', ()=>{
    const file = input.files[0];
    if(!file)
    return;

    audioElem.src = URL.createObjectURL(file);
    audioElem.play();

    
    // Process Audio

    // 1 - Audio Context Creation
    // 2 - Audio Creation
    // 3 - Audio Effects Creation (Analyse Audio)
    // 4 - Audio Destination Creation

const audioContext = new AudioContext();

// Source Node
const audioSource = audioContext.createMediaElementSource(audioElem);

// Analyser Node
const analyser = audioContext.createAnalyser();

audioSource.connect(analyser);

// Destination Node
analyser.connect(audioContext.destination); // Hardware Speaker

analyser.fftSize = 512; // 2^9 determines count of sound bars
const bufferDataLength = analyser.frequencyBinCount; // how many actual sound bars

const bufferDataArray = new Uint8Array(bufferDataLength);

const barWidth = canvas.width / bufferDataLength;
let x = 0;

function drawAndAnimateSoundBars(){
    x = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
analyser.getByteFrequencyData(bufferDataArray);

bufferDataArray.forEach(dataValue => {
const barHeight = dataValue;

context.fillStyle = 'red';
context.fillRect(x,canvas.height-barHeight,barWidth,barHeight);
x += barWidth;
})

requestAnimationFrame(drawAndAnimateSoundBars);
}

drawAndAnimateSoundBars();

})