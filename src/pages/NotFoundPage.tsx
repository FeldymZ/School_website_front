export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 mt-4">
        Page introuvable
      </p>
      <a
        href="/"
        className="mt-6 text-[#00A4E0] font-semibold"
      >
        Retour à l’accueil
      </a>
    </div>
  );
}
