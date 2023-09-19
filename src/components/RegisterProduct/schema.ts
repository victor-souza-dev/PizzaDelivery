import * as yup from "yup";

export const schemaProduct = yup.object({
  description: yup.string().required("Campo obrigatório!"),
  type: yup.string().required("Campo obrigatório!"),
  unitaryValue: yup
    .string()
    .matches(/^[0-9]+(?:,[0-9]+)?$/, "Somente números!")
    .required("Campo obrigatório!"),
});
