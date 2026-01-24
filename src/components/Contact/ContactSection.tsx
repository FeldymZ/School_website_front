import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import {
  sendContactMessage,
  type ContactPayload,
} from "@/services/contactService";

/* ========================================================= */
/* =============== VOUS AVEZ UNE QUESTION ? ================= */
/* ========================================================= */

export default function ContactSection() {
  const [form, setForm] = useState<ContactPayload>({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendContactMessage(form);
      setSuccess(true);
      setForm({
        senderName: "",
        senderEmail: "",
        message: "",
      });
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    "Quels sont les prérequis pour intégrer votre école ?",
    "Quelle est la durée des formations ?",
    "Proposez-vous des formations en alternance ?",
    "Quel est le taux d'insertion professionnelle ?",
  ];

  const handleFaqClick = (question: string) => {
    setForm((prev) => ({ ...prev, message: question }));
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-gray-50 py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= TITRE ================= */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-darkBlue mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Notre équipe pédagogique est là pour vous accompagner dans votre projet de formation
          </p>
        </div>

        {/* ================= DECOR HAUT ================= */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
          <div className="w-40 h-[2px] bg-secondary/70 rounded-full" />
          <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
        </div>



        {/* ================= CONTENU ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ===== GAUCHE ===== */}
          <div className="space-y-8">
            {/* Besoin d'aide */}
            <div className="bg-lightBlue rounded-2xl p-8 flex gap-6">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <HelpCircle size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-darkBlue mb-2">
                  Besoin d'aide ?
                </h3>
                <p className="text-gray-700 text-sm">
                  Nos conseillers pédagogiques sont disponibles pour répondre à toutes vos interrogations
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-2xl font-bold text-darkBlue mb-4">
                Questions fréquentes
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Cliquez sur une question pour la poser directement
              </p>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <button
                    key={faq}
                    onClick={() => handleFaqClick(faq)}
                    className="
                      w-full bg-white border rounded-xl
                      px-6 py-4 flex justify-between
                      hover:border-secondary hover:bg-blue/10
                      transition-all
                    "
                  >
                    <span className="text-darkBlue font-medium">
                      {faq}
                    </span>
                    <ChevronDown size={20} className="text-secondary" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ===== DROITE : FORMULAIRE ===== */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
            <h3 className="text-2xl font-bold text-darkBlue mb-6">
              Posez votre question
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="senderName"
                required
                value={form.senderName}
                onChange={handleChange}
                placeholder="Nom complet"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-secondary"
              />

              <input
                type="email"
                name="senderEmail"
                required
                value={form.senderEmail}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-secondary"
              />

              <textarea
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Votre question"
                className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-secondary"
              />

              {success && (
                <Feedback
                  icon={<CheckCircle size={20} />}
                  text="Message envoyé avec succès"
                  type="success"
                />
              )}

              {error && (
                <Feedback
                  icon={<AlertTriangle size={20} />}
                  text={error}
                  type="error"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full bg-secondary text-white
                  font-bold py-4 rounded-xl
                  hover:bg-blue transition
                "
              >
                {loading ? "Envoi en cours..." : "Envoyer ma question"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FEEDBACK ================= */

function Feedback({
  icon,
  text,
  type,
}: {
  icon: React.ReactNode;
  text: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
        type === "success"
          ? "bg-green-50 text-green-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}
