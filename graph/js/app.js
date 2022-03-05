var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
  var diagram = new go.Diagram("myDiagramDiv");
  diagram.linkTemplate =
  $(go.Link,
    $(go.Shape),                           // this is the link shape (the line)
    $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
    $(go.TextBlock,                        // this is a Link label
      new go.Binding("text", "text")));
  diagram.model = new go.GraphLinksModel(
    [{ key: "Hello" },   // two node data, in an Array
     { key: "World!" }],
    [{ from: "Hello", to: "World!", text: "label"}]  // one link data, in an Array
  );
});
