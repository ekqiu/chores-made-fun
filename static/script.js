var canvas = document.getElementById('wheel');
var ctx = canvas.getContext('2d');
var angle = 0;

function drawWheel() {
  var radius = (canvas.width / 2) * 0.8; // Scale down the radius by multiplying with 0.9
  var centerX = canvas.width / 2; // Calculate the x-coordinate of the center
  var centerY = canvas.height / 2; // Calculate the y-coordinate of the center
  var arc = (2 * Math.PI) / chores.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  for (var i = 0; i < chores.length; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, i * arc, (i + 1) * arc);
    ctx.lineTo(0, 0);
    var colors = ["#ddd", "#bbb", "#ccc"];
    ctx.fillStyle = colors[i % colors.length];
    ctx.strokeStyle = "#000"; // Add border color
    ctx.lineWidth = 5; // Increase border width to 5
    ctx.fill();
    ctx.stroke(); // Draw the border

    ctx.save();
    ctx.rotate((i + 0.5) * arc);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 15px Arial"; // Increase the font size to 20 pixels and make it bold
    ctx.fillText(chores[i], radius - 10, 0);
    ctx.restore();
  }

  ctx.rotate(-angle);
  ctx.translate(-centerX, -centerY);
  // Assuming ctx is your canvas context
  // Define the points of your triangle
  var trianglePoints = [
    { x: 0, y: 200 }, // Point 1
    { x: 50, y: 250 }, // Point 2
    { x: 0, y: 300 }, // Point 3
  ];

  // Begin a new path
  ctx.beginPath();

  // Move to the first point
  ctx.moveTo(trianglePoints[0].x, trianglePoints[0].y);

  // Draw lines to the other points
  for (var i = 1; i < trianglePoints.length; i++) {
    ctx.lineTo(trianglePoints[i].x, trianglePoints[i].y);
  }

  // Close the path to create the triangle
  ctx.closePath();

  // Fill the triangle
  ctx.fillStyle = "#000"; // Change this to the color you want
  ctx.fill();
}

document.getElementById('spin-button').addEventListener('click', function() {
  var randomAngle = Math.random() * 360; // Generate a random angle between 0 and 360 degrees
  var rotationSpeed = 20; // Set the initial rotation speed in degrees per frame
  var deceleration = 0.1; // Set the deceleration rate

  var currentAngle = 0;
  var targetAngle = randomAngle;
  
  function animateRotation() {
    if (currentAngle < targetAngle) {
      currentAngle += rotationSpeed;
      if (currentAngle > targetAngle) {
        currentAngle = targetAngle;
      }
    } else if (currentAngle > targetAngle) {
      currentAngle -= rotationSpeed;
      if (currentAngle < targetAngle) {
        currentAngle = targetAngle;
      }
    }

    rotationSpeed -= deceleration; // Apply deceleration

    angle = (currentAngle * Math.PI) / 180; // Convert the angle to radians
    drawWheel();

    if (currentAngle !== targetAngle && rotationSpeed > 0) {
      requestAnimationFrame(animateRotation);
    }
  }

  animateRotation();
});

drawWheel();