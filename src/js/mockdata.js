/**
 * mockdata.js — Twenzetu Safari offline mock data
 * Mirrors the Django REST API response shapes from /api/v1/
 * Used as fallback when the API is not available.
 *
 * To switch to live API: set API_ENABLED = true in api.js
 */

export const MOCK_DATA = {
  regions: [
    {
      id: 1,
      name: "Kilimanjaro",
      slug: "kilimanjaro",
      description:
        "The Kilimanjaro Region is home to Africa's highest peak, Mount Kilimanjaro (5,895m), and the gateway city of Moshi. The region sits on the slopes of the mountain, featuring lush coffee and banana plantations, Chagga cultural villages, and the spectacular Kilimanjaro National Park — a UNESCO World Heritage Site attracting thousands of trekkers annually.",
      image: "images/photo-1621414050946-1b8b54914a61.jpg",
      latitude: "-3.067400",
      longitude: "37.355600",
      attraction_count: 2,
      created_at: "2025-01-01T00:00:00Z",
    },
    {
      id: 2,
      name: "Arusha",
      slug: "arusha",
      description:
        "Arusha is Tanzania's safari capital and the gateway to many of Africa's most iconic wildlife destinations. Nestled between Mount Meru and Mount Kilimanjaro, the region encompasses Arusha National Park, Serengeti, Ngorongoro Crater, Lake Manyara, and Tarangire — making it the beating heart of Tanzania's northern safari circuit.",
      image: "images/photo-1547036967-23d11aacaee0.jpg",
      latitude: "-3.386900",
      longitude: "36.683000",
      attraction_count: 5,
      created_at: "2025-01-01T00:00:00Z",
    },
    {
      id: 3,
      name: "Zanzibar",
      slug: "zanzibar",
      description:
        "The Zanzibar Archipelago is a semi-autonomous region of Tanzania composed of Unguja (Zanzibar Island) and Pemba Island. Famous for its turquoise Indian Ocean waters, white-sand beaches, and the UNESCO-listed Stone Town — a Swahili, Arab, and colonial heritage hub. Zanzibar is also the world's leading producer of cloves.",
      image: "images/photo-1586348943529-beaae6c28db9.jpg",
      latitude: "-6.165200",
      longitude: "39.202200",
      attraction_count: 5,
      created_at: "2025-01-01T00:00:00Z",
    },
  ],

  attractions: [
    {
      id: 1,
      name: "Mount Kilimanjaro",
      slug: "mount-kilimanjaro",
      region_name: "Kilimanjaro",
      category: "mountain",
      category_display: "Mountain",
      short_description:
        "Africa's highest peak at 5,895m. A UNESCO World Heritage Site and the world's tallest free-standing mountain, attracting trekkers from around the globe.",
      difficulty_level: "extreme",
      difficulty_display: "Extreme",
      featured_image:
        "images/photo-1621414050946-1b8b54914a61.jpg",
      is_featured: true,
      best_time_to_visit: "January–March and June–October",
    },
    {
      id: 2,
      name: "Chagga Village Cultural Tour",
      slug: "chagga-village-cultural-tour",
      region_name: "Kilimanjaro",
      category: "cultural",
      category_display: "Cultural Site",
      short_description:
        "Explore the rich heritage of the Chagga people on the slopes of Kilimanjaro — traditional villages, coffee farms, underground tunnels, and authentic local cuisine.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1516026672322-bc52d61a55d5.jpg",
      is_featured: false,
      best_time_to_visit: "Year-round, though June–October is driest",
    },
    {
      id: 3,
      name: "Serengeti National Park",
      slug: "serengeti-national-park",
      region_name: "Arusha",
      category: "wildlife",
      category_display: "Wildlife Safari",
      short_description:
        "Home to the legendary Great Migration and Africa's highest density of predators. Over 1.5 million wildebeest cross these endless plains annually.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1547036967-23d11aacaee0.jpg",
      is_featured: true,
      best_time_to_visit: "June–October for river crossings; January–March for calving",
    },
    {
      id: 4,
      name: "Ngorongoro Crater",
      slug: "ngorongoro-crater",
      region_name: "Arusha",
      category: "wildlife",
      category_display: "Wildlife Safari",
      short_description:
        "The world's largest intact volcanic caldera hosting 25,000 animals including Africa's densest lion population and endangered black rhinos.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1619711678715-6c1eb47a3553.jpg",
      is_featured: true,
      best_time_to_visit: "Year-round; June–September for dry season game drives",
    },
    {
      id: 5,
      name: "Tarangire National Park",
      slug: "tarangire-national-park",
      region_name: "Arusha",
      category: "national_park",
      category_display: "National Park",
      short_description:
        "Famous for spectacular elephant concentrations and ancient baobab trees. The Tarangire River draws thousands of animals in the dry season.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1520483691742-bada60a1edd6.jpg",
      is_featured: false,
      best_time_to_visit: "June–October for maximum wildlife concentration",
    },
    {
      id: 6,
      name: "Lake Manyara National Park",
      slug: "lake-manyara-national-park",
      region_name: "Arusha",
      category: "lake",
      category_display: "Lake",
      short_description:
        "A compact park famed for tree-climbing lions, vast flamingo flocks on its alkaline lake, and diverse habitats from Rift Valley forest to open floodplains.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1535941339077-2dd1c7963098.jpg",
      is_featured: false,
      best_time_to_visit: "June–October and December–February",
    },
    {
      id: 7,
      name: "Mount Meru",
      slug: "mount-meru",
      region_name: "Arusha",
      category: "mountain",
      category_display: "Mountain",
      short_description:
        "Tanzania's second-highest peak at 4,566m with a dramatic volcanic crater. An excellent Kilimanjaro acclimatisation route with exceptional wildlife on the approach.",
      difficulty_level: "difficult",
      difficulty_display: "Difficult",
      featured_image:
        "images/photo-1568393691622-c7ba131d63b4.jpg",
      is_featured: false,
      best_time_to_visit: "June–February (dry seasons)",
    },
    {
      id: 8,
      name: "Stone Town Zanzibar",
      slug: "stone-town-zanzibar",
      region_name: "Zanzibar",
      category: "historical",
      category_display: "Historical Site",
      short_description:
        "A UNESCO World Heritage Site — a maze of narrow streets, carved wooden doors, and centuries of Swahili, Arab, and colonial history on Zanzibar island.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1586348943529-beaae6c28db9.jpg",
      is_featured: true,
      best_time_to_visit: "June–October and December–February",
    },
    {
      id: 9,
      name: "Nungwi Beach",
      slug: "nungwi-beach",
      region_name: "Zanzibar",
      category: "beach",
      category_display: "Beach",
      short_description:
        "Zanzibar's premier beach destination — brilliant white sand, turquoise waters, traditional dhow building, and excellent water sports at the island's northern tip.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1507525428034-b723cf961d3e.jpg",
      is_featured: true,
      best_time_to_visit: "June–October and December–February",
    },
    {
      id: 10,
      name: "Prison Island (Changuu Island)",
      slug: "prison-island-changuu",
      region_name: "Zanzibar",
      category: "island",
      category_display: "Island",
      short_description:
        "A historic island housing Aldabra giant tortoises over 100 years old, surrounded by colourful coral reefs perfect for snorkelling — 30 minutes by boat from Stone Town.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1559523161-0fc0d8b38a7a.jpg",
      is_featured: false,
      best_time_to_visit: "June–October and December–February",
    },
    {
      id: 11,
      name: "Zanzibar Spice Farm Tour",
      slug: "zanzibar-spice-farm-tour",
      region_name: "Zanzibar",
      category: "cultural",
      category_display: "Cultural Site",
      short_description:
        "Explore Zanzibar's legendary spice farms — see, smell, and taste cloves, nutmeg, cinnamon and vanilla on the island that shaped the global spice trade.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1596040033229-a9821ebd058d.jpg",
      is_featured: false,
      best_time_to_visit: "Year-round, harvest seasons offer more activity",
    },
    {
      id: 12,
      name: "Jozani Chwaka Bay National Park",
      slug: "jozani-chwaka-bay-national-park",
      region_name: "Zanzibar",
      category: "wildlife",
      category_display: "Wildlife Safari",
      short_description:
        "Home to the endemic Zanzibar red colobus monkey — found nowhere else on Earth — in Zanzibar's only national park with ancient forests and mangrove boardwalks.",
      difficulty_level: "easy",
      difficulty_display: "Easy",
      featured_image:
        "images/photo-1535083783855-ade8a849ce28.jpg",
      is_featured: false,
      best_time_to_visit: "Year-round; early morning for best primate sightings",
    },
  ],

  attractionDetails: {
    "mount-kilimanjaro": {
      id: 1,
      name: "Mount Kilimanjaro",
      slug: "mount-kilimanjaro",
      region: {
        id: 1,
        name: "Kilimanjaro",
        slug: "kilimanjaro",
        description:
          "The Kilimanjaro Region is home to Africa's highest peak, Mount Kilimanjaro (5,895m), and the gateway city of Moshi. The region sits on the slopes of the mountain, featuring lush coffee and banana plantations, Chagga cultural villages, and the spectacular Kilimanjaro National Park — a UNESCO World Heritage Site attracting thousands of trekkers annually.",
        image: "images/photo-1621414050946-1b8b54914a61.jpg",
        latitude: "-3.067400",
        longitude: "37.355600",
        attraction_count: 2,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "mountain",
      category_display: "Mountain",
      description:
        "Mount Kilimanjaro is Africa's highest peak and the world's tallest free-standing mountain, rising dramatically to 5,895 metres above sea level from the surrounding plains of northern Tanzania. The mountain is a UNESCO World Heritage Site and one of the Seven Summits, drawing over 50,000 trekkers annually across its six official routes — Marangu, Machame, Lemosho, Rongai, Umbwe, and Northern Circuit. Five distinct ecological zones layer the mountain from lush montane rainforest at its base through heath and moorland to alpine desert and the iconic Arctic-like summit zone crowned by the Uhuru Peak glacier. Despite being a non-technical climb, altitude sickness is the primary challenge, and a slow ascent with proper acclimatisation is essential for a successful summit bid.",
      short_description:
        "Africa's highest peak at 5,895m. A UNESCO World Heritage Site and the world's tallest free-standing mountain, attracting trekkers from around the globe.",
      latitude: "-3.065800",
      longitude: "37.359400",
      altitude: 5895,
      difficulty_level: "extreme",
      difficulty_display: "Extreme",
      access_info:
        "Most trekkers fly into Kilimanjaro International Airport (JRO) and drive ~1 hour to Moshi or Arusha for gear checks and pre-climb briefings. All climbers must be accompanied by a licensed guide. The Marangu Gate and Machame Gate are the most commonly used entry points into Kilimanjaro National Park.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "50 km to Moshi town; gates a further 30–50 km",
      best_time_to_visit: "January–March and June–October",
      seasonal_availability:
        "Open year-round, but January–March and June–October offer the best summit conditions with lower precipitation and clearer skies.",
      estimated_duration: "5–9 days depending on route",
      entrance_fee: "70.00",
      requires_guide: true,
      requires_permit: true,
      featured_image:
        "images/photo-1621414050946-1b8b54914a61.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1621414050946-1b8b54914a61.jpg",
          caption: "Kilimanjaro summit at dawn with the Rebmann Glacier",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1609198092458-38a293c7ac4b.jpg",
          caption: "Trekkers ascending the Machame Route through moorland",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1574492867640-10ba7b2e2b38.jpg",
          caption: "Alpine desert zone on the approach to Stella Point",
          is_primary: false,
        },
        {
          id: 4,
          image: "images/photo-1516026672322-bc52d61a55d5.jpg",
          caption: "Lush rainforest on the lower slopes of Kilimanjaro",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Choose a route of at least 7 days to allow proper acclimatisation — the Lemosho and Northern Circuit routes have the highest summit success rates (above 90%).",
          order: 1,
        },
        {
          id: 2,
          tip: "Pack layers for all five climate zones. Temperatures at the summit can drop to −20 °C at night, while the lower rainforest can be warm and wet year-round.",
          order: 2,
        },
      ],
      is_featured: true,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "chagga-village-cultural-tour": {
      id: 2,
      name: "Chagga Village Cultural Tour",
      slug: "chagga-village-cultural-tour",
      region: {
        id: 1,
        name: "Kilimanjaro",
        slug: "kilimanjaro",
        description:
          "The Kilimanjaro Region is home to Africa's highest peak, Mount Kilimanjaro (5,895m), and the gateway city of Moshi. The region sits on the slopes of the mountain, featuring lush coffee and banana plantations, Chagga cultural villages, and the spectacular Kilimanjaro National Park — a UNESCO World Heritage Site attracting thousands of trekkers annually.",
        image: "images/photo-1621414050946-1b8b54914a61.jpg",
        latitude: "-3.067400",
        longitude: "37.355600",
        attraction_count: 2,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "cultural",
      category_display: "Cultural Site",
      description:
        "The Chagga people have lived on the fertile slopes of Kilimanjaro for centuries, developing a rich agricultural and social culture uniquely adapted to the mountain environment. A village cultural tour offers an intimate look at traditional Chagga life — including a guided walk through shaded banana and coffee plantations, a demonstration of the traditional coffee-making process from bean to cup, and a descent into the remarkable network of underground tunnels originally dug as a refuge from Maasai raids. Visitors can also taste local dishes such as ndizi nyama (banana and meat stew) prepared by community members and learn about traditional medicinal plants used by Chagga healers. Tours are typically arranged through guesthouses in Moshi and last between three and five hours.",
      short_description:
        "Explore the rich heritage of the Chagga people on the slopes of Kilimanjaro — traditional villages, coffee farms, underground tunnels, and authentic local cuisine.",
      latitude: "-3.350000",
      longitude: "37.340000",
      altitude: 1200,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Tours depart from Moshi town and take approximately 45 minutes by road to reach the village areas on Kilimanjaro's southern slopes. Most guesthouses and tour operators in Moshi can arrange half-day or full-day tours.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "45 km",
      best_time_to_visit: "Year-round, though June–October is driest",
      seasonal_availability:
        "Accessible year-round. The dry season (June–October) offers better road conditions and more comfortable walking temperatures.",
      estimated_duration: "3–5 hours",
      entrance_fee: "15.00",
      requires_guide: true,
      requires_permit: false,
      featured_image:
        "images/photo-1516026672322-bc52d61a55d5.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1516026672322-bc52d61a55d5.jpg",
          caption: "Coffee plantation on the Kilimanjaro slopes",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1559523161-0fc0d8b38a7a.jpg",
          caption: "Traditional Chagga village homestead",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1535083783855-ade8a849ce28.jpg",
          caption: "Local guide demonstrating traditional coffee processing",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Bring small denomination Tanzanian shillings for purchasing handcrafted souvenirs and to tip community guides directly.",
          order: 1,
        },
        {
          id: 2,
          tip: "Wear comfortable closed-toe shoes — some paths through the plantations and tunnel entrances can be muddy and uneven.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "serengeti-national-park": {
      id: 3,
      name: "Serengeti National Park",
      slug: "serengeti-national-park",
      region: {
        id: 2,
        name: "Arusha",
        slug: "arusha",
        description:
          "Arusha is Tanzania's safari capital and the gateway to many of Africa's most iconic wildlife destinations. Nestled between Mount Meru and Mount Kilimanjaro, the region encompasses Arusha National Park, Serengeti, Ngorongoro Crater, Lake Manyara, and Tarangire — making it the beating heart of Tanzania's northern safari circuit.",
        image: "images/photo-1547036967-23d11aacaee0.jpg",
        latitude: "-3.386900",
        longitude: "36.683000",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "wildlife",
      category_display: "Wildlife Safari",
      description:
        "The Serengeti National Park is Tanzania's oldest and most celebrated park, spanning 14,763 km² of open savannah, woodland, and riverine forest in the heart of the Serengeti ecosystem. It is the stage for the Great Migration — the largest overland animal movement on Earth — where over 1.5 million wildebeest, 200,000 zebra, and 300,000 Thomson's gazelle follow ancient seasonal circuits in search of fresh pasture and water. The park hosts Africa's highest concentration of large predators, with lion, leopard, cheetah, hyena, and wild dog all regularly sighted by safari vehicles. UNESCO recognised the Serengeti as a World Heritage Site in 1981, and the wider ecosystem — including Kenya's Masai Mara — forms one of the last intact large-mammal migrations on the planet.",
      short_description:
        "Home to the legendary Great Migration and Africa's highest density of predators. Over 1.5 million wildebeest cross these endless plains annually.",
      latitude: "-2.333300",
      longitude: "34.833300",
      altitude: 1525,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Most visitors fly into Kilimanjaro International Airport (JRO) and connect by scheduled light aircraft to one of several Serengeti airstrips (Seronera, Grumeti, Kogatende). Road access from Arusha via Ngorongoro takes approximately 8 hours. Self-drive is possible but guided 4WD safaris are strongly recommended.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "335 km by road; ~1 hour by light aircraft",
      best_time_to_visit: "June–October for river crossings; January–March for calving",
      seasonal_availability:
        "Open year-round. The southern Serengeti is best January–March (calving season). The western corridor and Grumeti River crossings peak in June–July. The north (Mara River) crossings occur July–October.",
      estimated_duration: "3–7 days",
      entrance_fee: "70.00",
      requires_guide: false,
      requires_permit: false,
      featured_image:
        "images/photo-1547036967-23d11aacaee0.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1547036967-23d11aacaee0.jpg",
          caption: "Wildebeest crossing the Mara River during the Great Migration",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1519659528534-7fd733a832a0.jpg",
          caption: "Lion pride resting on the Serengeti plains at sunset",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1466721591366-2d5fba72006d.jpg",
          caption: "Cheetah scanning the savannah from a termite mound",
          is_primary: false,
        },
        {
          id: 4,
          image: "images/photo-1575550959106-5a7defe28b56.jpg",
          caption: "Herd of elephants near a waterhole in the dry season",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Time your visit to coincide with the river crossings (July–September near the Mara River) for the most dramatic Great Migration spectacle — book camps in the north well in advance.",
          order: 1,
        },
        {
          id: 2,
          tip: "Request early morning and late afternoon game drives — predators are most active at these times and the golden light makes for outstanding photography.",
          order: 2,
        },
      ],
      is_featured: true,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "ngorongoro-crater": {
      id: 4,
      name: "Ngorongoro Crater",
      slug: "ngorongoro-crater",
      region: {
        id: 2,
        name: "Arusha",
        slug: "arusha",
        description:
          "Arusha is Tanzania's safari capital and the gateway to many of Africa's most iconic wildlife destinations. Nestled between Mount Meru and Mount Kilimanjaro, the region encompasses Arusha National Park, Serengeti, Ngorongoro Crater, Lake Manyara, and Tarangire — making it the beating heart of Tanzania's northern safari circuit.",
        image: "images/photo-1547036967-23d11aacaee0.jpg",
        latitude: "-3.386900",
        longitude: "36.683000",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "wildlife",
      category_display: "Wildlife Safari",
      description:
        "The Ngorongoro Crater is the world's largest intact and unflooded volcanic caldera, stretching 260 km² across its floor and sitting within the broader Ngorongoro Conservation Area — a UNESCO World Heritage Site. Formed approximately 2.5 million years ago when a giant volcano collapsed inward, the crater acts as a natural enclosure for approximately 25,000 large animals year-round, including Africa's densest population of lions, critically endangered black rhinos, Cape buffalo, hippos, and vast herds of wildebeest and zebra. The scenic rim at 2,300 m elevation offers breathtaking views before the descent to the crater floor for game drives through open grassland, acacia woodland, and the brackish Lake Magadi fringed by flamingos. The Ngorongoro Conservation Area also encompasses Olduvai Gorge, where some of the earliest hominin fossils ever discovered were unearthed.",
      short_description:
        "The world's largest intact volcanic caldera hosting 25,000 animals including Africa's densest lion population and endangered black rhinos.",
      latitude: "-3.180000",
      longitude: "35.590000",
      altitude: 2300,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Located approximately 180 km west of Arusha via the main safari road through Karatu — roughly 3 hours by 4WD. Vehicles descend the crater wall via a designated road; only authorised 4WD vehicles are permitted on the crater floor. An accredited guide or driver-guide is required.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "210 km",
      best_time_to_visit: "Year-round; June–September for dry season game drives",
      seasonal_availability:
        "Open year-round. The dry season (June–September) is excellent for game viewing as animals congregate around water sources. Calving season (January–March) brings predator-prey interactions.",
      estimated_duration: "1–2 days",
      entrance_fee: "70.00",
      requires_guide: true,
      requires_permit: false,
      featured_image:
        "images/photo-1619711678715-6c1eb47a3553.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1619711678715-6c1eb47a3553.jpg",
          caption: "Panoramic view of the Ngorongoro Crater from the rim",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1516426122078-c23e76319801.jpg",
          caption: "Black rhino grazing on the crater floor — a critically endangered species",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1535941339077-2dd1c7963098.jpg",
          caption: "Flamingos at Lake Magadi inside the crater",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Descend into the crater as early as possible — the morning mist clears quickly and predators are most active between 6:30 and 10:00 am.",
          order: 1,
        },
        {
          id: 2,
          tip: "Black rhinos are most often spotted near the Lerai Forest in the southwest of the crater floor — alert your guide to search that area specifically.",
          order: 2,
        },
      ],
      is_featured: true,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "tarangire-national-park": {
      id: 5,
      name: "Tarangire National Park",
      slug: "tarangire-national-park",
      region: {
        id: 2,
        name: "Arusha",
        slug: "arusha",
        description:
          "Arusha is Tanzania's safari capital and the gateway to many of Africa's most iconic wildlife destinations. Nestled between Mount Meru and Mount Kilimanjaro, the region encompasses Arusha National Park, Serengeti, Ngorongoro Crater, Lake Manyara, and Tarangire — making it the beating heart of Tanzania's northern safari circuit.",
        image: "images/photo-1547036967-23d11aacaee0.jpg",
        latitude: "-3.386900",
        longitude: "36.683000",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "national_park",
      category_display: "National Park",
      description:
        "Tarangire National Park is named after the Tarangire River, the only permanent water source in the area, which becomes a magnet for extraordinary concentrations of wildlife during the dry season. The park's iconic landscape of ancient baobab trees, open savannah, and dense bush shelters Tanzania's largest elephant population outside the Serengeti — herds of 200 or more are a common sight between July and October. Beyond elephants, Tarangire is home to large prides of lions, leopard, cheetah, wild dog, and over 550 bird species, making it a paradise for birders. The park covers 2,850 km² and receives far fewer visitors than the Serengeti or Ngorongoro, offering an authentic and uncrowded safari experience.",
      short_description:
        "Famous for spectacular elephant concentrations and ancient baobab trees. The Tarangire River draws thousands of animals in the dry season.",
      latitude: "-3.840000",
      longitude: "36.000000",
      altitude: 1100,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Located approximately 120 km south of Arusha — about 2 hours by road. The main gate is well signposted from the Arusha–Dodoma highway. Self-drive is possible, but a guided 4WD safari is recommended for navigating the park's extensive track network.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "145 km",
      best_time_to_visit: "June–October for maximum wildlife concentration",
      seasonal_availability:
        "Open year-round. Dry season (June–October) is peak time when animals gather along the Tarangire River. The green season (November–May) offers lush scenery, baby animals, and excellent birding.",
      estimated_duration: "1–3 days",
      entrance_fee: "53.00",
      requires_guide: false,
      requires_permit: false,
      featured_image:
        "images/photo-1520483691742-bada60a1edd6.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1520483691742-bada60a1edd6.jpg",
          caption: "Elephant herd beside a baobab tree in Tarangire",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1575550959106-5a7defe28b56.jpg",
          caption: "Large elephant bull at the Tarangire River",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1466721591366-2d5fba72006d.jpg",
          caption: "Giraffes browsing on acacia trees in the golden afternoon light",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Drive along the Tarangire River bank in the early morning for the best elephant sightings — herds of hundreds regularly gather here during the dry season.",
          order: 1,
        },
        {
          id: 2,
          tip: "Tarangire is one of Africa's best parks for spotting tree-climbing pythons — ask your guide to scan the large fig trees near the main river.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "lake-manyara-national-park": {
      id: 6,
      name: "Lake Manyara National Park",
      slug: "lake-manyara-national-park",
      region: {
        id: 2,
        name: "Arusha",
        slug: "arusha",
        description:
          "Arusha is Tanzania's safari capital and the gateway to many of Africa's most iconic wildlife destinations. Nestled between Mount Meru and Mount Kilimanjaro, the region encompasses Arusha National Park, Serengeti, Ngorongoro Crater, Lake Manyara, and Tarangire — making it the beating heart of Tanzania's northern safari circuit.",
        image: "images/photo-1547036967-23d11aacaee0.jpg",
        latitude: "-3.386900",
        longitude: "36.683000",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "lake",
      category_display: "Lake",
      description:
        "Lake Manyara National Park is a compact yet extraordinarily diverse park at the base of the Great Rift Valley escarpment, covering 325 km² — two-thirds of which is the shallow alkaline Lake Manyara itself. The park is famous for its tree-climbing lions, a rare behaviour first documented here, and for the spectacle of tens of thousands of flamingos that gather on the lake's shallows. Dense ground-water forest near the entrance shelters large troops of olive baboons and blue monkeys, while open floodplains and acacia woodland support buffalo, elephant, giraffe, zebra, and wildebeest. The Rift Valley wall towers above the park, providing a dramatic backdrop and a viewpoint accessible by road from the nearby town of Mto wa Mbu.",
      short_description:
        "A compact park famed for tree-climbing lions, vast flamingo flocks on its alkaline lake, and diverse habitats from Rift Valley forest to open floodplains.",
      latitude: "-3.530000",
      longitude: "35.830000",
      altitude: 960,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Located 126 km west of Arusha — approximately 2 hours by road. The park entrance is in the town of Mto wa Mbu. The park is frequently combined with Ngorongoro and Serengeti on northern circuit itineraries.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "155 km",
      best_time_to_visit: "June–October and December–February",
      seasonal_availability:
        "Open year-round. Flamingo populations are highest during the dry season. The green season brings lush vegetation and excellent birding.",
      estimated_duration: "Half day to 1 day",
      entrance_fee: "53.00",
      requires_guide: false,
      requires_permit: false,
      featured_image:
        "images/photo-1535941339077-2dd1c7963098.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1535941339077-2dd1c7963098.jpg",
          caption: "Flamingos on the alkaline shallows of Lake Manyara",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1516426122078-c23e76319801.jpg",
          caption: "Tree-climbing lion resting on an acacia branch — Lake Manyara's signature sight",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Search the large acacia and fig trees along the forest edge in the morning for the park's famous tree-climbing lions, especially near the Hippo Pool area.",
          order: 1,
        },
        {
          id: 2,
          tip: "Visit the town of Mto wa Mbu before or after your game drive — it's a vibrant market town where dozens of Tanzania's ethnic groups live side by side.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "mount-meru": {
      id: 7,
      name: "Mount Meru",
      slug: "mount-meru",
      region: {
        id: 2,
        name: "Arusha",
        slug: "arusha",
        description:
          "Arusha is Tanzania's safari capital and the gateway to many of Africa's most iconic wildlife destinations. Nestled between Mount Meru and Mount Kilimanjaro, the region encompasses Arusha National Park, Serengeti, Ngorongoro Crater, Lake Manyara, and Tarangire — making it the beating heart of Tanzania's northern safari circuit.",
        image: "images/photo-1547036967-23d11aacaee0.jpg",
        latitude: "-3.386900",
        longitude: "36.683000",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "mountain",
      category_display: "Mountain",
      description:
        "Mount Meru is Tanzania's second-highest peak at 4,566 m and one of Africa's most rewarding trekking destinations, yet it receives only a fraction of Kilimanjaro's visitor numbers. Located inside Arusha National Park, the mountain is an active stratovolcano with a dramatic horseshoe-shaped crater formed by a massive eruption approximately 8,000 years ago. The four-day Meru Circuit passes through lush montane forest inhabited by colobus monkeys and buffaloes — trekkers are accompanied by an armed ranger for wildlife safety — before emerging onto open moorland and the final rocky ridge to Socialist Peak. The summit offers a spectacular view of Kilimanjaro's snow-capped dome rising above the clouds to the east and is widely recommended as an acclimatisation ascent before attempting Africa's highest peak.",
      short_description:
        "Tanzania's second-highest peak at 4,566m with a dramatic volcanic crater. An excellent Kilimanjaro acclimatisation route with exceptional wildlife on the approach.",
      latitude: "-3.242400",
      longitude: "36.749900",
      altitude: 4566,
      difficulty_level: "difficult",
      difficulty_display: "Difficult",
      access_info:
        "Arusha National Park entrance is 35 km from Arusha city, approximately 45 minutes by road. All trekkers must register at Momella Gate and are required to be accompanied by a licensed guide and an armed park ranger throughout the trek.",
      nearest_airport: "Kilimanjaro International Airport (JRO)",
      distance_from_airport: "60 km",
      best_time_to_visit: "June–February (dry seasons)",
      seasonal_availability:
        "Best trekked during the dry seasons: June–August and December–February. March–May (long rains) brings slippery trails and reduced summit visibility.",
      estimated_duration: "3–4 days",
      entrance_fee: "45.00",
      requires_guide: true,
      requires_permit: true,
      featured_image:
        "images/photo-1568393691622-c7ba131d63b4.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1568393691622-c7ba131d63b4.jpg",
          caption: "Mount Meru's ash cone viewed from inside the crater horseshoe",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1609198092458-38a293c7ac4b.jpg",
          caption: "Trekkers on the summit ridge with Kilimanjaro in the distance",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1574492867640-10ba7b2e2b38.jpg",
          caption: "Colobus monkeys in the Arusha National Park forest on the lower slopes",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Book your armed ranger at Momella Gate at least a day in advance during peak season (July–August) — ranger availability can affect departure times.",
          order: 1,
        },
        {
          id: 2,
          tip: "Attempt the summit push between midnight and 2 am to reach Socialist Peak at sunrise — the views of Kilimanjaro emerging from the clouds at dawn are extraordinary.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "stone-town-zanzibar": {
      id: 8,
      name: "Stone Town Zanzibar",
      slug: "stone-town-zanzibar",
      region: {
        id: 3,
        name: "Zanzibar",
        slug: "zanzibar",
        description:
          "The Zanzibar Archipelago is a semi-autonomous region of Tanzania composed of Unguja (Zanzibar Island) and Pemba Island. Famous for its turquoise Indian Ocean waters, white-sand beaches, and the UNESCO-listed Stone Town — a Swahili, Arab, and colonial heritage hub. Zanzibar is also the world's leading producer of cloves.",
        image: "images/photo-1586348943529-beaae6c28db9.jpg",
        latitude: "-6.165200",
        longitude: "39.202200",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "historical",
      category_display: "Historical Site",
      description:
        "Stone Town is the historic heart of Zanzibar City and a UNESCO World Heritage Site inscribed in 2000 for its outstanding universal cultural significance. Its labyrinthine streets are lined with centuries-old coral-stone buildings, ornately carved wooden doors studded with brass spikes, and bustling bazaars that testify to Zanzibar's centuries as the dominant commercial hub of the East African coast. Landmarks include the Old Fort (Ngome Kongwe) built by Omani Arabs in 1699, the House of Wonders (Beit el-Ajaib), the former slave market and Anglican Cathedral, and Freddie Mercury's birthplace. The waterfront Forodhani Gardens come alive at sunset with grilled street food stalls drawing locals and visitors alike. Stone Town serves as the natural base for exploring the rest of Zanzibar Island.",
      short_description:
        "A UNESCO World Heritage Site — a maze of narrow streets, carved wooden doors, and centuries of Swahili, Arab, and colonial history on Zanzibar island.",
      latitude: "-6.163500",
      longitude: "39.189600",
      altitude: 10,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Stone Town is accessible by air via Abeid Amani Karume International Airport, a 10-minute taxi ride from the town centre, or by high-speed ferry from Dar es Salaam (approximately 2 hours). Most hotels and guesthouses are located within or adjacent to the UNESCO zone.",
      nearest_airport: "Abeid Amani Karume International Airport (ZNZ)",
      distance_from_airport: "7 km",
      best_time_to_visit: "June–October and December–February",
      seasonal_availability:
        "Accessible and enjoyable year-round. June–October and December–February avoid the main rainy seasons and offer the most comfortable temperatures for walking tours.",
      estimated_duration: "1–3 days",
      entrance_fee: "0.00",
      requires_guide: false,
      requires_permit: false,
      featured_image:
        "images/photo-1586348943529-beaae6c28db9.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1586348943529-beaae6c28db9.jpg",
          caption: "Traditional carved wooden door in Stone Town — a symbol of Zanzibari craftsmanship",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1559523161-0fc0d8b38a7a.jpg",
          caption: "The Old Fort (Ngome Kongwe) overlooking Stone Town's waterfront",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1596040033229-a9821ebd058d.jpg",
          caption: "Forodhani Gardens at dusk with street food vendors and dhows in the harbour",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Hire a local guide for at least a half-day walking tour — the maze of alleys looks identical and a guide will reveal hidden courtyards and history that you'd otherwise miss.",
          order: 1,
        },
        {
          id: 2,
          tip: "Visit Forodhani Gardens at sunset for affordable and delicious street food — try the Zanzibar pizza, fresh seafood, and sugar-cane juice.",
          order: 2,
        },
      ],
      is_featured: true,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "nungwi-beach": {
      id: 9,
      name: "Nungwi Beach",
      slug: "nungwi-beach",
      region: {
        id: 3,
        name: "Zanzibar",
        slug: "zanzibar",
        description:
          "The Zanzibar Archipelago is a semi-autonomous region of Tanzania composed of Unguja (Zanzibar Island) and Pemba Island. Famous for its turquoise Indian Ocean waters, white-sand beaches, and the UNESCO-listed Stone Town — a Swahili, Arab, and colonial heritage hub. Zanzibar is also the world's leading producer of cloves.",
        image: "images/photo-1586348943529-beaae6c28db9.jpg",
        latitude: "-6.165200",
        longitude: "39.202200",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "beach",
      category_display: "Beach",
      description:
        "Nungwi, at the northern tip of Zanzibar Island, is widely considered the island's finest beach — a sweeping crescent of brilliant white sand lapped by calm, crystal-clear turquoise water that remains swimmable at all tidal states due to the natural bay formation. The village is home to generations of traditional dhow builders whose workshops line the beach, constructing the elegant wooden sailing vessels that have plied the Indian Ocean for centuries. Nungwi's coral reef offers superb snorkelling and diving, with a variety of PADI-accredited dive centres offering courses and guided dives to sites including Manta Point and the coral gardens of Leven Bank. The beach comes alive at sunset with beachfront bars and restaurants serving fresh seafood catches of the day.",
      short_description:
        "Zanzibar's premier beach destination — brilliant white sand, turquoise waters, traditional dhow building, and excellent water sports at the island's northern tip.",
      latitude: "-5.726200",
      longitude: "39.298000",
      altitude: 5,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Approximately 55 km north of Stone Town — 1.5 to 2 hours by daladala (local minibus) or 45 minutes by taxi/private transfer. Several tour operators run shared shuttles from Stone Town. The road is paved and accessible by any vehicle.",
      nearest_airport: "Abeid Amani Karume International Airport (ZNZ)",
      distance_from_airport: "60 km",
      best_time_to_visit: "June–October and December–February",
      seasonal_availability:
        "Nungwi's north-facing position means it is less affected by the southeast monsoon (kusi) than the east coast, making it one of the best year-round beaches on Zanzibar.",
      estimated_duration: "2–7 days",
      entrance_fee: "0.00",
      requires_guide: false,
      requires_permit: false,
      featured_image:
        "images/photo-1507525428034-b723cf961d3e.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1507525428034-b723cf961d3e.jpg",
          caption: "Nungwi beach at sunrise — pristine white sand and turquoise Indian Ocean",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1590523277543-a94d2e4eb00b.jpg",
          caption: "Traditional dhow sailing past Nungwi at sunset",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1559523161-0fc0d8b38a7a.jpg",
          caption: "Coral reef snorkelling just offshore from Nungwi",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Book a sunset dhow cruise from Nungwi — traditional wooden dhows sail along the coast at dusk and the light on the water is extraordinary; trips typically include snorkelling and a seafood meal.",
          order: 1,
        },
      ],
      is_featured: true,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "prison-island-changuu": {
      id: 10,
      name: "Prison Island (Changuu Island)",
      slug: "prison-island-changuu",
      region: {
        id: 3,
        name: "Zanzibar",
        slug: "zanzibar",
        description:
          "The Zanzibar Archipelago is a semi-autonomous region of Tanzania composed of Unguja (Zanzibar Island) and Pemba Island. Famous for its turquoise Indian Ocean waters, white-sand beaches, and the UNESCO-listed Stone Town — a Swahili, Arab, and colonial heritage hub. Zanzibar is also the world's leading producer of cloves.",
        image: "images/photo-1586348943529-beaae6c28db9.jpg",
        latitude: "-6.165200",
        longitude: "39.202200",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "island",
      category_display: "Island",
      description:
        "Changuu Island — popularly known as Prison Island — lies just 5.5 km northwest of Stone Town in the Indian Ocean, reachable by a 20–30 minute boat ride. The island was originally purchased in 1893 by Arab slave trader Tippu Tip and later acquired by the British colonial government, which began constructing a prison that was never actually used to house prisoners; it instead served as a quarantine station. Today the island is most famous for its colony of Aldabra giant tortoises — some over 100 years old — which were gifted from the Seychelles in the late 19th century and now roam freely in a protected sanctuary. The surrounding coral reefs offer some of the best snorkelling accessible from Zanzibar, with excellent coral health and diverse marine life including colourful reef fish, octopus, and sea turtles.",
      short_description:
        "A historic island housing Aldabra giant tortoises over 100 years old, surrounded by colourful coral reefs perfect for snorkelling — 30 minutes by boat from Stone Town.",
      latitude: "-6.127000",
      longitude: "39.163000",
      altitude: 8,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Boats depart from Stone Town waterfront (near the Old Fort) daily from approximately 8:00 am. Day trips include boat transfer, entrance fee, snorkelling gear, and sometimes lunch. Booking through a Stone Town tour operator is recommended.",
      nearest_airport: "Abeid Amani Karume International Airport (ZNZ)",
      distance_from_airport: "15 km",
      best_time_to_visit: "June–October and December–February",
      seasonal_availability:
        "Open year-round. Sea conditions for the boat crossing are best June–October and December–February. Avoid the main monsoon season (March–May) for smoother crossings.",
      estimated_duration: "Half day to full day",
      entrance_fee: "4.00",
      requires_guide: false,
      requires_permit: false,
      featured_image:
        "images/photo-1559523161-0fc0d8b38a7a.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1559523161-0fc0d8b38a7a.jpg",
          caption: "Aldabra giant tortoise at Changuu Island sanctuary",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1507525428034-b723cf961d3e.jpg",
          caption: "Crystal-clear waters and coral reef around Prison Island",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1586348943529-beaae6c28db9.jpg",
          caption: "The historic prison building on Changuu Island",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Bring your own snorkel mask for the best fit — rental equipment quality varies. The reef is directly accessible from the island's eastern beach.",
          order: 1,
        },
        {
          id: 2,
          tip: "You can feed the giant tortoises with leaves provided at the sanctuary — they are surprisingly sociable and will approach visitors closely.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "zanzibar-spice-farm-tour": {
      id: 11,
      name: "Zanzibar Spice Farm Tour",
      slug: "zanzibar-spice-farm-tour",
      region: {
        id: 3,
        name: "Zanzibar",
        slug: "zanzibar",
        description:
          "The Zanzibar Archipelago is a semi-autonomous region of Tanzania composed of Unguja (Zanzibar Island) and Pemba Island. Famous for its turquoise Indian Ocean waters, white-sand beaches, and the UNESCO-listed Stone Town — a Swahili, Arab, and colonial heritage hub. Zanzibar is also the world's leading producer of cloves.",
        image: "images/photo-1586348943529-beaae6c28db9.jpg",
        latitude: "-6.165200",
        longitude: "39.202200",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "cultural",
      category_display: "Cultural Site",
      description:
        "Zanzibar was once known as the 'Spice Island' and the world's leading supplier of cloves — a title earned under Omani rule in the 19th century when Sultan Seyyid Said relocated his court from Muscat and established vast spice plantations across the island's fertile interior. A spice farm tour takes visitors through working farms in the Kizimbani and Kindichi areas, where knowledgeable local guides lead sensory walks through rows of clove trees, vanilla vines, cinnamon bark, nutmeg, cardamom, lemongrass, turmeric, and ginger. Visitors are encouraged to crush, smell, and taste the fresh spices, and young guides often demonstrate their tree-climbing skills to harvest samples from high branches. Tours typically conclude with a traditional Zanzibari lunch incorporating the very spices encountered on the walk.",
      short_description:
        "Explore Zanzibar's legendary spice farms — see, smell, and taste cloves, nutmeg, cinnamon and vanilla on the island that shaped the global spice trade.",
      latitude: "-6.120000",
      longitude: "39.280000",
      altitude: 60,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Spice farms are located approximately 25 km northeast of Stone Town in the island's central interior — about 40 minutes by road. Most Stone Town tour operators offer half-day and full-day spice tours, often combined with a visit to Prison Island.",
      nearest_airport: "Abeid Amani Karume International Airport (ZNZ)",
      distance_from_airport: "20 km",
      best_time_to_visit: "Year-round, harvest seasons offer more activity",
      seasonal_availability:
        "Open year-round. Clove harvest (July–November) and vanilla harvest (May–October) offer the most active farm atmosphere.",
      estimated_duration: "3–5 hours",
      entrance_fee: "10.00",
      requires_guide: true,
      requires_permit: false,
      featured_image:
        "images/photo-1596040033229-a9821ebd058d.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1596040033229-a9821ebd058d.jpg",
          caption: "Fresh cloves drying in the Zanzibar sun at a spice farm",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1516026672322-bc52d61a55d5.jpg",
          caption: "Nutmeg, cinnamon, and cardamom displayed on a tour",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Wear closed-toe shoes and light long trousers — the farm paths can be muddy after rain and some plants have rough bark or irritating sap.",
          order: 1,
        },
        {
          id: 2,
          tip: "Combine the spice tour with a visit to Prison Island for a full-day outing — many operators bundle both for a discounted package price.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },

    "jozani-chwaka-bay-national-park": {
      id: 12,
      name: "Jozani Chwaka Bay National Park",
      slug: "jozani-chwaka-bay-national-park",
      region: {
        id: 3,
        name: "Zanzibar",
        slug: "zanzibar",
        description:
          "The Zanzibar Archipelago is a semi-autonomous region of Tanzania composed of Unguja (Zanzibar Island) and Pemba Island. Famous for its turquoise Indian Ocean waters, white-sand beaches, and the UNESCO-listed Stone Town — a Swahili, Arab, and colonial heritage hub. Zanzibar is also the world's leading producer of cloves.",
        image: "images/photo-1586348943529-beaae6c28db9.jpg",
        latitude: "-6.165200",
        longitude: "39.202200",
        attraction_count: 5,
        created_at: "2025-01-01T00:00:00Z",
      },
      category: "wildlife",
      category_display: "Wildlife Safari",
      description:
        "Jozani Chwaka Bay National Park is Zanzibar's only national park, protecting the last significant area of indigenous forest on the island and its surrounding mangrove ecosystem. The park is most celebrated as the sole sanctuary of the Zanzibar red colobus monkey (Piliocolobus kirkii) — a critically endangered primate found nowhere else in the world, with a total wild population of fewer than 3,500 individuals. Well-maintained forest trails wind through ancient groundwater forest where troops of up to 50 red colobus monkeys can be reliably encountered at close range. The park also shelters Zanzibar leopard (rarely seen), blue duiker, bush pig, and over 50 bird species. An elevated mangrove boardwalk extends into Chwaka Bay, offering views over the tidal channels and a rare opportunity to appreciate this vital coastal ecosystem.",
      short_description:
        "Home to the endemic Zanzibar red colobus monkey — found nowhere else on Earth — in Zanzibar's only national park with ancient forests and mangrove boardwalks.",
      latitude: "-6.280000",
      longitude: "39.530000",
      altitude: 20,
      difficulty_level: "easy",
      difficulty_display: "Easy",
      access_info:
        "Located approximately 35 km southeast of Stone Town — about 45 minutes by road. Regular daladalas run from Stone Town's Darajani market to Jozani village. The park entrance is clearly signposted from the main road.",
      nearest_airport: "Abeid Amani Karume International Airport (ZNZ)",
      distance_from_airport: "35 km",
      best_time_to_visit: "Year-round; early morning for best primate sightings",
      seasonal_availability:
        "Open year-round. Early morning visits (before 9 am) yield the most active monkey behaviour. The park can be muddy during the rainy seasons (March–May and November).",
      estimated_duration: "2–3 hours",
      entrance_fee: "8.00",
      requires_guide: true,
      requires_permit: false,
      featured_image:
        "images/photo-1535083783855-ade8a849ce28.jpg",
      images: [
        {
          id: 1,
          image: "images/photo-1535083783855-ade8a849ce28.jpg",
          caption: "Zanzibar red colobus monkey — endemic to Zanzibar and found nowhere else on Earth",
          is_primary: true,
        },
        {
          id: 2,
          image: "images/photo-1516026672322-bc52d61a55d5.jpg",
          caption: "Mangrove boardwalk through Chwaka Bay wetlands",
          is_primary: false,
        },
        {
          id: 3,
          image: "images/photo-1596040033229-a9821ebd058d.jpg",
          caption: "Ancient groundwater forest trail in Jozani",
          is_primary: false,
        },
      ],
      tips: [
        {
          id: 1,
          tip: "Arrive early — by 7:30–8:00 am if possible. The red colobus monkeys are most active in the first hours after dawn and troops are easiest to locate near the forest entrance.",
          order: 1,
        },
        {
          id: 2,
          tip: "Do not feed the monkeys and keep a respectful distance. Although they are habituated to humans, feeding disrupts their natural diet and behaviour.",
          order: 2,
        },
      ],
      is_featured: false,
      created_by_username: "admin",
      created_at: "2025-01-01T00:00:00Z",
      updated_at: "2025-06-01T00:00:00Z",
    },
  },

  weather: {
    current_weather: {
      temperature: 23.4,
      apparent_temperature: 22.1,
      humidity: 68,
      precipitation: 0.0,
      rain: 0.0,
      weather_code: 2,
      weather_description: "Partly cloudy",
      cloud_cover: 35,
      wind_speed: 12.6,
      timestamp: "2025-07-15T14:00",
    },
    forecast: {
      dates: [
        "2025-07-15",
        "2025-07-16",
        "2025-07-17",
        "2025-07-18",
        "2025-07-19",
        "2025-07-20",
        "2025-07-21",
      ],
      temperature_max: [25.1, 24.8, 26.3, 27.0, 25.5, 24.9, 26.1],
      temperature_min: [15.2, 14.9, 15.8, 16.1, 15.4, 14.7, 15.6],
      precipitation: [0.0, 0.2, 0.0, 0.0, 0.5, 1.2, 0.0],
      rain: [0.0, 0.2, 0.0, 0.0, 0.5, 1.2, 0.0],
      weather_codes: [1, 2, 0, 0, 61, 63, 1],
    },
    seasonal_patterns: [
      {
        id: 1,
        season_type: "dry",
        season_display: "Dry Season",
        start_month: 6,
        end_month: 10,
        avg_temperature: 21.5,
        avg_rainfall: 12.30,
        description:
          "The long dry season from June to October brings clear skies, cooler temperatures, and excellent wildlife viewing conditions. This is peak safari season.",
      },
      {
        id: 2,
        season_type: "short_rain",
        season_display: "Short Rain Season",
        start_month: 11,
        end_month: 12,
        avg_temperature: 24.8,
        avg_rainfall: 85.60,
        description:
          "The short rains (Mvua Ndogo) typically arrive in November and December. Showers are usually brief afternoon storms.",
      },
      {
        id: 3,
        season_type: "long_rain",
        season_display: "Long Rain Season",
        start_month: 3,
        end_month: 5,
        avg_temperature: 26.2,
        avg_rainfall: 142.80,
        description:
          "The long rains (Masika) from March to May bring heavy and sustained rainfall. Some roads become impassable.",
      },
    ],
    weather_codes_reference: {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      51: "Light drizzle",
      53: "Moderate drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      95: "Thunderstorm",
    },
  },
};
