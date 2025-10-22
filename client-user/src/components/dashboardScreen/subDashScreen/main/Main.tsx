import { DashScreenInterface } from '../../mainScreen/Dashboard';
import { OrdersList_1 } from './orders/ordersListsVariants/ordersListVariant-1/OrdersList_1';

export interface MainInterface extends DashScreenInterface {
  orders: {
    name: string;
    company: string;
    email: string;
  }[]
}

export function Main(props: MainInterface) {

  return (
    <OrdersList_1 {...props}/>
  );
}