import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Root from '../Components/Pages/Root';
import Register from '../Components/Pages/Register';
import Login from '../Components/Pages/Login';
import JobDetails from '../Components/Pages/JobDetails';
import PrivateRoute from './PrivateRoute';
import JobApply from '../Components/Pages/JobApply';
import MyApplications from '../Components/Pages/MyApplications';
import AddJob from '../Components/Pages/AddJob';
import MyPostedJobs from '../Components/Pages/myPostedJobs';
import ViewApplicants from '../Components/Pages/ViewApplicants';
import AllJobs from '../Components/Pages/AllJobs';
import Dashboard from '../Components/Dashboard/Dashboard';
import AllUsers from '../Components/Dashboard/AllUsers';
import Error from '../Components/Shared/Error';
import Profile from '../Components/Dashboard/profile';
import AboutUs from '../Components/Shared/AboutUs';
import ContactUs from '../Components/Shared/ContactUs';
import AllBlogs from '../Components/Pages/AllBlogs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Root></Root>,
      },
      {
        path: '/all-jobs',
        element: <AllJobs></AllJobs>,
      },
      {
        path: '/all-blogs',
        element: <AllBlogs></AllBlogs>,
      },
      {
        path: '/about',
        element: <AboutUs></AboutUs>,
      },
      {
        path: '/contact-us',
        element: <ContactUs></ContactUs>,
      },
      {
        path: '/jobs/:id',
        element: 
        <PrivateRoute>
          <JobDetails />
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/jobs/${params.id}`)
      },
      {
        path: '/jobApply/:id',
        element: 
        <PrivateRoute>
          <JobApply />
        </PrivateRoute>,
      },
      // {
      //   path: '/myApplications',
      //   element: 
      //   <PrivateRoute>
      //     <MyApplications />
      //   </PrivateRoute>,

      // },
      // {
      //   path: '/addJob',
      //   element: 
      //   <PrivateRoute>
      //     <AddJob />
      //   </PrivateRoute>,

      // },
      // {
      //   path: '/myPostedJobs',
      //   element: 
      //   <PrivateRoute>
      //     <MyPostedJobs />
      //   </PrivateRoute>,

      // },
      {
        path: '/viewApplicants/:job_id',
        element: 
        <PrivateRoute>
          <ViewApplicants />
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/job-application/jobs/${params.job_id}`)
      },
      {
        path: 'register',
        element: <Register></Register>,

      },
      {
        path: 'login',
        element: <Login></Login>,
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'myApplications',
        element: <MyApplications />,
      },
      {
        path: 'addJob',
        element: <AddJob />,

      },
      {
        path: 'myPostedJobs',
        element: <MyPostedJobs />,
      },

    ]
  },

]);
export default router;