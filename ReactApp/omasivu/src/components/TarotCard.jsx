import { useState, useEffect } from "react";

const TarotCard = () => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch("https://tarotapi.dev/api/v1/cards")
      .then((res) => res.json())
      .then((data) => {
        const randomCard = data.cards[Math.floor(Math.random() * data.cards.length)];
        setCard(randomCard);
      })
      .catch(() => setCard({ name: "Virhe", desc: "Korttia ei voitu ladata." }));
  }, []);

  return (
    <section id="tarot">
      <h2>Inspiraatiota Tarotista</h2>
      {card ? (
        <>
          <h3>{card.name}</h3>
          <p><strong>Kuvaus:</strong> {card.desc}</p>
          <p><strong>Positiivinen merkitys:</strong> {card.meaning_up}</p>
          <p><strong>Käänteinen merkitys:</strong> {card.meaning_rev}</p>
        </>
      ) : (
        <p>Ladataan...</p>
      )}
    </section>
  );
};

export default TarotCard;