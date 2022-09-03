import IconPlace from '@mui/icons-material/Place'
import * as S from './styles'

interface IListSuggestions {
  schools: []
  isLoading: boolean
  onClickAddressCallBack: (value: any) => any
}

export default function ListSuggestions({
  schools,
  isLoading,
  onClickAddressCallBack,
}: IListSuggestions) {
  return (
    <S.SuggestionsContainer>
      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          Buscando ...
        </div>
      )}
      {schools &&
        schools.map((address: any) => (
          <div
            key={`suggestion${address.formatted_address + 1}`}
            onClick={() => onClickAddressCallBack(address)}
          >
            <S.SuggestionItem>
              <IconPlace color="primary" />
              <div>{address.formatted_address}</div>
            </S.SuggestionItem>
          </div>
        ))}
    </S.SuggestionsContainer>
  )
}
