import './LandingPage.css'

import hero from '../../assets/tracker.jpg'

function LandingPage() {

  return (
    <div className="landing-page">
      <div className='hero'>
        <div className='description'>
          <div className='title'>LifeTracker</div>
          <p>Helping you take back control of your world.</p>
        </div>

        <img src={hero} alt=""id='landing-img'/>
      </div>
    </div>
  );
}

export default LandingPage;
