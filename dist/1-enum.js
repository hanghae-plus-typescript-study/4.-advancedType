"use strict";
// enum => 열거형 데이터
// 상수의 그룹화를 위해선 enum이 아주 좋은 타입
// 명확한 상수 값 정의
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["EDITOR"] = "EDITOR";
    UserRole["USER"] = "USER";
})(UserRole || (UserRole = {}));
// 컴파일 시에 자동으로 숫자 값으로 mapping 되기 때문에 숫자를 직접 할당하지 않아도 된다
var UserLevel;
(function (UserLevel) {
    UserLevel[UserLevel["NOT_OPERATOR"] = 0] = "NOT_OPERATOR";
    UserLevel[UserLevel["OPERATOR"] = 1] = "OPERATOR";
})(UserLevel || (UserLevel = {}));
function checkPermission(userRole, userLevel) {
    if (userLevel === UserLevel.NOT_OPERATOR) {
        console.log(`당신은 일반 사용자 레벨: ${UserLevel.NOT_OPERATOR}입니다`);
    }
    else {
        console.log(`당신은 운영자 레벨: ${UserLevel.OPERATOR}입니다`);
    }
    if (userRole === UserRole.ADMIN) {
        console.log("당신은 어드민이군요");
    }
    else if (userRole === UserRole.EDITOR) {
        console.log("당신은 에디터에요");
    }
    else {
        console.log("당신은 사용자군요");
    }
}
const userRole = UserRole.EDITOR;
const userLevel = UserLevel.NOT_OPERATOR;
const adminRole = UserRole.ADMIN;
const adminLevel = UserLevel.OPERATOR;
checkPermission(userRole, userLevel);
console.log("====================================");
checkPermission(adminRole, adminLevel);
