"use strict";
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PLACED"] = "placed";
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["PICKED_UP"] = "picked-up";
})(OrderStatus || (OrderStatus = {}));
// 음료 및 사용자 리스트 배열
let drinks = [];
let orders = [];
const adminCheck = (user) => {
    return user.role === 'admin';
};
const clientCheck = (user) => {
    return user.role === 'customer';
};
const addDrinks = (user, name, price) => {
    if (!adminCheck(user)) {
        throw new Error('관리자 권한이 없습니다.');
    }
    const newDrink = { name, price };
    drinks.push(newDrink);
};
const removeDrinks = (user, beverageName) => {
    if (!adminCheck(user)) {
        throw new Error('관리자 권한이 없습니다.');
    }
    drinks = drinks.filter(drink => drink.name !== beverageName);
};
const drinkList = () => {
    return drinks;
};
const findDrink = (name) => {
    return drinks.find(drink => drink.name === name);
};
const placeOrder = (user, beverageName) => {
    if (!clientCheck(user)) {
        throw new Error('사용자 권한이 없습니다.');
    }
    const drink = findDrink(beverageName);
    if (!drink) {
        throw new Error('해당 음료가 없습니다.');
    }
    const newOrder = {
        id: orders.length + 1,
        userId: user.id,
        userName: user.name,
        drinksName: drink.name,
        status: OrderStatus.PLACED
    };
    orders.push(newOrder);
    return newOrder.id;
};
const completeOrder = (user, orderId) => {
    if (!adminCheck(user)) {
        throw new Error('관리자 권한이 없습니다.');
    }
    const order = orders.find(order => order.id === orderId);
    if (!order) {
        throw new Error('해당 주문이 없습니다.');
    }
    order.status = OrderStatus.COMPLETED;
    console.log(`${user.name}님의 주문하신 ${order.drinksName}가 완료`);
};
const pickUpOrer = (user, orderId) => {
    if (!adminCheck(user)) {
        throw new Error('관리자 권한이 없습니다.');
    }
    const order = orders.find(order => order.id === orderId);
    if (!order) {
        throw new Error('해당 주문이 없습니다.');
    }
    if (order.status !== OrderStatus.COMPLETED) {
        throw new Error('주문이 완료되지 않았습니다.');
    }
    order.status = OrderStatus.PICKED_UP;
    console.log(`${user.name}님이 ID: ${order.id}, 음료: ${order.drinksName}를 픽업`);
};
const main = () => {
    const admin = {
        id: 1,
        name: "sik",
        role: "admin"
    };
    const client = {
        id: 2,
        name: "kim",
        role: "customer"
    };
    addDrinks(admin, "아메리카노", 3000);
    addDrinks(admin, "라떼", 5000);
    addDrinks(admin, "녹차", 4000);
    //removeDrinks(client, "아메리카노")
    removeDrinks(admin, "녹차");
    console.log('음료 리스트 조회', drinkList());
    //const adminOrder = placeOrder(admin, "아메리카노")
    const order1 = placeOrder(client, "라떼");
    if (order1) {
        setTimeout(() => {
            completeOrder(admin, order1);
            pickUpOrer(admin, order1);
        }, 1000);
    }
};
main();
