import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormChecks } from './components/FormChecks';
import { useCheckForm } from './utils/useCheckForm';
import { useState } from 'react';
import { Hero } from './types/hero';
import H5AudioPlayer from 'react-h5-audio-player';
import { randomHero } from './utils/randomHero';
import 'rrp-graceful-lines-plugin/dist/index.css';
import { Roulette } from './components/Roulette';
import { carry, hard_support, midlaner, offlaner, soft_support } from './data/heros';
import { randomIntFromInterval } from './utils/randomFromInterval';
import { Position } from './types/positionEnum';

function App() {

  const formChecks = useCheckForm();
  const [heroes, setHero] = useState([] as Hero[])
  const [currHero, setCurrHero] = useState({} as Hero);
  const [currListHero, setCurrListHero] = useState(carry)
  const getRandomHero = () => {
    const hero = randomHero(formChecks)!;
    if (hero) {
      setHero(prev => [...prev, hero])
      setCurrHero(hero)
    }
  }

  const setNewListHero = () => {
    const choisenPos = formChecks.checks.filter(i => i.checked).map(i => i.name);
    const rndPosIndx = randomIntFromInterval(0, choisenPos.length - 1);
    const namePos = choisenPos[rndPosIndx];
    setCurrHero({
      isPick: true,
      position: namePos,
      imgSrc: "",
      name: ""
    })
    console.log(namePos)
    switch (namePos) {
      case Position.Carry:
        setCurrListHero(_ => [...carry]);
        break;
      case Position.HardLane:
        setCurrListHero(_ => [...offlaner]);
        break;
      case Position.HardSupport:
        setCurrListHero(_ => [...hard_support]);
        break;
      case Position.MidLane:
        setCurrListHero(_ => [...midlaner]);
        break;
      case Position.SoftSupport:
        setCurrListHero(_ => [...soft_support]);
        break;
    }
    console.log(currListHero)
    formChecks.setDefault(namePos)
  }

  const clearHero = () => {
    setHero([] as Hero[])
  }



  const handleSpin = (heroName: string) => {
    if(!currHero.position && currHero.position !== ""){
      return;
    }
    setCurrHero({
      isPick: true,
      imgSrc: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`,
      name: heroName,
      position: currHero.position
    })
    setHero(prev => [...prev, {
      imgSrc: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`,
      isPick: true,
      name: heroName,
      position: currHero.position
    }])
  }

  //bg bg-[url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.hTnQKM7cWTpuETxqbOBb1wHaEo%26pid%3DApi&f=1&ipt=3f22bd8d48024cbcc22f7424e121b33ebc7d2edbebfdad61ff8439cc486370e5&ipo=images')]

  return (
    <>
      <Container fluid className="md:h-[100vh] h-[200vh] w-[100%] bg-blue-900 px-8 py-10 gap-2 text-center"
      >
        <Row className='gap-4'>
          <Col sm={12} md={2} className='h-[55vh] border rounded-lg shadow-lg shadow-red-400'>
            <Row className='text-center '>
              <h1 className='text-2xl text-slate-200 tracking-widest font-extrabold'>ПОЗИЦІЇ</h1>
            </Row>
            <Row className=' py-8 tracking-widest font-bold text-xl text-green-500'>
              <Col className='gap-2 justify-center items-center flex'>
                <FormChecks
                  checks={formChecks.checks}
                />
              </Col>
            </Row>
            <Row className='flex'>
              <H5AudioPlayer
                className='even:inline-block'
                autoPlay={true}
                src='http://stream.zeno.fm/71ntub27u18uv'
                showSkipControls={false}
                showJumpControls={false}
                showFilledProgress={false}
                showDownloadProgress={false}
                showFilledVolume={false}
                defaultCurrentTime={<div></div>}
                defaultDuration={<div></div>}
              />
            </Row>
          </Col>
          <Col sm={12} md={6} className='border text-center rounded-lg px-4'>
            <Row><h1 className='text-2xl text-slate-200 tracking-widest font-extrabold'>ПІК</h1></Row>
            <Row className='text-gray-200 font-bold text-xl'>
              <Col xs={1} sm={1} md={1}>#</Col>
              <Col xs={3} sm={3} md={3}>Позиція</Col>
              <Col>Герой</Col>
            </Row>
            <Row>
              {
                heroes.map((hero, index) => {
                  return (
                    <Row key={Math.random()} className='text-gray-200  text-xl'>
                      <Col xs={1} sm={1} md={1}>{index + 1}</Col>
                      <Col xs={3} sm={3} md={3}>{hero.position}</Col>
                      <Col className='flex justify-start my-1'>
                        <Col xs={6} sm={6} md={6} className='text-right'>
                          <img src={hero.imgSrc!} className='h-[40px] inline-block' />
                        </Col>
                        <Col md={1}></Col>
                        <Col className='justify-start text-left'>
                          {hero.name}
                        </Col>
                      </Col>
                    </Row>
                  )
                })
              }
            </Row>
            <Row>
              <Button className='bg-red-500' onClick={clearHero}>ОЧИСТИТИ</Button>
            </Row>
          </Col>
          <Col sm={12} md={3} className='border text-center rounded-lg px-4 pb-2'>
            <Row><h1 className='text-2xl text-slate-200 tracking-widest font-extrabold'>РАНДОМНИЙ ГЕРОЙ</h1></Row>
            <Row className='py-4'>
              <Card style={{ width: '18rem' }} className='m-auto px-0'>
                <Card.Img variant="top" src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${currHero.name}.png`} />
                <Card.Body>
                  <Card.Title>{currHero.name}</Card.Title>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Button className='bg-green-600' onClick={getRandomHero}>КРУТАНУТЬ</Button>
            </Row>
          </Col>
        </Row>
        <Row className='roulette horizontal'>
          <Roulette
            items={currListHero.map((i, index) => {
              return {
                id: index + i,
                image: `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${i}.png`,
                text: i
              }
            })}
            handleSpin={handleSpin}
            setNewListHero={setNewListHero}
          />
        </Row>
      </Container>
    </>
  )
}

export default App
