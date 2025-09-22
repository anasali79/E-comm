export function HeroBanner() {
  return (
    <div className="relative overflow-hidden ml-5 mt-4 text-white" style={{ backgroundColor: '#00c0f0' }}>
      <div className="px-8 py-12">
        <div className="flex items-center justify-between mt-8">
          <div className="max-w-lg mt-4">
            <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
              Adidas Men Running
              <br />
              Sneakers
            </h1>
            <p className="text-white/90 mb-6 text-base">Performance and design. Taken right to the edge.</p>
            <div className="inline-block">
              <span className="text-white font-medium text-sm underline cursor-pointer hover:no-underline">
                SHOP NOW
              </span>
            </div>
          </div>

          <div className="hidden md:block mt-4">
            <img
              src="/Hero shooes.png"
              alt="Blue Running Sneakers"
              className="h-56 w-auto object-contain transform scale-x-[-1]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
