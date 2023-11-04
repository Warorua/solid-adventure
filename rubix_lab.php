<?php
use Rubix\ML\PersistentModel;
use Rubix\ML\Pipeline;
use Rubix\ML\Transformers\ImageResizer;
use Rubix\ML\Transformers\ImageVectorizer;
use Rubix\ML\Transformers\ZScaleStandardizer;
use Rubix\ML\Classifiers\MultilayerPerceptron;
use Rubix\ML\NeuralNet\Layers\Dense;
use Rubix\ML\NeuralNet\Layers\Activation;
use Rubix\ML\NeuralNet\Layers\Dropout;
use Rubix\ML\NeuralNet\Layers\BatchNorm;
use Rubix\ML\NeuralNet\ActivationFunctions\ELU;
use Rubix\ML\NeuralNet\Optimizers\Adam;
use Rubix\ML\Persisters\Filesystem;
use Rubix\ML\Datasets\Labeled;

$samples = $labels = [];

foreach (glob('train/*.png') as $file) {
    $samples[] = [imagecreatefrompng($file)];
    $labels[] = preg_replace('/[0-9]+_(.*).png/', '$1', basename($file));
}

$dataset = new Labeled($samples, $labels);

$estimator = new PersistentModel(
    new Pipeline([
        new ImageResizer(32, 32),
        new ImageVectorizer(),
        new ZScaleStandardizer(),
    ], new MultilayerPerceptron([
        new Dense(200),
        new Activation(new ELU()),
        new Dropout(0.5),
        new Dense(200),
        new Activation(new ELU()),
        new Dropout(0.5),
        new Dense(100, 0.0, false),
        new BatchNorm(),
        new Activation(new ELU()),
        new Dense(100),
        new Activation(new ELU()),
        new Dense(50),
        new Activation(new ELU()),
    ], 256, new Adam(0.0005))),
    new Filesystem('cifar10.rbx', true)
);