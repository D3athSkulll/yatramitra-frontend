import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout/Layout';
import Homepage from './Homepage/Homepage';
import Flght from './SearchPage/Flight';
import './App.css'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/about' element={<Flght mode='flight' />} />
        <Route path='/train' element={<Flght mode='train' />} />
        {/* <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
        /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App
