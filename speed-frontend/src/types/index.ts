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
  year: number | any
  volume: string
  pages: string
  doi: string
}

export interface Analyst extends FormData {
  _id: any
  claim: string
  method: string
  agreeDisagree?: string
}

export interface AnalystFormData {
  claim?: string
  method?: string
  agreeDisagree?: string
}

export interface CustomNavButtonsProps {
  href: string
  icon: JSX.Element
  label: string
}

export interface IconProps {
  path: string
  className: string
}

export interface LoginProps {
  csrfToken: string
}

export interface RegisterProps {
  csrfToken: string
}

export interface UserNextAuthTypes {
  // other properties
  token: string
  refreshToken: string
  accessTokenExpires: number
}

export interface SearchResultData {
  _id: string
  title: string
  authors: string
  journal: string
  year: number
  volume: string
  pages: string
  doi: string
  claim: string
  method: string
}

export interface ArticleProps extends SearchResultData {
}

export interface CustomReusableButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
}

export interface User {
  accessToken?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface DecodedToken {
  role: string;
  username: string;
}

export enum DeleteSource {
  Submissions = 'submissions',
  Analyst = 'analyst',
  Moderator = 'moderator',
}
