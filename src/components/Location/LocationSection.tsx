/* ========================================================= */
/* ==================== NOUS LOCALISER ===================== */
/* ========================================================= */

const ESIITECH_COORDS = {
  latitude: 0.425764576118797,
  longitude: 9.450661539946902,
};

export default function LocationSection() {
  const googleMapsUrl = `https://www.google.com/maps?q=${ESIITECH_COORDS.latitude},${ESIITECH_COORDS.longitude}&z=17&output=embed`;

  return (
    <section className="relative w-full bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= TITRE ================= */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nous localiser
          </h2>
          <div className="h-[2px] w-32 bg-secondary mx-auto" />
        </div>

        {/* ================= CARTE ================= */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white min-h-[500px]">
          <iframe
            title="Localisation ESIITECH Gabon"
            src={googleMapsUrl}
            className="w-full h-[500px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
