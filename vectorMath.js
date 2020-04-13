var ctx;
var GRAPH_SIZE = 45;

window.onload = () => {
  ctx = document.querySelector('canvas').getContext('2d')
  drawGraph(ctx)

  const center = new V(8, 8);
  const instructions = [
    () => {
      drawAxes(ctx, center, new V(8, 8), 'black'),
      caption('These are our axes, for vectors you see. The center is (0,0).');
    },
    () => {
      drawArrow(ctx, center, center.add(new V(2, -4)), 1, 'red');
      caption('This is the vector (2,4). Pretty nice! Let\'s normalize it!');
    },
    () => {
      drawCircle(ctx, new V(8,8), 1);
      caption('To normalize a vector, you want the vector that\'s on this circle, pointing in the same direction.');
    },
    () => {
      drawArrow(ctx, center, center.add(V.vmd(1, new V(2, -4).direction)), 0.4, 'blue')
      caption('Something like this!')
    },() => {
      caption('The Pythagorean Theorem is: a squared plus b squared equals c squared, where a and b are the lengths of the two legs of your right triangle, and c is the length of the hypotenuse.')
    },() => {
      drawArrow(ctx, center, center.add(new V(2, 0)), 0.5, 'red');
      caption('First leg, with a length of 2')
    },() => {
      drawArrow(ctx, center.add(new V(2, 0)), center.add(new V(2, -4)), 0.5, 'red');
      caption('Second leg, with a length of 4')
    },() => {
      caption('So something like 2 squared plus 4 squared equals c squared, where c is the length (or "magnitude") of the big vector. 2 squared plus 4 squared, 4 + 16, equals 20.')
    },() => {
      caption('So now we know the length of our big vector, it\'s the square root of 20! This is approximately 4.47.');
    },() => {
      caption('If we take our big vector, and make it 4.47 times smaller, we will get our normalized vector, which points in the same direction but has a length of 1.');
    },() => {
      drawArrow(ctx, center, center.add(V.vmd(2 / new V(2, -4).magnitude, new V(2, 0).direction)), 0.2, 'blue');
      drawArrow(
        ctx,
        center.add(V.vmd(2 / new V(2, -4).magnitude, new V(2, 0).direction)),
        center.add(V.vmd(2 / new V(2, -4).magnitude, new V(2, 0).direction)).add(V.vmd(4 / new V(0, -4).magnitude, new V(0, -4).direction)),
        0.2,
        'blue'
      );
      caption('Our normalized vector will have these components. How can we determine their value numerically? It\'s mad simple actually!');
    },() => {
      caption('Dividing the length of each component of the vector by the magnitude of the big vector will give us the length of the corresponding component of the normalized vector.');
    },() => {
      caption('So if we take the bottom leg of our big vector, length 2, and divide it by 4.47, we get 0.447. On the right side, 4 divided by 4.47 is 0.895.');
    },() => {
      caption('Those are the lengths of the little blue vectors that make up our normalized vector, which can be written (0.447, 0.895). The length of this vector is 1, and it points in the same direction as (2,4).');
    },() => {
      caption('END');
    },
  ]
  let instructionIndex = 0;
  document.querySelector('#next').onclick = () => {
    instructions[instructionIndex++]()
  }

}

function caption(string) {
  document.querySelector('#caption').textContent = string
}

function drawCircle(ctx, center, radius, style='black') {
  ctx.beginPath()
  ctx.strokeStyle = style
  ctx.arc(center.x * GRAPH_SIZE, center.y * GRAPH_SIZE, radius * GRAPH_SIZE, 0, Math.PI * 2)
  ctx.stroke()
}

function drawGraph(ctx) {
  const { height, width } = ctx.canvas;
  ctx.strokeStyle = 'cyan'
  for (var x=0; x < (width / GRAPH_SIZE); x++) {
    ctx.moveTo(x * GRAPH_SIZE, 0)
    ctx.lineTo(x * GRAPH_SIZE, height)
  }
  for (var y=0; y < (height / GRAPH_SIZE); y++) {
    ctx.moveTo(0, y * GRAPH_SIZE)
    ctx.lineTo(width, y * GRAPH_SIZE)
  }
  ctx.stroke()
  caption('is a graph')
}

function drawArrow(ctx, start, end, arrowSize=1, style='black') {
  ctx.beginPath()
  ctx.strokeStyle = style;
  ctx.fillStyle = style;
  ctx.moveTo(start.x * GRAPH_SIZE, start.y * GRAPH_SIZE);
  ctx.lineTo(end.x * GRAPH_SIZE, end.y * GRAPH_SIZE)
  ctx.stroke()
  let head = new Path2D();
  head.moveTo(end.x * GRAPH_SIZE, end.y * GRAPH_SIZE);

  let arrowDir = end.subtract(start).direction
  var downLeft = V.vmd(arrowSize, arrowDir + (7 * Math.PI / 4))
  var downLeftCorner = end.subtract(downLeft)
  head.lineTo(downLeftCorner.x * GRAPH_SIZE, downLeftCorner.y * GRAPH_SIZE)
  var downRight = V.vmd(arrowSize, arrowDir + (1 * Math.PI / 4))
  var downRightCorner = end.subtract(downRight)
  head.lineTo(downRightCorner.x * GRAPH_SIZE, downRightCorner.y * GRAPH_SIZE)
  head.closePath()

  ctx.fill(head)
}

function drawAxes(ctx, center, size, style='black') {
  ctx.beginPath()
  ctx.strokeStyle = style;
  ctx.fillStyle = style;

  drawArrow(ctx, new V(center.x - (size.x / 2), center.y), new V(center.x + (size.x / 2), center.y), 0.3, style)
  drawArrow(ctx, new V(center.x, center.y + (size.y / 2)), new V(center.x, center.y - (size.y / 2)), 0.3, style)
}

function V(x, y) {
  this.x = x;
  this.y = y;

  this.add = function(v2) {
    return new V(this.x + v2.x, this.y + v2.y)
  }

  this.subtract = function(v2) {
    return new V(this.x - v2.x, this.y - v2.y)
  }

  this.magnitude = Math.sqrt((this.x * this.x) + (this.y * this.y))
  this.direction = Math.atan2(this.y, this.x)
}

V.vmd = function(magnitude, direction) {
  return new V(magnitude * Math.cos(direction), magnitude * Math.sin(direction))
}