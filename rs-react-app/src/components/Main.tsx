import { useState } from 'react';
import Content from './ContentComponent';
import Button from '../elements/ButtonElement'

export default function Main() {
    const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error('Oooops! Something went wrong!');
  }

    return (
        <main>
            Main Part
            <Content/>
            <Button onAction={() => setCrash(true)} text='Crash App'/>
        </main>
    )
}