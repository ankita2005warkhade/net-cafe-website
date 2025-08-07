export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About Net Café</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Net Café is your one-stop destination for all digital documentation and printing needs. 
        We aim to make your work faster and more convenient by offering an online file upload system 
        so that you no longer need to send documents via email or WhatsApp.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">📋 Our Services</h2>
      <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
        <li>📄 <strong>Document Printing</strong> (Black & White / Color)</li>
        <li>🖨️ <strong>Photo Printing</strong></li>
        <li>🧾 <strong>Xerox / Photocopy</strong></li>
        <li>🖊️ <strong>Online Form Filling</strong> (e.g., Exam Forms, Government Schemes)</li>
        <li>📥 <strong>Downloading & Printing</strong> of Hall Tickets, Aadhaar, PAN, etc.</li>
        <li>📃 <strong>Income, Caste, Domicile Certificate Applications</strong></li>
        <li>🔍 <strong>Online Search & Documentation Help</strong></li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">🎉 Ongoing Offers</h2>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
        <p><strong>🔥 20% OFF</strong> on Color Printing (Limited Time Only!)</p>
        <p><strong>📚 Student Special:</strong> Free Xerox of Admit Card up to 2 pages!</p>
      </div>

      <p className="mt-6 text-gray-700 dark:text-gray-300">
        Visit our shop or use our online upload system to experience fast and reliable service. 
        Thank you for choosing Net Café! 💻🖨️
      </p>
    </div>
  );
}
