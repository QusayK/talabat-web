export default class Order {
  constructor(public id: number, public rest_id: number, public menu_id: number, public customer_id: number,
              public quantity: number, public date_created: string) {}
}
