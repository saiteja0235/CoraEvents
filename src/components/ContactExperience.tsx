import { useState, type FormEvent } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  MapPin,
  Send,
} from 'lucide-react';
import luxuryReception from '../assets/cora-luxury-reception.png';
import { getWhatsAppUrl } from '../lib/whatsapp';
import './ContactExperience.css';

const serviceOptions = [
  'Wedding Planning',
  'Destination Weddings',
  'Corporate Events',
  'Product Launches',
  'Award Nights',
  'Sangeet & Reception',
  'Birthday & Private Events',
  'Stage & Venue Decoration',
  'Sound, Lighting & LED Walls',
  'Photography & Cinematography',
];

export function ContactExperience() {
  const [enquiryStarted, setEnquiryStarted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const enquiry = [
      'Hello Cora Events, I would like to plan an event.',
      `Name: ${formData.get('name')}`,
      `Phone: ${formData.get('phone')}`,
      `Email: ${formData.get('email')}`,
      `Event: ${formData.get('eventType')}`,
      `Event date: ${formData.get('eventDate') || 'To be decided'}`,
      `Expected guests: ${formData.get('guests') || 'Not provided'}`,
      `Details: ${formData.get('details') || 'Not provided'}`,
    ].join('\n');

    window.open(getWhatsAppUrl(enquiry), '_blank', 'noopener,noreferrer');
    event.currentTarget.reset();
    setEnquiryStarted(true);
  };

  return (
    <section className="contactExperience" id="contact">
      <div className="contactExperience__hero reveal">
        <div className="contactExperience__heroCopy">
          <p className="contactExperience__eyebrow">We would love to hear from you</p>
          <h2>
            Let&apos;s create something <i>extraordinary</i> together.
          </h2>
          <span className="contactExperience__flourish" aria-hidden="true" />
          <p className="contactExperience__intro">
            From intimate celebrations to spectacular productions, tell us what you imagine and we&apos;ll shape every detail around your story.
          </p>
          <div className="contactExperience__locationTag">
            <MapPin size={15} />
            Bhavanipuram, Vijayawada
          </div>
        </div>
        <div className="contactExperience__heroVisual">
          <img src={luxuryReception} alt="Cora Events luxury floral reception setting" />
          <span>Every remarkable event begins with a conversation.</span>
        </div>
      </div>

      <div className="contactExperience__content">
        <form className="contactExperience__form reveal" onSubmit={handleSubmit}>
          <div className="contactExperience__sectionHeading">
            <p>Start your enquiry</p>
            <h3>Tell us your <i>vision.</i></h3>
          </div>
          <div className="contactExperience__formGrid">
            <label>
              <span>Your name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" />
            </label>
            <label>
              <span>Your email</span>
              <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" />
            </label>
            <label className="contactExperience__wideField">
              <span>Phone number</span>
              <input name="phone" required type="tel" autoComplete="tel" placeholder="+91" />
            </label>
            <label className="contactExperience__wideField">
              <span>Event / service</span>
              <select name="eventType" required defaultValue="">
                <option value="" disabled>Select a service</option>
                {serviceOptions.map((service) => <option key={service}>{service}</option>)}
              </select>
            </label>
            <label>
              <span>Event date</span>
              <input name="eventDate" type="date" />
            </label>
            <label>
              <span>Expected guests</span>
              <input name="guests" type="number" min="1" placeholder="Optional" />
            </label>
            <label className="contactExperience__wideField">
              <span>Tell us about your event</span>
              <textarea name="details" placeholder="Share your ideas, location, guest count, and anything important to you..." />
            </label>
          </div>
          <div className="contactExperience__formFooter">
            <button type="submit">
              Send on WhatsApp <Send size={16} />
            </button>
            <small>Your enquiry opens securely in WhatsApp.</small>
          </div>
          {enquiryStarted && (
            <p className="contactExperience__success" role="status">
              <CheckCircle2 size={16} /> Your WhatsApp enquiry is ready to send.
            </p>
          )}
        </form>

        <aside className="contactExperience__details reveal">
          <div className="contactExperience__sectionHeading">
            <p>Get in touch</p>
            <h3>Let&apos;s plan your <i>moment.</i></h3>
          </div>

          <div className="contactExperience__detailList">
            <a href="tel:+918309031419" className="contactExperience__detail">
              <div>
                <b>Call us</b>
                <strong>+91 83090 31419</strong>
                <small>For event consultations</small>
              </div>
            </a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="contactExperience__detail">
              <div>
                <b>WhatsApp us</b>
                <strong>+91 83090 31419</strong>
                <small>Quick replies for new enquiries</small>
              </div>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Bhavanipuram%2C%20Vijayawada"
              target="_blank"
              rel="noopener noreferrer"
              className="contactExperience__detail"
            >
              <div>
                <b>Visit our office</b>
                <strong>Bhavanipuram, Vijayawada</strong>
                <small>Andhra Pradesh, India <ExternalLink size={12} /></small>
              </div>
            </a>
            <div className="contactExperience__detail">
              <div>
                <b>Consultations</b>
                <strong>By appointment</strong>
                <small>Serving Vijayawada and beyond</small>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </section>
  );
}
