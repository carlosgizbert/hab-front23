import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ṔrivateLayout from '@/ui/templates/PrivateLayout'
import Grid from '@/ui/atoms/Grid'
import MediaQuery from '@/ui/utils/MediaQuery'
import toast, { Toaster } from 'react-hot-toast'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useGetSchools, useUpdateSchool } from '@/services/admin/schools'
import { ISchoolDTO } from '@/services/admin/schools/interfaces'

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material'
import { schoolSchema } from '../../../../schemas/school'

import * as S from '../../../../styles/gestao/autoescolas/editar'

function NewSchool() {
  const [latLong, setLatLong] = useState({ lat: '0', long: '0' })

  const router = useRouter()
  const { id } = router.query

  const [school, setSchool] = useState<ISchoolDTO>()
  // const [differentials, setDifferentials] = useState({
  //   differential_simulator: false,
  //   differential_course_recycle: false,
  //   differential_special_person: false,
  //   differential_special_ticket: false,
  //   differential_student_at_home: false,
  // })

  const {
    control: formControl,
    register: formRegister,
    handleSubmit: handleFormSubmit,
    getValues: getFormValues,
    setValue: setFormValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schoolSchema),
  })

  const { data: getSchool, isLoading: getIsLoading } = useGetSchools({
    _id: String(id),
  })

  const { isLoading: loading, mutate: updateSchool } = useUpdateSchool(
    () => {
      toast.success('Autoescola atualizada com sucesso!')
    },
    () => toast.error('Erro ao atualizar, tente novamente.')
  )

  const getErrorMessage = (msg: any) => {
    if (msg) return msg
    return ''
  }

  // const getLatLong = async () => {
  //   const {
  //     address_postal: postal,
  //     address_number: number,
  //     address_uf: uf,
  //     address_city: city,
  //     address_district: district,
  //   } = getFormValues()

  //   if (postal || number || uf || city || district) {
  //     await geocodeByAddress(
  //       ` ${postal}, ${number}, ${district}, ${city}, ${uf}`
  //     )
  //       .then((results: any) => getLatLng(results[0]))
  //       .then(({ lat, lng }) =>
  //         setLatLong({ lat: String(lat), long: String(lng) })
  //       )
  //     setFormValue('address_lat', latLong.lat, { shouldValidate: true })
  //     setFormValue('address_long', latLong.long, { shouldValidate: true })
  //   }
  // }

  const onSubmitHandler = (data: any) => {
    const payload = {
      id,
      ...data,
      ...latLong,
    }
    if (id) updateSchool(payload) // mandar uma escola
  }

  useEffect(() => {
    if (getSchool) {
      setSchool(getSchool[0])
      // setDifferentials({
      //   differential_course_recycle: getSchool[0].differential_course_recycle,
      //   differential_simulator: getSchool[0].differential_simulator,
      //   differential_special_person: getSchool[0].differential_special_person,
      //   differential_special_ticket: getSchool[0].differential_special_ticket,
      //   differential_student_at_home: getSchool[0].differential_student_at_home,
      // })
    }
  }, [getSchool])

  useEffect(() => {
    reset(school)
  }, [school])

  useEffect(() => {
    if (Object.keys(errors).length) toast.error('Corrija os campos vermelhos.')
  }, [errors])

  return (
    <ṔrivateLayout title="Nova autoescola">
      <S.Form onSubmit={handleFormSubmit(onSubmitHandler)}>
        <MediaQuery
          desktop={
            <Grid columns="1fr 1fr" gap={2}>
              <TextField
                autoFocus
                {...formRegister('name')}
                label="Nome da autoescola"
                helperText={getErrorMessage(errors.name?.message)}
                error={!!errors.name?.message}
              />
              {/* <TextField
                type="file"
                {...formRegister('imgCover')}
                label="Imagem de capa"
                helperText={getErrorMessage(errors.imgCover?.message)}
                error={!!errors.imgCover?.message}
              /> */}
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
        <FormLabel>Endereço</FormLabel>
        <MediaQuery
          desktop={
            <Grid columns="1fr 1fr 2fr" gap={2}>
              <TextField
                {...formRegister('address_postal')}
                label="CEP"
                helperText={getErrorMessage(errors.address_postal?.message)}
                error={!!errors.address_postal?.message}
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
              />
              <TextField
                {...formRegister('address_city')}
                label="Cidade"
                helperText={getErrorMessage(errors.address_city?.message)}
                error={!!errors.address_city?.message}
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
              />
              <TextField
                {...formRegister('address_uf')}
                label="Estado"
                helperText={getErrorMessage(errors.address_uf?.message)}
                error={!!errors.address_uf?.message}
              />
              <TextField
                {...formRegister('address_city')}
                label="Cidade"
                helperText={getErrorMessage(errors.address_city?.message)}
                error={!!errors.address_city?.message}
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
          <div>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Diferenciais comuns</FormLabel>
              <div>
                <input
                  type="checkbox"
                  {...formRegister('differential_simulator')}
                />
                <FormLabel>Possui simulador</FormLabel>
              </div>
              <div>
                <input
                  type="checkbox"
                  {...formRegister('differential_course_recycle')}
                />
                <FormLabel>Possui curso de reciclagem</FormLabel>
              </div>
              <div>
                <input
                  type="checkbox"
                  {...formRegister('differential_special_person')}
                />
                <FormLabel>Atende pessoa deficiente</FormLabel>
              </div>
            </FormControl>
          </div>
          <div>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Diferenciais premium</FormLabel>
              <FormGroup>
                <div>
                  <input
                    type="checkbox"
                    {...formRegister('differential_special_ticket')}
                  />
                  <FormLabel>Parcela no boleto</FormLabel>
                </div>
                <div>
                  <input
                    type="checkbox"
                    {...formRegister('differential_student_at_home')}
                  />
                  <FormLabel>Busca aluno em casa</FormLabel>
                </div>
              </FormGroup>
            </FormControl>
          </div>
        </Grid>
        <FormLabel>Avaliações pelos alunos</FormLabel>
        <Grid columns="1fr 1fr" gap={2}>
          <Grid columns="1fr 1fr" gap={2}>
            <div>
              <FormGroup
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Total de avaliações</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Avaliação geral</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Educação</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Infraestrutura física</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Atendimento aos alunos</Typography>
                </div>
              </FormGroup>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_quantity')}
                  InputProps={{ inputProps: { min: 1 } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_general')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_education')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_instalations')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_support')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
            </div>
          </Grid>
          <Grid columns="1fr 1fr" gap={2}>
            <div>
              {/* <FormLabel component="legend" style={{ marginBottom: '1.5rem' }}>
                Avaliação dada pelos alunos (media)
              </FormLabel> */}
              <FormGroup
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Agenda de horários</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Aprovados anualmente</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Transparência</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Preços</Typography>
                </div>
                <div
                  style={{
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Localização</Typography>
                </div>
              </FormGroup>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_schedule')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('quantity_media_approved')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_transparence')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_price')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_localization')}
                  InputProps={{ inputProps: { min: 1, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
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
