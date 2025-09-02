import { FormControl } from '@angular/forms';
import { FIELD_NAMES } from '../../../core/constants/validations-constants';

export interface SearchBarForm {
  [FIELD_NAMES.LOCATION]: FormControl<string>;
  [FIELD_NAMES.CHECK_IN]: FormControl<string>;
  [FIELD_NAMES.CHECK_OUT]: FormControl<string>;
  [FIELD_NAMES.NUMBER_OF_GUESTS]: FormControl<string>;
  [FIELD_NAMES.MIN_PRICE]: FormControl<string>;
  [FIELD_NAMES.MAX_PRICE]: FormControl<string>;
}

