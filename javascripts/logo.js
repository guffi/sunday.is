var canvas;
var context;

var centerX;
var centerY;

var radius = 6;
var delta = 3;

var n = 3;

var imgCanvas = document.createElement( 'canvas' );
var imgCanvasContext = imgCanvas.getContext( '2d' );

var imageArray;
var imgLoaded = false;

window.onload = function()
{
	canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

	centerX = canvas.width / 2;
    centerY = canvas.height / 2;	
	
	var imageObj = document.createElement( 'img' );
	
	imageObj.addEventListener( 'load', function() {
		imgCanvas.width = this.width;
		imgCanvas.height = this.height;
		imgCanvasContext.drawImage( this, 0, 0 );

		imageArray = imgCanvasContext.getImageData( 0, 0, imgCanvasContext.canvas.width, imgCanvasContext.canvas.height ).data;
		
		imgLoaded = true;

		timer();
	});
	
	imageObj.src = "images/logo.png";
}

function timer()
{
	drawRandomCircles(n);
	
	setTimeout(timer, 1);
}

function drawRandomCircles(circleCount)
{
	for (var c = 0; c < circleCount; c++)
	{
		// var x = centerX+Math.round(Math.random()*893);
		// var y = centerY+Math.round(Math.random()*307);

		var x = Math.round(Math.random()*893);
		var y = Math.round(Math.random()*307);

		if (x < radius + delta || y < radius + delta ||
			x > imgCanvasContext.canvas.width - (radius + delta) ||
			y > imgCanvasContext.canvas.height - (radius + delta)) 
		{
			continue;
		};
		
		var rad = radius+Math.round(Math.random()*delta)-delta;

		drawCircle(x, y, rad, "white", "black");
	}
}

function drawCircle(x, y, r, fc, sc)
{
	context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);

	if (imgLoaded)
	{		
		var imageData = imageArray;
		
		var w = imgCanvasContext.canvas.width;

		// console.log(w)
		// console.log(x)
		// console.log(y)
				
		var pixelIndex = ( y * w + x ) * 4;
		
		// alert("lol: "+pixelIndex);
		
        var red = imageData[ pixelIndex + 0 ];
        var green = imageData[ pixelIndex + 1 ];
        var blue = imageData[ pixelIndex + 2 ];
        var pixelAlpha = imageData[ pixelIndex + 3 ] / 255;

		// alert('rgba(' + red +','+ green +','+ blue +','+ pixelAlpha + ')');

        context.fillStyle = 'rgba(' + red +','+ green +','+ blue +','+ pixelAlpha + ')';
	}
	
	else
	{		
    	context.fillStyle = fc;
	}

    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = sc;
    // context.stroke();
}