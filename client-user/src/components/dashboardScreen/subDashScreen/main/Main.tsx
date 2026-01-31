import { DashScreenInterface, Order } from '../../mainScreen/Dashboard';
import { CompanySettings } from './companySettings/CompanySettings';
import { LibrarySettings } from './librarySettings/LibrarySettings';
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
    <CompanySettings {...props}/>,
    <div>Service settings</div>,
    <div>Roles settings</div>,
    <LibrarySettings {...props}/>,
    <div>Warehouse</div>,
    <div>Supplier</div>,
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