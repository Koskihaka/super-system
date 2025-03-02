import React from "react";
import "./App.css";
import Header from "./components/Header";
import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import TarotCard from "./components/TarotCard";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Section id="esittely" title="Tervetuloa Oppimispolulleni">
          <p>Olen kolmannen vuoden tieto- ja viestintätekniikan insinööriopiskelija, joka haluaa yhdistää sosiaali- ja terveysalan osaamisensa ja IT-taidot.</p>
        </Section>

        <Section id="osaaminen" title="Osaaminen">
        <p>Koulussa opiskelemiani aiheita:</p>
        <ul>
            <li>Linuxin perusteet ja komentorivin käyttö</li>
            <li>IP-verkot ja verkkoteknologiat</li>
            <li>Tietokannat ja SQL-kyselyt</li>
            <li>Ohjelmistokehitys – Perusteet ohjelmistojen suunnittelusta, testauksesta ja toteutuksesta.</li>
            <li>Ohjelmointi – Python, JavaScript ja C#</li>
            <li>Kyberturvallisuus – perusteet ja käytännöt</li>
            <li>Web-kehittäminen – responsiiviset sivustot HTML:llä, CSS:llä ja JavaScriptillä</li>
            <li>IoT – IoT-järjestelmien perusteet ja niiden käyttö</li>
            <li>CCNA – Cisco-verkkojen perusteet</li>
            <li>AWS – Pilvipalveluiden perusteet Amazon Web Services -ympäristössä</li>
            <li>ICT-yrittäjyys</li>
      </ul>
        </Section>

        <Section id="unelmat" title="Unelmat">
          <p>Unelmani on kehittää ratkaisuja, jotka helpottavat sote-ammattilaisten arkea ja tekevät palveluista saavutettavampia.</p>
        </Section>

        <ContactForm />
        <TarotCard />
      </main>
      <Footer />
    </>
  );
};

export default App;
