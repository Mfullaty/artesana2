export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
}

export interface StockInfo {
  name: string;
  change: number;
}

export interface NavItems {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

interface Message {
  id: string
  name: string
  email: string
  message: string
  sentOn: string
  status: string
}

interface Reply {
  id: string
  content: string
  sentOn: string
  isAdmin: boolean
}
