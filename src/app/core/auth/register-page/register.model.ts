import { FormControl } from '@angular/forms';
import { FIELD_NAMES } from "../../constants/validations-constants";

export interface RegisterForm {
  [FIELD_NAMES.EMAIL]: FormControl<string>;
  [FIELD_NAMES.PASSWORD]: FormControl<string>;
  [FIELD_NAMES.CONFIRM_PASSWORD]: FormControl<string>;
}