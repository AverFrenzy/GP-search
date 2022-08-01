import EmpireIcon from '../svg/EmpireLogo/EmpireIcon';
import AlianceIcon from '../svg/AlianceLogo/AlianceIcon';

import uniqueKey from '../../helpers/uniqueKey';

import './ShipCard.css';

const chooseImg = (index) => {
  return index % 2 === 0 ?
    'https://www.blacksbricks.de/images/product_images/original_images/stardestrrevsl1.jpg' :
    'https://64.media.tumblr.com/cdd22d181a0ec1c9a0788bb44e38c5fe/tumblr_ohcuovgfma1ujrjg9o1_1280.jpg';
};

const ShipCards = ({ ships }) => (
  <div className='cards'>
    { ships.map(({ name, manufacturer, crew }, index) => (
      <ShipCard name={ name }
                key={ uniqueKey(name) }
                manufacturer={ manufacturer }
                crew={ crew }
                index={ index } />))
    }
  </div>
);

const ShipCard = ({ crew, manufacturer, name, index }) => (
  <div className='card'>
    <div className='card-wrapper'>
      <div className='img-wrapper'>
        <img
          className='ship-img'
          src={ chooseImg(index) }
          alt='star ship' />
      </div>
      <div className='card-content'>
        <span className='ship-name'>{ name }</span>
        <span className='ship-info'>
          { manufacturer }
          <span className='divider' />
          Crew : { crew }
        </span>
      </div>
    </div>
    <div className='card-logo'>
      { index % 2 === 0 ? <EmpireIcon /> : <AlianceIcon /> }
    </div>
  </div>
);

export default ShipCards;