
var scene = document.getElementById("scene");
var scene_ctx = scene.getContext("2d");
var colors = ["red", "green", "blue", "black", "yellow", "cyan", "orange"];

function init() {
	scene_ctx.fillStyle = "gray";
	scene_ctx.fillRect(0, 0, scene.width, scene.height);
}

function createBall(x, y) {
	var col = colors[parseInt(colors.length*Math.random())];
	console.log(col);
	var ball = new Ball(scene_ctx, col, x, y, 10);
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

function withinBoundary(ball, x, y) {
	var res = {x:false, y:false};
	if ((x+ball.radius < scene.width) && 
		(x-ball.radius > 0)) {
		res.x = true;
	}
	if ((y+ball.radius < scene.height) &&
		(y-ball.radius > 0)) {
		res.y = true;
	}
	return res;
}

function start_animation() {
	start = window.performance.now();
	function step(timestamp) {
		var progress = timestamp - start;
		for (var i = 0; i < balls.length; ++i) {
			var ball = balls[i];
			var wall = withinBoundary(ball, ball.get_next_pos().x, ball.get_next_pos().y);
			if (wall.x === false) {
				ball.vel.x *= -0.6;
			}
			if (wall.y === false) {
				ball.vel.y *= -0.6;
			}
			// this will check for collision with other balls
			for (var j=0; j < balls.length; ++j) {
				if (i == j) continue;
				var other = balls[j];
				if (ball.isCollidingWith(other)) {
					var theta = Math.atan((ball.y - other.y)/(ball.x - other.x));
					var v_x = -0.5*(ball.vel.x+other.vel.x)*0.6*Math.cos(theta);
					var v_y = -0.5*(ball.vel.y+other.vel.y)*0.6*Math.sin(theta);
					ball.vel.x = v_x;
					ball.vel.y = v_y;
				}
			}
			if (withinBoundary(ball, ball.get_next_pos().x, ball.get_next_pos().y).y == false) {
				ball.vel.y = 0;
				ball.vel.x = ball.vel.x/1.01;
				ball.y = scene.height - ball.radius;
			}
		}
		for (var i=0; i < balls.length; ++i)
			balls[i].move();
		draw();
		if (true || progress < 6000) {
			window.requestAnimationFrame(step);
		}
	}
	window.requestAnimationFrame(step);
}
balls = [];
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}
scene.addEventListener('click', function(evt) {
	var mousePos = getMousePos(scene, evt);
	balls.push(createBall(mousePos.x, mousePos.y));
	var msg = 'Mouse position: ' + mousePos.x + ' ' + mousePos.y;
	console.log(msg);
}, false);

start_animation();

