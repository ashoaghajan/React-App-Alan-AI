import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles'
import { alanKey, alanLogoSrc } from './globalVariables';
import wordsToNumbers from 'words-to-numbers';

function App() {
  const classes = useStyles();
  const [activeArticles, setActiveArticles]: [any[], Function] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }: any) => {

        switch(command){
          case 'newHeadlines':
            setActiveArticles(articles);
            setActiveArticle(-1);
            break;

          case 'highlight': 
            setActiveArticle(prevNum => prevNum + 1);
            break;

          case 'open':
            const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];

            if(parsedNumber > 20){
              alanBtn({ key: '' }).playText('Please try that again');
            }
            else if(article){
              alanBtn({ key: '' }).playText(`Opening the article number ${parsedNumber}`);
              window.open(article.url, '_blank');
            }
            break;

          default:
            break;   
        }
      }
    })
    // eslint-disable-next-line
  },[]);

  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo"/>
      </div>
      <NewsCards articles={activeArticles} activeActicle={activeArticle}/>
    </div>
  );
}

export default App;
