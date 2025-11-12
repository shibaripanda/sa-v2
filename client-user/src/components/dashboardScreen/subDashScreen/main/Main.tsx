import { DashScreenInterface, Order } from '../../mainScreen/Dashboard';
import { MyUserSettings } from './myUserSettings/MyUserSettings';
import { Orders } from './orders/Orders';

export interface MainInterface extends DashScreenInterface {
  orders: Order[];
  orderView: string;
  isMobile: boolean;
  activeNavBar: number;
}

export function Main(props: MainInterface) {

  const dashboards = [
    <Orders {...props}/>,
    <MyUserSettings {...props}/>,
    <div>hello2</div>,
    <div>hello3</div>,
    <div>hello4</div>,
    <div>hello5</div>,
    <div>hello6</div>,
  ]

  const showDashboard = () => {
    return (
      dashboards[props.activeNavBar]
    )
  }

  return (
    <>
    {showDashboard()}
    </>
  );
}