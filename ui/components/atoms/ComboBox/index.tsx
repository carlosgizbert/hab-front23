import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

interface IComboBox {
  id?: string
  width?: string
  label: string
  value?: string | number | undefined
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
  width = '100%',
  disablePortal = true,
  disabled = false,
  ...props
}: IComboBox) {
  return (
    <Autocomplete
      disablePortal={disablePortal}
      id={`${id}value`}
      options={options}
      value={value}
      sx={{ width }}
      disabled={disabled}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={label} />
      )}
      {...props}
    />
  )
}
