import { useState } from 'react'
import { useCreateSchool } from '@/services/admin/schools'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { Stack } from '@mui/system'
import type { NextPage } from 'next'
import Papa from 'papaparse'
import { useRouter } from 'next/router'
import PrivateLayout from '@/ui/templates/PrivateLayout'
import { ISchoolQ } from '@/services/app/search/schools/interfaces'
import GridSchools from './table'

import * as S from '../../../styles/gestao/autoescolas'

const allowedExtensions = ['csv']

function Home(_props: NextPage) {
  const [schoolsUpload, setSchoolsUpload] = useState<any[]>()
  const [error, setError] = useState('')
  const [file, setFile] = useState<Blob>()

  const router = useRouter()

  const {
    isLoading: createIsLoading,
    isSuccess: createSuccess,
    mutate: createSchool,
  } = useCreateSchool(
    () => toast.success('Autoescolas criadas com sucesso!'),
    () => toast.error('Ops! Tente novamente.')
  )

  const handleFileChange = (e: any) => {
    setError('')
    if (e.target.files.length) {
      const inputFile = e.target.files[0]
      const fileExtension = inputFile?.type.split('/')[1]
      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a csv file')
        return
      }
      setFile(inputFile)
    }
  }
  const handleParse = () => {
    if (!file) return setError('Enter a valid file')
    const reader = new FileReader()
    reader.onload = async ({ target }: any) => {
      const csv = Papa.parse(target?.result, { header: true }) as any
      const parsedData = csv?.data
      const schools: ISchoolQ[] = [{}]

      parsedData.map((school: any) => {
        return schools.push({
          name: school.nomeSocial,
          address_city: school.municipio,
          address_district: school.bairro,
          address_number: school.numero,
          address_uf: 'São Paulo',
          differential_course_recycle: school.reciclagem === 'Sim',
          differential_simulator: school.simulador === 'Sim',
          differential_special_person: school.pessoComDeficiencia === 'Sim',
          phone: school.telefone,
          quantity_media_approved: school.mediaAprovados,
          ratings_media_education: school.mediaEnsino,
          ratings_media_general: school.mediaGeral,
          ratings_media_instalations: school.mediaInstalacoes,
          ratings_media_localization: school.mediaLocalizacao,
          ratings_media_price: school.mediaPreco,
          ratings_media_schedule: school.mediaAgenda,
          ratings_media_support: school.mediaAtendimento,
          ratings_media_transparence: school.mediaTransparencia,
          ratings_quantity: school.qtdAvaliacoes,
        })
      })
      setSchoolsUpload(schools)
    }
    return reader.readAsText(file)
  }

  return (
    <PrivateLayout title="Autoescolas">
      <S.Container>
        <Stack height="100%">
          <input
            onChange={handleFileChange}
            id="csvInput"
            name="file"
            type="File"
          />
          <div>
            <Button variant="contained" onClick={handleParse}>
              Analisar
            </Button>
          </div>
          {schoolsUpload && (
            <Button
              variant="contained"
              color="error"
              onClick={() => createSchool(schoolsUpload)}
            >
              Cadastrar {schoolsUpload.length} autoescolas
            </Button>
          )}
        </Stack>
        <Stack height="100%">
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/gestao/autoescolas/cadastrar')}
          >
            Nova autoescola
          </Button>
        </Stack>
        <GridSchools />
      </S.Container>
    </PrivateLayout>
  )
}

export default Home
