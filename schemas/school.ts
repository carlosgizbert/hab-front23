import * as yup from 'yup'

export const schoolSchema = yup.object().shape({
  name: yup.string().required('Insira o nome.'),
  phone: yup.string().required('Insira o telefone.'),
  whatsapp: yup.string(),
  instagram: yup.string(),
  address_uf: yup.string().required('Insira o estado.'),
  address_city: yup.string().required('Selecione a cidade.'),
  address_district: yup.string().required('Insira o bairro.'),
  address_postal: yup.string().required('Insira o CEP.'),
  address_number: yup.string().required('Insira o número.'),
  address_lat: yup.string().required('Insira o CEP.'),
  address_long: yup.string().required('Insira o número.'),
})
