import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Footer() {
  const openInstagram = () => {
    window.open('https://github.com/satendra03', '_blank', 'noopener,noreferrer');
  };
  return (
    <div className="footer min-h-32 w-full flex text-muted-foreground items-center justify-center p-4">
      <h1>
        <Link to='https://github.com/satendra03' target='_blank' rel='noreferrer'>
          <Button variant="link" onClick={openInstagram}> <p className='sm:font-semibold sm:text-lg text-muted-foreground border-b-2'>Made by Satendra Kumar Parteti </p></Button>
        </Link>
      </h1>
      <Link to="https://www.buymeacoffee.com/satendra03"><img style={{height:"40px"}} src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=satendra03&button_colour=ff8929&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" /></Link>
    </div>
  );
}

export default Footer;
