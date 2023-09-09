import { useState } from 'react'

import data from './data.json'



function App() {
  const [searchTags, setSearchTags] = useState([])

  const addSearchTag = (lang) => {
    const find = searchTags.find(tag => lang === tag)

    if(find) return

    setSearchTags([...searchTags, lang])
    window.scrollTo(0, 0)
  }

  const removeSearchTag = (tag, idx) => {
    const copyTags = [...searchTags]
    copyTags.splice(idx, 1)
    setSearchTags(copyTags)
  }

  const clearSearchTags = () => {
    setSearchTags([])
    window.scrollTo(0, 0)
  }

  const createTagButton = (text, idx) => {
    return (
      <button 
        className="job__tags__item" 
        key={`tag${idx}`} 
        type="button"
        onClick={() => addSearchTag(text)}
      >
        {text}
      </button>
    )
  }

  const createListing = (job, idx) => {
    return (
      <div className={job.featured ? "job job--featured" : "job"} key={idx}>
        <div className="job__img">
          <img src={job.logo} alt={job.company} />
        </div>
        <div className="job__details">
          <div className="job__details__header">
            <div className="job__details__header__company">
              {job.company}
            </div>
            <div className="job__details__header__features">
              {job.new && <span className="features__new">NEW!</span>}
              {job.featured && <span className="features__featured">FEATURED</span>}
              

            </div>
          </div>
          <div className="job__details__title">
            {job.position}
          </div>
          <div className="job__details__footer">
            <span className="job__details__footer__postedat">
              {job.postedAt}
            </span>
            <span className="job__details__footer__divider"></span>
            <span className="job__details__footer__contract">
              {job.contract}
            </span>
            <span className="job__details__footer__divider"></span>
            <span className="job__details__footer__location">
              {job.location}
            </span>
          </div>
        </div>
        <div className="job__tags">
          {
            [job.role, job.level, ...job.tools, ...job.languages].map((lang, idx) => (
              <>{createTagButton(lang, idx)}</>
            ))}
        </div>
      </div>
    )
  }
  
  const filterData = () => {
    const filteredData = []

    data.forEach((job) => {
      let passed = true

      searchTags.forEach((tag) => {
        const searchArray = [job.role, job.level, ...job.tools, ...job.languages]

        if(!searchArray.find((item) => item === tag)){
          passed = false
        }
      })
      
      if(passed){
        filteredData.push(job)
      }
    })

    return filteredData
  }

  return (
    <>
      <header className="header">
        
      </header>

      <div className={searchTags.length > 0 ? "filter-bar filter-bar--visible" : "filter-bar"}>
        <div className="filter-bar__btns">
          {searchTags.map((tag, idx) => (
            <div className="filter-bar__btns__btn" key={idx}>
              <div className="filter-bar__btns__btn__text">{tag}</div>
              <div className="filter-bar__btns__btn__remove">
                <button 
                  className="filter-bar__btns__btn__remove__btn"
                  onClick={() => removeSearchTag(tag, idx)}
                >
    
                </button>
              </div> 
            </div>
          ))}
          
        </div>
        
        <button 
          type="button" 
          className="filter-bar__clear-btn"
          onClick={clearSearchTags}
        >
          Clear
        </button>
      </div>
      <main className="main">
        {searchTags.length > 0
        ? filterData().map((job, idx) => <>{createListing(job, idx)}</>)
        : data.map((job, idx) => <>{createListing(job, idx)}</>)}
      </main>
    </>
  )
}

export default App
