import React from 'react';

// Define styles using the Sapphire Eclipse palette
const cardStyles = {
    backgroundColor: '#192841', // Using Rich Navy for card background
    color: '#DDE6F1', // Using Silver Ice for default text
    borderRadius: '8px', // Subtle rounding for a softer, premium feel
    padding: '24px', // Generous padding
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    border: '1px solid #375A7F', // Subtle border using Sapphire
    fontFamily: '"Inter", sans-serif', // Example using a clean sans-serif font (as discussed for body text)
    maxWidth: '400px', // Example max width
    margin: '16px' // Example margin
};

const cardHeaderStyles = {
    fontSize: '1.25rem', // Slightly larger font size for header
    fontWeight: '600', // Semi-bold
    color: '#EEC643', // Luxe Gold for header accents
    marginBottom: '16px', // Spacing below header
    borderBottom: '1px solid #375A7F', // Separator line
    paddingBottom: '8px'
};

const cardContentStyles = {
    fontSize: '1rem',
    lineHeight: '1.6' // Generous line height for readability
};

// Define the Card component
const Card = ({ title, children }) => {
    return (
        <div style={cardStyles}>
            {title && <h2 style={cardHeaderStyles}>{title}</h2>}
            <div style={cardContentStyles}>
                {children}
            </div>
        </div>
    );
};

// Example Usage (Conceptual - Render this within your React app)
/*
function App() {
    return (
        <div style={{ backgroundColor: '#0C0F2C', minHeight: '100vh', padding: '20px' }}> // Example app background
             <Card title="Portfolio Overview">
                <p>Current Balance: $15,780.23</p>
                <p>Performance (YTD): +8.5%</p>
                <p>Next update in: 5 minutes</p>
             </Card>
             <Card title="Market Insights">
                <p>Sora AI suggests reviewing positions in Tech sector.</p>
             </Card>
        </div>
    );
}
*/

export default Card;
