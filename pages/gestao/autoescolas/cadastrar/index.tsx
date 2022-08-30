import { useRouter } from 'next/router'
import { useEffect } from 'react'

import ṔrivateLayout from '@/ui/templates/PrivateLayout'
import ComboBox from '@/ui/atoms/ComboBox'
import { Button, TextField } from '@mui/material'

import Grid from '@/ui/atoms/Grid'
import MediaQuery from '@/ui/utils/MediaQuery'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast, { Toaster } from 'react-hot-toast'

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
  const router = useRouter()

  const {
    register,
    handleSubmit,
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

  const onSubmitHandler = (data: any) => {
    createSchool(data)
  }

  useEffect(() => {
    if (Object.keys(errors).length) toast.error('Corrija os campos vermelhos.')
  }, [errors])

  useEffect(() => {
    if (success) reset()
  }, [success])

  return (
    <ṔrivateLayout title="Nova autoescola">
      <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
        <MediaQuery
          desktop={
            <Grid columns="1fr" gap={2}>
              <TextField
                autoFocus
                {...register('name')}
                label="Nome da autoescola"
                variant="standard"
                helperText={getErrorMessage(errors.name?.message)}
                error={!!errors.name?.message}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                {...register('name')}
                label="Nome"
                variant="standard"
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
                {...register('phone')}
                variant="standard"
                helperText={getErrorMessage(errors.phone?.message)}
                error={!!errors.phone?.message}
              />
              <TextField
                {...register('whatsapp')}
                label="Whatsapp (opcional)"
                variant="standard"
                helperText={getErrorMessage(errors.whatsapp?.message)}
                error={!!errors.whatsapp?.message}
              />
              <TextField
                {...register('instagram')}
                label="Instagram (opcional)"
                variant="standard"
                helperText={getErrorMessage(errors.instagram?.message)}
                error={!!errors.instagram?.message}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                label="Telefone"
                {...register('phone')}
                variant="standard"
                helperText={getErrorMessage(errors.phone?.message)}
                error={!!errors.phone?.message}
              />
              <TextField
                {...register('whatsapp')}
                label="Whatsapp (opcional)"
                variant="standard"
                helperText={getErrorMessage(errors.whatsapp?.message)}
                error={!!errors.whatsapp?.message}
              />
              <TextField
                {...register('instagram')}
                label="Instagram (opcional)"
                variant="standard"
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
                {...register('address_postal')}
                label="CEP"
                variant="standard"
                helperText={getErrorMessage(errors.address_postal?.message)}
                error={!!errors.address_postal?.message}
              />
              <ComboBox
                label="Estado"
                options={UF_LIST}
                {...register('address_uf')}
              />
              <TextField
                {...register('address_city')}
                label="Cidade"
                variant="standard"
                helperText={getErrorMessage(errors.address_city?.message)}
                error={!!errors.address_city?.message}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                {...register('address_postal')}
                label="CEP"
                variant="standard"
                helperText={getErrorMessage(errors.address_postal?.message)}
                error={!!errors.address_postal?.message}
              />
              <TextField
                {...register('address_uf')}
                label="Estado"
                variant="standard"
                helperText={getErrorMessage(errors.address_uf?.message)}
                error={!!errors.address_uf?.message}
              />
              <TextField
                {...register('address_city')}
                label="Cidade"
                variant="standard"
                helperText={getErrorMessage(errors.address_city?.message)}
                error={!!errors.address_city?.message}
              />
            </Grid>
          }
        />

        <MediaQuery
          desktop={
            <Grid columns="1fr 1fr" gap={2}>
              <TextField
                {...register('address_district')}
                label="Bairro"
                variant="standard"
                helperText={getErrorMessage(errors.address_district?.message)}
                error={!!errors.address_district?.message}
              />
              <TextField
                {...register('address_number')}
                label="Número"
                variant="standard"
                helperText={getErrorMessage(errors.address_number?.message)}
                error={!!errors.address_number?.message}
              />
            </Grid>
          }
          mobile={
            <Grid columns="1fr" gap={2}>
              <TextField
                {...register('address_district')}
                label="Bairro"
                variant="standard"
                helperText={getErrorMessage(errors.address_district?.message)}
                error={!!errors.address_district?.message}
              />
              <TextField
                {...register('address_number')}
                label="Número"
                variant="standard"
                helperText={getErrorMessage(errors.address_number?.message)}
                error={!!errors.address_number?.message}
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
