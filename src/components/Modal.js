import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`;

const ModalImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: #000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;

    p {
        margin-bottom: 1rem;
    }

    button {
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`;

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;

export const Modal = ({ isOpen, setIsOpen }) => {
    const modalRef = useRef();

    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if(modalRef.current === e.target){
            setIsOpen(false);
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && isOpen){
            setIsOpen(false);
        }
    }, [setIsOpen, isOpen]);

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress);
    }, [keyPress])

    return (
        <>
            {isOpen ? (
                <Background ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <ModalWrapper isOpen={isOpen}>
                            <ModalImg src={require('../images/img.jpg')} alt='smile' />
                            <ModalContent>
                                <h1>Are you ready?</h1>
                                <p>Get exclusive access to our next launch.</p>
                                <button>Join now!</button>
                            </ModalContent>
                            <CloseModalButton aria-label='Close modal' onClick={() => setIsOpen(prev => !prev)} />
                        </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    )
}