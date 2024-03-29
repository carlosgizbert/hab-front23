import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0)

  const router = useRouter()

  useEffect(() => {
    switch (value) {
      case 0:
        router.push('/')
        break
      case 1:
        router.push('/gestao/autoescolas/')
        break
      default:
        router.push('/')
        break
    }
  }, [value])

  return (
    <Box sx={{ width: 500 }} position="fixed" bottom={0} zIndex={100}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction label="Autoescolas" icon={<SearchIcon />} />
        <BottomNavigationAction label="Dúvidas" icon={<InfoIcon />} />
      </BottomNavigation>
    </Box>
  )
}
