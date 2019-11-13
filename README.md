# 스토리 라인(기능 명세)

## App(Flutter)

1. 메인 페이지
   - 하이에나 사진 페이지 이 후 로그인 화면
   - ID/PW 입력창. 그 아래 회원가입 버튼
2. 회원가입
   - ID, 이름, PW 입력창
   - 성별, 나이 선택창
   - ID 중복 확인
   - PW 유효성 검사
   - 회원가입 성공 후 자동 로그인
3. 로그인
   - ID/PW 입력 창
   - ID/PW 불일치 시 화면 표기
   - 성공시 랜딩페이지
4. 랜딩페이지
   - 현 위치 지도 보임
   - 지도에 핀으로 퀴즈 표시
   - 하단 좌측 Home 버튼. Home은 랜딩페이지로 이동
   - 하단 우측 MyPage 버튼. MyPage로 이동
   - 하단 중앙 발바닥 아이콘. 기능은??
   - 지도의 퀴즈 핀 선택 시 퀴즈 페이지로 이동
   - 최하단 좌측 Home버튼 점등 (색 미정)
5. 퀴즈 페이지
   - 최상단 퀴즈 Title
   - 문제 Title
   - 문제 본문
   - 선택지 (4지 선다)
   - 최하단 중앙 발바닥 아이콘 점등!
6. 정답 페이지
   - 최상단 정답 Title
   - 중앙 정답임을 표시
   - 최하단 중앙 X 아이콘으로 변경
   - X 아이콘 선택시 랜딩페이지로 이동
7. 오답 페이지
   - 최상단 오답 Title
   - 약오르는 이미지/이모티콘으로 오답 표시
   - 하단 중앙 X 아이콘으로 변경
   - X 아이콘 선택시 랜딩페이지로 이동
8. 마이 페이지
   - 최상단 MyPage Title
   - 상단 좌측 프로필 사진
   - 상단 우측 ID, Class 표시
   - 중앙 Class Exp 표시
   - 하단 풀었던 문제 Card 표시
   - Card에는 퀴즈 Title 표시
   - Card 선택시 퀴즈 페이지로 이동
   - 최하단 우측 Mypage 버튼 점등(색 미정)

## Front (Web)

1. Admin 페이지
   - 퀴즈 리스트 출력
   - 퀴즈 만들기 버튼
   - 퀴즈 선택시 퀴즈 수정페이지
2. 퀴즈 등록 페이지
   - 퀴즈 Title, 문제 Title, 문제 본문 입력창
   - 선택지 입력창 (4문항)
   - 퀴즈 배경화면 등록 버튼
   - 퀴즈 제출 버튼

# API 문서

## App(Flutter)

| 구분                                  | url               | method | parameter                            | response      |
| ------------------------------------- | ----------------- | ------ | ------------------------------------ | ------------- |
| 로그인 페이지(Mainpage)               |                   | GET    |                                      |               |
| 로그인 요청                           | /auth/login       | POST   | id, password                         | result, token |
| 회원가입 버튼 선택                    |                   | GET    |                                      | Result        |
| 회원가입 페이지                       |                   | GET    |                                      | Result        |
| ID 중복체크                           | /auth/idcheck     | GET    | id                                   | Result        |
| 회원가입  요청                        | /auth/join        | POST   | id, password, name, gender, birthday | result        |
| 랜딩 페이지                           |                   | GET    |                                      | Result        |
| 퀴즈 핀 선택                          | /api/quiz/:pin_id | GET    | pin_id                               | Result        |
| 퀴즈 페이지                           |                   | GET    |                                      | Result        |
| 문항 선택                             | /api/quiz/choice  | POST   | choice_number, token                 | Result        |
| 정답 페이지                           |                   | GET    |                                      | Result        |
| 오답 페이지                           |                   | GET    |                                      | Result        |
| 랜딩 페이지 선택<br />(발바닥 아이콘) |                   | GET    |                                      | Result        |
| 마이 페이지 선택                      | /api/my/page      | GET    | token                                | Result        |
| 마이 페이지                           |                   | GET    |                                      | Result        |
| 개인정보 페이지 선택                  | /api/my/info      | GET    | Token                                | Result        |
| 개인정보 페이지                       |                   | GET    |                                      | result        |
| 개인정보 수정 선택                    | /api/my/info      | PATCH  | password, name                       | Result        |
| 풀었던 퀴즈 선택                      |                   | GET    |                                      | result        |

## Front (Web)

| 구분               | url           | method | parameter                                                  | response                    |
| ------------------ | ------------- | ------ | ---------------------------------------------------------- | --------------------------- |
| Admin 페이지       | /admin        | GET    |                                                            | Result, Pin_id, title, tags |
| 퀴즈 수정 페이지   | /admin/modify | GET    | Pin_id                                                     | Result                      |
| 퀴즈 수정 버튼     | /admin/modify | POST   | Pin_id, title, contents, answer, tags, latitude, longitude | Result                      |
| 퀴즈 등록 페이지   | /admin/quiz   | GET    |                                                            | Result                      |
| 퀴즈 배경화면 버튼 |               |        |                                                            | Result                      |
| 퀴즈 등록 버튼     | /admin/quiz   | POST   | Pin_id, title, contents, answer, tags, latitude, longitude | Result                      |

# DB 구조

* users
  * id
  * password
  * name
  * birth
  * gender
  * Complete_quizs: Array(Pin_id)
* quizs
  * Pin_id
  * Title
  * Contents
  * Answer
  * Tags
  * Latitude
  * Logitude