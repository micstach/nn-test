var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;


function Perceptron(input, hidden, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer = new Layer(hidden);
	var outputLayer = new Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
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
  var maxCount = 25;

  for (var i=0; i<maxCount; i++) {
    pairs.push({
      input: [i/maxCount],
      output: [i/maxCount]
    });
  }

  return this.train(pairs, defaults);
}

var myPerceptron = new Perceptron(1, 8, 1);
var myTrainer = new MyTrainer(myPerceptron);

console.log(JSON.stringify(myTrainer.linear())); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log(myPerceptron.activate([0])); // 0.0268581547421616
console.log(myPerceptron.activate([0.15])); // 0.0268581547421616
console.log(myPerceptron.activate([0.25])); // 0.02128894618097928
console.log(myPerceptron.activate([0.5])); // 0.9829673642853368
console.log(myPerceptron.activate([0.75])); // 0.9831714267395621

