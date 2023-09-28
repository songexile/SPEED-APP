export interface IMetaProps {
  title: string
  description: string
  canonical?: string
}

export type Errors = {
  title?: string
  authors?: string
  journal?: string
  year?: string
  volume?: string
  pages?: string
  doi?: string
}

export type FormData = {
  title: string
  authors: string
  journal: string
  year: string
  volume: string
  pages: string
  doi: string
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
