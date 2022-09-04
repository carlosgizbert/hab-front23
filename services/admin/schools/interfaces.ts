export interface ISchoolDTO {
  id: string
  cnpj: string
  situation: string
  type: string
  name_fantasy: string
  name_social: string
  name: string

  address: string
  address_number: string
  address_district: string
  address_city: string
  address_uf: string
  address_postal: string

  address_lat: string
  address_long: string

  quantity_media_approved: string
  differential_special_person: boolean
  differential_course_recycle: boolean
  differential_simulator: boolean

  ratings_media_education: string
  ratings_media_transparence: string
  ratings_media_instalations: string
  ratings_media_support: string
  ratings_media_schedule: string
  ratings_media_price: string
  ratings_media_localization: string
  ratings_media_general: string
  ratings_quantity: string

  phone: string
  whatsapp: string
  instagram: string
}

export interface ISchoolR {
  _id: string
  cnpj: string
  situation: string
  type: string
  name_fantasy: string
  name_social: string
  name: string

  address: string
  address_number: string
  address_district: string
  address_city: string
  address_uf: string
  address_postal: string

  address_lat: string
  address_long: string

  quantity_media_approved: string
  differential_special_person: boolean
  differential_course_recycle: boolean
  differential_simulator: boolean

  ratings_media_education: string
  ratings_media_transparence: string
  ratings_media_instalations: string
  ratings_media_support: string
  ratings_media_schedule: string
  ratings_media_price: string
  ratings_media_localization: string
  ratings_media_general: string
  ratings_quantity: string

  phone: string
  whatsapp: string
  instagram: string
}
