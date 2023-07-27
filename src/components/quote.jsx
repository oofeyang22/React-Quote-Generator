import React, { useEffect, useRef } from 'react'
import './myStyles.css'
import axios from 'axios'

export default function Quote(){
    const quoteref= useRef(null)
    const authorref= useRef(null)
    const buttonref= useRef(null)
    let volume = () => {
        let element= quoteref.current
        let utterance= new SpeechSynthesisUtterance(`${element.innerText}`)
        speechSynthesis.speak(utterance)
        
    }

    let copy = () => {
        let element= quoteref.current
        navigator.clipboard.writeText(element.innerText)
    }

    let tweet = () => {
        let element= quoteref.current
        let twitterUrl = `https://twitter.com/intent/tweet?url=${element.innerText}`
        window.open(twitterUrl, "_blank")
    }

    useEffect(() => {
        let object= buttonref.current
        object.addEventListener("click", findQuote)
    }, [])

    const findQuote = () => {
        let element= quoteref.current
        let person= authorref.current
        let object= buttonref.current
        element.classList.add("loading")
        object.innerText= "Loading Quote"

        axios.get("https://api.quotable.io/random")
        .then(result => {
            element.innerText= result.data.content
            person.innerText= result.data.author
            object.innerText= "New Quote"
            element.classList.remove("loading")
            //console.log(result.data.author)
        }).catch(err => {
            console.log(err)
        })
        
    }

    return (
        <section className="wrapper">
            <h1>Quote generator</h1>
            <div className="quote-box">
                <i className="fas fa-quote-left" id="left"></i>
                <p className="quoteText" ref= {quoteref}>pride comes before a fall, stay humble or you will be crushed in battle.Learn to hold on
                    tight in battle, victory is not for the weak.
                </p>
                <i className="fas fa-quote-right" id="right"></i>
            </div>
            <div className="author-box">
                <span>__</span>
                <span id="author" ref={authorref}>Olaitan Feranmi</span>
            </div>
            <div className="button-box">
                <div>
                    <i className="fas fa-volume-up" id="volume" onClick= {volume}></i>
                    <i className="fas fa-copy" id="copy" onClick= {copy}></i>
                    <i className="fab fa-twitter" id="twitter" onClick= {tweet}></i>
                </div>               
                                 
                <button className="button" ref={buttonref}>New Quote</button>
            </div>
        </section>
    )
}