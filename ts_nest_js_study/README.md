# SNS REST API 만들기 with Nest.js

## 1. Nest js 프로젝트 생성
```bash
# nest cli가 없을 경우: 전역으로 설치
$ npm i -g @nestjs/cli

# 새로운 프로젝트 생성
$ nest new [프로젝트명]
```

## 2. 프로젝트 주제별 모듈 만들기
```bash
# 해당 프로젝트 폴더로 진입
# 'nest'라고 입력하면 설정 목록들을 볼 수 있음
# 새로운 리소스들(controller, modules, service)을 생성
$ nest g res [리소스명] --no-spec
```

## 3. 컨트롤러와 서비스의 역할
1. 로직을 작성하고 정리하는 곳은: `서비스`
2. 서비스에서 로직을 불러와서 라우팅 처리를 해주는 곳은: `컨트롤러`

## 4. 의존성 주입과 제어의 역전
- 직접 인스턴스를 생성해서 주입할 필요가 없다.
- 컨트롤러에 보면 다음과 같이 NestJS가 직접 인스턴스 생성과 폐기를 담당하고 있다.
```typescript
// NestJs 에서는 프로바이더라고 부른다
constructor(private readonly postsService: PostsService) { }
```

## 5-1. Docker
- 한 컴퓨터에서 만든 프로그램을 결국 여러 컴퓨터에서 (모두 다른 환경) 환경과 상관없이 구동을 해야 한다.
- 도커파일은 순서대로 절자척으로 실행하면 프로젝트를 배포하고 실행할 수 있도록 작성한 파일
- 도커파일 작성법만 알게되면 다양한 환경에서 배포가 쉬워진다.
- 가상머신(VM)은 Host OS - Hypervisor - Guest OS 를 별도로 설치해야 하지만, 도커는 네이티브하게 호스트 OS 커널과 소통을 한다
  
## 5-2. Docker Compose 와 kubernetes
- Kubernetes는 여러 기기에서 여러 컨테이너를 자유롭게 활용할 수 있도록 한다. 
- 프로덕션 환경에서는 Kubernetes를 주로 사용한다.
- 로컬환경에서 개발할 때는 보통 Docker-compose를 활용한다 (여러 개의 컨테이너를 한 번에 묶어서 사용)

## 5-3. Docker-compose file 작성후 실행 (데몬)
```bash
# 상태확인
$ sudo systemctl status docker

# 실행
$ sudo systemctl start docker
$ sudo systemctl enable docker

# 종료
$ sudo systemctl stop docker
$ sudo systemctl stop docker.socket
$ sudo systemctl stop containerd
```