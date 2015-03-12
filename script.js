
var scene = document.getElementById("scene");
var scene_ctx = scene.getContext("2d");
var colors = ["red", "green", "blue", "black", "yellow", "cyan", "orange"];

function init() {
	scene_ctx.fillStyle = "gray";
	scene_ctx.fillRect(0, 0, scene.width, scene.height);
}

function createBall() {
	var col = colors[parseInt(colors.length*Math.random())];
	console.log(col);
	var ball = new Ball(scene_ctx, col, scene.width/2 - 10, 200, 10);
	ball.vel.x = Math.pow(-1, parseInt(Math.random()*2))*80*Math.random();
	ball.vel.y = -120*Math.random();
	return ball;
}

function draw() {
	init();
	for (var i=0; i<balls.length; ++i) {
		balls[i].draw();
	}
}

function start_animation() {
	start = window.performance.now();

	function within_boundary(ball) {
		var res = ((ball.x+ball.radius < scene.width) && 
				(ball.x-ball.radius > 0) &&
				(ball.y+ball.radius < scene.height) &&
				(ball.y-ball.radius > 0));
		return res;
	}
	function step(timestamp) {
		var progress = timestamp - start;
		for (var i = 0; i < balls.length; i++) {
			var ball = balls[i];
			if (within_boundary(ball) == false) {
				ball.vel.x *= -0.8*(Math.random()+0.2);
				ball.vel.y *= -0.8*(Math.random()+0.2);
			}
			ball.move(0, 8*9.8);
		}
		draw();
		if (progress < 6000) {
			window.requestAnimationFrame(step);
		}
	}
	window.requestAnimationFrame(step);
}

balls = [];
for (var i = 0; i<20; ++i) {
	balls.push(createBall());
}

start_animation();

