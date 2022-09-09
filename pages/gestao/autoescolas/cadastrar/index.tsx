import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ṔrivateLayout from '@/ui/templates/PrivateLayout'
// import ComboBox from '@/ui/atoms/ComboBox'
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

import Grid from '@/ui/atoms/Grid'
import MediaQuery from '@/ui/utils/MediaQuery'

import Geocode from 'react-geocode'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast, { Toaster } from 'react-hot-toast'
import { useCreateSchool } from '@/services/admin/schools'
import { useGetRagionByCep } from '@/services/common/region'
import { schoolSchema } from '../../../../schemas/school'

import * as S from '../../../../styles/gestao/autoescolas/cadastrar'

// const UF_LIST = [
//   { label: 'AC - Acre', value: 'AC' },
//   { label: 'AL - Alagoas', value: 'AL' },
//   { label: 'AP - Amapá', value: 'AP' },
//   { label: 'AM - Amazonas', value: 'AM' },
//   { label: 'BA - Bahia', value: 'BA' },
//   { label: 'CE - Ceará', value: 'CE' },
//   { label: 'DF - Distrito Federal', value: 'DF' },
//   { label: 'ES - Espirito Santo', value: 'ES' },
//   { label: 'GO - Goiás', value: 'GO' },
//   { label: 'MA - Maranhão', value: 'MA' },
//   { label: 'MT - Mato Grosso', value: 'MT' },
//   { label: 'MS - Mato Grosso do Sul', value: 'MS' },
//   { label: 'MG - Minas Gerais', value: 'MG' },
//   { label: 'PA - Pará', value: 'PA' },
//   { label: 'PB - Paraíba', value: 'PB' },
//   { label: 'PR - Paraná', value: 'PR' },
//   { label: 'PE - Pernambuco', value: 'PE' },
//   { label: 'PI - Piauí', value: 'PI' },
//   { label: 'RJ - Rio de Janeiro', value: 'RJ' },
//   { label: 'RN - Rio Grande do Norte', value: 'RN' },
//   { label: 'RS - Rio Grande do Sul', value: 'RS' },
//   { label: 'RO - Rondônia', value: 'RO' },
//   { label: 'RR - Roraima', value: 'RR' },
//   { label: 'SC - Santa Catarina', value: 'SC' },
//   { label: 'SP - São Paulo', value: 'SP' },
//   { label: 'SE - Sergipe', value: 'SE' },
//   { label: 'TO - Tocantins', value: 'TO' },
// ]

Geocode.setApiKey('AIzaSyDbL7Ty4i6Dbu76TaWN_8WQxWOFuI3zq6E')
Geocode.setLanguage('pt-br')
Geocode.setRegion('br')
Geocode.setLocationType('APPROXIMATE')

function NewSchool() {
  const [differentials, setDifferentials] = useState({
    differential_simulator: false,
    differential_course_recycle: false,
    differential_special_person: false,
    differential_special_ticket: false,
    differential_student_at_home: false,
  })
  const router = useRouter()

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

  const {
    isLoading: loading,
    isSuccess: success,
    mutate: createSchool,
  } = useCreateSchool(
    () => toast.success('Autoescola criada com sucesso!'),
    () => toast.error('Ops! Tente novamente.')
  )

  const { data: getRegion, refetch: getRegionRefetch } = useGetRagionByCep(
    getFormValues('address_postal')
  )

  const getErrorMessage = (msg: any) => {
    if (msg) return msg
    return ''
  }

  const onSubmitHandler = (data: any) => {
    const payload = {
      ...data,
      ...differentials,
    }
    createSchool(payload)
  }

  useEffect(() => {
    if (getRegion) {
      setFormValue('address_uf', getRegion.uf)
      setFormValue('address_city', getRegion.localidade)
      setFormValue('address_district', getRegion.bairro)
    }
  }, [getRegion])

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
                onBlur={() => getRegionRefetch()}
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
                onBlur={() => getRegionRefetch()}
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
              <FormGroup>
                <Controller
                  name="differential_simulator"
                  control={formControl}
                  render={() => (
                    <FormControlLabel
                      label="Possui simulador"
                      control={
                        <Checkbox
                          value="teste"
                          checked={differentials.differential_simulator}
                          onChange={(event, checked) =>
                            setDifferentials((s) => ({
                              ...s,
                              differential_simulator: checked,
                            }))
                          }
                        />
                      }
                    />
                  )}
                />
                <Controller
                  name="differential_course_recycle"
                  control={formControl}
                  render={() => (
                    <FormControlLabel
                      label="Possui curso de reciclagem"
                      control={
                        <Checkbox
                          value="teste"
                          checked={differentials.differential_course_recycle}
                          onChange={(event, checked) =>
                            setDifferentials((s) => ({
                              ...s,
                              differential_course_recycle: checked,
                            }))
                          }
                        />
                      }
                    />
                  )}
                />
                <Controller
                  name="differential_special_person"
                  control={formControl}
                  render={() => (
                    <FormControlLabel
                      label="Atende pessoa deficiente"
                      control={
                        <Checkbox
                          value="teste"
                          checked={differentials.differential_special_person}
                          onChange={(event, checked) =>
                            setDifferentials((s) => ({
                              ...s,
                              differential_special_person: checked,
                            }))
                          }
                        />
                      }
                    />
                  )}
                />
              </FormGroup>
            </FormControl>
          </div>
          <div>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Diferenciais premium</FormLabel>
              <FormGroup>
                <Controller
                  name="differential_special_ticket"
                  control={formControl}
                  render={() => (
                    <FormControlLabel
                      label="Parcela no boleto"
                      control={
                        <Checkbox
                          value="teste"
                          checked={differentials.differential_special_ticket}
                          onChange={(event, checked) =>
                            setDifferentials((s) => ({
                              ...s,
                              differential_special_ticket: checked,
                            }))
                          }
                        />
                      }
                    />
                  )}
                />
                <Controller
                  name="differential_student_at_home"
                  control={formControl}
                  render={() => (
                    <FormControlLabel
                      label="Busca aluno em casa"
                      control={
                        <Checkbox
                          value="teste"
                          checked={differentials.differential_student_at_home}
                          onChange={(event, checked) =>
                            setDifferentials((s) => ({
                              ...s,
                              differential_student_at_home: checked,
                            }))
                          }
                        />
                      }
                    />
                  )}
                />
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
                  InputProps={{ inputProps: { min: 0 } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_general')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_education')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_instalations')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_support')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
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
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('quantity_media_approved')}
                  InputProps={{ inputProps: { min: 0, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_transparence')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_price')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
                  size="small"
                  type="number"
                  style={{ width: 120 }}
                />
              </div>
              <div style={{ height: '40px' }}>
                <TextField
                  {...formRegister('ratings_media_localization')}
                  InputProps={{ inputProps: { min: 0, max: 5, step: '0.10' } }}
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
