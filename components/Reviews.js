import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Reviews = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('most-recent');
  const [reviewsToShow, setReviewsToShow] = useState(4);

  // Product reviews data for Zoha's Attire fashion products (27 reviews for 4.8 rating)
  const reviews = [
    {
      id: 1,
      customerName: "Fatima A.",
      customerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Absolutely stunning traditional outfit!",
      review: "This traditional embroidered suit exceeded my expectations. The fabric quality is exceptional and the embroidery work is absolutely beautiful. Perfect for special occasions and the fit is very comfortable. The colors are vibrant and exactly as shown in pictures. Highly recommend Zoha's Attire!",
      date: "December 15, 2024",
      productName: "Embroidered Traditional Suit",
      productImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Royal Blue",
      helpfulVotes: 12,
      totalVotes: 14,
      images: [
        "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=400&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&crop=center"
      ]
    },
    {
      id: 2,
      customerName: "Ahmad H.",
      customerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect formal shirt for office!",
      review: "This formal shirt is absolutely outstanding! The fabric quality is excellent and the fit is perfect. Great for office wear and business meetings. The collar stays crisp all day and the material doesn't wrinkle easily. Excellent value for money!",
      date: "December 14, 2024",
      productName: "Premium Formal Shirt",
      productImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150&h=150&fit=crop&crop=center",
      size: "Large",
      color: "White",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 3,
      customerName: "Ayesha M.",
      customerImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful designer lawn suit!",
      review: "This designer lawn suit is exactly what I was looking for. The print quality is incredible and the colors are so vibrant as promised. Perfect for summer wear and casual occasions. The fabric is soft and breathable. Fast delivery too!",
      date: "December 12, 2024",
      productName: "Designer Lawn Suit",
      productImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Floral Print",
      helpfulVotes: 15,
      totalVotes: 16,
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center"
      ]
    },
    {
      id: 4,
      customerName: "Maria K.",
      customerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent winter collection jacket!",
      review: "This winter jacket is perfect for the cold season. Keeps me warm and looks stylish at the same time. The material is high quality and the stitching is excellent. Great for both casual and semi-formal occasions. Excellent quality from Zoha's Attire.",
      date: "December 10, 2024",
      productName: "Winter Collection Jacket",
      productImage: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=150&h=150&fit=crop&crop=center",
      size: "Large",
      color: "Navy Blue",
      helpfulVotes: 22,
      totalVotes: 24,
      images: []
    },
    {
      id: 5,
      customerName: "Zara L.",
      customerImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Elegant party dress is excellent!",
      review: "This party dress is so elegant yet comfortable! The fabric feels luxurious and the design is stunning. The fit is perfect and not too tight. Great for special occasions and wedding functions. Will definitely order more from Zoha's Attire.",
      date: "December 8, 2024",
      productName: "Elegant Party Dress",
      productImage: "https://images.unsplash.com/photo-1566479179817-c0e1a5f96ffa?w=150&h=150&fit=crop&crop=center",
      size: "Small",
      color: "Maroon",
      helpfulVotes: 19,
      totalVotes: 21,
      images: []
    },
    {
      id: 6,
      customerName: "Hina R.",
      customerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality casual wear, fast delivery",
      review: "The casual wear quality is very good for the price. Delivery was faster than expected and the packaging was excellent. The fabric is comfortable and perfect for daily wear. The colors are nice and vibrant. Satisfied with my purchase.",
      date: "December 6, 2024",
      productName: "Casual Wear Collection",
      productImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Pink",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 7,
      customerName: "Sadia S.",
      customerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Beautiful ethnic wear collection!",
      review: "This ethnic wear collection is absolutely stunning! The embroidery work and fabric quality are remarkable. Perfect for all types of cultural events. The design is elegant and fits perfectly while maintaining traditional appeal. Highly recommend for festive occasions!",
      date: "December 4, 2024",
      productName: "Ethnic Wear Collection",
      productImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150&h=150&fit=crop&crop=center",
      size: "Large",
      color: "Green",
      helpfulVotes: 25,
      totalVotes: 27,
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=400&h=400&fit=crop&crop=center"
      ]
    },
    {
      id: 8,
      customerName: "Rabia K.",
      customerImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Exceeded expectations!",
      review: "This premium kurta is even better than I expected. The fabric feels soft and comfortable all day. Perfect for both casual and formal occasions. The fit is excellent and the design is very elegant. Great customer service from Zoha's Attire too!",
      date: "December 2, 2024",
      productName: "Premium Kurta Collection",
      productImage: "https://images.unsplash.com/photo-1583391733947-34e1b3f31f32?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Purple",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 9,
      customerName: "Amina T.",
      customerImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium quality baby collection",
      review: "The baby clothing quality is outstanding! These soft cotton outfits are perfect for delicate baby skin. The fabric is gentle and breathable, keeping baby comfortable all day. Received many compliments on how adorable the designs look.",
      date: "November 30, 2024",
      productName: "Baby Cotton Collection",
      productImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&h=150&fit=crop&crop=center",
      size: "6-12 months",
      color: "Pastel Blue",
      helpfulVotes: 21,
      totalVotes: 23,
      images: []
    },
    {
      id: 10,
      customerName: "Khadija M.",
      customerImage: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality and stylish",
      review: "This formal trouser works perfectly for office wear and is very comfortable. The fabric quality is good and the fit is excellent. Only minor issue is that it needs careful ironing to maintain the crisp look, but overall very effective for professional settings.",
      date: "November 28, 2024",
      productName: "Formal Trouser Collection",
      productImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop&crop=center",
      size: "32",
      color: "Navy Blue",
      helpfulVotes: 11,
      totalVotes: 13,
      images: []
    },
    {
      id: 11,
      customerName: "Saira A.",
      customerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent designer scarf collection",
      review: "This Designer Scarf Collection is so beautiful and versatile. Perfect for both casual and formal styling. Adds elegance to any outfit effortlessly and the fabric quality is amazing. Great value for money!",
      date: "November 26, 2024",
      productName: "Designer Scarf Collection",
      productImage: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=150&h=150&fit=crop&crop=center",
      size: "One Size",
      color: "Golden Yellow",
      helpfulVotes: 17,
      totalVotes: 19,
      images: []
    },
    {
      id: 12,
      customerName: "Farah B.",
      customerImage: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Professional quality at great price",
      review: "This Handbag Collection is absolutely fantastic! The leather quality is professional-grade and works for multiple occasions. Perfect for office and formal use. The packaging was also very secure and elegant.",
      date: "November 24, 2024",
      productName: "Premium Handbag Collection",
      productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Black",
      helpfulVotes: 23,
      totalVotes: 25,
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center"
      ]
    },
    {
      id: 13,
      customerName: "Uzma H.",
      customerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Modern and stylish footwear",
      review: "This Footwear Collection is perfect for modern fashion. The comfort and style are amazing and the quality lasts for years. Great for daily wear and special occasions. Highly satisfied with Zoha's Attire quality!",
      date: "November 22, 2024",
      productName: "Modern Footwear Collection",
      productImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop&crop=center",
      size: "Size 7",
      color: "Blue",
      helpfulVotes: 13,
      totalVotes: 15,
      images: []
    },
    {
      id: 14,
      customerName: "Mehreen K.",
      customerImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Complete fashion accessory kit",
      review: "This fashion accessory bundle is absolutely perfect! The variety and quality are amazing for complete outfit styling. Perfect for special occasions and festivals. Worth every penny!",
      date: "November 20, 2024",
      productName: "Complete Fashion Accessory Kit",
      productImage: "https://images.unsplash.com/photo-1581024601875-1c0e1e1b3ad6?w=150&h=150&fit=crop&crop=center",
      size: "5-piece set",
      color: "Mixed",
      helpfulVotes: 28,
      totalVotes: 30,
      images: []
    },
    {
      id: 15,
      customerName: "Rubina S.",
      customerImage: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Effective and convenient",
      review: "This Hair Accessory Set is perfect for regular styling and hair management. Works effectively for different hairstyles and occasions. The packaging is good and easy to use. Good quality for the price.",
      date: "November 18, 2024",
      productName: "Hair Accessory Set",
      productImage: "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=150&h=150&fit=crop&crop=center",
      size: "Multi-pack",
      color: "Clear",
      helpfulVotes: 9,
      totalVotes: 11,
      images: []
    },
    {
      id: 16,
      customerName: "Shazia R.",
      customerImage: "https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Excellent sportswear quality",
      review: "This Sportswear Collection is perfect for fitness and active lifestyle. The moisture-wicking fabric works like magic for workouts and outdoor activities. Great for everyday exercise. Fast delivery from Zoha's Attire too!",
      date: "November 16, 2024",
      productName: "Active Sportswear Collection",
      productImage: "https://images.unsplash.com/photo-1506629905607-d9db33eb2439?w=150&h=150&fit=crop&crop=center",
      size: "Large",
      color: "Black",
      helpfulVotes: 12,
      totalVotes: 14,
      images: []
    },
    {
      id: 17,
      customerName: "Tahira M.",
      customerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for formal occasions!",
      review: "This Formal Evening Wear is absolutely outstanding! Perfect for special events and elegant occasions. Works excellently for weddings and corporate functions. Received excellent compliments every time!",
      date: "November 14, 2024",
      productName: "Formal Evening Wear",
      productImage: "https://images.unsplash.com/photo-1566479179817-c0e1a5f96ffa?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Black",
      helpfulVotes: 20,
      totalVotes: 22,
      images: [
        "https://images.unsplash.com/photo-1566479179817-c0e1a5f96ffa?w=400&h=400&fit=crop&crop=center"
      ]
    },
    {
      id: 18,
      customerName: "Yasmin A.",
      customerImage: "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Ultra stylish perfume collection",
      review: "This Perfume Collection is incredibly effective and long-lasting! Perfect for special occasions and maintaining fresh fragrance all day. The scent is pleasant and not overwhelming. Great for daily wear and special events.",
      date: "November 12, 2024",
      productName: "Signature Perfume Collection",
      productImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&h=150&fit=crop&crop=center",
      size: "50ml",
      color: "Purple",
      helpfulVotes: 8,
      totalVotes: 10,
      images: []
    },
    {
      id: 19,
      customerName: "Samina K.",
      customerImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good for daily wear",
      review: "This Multi-Purpose Casual Wear is suitable for daily styling and comfort. The fabric is effective and the price is reasonable. The versatile design is good for regular wardrobe maintenance.",
      date: "November 10, 2024",
      productName: "Multi-Purpose Casual Wear",
      productImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=150&h=150&fit=crop&crop=center",
      size: "Large",
      color: "Navy Blue",
      helpfulVotes: 7,
      totalVotes: 9,
      images: []
    },
    {
      id: 20,
      customerName: "Naila H.",
      customerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Classic Denim Collection is excellent",
      review: "This Classic Denim Collection is absolutely reliable! The traditional style is unique and the quality is outstanding. Great authentic fashion and fast shipping from Zoha's Attire. Love it!",
      date: "November 8, 2024",
      productName: "Classic Denim Collection",
      productImage: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=150&h=150&fit=crop&crop=center",
      size: "Large",
      color: "White",
      helpfulVotes: 15,
      totalVotes: 17,
      images: []
    },
    {
      id: 21,
      customerName: "Bushra S.",
      customerImage: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Simple and elegant",
      review: "This Simple Jewelry Collection is perfect for those who love gentle yet elegant accessories. The design is clean and efficient. Great quality materials and comfortable to wear. Exactly what I was looking for!",
      date: "November 6, 2024",
      productName: "Simple Jewelry Collection",
      productImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop&crop=center",
      size: "Adjustable",
      color: "Clear",
      helpfulVotes: 10,
      totalVotes: 12,
      images: []
    },
    {
      id: 22,
      customerName: "Fouzia R.",
      customerImage: "https://images.unsplash.com/photo-1465485512101-4c502f3b9e67?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Premium formal wear stunning!",
      review: "This Premium Formal Wear Collection is absolutely exquisite! The variety of outfits and perfect tailoring are amazing for comprehensive wardrobe and professional use. The quality is outstanding. Worth the investment!",
      date: "November 4, 2024",
      productName: "Premium Formal Wear Collection",
      productImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center",
      size: "10-piece set",
      color: "Mixed",
      helpfulVotes: 32,
      totalVotes: 34,
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center"
      ]
    },
    {
      id: 23,
      customerName: "Riffat M.",
      customerImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Perfect for office wear",
      review: "This Office Wear Collection is efficient yet stylish, perfect for workplace fashion and professional look. The variety is practical and the style is excellent. Great for corporate environments. Highly recommend Zoha's Attire!",
      date: "November 2, 2024",
      productName: "Office Wear Collection",
      productImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=150&h=150&fit=crop&crop=center",
      size: "6-piece set",
      color: "Blue",
      helpfulVotes: 14,
      totalVotes: 16,
      images: []
    },
    {
      id: 24,
      customerName: "Shaista K.",
      customerImage: "https://images.unsplash.com/photo-1484588168347-9d835bb09939?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Traditional and elegant",
      review: "This Traditional Jewelry collection with authentic designs is beautiful and timeless. The quality is excellent and the craftsmanship is outstanding. Perfect for maintaining traditional style and cultural heritage.",
      date: "October 31, 2024",
      productName: "Traditional Jewelry Collection",
      productImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop&crop=center",
      size: "4-piece set",
      color: "Natural",
      helpfulVotes: 18,
      totalVotes: 20,
      images: []
    },
    {
      id: 25,
      customerName: "Nayab A.",
      customerImage: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Commercial business wear perfect",
      review: "This Business Formal Collection is perfect for corporate facilities and professional settings. The tailoring is professional and the quality is high. Great variety and excellent customer service from Zoha's Attire. Very satisfied!",
      date: "October 29, 2024",
      productName: "Business Formal Collection",
      productImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=center",
      size: "Complete Set",
      color: "Navy Blue",
      helpfulVotes: 16,
      totalVotes: 18,
      images: []
    },
    {
      id: 26,
      customerName: "Ghazala S.",
      customerImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 4,
      title: "Good quality, minor color preference",
      review: "The quality is good and the style is effective. However, the color was slightly different than my preference. Overall satisfied with the purchase. The design results are perfect and the fit is good.",
      date: "October 27, 2024",
      productName: "Designer Top Collection",
      productImage: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=150&h=150&fit=crop&crop=center",
      size: "Medium",
      color: "Pink",
      helpfulVotes: 6,
      totalVotes: 8,
      images: []
    },
    {
      id: 27,
      customerName: "Lubna R.",
      customerImage: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=150&h=150&fit=crop&crop=face",
      isVerifiedPurchase: true,
      rating: 5,
      title: "Amazing quality and style",
      review: "The quality of these eco-friendly fashion products is absolutely amazing! The attention to sustainable materials is incredible. Perfect for conscious fashion lovers and daily wear. The style effectiveness is exceptional. Highly recommend Zoha's Attire!",
      date: "October 25, 2024",
      productName: "Eco-Friendly Fashion Collection",
      productImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop&crop=center",
      size: "5-piece set",
      color: "Green",
      helpfulVotes: 24,
      totalVotes: 26,
      images: []
    }
  ];

  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

  const ratingBreakdown = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  };

  // Filter and sort reviews
  const getFilteredReviews = () => {
    let filtered = reviews;

    if (selectedFilter !== 'all') {
      filtered = reviews.filter(review => review.rating === parseInt(selectedFilter));
    }

    switch (sortBy) {
      case 'most-recent':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest-rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest-rating':
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case 'most-helpful':
        filtered.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        break;
      default:
        break;
    }

    return filtered.slice(0, reviewsToShow);
  };

  const filteredReviews = getFilteredReviews();
  const allFilteredReviews = (() => {
    let filtered = reviews;
    if (selectedFilter !== 'all') {
      filtered = reviews.filter(review => review.rating === parseInt(selectedFilter));
    }
    return filtered;
  })();

  const loadMoreReviews = () => {
    setReviewsToShow(prev => prev + 5);
  };

  const hasMoreReviews = reviewsToShow < allFilteredReviews.length;

  // Render star rating
  const renderStars = (rating, size = 'w-4 h-4') => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`${size} ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-brand-primary mb-8">Customer Reviews</h2>

          {/* Rating Summary */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Overall Rating */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                  {renderStars(Math.round(averageRating), 'w-6 h-6')}
                  <span className="text-2xl font-bold text-brand-primary ml-2">
                    {averageRating.toFixed(1)} out of 5
                  </span>
                </div>
                <p className="text-gray-600">{totalReviews} global ratings</p>
              </div>

              {/* Rating Breakdown */}
              <div className="lg:col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          setSelectedFilter(star.toString());
                          setReviewsToShow(4);
                        }}
                        className="flex items-center space-x-1 text-sm text-brand-accent hover:text-brand-primary transition-colors duration-200"
                      >
                        <span>{star} star</span>
                      </button>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${totalReviews > 0 ? (ratingBreakdown[star] / totalReviews) * 100 : 0}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {Math.round((ratingBreakdown[star] / totalReviews) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
            <div className="flex flex-wrap items-center space-x-4">
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setReviewsToShow(4);
                }}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${selectedFilter === 'all'
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
              >
                All reviews
              </button>
              {[5, 4, 3, 2, 1].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setSelectedFilter(star.toString());
                    setReviewsToShow(4);
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${selectedFilter === star.toString()
                    ? 'bg-brand-accent text-white border-brand-accent'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {star} stars
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              >
                <option value="most-recent">Most recent</option>
                <option value="oldest">Oldest</option>
                <option value="highest-rating">Highest rating</option>
                <option value="lowest-rating">Lowest rating</option>
                <option value="most-helpful">Most helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex flex-col lg:flex-row lg:space-x-6">

                {/* Product Image */}
                <div className="flex-shrink-0 mb-4 lg:mb-0">
                  <Link href={`/product/${review.id}`}>
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200">
                      <Image
                        src={review.customerImage}
                        alt={review.productName}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Customer Info and Rating */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                      {review.isVerifiedPurchase && (
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mb-3">
                    <Link href={`/product/${review.id}`} className="text-brand-accent hover:text-brand-primary text-sm">
                      {review.productName}
                    </Link>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>Size: {review.size}</span>
                      <span>Color: {review.color}</span>
                    </div>
                  </div>

                  {/* Review Title */}
                  <h5 className="font-semibold text-brand-primary mb-2">{review.title}</h5>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.review}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mb-4">
                      {review.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Helpful Votes */}
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600">
                      {review.helpfulVotes} of {review.totalVotes} people found this helpful
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-brand-accent hover:text-brand-primary transition-colors duration-200">
                        Helpful
                      </button>
                      <span className="text-gray-400">|</span>
                      <button className="text-brand-accent hover:text-brand-primary transition-colors duration-200">
                        Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreReviews && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreReviews}
              className="px-8 py-3 bg-brand-accent text-white rounded-lg font-semibold hover:bg-brand-primary transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Load More Reviews ({allFilteredReviews.length - reviewsToShow} remaining)
            </button>
          </div>
        )}

        {/* Review Summary Stats */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-brand-primary mb-1">
                {Math.round((ratingBreakdown[5] / totalReviews) * 100)}%
              </div>
              <p className="text-gray-600 text-sm">5-star reviews</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-primary mb-1">
                {reviews.filter(r => r.isVerifiedPurchase).length}
              </div>
              <p className="text-gray-600 text-sm">Verified purchases</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-primary mb-1">
                {averageRating.toFixed(1)}
              </div>
              <p className="text-gray-600 text-sm">Average rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-primary mb-1">
                {reviews.filter(r => r.images && r.images.length > 0).length}
              </div>
              <p className="text-gray-600 text-sm">Reviews with photos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews; 