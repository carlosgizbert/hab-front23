import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface IComboBox {
  id?: string
  width?: number
  label: string
  value: string | number | undefined
  disablePortal?: boolean
  options: Array<any>
  disabled?: boolean
  onChange: (newValue: any) => any
}

export default function ComboBox({
  id,
  label,
  value,
  options,
  width = 300,
  disablePortal = true,
  disabled = false,
  onChange,
}: IComboBox) {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id={id}
      options={options}
      value={value}
      sx={{ width }}
      disabled={disabled}
      onChange={(event, newInputValue) => onChange(newInputValue)}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  )
}
