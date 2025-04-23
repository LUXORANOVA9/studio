import { render, screen } from '@testing-library/react';
import Page from '../page';

describe('Page Component', () => {
  it('renders a table with correct headers', () => {
    render(<Page />);

    const title = screen.getByText('LuxoraNova Product Catalog');
    expect(title).toBeInTheDocument();



    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers[0]).toHaveTextContent('Product');
    expect(headers[1]).toHaveTextContent('Description');
    expect(headers[2]).toHaveTextContent('Stock');
  });

  it('renders the correct paragraph text', () => {
    render(<Page />);
    const paragraph = screen.getByText('Discover more premium innovations at LuxoraNova Fintech Private Limited.');
    expect(paragraph).toBeInTheDocument();
  });

  it('renders the correct table data', () => {
    render(<Page />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(6);
    const firstRow = rows[1];
    expect(screen.getByText('Quantum Wallet V2')).toBeInTheDocument()
    expect(screen.getByText('RFID+NFC block, hidden vault, titanium build')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();

    const secondRow = rows[2];
    expect(screen.getByText('Crypto Vault USB Pro')).toBeInTheDocument();
    expect(secondRow).toHaveTextContent('AES-512, dual auth, gold casing');
    expect(secondRow).toHaveTextContent('3');

    const thirdRow = rows[3];
    expect(thirdRow).toHaveTextContent('Smart Lock Ring');
    expect(thirdRow).toHaveTextContent('Biometric titanium ring');
    expect(thirdRow).toHaveTextContent('🔴 Sold Out');

    const fourthRow = rows[4];
    expect(fourthRow).toHaveTextContent('LED Desk Orb');
    expect(fourthRow).toHaveTextContent('Touch light + Qi charger + clock');
    expect(fourthRow).toHaveTextContent('12');

    const fifthRow = rows[5];
    expect(fifthRow).toHaveTextContent('Holo Finance Spectacles');
    expect(fifthRow).toHaveTextContent('AR crypto overlay specs');
    expect(fifthRow).toHaveTextContent('2');
  });
});