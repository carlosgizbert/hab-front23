import { useEffect, useMemo, useState } from "react";
import { useDeleteSchool, useGetSchools } from "@/services/admin/schools";
import { ISchoolDTO } from "@/services/admin/schools/interfaces";
import { DataGrid, GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import ModalDialog from "@/ui/organism/ModalDialog";
import { Stack } from "@mui/material";

export default function GridSchools() {
  const [rows, setRows] = useState<ISchoolDTO[]>([])
  const [modalOpen, setModalOpen] = useState(false);
  const {data: getSchools, isLoading: loading} = useGetSchools()
  const [cId, setCid] = useState<string>('')

  const router = useRouter()

  const {
    mutate: deleteSchool,
    error,
    isLoading,
  } = useDeleteSchool(
    cId,
    () => {
      setModalOpen(false)
      toast.success('Autoescola excluída com sucesso!')
    },
    () => {
      toast.error('Ops! Erro ao tentar excluir autoescola!')
    }
  )

  const goEditRefund = (id: string) => {
    router.push({
      pathname: '/autoescolas/editar/[id]',
      query: { id },
    })
  }

  const openConfirmDelete = (id: string) => {
    setCid(id)
    setModalOpen(true)
  }

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Nome', type: 'string', width: 200 },
      { field: 'address_uf', headerName: 'UF', type: 'string' },
      { field: 'address_city', headerName: 'Cidade', type: 'string', width: 200 },
      { field: 'address_postal', headerName: 'CEP', type: 'string', width: 120 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            label="Editar"
            onClick={() => goEditRefund(String(params.id))}
          />,
          <GridActionsCellItem
            icon={<DeleteRoundedIcon />}
            label="Apagar"
            onClick={() => openConfirmDelete(String(params.id))}
            showInMenu
          />,
        ],
      },
    ],
    [goEditRefund, openConfirmDelete],
  )

  useEffect(() => {
    if (getSchools) setRows(getSchools)
  }, [getSchools])

  return (
    <div style={{ height: 640, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Nenhuma autoescola cadastrada, por enquanto...
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Nenhum resultado encontrado.
            </Stack>
          )
        }}
      />
      {modalOpen && (
      <ModalDialog
        title="Apagar autoescola"
        text="Tem certeza que deseja apagar permanentemente?"
        callbackAgree={() => deleteSchool()}
        callbackDisagree={() => setModalOpen(false)}
      />
      )}
      <Toaster />
    </div>
  )
}