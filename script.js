const video = document.getElementById('videoElement');
const statusMessage = document.getElementById('statusMessage');
const backgroundVideo = document.getElementById('background-video');
const backgroundSource = document.getElementById('background-source');

// Check if the screen width is less than 1000px, which we consider as mobile
const isMobile = window.innerWidth < 1000;

// Update the background video source for smaller screen widths
if (isMobile) {
    video.style.width = '70vw'; 
    video.style.height = '20vh';
    backgroundSource.src = "mobile.mp4";
    backgroundVideo.load(); // Reload the video with the new source
}

// Request access to the camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        statusMessage.style.display = 'none'; // Hide status message
        video.muted = true;
        video.play();
    })
    .catch(error => {
        let message = "Unable to access camera: ";
        switch (error.name) {
            case "NotAllowedError":
                message += "Please allow camera access.";
                break;
            case "NotFoundError":
                message += "No camera detected.";
                break;
            case "NotReadableError":
                message += "The camera is being used by another application.";
                break;
            case "OverconstrainedError":
                message += "Unable to meet camera constraints.";
                break;
            default:
                message += "Unknown error.";
                break;
        }
        statusMessage.innerText = message;
        statusMessage.style.color = "red";
        console.error(message, error);
    });

// console.log(video_background)
backgroundVideo.muted = false
