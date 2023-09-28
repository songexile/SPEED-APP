export interface IMetaProps {
  title: string
  description: string
  canonical?: string
}

export interface CustomNavButtonsProps {
  href: string;
  icon: JSX.Element;
  label: string;
}


export interface IconProps {
  path: string;
  className: string;
}
