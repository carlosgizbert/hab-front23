import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ṔrivateLayout from '@/ui/templates/PrivateLayout'
// import ComboBox from '@/ui/atoms/ComboBox'
import { Button, TextField } from '@mui/material'

import Grid from '@/ui/atoms/Grid'
import MediaQuery from '@/ui/utils/MediaQuery'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast, { Toaster } from 'react-hot-toast'

import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { useCreateSchool } from '@/services/admin/schools'
import { schoolSchema } from '../../../../schemas/school'

import * as S from '../../../../styles/gestao/autoescolas/cadastrar'

const UF_LIST = [
  { label: 'AC - Acre', value: 'AC' },
  { label: 'AL - Alagoas', value: 'AL' },
  { label: 'AP - Amapá', value: 'AP' },
  { label: 'AM - Amazonas', value: 'AM' },
  { label: 'BA - Bahia', value: 'BA' },
  { label: 'CE - Ceará', value: 'CE' },
  { label: 'DF - Distrito Federal', value: 'DF' },
  { label: 'ES - Espirito Santo', value: 'ES' },
  { label: 'GO - Goiás', value: 'GO' },
  { label: 'MA - Maranhão', value: 'MA' },
  { label: 'MT - Mato Grosso', value: 'MT' },
  { label: 'MS - Mato Grosso do Sul', value: 'MS' },
  { label: 'MG - Minas Gerais', value: 'MG' },
  { label: 'PA - Pará', value: 'PA' },
  { label: 'PB - Paraíba', value: 'PB' },
  { label: 'PR - Paraná', value: 'PR' },
  { label: 'PE - Pernambuco', value: 'PE' },
  { label: 'PI - Piauí', value: 'PI' },
  { label: 'RJ - Rio de Janeiro', value: 'RJ' },
  { label: 'RN - Rio Grande do Norte', value: 'RN' },
  { label: 'RS - Rio Grande do Sul', value: 'RS' },
  { label: 'RO - Rondônia', value: 'RO' },
  { label: 'RR - Roraima', value: 'RR' },
  { label: 'SC - Santa Catarina', value: 'SC' },
  { label: 'SP - São Paulo', value: 'SP' },
  { label: 'SE - Sergipe', value: 'SE' },
  { label: 'TO - Tocantins', value: 'TO' },
]

function NewSchool() {
  const [latLong, setLatLong] = useState({ lat: '0', long: '0' })

  const router = useRouter()

  const {
    register: formRegister,
    handleSubmit: handleFormSubmit,
    getValues: getFormValues,
    setValue: setFormValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schoolSchema),
  })

  const {
    isLoading: loading,
    isSuccess: success,
    mutate: createSchool,
  } = useCreateSchool(
    () => toast.success('Autoescola criada com sucesso!'),
    () => toast.error('Ops! Tente novamente.')
  )

  const getErrorMessage = (msg: any) => {
    if (msg) return msg
    return ''
  }

  const getLatLong = async () => {
    const {
      address_postal: postal,
      address_number: number,
      address_uf: uf,
      address_city: city,
      address_district: district,
    } = getFormValues()

    if (postal || number || uf || city || district) {
      await geocodeByAddress(
        ` ${postal}, ${number}, ${district}, ${city}, ${uf}`
      )
        .then((results: any) => getLatLng(results[0]))
        .then(({ lat, lng }) =>
          setLatLong({ lat: String(lat), long: String(lng) })
        )
      setFormValue('address_lat', latLong.lat, { shouldValidate: true })
      setFormValue('address_long', latLong.long, { shouldValidate: true })
    }
  }

  const onSubmitHandler = (data: any) => {
    const payload = {
      ...data,
      ...latLong,
    }
    createSchool(payload)
  }

  useEffect(() => {
    if (Object.keys(errors).length) toast.error('Corrija os campos vermelhos.')
  }, [errors])

  useEffect(() => {
    if (success) reset()
  }, [success])

  return (
    <ṔrivateLayout title="Nova autoescola">
      <S.Form onSubmit={handleFormSubmit(onSubmitHandler)}>
        <MediaQuery
          desktop={
            <Grid columns="1fr" gap={2}>
              <TextField
                autoFocus
                {...formRegister('name')}
                label="Nome da autoescola"
                helperText={getErrorMessage(errors.name?.message)}
                error={!!errors.name?.message}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                {...formRegister('name')}
                label="Nome"
                helperText={getErrorMessage(errors.name?.message)}
                error={!!errors.name?.message}
              />
            </Grid>
          }
        />
        <MediaQuery
          desktop={
            <Grid columns="220px 1fr 1fr" gap={2}>
              <TextField
                label="Telefone"
                {...formRegister('phone')}
                helperText={getErrorMessage(errors.phone?.message)}
                error={!!errors.phone?.message}
              />
              <TextField
                {...formRegister('whatsapp')}
                label="Whatsapp (opcional)"
                helperText={getErrorMessage(errors.whatsapp?.message)}
                error={!!errors.whatsapp?.message}
              />
              <TextField
                {...formRegister('instagram')}
                label="Instagram (opcional)"
                helperText={getErrorMessage(errors.instagram?.message)}
                error={!!errors.instagram?.message}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                label="Telefone"
                {...formRegister('phone')}
                helperText={getErrorMessage(errors.phone?.message)}
                error={!!errors.phone?.message}
              />
              <TextField
                {...formRegister('whatsapp')}
                label="Whatsapp (opcional)"
                helperText={getErrorMessage(errors.whatsapp?.message)}
                error={!!errors.whatsapp?.message}
              />
              <TextField
                {...formRegister('instagram')}
                label="Instagram (opcional)"
                helperText={getErrorMessage(errors.instagram?.message)}
                error={!!errors.instagram?.message}
              />
            </Grid>
          }
        />
        <MediaQuery
          desktop={
            <Grid columns="1fr 1fr 2fr" gap={2}>
              <TextField
                {...formRegister('address_postal')}
                label="CEP"
                helperText={getErrorMessage(errors.address_postal?.message)}
                error={!!errors.address_postal?.message}
                onBlur={() => getLatLong()}
              />
              {/* <ComboBox
                label="Estado"
                options={UF_LIST}
                {...formRegister('address_uf')}
              /> */}
              <TextField
                {...formRegister('address_uf')}
                label="Estado"
                helperText={getErrorMessage(errors.address_uf?.message)}
                error={!!errors.address_uf?.message}
                onBlur={() => getLatLong()}
              />
              <TextField
                {...formRegister('address_city')}
                label="Cidade"
                helperText={getErrorMessage(errors.address_city?.message)}
                error={!!errors.address_city?.message}
                onBlur={() => getLatLong()}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                {...formRegister('address_postal')}
                label="CEP"
                helperText={getErrorMessage(errors.address_postal?.message)}
                error={!!errors.address_postal?.message}
                onBlur={() => getLatLong()}
              />
              <TextField
                {...formRegister('address_uf')}
                label="Estado"
                helperText={getErrorMessage(errors.address_uf?.message)}
                error={!!errors.address_uf?.message}
                onBlur={() => getLatLong()}
              />
              <TextField
                {...formRegister('address_city')}
                label="Cidade"
                helperText={getErrorMessage(errors.address_city?.message)}
                error={!!errors.address_city?.message}
                onBlur={() => getLatLong()}
              />
            </Grid>
          }
        />

        <MediaQuery
          desktop={
            <Grid columns="1fr 1fr 1fr 1fr" gap={2}>
              <TextField
                {...formRegister('address_district')}
                label="Bairro"
                helperText={getErrorMessage(errors.address_district?.message)}
                error={!!errors.address_district?.message}
                onBlur={() => getLatLong()}
              />
              <TextField
                {...formRegister('address_number')}
                label="Número"
                helperText={getErrorMessage(errors.address_number?.message)}
                error={!!errors.address_number?.message}
                onBlur={() => getLatLong()}
              />
              <TextField
                {...formRegister('address_lat')}
                label="Longitude"
                helperText={getErrorMessage(errors.address_lat?.message)}
                error={!!errors.address_lat?.message}
                onBlur={() => getLatLong()}
              />
              <TextField
                {...formRegister('address_long')}
                label="Latitude"
                helperText={getErrorMessage(errors.address_long?.message)}
                error={!!errors.address_long?.message}
                onBlur={() => getLatLong()}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                {...formRegister('address_district')}
                label="Bairro"
                helperText={getErrorMessage(errors.address_district?.message)}
                error={!!errors.address_district?.message}
              />
              <TextField
                {...formRegister('address_number')}
                label="Número"
                helperText={getErrorMessage(errors.address_number?.message)}
                error={!!errors.address_number?.message}
              />
              <TextField
                {...formRegister('address_lat')}
                label="Longitude"
                helperText={getErrorMessage(errors.address_lat?.message)}
                error={!!errors.address_lat?.message}
              />
              <TextField
                {...formRegister('address_long')}
                label="Latitude"
                helperText={getErrorMessage(errors.address_long?.message)}
                error={!!errors.address_long?.message}
              />
            </Grid>
          }
        />

        <Grid columns="1fr 1fr" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
          >
            Cadastrar
          </Button>
        </Grid>
      </S.Form>
      <Toaster />
    </ṔrivateLayout>
  )
}

export default NewSchool
