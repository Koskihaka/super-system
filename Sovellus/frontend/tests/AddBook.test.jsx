// AddBook.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import AddBook from '../src/components/AddBook';

// 1. Mockataan axios, jotta emme oikeasti kutsu backendiä
vi.mock('axios');

describe('AddBook component', () => {
  it('renders form elements and heading', () => {
    // Annetaan mock-funktio fetchBooks-propiksi
    render(<AddBook fetchBooks={vi.fn()} />);

    // Testataan, että otsikko ja kentät löytyvät
    expect(screen.getByText(/Lisää uusi kirja/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kirjan nimi/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Kirjailija/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Julkaisuvuosi/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lisää kirja/i })).toBeInTheDocument();
  });

  it('submits form with correct data and calls fetchBooks on success', async () => {
    // Mock-funktio, jota AddBook kutsuu onnistuneen lisäyksen jälkeen
    const mockFetchBooks = vi.fn();
    
    // Asetetaan mockattu axios.post palauttamaan onnistunut vastaus
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<AddBook fetchBooks={mockFetchBooks} />);

    // Etsitään lomakkeen kentät ja nappi
    const titleInput = screen.getByPlaceholderText(/Kirjan nimi/i);
    const authorInput = screen.getByPlaceholderText(/Kirjailija/i);
    const yearInput = screen.getByPlaceholderText(/Julkaisuvuosi/i);
    const submitButton = screen.getByRole('button', { name: /Lisää kirja/i });

    // Syötetään arvoja lomakkeelle
    fireEvent.change(titleInput, { target: { value: 'Testikirja' } });
    fireEvent.change(authorInput, { target: { value: 'Testaaja' } });
    fireEvent.change(yearInput, { target: { value: '2023' } });

    // Klikataan "Lisää kirja"
    fireEvent.click(submitButton);

    // Odotetaan, että "Kirja lisätty: Testikirja" -viesti ilmestyy
    // (komponentin sisällä se tapahtuu try-lohkossa)
    await screen.findByText(/Kirja lisätty: Testikirja/i);

    // Varmistetaan, että axios.post kutsuttiin oikeilla parametreilla
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/books',
      {
        title: 'Testikirja',
        author: 'Testaaja',
        year_published: 2023
      }
    );

    // fetchBooks on kutsuttu, koska lisäys onnistui
    expect(mockFetchBooks).toHaveBeenCalled();
  });

  it('shows error message on failed request', async () => {
    const mockFetchBooks = vi.fn();
    
    // Asetetaan axios.post palauttamaan virhe
    axios.post.mockRejectedValueOnce({
      response: {
        data: { error: 'Virhe lisättäessä kirjaa' }
      }
    });
  
    render(<AddBook fetchBooks={mockFetchBooks} />);
  
    // Täytetään vaaditut kentät, jotta lomake validi ja submit laukaistaan
    fireEvent.change(screen.getByPlaceholderText(/Kirjan nimi/i), { target: { value: 'Testikirja' } });
    fireEvent.change(screen.getByPlaceholderText(/Kirjailija/i), { target: { value: 'Testaaja' } });
    fireEvent.change(screen.getByPlaceholderText(/Julkaisuvuosi/i), { target: { value: '2023' } });
    
    // Klikataan submit-nappia
    fireEvent.click(screen.getByRole('button', { name: /Lisää kirja/i }));
  
    // Odotetaan virheilmoitusta
    await screen.findByText(/Virhe: Virhe lisättäessä kirjaa/i);
  
    // Koska pyyntö epäonnistui, fetchBooks ei kutsuta
    expect(mockFetchBooks).not.toHaveBeenCalled();
  }); 
});