import React from 'react';
import Container from './Container';
import Main from './Main';

const Containt = () => {
    return (
        <div>
            <div
                className="header w-full lg:px-20"
                style={{
                    backgroundBlendMode: 'screen, color-dodge, color-dodge, normal',
                    background:
                        'linear-gradient(125.95deg, rgb(199, 0, 191) 10.95%, rgb(125, 169, 0) 100%), linear-gradient(341.1deg, rgb(0, 194, 255) 7.52%, rgb(78, 0, 177) 77.98%), linear-gradient(222.34deg, rgb(169, 0, 0) 12.99%, rgb(0, 255, 224) 87.21%), linear-gradient(130.22deg, rgb(143, 166, 0) 18.02%, rgb(90, 49, 255) 100%)',
                }}
            >
                <Container />
            </div>
            <div className="main ">
                <Main />
            </div>
        </div>
    );
};

export default Containt;
