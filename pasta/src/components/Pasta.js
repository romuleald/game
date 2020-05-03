import React, {useState} from 'react';
import css from './Pasta.module.css';

export const Pasta = ({pastaId = 1}) => {
    const [pastaSrc, setPasta] = useState('http://2.bp.blogspot.com/-KdqQ59OZ6b4/U7DdEh5iiHI/AAAAAAAAKSM/fl3U7pxNAdo/s1600/classici-farfalle-formato.png');

    document.head.insertAdjacentHTML('beforeend', `<style>
    @keyframes pasta${pastaId} { 
        from { transform: translate3d(0vw,   0vh,   1px); }
        to { transform:   translate3d(100vw, 100vh, 1px); }
    }
</style>`);
    return (
        <div
            onMouseDown={() => setPasta('http://4.bp.blogspot.com/-4Y-0SxTBlrI/T2KZrQwyleI/AAAAAAAAG1c/RTChXtRDXJE/s1600/IMG_2885.JPG')}
            id={`pasta-${pastaId}`}
            className={css.pasta}
            style={{animationName: `pasta${pastaId}`}}>
            <img
                src={pastaSrc}
                alt="pate"/>
        </div>
    );
};
