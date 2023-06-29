import './LandingPage.css'

import hero from '../../assets/tracker.jpg'

function LandingPage() {

  return (
    <div className="landing-page">
      <div className='hero'>
        <img src={hero} alt=""  className='hero'/>
      </div>
    </div>
  );
}

export default LandingPage;
