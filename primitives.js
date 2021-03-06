var gravity = {
	x: 0,
	y: 2*9.8
};
var Ball = function(ctx, color, x, y, r) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.ctx = ctx;
	this.color = color;
	this.vel = {
		x: 0,
		y: 0
	};

	this.draw = function() {
		var circle = new Path2D();
		circle.moveTo(this.x, this.y);
		this.ctx.fillStyle = this.color;
		circle.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		this.ctx.fill(circle);
	}

	this.get_next_pos = function() {
		var t = 5/60;
		res = {x:0, y:0};
		res.x = this.x + t*this.vel.x + 1/2*t*t*(gravity.x);
		res.y = this.y + t*this.vel.y + 1/2*t*t*(gravity.y);
		return res;
	}

	this.isCollidingWith = function(other) {
		var pos = this.get_next_pos();
		return (Math.sqrt(Math.pow((pos.x - other.x), 2.0) + Math.pow((pos.y - other.y), 2.0)) < 2*this.radius);
	}
	this.move = function() {
		var t = 5/60;
		this.x = this.x + t*this.vel.x + 1/2*t*t*(gravity.x);
		this.y = this.y + t*this.vel.y + 1/2*t*t*(gravity.y);
		this.vel.x = this.vel.x + gravity.x*t;
		this.vel.y = this.vel.y + gravity.y*t;
	}
};