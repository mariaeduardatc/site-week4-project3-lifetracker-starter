import './LandingPage.css'

import hero from '../../assets/tracker.jpg'
import fitness from '../../assets/athlete.jpg'
import food from '../../assets/food.jpg'

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
      <div id='offers'>
        <div className='categories'>
          <div className='category'>
            <h3>Fitness</h3>
            <img src={fitness} alt="athlete running" />
          </div>
          <div className='category'>
            <h3>Food</h3>
            <img src={food} alt="food in a cutting board" />
          </div>
        </div>
        <div className='categories'></div>
      </div>
    </div>
  );
}

export default LandingPage;
