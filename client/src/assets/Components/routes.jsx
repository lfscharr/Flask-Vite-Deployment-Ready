
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from 'react-router-dom';
  import RootLayout from '../RootLayout';
  import HomePage from '../Components/HomePage';
  import SignIn from '../Components/SignIn';
  import SignUp from '../Components/SignUp';
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path='api/signin' element={<SignIn />} />
        <Route path="new" element={<SignUp />} />
      </Route>
    )
  );
  
  export default router;
  