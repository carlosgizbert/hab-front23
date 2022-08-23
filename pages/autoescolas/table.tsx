import { useGetSchools } from "@/services/admin/schools";
import { ISchool } from "@/services/admin/schools/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function GridSchools() {
  const [schools, setSchools] = useState<ISchool[]>([])
  const {data: getSchools, isLoading: loading} = useGetSchools()

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 140 },
    { field: 'address_uf', headerName: 'UF', width: 80 },
    { field: 'address_city', headerName: 'Cidade', width: 160 },
    { field: 'address_postal', headerName: 'CEP',},
    { field: 'whatsapp', headerName: 'WhatsApp'},
  ];

  useEffect(() => {
    if (getSchools) setSchools(getSchools)
  }, [getSchools])

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={schools}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}