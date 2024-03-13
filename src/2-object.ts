// object literal
// enum과 달리 number, string 이외의 타입도 가능
// 복잡한 구조에 유리
const config = {
  url: "https://example.com",
  method: "GET",
  spicy: { original: 0, hot: 1 },
}

// 런타임 에러 방지 가능 (코드 내에서 사용하기 전에 값이 할당되어야 함)
// config.apikey = "1234"
