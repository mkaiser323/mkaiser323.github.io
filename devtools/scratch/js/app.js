var app = angular.module('myApp', []);

var fontSize = 50;
var fonts = ["KareemMubarak", "RamadhanKarim", "SketsaRamadhan"];

app.controller('myCtrl', function($scope) {
  $scope.fonts = fonts;
  $scope.fontSize = 50;
  $scope.font = fonts[0];
  var ctx = document.getElementById('textCanvas').getContext('2d'),
  imageElem = document.getElementById('image');

  
  loadFonts($scope, ctx)
  $scope.onChange = function(){
    updateCanvas($scope, ctx, imageElem)
  }
});


function loadFonts($scope, tCtx){
  var initialText = $scope.text;
  $scope.text = "Test text"
  var attempts=0;
  var maxAttempts=10;
  fonts.forEach(function(f){
    var initialWidth = tCtx.measureText($scope.text).width;
    while (tCtx.measureText($scope.text).width == initialWidth){
      
      tCtx.font = $scope.fontSize + "px " + f;
      console.log("loading:", tCtx.font)
      tCtx.fillText($scope.text, 0, $scope.fontSize);
      attempts++;
      if (attempts > maxAttempts){
        attempts=0;
        break;
      }
    }
  })

  $scope.text = initialText;
}

function updateCanvas($scope, tCtx, imageElem){
  var width = tCtx.measureText($scope.text).width;
  var height = $scope.fontSize * 1.3;
  var f = $scope.fontSize + "px " + $scope.font;
  var text = $scope.text;

  console.log("width:", width)
  console.log("height:", height)
  console.log("font:", f)
  console.log("text:", text)

  tCtx.canvas.width = width + 7;
  tCtx.canvas.height = height;
  tCtx.font = f;
  if ($scope.white){
    tCtx.canvas.fillStyle = "#FFFFFF"
  } else {
    tCtx.canvas.fillStyle = "#000000"
  }
  tCtx.fillText(text, 0, $scope.fontSize);

  imageElem.src = tCtx.canvas.toDataURL();
  console.log(imageElem.src);
}