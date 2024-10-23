const n = 20;
const array = [];
const container = document.getElementById('container'); // Make sure this matches your HTML

init();

let audioCtx = null;
function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new (
            AudioContext || 
            webkitAudioContext || 
            window.webkitAudioContext
        ) (); 
    }
    const duration = 0.1;
    const oscillator = audioCtx.createOscillator()
    oscillator.frequency.value = freq;
    oscillator.start();
    oscillator.stop(audioCtx.currentTime+duration);
    const node = audioCtx.createGain();
    node.gain.value = 0.1
    oscillator.connect(node);
    node.connect(audioCtx.destination); 

} 

function init() {
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();  // Generates random numbers between 0 and 1
    }
    showBars();
}

function play() {
    bubbleSortStepByStep();
}

/* Another way to implement it by using async await
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));  // A delay function using setTimeout wrapped in a promise
}

async function bubbleSortStepByStep() {
    for (let i = 0; i < array.length; i++) {  // Outer loop
        for (let j = 0; j < array.length - 1 - i; j++) {  // Inner loop
            if (array[j] > array[j + 1]) {  // If the current element is larger than the next
                // Swap them
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                showBars();  // Show the updated bars after the swap
            }
            await sleep(100);  // Pause for 100ms between each step
        }
    }
}

*/

function bubbleSortStepByStep() {
    let i = 0;
    let j = 0;

    function step() {
        if (i < array.length) {
            if (j < array.length - 1 - i) {
                let status = "compare"; // initially we are comparing
                playNote(200 + array[j] * 500);  // Play note for comparison

                if (array[j] > array[j + 1]) {
                    // Swap the values
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    status = "swap"; // mark this step as a swap
                    playNote(200 + array[j] * 500);  // Play note for swap
                }
                showBars([j, j + 1], status);  // Pass indices and status (compare or swap)
                j++;
            } else {
                j = 0; // Reset inner loop
                i++;   // Move to next pass

            }

            // Call the step function again after a short delay to animate
            setTimeout(step, 400); // Adjust the delay as needed
        } else {
            showBars(); // to reset the bar color to default again
        }
    }

    step(); // Start the sorting steps
}

function showBars(indices, status) {
    container.innerHTML = ""; // Clear the container
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div"); // Create a new div element for each bar
        bar.style.height = array[i] * 100 + "%"; // Adjust the height based on the array value
        bar.classList.add("bar");

        if (indices && indices.includes(i)) {
            if (status == "swap") {
                bar.style.backgroundColor= "red"; // red for swap
            } else if (status === "compare") {
                bar.style.backgroundColor = "blue" // blue for comparing
            }
        } else {
            bar.style.backgroundColor = "black" // default color
        }
        container.appendChild(bar);
    }
}
