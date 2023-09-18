import { dateInfo } from "@/utils/dateInfo";
import * as yup from "yup";

const {
  currentDate,
  minDate,
  format: { br },
} = dateInfo();

export const schemaRegisterUser = yup.object({
  cpf: yup
    .string()
    .required("Campo obrigatório!")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF inválido! (formato aceito: 000.000.000-00)"
    ),
  birthDate: yup
    .date()
    .required("Campo obrigatório!")
    .max(currentDate, `A data não pode ser superior à ${br}`)
    .min(minDate, "A data não pode ser inferior a 1950"),
  name: yup.string().required("Campo obrigatório!"),
});
