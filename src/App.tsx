import React from 'react';
import './App.css';

function App() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <div className='container'>
            <h1>Distance Calculator</h1>
            <main>
                <form onSubmit={handleSubmit}>
                    <div className='coordinates'>
                        <span className='input-container'>
                            <h2>Point A</h2>
                            <div className='input'>
                                <span className='label-wrapper'><label htmlFor='latitude'>Latitude:</label></span>
                                <input type='text' id='latitude-a' />
                            </div>
                            <div className='input'>
                                <span className='label-wrapper'><label htmlFor='longitude'>Longitude:</label></span>
                                <input type='text' id='longitude-a' />
                            </div> 
                        </span>
                        <span className='input-container'>
                            <h2>Point B</h2>
                            <div className='input'>
                                <span className='label-wrapper'><label htmlFor='latitude'>Latitude:</label></span>
                                <input type='text' id='latitude-a' />
                            </div>
                            <div className='input'>
                                <span className='label-wrapper'><label htmlFor='longitude'>Longitude:</label></span>
                                <input type='text' id='longitude-a' />
                            </div>
                        </span>
                    </div>
                    <input type='submit' value='Calculate' />
                </form>
            </main>
        </div>
    )
}

export default App;
