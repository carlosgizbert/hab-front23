import { useMediaQuery } from 'react-responsive'

interface IMediaQuery {
  mobile?: React.ReactNode
  desktop?: React.ReactNode
}

const MOBILE_QUERY = '(max-width: 1024px)'
const DESKTOP_QUERY = '(min-width: 1025px)'

function MediaQuery({ mobile = <div />, desktop = <div /> }: IMediaQuery) {
  const mobileQuery = useMediaQuery({
    query: MOBILE_QUERY,
  })
  const desktopQuery = useMediaQuery({
    query: DESKTOP_QUERY,
  })

  return (
    <>
      {mobileQuery && mobile}
      {desktopQuery && desktop}
    </>
  )
}

export default MediaQuery
