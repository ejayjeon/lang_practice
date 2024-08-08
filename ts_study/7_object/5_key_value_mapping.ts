/** 키와 밸류를 매핑하는 방법 */

enum State {
  loading,
  done,
  error,
}

type GlobalApiStatus = {
  getUser: State;
  pagination: State | undefined;
  banUser: State | null;
  getPosts: State;
};


// 유저에 필요한 api들만
type GetUserApi = {
  // 'GlobalApiStatus'이(가) 네임스페이스가 아니라 형식이므로 'GlobalApiStatus.getUser'에 액세스할 수 없습니다. 'GlobalApiStatus'에서 'GlobalApiStatus["getUser"]'과(와) 함께 'getUser' 속성의 형식을 검색하려고 했나요?ts(2713)
  getUser: GlobalApiStatus['getUser'];
  pagination: GlobalApiStatus['pagination'];
  banUser: GlobalApiStatus['banUser'];
};

// GetUserApi 간편화
type GetUserApi2 = {
  // k가 변수가 되면서 위와 똑같은 코드
  [k in 'getUser' | 'pagination' | 'banUser']: GlobalApiStatus[k];
};

// Pick<어떤 값을 가져올지, 가져온 값의 key>
type PickUserApiStatus = Pick<GlobalApiStatus, 'banUser' | 'getUser' | 'pagination'>;



// Omit : 가져오고 싶지 않은 key를 제외
type OmitUserApiStatus = Omit<GlobalApiStatus, 'getPosts'>;



// keyof : 객체의 key 값들을 Union으로 전부 가져올 수 있다.

type AllKeys = keyof GlobalApiStatus;

// 자동완성됨
const key: AllKeys = 'banUser';


// keyof를 이용한 key값 가져오기 비교
type GetUserApi3 = {
  [k in 'getUser' | 'pagination' | 'banUser']: GlobalApiStatus[k];
};
// keyof를 이용한 key값 가져오기 비교
type KeyOfUserApiStatus = {
  [k in keyof GlobalApiStatus]: GlobalApiStatus[k];
};

// 마지막 것을 뺌: ?를 붙이면 optional로도 가능함
type KeyOfUserApiStatus2 = {
  [k in Exclude<keyof GlobalApiStatus, 'getPosts'>]?: GlobalApiStatus[k];
};