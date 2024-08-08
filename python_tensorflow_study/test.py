import tensorflow as tf

tensor = tf.constant([ [1, 2], [1, 2]] )
tensor2 = tf.Variable([w1, w2], [w3, w4])
# tensor3 = tf.matmul(tensor, tensor2)
tensor4 = tf.transpose(tensor2)
result = tf.matmul(tensor, tensor4)
print(result)

# tf.add()
# tf.subtract()
# tf.divide()
# tf.multiply()
# tf.matnul()
# tf.zeros([2,2]) -> 0이 담긴 2행 2열의 텐서를 만듦

# print(tensor2.shape)

# 가중치(Weight)
w = tf.Variable(1, 0)
# w.assign() // 변수에 값 할당
# w.numpy() // 할당된 값 불러오기 
# print(w.numpy())
