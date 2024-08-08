const tf = require('@tensorflow/tfjs');

var 시간 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var 점수 = [10, 15, 16, 30, 48, 50, 66, 75, 89, 90];
var 시간텐서 = tf.tensor(시간);
var 점수텐서 = tf.tensor(점수);


// 2. 모델 모양 생성
var X = tf.input({ shape: 1 });
var Y = tf.layers.dense({ units: 1 });

var model = tf.model({ inputs: X, outputs: Y });

var compileParam = { optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError };

model.compile(compileParam);

var fitParam = {
  epochs: 2000,
  callback: {
    onEpochEnd: function (e, l) {
      console.log('epoch: ', e, l, Math.sqrt(l.loss));
    }
  },
};

model.fit(시간텐서, 점수텐서, fitParam).then(function (result) {
  var 예측결과 = model.predict(시간텐서);
  예측결과.print();
});