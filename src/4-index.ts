interface User {
  id: number
  name: string
  role: "admin" | "customer"
}

interface Drinks {
  name: string
  price: number
}

enum OrderStatus {
  PLACED = "placed",
  COMPLETED = "completed",
  PICKED_UP = "picked-up",
}

interface Order {
  id: number
  userId: number
  userName: string
  drinksName: string
  status: OrderStatus
}

// 음료 및 사용자 리스트 배열
let drinks: Drinks[] = []
let orders: Order[] = []

const adminCheck = (user: User): boolean => {
  return user.role === "admin"
}

const clientCheck = (user: User): boolean => {
  return user.role === "customer"
}

const addDrinks = (user: User, name: string, price: number): void => {
  if (!adminCheck(user)) {
    throw new Error("관리자 권한이 없습니다.")
  }
  const newDrink: Drinks = { name, price }
  drinks.push(newDrink)
}

const removeDrinks = (user: User, beverageName: string): void => {
  if (!adminCheck(user)) {
    throw new Error("관리자 권한이 없습니다.")
  }
  drinks = drinks.filter((drink) => drink.name !== beverageName)
}

const drinkList = (): Drinks[] => {
  return drinks
}

const findDrink = (name: string): Drinks | undefined => {
  return drinks.find((drink) => drink.name === name)
}

const placeOrder = (user: User, beverageName: string): number => {
  if (!clientCheck(user)) {
    throw new Error("사용자 권한이 없습니다.")
  }
  const drink = findDrink(beverageName)
  if (!drink) {
    throw new Error("해당 음료가 없습니다.")
  }
  const newOrder: Order = {
    id: orders.length + 1,
    userId: user.id,
    userName: user.name,
    drinksName: drink.name,
    status: OrderStatus.PLACED,
  }
  orders.push(newOrder)
  return newOrder.id
}

const completeOrder = (user: User, orderId: number): void => {
  if (!adminCheck(user)) {
    throw new Error("관리자 권한이 없습니다.")
  }
  const order = orders.find((order) => order.id === orderId)
  if (!order) {
    throw new Error("해당 주문이 없습니다.")
  }
  order.status = OrderStatus.COMPLETED
  console.log(`${user.name}님의 주문하신 ${order.drinksName}가 완료`)
}

const pickUpOrer = (user: User, orderId: number): void => {
  if (!adminCheck(user)) {
    throw new Error("관리자 권한이 없습니다.")
  }
  const order = orders.find((order) => order.id === orderId)
  if (!order) {
    throw new Error("해당 주문이 없습니다.")
  }
  if (order.status !== OrderStatus.COMPLETED) {
    throw new Error("주문이 완료되지 않았습니다.")
  }
  order.status = OrderStatus.PICKED_UP
  console.log(`${user.name}님이 ID: ${order.id}, 음료: ${order.drinksName}를 픽업`)
}

const main = () => {
  const admin: User = {
    id: 1,
    name: "sik",
    role: "admin",
  }

  const client: User = {
    id: 2,
    name: "kim",
    role: "customer",
  }

  addDrinks(admin, "아메리카노", 3000)
  addDrinks(admin, "라떼", 5000)
  addDrinks(admin, "녹차", 4000)

  //removeDrinks(client, "아메리카노")
  removeDrinks(admin, "녹차")

  console.log("음료 리스트 조회", drinkList())

  //const adminOrder = placeOrder(admin, "아메리카노")
  const order1 = placeOrder(client, "라떼")

  if (order1) {
    setTimeout(() => {
      completeOrder(admin, order1)
      pickUpOrer(admin, order1)
    }, 1000)
  }
}

main()
