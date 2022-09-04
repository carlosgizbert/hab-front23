import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PrivateLayout from '@/ui/templates/PrivateLayout'
import Grid from '@/ui/atoms/Grid'
import MediaQuery from '@/ui/utils/MediaQuery'
import toast, { Toaster } from 'react-hot-toast'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useGetSchools, useUpdateSchool } from '@/services/admin/schools'
import { ISchoolDTO } from '@/services/admin/schools/interfaces'

import { Button, TextField } from '@mui/material'
import { schoolSchema } from '../../../../schemas/school'

import * as S from '../../../../styles/gestao/autoescolas/editar'

function NewSchool() {
  const [latLong, setLatLong] = useState({ lat: '0', long: '0' })

  const router = useRouter()
  const { id } = router.query

  const [school, setSchool] = useState<ISchoolDTO>()

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

  const { data: getSchool, isLoading: getIsLoading } = useGetSchools({
    _id: String(id),
  })

  const { isLoading: updateLoading, mutate: updateSchool } = useUpdateSchool(
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
    if (getSchool) setSchool(getSchool[0])
  }, [getSchool])

  useEffect(() => {
    reset(school)
  }, [school])

  useEffect(() => {
    if (Object.keys(errors).length) toast.error('Corrija os campos vermelhos.')
  }, [errors])

  return (
    <PrivateLayout title="Editar autoescola">
      <S.Form onSubmit={handleFormSubmit(onSubmitHandler)}>
        {school && (
          <>
            <MediaQuery
              desktop={
                <Grid columns="1fr" gap={2}>
                  <TextField
                    {...formRegister('name')}
                    label="Nome"
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
                    label="Whatsapp"
                    helperText={getErrorMessage(errors.whatsapp?.message)}
                    error={!!errors.whatsapp?.message}
                  />
                  <TextField
                    {...formRegister('instagram')}
                    label="Instagram"
                    helperText={getErrorMessage(errors.instagram?.message)}
                    error={!!errors.instagram?.message}
                  />
                </Grid>
              }
              mobile={
                <>
                  <TextField
                    label="Telefone"
                    {...formRegister('phone')}
                    helperText={getErrorMessage(errors.phone?.message)}
                    error={!!errors.phone?.message}
                  />
                  <TextField
                    {...formRegister('whatsapp')}
                    label="Whatsapp"
                    helperText={getErrorMessage(errors.whatsapp?.message)}
                    error={!!errors.whatsapp?.message}
                  />
                  <TextField
                    {...formRegister('instagram')}
                    label="Instagram"
                    helperText={getErrorMessage(errors.instagram?.message)}
                    error={!!errors.instagram?.message}
                  />
                </>
              }
            />
            <MediaQuery
              desktop={
                <Grid columns="1fr 1fr 1fr" gap={2}>
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
              mobile={
                <>
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
                </>
              }
            />

            <MediaQuery
              desktop={
                <Grid columns="1fr 1fr 1FR 1FR" gap={2}>
                  <TextField
                    {...formRegister('address_district')}
                    label="Bairro"
                    helperText={getErrorMessage(
                      errors.address_district?.message
                    )}
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
                <>
                  <TextField
                    {...formRegister('address_district')}
                    label="Bairro"
                    helperText={getErrorMessage(
                      errors.address_district?.message
                    )}
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
                    variant="standard"
                    helperText={getErrorMessage(errors.address_lat?.message)}
                    error={!!errors.address_lat?.message}
                  />
                  <TextField
                    {...formRegister('address_long')}
                    label="Latitude"
                    variant="standard"
                    helperText={getErrorMessage(errors.address_long?.message)}
                    error={!!errors.address_long?.message}
                  />
                </>
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
                disabled={getIsLoading || updateLoading}
              >
                Salvar
              </Button>
            </Grid>
          </>
        )}
      </S.Form>
      <Toaster />
    </PrivateLayout>
  )
}

export default NewSchool
