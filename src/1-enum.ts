// enum => 열거형 데이터
// 상수의 그룹화를 위해선 enum이 아주 좋은 타입
// 명확한 상수 값 정의

enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

// 컴파일 시에 자동으로 숫자 값으로 mapping 되기 때문에 숫자를 직접 할당하지 않아도 된다
enum UserLevel {
  NOT_OPERATOR,
  OPERATOR,
}

function checkPermission(userRole: UserRole, userLevel: UserLevel): void {
  if (userLevel === UserLevel.NOT_OPERATOR) {
    console.log(`당신은 일반 사용자 레벨: ${UserLevel.NOT_OPERATOR}입니다`)
  } else {
    console.log(`당신은 운영자 레벨: ${UserLevel.OPERATOR}입니다`)
  }

  if (userRole === UserRole.ADMIN) {
    console.log("당신은 어드민이군요")
  } else if (userRole === UserRole.EDITOR) {
    console.log("당신은 에디터에요")
  } else {
    console.log("당신은 사용자군요")
  }
}

const userRole: UserRole = UserRole.EDITOR
const userLevel: UserLevel = UserLevel.NOT_OPERATOR

const adminRole: UserRole = UserRole.ADMIN
const adminLevel: UserLevel = UserLevel.OPERATOR
checkPermission(userRole, userLevel)
console.log("====================================")
checkPermission(adminRole, adminLevel)
