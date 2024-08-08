import tensorflow as tf


x = [1, 2, 3, 4, 5, 6, 7]
y = [3, 5, 7, 9, 11, 13, 15]

# 딥러닝 순서
# 1. 모델 만들기

## 랜덤하게 변수 값 집어넣기
a = tf.Variable(0.1)
b = tf.Variable(0.2)

## 경사하강법
opt = tf.keras.optimizers.legacy.Adam(leading_rate=0.1)

## 모델을 통한 예측값과 실제값의 차이 손실함수
## 실제값 - 예측값
def loss(a, b):
    ex_y = x * a + b
    return tf.keras.losses.mse(y, ex_y)

for i in range(300):
    opt.minimize(lambda: loss(a, b), var_list=[a, b])
    print(a.numpy(), b.numpy())