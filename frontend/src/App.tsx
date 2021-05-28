import { Quiz } from './quiz/Quiz';
import { Result } from './result/Result';
import { Home } from './home/Home';
import { Routes, Route } from 'react-router-dom';
import { Category } from './category/Category';
import styles from './App.module.css';
import { NewQuiz } from './new-quiz/NewQuiz';
import { Signup } from './signup/Signup';
import { Signin } from './signin/Signin';
import { Loader } from './loader/Loader';
import { UseLoader } from './contexts/loader.context';
import { NotificationContainer } from './notification/Notification-container';
import { useEffect } from 'react';
import { InitializeCategories } from './quiz-store/quiz.reducer';
import { UseAxios } from './custom-hooks/useAxios';
import { ICategoryResponse } from './quiz.types';
import { getUrl } from './api.config';
import { UseQuiz } from './quiz-store/quiz.context';
import { PrivateRoute } from './PrivateRoute';

function App() {
  const { loading } = UseLoader();
  const { getData } = UseAxios();
  const { dispatch } = UseQuiz();

  useEffect( () => {
    ( async () => {
      const response = await getData<ICategoryResponse>( getUrl('categories') );
      if( "data" in response ) {
          dispatch( new InitializeCategories({ categories: response.data.categories } ));
      } 
      else {
          console.log(response.message);
      }
    })();
  }, [] );
  

  return (
    <div className={ styles.app }>
      <Routes>
+       <Route path="/" element={<Home />} />
+       <Route path="/home" element={<Home />} />
+       <Route path="/category/:id" element={<Category />} />
        <PrivateRoute path="/quiz/:id" element={ <Quiz /> } />
        <PrivateRoute path="/newQuiz" element={<NewQuiz />} />
+       <PrivateRoute path="/result" element={<Result />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
+     </Routes>
      <Loader loading={ loading } />
      <NotificationContainer/>
    </div>
  );
}

export default App;
// https://dribbble.com/shots/10060643-Attachment-Type-Tests-and-Results
// https://dribbble.com/shots/6508352-Quiz-App-UI-Oma
// https://dribbble.com/shots/11645948-Educational-Quiz-App-v1
// https://dribbble.com/shots/14079869-Trivia-360
// https://dribbble.com/shots/9799987-Live-Quiz
// https://dribbble.com/shots/14621687-Quiz-App-Design-Exploration
// https://dribbble.com/shots/14012432-Quiz-App-Mobile-Design
// https://dribbble.com/shots/8210470-Quiz-App-Mobile-Application
// https://dribbble.com/shots/6730696-Never-Have-I-Ever
// https://dribbble.com/shots/15250794-Online-Quiz-Dashboard-Concept
// https://dribbble.com/shots/5440714-Concept-Survey-Builder