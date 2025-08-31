import { FormControl } from "@angular/forms";
import { FIELD_NAMES } from "../../constants/validations-constants";

export interface LoginForm {
  [FIELD_NAMES.EMAIL]: FormControl<string>;
  [FIELD_NAMES.PASSWORD]: FormControl<string>;
}