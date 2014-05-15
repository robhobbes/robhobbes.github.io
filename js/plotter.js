$(document).ready(function(){

  var canvas = $('canvas')[0],
      context = canvas.getContext('2d'),
      defaultMinMax = 10,
      minX = -defaultMinMax,
      minY = -defaultMinMax,
      maxX = defaultMinMax,
      maxY = defaultMinMax,
      xScale = maxX-minX / canvas.width,
      yScale = maxY-minY / canvas.width,
      ticks = 10,
      axesColor = '#f00',
      lineColor = '#00f';

  context.translate(canvas.width / 2, canvas.height / 2);
  context.scale(1,-1);
  context.translate(canvas.width / -2, canvas.height / -2);
  context.save();
  plotPoints();

  function plotPoints(){
    var lines = $('#lines')[0].checked,
        points,
        tmp,
        i,a,b;

    try{
      context.restore();
      context.clearRect(0,0,canvas.width,canvas.height);
      context.fillStyle = '#fff';
      context.fillRect(0,0,canvas.width,canvas.height);
      context.save();
      setMinMax();
      points = getPoints();

      setScale();
      setAxes();
      drawAxes();

      if(lines){
        points.sort(function(a,b){
          if(a.x != b.x){
            return a.x - b.x;
          }else{
            return a.y - b.y;
          }
        });
        for(i=0;i<points.length-1;i++){
          a = points[i];
          b = points[i+1];
          drawLine(a,b,lineColor);
        }
      }
      for(i=0;i<points.length;i++){
        a = points[i];
        drawPoint(a,lineColor);
      }
    }catch(e){
      return;
    }
  }

  function drawAxes(){
    var p1 = {},
        p2 = {},
        p3 = {},
        p4 = {},
        i;

    if(minX > 0){
      p1.x = minX;
      p2.x = minX;
      p3.x = minX;
      p4.x = maxX+minX;
    }else{
      p1.x = 0;
      p2.x = 0;
      p3.x = minX;
      p4.x = maxX;
    }

    if(minY > 0){
      p1.y = minY;
      p2.y = maxY+minY;
      p3.y = minY;
      p4.y = minY;
    }else{
      p1.y = minY;
      p2.y = maxY;
      p3.y = 0;
      p4.y = 0;
    }

    drawLine(p1,p2,axesColor);
    drawLine(p3,p4,axesColor);

    for(i=0;i<ticks;i++){
      p1.y = minY + i * (maxY - minY) / ticks;
      p3.x = minX + i * (maxX - minX) / ticks;
      drawTick(false,p1);
      drawTick(true,p3);
    }
  }

  function drawTick(vertical,p){
    var x = 1 / xScale,
        y = 1 / yScale,
        p1 = {},
        p2 = {};

    if(vertical){
      p1.x = p2.x = p.x;
      p1.y = p.y+y*3;
      p2.y = p.y-y*3;
    }else{
      p1.y = p2.y = p.y;
      p1.x = p.x+x*3;
      p2.x = p.x-x*3;
    }
    drawLine(p1,p2,axesColor);
  }

  function setMinMax(){
    tmp = $('#minX').val();
    minX = tmp == '' ? -defaultMinMax : tmp;
    tmp = $('#minY').val();
    minY = tmp == '' ? -defaultMinMax : tmp;
    tmp = $('#maxX').val();
    maxX = tmp == '' ? defaultMinMax : tmp;
    tmp = $('#maxY').val();
    maxY = tmp == '' ? defaultMinMax : tmp;

    minX = strToNum(minX);
    minY = strToNum(minY);
    maxX = strToNum(maxX);
    maxY = strToNum(maxY);

    if(maxX <= minX || maxY <= minY){
      throw "invalid min/max input";
    }
  }

  function setScale(){
    var xDiff = maxX - minX,
        yDiff = maxY - minY,
        str = 'v-scale: '+(yDiff/ticks)+'     x-scale: '+(xDiff/ticks),
        fontSize = 12;
    xScale =  canvas.width / xDiff,
    yScale =  canvas.height / yDiff;
    context.scale(1,-1);
    context.font = ''+fontSize+'px sans-serif';
    context.fillStyle = '#000';
    context.fillText(str,canvas.width-10-str.length*fontSize/2,-fontSize*2);
    context.scale(1,-1);
    context.scale(xScale,yScale);
    context.lineWidth = 1 / Math.max(xScale,yScale);
  }

  function setAxes(){
    context.translate(-minX,-minY);
  }

  function drawLine(p1,p2,strokeStyle){
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.moveTo(p1.x,p1.y);
    context.lineTo(p2.x,p2.y);
    context.stroke();
  }

  function drawPoint(p,fillStyle){
    var x = 1 / xScale,
        y = 1 / yScale;
    context.fillStyle = fillStyle;
    context.fillRect(p.x-2*x,p.y-2*y,5*x,5*y);
  }

  function getPoints(){
    var text = $('#points').val(),
        points = [],
        point,
        i;
    if(text == '')
    {
      return points;
    }
    else
    {
      points = text.match(/\(-?[0-9]*\.?[0-9]+,-?[0-9]*\.?[0-9]+\)/g);
      if(text != points.join(' ')){
        throw "invalid points input";
      }
      for(i=0;i<points.length;i++){
        point = points[i].replace(/[\(\)]/g,'').split(',');
        points[i] = {
          x: strToNum(point[0]),
          y: strToNum(point[1])
        };
      }
      return points;
    }
  }

  function strToNum(str){
    if(typeof str == 'number'){
      return str;
    }
    if(str.indexOf('.')==-1){
      return parseInt(str);
    }else{
      return parseFloat(str);
    }
  }

  $('#draw').click(function(evt){
    evt.preventDefault();
    plotPoints();
  });

  $('#download i').click(function(evt){
    var $parent = $(evt.target.parentElement),
        data =  canvas.toDataURL('image/png');
    $parent.attr('download','image.png');
    $parent.attr('href',data.replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
    setTimeout(function(){
      $parent.removeAttr('download');
      $parent.removeAttr('href',data.replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
    },1);
  });

});