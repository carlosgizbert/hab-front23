import * as yup from 'yup'

export const schoolSchema = yup.object().shape({
  name: yup.string().required("Insira o nome."),
  phone: yup.string().required(),
  whatsapp: yup.string().required(),
  instagram: yup.string().required(),
  address_uf: yup.string().required(),
  address_city: yup.string().required(),
  address_district: yup.string().required(),
  address_postal: yup.string().required(),
  address_number: yup.string().required(),
});