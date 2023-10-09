import { Moderator } from 'src/moderator/interfaces/moderator.interface';

export interface Analyst extends Moderator {
  claim?: string;
  method?: string;
  agreeDisagree?: string;
}
