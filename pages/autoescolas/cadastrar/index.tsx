import { useState, useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import PrivateLayout from '@/ui/PrivateLayout'

import { Button, TextField } from '@mui/material'
import { useRouter } from 'next/router'

import Grid from '@/ui/atoms/Grid'
import MediaQuery from '@/ui/utils/MediaQuery'

import { useForm } from "react-hook-form";
import { schoolSchema } from './school.schema'
import { yupResolver } from "@hookform/resolvers/yup";

import toast, { Toaster } from 'react-hot-toast';

import * as S from './styles'
import { useCreateSchool } from '@/services/admin/schools'

const NewSchool: NextPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schoolSchema)
  });
  const router = useRouter()

  const firstInputRef = useRef()

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
  };

  useEffect(() => {
    if (!!Object.keys(errors).length) toast.error('Corrija os campos em vermelho.')
  }, [errors])

  useEffect(() => {
    if (success) reset()
  }, [success])
  
  return (
    <PrivateLayout title='Nova autoescola'>
      <S.Form onSubmit={handleSubmit(onSubmitHandler)}>
        <MediaQuery
        desktop={<>
          <Grid columns='1fr' gap={2}>
            <TextField
            autoFocus
            {...register("name")}
            label="Nome"
            helperText={getErrorMessage(errors.name?.message)}
            error={!!errors.name?.message}
            />
          </Grid>
        </>}
        mobile={<>
          <Grid columns='1fr' gap={2}>
          <TextField
            {...register("name")}
            label="Nome"
            helperText={getErrorMessage(errors.name?.message)}
            error={!!errors.name?.message}
          />
          </Grid>
        </>
        }
        />
        <MediaQuery
        desktop={<>
          <Grid columns="220px 1fr 1fr" gap={2}>
            <TextField
            label="Telefone"
            {...register("phone")}
            helperText={getErrorMessage(errors.phone?.message)}
            error={!!errors.phone?.message}
            />
            <TextField
              {...register("whatsapp")}
              label="Whatsapp (opcional)"
              helperText={getErrorMessage(errors.whatsapp?.message)}
              error={!!errors.whatsapp?.message}
              />
            <TextField
              {...register("instagram")}
              label="Instagram (opcional)"
              helperText={getErrorMessage(errors.instagram?.message)}
              error={!!errors.instagram?.message}
            />
          </Grid>
        </>}
        mobile={<>
          <Grid columns="1fr" gap={2}>
            <TextField
            label="Telefone"
            {...register("phone")}
            helperText={getErrorMessage(errors.phone?.message)}
            error={!!errors.phone?.message}
            />
            <TextField
              {...register("whatsapp")}
              label="Whatsapp (opcional)"
              helperText={getErrorMessage(errors.whatsapp?.message)}
              error={!!errors.whatsapp?.message}
              />
            <TextField
              {...register("instagram")}
              label="Instagram (opcional)"
              helperText={getErrorMessage(errors.instagram?.message)}
              error={!!errors.instagram?.message}
            />
          </Grid>
        </>}
        />
        <MediaQuery
          desktop={<>
          <Grid columns="220px 120px 2fr" gap={2}>
            <TextField
            {...register("address_postal")}
            label="CEP"
            helperText={getErrorMessage(errors.address_postal?.message)}
            error={!!errors.address_postal?.message}
            />
            <TextField
            {...register("address_uf")}
            label="Estado"
            helperText={getErrorMessage(errors.address_uf?.message)}
            error={!!errors.address_uf?.message}
            />
            <TextField
            {...register("address_city")}
            label="Cidade"
            helperText={getErrorMessage(errors.address_city?.message)}
            error={!!errors.address_city?.message}
            />
          </Grid>
          </>}
          mobile={<>
          <Grid columns="1fr" gap={2}>
            <TextField
            {...register("address_postal")}
            label="CEP"
            helperText={getErrorMessage(errors.address_postal?.message)}
            error={!!errors.address_postal?.message}
            />
            <TextField
            {...register("address_uf")}
            label="Estado"
            helperText={getErrorMessage(errors.address_uf?.message)}
            error={!!errors.address_uf?.message}
            />
            <TextField
            {...register("address_city")}
            label="Cidade"
            helperText={getErrorMessage(errors.address_city?.message)}
            error={!!errors.address_city?.message}
            />
          </Grid>
          </>
          }
        />

        <MediaQuery
          desktop={<>
          <Grid columns="1fr 1fr" gap={2}>
            <TextField
            {...register("address_district")}
            label="Bairro"
            helperText={getErrorMessage(errors.address_district?.message)}
            error={!!errors.address_district?.message}
            />
            <TextField
            {...register("address_number")}
            label="Número"
            helperText={getErrorMessage(errors.address_number?.message)}
            error={!!errors.address_number?.message}
            />
          </Grid>
          </>}
          mobile={<>
            <Grid columns="1fr" gap={2}>
              <TextField
              {...register("address_district")}
              label="Bairro"
              helperText={getErrorMessage(errors.address_district?.message)}
              error={!!errors.address_district?.message}
              />
              <TextField
              {...register("address_number")}
              label="Número"
              helperText={getErrorMessage(errors.address_number?.message)}
              error={!!errors.address_number?.message}
              />
            </Grid>
            </>}
        />

        <Grid columns='1fr 1fr' gap={2}>
          <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => router.push('/autoescolas/')}
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
    </PrivateLayout>
  )
}

export default NewSchool
