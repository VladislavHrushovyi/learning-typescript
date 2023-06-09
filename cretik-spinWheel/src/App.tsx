import { Container, Row, Col } from 'react-bootstrap'
import './App.css'
import { ParticipantList } from './components/ParticipantList'
import { FormParticipant } from './components/FormParticipant'
import { useState } from 'react'
import { Participant } from './types/participant'
import { SpinWheel } from './components/SpinWheel'
import { WheelData } from "react-custom-roulette/dist/components/Wheel/types";
import { participantToWhellData } from './utils/prepareDataForWheel'

function App() {

  const [dataForWheel, setDataForWheel] = useState([] as WheelData[])

  console.log(dataForWheel);

  const addParticipant = (newParticipant : Participant) => {

    setDataForWheel([...dataForWheel, participantToWhellData(newParticipant)]);
  }

  const setDefaultParticipant = () => {
    console.log("REMOVE ALL PARTCIPANT");
    setDataForWheel([]);
  }
  return (
    <>
      <Container className='bg-purple-900 h-[100vh]' fluid>
        <Row className='h-[100vh]'>
          <Col className='border-r-2 '>
            <ParticipantList participants={dataForWheel} />
          </Col>
          <Col md={9} className='gap-4'>
            <SpinWheel dataForWheel={dataForWheel} setDefaultParticipant={setDefaultParticipant}/>
            <Row className='h-[20vh]'>
              <Col>
                <FormParticipant AddParticipantAction={addParticipant}/>
                <Row className='text-center pt-2 text-white text-2xl custom-text'>
                  <h2>НОМЕР КАРТИ: 4441 1111 5297 2141</h2>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
