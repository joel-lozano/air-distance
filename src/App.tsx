import React, { useState } from 'react';
import haversineDistance from 'haversine-distance';
import './App.css';

const bounds = {
    latitude: 90,
    longitude: 180
};

// Combine these two functions into one?
const isInRange = (num: number, bound: number): boolean => {
    if (num < -bound || num > bound) {
        return false;
    }
    return true;
}

const outOfRangeMessage = (quantity: string): string => {
    if (quantity !== 'latitude' && quantity !== 'longitude') {
        throw new Error('outOfRangeMessage: Parameter invalid.')
    }
    
    let bound: number;
    if (quantity === 'latitude') {
        bound = bounds.latitude;
    } else {
        bound = bounds.longitude;
    }

    quantity = quantity.charAt(0).toUpperCase() + quantity.slice(1);

    return (
        `Error: ${quantity} needs to be a number between -${bound} and ${bound}.`
    );
}

function App() {
    const [ distance, setDistance ] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const pointAString: string = event.currentTarget.pointA.value;
        const pointBString: string = event.currentTarget.pointB.value;

        if (!pointAString.includes(',') || !pointBString.includes(',')) {
            alert('Error: Please provide coordinates in comma-separated format.');
            return;
        }

        const [ latitudeA, longitudeA ] = pointAString.split(',');
        const pointA = {
            latitude: parseInt(latitudeA.trim()),
            longitude: parseInt(longitudeA.trim())
        };

        const [ latitudeB, longitudeB ] = pointBString.split(',');
        const pointB = {
            latitude: parseInt(latitudeB.trim()),
            longitude: parseInt(longitudeB.trim())
        };

        // Validate coordinates
        if (
            isNaN(pointA.latitude) || isNaN(pointA.longitude) ||
            isNaN(pointB.latitude) || isNaN(pointB.longitude)
        ) {
            alert('Error: Non-numeric input.');
            return;
        }

        if (!isInRange(pointA.latitude, bounds.latitude) || !isInRange(pointB.latitude, bounds.latitude)) {
            alert(outOfRangeMessage('latitude'));
            return;
        }

        if (!isInRange(pointA.longitude, bounds.longitude) || !isInRange(pointB.longitude, bounds.longitude)) {
            alert(outOfRangeMessage('longitude'));
            return;
        }
        
        setDistance((parseFloat((haversineDistance(pointA, pointB) / 1000).toFixed(2))).toLocaleString());
    }

    return (
        <div className='container'>
            <h1>Distance Calculator</h1>
            <p>Enter coordinates in comma-separated format.</p>
            <main>
                <h2>Distance: {distance}{distance === null ? null : 'km'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='coordinates'>
                        <span className='input-container'>
                            <label htmlFor='pointA'><h3>Point A</h3></label>
                            <input type='text' id='pointA' />
                        </span>
                        <span className='input-container'>
                            <label htmlFor='pointB'><h3>Point B</h3></label>
                            <input type='text' id='pointB' />
                        </span>
                    </div>
                    <input type='submit' value='Calculate' />
                </form>
            </main>
        </div>
    )
}

export default App;
