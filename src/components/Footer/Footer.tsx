import React from 'react';
import './footer.scss';

function Footer() {
  return (
    <footer>
      <span>
        Created by:{' '}
        <a
          className='footer__link'
          href='https://github.com/ColniIIIko'
        >
          @ColniIIIko
        </a>
      </span>
      <span>BSU: 2022</span>
    </footer>
  );
}

export default Footer;
