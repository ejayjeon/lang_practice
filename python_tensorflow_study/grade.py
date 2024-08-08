import tensorflow as tf
import pandas as pd
import numpy as np

# pandas에서 csv 데이터 읽음
df = pd.read_csv('gpascore.csv')

# 데이터 전처리하기 (빈 부분은 어떻게 처리할까?)
# data.isnull().sum()
df = df.dropna() # 빈칸 지우기
# data.fillna(100) # 빈칸에 넣는 값

y = df['admit'].values
x = []

for i, rows in df.iterrows(): # 판다스 반복문
    x.append([rows['gre'], rows['gpa'], rows['rank']])
# 대학원 합격 확률

keras = tf.keras


# 레이어
# layer1 = keras.layers.Dense(64, activation='tanh'),
# layer2 = keras.layers.Dense(128, activation='tanh'),
# layer3 = keras.layers.Dense(1, activation='sigmoid'), 
# 마지막은 1개, 0 ~ 1 사이의 확률을 구하고 싶으면 sigmoid

# 딥러닝 모델 만들기
model = keras.models.Sequential([
    keras.layers.Dense(64, activation='tanh'),
    keras.layers.Dense(128, activation='tanh'),
    keras.layers.Dense(1, activation='sigmoid'),
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

#x = [[데이터1], [데이터2], [데이터3]...]

# 파이썬 리스트 그대로 넣을 수 없음
model.fit(np.array(x), np.array(y), epochs=10) #정확도 추측

# 예측
predict = model.predict([750, 3.70, 1], [400, 2.2, 2])