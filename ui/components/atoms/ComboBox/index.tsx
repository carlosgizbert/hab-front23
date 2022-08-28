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
  onChange: (newValue: any) => any
}

export default function ComboBox({
  id,
  label,
  options,
  width = 300,
  disablePortal = true,
  onChange,
}: IComboBox) {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id={id}
      options={options}
      sx={{ width }}
      onChange={(event, newInputValue) => onChange(newInputValue)}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  )
}
