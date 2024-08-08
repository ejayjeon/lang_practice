import tensorflow as tf

키 = 170
몸무게 = 66

# 학습을 시킬 변수
a = tf.Variable(0.1)
b = tf.Variable(0.2)

# 경사하강법 구하기
opt = tf.keras.optimizers.legacy.Adam(leading_rate=0.1)

def loss() :
    # 실제값 - 예측값
    y = 키 * a + b
    return tf.square(66 - y) #제곱

# 손실함수와, 경사하강법으로 업데이트할 목록

for i in range(300):
    # opt.minimize(loss, var_list=[a, b])
    print('a:', a.numpy(), 'b:', b.numpy())