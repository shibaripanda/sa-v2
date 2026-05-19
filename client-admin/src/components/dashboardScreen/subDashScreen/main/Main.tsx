import { User } from '../../../../interfaces/user';
import { CompaniesAdminPagination, DashScreenInterface, UsersAdminPagination } from '../../mainScreen/Dashboard';
import { Companies } from './companies/Companies';
import { DashboardScreen } from './dashboardScreen/DashboardScreen';
import { Users } from './users/Users';

export interface MainInterface extends DashScreenInterface {
  isMobile: boolean;
  navBarData: { icon: any; label: string }[];
  activeNavBar: number;
  users: UsersAdminPagination;
  setUsers: React.Dispatch<React.SetStateAction<UsersAdminPagination>>;
  companies: CompaniesAdminPagination;
  setCompanies: React.Dispatch<React.SetStateAction<CompaniesAdminPagination>>;
}

export function Main(props: MainInterface) {

  const dashboards = [
    <DashboardScreen {...props} />,
    <Users {...props} />,
    <Companies {...props}/>,
    // <CompanySettings {...props}/>,
    // <ServiceSettings {...props}/>,
    // <div>Roles settings</div>,
    // <LibrarySettings {...props}/>,
    // <div>Warehouse</div>,
    // <div>Supplier</div>,
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