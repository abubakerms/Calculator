import React, { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import Clear from './components/Clear';
import updateInputContext from './contexts/onInput';
import './App.css';
import SignButton from './components/SignButton'
import handleRootButton from './components/RootButton'
import handleSqareRoot from './components/handleSqareRoot'

const App = () => {

    let [input, changeInput] = useState('');
    let [previousNumber, updatePreviousNumber] = useState(0);
    let [operator, updateOperator] = useState('');
    let [buttons,updateButton]=useState(false);
    let [LightTheme,updateTheme]=useState(true)

    const addToInput = element => {
        switch (element) {
            case 'CLEAR': {
                updateState('', 0, ''); // reset 
                break;
            }
            case '0': {
                if (input)
                    updateState(input + element); // append if some input exists
                break;
            }
            case '.': {
                if (!input.includes(element))
                    updateState(input + element); // append ONLY 1 decimal for a operand
                break;
            }
            case '/':
            case '*':
            case '+':
            case '-': {
                if (input) {
                    if (previousNumber) {  // UNSAFE OPERATION ( pressed without pressing = )
                        let result = getResult({ previousNumber, operator, input });
                        updateState('', result, element); //reset input, store result in previous number
                    }
                    else   // SAFE OPERATION (pressed first time OR after pressing = )
                        updateState('', input, element); //reset input, store input in previous number
                }
                break;
            }
            case '=': {
                if (previousNumber && input) {
                    let result = getResult({ previousNumber, operator, input });
                    updateState(result, 0, ''); //store result in input, reset previous number and operand
                }
                break;
            }
            default:
                updateState(input + element);  //append to input
        }
    }

    const updateState = (Input = input, PreviousNumber = previousNumber, Operator = operator) => {
        changeInput(Input);
        updatePreviousNumber(PreviousNumber);
        updateOperator(Operator);
    };

    const getResult = ({ previousNumber, operator, input }) => {
        return String(eval(previousNumber + operator + input));
    }

    const handleClick=()=>{
        if(buttons){
            updateButton(false)   
        }
        else
        updateButton(true)   

    }

    const handleSigntificButton=()=>{
        return(
           
            <div className="row">
                <button onClick={handleSignButton}>Sign</button>
                <button onClick={handleRootButton}>Sqaure</button>
                <button onClick={handleSqareRoot}>sqaure root</button>
            </div>
            
        )
    }

    const handleSignButton=()=>{
        console.log("sign")
        changeInput(-(input))
    }

    const handleRootButton=()=>{   
        changeInput(input*input)
    }

    const handleSqareRoot=()=>{
        changeInput(Math.sqrt(input))  
    }

    const DarkTheme=()=>{ 
            updateTheme(false)   
    }

    const Light=()=>{
        updateTheme(true)
    }

    return ( 
       <div>
           <div className={"" +(LightTheme ? 'lightTheme':'darkTheme '  )}>
            <updateInputContext.Provider value={addToInput} >
                <div className='calc-wrapper'>
                <button onClick={DarkTheme}> DarkTheme</button>
                <button onClick={(Light)}>LightTheme</button>
                    <div className='row'>
                        <Input>{input}</Input>
                    </div>
                    <div className='row'>
                        <Button>7</Button>
                        <Button>8</Button>
                        <Button>9</Button>
                        <Button>/</Button>
                    </div>
                    <div className='row'>
                        <Button>4</Button>
                        <Button>5</Button>
                        <Button>6</Button>
                        <Button>*</Button>
                    </div>
                    <div className='row'>
                        <Button>1</Button>
                        <Button>2</Button>
                        <Button>3</Button>
                        <Button>+</Button>
                    </div>
                    <div className='row'>
                        <Button>.</Button>
                        <Button>0</Button>
                        <Button>=</Button>
                        <Button>-</Button>
                    </div>
                    <div className='row'>
                        
                        <Clear>CLEAR</Clear>
                    </div>
                    <div class="row">
                    <button onClick={handleClick}>Scientific Mode</button>
                    </div> 
                    { buttons&& handleSigntificButton() }

                    
                    
                </div>
                
                
            </updateInputContext.Provider>
         
            </div>
        </div>
    );

};

export default App;