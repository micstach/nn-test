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
    cost: Trainer.cost.MSE
  };

  if (options)
    for (var i in options)
      defaults[i] = options[i];

  return this.train([{
    input: [0, 0],
    output: [0]
  }, {
    input: [0, 1],
    output: [1]
  }, {
    input: [1, 0],
    output: [1]
  }, {
    input: [1, 1],
    output: [1]
  }], defaults);
}


var myPerceptron = new Perceptron(2, 16, 1);
var myTrainer = new MyTrainer(myPerceptron);

console.log(JSON.stringify(myTrainer.linear())); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

console.log(myPerceptron.activate([0, 0])); // 0.0268581547421616
console.log(myPerceptron.activate([0, 1])); // 0.02128894618097928
console.log(myPerceptron.activate([1, 0])); // 0.9829673642853368
console.log(myPerceptron.activate([1, 1])); // 0.9831714267395621

