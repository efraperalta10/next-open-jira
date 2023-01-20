import { ChangeEvent, useState, useMemo, FC } from 'react';
import { GetServerSideProps } from 'next'

import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from '../../components/layouts'
import { EntryStatus } from '../../interfaces';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {

}

export const EntryPage:FC = ( props ) => {

  console.log({ props });

  const [inputValue, setInputValue] = useState('')
  const [status, setStatus] = useState<EntryStatus>('pending')
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onInputValueChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  const onStatusChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    console.log( event.target.value );
    setStatus( event.target.value as EntryStatus )
  }

  const onSave = () => {
    console.log({ inputValue, status });
    
  }

  return (
    <Layout title='... ... ...'>
      <Grid container justifyContent='center' sx={{ marginTop:2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title={`Entrada: ${ inputValue }` } subheader={`Creada hace: ...`} />
            <CardContent>
              <TextField
                sx={{ marginTop:2, marginBottom:1 }} fullWidth placeholder='Nueva entrada' autoFocus multiline label='Nueva entrada'
                value={ inputValue } onChange={ onInputValueChanged }
                helperText={ isNotValid && 'Ingrese un valor' }
                onBlur={ () => setTouched(true) } error={ isNotValid }
              />

              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup row value={ status } onChange={ onStatusChange } >
                  {
                    validStatus.map( option => (
                      <FormControlLabel key={ option } value={ option } control={ <Radio /> } label={ capitalize(option) } />
                    ) )
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
                <Button startIcon={ <SaveOutlinedIcon /> } variant='contained' fullWidth onClick={ onSave } disabled={ inputValue.length <= 0  } >
                  Guardar
                </Button>
              </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{ position:'fixed', bottom:30, right:30, backgroundColor:'red'}}>
        <DeleteForeverOutlinedIcon />
      </IconButton>

    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }
  
  return {
    props: {
      id
    }
  }
}

export default EntryPage