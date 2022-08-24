import { useEffect, useMemo, useState } from "react";
import { useDeleteSchool, useGetSchools } from "@/services/admin/schools";
import { ISchool } from "@/services/admin/schools/interfaces";
import { DataGrid, GridActionsCellItem} from "@mui/x-data-grid";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import ModalDialog from "@/ui/organism/ModalDialog";

export default function GridSchools() {
  const [rows, setRows] = useState<ISchool[]>([])
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

  const editSchool = (id: string) => router.push('/autoescolas/cadastrar')

  const openConfirmDelete = (id: string) => {
    setCid(id)
    setModalOpen(true)
  }

  const columns = useMemo(
    () => [
      { field: 'name', headerName: 'Nome', type: 'string', width: 200 },
      { field: 'uf', headerName: 'UF', type: 'string' },
      { field: 'address_city', headerName: 'Cidade', type: 'string', width: 200 },
      { field: 'address_postal', headerName: 'CEP', type: 'string', width: 120 },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<EditRoundedIcon />}
            label="Editar"
            onClick={() => editSchool(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteRoundedIcon />}
            label="Apagar"
            onClick={() => openConfirmDelete(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [editSchool, openConfirmDelete],
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