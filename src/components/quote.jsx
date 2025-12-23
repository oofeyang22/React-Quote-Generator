import React, { useEffect, useState } from 'react'
import './myStyles.css'
import axios from 'axios'

export default function Quote() {
  const [quote, setQuote] = useState(
    "Pride comes before a fall, stay humble or you will be crushed in battle."
  )
  const [author, setAuthor] = useState("Olaitan Feranmi")
  const [loading, setLoading] = useState(false)

  const findQuote = async () => {
    setLoading(true)

    try {
      const res = await axios.get(
        "https://corsproxy.io/?https://zenquotes.io/api/random"
      )

      setQuote(res.data[0].q)
      setAuthor(res.data[0].a)
    } catch (error) {
      console.error("Failed to fetch quote:", error)
      setQuote("Failed to load quote. Please try again.")
      setAuthor("")
    } finally {
      setLoading(false)
    }
  }

  const volume = () => {
    const utterance = new SpeechSynthesisUtterance(quote)
    speechSynthesis.speak(utterance)
  }

  const copy = () => {
    navigator.clipboard.writeText(quote)
  }

  const tweet = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quote + " — " + author
    )}`
    window.open(twitterUrl, "_blank")
  }

  // Fetch a quote on first load
  useEffect(() => {
    findQuote()
  }, [])

  return (
    <section className="wrapper">
      <h1>Quote Generator</h1>

      <div className={`quote-box ${loading ? "loading" : ""}`}>
        <i className="fas fa-quote-left" id="left"></i>
        <p className="quoteText">{quote}</p>
        <i className="fas fa-quote-right" id="right"></i>
      </div>

      <div className="author-box">
        <span>—</span>
        <span id="author">{author}</span>
      </div>

      <div className="button-box">
        <div>
          <i className="fas fa-volume-up" onClick={volume}></i>
          <i className="fas fa-copy" onClick={copy}></i>
          <i className="fab fa-twitter" onClick={tweet}></i>
        </div>

        <button className="button" onClick={findQuote} disabled={loading}>
          {loading ? "Loading..." : "New Quote"}
        </button>
      </div>
    </section>
  )
}
