import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface ISimpleOPtion {
  label: string
  value: string | number
}

interface IComboBox {
  id?: string
  width?: number
  label: string
  disablePortal?: boolean
  options: ISimpleOPtion[]
}

export default function ComboBox({
  id,
  label,
  options,
  width = 300,
  disablePortal = true,
}: IComboBox) {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id={id}
      options={options}
      sx={{ width }}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  )
}
