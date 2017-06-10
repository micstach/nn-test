var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;


function Perceptron(input, hiddenSize, hiddenCount, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var outputLayer = new Layer(output);
  
  var hiddenLayers = [];
  
  for (var i=0; i<hiddenCount; i++) {
    hiddenLayers.push(new Layer(hiddenSize));
  }

	// connect the layers
	inputLayer.project(hiddenLayers[0]);
  var i = 1;
  for (; i<hiddenCount; i++) {
    hiddenLayers[i-1].project(hiddenLayers[i]);  
  }
  hiddenLayers[i-1].project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: hiddenLayers,
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

function MyTrainer(perceptron) {
  Trainer.call(this, perceptron);
}

MyTrainer.prototype = new Trainer();
MyTrainer.prototype.constructor = MyTrainer;
MyTrainer.prototype.linear =  function(options) {
  console.log("custom trainer");

  var defaults = {
    iterations: 100000,
    log: false,
    shuffle: true,
    cost:  function(input, output) {
      return Trainer.cost.MSE(input, output);
    }
  };

  if (options)
    for (var i in options)
      defaults[i] = options[i];
  
  var pairs = [];
  var maxCount = 10;
  for (var i=0; i<=maxCount; i++) {
    pairs.push({
      input: [i/maxCount],
      output: [i/maxCount]
    });
  }

  maxCount = 8;
  for (var i=0; i<=maxCount; i++) {
    pairs.push({
      input: [i/maxCount],
      output: [i/maxCount]
    });
  }

  maxCount = 4;
  for (var i=0; i<=maxCount; i++) {
    pairs.push({
      input: [i/maxCount],
      output: [i/maxCount]
    });
  }

  maxCount = 2;
  for (var i=0; i<=maxCount; i++) {
    pairs.push({
      input: [i/maxCount],
      output: [i/maxCount]
    });
  }

  return this.train(pairs, defaults);
}

var myPerceptron = new Perceptron(1, 8, 2, 1);
var myTrainer = new MyTrainer(myPerceptron);

console.log(JSON.stringify(myTrainer.linear())); 

var counter = 10;
for (var i=0; i<=counter; i++) {
  var input = i/counter;
  console.log(input + ' = ' + myPerceptron.activate([input])[0]); 
}

