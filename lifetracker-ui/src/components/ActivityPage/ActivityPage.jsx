
import "./ActivityPage.css";
import { Link, useNavigate } from "react-router-dom"
import moment from "moment"



function ActivityPage({ user, setAppState }) {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(user?.email)

  const handleOnLogout = () => {
    setAppState({})
    navigate("/")
  }

  const body = isAuthenticated ? (
    <>
      <p>Hello {user.firstName}, you are logged in!</p>
    </>
  ): (
    <p>Not Logged in? (test)</p>
  )

  return (
    <div className="activity-page">
         <div >{body}</div>
    </div>
  );
}

export default ActivityPage;
