import './product-catalog.css';

export default function Page() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>LuxoraNova Product Catalog</title>
      </head>
      <body>
        <h1>LuxoraNova Product Catalog</h1>

        {/* Product Inventory Table */}
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quantum Wallet V2</td>
              <td className="product-description">
                RFID+NFC block, hidden vault, titanium build
              </td>
              <td className="in-stock">7</td>
            </tr>
            <tr>
              <td>Crypto Vault USB Pro</td>
              <td className="product-description">AES-512, dual auth, gold casing</td>
              <td className="in-stock">3</td>
            </tr>
            <tr>
              <td>Smart Lock Ring</td>
              <td className="product-description">Biometric titanium ring</td>
              <td className="sold-out">🔴 Sold Out</td>
            </tr>
            <tr>
              <td>LED Desk Orb</td>
              <td className="product-description">Touch light + Qi charger + clock</td>
              <td className="in-stock">12</td>
            </tr>
            <tr>
              <td>Holo Finance Spectacles</td>
              <td className="product-description">AR crypto overlay specs</td>
              <td className="in-stock">2</td>
            </tr>
          </tbody>
        </table>

        <p style={{ textAlign: "center" }}>
          Discover more premium innovations at LuxoraNova Fintech Private
          Limited.
        </p>
      </body>
    </html>
  );
}
