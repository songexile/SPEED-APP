import { Analyst } from 'src/analyst/interfaces/analyst.interface';

export interface Speed extends Analyst {
    claim?: string;
    method?: string;
    agreeDisagree?: string;
}
