require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");

const demoPlaces = [
    {
        title: "Luxury Beachfront Villa",
        address: "Malibu, California, USA",
        photos: [
            "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
        ],
        description: "Stunning beachfront villa with panoramic ocean views. Wake up to the sound of waves and enjoy breathtaking sunsets from your private terrace.",
        perks: ["wifi", "parking", "tv", "pets"],
        extraInfo: "Check-in after 3 PM. No smoking inside. Beach access included.",
        maxGuests: 8,
        price: 450
    },
    {
        title: "Cozy Mountain Cabin",
        address: "Aspen, Colorado, USA",
        photos: [
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
            "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
            "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800"
        ],
        description: "Rustic mountain cabin with modern amenities. Perfect for ski trips and nature lovers. Fireplace, hot tub, and stunning mountain views.",
        perks: ["wifi", "parking", "entrance"],
        extraInfo: "Ski equipment storage available. Firewood provided.",
        maxGuests: 6,
        price: 280
    },
    {
        title: "Modern Downtown Apartment",
        address: "Manhattan, New York, USA",
        photos: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
        ],
        description: "Sleek, modern apartment in the heart of Manhattan. Walking distance to Times Square, Central Park, and world-class restaurants.",
        perks: ["wifi", "tv", "entrance"],
        extraInfo: "Doorman building with 24/7 security. Gym access included.",
        maxGuests: 4,
        price: 320
    },
    {
        title: "Tropical Paradise Bungalow",
        address: "Bali, Indonesia",
        photos: [
            "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800",
            "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
        ],
        description: "Authentic Balinese bungalow surrounded by rice paddies. Experience true tranquility with private pool and spa services.",
        perks: ["wifi", "parking", "pets"],
        extraInfo: "Daily breakfast included. Airport pickup available.",
        maxGuests: 4,
        price: 150
    },
    {
        title: "Historic Castle Suite",
        address: "Edinburgh, Scotland, UK",
        photos: [
            "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800",
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"
        ],
        description: "Stay in a real castle! This historic suite features period furniture, stunning views of the Scottish Highlands, and modern luxury.",
        perks: ["wifi", "parking", "tv", "entrance"],
        extraInfo: "Guided castle tours available. Full Scottish breakfast included.",
        maxGuests: 2,
        price: 500
    },
    {
        title: "Charming Parisian Loft",
        address: "Paris, France",
        photos: [
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800",
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"
        ],
        description: "Romantic loft in Le Marais with Eiffel Tower views. Original exposed beams, designer furniture, and authentic Parisian charm.",
        perks: ["wifi", "tv"],
        extraInfo: "Walking distance to Louvre and Notre-Dame. Metro station nearby.",
        maxGuests: 3,
        price: 275
    },
    {
        title: "Santorini Cave House",
        address: "Santorini, Greece",
        photos: [
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
            "https://images.unsplash.com/photo-1613391892851-5e0c7d9dbf3e?w=800",
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800"
        ],
        description: "Iconic whitewashed cave house carved into the caldera cliffs. Private terrace with infinity pool overlooking the Aegean Sea.",
        perks: ["wifi", "tv", "entrance"],
        extraInfo: "Spectacular sunset views. Wine tasting tours arranged.",
        maxGuests: 4,
        price: 380
    },
    {
        title: "Safari Lodge Experience",
        address: "Maasai Mara, Kenya",
        photos: [
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
            "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
            "https://images.unsplash.com/photo-1517468584310-6b55d3a3b91c?w=800"
        ],
        description: "Luxury safari lodge in the heart of Maasai Mara. Daily game drives, gourmet dining, and unforgettable wildlife encounters.",
        perks: ["wifi", "parking"],
        extraInfo: "All-inclusive package with meals and safari drives. Expert guides.",
        maxGuests: 4,
        price: 650
    },
    {
        title: "Tokyo Minimalist Studio",
        address: "Shibuya, Tokyo, Japan",
        photos: [
            "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
            "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800",
            "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800"
        ],
        description: "Ultra-modern minimalist studio in trendy Shibuya. Steps away from the famous Shibuya Crossing and vibrant nightlife.",
        perks: ["wifi", "tv", "entrance"],
        extraInfo: "High-speed internet. Convenience stores and restaurants nearby.",
        maxGuests: 2,
        price: 180
    },
    {
        title: "Lakeside Swiss Chalet",
        address: "Lucerne, Switzerland",
        photos: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            "https://images.unsplash.com/photo-1531778272849-d1dd22444c06?w=800",
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800"
        ],
        description: "Traditional Swiss chalet on Lake Lucerne with stunning Alpine views. Ski slopes in winter, hiking trails in summer.",
        perks: ["wifi", "parking", "pets", "tv"],
        extraInfo: "Private boat dock. Sauna and fireplace. Ski storage.",
        maxGuests: 8,
        price: 420
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");

        // Create a demo user first
        let demoUser = await User.findOne({ email: "demo@airbnb.com" });
        if (!demoUser) {
            demoUser = await User.create({
                name: "Demo Host",
                email: "demo@airbnb.com",
                password: "demo123456",
                picture: "https://res.cloudinary.com/rahul4019/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1695133265/pngwing.com_zi4cre.png"
            });
            console.log("✅ Demo user created");
        } else {
            console.log("ℹ️ Demo user already exists");
        }

        // Check if places already exist
        const existingPlaces = await Place.countDocuments();
        if (existingPlaces > 0) {
            console.log(`ℹ️ Database already has ${existingPlaces} places. Skipping seed.`);
            console.log("   Run with --force to delete and reseed.");

            if (process.argv.includes("--force")) {
                await Place.deleteMany({});
                console.log("🗑️ Deleted existing places");
            } else {
                await mongoose.disconnect();
                return;
            }
        }

        // Add owner to each place
        const placesWithOwner = demoPlaces.map(place => ({
            ...place,
            owner: demoUser._id
        }));

        // Insert places
        await Place.insertMany(placesWithOwner);
        console.log(`✅ Successfully seeded ${demoPlaces.length} demo places`);

        await mongoose.disconnect();
        console.log("✅ Database connection closed");

    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
