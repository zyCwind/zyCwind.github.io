/*!
 * 3dtag v0.0.1
 * http://391321232.github.io/
 *
 *
 * Copyright 2014, 391321232@qq.com and other contributors
 * Released under the MIT license
 *
 * Date: 2014-05-01T17:42Z
 */


function getClass(className) {
	var ele = document.getElementsByTagName("*");
	var classEle = [];
	for (var i = 0; i < ele.length; i++) {
		var cn = ele[i].className;
		if (cn === className) {
			classEle.push(ele[i]);
		}
	}
	return classEle;
}

tagEle = "querySelectorAll" in document ? document.querySelectorAll(".tag") : getClass("tag"), paper = "querySelectorAll" in document ? document.querySelector(".tagBall") : getClass("tagBall")[0];

radius = 100, fallLength = 200, tags = [], angleX = Math.PI / 200, angleY = Math.PI / 200, cx = paper.offsetWidth / 2, cy = paper.offsetHeight / 2, ex = paper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft, ey = paper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;

function innit() {
	for (var i = 0; i < tagEle.length; i++) {
		var a, b;
		var k = (2 * (i + 1) - 1) / tagEle.length - 1;
		var a = Math.acos(k);
		var b = a * Math.sqrt(tagEle.length * Math.PI);
		var x = radius * Math.sin(a) * Math.cos(b);
		var y = radius * Math.sin(a) * Math.sin(b);
		var z = radius * Math.cos(a);
		var t = new tag(tagEle[i], x, y, z);
		tagEle[i].style.color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
		tags.push(t);
		t.move();
	}
}

function animate() {
	setInterval(function() {
		rotateX();
		rotateY();
		tags.forEach(function() {
			this.move();
		})
	},
	17)
}

function rotateX() {
	var cos = Math.cos(angleX);
	var sin = Math.sin(angleX);
	tags.forEach(function() {
		var y1 = this.y * cos - this.z * sin;
		var z1 = this.z * cos + this.y * sin;
		this.y = y1;
		this.z = z1;
	})

}

function rotateY() {
	var cos = Math.cos(angleY);
	var sin = Math.sin(angleY);
	tags.forEach(function() {
		var x1 = this.x * cos - this.z * sin;
		var z1 = this.z * cos + this.x * sin;
		this.x = x1;
		this.z = z1;
	})
}


if ("addEventListener" in window) {
	paper.addEventListener("mousemove",
	function(event) {
		var x = event.clientX - ex - cx;
		var y = event.clientY - ey - cy;
		angleY = x * 0.00005;
		angleX = y * 0.00005;
	});
} else {
	paper.attachEvent("onmousemove",
	function(event) {
		var x = event.clientX - ex - cx;
		var y = event.clientY - ey - cy;
		angleY = x * 0.00005;
		angleX = y * 0.00005;
	});
}

Array.prototype.forEach = function(callback) {
	for (var i = 0; i < this.length; i++) {
		callback.call(this[i]);
	}
}

tag = function(ele, x, y, z) {
	this.ele = ele;
	this.x = x;
	this.y = y;
	this.z = z;
}

tag.prototype = {
	move: function() {
		var scale = fallLength / (fallLength - this.z);
		var alpha = (this.z + radius) / (2 * radius);
		this.ele.style.fontSize = 15 * scale + "px";
		this.ele.style.opacity = alpha + 0.5;
		this.ele.style.filter = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
		this.ele.style.zIndex = parseInt(scale * 100);
		this.ele.style.left = this.x + cx - this.ele.offsetWidth / 2 + "px";
		this.ele.style.top = this.y + cy - this.ele.offsetHeight / 2 + "px";
	}
}

innit();
animate();
