export interface Product {
  id: string;
  name: string;
  image: string;
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
