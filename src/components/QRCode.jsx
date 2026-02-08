export default function QRCode() {
  return (
    <div className="hidden md:block fixed top-1/2 -translate-y-1/2" style={{ left: 'calc(50% + 250px)' }}>
      <div className="bg-duo-dark-card rounded-2xl p-5 w-56 border border-duo-dark-lighter">
        <div className="bg-white rounded-xl p-2 mb-3">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://jsmessick.github.io/unit-missions/"
            alt="QR code to open prototype on phone"
            className="w-full"
          />
        </div>
        <p className="text-center text-sm font-bold text-gray-400">
          Scan to try on your phone
        </p>
      </div>
    </div>
  )
}
