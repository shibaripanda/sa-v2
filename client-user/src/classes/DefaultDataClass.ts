import { IconBook, IconBuildingCastle, IconBuildingStore, IconBuildingWarehouse, IconCircles, IconHome2, IconMapPin, IconUser } from "@tabler/icons-react"

export class DefaultDataClass {

  activOrderViewDefault() {
    return 0
  }

  orderViewVariantsDefault() {
    return ['Table default', 'Cards (1 line)', 'Cards (2 line)', 'Cards (3 line)', 'Cards (4 line)', 'Cards (5 line)', 'Cards (6 line)', 'Cards (8 line)', 'Cards (10 line)']
  }

  activeNavBarDefault() {
    return sessionStorage.getItem('activeNavBar') ? Number(sessionStorage.getItem('activeNavBar')) : 0
  }

  ordersDefault() {
    return { items: [], meta: { limit: 100, page: 1, total: 0, totalPages: 0 } }
  }

  navBarDataDefault() {
    return [
        { icon: IconHome2, label: 'Dashboard' },
        { icon: IconUser, label: 'User settings' },
        { icon: IconBuildingCastle, label: 'Company settings' },
        { icon: IconMapPin, label: 'Service settings' },
        { icon: IconCircles, label: 'Roles settings' },
        { icon: IconBook, label: 'Library' },
        { icon: IconBuildingWarehouse, label: 'Warehouse' },
        { icon: IconBuildingStore, label: 'Supplier' },
    ]
  }
}
