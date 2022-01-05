import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';

export function getDatepickerConfig(): BsDatepickerConfig {
    return Object.assign(new BsDatepickerConfig(), {
        containerClass: 'theme-dark-blue',
        isAnimated: true,
        dateInputFormat: 'YYYY-MM-DD'
    });
  }
  