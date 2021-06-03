export interface Item {
  href: string;
  txt: string;
  id: number;
  visible: boolean;
}

export interface NavItems {
  items: Item[];
  showMenu?: boolean;
}
