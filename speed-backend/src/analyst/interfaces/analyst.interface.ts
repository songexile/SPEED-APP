import { Submission } from 'src/submissions/interfaces/submission.interface';

export interface Analyst extends Submission {
  claim?: string;
  method?: string;
  agreeDisagree?: string;
}
