import React from 'react'

import './index.css'

const Counter = () => {
  const [pageDatax, setPageData] = React.useState([])

  const getTimeIntervel = updatedDate => {
    const todayDate = new Date()
    return '30 days'
  }

  React.useEffect(() => {
    async function getData() {
      try {
        const pageData = await fetch(
          'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2',
          {
            headers: {
              Authorization:
                'token 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',
            },
          },
        )
        const data = await pageData.json()

        setPageData(data.items)
        console.log('response', data)
      } catch (err) {
        console.log('responseData', err.message)
      }
    }
    getData()
  }, [])

  return (
    <div className="mostOuter">
      <h1 className="heading">Most Starred Repos</h1>
      {pageDatax !== undefined ? (
        <div className="innerContainer">
          {pageDatax.map(eachitem => (
            <div key={eachitem.id} className="outercontainer">
              <div>
                <img
                  className="imgStyle"
                  src={eachitem.owner.avatar_url}
                  alt={eachitem.name}
                />
              </div>
              <div className="repoDetailsContainer">
                <h1 className="reponame">{eachitem.name}</h1>
                <p className="repodes">{eachitem.description}</p>
                <div className="starsContainer">
                  <div className="star1">
                    <p className="starCont">Nb Stars</p>
                  </div>
                  <div className="star1">
                    <p className="starCont">Nb Issues</p>
                  </div>

                  <div>
                    <p>
                      Last pushed{' '}
                      <span>{getTimeIntervel(eachitem.updated_at)}</span> by{' '}
                      <span>{eachitem.owner.login}</span>{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Counter
