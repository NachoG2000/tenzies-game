import { useState, useEffect } from 'react'
import './App.css'
import Dice from './Dice'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [isWon, setIsWon] = useState(false)

  console.log(isWon)

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(({id: i, number: Math.ceil(Math.random() * 6), isHold: false}))
    }
    return newDice
  }
  useEffect(() => {
    checkIfWon()
  }, [dice])
  
  
  function checkIfWon(){
    if(!dice.some(item => item.isHold === false)){
      let aux = dice[0].number
      if(dice.every(item => item.number === aux))
      setIsWon(true)
    }  
  }

  function playAgain(){
    setIsWon(false)
    setDice(allNewDice())
  }

  function toggleHold(event, dieId){
    setDice(prevDice => prevDice.map(die => die.id === dieId ? {...die, isHold: !die.isHold} : die))
  }

  function reRollDice(){
    setDice(prevDice => prevDice.map(die => die.isHold ? die : {id: die.id, number: Math.ceil(Math.random() * 6), isHold: die.isHold}))
  }

  const diceElements = dice.map(die => <Dice key={die.id} id={die.id} number={die.number} isHold={die.isHold} handleClick={toggleHold}/>)

  return (
    <>
      <main className='bg-[#0B2434] h-screen flex items-center justify-center'>
        <div className='bg-[#F5F5F5] h-[640px] w-[640px] rounded-xl space-y-8 flex flex-col'>
          <h1 className='text-[#2B283A] text-4xl font-bold text-center mt-24'>Tenzies</h1>
          <p className='text-[#2B283A] text-lg font-normal text-center w-[60%] mx-auto'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="grid grid-cols-5 gap-4 w-[80%] mx-auto">
            {diceElements}  
          </div>

          {
          isWon  
          ?
          <>
            <button className="bg-[#5035FF] text-white font-semibold text-2xl py-2 px-4 rounded-lg  h-14 mx-auto"
                    onClick={playAgain}
            >Play Again</button>
            <h2 className='text-[#2B283A] text-4xl font-bold text-center mt-24'>You won, congrats!</h2>
          </>
          :
          <button className="bg-[#5035FF] text-white font-semibold text-2xl py-2 px-4 rounded-lg w-28 h-14 mx-auto"
                  onClick={reRollDice}
          >Roll</button>
        }
          
        </div>
      </main>
    </>
  )
}

export default App
