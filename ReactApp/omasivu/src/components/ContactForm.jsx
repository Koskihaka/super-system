import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nimi ei saa olla tyhjä.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Anna kelvollinen sähköpostiosoite.";
    if (formData.message.length < 10)
      newErrors.message = "Viestin tulee olla vähintään 10 merkkiä.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Viesti lähetetty!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact">
      <h2>Ota yhteyttä</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nimi</label>
          <input type="text" id="name" name="name" value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Sähköposti</label>
          <input type="email" id="email" name="email" value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">Viesti</label>
          <textarea id="message" name="message" value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button type="submit">Lähetä</button>
      </form>

      <div className="container">
        <div className="card">
          <h3>LinkedIn</h3>
          <p>
            <a href="https://www.linkedin.com/in/hanna-koskinen" target="_blank" rel="noopener noreferrer">
              www.linkedin.com/in/hanna-koskinen
            </a>
          </p>
        </div>
        <div className="card">
          <h3>Sähköposti</h3>
          <p>
            <a href="mailto:hanna.koskinen@centria.fi">
              hanna.koskinen@centria.fi
            </a>
          </p>
        </div>
        <div className="card">
          <h3>GitHub</h3>
          <p>
            <a href="https://github.com/Koskihaka" target="_blank" rel="noopener noreferrer">
              github.com/Koskihaka
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;