import { Item } from "../Header/interfaces";

export interface RouteProp extends Item {
  component: React.FC;
}

export interface RouteProps {
  data: RouteProp[];
  showMenu?: boolean;
}
