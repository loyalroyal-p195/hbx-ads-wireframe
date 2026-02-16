"use client";
import { useState, useRef, useEffect } from "react";

const regions = [
  {
    id: "europe",
    name: "Europe",
    color: "#1a3a5c",
    topPicks: [
      { name: "Six Senses Residences Courchevel", stars: 5, location: "Rue des Tovets, Courchevel", desc: "Pamper yourself with a visit to the spa, which offers massages, body treatments, and facials. A hot tub and sauna offer a relaxing way to wind down after a day on the slopes." },
      { name: "Aman Venice", stars: 5, location: "Palazzo Papadopoli, Venice", desc: "Set in a 16th-century palazzo on the Grand Canal, this iconic property blends historic grandeur with contemporary luxury and world-class dining." }
    ],
    categories: [
      { name: "Trending", hotels: ["Hotel Arts Barcelona", "The Gritti Palace Venice", "Claridge's London", "Hôtel Plaza Athénée Paris", "Belmond Reid's Palace Madeira", "Four Seasons Megève", "One&Only Portonovi", "Mandarin Oriental Prague"] },
      { name: "Family Favourites", hotels: ["Martinhal Sagres Resort", "Sani Resort Halkidiki", "Forte Village Sardinia", "Ikos Andalusia", "Pine Cliffs Resort Algarve", "Daios Cove Crete", "Gloria Serenity Resort Antalya", "Cavallino Bianco Ortisei"] },
      { name: "Luxury Selection", hotels: ["Bürgenstock Resort Switzerland", "Cap Eden Roc Antibes", "Villa d'Este Lake Como", "Hotel de Paris Monte-Carlo", "Schloss Elmau Bavaria", "Amanzoe Peloponnese", "Rosewood London", "The Connaught London"] }
    ]
  },
  {
    id: "asia",
    name: "Asia",
    color: "#2d6a4f",
    topPicks: [
      { name: "Soneva Fushi Maldives", stars: 5, location: "Kunfunadhoo Island, Baa Atoll", desc: "A barefoot luxury resort surrounded by pristine beaches and turquoise lagoons. Features open-air cinema, observatory, and world-class diving." },
      { name: "Aman Tokyo", stars: 5, location: "Otemachi Tower, Tokyo", desc: "Occupying the top floors of Otemachi Tower, this urban sanctuary offers panoramic city views, traditional Japanese design, and exceptional dining." }
    ],
    categories: [
      { name: "Beach & Island", hotels: ["Amanpuri Phuket", "Pangulasian Island El Nido", "Conrad Koh Samui", "Vana Belle Koh Samui", "Banyan Tree Bintan", "Alila Villas Uluwatu", "Soneva Jani Maldives", "One&Only Reethi Rah"] },
      { name: "Cultural Escapes", hotels: ["The Peninsula Hong Kong", "Mandarin Oriental Bangkok", "Raffles Singapore", "The Oberoi Udaipur", "Taj Lake Palace Udaipur", "Hoshinoya Kyoto", "Amanjiwo Java", "Song Saa Cambodia"] },
      { name: "Wellness Retreats", hotels: ["COMO Shambhala Bali", "Kamalaya Koh Samui", "Ananda Himalayas", "Chiva-Som Hua Hin", "Six Senses Ninh Van Bay", "The Farm at San Benito", "Fivelements Bali", "Amanemu Japan"] }
    ]
  },
  {
    id: "america",
    name: "America",
    color: "#7b2d8e",
    topPicks: [
      { name: "Aman New York", stars: 5, location: "730 Fifth Avenue, New York", desc: "A sophisticated urban retreat in the heart of Manhattan, featuring a three-storey spa, jazz club, and stunning suites overlooking Central Park." },
      { name: "Belmond Hotel das Cataratas", stars: 5, location: "Iguazu Falls, Brazil", desc: "The only hotel located within the Brazilian national park, offering exclusive access to Iguazu Falls and lush tropical gardens." }
    ],
    categories: [
      { name: "City Breaks", hotels: ["The Edition Times Square", "Faena Miami Beach", "Rosewood São Paulo", "Four Seasons Bogotá", "Waldorf Astoria Beverly Hills", "The Langham Chicago", "Soho House Mexico City", "Nobu Hotel Palo Alto"] },
      { name: "Nature & Adventure", hotels: ["Explora Patagonia", "Inkaterra Machu Picchu", "Mashpi Lodge Ecuador", "Under Canvas Yellowstone", "Clayoquot Wilderness Resort", "Awasi Atacama", "Nayara Springs Costa Rica", "Tierra Chiloé"] },
      { name: "All-Inclusive", hotels: ["Jade Mountain St Lucia", "Eden Roc Cap Cana", "Secrets Maroma Beach", "Sandals Royal Barbados", "Excellence Playa Mujeres", "Hyatt Zilara Cap Cana", "Le Blanc Los Cabos", "Hotel Xcaret Arte"] }
    ]
  },
  {
    id: "mea",
    name: "Middle East & Africa",
    color: "#c45d2e",
    topPicks: [
      { name: "Atlantis The Royal Dubai", stars: 5, location: "Palm Jumeirah, Dubai", desc: "An architectural marvel on the Palm featuring sky-high infinity pools, celebrity chef restaurants, and one of the world's most spectacular water parks." },
      { name: "Singita Kruger National Park", stars: 5, location: "Kruger National Park, South Africa", desc: "Ultra-luxury safari lodges offering unparalleled wildlife experiences, expert-guided game drives, and conservation-focused hospitality." }
    ],
    categories: [
      { name: "Desert & Dunes", hotels: ["Al Maha Desert Resort Dubai", "Qasr Al Sarab Abu Dhabi", "The Chedi Muscat", "Royal Mansour Marrakech", "Anantara Sahara Tozeur", "Habitas AlUla Saudi Arabia", "Desert Grace Namibia", "Longitude 131 Uluru"] },
      { name: "Safari & Wildlife", hotels: ["andBeyond Ngorongoro", "Gibb's Farm Tanzania", "Bisate Lodge Rwanda", "Angama Mara Kenya", "Mombo Camp Botswana", "Lewa Safari Camp Kenya", "Grootbos Nature Reserve SA", "Segera Retreat Kenya"] },
      { name: "Coastal Gems", hotels: ["One&Only Cape Town", "Constance Lemuria Seychelles", "Royal Palm Mauritius", "Zanzibar White Sand", "The Residence Zanzibar", "Lux Le Morne Mauritius", "Six Senses Zighy Bay Oman", "Park Hyatt Zanzibar"] }
    ]
  }
];

const Stars = ({ count }) => (
  <span style={{ color: "#f5a623", fontSize: 14, letterSpacing: 1 }}>
    {"★".repeat(count)}
  </span>
);

const PlaceholderImg = ({ w, h, label, shade }) => (
  <div style={{
    width: w, height: h, minHeight: h,
    background: `linear-gradient(135deg, ${shade || "#c4c4c4"} 0%, ${shade ? shade + "88" : "#e0e0e0"} 100%)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: 12, fontWeight: 600, textAlign: "center",
    borderRadius: 6, overflow: "hidden", position: "relative", flexShrink: 0
  }}>
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 8 }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M22 20L16 13l-4 5-3-3-7 5"/></svg>
      <span style={{ marginTop: 4, opacity: 0.8 }}>{label || "Ad Placement"}</span>
    </div>
  </div>
);

const Carousel = ({ hotels, shade }) => {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 260, behavior: "smooth" });
  };
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => scroll(-1)} style={{ position: "absolute", left: -16, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 32, height: 32, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
      <div ref={ref} style={{ display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none", padding: "4px 0" }}>
        {hotels.map((h, i) => (
          <div key={i} style={{ minWidth: 220, maxWidth: 220, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", background: "#fff", flexShrink: 0, cursor: "pointer", transition: "transform 0.2s" }}>
            <PlaceholderImg w="100%" h={150} label={`Kevel Ad #${i + 1}`} shade={shade} />
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>{h}</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>Destination • View deal</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => scroll(1)} style={{ position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)", zIndex: 2, width: 32, height: 32, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
    </div>
  );
};

const TopPickCard = ({ hotel, shade, idx }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 0, background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", marginBottom: 16 }}>
    <div style={{ flex: "1 1 340px", minWidth: 280 }}>
      <PlaceholderImg w="100%" h={220} label={`Premium Ad #${idx + 1}`} shade={shade} />
    </div>
    <div style={{ flex: "1 1 300px", padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e" }}>{hotel.name}</div>
      <Stars count={hotel.stars} />
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12, color: "#666" }}>
        <span style={{ color: "#e63946" }}>📍</span> {hotel.location}
      </div>
      <div style={{ fontSize: 13, color: "#555", marginTop: 10, lineHeight: 1.5 }}>{hotel.desc}</div>
      <button style={{ marginTop: 14, padding: "8px 20px", background: shade || "#1a3a5c", color: "#fff", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>View Deal</button>
    </div>
  </div>
);

const RegionSection = ({ region }) => (
  <section id={region.id} style={{ marginBottom: 60 }}>
    <div style={{ borderLeft: `4px solid ${region.color}`, paddingLeft: 16, marginBottom: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: region.color, margin: 0 }}>{region.name}</h2>
      <p style={{ fontSize: 13, color: "#888", margin: "4px 0 0" }}>Discover our curated hotel selection</p>
    </div>

    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ background: region.color, color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 3, textTransform: "uppercase", letterSpacing: 1 }}>Premium</span>
        Our Top Selection
      </h3>
      {region.topPicks.map((h, i) => (
        <TopPickCard key={i} hotel={h} shade={region.color} idx={i} />
      ))}
    </div>

    {region.categories.map((cat, ci) => (
      <div key={ci} style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a2e", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ background: "#f0f0f0", color: "#555", fontSize: 10, padding: "2px 8px", borderRadius: 3, textTransform: "uppercase", letterSpacing: 1 }}>Carousel</span>
          {cat.name}
          <span style={{ fontSize: 11, color: "#aaa", fontWeight: 400 }}>({cat.hotels.length} hotels)</span>
        </h3>
        <Carousel hotels={cat.hotels} shade={region.color + "cc"} />
      </div>
    ))}
  </section>
);

export default function App() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setDropdownOpen(null);
  };

  const scrollToCategory = (regionId, catIdx) => {
    const el = document.getElementById(regionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDropdownOpen(null);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", color: "#fff", padding: "20px 0 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0" }}>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 2, opacity: 0.6, marginBottom: 4 }}>HBX Group</div>
              <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, color: "#ffffff" }}>Hotel Inspiration</h1>
              <p style={{ fontSize: 13, opacity: 0.7, margin: "4px 0 0" }}>Discover hotels from our preferred partners</p>
            </div>
            <div style={{ fontSize: 10, background: "rgba(255,255,255,0.1)", padding: "6px 12px", borderRadius: 4, border: "1px dashed rgba(255,255,255,0.3)" }}>
              🔖 104 ad placements<br />served via Kevel
            </div>
          </div>

          {/* Region Navigation with Dropdowns */}
          <nav style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {regions.map((r) => (
              <div key={r.id} style={{ position: "relative" }}
                onMouseEnter={() => setDropdownOpen(r.id)}
                onMouseLeave={() => setDropdownOpen(null)}>
                <button
                  onClick={() => scrollTo(r.id)}
                  style={{
                    background: dropdownOpen === r.id ? "rgba(255,255,255,0.15)" : "transparent",
                    color: "#fff", border: "none", padding: "12px 20px",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    borderBottom: `3px solid ${dropdownOpen === r.id ? r.color : "transparent"}`,
                    transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6
                  }}>
                  {r.name} <span style={{ fontSize: 9, opacity: 0.5 }}>▼</span>
                </button>
                {dropdownOpen === r.id && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0, background: "#fff",
                    borderRadius: "0 0 8px 8px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    zIndex: 100, minWidth: 200, overflow: "hidden"
                  }}>
                    <div onClick={() => scrollTo(r.id)} style={{ padding: "10px 16px", fontSize: 12, fontWeight: 700, color: r.color, cursor: "pointer", borderBottom: "1px solid #f0f0f0" }}>
                      ★ Top Selection
                    </div>
                    {r.categories.map((cat, ci) => (
                      <div key={ci} onClick={() => scrollToCategory(r.id, ci)} style={{ padding: "10px 16px", fontSize: 12, color: "#444", cursor: "pointer", borderBottom: ci < r.categories.length - 1 ? "1px solid #f0f0f0" : "none" }}
                        onMouseEnter={e => e.target.style.background = "#f7f8fa"}
                        onMouseLeave={e => e.target.style.background = "transparent"}>
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Region Image Cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {regions.map((r) => (
            <div key={r.id} onClick={() => scrollTo(r.id)} style={{
              borderRadius: 10, overflow: "hidden", cursor: "pointer",
              background: `linear-gradient(135deg, ${r.color} 0%, ${r.color}99 100%)`,
              height: 120, display: "flex", alignItems: "flex-end",
              padding: 16, color: "#fff", fontWeight: 700, fontSize: 16,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "transform 0.2s",
              position: "relative"
            }}>
              <div style={{ position: "absolute", top: 8, right: 8, fontSize: 9, background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 10 }}>
                {2 + r.categories.length * 8} ads
              </div>
              {r.name}
            </div>
          ))}
        </div>

        {/* Ad Inventory Summary */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "16px 24px", marginBottom: 40, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#999", fontWeight: 700 }}>Ad Placement Summary</div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#1a3a5c" }}>8</div>
              <div style={{ fontSize: 10, color: "#888" }}>Premium Banners</div>
            </div>
            <div style={{ width: 1, background: "#eee" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#1a3a5c" }}>96</div>
              <div style={{ fontSize: 10, color: "#888" }}>Carousel Tiles</div>
            </div>
            <div style={{ width: 1, background: "#eee" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#2d6a4f" }}>104</div>
              <div style={{ fontSize: 10, color: "#888" }}>Total Ad Slots</div>
            </div>
          </div>
        </div>

        {/* Region Sections */}
        {regions.map((r) => (
          <RegionSection key={r.id} region={r} />
        ))}

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "32px 0", borderTop: "1px solid #e0e0e0", marginTop: 20, color: "#aaa", fontSize: 11 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>HBX Group — Hotel Inspiration Landing Page</div>
          <div>Low-fidelity wireframe • All hotel content ad-served via Kevel • {new Date().toLocaleDateString()}</div>
        </footer>
      </div>
    </div>
  );
}
